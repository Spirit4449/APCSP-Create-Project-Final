// src/characters/index.js
import Ninja from "./Ninja";

const registry = {
  Ninja,
  // Add more characters here, e.g. Samurai: require('./Samurai').default
};

export function preloadAll(scene, staticPath) {
  // Preload assets for all registered characters (simple now, scalable later)
  for (const key of Object.keys(registry)) {
    const Cls = registry[key];
    if (Cls.preload) Cls.preload(scene, staticPath);
  }
}

export function setupFor(scene, character) {
  const Cls = registry[character];
  if (Cls && Cls.setupAnimations) Cls.setupAnimations(scene);
}

export function setupAll(scene) {
  for (const key of Object.keys(registry)) {
    const Cls = registry[key];
    if (Cls && Cls.setupAnimations) Cls.setupAnimations(scene);
  }
}

export function createFor(character, deps) {
  const Cls = registry[character];
  if (!Cls) return null;
  return new Cls(deps);
}

// Returns the Phaser texture key for a given character's main sprite/atlas
export function getTextureKey(character) {
  const Cls = registry[character];
  // Prefer an explicit textureKey static, fallback to common "sprite"
  return (
    (Cls &&
      (Cls.textureKey ||
        (typeof Cls.getTextureKey === "function" && Cls.getTextureKey()))) ||
    "sprite"
  );
}

// Delegate handling of a remotely received attack to the character module
export function handleRemoteAttack(scene, character, data, ownerWrapper) {
  const Cls = registry[character];
  if (Cls && typeof Cls.handleRemoteAttack === "function") {
    Cls.handleRemoteAttack(scene, data, ownerWrapper);
    return true;
  }
  return false;
}
