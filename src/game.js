// game.js

import Phaser from "phaser";
import { getCookie } from "./lib/cookies";
import { lushyPeaks, lushyPeaksObjects } from "./maps/lushyPeaks";
import { mangroveMeadow, mangroveMeadowObjects } from "./maps/mangroveMeadow";
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

// Socket now imported from standalone module to prevent circular deps
function cdbg() {
  /* logging disabled for production */
}
cdbg();

// Path to get assets
const staticPath = "/assets";

// Get match ID from URL path, fallback to query params or session storage
function getMatchIdFromUrl() {
  // Try URL path first: /game/123
  const pathParts = window.location.pathname.split('/');
  if (pathParts.length >= 3 && pathParts[1] === 'game') {
    const pathMatchId = pathParts[2];
    if (pathMatchId && pathMatchId !== '') {
      return pathMatchId;
    }
  }
  
  // Fallback to query params: /game.html?match=123
  const urlParams = new URLSearchParams(window.location.search);
  const queryMatchId = urlParams.get('match');
  if (queryMatchId) return queryMatchId;
  
  // Last resort: session storage
  return sessionStorage.getItem('matchId');
}

const matchId = getMatchIdFromUrl();

if (!matchId) {
  console.error("No match ID found, redirecting to lobby");
  window.location.href = '/';
}

// Variables to store game session data
const username = getCookie("name");
let gameData = null; // Will be fetched from /gamedata endpoint

// Map variable
let mapObjects;

// Lists that store all the players in player team and op team
const opponentPlayers = [];
const teamPlayers = [];
let gameEnded = false; // stops update loop network emissions after game over
let gameInitialized = false; // track if game has been initialized

// Movement throttling variables
let lastMovementSent = 0;
const movementThrottleMs = 25; // Send movement updates every 25ms
let lastPlayerState = { x: 0, y: 0, flip: false, animation: null };

// Server snapshot interpolation
let stateActive = false; // set true once we start receiving server snapshots
const stateBuffer = []; // queue of { t, players: { [username]: {x,y,flip,animation} } }
const MAX_STATE_BUFFER = 60; // ~4 seconds at 15 Hz
let interpDelayMs = 100; // render ~80-120ms in the past (default 100ms)

// Game scene reference
let gameScene = null;

// Fetch game data from server
async function fetchGameData() {
  try {
    const response = await fetch('/gamedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchId: Number(matchId) })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch game data');
    }

    return result.gameData;
  } catch (error) {
    console.error('Failed to fetch game data:', error);
    alert('Failed to load game data. Redirecting to lobby...');
    window.location.href = '/';
    throw error;
  }
}

// Initialize game connection
async function initializeGame() {
  try {
    console.log('Fetching game data for match:', matchId);
    gameData = await fetchGameData();
    console.log('Game data received:', gameData);

    // Join the game room via socket
    socket.emit('game:join', { matchId: Number(matchId) });
    
    // Set up game event listeners
    setupGameEventListeners();
    
  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
}

// Set up socket event listeners for game
function setupGameEventListeners() {
  // Game initialization
  socket.on('game:init', (gameState) => {
    console.log('Game initialized:', gameState);
    gameInitialized = true;
    
    // Update local game data with server state
    if (gameState.players) {
      // Initialize opponent and team players based on server data
      initializePlayers(gameState.players);
    }
  });

  // Game start countdown
  socket.on('game:start', (data) => {
    console.log('Game starting:', data);
    if (data.countdown && gameScene) {
      // Show countdown in UI
      showCountdown(data.countdown);
    }
  });

  // Server snapshots for interpolation
  socket.on('game:snapshot', (snapshot) => {
    if (!stateActive) {
      stateActive = true;
      console.log('Started receiving server snapshots');
    }
    
    // Add to state buffer for interpolation
    stateBuffer.push({
      t: snapshot.timestamp,
      players: snapshot.players
    });
    
    // Keep buffer size manageable
    if (stateBuffer.length > MAX_STATE_BUFFER) {
      stateBuffer.shift();
    }
  });

  // Game actions from other players
  socket.on('game:action', (actionData) => {
    console.log('Player action:', actionData);
    // Handle other players' actions (attacks, abilities, etc.)
  });

  // Game errors
  socket.on('game:error', (error) => {
    console.error('Game error:', error);
    alert(`Game error: ${error.message}`);
  });

  // Player disconnections
  socket.on('player:disconnected', (data) => {
    console.log('Player disconnected:', data);
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
  players.forEach(playerData => {
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
      isAlive: playerData.isAlive !== false
    };
  });
}

// Show countdown UI
function showCountdown(seconds) {
  // Create or update countdown display
  let countdownEl = document.getElementById('countdown');
  if (!countdownEl) {
    countdownEl = document.createElement('div');
    countdownEl.id = 'countdown';
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
document.addEventListener('DOMContentLoaded', initializeGame);

// Phaser class to setup the game
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // Preloads assets
  preload() {
    cdbg();
    this.load.image("lushy-bg", `${staticPath}/lushy/gameBg.png`);
    this.load.image("mangrove-bg", `${staticPath}/mangrove/gameBg.png`);
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
    cdbg();
    
    // Store scene reference
    gameScene = this;
    
    // Ensure camera renders on whole pixels for crisp sprites
    this.cameras?.main && (this.cameras.main.roundPixels = true);
    
    // Wait for game data before creating map and player
    if (!gameData) {
      console.log('Waiting for game data...');
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
    // Creates the map objects based on game data
    if (gameData.map === 1) {
      mapObjects = lushyPeaksObjects;
      lushyPeaks(this);
      cdbg();
    } else if (gameData.map === 2) {
      mapObjects = mangroveMeadowObjects;
      mangroveMeadow(this);
      cdbg();
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

    // Creates player object using game data
    createPlayer(
      this,
      username,
      gameData.yourCharacter,
      null, // spawnPlatform - will be determined by server
      null, // spawn - will be determined by server  
      gameData.players.length,
      gameData.map,
      opponentPlayers
    );
    cdbg();
    
    // Initialize other players from game data
    this.initializeOtherPlayers();
    
    // Toggle physics debug with Ctrl+M
    this.input.keyboard.on("keydown-M", (e) => {
      if (!e.ctrlKey) return;
      const world = this.physics?.world;
      if (!world) return;
      // Flip debug draw state
      world.drawDebug = !world.drawDebug;
      // Clear previous graphics and show/hide accordingly
      if (world.debugGraphic) {
        world.debugGraphic.clear();
        world.debugGraphic.setVisible(world.drawDebug);
      }
      // Also update the config reference if present (helps some plugins check)
      if (this.sys?.game?.config?.physics?.arcade) {
        this.sys.game.config.physics.arcade.debug = world.drawDebug;
      }
    });
    
    // Adds collision between map and player
    mapObjects.forEach((mapObject) => {
      // Add collider between the object and each map object
      this.physics.add.collider(player, mapObject);
    });
    cdbg();
  }
  
  initializeOtherPlayers() {
    // Create OpPlayer instances for other players
    gameData.players.forEach(playerData => {
      if (playerData.name === username) {
        return; // Skip local player
      }

      const isTeammate = playerData.team === gameData.yourTeam;
      const playerContainer = isTeammate ? teamPlayers : opponentPlayers;
      
      // Create OpPlayer instance with correct constructor parameters
      const opPlayer = new OpPlayer(
        this, // scene
        playerData.char_class, // character
        playerData.name, // username
        playerData.team, // team
        0, // spawnPlatform (will be set by server)
        { x: 100, y: 100 }, // spawn (will be updated by server snapshots)
        1, // playersInTeam (placeholder)
        gameData.map // map
      );
      
      playerContainer[playerData.name] = opPlayer;
    });
  }

  update() {
    // Only process if game is initialized
    if (!gameInitialized) return;
    
    // Handle player movement input and send to server
    if (player && !dead && !gameEnded) {
      handlePlayerMovement(this);
      
      // Send input to server (throttled)
      const now = Date.now();
      if (now - lastMovementSent >= movementThrottleMs) {
        const currentState = {
          x: player.x,
          y: player.y,
          flip: player.flipX,
          animation: player.anims?.currentAnim?.key || null
        };
        
        // Only send if state has changed
        if (
          Math.abs(currentState.x - lastPlayerState.x) > 1 ||
          Math.abs(currentState.y - lastPlayerState.y) > 1 ||
          currentState.flip !== lastPlayerState.flip ||
          currentState.animation !== lastPlayerState.animation
        ) {
          socket.emit('game:input', {
            x: currentState.x,
            y: currentState.y,
            flip: currentState.flip,
            animation: currentState.animation
          });
          
          lastPlayerState = { ...currentState };
          lastMovementSent = now;
        }
      }
    }

    // Server state interpolation
    if (stateActive && stateBuffer.length > 1) {
      const now = Date.now();
      const renderTime = now - interpDelayMs;
      
      // Find the two snapshots to interpolate between
      let aState = null;
      let bState = null;
      
      for (let i = 0; i < stateBuffer.length - 1; i++) {
        if (stateBuffer[i].t <= renderTime && renderTime <= stateBuffer[i + 1].t) {
          aState = stateBuffer[i];
          bState = stateBuffer[i + 1];
          break;
        }
      }
      
      // If we have valid states, interpolate
      if (aState && bState) {
        const alpha = (renderTime - aState.t) / (bState.t - aState.t);
        this.interpolatePlayerStates(aState, bState, alpha);
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
      
      // Position interpolation
      if (aPosData && bPosData) {
        const ix = aPosData.x + alpha * (bPosData.x - aPosData.x);
        const iy = aPosData.y + alpha * (bPosData.y - aPosData.y);
        spr.x = ix;
        spr.y = iy;
      } else if (bPosData) {
        spr.x = bPosData.x;
        spr.y = bPosData.y;
      } else if (aPosData) {
        spr.x = aPosData.x;
        spr.y = aPosData.y;
      }

      // Orientation/animation: take from newer if present
      const animSrc = bPosData && bPosData.animation ? bPosData : aPosData;
      if (animSrc) {
        const prevFlip = spr.flipX;
        spr.flipX = !!animSrc.flip;
        if (spr.flipX !== prevFlip && typeof wrapper.applyFlipOffset === "function") {
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
  type: Phaser.AUTO,
  // Pixel-art friendly settings
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  resolution: window.devicePixelRatio,
  scale: {
    // Makes sure the game looks good on all screens
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1300,
    height: 600,
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
