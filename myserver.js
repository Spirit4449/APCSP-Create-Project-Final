// server.js

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


// Parsers
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Webpack
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


// Health regeneration config
const REGEN_TICK_MS = 1500; // apply regen every 1.5s
const REGEN_IDLE_DELAY_MS = 3000; // ms after last attack to start regen
const REGEN_HIT_IDLE_DELAY_MS = 3000; // ms after being hit to start regen
const REGEN_MIN_PER_TICK = 500; // minimum heal per tick when tapering
const REGEN_FRIENDLY_STEP = 50; // quantize regen to multiples of 50
const REGEN_MISSING_FRACTION_PER_TICK = 0.3; // 25% of missing health per tick

// Initialize health fields for all players in a game object
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
  } catch (e) {
    // swallow
  }
}

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

app.post("/status", async (req, res) => {
  try {
    let username = req.cookies?.name;
    // If no cookie, create a guest user and set cookie
    let created = false;
    if (!username) {
      username = "Guest" + randomString(5, true); // assign to the SAME variable
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // +2h

      // Gets the array of characters and creates a dictionary with each one having a level of 1
      const charLevels = Object.fromEntries(
        getAllCharacters().map((k) => [k, 1])
      );

      // Try to insert; handle rare name-collision by retrying once
      try {
        await runQuery(
          "INSERT INTO users (name, char_class, status, expires_at, char_levels) VALUES (?, ?, ?, ?, ?)",
          [
            username,
            DEFAULT_CHARACTER,
            "lobby",
            expiresAt,
            JSON.stringify(defaultCharacterList()),
          ]
        );
      } catch (e) {
        console.log("Error inserting user:", e);
        return res.status(500).json({ message: "Error inserting user" });
      }

      // set cookie on THIS response
      res.cookie("name", username, {
        expires: expiresAt,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      created = true;
      console.log(`POST STATUS: Created new guest user ${username}`);
    }

    // Fetch user (guest just created, or existing registered)
    const rows = await runQuery("SELECT * FROM users WHERE name = ?", [
      username,
    ]);
    if (rows.length > 0) {
      console.log(`POST STATUS: Retrieved user data for ${username}`);
      const userData = rows[0];

      // Fetch party memberships for this user
      const party_id = await runQuery(
        "SELECT party_id FROM party_members WHERE name = ?",
        [username]
      );

      if (party_id.length > 0) {
        console.log("User is in a party: ", party_id);
      }

      return res.status(created ? 201 : 200).json({
        userData,
        guest: userData.expires_at !== null,
        newlyCreated: created,
        party_id: party_id.length > 0 ? party_id[0].party_id : null,
      });
    } else {
      // (Optional) if cookie exists but DB row missing/expired, recreate here
      console.log(`POST STATUS: User ${username} not found`);
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in /status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /create-party
app.post("/create-party", async (req, res) => {
  const username = req.cookies?.name;
  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Invalid or missing username" });
  }

  try {
    // All-or-nothing for: leave old party → create new party → join new party
    await runQuery("START TRANSACTION");

    // 0) If user is already in a party, remove them
    await runQuery("DELETE FROM party_members WHERE name = ?", [username]);

    // 1) Create the new party
    const { insertId: partyId } = await runQuery(
      "INSERT INTO parties (status, mode, map) VALUES (?, ?, ?)",
      ["lobby", 1, 1]
    );

    // 2) Add user to the new party on team1
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

// Signup user
app.post('/signup', async (req, res) => {
  let { username, password, guestName } = req.body;
  if (guestName === 'Guest') { // Default guest meaning it could not get guest cookie from client side
    guestName = req.cookies.name
  }
  console.log(username, password, guestName)

  if (!username || !password || !guestName) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await runQuery("SELECT * FROM users WHERE name = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const guestAccount = await runQuery("SELECT * FROM users WHERE name = ?", [guestName]);
    if (guestAccount.length < 0) {
      return res.status(409).json({ error: "Guest account does not exist" });
    }
    // Create new user
    const result = await runQuery("UPDATE users SET password = ?, name = ?, expires_at = ? WHERE name = ?", [password, username, null, guestName]);
    console.log(result)
    return res.status(201).json({ username: username });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/party/:partyid", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/partydata", async (req, res) => {
  const username = req.cookies?.name; 
  const partyId = req.body?.partyId;

  if (!partyId) {
    return res.status(400).json({ error: "partyId is required" });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // 1) Lock party row to prevent overfill
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
    const maxMembers =
      party.max_members ?? party.capacity ?? party.max_size ?? null;

    // 2) Already a member?
    const [existing] = await conn.query(
      "SELECT 1 FROM party_members WHERE party_id = ? AND name = ? LIMIT 1",
      [partyId, username]
    );

    if (!existing || existing.length === 0) {
      // 3) Count members (lock the set)
      const [countRows] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM party_members WHERE party_id = ? FOR UPDATE",
        [partyId]
      );
      const currentCount = countRows[0].cnt;
      if (maxMembers != null && currentCount >= maxMembers) {
        await conn.rollback();
        return res
          .status(409)
          .sendFile(path.join(__dirname, "dist/Errors", "partyfull.html"));
      }

      // 4) Insert membership (ensure UNIQUE (party_id, name) on table)
      try {
        await conn.query(
          "INSERT INTO party_members (party_id, name, joined_at) VALUES (?, ?, NOW())",
          [partyId, username]
        );
      } catch (e) {
        // If duplicate from race, treat as already joined; otherwise error
        if (!(e && e.code === "ER_DUP_ENTRY")) {
          await conn.rollback();
          console.error("Join insert failed:", e);
          return res
            .status(500)
        }
      }
    }

    // 5) Fetch members
    const [memberRows] = await conn.query(
      "SELECT name FROM party_members WHERE party_id = ? ORDER BY name",
      [partyId]
    );

    await conn.commit();

    // 6) Return JSON payload
    return res.json({
      party,
      members: memberRows.map((m) => m.name),
      viewer: username
    });
  } catch (err) {
    try { if (conn) await conn.rollback(); } catch {}
    console.error("Error in POST /partydata:", err);
    return res
      .status(500)
  } finally {
    if (conn) conn.release();
  }
});


app.post("/upgrade", async (req, res) => {
  try {
    const username = req.cookies.name;
    const character = req.body.character;

    if (!username) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Validate inputs and test for sql injection
    if (
      typeof character !== "string" ||
      !/^[a-zA-Z0-9_:-]{1,32}$/.test(character)
    ) {
      return res.status(400).json({ error: "Invalid character key" });
    }

    // Build a safe JSON path like $.character
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
      // JSON_EXTRACT returns JSON; handle null and cast
      const dbLevel = rows[0].lvl == null ? 0 : Number(rows[0].lvl);

      if (dbLevel >= LEVEL_CAP) {
        await conn.rollback();
        return res.status(409).json({ error: "Level cap reached" });
      }

      const price = upgradePrice(dbLevel); // compute on server from authoritative level
      if (!Number.isFinite(price) || price < 0) {
        await conn.rollback();
        return res.status(500).json({ error: "Pricing error" });
      }
      if (dbCoins < price) {
        await conn.rollback();
        return res.status(403).json({ error: "Not enough coins" });
      }

      // Single guarded UPDATE:
      //  - deduct coins
      //  - set level to dbLevel + 1
      //  - ensure user still has enough coins AND level didn't change since we read it
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
        // Someone else updated concurrently or funds changed
        await conn.rollback();
        return res.status(409).json({ error: "Upgrade conflict, retry" });
      }

      await conn.commit();
      console.log(
        `${username} upgrade ${character} to level ${
          dbLevel + 1
        } for ${price} coins`
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
    const username = req.cookies.name;
    const character = req.body.character;

    if (!username) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Validate character key (or replace with a strict allow-list)
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

    // Build safe JSON path
    const jsonPath = `$.${character}`;

    // Single, atomic UPDATE:
    //  - Deduct gems
    //  - Set the character level to 1
    //  - Only if: gems >= price AND current level < 1 (0 or missing)
    //
    // Notes:
    //  * COALESCE(char_levels, JSON_OBJECT()) ensures JSON_SET has a JSON doc to write into.
    //  * IFNULL(CAST(JSON_UNQUOTE(JSON_EXTRACT(...)) AS UNSIGNED), 0) treats missing/null as 0.
    //  * All values and the JSON path are parameterized to avoid injection.
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
        // Could be: not enough gems, already unlocked, or user missing.
        // Disambiguate with a quick read (optional but helpful):
        const [rows] = await conn.execute(
          `SELECT gems,
                  IFNULL(CAST(JSON_UNQUOTE(JSON_EXTRACT(char_levels, ?)) AS UNSIGNED), 0) AS lvl
           FROM users WHERE name = ?`,
          [jsonPath, username]
        );
        if (rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        const { gems, lvl } = rows[0];
        if (lvl >= 1) {
          return res.status(409).json({ error: "Character already unlocked" });
        }
        if (Number(gems) < price) {
          return res.status(403).json({ error: "Not enough gems" });
        }
        // Fallback for any other guard miss
        return res.status(409).json({ error: "Unlock conflict, please retry" });
      }

      // Success: fetch new state to return (optional)
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

// Not found endpoint
app.use((req, res, next) => {
  return res.sendFile(path.join(__dirname, "dist", "/Errors/404.html"));
});

// Whenever a user joins, all of this will occur. This is the socket configuration for multi-player setup

// Start the server
async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    server.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`); // Sets up the server to listen on port 3000
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
}
startServer();

// Random string (see credits at the very top for thanks for this code)
function randomString(length, numbersOnly = false) {
  let letters;
  if (numbersOnly) {
    letters = "0123456789";
  } else {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  let string = "";
  const charactersLength = letters.length;

  for (let i = 0; i < length; i++) {
    string += letters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return string;
}

