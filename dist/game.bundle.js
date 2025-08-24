/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Animations/ninja.js":
/*!*********************************!*\
  !*** ./src/Animations/ninja.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ninjaAnimations: () => (/* binding */ ninjaAnimations)
/* harmony export */ });
function ninjaAnimations(scene) {
  scene.anims.create({
    key: "running",
    // Name of animation
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "running",
      // Name inside of json file
      end: 5,
      // Length of animation in frames (Since the numbers start at 0, the end is always 1 more. So 5 + 1 = 6 frames)
      zeroPad: 2 // Number of zeros in json file
    }),
    frameRate: 20,
    // Number of frames per second
    repeat: 0 // Number of times to repeat (0 means none) (-1 means infinite times)
  });
  scene.anims.create({
    key: "idle",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "idle",
      end: 4,
      zeroPad: 2
    }),
    frameRate: 3,
    repeat: -1
  });
  scene.anims.create({
    key: "jumping",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "jumping",
      end: 7,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  scene.anims.create({
    key: "sliding",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "wall",
      end: 0,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 2
  });
  scene.anims.create({
    key: "falling",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "falling",
      end: 2,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  scene.anims.create({
    key: "throw",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "throw",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 15,
    repeat: 0
  });
  scene.anims.create({
    key: "dying",
    frames: scene.anims.generateFrameNames("sprite", {
      prefix: "dying",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 10,
    repeat: 0
  });
}

/***/ }),

/***/ "./src/Maps/lushyPeaks.js":
/*!********************************!*\
  !*** ./src/Maps/lushyPeaks.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   lushyPeaks: () => (/* binding */ lushyPeaks),
/* harmony export */   lushyPeaksObjects: () => (/* binding */ lushyPeaksObjects),
/* harmony export */   platform: () => (/* binding */ platform)
/* harmony export */ });
// map.js

// Globals
var base;
var platform;
var leftPlatform;
var rightPlatform;
var lushyPeaksObjects = [];
function lushyPeaks(scene) {
  // Canvas variables
  var canvasWidth = scene.game.config.width;
  var canvasHeight = scene.game.config.height;
  var centerX = scene.cameras.main.width / 2;

  // Setup background position
  var background = scene.add.sprite(0, -180, "background");
  // Set background to the size of the canvas
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  background.setOrigin(0, 0);

  // Base
  base = scene.physics.add.sprite(centerX, 550, "base");
  base.body.allowGravity = false; // Doesn't allow gravity
  base.setImmovable(true); // Makes sure it doesn't move
  base.setScale(0.7); // Makes it smaller
  lushyPeaksObjects.push(base);

  // Platform
  platform = scene.physics.add.sprite(centerX, 250, "platform");
  platform.setScale(0.7);
  platform.body.allowGravity = false;
  platform.setImmovable(true);
  lushyPeaksObjects.push(platform);

  // Left Platform
  leftPlatform = scene.physics.add.sprite(centerX - 500, 260, "side-platform");
  leftPlatform.setScale(0.7);
  leftPlatform.body.allowGravity = false;
  leftPlatform.setImmovable(true);
  lushyPeaksObjects.push(leftPlatform);

  // Right Platform
  rightPlatform = scene.physics.add.sprite(centerX + 500, 260, "side-platform");
  rightPlatform.setScale(0.7);
  rightPlatform.body.allowGravity = false;
  rightPlatform.setImmovable(true);
  lushyPeaksObjects.push(rightPlatform);
}


/***/ }),

/***/ "./src/Maps/mangroveMeadow.js":
/*!************************************!*\
  !*** ./src/Maps/mangroveMeadow.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mangroveMeadow: () => (/* binding */ mangroveMeadow),
/* harmony export */   mangroveMeadowObjects: () => (/* binding */ mangroveMeadowObjects),
/* harmony export */   tinyPlatform1: () => (/* binding */ tinyPlatform1),
/* harmony export */   tinyPlatform2: () => (/* binding */ tinyPlatform2),
/* harmony export */   tinyPlatform3: () => (/* binding */ tinyPlatform3),
/* harmony export */   tinyPlatform4: () => (/* binding */ tinyPlatform4),
/* harmony export */   tinyPlatform5: () => (/* binding */ tinyPlatform5),
/* harmony export */   tinyPlatform6: () => (/* binding */ tinyPlatform6)
/* harmony export */ });
// map.js

// Globals
var baseMiddle;
var baseTop;
var baseLeft;
var baseRight;
var tinyPlatform1;
var tinyPlatform2;
var tinyPlatform3;
var tinyPlatform4;
var tinyPlatform5;
var tinyPlatform6;
var mangroveMeadowObjects = [];
function mangroveMeadow(scene) {
  // Canvas variables
  var canvasWidth = scene.game.config.width;
  var canvasHeight = scene.game.config.height;
  var centerX = scene.cameras.main.width / 2;

  // Setup background position
  var background = scene.add.sprite(0, -180, "mangrove-background");
  // Set background to the size of the canvas
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  background.setOrigin(0, 0);

  // Base Middle
  baseMiddle = scene.physics.add.sprite(centerX, 600, "base-middle");
  baseMiddle.body.allowGravity = false; // Doesn't allow gravity
  baseMiddle.setImmovable(true); // Makes sure it doesn't move
  baseMiddle.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseMiddle);

  // Base Top
  baseTop = scene.physics.add.sprite(centerX, 408, "base-top");
  baseTop.body.allowGravity = false; // Doesn't allow gravity
  baseTop.setImmovable(true); // Makes sure it doesn't move
  baseTop.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseTop);

  // Base Left
  baseLeft = scene.physics.add.sprite(centerX - 422, 638, "base-left");
  baseLeft.body.allowGravity = false; // Doesn't allow gravity
  baseLeft.setImmovable(true); // Makes sure it doesn't move
  baseLeft.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseLeft);

  // Base Right
  baseRight = scene.physics.add.sprite(centerX + 422, 638, "base-right");
  baseRight.body.allowGravity = false; // Doesn't allow gravity
  baseRight.setImmovable(true); // Makes sure it doesn't move
  baseRight.setScale(0.6); // Makes it smaller
  mangroveMeadowObjects.push(baseRight);

  // Platform
  tinyPlatform1 = scene.physics.add.sprite(centerX - 280, 325, "tiny-platform");
  tinyPlatform1.setScale(0.6);
  tinyPlatform1.body.allowGravity = false;
  tinyPlatform1.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform1);

  // Platform 2
  tinyPlatform2 = scene.physics.add.sprite(centerX + 280, 325, "tiny-platform");
  tinyPlatform2.setScale(0.6);
  tinyPlatform2.body.allowGravity = false;
  tinyPlatform2.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform2);

  // Platform 3
  tinyPlatform3 = scene.physics.add.sprite(centerX - 430, 200, "tiny-platform");
  tinyPlatform3.setScale(0.6);
  tinyPlatform3.body.allowGravity = false;
  tinyPlatform3.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform3);

  // Platform 4
  tinyPlatform4 = scene.physics.add.sprite(centerX + 430, 200, "tiny-platform");
  tinyPlatform4.setScale(0.6);
  tinyPlatform4.body.allowGravity = false;
  tinyPlatform4.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform4);

  // Platform 5
  tinyPlatform5 = scene.physics.add.sprite(centerX - 130, 150, "tiny-platform");
  tinyPlatform5.setScale(0.6);
  tinyPlatform5.body.allowGravity = false;
  tinyPlatform5.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform5);

  // Platform 6
  tinyPlatform6 = scene.physics.add.sprite(centerX + 130, 150, "tiny-platform");
  tinyPlatform6.setScale(0.6);
  tinyPlatform6.body.allowGravity = false;
  tinyPlatform6.setImmovable(true);
  mangroveMeadowObjects.push(tinyPlatform6);
}


/***/ }),

/***/ "./src/ReturningShuriken.js":
/*!**********************************!*\
  !*** ./src/ReturningShuriken.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReturningShuriken)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// ReturningShuriken.js
// Curved, returning, piercing shuriken with deterministic local simulation.

 // owner-only hit events
var ReturningShuriken = /*#__PURE__*/function (_Phaser$Physics$Arcad) {
  _inherits(ReturningShuriken, _Phaser$Physics$Arcad);
  /**
   * @param {Phaser.Scene} scene
   * @param {{x:number,y:number}} startPos
   * @param {Phaser.Physics.Arcade.Sprite} ownerSprite
   * @param {Object} config
   */
  function ReturningShuriken(scene, startPos, ownerSprite, config) {
    var _this;
    _classCallCheck(this, ReturningShuriken);
    _this = _callSuper(this, ReturningShuriken, [scene, startPos.x, startPos.y, "shuriken"]);
    _this.ownerSprite = ownerSprite;
    _this.cfg = Object.assign({
      direction: 1,
      forwardDistance: 520,
      outwardDuration: 600,
      // ms
      returnSpeed: 580,
      // px/s (cap)
      rotationSpeed: 950,
      // deg/s
      scale: 0.1,
      damage: 1000,
      username: "",
      gameId: "",
      isOwner: false,
      maxLifetime: 7000,
      hitCooldown: 150
    }, config || {});

    // Phase state
    _this.phase = "outward"; // outward -> hover -> return
    _this.elapsed = 0; // ms in current phase
    _this.totalElapsed = 0; // ms total life
    _this.hoverDuration = 100; // ms to hover before returning
    _this.returnAcceleration = 800; // px/s^2
    _this.currentReturnSpeed = _this.cfg.returnSpeed * 0.08; // ramp up
    _this.hitTimestamps = {}; // username -> last hit ms

    // Trail state
    _this.trailInterval = 30; // ms
    _this.trailAccum = 0;
    _this.trails = [];
    _this.maxTrails = 40;

    // Add to scene / physics
    scene.add.existing(_assertThisInitialized(_this));
    scene.physics.add.existing(_assertThisInitialized(_this));
    _this.setScale(_this.cfg.scale);
    _this.body.allowGravity = false;
    _this.setDepth(5);
    _this.setAngularVelocity(_this.cfg.rotationSpeed * _this.cfg.direction);

    // Path control points (slight dip then bulge)
    _this.startX = startPos.x;
    _this.startY = startPos.y;
    _this.endX = _this.startX + _this.cfg.direction * _this.cfg.forwardDistance;
    _this.endY = _this.startY;
    var dipDown = 20;
    var bulgeUp = 40;
    _this.ctrl1X = _this.startX + _this.cfg.direction * _this.cfg.forwardDistance * 0.25;
    _this.ctrl1Y = _this.startY + dipDown;
    _this.ctrl2X = _this.startX + _this.cfg.direction * _this.cfg.forwardDistance * 0.6;
    _this.ctrl2Y = _this.startY - bulgeUp;

    // Unified subtle glow (blue if owner, red otherwise)
    var glowColor = _this.cfg.isOwner ? 0x2e9bff : 0xff3a2e;
    _this.glow = scene.add.graphics();
    _this.glow.setDepth(_this.depth - 1);
    _this.glow.setBlendMode(Phaser.BlendModes.ADD);
    _this._drawGlow(glowColor);
    scene.tweens.add({
      targets: _this.glow,
      scale: {
        from: 0.95,
        to: 1.15
      },
      alpha: {
        from: 0.9,
        to: 0.55
      },
      duration: 600,
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut"
    });
    _this.scene.events.on("update", _this.updateShuriken, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReturningShuriken, [{
    key: "_drawGlow",
    value: function _drawGlow(colorInt) {
      var baseRadius = 85 * this.cfg.scale;
      var innerRadius = baseRadius * 0.42;
      var midRadius = baseRadius * 0.9;
      var outerRadius = baseRadius * 1.2;
      var c = Phaser.Display.Color.IntegerToColor(colorInt);
      this.glow.clear();
      this.glow.x = this.x;
      this.glow.y = this.y;
      this.glow.fillStyle(c.color, 0.42);
      this.glow.fillCircle(0, 0, outerRadius);
      this.glow.fillStyle(c.color, 0.72);
      this.glow.fillCircle(0, 0, midRadius);
      this.glow.fillStyle(c.color, 0.95);
      this.glow.fillCircle(0, 0, innerRadius);
    }

    // Cubic Bezier interpolation helper
  }, {
    key: "cubic",
    value: function cubic(t, p0, p1, p2, p3) {
      var it = 1 - t;
      return it * it * it * p0 + 3 * it * it * t * p1 + 3 * it * t * t * p2 + t * t * t * p3;
    }
  }, {
    key: "tryDamage",
    value: function tryDamage(targetWrapper) {
      if (!this.cfg.isOwner) return; // only owner reports hits
      if (!targetWrapper) return;
      var targetUsername = targetWrapper.username || targetWrapper._username || targetWrapper.name || "unknown";
      var now = this.scene.time.now;
      var last = this.hitTimestamps[targetUsername] || 0;
      if (now - last < this.cfg.hitCooldown) return;
      this.hitTimestamps[targetUsername] = now;
      _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("hit", {
        attacker: this.cfg.username,
        target: targetUsername,
        damage: this.cfg.damage,
        gameId: this.cfg.gameId
      });
    }
  }, {
    key: "attachEnemyOverlap",
    value: function attachEnemyOverlap(objects) {
      var _this2 = this;
      objects.forEach(function (obj) {
        if (!obj) return;
        var sprite = obj.opponent || obj;
        _this2.scene.physics.add.overlap(_this2, sprite, function () {
          if (obj.opponent) _this2.tryDamage(obj);
        });
      });
    }
  }, {
    key: "attachMapOverlap",
    value: function attachMapOverlap() {
      // Intentionally blank (projectile ignores map now)
    }
  }, {
    key: "spawnTrail",
    value: function spawnTrail() {
      var s = this.scene.add.image(this.x, this.y, "shuriken");
      s.setScale(this.cfg.scale * 0.4);
      s.setDepth(4);
      s.alpha = 0.35;
      this.scene.tweens.add({
        targets: s,
        alpha: 0,
        scale: {
          from: s.scale,
          to: s.scale * 0.15
        },
        duration: 300,
        ease: "Cubic.easeOut",
        onComplete: function onComplete() {
          return s.destroy();
        }
      });
      this.trails.push(s);
      if (this.trails.length > this.maxTrails) {
        var old = this.trails.shift();
        if (old && old.destroy) old.destroy();
      }
    }
  }, {
    key: "destroyShuriken",
    value: function destroyShuriken() {
      if (!this.scene) return;
      this.scene.events.off("update", this.updateShuriken, this);
      this.trails.forEach(function (t) {
        return t && t.destroy && t.destroy();
      });
      this.trails.length = 0;
      if (this.glow && this.glow.destroy) this.glow.destroy();
      this.destroy();
    }
  }, {
    key: "updateShuriken",
    value: function updateShuriken(_, delta) {
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
        var rawT = Phaser.Math.Clamp(this.elapsed / this.cfg.outwardDuration, 0, 1);
        var t = (1 - Math.cos(Math.PI * rawT)) / 2; // ease in-out
        var nx = this.cubic(t, this.startX, this.ctrl1X, this.ctrl2X, this.endX);
        var ny = this.cubic(t, this.startY, this.ctrl1Y, this.ctrl2Y, this.endY);
        this.setPosition(nx, ny);
        if (rawT >= 1) {
          this.phase = "hover";
          this.elapsed = 0;
          this.setAngularVelocity(this.cfg.rotationSpeed * 0.55 * this.cfg.direction);
        }
      } else if (this.phase === "hover") {
        if (this.elapsed >= this.hoverDuration) {
          this.phase = "return";
          this.elapsed = 0;
          this.setAngularVelocity(this.cfg.rotationSpeed * 1.15 * this.cfg.direction);
        }
      } else if (this.phase === "return") {
        if (!this.ownerSprite || !this.ownerSprite.active) {
          this.x += this.cfg.direction * (this.currentReturnSpeed * (delta / 1000));
        } else {
          var dx = this.ownerSprite.x - this.x;
          var dy = this.ownerSprite.y - this.y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          this.currentReturnSpeed = Math.min(this.cfg.returnSpeed, this.currentReturnSpeed + this.returnAcceleration * (delta / 1000));
          var spd = this.currentReturnSpeed * (delta / 1000);
          this.setPosition(this.x + dx / dist * spd, this.y + dy / dist * spd);
          if (dist < 30) {
            if (this.cfg.isOwner && this.onReturn && typeof this.onReturn === "function") {
              try {
                this.onReturn();
              } catch (e) {
                /* silent */
              }
            }
            this.destroyShuriken();
            return;
          }
        }
      }

      // Update glow position
      if (this.glow) {
        this.glow.x = this.x;
        this.glow.y = this.y;
      }
    }
  }]);
  return ReturningShuriken;
}(Phaser.Physics.Arcade.Image);


/***/ }),

/***/ "./src/effects.js":
/*!************************!*\
  !*** ./src/effects.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prewarmDust: () => (/* binding */ prewarmDust),
/* harmony export */   spawnDust: () => (/* binding */ spawnDust)
/* harmony export */ });
// effects.js
// Shared lightweight VFX helpers (dust / smoke puffs for running)

var dustPool = [];
var dustPoolMax = 120;
function spawnDust(scene, x, y) {
  var tint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0x888888;
  var g = dustPool.find(function (o) {
    return !o.active;
  });
  if (!g) {
    g = scene.add.graphics();
    dustPool.push(g);
  }
  g.active = true;
  g.clear();
  g.setDepth(1); // behind players (player depth assumed >1 for main sprite)
  var baseSize = Phaser.Math.Between(6, 10);
  var alphaStart = Phaser.Math.FloatBetween(0.35, 0.55);
  var puffColor = Phaser.Display.Color.IntegerToColor(tint);
  // Outer soft ring
  g.fillStyle(puffColor.color, alphaStart * 0.5);
  g.fillCircle(0, 0, baseSize);
  // Inner denser core
  g.fillStyle(puffColor.color, alphaStart);
  g.fillCircle(0, 0, baseSize * 0.55);
  g.x = x + Phaser.Math.Between(-4, 4);
  g.y = y + Phaser.Math.Between(-2, 2);
  var rise = Phaser.Math.Between(10, 22);
  var driftX = Phaser.Math.Between(-12, 12);
  var scaleTarget = Phaser.Math.FloatBetween(1.2, 1.6);
  var duration = Phaser.Math.Between(380, 520);
  g.scale = 1;
  g.alpha = alphaStart;
  scene.tweens.add({
    targets: g,
    x: g.x + driftX,
    y: g.y - rise,
    alpha: 0,
    scale: scaleTarget,
    duration: duration,
    ease: "Cubic.easeOut",
    onComplete: function onComplete() {
      g.active = false;
      g.alpha = 1;
      g.scale = 1;
      g.clear();
    }
  });
  if (dustPool.length > dustPoolMax) {
    var old = dustPool.find(function (o) {
      return !o.active;
    });
    if (old) {
      old.destroy();
      var idx = dustPool.indexOf(old);
      if (idx >= 0) dustPool.splice(idx, 1);
    }
  }
}
function prewarmDust(scene) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  for (var i = 0; i < count; i++) {
    spawnDust(scene, -9999, -9999);
  }
  dustPool.forEach(function (g) {
    g.active = false;
    g.clear();
  });
}

/***/ }),

/***/ "./src/opPlayer.js":
/*!*************************!*\
  !*** ./src/opPlayer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpPlayer)
/* harmony export */ });
/* harmony import */ var _Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maps/lushyPeaks */ "./src/Maps/lushyPeaks.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// opplayer.js




var OpPlayer = /*#__PURE__*/function () {
  function OpPlayer(scene, character, username, team, spawnPlatform, spawn, playersInTeam, map) {
    _classCallCheck(this, OpPlayer);
    this.scene = scene;
    this.character = character;
    this.username = username;
    this.team = team;
    this.spawnPlatform = spawnPlatform;
    this.spawn = spawn;
    this.map = map;
    this.mapObjects;
    this.playersInTeam = playersInTeam;
    this.opMaxHealth = 8000;
    this.opCurrentHealth = 8000;
    this.opHealthBarWidth = 60;
    this.movementTween = null; // Store reference to current movement tween
    this.createOpPlayer();
  }
  _createClass(OpPlayer, [{
    key: "createOpPlayer",
    value: function createOpPlayer() {
      var _this = this;
      // Creates the sprite
      this.opponent = this.scene.physics.add.sprite(-100, -100, "sprite");
      this.opponent.body.allowGravity = false;
      this.opponent.anims.play("idle", true);

      // Sets spawns
      if (this.spawnPlatform === "bottom") {
        if (this.map === "1") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.base, this.spawn, this.opponent);
        } else if (this.map === "2") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateMangroveSpawn)("bottom", this.spawn, this.opponent);
        }
      } else if (this.spawnPlatform === "top") {
        if (this.map === "1") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.platform, this.spawn, this.opponent);
        } else if (this.map === "2") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateMangroveSpawn)("top", this.spawn, this.opponent);
        }
      }

      // Changes frame size to prevent wall clipping
      this.opFrame = this.opponent.frame;
      this.opponent.body.setSize(this.opFrame.width - 35, this.opFrame.width - 10);
      this.opponent.body.setOffset(this.opponent.body.width / 2, 10);

      // Sets the text of the name to username
      this.opPlayerName = this.scene.add.text(this.opponent.x, this.opponent.y - this.opponent.height + 10, this.username);
      this.opPlayerName.setStyle({
        font: "bold 8pt Arial",
        fill: "#000000"
      });
      this.opPlayerName.setOrigin(0.5, 0);
      this.opHealthText = this.scene.add.text(0, 0, "", {
        fontFamily: "Arial",
        fontSize: "10px",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 4
      });
      this.opHealthBar = this.scene.add.graphics();

      // Initially updates health bar
      this.updateHealthBar();

      // Listen for health updates for this opponent
      _socket__WEBPACK_IMPORTED_MODULE_2__["default"].on("health-update", function (data) {
        // data: { username, health, gameId }
        if (data.username === _this.username) {
          _this.opCurrentHealth = data.health;
          if (_this.opCurrentHealth <= 0) {
            _this.opCurrentHealth = 0;
            _this.updateHealthBar(true); // show dead styling & 0
          } else {
            _this.updateHealthBar();
          }
        }
      });
    }
  }, {
    key: "updateHealthBar",
    value: function updateHealthBar() {
      var dead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var healthBarY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.opCurrentHealth < 0) {
        // Prevents health from going negative
        this.opCurrentHealth = 0;
      }
      // Sets percentage of health
      var healthPercentage = this.opCurrentHealth / this.opMaxHealth;
      var displayedWidth = this.opHealthBarWidth * healthPercentage;

      // Clears previous health bar graphics
      this.opHealthBar.clear();

      // Sets x in the center
      var healthBarX = this.opponent.x - this.opHealthBarWidth / 2;
      // If player is dead, sets the y value lower
      if (dead === false) {
        healthBarY = this.opponent.y - (this.opponent.height / 2 + 4);
        this.opHealthText.setText("".concat(this.opCurrentHealth));
      } else {
        // Position lower when dead (same offset logic as local player)
        healthBarY = this.opponent.y - (this.opponent.height / 2 - 24);
        this.opHealthText.setText("0");
      }
      this.opHealthBar.fillStyle(0x595959);
      this.opHealthBar.fillRect(healthBarX, healthBarY, this.opHealthBarWidth, 9);

      // Creates a black border around healthbar
      this.opHealthBar.lineStyle(3, 0x000000);
      this.opHealthBar.strokeRoundedRect(healthBarX, healthBarY, this.opHealthBarWidth, 9, 3);
      if (this.team === "user") {
        this.opHealthBar.fillStyle(0x2e88ca); // blue color for user team
      } else {
        this.opHealthBar.fillStyle(0xbb5c39); // red color for op team
      }
      this.opHealthBar.fillRoundedRect(healthBarX, healthBarY, displayedWidth, 9, 3);
      this.opHealthText.setPosition(this.opponent.x - this.opHealthText.width / 2, healthBarY - 8);
      this.opHealthText.setDepth(2);
    }

    // Clean up method to stop any active tweens and remove sprites
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.movementTween) {
        this.movementTween.remove();
        this.movementTween = null;
      }
      if (this.opponent) {
        this.opponent.destroy();
      }
      if (this.opPlayerName) {
        this.opPlayerName.destroy();
      }
      if (this.opHealthText) {
        this.opHealthText.destroy();
      }
      if (this.opHealthBar) {
        this.opHealthBar.destroy();
      }
    }
  }]);
  return OpPlayer;
}();


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateMangroveSpawn: () => (/* binding */ calculateMangroveSpawn),
/* harmony export */   calculateSpawn: () => (/* binding */ calculateSpawn),
/* harmony export */   createPlayer: () => (/* binding */ createPlayer),
/* harmony export */   currentHealth: () => (/* binding */ currentHealth),
/* harmony export */   dead: () => (/* binding */ dead),
/* harmony export */   frame: () => (/* binding */ frame),
/* harmony export */   handlePlayerMovement: () => (/* binding */ handlePlayerMovement),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   setCurrentHealth: () => (/* binding */ setCurrentHealth)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
/* harmony import */ var _Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Maps/lushyPeaks */ "./src/Maps/lushyPeaks.js");
/* harmony import */ var _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Maps/mangroveMeadow */ "./src/Maps/mangroveMeadow.js");
/* harmony import */ var _Animations_ninja__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Animations/ninja */ "./src/Animations/ninja.js");
/* harmony import */ var _ReturningShuriken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReturningShuriken */ "./src/ReturningShuriken.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./effects */ "./src/effects.js");
// player.js
// NOTE: Refactored to remove circular dependency on game.js.
// socket now comes from standalone socket.js and opponentPlayers are passed into createPlayer.

function pdbg() {
  /* logging disabled */
}





// Globals
var player;
var cursors;
var canWallJump = true;
var isMoving = false;
var isJumping = false;
var isAttacking = false;
var canAttack = true;
var frame;
var maxHealth = 8000;
var currentHealth = 8000; // Client-side copy (display only)
var dead = false;
var healthBarWidth = 60;
var healthBar;
var healthText;
// Ammo/Cooldown bar (client-side only)
var ammoBar; // graphics
var ammoBarBack; // background graphics
var ammoBarWidth = 60;
var ammoCooldownMs = 1200; // 2s
var ammoElapsed = 0; // time since last shot (ms)
var ammoReady = true;
var ammoTween; // active tween reference for smooth fill

var playerName;
var indicatorTriangle;
var username;
var gameId = window.location.pathname.split("/").filter(Boolean).pop();
var scene;
var spawn;
var playersInTeam;
var spawnPlatform;
var mapObjects;
var map;
var opponentPlayersRef; // injected from game.js to avoid circular import
var fireTrailTimer = 0;
var fireTrailInterval = 45; // ms
var firePool = [];
var firePoolMax = 60;
var dustTimer = 0;
var dustInterval = 70; // ms between dust puffs when running
function spawnFireFlame(scene, x, y) {
  // Reuse small graphics objects instead of creating rectangles each time
  var g = firePool.find(function (o) {
    return !o.active;
  });
  if (!g) {
    g = scene.add.graphics();
    g.active = true;
    firePool.push(g);
  }
  g.clear();
  g.active = true;
  g.setDepth(0); // behind player (player depth assumed >0)
  var baseSize = Phaser.Math.Between(5, 9);
  // Draw outer glow (red)
  g.fillStyle(0xff3c00, 0.35);
  g.fillCircle(0, 0, baseSize);
  // Mid layer (orange)
  g.fillStyle(0xff8800, 0.55);
  g.fillCircle(0, 0, baseSize * 0.65);
  // Core (yellow/white)
  g.fillStyle(Phaser.Display.Color.GetColor(255, Phaser.Math.Between(200, 230), 80), 0.9);
  g.fillCircle(0, 0, baseSize * 0.35);
  g.x = x + Phaser.Math.Between(-3, 3);
  g.y = y + Phaser.Math.Between(-3, 3);
  var driftX = Phaser.Math.Between(-12, 12);
  var driftY = Phaser.Math.Between(-18, -4);
  var scaleTarget = Phaser.Math.FloatBetween(0.15, 0.35);
  var duration = Phaser.Math.Between(260, 420);
  g.scale = 1;
  scene.tweens.add({
    targets: g,
    x: g.x + driftX,
    y: g.y + driftY,
    scale: scaleTarget,
    alpha: 0,
    duration: duration,
    ease: "Cubic.easeOut",
    onComplete: function onComplete() {
      g.active = false;
      g.alpha = 1;
      g.scale = 1;
      g.clear();
    }
  });
  // Cap pool size
  if (firePool.length > firePoolMax) {
    var old = firePool.find(function (o) {
      return !o.active;
    });
    if (old) {
      old.destroy();
      var idx = firePool.indexOf(old);
      if (idx >= 0) firePool.splice(idx, 1);
    }
  }
}

// Create player function
function createPlayer(sceneParam, name, character, spawnPlatformParam, spawnParam, playersInTeamParam, mapParam, opponentPlayersParam) {
  username = name;
  scene = sceneParam;
  spawn = spawnParam;
  playersInTeam = playersInTeamParam;
  spawnPlatform = spawnPlatformParam;
  map = mapParam;
  opponentPlayersRef = opponentPlayersParam;
  pdbg();
  cursors = scene.input.keyboard.createCursorKeys();
  if (character === "ninja") {
    (0,_Animations_ninja__WEBPACK_IMPORTED_MODULE_3__.ninjaAnimations)(scene);
  }

  // Create player sprite!!
  player = scene.physics.add.sprite(-100, -100, "sprite");
  player.anims.play("idle", true); // Play idle animation
  pdbg();

  // Listener to detect if player leaves the world bounds
  scene.events.on("update", function () {
    if (player.y > scene.physics.world.bounds.bottom + 50) {
      setTimeout(function () {
        // Request a suicide if player falls out (treat as self-hit to 99999)
        if (!dead) {
          _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("hit", {
            attacker: username,
            target: username,
            damage: 99999,
            gameId: gameId
          });
          pdbg();
        }
      }, 500);
    }
  });

  // Map
  if (map === "1") {
    mapObjects = _Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.lushyPeaksObjects;
  } else if (map === "2") {
    mapObjects = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.mangroveMeadowObjects;
  }

  // Sets spawn based on session storage data
  if (spawnPlatform === "bottom") {
    if (map === "1") {
      calculateSpawn(_Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.base, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("bottom", spawn, player);
    }
  } else if (spawnPlatform === "top") {
    if (map === "1") {
      calculateSpawn(_Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.platform, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("top", spawn, player);
    }
  }

  // Changes size of player frame so it can't clip. There are some issues where the frame changes to fit the animation size so this must be done to prevent that.
  frame = player.frame;
  player.body.setSize(frame.width - 35, frame.width - 10);
  player.body.setOffset(player.body.width / 2, 10);

  // Player name text
  playerName = scene.add.text(player.x, player.y - player.height + 10, username);
  playerName.setStyle({
    font: "bold 8pt Arial",
    fill: "#000000"
  });
  playerName.setOrigin(0.5, 0);

  // Health text
  healthText = scene.add.text(0, 0, "", {
    fontFamily: "Arial",
    fontSize: "10px",
    color: "#FFFFFF",
    // White
    stroke: "#000000",
    // Black
    strokeThickness: 4
  });

  // Health bar
  healthBar = scene.add.graphics();
  // Ammo bar background & fill (render order: background, fill)
  ammoBarBack = scene.add.graphics();
  ammoBar = scene.add.graphics();

  // Triangle to show which one is the user. Dissapears when the player moves
  indicatorTriangle = scene.add.graphics();
  var triangle = new Phaser.Geom.Triangle(player.x, player.y - 62,
  // Top point
  player.x - 13, player.y - 72,
  // Left point
  player.x + 13, player.y - 72 // Right point
  );
  indicatorTriangle.fillStyle(0x99ab2c); // Green color
  indicatorTriangle.fillTriangleShape(triangle);

  // When the user taps, it shoots
  scene.input.on("pointerdown", function (pointer) {
    // If attack cooldown is finished
    if (ammoReady && canAttack) {
      isAttacking = true; // Sets variable for animation
      canAttack = false; // Sets attack cooldown variable

      // Start cooldown (will instantly refill if projectile returns early)
      ammoReady = false;
      ammoElapsed = 0;
      if (ammoTween) {
        ammoTween.remove();
        ammoTween = null;
      }
      // Tween that visually fills ammo bar over cooldown
      var tweenProxy = {
        t: 0
      };
      ammoTween = scene.tweens.add({
        targets: tweenProxy,
        t: 1,
        duration: ammoCooldownMs,
        ease: "Linear",
        onUpdate: function onUpdate() {
          ammoElapsed = tweenProxy.t * ammoCooldownMs;
          drawAmmoBar();
        },
        onComplete: function onComplete() {
          ammoElapsed = ammoCooldownMs;
          ammoReady = true;
          canAttack = true; // attack key gating
          drawAmmoBar();
        }
      });
      setTimeout(function () {
        isAttacking = false;
        // canAttack becomes true only when cooldown completes or projectile returns
      }, 300); // After 300 miliseconds, the user can attack again

      // Play the sound
      var shurikenSound = scene.sound.add("shurikenThrow");
      shurikenSound.setVolume(0.08);
      shurikenSound.setRate(1.3); // Change pitch
      shurikenSound.play();

      // If the user has ninja character, it throws a shuriken
      if (character === "Ninja") {
        player.anims.play("throw", true); // Play throwing animation

        // New returning shuriken projectile
        var direction = player.flipX ? -1 : 1;
        var config = {
          direction: direction,
          username: username,
          gameId: gameId,
          isOwner: true,
          damage: 1000,
          rotationSpeed: 2000,
          forwardDistance: 500,
          arcHeight: 160,
          outwardDuration: 380,
          returnSpeed: 900
        };
        var returning = new _ReturningShuriken__WEBPACK_IMPORTED_MODULE_4__["default"](scene, {
          x: player.x,
          y: player.y
        }, player, config);
        // Instant cooldown refill on return (early retrieval mechanic)
        returning.onReturn = function () {
          // Skip if already ready
          if (ammoReady) return;
          ammoElapsed = ammoCooldownMs;
          ammoReady = true;
          canAttack = true;
          if (ammoTween) {
            ammoTween.remove();
            ammoTween = null;
          }
          drawAmmoBar();
        };

        // Overlaps: enemies & map objects
        var enemyList = [];
        if (opponentPlayersRef) {
          for (var playerId in opponentPlayersRef) {
            enemyList.push(opponentPlayersRef[playerId]);
          }
        }
        returning.attachEnemyOverlap(enemyList);
        // Map objects cause destroy only during outward/hover (handled internally)
        returning.attachMapOverlap(mapObjects);

        // Emit for remote clients (they will spawn a visual copy following classic straight line fallback for now)
        _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("attack", {
          x: player.x,
          y: player.y,
          weapon: "shuriken",
          scale: config.scale || 0.1,
          damage: config.damage,
          name: username,
          returning: true,
          direction: direction,
          // send timing params so remote can deterministically simulate
          forwardDistance: config.forwardDistance,
          outwardDuration: config.outwardDuration,
          returnSpeed: config.returnSpeed,
          rotationSpeed: config.rotationSpeed
        });
        pdbg();
      }
    }
  });
}

// Function to set health of player from another file
function setCurrentHealth(damage) {
  // Deprecated: server authoritative. Kept for compatibility (no-op display update only)
  currentHealth -= damage;
  if (currentHealth < 0) currentHealth = 0;
  updateHealthBar();
}
function updateHealthBar() {
  if (currentHealth <= 0) currentHealth = 0;
  var healthPercentage = currentHealth / maxHealth;
  var displayedWidth = healthBarWidth * healthPercentage;
  pdbg();
  healthBar.clear(); // Clear the graphics before redrawing

  var healthBarX = player.x - healthBarWidth / 2;
  var healthBarY;
  if (!dead) {
    healthBarY = player.y - (player.height / 2 + 8); // shift up slightly to make space for ammo bar
    healthText.setText("".concat(currentHealth));
  } else {
    healthBarY = player.y - (player.height / 2 - 24);
    // Show 0 instead of blank when dead
    healthText.setText("0");
    playerName.setPosition(player.x, playerName.y + 30);
  }

  // Draw the background rectangle with the default fill color
  healthBar.fillStyle(0x595959);
  healthBar.fillRect(healthBarX, healthBarY, healthBarWidth, 9);

  // Draw the health bar background (stroke)
  healthBar.lineStyle(3, 0x000000);
  healthBar.strokeRoundedRect(healthBarX, healthBarY, healthBarWidth, 9, 3);

  // Draw the filled part of the health bar (green)
  healthBar.fillStyle(0x99ab2c);
  healthBar.fillRoundedRect(healthBarX, healthBarY, displayedWidth, 9, 3);
  healthText.setPosition(player.x - healthText.width / 2, healthBarY - 8);
  healthText.setDepth(2);

  // Draw ammo bar underneath health (only for local player & when alive)
  drawAmmoBar(healthBarX, healthBarY + 11);
}
function drawAmmoBar(forcedX, forcedY) {
  if (!ammoBar || !ammoBarBack) return;
  var percent = Phaser.Math.Clamp(ammoElapsed / ammoCooldownMs, 0, 1);
  var x = forcedX !== undefined ? forcedX : player.x - ammoBarWidth / 2;
  var y = forcedY !== undefined ? forcedY : player.y - (player.height / 2 + 8) + 11;
  ammoBarBack.clear();
  ammoBar.clear();
  // Background
  ammoBarBack.fillStyle(0x222222, 0.65);
  ammoBarBack.fillRoundedRect(x, y, ammoBarWidth, 6, 3);
  ammoBarBack.lineStyle(2, 0x000000, 0.9);
  ammoBarBack.strokeRoundedRect(x, y, ammoBarWidth, 6, 3);
  // Fill gradient simulation (two passes)
  // Red color scheme (darker while charging, bright when ready)
  var chargingColor = 0xb32121;
  var readyColor = 0xff4040;
  // Simple interpolate between dark->bright based on percent
  var r1 = chargingColor >> 16 & 0xff;
  var g1 = chargingColor >> 8 & 0xff;
  var b1 = chargingColor & 0xff;
  var r2 = readyColor >> 16 & 0xff;
  var g2 = readyColor >> 8 & 0xff;
  var b2 = readyColor & 0xff;
  var r = Math.round(r1 + (r2 - r1) * percent);
  var g = Math.round(g1 + (g2 - g1) * percent);
  var b = Math.round(b1 + (b2 - b1) * percent);
  var fillColor = r << 16 | g << 8 | b;
  ammoBar.fillStyle(fillColor, 0.95);
  ammoBar.fillRoundedRect(x, y, ammoBarWidth * percent, 6, 3);
  // Small highlight overlay for polish
  ammoBar.fillStyle(0xffffff, 0.25 * (percent < 1 ? 1 : 0.6));
  ammoBar.fillRoundedRect(x, y, ammoBarWidth * percent, 2, {
    tl: 3,
    tr: 3,
    bl: 0,
    br: 0
  });
  ammoBar.setDepth(2);
  ammoBarBack.setDepth(1);
}
function calculateSpawn(platform, spawn, player) {
  var availableSpace = platform.width / playersInTeam; // Space for each player
  var leftMost = platform.getBounds().left; // Leftmost x cord of the platform
  var spawnY = platform.getTopCenter().y - player.height / 2; // Gets y cordinate for the player by calculating the center and subtracting half the player height. Since the player y is at the center.

  var spawnX = leftMost + spawn * availableSpace / 2 - player.width * 1.333; // Calculates spawnx by combining all the previous variables. 1.333 is multiplied to perfect the position of the spawn otherwise it is offset to the right.
  player.x = spawnX;
  player.y = spawnY;
}
function calculateMangroveSpawn(position, spawnParam, player) {
  var platform;
  var spawn = String(spawnParam);
  if (position === "top") {
    if (spawn === "1") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform1;
    } else if (spawn === "2") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform2;
    } else if (spawn === "3") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform3;
    }
  } else if (position === "bottom") {
    if (spawn === "1") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform4;
    } else if (spawn === "2") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform5;
    } else if (spawn === "3") {
      platform = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform6;
    }
  }
  var availableSpace = platform.width;
  var leftMost = platform.getBounds().left; // Leftmost x cord of the platform
  var spawnY = platform.getTopCenter().y - player.height / 2; // Gets y cordinate for the player by calculating the center and subtracting half the player height. Since the player y is at the center.

  var spawnX = leftMost + availableSpace / 2 - player.width;
  player.x = spawnX;
  player.y = spawnY;
}
function handlePlayerMovement(scene) {
  var speed = 250;
  var jumpSpeed = 400;

  // Keys. Player can use either arrow keys or WASD
  var leftKey = cursors.left.isDown || scene.input.keyboard.addKey("A").isDown;
  var rightKey = cursors.right.isDown || scene.input.keyboard.addKey("D").isDown;
  var upKey = cursors.up.isDown || scene.input.keyboard.addKey("W").isDown;

  // Left movement
  if (leftKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has moved
    }
    player.setVelocityX(-speed); // Sets velocity to negative so that it moves left
    player.flipX = true; // Mirrors the body of the player
    isMoving = true; // Sets the isMoving to true
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play("running", true);
    }
    // Right movement
  } else if (rightKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has moved
    }
    player.flipX = false; // Undos the mirror of the player
    player.setVelocityX(speed); // Sets velocity torwards right
    isMoving = true; // Sets moving variable
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play("running", true);
    }
  } else {
    stopMoving(); // If no key is being pressed, it calls the stop moving function
  }

  // Jumping
  if (upKey && player.body.touching.down && !dead) {
    // If player is touching ground and jumping
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has jumped
    }
    jump(); // Calls jump
  } else if (
  // If player is touching a wall while jumping
  (player.body.touching.left || player.body.touching.right && !dead) && canWallJump && upKey) {
    wallJump(); // Calls walljump
  }
  if ((player.body.touching.left || player.body.touching.right && !dead) && !isAttacking) {
    player.anims.play("sliding", true); // Plays sliding animation
  }

  // Check if the jump animation has completed
  if (!player.anims.isPlaying && !player.body.touching.down && !player.body.touching.left && !player.body.touching.right) {
    fall(); // Plays falling animation if the player is not touching a wall or if any other animation is playing
  }

  // If no movement animations are playing, play the 'idle' animation
  if (!isMoving && player.body.touching.down && !isJumping && !isAttacking && !dead) {
    idle();
  }
  updateHealthBar(); // Updates the health bar after the new player position
  playerName.setPosition(player.x, player.y - player.height + 10); // Updates the player nametag with the new position

  // Fire trail (simple particle substitute)
  fireTrailTimer += scene.game.loop.delta;
  dustTimer += scene.game.loop.delta;
  if (!dead && fireTrailTimer >= fireTrailInterval && isMoving &&
  // only when actually moving horizontally
  !dead) {
    fireTrailTimer = 0;
    var baseX = player.x - (player.flipX ? -14 : 14);
    var baseY = player.y + 8;
    // Spawn 1-2 layered flames each interval
    var count = Phaser.Math.Between(1, 2);
    for (var i = 0; i < count; i++) {
      spawnFireFlame(scene, baseX, baseY);
    }
  }

  // Ground running dust (only while on ground & moving)
  if (!dead && isMoving && player.body.touching.down && dustTimer >= dustInterval) {
    dustTimer = 0;
    var dustY = player.y + player.height * 0.45; // near feet
    var dustX = player.x + (player.flipX ? -18 : 18) * 0.3;
    (0,_effects__WEBPACK_IMPORTED_MODULE_5__.spawnDust)(scene, dustX, dustY);
    if (Math.random() < 0.3) {
      // occasional extra puff for variability
      (0,_effects__WEBPACK_IMPORTED_MODULE_5__.spawnDust)(scene, dustX + Phaser.Math.Between(-6, 6), dustY + Phaser.Math.Between(-2, 2));
    }
  }
  function stopMoving() {
    player.setVelocityX(0); // Sets the player to not moving
    isMoving = false;
  }
  function jump() {
    player.anims.play("jumping", true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }
  function wallJump() {
    canWallJump = false;
    player.anims.play("sliding", true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    var wallJumpTween = scene.tweens.add({
      // This tween smooths the kickback from the walljump
      targets: player,
      x: player.x + (player.body.touching.left ? 50 : -50),
      // Moves the player -50 or 50 cords away depending on position
      duration: 200,
      ease: "Linear",
      onComplete: function onComplete() {
        canWallJump = true;
      }
    });
    wallJumpTween.play(); // Plays the tween
  }
  function fall() {
    player.anims.play("falling", true);
    pdbg();
    isJumping = false;
  }
  function idle() {
    player.anims.play("idle", true);
    pdbg();
  }
}


// Listen for authoritative health updates from server
_socket__WEBPACK_IMPORTED_MODULE_0__["default"].on("health-update", function (data) {
  if (data.gameId !== gameId) return;
  if (data.username === username) {
    currentHealth = data.health;
    pdbg();
    if (currentHealth <= 0) {
      if (!dead) {
        dead = true;
        player.anims.play("dying", true);
        scene.input.enabled = false;
        player.alpha = 0.5;
        pdbg();
      }
      currentHealth = 0; // force exact 0
    }
    updateHealthBar(); // always refresh (covers death case where movement loop stops)
  }
});

/***/ }),

/***/ "./src/socket.js":
/*!***********************!*\
  !*** ./src/socket.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// socket.js
// Centralized Socket.IO client to avoid circular dependencies between game, player, and opPlayer modules.
var socket = io("/");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   opponentPlayers: () => (/* binding */ opponentPlayers),
/* harmony export */   teamPlayers: () => (/* binding */ teamPlayers)
/* harmony export */ });
/* harmony import */ var _Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maps/lushyPeaks */ "./src/Maps/lushyPeaks.js");
/* harmony import */ var _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Maps/mangroveMeadow */ "./src/Maps/mangroveMeadow.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ReturningShuriken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReturningShuriken */ "./src/ReturningShuriken.js");
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
/* harmony import */ var _opPlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./opPlayer */ "./src/opPlayer.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./effects */ "./src/effects.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// game.js

// Image Credits
// Shuriken Image: https://zh-partners.com/apps-sticker-banner-poster-printing-usage-and-part-of-logo-4809514.html
// Fight Image: https://pngtree.com/freepng/boxing-gloves-vector-red-and-blue-boxing-gloves-that-are-fighting-isolate-on-white-background_5295441.html
// Tileset: https://gamefromscratch.com/defold-engine-tutorial-series-tilemaps/
// Ninja Spritesheet: https://www.freepik.com/premium-vector/black-ninja-game-sprites_1582425.htm
// Background Image: https://de.dreamstime.com/berg-forest-video-game-background-image105360475
// Random Image: https://www.svgrepo.com/svg/391659/random
// VS Image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dvs%2Blogo&psig=AOvVaw0qNTeqExfIsPsa9TyLB34Z&ust=1713801745452000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCJv5PX04UDFQAAAAAdAAAAABAE

// Credits to https://www.w3schools.com/js/js_cookies.asp for helping with cookie code









// Socket now imported from standalone module to prevent circular deps
function cdbg() {
  /* logging disabled for production */
}
cdbg();

// Path to get assets
var staticPath = "/assets";

// Variables to store all of the session storage values
var gameId = window.location.pathname.split("/").filter(Boolean).pop();
var partyId = sessionStorage.getItem("party");
var username = getCookie("name");
var character = sessionStorage.getItem("character");
var spawnPlatform = sessionStorage.getItem("spawnPlatform");
var spawn = sessionStorage.getItem("spawn");
var partyMembers = sessionStorage.getItem("partyMembers");
var partyMembersNum = Number(partyMembers);
var map = sessionStorage.getItem("map");

// Map variale
var mapObjects;

// Lists that store all the players in player team and op team
var opponentPlayers = [];
var teamPlayers = [];
var gameEnded = false; // stops update loop network emissions after game over

// Movement throttling variables
var lastMovementSent = 0;
var movementThrottleMs = 25; // Send movement updates every 100ms (about 10 FPS)
var lastPlayerState = {
  x: 0,
  y: 0,
  flip: false,
  animation: null
};

// Server snapshot interpolation
var stateActive = false; // set true once we start receiving server snapshots
var stateBuffer = []; // queue of { t, players: { [username]: {x,y,flip,animation} } }
var MAX_STATE_BUFFER = 60; // ~4 seconds at 15 Hz
var interpDelayMs = 100; // render ~80-120ms in the past (default 100ms)

// No remote projectile registry (deterministic simulation on each client)

// Phaser class to setup the game
var GameScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);
  function GameScene() {
    _classCallCheck(this, GameScene);
    return _callSuper(this, GameScene, arguments);
  }
  _createClass(GameScene, [{
    key: "preload",
    value:
    // Preloads assets
    function preload() {
      cdbg();
      this.load.image("background", "".concat(staticPath, "/background.png"));
      this.load.image("mangrove-background", "".concat(staticPath, "/mangroveBackground.jpg"));
      this.load.atlas("sprite", "".concat(staticPath, "/Ninja_Spritesheet.png"), "".concat(staticPath, "/animations.json"));
      this.load.atlas("troll", "".concat(staticPath, "/troll_spritesheet.png"), "".concat(staticPath, "/troll.json"));
      this.load.image("tiles-image", "".concat(staticPath, "/map.png"));
      this.load.tilemapTiledJSON("tiles", "".concat(staticPath, "/tilesheet.json"));
      this.load.image("base", "".concat(staticPath, "/base.png"));
      this.load.image("platform", "".concat(staticPath, "/largePlatform.png"));
      this.load.image("side-platform", "".concat(staticPath, "/sidePlatform.png"));
      this.load.image("medium-platform", "".concat(staticPath, "/mediumPlatform.png"));
      this.load.image("tiny-platform", "".concat(staticPath, "/tinyPlatform.png"));
      this.load.image("base-left", "".concat(staticPath, "/baseLeft.png"));
      this.load.image("base-middle", "".concat(staticPath, "/baseMiddle.png"));
      this.load.image("base-right", "".concat(staticPath, "/baseRight.png"));
      this.load.image("base-top", "".concat(staticPath, "/baseTop.png"));
      this.load.image("shuriken", "".concat(staticPath, "/shuriken.png"));
      this.load.audio("shurikenThrow", "".concat(staticPath, "/shurikenThrow.mp3"));
      this.load.audio("shurikenHit", "".concat(staticPath, "/hit.mp3"));
      this.load.audio("shurikenHitWood", "".concat(staticPath, "/woodhit.wav"));
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      cdbg();
      // Creates the map objects
      if (map === "1") {
        mapObjects = _Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.lushyPeaksObjects;
        (0,_Maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.lushyPeaks)(this);
        cdbg();
      } else if (map === "2") {
        mapObjects = _Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_1__.mangroveMeadowObjects;
        (0,_Maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_1__.mangroveMeadow)(this);
        cdbg();
      }

      // Creates player object
      (0,_player__WEBPACK_IMPORTED_MODULE_2__.createPlayer)(this, username, character, spawnPlatform, spawn, partyMembers, map, opponentPlayers);
      cdbg();
      // Adds collision between map and player

      mapObjects.forEach(function (mapObject) {
        // Add collider between the object and each map object
        _this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_2__.player, mapObject);
      });
      cdbg();

      // Makes the fight element zoom in at the start of the game
      document.getElementById("fight").style.width = "60%";

      // Sets the values for Your Team and Opposing Team text
      document.getElementById("your-team").textContent = "Your Team: ".concat(partyMembers, "/").concat(partyMembers, " players");
      document.getElementById("opposing-team").textContent = "Opposing Team: ".concat(partyMembers, "/").concat(partyMembers, " players");

      // Emits player-joined and creates the op player objects
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].emit("player-joined", {
        username: username,
        character: character
      });
      cdbg();
      fetch("/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameId: gameId,
          username: username
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        cdbg();
        for (var key in data.userTeam) {
          // User team
          if (key !== username) {
            // Ensures player is not added again
            var userPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_5__["default"](_this, data.userTeam[key]["character"], key, "user", data.userTeam[key]["spawnPlatform"], data.userTeam[key]["spawn"], partyMembers, map);
            teamPlayers[key] = userPlayer; // Adds player object to the list
            // Initialize with current position if available
            if (data.userTeam[key]["x"] !== undefined && data.userTeam[key]["y"] !== undefined) {
              userPlayer.opponent.x = data.userTeam[key]["x"];
              userPlayer.opponent.y = data.userTeam[key]["y"];
            }
            cdbg("opPlayer created (user team)", {
              key: key
            });
          }
        }
        for (var _key in data.opTeam) {
          if (_key !== username) {
            var opponentPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_5__["default"](_this, data.opTeam[_key]["character"], _key, "op", data.opTeam[_key]["spawnPlatform"], data.opTeam[_key]["spawn"], partyMembers, map);
            opponentPlayers[_key] = opponentPlayer;
            // Initialize with current position if available
            if (data.opTeam[_key]["x"] !== undefined && data.opTeam[_key]["y"] !== undefined) {
              opponentPlayer.opponent.x = data.opTeam[_key]["x"];
              opponentPlayer.opponent.y = data.opTeam[_key]["y"];
            }
            cdbg("opPlayer created (op team)", {
              key: _key
            });
          }
        }
      })["catch"](function (error) {
        console.error("Error:", error);
        cdbg();
      });

      // After 1 second the fight image is removed
      setTimeout(function () {
        var fight = document.getElementById("fight");
        fight.style.opacity = "0";
        fight.addEventListener("transitionend", function (event) {
          fight.remove();
        });
      }, 1000);

      // Prewarm small dust pool
      (0,_effects__WEBPACK_IMPORTED_MODULE_6__.prewarmDust)(this, 8);

      // Code that runs when another player moves (legacy fallback). Disabled when stateActive.
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("move", function (data) {
        cdbg();
        if (stateActive) return; // prefer authoritative interpolation
        var opponentPlayer = opponentPlayers[data.username] || teamPlayers[data.username];
        // Finds player from the list
        if (opponentPlayer) {
          // Store the previous position for smooth tweening
          var prevX = opponentPlayer.opponent.x;
          var prevY = opponentPlayer.opponent.y;

          // Calculate distance to determine if we should tween or teleport
          var deltaX = Math.abs(data.x - prevX);
          var deltaY = Math.abs(data.y - prevY);
          var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          // If the distance is too large (player teleported, respawned, etc.), don't tween
          var maxTweenDistance = 300;
          if (distance > maxTweenDistance) {
            // Teleport immediately for large distances
            opponentPlayer.opponent.x = data.x;
            opponentPlayer.opponent.y = data.y;
          } else {
            // Stop any existing movement tween
            if (opponentPlayer.movementTween) {
              opponentPlayer.movementTween.remove();
            }

            // Create smooth movement tween with overlap protection
            var tweenDuration = Math.min(150, distance * 0.8); // Scale duration with distance, max 150ms

            opponentPlayer.movementTween = _this.tweens.add({
              targets: opponentPlayer.opponent,
              x: data.x,
              y: data.y,
              duration: tweenDuration,
              ease: "Power2.easeOut",
              // Smoother easing function
              onUpdate: function onUpdate() {
                // Update name tag position during tween
                opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10);
              },
              onComplete: function onComplete() {
                opponentPlayer.movementTween = null;
              }
            });
          }

          // Update flip and animation immediately (these don't need tweening)
          opponentPlayer.opponent.flipX = data.flip;
          opponentPlayer.opponent.anims.play(data.animation, true);

          // Update name tag position
          opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10);

          // Remote running dust (approximate: if moved horizontally enough)
          if (deltaX > 3) {
            opponentPlayer._dustTimer = (opponentPlayer._dustTimer || 0) + 16; // approximate frame delta
            if (opponentPlayer._dustTimer >= 70) {
              opponentPlayer._dustTimer = 0;
              var dY = opponentPlayer.opponent.y + opponentPlayer.opponent.height * 0.45;
              (0,_effects__WEBPACK_IMPORTED_MODULE_6__.spawnDust)(_this, opponentPlayer.opponent.x, dY);
            }
          }
        }
      });

      // Authoritative server snapshots (throttled from server)
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("state", function (payload) {
        if (payload.gameId !== gameId) return;
        stateActive = true;
        stateBuffer.push(payload);
        // keep buffer bounded
        if (stateBuffer.length > MAX_STATE_BUFFER) stateBuffer.shift();
      });

      // When another player attacks, this catches it
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("attack", function (data) {
        cdbg();
        if (data.returning) {
          var ownerWrapper = opponentPlayers[data.name] || teamPlayers[data.name];
          var ownerSprite = ownerWrapper ? ownerWrapper.opponent : null;
          // Instantiate deterministic returning shuriken (non-owner)
          var shuriken = new _ReturningShuriken__WEBPACK_IMPORTED_MODULE_3__["default"](_this, {
            x: data.x,
            y: data.y
          }, ownerSprite, {
            direction: data.direction,
            forwardDistance: data.forwardDistance || 500,
            outwardDuration: data.outwardDuration || 380,
            returnSpeed: data.returnSpeed || 900,
            rotationSpeed: data.rotationSpeed || 2000,
            scale: data.scale || 0.1,
            damage: data.damage,
            isOwner: false
          });
          // Remote collision optional: omitted for simplicity (authoritative hits by owner only)
          return;
        }
        // Basic non-returning projectile fallback (if ever used)
        var proj = _this.physics.add.image(data.x, data.y, data.weapon);
        proj.setScale(data.scale || 0.1);
        proj.setVelocity((data.direction || 1) * 400, 0);
        proj.setAngularVelocity(data.rotationSpeed || 600);
        proj.body.allowGravity = false;
      });

      // Removed projectile-update/destroy listeners (no network syncing)

      // When another player dies
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("death", function (data) {
        cdbg();
        if (data.username === username) {
          // Self death already handled via health-update listener in player.js
          return;
        }
        var opponentPlayer = opponentPlayers[data.username] || teamPlayers[data.username];
        if (!opponentPlayer) return; // Safety guard

        // Stop any active movement tween for the dying player
        if (opponentPlayer.movementTween) {
          opponentPlayer.movementTween.remove();
          opponentPlayer.movementTween = null;
        }
        if (data.username in opponentPlayers) {
          document.getElementById("your-team").textContent = "Your Team: ".concat(partyMembersNum - 1, "/").concat(partyMembers, " players");
        } else {
          document.getElementById("opposing-team").textContent = "Opposing Team: ".concat(partyMembersNum - 1, "/").concat(partyMembers, " players");
        }

        // Dying animation
        opponentPlayer.opponent.anims.play("dying", true);
        opponentPlayer.opponent.alpha = 0.5;
        // Use local sprite position (server may send 0 if not persisted yet)
        opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, opponentPlayer.opPlayerName.y + 30);
        opponentPlayer.opCurrentHealth = 0; // enforce zero
        opponentPlayer.updateHealthBar(true); // internally computes Y

        // Deletes the sprite from the game
        if (opponentPlayers[data.username]) {
          delete opponentPlayers[data.username];
        } else if (teamPlayers[data.username]) {
          delete teamPlayers[data.username];
        }
      });

      // When everyone is dead
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("game-over", function (data) {
        cdbg();
        if (gameId === data.gameId) {
          gameEnded = true; // stop emitting further moves
          var gameOver = document.getElementById("game-over");
          if (data.losers.includes(username)) {
            gameOver.textContent = "You Lose";
            gameOver.style.color = "#c81212";
          } else {
            gameOver.textContent = "You Win";
            gameOver.style.color = "#18c321";
          }

          // Sets end screen name to player name
          document.getElementById("username-text").textContent = username;
          document.getElementById("character-text").textContent = character;
          setTimeout(function () {
            // Runs after 1 second of death
            // Disables movement
            _this.input.enabled = false;
            document.getElementById("container").style.display = "flex";
            document.getElementById("dark-overlay").style.display = "block";
            document.getElementById("dark-overlay").style.backgroundColor = "rgba(0, 0, 0, 0.363)";
          }, 1000);
        }
      });
    }

    // Update function is a built in function that runs as much as possible. It is controlled by the phaser scene
  }, {
    key: "update",
    value: function update() {
      if (gameEnded) return; // halt loop work after game over
      cdbg();
      if (!_player__WEBPACK_IMPORTED_MODULE_2__.dead) {
        var _player$anims$current;
        (0,_player__WEBPACK_IMPORTED_MODULE_2__.handlePlayerMovement)(this); // Handles movement

        // Throttle movement updates to reduce network traffic and improve smoothness
        var now = Date.now();
        var currentState = {
          x: Math.round(_player__WEBPACK_IMPORTED_MODULE_2__.player.x),
          y: Math.round(_player__WEBPACK_IMPORTED_MODULE_2__.player.y),
          flip: _player__WEBPACK_IMPORTED_MODULE_2__.player.flipX,
          animation: ((_player$anims$current = _player__WEBPACK_IMPORTED_MODULE_2__.player.anims.currentAnim) === null || _player$anims$current === void 0 ? void 0 : _player$anims$current.key) || "idle"
        };

        // Only send movement update if enough time has passed AND something meaningful changed
        var positionChanged = Math.abs(currentState.x - lastPlayerState.x) > 1 || Math.abs(currentState.y - lastPlayerState.y) > 1;
        var stateChanged = positionChanged || currentState.flip !== lastPlayerState.flip || currentState.animation !== lastPlayerState.animation;
        if (stateChanged && now - lastMovementSent >= movementThrottleMs) {
          _socket__WEBPACK_IMPORTED_MODULE_4__["default"].emit("move", {
            x: currentState.x,
            y: currentState.y,
            flip: currentState.flip,
            animation: currentState.animation,
            username: username
          });
          lastMovementSent = now;
          lastPlayerState = _objectSpread({}, currentState);
          cdbg();
        }
      }

      // Interpolate remote entities ~100ms in the past for smoothness
      if (stateActive && stateBuffer.length >= 1) {
        var newest = stateBuffer[stateBuffer.length - 1];
        var targetT = newest.t - interpDelayMs;

        // Find two snapshots surrounding targetT
        var older = null;
        var newer = null;
        for (var i = stateBuffer.length - 1; i >= 0; i--) {
          var s = stateBuffer[i];
          if (s.t <= targetT) {
            older = s;
            newer = stateBuffer[i + 1] || s;
            break;
          }
        }
        if (!older) {
          older = stateBuffer[0];
          newer = stateBuffer[1] || older;
        }
        var t0 = older.t;
        var t1 = Math.max(newer.t, t0 + 1);
        var alpha = Phaser.Math.Clamp((targetT - t0) / (t1 - t0), 0, 1);
        var lerp = function lerp(a, b, t) {
          return a + (b - a) * t;
        };
        var applyInterp = function applyInterp(wrapper, name) {
          var _bState$x, _bState$y, _bState$x2, _bState$y2;
          if (!wrapper) return;
          var spr = wrapper.opponent;
          // cancel any legacy tween to avoid fighting interpolation
          if (wrapper.movementTween) {
            wrapper.movementTween.remove();
            wrapper.movementTween = null;
          }
          var s0 = older.players[name];
          var s1 = newer.players[name] || s0;
          if (!s0 && !s1) return;
          var aState = s0 || s1;
          var bState = s1 || s0;
          if (!aState) return;
          // Ignore obviously bogus states
          if (Number.isNaN(aState.x) || Number.isNaN(aState.y)) return;
          var ix = lerp(aState.x, (_bState$x = bState === null || bState === void 0 ? void 0 : bState.x) !== null && _bState$x !== void 0 ? _bState$x : aState.x, alpha);
          var iy = lerp(aState.y, (_bState$y = bState === null || bState === void 0 ? void 0 : bState.y) !== null && _bState$y !== void 0 ? _bState$y : aState.y, alpha);

          // If huge teleport between frames, snap to destination
          var dist = Math.hypot(((_bState$x2 = bState === null || bState === void 0 ? void 0 : bState.x) !== null && _bState$x2 !== void 0 ? _bState$x2 : aState.x) - aState.x, ((_bState$y2 = bState === null || bState === void 0 ? void 0 : bState.y) !== null && _bState$y2 !== void 0 ? _bState$y2 : aState.y) - aState.y);
          if (dist > 260) {
            var _bState$x3, _bState$y3;
            spr.x = (_bState$x3 = bState === null || bState === void 0 ? void 0 : bState.x) !== null && _bState$x3 !== void 0 ? _bState$x3 : aState.x;
            spr.y = (_bState$y3 = bState === null || bState === void 0 ? void 0 : bState.y) !== null && _bState$y3 !== void 0 ? _bState$y3 : aState.y;
          } else {
            spr.x = ix;
            spr.y = iy;
          }

          // Orientation/animation: take from newer if present
          var animSrc = bState && bState.animation ? bState : aState;
          spr.flipX = !!animSrc.flip;
          if (animSrc.animation) {
            spr.anims.play(animSrc.animation, true);
          }

          // Name tag
          wrapper.opPlayerName.setPosition(spr.x, spr.y - spr.height + 10);
        };
        for (var name in opponentPlayers) applyInterp(opponentPlayers[name], name);
        for (var _name in teamPlayers) applyInterp(teamPlayers[_name], _name);
      }
      // Updates health bars
      for (var _player in opponentPlayers) {
        var opponentPlayer = opponentPlayers[_player];
        opponentPlayer.updateHealthBar();
      }
      for (var _player2 in teamPlayers) {
        var _opponentPlayer = teamPlayers[_player2];
        _opponentPlayer.updateHealthBar();
      }

      // No remote projectile interpolation required
    }
  }]);
  return GameScene;
}(Phaser.Scene);
var config = {
  type: Phaser.AUTO,
  antialias: true,
  resolution: window.devicePixelRatio,
  scale: {
    // Makes sure the game looks good on all screens
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: "1300px",
    height: "600px"
  },
  scene: GameScene,
  physics: {
    "default": "arcade",
    arcade: {
      gravity: {
        y: 750
      },
      debug: false
    }
  }
};
var game = new Phaser.Game(config);

// Gets cookie value
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return "";
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxLQUFLLENBQUMsRUFBRTtNQUM5QixPQUFPb1gsTUFBTSxDQUFDRyxTQUFTLENBQUN2WCxJQUFJLENBQUNvQixNQUFNLENBQUM7SUFDdEM7RUFDRjtFQUNBLE9BQU8sRUFBRTtBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9BbmltYXRpb25zL25pbmphLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvTWFwcy9sdXNoeVBlYWtzLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvTWFwcy9tYW5ncm92ZU1lYWRvdy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL1JldHVybmluZ1NodXJpa2VuLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvZWZmZWN0cy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL29wUGxheWVyLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvc29ja2V0LmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2dhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIG5pbmphQW5pbWF0aW9ucyhzY2VuZSkge1xuICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICAgIGtleTogXCJydW5uaW5nXCIsIC8vIE5hbWUgb2YgYW5pbWF0aW9uXG4gICAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlXCIsIHtcbiAgICAgICAgICBwcmVmaXg6IFwicnVubmluZ1wiLCAvLyBOYW1lIGluc2lkZSBvZiBqc29uIGZpbGVcbiAgICAgICAgICBlbmQ6IDUsIC8vIExlbmd0aCBvZiBhbmltYXRpb24gaW4gZnJhbWVzIChTaW5jZSB0aGUgbnVtYmVycyBzdGFydCBhdCAwLCB0aGUgZW5kIGlzIGFsd2F5cyAxIG1vcmUuIFNvIDUgKyAxID0gNiBmcmFtZXMpXG4gICAgICAgICAgemVyb1BhZDogMiwgLy8gTnVtYmVyIG9mIHplcm9zIGluIGpzb24gZmlsZVxuICAgICAgICB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAyMCwgLy8gTnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kXG4gICAgICAgIHJlcGVhdDogMCwgLy8gTnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCAoMCBtZWFucyBub25lKSAoLTEgbWVhbnMgaW5maW5pdGUgdGltZXMpXG4gICAgICB9KTtcbiAgICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICAgIGtleTogXCJpZGxlXCIsXG4gICAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlXCIsIHtcbiAgICAgICAgICBwcmVmaXg6IFwiaWRsZVwiLFxuICAgICAgICAgIGVuZDogNCxcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxuICAgICAgICB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAzLFxuICAgICAgICByZXBlYXQ6IC0xLFxuICAgICAgfSk7XG4gICAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xuICAgICAgICBrZXk6IFwianVtcGluZ1wiLFxuICAgICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZVwiLCB7XG4gICAgICAgICAgcHJlZml4OiBcImp1bXBpbmdcIixcbiAgICAgICAgICBlbmQ6IDcsXG4gICAgICAgICAgemVyb1BhZDogMixcbiAgICAgICAgfSksXG4gICAgICAgIGZyYW1lUmF0ZTogMjAsXG4gICAgICAgIHJlcGVhdDogMCxcbiAgICAgIH0pO1xuICAgIFxuICAgICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcbiAgICAgICAga2V5OiBcInNsaWRpbmdcIixcbiAgICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGVcIiwge1xuICAgICAgICAgIHByZWZpeDogXCJ3YWxsXCIsXG4gICAgICAgICAgZW5kOiAwLFxuICAgICAgICAgIHplcm9QYWQ6IDIsXG4gICAgICAgIH0pLFxuICAgICAgICBmcmFtZVJhdGU6IDIwLFxuICAgICAgICByZXBlYXQ6IDIsXG4gICAgICB9KTtcbiAgICBcbiAgICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICAgIGtleTogXCJmYWxsaW5nXCIsXG4gICAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlXCIsIHtcbiAgICAgICAgICBwcmVmaXg6IFwiZmFsbGluZ1wiLFxuICAgICAgICAgIGVuZDogMixcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxuICAgICAgICB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAyMCxcbiAgICAgICAgcmVwZWF0OiAwLFxuICAgICAgfSk7XG4gICAgXG4gICAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xuICAgICAgICBrZXk6IFwidGhyb3dcIixcbiAgICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGVcIiwge1xuICAgICAgICAgIHByZWZpeDogXCJ0aHJvd1wiLFxuICAgICAgICAgIGVuZDogMyxcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxuICAgICAgICB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAxNSxcbiAgICAgICAgcmVwZWF0OiAwLFxuICAgICAgfSk7XG4gICAgXG4gICAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xuICAgICAgICBrZXk6IFwiZHlpbmdcIixcbiAgICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGVcIiwge1xuICAgICAgICAgIHByZWZpeDogXCJkeWluZ1wiLFxuICAgICAgICAgIGVuZDogMyxcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxuICAgICAgICB9KSxcbiAgICAgICAgZnJhbWVSYXRlOiAxMCxcbiAgICAgICAgcmVwZWF0OiAwLFxuICAgICAgfSk7XG59IiwiLy8gbWFwLmpzXG5cbi8vIEdsb2JhbHNcbmxldCBiYXNlO1xubGV0IHBsYXRmb3JtO1xubGV0IGxlZnRQbGF0Zm9ybTtcbmxldCByaWdodFBsYXRmb3JtO1xuXG5jb25zdCBsdXNoeVBlYWtzT2JqZWN0cyA9IFtdXG5cbmV4cG9ydCBmdW5jdGlvbiBsdXNoeVBlYWtzKHNjZW5lKSB7XG4gIC8vIENhbnZhcyB2YXJpYWJsZXNcbiAgY29uc3QgY2FudmFzV2lkdGggPSBzY2VuZS5nYW1lLmNvbmZpZy53aWR0aDtcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xuICBjb25zdCBjZW50ZXJYID0gc2NlbmUuY2FtZXJhcy5tYWluLndpZHRoIC8gMjtcblxuICAvLyBTZXR1cCBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gIGNvbnN0IGJhY2tncm91bmQgPSBzY2VuZS5hZGQuc3ByaXRlKDAsIC0xODAsIFwiYmFja2dyb3VuZFwiKTtcbiAgLy8gU2V0IGJhY2tncm91bmQgdG8gdGhlIHNpemUgb2YgdGhlIGNhbnZhc1xuICBiYWNrZ3JvdW5kLmRpc3BsYXlXaWR0aCA9IHNjZW5lLnN5cy5jYW52YXMud2lkdGg7XG4gIGJhY2tncm91bmQuZGlzcGxheUhlaWdodCA9IHNjZW5lLnN5cy5jYW52YXMuaGVpZ2h0ICsgNTAwOyAvLyBhZGQgNTAwIHRvIHByZXZlbnQgZGlzdG9ydGlvblxuICBiYWNrZ3JvdW5kLnNldE9yaWdpbigwLCAwKTtcblxuICAvLyBCYXNlXG4gIGJhc2UgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCwgNTUwLCBcImJhc2VcIik7XG4gIGJhc2UuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XG4gIGJhc2Uuc2V0SW1tb3ZhYmxlKHRydWUpOyAvLyBNYWtlcyBzdXJlIGl0IGRvZXNuJ3QgbW92ZVxuICBiYXNlLnNldFNjYWxlKDAuNyk7IC8vIE1ha2VzIGl0IHNtYWxsZXJcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChiYXNlKVxuXG4gIC8vIFBsYXRmb3JtXG4gIHBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDI1MCwgXCJwbGF0Zm9ybVwiKTtcbiAgcGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcbiAgcGxhdGZvcm0uYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcbiAgcGxhdGZvcm0uc2V0SW1tb3ZhYmxlKHRydWUpO1xuICBsdXNoeVBlYWtzT2JqZWN0cy5wdXNoKHBsYXRmb3JtKVxuXG4gIC8vIExlZnQgUGxhdGZvcm1cbiAgbGVmdFBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggLSA1MDAsIDI2MCwgXCJzaWRlLXBsYXRmb3JtXCIpO1xuICBsZWZ0UGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcbiAgbGVmdFBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gIGxlZnRQbGF0Zm9ybS5zZXRJbW1vdmFibGUodHJ1ZSk7XG4gIGx1c2h5UGVha3NPYmplY3RzLnB1c2gobGVmdFBsYXRmb3JtKVxuXG4gIC8vIFJpZ2h0IFBsYXRmb3JtXG4gIHJpZ2h0UGxhdGZvcm0gPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCArIDUwMCwgMjYwLCBcInNpZGUtcGxhdGZvcm1cIik7XG4gIHJpZ2h0UGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcbiAgcmlnaHRQbGF0Zm9ybS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICByaWdodFBsYXRmb3JtLnNldEltbW92YWJsZSh0cnVlKTtcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChyaWdodFBsYXRmb3JtKVxufVxuXG5cbmV4cG9ydCB7IGx1c2h5UGVha3NPYmplY3RzLCBiYXNlLCBwbGF0Zm9ybSB9O1xuIiwiLy8gbWFwLmpzXG5cbi8vIEdsb2JhbHNcbmxldCBiYXNlTWlkZGxlO1xubGV0IGJhc2VUb3A7XG5sZXQgYmFzZUxlZnQ7XG5sZXQgYmFzZVJpZ2h0O1xubGV0IHRpbnlQbGF0Zm9ybTE7XG5sZXQgdGlueVBsYXRmb3JtMjtcbmxldCB0aW55UGxhdGZvcm0zO1xubGV0IHRpbnlQbGF0Zm9ybTQ7XG5sZXQgdGlueVBsYXRmb3JtNTtcbmxldCB0aW55UGxhdGZvcm02O1xuXG5jb25zdCBtYW5ncm92ZU1lYWRvd09iamVjdHMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hbmdyb3ZlTWVhZG93KHNjZW5lKSB7XG4gIC8vIENhbnZhcyB2YXJpYWJsZXNcbiAgY29uc3QgY2FudmFzV2lkdGggPSBzY2VuZS5nYW1lLmNvbmZpZy53aWR0aDtcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xuICBjb25zdCBjZW50ZXJYID0gc2NlbmUuY2FtZXJhcy5tYWluLndpZHRoIC8gMjtcblxuICAvLyBTZXR1cCBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gIGNvbnN0IGJhY2tncm91bmQgPSBzY2VuZS5hZGQuc3ByaXRlKDAsIC0xODAsIFwibWFuZ3JvdmUtYmFja2dyb3VuZFwiKTtcbiAgLy8gU2V0IGJhY2tncm91bmQgdG8gdGhlIHNpemUgb2YgdGhlIGNhbnZhc1xuICBiYWNrZ3JvdW5kLmRpc3BsYXlXaWR0aCA9IHNjZW5lLnN5cy5jYW52YXMud2lkdGg7XG4gIGJhY2tncm91bmQuZGlzcGxheUhlaWdodCA9IHNjZW5lLnN5cy5jYW52YXMuaGVpZ2h0ICsgNTAwOyAvLyBhZGQgNTAwIHRvIHByZXZlbnQgZGlzdG9ydGlvblxuICBiYWNrZ3JvdW5kLnNldE9yaWdpbigwLCAwKTtcblxuICAvLyBCYXNlIE1pZGRsZVxuICBiYXNlTWlkZGxlID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDYwMCwgXCJiYXNlLW1pZGRsZVwiKTtcbiAgYmFzZU1pZGRsZS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcbiAgYmFzZU1pZGRsZS5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXG4gIGJhc2VNaWRkbGUuc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaChiYXNlTWlkZGxlKTtcblxuICAvLyBCYXNlIFRvcFxuICBiYXNlVG9wID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDQwOCwgXCJiYXNlLXRvcFwiKTtcbiAgYmFzZVRvcC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcbiAgYmFzZVRvcC5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXG4gIGJhc2VUb3Auc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaChiYXNlVG9wKTtcblxuICAvLyBCYXNlIExlZnRcbiAgYmFzZUxlZnQgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDQyMiwgNjM4LCBcImJhc2UtbGVmdFwiKTtcbiAgYmFzZUxlZnQuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XG4gIGJhc2VMZWZ0LnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcbiAgYmFzZUxlZnQuc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaChiYXNlTGVmdCk7XG5cbiAgLy8gQmFzZSBSaWdodFxuICBiYXNlUmlnaHQgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCArIDQyMiwgNjM4LCBcImJhc2UtcmlnaHRcIik7XG4gIGJhc2VSaWdodC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcbiAgYmFzZVJpZ2h0LnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcbiAgYmFzZVJpZ2h0LnNldFNjYWxlKDAuNik7IC8vIE1ha2VzIGl0IHNtYWxsZXJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2goYmFzZVJpZ2h0KTtcblxuICAvLyBQbGF0Zm9ybVxuICB0aW55UGxhdGZvcm0xID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggLSAyODAsIDMyNSwgXCJ0aW55LXBsYXRmb3JtXCIpO1xuICB0aW55UGxhdGZvcm0xLnNldFNjYWxlKDAuNik7XG4gIHRpbnlQbGF0Zm9ybTEuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcbiAgdGlueVBsYXRmb3JtMS5zZXRJbW1vdmFibGUodHJ1ZSk7XG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTEpO1xuXG4gIC8vIFBsYXRmb3JtIDJcbiAgdGlueVBsYXRmb3JtMiA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYICsgMjgwLCAzMjUsIFwidGlueS1wbGF0Zm9ybVwiKTtcbiAgdGlueVBsYXRmb3JtMi5zZXRTY2FsZSgwLjYpO1xuICB0aW55UGxhdGZvcm0yLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gIHRpbnlQbGF0Zm9ybTIuc2V0SW1tb3ZhYmxlKHRydWUpO1xuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaCh0aW55UGxhdGZvcm0yKTtcblxuICAvLyBQbGF0Zm9ybSAzXG4gIHRpbnlQbGF0Zm9ybTMgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDQzMCwgMjAwLCBcInRpbnktcGxhdGZvcm1cIik7XG4gIHRpbnlQbGF0Zm9ybTMuc2V0U2NhbGUoMC42KTtcbiAgdGlueVBsYXRmb3JtMy5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICB0aW55UGxhdGZvcm0zLnNldEltbW92YWJsZSh0cnVlKTtcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtMyk7XG5cbiAgLy8gUGxhdGZvcm0gNFxuICB0aW55UGxhdGZvcm00ID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyA0MzAsIDIwMCwgXCJ0aW55LXBsYXRmb3JtXCIpO1xuICB0aW55UGxhdGZvcm00LnNldFNjYWxlKDAuNik7XG4gIHRpbnlQbGF0Zm9ybTQuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcbiAgdGlueVBsYXRmb3JtNC5zZXRJbW1vdmFibGUodHJ1ZSk7XG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTQpO1xuXG4gIC8vIFBsYXRmb3JtIDVcbiAgdGlueVBsYXRmb3JtNSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gMTMwLCAxNTAsIFwidGlueS1wbGF0Zm9ybVwiKTtcbiAgdGlueVBsYXRmb3JtNS5zZXRTY2FsZSgwLjYpO1xuICB0aW55UGxhdGZvcm01LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gIHRpbnlQbGF0Zm9ybTUuc2V0SW1tb3ZhYmxlKHRydWUpO1xuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaCh0aW55UGxhdGZvcm01KTtcblxuICAvLyBQbGF0Zm9ybSA2XG4gIHRpbnlQbGF0Zm9ybTYgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCArIDEzMCwgMTUwLCBcInRpbnktcGxhdGZvcm1cIik7XG4gIHRpbnlQbGF0Zm9ybTYuc2V0U2NhbGUoMC42KTtcbiAgdGlueVBsYXRmb3JtNi5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICB0aW55UGxhdGZvcm02LnNldEltbW92YWJsZSh0cnVlKTtcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtNik7XG59XG5cbmV4cG9ydCB7IG1hbmdyb3ZlTWVhZG93T2JqZWN0cywgdGlueVBsYXRmb3JtMSwgdGlueVBsYXRmb3JtMiwgdGlueVBsYXRmb3JtMywgdGlueVBsYXRmb3JtNCwgdGlueVBsYXRmb3JtNSwgdGlueVBsYXRmb3JtNiB9O1xuIiwiLy8gUmV0dXJuaW5nU2h1cmlrZW4uanNcbi8vIEN1cnZlZCwgcmV0dXJuaW5nLCBwaWVyY2luZyBzaHVyaWtlbiB3aXRoIGRldGVybWluaXN0aWMgbG9jYWwgc2ltdWxhdGlvbi5cblxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXRcIjsgLy8gb3duZXItb25seSBoaXQgZXZlbnRzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJldHVybmluZ1NodXJpa2VuIGV4dGVuZHMgUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkltYWdlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7UGhhc2VyLlNjZW5lfSBzY2VuZVxuICAgKiBAcGFyYW0ge3t4Om51bWJlcix5Om51bWJlcn19IHN0YXJ0UG9zXG4gICAqIEBwYXJhbSB7UGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZX0gb3duZXJTcHJpdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3Ioc2NlbmUsIHN0YXJ0UG9zLCBvd25lclNwcml0ZSwgY29uZmlnKSB7XG4gICAgc3VwZXIoc2NlbmUsIHN0YXJ0UG9zLngsIHN0YXJ0UG9zLnksIFwic2h1cmlrZW5cIik7XG4gICAgdGhpcy5vd25lclNwcml0ZSA9IG93bmVyU3ByaXRlO1xuICAgIHRoaXMuY2ZnID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgZGlyZWN0aW9uOiAxLFxuICAgICAgICBmb3J3YXJkRGlzdGFuY2U6IDUyMCxcbiAgICAgICAgb3V0d2FyZER1cmF0aW9uOiA2MDAsIC8vIG1zXG4gICAgICAgIHJldHVyblNwZWVkOiA1ODAsIC8vIHB4L3MgKGNhcClcbiAgICAgICAgcm90YXRpb25TcGVlZDogOTUwLCAvLyBkZWcvc1xuICAgICAgICBzY2FsZTogMC4xLFxuICAgICAgICBkYW1hZ2U6IDEwMDAsXG4gICAgICAgIHVzZXJuYW1lOiBcIlwiLFxuICAgICAgICBnYW1lSWQ6IFwiXCIsXG4gICAgICAgIGlzT3duZXI6IGZhbHNlLFxuICAgICAgICBtYXhMaWZldGltZTogNzAwMCxcbiAgICAgICAgaGl0Q29vbGRvd246IDE1MCxcbiAgICAgIH0sXG4gICAgICBjb25maWcgfHwge31cbiAgICApO1xuXG4gICAgLy8gUGhhc2Ugc3RhdGVcbiAgICB0aGlzLnBoYXNlID0gXCJvdXR3YXJkXCI7IC8vIG91dHdhcmQgLT4gaG92ZXIgLT4gcmV0dXJuXG4gICAgdGhpcy5lbGFwc2VkID0gMDsgLy8gbXMgaW4gY3VycmVudCBwaGFzZVxuICAgIHRoaXMudG90YWxFbGFwc2VkID0gMDsgLy8gbXMgdG90YWwgbGlmZVxuICAgIHRoaXMuaG92ZXJEdXJhdGlvbiA9IDEwMDsgLy8gbXMgdG8gaG92ZXIgYmVmb3JlIHJldHVybmluZ1xuICAgIHRoaXMucmV0dXJuQWNjZWxlcmF0aW9uID0gODAwOyAvLyBweC9zXjJcbiAgICB0aGlzLmN1cnJlbnRSZXR1cm5TcGVlZCA9IHRoaXMuY2ZnLnJldHVyblNwZWVkICogMC4wODsgLy8gcmFtcCB1cFxuICAgIHRoaXMuaGl0VGltZXN0YW1wcyA9IHt9OyAvLyB1c2VybmFtZSAtPiBsYXN0IGhpdCBtc1xuXG4gICAgLy8gVHJhaWwgc3RhdGVcbiAgICB0aGlzLnRyYWlsSW50ZXJ2YWwgPSAzMDsgLy8gbXNcbiAgICB0aGlzLnRyYWlsQWNjdW0gPSAwO1xuICAgIHRoaXMudHJhaWxzID0gW107XG4gICAgdGhpcy5tYXhUcmFpbHMgPSA0MDtcblxuICAgIC8vIEFkZCB0byBzY2VuZSAvIHBoeXNpY3NcbiAgICBzY2VuZS5hZGQuZXhpc3RpbmcodGhpcyk7XG4gICAgc2NlbmUucGh5c2ljcy5hZGQuZXhpc3RpbmcodGhpcyk7XG4gICAgdGhpcy5zZXRTY2FsZSh0aGlzLmNmZy5zY2FsZSk7XG4gICAgdGhpcy5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xuICAgIHRoaXMuc2V0RGVwdGgoNSk7XG4gICAgdGhpcy5zZXRBbmd1bGFyVmVsb2NpdHkodGhpcy5jZmcucm90YXRpb25TcGVlZCAqIHRoaXMuY2ZnLmRpcmVjdGlvbik7XG5cbiAgICAvLyBQYXRoIGNvbnRyb2wgcG9pbnRzIChzbGlnaHQgZGlwIHRoZW4gYnVsZ2UpXG4gICAgdGhpcy5zdGFydFggPSBzdGFydFBvcy54O1xuICAgIHRoaXMuc3RhcnRZID0gc3RhcnRQb3MueTtcbiAgICB0aGlzLmVuZFggPSB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZTtcbiAgICB0aGlzLmVuZFkgPSB0aGlzLnN0YXJ0WTtcbiAgICBjb25zdCBkaXBEb3duID0gMjA7XG4gICAgY29uc3QgYnVsZ2VVcCA9IDQwO1xuICAgIHRoaXMuY3RybDFYID1cbiAgICAgIHRoaXMuc3RhcnRYICsgdGhpcy5jZmcuZGlyZWN0aW9uICogdGhpcy5jZmcuZm9yd2FyZERpc3RhbmNlICogMC4yNTtcbiAgICB0aGlzLmN0cmwxWSA9IHRoaXMuc3RhcnRZICsgZGlwRG93bjtcbiAgICB0aGlzLmN0cmwyWCA9XG4gICAgICB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZSAqIDAuNjtcbiAgICB0aGlzLmN0cmwyWSA9IHRoaXMuc3RhcnRZIC0gYnVsZ2VVcDtcblxuICAgIC8vIFVuaWZpZWQgc3VidGxlIGdsb3cgKGJsdWUgaWYgb3duZXIsIHJlZCBvdGhlcndpc2UpXG4gICAgY29uc3QgZ2xvd0NvbG9yID0gdGhpcy5jZmcuaXNPd25lciA/IDB4MmU5YmZmIDogMHhmZjNhMmU7XG4gICAgdGhpcy5nbG93ID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XG4gICAgdGhpcy5nbG93LnNldERlcHRoKHRoaXMuZGVwdGggLSAxKTtcbiAgICB0aGlzLmdsb3cuc2V0QmxlbmRNb2RlKFBoYXNlci5CbGVuZE1vZGVzLkFERCk7XG4gICAgdGhpcy5fZHJhd0dsb3coZ2xvd0NvbG9yKTtcbiAgICBzY2VuZS50d2VlbnMuYWRkKHtcbiAgICAgIHRhcmdldHM6IHRoaXMuZ2xvdyxcbiAgICAgIHNjYWxlOiB7IGZyb206IDAuOTUsIHRvOiAxLjE1IH0sXG4gICAgICBhbHBoYTogeyBmcm9tOiAwLjksIHRvOiAwLjU1IH0sXG4gICAgICBkdXJhdGlvbjogNjAwLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgICBlYXNlOiBcIlNpbmUuZWFzZUluT3V0XCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCB0aGlzLnVwZGF0ZVNodXJpa2VuLCB0aGlzKTtcbiAgfVxuXG4gIF9kcmF3R2xvdyhjb2xvckludCkge1xuICAgIGNvbnN0IGJhc2VSYWRpdXMgPSA4NSAqIHRoaXMuY2ZnLnNjYWxlO1xuICAgIGNvbnN0IGlubmVyUmFkaXVzID0gYmFzZVJhZGl1cyAqIDAuNDI7XG4gICAgY29uc3QgbWlkUmFkaXVzID0gYmFzZVJhZGl1cyAqIDAuOTtcbiAgICBjb25zdCBvdXRlclJhZGl1cyA9IGJhc2VSYWRpdXMgKiAxLjI7XG4gICAgY29uc3QgYyA9IFBoYXNlci5EaXNwbGF5LkNvbG9yLkludGVnZXJUb0NvbG9yKGNvbG9ySW50KTtcbiAgICB0aGlzLmdsb3cuY2xlYXIoKTtcbiAgICB0aGlzLmdsb3cueCA9IHRoaXMueDtcbiAgICB0aGlzLmdsb3cueSA9IHRoaXMueTtcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuNDIpO1xuICAgIHRoaXMuZ2xvdy5maWxsQ2lyY2xlKDAsIDAsIG91dGVyUmFkaXVzKTtcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuNzIpO1xuICAgIHRoaXMuZ2xvdy5maWxsQ2lyY2xlKDAsIDAsIG1pZFJhZGl1cyk7XG4gICAgdGhpcy5nbG93LmZpbGxTdHlsZShjLmNvbG9yLCAwLjk1KTtcbiAgICB0aGlzLmdsb3cuZmlsbENpcmNsZSgwLCAwLCBpbm5lclJhZGl1cyk7XG4gIH1cblxuICAvLyBDdWJpYyBCZXppZXIgaW50ZXJwb2xhdGlvbiBoZWxwZXJcbiAgY3ViaWModCwgcDAsIHAxLCBwMiwgcDMpIHtcbiAgICBjb25zdCBpdCA9IDEgLSB0O1xuICAgIHJldHVybiAoXG4gICAgICBpdCAqIGl0ICogaXQgKiBwMCArXG4gICAgICAzICogaXQgKiBpdCAqIHQgKiBwMSArXG4gICAgICAzICogaXQgKiB0ICogdCAqIHAyICtcbiAgICAgIHQgKiB0ICogdCAqIHAzXG4gICAgKTtcbiAgfVxuXG4gIHRyeURhbWFnZSh0YXJnZXRXcmFwcGVyKSB7XG4gICAgaWYgKCF0aGlzLmNmZy5pc093bmVyKSByZXR1cm47IC8vIG9ubHkgb3duZXIgcmVwb3J0cyBoaXRzXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0VXNlcm5hbWUgPVxuICAgICAgdGFyZ2V0V3JhcHBlci51c2VybmFtZSB8fFxuICAgICAgdGFyZ2V0V3JhcHBlci5fdXNlcm5hbWUgfHxcbiAgICAgIHRhcmdldFdyYXBwZXIubmFtZSB8fFxuICAgICAgXCJ1bmtub3duXCI7XG4gICAgY29uc3Qgbm93ID0gdGhpcy5zY2VuZS50aW1lLm5vdztcbiAgICBjb25zdCBsYXN0ID0gdGhpcy5oaXRUaW1lc3RhbXBzW3RhcmdldFVzZXJuYW1lXSB8fCAwO1xuICAgIGlmIChub3cgLSBsYXN0IDwgdGhpcy5jZmcuaGl0Q29vbGRvd24pIHJldHVybjtcbiAgICB0aGlzLmhpdFRpbWVzdGFtcHNbdGFyZ2V0VXNlcm5hbWVdID0gbm93O1xuICAgIHNvY2tldC5lbWl0KFwiaGl0XCIsIHtcbiAgICAgIGF0dGFja2VyOiB0aGlzLmNmZy51c2VybmFtZSxcbiAgICAgIHRhcmdldDogdGFyZ2V0VXNlcm5hbWUsXG4gICAgICBkYW1hZ2U6IHRoaXMuY2ZnLmRhbWFnZSxcbiAgICAgIGdhbWVJZDogdGhpcy5jZmcuZ2FtZUlkLFxuICAgIH0pO1xuICB9XG5cbiAgYXR0YWNoRW5lbXlPdmVybGFwKG9iamVjdHMpIHtcbiAgICBvYmplY3RzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgaWYgKCFvYmopIHJldHVybjtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IG9iai5vcHBvbmVudCB8fCBvYmo7XG4gICAgICB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLm92ZXJsYXAodGhpcywgc3ByaXRlLCAoKSA9PiB7XG4gICAgICAgIGlmIChvYmoub3Bwb25lbnQpIHRoaXMudHJ5RGFtYWdlKG9iaik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGF0dGFjaE1hcE92ZXJsYXAoKSB7XG4gICAgLy8gSW50ZW50aW9uYWxseSBibGFuayAocHJvamVjdGlsZSBpZ25vcmVzIG1hcCBub3cpXG4gIH1cblxuICBzcGF3blRyYWlsKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSh0aGlzLngsIHRoaXMueSwgXCJzaHVyaWtlblwiKTtcbiAgICBzLnNldFNjYWxlKHRoaXMuY2ZnLnNjYWxlICogMC40KTtcbiAgICBzLnNldERlcHRoKDQpO1xuICAgIHMuYWxwaGEgPSAwLjM1O1xuICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XG4gICAgICB0YXJnZXRzOiBzLFxuICAgICAgYWxwaGE6IDAsXG4gICAgICBzY2FsZTogeyBmcm9tOiBzLnNjYWxlLCB0bzogcy5zY2FsZSAqIDAuMTUgfSxcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBlYXNlOiBcIkN1YmljLmVhc2VPdXRcIixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHMuZGVzdHJveSgpLFxuICAgIH0pO1xuICAgIHRoaXMudHJhaWxzLnB1c2gocyk7XG4gICAgaWYgKHRoaXMudHJhaWxzLmxlbmd0aCA+IHRoaXMubWF4VHJhaWxzKSB7XG4gICAgICBjb25zdCBvbGQgPSB0aGlzLnRyYWlscy5zaGlmdCgpO1xuICAgICAgaWYgKG9sZCAmJiBvbGQuZGVzdHJveSkgb2xkLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95U2h1cmlrZW4oKSB7XG4gICAgaWYgKCF0aGlzLnNjZW5lKSByZXR1cm47XG4gICAgdGhpcy5zY2VuZS5ldmVudHMub2ZmKFwidXBkYXRlXCIsIHRoaXMudXBkYXRlU2h1cmlrZW4sIHRoaXMpO1xuICAgIHRoaXMudHJhaWxzLmZvckVhY2goKHQpID0+IHQgJiYgdC5kZXN0cm95ICYmIHQuZGVzdHJveSgpKTtcbiAgICB0aGlzLnRyYWlscy5sZW5ndGggPSAwO1xuICAgIGlmICh0aGlzLmdsb3cgJiYgdGhpcy5nbG93LmRlc3Ryb3kpIHRoaXMuZ2xvdy5kZXN0cm95KCk7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cblxuICB1cGRhdGVTaHVyaWtlbihfLCBkZWx0YSkge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHJldHVybjtcbiAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XG4gICAgdGhpcy50b3RhbEVsYXBzZWQgKz0gZGVsdGE7XG4gICAgdGhpcy50cmFpbEFjY3VtICs9IGRlbHRhO1xuICAgIGlmICh0aGlzLnRyYWlsQWNjdW0gPj0gdGhpcy50cmFpbEludGVydmFsKSB7XG4gICAgICB0aGlzLnNwYXduVHJhaWwoKTtcbiAgICAgIHRoaXMudHJhaWxBY2N1bSA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvdGFsRWxhcHNlZCA+IHRoaXMuY2ZnLm1heExpZmV0aW1lKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lTaHVyaWtlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBoYXNlID09PSBcIm91dHdhcmRcIikge1xuICAgICAgY29uc3QgcmF3VCA9IFBoYXNlci5NYXRoLkNsYW1wKFxuICAgICAgICB0aGlzLmVsYXBzZWQgLyB0aGlzLmNmZy5vdXR3YXJkRHVyYXRpb24sXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgICBjb25zdCB0ID0gKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogcmF3VCkpIC8gMjsgLy8gZWFzZSBpbi1vdXRcbiAgICAgIGNvbnN0IG54ID0gdGhpcy5jdWJpYyhcbiAgICAgICAgdCxcbiAgICAgICAgdGhpcy5zdGFydFgsXG4gICAgICAgIHRoaXMuY3RybDFYLFxuICAgICAgICB0aGlzLmN0cmwyWCxcbiAgICAgICAgdGhpcy5lbmRYXG4gICAgICApO1xuICAgICAgY29uc3QgbnkgPSB0aGlzLmN1YmljKFxuICAgICAgICB0LFxuICAgICAgICB0aGlzLnN0YXJ0WSxcbiAgICAgICAgdGhpcy5jdHJsMVksXG4gICAgICAgIHRoaXMuY3RybDJZLFxuICAgICAgICB0aGlzLmVuZFlcbiAgICAgICk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKG54LCBueSk7XG4gICAgICBpZiAocmF3VCA+PSAxKSB7XG4gICAgICAgIHRoaXMucGhhc2UgPSBcImhvdmVyXCI7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuc2V0QW5ndWxhclZlbG9jaXR5KFxuICAgICAgICAgIHRoaXMuY2ZnLnJvdGF0aW9uU3BlZWQgKiAwLjU1ICogdGhpcy5jZmcuZGlyZWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnBoYXNlID09PSBcImhvdmVyXCIpIHtcbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPj0gdGhpcy5ob3ZlckR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMucGhhc2UgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLnNldEFuZ3VsYXJWZWxvY2l0eShcbiAgICAgICAgICB0aGlzLmNmZy5yb3RhdGlvblNwZWVkICogMS4xNSAqIHRoaXMuY2ZnLmRpcmVjdGlvblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5waGFzZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgaWYgKCF0aGlzLm93bmVyU3ByaXRlIHx8ICF0aGlzLm93bmVyU3ByaXRlLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLnggKz1cbiAgICAgICAgICB0aGlzLmNmZy5kaXJlY3Rpb24gKiAodGhpcy5jdXJyZW50UmV0dXJuU3BlZWQgKiAoZGVsdGEgLyAxMDAwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkeCA9IHRoaXMub3duZXJTcHJpdGUueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLm93bmVyU3ByaXRlLnkgLSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpIHx8IDE7XG4gICAgICAgIHRoaXMuY3VycmVudFJldHVyblNwZWVkID0gTWF0aC5taW4oXG4gICAgICAgICAgdGhpcy5jZmcucmV0dXJuU3BlZWQsXG4gICAgICAgICAgdGhpcy5jdXJyZW50UmV0dXJuU3BlZWQgKyB0aGlzLnJldHVybkFjY2VsZXJhdGlvbiAqIChkZWx0YSAvIDEwMDApXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNwZCA9IHRoaXMuY3VycmVudFJldHVyblNwZWVkICogKGRlbHRhIC8gMTAwMCk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICAgICAgdGhpcy54ICsgKGR4IC8gZGlzdCkgKiBzcGQsXG4gICAgICAgICAgdGhpcy55ICsgKGR5IC8gZGlzdCkgKiBzcGRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRpc3QgPCAzMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuY2ZnLmlzT3duZXIgJiZcbiAgICAgICAgICAgIHRoaXMub25SZXR1cm4gJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm9uUmV0dXJuID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHRoaXMub25SZXR1cm4oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgLyogc2lsZW50ICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGVzdHJveVNodXJpa2VuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGdsb3cgcG9zaXRpb25cbiAgICBpZiAodGhpcy5nbG93KSB7XG4gICAgICB0aGlzLmdsb3cueCA9IHRoaXMueDtcbiAgICAgIHRoaXMuZ2xvdy55ID0gdGhpcy55O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gZWZmZWN0cy5qc1xuLy8gU2hhcmVkIGxpZ2h0d2VpZ2h0IFZGWCBoZWxwZXJzIChkdXN0IC8gc21va2UgcHVmZnMgZm9yIHJ1bm5pbmcpXG5cbmNvbnN0IGR1c3RQb29sID0gW107XG5jb25zdCBkdXN0UG9vbE1heCA9IDEyMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduRHVzdChzY2VuZSwgeCwgeSwgdGludCA9IDB4ODg4ODg4KSB7XG4gIGxldCBnID0gZHVzdFBvb2wuZmluZCgobykgPT4gIW8uYWN0aXZlKTtcbiAgaWYgKCFnKSB7XG4gICAgZyA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xuICAgIGR1c3RQb29sLnB1c2goZyk7XG4gIH1cbiAgZy5hY3RpdmUgPSB0cnVlO1xuICBnLmNsZWFyKCk7XG4gIGcuc2V0RGVwdGgoMSk7IC8vIGJlaGluZCBwbGF5ZXJzIChwbGF5ZXIgZGVwdGggYXNzdW1lZCA+MSBmb3IgbWFpbiBzcHJpdGUpXG4gIGNvbnN0IGJhc2VTaXplID0gUGhhc2VyLk1hdGguQmV0d2Vlbig2LCAxMCk7XG4gIGNvbnN0IGFscGhhU3RhcnQgPSBQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC4zNSwgMC41NSk7XG4gIGNvbnN0IHB1ZmZDb2xvciA9IFBoYXNlci5EaXNwbGF5LkNvbG9yLkludGVnZXJUb0NvbG9yKHRpbnQpO1xuICAvLyBPdXRlciBzb2Z0IHJpbmdcbiAgZy5maWxsU3R5bGUocHVmZkNvbG9yLmNvbG9yLCBhbHBoYVN0YXJ0ICogMC41KTtcbiAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplKTtcbiAgLy8gSW5uZXIgZGVuc2VyIGNvcmVcbiAgZy5maWxsU3R5bGUocHVmZkNvbG9yLmNvbG9yLCBhbHBoYVN0YXJ0KTtcbiAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplICogMC41NSk7XG4gIGcueCA9IHggKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC00LCA0KTtcbiAgZy55ID0geSArIFBoYXNlci5NYXRoLkJldHdlZW4oLTIsIDIpO1xuICBjb25zdCByaXNlID0gUGhhc2VyLk1hdGguQmV0d2VlbigxMCwgMjIpO1xuICBjb25zdCBkcmlmdFggPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0xMiwgMTIpO1xuICBjb25zdCBzY2FsZVRhcmdldCA9IFBoYXNlci5NYXRoLkZsb2F0QmV0d2VlbigxLjIsIDEuNik7XG4gIGNvbnN0IGR1cmF0aW9uID0gUGhhc2VyLk1hdGguQmV0d2VlbigzODAsIDUyMCk7XG4gIGcuc2NhbGUgPSAxO1xuICBnLmFscGhhID0gYWxwaGFTdGFydDtcbiAgc2NlbmUudHdlZW5zLmFkZCh7XG4gICAgdGFyZ2V0czogZyxcbiAgICB4OiBnLnggKyBkcmlmdFgsXG4gICAgeTogZy55IC0gcmlzZSxcbiAgICBhbHBoYTogMCxcbiAgICBzY2FsZTogc2NhbGVUYXJnZXQsXG4gICAgZHVyYXRpb24sXG4gICAgZWFzZTogXCJDdWJpYy5lYXNlT3V0XCIsXG4gICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgZy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIGcuYWxwaGEgPSAxO1xuICAgICAgZy5zY2FsZSA9IDE7XG4gICAgICBnLmNsZWFyKCk7XG4gICAgfSxcbiAgfSk7XG4gIGlmIChkdXN0UG9vbC5sZW5ndGggPiBkdXN0UG9vbE1heCkge1xuICAgIGNvbnN0IG9sZCA9IGR1c3RQb29sLmZpbmQoKG8pID0+ICFvLmFjdGl2ZSk7XG4gICAgaWYgKG9sZCkge1xuICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgIGNvbnN0IGlkeCA9IGR1c3RQb29sLmluZGV4T2Yob2xkKTtcbiAgICAgIGlmIChpZHggPj0gMCkgZHVzdFBvb2wuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV3YXJtRHVzdChzY2VuZSwgY291bnQgPSA2KSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIHNwYXduRHVzdChzY2VuZSwgLTk5OTksIC05OTk5KTtcbiAgfVxuICBkdXN0UG9vbC5mb3JFYWNoKChnKSA9PiB7XG4gICAgZy5hY3RpdmUgPSBmYWxzZTtcbiAgICBnLmNsZWFyKCk7XG4gIH0pO1xufVxuIiwiLy8gb3BwbGF5ZXIuanNcblxuaW1wb3J0IHsgYmFzZSwgcGxhdGZvcm0gfSBmcm9tIFwiLi9NYXBzL2x1c2h5UGVha3NcIjtcbmltcG9ydCB7IGNhbGN1bGF0ZVNwYXduLCBjYWxjdWxhdGVNYW5ncm92ZVNwYXduIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjZW5lLFxuICAgIGNoYXJhY3RlcixcbiAgICB1c2VybmFtZSxcbiAgICB0ZWFtLFxuICAgIHNwYXduUGxhdGZvcm0sXG4gICAgc3Bhd24sXG4gICAgcGxheWVyc0luVGVhbSxcbiAgICBtYXBcbiAgKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnRlYW0gPSB0ZWFtO1xuICAgIHRoaXMuc3Bhd25QbGF0Zm9ybSA9IHNwYXduUGxhdGZvcm07XG4gICAgdGhpcy5zcGF3biA9IHNwYXduO1xuICAgIHRoaXMubWFwID0gbWFwO1xuICAgIHRoaXMubWFwT2JqZWN0cztcbiAgICB0aGlzLnBsYXllcnNJblRlYW0gPSBwbGF5ZXJzSW5UZWFtO1xuICAgIHRoaXMub3BNYXhIZWFsdGggPSA4MDAwO1xuICAgIHRoaXMub3BDdXJyZW50SGVhbHRoID0gODAwMDtcbiAgICB0aGlzLm9wSGVhbHRoQmFyV2lkdGggPSA2MDtcbiAgICB0aGlzLm1vdmVtZW50VHdlZW4gPSBudWxsOyAvLyBTdG9yZSByZWZlcmVuY2UgdG8gY3VycmVudCBtb3ZlbWVudCB0d2VlblxuICAgIHRoaXMuY3JlYXRlT3BQbGF5ZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZU9wUGxheWVyKCkge1xuICAgIC8vIENyZWF0ZXMgdGhlIHNwcml0ZVxuICAgIHRoaXMub3Bwb25lbnQgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZSgtMTAwLCAtMTAwLCBcInNwcml0ZVwiKTtcbiAgICB0aGlzLm9wcG9uZW50LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gICAgdGhpcy5vcHBvbmVudC5hbmltcy5wbGF5KFwiaWRsZVwiLCB0cnVlKTtcblxuICAgIC8vIFNldHMgc3Bhd25zXG4gICAgaWYgKHRoaXMuc3Bhd25QbGF0Zm9ybSA9PT0gXCJib3R0b21cIikge1xuICAgICAgaWYgKHRoaXMubWFwID09PSBcIjFcIikge1xuICAgICAgICBjYWxjdWxhdGVTcGF3bihiYXNlLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXAgPT09IFwiMlwiKSB7XG4gICAgICAgIGNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24oXCJib3R0b21cIiwgdGhpcy5zcGF3biwgdGhpcy5vcHBvbmVudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNwYXduUGxhdGZvcm0gPT09IFwidG9wXCIpIHtcbiAgICAgIGlmICh0aGlzLm1hcCA9PT0gXCIxXCIpIHtcbiAgICAgICAgY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHRoaXMuc3Bhd24sIHRoaXMub3Bwb25lbnQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcCA9PT0gXCIyXCIpIHtcbiAgICAgICAgY2FsY3VsYXRlTWFuZ3JvdmVTcGF3bihcInRvcFwiLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGFuZ2VzIGZyYW1lIHNpemUgdG8gcHJldmVudCB3YWxsIGNsaXBwaW5nXG4gICAgdGhpcy5vcEZyYW1lID0gdGhpcy5vcHBvbmVudC5mcmFtZTtcbiAgICB0aGlzLm9wcG9uZW50LmJvZHkuc2V0U2l6ZShcbiAgICAgIHRoaXMub3BGcmFtZS53aWR0aCAtIDM1LFxuICAgICAgdGhpcy5vcEZyYW1lLndpZHRoIC0gMTBcbiAgICApO1xuICAgIHRoaXMub3Bwb25lbnQuYm9keS5zZXRPZmZzZXQodGhpcy5vcHBvbmVudC5ib2R5LndpZHRoIC8gMiwgMTApO1xuXG4gICAgLy8gU2V0cyB0aGUgdGV4dCBvZiB0aGUgbmFtZSB0byB1c2VybmFtZVxuICAgIHRoaXMub3BQbGF5ZXJOYW1lID0gdGhpcy5zY2VuZS5hZGQudGV4dChcbiAgICAgIHRoaXMub3Bwb25lbnQueCxcbiAgICAgIHRoaXMub3Bwb25lbnQueSAtIHRoaXMub3Bwb25lbnQuaGVpZ2h0ICsgMTAsXG4gICAgICB0aGlzLnVzZXJuYW1lXG4gICAgKTtcbiAgICB0aGlzLm9wUGxheWVyTmFtZS5zZXRTdHlsZSh7XG4gICAgICBmb250OiBcImJvbGQgOHB0IEFyaWFsXCIsXG4gICAgICBmaWxsOiBcIiMwMDAwMDBcIixcbiAgICB9KTtcbiAgICB0aGlzLm9wUGxheWVyTmFtZS5zZXRPcmlnaW4oMC41LCAwKTtcblxuICAgIHRoaXMub3BIZWFsdGhUZXh0ID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCAwLCBcIlwiLCB7XG4gICAgICBmb250RmFtaWx5OiBcIkFyaWFsXCIsXG4gICAgICBmb250U2l6ZTogXCIxMHB4XCIsXG4gICAgICBjb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICBzdHJva2U6IFwiIzAwMDAwMFwiLFxuICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA0LFxuICAgIH0pO1xuXG4gICAgdGhpcy5vcEhlYWx0aEJhciA9IHRoaXMuc2NlbmUuYWRkLmdyYXBoaWNzKCk7XG5cbiAgICAvLyBJbml0aWFsbHkgdXBkYXRlcyBoZWFsdGggYmFyXG4gICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoKTtcblxuICAgIC8vIExpc3RlbiBmb3IgaGVhbHRoIHVwZGF0ZXMgZm9yIHRoaXMgb3Bwb25lbnRcbiAgICBzb2NrZXQub24oXCJoZWFsdGgtdXBkYXRlXCIsIChkYXRhKSA9PiB7XG4gICAgICAvLyBkYXRhOiB7IHVzZXJuYW1lLCBoZWFsdGgsIGdhbWVJZCB9XG4gICAgICBpZiAoZGF0YS51c2VybmFtZSA9PT0gdGhpcy51c2VybmFtZSkge1xuICAgICAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IGRhdGEuaGVhbHRoO1xuICAgICAgICBpZiAodGhpcy5vcEN1cnJlbnRIZWFsdGggPD0gMCkge1xuICAgICAgICAgIHRoaXMub3BDdXJyZW50SGVhbHRoID0gMDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcih0cnVlKTsgLy8gc2hvdyBkZWFkIHN0eWxpbmcgJiAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlSGVhbHRoQmFyKGRlYWQgPSBmYWxzZSwgaGVhbHRoQmFyWSA9IDApIHtcbiAgICBpZiAodGhpcy5vcEN1cnJlbnRIZWFsdGggPCAwKSB7XG4gICAgICAvLyBQcmV2ZW50cyBoZWFsdGggZnJvbSBnb2luZyBuZWdhdGl2ZVxuICAgICAgdGhpcy5vcEN1cnJlbnRIZWFsdGggPSAwO1xuICAgIH1cbiAgICAvLyBTZXRzIHBlcmNlbnRhZ2Ugb2YgaGVhbHRoXG4gICAgY29uc3QgaGVhbHRoUGVyY2VudGFnZSA9IHRoaXMub3BDdXJyZW50SGVhbHRoIC8gdGhpcy5vcE1heEhlYWx0aDtcbiAgICBjb25zdCBkaXNwbGF5ZWRXaWR0aCA9IHRoaXMub3BIZWFsdGhCYXJXaWR0aCAqIGhlYWx0aFBlcmNlbnRhZ2U7XG5cbiAgICAvLyBDbGVhcnMgcHJldmlvdXMgaGVhbHRoIGJhciBncmFwaGljc1xuICAgIHRoaXMub3BIZWFsdGhCYXIuY2xlYXIoKTtcblxuICAgIC8vIFNldHMgeCBpbiB0aGUgY2VudGVyXG4gICAgY29uc3QgaGVhbHRoQmFyWCA9IHRoaXMub3Bwb25lbnQueCAtIHRoaXMub3BIZWFsdGhCYXJXaWR0aCAvIDI7XG4gICAgLy8gSWYgcGxheWVyIGlzIGRlYWQsIHNldHMgdGhlIHkgdmFsdWUgbG93ZXJcbiAgICBpZiAoZGVhZCA9PT0gZmFsc2UpIHtcbiAgICAgIGhlYWx0aEJhclkgPSB0aGlzLm9wcG9uZW50LnkgLSAodGhpcy5vcHBvbmVudC5oZWlnaHQgLyAyICsgNCk7XG4gICAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRUZXh0KGAke3RoaXMub3BDdXJyZW50SGVhbHRofWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQb3NpdGlvbiBsb3dlciB3aGVuIGRlYWQgKHNhbWUgb2Zmc2V0IGxvZ2ljIGFzIGxvY2FsIHBsYXllcilcbiAgICAgIGhlYWx0aEJhclkgPSB0aGlzLm9wcG9uZW50LnkgLSAodGhpcy5vcHBvbmVudC5oZWlnaHQgLyAyIC0gMjQpO1xuICAgICAgdGhpcy5vcEhlYWx0aFRleHQuc2V0VGV4dChgMGApO1xuICAgIH1cbiAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweDU5NTk1OSk7XG4gICAgdGhpcy5vcEhlYWx0aEJhci5maWxsUmVjdChoZWFsdGhCYXJYLCBoZWFsdGhCYXJZLCB0aGlzLm9wSGVhbHRoQmFyV2lkdGgsIDkpO1xuXG4gICAgLy8gQ3JlYXRlcyBhIGJsYWNrIGJvcmRlciBhcm91bmQgaGVhbHRoYmFyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5saW5lU3R5bGUoMywgMHgwMDAwMDApO1xuICAgIHRoaXMub3BIZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoXG4gICAgICBoZWFsdGhCYXJYLFxuICAgICAgaGVhbHRoQmFyWSxcbiAgICAgIHRoaXMub3BIZWFsdGhCYXJXaWR0aCxcbiAgICAgIDksXG4gICAgICAzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnRlYW0gPT09IFwidXNlclwiKSB7XG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweDJlODhjYSk7IC8vIGJsdWUgY29sb3IgZm9yIHVzZXIgdGVhbVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweGJiNWMzOSk7IC8vIHJlZCBjb2xvciBmb3Igb3AgdGVhbVxuICAgIH1cbiAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxSb3VuZGVkUmVjdChcbiAgICAgIGhlYWx0aEJhclgsXG4gICAgICBoZWFsdGhCYXJZLFxuICAgICAgZGlzcGxheWVkV2lkdGgsXG4gICAgICA5LFxuICAgICAgM1xuICAgICk7XG5cbiAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRQb3NpdGlvbihcbiAgICAgIHRoaXMub3Bwb25lbnQueCAtIHRoaXMub3BIZWFsdGhUZXh0LndpZHRoIC8gMixcbiAgICAgIGhlYWx0aEJhclkgLSA4XG4gICAgKTtcbiAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXREZXB0aCgyKTtcbiAgfVxuXG4gIC8vIENsZWFuIHVwIG1ldGhvZCB0byBzdG9wIGFueSBhY3RpdmUgdHdlZW5zIGFuZCByZW1vdmUgc3ByaXRlc1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm1vdmVtZW50VHdlZW4pIHtcbiAgICAgIHRoaXMubW92ZW1lbnRUd2Vlbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMubW92ZW1lbnRUd2VlbiA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wcG9uZW50KSB7XG4gICAgICB0aGlzLm9wcG9uZW50LmRlc3Ryb3koKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3BQbGF5ZXJOYW1lKSB7XG4gICAgICB0aGlzLm9wUGxheWVyTmFtZS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wSGVhbHRoVGV4dCkge1xuICAgICAgdGhpcy5vcEhlYWx0aFRleHQuZGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcEhlYWx0aEJhcikge1xuICAgICAgdGhpcy5vcEhlYWx0aEJhci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBwbGF5ZXIuanNcbi8vIE5PVEU6IFJlZmFjdG9yZWQgdG8gcmVtb3ZlIGNpcmN1bGFyIGRlcGVuZGVuY3kgb24gZ2FtZS5qcy5cbi8vIHNvY2tldCBub3cgY29tZXMgZnJvbSBzdGFuZGFsb25lIHNvY2tldC5qcyBhbmQgb3Bwb25lbnRQbGF5ZXJzIGFyZSBwYXNzZWQgaW50byBjcmVhdGVQbGF5ZXIuXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xuZnVuY3Rpb24gcGRiZygpIHtcbiAgLyogbG9nZ2luZyBkaXNhYmxlZCAqL1xufVxuaW1wb3J0IHsgbHVzaHlQZWFrc09iamVjdHMsIGJhc2UsIHBsYXRmb3JtIH0gZnJvbSBcIi4vTWFwcy9sdXNoeVBlYWtzXCI7XG5pbXBvcnQge1xuICBtYW5ncm92ZU1lYWRvd09iamVjdHMsXG4gIHRpbnlQbGF0Zm9ybTEsXG4gIHRpbnlQbGF0Zm9ybTIsXG4gIHRpbnlQbGF0Zm9ybTMsXG4gIHRpbnlQbGF0Zm9ybTQsXG4gIHRpbnlQbGF0Zm9ybTUsXG4gIHRpbnlQbGF0Zm9ybTYsXG59IGZyb20gXCIuL01hcHMvbWFuZ3JvdmVNZWFkb3dcIjtcbmltcG9ydCB7IG5pbmphQW5pbWF0aW9ucyB9IGZyb20gXCIuL0FuaW1hdGlvbnMvbmluamFcIjtcbmltcG9ydCBSZXR1cm5pbmdTaHVyaWtlbiBmcm9tIFwiLi9SZXR1cm5pbmdTaHVyaWtlblwiO1xuaW1wb3J0IHsgc3Bhd25EdXN0IH0gZnJvbSBcIi4vZWZmZWN0c1wiO1xuLy8gR2xvYmFsc1xubGV0IHBsYXllcjtcbmxldCBjdXJzb3JzO1xubGV0IGNhbldhbGxKdW1wID0gdHJ1ZTtcbmxldCBpc01vdmluZyA9IGZhbHNlO1xubGV0IGlzSnVtcGluZyA9IGZhbHNlO1xubGV0IGlzQXR0YWNraW5nID0gZmFsc2U7XG5sZXQgY2FuQXR0YWNrID0gdHJ1ZTtcblxubGV0IGZyYW1lO1xuXG5sZXQgbWF4SGVhbHRoID0gODAwMDtcbmxldCBjdXJyZW50SGVhbHRoID0gODAwMDsgLy8gQ2xpZW50LXNpZGUgY29weSAoZGlzcGxheSBvbmx5KVxubGV0IGRlYWQgPSBmYWxzZTtcblxubGV0IGhlYWx0aEJhcldpZHRoID0gNjA7XG5sZXQgaGVhbHRoQmFyO1xubGV0IGhlYWx0aFRleHQ7XG4vLyBBbW1vL0Nvb2xkb3duIGJhciAoY2xpZW50LXNpZGUgb25seSlcbmxldCBhbW1vQmFyOyAvLyBncmFwaGljc1xubGV0IGFtbW9CYXJCYWNrOyAvLyBiYWNrZ3JvdW5kIGdyYXBoaWNzXG5sZXQgYW1tb0JhcldpZHRoID0gNjA7XG5sZXQgYW1tb0Nvb2xkb3duTXMgPSAxMjAwOyAvLyAyc1xubGV0IGFtbW9FbGFwc2VkID0gMDsgLy8gdGltZSBzaW5jZSBsYXN0IHNob3QgKG1zKVxubGV0IGFtbW9SZWFkeSA9IHRydWU7XG5sZXQgYW1tb1R3ZWVuOyAvLyBhY3RpdmUgdHdlZW4gcmVmZXJlbmNlIGZvciBzbW9vdGggZmlsbFxuXG5sZXQgcGxheWVyTmFtZTtcblxubGV0IGluZGljYXRvclRyaWFuZ2xlO1xuXG5sZXQgdXNlcm5hbWU7XG5sZXQgZ2FtZUlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbikucG9wKCk7XG5cbmxldCBzY2VuZTtcblxubGV0IHNwYXduO1xubGV0IHBsYXllcnNJblRlYW07XG5sZXQgc3Bhd25QbGF0Zm9ybTtcbmxldCBtYXBPYmplY3RzO1xubGV0IG1hcDtcbmxldCBvcHBvbmVudFBsYXllcnNSZWY7IC8vIGluamVjdGVkIGZyb20gZ2FtZS5qcyB0byBhdm9pZCBjaXJjdWxhciBpbXBvcnRcbmxldCBmaXJlVHJhaWxUaW1lciA9IDA7XG5sZXQgZmlyZVRyYWlsSW50ZXJ2YWwgPSA0NTsgLy8gbXNcbmNvbnN0IGZpcmVQb29sID0gW107XG5jb25zdCBmaXJlUG9vbE1heCA9IDYwO1xubGV0IGR1c3RUaW1lciA9IDA7XG5jb25zdCBkdXN0SW50ZXJ2YWwgPSA3MDsgLy8gbXMgYmV0d2VlbiBkdXN0IHB1ZmZzIHdoZW4gcnVubmluZ1xuZnVuY3Rpb24gc3Bhd25GaXJlRmxhbWUoc2NlbmUsIHgsIHkpIHtcbiAgLy8gUmV1c2Ugc21hbGwgZ3JhcGhpY3Mgb2JqZWN0cyBpbnN0ZWFkIG9mIGNyZWF0aW5nIHJlY3RhbmdsZXMgZWFjaCB0aW1lXG4gIGxldCBnID0gZmlyZVBvb2wuZmluZCgobykgPT4gIW8uYWN0aXZlKTtcbiAgaWYgKCFnKSB7XG4gICAgZyA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xuICAgIGcuYWN0aXZlID0gdHJ1ZTtcbiAgICBmaXJlUG9vbC5wdXNoKGcpO1xuICB9XG4gIGcuY2xlYXIoKTtcbiAgZy5hY3RpdmUgPSB0cnVlO1xuICBnLnNldERlcHRoKDApOyAvLyBiZWhpbmQgcGxheWVyIChwbGF5ZXIgZGVwdGggYXNzdW1lZCA+MClcbiAgY29uc3QgYmFzZVNpemUgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDUsIDkpO1xuICAvLyBEcmF3IG91dGVyIGdsb3cgKHJlZClcbiAgZy5maWxsU3R5bGUoMHhmZjNjMDAsIDAuMzUpO1xuICBnLmZpbGxDaXJjbGUoMCwgMCwgYmFzZVNpemUpO1xuICAvLyBNaWQgbGF5ZXIgKG9yYW5nZSlcbiAgZy5maWxsU3R5bGUoMHhmZjg4MDAsIDAuNTUpO1xuICBnLmZpbGxDaXJjbGUoMCwgMCwgYmFzZVNpemUgKiAwLjY1KTtcbiAgLy8gQ29yZSAoeWVsbG93L3doaXRlKVxuICBnLmZpbGxTdHlsZShcbiAgICBQaGFzZXIuRGlzcGxheS5Db2xvci5HZXRDb2xvcigyNTUsIFBoYXNlci5NYXRoLkJldHdlZW4oMjAwLCAyMzApLCA4MCksXG4gICAgMC45XG4gICk7XG4gIGcuZmlsbENpcmNsZSgwLCAwLCBiYXNlU2l6ZSAqIDAuMzUpO1xuICBnLnggPSB4ICsgUGhhc2VyLk1hdGguQmV0d2VlbigtMywgMyk7XG4gIGcueSA9IHkgKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0zLCAzKTtcbiAgY29uc3QgZHJpZnRYID0gUGhhc2VyLk1hdGguQmV0d2VlbigtMTIsIDEyKTtcbiAgY29uc3QgZHJpZnRZID0gUGhhc2VyLk1hdGguQmV0d2VlbigtMTgsIC00KTtcbiAgY29uc3Qgc2NhbGVUYXJnZXQgPSBQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC4xNSwgMC4zNSk7XG4gIGNvbnN0IGR1cmF0aW9uID0gUGhhc2VyLk1hdGguQmV0d2VlbigyNjAsIDQyMCk7XG4gIGcuc2NhbGUgPSAxO1xuICBzY2VuZS50d2VlbnMuYWRkKHtcbiAgICB0YXJnZXRzOiBnLFxuICAgIHg6IGcueCArIGRyaWZ0WCxcbiAgICB5OiBnLnkgKyBkcmlmdFksXG4gICAgc2NhbGU6IHNjYWxlVGFyZ2V0LFxuICAgIGFscGhhOiAwLFxuICAgIGR1cmF0aW9uLFxuICAgIGVhc2U6IFwiQ3ViaWMuZWFzZU91dFwiLFxuICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgIGcuYWN0aXZlID0gZmFsc2U7XG4gICAgICBnLmFscGhhID0gMTtcbiAgICAgIGcuc2NhbGUgPSAxO1xuICAgICAgZy5jbGVhcigpO1xuICAgIH0sXG4gIH0pO1xuICAvLyBDYXAgcG9vbCBzaXplXG4gIGlmIChmaXJlUG9vbC5sZW5ndGggPiBmaXJlUG9vbE1heCkge1xuICAgIGNvbnN0IG9sZCA9IGZpcmVQb29sLmZpbmQoKG8pID0+ICFvLmFjdGl2ZSk7XG4gICAgaWYgKG9sZCkge1xuICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgIGNvbnN0IGlkeCA9IGZpcmVQb29sLmluZGV4T2Yob2xkKTtcbiAgICAgIGlmIChpZHggPj0gMCkgZmlyZVBvb2wuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9XG59XG5cbi8vIENyZWF0ZSBwbGF5ZXIgZnVuY3Rpb25cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoXG4gIHNjZW5lUGFyYW0sXG4gIG5hbWUsXG4gIGNoYXJhY3RlcixcbiAgc3Bhd25QbGF0Zm9ybVBhcmFtLFxuICBzcGF3blBhcmFtLFxuICBwbGF5ZXJzSW5UZWFtUGFyYW0sXG4gIG1hcFBhcmFtLFxuICBvcHBvbmVudFBsYXllcnNQYXJhbVxuKSB7XG4gIHVzZXJuYW1lID0gbmFtZTtcbiAgc2NlbmUgPSBzY2VuZVBhcmFtO1xuICBzcGF3biA9IHNwYXduUGFyYW07XG4gIHBsYXllcnNJblRlYW0gPSBwbGF5ZXJzSW5UZWFtUGFyYW07XG4gIHNwYXduUGxhdGZvcm0gPSBzcGF3blBsYXRmb3JtUGFyYW07XG4gIG1hcCA9IG1hcFBhcmFtO1xuICBvcHBvbmVudFBsYXllcnNSZWYgPSBvcHBvbmVudFBsYXllcnNQYXJhbTtcbiAgcGRiZygpO1xuICBjdXJzb3JzID0gc2NlbmUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gIGlmIChjaGFyYWN0ZXIgPT09IFwiTmluamFcIikge1xuICAgIG5pbmphQW5pbWF0aW9ucyhzY2VuZSk7XG4gIH1cblxuICAvLyBDcmVhdGUgcGxheWVyIHNwcml0ZSEhXG4gIHBsYXllciA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZSgtMTAwLCAtMTAwLCBcInNwcml0ZVwiKTtcbiAgcGxheWVyLmFuaW1zLnBsYXkoXCJpZGxlXCIsIHRydWUpOyAvLyBQbGF5IGlkbGUgYW5pbWF0aW9uXG4gIHBkYmcoKTtcblxuICAvLyBMaXN0ZW5lciB0byBkZXRlY3QgaWYgcGxheWVyIGxlYXZlcyB0aGUgd29ybGQgYm91bmRzXG4gIHNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCAoKSA9PiB7XG4gICAgaWYgKHBsYXllci55ID4gc2NlbmUucGh5c2ljcy53b3JsZC5ib3VuZHMuYm90dG9tICsgNTApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBSZXF1ZXN0IGEgc3VpY2lkZSBpZiBwbGF5ZXIgZmFsbHMgb3V0ICh0cmVhdCBhcyBzZWxmLWhpdCB0byA5OTk5OSlcbiAgICAgICAgaWYgKCFkZWFkKSB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoXCJoaXRcIiwge1xuICAgICAgICAgICAgYXR0YWNrZXI6IHVzZXJuYW1lLFxuICAgICAgICAgICAgdGFyZ2V0OiB1c2VybmFtZSxcbiAgICAgICAgICAgIGRhbWFnZTogOTk5OTksXG4gICAgICAgICAgICBnYW1lSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGRiZygpO1xuICAgICAgICB9XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gTWFwXG4gIGlmIChtYXAgPT09IFwiMVwiKSB7XG4gICAgbWFwT2JqZWN0cyA9IGx1c2h5UGVha3NPYmplY3RzO1xuICB9IGVsc2UgaWYgKG1hcCA9PT0gXCIyXCIpIHtcbiAgICBtYXBPYmplY3RzID0gbWFuZ3JvdmVNZWFkb3dPYmplY3RzO1xuICB9XG5cbiAgLy8gU2V0cyBzcGF3biBiYXNlZCBvbiBzZXNzaW9uIHN0b3JhZ2UgZGF0YVxuICBpZiAoc3Bhd25QbGF0Zm9ybSA9PT0gXCJib3R0b21cIikge1xuICAgIGlmIChtYXAgPT09IFwiMVwiKSB7XG4gICAgICBjYWxjdWxhdGVTcGF3bihiYXNlLCBzcGF3biwgcGxheWVyKTtcbiAgICB9IGVsc2UgaWYgKG1hcCA9PT0gXCIyXCIpIHtcbiAgICAgIGNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24oXCJib3R0b21cIiwgc3Bhd24sIHBsYXllcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNwYXduUGxhdGZvcm0gPT09IFwidG9wXCIpIHtcbiAgICBpZiAobWFwID09PSBcIjFcIikge1xuICAgICAgY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHNwYXduLCBwbGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAobWFwID09PSBcIjJcIikge1xuICAgICAgY2FsY3VsYXRlTWFuZ3JvdmVTcGF3bihcInRvcFwiLCBzcGF3biwgcGxheWVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGFuZ2VzIHNpemUgb2YgcGxheWVyIGZyYW1lIHNvIGl0IGNhbid0IGNsaXAuIFRoZXJlIGFyZSBzb21lIGlzc3VlcyB3aGVyZSB0aGUgZnJhbWUgY2hhbmdlcyB0byBmaXQgdGhlIGFuaW1hdGlvbiBzaXplIHNvIHRoaXMgbXVzdCBiZSBkb25lIHRvIHByZXZlbnQgdGhhdC5cbiAgZnJhbWUgPSBwbGF5ZXIuZnJhbWU7XG4gIHBsYXllci5ib2R5LnNldFNpemUoZnJhbWUud2lkdGggLSAzNSwgZnJhbWUud2lkdGggLSAxMCk7XG4gIHBsYXllci5ib2R5LnNldE9mZnNldChwbGF5ZXIuYm9keS53aWR0aCAvIDIsIDEwKTtcblxuICAvLyBQbGF5ZXIgbmFtZSB0ZXh0XG4gIHBsYXllck5hbWUgPSBzY2VuZS5hZGQudGV4dChcbiAgICBwbGF5ZXIueCxcbiAgICBwbGF5ZXIueSAtIHBsYXllci5oZWlnaHQgKyAxMCxcbiAgICB1c2VybmFtZVxuICApO1xuICBwbGF5ZXJOYW1lLnNldFN0eWxlKHtcbiAgICBmb250OiBcImJvbGQgOHB0IEFyaWFsXCIsXG4gICAgZmlsbDogXCIjMDAwMDAwXCIsXG4gIH0pO1xuICBwbGF5ZXJOYW1lLnNldE9yaWdpbigwLjUsIDApO1xuXG4gIC8vIEhlYWx0aCB0ZXh0XG4gIGhlYWx0aFRleHQgPSBzY2VuZS5hZGQudGV4dCgwLCAwLCBcIlwiLCB7XG4gICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxuICAgIGZvbnRTaXplOiBcIjEwcHhcIixcbiAgICBjb2xvcjogXCIjRkZGRkZGXCIsIC8vIFdoaXRlXG4gICAgc3Ryb2tlOiBcIiMwMDAwMDBcIiwgLy8gQmxhY2tcbiAgICBzdHJva2VUaGlja25lc3M6IDQsXG4gIH0pO1xuXG4gIC8vIEhlYWx0aCBiYXJcbiAgaGVhbHRoQmFyID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XG4gIC8vIEFtbW8gYmFyIGJhY2tncm91bmQgJiBmaWxsIChyZW5kZXIgb3JkZXI6IGJhY2tncm91bmQsIGZpbGwpXG4gIGFtbW9CYXJCYWNrID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XG4gIGFtbW9CYXIgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcblxuICAvLyBUcmlhbmdsZSB0byBzaG93IHdoaWNoIG9uZSBpcyB0aGUgdXNlci4gRGlzc2FwZWFycyB3aGVuIHRoZSBwbGF5ZXIgbW92ZXNcbiAgaW5kaWNhdG9yVHJpYW5nbGUgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcblxuICBjb25zdCB0cmlhbmdsZSA9IG5ldyBQaGFzZXIuR2VvbS5UcmlhbmdsZShcbiAgICBwbGF5ZXIueCxcbiAgICBwbGF5ZXIueSAtIDYyLCAvLyBUb3AgcG9pbnRcbiAgICBwbGF5ZXIueCAtIDEzLFxuICAgIHBsYXllci55IC0gNzIsIC8vIExlZnQgcG9pbnRcbiAgICBwbGF5ZXIueCArIDEzLFxuICAgIHBsYXllci55IC0gNzIgLy8gUmlnaHQgcG9pbnRcbiAgKTtcbiAgaW5kaWNhdG9yVHJpYW5nbGUuZmlsbFN0eWxlKDB4OTlhYjJjKTsgLy8gR3JlZW4gY29sb3JcbiAgaW5kaWNhdG9yVHJpYW5nbGUuZmlsbFRyaWFuZ2xlU2hhcGUodHJpYW5nbGUpO1xuXG4gIC8vIFdoZW4gdGhlIHVzZXIgdGFwcywgaXQgc2hvb3RzXG4gIHNjZW5lLmlucHV0Lm9uKFwicG9pbnRlcmRvd25cIiwgZnVuY3Rpb24gKHBvaW50ZXIpIHtcbiAgICAvLyBJZiBhdHRhY2sgY29vbGRvd24gaXMgZmluaXNoZWRcbiAgICBpZiAoYW1tb1JlYWR5ICYmIGNhbkF0dGFjaykge1xuICAgICAgaXNBdHRhY2tpbmcgPSB0cnVlOyAvLyBTZXRzIHZhcmlhYmxlIGZvciBhbmltYXRpb25cbiAgICAgIGNhbkF0dGFjayA9IGZhbHNlOyAvLyBTZXRzIGF0dGFjayBjb29sZG93biB2YXJpYWJsZVxuXG4gICAgICAvLyBTdGFydCBjb29sZG93biAod2lsbCBpbnN0YW50bHkgcmVmaWxsIGlmIHByb2plY3RpbGUgcmV0dXJucyBlYXJseSlcbiAgICAgIGFtbW9SZWFkeSA9IGZhbHNlO1xuICAgICAgYW1tb0VsYXBzZWQgPSAwO1xuICAgICAgaWYgKGFtbW9Ud2Vlbikge1xuICAgICAgICBhbW1vVHdlZW4ucmVtb3ZlKCk7XG4gICAgICAgIGFtbW9Ud2VlbiA9IG51bGw7XG4gICAgICB9XG4gICAgICAvLyBUd2VlbiB0aGF0IHZpc3VhbGx5IGZpbGxzIGFtbW8gYmFyIG92ZXIgY29vbGRvd25cbiAgICAgIGNvbnN0IHR3ZWVuUHJveHkgPSB7IHQ6IDAgfTtcbiAgICAgIGFtbW9Ud2VlbiA9IHNjZW5lLnR3ZWVucy5hZGQoe1xuICAgICAgICB0YXJnZXRzOiB0d2VlblByb3h5LFxuICAgICAgICB0OiAxLFxuICAgICAgICBkdXJhdGlvbjogYW1tb0Nvb2xkb3duTXMsXG4gICAgICAgIGVhc2U6IFwiTGluZWFyXCIsXG4gICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XG4gICAgICAgICAgYW1tb0VsYXBzZWQgPSB0d2VlblByb3h5LnQgKiBhbW1vQ29vbGRvd25NcztcbiAgICAgICAgICBkcmF3QW1tb0JhcigpO1xuICAgICAgICB9LFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgYW1tb0VsYXBzZWQgPSBhbW1vQ29vbGRvd25NcztcbiAgICAgICAgICBhbW1vUmVhZHkgPSB0cnVlO1xuICAgICAgICAgIGNhbkF0dGFjayA9IHRydWU7IC8vIGF0dGFjayBrZXkgZ2F0aW5nXG4gICAgICAgICAgZHJhd0FtbW9CYXIoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaXNBdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gY2FuQXR0YWNrIGJlY29tZXMgdHJ1ZSBvbmx5IHdoZW4gY29vbGRvd24gY29tcGxldGVzIG9yIHByb2plY3RpbGUgcmV0dXJuc1xuICAgICAgfSwgMzAwKTsgLy8gQWZ0ZXIgMzAwIG1pbGlzZWNvbmRzLCB0aGUgdXNlciBjYW4gYXR0YWNrIGFnYWluXG5cbiAgICAgIC8vIFBsYXkgdGhlIHNvdW5kXG4gICAgICBsZXQgc2h1cmlrZW5Tb3VuZCA9IHNjZW5lLnNvdW5kLmFkZChcInNodXJpa2VuVGhyb3dcIik7XG4gICAgICBzaHVyaWtlblNvdW5kLnNldFZvbHVtZSgwLjEpO1xuXG4gICAgICBzaHVyaWtlblNvdW5kLnNldFJhdGUoMS4zKTsgLy8gQ2hhbmdlIHBpdGNoXG4gICAgICBzaHVyaWtlblNvdW5kLnBsYXkoKTtcblxuICAgICAgLy8gSWYgdGhlIHVzZXIgaGFzIG5pbmphIGNoYXJhY3RlciwgaXQgdGhyb3dzIGEgc2h1cmlrZW5cbiAgICAgIGlmIChjaGFyYWN0ZXIgPT09IFwiTmluamFcIikge1xuICAgICAgICBwbGF5ZXIuYW5pbXMucGxheShcInRocm93XCIsIHRydWUpOyAvLyBQbGF5IHRocm93aW5nIGFuaW1hdGlvblxuXG4gICAgICAgIC8vIE5ldyByZXR1cm5pbmcgc2h1cmlrZW4gcHJvamVjdGlsZVxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBwbGF5ZXIuZmxpcFggPyAtMSA6IDE7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgZ2FtZUlkLFxuICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgZGFtYWdlOiAxMDAwLFxuICAgICAgICAgIHJvdGF0aW9uU3BlZWQ6IDIwMDAsXG4gICAgICAgICAgZm9yd2FyZERpc3RhbmNlOiA1MDAsXG4gICAgICAgICAgYXJjSGVpZ2h0OiAxNjAsXG4gICAgICAgICAgb3V0d2FyZER1cmF0aW9uOiAzODAsXG4gICAgICAgICAgcmV0dXJuU3BlZWQ6IDkwMCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmV0dXJuaW5nID0gbmV3IFJldHVybmluZ1NodXJpa2VuKFxuICAgICAgICAgIHNjZW5lLFxuICAgICAgICAgIHsgeDogcGxheWVyLngsIHk6IHBsYXllci55IH0sXG4gICAgICAgICAgcGxheWVyLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApO1xuICAgICAgICAvLyBJbnN0YW50IGNvb2xkb3duIHJlZmlsbCBvbiByZXR1cm4gKGVhcmx5IHJldHJpZXZhbCBtZWNoYW5pYylcbiAgICAgICAgcmV0dXJuaW5nLm9uUmV0dXJuID0gKCkgPT4ge1xuICAgICAgICAgIC8vIFNraXAgaWYgYWxyZWFkeSByZWFkeVxuICAgICAgICAgIGlmIChhbW1vUmVhZHkpIHJldHVybjtcbiAgICAgICAgICBhbW1vRWxhcHNlZCA9IGFtbW9Db29sZG93bk1zO1xuICAgICAgICAgIGFtbW9SZWFkeSA9IHRydWU7XG4gICAgICAgICAgY2FuQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoYW1tb1R3ZWVuKSB7XG4gICAgICAgICAgICBhbW1vVHdlZW4ucmVtb3ZlKCk7XG4gICAgICAgICAgICBhbW1vVHdlZW4gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkcmF3QW1tb0JhcigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIE92ZXJsYXBzOiBlbmVtaWVzICYgbWFwIG9iamVjdHNcbiAgICAgICAgY29uc3QgZW5lbXlMaXN0ID0gW107XG4gICAgICAgIGlmIChvcHBvbmVudFBsYXllcnNSZWYpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHBsYXllcklkIGluIG9wcG9uZW50UGxheWVyc1JlZikge1xuICAgICAgICAgICAgZW5lbXlMaXN0LnB1c2gob3Bwb25lbnRQbGF5ZXJzUmVmW3BsYXllcklkXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybmluZy5hdHRhY2hFbmVteU92ZXJsYXAoZW5lbXlMaXN0KTtcbiAgICAgICAgLy8gTWFwIG9iamVjdHMgY2F1c2UgZGVzdHJveSBvbmx5IGR1cmluZyBvdXR3YXJkL2hvdmVyIChoYW5kbGVkIGludGVybmFsbHkpXG4gICAgICAgIHJldHVybmluZy5hdHRhY2hNYXBPdmVybGFwKG1hcE9iamVjdHMpO1xuXG4gICAgICAgIC8vIEVtaXQgZm9yIHJlbW90ZSBjbGllbnRzICh0aGV5IHdpbGwgc3Bhd24gYSB2aXN1YWwgY29weSBmb2xsb3dpbmcgY2xhc3NpYyBzdHJhaWdodCBsaW5lIGZhbGxiYWNrIGZvciBub3cpXG4gICAgICAgIHNvY2tldC5lbWl0KFwiYXR0YWNrXCIsIHtcbiAgICAgICAgICB4OiBwbGF5ZXIueCxcbiAgICAgICAgICB5OiBwbGF5ZXIueSxcbiAgICAgICAgICB3ZWFwb246IFwic2h1cmlrZW5cIixcbiAgICAgICAgICBzY2FsZTogY29uZmlnLnNjYWxlIHx8IDAuMSxcbiAgICAgICAgICBkYW1hZ2U6IGNvbmZpZy5kYW1hZ2UsXG4gICAgICAgICAgbmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcmV0dXJuaW5nOiB0cnVlLFxuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICAvLyBzZW5kIHRpbWluZyBwYXJhbXMgc28gcmVtb3RlIGNhbiBkZXRlcm1pbmlzdGljYWxseSBzaW11bGF0ZVxuICAgICAgICAgIGZvcndhcmREaXN0YW5jZTogY29uZmlnLmZvcndhcmREaXN0YW5jZSxcbiAgICAgICAgICBvdXR3YXJkRHVyYXRpb246IGNvbmZpZy5vdXR3YXJkRHVyYXRpb24sXG4gICAgICAgICAgcmV0dXJuU3BlZWQ6IGNvbmZpZy5yZXR1cm5TcGVlZCxcbiAgICAgICAgICByb3RhdGlvblNwZWVkOiBjb25maWcucm90YXRpb25TcGVlZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHBkYmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyBGdW5jdGlvbiB0byBzZXQgaGVhbHRoIG9mIHBsYXllciBmcm9tIGFub3RoZXIgZmlsZVxuZnVuY3Rpb24gc2V0Q3VycmVudEhlYWx0aChkYW1hZ2UpIHtcbiAgLy8gRGVwcmVjYXRlZDogc2VydmVyIGF1dGhvcml0YXRpdmUuIEtlcHQgZm9yIGNvbXBhdGliaWxpdHkgKG5vLW9wIGRpc3BsYXkgdXBkYXRlIG9ubHkpXG4gIGN1cnJlbnRIZWFsdGggLT0gZGFtYWdlO1xuICBpZiAoY3VycmVudEhlYWx0aCA8IDApIGN1cnJlbnRIZWFsdGggPSAwO1xuICB1cGRhdGVIZWFsdGhCYXIoKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUhlYWx0aEJhcigpIHtcbiAgaWYgKGN1cnJlbnRIZWFsdGggPD0gMCkgY3VycmVudEhlYWx0aCA9IDA7XG4gIGNvbnN0IGhlYWx0aFBlcmNlbnRhZ2UgPSBjdXJyZW50SGVhbHRoIC8gbWF4SGVhbHRoO1xuICBjb25zdCBkaXNwbGF5ZWRXaWR0aCA9IGhlYWx0aEJhcldpZHRoICogaGVhbHRoUGVyY2VudGFnZTtcbiAgcGRiZygpO1xuXG4gIGhlYWx0aEJhci5jbGVhcigpOyAvLyBDbGVhciB0aGUgZ3JhcGhpY3MgYmVmb3JlIHJlZHJhd2luZ1xuXG4gIGNvbnN0IGhlYWx0aEJhclggPSBwbGF5ZXIueCAtIGhlYWx0aEJhcldpZHRoIC8gMjtcbiAgbGV0IGhlYWx0aEJhclk7XG4gIGlmICghZGVhZCkge1xuICAgIGhlYWx0aEJhclkgPSBwbGF5ZXIueSAtIChwbGF5ZXIuaGVpZ2h0IC8gMiArIDgpOyAvLyBzaGlmdCB1cCBzbGlnaHRseSB0byBtYWtlIHNwYWNlIGZvciBhbW1vIGJhclxuICAgIGhlYWx0aFRleHQuc2V0VGV4dChgJHtjdXJyZW50SGVhbHRofWApO1xuICB9IGVsc2Uge1xuICAgIGhlYWx0aEJhclkgPSBwbGF5ZXIueSAtIChwbGF5ZXIuaGVpZ2h0IC8gMiAtIDI0KTtcbiAgICAvLyBTaG93IDAgaW5zdGVhZCBvZiBibGFuayB3aGVuIGRlYWRcbiAgICBoZWFsdGhUZXh0LnNldFRleHQoYDBgKTtcbiAgICBwbGF5ZXJOYW1lLnNldFBvc2l0aW9uKHBsYXllci54LCBwbGF5ZXJOYW1lLnkgKyAzMCk7XG4gIH1cblxuICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSB3aXRoIHRoZSBkZWZhdWx0IGZpbGwgY29sb3JcbiAgaGVhbHRoQmFyLmZpbGxTdHlsZSgweDU5NTk1OSk7XG4gIGhlYWx0aEJhci5maWxsUmVjdChoZWFsdGhCYXJYLCBoZWFsdGhCYXJZLCBoZWFsdGhCYXJXaWR0aCwgOSk7XG5cbiAgLy8gRHJhdyB0aGUgaGVhbHRoIGJhciBiYWNrZ3JvdW5kIChzdHJva2UpXG4gIGhlYWx0aEJhci5saW5lU3R5bGUoMywgMHgwMDAwMDApO1xuICBoZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgaGVhbHRoQmFyV2lkdGgsIDksIDMpO1xuXG4gIC8vIERyYXcgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoZSBoZWFsdGggYmFyIChncmVlbilcbiAgaGVhbHRoQmFyLmZpbGxTdHlsZSgweDk5YWIyYyk7XG4gIGhlYWx0aEJhci5maWxsUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgZGlzcGxheWVkV2lkdGgsIDksIDMpO1xuXG4gIGhlYWx0aFRleHQuc2V0UG9zaXRpb24ocGxheWVyLnggLSBoZWFsdGhUZXh0LndpZHRoIC8gMiwgaGVhbHRoQmFyWSAtIDgpO1xuICBoZWFsdGhUZXh0LnNldERlcHRoKDIpO1xuXG4gIC8vIERyYXcgYW1tbyBiYXIgdW5kZXJuZWF0aCBoZWFsdGggKG9ubHkgZm9yIGxvY2FsIHBsYXllciAmIHdoZW4gYWxpdmUpXG4gIGRyYXdBbW1vQmFyKGhlYWx0aEJhclgsIGhlYWx0aEJhclkgKyAxMSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdBbW1vQmFyKGZvcmNlZFgsIGZvcmNlZFkpIHtcbiAgaWYgKCFhbW1vQmFyIHx8ICFhbW1vQmFyQmFjaykgcmV0dXJuO1xuICBjb25zdCBwZXJjZW50ID0gUGhhc2VyLk1hdGguQ2xhbXAoYW1tb0VsYXBzZWQgLyBhbW1vQ29vbGRvd25NcywgMCwgMSk7XG4gIGNvbnN0IHggPSBmb3JjZWRYICE9PSB1bmRlZmluZWQgPyBmb3JjZWRYIDogcGxheWVyLnggLSBhbW1vQmFyV2lkdGggLyAyO1xuICBjb25zdCB5ID1cbiAgICBmb3JjZWRZICE9PSB1bmRlZmluZWQgPyBmb3JjZWRZIDogcGxheWVyLnkgLSAocGxheWVyLmhlaWdodCAvIDIgKyA4KSArIDExO1xuICBhbW1vQmFyQmFjay5jbGVhcigpO1xuICBhbW1vQmFyLmNsZWFyKCk7XG4gIC8vIEJhY2tncm91bmRcbiAgYW1tb0JhckJhY2suZmlsbFN0eWxlKDB4MjIyMjIyLCAwLjY1KTtcbiAgYW1tb0JhckJhY2suZmlsbFJvdW5kZWRSZWN0KHgsIHksIGFtbW9CYXJXaWR0aCwgNiwgMyk7XG4gIGFtbW9CYXJCYWNrLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMC45KTtcbiAgYW1tb0JhckJhY2suc3Ryb2tlUm91bmRlZFJlY3QoeCwgeSwgYW1tb0JhcldpZHRoLCA2LCAzKTtcbiAgLy8gRmlsbCBncmFkaWVudCBzaW11bGF0aW9uICh0d28gcGFzc2VzKVxuICAvLyBSZWQgY29sb3Igc2NoZW1lIChkYXJrZXIgd2hpbGUgY2hhcmdpbmcsIGJyaWdodCB3aGVuIHJlYWR5KVxuICBjb25zdCBjaGFyZ2luZ0NvbG9yID0gMHhiMzIxMjE7XG4gIGNvbnN0IHJlYWR5Q29sb3IgPSAweGZmNDA0MDtcbiAgLy8gU2ltcGxlIGludGVycG9sYXRlIGJldHdlZW4gZGFyay0+YnJpZ2h0IGJhc2VkIG9uIHBlcmNlbnRcbiAgY29uc3QgcjEgPSAoY2hhcmdpbmdDb2xvciA+PiAxNikgJiAweGZmO1xuICBjb25zdCBnMSA9IChjaGFyZ2luZ0NvbG9yID4+IDgpICYgMHhmZjtcbiAgY29uc3QgYjEgPSBjaGFyZ2luZ0NvbG9yICYgMHhmZjtcbiAgY29uc3QgcjIgPSAocmVhZHlDb2xvciA+PiAxNikgJiAweGZmO1xuICBjb25zdCBnMiA9IChyZWFkeUNvbG9yID4+IDgpICYgMHhmZjtcbiAgY29uc3QgYjIgPSByZWFkeUNvbG9yICYgMHhmZjtcbiAgY29uc3QgciA9IE1hdGgucm91bmQocjEgKyAocjIgLSByMSkgKiBwZXJjZW50KTtcbiAgY29uc3QgZyA9IE1hdGgucm91bmQoZzEgKyAoZzIgLSBnMSkgKiBwZXJjZW50KTtcbiAgY29uc3QgYiA9IE1hdGgucm91bmQoYjEgKyAoYjIgLSBiMSkgKiBwZXJjZW50KTtcbiAgY29uc3QgZmlsbENvbG9yID0gKHIgPDwgMTYpIHwgKGcgPDwgOCkgfCBiO1xuICBhbW1vQmFyLmZpbGxTdHlsZShmaWxsQ29sb3IsIDAuOTUpO1xuICBhbW1vQmFyLmZpbGxSb3VuZGVkUmVjdCh4LCB5LCBhbW1vQmFyV2lkdGggKiBwZXJjZW50LCA2LCAzKTtcbiAgLy8gU21hbGwgaGlnaGxpZ2h0IG92ZXJsYXkgZm9yIHBvbGlzaFxuICBhbW1vQmFyLmZpbGxTdHlsZSgweGZmZmZmZiwgMC4yNSAqIChwZXJjZW50IDwgMSA/IDEgOiAwLjYpKTtcbiAgYW1tb0Jhci5maWxsUm91bmRlZFJlY3QoeCwgeSwgYW1tb0JhcldpZHRoICogcGVyY2VudCwgMiwge1xuICAgIHRsOiAzLFxuICAgIHRyOiAzLFxuICAgIGJsOiAwLFxuICAgIGJyOiAwLFxuICB9KTtcbiAgYW1tb0Jhci5zZXREZXB0aCgyKTtcbiAgYW1tb0JhckJhY2suc2V0RGVwdGgoMSk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwYXduKHBsYXRmb3JtLCBzcGF3biwgcGxheWVyKSB7XG4gIGNvbnN0IGF2YWlsYWJsZVNwYWNlID0gcGxhdGZvcm0ud2lkdGggLyBwbGF5ZXJzSW5UZWFtOyAvLyBTcGFjZSBmb3IgZWFjaCBwbGF5ZXJcbiAgY29uc3QgbGVmdE1vc3QgPSBwbGF0Zm9ybS5nZXRCb3VuZHMoKS5sZWZ0OyAvLyBMZWZ0bW9zdCB4IGNvcmQgb2YgdGhlIHBsYXRmb3JtXG4gIGNvbnN0IHNwYXduWSA9IHBsYXRmb3JtLmdldFRvcENlbnRlcigpLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjsgLy8gR2V0cyB5IGNvcmRpbmF0ZSBmb3IgdGhlIHBsYXllciBieSBjYWxjdWxhdGluZyB0aGUgY2VudGVyIGFuZCBzdWJ0cmFjdGluZyBoYWxmIHRoZSBwbGF5ZXIgaGVpZ2h0LiBTaW5jZSB0aGUgcGxheWVyIHkgaXMgYXQgdGhlIGNlbnRlci5cblxuICBjb25zdCBzcGF3blggPSBsZWZ0TW9zdCArIChzcGF3biAqIGF2YWlsYWJsZVNwYWNlKSAvIDIgLSBwbGF5ZXIud2lkdGggKiAxLjMzMzsgLy8gQ2FsY3VsYXRlcyBzcGF3bnggYnkgY29tYmluaW5nIGFsbCB0aGUgcHJldmlvdXMgdmFyaWFibGVzLiAxLjMzMyBpcyBtdWx0aXBsaWVkIHRvIHBlcmZlY3QgdGhlIHBvc2l0aW9uIG9mIHRoZSBzcGF3biBvdGhlcndpc2UgaXQgaXMgb2Zmc2V0IHRvIHRoZSByaWdodC5cbiAgcGxheWVyLnggPSBzcGF3blg7XG4gIHBsYXllci55ID0gc3Bhd25ZO1xufVxuZnVuY3Rpb24gY2FsY3VsYXRlTWFuZ3JvdmVTcGF3bihwb3NpdGlvbiwgc3Bhd25QYXJhbSwgcGxheWVyKSB7XG4gIGxldCBwbGF0Zm9ybTtcbiAgbGV0IHNwYXduID0gU3RyaW5nKHNwYXduUGFyYW0pO1xuICBpZiAocG9zaXRpb24gPT09IFwidG9wXCIpIHtcbiAgICBpZiAoc3Bhd24gPT09IFwiMVwiKSB7XG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTE7XG4gICAgfSBlbHNlIGlmIChzcGF3biA9PT0gXCIyXCIpIHtcbiAgICAgIHBsYXRmb3JtID0gdGlueVBsYXRmb3JtMjtcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjNcIikge1xuICAgICAgcGxhdGZvcm0gPSB0aW55UGxhdGZvcm0zO1xuICAgIH1cbiAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gXCJib3R0b21cIikge1xuICAgIGlmIChzcGF3biA9PT0gXCIxXCIpIHtcbiAgICAgIHBsYXRmb3JtID0gdGlueVBsYXRmb3JtNDtcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjJcIikge1xuICAgICAgcGxhdGZvcm0gPSB0aW55UGxhdGZvcm01O1xuICAgIH0gZWxzZSBpZiAoc3Bhd24gPT09IFwiM1wiKSB7XG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTY7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYXZhaWxhYmxlU3BhY2UgPSBwbGF0Zm9ybS53aWR0aDtcbiAgY29uc3QgbGVmdE1vc3QgPSBwbGF0Zm9ybS5nZXRCb3VuZHMoKS5sZWZ0OyAvLyBMZWZ0bW9zdCB4IGNvcmQgb2YgdGhlIHBsYXRmb3JtXG4gIGNvbnN0IHNwYXduWSA9IHBsYXRmb3JtLmdldFRvcENlbnRlcigpLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjsgLy8gR2V0cyB5IGNvcmRpbmF0ZSBmb3IgdGhlIHBsYXllciBieSBjYWxjdWxhdGluZyB0aGUgY2VudGVyIGFuZCBzdWJ0cmFjdGluZyBoYWxmIHRoZSBwbGF5ZXIgaGVpZ2h0LiBTaW5jZSB0aGUgcGxheWVyIHkgaXMgYXQgdGhlIGNlbnRlci5cblxuICBjb25zdCBzcGF3blggPSBsZWZ0TW9zdCArIGF2YWlsYWJsZVNwYWNlIC8gMiAtIHBsYXllci53aWR0aDtcbiAgcGxheWVyLnggPSBzcGF3blg7XG4gIHBsYXllci55ID0gc3Bhd25ZO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlUGxheWVyTW92ZW1lbnQoc2NlbmUpIHtcbiAgY29uc3Qgc3BlZWQgPSAyNTA7XG4gIGNvbnN0IGp1bXBTcGVlZCA9IDQwMDtcblxuICAvLyBLZXlzLiBQbGF5ZXIgY2FuIHVzZSBlaXRoZXIgYXJyb3cga2V5cyBvciBXQVNEXG4gIGNvbnN0IGxlZnRLZXkgPVxuICAgIGN1cnNvcnMubGVmdC5pc0Rvd24gfHwgc2NlbmUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFwiQVwiKS5pc0Rvd247XG4gIGNvbnN0IHJpZ2h0S2V5ID1cbiAgICBjdXJzb3JzLnJpZ2h0LmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJEXCIpLmlzRG93bjtcbiAgY29uc3QgdXBLZXkgPSBjdXJzb3JzLnVwLmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJXXCIpLmlzRG93bjtcblxuICAvLyBMZWZ0IG1vdmVtZW50XG4gIGlmIChsZWZ0S2V5KSB7XG4gICAgaWYgKGluZGljYXRvclRyaWFuZ2xlKSB7XG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBtb3ZlZFxuICAgIH1cbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlYKC1zcGVlZCk7IC8vIFNldHMgdmVsb2NpdHkgdG8gbmVnYXRpdmUgc28gdGhhdCBpdCBtb3ZlcyBsZWZ0XG4gICAgcGxheWVyLmZsaXBYID0gdHJ1ZTsgLy8gTWlycm9ycyB0aGUgYm9keSBvZiB0aGUgcGxheWVyXG4gICAgaXNNb3ZpbmcgPSB0cnVlOyAvLyBTZXRzIHRoZSBpc01vdmluZyB0byB0cnVlXG4gICAgaWYgKHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWlzQXR0YWNraW5nICYmICFkZWFkKSB7XG4gICAgICAvLyBJZiB0aGUgcGxheWVyIGlzIG5vdCBpbiB0aGUgYWlyIG9yIGF0dGFja2luZyBvciBkZWFkLCBpdCBwbGF5cyB0aGUgcnVubmluZyBhbmltYXRpb25cbiAgICAgIHBsYXllci5hbmltcy5wbGF5KFwicnVubmluZ1wiLCB0cnVlKTtcbiAgICB9XG4gICAgLy8gUmlnaHQgbW92ZW1lbnRcbiAgfSBlbHNlIGlmIChyaWdodEtleSkge1xuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xuICAgICAgaW5kaWNhdG9yVHJpYW5nbGUuY2xlYXIoKTsgLy8gUmVtb3ZlcyBpbmRpY2F0b3IgdHJpYW5nbGUgaWYgdGhlIHBsYXllciBoYXMgbW92ZWRcbiAgICB9XG4gICAgcGxheWVyLmZsaXBYID0gZmFsc2U7IC8vIFVuZG9zIHRoZSBtaXJyb3Igb2YgdGhlIHBsYXllclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVgoc3BlZWQpOyAvLyBTZXRzIHZlbG9jaXR5IHRvcndhcmRzIHJpZ2h0XG4gICAgaXNNb3ZpbmcgPSB0cnVlOyAvLyBTZXRzIG1vdmluZyB2YXJpYWJsZVxuICAgIGlmIChwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmICFpc0F0dGFja2luZyAmJiAhZGVhZCkge1xuICAgICAgLy8gSWYgdGhlIHBsYXllciBpcyBub3QgaW4gdGhlIGFpciBvciBhdHRhY2tpbmcgb3IgZGVhZCwgaXQgcGxheXMgdGhlIHJ1bm5pbmcgYW5pbWF0aW9uXG4gICAgICBwbGF5ZXIuYW5pbXMucGxheShcInJ1bm5pbmdcIiwgdHJ1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0b3BNb3ZpbmcoKTsgLy8gSWYgbm8ga2V5IGlzIGJlaW5nIHByZXNzZWQsIGl0IGNhbGxzIHRoZSBzdG9wIG1vdmluZyBmdW5jdGlvblxuICB9XG5cbiAgLy8gSnVtcGluZ1xuICBpZiAodXBLZXkgJiYgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiAhZGVhZCkge1xuICAgIC8vIElmIHBsYXllciBpcyB0b3VjaGluZyBncm91bmQgYW5kIGp1bXBpbmdcbiAgICBpZiAoaW5kaWNhdG9yVHJpYW5nbGUpIHtcbiAgICAgIGluZGljYXRvclRyaWFuZ2xlLmNsZWFyKCk7IC8vIFJlbW92ZXMgaW5kaWNhdG9yIHRyaWFuZ2xlIGlmIHRoZSBwbGF5ZXIgaGFzIGp1bXBlZFxuICAgIH1cbiAgICBqdW1wKCk7IC8vIENhbGxzIGp1bXBcbiAgfSBlbHNlIGlmIChcbiAgICAvLyBJZiBwbGF5ZXIgaXMgdG91Y2hpbmcgYSB3YWxsIHdoaWxlIGp1bXBpbmdcbiAgICAocGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCB8fCAocGxheWVyLmJvZHkudG91Y2hpbmcucmlnaHQgJiYgIWRlYWQpKSAmJlxuICAgIGNhbldhbGxKdW1wICYmXG4gICAgdXBLZXlcbiAgKSB7XG4gICAgd2FsbEp1bXAoKTsgLy8gQ2FsbHMgd2FsbGp1bXBcbiAgfVxuICBpZiAoXG4gICAgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgKHBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0ICYmICFkZWFkKSkgJiZcbiAgICAhaXNBdHRhY2tpbmdcbiAgKSB7XG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJzbGlkaW5nXCIsIHRydWUpOyAvLyBQbGF5cyBzbGlkaW5nIGFuaW1hdGlvblxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGp1bXAgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWRcbiAgaWYgKFxuICAgICFwbGF5ZXIuYW5pbXMuaXNQbGF5aW5nICYmXG4gICAgIXBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiZcbiAgICAhcGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCAmJlxuICAgICFwbGF5ZXIuYm9keS50b3VjaGluZy5yaWdodFxuICApIHtcbiAgICBmYWxsKCk7IC8vIFBsYXlzIGZhbGxpbmcgYW5pbWF0aW9uIGlmIHRoZSBwbGF5ZXIgaXMgbm90IHRvdWNoaW5nIGEgd2FsbCBvciBpZiBhbnkgb3RoZXIgYW5pbWF0aW9uIGlzIHBsYXlpbmdcbiAgfVxuXG4gIC8vIElmIG5vIG1vdmVtZW50IGFuaW1hdGlvbnMgYXJlIHBsYXlpbmcsIHBsYXkgdGhlICdpZGxlJyBhbmltYXRpb25cbiAgaWYgKFxuICAgICFpc01vdmluZyAmJlxuICAgIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiZcbiAgICAhaXNKdW1waW5nICYmXG4gICAgIWlzQXR0YWNraW5nICYmXG4gICAgIWRlYWRcbiAgKSB7XG4gICAgaWRsZSgpO1xuICB9XG5cbiAgdXBkYXRlSGVhbHRoQmFyKCk7IC8vIFVwZGF0ZXMgdGhlIGhlYWx0aCBiYXIgYWZ0ZXIgdGhlIG5ldyBwbGF5ZXIgcG9zaXRpb25cbiAgcGxheWVyTmFtZS5zZXRQb3NpdGlvbihwbGF5ZXIueCwgcGxheWVyLnkgLSBwbGF5ZXIuaGVpZ2h0ICsgMTApOyAvLyBVcGRhdGVzIHRoZSBwbGF5ZXIgbmFtZXRhZyB3aXRoIHRoZSBuZXcgcG9zaXRpb25cblxuICAvLyBGaXJlIHRyYWlsIChzaW1wbGUgcGFydGljbGUgc3Vic3RpdHV0ZSlcbiAgZmlyZVRyYWlsVGltZXIgKz0gc2NlbmUuZ2FtZS5sb29wLmRlbHRhO1xuICBkdXN0VGltZXIgKz0gc2NlbmUuZ2FtZS5sb29wLmRlbHRhO1xuICBpZiAoXG4gICAgIWRlYWQgJiZcbiAgICBmaXJlVHJhaWxUaW1lciA+PSBmaXJlVHJhaWxJbnRlcnZhbCAmJlxuICAgIGlzTW92aW5nICYmIC8vIG9ubHkgd2hlbiBhY3R1YWxseSBtb3ZpbmcgaG9yaXpvbnRhbGx5XG4gICAgIWRlYWRcbiAgKSB7XG4gICAgZmlyZVRyYWlsVGltZXIgPSAwO1xuICAgIGNvbnN0IGJhc2VYID0gcGxheWVyLnggLSAocGxheWVyLmZsaXBYID8gLTE0IDogMTQpO1xuICAgIGNvbnN0IGJhc2VZID0gcGxheWVyLnkgKyA4O1xuICAgIC8vIFNwYXduIDEtMiBsYXllcmVkIGZsYW1lcyBlYWNoIGludGVydmFsXG4gICAgY29uc3QgY291bnQgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDEsIDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgc3Bhd25GaXJlRmxhbWUoc2NlbmUsIGJhc2VYLCBiYXNlWSk7XG4gICAgfVxuICB9XG5cbiAgLy8gR3JvdW5kIHJ1bm5pbmcgZHVzdCAob25seSB3aGlsZSBvbiBncm91bmQgJiBtb3ZpbmcpXG4gIGlmIChcbiAgICAhZGVhZCAmJlxuICAgIGlzTW92aW5nICYmXG4gICAgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJlxuICAgIGR1c3RUaW1lciA+PSBkdXN0SW50ZXJ2YWxcbiAgKSB7XG4gICAgZHVzdFRpbWVyID0gMDtcbiAgICBjb25zdCBkdXN0WSA9IHBsYXllci55ICsgcGxheWVyLmhlaWdodCAqIDAuNDU7IC8vIG5lYXIgZmVldFxuICAgIGNvbnN0IGR1c3RYID0gcGxheWVyLnggKyAocGxheWVyLmZsaXBYID8gLTE4IDogMTgpICogMC4zO1xuICAgIHNwYXduRHVzdChzY2VuZSwgZHVzdFgsIGR1c3RZKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMykge1xuICAgICAgLy8gb2NjYXNpb25hbCBleHRyYSBwdWZmIGZvciB2YXJpYWJpbGl0eVxuICAgICAgc3Bhd25EdXN0KFxuICAgICAgICBzY2VuZSxcbiAgICAgICAgZHVzdFggKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC02LCA2KSxcbiAgICAgICAgZHVzdFkgKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yLCAyKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wTW92aW5nKCkge1xuICAgIHBsYXllci5zZXRWZWxvY2l0eVgoMCk7IC8vIFNldHMgdGhlIHBsYXllciB0byBub3QgbW92aW5nXG4gICAgaXNNb3ZpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGp1bXAoKSB7XG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJqdW1waW5nXCIsIHRydWUpO1xuICAgIHBkYmcoKTtcbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlZKC1qdW1wU3BlZWQpO1xuICAgIGlzTW92aW5nID0gdHJ1ZTtcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FsbEp1bXAoKSB7XG4gICAgY2FuV2FsbEp1bXAgPSBmYWxzZTtcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcInNsaWRpbmdcIiwgdHJ1ZSk7XG4gICAgcGRiZygpO1xuICAgIHBsYXllci5zZXRWZWxvY2l0eVkoLWp1bXBTcGVlZCk7XG5cbiAgICBjb25zdCB3YWxsSnVtcFR3ZWVuID0gc2NlbmUudHdlZW5zLmFkZCh7XG4gICAgICAvLyBUaGlzIHR3ZWVuIHNtb290aHMgdGhlIGtpY2tiYWNrIGZyb20gdGhlIHdhbGxqdW1wXG4gICAgICB0YXJnZXRzOiBwbGF5ZXIsXG4gICAgICB4OiBwbGF5ZXIueCArIChwbGF5ZXIuYm9keS50b3VjaGluZy5sZWZ0ID8gNTAgOiAtNTApLCAvLyBNb3ZlcyB0aGUgcGxheWVyIC01MCBvciA1MCBjb3JkcyBhd2F5IGRlcGVuZGluZyBvbiBwb3NpdGlvblxuICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbldhbGxKdW1wID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgd2FsbEp1bXBUd2Vlbi5wbGF5KCk7IC8vIFBsYXlzIHRoZSB0d2VlblxuICB9XG5cbiAgZnVuY3Rpb24gZmFsbCgpIHtcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcImZhbGxpbmdcIiwgdHJ1ZSk7XG4gICAgcGRiZygpO1xuICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaWRsZSgpIHtcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcImlkbGVcIiwgdHJ1ZSk7XG4gICAgcGRiZygpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIHBsYXllcixcbiAgZnJhbWUsXG4gIGN1cnJlbnRIZWFsdGgsXG4gIHNldEN1cnJlbnRIZWFsdGgsXG4gIGRlYWQsXG4gIGNhbGN1bGF0ZVNwYXduLFxuICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduLFxufTtcblxuLy8gTGlzdGVuIGZvciBhdXRob3JpdGF0aXZlIGhlYWx0aCB1cGRhdGVzIGZyb20gc2VydmVyXG5zb2NrZXQub24oXCJoZWFsdGgtdXBkYXRlXCIsIChkYXRhKSA9PiB7XG4gIGlmIChkYXRhLmdhbWVJZCAhPT0gZ2FtZUlkKSByZXR1cm47XG4gIGlmIChkYXRhLnVzZXJuYW1lID09PSB1c2VybmFtZSkge1xuICAgIGN1cnJlbnRIZWFsdGggPSBkYXRhLmhlYWx0aDtcbiAgICBwZGJnKCk7XG4gICAgaWYgKGN1cnJlbnRIZWFsdGggPD0gMCkge1xuICAgICAgaWYgKCFkZWFkKSB7XG4gICAgICAgIGRlYWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIuYW5pbXMucGxheShcImR5aW5nXCIsIHRydWUpO1xuICAgICAgICBzY2VuZS5pbnB1dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5hbHBoYSA9IDAuNTtcbiAgICAgICAgcGRiZygpO1xuICAgICAgfVxuICAgICAgY3VycmVudEhlYWx0aCA9IDA7IC8vIGZvcmNlIGV4YWN0IDBcbiAgICB9XG4gICAgdXBkYXRlSGVhbHRoQmFyKCk7IC8vIGFsd2F5cyByZWZyZXNoIChjb3ZlcnMgZGVhdGggY2FzZSB3aGVyZSBtb3ZlbWVudCBsb29wIHN0b3BzKVxuICB9XG59KTtcbiIsIi8vIHNvY2tldC5qc1xuLy8gQ2VudHJhbGl6ZWQgU29ja2V0LklPIGNsaWVudCB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYmV0d2VlbiBnYW1lLCBwbGF5ZXIsIGFuZCBvcFBsYXllciBtb2R1bGVzLlxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGdhbWUuanNcblxuLy8gSW1hZ2UgQ3JlZGl0c1xuLy8gU2h1cmlrZW4gSW1hZ2U6IGh0dHBzOi8vemgtcGFydG5lcnMuY29tL2FwcHMtc3RpY2tlci1iYW5uZXItcG9zdGVyLXByaW50aW5nLXVzYWdlLWFuZC1wYXJ0LW9mLWxvZ28tNDgwOTUxNC5odG1sXG4vLyBGaWdodCBJbWFnZTogaHR0cHM6Ly9wbmd0cmVlLmNvbS9mcmVlcG5nL2JveGluZy1nbG92ZXMtdmVjdG9yLXJlZC1hbmQtYmx1ZS1ib3hpbmctZ2xvdmVzLXRoYXQtYXJlLWZpZ2h0aW5nLWlzb2xhdGUtb24td2hpdGUtYmFja2dyb3VuZF81Mjk1NDQxLmh0bWxcbi8vIFRpbGVzZXQ6IGh0dHBzOi8vZ2FtZWZyb21zY3JhdGNoLmNvbS9kZWZvbGQtZW5naW5lLXR1dG9yaWFsLXNlcmllcy10aWxlbWFwcy9cbi8vIE5pbmphIFNwcml0ZXNoZWV0OiBodHRwczovL3d3dy5mcmVlcGlrLmNvbS9wcmVtaXVtLXZlY3Rvci9ibGFjay1uaW5qYS1nYW1lLXNwcml0ZXNfMTU4MjQyNS5odG1cbi8vIEJhY2tncm91bmQgSW1hZ2U6IGh0dHBzOi8vZGUuZHJlYW1zdGltZS5jb20vYmVyZy1mb3Jlc3QtdmlkZW8tZ2FtZS1iYWNrZ3JvdW5kLWltYWdlMTA1MzYwNDc1XG4vLyBSYW5kb20gSW1hZ2U6IGh0dHBzOi8vd3d3LnN2Z3JlcG8uY29tL3N2Zy8zOTE2NTkvcmFuZG9tXG4vLyBWUyBJbWFnZTogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS91cmw/c2E9aSZ1cmw9aHR0cHMlM0ElMkYlMkZzdG9jay5hZG9iZS5jb20lMkZzZWFyY2glM0ZrJTNEdnMlMkJsb2dvJnBzaWc9QU92VmF3MHFOVGVxRXhmSXNQc2E5VHlMQjM0WiZ1c3Q9MTcxMzgwMTc0NTQ1MjAwMCZzb3VyY2U9aW1hZ2VzJmNkPXZmZSZvcGk9ODk5Nzg0NDkmdmVkPTBDQklRalJ4cUZ3b1RDT0NKdjVQWDA0VURGUUFBQUFBZEFBQUFBQkFFXG5cbi8vIENyZWRpdHMgdG8gaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qcy9qc19jb29raWVzLmFzcCBmb3IgaGVscGluZyB3aXRoIGNvb2tpZSBjb2RlXG5cbmltcG9ydCB7IGx1c2h5UGVha3MsIGx1c2h5UGVha3NPYmplY3RzIH0gZnJvbSBcIi4vTWFwcy9sdXNoeVBlYWtzXCI7XG5pbXBvcnQgeyBtYW5ncm92ZU1lYWRvdywgbWFuZ3JvdmVNZWFkb3dPYmplY3RzIH0gZnJvbSBcIi4vTWFwcy9tYW5ncm92ZU1lYWRvd1wiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBwbGF5ZXIsIGhhbmRsZVBsYXllck1vdmVtZW50LCBkZWFkIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgUmV0dXJuaW5nU2h1cmlrZW4gZnJvbSBcIi4vUmV0dXJuaW5nU2h1cmlrZW5cIjtcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4vc29ja2V0XCI7XG5pbXBvcnQgT3BQbGF5ZXIgZnJvbSBcIi4vb3BQbGF5ZXJcIjtcbmltcG9ydCB7IHNwYXduRHVzdCwgcHJld2FybUR1c3QgfSBmcm9tIFwiLi9lZmZlY3RzXCI7XG5cbi8vIFNvY2tldCBub3cgaW1wb3J0ZWQgZnJvbSBzdGFuZGFsb25lIG1vZHVsZSB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcbmZ1bmN0aW9uIGNkYmcoKSB7XG4gIC8qIGxvZ2dpbmcgZGlzYWJsZWQgZm9yIHByb2R1Y3Rpb24gKi9cbn1cbmNkYmcoKTtcblxuLy8gUGF0aCB0byBnZXQgYXNzZXRzXG5jb25zdCBzdGF0aWNQYXRoID0gXCIvYXNzZXRzXCI7XG5cbi8vIFZhcmlhYmxlcyB0byBzdG9yZSBhbGwgb2YgdGhlIHNlc3Npb24gc3RvcmFnZSB2YWx1ZXNcbmNvbnN0IGdhbWVJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKEJvb2xlYW4pLnBvcCgpO1xuY29uc3QgcGFydHlJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJwYXJ0eVwiKTtcbmNvbnN0IHVzZXJuYW1lID0gZ2V0Q29va2llKFwibmFtZVwiKTtcbmNvbnN0IGNoYXJhY3RlciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjaGFyYWN0ZXJcIik7XG5jb25zdCBzcGF3blBsYXRmb3JtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNwYXduUGxhdGZvcm1cIik7XG5jb25zdCBzcGF3biA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzcGF3blwiKTtcbmNvbnN0IHBhcnR5TWVtYmVycyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJwYXJ0eU1lbWJlcnNcIik7XG5jb25zdCBwYXJ0eU1lbWJlcnNOdW0gPSBOdW1iZXIocGFydHlNZW1iZXJzKTtcbmNvbnN0IG1hcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJtYXBcIik7XG5cbi8vIE1hcCB2YXJpYWxlXG5sZXQgbWFwT2JqZWN0cztcblxuLy8gTGlzdHMgdGhhdCBzdG9yZSBhbGwgdGhlIHBsYXllcnMgaW4gcGxheWVyIHRlYW0gYW5kIG9wIHRlYW1cbmNvbnN0IG9wcG9uZW50UGxheWVycyA9IFtdO1xuY29uc3QgdGVhbVBsYXllcnMgPSBbXTtcbmxldCBnYW1lRW5kZWQgPSBmYWxzZTsgLy8gc3RvcHMgdXBkYXRlIGxvb3AgbmV0d29yayBlbWlzc2lvbnMgYWZ0ZXIgZ2FtZSBvdmVyXG5cbi8vIE1vdmVtZW50IHRocm90dGxpbmcgdmFyaWFibGVzXG5sZXQgbGFzdE1vdmVtZW50U2VudCA9IDA7XG5jb25zdCBtb3ZlbWVudFRocm90dGxlTXMgPSAyNTsgLy8gU2VuZCBtb3ZlbWVudCB1cGRhdGVzIGV2ZXJ5IDEwMG1zIChhYm91dCAxMCBGUFMpXG5sZXQgbGFzdFBsYXllclN0YXRlID0geyB4OiAwLCB5OiAwLCBmbGlwOiBmYWxzZSwgYW5pbWF0aW9uOiBudWxsIH07XG5cbi8vIFNlcnZlciBzbmFwc2hvdCBpbnRlcnBvbGF0aW9uXG5sZXQgc3RhdGVBY3RpdmUgPSBmYWxzZTsgLy8gc2V0IHRydWUgb25jZSB3ZSBzdGFydCByZWNlaXZpbmcgc2VydmVyIHNuYXBzaG90c1xuY29uc3Qgc3RhdGVCdWZmZXIgPSBbXTsgLy8gcXVldWUgb2YgeyB0LCBwbGF5ZXJzOiB7IFt1c2VybmFtZV06IHt4LHksZmxpcCxhbmltYXRpb259IH0gfVxuY29uc3QgTUFYX1NUQVRFX0JVRkZFUiA9IDYwOyAvLyB+NCBzZWNvbmRzIGF0IDE1IEh6XG5sZXQgaW50ZXJwRGVsYXlNcyA9IDEwMDsgLy8gcmVuZGVyIH44MC0xMjBtcyBpbiB0aGUgcGFzdCAoZGVmYXVsdCAxMDBtcylcblxuLy8gTm8gcmVtb3RlIHByb2plY3RpbGUgcmVnaXN0cnkgKGRldGVybWluaXN0aWMgc2ltdWxhdGlvbiBvbiBlYWNoIGNsaWVudClcblxuLy8gUGhhc2VyIGNsYXNzIHRvIHNldHVwIHRoZSBnYW1lXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICAvLyBQcmVsb2FkcyBhc3NldHNcbiAgcHJlbG9hZCgpIHtcbiAgICBjZGJnKCk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiYmFja2dyb3VuZFwiLCBgJHtzdGF0aWNQYXRofS9iYWNrZ3JvdW5kLnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcbiAgICAgIFwibWFuZ3JvdmUtYmFja2dyb3VuZFwiLFxuICAgICAgYCR7c3RhdGljUGF0aH0vbWFuZ3JvdmVCYWNrZ3JvdW5kLmpwZ2BcbiAgICApO1xuICAgIHRoaXMubG9hZC5hdGxhcyhcbiAgICAgIFwic3ByaXRlXCIsXG4gICAgICBgJHtzdGF0aWNQYXRofS9OaW5qYV9TcHJpdGVzaGVldC5wbmdgLFxuICAgICAgYCR7c3RhdGljUGF0aH0vYW5pbWF0aW9ucy5qc29uYFxuICAgICk7XG5cbiAgICB0aGlzLmxvYWQuYXRsYXMoXG4gICAgICBcInRyb2xsXCIsXG4gICAgICBgJHtzdGF0aWNQYXRofS90cm9sbF9zcHJpdGVzaGVldC5wbmdgLFxuICAgICAgYCR7c3RhdGljUGF0aH0vdHJvbGwuanNvbmBcbiAgICApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInRpbGVzLWltYWdlXCIsIGAke3N0YXRpY1BhdGh9L21hcC5wbmdgKTtcbiAgICB0aGlzLmxvYWQudGlsZW1hcFRpbGVkSlNPTihcInRpbGVzXCIsIGAke3N0YXRpY1BhdGh9L3RpbGVzaGVldC5qc29uYCk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiYmFzZVwiLCBgJHtzdGF0aWNQYXRofS9iYXNlLnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L2xhcmdlUGxhdGZvcm0ucG5nYCk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwic2lkZS1wbGF0Zm9ybVwiLCBgJHtzdGF0aWNQYXRofS9zaWRlUGxhdGZvcm0ucG5nYCk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwibWVkaXVtLXBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L21lZGl1bVBsYXRmb3JtLnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInRpbnktcGxhdGZvcm1cIiwgYCR7c3RhdGljUGF0aH0vdGlueVBsYXRmb3JtLnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtbGVmdFwiLCBgJHtzdGF0aWNQYXRofS9iYXNlTGVmdC5wbmdgKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJiYXNlLW1pZGRsZVwiLCBgJHtzdGF0aWNQYXRofS9iYXNlTWlkZGxlLnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtcmlnaHRcIiwgYCR7c3RhdGljUGF0aH0vYmFzZVJpZ2h0LnBuZ2ApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtdG9wXCIsIGAke3N0YXRpY1BhdGh9L2Jhc2VUb3AucG5nYCk7XG5cbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJzaHVyaWtlblwiLCBgJHtzdGF0aWNQYXRofS9zaHVyaWtlbi5wbmdgKTtcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzaHVyaWtlblRocm93XCIsIGAke3N0YXRpY1BhdGh9L3NodXJpa2VuVGhyb3cubXAzYCk7XG4gICAgdGhpcy5sb2FkLmF1ZGlvKFwic2h1cmlrZW5IaXRcIiwgYCR7c3RhdGljUGF0aH0vaGl0Lm1wM2ApO1xuICAgIHRoaXMubG9hZC5hdWRpbyhcInNodXJpa2VuSGl0V29vZFwiLCBgJHtzdGF0aWNQYXRofS93b29kaGl0LndhdmApO1xuICB9XG5cbiAgY3JlYXRlKCkge1xuICAgIGNkYmcoKTtcbiAgICAvLyBDcmVhdGVzIHRoZSBtYXAgb2JqZWN0c1xuICAgIGlmIChtYXAgPT09IFwiMVwiKSB7XG4gICAgICBtYXBPYmplY3RzID0gbHVzaHlQZWFrc09iamVjdHM7XG4gICAgICBsdXNoeVBlYWtzKHRoaXMpO1xuICAgICAgY2RiZygpO1xuICAgIH0gZWxzZSBpZiAobWFwID09PSBcIjJcIikge1xuICAgICAgbWFwT2JqZWN0cyA9IG1hbmdyb3ZlTWVhZG93T2JqZWN0cztcbiAgICAgIG1hbmdyb3ZlTWVhZG93KHRoaXMpO1xuICAgICAgY2RiZygpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZXMgcGxheWVyIG9iamVjdFxuICAgIGNyZWF0ZVBsYXllcihcbiAgICAgIHRoaXMsXG4gICAgICB1c2VybmFtZSxcbiAgICAgIGNoYXJhY3RlcixcbiAgICAgIHNwYXduUGxhdGZvcm0sXG4gICAgICBzcGF3bixcbiAgICAgIHBhcnR5TWVtYmVycyxcbiAgICAgIG1hcCxcbiAgICAgIG9wcG9uZW50UGxheWVyc1xuICAgICk7XG4gICAgY2RiZygpO1xuICAgIC8vIEFkZHMgY29sbGlzaW9uIGJldHdlZW4gbWFwIGFuZCBwbGF5ZXJcblxuICAgIG1hcE9iamVjdHMuZm9yRWFjaCgobWFwT2JqZWN0KSA9PiB7XG4gICAgICAvLyBBZGQgY29sbGlkZXIgYmV0d2VlbiB0aGUgb2JqZWN0IGFuZCBlYWNoIG1hcCBvYmplY3RcbiAgICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIocGxheWVyLCBtYXBPYmplY3QpO1xuICAgIH0pO1xuICAgIGNkYmcoKTtcblxuICAgIC8vIE1ha2VzIHRoZSBmaWdodCBlbGVtZW50IHpvb20gaW4gYXQgdGhlIHN0YXJ0IG9mIHRoZSBnYW1lXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWdodFwiKS5zdHlsZS53aWR0aCA9IFwiNjAlXCI7XG5cbiAgICAvLyBTZXRzIHRoZSB2YWx1ZXMgZm9yIFlvdXIgVGVhbSBhbmQgT3Bwb3NpbmcgVGVhbSB0ZXh0XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInlvdXItdGVhbVwiXG4gICAgKS50ZXh0Q29udGVudCA9IGBZb3VyIFRlYW06ICR7cGFydHlNZW1iZXJzfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcIm9wcG9zaW5nLXRlYW1cIlxuICAgICkudGV4dENvbnRlbnQgPSBgT3Bwb3NpbmcgVGVhbTogJHtwYXJ0eU1lbWJlcnN9LyR7cGFydHlNZW1iZXJzfSBwbGF5ZXJzYDtcblxuICAgIC8vIEVtaXRzIHBsYXllci1qb2luZWQgYW5kIGNyZWF0ZXMgdGhlIG9wIHBsYXllciBvYmplY3RzXG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXItam9pbmVkXCIsIHsgdXNlcm5hbWUsIGNoYXJhY3RlciB9KTtcbiAgICBjZGJnKCk7XG4gICAgZmV0Y2goXCIvcGxheWVyc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGdhbWVJZCwgdXNlcm5hbWUgfSksXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY2RiZygpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLnVzZXJUZWFtKSB7XG4gICAgICAgICAgLy8gVXNlciB0ZWFtXG4gICAgICAgICAgaWYgKGtleSAhPT0gdXNlcm5hbWUpIHtcbiAgICAgICAgICAgIC8vIEVuc3VyZXMgcGxheWVyIGlzIG5vdCBhZGRlZCBhZ2FpblxuICAgICAgICAgICAgY29uc3QgdXNlclBsYXllciA9IG5ldyBPcFBsYXllcihcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgZGF0YS51c2VyVGVhbVtrZXldW1wiY2hhcmFjdGVyXCJdLFxuICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgIFwidXNlclwiLFxuICAgICAgICAgICAgICBkYXRhLnVzZXJUZWFtW2tleV1bXCJzcGF3blBsYXRmb3JtXCJdLFxuICAgICAgICAgICAgICBkYXRhLnVzZXJUZWFtW2tleV1bXCJzcGF3blwiXSxcbiAgICAgICAgICAgICAgcGFydHlNZW1iZXJzLFxuICAgICAgICAgICAgICBtYXBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0ZWFtUGxheWVyc1trZXldID0gdXNlclBsYXllcjsgLy8gQWRkcyBwbGF5ZXIgb2JqZWN0IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdpdGggY3VycmVudCBwb3NpdGlvbiBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZGF0YS51c2VyVGVhbVtrZXldW1wieFwiXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcInlcIl0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHVzZXJQbGF5ZXIub3Bwb25lbnQueCA9IGRhdGEudXNlclRlYW1ba2V5XVtcInhcIl07XG4gICAgICAgICAgICAgIHVzZXJQbGF5ZXIub3Bwb25lbnQueSA9IGRhdGEudXNlclRlYW1ba2V5XVtcInlcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZGJnKFwib3BQbGF5ZXIgY3JlYXRlZCAodXNlciB0ZWFtKVwiLCB7IGtleSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS5vcFRlYW0pIHtcbiAgICAgICAgICBpZiAoa2V5ICE9PSB1c2VybmFtZSkge1xuICAgICAgICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSBuZXcgT3BQbGF5ZXIoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIGRhdGEub3BUZWFtW2tleV1bXCJjaGFyYWN0ZXJcIl0sXG4gICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgXCJvcFwiLFxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wic3Bhd25QbGF0Zm9ybVwiXSxcbiAgICAgICAgICAgICAgZGF0YS5vcFRlYW1ba2V5XVtcInNwYXduXCJdLFxuICAgICAgICAgICAgICBwYXJ0eU1lbWJlcnMsXG4gICAgICAgICAgICAgIG1hcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG9wcG9uZW50UGxheWVyc1trZXldID0gb3Bwb25lbnRQbGF5ZXI7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdpdGggY3VycmVudCBwb3NpdGlvbiBpZiBhdmFpbGFibGVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZGF0YS5vcFRlYW1ba2V5XVtcInhcIl0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wieVwiXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCA9IGRhdGEub3BUZWFtW2tleV1bXCJ4XCJdO1xuICAgICAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC55ID0gZGF0YS5vcFRlYW1ba2V5XVtcInlcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZGJnKFwib3BQbGF5ZXIgY3JlYXRlZCAob3AgdGVhbSlcIiwgeyBrZXkgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgY2RiZygpO1xuICAgICAgfSk7XG5cbiAgICAvLyBBZnRlciAxIHNlY29uZCB0aGUgZmlnaHQgaW1hZ2UgaXMgcmVtb3ZlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpZ2h0XCIpO1xuICAgICAgZmlnaHQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgZmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGZpZ2h0LnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSwgMTAwMCk7XG5cbiAgICAvLyBQcmV3YXJtIHNtYWxsIGR1c3QgcG9vbFxuICAgIHByZXdhcm1EdXN0KHRoaXMsIDgpO1xuXG4gICAgLy8gQ29kZSB0aGF0IHJ1bnMgd2hlbiBhbm90aGVyIHBsYXllciBtb3ZlcyAobGVnYWN5IGZhbGxiYWNrKS4gRGlzYWJsZWQgd2hlbiBzdGF0ZUFjdGl2ZS5cbiAgICBzb2NrZXQub24oXCJtb3ZlXCIsIChkYXRhKSA9PiB7XG4gICAgICBjZGJnKCk7XG4gICAgICBpZiAoc3RhdGVBY3RpdmUpIHJldHVybjsgLy8gcHJlZmVyIGF1dGhvcml0YXRpdmUgaW50ZXJwb2xhdGlvblxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPVxuICAgICAgICBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XG4gICAgICAvLyBGaW5kcyBwbGF5ZXIgZnJvbSB0aGUgbGlzdFxuICAgICAgaWYgKG9wcG9uZW50UGxheWVyKSB7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBwb3NpdGlvbiBmb3Igc21vb3RoIHR3ZWVuaW5nXG4gICAgICAgIGNvbnN0IHByZXZYID0gb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueDtcbiAgICAgICAgY29uc3QgcHJldlkgPSBvcHBvbmVudFBsYXllci5vcHBvbmVudC55O1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBkaXN0YW5jZSB0byBkZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHR3ZWVuIG9yIHRlbGVwb3J0XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKGRhdGEueCAtIHByZXZYKTtcbiAgICAgICAgY29uc3QgZGVsdGFZID0gTWF0aC5hYnMoZGF0YS55IC0gcHJldlkpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xuXG4gICAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyB0b28gbGFyZ2UgKHBsYXllciB0ZWxlcG9ydGVkLCByZXNwYXduZWQsIGV0Yy4pLCBkb24ndCB0d2VlblxuICAgICAgICBjb25zdCBtYXhUd2VlbkRpc3RhbmNlID0gMzAwO1xuXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IG1heFR3ZWVuRGlzdGFuY2UpIHtcbiAgICAgICAgICAvLyBUZWxlcG9ydCBpbW1lZGlhdGVseSBmb3IgbGFyZ2UgZGlzdGFuY2VzXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCA9IGRhdGEueDtcbiAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC55ID0gZGF0YS55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFN0b3AgYW55IGV4aXN0aW5nIG1vdmVtZW50IHR3ZWVuXG4gICAgICAgICAgaWYgKG9wcG9uZW50UGxheWVyLm1vdmVtZW50VHdlZW4pIHtcbiAgICAgICAgICAgIG9wcG9uZW50UGxheWVyLm1vdmVtZW50VHdlZW4ucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ3JlYXRlIHNtb290aCBtb3ZlbWVudCB0d2VlbiB3aXRoIG92ZXJsYXAgcHJvdGVjdGlvblxuICAgICAgICAgIGNvbnN0IHR3ZWVuRHVyYXRpb24gPSBNYXRoLm1pbigxNTAsIGRpc3RhbmNlICogMC44KTsgLy8gU2NhbGUgZHVyYXRpb24gd2l0aCBkaXN0YW5jZSwgbWF4IDE1MG1zXG4gICAgICAgICAgXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2VlbiA9IHRoaXMudHdlZW5zLmFkZCh7XG4gICAgICAgICAgICB0YXJnZXRzOiBvcHBvbmVudFBsYXllci5vcHBvbmVudCxcbiAgICAgICAgICAgIHg6IGRhdGEueCxcbiAgICAgICAgICAgIHk6IGRhdGEueSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0d2VlbkR1cmF0aW9uLFxuICAgICAgICAgICAgZWFzZTogXCJQb3dlcjIuZWFzZU91dFwiLCAvLyBTbW9vdGhlciBlYXNpbmcgZnVuY3Rpb25cbiAgICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIC8vIFVwZGF0ZSBuYW1lIHRhZyBwb3NpdGlvbiBkdXJpbmcgdHdlZW5cbiAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnNldFBvc2l0aW9uKFxuICAgICAgICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LngsXG4gICAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueSAtIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmhlaWdodCArIDEwXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICBvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuID0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgZmxpcCBhbmQgYW5pbWF0aW9uIGltbWVkaWF0ZWx5ICh0aGVzZSBkb24ndCBuZWVkIHR3ZWVuaW5nKVxuICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC5mbGlwWCA9IGRhdGEuZmxpcDtcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYW5pbXMucGxheShkYXRhLmFuaW1hdGlvbiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIG5hbWUgdGFnIHBvc2l0aW9uXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihcbiAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC54LFxuICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnkgLSBvcHBvbmVudFBsYXllci5vcHBvbmVudC5oZWlnaHQgKyAxMFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFJlbW90ZSBydW5uaW5nIGR1c3QgKGFwcHJveGltYXRlOiBpZiBtb3ZlZCBob3Jpem9udGFsbHkgZW5vdWdoKVxuICAgICAgICBpZiAoZGVsdGFYID4gMykge1xuICAgICAgICAgIG9wcG9uZW50UGxheWVyLl9kdXN0VGltZXIgPSAob3Bwb25lbnRQbGF5ZXIuX2R1c3RUaW1lciB8fCAwKSArIDE2OyAvLyBhcHByb3hpbWF0ZSBmcmFtZSBkZWx0YVxuICAgICAgICAgIGlmIChvcHBvbmVudFBsYXllci5fZHVzdFRpbWVyID49IDcwKSB7XG4gICAgICAgICAgICBvcHBvbmVudFBsYXllci5fZHVzdFRpbWVyID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGRZID1cbiAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueSArIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmhlaWdodCAqIDAuNDU7XG4gICAgICAgICAgICBzcGF3bkR1c3QodGhpcywgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCwgZFkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQXV0aG9yaXRhdGl2ZSBzZXJ2ZXIgc25hcHNob3RzICh0aHJvdHRsZWQgZnJvbSBzZXJ2ZXIpXG4gICAgc29ja2V0Lm9uKFwic3RhdGVcIiwgKHBheWxvYWQpID0+IHtcbiAgICAgIGlmIChwYXlsb2FkLmdhbWVJZCAhPT0gZ2FtZUlkKSByZXR1cm47XG4gICAgICBzdGF0ZUFjdGl2ZSA9IHRydWU7XG4gICAgICBzdGF0ZUJ1ZmZlci5wdXNoKHBheWxvYWQpO1xuICAgICAgLy8ga2VlcCBidWZmZXIgYm91bmRlZFxuICAgICAgaWYgKHN0YXRlQnVmZmVyLmxlbmd0aCA+IE1BWF9TVEFURV9CVUZGRVIpIHN0YXRlQnVmZmVyLnNoaWZ0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBXaGVuIGFub3RoZXIgcGxheWVyIGF0dGFja3MsIHRoaXMgY2F0Y2hlcyBpdFxuICAgIHNvY2tldC5vbihcImF0dGFja1wiLCAoZGF0YSkgPT4ge1xuICAgICAgY2RiZygpO1xuICAgICAgaWYgKGRhdGEucmV0dXJuaW5nKSB7XG4gICAgICAgIGNvbnN0IG93bmVyV3JhcHBlciA9XG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXJzW2RhdGEubmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS5uYW1lXTtcbiAgICAgICAgY29uc3Qgb3duZXJTcHJpdGUgPSBvd25lcldyYXBwZXIgPyBvd25lcldyYXBwZXIub3Bwb25lbnQgOiBudWxsO1xuICAgICAgICAvLyBJbnN0YW50aWF0ZSBkZXRlcm1pbmlzdGljIHJldHVybmluZyBzaHVyaWtlbiAobm9uLW93bmVyKVxuICAgICAgICBjb25zdCBzaHVyaWtlbiA9IG5ldyBSZXR1cm5pbmdTaHVyaWtlbihcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIHsgeDogZGF0YS54LCB5OiBkYXRhLnkgfSxcbiAgICAgICAgICBvd25lclNwcml0ZSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgICAgZm9yd2FyZERpc3RhbmNlOiBkYXRhLmZvcndhcmREaXN0YW5jZSB8fCA1MDAsXG4gICAgICAgICAgICBvdXR3YXJkRHVyYXRpb246IGRhdGEub3V0d2FyZER1cmF0aW9uIHx8IDM4MCxcbiAgICAgICAgICAgIHJldHVyblNwZWVkOiBkYXRhLnJldHVyblNwZWVkIHx8IDkwMCxcbiAgICAgICAgICAgIHJvdGF0aW9uU3BlZWQ6IGRhdGEucm90YXRpb25TcGVlZCB8fCAyMDAwLFxuICAgICAgICAgICAgc2NhbGU6IGRhdGEuc2NhbGUgfHwgMC4xLFxuICAgICAgICAgICAgZGFtYWdlOiBkYXRhLmRhbWFnZSxcbiAgICAgICAgICAgIGlzT3duZXI6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy8gUmVtb3RlIGNvbGxpc2lvbiBvcHRpb25hbDogb21pdHRlZCBmb3Igc2ltcGxpY2l0eSAoYXV0aG9yaXRhdGl2ZSBoaXRzIGJ5IG93bmVyIG9ubHkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIEJhc2ljIG5vbi1yZXR1cm5pbmcgcHJvamVjdGlsZSBmYWxsYmFjayAoaWYgZXZlciB1c2VkKVxuICAgICAgY29uc3QgcHJvaiA9IHRoaXMucGh5c2ljcy5hZGQuaW1hZ2UoZGF0YS54LCBkYXRhLnksIGRhdGEud2VhcG9uKTtcbiAgICAgIHByb2ouc2V0U2NhbGUoZGF0YS5zY2FsZSB8fCAwLjEpO1xuICAgICAgcHJvai5zZXRWZWxvY2l0eSgoZGF0YS5kaXJlY3Rpb24gfHwgMSkgKiA0MDAsIDApO1xuICAgICAgcHJvai5zZXRBbmd1bGFyVmVsb2NpdHkoZGF0YS5yb3RhdGlvblNwZWVkIHx8IDYwMCk7XG4gICAgICBwcm9qLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvLyBSZW1vdmVkIHByb2plY3RpbGUtdXBkYXRlL2Rlc3Ryb3kgbGlzdGVuZXJzIChubyBuZXR3b3JrIHN5bmNpbmcpXG5cbiAgICAvLyBXaGVuIGFub3RoZXIgcGxheWVyIGRpZXNcbiAgICBzb2NrZXQub24oXCJkZWF0aFwiLCAoZGF0YSkgPT4ge1xuICAgICAgY2RiZygpO1xuICAgICAgaWYgKGRhdGEudXNlcm5hbWUgPT09IHVzZXJuYW1lKSB7XG4gICAgICAgIC8vIFNlbGYgZGVhdGggYWxyZWFkeSBoYW5kbGVkIHZpYSBoZWFsdGgtdXBkYXRlIGxpc3RlbmVyIGluIHBsYXllci5qc1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9XG4gICAgICAgIG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSB8fCB0ZWFtUGxheWVyc1tkYXRhLnVzZXJuYW1lXTtcblxuICAgICAgaWYgKCFvcHBvbmVudFBsYXllcikgcmV0dXJuOyAvLyBTYWZldHkgZ3VhcmRcblxuICAgICAgLy8gU3RvcCBhbnkgYWN0aXZlIG1vdmVtZW50IHR3ZWVuIGZvciB0aGUgZHlpbmcgcGxheWVyXG4gICAgICBpZiAob3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2Vlbikge1xuICAgICAgICBvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuLnJlbW92ZSgpO1xuICAgICAgICBvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEudXNlcm5hbWUgaW4gb3Bwb25lbnRQbGF5ZXJzKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwieW91ci10ZWFtXCIpLnRleHRDb250ZW50ID0gYFlvdXIgVGVhbTogJHtcbiAgICAgICAgICBwYXJ0eU1lbWJlcnNOdW0gLSAxXG4gICAgICAgIH0vJHtwYXJ0eU1lbWJlcnN9IHBsYXllcnNgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgXCJvcHBvc2luZy10ZWFtXCJcbiAgICAgICAgKS50ZXh0Q29udGVudCA9IGBPcHBvc2luZyBUZWFtOiAke1xuICAgICAgICAgIHBhcnR5TWVtYmVyc051bSAtIDFcbiAgICAgICAgfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XG4gICAgICB9XG5cbiAgICAgIC8vIER5aW5nIGFuaW1hdGlvblxuICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYW5pbXMucGxheShcImR5aW5nXCIsIHRydWUpO1xuICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYWxwaGEgPSAwLjU7XG4gICAgICAvLyBVc2UgbG9jYWwgc3ByaXRlIHBvc2l0aW9uIChzZXJ2ZXIgbWF5IHNlbmQgMCBpZiBub3QgcGVyc2lzdGVkIHlldClcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCxcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnkgKyAzMFxuICAgICAgKTtcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wQ3VycmVudEhlYWx0aCA9IDA7IC8vIGVuZm9yY2UgemVyb1xuICAgICAgb3Bwb25lbnRQbGF5ZXIudXBkYXRlSGVhbHRoQmFyKHRydWUpOyAvLyBpbnRlcm5hbGx5IGNvbXB1dGVzIFlcblxuICAgICAgLy8gRGVsZXRlcyB0aGUgc3ByaXRlIGZyb20gdGhlIGdhbWVcbiAgICAgIGlmIChvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0pIHtcbiAgICAgICAgZGVsZXRlIG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXTtcbiAgICAgIH0gZWxzZSBpZiAodGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV0pIHtcbiAgICAgICAgZGVsZXRlIHRlYW1QbGF5ZXJzW2RhdGEudXNlcm5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBldmVyeW9uZSBpcyBkZWFkXG4gICAgc29ja2V0Lm9uKFwiZ2FtZS1vdmVyXCIsIChkYXRhKSA9PiB7XG4gICAgICBjZGJnKCk7XG4gICAgICBpZiAoZ2FtZUlkID09PSBkYXRhLmdhbWVJZCkge1xuICAgICAgICBnYW1lRW5kZWQgPSB0cnVlOyAvLyBzdG9wIGVtaXR0aW5nIGZ1cnRoZXIgbW92ZXNcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtb3ZlclwiKTtcbiAgICAgICAgaWYgKGRhdGEubG9zZXJzLmluY2x1ZGVzKHVzZXJuYW1lKSkge1xuICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gXCJZb3UgTG9zZVwiO1xuICAgICAgICAgIGdhbWVPdmVyLnN0eWxlLmNvbG9yID0gXCIjYzgxMjEyXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBcIllvdSBXaW5cIjtcbiAgICAgICAgICBnYW1lT3Zlci5zdHlsZS5jb2xvciA9IFwiIzE4YzMyMVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0cyBlbmQgc2NyZWVuIG5hbWUgdG8gcGxheWVyIG5hbWVcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZS10ZXh0XCIpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLXRleHRcIikudGV4dENvbnRlbnQgPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gUnVucyBhZnRlciAxIHNlY29uZCBvZiBkZWF0aFxuICAgICAgICAgIC8vIERpc2FibGVzIG1vdmVtZW50XG4gICAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFyay1vdmVybGF5XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW92ZXJsYXlcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgICAgICAgIFwicmdiYSgwLCAwLCAwLCAwLjM2MylcIjtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGUgZnVuY3Rpb24gaXMgYSBidWlsdCBpbiBmdW5jdGlvbiB0aGF0IHJ1bnMgYXMgbXVjaCBhcyBwb3NzaWJsZS4gSXQgaXMgY29udHJvbGxlZCBieSB0aGUgcGhhc2VyIHNjZW5lXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoZ2FtZUVuZGVkKSByZXR1cm47IC8vIGhhbHQgbG9vcCB3b3JrIGFmdGVyIGdhbWUgb3ZlclxuICAgIGNkYmcoKTtcbiAgICBpZiAoIWRlYWQpIHtcbiAgICAgIGhhbmRsZVBsYXllck1vdmVtZW50KHRoaXMpOyAvLyBIYW5kbGVzIG1vdmVtZW50XG5cbiAgICAgIC8vIFRocm90dGxlIG1vdmVtZW50IHVwZGF0ZXMgdG8gcmVkdWNlIG5ldHdvcmsgdHJhZmZpYyBhbmQgaW1wcm92ZSBzbW9vdGhuZXNzXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY3VycmVudFN0YXRlID0ge1xuICAgICAgICB4OiBNYXRoLnJvdW5kKHBsYXllci54KSxcbiAgICAgICAgeTogTWF0aC5yb3VuZChwbGF5ZXIueSksXG4gICAgICAgIGZsaXA6IHBsYXllci5mbGlwWCxcbiAgICAgICAgYW5pbWF0aW9uOiBwbGF5ZXIuYW5pbXMuY3VycmVudEFuaW0/LmtleSB8fCBcImlkbGVcIixcbiAgICAgIH07XG5cbiAgICAgIC8vIE9ubHkgc2VuZCBtb3ZlbWVudCB1cGRhdGUgaWYgZW5vdWdoIHRpbWUgaGFzIHBhc3NlZCBBTkQgc29tZXRoaW5nIG1lYW5pbmdmdWwgY2hhbmdlZFxuICAgICAgY29uc3QgcG9zaXRpb25DaGFuZ2VkID1cbiAgICAgICAgTWF0aC5hYnMoY3VycmVudFN0YXRlLnggLSBsYXN0UGxheWVyU3RhdGUueCkgPiAxIHx8XG4gICAgICAgIE1hdGguYWJzKGN1cnJlbnRTdGF0ZS55IC0gbGFzdFBsYXllclN0YXRlLnkpID4gMTtcbiAgICAgIGNvbnN0IHN0YXRlQ2hhbmdlZCA9XG4gICAgICAgIHBvc2l0aW9uQ2hhbmdlZCB8fFxuICAgICAgICBjdXJyZW50U3RhdGUuZmxpcCAhPT0gbGFzdFBsYXllclN0YXRlLmZsaXAgfHxcbiAgICAgICAgY3VycmVudFN0YXRlLmFuaW1hdGlvbiAhPT0gbGFzdFBsYXllclN0YXRlLmFuaW1hdGlvbjtcblxuICAgICAgaWYgKHN0YXRlQ2hhbmdlZCAmJiBub3cgLSBsYXN0TW92ZW1lbnRTZW50ID49IG1vdmVtZW50VGhyb3R0bGVNcykge1xuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdmVcIiwge1xuICAgICAgICAgIHg6IGN1cnJlbnRTdGF0ZS54LFxuICAgICAgICAgIHk6IGN1cnJlbnRTdGF0ZS55LFxuICAgICAgICAgIGZsaXA6IGN1cnJlbnRTdGF0ZS5mbGlwLFxuICAgICAgICAgIGFuaW1hdGlvbjogY3VycmVudFN0YXRlLmFuaW1hdGlvbixcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGFzdE1vdmVtZW50U2VudCA9IG5vdztcbiAgICAgICAgbGFzdFBsYXllclN0YXRlID0geyAuLi5jdXJyZW50U3RhdGUgfTtcbiAgICAgICAgY2RiZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEludGVycG9sYXRlIHJlbW90ZSBlbnRpdGllcyB+MTAwbXMgaW4gdGhlIHBhc3QgZm9yIHNtb290aG5lc3NcbiAgICBpZiAoc3RhdGVBY3RpdmUgJiYgc3RhdGVCdWZmZXIubGVuZ3RoID49IDEpIHtcbiAgICAgIGNvbnN0IG5ld2VzdCA9IHN0YXRlQnVmZmVyW3N0YXRlQnVmZmVyLmxlbmd0aCAtIDFdO1xuICAgICAgY29uc3QgdGFyZ2V0VCA9IG5ld2VzdC50IC0gaW50ZXJwRGVsYXlNcztcblxuICAgICAgLy8gRmluZCB0d28gc25hcHNob3RzIHN1cnJvdW5kaW5nIHRhcmdldFRcbiAgICAgIGxldCBvbGRlciA9IG51bGw7XG4gICAgICBsZXQgbmV3ZXIgPSBudWxsO1xuICAgICAgZm9yIChsZXQgaSA9IHN0YXRlQnVmZmVyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IHMgPSBzdGF0ZUJ1ZmZlcltpXTtcbiAgICAgICAgaWYgKHMudCA8PSB0YXJnZXRUKSB7XG4gICAgICAgICAgb2xkZXIgPSBzO1xuICAgICAgICAgIG5ld2VyID0gc3RhdGVCdWZmZXJbaSArIDFdIHx8IHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghb2xkZXIpIHtcbiAgICAgICAgb2xkZXIgPSBzdGF0ZUJ1ZmZlclswXTtcbiAgICAgICAgbmV3ZXIgPSBzdGF0ZUJ1ZmZlclsxXSB8fCBvbGRlcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdDAgPSBvbGRlci50O1xuICAgICAgY29uc3QgdDEgPSBNYXRoLm1heChuZXdlci50LCB0MCArIDEpO1xuICAgICAgY29uc3QgYWxwaGEgPSBQaGFzZXIuTWF0aC5DbGFtcCgodGFyZ2V0VCAtIHQwKSAvICh0MSAtIHQwKSwgMCwgMSk7XG4gICAgICBjb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKyAoYiAtIGEpICogdDtcblxuICAgICAgY29uc3QgYXBwbHlJbnRlcnAgPSAod3JhcHBlciwgbmFtZSkgPT4ge1xuICAgICAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc3ByID0gd3JhcHBlci5vcHBvbmVudDtcbiAgICAgICAgLy8gY2FuY2VsIGFueSBsZWdhY3kgdHdlZW4gdG8gYXZvaWQgZmlnaHRpbmcgaW50ZXJwb2xhdGlvblxuICAgICAgICBpZiAod3JhcHBlci5tb3ZlbWVudFR3ZWVuKSB7XG4gICAgICAgICAgd3JhcHBlci5tb3ZlbWVudFR3ZWVuLnJlbW92ZSgpO1xuICAgICAgICAgIHdyYXBwZXIubW92ZW1lbnRUd2VlbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgczAgPSBvbGRlci5wbGF5ZXJzW25hbWVdO1xuICAgICAgICBjb25zdCBzMSA9IG5ld2VyLnBsYXllcnNbbmFtZV0gfHwgczA7XG4gICAgICAgIGlmICghczAgJiYgIXMxKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFTdGF0ZSA9IHMwIHx8IHMxO1xuICAgICAgICBjb25zdCBiU3RhdGUgPSBzMSB8fCBzMDtcbiAgICAgICAgaWYgKCFhU3RhdGUpIHJldHVybjtcbiAgICAgICAgLy8gSWdub3JlIG9idmlvdXNseSBib2d1cyBzdGF0ZXNcbiAgICAgICAgaWYgKFxuICAgICAgICAgIE51bWJlci5pc05hTihhU3RhdGUueCkgfHxcbiAgICAgICAgICBOdW1iZXIuaXNOYU4oYVN0YXRlLnkpXG4gICAgICAgICkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGl4ID0gbGVycChhU3RhdGUueCwgKGJTdGF0ZT8ueCA/PyBhU3RhdGUueCksIGFscGhhKTtcbiAgICAgICAgY29uc3QgaXkgPSBsZXJwKGFTdGF0ZS55LCAoYlN0YXRlPy55ID8/IGFTdGF0ZS55KSwgYWxwaGEpO1xuXG4gICAgICAgIC8vIElmIGh1Z2UgdGVsZXBvcnQgYmV0d2VlbiBmcmFtZXMsIHNuYXAgdG8gZGVzdGluYXRpb25cbiAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguaHlwb3QoKGJTdGF0ZT8ueCA/PyBhU3RhdGUueCkgLSBhU3RhdGUueCwgKGJTdGF0ZT8ueSA/PyBhU3RhdGUueSkgLSBhU3RhdGUueSk7XG4gICAgICAgIGlmIChkaXN0ID4gMjYwKSB7XG4gICAgICAgICAgc3ByLnggPSBiU3RhdGU/LnggPz8gYVN0YXRlLng7XG4gICAgICAgICAgc3ByLnkgPSBiU3RhdGU/LnkgPz8gYVN0YXRlLnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ByLnggPSBpeDtcbiAgICAgICAgICBzcHIueSA9IGl5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3JpZW50YXRpb24vYW5pbWF0aW9uOiB0YWtlIGZyb20gbmV3ZXIgaWYgcHJlc2VudFxuICAgICAgICBjb25zdCBhbmltU3JjID0gKGJTdGF0ZSAmJiBiU3RhdGUuYW5pbWF0aW9uKSA/IGJTdGF0ZSA6IGFTdGF0ZTtcbiAgICAgICAgc3ByLmZsaXBYID0gISFhbmltU3JjLmZsaXA7XG4gICAgICAgIGlmIChhbmltU3JjLmFuaW1hdGlvbikge1xuICAgICAgICAgIHNwci5hbmltcy5wbGF5KGFuaW1TcmMuYW5pbWF0aW9uLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5hbWUgdGFnXG4gICAgICAgIHdyYXBwZXIub3BQbGF5ZXJOYW1lLnNldFBvc2l0aW9uKFxuICAgICAgICAgIHNwci54LFxuICAgICAgICAgIHNwci55IC0gc3ByLmhlaWdodCArIDEwXG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gb3Bwb25lbnRQbGF5ZXJzKSBhcHBseUludGVycChvcHBvbmVudFBsYXllcnNbbmFtZV0sIG5hbWUpO1xuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRlYW1QbGF5ZXJzKSBhcHBseUludGVycCh0ZWFtUGxheWVyc1tuYW1lXSwgbmFtZSk7XG4gICAgfVxuICAvLyBVcGRhdGVzIGhlYWx0aCBiYXJzXG4gICAgZm9yIChjb25zdCBwbGF5ZXIgaW4gb3Bwb25lbnRQbGF5ZXJzKSB7XG4gICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IG9wcG9uZW50UGxheWVyc1twbGF5ZXJdO1xuICAgICAgb3Bwb25lbnRQbGF5ZXIudXBkYXRlSGVhbHRoQmFyKCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGxheWVyIGluIHRlYW1QbGF5ZXJzKSB7XG4gICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IHRlYW1QbGF5ZXJzW3BsYXllcl07XG4gICAgICBvcHBvbmVudFBsYXllci51cGRhdGVIZWFsdGhCYXIoKTtcbiAgICB9XG5cbiAgICAvLyBObyByZW1vdGUgcHJvamVjdGlsZSBpbnRlcnBvbGF0aW9uIHJlcXVpcmVkXG4gIH1cbn1cblxuY29uc3QgY29uZmlnID0ge1xuICB0eXBlOiBQaGFzZXIuQVVUTyxcbiAgYW50aWFsaWFzOiB0cnVlLFxuICByZXNvbHV0aW9uOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcbiAgc2NhbGU6IHtcbiAgICAvLyBNYWtlcyBzdXJlIHRoZSBnYW1lIGxvb2tzIGdvb2Qgb24gYWxsIHNjcmVlbnNcbiAgICBtb2RlOiBQaGFzZXIuU2NhbGUuRklULFxuICAgIGF1dG9DZW50ZXI6IFBoYXNlci5TY2FsZS5DRU5URVJfQk9USCxcbiAgICB3aWR0aDogXCIxMzAwcHhcIixcbiAgICBoZWlnaHQ6IFwiNjAwcHhcIixcbiAgfSxcbiAgc2NlbmU6IEdhbWVTY2VuZSxcbiAgcGh5c2ljczoge1xuICAgIGRlZmF1bHQ6IFwiYXJjYWRlXCIsXG4gICAgYXJjYWRlOiB7XG4gICAgICBncmF2aXR5OiB7IHk6IDc1MCB9LFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKGNvbmZpZyk7XG5cbi8vIEdldHMgY29va2llIHZhbHVlXG5mdW5jdGlvbiBnZXRDb29raWUoY29va2llTmFtZSkge1xuICBjb25zdCBuYW1lID0gY29va2llTmFtZSArIFwiPVwiO1xuICBjb25zdCBkZWNvZGVkQ29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XG4gIGNvbnN0IGNvb2tpZUFycmF5ID0gZGVjb2RlZENvb2tpZS5zcGxpdChcIjtcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY29va2llID0gY29va2llQXJyYXlbaV0udHJpbSgpO1xuICAgIGlmIChjb29raWUuaW5kZXhPZihuYW1lKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGNvb2tpZS5zdWJzdHJpbmcobmFtZS5sZW5ndGgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gXCJcIjtcbn1cblxuZXhwb3J0IHsgb3Bwb25lbnRQbGF5ZXJzLCB0ZWFtUGxheWVycyB9O1xuIl0sIm5hbWVzIjpbIm5pbmphQW5pbWF0aW9ucyIsInNjZW5lIiwiYW5pbXMiLCJjcmVhdGUiLCJrZXkiLCJmcmFtZXMiLCJnZW5lcmF0ZUZyYW1lTmFtZXMiLCJwcmVmaXgiLCJlbmQiLCJ6ZXJvUGFkIiwiZnJhbWVSYXRlIiwicmVwZWF0IiwiYmFzZSIsInBsYXRmb3JtIiwibGVmdFBsYXRmb3JtIiwicmlnaHRQbGF0Zm9ybSIsImx1c2h5UGVha3NPYmplY3RzIiwibHVzaHlQZWFrcyIsImNhbnZhc1dpZHRoIiwiZ2FtZSIsImNvbmZpZyIsIndpZHRoIiwiY2FudmFzSGVpZ2h0IiwiaGVpZ2h0IiwiY2VudGVyWCIsImNhbWVyYXMiLCJtYWluIiwiYmFja2dyb3VuZCIsImFkZCIsInNwcml0ZSIsImRpc3BsYXlXaWR0aCIsInN5cyIsImNhbnZhcyIsImRpc3BsYXlIZWlnaHQiLCJzZXRPcmlnaW4iLCJwaHlzaWNzIiwiYm9keSIsImFsbG93R3Jhdml0eSIsInNldEltbW92YWJsZSIsInNldFNjYWxlIiwicHVzaCIsImJhc2VNaWRkbGUiLCJiYXNlVG9wIiwiYmFzZUxlZnQiLCJiYXNlUmlnaHQiLCJ0aW55UGxhdGZvcm0xIiwidGlueVBsYXRmb3JtMiIsInRpbnlQbGF0Zm9ybTMiLCJ0aW55UGxhdGZvcm00IiwidGlueVBsYXRmb3JtNSIsInRpbnlQbGF0Zm9ybTYiLCJtYW5ncm92ZU1lYWRvd09iamVjdHMiLCJtYW5ncm92ZU1lYWRvdyIsInNvY2tldCIsIlJldHVybmluZ1NodXJpa2VuIiwiX1BoYXNlciRQaHlzaWNzJEFyY2FkIiwiX2luaGVyaXRzIiwic3RhcnRQb3MiLCJvd25lclNwcml0ZSIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIngiLCJ5IiwiY2ZnIiwiT2JqZWN0IiwiYXNzaWduIiwiZGlyZWN0aW9uIiwiZm9yd2FyZERpc3RhbmNlIiwib3V0d2FyZER1cmF0aW9uIiwicmV0dXJuU3BlZWQiLCJyb3RhdGlvblNwZWVkIiwic2NhbGUiLCJkYW1hZ2UiLCJ1c2VybmFtZSIsImdhbWVJZCIsImlzT3duZXIiLCJtYXhMaWZldGltZSIsImhpdENvb2xkb3duIiwicGhhc2UiLCJlbGFwc2VkIiwidG90YWxFbGFwc2VkIiwiaG92ZXJEdXJhdGlvbiIsInJldHVybkFjY2VsZXJhdGlvbiIsImN1cnJlbnRSZXR1cm5TcGVlZCIsImhpdFRpbWVzdGFtcHMiLCJ0cmFpbEludGVydmFsIiwidHJhaWxBY2N1bSIsInRyYWlscyIsIm1heFRyYWlscyIsImV4aXN0aW5nIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsInNldERlcHRoIiwic2V0QW5ndWxhclZlbG9jaXR5Iiwic3RhcnRYIiwic3RhcnRZIiwiZW5kWCIsImVuZFkiLCJkaXBEb3duIiwiYnVsZ2VVcCIsImN0cmwxWCIsImN0cmwxWSIsImN0cmwyWCIsImN0cmwyWSIsImdsb3dDb2xvciIsImdsb3ciLCJncmFwaGljcyIsImRlcHRoIiwic2V0QmxlbmRNb2RlIiwiUGhhc2VyIiwiQmxlbmRNb2RlcyIsIkFERCIsIl9kcmF3R2xvdyIsInR3ZWVucyIsInRhcmdldHMiLCJmcm9tIiwidG8iLCJhbHBoYSIsImR1cmF0aW9uIiwieW95byIsImVhc2UiLCJldmVudHMiLCJvbiIsInVwZGF0ZVNodXJpa2VuIiwiX2NyZWF0ZUNsYXNzIiwidmFsdWUiLCJjb2xvckludCIsImJhc2VSYWRpdXMiLCJpbm5lclJhZGl1cyIsIm1pZFJhZGl1cyIsIm91dGVyUmFkaXVzIiwiYyIsIkRpc3BsYXkiLCJDb2xvciIsIkludGVnZXJUb0NvbG9yIiwiY2xlYXIiLCJmaWxsU3R5bGUiLCJjb2xvciIsImZpbGxDaXJjbGUiLCJjdWJpYyIsInQiLCJwMCIsInAxIiwicDIiLCJwMyIsIml0IiwidHJ5RGFtYWdlIiwidGFyZ2V0V3JhcHBlciIsInRhcmdldFVzZXJuYW1lIiwiX3VzZXJuYW1lIiwibmFtZSIsIm5vdyIsInRpbWUiLCJsYXN0IiwiZW1pdCIsImF0dGFja2VyIiwidGFyZ2V0IiwiYXR0YWNoRW5lbXlPdmVybGFwIiwib2JqZWN0cyIsIl90aGlzMiIsImZvckVhY2giLCJvYmoiLCJvcHBvbmVudCIsIm92ZXJsYXAiLCJhdHRhY2hNYXBPdmVybGFwIiwic3Bhd25UcmFpbCIsInMiLCJpbWFnZSIsIm9uQ29tcGxldGUiLCJkZXN0cm95IiwibGVuZ3RoIiwib2xkIiwic2hpZnQiLCJkZXN0cm95U2h1cmlrZW4iLCJvZmYiLCJfIiwiZGVsdGEiLCJhY3RpdmUiLCJyYXdUIiwiTWF0aCIsIkNsYW1wIiwiY29zIiwiUEkiLCJueCIsIm55Iiwic2V0UG9zaXRpb24iLCJkeCIsImR5IiwiZGlzdCIsInNxcnQiLCJtaW4iLCJzcGQiLCJvblJldHVybiIsImUiLCJQaHlzaWNzIiwiQXJjYWRlIiwiSW1hZ2UiLCJkZWZhdWx0IiwiZHVzdFBvb2wiLCJkdXN0UG9vbE1heCIsInNwYXduRHVzdCIsInRpbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJnIiwiZmluZCIsIm8iLCJiYXNlU2l6ZSIsIkJldHdlZW4iLCJhbHBoYVN0YXJ0IiwiRmxvYXRCZXR3ZWVuIiwicHVmZkNvbG9yIiwicmlzZSIsImRyaWZ0WCIsInNjYWxlVGFyZ2V0IiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInByZXdhcm1EdXN0IiwiY291bnQiLCJpIiwiY2FsY3VsYXRlU3Bhd24iLCJjYWxjdWxhdGVNYW5ncm92ZVNwYXduIiwiT3BQbGF5ZXIiLCJjaGFyYWN0ZXIiLCJ0ZWFtIiwic3Bhd25QbGF0Zm9ybSIsInNwYXduIiwicGxheWVyc0luVGVhbSIsIm1hcCIsIm1hcE9iamVjdHMiLCJvcE1heEhlYWx0aCIsIm9wQ3VycmVudEhlYWx0aCIsIm9wSGVhbHRoQmFyV2lkdGgiLCJtb3ZlbWVudFR3ZWVuIiwiY3JlYXRlT3BQbGF5ZXIiLCJwbGF5Iiwib3BGcmFtZSIsImZyYW1lIiwic2V0U2l6ZSIsInNldE9mZnNldCIsIm9wUGxheWVyTmFtZSIsInRleHQiLCJzZXRTdHlsZSIsImZvbnQiLCJmaWxsIiwib3BIZWFsdGhUZXh0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwic3Ryb2tlIiwic3Ryb2tlVGhpY2tuZXNzIiwib3BIZWFsdGhCYXIiLCJ1cGRhdGVIZWFsdGhCYXIiLCJkYXRhIiwiaGVhbHRoIiwiZGVhZCIsImhlYWx0aEJhclkiLCJoZWFsdGhQZXJjZW50YWdlIiwiZGlzcGxheWVkV2lkdGgiLCJoZWFsdGhCYXJYIiwic2V0VGV4dCIsImNvbmNhdCIsImZpbGxSZWN0IiwibGluZVN0eWxlIiwic3Ryb2tlUm91bmRlZFJlY3QiLCJmaWxsUm91bmRlZFJlY3QiLCJyZW1vdmUiLCJwZGJnIiwicGxheWVyIiwiY3Vyc29ycyIsImNhbldhbGxKdW1wIiwiaXNNb3ZpbmciLCJpc0p1bXBpbmciLCJpc0F0dGFja2luZyIsImNhbkF0dGFjayIsIm1heEhlYWx0aCIsImN1cnJlbnRIZWFsdGgiLCJoZWFsdGhCYXJXaWR0aCIsImhlYWx0aEJhciIsImhlYWx0aFRleHQiLCJhbW1vQmFyIiwiYW1tb0JhckJhY2siLCJhbW1vQmFyV2lkdGgiLCJhbW1vQ29vbGRvd25NcyIsImFtbW9FbGFwc2VkIiwiYW1tb1JlYWR5IiwiYW1tb1R3ZWVuIiwicGxheWVyTmFtZSIsImluZGljYXRvclRyaWFuZ2xlIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsInNwbGl0IiwiZmlsdGVyIiwiQm9vbGVhbiIsInBvcCIsIm9wcG9uZW50UGxheWVyc1JlZiIsImZpcmVUcmFpbFRpbWVyIiwiZmlyZVRyYWlsSW50ZXJ2YWwiLCJmaXJlUG9vbCIsImZpcmVQb29sTWF4IiwiZHVzdFRpbWVyIiwiZHVzdEludGVydmFsIiwic3Bhd25GaXJlRmxhbWUiLCJHZXRDb2xvciIsImRyaWZ0WSIsImNyZWF0ZVBsYXllciIsInNjZW5lUGFyYW0iLCJzcGF3blBsYXRmb3JtUGFyYW0iLCJzcGF3blBhcmFtIiwicGxheWVyc0luVGVhbVBhcmFtIiwibWFwUGFyYW0iLCJvcHBvbmVudFBsYXllcnNQYXJhbSIsImlucHV0Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwid29ybGQiLCJib3VuZHMiLCJib3R0b20iLCJzZXRUaW1lb3V0IiwidHJpYW5nbGUiLCJHZW9tIiwiVHJpYW5nbGUiLCJmaWxsVHJpYW5nbGVTaGFwZSIsInBvaW50ZXIiLCJ0d2VlblByb3h5Iiwib25VcGRhdGUiLCJkcmF3QW1tb0JhciIsInNodXJpa2VuU291bmQiLCJzb3VuZCIsInNldFZvbHVtZSIsInNldFJhdGUiLCJmbGlwWCIsImFyY0hlaWdodCIsInJldHVybmluZyIsImVuZW15TGlzdCIsInBsYXllcklkIiwid2VhcG9uIiwic2V0Q3VycmVudEhlYWx0aCIsImZvcmNlZFgiLCJmb3JjZWRZIiwicGVyY2VudCIsImNoYXJnaW5nQ29sb3IiLCJyZWFkeUNvbG9yIiwicjEiLCJnMSIsImIxIiwicjIiLCJnMiIsImIyIiwiciIsInJvdW5kIiwiYiIsImZpbGxDb2xvciIsInRsIiwidHIiLCJibCIsImJyIiwiYXZhaWxhYmxlU3BhY2UiLCJsZWZ0TW9zdCIsImdldEJvdW5kcyIsImxlZnQiLCJzcGF3blkiLCJnZXRUb3BDZW50ZXIiLCJzcGF3blgiLCJwb3NpdGlvbiIsIlN0cmluZyIsImhhbmRsZVBsYXllck1vdmVtZW50Iiwic3BlZWQiLCJqdW1wU3BlZWQiLCJsZWZ0S2V5IiwiaXNEb3duIiwiYWRkS2V5IiwicmlnaHRLZXkiLCJyaWdodCIsInVwS2V5IiwidXAiLCJzZXRWZWxvY2l0eVgiLCJ0b3VjaGluZyIsImRvd24iLCJzdG9wTW92aW5nIiwianVtcCIsIndhbGxKdW1wIiwiaXNQbGF5aW5nIiwiZmFsbCIsImlkbGUiLCJsb29wIiwiYmFzZVgiLCJiYXNlWSIsImR1c3RZIiwiZHVzdFgiLCJyYW5kb20iLCJzZXRWZWxvY2l0eVkiLCJ3YWxsSnVtcFR3ZWVuIiwiZW5hYmxlZCIsImlvIiwiY2RiZyIsInN0YXRpY1BhdGgiLCJwYXJ0eUlkIiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0Q29va2llIiwicGFydHlNZW1iZXJzIiwicGFydHlNZW1iZXJzTnVtIiwiTnVtYmVyIiwib3Bwb25lbnRQbGF5ZXJzIiwidGVhbVBsYXllcnMiLCJnYW1lRW5kZWQiLCJsYXN0TW92ZW1lbnRTZW50IiwibW92ZW1lbnRUaHJvdHRsZU1zIiwibGFzdFBsYXllclN0YXRlIiwiZmxpcCIsImFuaW1hdGlvbiIsInN0YXRlQWN0aXZlIiwic3RhdGVCdWZmZXIiLCJNQVhfU1RBVEVfQlVGRkVSIiwiaW50ZXJwRGVsYXlNcyIsIkdhbWVTY2VuZSIsIl9QaGFzZXIkU2NlbmUiLCJwcmVsb2FkIiwibG9hZCIsImF0bGFzIiwidGlsZW1hcFRpbGVkSlNPTiIsImF1ZGlvIiwibWFwT2JqZWN0IiwiY29sbGlkZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJ0ZXh0Q29udGVudCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidXNlclRlYW0iLCJ1c2VyUGxheWVyIiwib3BUZWFtIiwib3Bwb25lbnRQbGF5ZXIiLCJlcnJvciIsImNvbnNvbGUiLCJmaWdodCIsIm9wYWNpdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2WCIsInByZXZZIiwiZGVsdGFYIiwiYWJzIiwiZGVsdGFZIiwiZGlzdGFuY2UiLCJtYXhUd2VlbkRpc3RhbmNlIiwidHdlZW5EdXJhdGlvbiIsIl9kdXN0VGltZXIiLCJkWSIsInBheWxvYWQiLCJvd25lcldyYXBwZXIiLCJzaHVyaWtlbiIsInByb2oiLCJzZXRWZWxvY2l0eSIsImdhbWVPdmVyIiwibG9zZXJzIiwiaW5jbHVkZXMiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwidXBkYXRlIiwiX3BsYXllciRhbmltcyRjdXJyZW50IiwiRGF0ZSIsImN1cnJlbnRTdGF0ZSIsImN1cnJlbnRBbmltIiwicG9zaXRpb25DaGFuZ2VkIiwic3RhdGVDaGFuZ2VkIiwiX29iamVjdFNwcmVhZCIsIm5ld2VzdCIsInRhcmdldFQiLCJvbGRlciIsIm5ld2VyIiwidDAiLCJ0MSIsIm1heCIsImxlcnAiLCJhIiwiYXBwbHlJbnRlcnAiLCJ3cmFwcGVyIiwiX2JTdGF0ZSR4IiwiX2JTdGF0ZSR5IiwiX2JTdGF0ZSR4MiIsIl9iU3RhdGUkeTIiLCJzcHIiLCJzMCIsInBsYXllcnMiLCJzMSIsImFTdGF0ZSIsImJTdGF0ZSIsImlzTmFOIiwiaXgiLCJpeSIsImh5cG90IiwiX2JTdGF0ZSR4MyIsIl9iU3RhdGUkeTMiLCJhbmltU3JjIiwiU2NlbmUiLCJ0eXBlIiwiQVVUTyIsImFudGlhbGlhcyIsInJlc29sdXRpb24iLCJkZXZpY2VQaXhlbFJhdGlvIiwibW9kZSIsIlNjYWxlIiwiRklUIiwiYXV0b0NlbnRlciIsIkNFTlRFUl9CT1RIIiwiYXJjYWRlIiwiZ3Jhdml0eSIsImRlYnVnIiwiR2FtZSIsImNvb2tpZU5hbWUiLCJkZWNvZGVkQ29va2llIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY29va2llIiwiY29va2llQXJyYXkiLCJ0cmltIiwic3Vic3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==