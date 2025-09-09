// src/characters/draven/draven.js
import socket from "../../socket";
import { characterStats } from "../../lib/characterStats.js";
import { animations } from "./anim";
import DravenEffects from "./effects";
import { performDravenSplashAttack, spawnExplosion } from "./attack";

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
    // Explosion atlas (separate) for splash attack visual
    scene.load.atlas(
      `${NAME}-explosion`,
      `${staticPath}/${NAME}/explosion.png`,
      `${staticPath}/${NAME}/explosion.json`
    );
    // Fireball / splash SFX
    scene.load.audio("draven-fireball", `${staticPath}/${NAME}/fireball.mp3`);
    if (!scene.sound.get("draven-hit")) {
      scene.load.audio("draven-hit", `${staticPath}/draven/hit.mp3`);
    }
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
    // Create explosion animation once
    if (!scene.anims.exists(`${NAME}-explosion`)) {
      const tex = scene.textures.get(`${NAME}-explosion`);
      if (tex) {
        const frames = tex.getFrameNames().filter((f) => /explosion/i.test(f));
        if (frames.length) {
          scene.anims.create({
            key: `${NAME}-explosion`,
            frames: frames.map((f) => ({ key: `${NAME}-explosion`, frame: f })),
            frameRate: 28,
            repeat: 0,
          });
        }
      }
    }
  }

  // Remote attack visualization: replicate moving splash & delayed explosion
  static handleRemoteAttack(scene, data, ownerWrapper) {
    if (!data || data.type !== "draven-splash") return false;
    const ownerSprite = ownerWrapper && ownerWrapper.opponent;
    if (!ownerSprite) return true; // nothing to draw
    const delay = data.delay || 500;
    const tipOffset = data.tipOffset || 90;
    // Removed opponent-side debug splash rectangle; only show final explosion now
    scene.time.delayedCall(delay, () => {
      if (!ownerSprite || !ownerSprite.active) return;
      const dir = ownerSprite.flipX ? -1 : 1;
      const ex = ownerSprite.x + (dir > 0 ? tipOffset : -tipOffset);
      const ey = ownerSprite.y - ownerSprite.height * 0.15;
      spawnExplosion(scene, ex, ey);
    });
    return true;
  }

  // Per-character gameplay and presentation stats
  static getStats() {
    return characterStats.draven;
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
    // We'll clear isAttacking when the attack animation actually completes (see below)
    // Provide a safety fallback in case the animation is interrupted.
    let cleared = false;
    const safeClear = () => {
      if (cleared) return;
      cleared = true;
      setIsAttacking(false);
    };
    // Safety fallback: if nothing else clears it within 900ms, clear automatically
    this.scene.time.delayedCall(900, safeClear);

    const payload =
      typeof payloadBuilder === "function" ? payloadBuilder() : null;
    if (payload) socket.emit("game:action", payload);
    drawAmmoBar();
    if (typeof onAfterFire === "function") onAfterFire();

    // Attempt to detect and listen for the throw animation to finish before clearing isAttacking
    try {
      const p = this.player;
      const currentAnim =
        p.anims && p.anims.currentAnim ? p.anims.currentAnim : null;
      if (currentAnim && /throw|attack/i.test(currentAnim.key)) {
        const key = currentAnim.key;
        // Estimate duration if we have frame data
        const frameRate = currentAnim.frameRate || 15;
        const frameCount =
          (currentAnim.frames && currentAnim.frames.length) || frameRate;
        const estMs = (frameCount / Math.max(1, frameRate)) * 1000 + 30; // small buffer
        // Hard cap (not longer than 1.2s so we don't get stuck)
        const capped = Math.min(estMs, 1200);
        this.scene.time.delayedCall(capped, safeClear);
        // Also clear on actual animation complete (whichever happens first)
        p.once("animationcomplete", (anim) => {
          if (anim && anim.key === key) safeClear();
        });
      } else {
        // If no attack animation detected, rely on the shorter fallback
        this.scene.time.delayedCall(350, safeClear);
      }
    } catch (_) {}
    return true;
  }

  // Draven splash attack trigger
  handlePointerDown() {
    return this.performDefaultAttack(() => performDravenSplashAttack(this));
  }
}

export default draven;
