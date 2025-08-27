// Character stats without dependencies on Phaser or character classes
// Single source of truth for all character stats and constants

// Default character for new users
export const DEFAULT_CHARACTER = "ninja";

export const characterStats = {
  ninja: {
    maxHealth: 8000,
    attackDescription: "Unleashes a shuriken that boomerangs back.",
    damage: 1000,
    ammoCooldownMs: 200,
    ammoReloadMs: 1400,
    ammoCapacity: 1,
    specialDescription: "Dashes forward, releasing a flurry of shurikens.",
    specialDamage: 2000,
    specialChargeHits: 3,
    spriteScale: 1,
    body: {
      widthShrink: 35,
      heightShrink: 10,
      offsetXFromHalf: 0,
      offsetY: 10,
    },
    description: "A swift and agile fighter.",
  },

  thorg: {
    maxHealth: 12000,
    attackDescription: "Swings a heavy axe in a short arc, pushing back nearby enemies.",
    damage: 1600,
    ammoCooldownMs: 350,     
    ammoReloadMs: 1600,      
    ammoCapacity: 3,
    specialDescription: "Slams the ground to send a shockwave forward.",
    specialDamage: 2800,
    specialChargeHits: 4,   
    spriteScale: 0.7,
    body: {
      widthShrink: 30,
      heightShrink: 8,
      offsetXFromHalf: -43,
      offsetY: 8,
    },
    description: "A sturdy frontline bruiser with crushing blows.",
  },

  draven: {
    maxHealth: 10000,
    attackDescription: "Puffs out a magical smoke that deals splash damage to everyone in the path.",
    damage: 1400,
    ammoCooldownMs: 250,
    ammoReloadMs: 1700,
    ammoCapacity: 3,
    specialDescription: "Unleashes a staff nova that expands outward.",
    specialDamage: 2400,
    specialChargeHits: 3,
    spriteScale: 1.2,
    body: {
      widthShrink: 220,
      heightShrink: 195,
      offsetXFromHalf: 90,
      offsetY: 113,
      // Shift body to the right when facing left to cover staff
      flipOffset: 5,
    },
    description: "A dark sorcerer who manipulates shadows.",
  },
};

export function getCharacterStats(character) {
  return characterStats[character] || characterStats.ninja;
}

export function getAllCharacters() {
  return Object.keys(characterStats);
}

// Derived constants for backward compatibility
export const CHARACTER_HEALTH = {
  ninja: characterStats.ninja.maxHealth,
  thorg: characterStats.thorg.maxHealth,
  draven: characterStats.draven.maxHealth,
};

// CommonJS export for server-side compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    characterStats,
    getCharacterStats,
    getAllCharacters,
    DEFAULT_CHARACTER,
    CHARACTER_HEALTH,
  };
}
