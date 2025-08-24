export function thorgAnimations(scene) {
  const atlasKey = "thorg";
  const tex = scene.textures.get(atlasKey);
  const allNames = (tex && tex.getFrameNames()) || [];
  const lower = new Map(allNames.map((n) => [n.toLowerCase(), n]));

  const findFrames = (candidates) => {
    // candidates: array of lowercase prefixes to try (e.g., ["running", "run"])
    // Return sorted frame names by numeric suffix when present.
    const matched = [];
    for (const name of allNames) {
      const ln = name.toLowerCase();
      if (candidates.some((p) => ln.startsWith(p))) {
        matched.push(name);
      }
    }
    // Sort by trailing number if any, else lexicographically
    matched.sort((a, b) => {
      const ra = /(\d+)(?=\D*$)/.exec(a);
      const rb = /(\d+)(?=\D*$)/.exec(b);
      if (ra && rb) return parseInt(ra[1], 10) - parseInt(rb[1], 10);
      return a.localeCompare(b);
    });
    return matched;
  };

  const make = (key, prefixes, frameRate, repeat) => {
    if (scene.anims.exists(key)) return; // don't duplicate
    const frames = findFrames(prefixes);
    if (!frames.length) return; // skip if not present
    scene.anims.create({
      key,
      frames: frames.map((f) => ({ key: atlasKey, frame: f })),
      frameRate,
      repeat,
    });
  };

  // Try reasonable prefix variants for robustness across atlases
  make("thorg-running", ["running", "run"], 20, 0);
  make("thorg-idle", ["idle", "stand", "idle_"], 3, -1);
  make("thorg-jumping", ["jumping", "jump"], 20, 0);
  make("thorg-sliding", ["wall", "slide", "sliding"], 20, 2);
  make("thorg-falling", ["falling", "fall"], 20, 0);
  make("thorg-throw", ["throw", "attack", "attack_throw"], 15, 0);
  make("thorg-dying", ["dying", "death", "dead"], 10, 0);
}
