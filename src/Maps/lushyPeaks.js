// map.js

// Globals
let base;
let platform;
let leftPlatform;
let rightPlatform;

const lushyPeaksObjects = []

export function lushyPeaks(scene) {
  // Canvas variables
  const canvasWidth = scene.game.config.width;
  const canvasHeight = scene.game.config.height;
  const centerX = scene.cameras.main.width / 2;

  // Setup background position
  const background = scene.add.sprite(0, -180, "background");
  // Set background to the size of the canvas
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  background.setOrigin(0, 0);

  // Base
  base = scene.physics.add.sprite(centerX, 550, "base");
  base.body.allowGravity = false; // Doesn't allow gravity
  base.setImmovable(true); // Makes sure it doesn't move
  base.setScale(0.7); // Makes it smaller
  lushyPeaksObjects.push(base)

  // Platform
  platform = scene.physics.add.sprite(centerX, 250, "platform");
  platform.setScale(0.7);
  platform.body.allowGravity = false;
  platform.setImmovable(true);
  lushyPeaksObjects.push(platform)

  // Left Platform
  leftPlatform = scene.physics.add.sprite(centerX - 500, 260, "side-platform");
  leftPlatform.setScale(0.7);
  leftPlatform.body.allowGravity = false;
  leftPlatform.setImmovable(true);
  lushyPeaksObjects.push(leftPlatform)

  // Right Platform
  rightPlatform = scene.physics.add.sprite(centerX + 500, 260, "side-platform");
  rightPlatform.setScale(0.7);
  rightPlatform.body.allowGravity = false;
  rightPlatform.setImmovable(true);
  lushyPeaksObjects.push(rightPlatform)
}


export { lushyPeaksObjects, base, platform };
