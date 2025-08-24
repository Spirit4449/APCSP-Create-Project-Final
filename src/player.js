// player.js
// NOTE: Refactored to remove circular dependency on game.js.
// socket now comes from standalone socket.js and opponentPlayers are passed into createPlayer.
import socket from "./socket";
function pdbg() {
  /* logging disabled */
}
import { lushyPeaksObjects, base, platform } from "./maps/lushyPeaks";
import {
  mangroveMeadowObjects,
  tinyPlatform1,
  tinyPlatform2,
  tinyPlatform3,
  tinyPlatform4,
  tinyPlatform5,
  tinyPlatform6,
} from "./maps/mangroveMeadow";
import {
  createFor as createCharacterFor,
  getTextureKey,
  resolveAnimKey,
  getStats,
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
// SFX state
let sfxWalkCooldown = 0;
let wasOnGround = false;

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
let ammoCooldownMs = 1200; // time between shots
let ammoReloadMs = 1200; // time to reload one charge
let ammoCapacity = 1; // number of segments
let ammoCharges = 1; // current charges available
let nextFireTime = 0; // timestamp (ms) when we can fire again
let reloadTimerMs = 0; // accumulates while reloading toward ammoReloadMs

let playerName;

let indicatorTriangle;

let username;
let gameId = window.location.pathname.split("/").filter(Boolean).pop();

let scene;
// Persist the selected character so movement helpers can resolve anim keys
let currentCharacter;

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
  // Remember the chosen character for animation resolution in update loop
  currentCharacter = character;
  pdbg();
  cursors = scene.input.keyboard.createCursorKeys();

  // Animations are registered globally in game.js via setupAll(scene)

  // Create player sprite!! Use character's texture key
  const textureKey = getTextureKey(character);
  player = scene.physics.add.sprite(-100, -100, textureKey);
  player.anims.play(resolveAnimKey(scene, currentCharacter, "idle"), true); // Play idle animation
  pdbg();

  // Apply character stats (health, ammo, sprite/body sizing)
  const stats = getStats(character);
  maxHealth = stats.maxHealth ?? maxHealth;
  currentHealth = maxHealth;
  ammoCooldownMs = stats.ammoCooldownMs ?? ammoCooldownMs;
  ammoReloadMs = stats.ammoReloadMs ?? ammoReloadMs;
  ammoCapacity = Math.max(1, stats.ammoCapacity ?? ammoCapacity);
  ammoCharges = ammoCapacity;
  nextFireTime = 0;
  reloadTimerMs = 0;
  if (stats.spriteScale && stats.spriteScale !== 1) {
    player.setScale(stats.spriteScale);
  }

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
  const bs = (stats && stats.body) || {};
  const widthShrink = bs.widthShrink ?? 35;
  const heightShrink = bs.heightShrink ?? 10;
  player.body.setSize(frame.width - widthShrink, frame.width - heightShrink);
  player.body.setOffset(
    player.body.width / 2 + (bs.offsetXFromHalf ?? 0),
    bs.offsetY ?? 10
  );

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
    // stats
    getAmmoCapacity: () => ammoCapacity,
    getAmmoCooldownMs: () => ammoCooldownMs,
    getAmmoReloadMs: () => ammoReloadMs,
    // state
    getCharges: () => ammoCharges,
    getNextFireTime: () => nextFireTime,
    // actions
    tryConsume: () => {
      const now = Date.now();
      if (!canAttack) return false;
      if (now < nextFireTime) return false;
      if (ammoCharges <= 0) return false;
      ammoCharges -= 1;
      nextFireTime = now + ammoCooldownMs;
      // start/restart reloading if not full
      if (ammoCharges < ammoCapacity && reloadTimerMs <= 0) reloadTimerMs = 0;
      return true;
    },
    grantCharge: (n = 1) => {
      ammoCharges = Math.min(ammoCapacity, ammoCharges + n);
      if (ammoCharges >= ammoCapacity) reloadTimerMs = 0;
      drawAmmoBar();
    },
    setCanAttack: (v) => (canAttack = v),
    setIsAttacking: (v) => (isAttacking = v),
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

  // Draw segmented charges (like Brawl Stars)
  const gap = 2;
  const segmentWidth = (ammoBarWidth - gap * (ammoCapacity - 1)) / ammoCapacity;
  for (let i = 0; i < ammoCapacity; i++) {
    const segX = x + i * (segmentWidth + gap);
    // Determine fill for this segment
    let percent = 0;
    if (i < ammoCharges) {
      percent = 1; // full charge
    } else if (i === ammoCharges) {
      // currently reloading this segment: percent based on reload progress
      percent = Phaser.Math.Clamp(reloadTimerMs / ammoReloadMs, 0, 1);
    } else {
      percent = 0; // future segments empty
    }
    // Colors
    const emptyColor = 0x333333;
    const readyColor = 0xff4040;
    const chargingColor = 0xb32121;
    const fillColor = percent >= 1 ? readyColor : chargingColor;
    // Fill base (empty)
    ammoBar.fillStyle(emptyColor, 0.5);
    ammoBar.fillRoundedRect(segX, y, segmentWidth, 6, 2);
    // Fill current percent
    if (percent > 0) {
      ammoBar.fillStyle(fillColor, 0.95);
      ammoBar.fillRoundedRect(segX, y, segmentWidth * percent, 6, 2);
    }
  }
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
      player.anims.play(
        resolveAnimKey(scene, currentCharacter, "running"),
        true
      );
      // Footstep SFX throttled
      sfxWalkCooldown += scene.game.loop.delta;
      if (sfxWalkCooldown >= 280) {
        sfxWalkCooldown = 0;
        scene.sound.play("sfx-step", { volume: 0.15 });
      }
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
      player.anims.play(
        resolveAnimKey(scene, currentCharacter, "running"),
        true
      );
      // Footstep SFX throttled
      sfxWalkCooldown += scene.game.loop.delta;
      if (sfxWalkCooldown >= 280) {
        sfxWalkCooldown = 0;
        scene.sound.play("sfx-step", { volume: 0.2 });
      }
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
    scene.sound.play("sfx-jump", { volume: 0.5 });
  } else if (
    // If player is touching a wall while jumping
    (player.body.touching.left || (player.body.touching.right && !dead)) &&
    canWallJump &&
    upKey
  ) {
    wallJump(); // Calls walljump
    scene.sound.play("sfx-walljump", { volume: 0.8 });
  }
  if (
    (player.body.touching.left || (player.body.touching.right && !dead)) &&
    !isAttacking
  ) {
    player.anims.play(resolveAnimKey(scene, currentCharacter, "sliding"), true); // Plays sliding animation
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

  // Landing detection (transition airborne -> grounded)
  const onGround = player.body.touching.down;
  if (!wasOnGround && onGround && !dead) {
    scene.sound.play("sfx-land", { volume: 0.6 });
  }
  wasOnGround = onGround;

  // Ammo reload tick
  if (ammoCharges < ammoCapacity) {
    reloadTimerMs += scene.game.loop.delta;
    if (reloadTimerMs >= ammoReloadMs) {
      reloadTimerMs = 0;
      ammoCharges = Math.min(ammoCapacity, ammoCharges + 1);
    }
  } else {
    reloadTimerMs = 0; // full, no reload progress
  }
  // Redraw ammo bar periodically (cheap draw)
  if (!dead) drawAmmoBar();

  // Fire trail (simpleaaaaaaaaaaaa particle substitute)
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
    player.anims.play(resolveAnimKey(scene, currentCharacter, "jumping"), true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }

  function wallJump() {
    canWallJump = false;
    player.anims.play(resolveAnimKey(scene, currentCharacter, "sliding"), true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    // Horizontal kick and sound handled above

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
    player.anims.play(resolveAnimKey(scene, currentCharacter, "falling"), true);
    pdbg();
    isJumping = false;
  }

  function idle() {
    player.anims.play(resolveAnimKey(scene, currentCharacter, "idle"), true);
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
    const prev = currentHealth;
    currentHealth = data.health;
    pdbg();
    // SFX: play damage vs heal feedback
    if (scene && scene.sound && !dead) {
      const delta = currentHealth - prev;
      if (delta < 0) {
        // Took damage
        scene.sound.play("sfx-damage", { volume: 0.1 });
      } else if (delta > 0) {
        const s = scene.sound.add("sfx-heal", { volume: 0.1 });
      }
    }
    if (currentHealth <= 0) {
      if (!dead) {
        dead = true;
        player.anims.play(
          resolveAnimKey(scene, currentCharacter, "dying"),
          true
        );
        scene.input.enabled = false;
        player.alpha = 0.5;
        pdbg();
      }
      currentHealth = 0; // force exact 0
    }
    updateHealthBar(); // always refresh (covers death case where movement loop stops)
  }
});
