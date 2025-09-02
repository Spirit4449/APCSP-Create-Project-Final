// socket.js
const cookie = require("cookie");
const cookieSignature = require("cookie-signature");

const HEARTBEAT_SEC = 60;          // client sends every 60s (fallback)
const OFFLINE_FALLBACK_SEC = 120;  // if no heartbeat for 2 minutes, mark offline
const DISCONNECT_GRACE_MS = 3000;  // avoid flicker on reloads

// Maps to manage multi-tab presence and quick reloads
const activeConnections = new Map(); // name -> count
const pendingOffline = new Map();    // name -> timeoutId

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
      const userIdStr = readSignedCookieFromHandshake(socket, "user_id", COOKIE_SECRET);
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

    // count this connection (multi-tab safe) and mark online with party notify
    if (username) {
      const t = pendingOffline.get(username);
      if (t) { clearTimeout(t); pendingOffline.delete(username); }
      const cnt = (activeConnections.get(username) || 0) + 1;
      activeConnections.set(username, cnt);

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
        await db.setUserStatus(uname, "online");
      } catch (e) {
        console.warn("heartbeat error:", e?.message);
      }
    });

    // simple party chat example
    socket.on("party:chat", (msg, ack) => {
      const text = (typeof msg === "string" ? msg : msg?.text || "").slice(0, 400);
      if (!text) return ack && ack({ ok: false, error: "Empty" });
      const room = currentPartyRoom(socket) || "lobby";
      io.to(room).emit("party:chat", { from: username || "Guest", text, ts: Date.now() });
      ack && ack({ ok: true });
    });

    socket.on("disconnect", async () => {
      try {
        if (userId) await db.clearUserSocketIfMatch(userId, socket.id);
      } catch (_) {}

      if (!username) return;

      const left = (activeConnections.get(username) || 1) - 1;
      if (left <= 0) {
        activeConnections.delete(username);
        const timer = setTimeout(async () => {
          if (!activeConnections.has(username)) await setPresence(username, "offline");
          pendingOffline.delete(username);
        }, DISCONNECT_GRACE_MS);
        pendingOffline.set(username, timer);
      } else {
        activeConnections.set(username, left);
      }
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
        const rows = await require("./sql").runQuery(
          "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
          [username]
        );
        const sid = rows[0]?.socket_id;
        if (!sid) return;
        const sock = io.sockets.sockets.get(sid);
        if (!sock) return;
        for (const room of sock.rooms) if (room.startsWith("party:")) sock.leave(room);
        sock.join(`party:${partyId}`);
        sock.emit("party:joined", { partyId });
      } catch (e) {
        console.warn("moveUserSocketToParty failed:", e?.message);
      }
    },
    async moveUserSocketToLobby(username) {
      try {
        const rows = await require("./sql").runQuery(
          "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
          [username]
        );
        const sid = rows[0]?.socket_id;
        if (!sid) return;
        const sock = io.sockets.sockets.get(sid);
        if (!sock) return;
        for (const room of sock.rooms) if (room.startsWith("party:")) sock.leave(room);
        sock.join("lobby");
        sock.emit("party:joined", { partyId: null });
      } catch (e) {
        console.warn("moveUserSocketToLobby failed:", e?.message);
      }
    },
  };
}

module.exports = { initSocket };
