// opplayer.js

import { base, platform } from "./Maps/lushyPeaks";
import { calculateSpawn, calculateMangroveSpawn } from "./player";
export default class OpPlayer {
  constructor(
    scene,
    character,
    username,
    team,
    spawnPlatform,
    spawn,
    playersInTeam,
    map,
  ) {
    this.scene = scene;
    this.character = character;
    this.username = username;
    this.team = team;
    this.spawnPlatform = spawnPlatform;
    this.spawn = spawn;
    this.map = map;
    this.mapObjects
    this.playersInTeam = playersInTeam;
    this.opMaxHealth = 8000;
    this.opCurrentHealth = 8000;
    this.opHealthBarWidth = 60;
    this.createOpPlayer();
  }

  createOpPlayer() {
    // Creates the sprite
    this.opponent = this.scene.physics.add.sprite(-100, -100, "sprite");
    this.opponent.body.allowGravity = false;
    this.opponent.anims.play("idle", true);

    // Sets spawns
    if (this.spawnPlatform === "bottom") {
      if (this.map === '1') {
        calculateSpawn(base, this.spawn, this.opponent);
      } else if (this.map === '2') {
        calculateMangroveSpawn("bottom", this.spawn, this.opponent);
      }
    } else if (this.spawnPlatform === "top") {
      if (this.map === '1') {
        calculateSpawn(platform, this.spawn, this.opponent);
      } else if (this.map === '2') {
        calculateMangroveSpawn("top", this.spawn, this.opponent);
      }
    }

    // Changes frame size to prevent wall clipping
    this.opFrame = this.opponent.frame;
    this.opponent.body.setSize(
      this.opFrame.width - 35,
      this.opFrame.width - 10
    );
    this.opponent.body.setOffset(this.opponent.body.width / 2, 10);

    // Sets the text of the name to username
    this.opPlayerName = this.scene.add.text(
      this.opponent.x,
      this.opponent.y - this.opponent.height + 10,
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

    // Initially updates health bar
    this.updateHealthBar();
  }

  updateHealthBar(dead = false, healthBarY = 0) {
    if (this.opCurrentHealth < 0) {
      // Prevents health from going negative
      this.opCurrentHealth = 0;
    }
    // Sets percentage of health
    const healthPercentage = this.opCurrentHealth / this.opMaxHealth;
    const displayedWidth = this.opHealthBarWidth * healthPercentage;

    // Clears previous health bar graphics
    this.opHealthBar.clear();

    // Sets x in the center
    const healthBarX = this.opponent.x - this.opHealthBarWidth / 2;
    // If player is dead, sets the y value lower
    if (dead === false) {
      healthBarY = this.opponent.y - (this.opponent.height / 2 + 4);
      this.opHealthText.setText(`${this.opCurrentHealth}`);
    } else {
      this.opHealthText.setText("");
    }
    this.opHealthBar.fillStyle(0x595959);
    this.opHealthBar.fillRect(healthBarX, healthBarY, this.opHealthBarWidth, 9);

    // Creates a black border around healthbar
    this.opHealthBar.lineStyle(3, 0x000000);
    this.opHealthBar.strokeRoundedRect(
      healthBarX,
      healthBarY,
      this.opHealthBarWidth,
      9,
      3
    );

    if (this.team === "user") {
      this.opHealthBar.fillStyle(0x2e88ca); // blue color for user team
    } else {
      this.opHealthBar.fillStyle(0xbb5c39); // red color for op team
    }
    this.opHealthBar.fillRoundedRect(
      healthBarX,
      healthBarY,
      displayedWidth,
      9,
      3
    );

    this.opHealthText.setPosition(
      this.opponent.x - this.opHealthText.width / 2,
      healthBarY - 8
    );
    this.opHealthText.setDepth(2);
  }
}

