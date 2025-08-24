// src/characters/Ninja.js
import socket from "../../socket";
import ReturningShuriken from "./ReturningShuriken";
import { ninjaAnimations } from "./anim";

class Ninja {
  // Main texture key used for this character's sprite
  static textureKey = "ninja";
  static getTextureKey() {
    return Ninja.textureKey;
  }
  static preload(scene, staticPath = "/assets") {
    // Load atlas and projectile/sounds
    scene.load.atlas(
      "ninja",
      `${staticPath}/ninja/spritesheet.png`,
      `${staticPath}/ninja/animations.json`
    );
    scene.load.image("shuriken", `${staticPath}/ninja/shuriken.png`);
    scene.load.audio("shurikenThrow", `${staticPath}/ninja/shurikenThrow.mp3`);
    scene.load.audio("shurikenHit", `${staticPath}/ninja/hit.mp3`);
    scene.load.audio("shurikenHitWood", `${staticPath}/ninja/woodhit.wav`);
  }

  static setupAnimations(scene) {
    ninjaAnimations(scene);
  }

  // Per-character gameplay and presentation stats
  static getStats() {
    return {
      maxHealth: 8000,
      ammoCooldownMs: 200,
      ammoReloadMs: 1400,
      ammoCapacity: 1, // three-segment ammo bar
      spriteScale: 1,
      body: {
        widthShrink: 35,
        heightShrink: 10,
        offsetXFromHalf: 0,
        offsetY: 10,
      },
    };
  }

  // Handle remote attack events for opponents using this character
  static handleRemoteAttack(scene, data, ownerWrapper) {
    // Support returning shuriken as emitted by local Ninja.attack()
    if (data.returning) {
      const ownerSprite = ownerWrapper ? ownerWrapper.opponent : null;
      // Instantiate a non-owner returning shuriken so visuals match
      const shuriken = new ReturningShuriken(
        scene,
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
      // Remote collision intentionally omitted (owner authoritative)
      return true;
    }

    // Fallback for simple projectiles if ever used
    const proj = scene.physics.add.image(
      data.x,
      data.y,
      data.weapon || "shuriken"
    );
    proj.setScale(data.scale || 0.1);
    proj.setVelocity((data.direction || 1) * 400, 0);
    proj.setAngularVelocity(data.rotationSpeed || 600);
    proj.body.allowGravity = false;
    return true;
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
      getAmmoCapacity,
      getAmmoCooldownMs,
      tryConsume,
      grantCharge,
      setCanAttack,
      setIsAttacking,
      drawAmmoBar,
    } = this.ammo;

    // Try to consume a charge and respect cooldown/attack gating
    if (!tryConsume()) return;
    setCanAttack(false);
    setIsAttacking(true);

    // Re-enable attack once per-shot cooldown elapses
    const cooldown = getAmmoCooldownMs();
    this.scene.time.delayedCall(cooldown, () => setCanAttack(true));

    setTimeout(() => setIsAttacking(false), 300);

    const sfx = this.scene.sound.add("shurikenThrow");
    sfx.setVolume(0.1);
    sfx.setRate(1.3);
    sfx.play();

    p.anims.play(
      this.scene.anims && this.scene.anims.exists("ninja-throw")
        ? "ninja-throw"
        : "throw",
      true
    );
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

    const returning = new ReturningShuriken(
      this.scene,
      { x: p.x, y: p.y },
      p,
      config
    );

    // Ninja perk: instantly grant one ammo charge when the shuriken returns
    returning.onReturn = () => {
      grantCharge(1);
      setCanAttack(true); // allow immediate shot after return
      drawAmmoBar();
    };

    const enemyList = [];
    const wrap = this.opponentPlayersRef || {};
    for (const k in wrap) enemyList.push(wrap[k]);
    returning.attachEnemyOverlap(enemyList);
    returning.attachMapOverlap(this.mapObjects);

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

    // draw UI after firing
    drawAmmoBar();
  }
}

export default Ninja;
