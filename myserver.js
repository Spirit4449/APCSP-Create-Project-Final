// server.js

// ---------------------------
// Imports & Configuration
// ---------------------------

// File Imports
const {
  DEFAULT_CHARACTER,
  LEVEL_CAP,
  defaultCharacterList,
  getAllCharacters,
  upgradePrice,
  unlockPrice,
} = require("./src/lib/characterStats");

// Database
const { pool, runQuery, deleteEmptyParties, updateLastSeen } = require("./sql");

// Setup server and requirements
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3002;

// Parsers & Security
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

// Require a cookie signing secret (integrity)
const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  `dev-insecure-${Math.random().toString(36).slice(2)}-${Date.now()}`;
if (!process.env.COOKIE_SECRET) {
  console.warn(
    "⚠️  COOKIE_SECRET not set. Using a temporary dev secret (cookies will invalidate on restart)."
  );
}

// Express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET)); // IMPORTANT: signed cookies enabled

// Root: send user to their party if they're in one; otherwise show lobby
app.get("/", async (req, res) => {
  try {
    const user = await getOrCreateCurrentUser(req, res, { autoCreate: true });
    const username = user?.name;
    if (username) {
      const rows = await runQuery(
        "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
        [username]
      );
      if (rows && rows.length > 0) {
        const partyId = rows[0].party_id;
        return res.redirect(`/party/${partyId}`);
      }
    }
  } catch (e) {
    console.error("GET / error:", e);
  }
  return res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Serve files from dist
app.use(express.static(path.join(__dirname, "dist")));

// ---------------------------
// Cookie Helpers
// ---------------------------

const IS_PROD = process.env.NODE_ENV === "production";
console.log(IS_PROD ? "💎 Production mode" : "🔥 Development mode");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    serverSideRender: false,
  })
);
app.use(webpackHotMiddleware(compiler));
console.log("📦 USING WEBPACK DEV MIDDLEWARE");

const SIGNED_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: IS_PROD,
  signed: true,
};

const DISPLAY_COOKIE_OPTS = {
  sameSite: "lax",
  secure: IS_PROD,
};

// Create a random short suffix
function randomString(length, numbersOnly = false) {
  let letters = numbersOnly
    ? "0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return out;
}

// Create a brand-new guest row and set cookies
async function createGuestAndSetCookies(res) {
  const guestName = `Guest${randomString(6, true)}`;
  const expiresAtMs = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  const expiresAt = new Date(expiresAtMs);

  const charLevelsJson = JSON.stringify(defaultCharacterList());

  // Insert guest row
  const result = await runQuery(
    "INSERT INTO users (name, char_class, status, expires_at, char_levels) VALUES (?, ?, ?, ?, ?)",
    [guestName, DEFAULT_CHARACTER, "lobby", new Date(expiresAtMs), charLevelsJson]
  );
  const userId = result.insertId;

  // Fetch the full row
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [
    userId,
  ]);
  const fullUser = rows[0];

  // Set cookies
  res.cookie("user_id", String(userId), {
    ...SIGNED_COOKIE_OPTS,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.cookie("display_name", fullUser.name, {
    ...DISPLAY_COOKIE_OPTS,
    expires: expiresAt,
  });

  return fullUser;
}

// Fetch current user from signed cookie; if missing/invalid and `autoCreate` is true, create a guest
async function getOrCreateCurrentUser(req, res, { autoCreate = true } = {}) {
  const id = req.signedCookies?.user_id;
  if (id) {
    const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [id]);
    if (rows.length > 0) return rows[0];
  }
  if (!autoCreate) return null;
  return await createGuestAndSetCookies(res);
}

// Strict getter: require a valid signed cookie & row, do NOT auto-create
async function requireCurrentUser(req, res) {
  const id = req.signedCookies?.user_id;
  if (!id) return null;
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [
    id,
  ]);
  if (rows.length === 0) return null;
  return rows[0];
}

// Convenience: guest if expires_at !== null
function isGuest(userRow) {
  return userRow?.expires_at !== null && userRow?.expires_at !== undefined;
}

// ---------------------------
// Health regen helpers (unchanged)
// ---------------------------

const REGEN_TICK_MS = 1500;
const REGEN_IDLE_DELAY_MS = 3000;
const REGEN_HIT_IDLE_DELAY_MS = 3000;
const REGEN_MIN_PER_TICK = 500;
const REGEN_FRIENDLY_STEP = 50;
const REGEN_MISSING_FRACTION_PER_TICK = 0.3;

function initGameHealth(gameObj) {
  try {
    for (const teamKey in gameObj) {
      const team = gameObj[teamKey];
      for (const idx in team) {
        const p = team[idx];
        const max = character.CHARACTER_HEALTH[p.character];
        p.maxHealth = typeof p.maxHealth === "number" ? p.maxHealth : max;
        p.currentHealth =
          typeof p.currentHealth === "number" ? p.currentHealth : p.maxHealth;
      }
    }
  } catch (e) {}
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
// Identity & Profile endpoints
// ---------------------------

app.post("/status", async (req, res) => {
  try {
    const user = await getOrCreateCurrentUser(req, res, { autoCreate: true });
    const username = user.name;

    const partyRows = await runQuery(
      "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
      [username]
    );

    return res.status(200).json({
      success: true,
      userData: user,
      guest: isGuest(user),
      party_id: partyRows.length > 0 ? partyRows[0].party_id : null,
    });
  } catch (error) {
    console.error("Error in /status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.get("/me", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) {
      return res.json({ authenticated: false, name: "Guest", isGuest: true });
    }
    return res.json({
      authenticated: true,
      name: user.name,
      isGuest: isGuest(user),
      userId: user.user_id,
    });
  } catch (e) {
    console.error("GET /me error:", e);
    return res.json({ authenticated: false, name: "Guest", isGuest: true });
  }
});

// ---------------------------
// Parties
// ---------------------------

app.post("/create-party", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;

    await runQuery("START TRANSACTION");

    // Leave old party (if any)
    await runQuery("DELETE FROM party_members WHERE name = ?", [username]);

    // Create party
    const { insertId: partyId } = await runQuery(
      "INSERT INTO parties (status, mode, map) VALUES (?, ?, ?)",
      ["lobby", 1, 1]
    );

    // Join party (team1 by default)
    await runQuery(
      "INSERT INTO party_members (party_id, name, team) VALUES (?, ?, ?)",
      [partyId, username, "team1"]
    );

    await runQuery("COMMIT");
    console.log("New party created by", username, partyId);
    return res.status(201).json({ partyId });
  } catch (err) {
    try {
      await runQuery("ROLLBACK");
    } catch {}
    console.error("create-party failed:", err && err.message);
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Duplicate membership" });
    }
    return res.status(500).json({ error: "Failed to create party" });
  }
});

app.get("/party/:partyid", async (req, res) => {
  try {
    const partyId = req.params.partyid;
    const rows = await runQuery(
      "SELECT 1 FROM parties WHERE party_id = ? LIMIT 1",
      [partyId]
    );
    if (!rows || rows.length === 0) {
      return res.sendFile(
        path.join(__dirname, "dist", "/Errors/partynotfound.html")
      );
    }
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  } catch (e) {
    console.error("GET /party/:partyid error:", e);
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
});

// capacity from mode
function capacityFromMode(mode) {
  const m = Number(mode) || 1;
  const perTeam = Math.max(1, Math.min(3, m));
  return { total: perTeam * 2, perTeam };
}

app.post("/partydata", async (req, res) => {
  const user = await requireCurrentUser(req, res);
  if (!user) return res.status(401).json({ error: "Not authenticated" });
  const username = user.name;
  const partyId = req.body?.partyId;
  if (!partyId) return res.status(400).json({ error: "partyId is required" });

  // bump activity as soon as party loads
  try { await updateLastSeen(partyId, username); } catch (_) {}

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1) Lock party row
    const [partyRows] = await conn.query(
      "SELECT * FROM parties WHERE party_id = ? FOR UPDATE",
      [partyId]
    );
    if (!partyRows || partyRows.length === 0) {
      await conn.rollback();
      return res
        .status(404)
        .sendFile(path.join(__dirname, "dist/Errors", "partynotfound.html"));
    }
    const party = partyRows[0];
    const { total: totalCap, perTeam: perTeamCap } = capacityFromMode(party.mode);

    // 2) Already a member?
    const [existing] = await conn.query(
      "SELECT team FROM party_members WHERE party_id = ? AND name = ? LIMIT 1",
      [partyId, username]
    );

    if (!existing || existing.length === 0) {
      // 3) Count current members + by team (locked)
      const [[{ cnt: currentCount }]] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM party_members WHERE party_id = ? FOR UPDATE",
        [partyId]
      );
      if (currentCount >= totalCap) {
        await conn.rollback();
        return res
          .status(409)
          .sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
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
          .sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
      }

      // 4) Remove other memberships and insert new one
      await conn.query(
        "DELETE FROM party_members WHERE name = ? AND party_id <> ?",
        [username, partyId]
      );
      try {
        await conn.query(
          "INSERT INTO party_members (party_id, name, team, joined_at) VALUES (?, ?, ?, NOW())",
          [partyId, username, chosen]
        );
      } catch (e) {
        if (!(e && e.code === "ER_DUP_ENTRY")) {
          await conn.rollback();
          console.error("Join insert failed:", e);
          return res.status(500).json({ error: "Could not join party" });
        }
      }
    }

    // 5) Mark last_seen for this viewer right now
    await conn.query(
      "UPDATE party_members SET last_seen = NOW() WHERE party_id = ? AND name = ?",
      [partyId, username]
    );

    // 6) Fetch members with char_class + status
    const [memberRows] = await conn.query(
      `SELECT pm.name, pm.team, u.char_class, u.status
         FROM party_members pm
         LEFT JOIN users u ON u.name = pm.name
        WHERE pm.party_id = ?
        ORDER BY pm.joined_at, pm.name`,
      [partyId]
    );

    await conn.commit();

    // 7) Move socket + broadcast roster
    try {
      const sRows = await runQuery(
        "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
        [username]
      );
      const sid = sRows[0]?.socket_id;
      if (sid) {
        const sock = io.sockets.sockets.get(sid);
        if (sock) {
          for (const room of sock.rooms) {
            if (room.startsWith("party:")) sock.leave(room);
          }
          sock.join(`party:${partyId}`);
          sock.emit("party:joined", { partyId });
        }
      }
      io.to(`party:${partyId}`).emit("party:members", {
        partyId,
        mode: party.mode,
        map: party.map,
        capacity: { total: totalCap, perTeam: perTeamCap },
        members: memberRows, // [{name, team, char_class, status}]
      });
    } catch (e) {
      console.warn("Socket move/broadcast failed in /partydata:", e?.message);
    }

    return res.json({
      party,
      capacity: { total: totalCap, perTeam: perTeamCap },
      members: memberRows,
      viewer: username,
    });
  } catch (err) {
    try { if (conn) await conn.rollback(); } catch {}
    console.error("Error in POST /partydata:", err);
    return res.status(500).json({ error: "Internal error" });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/leave-party", async (req, res) => {
  try {
    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    const username = user.name;

    // Use provided partyId or infer current
    let partyId = req.body?.partyId;
    if (!partyId) {
      const rows = await runQuery(
        "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
        [username]
      );
      if (!rows || rows.length === 0) {
        return res.json({ success: true, left: false, deleted: false });
      }
      partyId = rows[0].party_id;
    }

    // Remove membership
    const del = await runQuery(
      "DELETE FROM party_members WHERE party_id = ? AND name = ?",
      [partyId, username]
    );
    if (!del || del.affectedRows === 0) {
      return res.json({ success: true, left: false, deleted: false });
    }

    // Delete party if now empty
    const remaining = await runQuery(
      "SELECT 1 FROM party_members WHERE party_id = ? LIMIT 1",
      [partyId]
    );
    let deleted = false;
    if (!remaining || remaining.length === 0) {
      const delParty = await runQuery(
        "DELETE FROM parties WHERE party_id = ?",
        [partyId]
      );
      deleted = !!delParty && delParty.affectedRows === 1;
    }

    // Move leaver's socket to lobby and update the remaining party (if any)
    try {
      const sRows = await runQuery(
        "SELECT socket_id FROM users WHERE name = ? LIMIT 1",
        [username]
      );
      const sid = sRows[0]?.socket_id;
      if (sid) {
        const sock = io.sockets.sockets.get(sid);
        if (sock) {
          for (const room of sock.rooms) {
            if (room.startsWith("party:")) sock.leave(room);
          }
          sock.join("lobby");
          sock.emit("party:joined", { partyId: null });
        }
      }

      if (!deleted) {
        const [partyRows] = await pool.query(
          "SELECT * FROM parties WHERE party_id = ? LIMIT 1",
          [partyId]
        );
        const [members] = await pool.query(
          `SELECT pm.name, pm.team, u.char_class, u.status
             FROM party_members pm
             LEFT JOIN users u ON u.name = pm.name
            WHERE pm.party_id = ?
            ORDER BY pm.joined_at, pm.name`,
          [partyId]
        );
        io.to(`party:${partyId}`).emit("party:members", {
          partyId,
          mode: partyRows?.[0]?.mode,
          map: partyRows?.[0]?.map,
          members,
        });
      }
    } catch (e) {
      console.warn("Socket move/broadcast failed in /leave-party:", e?.message);
    }

    return res.json({ success: true, left: true, deleted });
  } catch (e) {
    console.error("/leave-party error:", e);
    return res.status(500).json({ error: "Internal error" });
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
// Socket
// ---------------------------

const cookie = require("cookie");
const cookieSignature = require("cookie-signature");

// Helper: read a specific SIGNED cookie value from the socket handshake
function readSignedCookieFromHandshake(socket, cookieName, secret) {
  const header = socket.handshake?.headers?.cookie;
  if (!header) return null;
  const parsed = cookie.parse(header);
  const raw = parsed[cookieName];
  if (!raw) return null;
  if (!raw.startsWith("s:")) return null; // cookie-parser format
  const unsigned = cookieSignature.unsign(raw.slice(2), secret);
  return unsigned || null;
}

// Helper: figure out the party room a socket is currently in
function currentPartyRoom(socket) {
  for (const room of socket.rooms) {
    if (room.startsWith("party:")) return room;
  }
  return null;
}

// DB helpers used by sockets
async function getUserById(userId) {
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [
    userId,
  ]);
  return rows[0] || null;
}
async function getPartyIdByName(name) {
  const rows = await runQuery(
    "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
    [name]
  );
  return rows[0]?.party_id ?? null;
}
async function getPartyMembers(partyId) {
  const rows = await runQuery(
    "SELECT name FROM party_members WHERE party_id = ? ORDER BY name",
    [partyId]
  );
  return rows.map((r) => r.name);
}

// Presence knobs
const INACTIVITY_MINUTES = 30;       // evict after 30 minutes idle
const HEARTBEAT_SEC = 60;            // client emits heartbeat every 60s (fallback)
const OFFLINE_FALLBACK_SEC = 120;    // if no heartbeat for 2 minutes, mark offline
const DISCONNECT_GRACE_MS = 3000;    // avoid offline flicker on reloads

// Track per-user active socket counts and pending offline timers
const activeConnections = new Map(); // name -> count
const pendingOffline = new Map();    // name -> timeoutId

async function markOnline(username, partyId) {
  try {
    await runQuery("UPDATE users SET status = 'online' WHERE name = ?", [username]);
    if (partyId) {
      io.to(`party:${partyId}`).emit("status:update", {
        partyId,
        name: username,
        status: "online",
      });
    }
  } catch (_) {}
}
async function markOffline(username) {
  try {
    await runQuery("UPDATE users SET status = 'offline' WHERE name = ?", [username]);
    const rows = await runQuery(
      "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
      [username]
    );
    const partyId = rows[0]?.party_id;
    if (partyId) {
      io.to(`party:${partyId}`).emit("status:update", {
        partyId,
        name: username,
        status: "offline",
      });
    }
  } catch (_) {}
}

// Socket auth middleware: attach the user row if we have a valid signed cookie
io.use(async (socket, next) => {
  try {
    const userIdStr = readSignedCookieFromHandshake(
      socket,
      "user_id",
      COOKIE_SECRET
    );
    if (!userIdStr) {
      socket.data.user = null; // guest / unknown (still allowed)
      return next();
    }
    const user = await getUserById(Number(userIdStr));
    socket.data.user = user || null;
    return next();
  } catch (e) {
    console.error("Socket auth error:", e);
    return next(new Error("Unauthorized"));
  }
});

io.on("connection", async (socket) => {
  const user = socket.data.user;
  const userId = user?.user_id;
  const username = user?.name;

  // Track socket on the user row (and mark online)
  try {
    if (userId) {
      await runQuery("UPDATE users SET socket_id = ?, status = 'online' WHERE user_id = ?", [
        socket.id,
        userId,
      ]);
    }
  } catch (e) {
    console.warn("Could not persist socket_id:", e?.message);
  }

  // Count this connection & mark online immediately (party-aware)
  if (username) {
    const t = pendingOffline.get(username);
    if (t) { clearTimeout(t); pendingOffline.delete(username); }
    const cnt = (activeConnections.get(username) || 0) + 1;
    activeConnections.set(username, cnt);

    try {
      const rows = await runQuery(
        "SELECT party_id FROM party_members WHERE name = ? LIMIT 1",
        [username]
      );
      await markOnline(username, rows[0]?.party_id || null);
    } catch (_) {}
  }

  // Auto-join the user's current party (or lobby)
  try {
    const partyId = username ? await getPartyIdByName(username) : null;
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

  // presence heartbeat (fallback). client sends partyId periodically
  socket.on("heartbeat", async (partyId) => {
    const u = socket.data.user;
    const uname = u?.name;
    if (!uname || !partyId) return;
    try {
      await updateLastSeen(partyId, uname);
      // keep user online as long as we see beats
      await runQuery("UPDATE users SET status = 'online' WHERE name = ?", [uname]);
    } catch (e) {
      console.warn("heartbeat error:", e?.message);
    }
  });

  // Example: simple party chat
  socket.on("party:chat", (msg, ack) => {
    const text = (typeof msg === "string" ? msg : msg?.text || "").slice(0, 400);
    if (!text) return ack && ack({ ok: false, error: "Empty" });
    const room = currentPartyRoom(socket) || "lobby";
    io.to(room).emit("party:chat", {
      from: username || "Guest",
      text,
      ts: Date.now(),
    });
    ack && ack({ ok: true });
  });

  socket.on("disconnect", async () => {
    try {
      if (userId) {
        const row = await runQuery(
          "SELECT socket_id FROM users WHERE user_id = ? LIMIT 1",
          [userId]
        );
        if (row[0]?.socket_id === socket.id) {
          await runQuery("UPDATE users SET socket_id = NULL WHERE user_id = ?", [
            userId,
          ]);
        }
      }
    } catch (_) {}

    if (!username) return;

    const left = (activeConnections.get(username) || 1) - 1;
    if (left <= 0) {
      activeConnections.delete(username);
      const timer = setTimeout(async () => {
        // if they didn't reconnect during grace, mark offline
        if (!activeConnections.has(username)) {
          await markOffline(username);
        }
        pendingOffline.delete(username);
      }, DISCONNECT_GRACE_MS);
      pendingOffline.set(username, timer);
    } else {
      activeConnections.set(username, left);
    }
  });
});

// Every 15s: fallback offline if no heartbeat for OFFLINE_FALLBACK_SEC
setInterval(async () => {
  try {
    const stale = await runQuery(
      `SELECT pm.party_id, pm.name
         FROM party_members pm
        WHERE pm.last_seen < (NOW() - INTERVAL ? SECOND)`,
      [OFFLINE_FALLBACK_SEC]
    );
    if (stale.length === 0) return;

    for (const { party_id, name } of stale) {
      // still connected somewhere? skip
      if (activeConnections.get(name)) continue;
      await runQuery("UPDATE users SET status = 'offline' WHERE name = ?", [name]);
      io.to(`party:${party_id}`).emit("status:update", {
        partyId: party_id,
        name,
        status: "offline",
      });
    }
  } catch (e) {
    console.warn("offline fallback scan failed:", e?.message);
  }
}, 15_000);

// Every 60s: evict memberships idle > INACTIVITY_MINUTES
setInterval(async () => {
  try {
    const stale = await runQuery(
      `SELECT party_id, name
         FROM party_members
        WHERE last_seen < (NOW() - INTERVAL ? MINUTE)`,
      [INACTIVITY_MINUTES]
    );
    if (stale.length === 0) return;

    await runQuery(
      `DELETE FROM party_members
        WHERE last_seen < (NOW() - INTERVAL ? MINUTE)`,
      [INACTIVITY_MINUTES]
    );

    const affected = [...new Set(stale.map((r) => r.party_id))];
    for (const partyId of affected) {
      const [partyRows] = await pool.query(
        "SELECT * FROM parties WHERE party_id = ? LIMIT 1",
        [partyId]
      );
      if (!partyRows || partyRows.length === 0) continue;

      const [members] = await pool.query(
        `SELECT pm.name, pm.team, u.char_class, u.status
           FROM party_members pm
           LEFT JOIN users u ON u.name = pm.name
          WHERE pm.party_id = ?
          ORDER BY pm.joined_at, pm.name`,
        [partyId]
      );

      io.to(`party:${partyId}`).emit("party:members", {
        partyId,
        mode: partyRows[0].mode,
        map: partyRows[0].map,
        members,
      });

      if (members.length === 0) {
        await runQuery("DELETE FROM parties WHERE party_id = ?", [partyId]);
        io.to(`party:${partyId}`).emit("room-deleted");
      }
    }
  } catch (e) {
    console.warn("eviction failed:", e?.message);
  }
}, 60_000);

// ---------------------------
// Server start
// ---------------------------

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    server.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
}
startServer();
