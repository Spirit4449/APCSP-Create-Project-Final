// Draven-specific per-player effects (fire trail)

export default class DravenEffects {
  constructor(scene, sprite) {
    this.scene = scene;
    this.sprite = sprite;
    this._timer = 0;
    this._interval = 45; // ms between flame spawns
    this._pool = [];
    this._poolMax = 60;
  }

  // Internal: get a pooled graphics object
  _acquire() {
    let g = this._pool.find((o) => !o.active);
    if (!g) {
      g = this.scene.add.graphics();
      this._pool.push(g);
    }
    g.active = true;
    g.clear();
    g.setDepth(0); // behind player
    return g;
  }

  _release(g) {
    g.active = false;
    g.alpha = 1;
    g.scale = 1;
    g.clear();
    if (this._pool.length > this._poolMax) {
      const old = this._pool.find((o) => !o.active);
      if (old) {
        old.destroy();
        const idx = this._pool.indexOf(old);
        if (idx >= 0) this._pool.splice(idx, 1);
      }
    }
  }

  _spawnFlame(x, y) {
    const g = this._acquire();
    const baseSize = Phaser.Math.Between(5, 9);
    // Glow layers
    g.fillStyle(0x312841, 0.35);
    g.fillCircle(0, 0, baseSize);
    g.fillStyle(0xba5d22, 0.55);
    g.fillCircle(0, 0, baseSize * 0.65);
    g.fillStyle(
      Phaser.Display.Color.GetColor(49, Phaser.Math.Between(30, 60), 60),
      0.9
    );
    g.fillCircle(0, 0, baseSize * 0.35);
    g.x = x + Phaser.Math.Between(-3, 3);
    g.y = y + Phaser.Math.Between(-3, 3);
    const driftX = Phaser.Math.Between(-12, 12);
    const driftY = Phaser.Math.Between(-18, -4);
    const scaleTarget = Phaser.Math.FloatBetween(0.15, 0.35);
    const duration = Phaser.Math.Between(260, 420);
    g.scale = 1;
    this.scene.tweens.add({
      targets: g,
      x: g.x + driftX,
      y: g.y + driftY,
      scale: scaleTarget,
      alpha: 0,
      duration,
      ease: "Cubic.easeOut",
      onComplete: () => this._release(g),
    });
  }

  // Update per-frame. isMoving: boolean, dead: boolean
  update(deltaMs, isMoving, dead) {
    if (!this.sprite || dead) return;
    if (!isMoving) return;
    this._timer += deltaMs;
    if (this._timer >= this._interval) {
      this._timer = 0;
      const baseX = this.sprite.x - (this.sprite.flipX ? -14 : 14);
      const baseY = this.sprite.y + 8;
      const count = Phaser.Math.Between(1, 2);
      for (let i = 0; i < count; i++) this._spawnFlame(baseX, baseY);
    }
  }
}
