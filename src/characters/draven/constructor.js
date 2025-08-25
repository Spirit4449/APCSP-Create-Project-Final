// src/characters/draven/draven.js
import socket from "../../socket";
import { animations } from "./anim";
import DravenEffects from "./effects";

// Single source of truth for this character's name/key
const NAME = "draven";

class draven {
  // Main texture key used for this character's sprite
  static textureKey = NAME;
  // Optional per-player effects class to be used for this character
  static Effects = DravenEffects;
  static getTextureKey() {
    return draven.textureKey;
  }
  static preload(scene, staticPath = "/assets") {
    // Load atlas and projectile/sounds
    scene.load.atlas(
      NAME,
      `${staticPath}/${NAME}/spritesheet.png`,
      `${staticPath}/${NAME}/animations.json`
    );
    // Ensure nearest-neighbor sampling for crisp pixel art
    scene.load.on(Phaser.Loader.Events.COMPLETE, () => {
      const tex = scene.textures.get(NAME);
      if (tex && tex.source && tex.source[0] && tex.source[0].glTexture) {
        // WebGL path: set filter to NEAREST
        tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
      }
      // Also set global default for this scene's game (Phaser 3.70)
      if (scene.game && scene.game.config) {
        scene.game.config.pixelArt = true;
        scene.game.config.antialias = false;
      }
    });
  }

  static setupAnimations(scene) {
    animations(scene);
  }

  // Remote attack visualization for draven (slash effect only)
  static handleRemoteAttack(scene, data, ownerWrapper) {}

  // Per-character gameplay and presentation stats
  static getStats() {
    return {
      maxHealth: 12000,
      ammoCooldownMs: 100,
      ammoReloadMs: 1600,
      ammoCapacity: 2,
      damage: 1400,
      spriteScale: 1.2,
      body: {
        widthShrink: 220,
        heightShrink: 195,
        offsetXFromHalf: 90,
        offsetY: 113,
        // Shift body to the right when facing left to cover staff
        flipOffset: 5,
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

  // Common default behavior for firing attacks
  performDefaultAttack(payloadBuilder, onAfterFire) {
    const {
      getAmmoCooldownMs,
      tryConsume,
      setCanAttack,
      setIsAttacking,
      drawAmmoBar,
    } = this.ammo;

    if (!tryConsume()) return false;
    setIsAttacking(true);
    setCanAttack(false);

    const cooldown = getAmmoCooldownMs();
    this.scene.time.delayedCall(cooldown, () => setCanAttack(true));
    setTimeout(() => setIsAttacking(false), 250);

    const payload =
      typeof payloadBuilder === "function" ? payloadBuilder() : null;
    if (payload) socket.emit("attack", payload);
    drawAmmoBar();
    if (typeof onAfterFire === "function") onAfterFire();
    return true;
  }

  // Draven-specific: simple staff arc swipe similar to Thorg's visual for now
  handlePointerDown() {
    const p = this.player;
    const direction = p.flipX ? -1 : 1;
    const range = 105;
    const duration = 260;
    const stats =
      (this.constructor.getStats && this.constructor.getStats()) || {};
    const damage = stats.damage;

    return this.performDefaultAttack(() => {
      if (
        this.scene.anims &&
        (this.scene.anims.exists(`${NAME}-throw`) ||
          this.scene.anims.exists("throw"))
      ) {
        p.anims.play(
          this.scene.anims.exists(`${NAME}-throw`) ? `${NAME}-throw` : "throw",
          true
        );
      }

      // Visual placeholder: small arc draw using graphics
      const g = this.scene.add.graphics();
      g.setDepth(5);
      g.setBlendMode(Phaser.BlendModes.ADD);
      const main = 0xffe29e;
      const outline = 0xfff6d1;
      const thickness = Math.max(12, Math.round(range * 0.18));
      const rx = range;
      const ry = Math.round(range * 0.55);
      const rxInner = Math.max(4, rx - thickness);
      const ryInner = Math.max(3, ry - Math.round(thickness * 0.7));
      const cx = () => p.x + (direction >= 0 ? 20 : -20);
      const cy = () => p.y - p.height * 0.15;
      const ept = (theta, rx0, ry0) => ({
        x: cx() + direction * rx0 * Math.cos(theta),
        y: cy() + ry0 * Math.sin(theta),
      });

      const startRad = Phaser.Math.DegToRad(-80);
      const endRad = Phaser.Math.DegToRad(80);
      const proxy = { t: 0 };
      const steps = 18;
      this.scene.tweens.add({
        targets: proxy,
        t: 1,
        duration,
        ease: "Sine.easeOut",
        onUpdate: () => {
          const now = Phaser.Math.Linear(startRad, endRad, proxy.t);
          const t0 = Phaser.Math.Linear(
            startRad,
            now,
            Math.max(0, proxy.t - 0.25)
          );
          g.clear();
          g.fillStyle(main, 0.85);
          g.beginPath();
          for (let i = 0; i <= steps; i++) {
            const a = Phaser.Math.Linear(t0, now, i / steps);
            const pnt = ept(a, rx, ry);
            if (i === 0) g.moveTo(pnt.x, pnt.y);
            else g.lineTo(pnt.x, pnt.y);
          }
          for (let i = steps; i >= 0; i--) {
            const a = Phaser.Math.Linear(t0, now, i / steps);
            const pnt = ept(a, rxInner, ryInner);
            g.lineTo(pnt.x, pnt.y);
          }
          g.closePath();
          g.fillPath();
          g.lineStyle(Math.max(2, Math.floor(thickness * 0.3)), outline, 0.9);
          g.beginPath();
          for (let i = 0; i <= steps; i++) {
            const a = Phaser.Math.Linear(
              Math.max(t0, now - 0.25),
              now,
              i / steps
            );
            const pnt = ept(a, rx + 2, ry + 1);
            if (i === 0) g.moveTo(pnt.x, pnt.y);
            else g.lineTo(pnt.x, pnt.y);
          }
          g.strokePath();
        },
        onComplete: () => g.destroy(),
      });

      // Owner-side simple hit detection in arc
      const already = new Set();
      const enemies = Object.values(this.opponentPlayersRef || {});
      const tip = { x: () => cx() + direction * rx, y: () => cy() };
      this.scene.time.delayedCall(Math.floor(duration * 0.5), () => {
        for (const wrap of enemies) {
          const spr = wrap && wrap.opponent;
          const name = wrap && wrap.username;
          if (!spr || !name || already.has(name)) continue;
          const dist = Phaser.Math.Distance.Between(
            spr.x,
            spr.y,
            tip.x(),
            tip.y()
          );
          const dx = spr.x - cx();
          if (dist <= 50 && Math.sign(dx) === Math.sign(direction)) {
            already.add(name);
            socket.emit("hit", {
              attacker: this.username,
              target: name,
              damage,
              gameId: this.gameId,
            });
          }
        }
      });

      return {
        name: this.username,
        type: `${NAME}-slash`,
        direction,
        range,
        duration,
      };
    });
  }
}

export default draven;
