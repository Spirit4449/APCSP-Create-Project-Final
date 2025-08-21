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
import {
  createPlayer,
  player,
  handlePlayerMovement,
  setCurrentHealth,
  dead,
} from "./player";
import OpPlayer from "./opPlayer";

// Connect to the Socket.io server
const socket = io("/");

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
const map = sessionStorage.getItem("map")


// Map variale
let mapObjects

// Lists that store all the players in player team and op team
const opponentPlayers = [];
const teamPlayers = [];

// Phaser class to setup the game
class GameScene extends Phaser.Scene {
  // Preloads assets
  preload() {
    this.load.image("background", `${staticPath}/background.png`);
    this.load.image("mangrove-background", `${staticPath}/mangroveBackground.jpg`);
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
    // Creates the map objects
    if (map === '1') {
      mapObjects = lushyPeaksObjects
      lushyPeaks(this)
    } else if(map === '2') {
      mapObjects = mangroveMeadowObjects
      mangroveMeadow(this)
    }

    // Creates player object
    createPlayer(this, username, character, spawnPlatform, spawn, partyMembers, map);
    // Adds collision between map and player

    mapObjects.forEach(mapObject => {
      // Add collider between the object and each map object
      this.physics.add.collider(player, mapObject);
    });
    
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
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, username }),
    })
      .then((response) => response.json())
      .then((data) => {
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
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // After 1 second the fight image is removed
    setTimeout(() => {
      const fight = document.getElementById("fight");
      fight.style.opacity = "0";
      fight.addEventListener("transitionend", (event) => {
        fight.remove();
      });
    }, 1000);

    // Code that runs when another player moves
    socket.on("move", (data) => {
      const opponentPlayer =
        opponentPlayers[data.username] || teamPlayers[data.username];
      // Finds player from the list
      if (opponentPlayer) {
        // Sets the x and y of the opponent as well as the animaiton
        opponentPlayer.opponent.x = data.x;
        opponentPlayer.opponent.y = data.y;
        opponentPlayer.opponent.flipX = data.flip;
        opponentPlayer.opPlayerName.setPosition(
          opponentPlayer.opponent.x,
          opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10
        );
        opponentPlayer.opponent.anims.play(data.animation, true);
      }
    });

    // When another player attacks, this catches it
    socket.on("attack", (data) => {
      const scene = this;
      // Adds projectile into scene
      const projectile = this.physics.add.image(data.x, data.y, data.weapon);
      projectile.setScale(data.scale);
      projectile.setVelocity(data.velocity, 0);
      // Makes projectile rotate
      projectile.setAngularVelocity(data.angularVelocity);
      projectile.body.allowGravity = false;

      if (data.name in teamPlayers) {
        for (const player in opponentPlayers) {
          const opponentPlayer = opponentPlayers[player];
          addOverlap(projectile, opponentPlayer);
        }
      } else if (data.name in opponentPlayers) {
        for (const player in teamPlayers) {
          const teamPlayer = teamPlayers[player];
          // Adds overlap between team players if someone in your team throws is
          addOverlap(projectile, teamPlayer);
        }
        // Adds overlap with player
        addOverlap(projectile, player, true);
      }
      // Overlap with map
      mapObjects.forEach(mapObject => {
        // Add collider between the object and each map object
        addOverlap(projectile, mapObject);
      });

      // Add overlap funciton
      function addOverlap(projectile, object, player = false) {
        if (object.opponent) {
          scene.physics.add.overlap(
            projectile,
            object.opponent,
            function (projectile) {
              object.opCurrentHealth -= data.damage;
              object.updateHealthBar();
              projectile.destroy();
            }
          );
        } else if (player === true) {
          scene.physics.add.overlap(projectile, object, function (projectile) {
            // Subtracts 1000 health from player
            setCurrentHealth(1000);
            projectile.destroy();
          });
        } else {
          scene.physics.add.overlap(projectile, object, function (projectile) {
            projectile.destroy(); // Destroy projectile on collision
          });
        }
      }
    });

    // When another player dies
    socket.on("death", (data) => {
      const opponentPlayer =
        opponentPlayers[data.username] || teamPlayers[data.username];

      if (opponentPlayer in opponentPlayers) {
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
      // Shifts the player name down slightly
      opponentPlayer.opPlayerName.setPosition(
        data.x,
        opponentPlayer.opPlayerName.y + 30
      );
      // Updates health bar position to be a little lower
      opponentPlayer.updateHealthBar(
        true,
        data.y - (opponentPlayer.opponent.height / 2 - 24)
      );

      // Deletes the sprite from the game
      if (opponentPlayers[data.username]) {
        delete opponentPlayers[data.username];
      } else if (teamPlayers[data.username]) {
        delete teamPlayers[data.username];
      }
    });

    // When everyone is dead
    socket.on("game-over", (data) => {
      if (gameId === data.gameId) {
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
    if (!dead) {
      handlePlayerMovement(this); // Handles movement
      socket.emit("move", {
        // Emits x and y every update
        x: player.x,
        y: player.y,
        flip: player.flipX,
        animation: player.anims.currentAnim,
        username,
      });
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

export { opponentPlayers, teamPlayers, socket };
