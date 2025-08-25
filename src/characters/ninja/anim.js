export function animations(scene) {
  if (!scene.anims.exists("ninja-running"))
    scene.anims.create({
      key: "ninja-running", // Name of animation
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "running", // Name inside of json file
        end: 5, // Length of animation in frames (Since the numbers start at 0, the end is always 1 more. So 5 + 1 = 6 frames)
        zeroPad: 2, // Number of zeros in json file
      }),
      frameRate: 20, // Number of frames per second
      repeat: 0, // Number of times to repeat (0 means none) (-1 means infinite times)
    });
  if (!scene.anims.exists("ninja-idle"))
    scene.anims.create({
      key: "ninja-idle",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "idle",
        end: 4,
        zeroPad: 2,
      }),
      frameRate: 3,
      repeat: -1,
    });
  if (!scene.anims.exists("ninja-jumping"))
    scene.anims.create({
      key: "ninja-jumping",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "jumping",
        end: 7,
        zeroPad: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });

  if (!scene.anims.exists("ninja-sliding"))
    scene.anims.create({
      key: "ninja-sliding",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "wall",
        end: 0,
        zeroPad: 2,
      }),
      frameRate: 20,
      repeat: 2,
    });

  if (!scene.anims.exists("ninja-falling"))
    scene.anims.create({
      key: "ninja-falling",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "falling",
        end: 2,
        zeroPad: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });

  if (!scene.anims.exists("ninja-throw"))
    scene.anims.create({
      key: "ninja-throw",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "throw",
        end: 3,
        zeroPad: 2,
      }),
      frameRate: 15,
      repeat: 0,
    });

  if (!scene.anims.exists("ninja-dying"))
    scene.anims.create({
      key: "ninja-dying",
      frames: scene.anims.generateFrameNames("ninja", {
        prefix: "dying",
        end: 3,
        zeroPad: 2,
      }),
      frameRate: 10,
      repeat: 0,
    });
}
