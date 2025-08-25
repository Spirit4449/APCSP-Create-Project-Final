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
}

export default draven;
