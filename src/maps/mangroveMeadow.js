// map.js

// Globals
let baseMiddle;
let baseTop;
let baseLeft;
let baseRight;
let tinyPlatform1;
let tinyPlatform2;
let tinyPlatform3;
let tinyPlatform4;
let tinyPlatform5;
let tinyPlatform6;

const mangroveMeadowObjects = [];

export function mangroveMeadow(scene) {
  // Canvas variables
  const canvasWidth = scene.game.config.width;
  const canvasHeight = scene.game.config.height;
  const centerX = scene.cameras.main.width / 2;

  // Setup background position
  const background = scene.add.sprite(0, -180, "mangrove-bg");
  // Set background to the size of the canvas
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  background.setOrigin(0, 0);

  // Base Middle
  baseMiddle = scene.physics.add.sprite(centerX, 600, "mangrove-base-middle");
  baseMiddle.body.allowGravity = false; // Doesn't allow gravity
  baseMiddle.setImmovable(true); // Makes sure it doesn't move
  baseMiddle.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseMiddle);

  // Base Top
  baseTop = scene.physics.add.sprite(centerX, 408, "mangrove-base-top");
  baseTop.body.allowGravity = false; // Doesn't allow gravity
  baseTop.setImmovable(true); // Makes sure it doesn't move
  baseTop.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseTop);

  // Base Left
  baseLeft = scene.physics.add.sprite(centerX - 422, 638, "mangrove-base-left");
  baseLeft.body.allowGravity = false; // Doesn't allow gravity
  baseLeft.setImmovable(true); // Makes sure it doesn't move
  baseLeft.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseLeft);

  // Base Right
  baseRight = scene.physics.add.sprite(centerX + 422, 638, "mangrove-base-right");
  baseRight.body.allowGravity = false; // Doesn't allow gravity
  baseRight.setImmovable(true); // Makes sure it doesn't move
  baseRight.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseRight);

  // Platform
  tinyPlatform1 = scene.physics.add.sprite(centerX - 280, 325, "mangrove-tiny-platform");
  tinyPlatform1.setScale(0.6);
  tinyPlatform1.body.allowGravity = false;
  tinyPlatform1.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform1);

  // Platform 2
  tinyPlatform2 = scene.physics.add.sprite(centerX + 280, 325, "mangrove-tiny-platform");
  tinyPlatform2.setScale(0.6);
  tinyPlatform2.body.allowGravity = false;
  tinyPlatform2.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform2);

  // Platform 3
  tinyPlatform3 = scene.physics.add.sprite(centerX - 430, 200, "mangrove-tiny-platform");
  tinyPlatform3.setScale(0.6);
  tinyPlatform3.body.allowGravity = false;
  tinyPlatform3.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform3);

  // Platform 4
  tinyPlatform4 = scene.physics.add.sprite(centerX + 430, 200, "mangrove-tiny-platform");
  tinyPlatform4.setScale(0.6);
  tinyPlatform4.body.allowGravity = false;
  tinyPlatform4.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform4);

  // Platform 5
  tinyPlatform5 = scene.physics.add.sprite(centerX - 130, 150, "mangrove-tiny-platform");
  tinyPlatform5.setScale(0.6);
  tinyPlatform5.body.allowGravity = false;
  tinyPlatform5.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform5);

  // Platform 6
  tinyPlatform6 = scene.physics.add.sprite(centerX + 130, 150, "mangrove-tiny-platform");
  tinyPlatform6.setScale(0.6);
  tinyPlatform6.body.allowGravity = false;
  tinyPlatform6.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform6);
}

export { mangroveMeadowObjects, tinyPlatform1, tinyPlatform2, tinyPlatform3, tinyPlatform4, tinyPlatform5, tinyPlatform6 };
