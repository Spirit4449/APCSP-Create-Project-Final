// server.js

// ---------------------------
// Imports & Setup
// ---------------------------
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const {
  DEFAULT_CHARACTER,
  LEVEL_CAP,
  defaultCharacterList,
  upgradePrice,
  unlockPrice,
} = require("./src/lib/characterStats");

const {
  pool,
  runQuery,
  updateLastSeen,
  fetchPartyMembersDetailed,
} = require("./sql");

const { initSocket } = require("./socket");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3002;

// ---------------------------
// Config
// ---------------------------
const IS_PROD = process.env.NODE_ENV === "production";
const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  `dev-insecure-${Math.random().toString(36).slice(2)}-${Date.now()}`;

const SIGNED_COOKIE_OPTS = { httpOnly: true, sameSite: "lax", secure: IS_PROD, signed: true };
const DISPLAY_COOKIE_OPTS = { sameSite: "lax", secure: IS_PROD };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

// Webpack dev (as you had)
const config = require("./webpack.config.js");
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath, serverSideRender: false }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, "dist")));

// ---------------------------
// Helpers (users & cookies)
// ---------------------------
function randomString(length, numbersOnly = false) {
  const letters = numbersOnly ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

async function createGuestAndSetCookies(res) {
  const guestName = `Guest${randomString(6, true)}`;
  const expiresAtMs = Date.now() + 2 * 60 * 60 * 1000;
  const charLevelsJson = JSON.stringify(defaultCharacterList());

  const result = await runQuery(
    "INSERT INTO users (name, char_class, status, expires_at, char_levels) VALUES (?, ?, ?, ?, ?)",
    [guestName, DEFAULT_CHARACTER, "lobby", new Date(expiresAtMs), charLevelsJson]
  );
  const userId = result.insertId;
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [userId]);
  const user = rows[0];

  res.cookie("user_id", String(userId), { ...SIGNED_COOKIE_OPTS, maxAge: 1000 * 60 * 60 * 24 * 30 });
  res.cookie("display_name", user.name, { ...DISPLAY_COOKIE_OPTS, expires: new Date(expiresAtMs) });
  return user;
}

async function getOrCreateCurrentUser(req, res, { autoCreate = true } = {}) {
  const id = req.signedCookies?.user_id;
  if (id) {
    const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [id]);
    if (rows.length > 0) return rows[0];
  }
  if (!autoCreate) return null;
  return await createGuestAndSetCookies(res);
}

async function requireCurrentUser(req, res) {
  const id = req.signedCookies?.user_id;
  if (!id) return null;
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [id]);
  return rows[0] || null;
}
function isGuest(userRow) { return userRow?.expires_at !== null && userRow?.expires_at !== undefined; }

// ---------------------------
// Capacity helper
// ---------------------------
function capacityFromMode(mode) {
  const m = Number(mode) || 1;
  const perTeam = Math.max(1, Math.min(3, m));
  return { total: perTeam * 2, perTeam };
}
// ---------------------------
// Static pages
// ---------------------------

app.get("/partyfull", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/partyfull.html"));
});
app.get("/cannotjoin", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/cannotjoin.html"));
});
app.get("/partynotfound", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/partynotfound.html"));
});
app.get("/signed-out", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/signed-out.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/login.html"));
});
// ---------------------------
// Routes
// ---------------------------
app.get("/", async (req, res) => {
  try {
    const user = await getOrCreateCurrentUser(req, res, { autoCreate: true });
    const rows = await runQuery("SELECT party_id FROM party_members WHERE name = ? LIMIT 1", [user?.name]);
    if (rows.length) return res.redirect(`/party/${rows[0].party_id}`);
  } catch (e) { console.error(e); }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/party/:partyid", async (req, res) => {
  try {
    const rows = await runQuery("SELECT 1 FROM parties WHERE party_id = ? LIMIT 1", [req.params.partyid]);
    if (!rows.length) return res.sendFile(path.join(__dirname, "dist", "/Errors/partynotfound.html"));
  } catch (e) { console.error(e); }
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/status", async (req, res) => {
  try {
    const user = await getOrCreateCurrentUser(req, res, { autoCreate: true });
    const partyRows = await runQuery("SELECT party_id FROM party_members WHERE name = ? LIMIT 1", [user.name]);
    res.json({ success: true, userData: user, guest: isGuest(user), party_id: partyRows[0]?.party_id ?? null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/me", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.json({ authenticated: false, name: "Guest", isGuest: true });
    res.json({ authenticated: true, name: user.name, isGuest: isGuest(user), userId: user.user_id });
  } catch (e) { res.json({ authenticated: false, name: "Guest", isGuest: true }); }
});

app.post("/create-party", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;

    await runQuery("START TRANSACTION");
    await runQuery("DELETE FROM party_members WHERE name = ?", [username]);
    const { insertId: partyId } = await runQuery(
      "INSERT INTO parties (status, mode, map) VALUES (?, ?, ?)", ["lobby", 1, 1]
    );
    await runQuery("INSERT INTO party_members (party_id, name, team) VALUES (?, ?, ?)",
      [partyId, username, "team1"]);
    await runQuery("COMMIT");

    res.status(201).json({ partyId });
  } catch (err) {
    try { await runQuery("ROLLBACK"); } catch {}
    if (err?.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "Duplicate membership" });
    res.status(500).json({ error: "Failed to create party" });
  }
});

app.post("/partydata", async (req, res) => {
  const user = await requireCurrentUser(req, res);
  if (!user) return res.status(401).json({ error: "Not authenticated" });

  const username = user.name;
  const partyId = req.body?.partyId;
  if (!partyId) return res.status(400).json({ error: "partyId is required" });

  try { await updateLastSeen(partyId, username); } catch {}

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const [partyRows] = await conn.query("SELECT * FROM parties WHERE party_id = ? FOR UPDATE", [partyId]);
    if (!partyRows.length) {
      await conn.rollback();
      return res.status(404).sendFile(path.join(__dirname, "dist/Errors", "partynotfound.html"));
    }
    const party = partyRows[0];
    const { total: totalCap, perTeam: perTeamCap } = capacityFromMode(party.mode);

    const [existing] = await conn.query(
      "SELECT team FROM party_members WHERE party_id = ? AND name = ? LIMIT 1", [partyId, username]
    );

    if (!existing.length) {
      const [[{ cnt: currentCount }]] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM party_members WHERE party_id = ? FOR UPDATE", [partyId]
      );
      if (currentCount >= totalCap) {
        await conn.rollback();
        return res.status(409).sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
      }

      const [teamCounts] = await conn.query(
        "SELECT team, COUNT(*) AS c FROM party_members WHERE party_id = ? GROUP BY team FOR UPDATE",
        [partyId]
      );
      const map = new Map(teamCounts.map(r => [r.team, Number(r.c)]));
      const team1Count = map.get("team1") || 0;
      const team2Count = map.get("team2") || 0;

      let chosen = team1Count > team2Count ? "team2" : "team1";
      if ((chosen === "team1" && team1Count >= perTeamCap) ||
          (chosen === "team2" && team2Count >= perTeamCap)) {
        chosen = chosen === "team1" ? "team2" : "team1";
      }
      if ((chosen === "team1" && team1Count >= perTeamCap) ||
          (chosen === "team2" && team2Count >= perTeamCap)) {
        await conn.rollback();
        return res.status(409).sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
      }

      await conn.query("DELETE FROM party_members WHERE name = ? AND party_id <> ?", [username, partyId]);
      try {
        await conn.query(
          "INSERT INTO party_members (party_id, name, team, joined_at) VALUES (?, ?, ?, NOW())",
          [partyId, username, chosen]
        );
      } catch (e) {
        if (!(e && e.code === "ER_DUP_ENTRY")) {
          await conn.rollback();
          return res.status(500).json({ error: "Could not join party" });
        }
      }
    }

    await conn.query("UPDATE party_members SET last_seen = NOW() WHERE party_id = ? AND name = ?", [partyId, username]);

    const [memberRows] = await conn.query(
      `SELECT pm.name, pm.team, u.char_class, u.status
         FROM party_members pm
         LEFT JOIN users u ON u.name = pm.name
        WHERE pm.party_id = ?
        ORDER BY pm.joined_at, pm.name`,
      [partyId]
    );

    await conn.commit();

    // Move socket & broadcast
    await socketApi.moveUserSocketToParty(username, partyId);
    io.to(`party:${partyId}`).emit("party:members", {
      partyId,
      mode: party.mode,
      map: party.map,
      capacity: { total: totalCap, perTeam: perTeamCap },
      members: memberRows,
    });

    res.json({ party, capacity: { total: totalCap, perTeam: perTeamCap }, members: memberRows, viewer: username });
  } catch (err) {
    try { if (conn) await conn.rollback(); } catch {}
    console.error("POST /partydata", err);
    res.status(500).json({ error: "Internal error" });
  } finally { if (conn) conn.release(); }
});

app.post("/leave-party", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;

    let partyId = req.body?.partyId;
    if (!partyId) {
      const rows = await runQuery("SELECT party_id FROM party_members WHERE name = ? LIMIT 1", [username]);
      if (!rows.length) return res.json({ success: true, left: false, deleted: false });
      partyId = rows[0].party_id;
    }

    const del = await runQuery("DELETE FROM party_members WHERE party_id = ? AND name = ?", [partyId, username]);
    if (!del?.affectedRows) return res.json({ success: true, left: false, deleted: false });

    const remaining = await runQuery("SELECT 1 FROM party_members WHERE party_id = ? LIMIT 1", [partyId]);
    let deleted = false;
    if (!remaining.length) {
      const delParty = await runQuery("DELETE FROM parties WHERE party_id = ?", [partyId]);
      deleted = !!delParty && delParty.affectedRows === 1;
    }

    await socketApi.moveUserSocketToLobby(username);

    if (!deleted) {
      const members = await fetchPartyMembersDetailed(partyId);
      const [partyRows] = await pool.query("SELECT * FROM parties WHERE party_id = ? LIMIT 1", [partyId]);
      io.to(`party:${partyId}`).emit("party:members", {
        partyId,
        mode: partyRows?.[0]?.mode,
        map: partyRows?.[0]?.map,
        members,
      });
    }

    res.json({ success: true, left: true, deleted });
  } catch (e) {
    console.error("/leave-party", e);
    res.status(500).json({ error: "Internal error" });
  }
});

// ---------------------------
// Signup / Login
// ---------------------------

const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,14}$/;
const MIN_PW = 6;
const MAX_PW = 32;

app.post("/signup", async (req, res) => {
  try {
    let { username, password } = req.body || {};
    username = typeof username === "string" ? username.trim() : "";
    password = typeof password === "string" ? password : "";

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password are required." });
    }
    if (!USERNAME_RE.test(username)) {
      return res.status(400).json({
        success: false,
        error: "Username must be 3-14 chars: letters, numbers, _ . - only.",
      });
    }
    if (password.length < MIN_PW || password.length > MAX_PW) {
      return res.status(400).json({
        success: false,
        error: `Password must be ${MIN_PW}-${MAX_PW} characters.`,
      });
    }

    const user = await requireCurrentUser(req, res);
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Guest session not found." });

    if (user.expires_at === null) {
      return res
        .status(400)
        .json({ success: false, error: "This account is already permanent." });
    }

    const hash = await bcrypt.hash(password, 12);

    try {
      const result = await runQuery(
        `UPDATE users
           SET name = ?, password = ?, expires_at = NULL
         WHERE user_id = ?`,
        [username, hash, user.user_id]
      );
      if (!result || result.affectedRows !== 1) {
        return res.status(409).json({
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

    res.cookie("display_name", username, DISPLAY_COOKIE_OPTS);
    return res.status(201).json({ success: true, username });
  } catch (error) {
    console.error("Error signing up user:", error);
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
        .json({ success: false, error: "Username and password are required." });
    }

    const rows = await runQuery(
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
      ...SIGNED_COOKIE_OPTS,
      maxAge: 1000 * 60 * 60 * 24 * 20, // 20 days
    });
    res.cookie("display_name", user.name, DISPLAY_COOKIE_OPTS);

    return res.status(200).json({
      success: true,
      userId: user.user_id,
      username: user.name,
    });
  } catch (err) {
    console.error("Error in /login:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("user_id", SIGNED_COOKIE_OPTS);
    res.clearCookie("display_name", DISPLAY_COOKIE_OPTS);
  } catch (_) {}
  return res.status(200).json({ success: true });
});

// ---------------------------
// Game economy endpoints
// ---------------------------

app.post("/upgrade", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;
    const character = req.body.character;

    if (
      typeof character !== "string" ||
      !/^[a-zA-Z0-9_:-]{1,32}$/.test(character)
    ) {
      return res.status(400).json({ error: "Invalid character key" });
    }

    const jsonPath = `$.${character}`;

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [rows] = await conn.execute(
        "SELECT coins, JSON_EXTRACT(char_levels, ?) AS lvl FROM users WHERE name = ? FOR UPDATE",
        [jsonPath, username]
      );
      if (rows.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: "User not found" });
      }

      const dbCoins = Number(rows[0].coins);
      const dbLevel = rows[0].lvl == null ? 0 : Number(rows[0].lvl);

      if (dbLevel >= LEVEL_CAP) {
        await conn.rollback();
        return res.status(409).json({ error: "Level cap reached" });
      }

      const price = upgradePrice(dbLevel);
      if (!Number.isFinite(price) || price < 0) {
        await conn.rollback();
        return res.status(500).json({ error: "Pricing error" });
      }
      if (dbCoins < price) {
        await conn.rollback();
        return res.status(403).json({ error: "Not enough coins" });
      }

      const [result] = await conn.execute(
        `
        UPDATE users
        SET
          coins = coins - ?,
          char_levels = JSON_SET(char_levels, ?, ?)
        WHERE name = ?
          AND coins >= ?
          AND COALESCE(JSON_EXTRACT(char_levels, ?), 0) = ?
        `,
        [price, jsonPath, dbLevel + 1, username, price, jsonPath, dbLevel]
      );

      if (result.affectedRows !== 1) {
        await conn.rollback();
        return res.status(409).json({ error: "Upgrade conflict, retry" });
      }

      await conn.commit();

      console.log(
        `${username} upgrade ${character} to level ${dbLevel + 1} for ${price} coins`
      );
      return res
        .status(200)
        .json({ success: true, newLevel: dbLevel + 1, spent: price });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

app.post("/buy", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;
    const character = req.body.character;

    if (
      typeof character !== "string" ||
      !/^[a-zA-Z0-9_:-]{1,32}$/.test(character)
    ) {
      return res.status(400).json({ error: "Invalid character key" });
    }

    const price = unlockPrice(character);
    if (price === undefined) {
      return res.status(400).json({ error: "Character cannot be unlocked" });
    }
    if (!Number.isFinite(price) || price < 0) {
      return res.status(500).json({ error: "Pricing error" });
    }

    const jsonPath = `$.${character}`;
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute(
        `
        UPDATE users
        SET
          gems = gems - ?,
          char_levels = JSON_SET(COALESCE(char_levels, JSON_OBJECT()), ?, 1)
        WHERE name = ?
          AND gems >= ?
          AND IFNULL(CAST(JSON_UNQUOTE(JSON_EXTRACT(char_levels, ?)) AS UNSIGNED), 0) < 1
        `,
        [price, jsonPath, username, price, jsonPath]
      );

      if (result.affectedRows !== 1) {
        const [rows] = await conn.execute(
          `SELECT gems,
                  IFNULL(CAST(JSON_UNQUOTE(JSON_EXTRACT(char_levels, ?)) AS UNSIGNED), 0) AS lvl
           FROM users WHERE name = ?`,
          [jsonPath, username]
        );
        if (rows.length === 0)
          return res.status(404).json({ error: "User not found" });
        const { gems, lvl } = rows[0];
        if (lvl >= 1)
          return res.status(409).json({ error: "Character already unlocked" });
        if (Number(gems) < price)
          return res.status(403).json({ error: "Not enough gems" });
        return res.status(409).json({ error: "Unlock conflict, please retry" });
      }

      const [after] = await conn.execute(
        `SELECT gems,
                CAST(JSON_UNQUOTE(JSON_EXTRACT(char_levels, ?)) AS UNSIGNED) AS lvl
         FROM users WHERE name = ?`,
        [jsonPath, username]
      );
      const newGems = after[0]?.gems;
      const newLevel = after[0]?.lvl ?? 1;

      console.log(`${username} unlocked ${character} for ${price} gems`);
      return res.status(200).json({
        success: true,
        character,
        newLevel,
        spent: price,
        gems: newGems,
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

// ---------------------------
// Not found endpoint
// ---------------------------

app.use((req, res, next) => {
  return res.sendFile(path.join(__dirname, "dist", "/Errors/404.html"));
});

// ---------------------------
// Socket bootstrap
// ---------------------------
const dbInject = require("./sql");
const socketApi = initSocket({
  io,
  COOKIE_SECRET,
  db: {
    getUserById: dbInject.getUserById,
    getPartyIdByName: dbInject.getPartyIdByName,
    fetchPartyMembersDetailed: dbInject.fetchPartyMembersDetailed,
    setUserStatus: dbInject.setUserStatus,
    setUserSocketId: dbInject.setUserSocketId,
    clearUserSocketIfMatch: dbInject.clearUserSocketIfMatch,
    updateLastSeen: dbInject.updateLastSeen,
  },
});

// ---------------------------
// Server start
// ---------------------------
(async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
  } catch (e) {
    console.error("❌ Failed to connect to DB:", e);
    process.exit(1);
  }
})();
