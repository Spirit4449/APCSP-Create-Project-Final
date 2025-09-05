// server.js (moved to src/server)

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

// Resolve repository root (two levels up from src/server)
const ROOT_DIR = path.resolve(__dirname, "..", "..");

// Shared libs
const {
  DEFAULT_CHARACTER,
  LEVEL_CAP,
  defaultCharacterList,
  upgradePrice,
  unlockPrice,
} = require(path.join(ROOT_DIR, "src", "lib", "characterStats"));

// Core & modular routes/jobs
const db = require("./core/sql.js");
const { registerRoutes } = require("./routes/routes.js");
const { registerEconomyRoutes } = require("./routes/economy.js");
const { makeAuthHelpers } = require("./helpers/auth.js");
const { startCleanupJobs } = require("./jobs/cleanup.js");
const { initSocket } = require("./core/socket.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = Number(process.env.PORT) || 3002;

// Config
const IS_PROD = process.env.NODE_ENV === "production";
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const PAGE_ROOT = IS_PROD ? DIST_DIR : PUBLIC_DIR;

// Resolve a persistent cookie secret (env, then file, then random persisted)
function resolveCookieSecretLocal() {
  const fromEnv = process.env.COOKIE_SECRET;
  if (fromEnv && String(fromEnv).trim()) return String(fromEnv);
  const secretPath = path.join(ROOT_DIR, ".cookie-secret");
  try {
    if (fs.existsSync(secretPath)) {
      const s = fs.readFileSync(secretPath, "utf8").trim();
      if (s) return s;
    }
  } catch (_) {}
  const newSecret = crypto.randomBytes(32).toString("hex");
  try {
    fs.writeFileSync(secretPath, newSecret, { encoding: "utf8" });
  } catch (_) {}
  return newSecret;
}
const COOKIE_SECRET = resolveCookieSecretLocal();

const SIGNED_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  secure: IS_PROD,
  signed: true,
};
const DISPLAY_COOKIE_OPTS = { sameSite: "lax", secure: IS_PROD };

// Expose cookie opts for downstream modules
app.locals.SIGNED_COOKIE_OPTS = SIGNED_COOKIE_OPTS;
app.locals.DISPLAY_COOKIE_OPTS = DISPLAY_COOKIE_OPTS;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

// Static and dev middleware
if (!IS_PROD) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require(path.join(ROOT_DIR, "webpack.config.js"));
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      serverSideRender: false,
    })
  );
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(PUBLIC_DIR));
} else {
  app.use(express.static(DIST_DIR));
}

// Bootstrap sockets early and attach to app.locals
const socketApi = initSocket({
  io,
  COOKIE_SECRET,
  db: {
    getUserById: db.getUserById,
    getPartyIdByName: db.getPartyIdByName,
    fetchPartyMembersDetailed: db.fetchPartyMembersDetailed,
    setUserStatus: db.setUserStatus,
    setUserSocketId: db.setUserSocketId,
    clearUserSocketIfMatch: db.clearUserSocketIfMatch,
    updateLastSeen: db.updateLastSeen,
    runQuery: db.runQuery,
  },
});
app.locals.socketApi = socketApi;

// Prepare auth helpers
const auth = makeAuthHelpers(db, { SIGNED_COOKIE_OPTS, DISPLAY_COOKIE_OPTS });

// Register routes
registerEconomyRoutes({ app, db, auth });
registerRoutes({ app, io, db, auth, pageRoot: PAGE_ROOT, distDir: DIST_DIR });

// Server start
(async function startServer() {
  try {
    await db.pool.query("SELECT 1");
    console.log("✅ Database connected");
    server.listen(port, () =>
      console.log(`Server listening at http://localhost:${port}`)
    );
  } catch (e) {
    console.error("❌ Failed to connect to DB:", e);
    process.exit(1);
  }
})();

// Background jobs
startCleanupJobs({ db, io });
