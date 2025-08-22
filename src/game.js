// game.js

// Image Credits
// Shuriken Image: https://zh-partners.com/apps-sticker-banner-poster-printing-usage-and-part-of-logo-4809514.html
// Fight Image: https://pngtree.com/freepng/boxing-gloves-vector-red-and-blue-boxing-gloves-that-are-fighting-isolate-on-white-background_5295441.html
// Tileset: https://gamefromscratch.com/defold-engine-tutorial-series-tilemaps/
// Ninja Spritesheet: https://www.freepik.com/premium-vector/black-ninja-game-sprites_1582425.htm
// Background Image: https://de.dreamstime.com/berg-forest-video-game-background-image105360475
// Random Image: https://www.svgrepo.com/svg/391659/random
// VS Image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dvs%2Blogo&psig=AOvVaw0qNTeqExfIsPsa9TyLB34Z&ust=1713801745452000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCJv5PX04UDFQAAAAAdAAAAABAE

// Credits to https://www.w3schools.com/js/js_cookies.asp for helping with cookie code

import { lushyPeaks, lushyPeaksObjects } from "./Maps/lushyPeaks";
import { mangroveMeadow, mangroveMeadowObjects } from "./Maps/mangroveMeadow";
import { createPlayer, player, handlePlayerMovement, dead } from "./player";
import ReturningShuriken from "./ReturningShuriken";
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
// Net sync helpers
let netLastSend = 0;
const netSendIntervalMs = 1000 / 20; // throttle client move emits to ~30Hz
let stateActive = false; // once server 'state' snapshots start, prefer them over legacy 'move'
let lastServerState = { t: 0, players: {} };

// No remote projectile registry (deterministic simulation on each client)

// Phaser class to setup the game
class GameScene extends Phaser.Scene {
  // Preloads assets
  preload() {
    cdbg();
    this.load.image("background", `${staticPath}/background.png`);
    this.load.image(
      "mangrove-background",
      `${staticPath}/mangroveBackground.jpg`
    );
    this.load.atlas(
      "sprite",
      `${staticPath}/Ninja_Spritesheet.png`,
      `${staticPath}/animations.json`
    );

    this.load.atlas(
      "troll",
      `${staticPath}/troll_spritesheet.png`,
      `${staticPath}/troll.json`
    );
    this.load.image("tiles-image", `${staticPath}/map.png`);
    this.load.tilemapTiledJSON("tiles", `${staticPath}/tilesheet.json`);
    this.load.image("base", `${staticPath}/base.png`);
    this.load.image("platform", `${staticPath}/largePlatform.png`);
    this.load.image("side-platform", `${staticPath}/sidePlatform.png`);
    this.load.image("medium-platform", `${staticPath}/mediumPlatform.png`);
    this.load.image("tiny-platform", `${staticPath}/tinyPlatform.png`);
    this.load.image("base-left", `${staticPath}/baseLeft.png`);
    this.load.image("base-middle", `${staticPath}/baseMiddle.png`);
    this.load.image("base-right", `${staticPath}/baseRight.png`);
    this.load.image("base-top", `${staticPath}/baseTop.png`);

    this.load.image("shuriken", `${staticPath}/shuriken.png`);
    this.load.audio("shurikenThrow", `${staticPath}/shurikenThrow.mp3`);
    this.load.audio("shurikenHit", `${staticPath}/hit.mp3`);
    this.load.audio("shurikenHitWood", `${staticPath}/woodhit.wav`);
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

    // Code that runs when another player moves (legacy). Disabled when stateActive.
    socket.on("move", (data) => {
      cdbg();
      if (stateActive) return; // prefer authoritative snapshots
      const opponentPlayer =
        opponentPlayers[data.username] || teamPlayers[data.username];
      // Finds player from the list
      if (opponentPlayer) {
        // Sets the x and y of the opponent as well as the animaiton
        const prevX = opponentPlayer.opponent.x;
        opponentPlayer.opponent.x = data.x;
        opponentPlayer.opponent.y = data.y;
        opponentPlayer.opponent.flipX = data.flip;
        opponentPlayer.opPlayerName.setPosition(
          opponentPlayer.opponent.x,
          opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10
        );
        opponentPlayer.opponent.anims.play(data.animation, true);

        // Remote running dust (approximate: if moved horizontally enough)
        const deltaX = Math.abs(opponentPlayer.opponent.x - prevX);
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

    // Authoritative server snapshots (throttled ~20Hz)
    socket.on("state", (payload) => {
      // payload: { gameId, t, players: { [username]: {x,y,flip,animation} } }
      if (payload.gameId !== gameId) return;
      lastServerState = payload;
      stateActive = true;
    });

    // When another player attacks, this catches it
    socket.on("attack", (data) => {
      cdbg();
      if (data.returning) {
        const ownerWrapper =
          opponentPlayers[data.name] || teamPlayers[data.name];
        const ownerSprite = ownerWrapper ? ownerWrapper.opponent : null;
        // Instantiate deterministic returning shuriken (non-owner)
        const shuriken = new ReturningShuriken(
          this,
          { x: data.x, y: data.y },
          ownerSprite,
          {
            direction: data.direction,
            forwardDistance: data.forwardDistance || 500,
            outwardDuration: data.outwardDuration || 380,
            returnSpeed: data.returnSpeed || 900,
            rotationSpeed: data.rotationSpeed || 2000,
            scale: data.scale || 0.1,
            damage: data.damage,
            isOwner: false,
          }
        );
        // Remote collision optional: omitted for simplicity (authoritative hits by owner only)
        return;
      }
      // Basic non-returning projectile fallback (if ever used)
      const proj = this.physics.add.image(data.x, data.y, data.weapon);
      proj.setScale(data.scale || 0.1);
      proj.setVelocity((data.direction || 1) * 400, 0);
      proj.setAngularVelocity(data.rotationSpeed || 600);
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

      // Dying animation
      opponentPlayer.opponent.anims.play("dying", true);
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
      // Throttled move emit (client-side prediction, server reconciliation)
      const now = performance.now();
      if (now - netLastSend >= netSendIntervalMs) {
        netLastSend = now;
        socket.emit("move", {
          x: player.x,
          y: player.y,
          flip: player.flipX,
          animation: player.anims.currentAnim
            ? player.anims.currentAnim.key
            : "idle",
          username,
        });
      }
      cdbg();
    }
    // Apply authoritative state smoothing to opponents and reconcile local player
    if (stateActive && lastServerState && lastServerState.players) {
      const playersMap = lastServerState.players;
      const dt = this.game.loop.delta / 1000;
      const lerp = (a, b, t) => a + (b - a) * t;
      const smoothFactor = Phaser.Math.Clamp(dt * 12, 0, 1); // responsiveness vs. smoothness

      // Reconcile local player (light correction to avoid jitter)
      const myState = playersMap[username];
      if (myState && !dead) {
        const errX = myState.x - player.x;
        const errY = myState.y - player.y;
        const err = Math.hypot(errX, errY);
        if (err > 60) {
          // snap if way off
          player.x = myState.x;
          player.y = myState.y;
        } else if (err > 6) {
          // gently steer toward authoritative position
          player.x = lerp(player.x, myState.x, smoothFactor * 0.6);
          player.y = lerp(player.y, myState.y, smoothFactor * 0.6);
        }
      }

      // Update opponents (both enemy and user team mirror)
      const applyTo = (wrapper, name) => {
        if (!wrapper) return;
        const sprite = wrapper.opponent;
        const s = playersMap[name];
        if (!s) return;
        const dx = s.x - sprite.x;
        const dy = s.y - sprite.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 100) {
          sprite.x = s.x;
          sprite.y = s.y;
        } else {
          sprite.x = lerp(sprite.x, s.x, smoothFactor);
          sprite.y = lerp(sprite.y, s.y, smoothFactor);
        }
        sprite.flipX = !!s.flip;
        if (s.animation) {
          sprite.anims.play(s.animation, true);
        }
        // Update name tag position
        wrapper.opPlayerName.setPosition(
          sprite.x,
          sprite.y - sprite.height + 10
        );
      };

      for (const name in opponentPlayers) {
        applyTo(opponentPlayers[name], name);
      }
      for (const name in teamPlayers) {
        applyTo(teamPlayers[name], name);
      }
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
      debug: false,
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
