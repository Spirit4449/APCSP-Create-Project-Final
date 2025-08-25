// opplayer.js

import { base, platform } from "./maps/lushyPeaks";
import { calculateSpawn, calculateMangroveSpawn } from "./player";
import {
  getTextureKey,
  resolveAnimKey,
  getStats,
  getEffectsClass,
} from "./characters";
import socket from "./socket";

export default class OpPlayer {
  constructor(
    scene,
    character,
    username,
    team,
    spawnPlatform,
    spawn,
    playersInTeam,
    map
  ) {
    this.scene = scene;
    this.character = character;
    this.username = username;
    this.team = team;
    this.spawnPlatform = spawnPlatform;
    this.spawn = spawn;
    this.map = map;
    this.mapObjects;
    this.playersInTeam = playersInTeam;
    this.opMaxHealth = 8000;
    this.opCurrentHealth = 8000;
    this.opHealthBarWidth = 60;
    this.movementTween = null; // Store reference to current movement tween
    this.effects = null; // per-opponent effects (e.g., Draven fire)
    this.createOpPlayer();
  }

  createOpPlayer() {
    // Creates the sprite
    const textureKey = getTextureKey(this.character);
    this.opponent = this.scene.physics.add.sprite(-100, -100, textureKey);
    // Avoid first-frame pop: hide until frame/body configured and spawn applied
    this.opponent.setVisible(false);
    const stats = getStats(this.character);
    this.bodyConfig = (stats && stats.body) || {};
    // Apply per-character max health for correct bar scaling
    if (stats && typeof stats.maxHealth === "number") {
      this.opMaxHealth = stats.maxHealth;
      this.opCurrentHealth = this.opMaxHealth;
    }
    if (stats.spriteScale && stats.spriteScale !== 1) {
      this.opponent.setScale(stats.spriteScale);
    }
    this.opponent.body.allowGravity = false;
    this.opponent.anims.play(
      resolveAnimKey(this.scene, this.character, "idle"),
      true
    );

    // Configure frame/body BEFORE computing spawn for correct initial grounding
    this.opFrame = this.opponent.frame;
    const bs = this.bodyConfig;
    const widthShrink = bs.widthShrink ?? 35;
    const heightShrink = bs.heightShrink ?? 10;
    this.opponent.body.setSize(
      this.opFrame.width - widthShrink,
      this.opFrame.width - heightShrink
    );
    this.applyFlipOffset();

    // Per-character effects: instantiate if available for this character
    const EffectsCls = getEffectsClass(this.character);
    if (EffectsCls) {
      this.effects = new EffectsCls(this.scene, this.opponent);
      this.scene.events.on("update", this._onSceneUpdate, this);
    }

    // Sets spawns
    if (this.spawnPlatform === "bottom") {
      if (this.map === "1") {
        calculateSpawn(base, this.spawn, this.opponent);
      } else if (this.map === "2") {
        calculateMangroveSpawn("bottom", this.spawn, this.opponent);
      }
    } else if (this.spawnPlatform === "top") {
      if (this.map === "1") {
        calculateSpawn(platform, this.spawn, this.opponent);
      } else if (this.map === "2") {
        calculateMangroveSpawn("top", this.spawn, this.opponent);
      }
    }

    // Reveal only after position is finalized
    this.opponent.setVisible(true);

    // Sets the text of the name to username
    const bodyTop = this.opponent.body
      ? this.opponent.body.y
      : this.opponent.y - this.opponent.height / 2;
    this.opPlayerName = this.scene.add.text(
      this.opponent.x,
      bodyTop - 20,
      this.username
    );
    this.opPlayerName.setStyle({
      font: "bold 8pt Arial",
      fill: "#000000",
    });
    this.opPlayerName.setOrigin(0.5, 0);

    this.opHealthText = this.scene.add.text(0, 0, "", {
      fontFamily: "Arial",
      fontSize: "10px",
      color: "#FFFFFF",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.opHealthBar = this.scene.add.graphics();

    // Initially updates health bar and name positioning
    this.updateHealthBar();
    this.updateUIPosition();

    // Listen for health updates for this opponent
    socket.on("health-update", (data) => {
      // data: { username, health, gameId }
      if (data.username === this.username) {
        this.opCurrentHealth = data.health;
        if (this.opCurrentHealth <= 0) {
          this.opCurrentHealth = 0;
          this.updateHealthBar(true); // show dead styling & 0
          // Stop effects if any
          if (this.effects) {
            // no explicit destroy needed, just stop updating
            this.scene.events.off("update", this._onSceneUpdate, this);
            this.effects = null;
          }
        } else {
          this.updateHealthBar();
        }
      }
    });
  }

  _onSceneUpdate() {
    if (this.effects && this.opponent) {
      // Determine simple moving state: horizontal velocity or recent tweening
      const moving =
        (this.opponent.body && Math.abs(this.opponent.body.velocity.x) > 5) ||
        !!this.movementTween;
      const isDead = this.opCurrentHealth <= 0;
      this.effects.update(this.scene.game.loop.delta, moving, isDead);
    }
  }

  // Adjust body offset depending on facing; uses optional flipOffset from body config
  applyFlipOffset() {
    if (!this.opponent || !this.opponent.body) return;
    const bs = this.bodyConfig || {};
    const offsetXFromHalf = bs.offsetXFromHalf ?? 0;
    const offsetY = bs.offsetY ?? 10;
    const flipOffset = bs.flipOffset || 0; // falsy -> 0
    const extra = this.opponent.flipX ? flipOffset : 0;
    this.opponent.body.setOffset(
      this.opponent.body.width / 2 + offsetXFromHalf + extra,
      offsetY
    );
  }

  // Public helper to sync UI positions immediately (used after teleports/initial position set)
  updateUIPosition() {
    if (!this.opponent) return;
    const bodyTop = this.opponent.body
      ? this.opponent.body.y
      : this.opponent.y - this.opponent.height / 2;
    if (this.opPlayerName) {
      this.opPlayerName.setPosition(this.opponent.x, bodyTop - 20);
    }
    this.updateHealthBar(false);
  }

  updateHealthBar(dead = false, healthBarY) {
    if (this.opCurrentHealth < 0) {
      // Prevents health from going negative
      this.opCurrentHealth = 0;
    }
    // Sets percentage of health
    const healthPercentage = Math.max(
      0,
      Math.min(1, this.opCurrentHealth / this.opMaxHealth)
    );
    const displayedWidth = this.opHealthBarWidth * healthPercentage;

    // Clears previous health bar graphics
    this.opHealthBar.clear();

    // Sets x in the center
    const healthBarX = this.opponent.x - this.opHealthBarWidth / 2;
    // If no explicit Y provided, anchor to the sprite's body top so it doesn't jump
    const bodyTop = this.opponent.body
      ? this.opponent.body.y
      : this.opponent.y - this.opponent.height / 2;
    const y =
      typeof healthBarY === "number" && !Number.isNaN(healthBarY)
        ? healthBarY
        : bodyTop - 15;
    if (dead === false) {
      this.opHealthText.setText(`${this.opCurrentHealth}`);
    } else {
      this.opHealthText.setText(`0`);
    }
    this.opHealthBar.fillStyle(0x595959);
    this.opHealthBar.fillRect(healthBarX, y, this.opHealthBarWidth, 9);

    // Creates a black border around healthbar
    this.opHealthBar.lineStyle(3, 0x000000);
    this.opHealthBar.strokeRoundedRect(
      healthBarX,
      y,
      this.opHealthBarWidth,
      9,
      3
    );

    if (this.team === "user") {
      this.opHealthBar.fillStyle(0x2e88ca); // blue color for user team
    } else {
      this.opHealthBar.fillStyle(0xbb5c39); // red color for op team
    }
    this.opHealthBar.fillRoundedRect(healthBarX, y, displayedWidth, 9, 3);

    this.opHealthText.setPosition(
      this.opponent.x - this.opHealthText.width / 2,
      y - 8
    );
    this.opHealthText.setDepth(2);
  }

  // Clean up method to stop any active tweens and remove sprites
  destroy() {
    if (this.movementTween) {
      this.movementTween.remove();
      this.movementTween = null;
    }
    if (this.effects) {
      this.scene.events.off("update", this._onSceneUpdate, this);
      this.effects = null;
    }
    if (this.opponent) {
      this.opponent.destroy();
    }
    if (this.opPlayerName) {
      this.opPlayerName.destroy();
    }
    if (this.opHealthText) {
      this.opHealthText.destroy();
    }
    if (this.opHealthBar) {
      this.opHealthBar.destroy();
    }
  }
}
