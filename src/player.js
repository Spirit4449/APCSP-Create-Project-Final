// player.js
// NOTE: Refactored to remove circular dependency on game.js.
// socket now comes from standalone socket.js and opponentPlayers are passed into createPlayer.
import socket from "./socket";
function pdbg() {
  /* logging disabled */
}
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
import {
  setupFor as setupCharacterFor,
  createFor as createCharacterFor,
} from "./characters";
import { spawnDust, spawnFireFlame } from "./effects";
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
let currentHealth = 8000; // Client-side copy (display only)
let dead = false;

let healthBarWidth = 60;
let healthBar;
let healthText;
// Ammo/Cooldown bar (client-side only)
let ammoBar; // graphics
let ammoBarBack; // background graphics
let ammoBarWidth = 60;
let ammoCooldownMs = 1200; // 2s
let ammoElapsed = 0; // time since last shot (ms)
let ammoReady = true;
let ammoTween; // active tween reference for smooth fill

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
let opponentPlayersRef; // injected from game.js to avoid circular import
let fireTrailTimer = 0;
let fireTrailInterval = 45; // ms
let dustTimer = 0;
const dustInterval = 70; // ms between dust puffs when running

// Create player function
export function createPlayer(
  sceneParam,
  name,
  character,
  spawnPlatformParam,
  spawnParam,
  playersInTeamParam,
  mapParam,
  opponentPlayersParam
) {
  username = name;
  scene = sceneParam;
  spawn = spawnParam;
  playersInTeam = playersInTeamParam;
  spawnPlatform = spawnPlatformParam;
  map = mapParam;
  opponentPlayersRef = opponentPlayersParam;
  pdbg();
  cursors = scene.input.keyboard.createCursorKeys();

  setupCharacterFor(scene, character);

  // Create player sprite!!
  player = scene.physics.add.sprite(-100, -100, "sprite");
  player.anims.play("idle", true); // Play idle animation
  pdbg();

  // Listener to detect if player leaves the world bounds
  scene.events.on("update", () => {
    if (player.y > scene.physics.world.bounds.bottom + 50) {
      setTimeout(() => {
        // Request a suicide if player falls out (treat as self-hit to 99999)
        if (!dead) {
          socket.emit("hit", {
            attacker: username,
            target: username,
            damage: 99999,
            gameId,
          });
          pdbg();
        }
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
      calculateMangroveSpawn("bottom", spawn, player);
    }
  } else if (spawnPlatform === "top") {
    if (map === "1") {
      calculateSpawn(platform, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("top", spawn, player);
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
  // Ammo bar background & fill (render order: background, fill)
  ammoBarBack = scene.add.graphics();
  ammoBar = scene.add.graphics();

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

  // Character controller wiring (centralized per character)
  const ammoHooks = {
    // getters
    getAmmoReady: () => ammoReady,
    getCanAttack: () => canAttack,
    getAmmoCooldownMs: () => ammoCooldownMs,
    getAmmoTween: () => ammoTween,
    // setters
    setAmmoReady: (v) => (ammoReady = v),
    setCanAttack: (v) => (canAttack = v),
    setIsAttacking: (v) => (isAttacking = v),
    setAmmoElapsed: (v) => (ammoElapsed = v),
    setAmmoTween: (t) => (ammoTween = t),
    // view
    drawAmmoBar: () => drawAmmoBar(),
  };

  const ctrl = createCharacterFor(character, {
    scene,
    player,
    username,
    gameId,
    opponentPlayersRef,
    mapObjects,
    ammoHooks,
  });
  if (ctrl && ctrl.attachInput) ctrl.attachInput();
}

// Function to set health of player from another file
function setCurrentHealth(damage) {
  // Deprecated: server authoritative. Kept for compatibility (no-op display update only)
  currentHealth -= damage;
  if (currentHealth < 0) currentHealth = 0;
  updateHealthBar();
}
function updateHealthBar() {
  if (currentHealth <= 0) currentHealth = 0;
  const healthPercentage = currentHealth / maxHealth;
  const displayedWidth = healthBarWidth * healthPercentage;
  pdbg();

  healthBar.clear(); // Clear the graphics before redrawing

  const healthBarX = player.x - healthBarWidth / 2;
  let healthBarY;
  if (!dead) {
    healthBarY = player.y - (player.height / 2 + 8); // shift up slightly to make space for ammo bar
    healthText.setText(`${currentHealth}`);
  } else {
    healthBarY = player.y - (player.height / 2 - 24);
    // Show 0 instead of blank when dead
    healthText.setText(`0`);
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

  // Draw ammo bar underneath health (only for local player & when alive)
  drawAmmoBar(healthBarX, healthBarY + 11);
}

function drawAmmoBar(forcedX, forcedY) {
  if (!ammoBar || !ammoBarBack) return;
  const percent = Phaser.Math.Clamp(ammoElapsed / ammoCooldownMs, 0, 1);
  const x = forcedX !== undefined ? forcedX : player.x - ammoBarWidth / 2;
  const y =
    forcedY !== undefined ? forcedY : player.y - (player.height / 2 + 8) + 11;
  ammoBarBack.clear();
  ammoBar.clear();
  // Background
  ammoBarBack.fillStyle(0x222222, 0.65);
  ammoBarBack.fillRoundedRect(x, y, ammoBarWidth, 6, 3);
  ammoBarBack.lineStyle(2, 0x000000, 0.9);
  ammoBarBack.strokeRoundedRect(x, y, ammoBarWidth, 6, 3);
  // Fill gradient simulation (two passes)
  // Red color scheme (darker while charging, bright when ready)
  const chargingColor = 0xb32121;
  const readyColor = 0xff4040;
  // Simple interpolate between dark->bright based on percent
  const r1 = (chargingColor >> 16) & 0xff;
  const g1 = (chargingColor >> 8) & 0xff;
  const b1 = chargingColor & 0xff;
  const r2 = (readyColor >> 16) & 0xff;
  const g2 = (readyColor >> 8) & 0xff;
  const b2 = readyColor & 0xff;
  const r = Math.round(r1 + (r2 - r1) * percent);
  const g = Math.round(g1 + (g2 - g1) * percent);
  const b = Math.round(b1 + (b2 - b1) * percent);
  const fillColor = (r << 16) | (g << 8) | b;
  ammoBar.fillStyle(fillColor, 0.95);
  ammoBar.fillRoundedRect(x, y, ammoBarWidth * percent, 6, 3);
  // Small highlight overlay for polish
  ammoBar.fillStyle(0xffffff, 0.25 * (percent < 1 ? 1 : 0.6));
  ammoBar.fillRoundedRect(x, y, ammoBarWidth * percent, 2, {
    tl: 3,
    tr: 3,
    bl: 0,
    br: 0,
  });
  ammoBar.setDepth(2);
  ammoBarBack.setDepth(1);
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
  let platform;
  let spawn = String(spawnParam);
  if (position === "top") {
    if (spawn === "1") {
      platform = tinyPlatform1;
    } else if (spawn === "2") {
      platform = tinyPlatform2;
    } else if (spawn === "3") {
      platform = tinyPlatform3;
    }
  } else if (position === "bottom") {
    if (spawn === "1") {
      platform = tinyPlatform4;
    } else if (spawn === "2") {
      platform = tinyPlatform5;
    } else if (spawn === "3") {
      platform = tinyPlatform6;
    }
  }

  const availableSpace = platform.width;
  const leftMost = platform.getBounds().left; // Leftmost x cord of the platform
  const spawnY = platform.getTopCenter().y - player.height / 2; // Gets y cordinate for the player by calculating the center and subtracting half the player height. Since the player y is at the center.

  const spawnX = leftMost + availableSpace / 2 - player.width;
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

  // Fire trail (simple particle substitute)
  fireTrailTimer += scene.game.loop.delta;
  dustTimer += scene.game.loop.delta;
  if (
    !dead &&
    fireTrailTimer >= fireTrailInterval &&
    isMoving && // only when actually moving horizontally
    !dead
  ) {
    fireTrailTimer = 0;
    const baseX = player.x - (player.flipX ? -14 : 14);
    const baseY = player.y + 8;
    // Spawn 1-2 layered flames each interval
    const count = Phaser.Math.Between(1, 2);
    for (let i = 0; i < count; i++) {
      spawnFireFlame(scene, baseX, baseY);
    }
  }

  // Ground running dust (only while on ground & moving)
  if (
    !dead &&
    isMoving &&
    player.body.touching.down &&
    dustTimer >= dustInterval
  ) {
    dustTimer = 0;
    const dustY = player.y + player.height * 0.45; // near feet
    const dustX = player.x + (player.flipX ? -18 : 18) * 0.3;
    spawnDust(scene, dustX, dustY);
    if (Math.random() < 0.3) {
      // occasional extra puff for variability
      spawnDust(
        scene,
        dustX + Phaser.Math.Between(-6, 6),
        dustY + Phaser.Math.Between(-2, 2)
      );
    }
  }

  function stopMoving() {
    player.setVelocityX(0); // Sets the player to not moving
    isMoving = false;
  }

  function jump() {
    player.anims.play("jumping", true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }

  function wallJump() {
    canWallJump = false;
    player.anims.play("sliding", true);
    pdbg();
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
    pdbg();
    isJumping = false;
  }

  function idle() {
    player.anims.play("idle", true);
    pdbg();
  }
}

export {
  player,
  frame,
  currentHealth,
  setCurrentHealth,
  dead,
  calculateSpawn,
  calculateMangroveSpawn,
};

// Listen for authoritative health updates from server
socket.on("health-update", (data) => {
  if (data.gameId !== gameId) return;
  if (data.username === username) {
    currentHealth = data.health;
    pdbg();
    if (currentHealth <= 0) {
      if (!dead) {
        dead = true;
        player.anims.play("dying", true);
        scene.input.enabled = false;
        player.alpha = 0.5;
        pdbg();
      }
      currentHealth = 0; // force exact 0
    }
    updateHealthBar(); // always refresh (covers death case where movement loop stops)
  }
});
