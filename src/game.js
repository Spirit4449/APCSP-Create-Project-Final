// game.js

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

// Socket now imported from standalone module to prevent circular deps
function cdbg() {
  /* logging disabled for production */
}
cdbg();

// Path to get assets
const staticPath = "/assets";

// Variables to store all of the session storage values
const gameId = window.location.pathname.split("/").filter(Boolean).pop();
const partyId = sessionStorage.getItem("party");
const username = getCookie("name");
const character = sessionStorage.getItem("character");
const spawnPlatform = sessionStorage.getItem("spawnPlatform");
const spawn = sessionStorage.getItem("spawn");
const partyMembers = sessionStorage.getItem("partyMembers");
const partyMembersNum = Number(partyMembers);
const map = sessionStorage.getItem("map");

// Map variale
let mapObjects;

// Lists that store all the players in player team and op team
const opponentPlayers = [];
const teamPlayers = [];
let gameEnded = false; // stops update loop network emissions after game over

// Movement throttling variables
let lastMovementSent = 0;
const movementThrottleMs = 25; // Send movement updates every 100ms (about 10 FPS)
let lastPlayerState = { x: 0, y: 0, flip: false, animation: null };

// Server snapshot interpolation
let stateActive = false; // set true once we start receiving server snapshots
const stateBuffer = []; // queue of { t, players: { [username]: {x,y,flip,animation} } }
const MAX_STATE_BUFFER = 60; // ~4 seconds at 15 Hz
let interpDelayMs = 100; // render ~80-120ms in the past (default 100ms)

// No remote projectile registry (deterministic simulation on each client)

// Phaser class to setup the game
class GameScene extends Phaser.Scene {
  // Preloads assets
  preload() {
    cdbg();
    this.load.image("lushy-bg", `${staticPath}/Lushy/gameBg.png`);
    this.load.image("mangrove-bg", `${staticPath}/Mangrove/gameBg.png`);
    // Character assets (preload all registered characters)
    preloadAll(this, staticPath);

    this.load.atlas(
      "troll",
      `${staticPath}/troll_spritesheet.png`,
      `${staticPath}/troll.json`
    );
    this.load.image("tiles-image", `${staticPath}/map.png`);
    this.load.tilemapTiledJSON("tiles", `${staticPath}/tilesheet.json`);
    this.load.image("lushy-base", `${staticPath}/Lushy/base.png`);
    this.load.image("lushy-platform", `${staticPath}/Lushy/largePlatform.png`);
    this.load.image(
      "lushy-side-platform",
      `${staticPath}/Lushy/sidePlatform.png`
    );
    // this.load.image("lushy-medium-platform", `${staticPath}/Lushy/mediumPlatform.png`);
    this.load.image(
      "mangrove-tiny-platform",
      `${staticPath}/Mangrove/tinyPlatform.png`
    );
    this.load.image(
      "mangrove-base-left",
      `${staticPath}/Mangrove/baseLeft.png`
    );
    this.load.image(
      "mangrove-base-middle",
      `${staticPath}/Mangrove/baseMiddle.png`
    );
    this.load.image(
      "mangrove-base-right",
      `${staticPath}/Mangrove/baseRight.png`
    );
    this.load.image("mangrove-base-top", `${staticPath}/Mangrove/baseTop.png`);
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
    // Creates the map objects
    if (map === "1") {
      mapObjects = lushyPeaksObjects;
      lushyPeaks(this);
      cdbg();
    } else if (map === "2") {
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

    // Creates player object
    createPlayer(
      this,
      username,
      character,
      spawnPlatform,
      spawn,
      partyMembers,
      map,
      opponentPlayers
    );
    cdbg();
    // Adds collision between map and player

    mapObjects.forEach((mapObject) => {
      // Add collider between the object and each map object
      this.physics.add.collider(player, mapObject);
    });
    cdbg();

    // Makes the fight element zoom in at the start of the game
    document.getElementById("fight").style.width = "60%";

    // Sets the values for Your Team and Opposing Team text
    document.getElementById(
      "your-team"
    ).textContent = `Your Team: ${partyMembers}/${partyMembers} players`;
    document.getElementById(
      "opposing-team"
    ).textContent = `Opposing Team: ${partyMembers}/${partyMembers} players`;
    // Emits player-joined and creates the op player objects
    socket.emit("player-joined", { username, character });
    cdbg();
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        cdbg();
        for (const key in data.userTeam) {
          // User team
          if (key !== username) {
            // Ensures player is not added again
            const userPlayer = new OpPlayer(
              this,
              data.userTeam[key]["character"],
              key,
              "user",
              data.userTeam[key]["spawnPlatform"],
              data.userTeam[key]["spawn"],
              partyMembers,
              map
            );
            teamPlayers[key] = userPlayer; // Adds player object to the list
            // Initialize with current position if available
            if (
              data.userTeam[key]["x"] !== undefined &&
              data.userTeam[key]["y"] !== undefined
            ) {
              userPlayer.opponent.x = data.userTeam[key]["x"];
              userPlayer.opponent.y = data.userTeam[key]["y"];
            }
            cdbg("opPlayer created (user team)", { key });
          }
        }
        for (const key in data.opTeam) {
          if (key !== username) {
            const opponentPlayer = new OpPlayer(
              this,
              data.opTeam[key]["character"],
              key,
              "op",
              data.opTeam[key]["spawnPlatform"],
              data.opTeam[key]["spawn"],
              partyMembers,
              map
            );
            opponentPlayers[key] = opponentPlayer;
            // Initialize with current position if available
            if (
              data.opTeam[key]["x"] !== undefined &&
              data.opTeam[key]["y"] !== undefined
            ) {
              opponentPlayer.opponent.x = data.opTeam[key]["x"];
              opponentPlayer.opponent.y = data.opTeam[key]["y"];
            }
            cdbg("opPlayer created (op team)", { key });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        cdbg();
      });

    // After 1 second the fight image is removed
    setTimeout(() => {
      const fight = document.getElementById("fight");
      fight.style.opacity = "0";
      fight.addEventListener("transitionend", (event) => {
        fight.remove();
      });
    }, 1000);

    // Prewarm small dust pool
    prewarmDust(this, 8);

    // Code that runs when another player moves (legacy fallback). Disabled when stateActive.
    socket.on("move", (data) => {
      cdbg();
      if (stateActive) return; // prefer authoritative interpolation
      const opponentPlayer =
        opponentPlayers[data.username] || teamPlayers[data.username];
      // Finds player from the list
      if (opponentPlayer) {
        // Store the previous position for smooth tweening
        const prevX = opponentPlayer.opponent.x;
        const prevY = opponentPlayer.opponent.y;

        // Calculate distance to determine if we should tween or teleport
        const deltaX = Math.abs(data.x - prevX);
        const deltaY = Math.abs(data.y - prevY);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // If the distance is too large (player teleported, respawned, etc.), don't tween
        const maxTweenDistance = 300;

        if (distance > maxTweenDistance) {
          // Teleport immediately for large distances
          opponentPlayer.opponent.x = data.x;
          opponentPlayer.opponent.y = data.y;
        } else {
          // Stop any existing movement tween
          if (opponentPlayer.movementTween) {
            opponentPlayer.movementTween.remove();
          }

          // Create smooth movement tween with overlap protection
          const tweenDuration = Math.min(150, distance * 0.8); // Scale duration with distance, max 150ms

          opponentPlayer.movementTween = this.tweens.add({
            targets: opponentPlayer.opponent,
            x: data.x,
            y: data.y,
            duration: tweenDuration,
            ease: "Power2.easeOut", // Smoother easing function
            onUpdate: () => {
              // Update name tag position during tween
              opponentPlayer.opPlayerName.setPosition(
                opponentPlayer.opponent.x,
                opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10
              );
            },
            onComplete: () => {
              opponentPlayer.movementTween = null;
            },
          });
        }

        // Update flip and animation immediately (these don't need tweening)
        opponentPlayer.opponent.flipX = data.flip;
        opponentPlayer.opponent.anims.play(
          resolveAnimKey(
            this,
            opponentPlayer.character,
            data.animation,
            "idle"
          ),
          true
        );

        // Update name tag position
        opponentPlayer.opPlayerName.setPosition(
          opponentPlayer.opponent.x,
          opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10
        );

        // Remote running dust (approximate: if moved horizontally enough)
        if (deltaX > 3) {
          opponentPlayer._dustTimer = (opponentPlayer._dustTimer || 0) + 16; // approximate frame delta
          if (opponentPlayer._dustTimer >= 70) {
            opponentPlayer._dustTimer = 0;
            const dY =
              opponentPlayer.opponent.y + opponentPlayer.opponent.height * 0.45;
            spawnDust(this, opponentPlayer.opponent.x, dY);
          }
        }
      }
    });

    // Authoritative server snapshots (throttled from server)
    socket.on("state", (payload) => {
      if (payload.gameId !== gameId) return;
      stateActive = true;
      stateBuffer.push(payload);
      // keep buffer bounded
      if (stateBuffer.length > MAX_STATE_BUFFER) stateBuffer.shift();
    });

    // When another player attacks, delegate to that player's character module
    socket.on("attack", (data) => {
      cdbg();
      const ownerWrapper = opponentPlayers[data.name] || teamPlayers[data.name];
      const ownerCharacter = ownerWrapper ? ownerWrapper.character : null;
      // Try character-specific handler first
      const handled = ownerCharacter
        ? handleRemoteAttack(this, ownerCharacter, data, ownerWrapper)
        : false;
      if (handled) return;
      console.log("not handled");
      // Generic fallback for simple projectiles
      const proj = this.physics.add.image(data.x, data.y, "fireball");
      proj.setScale(0.4);
      proj.setVelocity((data.direction || 1) * 400, 0);
      proj.flipX = data?.direction < 0;
      proj.body.allowGravity = false;
    });

    // Removed projectile-update/destroy listeners (no network syncing)

    // When another player dies
    socket.on("death", (data) => {
      cdbg();
      if (data.username === username) {
        // Self death already handled via health-update listener in player.js
        return;
      }
      const opponentPlayer =
        opponentPlayers[data.username] || teamPlayers[data.username];

      if (!opponentPlayer) return; // Safety guard

      // Stop any active movement tween for the dying player
      if (opponentPlayer.movementTween) {
        opponentPlayer.movementTween.remove();
        opponentPlayer.movementTween = null;
      }

      if (data.username in opponentPlayers) {
        document.getElementById("your-team").textContent = `Your Team: ${
          partyMembersNum - 1
        }/${partyMembers} players`;
      } else {
        document.getElementById(
          "opposing-team"
        ).textContent = `Opposing Team: ${
          partyMembersNum - 1
        }/${partyMembers} players`;
      }

      // Dying animation (character-aware)
      opponentPlayer.opponent.anims.play(
        resolveAnimKey(this, opponentPlayer.character, "dying"),
        true
      );
      opponentPlayer.opponent.alpha = 0.5;
      // Use local sprite position (server may send 0 if not persisted yet)
      opponentPlayer.opPlayerName.setPosition(
        opponentPlayer.opponent.x,
        opponentPlayer.opPlayerName.y + 30
      );
      opponentPlayer.opCurrentHealth = 0; // enforce zero
      opponentPlayer.updateHealthBar(true); // internally computes Y

      // Deletes the sprite from the game
      if (opponentPlayers[data.username]) {
        delete opponentPlayers[data.username];
      } else if (teamPlayers[data.username]) {
        delete teamPlayers[data.username];
      }
    });

    // When everyone is dead
    socket.on("game-over", (data) => {
      cdbg();
      if (gameId === data.gameId) {
        gameEnded = true; // stop emitting further moves
        // Stop background music and play result music
        try {
          if (this.bgmMain && this.bgmMain.isPlaying) this.bgmMain.stop();
          const isLoser = data.losers.includes(username);
          const key = isLoser ? "lose" : "win";
          const vol = isLoser ? 0.5 : 0.6;
          this.bgmResult = this.sound.add(key, { volume: vol, loop: false });
          this.bgmResult.play();
        } catch (e) {
          // ignore if asset missing
        }
        const gameOver = document.getElementById("game-over");
        if (data.losers.includes(username)) {
          gameOver.textContent = "You Lose";
          gameOver.style.color = "#c81212";
        } else {
          gameOver.textContent = "You Win";
          gameOver.style.color = "#18c321";
        }

        // Sets end screen name to player name
        document.getElementById("username-text").textContent = username;
        document.getElementById("character-text").textContent = character;

        setTimeout(() => {
          // Runs after 1 second of death
          // Disables movement
          this.input.enabled = false;
          document.getElementById("container").style.display = "flex";
          document.getElementById("dark-overlay").style.display = "block";
          document.getElementById("dark-overlay").style.backgroundColor =
            "rgba(0, 0, 0, 0.363)";
        }, 1000);
      }
    });
  }

  // Update function is a built in function that runs as much as possible. It is controlled by the phaser scene
  update() {
    if (gameEnded) return; // halt loop work after game over
    cdbg();
    if (!dead) {
      handlePlayerMovement(this); // Handles movement

      // Throttle movement updates to reduce network traffic and improve smoothness
      const now = Date.now();
      const currentState = {
        x: Math.round(player.x),
        y: Math.round(player.y),
        flip: player.flipX,
        animation: player.anims.currentAnim?.key || "idle",
      };

      // Only send movement update if enough time has passed AND something meaningful changed
      const positionChanged =
        Math.abs(currentState.x - lastPlayerState.x) > 1 ||
        Math.abs(currentState.y - lastPlayerState.y) > 1;
      const stateChanged =
        positionChanged ||
        currentState.flip !== lastPlayerState.flip ||
        currentState.animation !== lastPlayerState.animation;

      if (stateChanged && now - lastMovementSent >= movementThrottleMs) {
        socket.emit("move", {
          x: currentState.x,
          y: currentState.y,
          flip: currentState.flip,
          animation: currentState.animation,
          username,
        });

        lastMovementSent = now;
        lastPlayerState = { ...currentState };
        cdbg();
      }
    }

    // Interpolate remote entities ~100ms in the past for smoothness
    if (stateActive && stateBuffer.length >= 1) {
      const newest = stateBuffer[stateBuffer.length - 1];
      const targetT = newest.t - interpDelayMs;

      // Find two snapshots surrounding targetT
      let older = null;
      let newer = null;
      for (let i = stateBuffer.length - 1; i >= 0; i--) {
        const s = stateBuffer[i];
        if (s.t <= targetT) {
          older = s;
          newer = stateBuffer[i + 1] || s;
          break;
        }
      }
      if (!older) {
        older = stateBuffer[0];
        newer = stateBuffer[1] || older;
      }

      const t0 = older.t;
      const t1 = Math.max(newer.t, t0 + 1);
      const alpha = Phaser.Math.Clamp((targetT - t0) / (t1 - t0), 0, 1);
      const lerp = (a, b, t) => a + (b - a) * t;

      const applyInterp = (wrapper, name) => {
        if (!wrapper) return;
        const spr = wrapper.opponent;
        // cancel any legacy tween to avoid fighting interpolation
        if (wrapper.movementTween) {
          wrapper.movementTween.remove();
          wrapper.movementTween = null;
        }
        const s0 = older.players[name];
        const s1 = newer.players[name] || s0;
        if (!s0 && !s1) return;
        const aState = s0 || s1;
        const bState = s1 || s0;
        if (!aState) return;
        // Ignore obviously bogus states
        if (Number.isNaN(aState.x) || Number.isNaN(aState.y)) return;

        const ix = lerp(aState.x, bState?.x ?? aState.x, alpha);
        const iy = lerp(aState.y, bState?.y ?? aState.y, alpha);

        // If huge teleport between frames, snap to destination
        const dist = Math.hypot(
          (bState?.x ?? aState.x) - aState.x,
          (bState?.y ?? aState.y) - aState.y
        );
        if (dist > 260) {
          spr.x = bState?.x ?? aState.x;
          spr.y = bState?.y ?? aState.y;
        } else {
          spr.x = ix;
          spr.y = iy;
        }

        // Orientation/animation: take from newer if present
        const animSrc = bState && bState.animation ? bState : aState;
        spr.flipX = !!animSrc.flip;
        if (animSrc.animation) {
          spr.anims.play(
            resolveAnimKey(this, wrapper.character, animSrc.animation, "idle"),
            true
          );
        }

        // Name tag
        wrapper.opPlayerName.setPosition(spr.x, spr.y - spr.height + 10);
      };

      for (const name in opponentPlayers)
        applyInterp(opponentPlayers[name], name);
      for (const name in teamPlayers) applyInterp(teamPlayers[name], name);
    }
    // Updates health bars
    for (const player in opponentPlayers) {
      const opponentPlayer = opponentPlayers[player];
      opponentPlayer.updateHealthBar();
    }
    for (const player in teamPlayers) {
      const opponentPlayer = teamPlayers[player];
      opponentPlayer.updateHealthBar();
    }

    // No remote projectile interpolation required
  }
}

const config = {
  type: Phaser.AUTO,
  antialias: true,
  resolution: window.devicePixelRatio,
  scale: {
    // Makes sure the game looks good on all screens
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "1300px",
    height: "600px",
  },
  scene: GameScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

// Gets cookie value
function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

export { opponentPlayers, teamPlayers };
