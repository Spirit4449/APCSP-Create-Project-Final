// effects.js
// Shared lightweight VFX helpers (dust / smoke puffs for running)

const dustPool = [];
const dustPoolMax = 120;

export function spawnDust(scene, x, y, tint = 0x888888) {
  let g = dustPool.find((o) => !o.active);
  if (!g) {
    g = scene.add.graphics();
    dustPool.push(g);
  }
  g.active = true;
  g.clear();
  g.setDepth(1); // behind players (player depth assumed >1 for main sprite)
  const baseSize = Phaser.Math.Between(6, 10);
  const alphaStart = Phaser.Math.FloatBetween(0.35, 0.55);
  const puffColor = Phaser.Display.Color.IntegerToColor(tint);
  // Outer soft ring
  g.fillStyle(puffColor.color, alphaStart * 0.5);
  g.fillCircle(0, 0, baseSize);
  // Inner denser core
  g.fillStyle(puffColor.color, alphaStart);
  g.fillCircle(0, 0, baseSize * 0.55);
  g.x = x + Phaser.Math.Between(-4, 4);
  g.y = y + Phaser.Math.Between(-2, 2);
  const rise = Phaser.Math.Between(10, 22);
  const driftX = Phaser.Math.Between(-12, 12);
  const scaleTarget = Phaser.Math.FloatBetween(1.2, 1.6);
  const duration = Phaser.Math.Between(380, 520);
  g.scale = 1;
  g.alpha = alphaStart;
  scene.tweens.add({
    targets: g,
    x: g.x + driftX,
    y: g.y - rise,
    alpha: 0,
    scale: scaleTarget,
    duration,
    ease: "Cubic.easeOut",
    onComplete: () => {
      g.active = false;
      g.alpha = 1;
      g.scale = 1;
      g.clear();
    },
  });
  if (dustPool.length > dustPoolMax) {
    const old = dustPool.find((o) => !o.active);
    if (old) {
      old.destroy();
      const idx = dustPool.indexOf(old);
      if (idx >= 0) dustPool.splice(idx, 1);
    }
  }
}

export function prewarmDust(scene, count = 6) {
  for (let i = 0; i < count; i++) {
    spawnDust(scene, -9999, -9999);
  }
  dustPool.forEach((g) => {
    g.active = false;
    g.clear();
  });
}
