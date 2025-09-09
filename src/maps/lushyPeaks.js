// map.js

// Globals
let base;
let platform;
let leftPlatform;
let rightPlatform;
let smallLeftPlatform;
let smallRightPlatform;

const lushyPeaksObjects = [];

export function lushyPeaks(scene) {
  // Canvas variables
  const canvasWidth = scene.game.config.width;
  const canvasHeight = scene.game.config.height;
  const centerX = scene.cameras.main.width / 2;

  // Setup background position
  // const background = scene.add.sprite(0, -180, "lushy-bg");
  // // Set background to the size of the canvas
  // background.displayWidth = scene.sys.canvas.width;
  // background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  // background.setOrigin(0, 0);

  // Base
  base = scene.physics.add.sprite(centerX, 580, "lushy-base");
  base.body.allowGravity = false; // Doesn't allow gravity
  base.setImmovable(true); // Makes sure it doesn't move
  base.setScale(0.7); // Makes it smaller
  lushyPeaksObjects.push(base);

  // Platform
  platform = scene.physics.add.sprite(centerX, 240, "lushy-platform");
  platform.setScale(0.7);
  platform.body.allowGravity = false;
  platform.setImmovable(true);
  lushyPeaksObjects.push(platform);

  // Left Platform
  leftPlatform = scene.physics.add.sprite(
    centerX - 490,
    260,
    "lushy-side-platform"
  );
  leftPlatform.setScale(0.7);
  leftPlatform.body.allowGravity = false;
  leftPlatform.setImmovable(true);
  lushyPeaksObjects.push(leftPlatform);

  // Right Platform
  rightPlatform = scene.physics.add.sprite(
    centerX + 490,
    260,
    "lushy-side-platform"
  );
  rightPlatform.setScale(0.7);
  rightPlatform.body.allowGravity = false;
  rightPlatform.setImmovable(true);
  lushyPeaksObjects.push(rightPlatform);

  smallLeftPlatform = scene.physics.add.sprite(
    centerX - 580,
    530,
    "mangrove-tiny-platform"
  );
  smallLeftPlatform.setScale(0.45);
  smallLeftPlatform.body.allowGravity = false;
  smallLeftPlatform.setImmovable(true);
  lushyPeaksObjects.push(smallLeftPlatform);

  smallRightPlatform = scene.physics.add.sprite(
    centerX + 580,
    530,
    "mangrove-tiny-platform"
  );
  smallRightPlatform.setScale(0.45);
  smallRightPlatform.body.allowGravity = false;
  smallRightPlatform.setImmovable(true);
  lushyPeaksObjects.push(smallRightPlatform);

}

// Determine a consistent spawn position for Lushy Peaks
// team: 'team1' spawns on base (bottom), 'team2' on platform (top)
// index: 0-based index within team (sorted order recommended)
// teamSize: number of players on that team
export function positionLushySpawn(scene, sprite, team, index, teamSize) {
  const target = team === "team2" ? platform : base;
  if (!sprite || !target) return;
  const bounds = target.getBounds();
  const slots = Math.max(1, Number(teamSize) || 1);
  const i = Math.min(slots - 1, Math.max(0, Number(index) || 0));
  const cx = bounds.left + bounds.width * ((i + 0.5) / slots);
  const bodyH = sprite.body ? sprite.body.height : sprite.height;
  // Prefer physics body for precise top if available
  const topY = target.body ? target.body.top : target.getTopCenter().y;
  const cy = topY - bodyH / 2 - 5; // epsilon above to avoid initial overlap
  if (sprite.body && typeof sprite.body.reset === "function") {
    sprite.body.reset(cx, cy);
  } else {
    sprite.setPosition(cx, cy);
  }
}

export { lushyPeaksObjects };
