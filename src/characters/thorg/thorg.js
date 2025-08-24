// src/characters/thorg/thorg.js
import socket from "../../socket";
import { thorgAnimations } from "./anim";

class Thorg {
  // Main texture key used for this character's sprite
  static textureKey = "thorg";
  static getTextureKey() {
    return Thorg.textureKey;
  }
  static preload(scene, staticPath = "/assets") {
    // Load atlas and projectile/sounds
    scene.load.atlas(
      "thorg",
      `${staticPath}/thorg/spritesheet.png`,
      `${staticPath}/thorg/animations.json`
    );
    // scene.load.image("shuriken", `${staticPath}/thorg/shuriken.png`);
    // scene.load.audio("shurikenThrow", `${staticPath}/thorg/shurikenThrow.mp3`);
    // scene.load.audio("shurikenHit", `${staticPath}/thorg/hit.mp3`);
  }

  static setupAnimations(scene) {
    thorgAnimations(scene);
  }

  // Per-character gameplay and presentation stats
  static getStats() {
    return {
      maxHealth: 12000,
      ammoCooldownMs: 100,
      ammoReloadMs: 1600,
      ammoCapacity: 2,
      spriteScale: 0.7,
      body: {
        widthShrink: 30,
        heightShrink: 8,
        offsetXFromHalf: -43,
        offsetY: 8,
      },
    };
  }

  constructor({
    scene,
    player,
    username,
    gameId,
    opponentPlayersRef,
    mapObjects,
    ammoHooks,
  }) {
    this.scene = scene;
    this.player = player;
    this.username = username;
    this.gameId = gameId;
    this.opponentPlayersRef = opponentPlayersRef;
    this.mapObjects = mapObjects;
    this.ammo = ammoHooks;
  }

  attachInput() {
    this.scene.input.on("pointerdown", () => this.handlePointerDown());
  }

  handlePointerDown() {
    const p = this.player;
    const {
      getAmmoCooldownMs,
      tryConsume,
      setCanAttack,
      setIsAttacking,
      drawAmmoBar,
    } = this.ammo;

    if (!tryConsume()) return;
    setIsAttacking(true);
    setCanAttack(false);

    const direction = p.flipX ? -1 : 1;
    const config = {
      direction,
      username: this.username,
      gameId: this.gameId,
      isOwner: true,
      damage: 1000,
      rotationSpeed: 2000,
      forwardDistance: 500,
      arcHeight: 160,
      outwardDuration: 380,
      returnSpeed: 900,
    };

    const cooldown = getAmmoCooldownMs();
    this.scene.time.delayedCall(cooldown, () => setCanAttack(true));

    setTimeout(() => setIsAttacking(false), 300);

    drawAmmoBar();

    const enemyList = [];
    const wrap = this.opponentPlayersRef || {};
    for (const k in wrap) enemyList.push(wrap[k]);

    socket.emit("attack", {
      x: p.x,
      y: p.y,
      scale: config.scale || 0.1,
      damage: config.damage,
      name: this.username,
      returning: true,
      direction,
      forwardDistance: config.forwardDistance,
      outwardDuration: config.outwardDuration,
      returnSpeed: config.returnSpeed,
      rotationSpeed: config.rotationSpeed,
    });
  }
}

export default Thorg;
