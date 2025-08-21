// ReturningShuriken.js
// Curved, returning, piercing shuriken with local deterministic simulation.

import socket from "./socket"; // owner-only hit events

export default class ReturningShuriken extends Phaser.Physics.Arcade.Image {
  /**
   * @param {Phaser.Scene} scene
   * @param {Phaser.Types.Math.Vector2Like} startPos
   * @param {Phaser.Physics.Arcade.Sprite} ownerSprite - The sprite that launched this shuriken (local or remote copy).
   * @param {Object} config
   *  direction: 1 or -1 (facing)
   *  forwardDistance: distance of outward phase
   *  arcHeight: vertical lift (positive number -> goes upward)
   *  outwardDuration: ms duration for outward arc
   *  returnSpeed: pixels per second when returning
   *  rotationSpeed: degrees per second
   *  scale: sprite scale
   *  damage: damage per hit
   *  username: attacker's username (needed for socket.hit)
   *  gameId: current game id
   *  isOwner: boolean, only owner emits hit events
   */
  constructor(scene, startPos, ownerSprite, config) {
    super(scene, startPos.x, startPos.y, "shuriken");
    this.ownerSprite = ownerSprite;
    this.cfg = Object.assign(
      {
        direction: 1,
        forwardDistance: 520,
        outwardDuration: 600,
        returnSpeed: 780,
        rotationSpeed: 950,
        scale: 0.1,
        damage: 1000,
        username: "",
        gameId: "",
        isOwner: false,
        maxLifetime: 7000,
        hitCooldown: 150,
      },
      config || {}
    );
    this.phase = "outward";
    this.elapsed = 0; // ms in current phase
    this.totalElapsed = 0; // ms total life
    this.hitTimestamps = {}; // targetUsername -> lastHitMs (scene.time.now)
    this.hoverDuration = 200; // ms spin in place
    this.returnAcceleration = 1100; // px/s^2 accelerate toward owner
    this.currentReturnSpeed = this.cfg.returnSpeed * 0.25; // start slower
    // Removed map collision destruction logic; shuriken now ignores blocks entirely

    // Manual trail settings
    this.trailInterval = 55; // ms between trail puffs
    this.trailAccum = 0;
    this.trails = [];
    this.maxTrails = 40;
    // (previousY tracking removed since map collisions are ignored)
    // (No network position syncing; each client simulates deterministically.)

    // Add to scene / physics
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(this.cfg.scale);
    this.body.allowGravity = false;
    this.setDepth(5);
    this.setAngularVelocity(this.cfg.rotationSpeed * this.cfg.direction);
    // spawn logging removed

    // Path control points for slight bulge (down a bit then up higher then settle)
    this.startX = startPos.x;
    this.startY = startPos.y;
    this.endX = this.startX + this.cfg.direction * this.cfg.forwardDistance;
    this.endY = this.startY; // finish roughly same height
    const dipDown = 18; // downward sag early
    const bulgeUp = 65; // upward peak
    this.ctrl1X =
      this.startX + this.cfg.direction * this.cfg.forwardDistance * 0.25; // early
    this.ctrl1Y = this.startY + dipDown; // dip
    this.ctrl2X =
      this.startX + this.cfg.direction * this.cfg.forwardDistance * 0.6; // mid-late
    this.ctrl2Y = this.startY - bulgeUp; // bulge apex

    this.scene.events.on("update", this.updateShuriken, this);
  }

  // Cubic Bezier interpolation
  cubic(t, p0, p1, p2, p3) {
    const it = 1 - t;
    return (
      it * it * it * p0 +
      3 * it * it * t * p1 +
      3 * it * t * t * p2 +
      t * t * t * p3
    );
  }

  tryDamage(targetWrapper) {
    if (!this.cfg.isOwner) return; // only owner client reports hits
    if (!targetWrapper) return;
    const targetSprite = targetWrapper.opponent || targetWrapper; // wrapper for OpPlayer vs local player sprite
    // Determine target username
    const targetUsername =
      targetWrapper.username ||
      targetWrapper._username ||
      targetWrapper.name ||
      "unknown";
    const now = this.scene.time.now;
    const last = this.hitTimestamps[targetUsername] || 0;
    if (now - last < this.cfg.hitCooldown) return; // rate limit
    this.hitTimestamps[targetUsername] = now;
    socket.emit("hit", {
      attacker: this.cfg.username,
      target: targetUsername,
      damage: this.cfg.damage,
      gameId: this.cfg.gameId,
    });
  }

  attachEnemyOverlap(objects) {
    objects.forEach((obj) => {
      if (!obj) return;
      const sprite = obj.opponent || obj;
      this.scene.physics.add.overlap(this, sprite, () => {
        if (obj.opponent) {
          this.tryDamage(obj);
        }
      });
    });
  }

  // Separate helper for map-only array (semantic clarity)
  attachMapOverlap(mapObjects) {
    // Intentionally left blank: shuriken ignores map collisions now
  }

  spawnTrail() {
    // Simple tiny fading sprite using existing texture
    const s = this.scene.add.image(this.x, this.y, "shuriken");
    s.setScale(this.cfg.scale * 0.4);
    s.setDepth(4);
    s.alpha = 0.35;
    this.scene.tweens.add({
      targets: s,
      alpha: 0,
      scale: { from: s.scale, to: s.scale * 0.15 },
      duration: 300,
      ease: "Cubic.easeOut",
      onComplete: () => s.destroy(),
    });
    this.trails.push(s);
    if (this.trails.length > this.maxTrails) {
      const old = this.trails.shift();
      if (old && old.destroy) old.destroy();
    }
  }

  destroyShuriken() {
    if (!this.scene) return;
    this.scene.events.off("update", this.updateShuriken, this);
    // Clean any remaining trail sprites
    this.trails.forEach((t) => t && t.destroy && t.destroy());
    this.trails.length = 0;
    this.destroy();
  }

  updateShuriken(_, delta) {
    if (!this.active) return;
    this.elapsed += delta;
    this.totalElapsed += delta;
    this.trailAccum += delta;
    if (this.trailAccum >= this.trailInterval) {
      this.spawnTrail();
      this.trailAccum = 0;
    }
    if (this.totalElapsed > this.cfg.maxLifetime) {
      this.destroyShuriken();
      return;
    }

    if (this.phase === "outward") {
      // Ease: slower start and end (easeInOut) -> t' = (1 - cos(pi*t))/2
      const rawT = Phaser.Math.Clamp(
        this.elapsed / this.cfg.outwardDuration,
        0,
        1
      );
      // Ease in-out cubic style for smoother bulge traversal
      const t = (1 - Math.cos(Math.PI * rawT)) / 2;
      const nx = this.cubic(
        t,
        this.startX,
        this.ctrl1X,
        this.ctrl2X,
        this.endX
      );
      const ny = this.cubic(
        t,
        this.startY,
        this.ctrl1Y,
        this.ctrl2Y,
        this.endY
      );
      this.setPosition(nx, ny);
      if (rawT >= 1) {
        this.phase = "hover";
        this.elapsed = 0;
        // Slow rotation a bit while hovering
        this.setAngularVelocity(
          this.cfg.rotationSpeed * 0.55 * this.cfg.direction
        );
      }
    } else if (this.phase === "hover") {
      if (this.elapsed >= this.hoverDuration) {
        this.phase = "return";
        this.elapsed = 0;
        // Speed up spin again for return
        this.setAngularVelocity(
          this.cfg.rotationSpeed * 1.15 * this.cfg.direction
        );
      }
    } else if (this.phase === "return") {
      // Straight line return (no curve) with gentle acceleration
      if (!this.ownerSprite || !this.ownerSprite.active) {
        this.x +=
          this.cfg.direction * (this.currentReturnSpeed * (delta / 1000));
      } else {
        const dx = this.ownerSprite.x - this.x;
        const dy = this.ownerSprite.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        this.currentReturnSpeed = Math.min(
          this.cfg.returnSpeed,
          this.currentReturnSpeed + this.returnAcceleration * (delta / 1000)
        );
        const spd = this.currentReturnSpeed * (delta / 1000);
        this.setPosition(
          this.x + (dx / dist) * spd,
          this.y + (dy / dist) * spd
        );
        if (dist < 30) {
          // Reached owner
          this.destroyShuriken();
          return;
        }
      }
    }

    // No network position emission (predictive model)
  }
}
