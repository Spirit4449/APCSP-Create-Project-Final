const path = require("path");
const bcrypt = require("bcrypt");
const { capacityFromMode } = require("../helpers/utils");
const {
  selectPartyById,
  emitRoster,
  updateOrDeleteParty,
} = require("../helpers/party");

function registerRoutes({ app, io, db, auth, pageRoot, distDir }) {
  const { getOrCreateCurrentUser, requireCurrentUser, isGuest } = auth;

  app.get("/partyfull", (req, res) => {
    res.sendFile(path.join(pageRoot, "Errors", "partyfull.html"));
  });
  app.get("/cannotjoin", (req, res) => {
    res.sendFile(path.join(pageRoot, "Errors", "cannotjoin.html"));
  });
  app.get("/partynotfound", (req, res) => {
    res.sendFile(path.join(pageRoot, "Errors", "partynotfound.html"));
  });
  app.get("/signed-out", (req, res) => {
    res.sendFile(path.join(pageRoot, "Errors", "signed-out.html"));
  });
  app.get("/signup", (req, res) => {
    res.sendFile(path.join(distDir, "signup.html"));
  });
  app.get("/login", (req, res) => {
    res.sendFile(path.join(distDir, "login.html"));
  });

  app.get("/", async (req, res) => {
    try {
      const [user] = await getOrCreateCurrentUser(req, res, {
        autoCreate: true,
      });
      const rows = await db.runQuery(
        "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
        [user?.name]
      );
      if (rows.length) return res.redirect(`/party/${rows[0].party_id}`);
    } catch (e) {
      console.error(e);
    }
    res.sendFile(path.join(pageRoot, "index.html"));
  });

  app.get("/party/:partyid", async (req, res) => {
    try {
      const rows = await db.runQuery(
        "SELECT 1 FROM parties WHERE party_id = ? LIMIT 1",
        [req.params.partyid]
      );
      if (!rows.length)
        return res.sendFile(path.join(distDir, "Errors", "partynotfound.html"));
    } catch (e) {
      console.error(e);
    }
    res.sendFile(path.join(pageRoot, "index.html"));
  });

  app.post("/status", async (req, res) => {
    try {
      const [user, userType] = await getOrCreateCurrentUser(req, res, {
        autoCreate: true,
      });
      const partyRows = await db.runQuery(
        "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
        [user.name]
      );
      res.json({
        success: true,
        userData: user,
        newlyCreated: userType === "new",
        guest: isGuest(user),
        party_id: partyRows[0]?.party_id ?? null,
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/me", async (req, res) => {
    try {
      const user = await requireCurrentUser(req, res);
      if (!user)
        return res.json({ authenticated: false, name: "Guest", isGuest: true });
      res.json({
        authenticated: true,
        name: user.name,
        isGuest: isGuest(user),
        userId: user.user_id,
      });
    } catch (e) {
      res.json({ authenticated: false, name: "Guest", isGuest: true });
    }
  });

  app.post("/create-party", async (req, res) => {
    try {
      const user = await requireCurrentUser(req, res);
      if (!user) return res.status(401).json({ error: "Not authenticated" });
      const username = user.name;

      const partyId = await db.withTransaction(async (conn, q) => {
        await q("DELETE FROM party_members WHERE name = ?", [username]);
        const insertParty = await q(
          "INSERT INTO parties (status, mode, map) VALUES (?, ?, ?)",
          ["lobby", 1, 1]
        );
        const newPartyId = insertParty.insertId;
        await q(
          "INSERT INTO party_members (party_id, name, team) VALUES (?, ?, ?)",
          [newPartyId, username, "team1"]
        );
        return newPartyId;
      });

      console.log(`[party] Party ${partyId} created by ${username}`);
      res.status(201).json({ partyId });
    } catch (err) {
      console.error(`[party] Failed to create party:`, err.message);
      if (err?.code === "ER_DUP_ENTRY")
        return res.status(409).json({ error: "Duplicate membership" });
      res.status(500).json({ error: "Failed to create party" });
    }
  });

  app.post("/partydata", async (req, res) => {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;
    const partyIdRaw = req.body?.partyId;
    const partyId = Number(partyIdRaw);
    if (!Number.isFinite(partyId) || partyId <= 0) {
      return res.status(400).json({ error: "partyId is required" });
    }
    let conn;
    try {
      conn = await db.pool.getConnection();
      await conn.beginTransaction();

      const [partyRows] = await conn.query(
        "SELECT * FROM parties WHERE party_id = ? FOR UPDATE",
        [partyId]
      );
      if (!partyRows.length) {
        await conn.rollback();
        return res
          .status(404)
          .json({ error: "Party not found", redirect: "/partynotfound" });
      }
      const party = partyRows[0];
      const { total: totalCap, perTeam: perTeamCap } = capacityFromMode(
        party.mode
      );

      const [existing] = await conn.query(
        "SELECT team FROM party_members WHERE party_id = ? AND name = ? LIMIT 1",
        [partyId, username]
      );

      if (!existing.length) {
        const [[{ cnt: currentCount }]] = await conn.query(
          "SELECT COUNT(*) AS cnt FROM party_members WHERE party_id = ? FOR UPDATE",
          [partyId]
        );
        if (currentCount >= totalCap) {
          await conn.rollback();
          console.log(`[party] join-reject`, {
            username,
            partyId,
            currentCount,
            totalCap,
          });
          return res
            .status(409)
            .json({ error: "Party is full", redirect: "/partyfull" });
        }

        const [teamCounts] = await conn.query(
          "SELECT team, COUNT(*) AS c FROM party_members WHERE party_id = ? GROUP BY team FOR UPDATE",
          [partyId]
        );
        const map = new Map(teamCounts.map((r) => [r.team, Number(r.c)]));
        const team1Count = map.get("team1") || 0;
        const team2Count = map.get("team2") || 0;

        let chosen = team1Count > team2Count ? "team2" : "team1";
        if (
          (chosen === "team1" && team1Count >= perTeamCap) ||
          (chosen === "team2" && team2Count >= perTeamCap)
        ) {
          chosen = chosen === "team1" ? "team2" : "team1";
        }
        if (
          (chosen === "team1" && team1Count >= perTeamCap) ||
          (chosen === "team2" && team2Count >= perTeamCap)
        ) {
          await conn.rollback();
          return res
            .status(409)
            .json({ error: "Party is full", redirect: "/partyfull" });
        }

        await conn.query(
          "DELETE FROM party_members WHERE name = ? AND party_id <> ?",
          [username, partyId]
        );
        try {
          await conn.query(
            "INSERT INTO party_members (party_id, name, team, joined_at) VALUES (?, ?, ?, NOW())",
            [partyId, username, chosen]
          );
          console.log(`[party] join`, { username, partyId, team: chosen });
        } catch (e) {
          if (!(e && e.code === "ER_DUP_ENTRY")) {
            await conn.rollback();
            return res.status(500).json({ error: "Could not join party" });
          }
        }
      } else {
        console.log(`[party] already-in`, { username, partyId });
      }

      await conn.query(
        "UPDATE party_members SET last_seen = NOW() WHERE party_id = ? AND name = ?",
        [partyId, username]
      );

      const [memberRows] = await conn.query(
        `SELECT pm.name, pm.team, u.char_class, u.status
           FROM party_members pm
           LEFT JOIN users u ON u.name = pm.name
          WHERE pm.party_id = ?
          ORDER BY pm.joined_at, pm.name`,
        [partyId]
      );

      await conn.commit();

      await req.app.locals.socketApi.moveUserSocketToParty(username, partyId);
      await emitRoster(io, partyId, party, memberRows);

      res.json({
        party,
        capacity: { total: totalCap, perTeam: perTeamCap },
        members: memberRows,
        viewer: username,
      });
    } catch (err) {
      try {
        if (conn) await conn.rollback();
      } catch {}
      console.error("[party] /partydata error", err);
      res.status(500).json({ error: "Internal error" });
    } finally {
      if (conn) conn.release();
    }
  });

  app.post("/party-members", async (req, res) => {
    try {
      const user = await requireCurrentUser(req, res);
      if (!user) return res.status(401).json({ error: "Not authenticated" });
      const { partyId } = req.body;
      if (!partyId) return res.status(400).json({ error: "Party ID required" });
      const membership = await db.runQuery(
        "SELECT 1 FROM party_members WHERE name = ? AND party_id = ? LIMIT 1",
        [user.name, partyId]
      );
      if (!membership.length)
        return res.status(403).json({ error: "Not a member of this party" });
      const party = await selectPartyById(db, partyId);
      if (!party) return res.status(404).json({ error: "Party not found" });
      const members = await db.fetchPartyMembersDetailed(partyId);
      res.json({
        partyId: party.party_id,
        mode: party.mode,
        map: party.map,
        members,
        membersCount: members.length,
        capacity: capacityFromMode(party.mode),
      });
    } catch (err) {
      console.error("[party] /party-members error", err);
      res.status(500).json({ error: "Internal error" });
    }
  });

  app.post("/leave-party", async (req, res) => {
    try {
      const user = await requireCurrentUser(req, res);
      if (!user) return res.status(401).json({ error: "Not authenticated" });
      const username = user.name;
      let partyId = req.body?.partyId;
      if (!partyId) {
        const rows = await db.runQuery(
          "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
          [username]
        );
        if (!rows.length)
          return res.json({ success: true, left: false, deleted: false });
        partyId = rows[0].party_id;
      }
      const del = await db.runQuery(
        "DELETE FROM party_members WHERE party_id = ? AND name = ?",
        [partyId, username]
      );
      if (!del?.affectedRows)
        return res.json({ success: true, left: false, deleted: false });
      await req.app.locals.socketApi.moveUserSocketToLobby(username);
      const deleted = await updateOrDeleteParty(io, db, partyId);
      console.log(
        `[party] ${username} left party ${partyId}, party deleted: ${deleted}`
      );
      res.json({ success: true, left: true, deleted });
    } catch (e) {
      console.error("/leave-party", e);
      res.status(500).json({ error: "Internal error" });
    }
  });

  // Auth
  const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,14}$/;
  const MIN_PW = 6;
  const MAX_PW = 32;
  const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 12;

  app.post("/signup", async (req, res) => {
    try {
      let { username, password } = req.body || {};
      username = typeof username === "string" ? username.trim() : "";
      password = typeof password === "string" ? password : "";
      if (!username || !password) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Username and password are required.",
          });
      }
      if (!USERNAME_RE.test(username)) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Username must be 3-14 chars: letters, numbers, _ . - only.",
          });
      }
      if (password.length < MIN_PW || password.length > MAX_PW) {
        return res
          .status(400)
          .json({
            success: false,
            error: `Password must be ${MIN_PW}-${MAX_PW} characters.`,
          });
      }
      const user = await requireCurrentUser(req, res);
      if (!user)
        return res
          .status(400)
          .json({ success: false, error: "Guest session not found." });
      if (user.expires_at === null)
        return res
          .status(400)
          .json({
            success: false,
            error: "This account is already permanent.",
          });
      const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      try {
        const result = await db.runQuery(
          `UPDATE users
             SET name = ?, password = ?, expires_at = NULL
           WHERE user_id = ?`,
          [username, hash, user.user_id]
        );
        if (!result || result.affectedRows !== 1) {
          return res
            .status(409)
            .json({
              success: false,
              error: "Unable to complete signup. Please try again.",
            });
        }
      } catch (err) {
        if (err && (err.code === "ER_DUP_ENTRY" || err.errno === 1062)) {
          return res
            .status(409)
            .json({ success: false, error: "Username is already taken." });
        }
        throw err;
      }
      res.cookie(
        "display_name",
        username,
        app.locals?.DISPLAY_COOKIE_OPTS || {}
      );
      return res.status(201).json({ success: true, username });
    } catch (error) {
      console.error("[auth] signup error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      let { username, password } = req.body || {};
      username = typeof username === "string" ? username.trim() : "";
      password = typeof password === "string" ? password : "";
      if (!username || !password) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Username and password are required.",
          });
      }
      const rows = await db.runQuery(
        "SELECT user_id, name, password FROM users WHERE name = ? AND expires_at IS NULL LIMIT 1",
        [username]
      );
      if (rows.length === 0) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid username or password." });
      }
      const user = rows[0];
      const ok = await bcrypt.compare(password, user.password || "");
      if (!ok) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid username or password." });
      }
      res.cookie("user_id", String(user.user_id), {
        ...(app.locals?.SIGNED_COOKIE_OPTS || {}),
        maxAge: 1000 * 60 * 60 * 24 * 20,
      });
      res.cookie(
        "display_name",
        user.name,
        app.locals?.DISPLAY_COOKIE_OPTS || {}
      );
      return res
        .status(200)
        .json({ success: true, userId: user.user_id, username: user.name });
    } catch (err) {
      console.error("[auth] login error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/logout", (req, res) => {
    try {
      res.clearCookie("user_id", app.locals?.SIGNED_COOKIE_OPTS || {});
      res.clearCookie("display_name", app.locals?.DISPLAY_COOKIE_OPTS || {});
    } catch (_) {}
    return res.status(200).json({ success: true });
  });

  // Not found endpoint
  app.use((req, res) => {
    return res.sendFile(path.join(pageRoot, "Errors", "404.html"));
  });
}

module.exports = { registerRoutes };
