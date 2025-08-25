// src/characters/index.js
import Ninja from "./ninja/constructor";
import Thorg from "./thorg/constructor";
import Draven from "./draven/constructor";

const registry = {
  ninja: Ninja,
  thorg: Thorg,
  draven: Draven,
};

// Default character stats. Individual characters can override any of these
const defaultStats = {
  maxHealth: 8000,
  ammoCooldownMs: 1200,
  ammoCapacity: 1, // number of segments/charges in the ammo bar
  ammoReloadMs: 1200, // time to reload one ammo segment
  spriteScale: 1,
  body: {
    widthShrink: 35,
    heightShrink: 10,
    offsetXFromHalf: 0, // additional x offset from half-width
    offsetY: 10,
  },
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

// Resolve a generic animation key (e.g., 'idle') to a character-specific
// key (e.g., 'ninja-idle' or 'thorg-idle') if present; otherwise, fallback.
export function resolveAnimKey(
  scene,
  character,
  genericKey,
  fallback = "idle"
) {
  const char = (character || "").toLowerCase();
  const anims = scene && scene.anims;
  if (!anims) return genericKey;

  // If a fully-qualified key is provided (e.g., "ninja-running"):
  if (genericKey && genericKey.includes("-")) {
    // 1) If it already matches this character and exists, use it as-is
    if (
      genericKey.toLowerCase().startsWith(`${char}-`) &&
      anims.exists(genericKey)
    ) {
      return genericKey;
    }
    // 2) Try remapping to this character's namespace preserving the suffix
    const suffix = genericKey.split("-").slice(1).join("-");
    const remapped = `${char}-${suffix}`;
    if (anims.exists(remapped)) return remapped;
    // 3) As a last resort, if the given key exists (even for other char), return it
    if (anims.exists(genericKey)) return genericKey;
  }

  // Generic (unprefixed) resolution flow
  const preferred = `${char}-${genericKey}`;
  if (anims.exists(preferred)) return preferred;
  if (anims.exists(genericKey)) return genericKey;
  const fbPreferred = `${char}-${fallback}`;
  if (anims.exists(fbPreferred)) return fbPreferred;
  return anims.exists(fallback) ? fallback : genericKey;
}

// Get merged stats for a character (defaults overlaid with character overrides)
export function getStats(character) {
  const Cls = registry[character];
  const overrides =
    Cls && (typeof Cls.getStats === "function" ? Cls.getStats() : Cls.stats);
  return {
    ...defaultStats,
    ...(overrides || {}),
    body: {
      ...defaultStats.body,
      ...((overrides && overrides.body) || {}),
    },
  };
}
