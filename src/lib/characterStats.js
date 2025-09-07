// Character stats without dependencies on Phaser or character classes
// Single source of truth for all character stats and constants

// Default character for new users
export const DEFAULT_CHARACTER = "ninja";
export const LEVEL_CAP = 5;

export const characterStats = {
  ninja: {
    baseHealth: 8000,
    attackDescription: "Unleashes a shuriken that boomerangs back.",
    baseDamage: 1000,
    ammoCooldownMs: 200,
    ammoReloadMs: 1400,
    ammoCapacity: 1,
    specialDescription: "Dashes forward, releasing a flurry of shurikens.",
    specialBaseDamage: 2000,
    specialChargeHits: 3,
    spriteScale: 1,
    body: {
      widthShrink: 35,
      heightShrink: 10,
      offsetXFromHalf: 0,
      offsetY: 10,
    },
    description: "A swift and agile fighter.",
    free: true,
  },

  thorg: {
    baseHealth: 13000,
    attackDescription:
      "Swings a heavy axe in a short arc, pushing back nearby enemies.",
    baseDamage: 1800,
    ammoCooldownMs: 350,
    ammoReloadMs: 1000,
    ammoCapacity: 3,
    specialDescription: "Slams the ground to send a shockwave forward.",
    specialBaseDamage: 2800,
    specialChargeHits: 4,
    spriteScale: 0.7,
    body: {
      widthShrink: 30,
      heightShrink: 8,
      offsetXFromHalf: -43,
      offsetY: 8,
    },
    description: "A sturdy frontline bruiser with crushing blows.",
    free: true,
  },

  draven: {
    baseHealth: 6000,
    attackDescription:
      "Puffs out a magical smoke that deals splash baseDamage to everyone in the path.",
    baseDamage: 1800,
    ammoCooldownMs: 250,
    ammoReloadMs: 1700,
    ammoCapacity: 3,
    specialDescription: "Unleashes a staff nova that expands outward.",
    specialBaseDamage: 2400,
    specialChargeHits: 3,
    spriteScale: 1.2,
    body: {
      widthShrink: 220,
      heightShrink: 195,
      offsetXFromHalf: 0,
      offsetY: 113,
      // Shift body to the right when facing left to cover staff
      flipOffset: 5,
    },
    description: "A dark sorcerer who manipulates shadows.",
    unlockPrice: 280,
  },
};

export function getCharacterStats(character) {
  return characterStats[character] || undefined;
}

export function getAllCharacters() {
  return Object.keys(characterStats);
}

export function getFreeCharacters() {
  return Object.keys(characterStats).filter(
    (char) => characterStats[char].free
  );
}

export function defaultCharacterList() {
  return Object.fromEntries(
    Object.keys(characterStats).map((char) => [
      char,
      characterStats[char].free ? 1 : 0,
    ])
  );
}

export function getHealth(character, level) {
  return characterStats[character].baseHealth + (level - 1) * 500;
}

export function getDamage(character, level) {
  return characterStats[character].baseDamage + (level - 1) * 100;
}

export function getSpecialDamage(character, level) {
  return characterStats[character].specialBaseDamage + (level - 1) * 200;
}

// The level upgrade price reflects the current level the character is at
// If the character was at level 1 it would cost 200 to go to level 2
export function upgradePrice(level) {
  return 200 * 2 ** (level - 1); // Doubles every level
}

export function unlockPrice(character) {
  return characterStats[character].unlockPrice || undefined;
}

// CommonJS export for server-side compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DEFAULT_CHARACTER,
    LEVEL_CAP,
    characterStats,
    getCharacterStats,
    getAllCharacters,
    getFreeCharacters,
    defaultCharacterList,
    getHealth,
    getDamage,
    getSpecialDamage,
    upgradePrice,
    unlockPrice,
  };
}
