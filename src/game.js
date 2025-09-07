// game.js

import Phaser from "phaser";
import {
  lushyPeaks,
  lushyPeaksObjects,
  positionLushySpawn,
} from "./maps/lushyPeaks";
import {
  mangroveMeadow,
  mangroveMeadowObjects,
  positionMangroveSpawn,
} from "./maps/mangroveMeadow";
import { createPlayer, player, handlePlayerMovement, dead } from "./player";
import {
  preloadAll,
  handleRemoteAttack,
  setupAll,
  resolveAnimKey,
} from "./characters";
import socket from "./socket";
import OpPlayer from "./opPlayer";
import { spawnDust, prewarmDust } from "./effects";

// Make Phaser globally available for character modules
window.Phaser = Phaser;

// Path to get assets
const staticPath = "/assets";

// Get match ID from URL path, fallback to query params or session storage
function getMatchIdFromUrl() {
  // Try URL path first: /game/123
  const pathParts = window.location.pathname.split("/");
  if (pathParts.length >= 3 && pathParts[1] === "game") {
    const pathMatchId = pathParts[2];
    if (pathMatchId && pathMatchId !== "") {
      return pathMatchId;
    }
  }

  // Fallback to query params: /game.html?match=123
  const urlParams = new URLSearchParams(window.location.search);
  const queryMatchId = urlParams.get("match");
  if (queryMatchId) return queryMatchId;

  // Last resort: session storage
  return sessionStorage.getItem("matchId");
}

const matchId = getMatchIdFromUrl();

if (!matchId) {
  console.error("No match ID found, redirecting to lobby");
  window.location.href = "/";
}

// Variables to store game session data
// Use server-sent identity (from /gamedata) rather than client cookies
let username = null;
let gameData = null; // Will be fetched from /gamedata endpoint
// Expose current match session details (level, per-character damages) for character modules
window.__MATCH_SESSION__ = window.__MATCH_SESSION__ || {};

// Map variable
let mapObjects;

// Lists that store all the players in player team and op team
const opponentPlayers = [];
const teamPlayers = [];
let gameEnded = false; // stops update loop network emissions after game over
let gameInitialized = false; // track if game has been initialized

// Movement throttling variables
let lastMovementSent = 0;
const movementThrottleMs = 16; // ~60Hz movement updates for snappier remote view
let lastPlayerState = { x: 0, y: 0, flip: false, animation: null };

// Server snapshot interpolation
let stateActive = false; // set true once we start receiving server snapshots
const stateBuffer = []; // queue of { t, players: { [username]: {x,y,flip,animation} } }
const MAX_STATE_BUFFER = 60; // ~4 seconds at 15 Hz
let interpDelayMs = 90; // lower delay for more responsiveness; increase if jittery
let clockOffsetMs = 0; // serverTime - clientTime estimate; helps when device clock is off
let clockCalibrated = false;

// Game scene reference
let gameScene = null;

// Fetch game data from server
async function fetchGameData() {
  try {
    const response = await fetch("/gamedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchId: Number(matchId) }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch game data");
    }

    return result.gameData;
  } catch (error) {
    console.error("Failed to fetch game data:", error);
    alert("Failed to load game data. Redirecting to lobby...");
    window.location.href = "/";
    throw error;
  }
}

// Initialize game connection
async function initializeGame() {
  try {
    console.log("Fetching game data for match:", matchId);
    gameData = await fetchGameData();
    username = gameData.yourName || username;

    // 1) Register listeners before join
    setupGameEventListeners();

    // 2) Include gameId if your /gamedata returns it
    const joinPayload = { matchId: Number(matchId) };
    if (gameData?.gameId) joinPayload.gameId = Number(gameData.gameId);

    // 3) Now join
    socket.emit("game:join", joinPayload);
  } catch (error) {
    console.error("Failed to initialize game:", error);
  }
}

// Set up socket event listeners for game
function setupGameEventListeners() {
  // Game initialization
  socket.on("game:init", (gameState) => {
    console.log("Game initialized:", gameState);
    gameInitialized = true;

    // Update local game data with server state
    if (gameState.players) {
      // Initialize opponent and team players based on server data
      initializePlayers(gameState.players);
    }

    // Cache my level and stats for character modules
    try {
      const me = (gameState.players || []).find((p) => p.name === username);
      if (me) {
        window.__MATCH_SESSION__.level = me.level || 1;
        window.__MATCH_SESSION__.stats = me.stats || {};
      }
    } catch (_) {}
  });

  // Game start countdown
  socket.on("game:start", (data) => {
    console.log("Game starting:", data);
    if (data.countdown && gameScene) {
      // Show countdown in UI
      showCountdown(data.countdown);
    }
  });

  // Server snapshots for interpolation
  socket.on("game:snapshot", (snapshot) => {
    if (!stateActive) {
      stateActive = true;
      console.log("Started receiving server snapshots");
    }

    // Estimate server-client clock offset on first snapshot
    try {
      if (
        !clockCalibrated &&
        snapshot &&
        typeof snapshot.timestamp === "number"
      ) {
        // serverTime - clientNow
        clockOffsetMs = snapshot.timestamp - Date.now();
        clockCalibrated = true;
        console.log("Clock offset calibrated (ms):", clockOffsetMs);
      }
    } catch (_) {}

    // Late-join safety: create opponents on first snapshot if missing
    try {
      if (gameScene && snapshot && snapshot.players) {
        for (const name of Object.keys(snapshot.players)) {
          if (name === username) continue;
          const pd = (gameData.players || []).find((p) => p.name === name);
          const isTeammate = pd && pd.team === gameData.yourTeam;
          const existing =
            (isTeammate ? teamPlayers[name] : opponentPlayers[name]) || null;
          const isValidInstance = !!(existing && existing.opponent);
          if (!isValidInstance && pd) {
            const container = isTeammate ? teamPlayers : opponentPlayers;
            const op = new OpPlayer(
              gameScene,
              pd.char_class,
              pd.name,
              pd.team,
              null,
              null,
              (gameData.players || []).filter((p) => p.team === pd.team).length,
              String(gameData.map)
            );
            container[pd.name] = op;
          }
        }
      }
    } catch (_) {}

    // Add to state buffer for interpolation
    stateBuffer.push({
      t: snapshot.timestamp,
      players: snapshot.players,
    });

    // Keep buffer size manageable
    if (stateBuffer.length > MAX_STATE_BUFFER) {
      stateBuffer.shift();
    }
  });

  // Game actions from other players
  socket.on("game:action", (packet) => {
    try {
      if (!packet) return;
      const { playerName, character, origin, flip, action } = packet;
      if (!playerName || !action) return;
      if (playerName === username) return; // ignore self

      // Determine which container holds this player
      const pd = (gameData.players || []).find((p) => p.name === playerName);
      const isTeammate = pd && pd.team === gameData.yourTeam;
      const container = isTeammate ? teamPlayers : opponentPlayers;
      let wrapper = container[playerName];

      // Lazy-create if missing (late join/desync safety)
      if (!wrapper || !wrapper.opponent) {
        if (!pd) return; // can't create without char/team info
        const op = new OpPlayer(
          gameScene,
          pd.char_class,
          pd.name,
          pd.team,
          null,
          null,
          (gameData.players || []).filter((p) => p.team === pd.team).length,
          String(gameData.map)
        );
        container[pd.name] = op;
        wrapper = op;
      }

  // Do NOT snap the opponent sprite to packet.origin; keep interpolation smooth.
  // We'll only use origin for spawning projectiles/effects coordinates below.

      // Resolve character (packet.character overrides roster info if present)
      const charKey = (character || (pd && pd.char_class) || "").toLowerCase();
      // Build action payload: use live sprite position/flip for fluid visuals
      const act = { ...(action || {}) };
      if (wrapper && wrapper.opponent) {
        act.x = wrapper.opponent.x;
        act.y = wrapper.opponent.y;
        if (typeof act.direction !== "number") {
          act.direction = wrapper.opponent.flipX ? -1 : 1;
        }
      }
      const consumed = handleRemoteAttack(gameScene, charKey, act, wrapper);
      if (!consumed) {
        // Optional dev log for unhandled action types
        console.debug("Unhandled remote action", { playerName, charKey, action });
      }
    } catch (err) {
      console.warn("Failed to handle remote game:action", err);
    }
  });

  // Game errors
  socket.on("game:error", (error) => {
    console.error("Game error:", error);
    alert(`Game error: ${error.message}`);
  });

  // Player disconnections
  socket.on("player:disconnected", (data) => {
    console.log("Player disconnected:", data);
    // Handle player disconnection in UI
  });
}

// Initialize players based on server data
function initializePlayers(players) {
  // Clear existing players
  for (const name in opponentPlayers) {
    if (opponentPlayers[name].sprite) {
      opponentPlayers[name].sprite.destroy();
    }
    delete opponentPlayers[name];
  }

  for (const name in teamPlayers) {
    if (teamPlayers[name].sprite) {
      teamPlayers[name].sprite.destroy();
    }
    delete teamPlayers[name];
  }

  // Add players based on teams
  players.forEach((playerData) => {
    if (playerData.name === username) {
      // This is the local player, handled separately
      return;
    }

    const isTeammate = playerData.team === gameData.yourTeam;
    const playerContainer = isTeammate ? teamPlayers : opponentPlayers;

    // Create OpPlayer instance (this will be created when the scene is ready)
    playerContainer[playerData.name] = {
      name: playerData.name,
      character: playerData.char_class,
      team: playerData.team,
      x: playerData.x || 100,
      y: playerData.y || 100,
      health: playerData.health || 100,
      isAlive: playerData.isAlive !== false,
    };
  });
}

// Show countdown UI
function showCountdown(seconds) {
  // Create or update countdown display
  let countdownEl = document.getElementById("countdown");
  if (!countdownEl) {
    countdownEl = document.createElement("div");
    countdownEl.id = "countdown";
    countdownEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 72px;
      font-weight: bold;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      z-index: 1000;
      font-family: 'Press Start 2P', monospace;
    `;
    document.body.appendChild(countdownEl);
  }

  countdownEl.textContent = seconds;

  // Remove countdown after it finishes
  if (seconds <= 0) {
    setTimeout(() => {
      if (countdownEl) {
        countdownEl.remove();
      }
    }, 1000);
  }
}

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", initializeGame);

// Phaser class to setup the game
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  // Preloads assets
  preload() {
    // Character assets (preload all registered characters)
    preloadAll(this, staticPath);

    this.load.atlas(
      "troll",
      `${staticPath}/troll_spritesheet.png`,
      `${staticPath}/troll.json`
    );
    this.load.image("tiles-image", `${staticPath}/map.png`);
    this.load.tilemapTiledJSON("tiles", `${staticPath}/tilesheet.json`);
    this.load.image("lushy-base", `${staticPath}/lushy/base.png`);
    this.load.image("lushy-platform", `${staticPath}/lushy/largePlatform.png`);
    this.load.image(
      "lushy-side-platform",
      `${staticPath}/lushy/sidePlatform.png`
    );
    this.load.image(
      "mangrove-tiny-platform",
      `${staticPath}/mangrove/tinyPlatform.png`
    );
    this.load.image(
      "mangrove-base-left",
      `${staticPath}/mangrove/baseLeft.png`
    );
    this.load.image(
      "mangrove-base-middle",
      `${staticPath}/mangrove/baseMiddle.png`
    );
    this.load.image(
      "mangrove-base-right",
      `${staticPath}/mangrove/baseRight.png`
    );
    this.load.image("mangrove-base-top", `${staticPath}/mangrove/baseTop.png`);
    this.load.image("thorg-weapon", `${staticPath}/thorg/weapon.png`);
    // Movement SFX (place files under /assets/audio)
    this.load.audio("sfx-step", `${staticPath}/step.ogg`);
    this.load.audio("sfx-jump", `${staticPath}/jump.mp3`);
    this.load.audio("sfx-land", `${staticPath}/land.mp3`);
    this.load.audio("sfx-walljump", `${staticPath}/walljump.mp3`);
    // Combat/health SFX
    this.load.audio("sfx-damage", `${staticPath}/damage.mp3`);
    this.load.audio("sfx-heal", `${staticPath}/heal.mp3`);
    // Music (non-looping bgm, separate win/lose stingers)
    this.load.audio("main", `${staticPath}/main.wav`);
    this.load.audio("win", `${staticPath}/win.mp3`);
    this.load.audio("lose", `${staticPath}/lose.wav`);
  }

  create() {
    // Store scene reference
    gameScene = this;

    this.physics.world.setBoundsCollision(false, false, false, false);
    // Wait for game data before creating map and player
    if (!gameData) {
      console.log("Waiting for game data...");
      // Poll for game data
      const pollForGameData = () => {
        if (gameData) {
          this.initializeGameWorld();
        } else {
          setTimeout(pollForGameData, 100);
        }
      };
      setTimeout(pollForGameData, 100);
      return;
    }

    this.initializeGameWorld();
  }

  initializeGameWorld() {
    // No per-scene spawn plan needed now; map modules provide positioning helpers
    // Creates the map objects based on game data
    if (gameData.map === 1) {
      mapObjects = lushyPeaksObjects;
      lushyPeaks(this);
    } else if (gameData.map === 2) {
      mapObjects = mangroveMeadowObjects;
      mangroveMeadow(this);
    }

    // Ensure all character animations are registered for this scene
    setupAll(this);

    // Background music: play once (2:30 track), no loop, but only after audio unlock (user gesture)
    this._bgmStarted = false;
    const startBgm = () => {
      if (this._bgmStarted) return;
      this._bgmStarted = true;
      try {
        if (!this.bgmMain) {
          this.bgmMain = this.sound.add("main", {
            volume: 0.02,
            loop: false,
          });
        }
        this.bgmMain.play();
      } catch (e) {}
    };
    if (this.sound.locked) {
      // Phaser will emit 'unlocked' on first user interaction
      this.sound.once("unlocked", startBgm);
    } else {
      // If already unlocked, start immediately; also set a safe first-click hook
      startBgm();
    }
    // Extra safety: if for some reason 'unlocked' doesn't fire, start on first pointer/keydown
    this.input.once("pointerdown", startBgm);
    this.input.keyboard?.once("keydown", startBgm);

    // Cache my level and stats BEFORE creating the player so HUD uses server values
    try {
      const me = (gameData.players || []).find((p) => p.name === username);
      if (me) {
        window.__MATCH_SESSION__ = window.__MATCH_SESSION__ || {};
        window.__MATCH_SESSION__.level = me.level || 1;
        window.__MATCH_SESSION__.stats = me.stats || {};
      }
    } catch (_) {}

    // Creates player object using game data
    createPlayer(
      this,
      username,
      gameData.yourCharacter,
      null,
      null,
      (gameData.players || []).filter((p) => p.team === gameData.yourTeam)
        .length,
      String(gameData.map),
      opponentPlayers
    );
    // Safety: ensure we never keep an OpPlayer entry for myself
    try {
      if (username) {
        if (opponentPlayers && opponentPlayers[username]) {
          const op = opponentPlayers[username];
          if (op && op.destroy) op.destroy();
          delete opponentPlayers[username];
        }
        if (teamPlayers && teamPlayers[username]) {
          const tp = teamPlayers[username];
          if (tp && tp.destroy) tp.destroy();
          delete teamPlayers[username];
        }
      }
    } catch (_) {}
    // After sprite exists and body sized, move to a map-appropriate spawn slot
    try {
      const teamList = (gameData.players || [])
        .filter((p) => p.team === gameData.yourTeam)
        .sort((a, b) => a.name.localeCompare(b.name));
      const myIndex = Math.max(
        0,
        teamList.findIndex((p) => p.name === username)
      );
      if (String(gameData.map) === "1") {
        positionLushySpawn(
          this,
          player,
          gameData.yourTeam,
          myIndex,
          teamList.length
        );
      } else if (String(gameData.map) === "2") {
        positionMangroveSpawn(this, player, gameData.yourTeam, myIndex);
      }
    } catch (_) {}

    // Server stats are already applied above prior to createPlayer

    // Initialize other players from game data
    this.initializeOtherPlayers();

    // Toggle physics debug with Ctrl+M (ensures debug graphic exists)
    this.input.keyboard.on("keydown-M", (e) => {
      if (!e.ctrlKey) return;
      const world = this.physics?.world;
      if (!world) return;
      const enable = !world.drawDebug;
      world.drawDebug = enable;
      if (enable) {
        // Create debug graphic if Phaser hasn't created it yet
        try {
          if (!world.debugGraphic || !world.debugGraphic.scene) {
            if (typeof world.createDebugGraphic === "function") {
              world.createDebugGraphic();
            } else {
              world.debugGraphic = this.add.graphics();
            }
          }
          world.debugGraphic.setVisible(true);
        } catch (_) {}
      } else {
        try {
          if (world.debugGraphic) {
            world.debugGraphic.clear?.();
            world.debugGraphic.setVisible(false);
          }
        } catch (_) {}
      }
      // Keep config in sync for any systems that read it
      const arcadeCfg = this.sys?.game?.config?.physics?.arcade;
      if (arcadeCfg) arcadeCfg.debug = enable;
    });

    // Adds collision between map and player
    mapObjects.forEach((mapObject) => {
      // Add collider between the object and each map object
      this.physics.add.collider(player, mapObject);
    });
  }

  initializeOtherPlayers() {
    // Create OpPlayer instances for other players
    gameData.players.forEach((playerData) => {
      if (playerData.name === username) {
        return; // Skip local player
      }

      const isTeammate = playerData.team === gameData.yourTeam;
      const playerContainer = isTeammate ? teamPlayers : opponentPlayers;

      // Determine spawn info from plan
      // Create OpPlayer instance with correct constructor parameters
      const opPlayer = new OpPlayer(
        this, // scene
        playerData.char_class, // character
        playerData.name, // username
        playerData.team, // team
        null,
        null,
        (gameData.players || []).filter(
          (p) => p.team === playerData.team
        ).length,
        String(gameData.map) // map as string for spawn helpers
      );

      // Snap opponent sprite to its map-specific spawn immediately
      try {
        const teamList = (gameData.players || [])
          .filter((p) => p.team === playerData.team)
          .sort((a, b) => a.name.localeCompare(b.name));
        const index = Math.max(
          0,
          teamList.findIndex((p) => p.name === playerData.name)
        );
        if (String(gameData.map) === "1") {
          positionLushySpawn(
            this,
            opPlayer.opponent,
            playerData.team,
            index,
            teamList.length
          );
        } else if (String(gameData.map) === "2") {
          positionMangroveSpawn(
            this,
            opPlayer.opponent,
            playerData.team,
            index
          );
        }
        if (opPlayer.updateUIPosition) opPlayer.updateUIPosition();
      } catch (_) {}

      // Apply server-sent max health if provided
      if (playerData.stats && typeof playerData.stats.health === "number") {
        opPlayer.opMaxHealth = playerData.stats.health;
        opPlayer.opCurrentHealth = playerData.stats.health;
        if (opPlayer.updateHealthBar) opPlayer.updateHealthBar();
      }

      playerContainer[playerData.name] = opPlayer;
    });
  }

  update() {
    // Only process if game is initialized
    if (!gameInitialized) return;

    // Handle player movement input and send to server
    if (player && !dead && !gameEnded) {
      handlePlayerMovement(this);

      // Send position + state to server (throttled)
      const now = Date.now();
      if (now - lastMovementSent >= movementThrottleMs) {
        const currentState = {
          x: player.x,
          y: player.y,
          flip: player.flipX,
          animation: player.anims?.currentAnim?.key || null,
        };

        // Only send if state has changed
        if (
          Math.abs(currentState.x - lastPlayerState.x) > 1 ||
          Math.abs(currentState.y - lastPlayerState.y) > 1 ||
          currentState.flip !== lastPlayerState.flip ||
          currentState.animation !== lastPlayerState.animation
        ) {
          // Disable per-message compression for movement for lower latency on constrained devices
          socket.compress(false).emit("game:input", currentState);

          lastPlayerState = { ...currentState };
          lastMovementSent = now;
        }
      }
    }

    // Server state interpolation
    if (stateActive && stateBuffer.length > 0) {
      const now = Date.now();
      // Use server-time basis if we calibrated; otherwise client-time
      const renderTime =
        now + (clockCalibrated ? clockOffsetMs : 0) - interpDelayMs;

      // Find the two snapshots to interpolate between
      let aState = null;
      let bState = null;

      for (let i = 0; i < stateBuffer.length - 1; i++) {
        if (
          stateBuffer[i].t <= renderTime &&
          renderTime <= stateBuffer[i + 1].t
        ) {
          aState = stateBuffer[i];
          bState = stateBuffer[i + 1];
          break;
        }
      }

      // If we have valid states, interpolate
      if (aState && bState) {
        const alpha = (renderTime - aState.t) / (bState.t - aState.t);
        this.interpolatePlayerStates(aState, bState, alpha);
      } else {
        // Fallbacks for clock skew or low buffer: snap to most recent
        if (stateBuffer.length >= 2) {
          const a = stateBuffer[stateBuffer.length - 2];
          const b = stateBuffer[stateBuffer.length - 1];
          this.interpolatePlayerStates(a, b, 1);
        } else if (stateBuffer.length === 1) {
          const only = stateBuffer[0];
          // Interpolate with self (alpha=1) effectively snaps to the single state
          this.interpolatePlayerStates(only, only, 1);
        }
      }
    }

    // Update health bars for all players
    for (const player in opponentPlayers) {
      const opponentPlayer = opponentPlayers[player];
      if (opponentPlayer.updateHealthBar) {
        opponentPlayer.updateHealthBar();
      }
    }
    for (const player in teamPlayers) {
      const teamPlayer = teamPlayers[player];
      if (teamPlayer.updateHealthBar) {
        teamPlayer.updateHealthBar();
      }
    }
  }

  interpolatePlayerStates(aState, bState, alpha) {
    const applyInterp = (wrapper, name) => {
      if (!wrapper || !wrapper.opponent) return;

      const spr = wrapper.opponent;
      const aPosData = aState.players[name];
      const bPosData = bState.players[name];

      if (!aPosData && !bPosData) return;

      // Position interpolation target
      let targetX = spr.x;
      let targetY = spr.y;
      if (aPosData && bPosData) {
        targetX = aPosData.x + alpha * (bPosData.x - aPosData.x);
        targetY = aPosData.y + alpha * (bPosData.y - aPosData.y);
      } else if (bPosData) {
        targetX = bPosData.x;
        targetY = bPosData.y;
      } else if (aPosData) {
        targetX = aPosData.x;
        targetY = aPosData.y;
      }

      // Low-pass filter to reduce snap: move a fraction toward target each frame
      const dx = targetX - spr.x;
      const dy = targetY - spr.y;
      const distSq = dx * dx + dy * dy;
      const maxSnapDistSq = 450 * 450; // snap if teleported far
      // Factor based on frame delta (keeps feel similar across FPS)
      const dt = this.game?.loop?.delta || 16.7;
      const base = 0.18; // smoothing strength
      const smoothing = 1 - Math.pow(1 - base, dt / 16.7);
      if (distSq > maxSnapDistSq) {
        // Large teleport or spawn: snap to avoid long easing trails
        spr.x = targetX;
        spr.y = targetY;
      } else {
        spr.x += dx * smoothing;
        spr.y += dy * smoothing;
      }

      // Orientation/animation: take from newer if present
      const animSrc = bPosData && bPosData.animation ? bPosData : aPosData;
      if (animSrc) {
        const prevFlip = spr.flipX;
        spr.flipX = !!animSrc.flip;
        if (
          spr.flipX !== prevFlip &&
          typeof wrapper.applyFlipOffset === "function"
        ) {
          wrapper.applyFlipOffset();
        }
        if (animSrc.animation) {
          spr.anims.play(
            resolveAnimKey(this, wrapper.character, animSrc.animation, "idle"),
            true
          );
        }
      }

      // Update name tag position
      if (wrapper.opPlayerName) {
        const bodyTop = spr.body ? spr.body.y : spr.y - spr.height / 2;
        wrapper.opPlayerName.setPosition(spr.x, bodyTop - 36);
      }
    };

    for (const name in opponentPlayers) {
      applyInterp(opponentPlayers[name], name);
    }
    for (const name in teamPlayers) {
      applyInterp(teamPlayers[name], name);
    }
  }
}

const config = {
  // Force WebGL and enable transparency so the canvas can show the HTML/CSS background behind it
  type: Phaser.WEBGL,
  transparent: true,
  backgroundColor: "rgba(0,0,0,0)",
  // Pixel-art friendly settings
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  resolution: window.devicePixelRatio,
  scale: {
    // Makes sure the game looks good on all screens
    mode: Phaser.Scale.FIT,
    // We'll position the canvas via CSS, so disable Phaser auto centering
    autoCenter: Phaser.Scale.NO_CENTER,
    width: 1300,
    height: 650,
  },
  scene: GameScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

export { opponentPlayers, teamPlayers };
