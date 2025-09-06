// socket.js
const cookie = require("cookie");
const cookieSignature = require("cookie-signature");
const { emitRoster, selectPartyById } = require("../helpers/party");
const { PARTY_STATUS } = require("../../server/helpers/constants");
const { createMatchmaking } = require("./matchmaking");

const HEARTBEAT_SEC = 60; // client sends every 60s (fallback)
const OFFLINE_FALLBACK_SEC = 120; // if no heartbeat for 2 minutes, mark offline
const DISCONNECT_GRACE_MS = 3000; // avoid flicker on slower reloads

// Presence tracking (multi-tab safe)
const userSockets = new Map(); // name -> Set<socketId>
const pendingOffline = new Map(); // name -> timeoutId

function readSignedCookieFromHandshake(socket, cookieName, secret) {
  const header = socket.handshake?.headers?.cookie;
  if (!header) return null;
  const parsed = cookie.parse(header);
  const raw = parsed[cookieName];
  if (!raw || !raw.startsWith("s:")) return null; // cookie-parser format
  const unsigned = cookieSignature.unsign(raw.slice(2), secret);
  return unsigned || null;
}

function currentPartyRoom(socket) {
  for (const room of socket.rooms) if (room.startsWith("party:")) return room;
  return null;
}

/**
 * Create the socket layer with injected DB helpers.
 * @param {object} deps
 *  - io
 *  - COOKIE_SECRET
 *  - db: {
 *      getUserById, getPartyIdByName, fetchPartyMembersDetailed,
 *      setUserStatus, setUserSocketId, clearUserSocketIfMatch,
 *      updateLastSeen
 *    }
 */
function initSocket({ io, COOKIE_SECRET, db }) {
  // Matchmaking controller (power-saved loop inside)
  const mm = createMatchmaking({
    io,
    db,
    teamSizeByMode: {
      // Define per-mode team sizes; adjust to your modes
      // Example: mode 1 -> 1v1, mode 2 -> 2v2, mode 4 -> 4v4
      1: 1,
      2: 2,
      4: 4,
    },
  });
  // unified presence setter
  async function setPresence(name, status, partyId = null) {
    try {
      await db.setUserStatus(name, status);
      if (!partyId) partyId = await db.getPartyIdByName(name);
      if (partyId) {
        io.to(`party:${partyId}`).emit("status:update", {
          partyId,
          name,
          status,
        });
      }
    } catch (_) {}
  }

  // auth: attach user row from signed cookie
  io.use(async (socket, next) => {
    try {
      const userIdStr = readSignedCookieFromHandshake(
        socket,
        "user_id",
        COOKIE_SECRET
      );
      if (!userIdStr) {
        socket.data.user = null;
        return next();
      }
      const user = await db.getUserById(Number(userIdStr));
      socket.data.user = user || null;
      next();
    } catch (e) {
      console.error("Socket auth error:", e);
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    const user = socket.data.user;
    const userId = user?.user_id;
    const username = user?.name;

    // store socket id and mark online
    try {
      if (userId) await db.setUserSocketId(userId, socket.id);
    } catch (e) {
      console.warn("Could not persist socket_id:", e?.message);
    }

    // Track this socket for the user and mark online
    if (username) {
      const t = pendingOffline.get(username);
      if (t) {
        clearTimeout(t);
        pendingOffline.delete(username);
      }
      let set = userSockets.get(username);
      if (!set) {
        set = new Set();
        userSockets.set(username, set);
      }
      set.add(socket.id);

      try {
        const pid = await db.getPartyIdByName(username);
        await setPresence(username, "online", pid || null);
      } catch (_) {}
    }

    // auto-join room
    try {
      const partyId = username ? await db.getPartyIdByName(username) : null;
      if (partyId) {
        socket.join(`party:${partyId}`);
        socket.emit("party:joined", { partyId });
      } else {
        socket.join("lobby");
        socket.emit("party:joined", { partyId: null });
      }
    } catch (e) {
      console.error("Error auto-joining party:", e);
    }

    // fallback heartbeat
    socket.on("heartbeat", async (partyId) => {
      const uname = socket.data.user?.name;
      if (!uname || !partyId) return;
      try {
        await db.updateLastSeen(partyId, uname);
      } catch (e) {
        console.warn("heartbeat error:", e?.message);
      }
    });

    // Ready status toggle (party-only broadcast)
    socket.on("ready:status", async (data) => {
      try {
        const uname = socket.data.user?.name;
        if (!uname) return;
        const isReady = !!data?.ready;
        const providedPartyId = data?.partyId ? Number(data.partyId) : null;
        const partyId = providedPartyId || (await db.getPartyIdByName(uname));
        // For non-party, do not emit; optionally update self-only UI client-side
        if (!partyId) return;

        await db.setUserStatus(uname, isReady ? "ready" : "online");
        io.to(`party:${partyId}`).emit("status:update", {
          partyId,
          name: uname,
          status: isReady ? "ready" : "online",
        });

        // If a member un-readies while party was matchmaking, cancel queue and hide overlay
        if (!isReady) {
          try {
            await mm.queueLeave({ partyId, userId: null });
          } catch (_) {}
          // mm.queueLeave already sets party to IDLE; helper call not required here
          io.to(`party:${partyId}`).emit("match:cancelled");
        }

        // If everyone in party is ready, update party status and notify clients to show overlay
        const members = await db.fetchPartyMembersDetailed(partyId);
        const allReady =
          members.length > 0 &&
          members.every(
            (m) => String(m.status || "").toLowerCase() === "ready"
          );
        if (allReady) {
          try {
            await db.setPartyStatus(partyId, PARTY_STATUS.QUEUED);
          } catch (_) {}
          io.to(`party:${partyId}`).emit("party:matchmaking:start", {
            partyId,
          });
          console.log(`[party:${partyId}] all-ready -> matchmaking`);
          // Auto-enqueue this party using its current mode/map
          try {
            const row = await db.runQuery(
              "SELECT mode, map FROM parties WHERE party_id = ? LIMIT 1",
              [partyId]
            );
            const mode = row[0]?.mode || 1;
            const map = row[0]?.map || 1;
            await mm.queueJoin({ partyId, mode, map });
          } catch (err) {
            console.warn("enqueue failed:", err?.message);
          }
        }
      } catch (e) {
        console.warn("ready:status error:", e?.message);
      }
    });

    // Queue join/leave and ready-ack events
    socket.on("queue:join", async (data) => {
      try {
        const uname = socket.data.user?.name;
        const userId = socket.data.user?.user_id || null;
        const { mode, map, side, partyId } = data || {};
        // prefer server-truth for partyId
        const pid =
          partyId || (uname ? await db.getPartyIdByName(uname) : null);
        await mm.queueJoin({
          partyId: pid || null,
          userId: pid ? null : userId,
          mode,
          map,
          side,
        });
      } catch (e) {
        console.warn("queue:join error:", e?.message);
        socket.emit("queue:error", {
          message: e?.message || "queue join failed",
        });
      }
    });

    socket.on("queue:leave", async (data) => {
      try {
        const uname = socket.data.user?.name;
        const userId = socket.data.user?.user_id || null;
        const pid = uname ? await db.getPartyIdByName(uname) : null;
        await mm.queueLeave({
          partyId: pid || null,
          userId: pid ? null : userId,
        });
        if (pid) {
          try {
            await db.setPartyStatus(pid, PARTY_STATUS.IDLE);
          } catch (_) {}
        }
        // Inform relevant clients to hide the matchmaking overlay
        if (pid) io.to(`party:${pid}`).emit("match:cancelled");
        else socket.emit("match:cancelled");
      } catch (e) {
        console.warn("queue:leave error:", e?.message);
      }
    });

    socket.on("ready:ack", async ({ matchId }) => {
      try {
        const userId = socket.data.user?.user_id;
        if (!userId || !matchId) return;
        await mm.handleReadyAck(userId, matchId);
      } catch (e) {
        console.warn("ready:ack error:", e?.message);
      }
    });

    // Proactive offline on tab close/navigation
    socket.on("client:bye", async () => {
      const uname = socket.data.user?.name;
      if (!uname) return;
      const t = pendingOffline.get(uname);
      if (t) {
        clearTimeout(t);
        pendingOffline.delete(uname);
      }
      const set = userSockets.get(uname);
      if (set) set.delete(socket.id);
      if (!set || set.size === 0) {
        // schedule offline; cancel if a new socket appears within grace time
        const timer = setTimeout(async () => {
          const s = userSockets.get(uname);
          if (!s || s.size === 0) await setPresence(uname, "offline");
          pendingOffline.delete(uname);
        }, DISCONNECT_GRACE_MS);
        pendingOffline.set(uname, timer);
      }

      // Best-effort cancel any active queue for this user/party and notify others
      try {
        const pid = await db.getPartyIdByName(uname);
        await mm.handleDisconnect(uname);
        if (pid) {
          io.to(`party:${pid}`).emit("match:cancelled");
          console.log(`[cancel][emit] bye user=${uname} party=${pid}`);
        } else {
          socket.emit("match:cancelled");
          console.log(`[cancel][emit] bye-solo user=${uname}`);
        }
      } catch (_) {}
    });

    // Mode change handler
    socket.on("mode-change", async (data) => {
      const uname = socket.data.user?.name;
      if (!uname || !data.partyId) return;

      try {
        // Update party mode in database
        await db.runQuery("UPDATE parties SET mode = ? WHERE party_id = ?", [
          data.selectedValue,
          data.partyId,
        ]);

        // Broadcast mode change to all party members
        io.to(`party:${data.partyId}`).emit("mode-change", {
          partyId: data.partyId,
          selectedValue: data.selectedValue,
          mode: data.selectedValue,
          username: uname,
          members: data.members,
        });

        console.log(
          `[party:${data.partyId}] Mode changed to ${data.selectedValue} by ${uname}`
        );
      } catch (e) {
        console.warn("mode-change error:", e?.message);
      }
    });

    // Map change handler
    socket.on("map-change", async (data) => {
      const uname = socket.data.user?.name;
      if (!uname || !data.partyId) return;

      try {
        // Update party map in database
        await db.runQuery("UPDATE parties SET map = ? WHERE party_id = ?", [
          data.selectedValue,
          data.partyId,
        ]);

        // Broadcast map change to all party members
        io.to(`party:${data.partyId}`).emit("map-change", {
          partyId: data.partyId,
          selectedValue: data.selectedValue,
          map: data.selectedValue,
          username: uname,
        });

        console.log(
          `[party:${data.partyId}] Map changed to ${data.selectedValue} by ${uname}`
        );
      } catch (e) {
        console.warn("map-change error:", e?.message);
      }
    });

    // Character change handler
    socket.on("char-change", async (data) => {
      const uname = socket.data.user?.name;
      if (!uname) return;
      // Accept either { partyId, character } or { partyId, charClass }
      const partyId = data?.partyId ? Number(data.partyId) : null;
      const charClass = (data?.character || data?.charClass || "")
        .toString()
        .trim();
      // Basic validation: letters, dash/underscore only and reasonable length
      if (!charClass || !/^[a-zA-Z_-]{2,20}$/.test(charClass)) return;

      try {
        // Ensure user actually belongs to the party before broadcasting
        if (partyId) {
          const mem = await db.runQuery(
            "SELECT 1 FROM party_members WHERE party_id = ? AND name = ? LIMIT 1",
            [partyId, uname]
          );
          if (!mem?.length) {
            // Still allow updating your own selected character silently
            await db.runQuery(
              "UPDATE users SET char_class = ? WHERE name = ?",
              [charClass, uname]
            );
            return;
          }
        }

        // Update user selection in DB
        await db.runQuery("UPDATE users SET char_class = ? WHERE name = ?", [
          charClass,
          uname,
        ]);

        // If in a party, broadcast refreshed roster to everyone
        if (partyId) {
          // Fetch party + members and emit via existing helper for consistency
          const party = await selectPartyById(db, partyId);
          if (party) {
            const members = await db.fetchPartyMembersDetailed(partyId);
            await emitRoster(io, partyId, party, members);
          }
        } else {
          // Not in a party; nothing to broadcast. Optionally, could emit back to user for confirmation.
        }

        // Optional: log
        console.log(`[party:${partyId ?? "-"}] ${uname} selected ${charClass}`);
      } catch (e) {
        console.warn("char-change error:", e?.message);
      }
    });

    // Team update handler (if needed for future drag and drop)
    // socket.on("team-update", async (data) => {
    //   const uname = socket.data.user?.name;
    //   if (!uname || !data.partyId || data.username !== uname) return;

    //   try {
    //     // Update user's team assignment in database
    //     const teamNum = data.team === "your-team" ? "team1" : "team2";
    //     await require("./sql").runQuery(
    //       "UPDATE party_members SET team = ? WHERE name = ? AND party_id = ?",
    //       [teamNum, uname, data.partyId]
    //     );

    //     // Fetch updated member list and broadcast
    //     const members = await db.fetchPartyMembersDetailed(data.partyId);
    //     const party = await require("./sql").runQuery(
    //       "SELECT mode, map FROM parties WHERE party_id = ? LIMIT 1",
    //       [data.partyId]
    //     );

    //     if (party[0]) {
    //       io.to(`party:${data.partyId}`).emit("party:members", {
    //         partyId: data.partyId,
    //         mode: party[0].mode,
    //         map: party[0].map,
    //         members,
    //       });
    //     }

    //     console.log(`[party:${data.partyId}] ${uname} moved to ${teamNum}`);
    //   } catch (e) {
    //     console.warn("team-update error:", e?.message);
    //   }
    // });

    socket.on("disconnect", async () => {
      try {
        if (userId) await db.clearUserSocketIfMatch(userId, socket.id);
      } catch (_) {}

      if (!username) return;
      const set = userSockets.get(username);
      if (set) set.delete(socket.id);
      const hasAny = !!(set && set.size > 0);
      if (!hasAny) {
        const timer = setTimeout(async () => {
          const s = userSockets.get(username);
          if (!s || s.size === 0) await setPresence(username, "offline");
          pendingOffline.delete(username);
        }, DISCONNECT_GRACE_MS);
        pendingOffline.set(username, timer);
      }

      // Also drop any queued ticket for this user's party (prevents stale tickets)
      try {
        await mm.handleDisconnect(username);
        const pid = await db.getPartyIdByName(username);
        if (pid) {
          io.to(`party:${pid}`).emit("match:cancelled");
          console.log(
            `[cancel][emit] disconnect user=${username} party=${pid}`
          );
        } else {
          // Solo: nothing to broadcast; their own overlay will hide on disconnect
          console.log(`[cancel] disconnect user=${username} solo`);
        }
      } catch (_) {}
    });
  });

  // fallback offline scanner
  setInterval(async () => {
    try {
      // (We can’t do this purely here without raw SQL; routes keep last_seen fresh)
      // This module relies on db.updateLastSeen being called by heartbeat/routes,
      // and your server eviction loop handling removal + roster broadcasts.
      // If you want this module to own fallback offline too, inject a db.findStaleSince(sec).
    } catch (e) {
      console.warn("offline fallback scan failed:", e?.message);
    }
  }, 15_000);

  return {
    // For routes to move sockets after DB changes:
    async moveUserSocketToParty(username, partyId) {
      try {
        const rows = await db.runQuery(
          "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
          [username]
        );
        const sid = rows[0]?.socket_id;
        if (!sid) return;
        const sock = io.sockets.sockets.get(sid);
        if (!sock) return;
        for (const room of sock.rooms)
          if (room.startsWith("party:")) sock.leave(room);
        sock.join(`party:${partyId}`);
        sock.emit("party:joined", { partyId });
      } catch (e) {
        console.warn("moveUserSocketToParty failed:", e?.message);
      }
    },
    async moveUserSocketToLobby(username) {
      try {
        const rows = await db.runQuery(
          "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
          [username]
        );
        const sid = rows[0]?.socket_id;
        if (!sid) return;
        const sock = io.sockets.sockets.get(sid);
        if (!sock) return;
        for (const room of sock.rooms)
          if (room.startsWith("party:")) sock.leave(room);
        sock.join("lobby");
        sock.emit("party:joined", { partyId: null });
      } catch (e) {
        console.warn("moveUserSocketToLobby failed:", e?.message);
      }
    },
    // Cancel any active matchmaking when party composition changes (e.g., someone joins)
    async cancelPartyQueue(partyId, userId = null) {
      try {
        if (partyId) {
          try {
            await mm.queueLeave({ partyId, userId: null });
          } catch (_) {}
          io.to(`party:${partyId}`).emit("match:cancelled");
          console.log(
            `[cancel][party] composition changed -> cancelled party ${partyId}`
          );
        }
        if (userId) {
          try {
            await mm.queueLeave({ partyId: null, userId });
            console.log(
              `[cancel][solo] user ${userId} solo ticket, if any, removed`
            );
          } catch (_) {}
        }
      } catch (e) {
        console.warn("cancelPartyQueue failed:", e?.message);
      }
    },
  };
}

module.exports = { initSocket };
