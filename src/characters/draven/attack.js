// Draven splash attack extracted
import socket from "../../socket";

const SPLASH_W = 150;
const SPLASH_H = 130; // user requested 200x200 (previous was 155 height)
const EXPLOSION_DELAY_MS = 250; // total active window length; explosion at end
const FLIP_UNLOCK_MS = 700; // how long facing stays locked regardless of explosion timing
const DAMAGE_TICK_MS = 120; // damage application cadence inside the splash
const DAMAGE_START_MS = 130; // telegraph period before any damage can occur
const TIP_OFFSET = 50; // horizontal distance from player center to tip

// Rectangle overlap helper (inclusive edges)
function rectsOverlap(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1;
}

// Util to build unique id for correlating remote visuals (no gameplay authority)
function makeId() {
  return `dravenSplash_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

export function performDravenSplashAttack(instance) {
  const { scene, player: p, username, gameId, opponentPlayersRef } = instance;

  // Lock facing direction for the whole attack window
  const direction = p.flipX ? -1 : 1; // -1 = facing left, 1 = facing right
  p._lockFlip = true;
  p._lockedFlipX = p.flipX; // remember original orientation
  const unlockFlip = () => {
    if (p && p._lockFlip) {
      p._lockFlip = false;
      delete p._lockedFlipX;
    }
  };
  const attackId = makeId();
  // Track which opponents have already been hit (each only once per attack instance)
  const hitSet = new Set();

  // Play attack animation if present
  if (
    scene.anims &&
    (scene.anims.exists("draven-throw") || scene.anims.exists("throw"))
  ) {
    p.anims.play(
      scene.anims.exists("draven-throw") ? "draven-throw" : "throw",
      true
    );
  }

  // Debug visuals removed (box no longer drawn)
  // Continuous damage ticking within active window (owner only)
  let elapsed = 0;
  let damageAccum = 0; // accumulator for tick scheduling
  // Play fireball SFX (local-only)
  try {
    if (scene.sound) {
      scene.sound.play("draven-fireball", { volume: 0.18 });
    }
  } catch (_) {}

  const updateListener = () => {
    const dt = scene.game.loop.delta || 16;
    elapsed += dt;
    damageAccum += dt;
    // Reinforce visual flip lock every frame
    if (p._lockFlip && p._lockedFlipX !== undefined && p.flipX !== p._lockedFlipX) {
      p.flipX = p._lockedFlipX;
      if (p.body && p.body.setOffset && typeof p._lockedFlipX === "boolean") {
        // Attempt to reapply any offset logic if provided by player script
        if (typeof p.scene !== 'undefined' && p.scene.events) {
          // No direct accessor to applyFlipOffsetLocal here; player module enforces on change.
        }
      }
    }
    if (elapsed >= DAMAGE_START_MS && damageAccum >= DAMAGE_TICK_MS) {
      damageAccum = 0;
      // Center uses locked direction, not current flip state
      const cx = p.x + (direction > 0 ? TIP_OFFSET : -TIP_OFFSET);
      const cy = p.y - p.height * 0.15;
      applySplashDamage({
        scene,
        centerX: cx,
        centerY: cy,
        w: SPLASH_W,
        h: SPLASH_H,
        attacker: username,
        gameId,
        opponents: opponentPlayersRef,
        hitSet,
      });
    }
    if (elapsed >= EXPLOSION_DELAY_MS) {
      // End of window: cleanup & explosion visual
      scene.events.off("update", updateListener);
      // (no debug box to destroy)
      const ex = p.x + (direction > 0 ? TIP_OFFSET : -TIP_OFFSET);
      const ey = p.y - p.height * 0.15;
      spawnExplosion(scene, ex, ey);
    }
  };
  scene.events.on("update", updateListener);
  // Unlock facing after fixed delay independent of explosion window
  scene.time.delayedCall(FLIP_UNLOCK_MS, unlockFlip);

  // Broadcast action so other players see tracking box & explosion
  return {
    type: "draven-splash",
    id: attackId,
    direction,
    w: SPLASH_W,
    h: SPLASH_H,
    delay: EXPLOSION_DELAY_MS,
    tipOffset: TIP_OFFSET,
  };
}

function applySplashDamage({
  scene,
  centerX,
  centerY,
  w,
  h,
  attacker,
  gameId,
  opponents,
  hitSet,
}) {
  // Splash rectangle bounds (slightly inflated so edge contacts count)
  const inflate = 6; // px padding to be more forgiving
  const left = centerX - w / 2 - inflate;
  const right = centerX + w / 2 + inflate;
  const top = centerY - h / 2 - inflate;
  const bottom = centerY + h / 2 + inflate;
  const list = Object.values(opponents || {});
  let hitAny = false;
  for (const wrap of list) {
    const spr = wrap && wrap.opponent;
    const name = wrap && wrap.username;
    if (!spr || !name || (hitSet && hitSet.has(name))) continue;
    // Determine opponent bounds (prefer physics body for accuracy)
    let bx1, by1, bx2, by2;
    if (spr.body) {
      // Arcade body.x/y are top-left
      bx1 = spr.body.x;
      by1 = spr.body.y;
      bx2 = spr.body.x + spr.body.width;
      by2 = spr.body.y + spr.body.height;
    } else {
      // Fallback to approximate sprite rectangle using display size
      const halfW = (spr.displayWidth || spr.width || 0) / 2;
      const halfH = (spr.displayHeight || spr.height || 0) / 2;
      bx1 = spr.x - halfW;
      bx2 = spr.x + halfW;
      by1 = spr.y - halfH;
      by2 = spr.y + halfH;
    }
    if (rectsOverlap(left, top, right, bottom, bx1, by1, bx2, by2)) {
      if (hitSet) hitSet.add(name);
      socket.emit("hit", {
        attacker,
        target: name,
        attackType: "basic", // treat as basic attack damage
        gameId,
      });
      hitAny = true;
      // Optional: tiny debug flash (comment out in production)
      // const flash = scene.add.rectangle((bx1+bx2)/2, (by1+by2)/2, 10, 10, 0xffd28a, 0.6);
      // scene.tweens.add({ targets: flash, alpha: 0, duration: 180, onComplete: ()=> flash.destroy() });
    }
  }
  if (hitAny) {
    try {
      scene.sound.play("draven-hit", { volume: 0.18 });
    } catch (_) {}
  }
}

export function spawnExplosion(scene, x, y) {
  if (!scene.textures.exists("draven-explosion")) return null;
  const e = scene.add.sprite(x, y, "draven-explosion");
  e.setDepth(9);
  e.setScale(2.2);
  if (scene.anims.exists("draven-explosion")) {
    e.anims.play("draven-explosion");
  }
  e.once("animationcomplete", () => e.destroy());
  return e;
}
// (Removed stale handlePointerDown helper; logic lives in constructor now)
