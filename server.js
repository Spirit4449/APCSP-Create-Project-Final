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
const { pool, runQuery, deleteEmptyParties } = require("./sql");

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
  "process.env.COOKIE_SECRET" || `dev-insecure-${Math.random().toString(36).slice(2)}-${Date.now()}`;
if (!process.env.COOKIE_SECRET) {
  console.warn("⚠️  COOKIE_SECRET not set. Using a temporary dev secret (cookies will invalidate on restart).");
}

// Express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET)); // IMPORTANT: signed cookies enabled

// Webpack (dev middleware)
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));

// Serve files from dist
app.use(express.static(path.join(__dirname, "dist")));

// ---------------------------
// Cookie Helpers
// ---------------------------

const isProd = process.env.NODE_ENV === "production";

const SIGNED_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProd,
  signed: true,
  // optionally: domain, path
};

const DISPLAY_COOKIE_OPTS = {
  // Readable by JS; cosmetic only
  sameSite: "lax",
  secure: isProd,
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

  // Fetch the full row we just created (includes coins, gems, char_class, etc.)
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [userId]);
  const fullUser = rows[0];

  // Set cookies
  res.cookie("user_id", String(userId), { ...SIGNED_COOKIE_OPTS, maxAge: 1000 * 60 * 60 * 24 * 30 });
  res.cookie("display_name", fullUser.name, { ...DISPLAY_COOKIE_OPTS, expires: expiresAt });

  return fullUser;
}

// Fetch current user from signed cookie; if missing/invalid and `autoCreate` is true, create a guest
async function getOrCreateCurrentUser(req, res, { autoCreate = true } = {}) {
  const id = req.signedCookies?.user_id;
  if (id) {
    const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [id]);
    if (rows.length > 0) {
      return rows[0];
    }
    // Stale cookie with no row: fall through to create if allowed
  }
  if (!autoCreate) return null;
  return await createGuestAndSetCookies(res);
}

// Strict getter: require a valid signed cookie & row, do NOT auto-create
async function requireCurrentUser(req, res) {
  const id = req.signedCookies?.user_id;
  if (!id) return null;
  const rows = await runQuery("SELECT * FROM users WHERE user_id = ? LIMIT 1", [id]);
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

const REGEN_TICK_MS = 1500; // apply regen every 1.5s
const REGEN_IDLE_DELAY_MS = 3000; // ms after last attack to start regen
const REGEN_HIT_IDLE_DELAY_MS = 3000; // ms after being hit to start regen
const REGEN_MIN_PER_TICK = 500; // minimum heal per tick when tapering
const REGEN_FRIENDLY_STEP = 50; // quantize regen to multiples of 50
const REGEN_MISSING_FRACTION_PER_TICK = 0.3; // 25% of missing health per tick

function initGameHealth(gameObj) {
  try {
    for (const teamKey in gameObj) {
      const team = gameObj[teamKey];
      for (const idx in team) {
        const p = team[idx];
        // NOTE: This referenced character.CHARACTER_HEALTH in your original code.
        // Leaving as-is to avoid breaking external imports.
        const max = character.CHARACTER_HEALTH[p.character];
        p.maxHealth = typeof p.maxHealth === "number" ? p.maxHealth : max;
        p.currentHealth = typeof p.currentHealth === "number" ? p.currentHealth : p.maxHealth;
      }
    }
  } catch (e) {
    // swallow
  }
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

// Source-of-truth profile for the current request.
// Auto-creates a guest if none exists yet (convenient for first contact).
app.post("/status", async (req, res) => {
  try {
    const user = await getOrCreateCurrentUser(req, res, { autoCreate: true });
    const username = user.name;

    // Party membership lookup still keyed by name (kept as-is)
    const partyRows = await runQuery("SELECT party_id FROM party_members WHERE name = ? LIMIT 1", [username]);

    return res.status(200).json({
      success: true,
      userData: user,
      guest: isGuest(user),
      party_id: partyRows.length > 0 ? partyRows[0].party_id : null,
    });
  } catch (error) {
    console.error("Error in /status:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Lightweight "who am I?" for client UI; does not create a new guest.
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
    const { insertId: partyId } = await runQuery("INSERT INTO parties (status, mode, map) VALUES (?, ?, ?)", [
      "lobby",
      1,
      1,
    ]);

    // Join party (team1 by default)
    await runQuery("INSERT INTO party_members (party_id, name, team) VALUES (?, ?, ?)", [partyId, username, "team1"]);

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

app.get("/party/:partyid", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/partydata", async (req, res) => {
  const user = await requireCurrentUser(req, res);
  if (!user) return res.status(401).json({ error: "Not authenticated" });
  const username = user.name;
  const partyId = req.body?.partyId;

  if (!partyId) {
    return res.status(400).json({ error: "partyId is required" });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1) Lock party row to prevent overfill
    const [partyRows] = await conn.query("SELECT * FROM parties WHERE party_id = ? FOR UPDATE", [partyId]);
    if (!partyRows || partyRows.length === 0) {
      await conn.rollback();
      return res.status(404).sendFile(path.join(__dirname, "dist/Errors", "partynotfound.html"));
    }
    const party = partyRows[0];
    const maxMembers = party.max_members ?? party.capacity ?? party.max_size ?? null;

    // 2) Already a member?
    const [existing] = await conn.query("SELECT 1 FROM party_members WHERE party_id = ? AND name = ? LIMIT 1", [
      partyId,
      username,
    ]);

    if (!existing || existing.length === 0) {
      // 3) Count members (lock the set)
      const [countRows] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM party_members WHERE party_id = ? FOR UPDATE",
        [partyId]
      );
      const currentCount = countRows[0].cnt;
      if (maxMembers != null && currentCount >= maxMembers) {
        await conn.rollback();
        return res.status(409).sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
      }

      // 4) Insert membership (ensure UNIQUE (party_id, name) on table)
      try {
        await conn.query("INSERT INTO party_members (party_id, name, joined_at) VALUES (?, ?, NOW())", [
          partyId,
          username,
          ,
        ]);
      } catch (e) {
        if (!(e && e.code === "ER_DUP_ENTRY")) {
          await conn.rollback();
          console.error("Join insert failed:", e);
          return res.status(500).json({ error: "Could not join party" });
        }
      }
    }

    // 5) Fetch members
    const [memberRows] = await conn.query("SELECT name FROM party_members WHERE party_id = ? ORDER BY name", [partyId]);

    await conn.commit();

    // 6) Return JSON payload
    return res.json({
      party,
      members: memberRows.map((m) => m.name),
      viewer: username,
    });
  } catch (err) {
    try {
      if (conn) await conn.rollback();
    } catch {}
    console.error("Error in POST /partydata:", err);
    return res.status(500).json({ error: "Internal error" });
  } finally {
    if (conn) conn.release();
  }
});

// ---------------------------
// Signup (upgrade guest → permanent)
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
      return res.status(400).json({ success: false, error: "Username and password are required." });
    }
    if (!USERNAME_RE.test(username)) {
      return res
        .status(400)
        .json({ success: false, error: "Username must be 3-14 chars: letters, numbers, _ . - only." });
    }
    if (password.length < MIN_PW || password.length > MAX_PW) {
      return res.status(400).json({ success: false, error: `Password must be ${MIN_PW}-${MAX_PW} characters.` });
    }

    const user = await requireCurrentUser(req, res);
    if (!user) return res.status(400).json({ success: false, error: "Guest session not found." });

    // Must still be a guest to upgrade
    if (user.expires_at === null) {
      return res.status(400).json({ success: false, error: "This account is already permanent." });
    }

    // Hash password (store in existing `password` column)
    const hash = await bcrypt.hash(password, 12);

    try {
      const result = await runQuery(
        `UPDATE users
           SET name = ?, password = ?, expires_at = NULL
         WHERE user_id = ?`,
        [username, hash, user.user_id]
      );
      if (!result || result.affectedRows !== 1) {
        return res.status(409).json({ success: false, error: "Unable to complete signup. Please try again." });
      }
    } catch (err) {
      if (err && (err.code === "ER_DUP_ENTRY" || err.errno === 1062)) {
        return res.status(409).json({ success: false, error: "Username is already taken." });
      }
      throw err;
    }

    // Refresh readable display cookie to the new name
    res.cookie("display_name", username, DISPLAY_COOKIE_OPTS);

    // Optionally clear/rotate user_id here; or keep it (same user_id) since the row is now permanent
    // res.clearCookie('user_id', SIGNED_COOKIE_OPTS);

    return res.status(201).json({ success: true, username });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body || {};
    username = typeof username === "string" ? username.trim() : "";
    password = typeof password === "string" ? password : "";

    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required." });
    }

    // Look up user (must be permanent: expires_at IS NULL)
    const rows = await runQuery(
      "SELECT user_id, name, password FROM users WHERE name = ? AND expires_at IS NULL LIMIT 1",
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid username or password." });
    }
    const user = rows[0];

    // Compare password hash
    const ok = await bcrypt.compare(password, user.password || "");
    if (!ok) {
      return res.status(401).json({ success: false, error: "Invalid username or password." });
    }

    // Success → set cookies
    res.cookie("user_id", String(user.user_id), {
      ...SIGNED_COOKIE_OPTS,
      maxAge: 1000 * 60 * 60 * 24 * 20, // 20 days stay logged in
    });
    res.cookie("display_name", user.name, DISPLAY_COOKIE_OPTS);

    return res.status(200).json({
      success: true,
      userId: user.user_id,
      username: user.name,
    });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("user_id", SIGNED_COOKIE_OPTS);
    res.clearCookie("display_name", DISPLAY_COOKIE_OPTS);
  } catch (_) {}
  // Optional: also invalidate any server-side session if you adopt sessions
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

    if (typeof character !== "string" || !/^[a-zA-Z0-9_:-]{1,32}$/.test(character)) {
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
      console.log(`${username} upgrade ${character} to level ${dbLevel + 1} for ${price} coins`);
      return res.status(200).json({ success: true, newLevel: dbLevel + 1, spent: price });
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

    if (typeof character !== "string" || !/^[a-zA-Z0-9_:-]{1,32}$/.test(character)) {
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
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
        const { gems, lvl } = rows[0];
        if (lvl >= 1) return res.status(409).json({ error: "Character already unlocked" });
        if (Number(gems) < price) return res.status(403).json({ error: "Not enough gems" });
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
      return res.status(200).json({ success: true, character, newLevel, spent: price, gems: newGems });
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
