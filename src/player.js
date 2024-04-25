// player.js

import { opponentPlayers, teamPlayers, socket } from "./game";
import { lushyPeaksObjects, base, platform } from "./Maps/lushyPeaks";
import {
  mangroveMeadowObjects,
  tinyPlatform1,
  tinyPlatform2,
  tinyPlatform3,
  tinyPlatform4,
  tinyPlatform5,
  tinyPlatform6,
} from "./Maps/mangroveMeadow";
import { ninjaAnimations } from "./Animations/ninja";
// Globals
let player;
let cursors;
let canWallJump = true;
let isMoving = false;
let isJumping = false;
let isAttacking = false;
let canAttack = true;

let frame;

let maxHealth = 8000;
let currentHealth = 8000;
let dead = false;

let healthBarWidth = 60;
let healthBar;
let healthText;

let playerName;

let indicatorTriangle;

let username;
let gameId = window.location.pathname.split("/").filter(Boolean).pop();

let scene;

let spawn;
let playersInTeam;
let spawnPlatform;
let mapObjects;
let map;

// Create player function
export function createPlayer(
  sceneParam,
  name,
  character,
  spawnPlatformParam,
  spawnParam,
  playersInTeamParam,
  mapParam
) {
  username = name;
  scene = sceneParam;
  spawn = spawnParam;
  playersInTeam = playersInTeamParam;
  spawnPlatform = spawnPlatformParam;
  map = mapParam;
  cursors = scene.input.keyboard.createCursorKeys();

  if (character === "Ninja") {
    ninjaAnimations(scene);
  }

  // Create player sprite!!
  player = scene.physics.add.sprite(-100, -100, "sprite");
  player.anims.play("idle", true); // Play idle animation

  // Listener to detect if player leaves the world bounds
  scene.events.on("update", () => {
    if (player.y > scene.physics.world.bounds.bottom + 50) {
      setTimeout(() => {
        currentHealth = 0; // sets health to 0 if the player leaves the world bounds
      }, 500);
    }
  });

  // Map
  if (map === "1") {
    mapObjects = lushyPeaksObjects;
  } else if (map === "2") {
    mapObjects = mangroveMeadowObjects;
  }

  // Sets spawn based on session storage data
  if (spawnPlatform === "bottom") {
    if (map === "1") {
      calculateSpawn(base, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("bottom", spawn, player)
    }
  } else if (spawnPlatform === "top") {
    if (map === "1") {
      calculateSpawn(platform, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("top", spawn, player)
    }
  }

  // Changes size of player frame so it can't clip. There are some issues where the frame changes to fit the animation size so this must be done to prevent that.
  frame = player.frame;
  player.body.setSize(frame.width - 35, frame.width - 10);
  player.body.setOffset(player.body.width / 2, 10);

  // Player name text
  playerName = scene.add.text(
    player.x,
    player.y - player.height + 10,
    username
  );
  playerName.setStyle({
    font: "bold 8pt Arial",
    fill: "#000000",
  });
  playerName.setOrigin(0.5, 0);

  // Health text
  healthText = scene.add.text(0, 0, "", {
    fontFamily: "Arial",
    fontSize: "10px",
    color: "#FFFFFF", // White
    stroke: "#000000", // Black
    strokeThickness: 4,
  });

  // Health bar
  healthBar = scene.add.graphics();

  // Triangle to show which one is the user. Dissapears when the player moves
  indicatorTriangle = scene.add.graphics();

  const triangle = new Phaser.Geom.Triangle(
    player.x,
    player.y - 62, // Top point
    player.x - 13,
    player.y - 72, // Left point
    player.x + 13,
    player.y - 72 // Right point
  );
  indicatorTriangle.fillStyle(0x99ab2c); // Green color
  indicatorTriangle.fillTriangleShape(triangle);

  // When the user taps, it shoots
  scene.input.on("pointerdown", function (pointer) {
    // If attack cooldown is finished
    if (canAttack) {
      isAttacking = true; // Sets variable for animation
      canAttack = false; // Sets attack cooldown variable

      setTimeout(() => {
        isAttacking = false;
        canAttack = true;
      }, 300); // After 300 miliseconds, the user can attack again

      // Play the sound
      let shurikenSound = scene.sound.add("shurikenThrow");
      shurikenSound.setVolume(0.1);

      shurikenSound.setRate(1.3); // Change pitch
      shurikenSound.play();

      // If the user has ninja character, it throws a shuriken
      if (character === "Ninja") {
        player.anims.play("throw", true); // Play throwing animation

        // Variables
        let weapon = "shuriken";
        let scale = 0.1;
        let velocity = 800;
        let angularVelocity = 2000;
        let damage = 1000;

        // Creates the projectile
        const projectile = scene.physics.add.image(player.x, player.y, weapon);
        projectile.setScale(scale);
        if (player.flipX === true) {
          velocity = -velocity; // If the player is flipped around, the direction of the shuriken is changed
        }
        projectile.setVelocity(velocity, 0); // Set projectile velocity if flipped
        projectile.body.allowGravity = false; // Disables gravity
        projectile.setAngularVelocity(angularVelocity); // Sets rotation speed

        // Adds overlap with every player in the opponent side
        for (const playerId in opponentPlayers) {
          const opponentPlayer = opponentPlayers[playerId];
          addOverlap(projectile, opponentPlayer);
        }

        // Adds overlap with the map
        mapObjects.forEach((mapObject) => {
          // Add collider between the object and each map object
          addOverlap(projectile, mapObject);
        });

        // Add overlap function
        function addOverlap(projectile, object) {
          // If the overlap has an opponent variable (if the object is a person)
          if (object.opponent) {
            scene.physics.add.overlap(
              projectile,
              object.opponent,
              function (projectile) {
                object.opCurrentHealth -= damage; // Damages the player for 1000 health
                object.updateHealthBar(); // Updates their health bar
                projectile.destroy(); // Destroy projectile on collision

                // Plays hit sound for a player
                let hitSound = scene.sound.add("shurikenHit");
                hitSound.setVolume(0.008); // Turns volume down
                hitSound.play();
              }
            );
          } else {
            // If the object is a
            scene.physics.add.overlap(
              projectile,
              object,
              function (projectile) {
                projectile.destroy(); // Destroy projectile on collision
                // Plays sound for hitting map
                let hitSound = scene.sound.add("shurikenHitWood");
                hitSound.setVolume(0.01); // Turns down volume
                hitSound.play();
              }
            );
          }
        }
        // Emits attack to other players with all the information
        socket.emit("attack", {
          x: player.x,
          y: player.y,
          weapon,
          scale,
          velocity,
          angularVelocity,
          damage,
          name,
        });
      }
    }
  });
}

// Function to set health of player from another file
function setCurrentHealth(damage) {
  currentHealth -= damage;
  updateHealthBar();
}
function updateHealthBar() {
  if (currentHealth <= 0) {
    currentHealth = 0;
    if (!dead) {
      dead = true;
      player.anims.play("dying", true);
      scene.input.enabled = false;
      player.alpha = 0.5;

      // document.getElementById("dark-overlay").style.display = "block";
      // document.getElementById("dark-overlay").style.backgroundColor =
      //   "rgba(0, 0, 0, 0.1)";
      // document.getElementById("dead").style.display = "block";
      // document.getElementById("your-team").textContent = `Your Team: ${
      //   playersInTeam - 1
      // }/${playersInTeam} Players`;
      socket.emit("death", { username, gameId, x: player.x, y: player.y });
    }
  }
  const healthPercentage = currentHealth / maxHealth;
  const displayedWidth = healthBarWidth * healthPercentage;

  healthBar.clear(); // Clear the graphics before redrawing

  const healthBarX = player.x - healthBarWidth / 2;
  let healthBarY;
  if (!dead) {
    healthBarY = player.y - (player.height / 2 + 4);
    healthText.setText(`${currentHealth}`);
  } else {
    healthBarY = player.y - (player.height / 2 - 24);
    healthText.setText("");
    playerName.setPosition(player.x, playerName.y + 30);
  }

  // Draw the background rectangle with the default fill color
  healthBar.fillStyle(0x595959);
  healthBar.fillRect(healthBarX, healthBarY, healthBarWidth, 9);

  // Draw the health bar background (stroke)
  healthBar.lineStyle(3, 0x000000);
  healthBar.strokeRoundedRect(healthBarX, healthBarY, healthBarWidth, 9, 3);

  // Draw the filled part of the health bar (green)
  healthBar.fillStyle(0x99ab2c);
  healthBar.fillRoundedRect(healthBarX, healthBarY, displayedWidth, 9, 3);

  healthText.setPosition(player.x - healthText.width / 2, healthBarY - 8);
  healthText.setDepth(2);
}

function calculateSpawn(platform, spawn, player) {
  const availableSpace = platform.width / playersInTeam; // Space for each player
  const leftMost = platform.getBounds().left; // Leftmost x cord of the platform
  const spawnY = platform.getTopCenter().y - player.height / 2; // Gets y cordinate for the player by calculating the center and subtracting half the player height. Since the player y is at the center.

  const spawnX = leftMost + (spawn * availableSpace) / 2 - player.width * 1.333; // Calculates spawnx by combining all the previous variables. 1.333 is multiplied to perfect the position of the spawn otherwise it is offset to the right.
  player.x = spawnX;
  player.y = spawnY;
}
function calculateMangroveSpawn(position, spawnParam, player) {
  let platform
  let spawn = String(spawnParam)
  if (position === 'top') {
    if (spawn === '1') {
      platform = tinyPlatform1
    } else if (spawn === '2') {
      platform = tinyPlatform2
    } else if (spawn === '3') {
      platform = tinyPlatform3
    }
  } else if (position === 'bottom') {
    if (spawn === '1') {
      platform = tinyPlatform4
    } else if (spawn === '2') {
      platform = tinyPlatform5
    } else if (spawn === '3') {
      platform = tinyPlatform6
    }
  }
 
  const availableSpace = platform.width
  const leftMost = platform.getBounds().left; // Leftmost x cord of the platform
  const spawnY = platform.getTopCenter().y - player.height / 2// Gets y cordinate for the player by calculating the center and subtracting half the player height. Since the player y is at the center.

  const spawnX =
    leftMost + (availableSpace / 2) - player.width
  player.x = spawnX;
  player.y = spawnY;
}

export function handlePlayerMovement(scene) {
  const speed = 250;
  const jumpSpeed = 400;

  // Keys. Player can use either arrow keys or WASD
  const leftKey =
    cursors.left.isDown || scene.input.keyboard.addKey("A").isDown;
  const rightKey =
    cursors.right.isDown || scene.input.keyboard.addKey("D").isDown;
  const upKey = cursors.up.isDown || scene.input.keyboard.addKey("W").isDown;

  // Left movement
  if (leftKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has moved
    }
    player.setVelocityX(-speed); // Sets velocity to negative so that it moves left
    player.flipX = true; // Mirrors the body of the player
    isMoving = true; // Sets the isMoving to true
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play("running", true);
    }
    // Right movement
  } else if (rightKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has moved
    }
    player.flipX = false; // Undos the mirror of the player
    player.setVelocityX(speed); // Sets velocity torwards right
    isMoving = true; // Sets moving variable
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play("running", true);
    }
  } else {
    stopMoving(); // If no key is being pressed, it calls the stop moving function
  }

  // Jumping
  if (upKey && player.body.touching.down && !dead) {
    // If player is touching ground and jumping
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has jumped
    }
    jump(); // Calls jump
  } else if (
    // If player is touching a wall while jumping
    (player.body.touching.left || (player.body.touching.right && !dead)) &&
    canWallJump &&
    upKey
  ) {
    wallJump(); // Calls walljump
  }
  if (
    (player.body.touching.left || (player.body.touching.right && !dead)) &&
    !isAttacking
  ) {
    player.anims.play("sliding", true); // Plays sliding animation
  }

  // Check if the jump animation has completed
  if (
    !player.anims.isPlaying &&
    !player.body.touching.down &&
    !player.body.touching.left &&
    !player.body.touching.right
  ) {
    fall(); // Plays falling animation if the player is not touching a wall or if any other animation is playing
  }

  // If no movement animations are playing, play the 'idle' animation
  if (
    !isMoving &&
    player.body.touching.down &&
    !isJumping &&
    !isAttacking &&
    !dead
  ) {
    idle();
  }

  updateHealthBar(); // Updates the health bar after the new player position
  playerName.setPosition(player.x, player.y - player.height + 10); // Updates the player nametag with the new position

  function stopMoving() {
    player.setVelocityX(0); // Sets the player to not moving
    isMoving = false;
  }

  function jump() {
    player.anims.play("jumping", true);
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }

  function wallJump() {
    canWallJump = false;
    player.anims.play("sliding", true);
    player.setVelocityY(-jumpSpeed);

    const wallJumpTween = scene.tweens.add({
      // This tween smooths the kickback from the walljump
      targets: player,
      x: player.x + (player.body.touching.left ? 50 : -50), // Moves the player -50 or 50 cords away depending on position
      duration: 200,
      ease: "Linear",
      onComplete: function () {
        canWallJump = true;
      },
    });
    wallJumpTween.play(); // Plays the tween
  }

  function fall() {
    player.anims.play("falling", true);
    isJumping = false;
  }

  function idle() {
    player.anims.play("idle", true);
  }
}

export { player, frame, currentHealth, setCurrentHealth, dead, calculateSpawn, calculateMangroveSpawn };
