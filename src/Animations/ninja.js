export function ninjaAnimations(scene) {
    scene.anims.create({
        key: "running", // Name of animation
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "running", // Name inside of json file
          end: 5, // Length of animation in frames (Since the numbers start at 0, the end is always 1 more. So 5 + 1 = 6 frames)
          zeroPad: 2, // Number of zeros in json file
        }),
        frameRate: 20, // Number of frames per second
        repeat: 0, // Number of times to repeat (0 means none) (-1 means infinite times)
      });
      scene.anims.create({
        key: "idle",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "idle",
          end: 4,
          zeroPad: 2,
        }),
        frameRate: 3,
        repeat: -1,
      });
      scene.anims.create({
        key: "jumping",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "jumping",
          end: 7,
          zeroPad: 2,
        }),
        frameRate: 20,
        repeat: 0,
      });
    
      scene.anims.create({
        key: "sliding",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "wall",
          end: 0,
          zeroPad: 2,
        }),
        frameRate: 20,
        repeat: 2,
      });
    
      scene.anims.create({
        key: "falling",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "falling",
          end: 2,
          zeroPad: 2,
        }),
        frameRate: 20,
        repeat: 0,
      });
    
      scene.anims.create({
        key: "throw",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "throw",
          end: 3,
          zeroPad: 2,
        }),
        frameRate: 15,
        repeat: 0,
      });
    
      scene.anims.create({
        key: "dying",
        frames: scene.anims.generateFrameNames("sprite", {
          prefix: "dying",
          end: 3,
          zeroPad: 2,
        }),
        frameRate: 10,
        repeat: 0,
      });
}