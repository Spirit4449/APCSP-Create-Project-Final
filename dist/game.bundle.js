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
  if (character === "Ninja") {
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
      shurikenSound.setVolume(0.1);
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
  var speed = 350;
  var jumpSpeed = 420;

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
      x: player.x + (player.body.touching.left ? 80 : -80),
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
// Net sync helpers
var netLastSend = 0;
var netSendIntervalMs = 1000 / 30; // throttle client move emits to ~30Hz
var stateActive = false; // once server 'state' snapshots start, prefer them over legacy 'move'
var lastServerState = {
  t: 0,
  players: {}
};
var hasSentInitialMove = false; // gate reconciliation until first valid publish

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

      // Join per-game room for scoped server broadcasts
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].emit("join-game", {
        gameId: gameId
      });
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
            cdbg("opPlayer created (user team)", {
              key: key
            });
          }
        }
        for (var _key in data.opTeam) {
          if (_key !== username) {
            var opponentPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_5__["default"](_this, data.opTeam[_key]["character"], _key, "op", data.opTeam[_key]["spawnPlatform"], data.opTeam[_key]["spawn"], partyMembers, map);
            opponentPlayers[_key] = opponentPlayer;
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

      // Code that runs when another player moves (legacy). Disabled when stateActive.
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("move", function (data) {
        cdbg();
        if (stateActive) return; // prefer authoritative snapshots
        var opponentPlayer = opponentPlayers[data.username] || teamPlayers[data.username];
        // Finds player from the list
        if (opponentPlayer) {
          // Sets the x and y of the opponent as well as the animaiton
          var prevX = opponentPlayer.opponent.x;
          opponentPlayer.opponent.x = data.x;
          opponentPlayer.opponent.y = data.y;
          opponentPlayer.opponent.flipX = data.flip;
          opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10);
          opponentPlayer.opponent.anims.play(data.animation, true);

          // Remote running dust (approximate: if moved horizontally enough)
          var deltaX = Math.abs(opponentPlayer.opponent.x - prevX);
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

      // Authoritative server snapshots (throttled ~20Hz)
      _socket__WEBPACK_IMPORTED_MODULE_4__["default"].on("state", function (payload) {
        // payload: { gameId, t, players: { [username]: {x,y,flip,animation} } }
        if (payload.gameId !== gameId) return;
        lastServerState = payload;
        stateActive = true;
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
        (0,_player__WEBPACK_IMPORTED_MODULE_2__.handlePlayerMovement)(this); // Handles movement
        // Throttled move emit (client-side prediction, server reconciliation)
        var now = performance.now();
        if (now - netLastSend >= netSendIntervalMs) {
          netLastSend = now;
          _socket__WEBPACK_IMPORTED_MODULE_4__["default"].emit("move", {
            x: _player__WEBPACK_IMPORTED_MODULE_2__.player.x,
            y: _player__WEBPACK_IMPORTED_MODULE_2__.player.y,
            flip: _player__WEBPACK_IMPORTED_MODULE_2__.player.flipX,
            animation: _player__WEBPACK_IMPORTED_MODULE_2__.player.anims.currentAnim ? _player__WEBPACK_IMPORTED_MODULE_2__.player.anims.currentAnim.key : "idle",
            username: username
          });
          if (!hasSentInitialMove) hasSentInitialMove = true;
        }
        cdbg();
      }
      // Apply authoritative state smoothing to opponents and reconcile local player
      if (stateActive && lastServerState && lastServerState.players) {
        var playersMap = lastServerState.players;
        var dt = this.game.loop.delta / 1000;
        var lerp = function lerp(a, b, t) {
          return a + (b - a) * t;
        };
        var smoothFactor = Phaser.Math.Clamp(dt * 12, 0, 1); // responsiveness vs. smoothness

        // Reconcile local player (light correction to avoid jitter)
        var myState = playersMap[username];
        if (myState && !_player__WEBPACK_IMPORTED_MODULE_2__.dead && hasSentInitialMove) {
          // Ignore uninitialized server positions (0,0) to prevent teleport-from-corner
          if (myState.x === 0 && myState.y === 0 || Number.isNaN(myState.x) || Number.isNaN(myState.y)) {
            // wait for a valid snapshot after our first move
          } else {
            var errX = myState.x - _player__WEBPACK_IMPORTED_MODULE_2__.player.x;
            var errY = myState.y - _player__WEBPACK_IMPORTED_MODULE_2__.player.y;
            var err = Math.hypot(errX, errY);
            var onGround = !!(_player__WEBPACK_IMPORTED_MODULE_2__.player.body && _player__WEBPACK_IMPORTED_MODULE_2__.player.body.touching && _player__WEBPACK_IMPORTED_MODULE_2__.player.body.touching.down);
            if (onGround) {
              // On ground: allow moderate corrections (snap if far, steer if slight)
              if (err > 80) {
                _player__WEBPACK_IMPORTED_MODULE_2__.player.x = myState.x;
                _player__WEBPACK_IMPORTED_MODULE_2__.player.y = myState.y;
              } else if (err > 8) {
                _player__WEBPACK_IMPORTED_MODULE_2__.player.x = lerp(_player__WEBPACK_IMPORTED_MODULE_2__.player.x, myState.x, smoothFactor * 0.6);
                _player__WEBPACK_IMPORTED_MODULE_2__.player.y = lerp(_player__WEBPACK_IMPORTED_MODULE_2__.player.y, myState.y, smoothFactor * 0.6);
              }
            } else {
              // In air: avoid vertical rubber-band. Steer horizontally, snap vertical only if way off.
              if (Math.abs(errX) > 8) {
                _player__WEBPACK_IMPORTED_MODULE_2__.player.x = lerp(_player__WEBPACK_IMPORTED_MODULE_2__.player.x, myState.x, smoothFactor * 0.4);
              }
              if (Math.abs(errY) > 220) {
                _player__WEBPACK_IMPORTED_MODULE_2__.player.y = myState.y; // snap only if extremely divergent
              }
            }
          }
        }

        // Update opponents (both enemy and user team mirror)
        var applyTo = function applyTo(wrapper, name) {
          if (!wrapper) return;
          var sprite = wrapper.opponent;
          var s = playersMap[name];
          if (!s) return;
          // Skip uninitialized zero positions to avoid yanking from spawn to corner
          if (s.x === 0 && s.y === 0 || Number.isNaN(s.x) || Number.isNaN(s.y)) {
            return;
          }
          var dx = s.x - sprite.x;
          var dy = s.y - sprite.y;
          var dist = Math.hypot(dx, dy);
          if (dist > 100) {
            sprite.x = s.x;
            sprite.y = s.y;
          } else {
            sprite.x = lerp(sprite.x, s.x, smoothFactor);
            sprite.y = lerp(sprite.y, s.y, smoothFactor);
          }
          sprite.flipX = !!s.flip;
          if (s.animation) {
            sprite.anims.play(s.animation, true);
          }
          // Update name tag position
          wrapper.opPlayerName.setPosition(sprite.x, sprite.y - sprite.height + 10);
        };
        for (var name in opponentPlayers) {
          applyTo(opponentPlayers[name], name);
        }
        for (var _name in teamPlayers) {
          applyTo(teamPlayers[_name], _name);
        }
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
        y: 900
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sQ0FBQzs7QUFFcEM7QUFDQSxTQUFTNFgsU0FBU0EsQ0FBQzZGLFVBQVUsRUFBRTtFQUM3QixJQUFNdlYsSUFBSSxHQUFHdVYsVUFBVSxHQUFHLEdBQUc7RUFDN0IsSUFBTUMsYUFBYSxHQUFHQyxrQkFBa0IsQ0FBQ3pFLFFBQVEsQ0FBQzBFLE1BQU0sQ0FBQztFQUN6RCxJQUFNQyxXQUFXLEdBQUdILGFBQWEsQ0FBQzVNLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDNUMsS0FBSyxJQUFJdEUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHcVIsV0FBVyxDQUFDdlUsTUFBTSxFQUFFa0QsQ0FBQyxFQUFFLEVBQUU7SUFDM0MsSUFBSW9SLE1BQU0sR0FBR0MsV0FBVyxDQUFDclIsQ0FBQyxDQUFDLENBQUNzUixJQUFJLENBQUMsQ0FBQztJQUNsQyxJQUFJRixNQUFNLENBQUN4UixPQUFPLENBQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDOUIsT0FBTzBWLE1BQU0sQ0FBQ0csU0FBUyxDQUFDN1YsSUFBSSxDQUFDb0IsTUFBTSxDQUFDO0lBQ3RDO0VBQ0Y7RUFDQSxPQUFPLEVBQUU7QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvQW5pbWF0aW9ucy9uaW5qYS5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL01hcHMvbHVzaHlQZWFrcy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL01hcHMvbWFuZ3JvdmVNZWFkb3cuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9SZXR1cm5pbmdTaHVyaWtlbi5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2VmZmVjdHMuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9vcFBsYXllci5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL3NvY2tldC5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBuaW5qYUFuaW1hdGlvbnMoc2NlbmUpIHtcclxuICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgICAga2V5OiBcInJ1bm5pbmdcIiwgLy8gTmFtZSBvZiBhbmltYXRpb25cclxuICAgICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZVwiLCB7XHJcbiAgICAgICAgICBwcmVmaXg6IFwicnVubmluZ1wiLCAvLyBOYW1lIGluc2lkZSBvZiBqc29uIGZpbGVcclxuICAgICAgICAgIGVuZDogNSwgLy8gTGVuZ3RoIG9mIGFuaW1hdGlvbiBpbiBmcmFtZXMgKFNpbmNlIHRoZSBudW1iZXJzIHN0YXJ0IGF0IDAsIHRoZSBlbmQgaXMgYWx3YXlzIDEgbW9yZS4gU28gNSArIDEgPSA2IGZyYW1lcylcclxuICAgICAgICAgIHplcm9QYWQ6IDIsIC8vIE51bWJlciBvZiB6ZXJvcyBpbiBqc29uIGZpbGVcclxuICAgICAgICB9KSxcclxuICAgICAgICBmcmFtZVJhdGU6IDIwLCAvLyBOdW1iZXIgb2YgZnJhbWVzIHBlciBzZWNvbmRcclxuICAgICAgICByZXBlYXQ6IDAsIC8vIE51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgKDAgbWVhbnMgbm9uZSkgKC0xIG1lYW5zIGluZmluaXRlIHRpbWVzKVxyXG4gICAgICB9KTtcclxuICAgICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICBrZXk6IFwiaWRsZVwiLFxyXG4gICAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlXCIsIHtcclxuICAgICAgICAgIHByZWZpeDogXCJpZGxlXCIsXHJcbiAgICAgICAgICBlbmQ6IDQsXHJcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZyYW1lUmF0ZTogMyxcclxuICAgICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICB9KTtcclxuICAgICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICBrZXk6IFwianVtcGluZ1wiLFxyXG4gICAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlXCIsIHtcclxuICAgICAgICAgIHByZWZpeDogXCJqdW1waW5nXCIsXHJcbiAgICAgICAgICBlbmQ6IDcsXHJcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZyYW1lUmF0ZTogMjAsXHJcbiAgICAgICAgcmVwZWF0OiAwLFxyXG4gICAgICB9KTtcclxuICAgIFxyXG4gICAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xyXG4gICAgICAgIGtleTogXCJzbGlkaW5nXCIsXHJcbiAgICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGVcIiwge1xyXG4gICAgICAgICAgcHJlZml4OiBcIndhbGxcIixcclxuICAgICAgICAgIGVuZDogMCxcclxuICAgICAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZnJhbWVSYXRlOiAyMCxcclxuICAgICAgICByZXBlYXQ6IDIsXHJcbiAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgICAga2V5OiBcImZhbGxpbmdcIixcclxuICAgICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZVwiLCB7XHJcbiAgICAgICAgICBwcmVmaXg6IFwiZmFsbGluZ1wiLFxyXG4gICAgICAgICAgZW5kOiAyLFxyXG4gICAgICAgICAgemVyb1BhZDogMixcclxuICAgICAgICB9KSxcclxuICAgICAgICBmcmFtZVJhdGU6IDIwLFxyXG4gICAgICAgIHJlcGVhdDogMCxcclxuICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAgICBrZXk6IFwidGhyb3dcIixcclxuICAgICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZVwiLCB7XHJcbiAgICAgICAgICBwcmVmaXg6IFwidGhyb3dcIixcclxuICAgICAgICAgIGVuZDogMyxcclxuICAgICAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZnJhbWVSYXRlOiAxNSxcclxuICAgICAgICByZXBlYXQ6IDAsXHJcbiAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgICAga2V5OiBcImR5aW5nXCIsXHJcbiAgICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGVcIiwge1xyXG4gICAgICAgICAgcHJlZml4OiBcImR5aW5nXCIsXHJcbiAgICAgICAgICBlbmQ6IDMsXHJcbiAgICAgICAgICB6ZXJvUGFkOiAyLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGZyYW1lUmF0ZTogMTAsXHJcbiAgICAgICAgcmVwZWF0OiAwLFxyXG4gICAgICB9KTtcclxufSIsIi8vIG1hcC5qc1xyXG5cclxuLy8gR2xvYmFsc1xyXG5sZXQgYmFzZTtcclxubGV0IHBsYXRmb3JtO1xyXG5sZXQgbGVmdFBsYXRmb3JtO1xyXG5sZXQgcmlnaHRQbGF0Zm9ybTtcclxuXHJcbmNvbnN0IGx1c2h5UGVha3NPYmplY3RzID0gW11cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsdXNoeVBlYWtzKHNjZW5lKSB7XHJcbiAgLy8gQ2FudmFzIHZhcmlhYmxlc1xyXG4gIGNvbnN0IGNhbnZhc1dpZHRoID0gc2NlbmUuZ2FtZS5jb25maWcud2lkdGg7XHJcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xyXG4gIGNvbnN0IGNlbnRlclggPSBzY2VuZS5jYW1lcmFzLm1haW4ud2lkdGggLyAyO1xyXG5cclxuICAvLyBTZXR1cCBiYWNrZ3JvdW5kIHBvc2l0aW9uXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IHNjZW5lLmFkZC5zcHJpdGUoMCwgLTE4MCwgXCJiYWNrZ3JvdW5kXCIpO1xyXG4gIC8vIFNldCBiYWNrZ3JvdW5kIHRvIHRoZSBzaXplIG9mIHRoZSBjYW52YXNcclxuICBiYWNrZ3JvdW5kLmRpc3BsYXlXaWR0aCA9IHNjZW5lLnN5cy5jYW52YXMud2lkdGg7XHJcbiAgYmFja2dyb3VuZC5kaXNwbGF5SGVpZ2h0ID0gc2NlbmUuc3lzLmNhbnZhcy5oZWlnaHQgKyA1MDA7IC8vIGFkZCA1MDAgdG8gcHJldmVudCBkaXN0b3J0aW9uXHJcbiAgYmFja2dyb3VuZC5zZXRPcmlnaW4oMCwgMCk7XHJcblxyXG4gIC8vIEJhc2VcclxuICBiYXNlID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDU1MCwgXCJiYXNlXCIpO1xyXG4gIGJhc2UuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XHJcbiAgYmFzZS5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXHJcbiAgYmFzZS5zZXRTY2FsZSgwLjcpOyAvLyBNYWtlcyBpdCBzbWFsbGVyXHJcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChiYXNlKVxyXG5cclxuICAvLyBQbGF0Zm9ybVxyXG4gIHBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDI1MCwgXCJwbGF0Zm9ybVwiKTtcclxuICBwbGF0Zm9ybS5zZXRTY2FsZSgwLjcpO1xyXG4gIHBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgcGxhdGZvcm0uc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIGx1c2h5UGVha3NPYmplY3RzLnB1c2gocGxhdGZvcm0pXHJcblxyXG4gIC8vIExlZnQgUGxhdGZvcm1cclxuICBsZWZ0UGxhdGZvcm0gPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDUwMCwgMjYwLCBcInNpZGUtcGxhdGZvcm1cIik7XHJcbiAgbGVmdFBsYXRmb3JtLnNldFNjYWxlKDAuNyk7XHJcbiAgbGVmdFBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgbGVmdFBsYXRmb3JtLnNldEltbW92YWJsZSh0cnVlKTtcclxuICBsdXNoeVBlYWtzT2JqZWN0cy5wdXNoKGxlZnRQbGF0Zm9ybSlcclxuXHJcbiAgLy8gUmlnaHQgUGxhdGZvcm1cclxuICByaWdodFBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyA1MDAsIDI2MCwgXCJzaWRlLXBsYXRmb3JtXCIpO1xyXG4gIHJpZ2h0UGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcclxuICByaWdodFBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgcmlnaHRQbGF0Zm9ybS5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChyaWdodFBsYXRmb3JtKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgbHVzaHlQZWFrc09iamVjdHMsIGJhc2UsIHBsYXRmb3JtIH07XHJcbiIsIi8vIG1hcC5qc1xyXG5cclxuLy8gR2xvYmFsc1xyXG5sZXQgYmFzZU1pZGRsZTtcclxubGV0IGJhc2VUb3A7XHJcbmxldCBiYXNlTGVmdDtcclxubGV0IGJhc2VSaWdodDtcclxubGV0IHRpbnlQbGF0Zm9ybTE7XHJcbmxldCB0aW55UGxhdGZvcm0yO1xyXG5sZXQgdGlueVBsYXRmb3JtMztcclxubGV0IHRpbnlQbGF0Zm9ybTQ7XHJcbmxldCB0aW55UGxhdGZvcm01O1xyXG5sZXQgdGlueVBsYXRmb3JtNjtcclxuXHJcbmNvbnN0IG1hbmdyb3ZlTWVhZG93T2JqZWN0cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hbmdyb3ZlTWVhZG93KHNjZW5lKSB7XHJcbiAgLy8gQ2FudmFzIHZhcmlhYmxlc1xyXG4gIGNvbnN0IGNhbnZhc1dpZHRoID0gc2NlbmUuZ2FtZS5jb25maWcud2lkdGg7XHJcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xyXG4gIGNvbnN0IGNlbnRlclggPSBzY2VuZS5jYW1lcmFzLm1haW4ud2lkdGggLyAyO1xyXG5cclxuICAvLyBTZXR1cCBiYWNrZ3JvdW5kIHBvc2l0aW9uXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IHNjZW5lLmFkZC5zcHJpdGUoMCwgLTE4MCwgXCJtYW5ncm92ZS1iYWNrZ3JvdW5kXCIpO1xyXG4gIC8vIFNldCBiYWNrZ3JvdW5kIHRvIHRoZSBzaXplIG9mIHRoZSBjYW52YXNcclxuICBiYWNrZ3JvdW5kLmRpc3BsYXlXaWR0aCA9IHNjZW5lLnN5cy5jYW52YXMud2lkdGg7XHJcbiAgYmFja2dyb3VuZC5kaXNwbGF5SGVpZ2h0ID0gc2NlbmUuc3lzLmNhbnZhcy5oZWlnaHQgKyA1MDA7IC8vIGFkZCA1MDAgdG8gcHJldmVudCBkaXN0b3J0aW9uXHJcbiAgYmFja2dyb3VuZC5zZXRPcmlnaW4oMCwgMCk7XHJcblxyXG4gIC8vIEJhc2UgTWlkZGxlXHJcbiAgYmFzZU1pZGRsZSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYLCA2MDAsIFwiYmFzZS1taWRkbGVcIik7XHJcbiAgYmFzZU1pZGRsZS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcclxuICBiYXNlTWlkZGxlLnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcclxuICBiYXNlTWlkZGxlLnNldFNjYWxlKDAuNik7IC8vIE1ha2VzIGl0IHNtYWxsZXJcclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaChiYXNlTWlkZGxlKTtcclxuXHJcbiAgLy8gQmFzZSBUb3BcclxuICBiYXNlVG9wID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDQwOCwgXCJiYXNlLXRvcFwiKTtcclxuICBiYXNlVG9wLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7IC8vIERvZXNuJ3QgYWxsb3cgZ3Jhdml0eVxyXG4gIGJhc2VUb3Auc2V0SW1tb3ZhYmxlKHRydWUpOyAvLyBNYWtlcyBzdXJlIGl0IGRvZXNuJ3QgbW92ZVxyXG4gIGJhc2VUb3Auc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKGJhc2VUb3ApO1xyXG5cclxuICAvLyBCYXNlIExlZnRcclxuICBiYXNlTGVmdCA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gNDIyLCA2MzgsIFwiYmFzZS1sZWZ0XCIpO1xyXG4gIGJhc2VMZWZ0LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7IC8vIERvZXNuJ3QgYWxsb3cgZ3Jhdml0eVxyXG4gIGJhc2VMZWZ0LnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcclxuICBiYXNlTGVmdC5zZXRTY2FsZSgwLjYpOyAvLyBNYWtlcyBpdCBzbWFsbGVyXHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2goYmFzZUxlZnQpO1xyXG5cclxuICAvLyBCYXNlIFJpZ2h0XHJcbiAgYmFzZVJpZ2h0ID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyA0MjIsIDYzOCwgXCJiYXNlLXJpZ2h0XCIpO1xyXG4gIGJhc2VSaWdodC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcclxuICBiYXNlUmlnaHQuc2V0SW1tb3ZhYmxlKHRydWUpOyAvLyBNYWtlcyBzdXJlIGl0IGRvZXNuJ3QgbW92ZVxyXG4gIGJhc2VSaWdodC5zZXRTY2FsZSgwLjYpOyAvLyBNYWtlcyBpdCBzbWFsbGVyXHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2goYmFzZVJpZ2h0KTtcclxuXHJcbiAgLy8gUGxhdGZvcm1cclxuICB0aW55UGxhdGZvcm0xID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggLSAyODAsIDMyNSwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTEuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm0xLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtMS5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtMSk7XHJcblxyXG4gIC8vIFBsYXRmb3JtIDJcclxuICB0aW55UGxhdGZvcm0yID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyAyODAsIDMyNSwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTIuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm0yLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtMi5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtMik7XHJcblxyXG4gIC8vIFBsYXRmb3JtIDNcclxuICB0aW55UGxhdGZvcm0zID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggLSA0MzAsIDIwMCwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTMuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm0zLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtMy5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtMyk7XHJcblxyXG4gIC8vIFBsYXRmb3JtIDRcclxuICB0aW55UGxhdGZvcm00ID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyA0MzAsIDIwMCwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTQuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm00LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtNC5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtNCk7XHJcblxyXG4gIC8vIFBsYXRmb3JtIDVcclxuICB0aW55UGxhdGZvcm01ID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggLSAxMzAsIDE1MCwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTUuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm01LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtNS5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtNSk7XHJcblxyXG4gIC8vIFBsYXRmb3JtIDZcclxuICB0aW55UGxhdGZvcm02ID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyAxMzAsIDE1MCwgXCJ0aW55LXBsYXRmb3JtXCIpO1xyXG4gIHRpbnlQbGF0Zm9ybTYuc2V0U2NhbGUoMC42KTtcclxuICB0aW55UGxhdGZvcm02LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgdGlueVBsYXRmb3JtNi5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2godGlueVBsYXRmb3JtNik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IG1hbmdyb3ZlTWVhZG93T2JqZWN0cywgdGlueVBsYXRmb3JtMSwgdGlueVBsYXRmb3JtMiwgdGlueVBsYXRmb3JtMywgdGlueVBsYXRmb3JtNCwgdGlueVBsYXRmb3JtNSwgdGlueVBsYXRmb3JtNiB9O1xyXG4iLCIvLyBSZXR1cm5pbmdTaHVyaWtlbi5qc1xyXG4vLyBDdXJ2ZWQsIHJldHVybmluZywgcGllcmNpbmcgc2h1cmlrZW4gd2l0aCBkZXRlcm1pbmlzdGljIGxvY2FsIHNpbXVsYXRpb24uXHJcblxyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiOyAvLyBvd25lci1vbmx5IGhpdCBldmVudHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJldHVybmluZ1NodXJpa2VuIGV4dGVuZHMgUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkltYWdlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge1BoYXNlci5TY2VuZX0gc2NlbmVcclxuICAgKiBAcGFyYW0ge3t4Om51bWJlcix5Om51bWJlcn19IHN0YXJ0UG9zXHJcbiAgICogQHBhcmFtIHtQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlfSBvd25lclNwcml0ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgc3RhcnRQb3MsIG93bmVyU3ByaXRlLCBjb25maWcpIHtcclxuICAgIHN1cGVyKHNjZW5lLCBzdGFydFBvcy54LCBzdGFydFBvcy55LCBcInNodXJpa2VuXCIpO1xyXG4gICAgdGhpcy5vd25lclNwcml0ZSA9IG93bmVyU3ByaXRlO1xyXG4gICAgdGhpcy5jZmcgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgZGlyZWN0aW9uOiAxLFxyXG4gICAgICAgIGZvcndhcmREaXN0YW5jZTogNTIwLFxyXG4gICAgICAgIG91dHdhcmREdXJhdGlvbjogNjAwLCAvLyBtc1xyXG4gICAgICAgIHJldHVyblNwZWVkOiA1ODAsIC8vIHB4L3MgKGNhcClcclxuICAgICAgICByb3RhdGlvblNwZWVkOiA5NTAsIC8vIGRlZy9zXHJcbiAgICAgICAgc2NhbGU6IDAuMSxcclxuICAgICAgICBkYW1hZ2U6IDEwMDAsXHJcbiAgICAgICAgdXNlcm5hbWU6IFwiXCIsXHJcbiAgICAgICAgZ2FtZUlkOiBcIlwiLFxyXG4gICAgICAgIGlzT3duZXI6IGZhbHNlLFxyXG4gICAgICAgIG1heExpZmV0aW1lOiA3MDAwLFxyXG4gICAgICAgIGhpdENvb2xkb3duOiAxNTAsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpZyB8fCB7fVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBQaGFzZSBzdGF0ZVxyXG4gICAgdGhpcy5waGFzZSA9IFwib3V0d2FyZFwiOyAvLyBvdXR3YXJkIC0+IGhvdmVyIC0+IHJldHVyblxyXG4gICAgdGhpcy5lbGFwc2VkID0gMDsgLy8gbXMgaW4gY3VycmVudCBwaGFzZVxyXG4gICAgdGhpcy50b3RhbEVsYXBzZWQgPSAwOyAvLyBtcyB0b3RhbCBsaWZlXHJcbiAgICB0aGlzLmhvdmVyRHVyYXRpb24gPSAxMDA7IC8vIG1zIHRvIGhvdmVyIGJlZm9yZSByZXR1cm5pbmdcclxuICAgIHRoaXMucmV0dXJuQWNjZWxlcmF0aW9uID0gODAwOyAvLyBweC9zXjJcclxuICAgIHRoaXMuY3VycmVudFJldHVyblNwZWVkID0gdGhpcy5jZmcucmV0dXJuU3BlZWQgKiAwLjA4OyAvLyByYW1wIHVwXHJcbiAgICB0aGlzLmhpdFRpbWVzdGFtcHMgPSB7fTsgLy8gdXNlcm5hbWUgLT4gbGFzdCBoaXQgbXNcclxuXHJcbiAgICAvLyBUcmFpbCBzdGF0ZVxyXG4gICAgdGhpcy50cmFpbEludGVydmFsID0gMzA7IC8vIG1zXHJcbiAgICB0aGlzLnRyYWlsQWNjdW0gPSAwO1xyXG4gICAgdGhpcy50cmFpbHMgPSBbXTtcclxuICAgIHRoaXMubWF4VHJhaWxzID0gNDA7XHJcblxyXG4gICAgLy8gQWRkIHRvIHNjZW5lIC8gcGh5c2ljc1xyXG4gICAgc2NlbmUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgc2NlbmUucGh5c2ljcy5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICB0aGlzLnNldFNjYWxlKHRoaXMuY2ZnLnNjYWxlKTtcclxuICAgIHRoaXMuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0RGVwdGgoNSk7XHJcbiAgICB0aGlzLnNldEFuZ3VsYXJWZWxvY2l0eSh0aGlzLmNmZy5yb3RhdGlvblNwZWVkICogdGhpcy5jZmcuZGlyZWN0aW9uKTtcclxuXHJcbiAgICAvLyBQYXRoIGNvbnRyb2wgcG9pbnRzIChzbGlnaHQgZGlwIHRoZW4gYnVsZ2UpXHJcbiAgICB0aGlzLnN0YXJ0WCA9IHN0YXJ0UG9zLng7XHJcbiAgICB0aGlzLnN0YXJ0WSA9IHN0YXJ0UG9zLnk7XHJcbiAgICB0aGlzLmVuZFggPSB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZTtcclxuICAgIHRoaXMuZW5kWSA9IHRoaXMuc3RhcnRZO1xyXG4gICAgY29uc3QgZGlwRG93biA9IDIwO1xyXG4gICAgY29uc3QgYnVsZ2VVcCA9IDQwO1xyXG4gICAgdGhpcy5jdHJsMVggPVxyXG4gICAgICB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZSAqIDAuMjU7XHJcbiAgICB0aGlzLmN0cmwxWSA9IHRoaXMuc3RhcnRZICsgZGlwRG93bjtcclxuICAgIHRoaXMuY3RybDJYID1cclxuICAgICAgdGhpcy5zdGFydFggKyB0aGlzLmNmZy5kaXJlY3Rpb24gKiB0aGlzLmNmZy5mb3J3YXJkRGlzdGFuY2UgKiAwLjY7XHJcbiAgICB0aGlzLmN0cmwyWSA9IHRoaXMuc3RhcnRZIC0gYnVsZ2VVcDtcclxuXHJcbiAgICAvLyBVbmlmaWVkIHN1YnRsZSBnbG93IChibHVlIGlmIG93bmVyLCByZWQgb3RoZXJ3aXNlKVxyXG4gICAgY29uc3QgZ2xvd0NvbG9yID0gdGhpcy5jZmcuaXNPd25lciA/IDB4MmU5YmZmIDogMHhmZjNhMmU7XHJcbiAgICB0aGlzLmdsb3cgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuICAgIHRoaXMuZ2xvdy5zZXREZXB0aCh0aGlzLmRlcHRoIC0gMSk7XHJcbiAgICB0aGlzLmdsb3cuc2V0QmxlbmRNb2RlKFBoYXNlci5CbGVuZE1vZGVzLkFERCk7XHJcbiAgICB0aGlzLl9kcmF3R2xvdyhnbG93Q29sb3IpO1xyXG4gICAgc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHRoaXMuZ2xvdyxcclxuICAgICAgc2NhbGU6IHsgZnJvbTogMC45NSwgdG86IDEuMTUgfSxcclxuICAgICAgYWxwaGE6IHsgZnJvbTogMC45LCB0bzogMC41NSB9LFxyXG4gICAgICBkdXJhdGlvbjogNjAwLFxyXG4gICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICBlYXNlOiBcIlNpbmUuZWFzZUluT3V0XCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCB0aGlzLnVwZGF0ZVNodXJpa2VuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIF9kcmF3R2xvdyhjb2xvckludCkge1xyXG4gICAgY29uc3QgYmFzZVJhZGl1cyA9IDg1ICogdGhpcy5jZmcuc2NhbGU7XHJcbiAgICBjb25zdCBpbm5lclJhZGl1cyA9IGJhc2VSYWRpdXMgKiAwLjQyO1xyXG4gICAgY29uc3QgbWlkUmFkaXVzID0gYmFzZVJhZGl1cyAqIDAuOTtcclxuICAgIGNvbnN0IG91dGVyUmFkaXVzID0gYmFzZVJhZGl1cyAqIDEuMjtcclxuICAgIGNvbnN0IGMgPSBQaGFzZXIuRGlzcGxheS5Db2xvci5JbnRlZ2VyVG9Db2xvcihjb2xvckludCk7XHJcbiAgICB0aGlzLmdsb3cuY2xlYXIoKTtcclxuICAgIHRoaXMuZ2xvdy54ID0gdGhpcy54O1xyXG4gICAgdGhpcy5nbG93LnkgPSB0aGlzLnk7XHJcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuNDIpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxDaXJjbGUoMCwgMCwgb3V0ZXJSYWRpdXMpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxTdHlsZShjLmNvbG9yLCAwLjcyKTtcclxuICAgIHRoaXMuZ2xvdy5maWxsQ2lyY2xlKDAsIDAsIG1pZFJhZGl1cyk7XHJcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuOTUpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxDaXJjbGUoMCwgMCwgaW5uZXJSYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3ViaWMgQmV6aWVyIGludGVycG9sYXRpb24gaGVscGVyXHJcbiAgY3ViaWModCwgcDAsIHAxLCBwMiwgcDMpIHtcclxuICAgIGNvbnN0IGl0ID0gMSAtIHQ7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBpdCAqIGl0ICogaXQgKiBwMCArXHJcbiAgICAgIDMgKiBpdCAqIGl0ICogdCAqIHAxICtcclxuICAgICAgMyAqIGl0ICogdCAqIHQgKiBwMiArXHJcbiAgICAgIHQgKiB0ICogdCAqIHAzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdHJ5RGFtYWdlKHRhcmdldFdyYXBwZXIpIHtcclxuICAgIGlmICghdGhpcy5jZmcuaXNPd25lcikgcmV0dXJuOyAvLyBvbmx5IG93bmVyIHJlcG9ydHMgaGl0c1xyXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSByZXR1cm47XHJcbiAgICBjb25zdCB0YXJnZXRVc2VybmFtZSA9XHJcbiAgICAgIHRhcmdldFdyYXBwZXIudXNlcm5hbWUgfHxcclxuICAgICAgdGFyZ2V0V3JhcHBlci5fdXNlcm5hbWUgfHxcclxuICAgICAgdGFyZ2V0V3JhcHBlci5uYW1lIHx8XHJcbiAgICAgIFwidW5rbm93blwiO1xyXG4gICAgY29uc3Qgbm93ID0gdGhpcy5zY2VuZS50aW1lLm5vdztcclxuICAgIGNvbnN0IGxhc3QgPSB0aGlzLmhpdFRpbWVzdGFtcHNbdGFyZ2V0VXNlcm5hbWVdIHx8IDA7XHJcbiAgICBpZiAobm93IC0gbGFzdCA8IHRoaXMuY2ZnLmhpdENvb2xkb3duKSByZXR1cm47XHJcbiAgICB0aGlzLmhpdFRpbWVzdGFtcHNbdGFyZ2V0VXNlcm5hbWVdID0gbm93O1xyXG4gICAgc29ja2V0LmVtaXQoXCJoaXRcIiwge1xyXG4gICAgICBhdHRhY2tlcjogdGhpcy5jZmcudXNlcm5hbWUsXHJcbiAgICAgIHRhcmdldDogdGFyZ2V0VXNlcm5hbWUsXHJcbiAgICAgIGRhbWFnZTogdGhpcy5jZmcuZGFtYWdlLFxyXG4gICAgICBnYW1lSWQ6IHRoaXMuY2ZnLmdhbWVJZCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNoRW5lbXlPdmVybGFwKG9iamVjdHMpIHtcclxuICAgIG9iamVjdHMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgIGlmICghb2JqKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHNwcml0ZSA9IG9iai5vcHBvbmVudCB8fCBvYmo7XHJcbiAgICAgIHRoaXMuc2NlbmUucGh5c2ljcy5hZGQub3ZlcmxhcCh0aGlzLCBzcHJpdGUsICgpID0+IHtcclxuICAgICAgICBpZiAob2JqLm9wcG9uZW50KSB0aGlzLnRyeURhbWFnZShvYmopO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNoTWFwT3ZlcmxhcCgpIHtcclxuICAgIC8vIEludGVudGlvbmFsbHkgYmxhbmsgKHByb2plY3RpbGUgaWdub3JlcyBtYXAgbm93KVxyXG4gIH1cclxuXHJcbiAgc3Bhd25UcmFpbCgpIHtcclxuICAgIGNvbnN0IHMgPSB0aGlzLnNjZW5lLmFkZC5pbWFnZSh0aGlzLngsIHRoaXMueSwgXCJzaHVyaWtlblwiKTtcclxuICAgIHMuc2V0U2NhbGUodGhpcy5jZmcuc2NhbGUgKiAwLjQpO1xyXG4gICAgcy5zZXREZXB0aCg0KTtcclxuICAgIHMuYWxwaGEgPSAwLjM1O1xyXG4gICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogcyxcclxuICAgICAgYWxwaGE6IDAsXHJcbiAgICAgIHNjYWxlOiB7IGZyb206IHMuc2NhbGUsIHRvOiBzLnNjYWxlICogMC4xNSB9LFxyXG4gICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICBlYXNlOiBcIkN1YmljLmVhc2VPdXRcIixcclxuICAgICAgb25Db21wbGV0ZTogKCkgPT4gcy5kZXN0cm95KCksXHJcbiAgICB9KTtcclxuICAgIHRoaXMudHJhaWxzLnB1c2gocyk7XHJcbiAgICBpZiAodGhpcy50cmFpbHMubGVuZ3RoID4gdGhpcy5tYXhUcmFpbHMpIHtcclxuICAgICAgY29uc3Qgb2xkID0gdGhpcy50cmFpbHMuc2hpZnQoKTtcclxuICAgICAgaWYgKG9sZCAmJiBvbGQuZGVzdHJveSkgb2xkLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlc3Ryb3lTaHVyaWtlbigpIHtcclxuICAgIGlmICghdGhpcy5zY2VuZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5zY2VuZS5ldmVudHMub2ZmKFwidXBkYXRlXCIsIHRoaXMudXBkYXRlU2h1cmlrZW4sIHRoaXMpO1xyXG4gICAgdGhpcy50cmFpbHMuZm9yRWFjaCgodCkgPT4gdCAmJiB0LmRlc3Ryb3kgJiYgdC5kZXN0cm95KCkpO1xyXG4gICAgdGhpcy50cmFpbHMubGVuZ3RoID0gMDtcclxuICAgIGlmICh0aGlzLmdsb3cgJiYgdGhpcy5nbG93LmRlc3Ryb3kpIHRoaXMuZ2xvdy5kZXN0cm95KCk7XHJcbiAgICB0aGlzLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNodXJpa2VuKF8sIGRlbHRhKSB7XHJcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSByZXR1cm47XHJcbiAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XHJcbiAgICB0aGlzLnRvdGFsRWxhcHNlZCArPSBkZWx0YTtcclxuICAgIHRoaXMudHJhaWxBY2N1bSArPSBkZWx0YTtcclxuICAgIGlmICh0aGlzLnRyYWlsQWNjdW0gPj0gdGhpcy50cmFpbEludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc3Bhd25UcmFpbCgpO1xyXG4gICAgICB0aGlzLnRyYWlsQWNjdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudG90YWxFbGFwc2VkID4gdGhpcy5jZmcubWF4TGlmZXRpbWUpIHtcclxuICAgICAgdGhpcy5kZXN0cm95U2h1cmlrZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBoYXNlID09PSBcIm91dHdhcmRcIikge1xyXG4gICAgICBjb25zdCByYXdUID0gUGhhc2VyLk1hdGguQ2xhbXAoXHJcbiAgICAgICAgdGhpcy5lbGFwc2VkIC8gdGhpcy5jZmcub3V0d2FyZER1cmF0aW9uLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCB0ID0gKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogcmF3VCkpIC8gMjsgLy8gZWFzZSBpbi1vdXRcclxuICAgICAgY29uc3QgbnggPSB0aGlzLmN1YmljKFxyXG4gICAgICAgIHQsXHJcbiAgICAgICAgdGhpcy5zdGFydFgsXHJcbiAgICAgICAgdGhpcy5jdHJsMVgsXHJcbiAgICAgICAgdGhpcy5jdHJsMlgsXHJcbiAgICAgICAgdGhpcy5lbmRYXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG55ID0gdGhpcy5jdWJpYyhcclxuICAgICAgICB0LFxyXG4gICAgICAgIHRoaXMuc3RhcnRZLFxyXG4gICAgICAgIHRoaXMuY3RybDFZLFxyXG4gICAgICAgIHRoaXMuY3RybDJZLFxyXG4gICAgICAgIHRoaXMuZW5kWVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNldFBvc2l0aW9uKG54LCBueSk7XHJcbiAgICAgIGlmIChyYXdUID49IDEpIHtcclxuICAgICAgICB0aGlzLnBoYXNlID0gXCJob3ZlclwiO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRBbmd1bGFyVmVsb2NpdHkoXHJcbiAgICAgICAgICB0aGlzLmNmZy5yb3RhdGlvblNwZWVkICogMC41NSAqIHRoaXMuY2ZnLmRpcmVjdGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5waGFzZSA9PT0gXCJob3ZlclwiKSB7XHJcbiAgICAgIGlmICh0aGlzLmVsYXBzZWQgPj0gdGhpcy5ob3ZlckR1cmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5waGFzZSA9IFwicmV0dXJuXCI7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcclxuICAgICAgICB0aGlzLnNldEFuZ3VsYXJWZWxvY2l0eShcclxuICAgICAgICAgIHRoaXMuY2ZnLnJvdGF0aW9uU3BlZWQgKiAxLjE1ICogdGhpcy5jZmcuZGlyZWN0aW9uXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBoYXNlID09PSBcInJldHVyblwiKSB7XHJcbiAgICAgIGlmICghdGhpcy5vd25lclNwcml0ZSB8fCAhdGhpcy5vd25lclNwcml0ZS5hY3RpdmUpIHtcclxuICAgICAgICB0aGlzLnggKz1cclxuICAgICAgICAgIHRoaXMuY2ZnLmRpcmVjdGlvbiAqICh0aGlzLmN1cnJlbnRSZXR1cm5TcGVlZCAqIChkZWx0YSAvIDEwMDApKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkeCA9IHRoaXMub3duZXJTcHJpdGUueCAtIHRoaXMueDtcclxuICAgICAgICBjb25zdCBkeSA9IHRoaXMub3duZXJTcHJpdGUueSAtIHRoaXMueTtcclxuICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KSB8fCAxO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFJldHVyblNwZWVkID0gTWF0aC5taW4oXHJcbiAgICAgICAgICB0aGlzLmNmZy5yZXR1cm5TcGVlZCxcclxuICAgICAgICAgIHRoaXMuY3VycmVudFJldHVyblNwZWVkICsgdGhpcy5yZXR1cm5BY2NlbGVyYXRpb24gKiAoZGVsdGEgLyAxMDAwKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3Qgc3BkID0gdGhpcy5jdXJyZW50UmV0dXJuU3BlZWQgKiAoZGVsdGEgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKFxyXG4gICAgICAgICAgdGhpcy54ICsgKGR4IC8gZGlzdCkgKiBzcGQsXHJcbiAgICAgICAgICB0aGlzLnkgKyAoZHkgLyBkaXN0KSAqIHNwZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGRpc3QgPCAzMCkge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLmNmZy5pc093bmVyICYmXHJcbiAgICAgICAgICAgIHRoaXMub25SZXR1cm4gJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMub25SZXR1cm4gPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vblJldHVybigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgLyogc2lsZW50ICovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZGVzdHJveVNodXJpa2VuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGdsb3cgcG9zaXRpb25cclxuICAgIGlmICh0aGlzLmdsb3cpIHtcclxuICAgICAgdGhpcy5nbG93LnggPSB0aGlzLng7XHJcbiAgICAgIHRoaXMuZ2xvdy55ID0gdGhpcy55O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvLyBlZmZlY3RzLmpzXHJcbi8vIFNoYXJlZCBsaWdodHdlaWdodCBWRlggaGVscGVycyAoZHVzdCAvIHNtb2tlIHB1ZmZzIGZvciBydW5uaW5nKVxyXG5cclxuY29uc3QgZHVzdFBvb2wgPSBbXTtcclxuY29uc3QgZHVzdFBvb2xNYXggPSAxMjA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3Bhd25EdXN0KHNjZW5lLCB4LCB5LCB0aW50ID0gMHg4ODg4ODgpIHtcclxuICBsZXQgZyA9IGR1c3RQb29sLmZpbmQoKG8pID0+ICFvLmFjdGl2ZSk7XHJcbiAgaWYgKCFnKSB7XHJcbiAgICBnID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcbiAgICBkdXN0UG9vbC5wdXNoKGcpO1xyXG4gIH1cclxuICBnLmFjdGl2ZSA9IHRydWU7XHJcbiAgZy5jbGVhcigpO1xyXG4gIGcuc2V0RGVwdGgoMSk7IC8vIGJlaGluZCBwbGF5ZXJzIChwbGF5ZXIgZGVwdGggYXNzdW1lZCA+MSBmb3IgbWFpbiBzcHJpdGUpXHJcbiAgY29uc3QgYmFzZVNpemUgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDYsIDEwKTtcclxuICBjb25zdCBhbHBoYVN0YXJ0ID0gUGhhc2VyLk1hdGguRmxvYXRCZXR3ZWVuKDAuMzUsIDAuNTUpO1xyXG4gIGNvbnN0IHB1ZmZDb2xvciA9IFBoYXNlci5EaXNwbGF5LkNvbG9yLkludGVnZXJUb0NvbG9yKHRpbnQpO1xyXG4gIC8vIE91dGVyIHNvZnQgcmluZ1xyXG4gIGcuZmlsbFN0eWxlKHB1ZmZDb2xvci5jb2xvciwgYWxwaGFTdGFydCAqIDAuNSk7XHJcbiAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplKTtcclxuICAvLyBJbm5lciBkZW5zZXIgY29yZVxyXG4gIGcuZmlsbFN0eWxlKHB1ZmZDb2xvci5jb2xvciwgYWxwaGFTdGFydCk7XHJcbiAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplICogMC41NSk7XHJcbiAgZy54ID0geCArIFBoYXNlci5NYXRoLkJldHdlZW4oLTQsIDQpO1xyXG4gIGcueSA9IHkgKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0yLCAyKTtcclxuICBjb25zdCByaXNlID0gUGhhc2VyLk1hdGguQmV0d2VlbigxMCwgMjIpO1xyXG4gIGNvbnN0IGRyaWZ0WCA9IFBoYXNlci5NYXRoLkJldHdlZW4oLTEyLCAxMik7XHJcbiAgY29uc3Qgc2NhbGVUYXJnZXQgPSBQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMS4yLCAxLjYpO1xyXG4gIGNvbnN0IGR1cmF0aW9uID0gUGhhc2VyLk1hdGguQmV0d2VlbigzODAsIDUyMCk7XHJcbiAgZy5zY2FsZSA9IDE7XHJcbiAgZy5hbHBoYSA9IGFscGhhU3RhcnQ7XHJcbiAgc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICB0YXJnZXRzOiBnLFxyXG4gICAgeDogZy54ICsgZHJpZnRYLFxyXG4gICAgeTogZy55IC0gcmlzZSxcclxuICAgIGFscGhhOiAwLFxyXG4gICAgc2NhbGU6IHNjYWxlVGFyZ2V0LFxyXG4gICAgZHVyYXRpb24sXHJcbiAgICBlYXNlOiBcIkN1YmljLmVhc2VPdXRcIixcclxuICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgZy5hbHBoYSA9IDE7XHJcbiAgICAgIGcuc2NhbGUgPSAxO1xyXG4gICAgICBnLmNsZWFyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIGlmIChkdXN0UG9vbC5sZW5ndGggPiBkdXN0UG9vbE1heCkge1xyXG4gICAgY29uc3Qgb2xkID0gZHVzdFBvb2wuZmluZCgobykgPT4gIW8uYWN0aXZlKTtcclxuICAgIGlmIChvbGQpIHtcclxuICAgICAgb2xkLmRlc3Ryb3koKTtcclxuICAgICAgY29uc3QgaWR4ID0gZHVzdFBvb2wuaW5kZXhPZihvbGQpO1xyXG4gICAgICBpZiAoaWR4ID49IDApIGR1c3RQb29sLnNwbGljZShpZHgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXdhcm1EdXN0KHNjZW5lLCBjb3VudCA9IDYpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgIHNwYXduRHVzdChzY2VuZSwgLTk5OTksIC05OTk5KTtcclxuICB9XHJcbiAgZHVzdFBvb2wuZm9yRWFjaCgoZykgPT4ge1xyXG4gICAgZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIGcuY2xlYXIoKTtcclxuICB9KTtcclxufVxyXG4iLCIvLyBvcHBsYXllci5qc1xyXG5cclxuaW1wb3J0IHsgYmFzZSwgcGxhdGZvcm0gfSBmcm9tIFwiLi9NYXBzL2x1c2h5UGVha3NcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlU3Bhd24sIGNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24gfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHNjZW5lLFxyXG4gICAgY2hhcmFjdGVyLFxyXG4gICAgdXNlcm5hbWUsXHJcbiAgICB0ZWFtLFxyXG4gICAgc3Bhd25QbGF0Zm9ybSxcclxuICAgIHNwYXduLFxyXG4gICAgcGxheWVyc0luVGVhbSxcclxuICAgIG1hcFxyXG4gICkge1xyXG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICB0aGlzLnRlYW0gPSB0ZWFtO1xyXG4gICAgdGhpcy5zcGF3blBsYXRmb3JtID0gc3Bhd25QbGF0Zm9ybTtcclxuICAgIHRoaXMuc3Bhd24gPSBzcGF3bjtcclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gICAgdGhpcy5tYXBPYmplY3RzO1xyXG4gICAgdGhpcy5wbGF5ZXJzSW5UZWFtID0gcGxheWVyc0luVGVhbTtcclxuICAgIHRoaXMub3BNYXhIZWFsdGggPSA4MDAwO1xyXG4gICAgdGhpcy5vcEN1cnJlbnRIZWFsdGggPSA4MDAwO1xyXG4gICAgdGhpcy5vcEhlYWx0aEJhcldpZHRoID0gNjA7XHJcbiAgICB0aGlzLmNyZWF0ZU9wUGxheWVyKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVPcFBsYXllcigpIHtcclxuICAgIC8vIENyZWF0ZXMgdGhlIHNwcml0ZVxyXG4gICAgdGhpcy5vcHBvbmVudCA9IHRoaXMuc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKC0xMDAsIC0xMDAsIFwic3ByaXRlXCIpO1xyXG4gICAgdGhpcy5vcHBvbmVudC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gICAgdGhpcy5vcHBvbmVudC5hbmltcy5wbGF5KFwiaWRsZVwiLCB0cnVlKTtcclxuXHJcbiAgICAvLyBTZXRzIHNwYXduc1xyXG4gICAgaWYgKHRoaXMuc3Bhd25QbGF0Zm9ybSA9PT0gXCJib3R0b21cIikge1xyXG4gICAgICBpZiAodGhpcy5tYXAgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlU3Bhd24oYmFzZSwgdGhpcy5zcGF3biwgdGhpcy5vcHBvbmVudCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXAgPT09IFwiMlwiKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlTWFuZ3JvdmVTcGF3bihcImJvdHRvbVwiLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNwYXduUGxhdGZvcm0gPT09IFwidG9wXCIpIHtcclxuICAgICAgaWYgKHRoaXMubWFwID09PSBcIjFcIikge1xyXG4gICAgICAgIGNhbGN1bGF0ZVNwYXduKHBsYXRmb3JtLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcCA9PT0gXCIyXCIpIHtcclxuICAgICAgICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKFwidG9wXCIsIHRoaXMuc3Bhd24sIHRoaXMub3Bwb25lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhbmdlcyBmcmFtZSBzaXplIHRvIHByZXZlbnQgd2FsbCBjbGlwcGluZ1xyXG4gICAgdGhpcy5vcEZyYW1lID0gdGhpcy5vcHBvbmVudC5mcmFtZTtcclxuICAgIHRoaXMub3Bwb25lbnQuYm9keS5zZXRTaXplKFxyXG4gICAgICB0aGlzLm9wRnJhbWUud2lkdGggLSAzNSxcclxuICAgICAgdGhpcy5vcEZyYW1lLndpZHRoIC0gMTBcclxuICAgICk7XHJcbiAgICB0aGlzLm9wcG9uZW50LmJvZHkuc2V0T2Zmc2V0KHRoaXMub3Bwb25lbnQuYm9keS53aWR0aCAvIDIsIDEwKTtcclxuXHJcbiAgICAvLyBTZXRzIHRoZSB0ZXh0IG9mIHRoZSBuYW1lIHRvIHVzZXJuYW1lXHJcbiAgICB0aGlzLm9wUGxheWVyTmFtZSA9IHRoaXMuc2NlbmUuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMub3Bwb25lbnQueCxcclxuICAgICAgdGhpcy5vcHBvbmVudC55IC0gdGhpcy5vcHBvbmVudC5oZWlnaHQgKyAxMCxcclxuICAgICAgdGhpcy51c2VybmFtZVxyXG4gICAgKTtcclxuICAgIHRoaXMub3BQbGF5ZXJOYW1lLnNldFN0eWxlKHtcclxuICAgICAgZm9udDogXCJib2xkIDhwdCBBcmlhbFwiLFxyXG4gICAgICBmaWxsOiBcIiMwMDAwMDBcIixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vcFBsYXllck5hbWUuc2V0T3JpZ2luKDAuNSwgMCk7XHJcblxyXG4gICAgdGhpcy5vcEhlYWx0aFRleHQgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KDAsIDAsIFwiXCIsIHtcclxuICAgICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG4gICAgICBmb250U2l6ZTogXCIxMHB4XCIsXHJcbiAgICAgIGNvbG9yOiBcIiNGRkZGRkZcIixcclxuICAgICAgc3Ryb2tlOiBcIiMwMDAwMDBcIixcclxuICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA0LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vcEhlYWx0aEJhciA9IHRoaXMuc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGx5IHVwZGF0ZXMgaGVhbHRoIGJhclxyXG4gICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoKTtcclxuXHJcbiAgICAvLyBMaXN0ZW4gZm9yIGhlYWx0aCB1cGRhdGVzIGZvciB0aGlzIG9wcG9uZW50XHJcbiAgICBzb2NrZXQub24oXCJoZWFsdGgtdXBkYXRlXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIC8vIGRhdGE6IHsgdXNlcm5hbWUsIGhlYWx0aCwgZ2FtZUlkIH1cclxuICAgICAgaWYgKGRhdGEudXNlcm5hbWUgPT09IHRoaXMudXNlcm5hbWUpIHtcclxuICAgICAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IGRhdGEuaGVhbHRoO1xyXG4gICAgICAgIGlmICh0aGlzLm9wQ3VycmVudEhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IDA7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcih0cnVlKTsgLy8gc2hvdyBkZWFkIHN0eWxpbmcgJiAwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhlYWx0aEJhcihkZWFkID0gZmFsc2UsIGhlYWx0aEJhclkgPSAwKSB7XHJcbiAgICBpZiAodGhpcy5vcEN1cnJlbnRIZWFsdGggPCAwKSB7XHJcbiAgICAgIC8vIFByZXZlbnRzIGhlYWx0aCBmcm9tIGdvaW5nIG5lZ2F0aXZlXHJcbiAgICAgIHRoaXMub3BDdXJyZW50SGVhbHRoID0gMDtcclxuICAgIH1cclxuICAgIC8vIFNldHMgcGVyY2VudGFnZSBvZiBoZWFsdGhcclxuICAgIGNvbnN0IGhlYWx0aFBlcmNlbnRhZ2UgPSB0aGlzLm9wQ3VycmVudEhlYWx0aCAvIHRoaXMub3BNYXhIZWFsdGg7XHJcbiAgICBjb25zdCBkaXNwbGF5ZWRXaWR0aCA9IHRoaXMub3BIZWFsdGhCYXJXaWR0aCAqIGhlYWx0aFBlcmNlbnRhZ2U7XHJcblxyXG4gICAgLy8gQ2xlYXJzIHByZXZpb3VzIGhlYWx0aCBiYXIgZ3JhcGhpY3NcclxuICAgIHRoaXMub3BIZWFsdGhCYXIuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBTZXRzIHggaW4gdGhlIGNlbnRlclxyXG4gICAgY29uc3QgaGVhbHRoQmFyWCA9IHRoaXMub3Bwb25lbnQueCAtIHRoaXMub3BIZWFsdGhCYXJXaWR0aCAvIDI7XHJcbiAgICAvLyBJZiBwbGF5ZXIgaXMgZGVhZCwgc2V0cyB0aGUgeSB2YWx1ZSBsb3dlclxyXG4gICAgaWYgKGRlYWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIGhlYWx0aEJhclkgPSB0aGlzLm9wcG9uZW50LnkgLSAodGhpcy5vcHBvbmVudC5oZWlnaHQgLyAyICsgNCk7XHJcbiAgICAgIHRoaXMub3BIZWFsdGhUZXh0LnNldFRleHQoYCR7dGhpcy5vcEN1cnJlbnRIZWFsdGh9YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBQb3NpdGlvbiBsb3dlciB3aGVuIGRlYWQgKHNhbWUgb2Zmc2V0IGxvZ2ljIGFzIGxvY2FsIHBsYXllcilcclxuICAgICAgaGVhbHRoQmFyWSA9IHRoaXMub3Bwb25lbnQueSAtICh0aGlzLm9wcG9uZW50LmhlaWdodCAvIDIgLSAyNCk7XHJcbiAgICAgIHRoaXMub3BIZWFsdGhUZXh0LnNldFRleHQoYDBgKTtcclxuICAgIH1cclxuICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFN0eWxlKDB4NTk1OTU5KTtcclxuICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgdGhpcy5vcEhlYWx0aEJhcldpZHRoLCA5KTtcclxuXHJcbiAgICAvLyBDcmVhdGVzIGEgYmxhY2sgYm9yZGVyIGFyb3VuZCBoZWFsdGhiYXJcclxuICAgIHRoaXMub3BIZWFsdGhCYXIubGluZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICAgIHRoaXMub3BIZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoXHJcbiAgICAgIGhlYWx0aEJhclgsXHJcbiAgICAgIGhlYWx0aEJhclksXHJcbiAgICAgIHRoaXMub3BIZWFsdGhCYXJXaWR0aCxcclxuICAgICAgOSxcclxuICAgICAgM1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy50ZWFtID09PSBcInVzZXJcIikge1xyXG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweDJlODhjYSk7IC8vIGJsdWUgY29sb3IgZm9yIHVzZXIgdGVhbVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcEhlYWx0aEJhci5maWxsU3R5bGUoMHhiYjVjMzkpOyAvLyByZWQgY29sb3IgZm9yIG9wIHRlYW1cclxuICAgIH1cclxuICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFJvdW5kZWRSZWN0KFxyXG4gICAgICBoZWFsdGhCYXJYLFxyXG4gICAgICBoZWFsdGhCYXJZLFxyXG4gICAgICBkaXNwbGF5ZWRXaWR0aCxcclxuICAgICAgOSxcclxuICAgICAgM1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRQb3NpdGlvbihcclxuICAgICAgdGhpcy5vcHBvbmVudC54IC0gdGhpcy5vcEhlYWx0aFRleHQud2lkdGggLyAyLFxyXG4gICAgICBoZWFsdGhCYXJZIC0gOFxyXG4gICAgKTtcclxuICAgIHRoaXMub3BIZWFsdGhUZXh0LnNldERlcHRoKDIpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBwbGF5ZXIuanNcclxuLy8gTk9URTogUmVmYWN0b3JlZCB0byByZW1vdmUgY2lyY3VsYXIgZGVwZW5kZW5jeSBvbiBnYW1lLmpzLlxyXG4vLyBzb2NrZXQgbm93IGNvbWVzIGZyb20gc3RhbmRhbG9uZSBzb2NrZXQuanMgYW5kIG9wcG9uZW50UGxheWVycyBhcmUgcGFzc2VkIGludG8gY3JlYXRlUGxheWVyLlxyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xyXG5mdW5jdGlvbiBwZGJnKCkge1xyXG4gIC8qIGxvZ2dpbmcgZGlzYWJsZWQgKi9cclxufVxyXG5pbXBvcnQgeyBsdXNoeVBlYWtzT2JqZWN0cywgYmFzZSwgcGxhdGZvcm0gfSBmcm9tIFwiLi9NYXBzL2x1c2h5UGVha3NcIjtcclxuaW1wb3J0IHtcclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMsXHJcbiAgdGlueVBsYXRmb3JtMSxcclxuICB0aW55UGxhdGZvcm0yLFxyXG4gIHRpbnlQbGF0Zm9ybTMsXHJcbiAgdGlueVBsYXRmb3JtNCxcclxuICB0aW55UGxhdGZvcm01LFxyXG4gIHRpbnlQbGF0Zm9ybTYsXHJcbn0gZnJvbSBcIi4vTWFwcy9tYW5ncm92ZU1lYWRvd1wiO1xyXG5pbXBvcnQgeyBuaW5qYUFuaW1hdGlvbnMgfSBmcm9tIFwiLi9BbmltYXRpb25zL25pbmphXCI7XHJcbmltcG9ydCBSZXR1cm5pbmdTaHVyaWtlbiBmcm9tIFwiLi9SZXR1cm5pbmdTaHVyaWtlblwiO1xyXG5pbXBvcnQgeyBzcGF3bkR1c3QgfSBmcm9tIFwiLi9lZmZlY3RzXCI7XHJcbi8vIEdsb2JhbHNcclxubGV0IHBsYXllcjtcclxubGV0IGN1cnNvcnM7XHJcbmxldCBjYW5XYWxsSnVtcCA9IHRydWU7XHJcbmxldCBpc01vdmluZyA9IGZhbHNlO1xyXG5sZXQgaXNKdW1waW5nID0gZmFsc2U7XHJcbmxldCBpc0F0dGFja2luZyA9IGZhbHNlO1xyXG5sZXQgY2FuQXR0YWNrID0gdHJ1ZTtcclxuXHJcbmxldCBmcmFtZTtcclxuXHJcbmxldCBtYXhIZWFsdGggPSA4MDAwO1xyXG5sZXQgY3VycmVudEhlYWx0aCA9IDgwMDA7IC8vIENsaWVudC1zaWRlIGNvcHkgKGRpc3BsYXkgb25seSlcclxubGV0IGRlYWQgPSBmYWxzZTtcclxuXHJcbmxldCBoZWFsdGhCYXJXaWR0aCA9IDYwO1xyXG5sZXQgaGVhbHRoQmFyO1xyXG5sZXQgaGVhbHRoVGV4dDtcclxuLy8gQW1tby9Db29sZG93biBiYXIgKGNsaWVudC1zaWRlIG9ubHkpXHJcbmxldCBhbW1vQmFyOyAvLyBncmFwaGljc1xyXG5sZXQgYW1tb0JhckJhY2s7IC8vIGJhY2tncm91bmQgZ3JhcGhpY3NcclxubGV0IGFtbW9CYXJXaWR0aCA9IDYwO1xyXG5sZXQgYW1tb0Nvb2xkb3duTXMgPSAxMjAwOyAvLyAyc1xyXG5sZXQgYW1tb0VsYXBzZWQgPSAwOyAvLyB0aW1lIHNpbmNlIGxhc3Qgc2hvdCAobXMpXHJcbmxldCBhbW1vUmVhZHkgPSB0cnVlO1xyXG5sZXQgYW1tb1R3ZWVuOyAvLyBhY3RpdmUgdHdlZW4gcmVmZXJlbmNlIGZvciBzbW9vdGggZmlsbFxyXG5cclxubGV0IHBsYXllck5hbWU7XHJcblxyXG5sZXQgaW5kaWNhdG9yVHJpYW5nbGU7XHJcblxyXG5sZXQgdXNlcm5hbWU7XHJcbmxldCBnYW1lSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKS5wb3AoKTtcclxuXHJcbmxldCBzY2VuZTtcclxuXHJcbmxldCBzcGF3bjtcclxubGV0IHBsYXllcnNJblRlYW07XHJcbmxldCBzcGF3blBsYXRmb3JtO1xyXG5sZXQgbWFwT2JqZWN0cztcclxubGV0IG1hcDtcclxubGV0IG9wcG9uZW50UGxheWVyc1JlZjsgLy8gaW5qZWN0ZWQgZnJvbSBnYW1lLmpzIHRvIGF2b2lkIGNpcmN1bGFyIGltcG9ydFxyXG5sZXQgZmlyZVRyYWlsVGltZXIgPSAwO1xyXG5sZXQgZmlyZVRyYWlsSW50ZXJ2YWwgPSA0NTsgLy8gbXNcclxuY29uc3QgZmlyZVBvb2wgPSBbXTtcclxuY29uc3QgZmlyZVBvb2xNYXggPSA2MDtcclxubGV0IGR1c3RUaW1lciA9IDA7XHJcbmNvbnN0IGR1c3RJbnRlcnZhbCA9IDcwOyAvLyBtcyBiZXR3ZWVuIGR1c3QgcHVmZnMgd2hlbiBydW5uaW5nXHJcbmZ1bmN0aW9uIHNwYXduRmlyZUZsYW1lKHNjZW5lLCB4LCB5KSB7XHJcbiAgLy8gUmV1c2Ugc21hbGwgZ3JhcGhpY3Mgb2JqZWN0cyBpbnN0ZWFkIG9mIGNyZWF0aW5nIHJlY3RhbmdsZXMgZWFjaCB0aW1lXHJcbiAgbGV0IGcgPSBmaXJlUG9vbC5maW5kKChvKSA9PiAhby5hY3RpdmUpO1xyXG4gIGlmICghZykge1xyXG4gICAgZyA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gICAgZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgZmlyZVBvb2wucHVzaChnKTtcclxuICB9XHJcbiAgZy5jbGVhcigpO1xyXG4gIGcuYWN0aXZlID0gdHJ1ZTtcclxuICBnLnNldERlcHRoKDApOyAvLyBiZWhpbmQgcGxheWVyIChwbGF5ZXIgZGVwdGggYXNzdW1lZCA+MClcclxuICBjb25zdCBiYXNlU2l6ZSA9IFBoYXNlci5NYXRoLkJldHdlZW4oNSwgOSk7XHJcbiAgLy8gRHJhdyBvdXRlciBnbG93IChyZWQpXHJcbiAgZy5maWxsU3R5bGUoMHhmZjNjMDAsIDAuMzUpO1xyXG4gIGcuZmlsbENpcmNsZSgwLCAwLCBiYXNlU2l6ZSk7XHJcbiAgLy8gTWlkIGxheWVyIChvcmFuZ2UpXHJcbiAgZy5maWxsU3R5bGUoMHhmZjg4MDAsIDAuNTUpO1xyXG4gIGcuZmlsbENpcmNsZSgwLCAwLCBiYXNlU2l6ZSAqIDAuNjUpO1xyXG4gIC8vIENvcmUgKHllbGxvdy93aGl0ZSlcclxuICBnLmZpbGxTdHlsZShcclxuICAgIFBoYXNlci5EaXNwbGF5LkNvbG9yLkdldENvbG9yKDI1NSwgUGhhc2VyLk1hdGguQmV0d2VlbigyMDAsIDIzMCksIDgwKSxcclxuICAgIDAuOVxyXG4gICk7XHJcbiAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplICogMC4zNSk7XHJcbiAgZy54ID0geCArIFBoYXNlci5NYXRoLkJldHdlZW4oLTMsIDMpO1xyXG4gIGcueSA9IHkgKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0zLCAzKTtcclxuICBjb25zdCBkcmlmdFggPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0xMiwgMTIpO1xyXG4gIGNvbnN0IGRyaWZ0WSA9IFBoYXNlci5NYXRoLkJldHdlZW4oLTE4LCAtNCk7XHJcbiAgY29uc3Qgc2NhbGVUYXJnZXQgPSBQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC4xNSwgMC4zNSk7XHJcbiAgY29uc3QgZHVyYXRpb24gPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDI2MCwgNDIwKTtcclxuICBnLnNjYWxlID0gMTtcclxuICBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgIHRhcmdldHM6IGcsXHJcbiAgICB4OiBnLnggKyBkcmlmdFgsXHJcbiAgICB5OiBnLnkgKyBkcmlmdFksXHJcbiAgICBzY2FsZTogc2NhbGVUYXJnZXQsXHJcbiAgICBhbHBoYTogMCxcclxuICAgIGR1cmF0aW9uLFxyXG4gICAgZWFzZTogXCJDdWJpYy5lYXNlT3V0XCIsXHJcbiAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgIGcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIGcuYWxwaGEgPSAxO1xyXG4gICAgICBnLnNjYWxlID0gMTtcclxuICAgICAgZy5jbGVhcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuICAvLyBDYXAgcG9vbCBzaXplXHJcbiAgaWYgKGZpcmVQb29sLmxlbmd0aCA+IGZpcmVQb29sTWF4KSB7XHJcbiAgICBjb25zdCBvbGQgPSBmaXJlUG9vbC5maW5kKChvKSA9PiAhby5hY3RpdmUpO1xyXG4gICAgaWYgKG9sZCkge1xyXG4gICAgICBvbGQuZGVzdHJveSgpO1xyXG4gICAgICBjb25zdCBpZHggPSBmaXJlUG9vbC5pbmRleE9mKG9sZCk7XHJcbiAgICAgIGlmIChpZHggPj0gMCkgZmlyZVBvb2wuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcmVhdGUgcGxheWVyIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoXHJcbiAgc2NlbmVQYXJhbSxcclxuICBuYW1lLFxyXG4gIGNoYXJhY3RlcixcclxuICBzcGF3blBsYXRmb3JtUGFyYW0sXHJcbiAgc3Bhd25QYXJhbSxcclxuICBwbGF5ZXJzSW5UZWFtUGFyYW0sXHJcbiAgbWFwUGFyYW0sXHJcbiAgb3Bwb25lbnRQbGF5ZXJzUGFyYW1cclxuKSB7XHJcbiAgdXNlcm5hbWUgPSBuYW1lO1xyXG4gIHNjZW5lID0gc2NlbmVQYXJhbTtcclxuICBzcGF3biA9IHNwYXduUGFyYW07XHJcbiAgcGxheWVyc0luVGVhbSA9IHBsYXllcnNJblRlYW1QYXJhbTtcclxuICBzcGF3blBsYXRmb3JtID0gc3Bhd25QbGF0Zm9ybVBhcmFtO1xyXG4gIG1hcCA9IG1hcFBhcmFtO1xyXG4gIG9wcG9uZW50UGxheWVyc1JlZiA9IG9wcG9uZW50UGxheWVyc1BhcmFtO1xyXG4gIHBkYmcoKTtcclxuICBjdXJzb3JzID0gc2NlbmUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG5cclxuICBpZiAoY2hhcmFjdGVyID09PSBcIk5pbmphXCIpIHtcclxuICAgIG5pbmphQW5pbWF0aW9ucyhzY2VuZSk7XHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgcGxheWVyIHNwcml0ZSEhXHJcbiAgcGxheWVyID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKC0xMDAsIC0xMDAsIFwic3ByaXRlXCIpO1xyXG4gIHBsYXllci5hbmltcy5wbGF5KFwiaWRsZVwiLCB0cnVlKTsgLy8gUGxheSBpZGxlIGFuaW1hdGlvblxyXG4gIHBkYmcoKTtcclxuXHJcbiAgLy8gTGlzdGVuZXIgdG8gZGV0ZWN0IGlmIHBsYXllciBsZWF2ZXMgdGhlIHdvcmxkIGJvdW5kc1xyXG4gIHNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCAoKSA9PiB7XHJcbiAgICBpZiAocGxheWVyLnkgPiBzY2VuZS5waHlzaWNzLndvcmxkLmJvdW5kcy5ib3R0b20gKyA1MCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBSZXF1ZXN0IGEgc3VpY2lkZSBpZiBwbGF5ZXIgZmFsbHMgb3V0ICh0cmVhdCBhcyBzZWxmLWhpdCB0byA5OTk5OSlcclxuICAgICAgICBpZiAoIWRlYWQpIHtcclxuICAgICAgICAgIHNvY2tldC5lbWl0KFwiaGl0XCIsIHtcclxuICAgICAgICAgICAgYXR0YWNrZXI6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICBkYW1hZ2U6IDk5OTk5LFxyXG4gICAgICAgICAgICBnYW1lSWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHBkYmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIE1hcFxyXG4gIGlmIChtYXAgPT09IFwiMVwiKSB7XHJcbiAgICBtYXBPYmplY3RzID0gbHVzaHlQZWFrc09iamVjdHM7XHJcbiAgfSBlbHNlIGlmIChtYXAgPT09IFwiMlwiKSB7XHJcbiAgICBtYXBPYmplY3RzID0gbWFuZ3JvdmVNZWFkb3dPYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0cyBzcGF3biBiYXNlZCBvbiBzZXNzaW9uIHN0b3JhZ2UgZGF0YVxyXG4gIGlmIChzcGF3blBsYXRmb3JtID09PSBcImJvdHRvbVwiKSB7XHJcbiAgICBpZiAobWFwID09PSBcIjFcIikge1xyXG4gICAgICBjYWxjdWxhdGVTcGF3bihiYXNlLCBzcGF3biwgcGxheWVyKTtcclxuICAgIH0gZWxzZSBpZiAobWFwID09PSBcIjJcIikge1xyXG4gICAgICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKFwiYm90dG9tXCIsIHNwYXduLCBwbGF5ZXIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoc3Bhd25QbGF0Zm9ybSA9PT0gXCJ0b3BcIikge1xyXG4gICAgaWYgKG1hcCA9PT0gXCIxXCIpIHtcclxuICAgICAgY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHNwYXduLCBwbGF5ZXIpO1xyXG4gICAgfSBlbHNlIGlmIChtYXAgPT09IFwiMlwiKSB7XHJcbiAgICAgIGNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24oXCJ0b3BcIiwgc3Bhd24sIHBsYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBDaGFuZ2VzIHNpemUgb2YgcGxheWVyIGZyYW1lIHNvIGl0IGNhbid0IGNsaXAuIFRoZXJlIGFyZSBzb21lIGlzc3VlcyB3aGVyZSB0aGUgZnJhbWUgY2hhbmdlcyB0byBmaXQgdGhlIGFuaW1hdGlvbiBzaXplIHNvIHRoaXMgbXVzdCBiZSBkb25lIHRvIHByZXZlbnQgdGhhdC5cclxuICBmcmFtZSA9IHBsYXllci5mcmFtZTtcclxuICBwbGF5ZXIuYm9keS5zZXRTaXplKGZyYW1lLndpZHRoIC0gMzUsIGZyYW1lLndpZHRoIC0gMTApO1xyXG4gIHBsYXllci5ib2R5LnNldE9mZnNldChwbGF5ZXIuYm9keS53aWR0aCAvIDIsIDEwKTtcclxuXHJcbiAgLy8gUGxheWVyIG5hbWUgdGV4dFxyXG4gIHBsYXllck5hbWUgPSBzY2VuZS5hZGQudGV4dChcclxuICAgIHBsYXllci54LFxyXG4gICAgcGxheWVyLnkgLSBwbGF5ZXIuaGVpZ2h0ICsgMTAsXHJcbiAgICB1c2VybmFtZVxyXG4gICk7XHJcbiAgcGxheWVyTmFtZS5zZXRTdHlsZSh7XHJcbiAgICBmb250OiBcImJvbGQgOHB0IEFyaWFsXCIsXHJcbiAgICBmaWxsOiBcIiMwMDAwMDBcIixcclxuICB9KTtcclxuICBwbGF5ZXJOYW1lLnNldE9yaWdpbigwLjUsIDApO1xyXG5cclxuICAvLyBIZWFsdGggdGV4dFxyXG4gIGhlYWx0aFRleHQgPSBzY2VuZS5hZGQudGV4dCgwLCAwLCBcIlwiLCB7XHJcbiAgICBmb250RmFtaWx5OiBcIkFyaWFsXCIsXHJcbiAgICBmb250U2l6ZTogXCIxMHB4XCIsXHJcbiAgICBjb2xvcjogXCIjRkZGRkZGXCIsIC8vIFdoaXRlXHJcbiAgICBzdHJva2U6IFwiIzAwMDAwMFwiLCAvLyBCbGFja1xyXG4gICAgc3Ryb2tlVGhpY2tuZXNzOiA0LFxyXG4gIH0pO1xyXG5cclxuICAvLyBIZWFsdGggYmFyXHJcbiAgaGVhbHRoQmFyID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcbiAgLy8gQW1tbyBiYXIgYmFja2dyb3VuZCAmIGZpbGwgKHJlbmRlciBvcmRlcjogYmFja2dyb3VuZCwgZmlsbClcclxuICBhbW1vQmFyQmFjayA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gIGFtbW9CYXIgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuXHJcbiAgLy8gVHJpYW5nbGUgdG8gc2hvdyB3aGljaCBvbmUgaXMgdGhlIHVzZXIuIERpc3NhcGVhcnMgd2hlbiB0aGUgcGxheWVyIG1vdmVzXHJcbiAgaW5kaWNhdG9yVHJpYW5nbGUgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuXHJcbiAgY29uc3QgdHJpYW5nbGUgPSBuZXcgUGhhc2VyLkdlb20uVHJpYW5nbGUoXHJcbiAgICBwbGF5ZXIueCxcclxuICAgIHBsYXllci55IC0gNjIsIC8vIFRvcCBwb2ludFxyXG4gICAgcGxheWVyLnggLSAxMyxcclxuICAgIHBsYXllci55IC0gNzIsIC8vIExlZnQgcG9pbnRcclxuICAgIHBsYXllci54ICsgMTMsXHJcbiAgICBwbGF5ZXIueSAtIDcyIC8vIFJpZ2h0IHBvaW50XHJcbiAgKTtcclxuICBpbmRpY2F0b3JUcmlhbmdsZS5maWxsU3R5bGUoMHg5OWFiMmMpOyAvLyBHcmVlbiBjb2xvclxyXG4gIGluZGljYXRvclRyaWFuZ2xlLmZpbGxUcmlhbmdsZVNoYXBlKHRyaWFuZ2xlKTtcclxuXHJcbiAgLy8gV2hlbiB0aGUgdXNlciB0YXBzLCBpdCBzaG9vdHNcclxuICBzY2VuZS5pbnB1dC5vbihcInBvaW50ZXJkb3duXCIsIGZ1bmN0aW9uIChwb2ludGVyKSB7XHJcbiAgICAvLyBJZiBhdHRhY2sgY29vbGRvd24gaXMgZmluaXNoZWRcclxuICAgIGlmIChhbW1vUmVhZHkgJiYgY2FuQXR0YWNrKSB7XHJcbiAgICAgIGlzQXR0YWNraW5nID0gdHJ1ZTsgLy8gU2V0cyB2YXJpYWJsZSBmb3IgYW5pbWF0aW9uXHJcbiAgICAgIGNhbkF0dGFjayA9IGZhbHNlOyAvLyBTZXRzIGF0dGFjayBjb29sZG93biB2YXJpYWJsZVxyXG5cclxuICAgICAgLy8gU3RhcnQgY29vbGRvd24gKHdpbGwgaW5zdGFudGx5IHJlZmlsbCBpZiBwcm9qZWN0aWxlIHJldHVybnMgZWFybHkpXHJcbiAgICAgIGFtbW9SZWFkeSA9IGZhbHNlO1xyXG4gICAgICBhbW1vRWxhcHNlZCA9IDA7XHJcbiAgICAgIGlmIChhbW1vVHdlZW4pIHtcclxuICAgICAgICBhbW1vVHdlZW4ucmVtb3ZlKCk7XHJcbiAgICAgICAgYW1tb1R3ZWVuID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICAvLyBUd2VlbiB0aGF0IHZpc3VhbGx5IGZpbGxzIGFtbW8gYmFyIG92ZXIgY29vbGRvd25cclxuICAgICAgY29uc3QgdHdlZW5Qcm94eSA9IHsgdDogMCB9O1xyXG4gICAgICBhbW1vVHdlZW4gPSBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICB0YXJnZXRzOiB0d2VlblByb3h5LFxyXG4gICAgICAgIHQ6IDEsXHJcbiAgICAgICAgZHVyYXRpb246IGFtbW9Db29sZG93bk1zLFxyXG4gICAgICAgIGVhc2U6IFwiTGluZWFyXCIsXHJcbiAgICAgICAgb25VcGRhdGU6ICgpID0+IHtcclxuICAgICAgICAgIGFtbW9FbGFwc2VkID0gdHdlZW5Qcm94eS50ICogYW1tb0Nvb2xkb3duTXM7XHJcbiAgICAgICAgICBkcmF3QW1tb0JhcigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgYW1tb0VsYXBzZWQgPSBhbW1vQ29vbGRvd25NcztcclxuICAgICAgICAgIGFtbW9SZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICBjYW5BdHRhY2sgPSB0cnVlOyAvLyBhdHRhY2sga2V5IGdhdGluZ1xyXG4gICAgICAgICAgZHJhd0FtbW9CYXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlzQXR0YWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gY2FuQXR0YWNrIGJlY29tZXMgdHJ1ZSBvbmx5IHdoZW4gY29vbGRvd24gY29tcGxldGVzIG9yIHByb2plY3RpbGUgcmV0dXJuc1xyXG4gICAgICB9LCAzMDApOyAvLyBBZnRlciAzMDAgbWlsaXNlY29uZHMsIHRoZSB1c2VyIGNhbiBhdHRhY2sgYWdhaW5cclxuXHJcbiAgICAgIC8vIFBsYXkgdGhlIHNvdW5kXHJcbiAgICAgIGxldCBzaHVyaWtlblNvdW5kID0gc2NlbmUuc291bmQuYWRkKFwic2h1cmlrZW5UaHJvd1wiKTtcclxuICAgICAgc2h1cmlrZW5Tb3VuZC5zZXRWb2x1bWUoMC4xKTtcclxuXHJcbiAgICAgIHNodXJpa2VuU291bmQuc2V0UmF0ZSgxLjMpOyAvLyBDaGFuZ2UgcGl0Y2hcclxuICAgICAgc2h1cmlrZW5Tb3VuZC5wbGF5KCk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgdXNlciBoYXMgbmluamEgY2hhcmFjdGVyLCBpdCB0aHJvd3MgYSBzaHVyaWtlblxyXG4gICAgICBpZiAoY2hhcmFjdGVyID09PSBcIk5pbmphXCIpIHtcclxuICAgICAgICBwbGF5ZXIuYW5pbXMucGxheShcInRocm93XCIsIHRydWUpOyAvLyBQbGF5IHRocm93aW5nIGFuaW1hdGlvblxyXG5cclxuICAgICAgICAvLyBOZXcgcmV0dXJuaW5nIHNodXJpa2VuIHByb2plY3RpbGVcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBwbGF5ZXIuZmxpcFggPyAtMSA6IDE7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICAgICAgdXNlcm5hbWUsXHJcbiAgICAgICAgICBnYW1lSWQsXHJcbiAgICAgICAgICBpc093bmVyOiB0cnVlLFxyXG4gICAgICAgICAgZGFtYWdlOiAxMDAwLFxyXG4gICAgICAgICAgcm90YXRpb25TcGVlZDogMjAwMCxcclxuICAgICAgICAgIGZvcndhcmREaXN0YW5jZTogNTAwLFxyXG4gICAgICAgICAgYXJjSGVpZ2h0OiAxNjAsXHJcbiAgICAgICAgICBvdXR3YXJkRHVyYXRpb246IDM4MCxcclxuICAgICAgICAgIHJldHVyblNwZWVkOiA5MDAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXR1cm5pbmcgPSBuZXcgUmV0dXJuaW5nU2h1cmlrZW4oXHJcbiAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgIHsgeDogcGxheWVyLngsIHk6IHBsYXllci55IH0sXHJcbiAgICAgICAgICBwbGF5ZXIsXHJcbiAgICAgICAgICBjb25maWdcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIEluc3RhbnQgY29vbGRvd24gcmVmaWxsIG9uIHJldHVybiAoZWFybHkgcmV0cmlldmFsIG1lY2hhbmljKVxyXG4gICAgICAgIHJldHVybmluZy5vblJldHVybiA9ICgpID0+IHtcclxuICAgICAgICAgIC8vIFNraXAgaWYgYWxyZWFkeSByZWFkeVxyXG4gICAgICAgICAgaWYgKGFtbW9SZWFkeSkgcmV0dXJuO1xyXG4gICAgICAgICAgYW1tb0VsYXBzZWQgPSBhbW1vQ29vbGRvd25NcztcclxuICAgICAgICAgIGFtbW9SZWFkeSA9IHRydWU7XHJcbiAgICAgICAgICBjYW5BdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKGFtbW9Ud2Vlbikge1xyXG4gICAgICAgICAgICBhbW1vVHdlZW4ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGFtbW9Ud2VlbiA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkcmF3QW1tb0JhcigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE92ZXJsYXBzOiBlbmVtaWVzICYgbWFwIG9iamVjdHNcclxuICAgICAgICBjb25zdCBlbmVteUxpc3QgPSBbXTtcclxuICAgICAgICBpZiAob3Bwb25lbnRQbGF5ZXJzUmVmKSB7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHBsYXllcklkIGluIG9wcG9uZW50UGxheWVyc1JlZikge1xyXG4gICAgICAgICAgICBlbmVteUxpc3QucHVzaChvcHBvbmVudFBsYXllcnNSZWZbcGxheWVySWRdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuaW5nLmF0dGFjaEVuZW15T3ZlcmxhcChlbmVteUxpc3QpO1xyXG4gICAgICAgIC8vIE1hcCBvYmplY3RzIGNhdXNlIGRlc3Ryb3kgb25seSBkdXJpbmcgb3V0d2FyZC9ob3ZlciAoaGFuZGxlZCBpbnRlcm5hbGx5KVxyXG4gICAgICAgIHJldHVybmluZy5hdHRhY2hNYXBPdmVybGFwKG1hcE9iamVjdHMpO1xyXG5cclxuICAgICAgICAvLyBFbWl0IGZvciByZW1vdGUgY2xpZW50cyAodGhleSB3aWxsIHNwYXduIGEgdmlzdWFsIGNvcHkgZm9sbG93aW5nIGNsYXNzaWMgc3RyYWlnaHQgbGluZSBmYWxsYmFjayBmb3Igbm93KVxyXG4gICAgICAgIHNvY2tldC5lbWl0KFwiYXR0YWNrXCIsIHtcclxuICAgICAgICAgIHg6IHBsYXllci54LFxyXG4gICAgICAgICAgeTogcGxheWVyLnksXHJcbiAgICAgICAgICB3ZWFwb246IFwic2h1cmlrZW5cIixcclxuICAgICAgICAgIHNjYWxlOiBjb25maWcuc2NhbGUgfHwgMC4xLFxyXG4gICAgICAgICAgZGFtYWdlOiBjb25maWcuZGFtYWdlLFxyXG4gICAgICAgICAgbmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICByZXR1cm5pbmc6IHRydWUsXHJcbiAgICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgICAvLyBzZW5kIHRpbWluZyBwYXJhbXMgc28gcmVtb3RlIGNhbiBkZXRlcm1pbmlzdGljYWxseSBzaW11bGF0ZVxyXG4gICAgICAgICAgZm9yd2FyZERpc3RhbmNlOiBjb25maWcuZm9yd2FyZERpc3RhbmNlLFxyXG4gICAgICAgICAgb3V0d2FyZER1cmF0aW9uOiBjb25maWcub3V0d2FyZER1cmF0aW9uLFxyXG4gICAgICAgICAgcmV0dXJuU3BlZWQ6IGNvbmZpZy5yZXR1cm5TcGVlZCxcclxuICAgICAgICAgIHJvdGF0aW9uU3BlZWQ6IGNvbmZpZy5yb3RhdGlvblNwZWVkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBkYmcoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBGdW5jdGlvbiB0byBzZXQgaGVhbHRoIG9mIHBsYXllciBmcm9tIGFub3RoZXIgZmlsZVxyXG5mdW5jdGlvbiBzZXRDdXJyZW50SGVhbHRoKGRhbWFnZSkge1xyXG4gIC8vIERlcHJlY2F0ZWQ6IHNlcnZlciBhdXRob3JpdGF0aXZlLiBLZXB0IGZvciBjb21wYXRpYmlsaXR5IChuby1vcCBkaXNwbGF5IHVwZGF0ZSBvbmx5KVxyXG4gIGN1cnJlbnRIZWFsdGggLT0gZGFtYWdlO1xyXG4gIGlmIChjdXJyZW50SGVhbHRoIDwgMCkgY3VycmVudEhlYWx0aCA9IDA7XHJcbiAgdXBkYXRlSGVhbHRoQmFyKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlSGVhbHRoQmFyKCkge1xyXG4gIGlmIChjdXJyZW50SGVhbHRoIDw9IDApIGN1cnJlbnRIZWFsdGggPSAwO1xyXG4gIGNvbnN0IGhlYWx0aFBlcmNlbnRhZ2UgPSBjdXJyZW50SGVhbHRoIC8gbWF4SGVhbHRoO1xyXG4gIGNvbnN0IGRpc3BsYXllZFdpZHRoID0gaGVhbHRoQmFyV2lkdGggKiBoZWFsdGhQZXJjZW50YWdlO1xyXG4gIHBkYmcoKTtcclxuXHJcbiAgaGVhbHRoQmFyLmNsZWFyKCk7IC8vIENsZWFyIHRoZSBncmFwaGljcyBiZWZvcmUgcmVkcmF3aW5nXHJcblxyXG4gIGNvbnN0IGhlYWx0aEJhclggPSBwbGF5ZXIueCAtIGhlYWx0aEJhcldpZHRoIC8gMjtcclxuICBsZXQgaGVhbHRoQmFyWTtcclxuICBpZiAoIWRlYWQpIHtcclxuICAgIGhlYWx0aEJhclkgPSBwbGF5ZXIueSAtIChwbGF5ZXIuaGVpZ2h0IC8gMiArIDgpOyAvLyBzaGlmdCB1cCBzbGlnaHRseSB0byBtYWtlIHNwYWNlIGZvciBhbW1vIGJhclxyXG4gICAgaGVhbHRoVGV4dC5zZXRUZXh0KGAke2N1cnJlbnRIZWFsdGh9YCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGhlYWx0aEJhclkgPSBwbGF5ZXIueSAtIChwbGF5ZXIuaGVpZ2h0IC8gMiAtIDI0KTtcclxuICAgIC8vIFNob3cgMCBpbnN0ZWFkIG9mIGJsYW5rIHdoZW4gZGVhZFxyXG4gICAgaGVhbHRoVGV4dC5zZXRUZXh0KGAwYCk7XHJcbiAgICBwbGF5ZXJOYW1lLnNldFBvc2l0aW9uKHBsYXllci54LCBwbGF5ZXJOYW1lLnkgKyAzMCk7XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSB3aXRoIHRoZSBkZWZhdWx0IGZpbGwgY29sb3JcclxuICBoZWFsdGhCYXIuZmlsbFN0eWxlKDB4NTk1OTU5KTtcclxuICBoZWFsdGhCYXIuZmlsbFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgaGVhbHRoQmFyV2lkdGgsIDkpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBoZWFsdGggYmFyIGJhY2tncm91bmQgKHN0cm9rZSlcclxuICBoZWFsdGhCYXIubGluZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICBoZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgaGVhbHRoQmFyV2lkdGgsIDksIDMpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBmaWxsZWQgcGFydCBvZiB0aGUgaGVhbHRoIGJhciAoZ3JlZW4pXHJcbiAgaGVhbHRoQmFyLmZpbGxTdHlsZSgweDk5YWIyYyk7XHJcbiAgaGVhbHRoQmFyLmZpbGxSb3VuZGVkUmVjdChoZWFsdGhCYXJYLCBoZWFsdGhCYXJZLCBkaXNwbGF5ZWRXaWR0aCwgOSwgMyk7XHJcblxyXG4gIGhlYWx0aFRleHQuc2V0UG9zaXRpb24ocGxheWVyLnggLSBoZWFsdGhUZXh0LndpZHRoIC8gMiwgaGVhbHRoQmFyWSAtIDgpO1xyXG4gIGhlYWx0aFRleHQuc2V0RGVwdGgoMik7XHJcblxyXG4gIC8vIERyYXcgYW1tbyBiYXIgdW5kZXJuZWF0aCBoZWFsdGggKG9ubHkgZm9yIGxvY2FsIHBsYXllciAmIHdoZW4gYWxpdmUpXHJcbiAgZHJhd0FtbW9CYXIoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSArIDExKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FtbW9CYXIoZm9yY2VkWCwgZm9yY2VkWSkge1xyXG4gIGlmICghYW1tb0JhciB8fCAhYW1tb0JhckJhY2spIHJldHVybjtcclxuICBjb25zdCBwZXJjZW50ID0gUGhhc2VyLk1hdGguQ2xhbXAoYW1tb0VsYXBzZWQgLyBhbW1vQ29vbGRvd25NcywgMCwgMSk7XHJcbiAgY29uc3QgeCA9IGZvcmNlZFggIT09IHVuZGVmaW5lZCA/IGZvcmNlZFggOiBwbGF5ZXIueCAtIGFtbW9CYXJXaWR0aCAvIDI7XHJcbiAgY29uc3QgeSA9XHJcbiAgICBmb3JjZWRZICE9PSB1bmRlZmluZWQgPyBmb3JjZWRZIDogcGxheWVyLnkgLSAocGxheWVyLmhlaWdodCAvIDIgKyA4KSArIDExO1xyXG4gIGFtbW9CYXJCYWNrLmNsZWFyKCk7XHJcbiAgYW1tb0Jhci5jbGVhcigpO1xyXG4gIC8vIEJhY2tncm91bmRcclxuICBhbW1vQmFyQmFjay5maWxsU3R5bGUoMHgyMjIyMjIsIDAuNjUpO1xyXG4gIGFtbW9CYXJCYWNrLmZpbGxSb3VuZGVkUmVjdCh4LCB5LCBhbW1vQmFyV2lkdGgsIDYsIDMpO1xyXG4gIGFtbW9CYXJCYWNrLmxpbmVTdHlsZSgyLCAweDAwMDAwMCwgMC45KTtcclxuICBhbW1vQmFyQmFjay5zdHJva2VSb3VuZGVkUmVjdCh4LCB5LCBhbW1vQmFyV2lkdGgsIDYsIDMpO1xyXG4gIC8vIEZpbGwgZ3JhZGllbnQgc2ltdWxhdGlvbiAodHdvIHBhc3NlcylcclxuICAvLyBSZWQgY29sb3Igc2NoZW1lIChkYXJrZXIgd2hpbGUgY2hhcmdpbmcsIGJyaWdodCB3aGVuIHJlYWR5KVxyXG4gIGNvbnN0IGNoYXJnaW5nQ29sb3IgPSAweGIzMjEyMTtcclxuICBjb25zdCByZWFkeUNvbG9yID0gMHhmZjQwNDA7XHJcbiAgLy8gU2ltcGxlIGludGVycG9sYXRlIGJldHdlZW4gZGFyay0+YnJpZ2h0IGJhc2VkIG9uIHBlcmNlbnRcclxuICBjb25zdCByMSA9IChjaGFyZ2luZ0NvbG9yID4+IDE2KSAmIDB4ZmY7XHJcbiAgY29uc3QgZzEgPSAoY2hhcmdpbmdDb2xvciA+PiA4KSAmIDB4ZmY7XHJcbiAgY29uc3QgYjEgPSBjaGFyZ2luZ0NvbG9yICYgMHhmZjtcclxuICBjb25zdCByMiA9IChyZWFkeUNvbG9yID4+IDE2KSAmIDB4ZmY7XHJcbiAgY29uc3QgZzIgPSAocmVhZHlDb2xvciA+PiA4KSAmIDB4ZmY7XHJcbiAgY29uc3QgYjIgPSByZWFkeUNvbG9yICYgMHhmZjtcclxuICBjb25zdCByID0gTWF0aC5yb3VuZChyMSArIChyMiAtIHIxKSAqIHBlcmNlbnQpO1xyXG4gIGNvbnN0IGcgPSBNYXRoLnJvdW5kKGcxICsgKGcyIC0gZzEpICogcGVyY2VudCk7XHJcbiAgY29uc3QgYiA9IE1hdGgucm91bmQoYjEgKyAoYjIgLSBiMSkgKiBwZXJjZW50KTtcclxuICBjb25zdCBmaWxsQ29sb3IgPSAociA8PCAxNikgfCAoZyA8PCA4KSB8IGI7XHJcbiAgYW1tb0Jhci5maWxsU3R5bGUoZmlsbENvbG9yLCAwLjk1KTtcclxuICBhbW1vQmFyLmZpbGxSb3VuZGVkUmVjdCh4LCB5LCBhbW1vQmFyV2lkdGggKiBwZXJjZW50LCA2LCAzKTtcclxuICAvLyBTbWFsbCBoaWdobGlnaHQgb3ZlcmxheSBmb3IgcG9saXNoXHJcbiAgYW1tb0Jhci5maWxsU3R5bGUoMHhmZmZmZmYsIDAuMjUgKiAocGVyY2VudCA8IDEgPyAxIDogMC42KSk7XHJcbiAgYW1tb0Jhci5maWxsUm91bmRlZFJlY3QoeCwgeSwgYW1tb0JhcldpZHRoICogcGVyY2VudCwgMiwge1xyXG4gICAgdGw6IDMsXHJcbiAgICB0cjogMyxcclxuICAgIGJsOiAwLFxyXG4gICAgYnI6IDAsXHJcbiAgfSk7XHJcbiAgYW1tb0Jhci5zZXREZXB0aCgyKTtcclxuICBhbW1vQmFyQmFjay5zZXREZXB0aCgxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHNwYXduLCBwbGF5ZXIpIHtcclxuICBjb25zdCBhdmFpbGFibGVTcGFjZSA9IHBsYXRmb3JtLndpZHRoIC8gcGxheWVyc0luVGVhbTsgLy8gU3BhY2UgZm9yIGVhY2ggcGxheWVyXHJcbiAgY29uc3QgbGVmdE1vc3QgPSBwbGF0Zm9ybS5nZXRCb3VuZHMoKS5sZWZ0OyAvLyBMZWZ0bW9zdCB4IGNvcmQgb2YgdGhlIHBsYXRmb3JtXHJcbiAgY29uc3Qgc3Bhd25ZID0gcGxhdGZvcm0uZ2V0VG9wQ2VudGVyKCkueSAtIHBsYXllci5oZWlnaHQgLyAyOyAvLyBHZXRzIHkgY29yZGluYXRlIGZvciB0aGUgcGxheWVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBjZW50ZXIgYW5kIHN1YnRyYWN0aW5nIGhhbGYgdGhlIHBsYXllciBoZWlnaHQuIFNpbmNlIHRoZSBwbGF5ZXIgeSBpcyBhdCB0aGUgY2VudGVyLlxyXG5cclxuICBjb25zdCBzcGF3blggPSBsZWZ0TW9zdCArIChzcGF3biAqIGF2YWlsYWJsZVNwYWNlKSAvIDIgLSBwbGF5ZXIud2lkdGggKiAxLjMzMzsgLy8gQ2FsY3VsYXRlcyBzcGF3bnggYnkgY29tYmluaW5nIGFsbCB0aGUgcHJldmlvdXMgdmFyaWFibGVzLiAxLjMzMyBpcyBtdWx0aXBsaWVkIHRvIHBlcmZlY3QgdGhlIHBvc2l0aW9uIG9mIHRoZSBzcGF3biBvdGhlcndpc2UgaXQgaXMgb2Zmc2V0IHRvIHRoZSByaWdodC5cclxuICBwbGF5ZXIueCA9IHNwYXduWDtcclxuICBwbGF5ZXIueSA9IHNwYXduWTtcclxufVxyXG5mdW5jdGlvbiBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKHBvc2l0aW9uLCBzcGF3blBhcmFtLCBwbGF5ZXIpIHtcclxuICBsZXQgcGxhdGZvcm07XHJcbiAgbGV0IHNwYXduID0gU3RyaW5nKHNwYXduUGFyYW0pO1xyXG4gIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xyXG4gICAgaWYgKHNwYXduID09PSBcIjFcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTE7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjJcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTI7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjNcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gXCJib3R0b21cIikge1xyXG4gICAgaWYgKHNwYXduID09PSBcIjFcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTQ7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjJcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTU7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjNcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTcGFjZSA9IHBsYXRmb3JtLndpZHRoO1xyXG4gIGNvbnN0IGxlZnRNb3N0ID0gcGxhdGZvcm0uZ2V0Qm91bmRzKCkubGVmdDsgLy8gTGVmdG1vc3QgeCBjb3JkIG9mIHRoZSBwbGF0Zm9ybVxyXG4gIGNvbnN0IHNwYXduWSA9IHBsYXRmb3JtLmdldFRvcENlbnRlcigpLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjsgLy8gR2V0cyB5IGNvcmRpbmF0ZSBmb3IgdGhlIHBsYXllciBieSBjYWxjdWxhdGluZyB0aGUgY2VudGVyIGFuZCBzdWJ0cmFjdGluZyBoYWxmIHRoZSBwbGF5ZXIgaGVpZ2h0LiBTaW5jZSB0aGUgcGxheWVyIHkgaXMgYXQgdGhlIGNlbnRlci5cclxuXHJcbiAgY29uc3Qgc3Bhd25YID0gbGVmdE1vc3QgKyBhdmFpbGFibGVTcGFjZSAvIDIgLSBwbGF5ZXIud2lkdGg7XHJcbiAgcGxheWVyLnggPSBzcGF3blg7XHJcbiAgcGxheWVyLnkgPSBzcGF3blk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVQbGF5ZXJNb3ZlbWVudChzY2VuZSkge1xyXG4gIGNvbnN0IHNwZWVkID0gMzUwO1xyXG4gIGNvbnN0IGp1bXBTcGVlZCA9IDQyMDtcclxuXHJcbiAgLy8gS2V5cy4gUGxheWVyIGNhbiB1c2UgZWl0aGVyIGFycm93IGtleXMgb3IgV0FTRFxyXG4gIGNvbnN0IGxlZnRLZXkgPVxyXG4gICAgY3Vyc29ycy5sZWZ0LmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJBXCIpLmlzRG93bjtcclxuICBjb25zdCByaWdodEtleSA9XHJcbiAgICBjdXJzb3JzLnJpZ2h0LmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJEXCIpLmlzRG93bjtcclxuICBjb25zdCB1cEtleSA9IGN1cnNvcnMudXAuaXNEb3duIHx8IHNjZW5lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIldcIikuaXNEb3duO1xyXG5cclxuICAvLyBMZWZ0IG1vdmVtZW50XHJcbiAgaWYgKGxlZnRLZXkpIHtcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBtb3ZlZFxyXG4gICAgfVxyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WCgtc3BlZWQpOyAvLyBTZXRzIHZlbG9jaXR5IHRvIG5lZ2F0aXZlIHNvIHRoYXQgaXQgbW92ZXMgbGVmdFxyXG4gICAgcGxheWVyLmZsaXBYID0gdHJ1ZTsgLy8gTWlycm9ycyB0aGUgYm9keSBvZiB0aGUgcGxheWVyXHJcbiAgICBpc01vdmluZyA9IHRydWU7IC8vIFNldHMgdGhlIGlzTW92aW5nIHRvIHRydWVcclxuICAgIGlmIChwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmICFpc0F0dGFja2luZyAmJiAhZGVhZCkge1xyXG4gICAgICAvLyBJZiB0aGUgcGxheWVyIGlzIG5vdCBpbiB0aGUgYWlyIG9yIGF0dGFja2luZyBvciBkZWFkLCBpdCBwbGF5cyB0aGUgcnVubmluZyBhbmltYXRpb25cclxuICAgICAgcGxheWVyLmFuaW1zLnBsYXkoXCJydW5uaW5nXCIsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgLy8gUmlnaHQgbW92ZW1lbnRcclxuICB9IGVsc2UgaWYgKHJpZ2h0S2V5KSB7XHJcbiAgICBpZiAoaW5kaWNhdG9yVHJpYW5nbGUpIHtcclxuICAgICAgaW5kaWNhdG9yVHJpYW5nbGUuY2xlYXIoKTsgLy8gUmVtb3ZlcyBpbmRpY2F0b3IgdHJpYW5nbGUgaWYgdGhlIHBsYXllciBoYXMgbW92ZWRcclxuICAgIH1cclxuICAgIHBsYXllci5mbGlwWCA9IGZhbHNlOyAvLyBVbmRvcyB0aGUgbWlycm9yIG9mIHRoZSBwbGF5ZXJcclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVgoc3BlZWQpOyAvLyBTZXRzIHZlbG9jaXR5IHRvcndhcmRzIHJpZ2h0XHJcbiAgICBpc01vdmluZyA9IHRydWU7IC8vIFNldHMgbW92aW5nIHZhcmlhYmxlXHJcbiAgICBpZiAocGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJiAhaXNBdHRhY2tpbmcgJiYgIWRlYWQpIHtcclxuICAgICAgLy8gSWYgdGhlIHBsYXllciBpcyBub3QgaW4gdGhlIGFpciBvciBhdHRhY2tpbmcgb3IgZGVhZCwgaXQgcGxheXMgdGhlIHJ1bm5pbmcgYW5pbWF0aW9uXHJcbiAgICAgIHBsYXllci5hbmltcy5wbGF5KFwicnVubmluZ1wiLCB0cnVlKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgc3RvcE1vdmluZygpOyAvLyBJZiBubyBrZXkgaXMgYmVpbmcgcHJlc3NlZCwgaXQgY2FsbHMgdGhlIHN0b3AgbW92aW5nIGZ1bmN0aW9uXHJcbiAgfVxyXG5cclxuICAvLyBKdW1waW5nXHJcbiAgaWYgKHVwS2V5ICYmIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWRlYWQpIHtcclxuICAgIC8vIElmIHBsYXllciBpcyB0b3VjaGluZyBncm91bmQgYW5kIGp1bXBpbmdcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBqdW1wZWRcclxuICAgIH1cclxuICAgIGp1bXAoKTsgLy8gQ2FsbHMganVtcFxyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICAvLyBJZiBwbGF5ZXIgaXMgdG91Y2hpbmcgYSB3YWxsIHdoaWxlIGp1bXBpbmdcclxuICAgIChwbGF5ZXIuYm9keS50b3VjaGluZy5sZWZ0IHx8IChwbGF5ZXIuYm9keS50b3VjaGluZy5yaWdodCAmJiAhZGVhZCkpICYmXHJcbiAgICBjYW5XYWxsSnVtcCAmJlxyXG4gICAgdXBLZXlcclxuICApIHtcclxuICAgIHdhbGxKdW1wKCk7IC8vIENhbGxzIHdhbGxqdW1wXHJcbiAgfVxyXG4gIGlmIChcclxuICAgIChwbGF5ZXIuYm9keS50b3VjaGluZy5sZWZ0IHx8IChwbGF5ZXIuYm9keS50b3VjaGluZy5yaWdodCAmJiAhZGVhZCkpICYmXHJcbiAgICAhaXNBdHRhY2tpbmdcclxuICApIHtcclxuICAgIHBsYXllci5hbmltcy5wbGF5KFwic2xpZGluZ1wiLCB0cnVlKTsgLy8gUGxheXMgc2xpZGluZyBhbmltYXRpb25cclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoZSBqdW1wIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXHJcbiAgaWYgKFxyXG4gICAgIXBsYXllci5hbmltcy5pc1BsYXlpbmcgJiZcclxuICAgICFwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmXHJcbiAgICAhcGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCAmJlxyXG4gICAgIXBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0XHJcbiAgKSB7XHJcbiAgICBmYWxsKCk7IC8vIFBsYXlzIGZhbGxpbmcgYW5pbWF0aW9uIGlmIHRoZSBwbGF5ZXIgaXMgbm90IHRvdWNoaW5nIGEgd2FsbCBvciBpZiBhbnkgb3RoZXIgYW5pbWF0aW9uIGlzIHBsYXlpbmdcclxuICB9XHJcblxyXG4gIC8vIElmIG5vIG1vdmVtZW50IGFuaW1hdGlvbnMgYXJlIHBsYXlpbmcsIHBsYXkgdGhlICdpZGxlJyBhbmltYXRpb25cclxuICBpZiAoXHJcbiAgICAhaXNNb3ZpbmcgJiZcclxuICAgIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiZcclxuICAgICFpc0p1bXBpbmcgJiZcclxuICAgICFpc0F0dGFja2luZyAmJlxyXG4gICAgIWRlYWRcclxuICApIHtcclxuICAgIGlkbGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhlYWx0aEJhcigpOyAvLyBVcGRhdGVzIHRoZSBoZWFsdGggYmFyIGFmdGVyIHRoZSBuZXcgcGxheWVyIHBvc2l0aW9uXHJcbiAgcGxheWVyTmFtZS5zZXRQb3NpdGlvbihwbGF5ZXIueCwgcGxheWVyLnkgLSBwbGF5ZXIuaGVpZ2h0ICsgMTApOyAvLyBVcGRhdGVzIHRoZSBwbGF5ZXIgbmFtZXRhZyB3aXRoIHRoZSBuZXcgcG9zaXRpb25cclxuXHJcbiAgLy8gRmlyZSB0cmFpbCAoc2ltcGxlIHBhcnRpY2xlIHN1YnN0aXR1dGUpXHJcbiAgZmlyZVRyYWlsVGltZXIgKz0gc2NlbmUuZ2FtZS5sb29wLmRlbHRhO1xyXG4gIGR1c3RUaW1lciArPSBzY2VuZS5nYW1lLmxvb3AuZGVsdGE7XHJcbiAgaWYgKFxyXG4gICAgIWRlYWQgJiZcclxuICAgIGZpcmVUcmFpbFRpbWVyID49IGZpcmVUcmFpbEludGVydmFsICYmXHJcbiAgICBpc01vdmluZyAmJiAvLyBvbmx5IHdoZW4gYWN0dWFsbHkgbW92aW5nIGhvcml6b250YWxseVxyXG4gICAgIWRlYWRcclxuICApIHtcclxuICAgIGZpcmVUcmFpbFRpbWVyID0gMDtcclxuICAgIGNvbnN0IGJhc2VYID0gcGxheWVyLnggLSAocGxheWVyLmZsaXBYID8gLTE0IDogMTQpO1xyXG4gICAgY29uc3QgYmFzZVkgPSBwbGF5ZXIueSArIDg7XHJcbiAgICAvLyBTcGF3biAxLTIgbGF5ZXJlZCBmbGFtZXMgZWFjaCBpbnRlcnZhbFxyXG4gICAgY29uc3QgY291bnQgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDEsIDIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIHNwYXduRmlyZUZsYW1lKHNjZW5lLCBiYXNlWCwgYmFzZVkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gR3JvdW5kIHJ1bm5pbmcgZHVzdCAob25seSB3aGlsZSBvbiBncm91bmQgJiBtb3ZpbmcpXHJcbiAgaWYgKFxyXG4gICAgIWRlYWQgJiZcclxuICAgIGlzTW92aW5nICYmXHJcbiAgICBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmXHJcbiAgICBkdXN0VGltZXIgPj0gZHVzdEludGVydmFsXHJcbiAgKSB7XHJcbiAgICBkdXN0VGltZXIgPSAwO1xyXG4gICAgY29uc3QgZHVzdFkgPSBwbGF5ZXIueSArIHBsYXllci5oZWlnaHQgKiAwLjQ1OyAvLyBuZWFyIGZlZXRcclxuICAgIGNvbnN0IGR1c3RYID0gcGxheWVyLnggKyAocGxheWVyLmZsaXBYID8gLTE4IDogMTgpICogMC4zO1xyXG4gICAgc3Bhd25EdXN0KHNjZW5lLCBkdXN0WCwgZHVzdFkpO1xyXG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjMpIHtcclxuICAgICAgLy8gb2NjYXNpb25hbCBleHRyYSBwdWZmIGZvciB2YXJpYWJpbGl0eVxyXG4gICAgICBzcGF3bkR1c3QoXHJcbiAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgZHVzdFggKyBQaGFzZXIuTWF0aC5CZXR3ZWVuKC02LCA2KSxcclxuICAgICAgICBkdXN0WSArIFBoYXNlci5NYXRoLkJldHdlZW4oLTIsIDIpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdG9wTW92aW5nKCkge1xyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WCgwKTsgLy8gU2V0cyB0aGUgcGxheWVyIHRvIG5vdCBtb3ZpbmdcclxuICAgIGlzTW92aW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBqdW1wKCkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJqdW1waW5nXCIsIHRydWUpO1xyXG4gICAgcGRiZygpO1xyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WSgtanVtcFNwZWVkKTtcclxuICAgIGlzTW92aW5nID0gdHJ1ZTtcclxuICAgIGlzSnVtcGluZyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB3YWxsSnVtcCgpIHtcclxuICAgIGNhbldhbGxKdW1wID0gZmFsc2U7XHJcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcInNsaWRpbmdcIiwgdHJ1ZSk7XHJcbiAgICBwZGJnKCk7XHJcbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlZKC1qdW1wU3BlZWQpO1xyXG5cclxuICAgIGNvbnN0IHdhbGxKdW1wVHdlZW4gPSBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgLy8gVGhpcyB0d2VlbiBzbW9vdGhzIHRoZSBraWNrYmFjayBmcm9tIHRoZSB3YWxsanVtcFxyXG4gICAgICB0YXJnZXRzOiBwbGF5ZXIsXHJcbiAgICAgIHg6IHBsYXllci54ICsgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgPyA4MCA6IC04MCksIC8vIE1vdmVzIHRoZSBwbGF5ZXIgLTUwIG9yIDUwIGNvcmRzIGF3YXkgZGVwZW5kaW5nIG9uIHBvc2l0aW9uXHJcbiAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgIGVhc2U6IFwiTGluZWFyXCIsXHJcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYW5XYWxsSnVtcCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHdhbGxKdW1wVHdlZW4ucGxheSgpOyAvLyBQbGF5cyB0aGUgdHdlZW5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZhbGwoKSB7XHJcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcImZhbGxpbmdcIiwgdHJ1ZSk7XHJcbiAgICBwZGJnKCk7XHJcbiAgICBpc0p1bXBpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlkbGUoKSB7XHJcbiAgICBwbGF5ZXIuYW5pbXMucGxheShcImlkbGVcIiwgdHJ1ZSk7XHJcbiAgICBwZGJnKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIHBsYXllcixcclxuICBmcmFtZSxcclxuICBjdXJyZW50SGVhbHRoLFxyXG4gIHNldEN1cnJlbnRIZWFsdGgsXHJcbiAgZGVhZCxcclxuICBjYWxjdWxhdGVTcGF3bixcclxuICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduLFxyXG59O1xyXG5cclxuLy8gTGlzdGVuIGZvciBhdXRob3JpdGF0aXZlIGhlYWx0aCB1cGRhdGVzIGZyb20gc2VydmVyXHJcbnNvY2tldC5vbihcImhlYWx0aC11cGRhdGVcIiwgKGRhdGEpID0+IHtcclxuICBpZiAoZGF0YS5nYW1lSWQgIT09IGdhbWVJZCkgcmV0dXJuO1xyXG4gIGlmIChkYXRhLnVzZXJuYW1lID09PSB1c2VybmFtZSkge1xyXG4gICAgY3VycmVudEhlYWx0aCA9IGRhdGEuaGVhbHRoO1xyXG4gICAgcGRiZygpO1xyXG4gICAgaWYgKGN1cnJlbnRIZWFsdGggPD0gMCkge1xyXG4gICAgICBpZiAoIWRlYWQpIHtcclxuICAgICAgICBkZWFkID0gdHJ1ZTtcclxuICAgICAgICBwbGF5ZXIuYW5pbXMucGxheShcImR5aW5nXCIsIHRydWUpO1xyXG4gICAgICAgIHNjZW5lLmlucHV0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBwbGF5ZXIuYWxwaGEgPSAwLjU7XHJcbiAgICAgICAgcGRiZygpO1xyXG4gICAgICB9XHJcbiAgICAgIGN1cnJlbnRIZWFsdGggPSAwOyAvLyBmb3JjZSBleGFjdCAwXHJcbiAgICB9XHJcbiAgICB1cGRhdGVIZWFsdGhCYXIoKTsgLy8gYWx3YXlzIHJlZnJlc2ggKGNvdmVycyBkZWF0aCBjYXNlIHdoZXJlIG1vdmVtZW50IGxvb3Agc3RvcHMpXHJcbiAgfVxyXG59KTtcclxuIiwiLy8gc29ja2V0LmpzXHJcbi8vIENlbnRyYWxpemVkIFNvY2tldC5JTyBjbGllbnQgdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGJldHdlZW4gZ2FtZSwgcGxheWVyLCBhbmQgb3BQbGF5ZXIgbW9kdWxlcy5cclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc29ja2V0O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGdhbWUuanNcclxuXHJcbi8vIEltYWdlIENyZWRpdHNcclxuLy8gU2h1cmlrZW4gSW1hZ2U6IGh0dHBzOi8vemgtcGFydG5lcnMuY29tL2FwcHMtc3RpY2tlci1iYW5uZXItcG9zdGVyLXByaW50aW5nLXVzYWdlLWFuZC1wYXJ0LW9mLWxvZ28tNDgwOTUxNC5odG1sXHJcbi8vIEZpZ2h0IEltYWdlOiBodHRwczovL3BuZ3RyZWUuY29tL2ZyZWVwbmcvYm94aW5nLWdsb3Zlcy12ZWN0b3ItcmVkLWFuZC1ibHVlLWJveGluZy1nbG92ZXMtdGhhdC1hcmUtZmlnaHRpbmctaXNvbGF0ZS1vbi13aGl0ZS1iYWNrZ3JvdW5kXzUyOTU0NDEuaHRtbFxyXG4vLyBUaWxlc2V0OiBodHRwczovL2dhbWVmcm9tc2NyYXRjaC5jb20vZGVmb2xkLWVuZ2luZS10dXRvcmlhbC1zZXJpZXMtdGlsZW1hcHMvXHJcbi8vIE5pbmphIFNwcml0ZXNoZWV0OiBodHRwczovL3d3dy5mcmVlcGlrLmNvbS9wcmVtaXVtLXZlY3Rvci9ibGFjay1uaW5qYS1nYW1lLXNwcml0ZXNfMTU4MjQyNS5odG1cclxuLy8gQmFja2dyb3VuZCBJbWFnZTogaHR0cHM6Ly9kZS5kcmVhbXN0aW1lLmNvbS9iZXJnLWZvcmVzdC12aWRlby1nYW1lLWJhY2tncm91bmQtaW1hZ2UxMDUzNjA0NzVcclxuLy8gUmFuZG9tIEltYWdlOiBodHRwczovL3d3dy5zdmdyZXBvLmNvbS9zdmcvMzkxNjU5L3JhbmRvbVxyXG4vLyBWUyBJbWFnZTogaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS91cmw/c2E9aSZ1cmw9aHR0cHMlM0ElMkYlMkZzdG9jay5hZG9iZS5jb20lMkZzZWFyY2glM0ZrJTNEdnMlMkJsb2dvJnBzaWc9QU92VmF3MHFOVGVxRXhmSXNQc2E5VHlMQjM0WiZ1c3Q9MTcxMzgwMTc0NTQ1MjAwMCZzb3VyY2U9aW1hZ2VzJmNkPXZmZSZvcGk9ODk5Nzg0NDkmdmVkPTBDQklRalJ4cUZ3b1RDT0NKdjVQWDA0VURGUUFBQUFBZEFBQUFBQkFFXHJcblxyXG4vLyBDcmVkaXRzIHRvIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanMvanNfY29va2llcy5hc3AgZm9yIGhlbHBpbmcgd2l0aCBjb29raWUgY29kZVxyXG5cclxuaW1wb3J0IHsgbHVzaHlQZWFrcywgbHVzaHlQZWFrc09iamVjdHMgfSBmcm9tIFwiLi9NYXBzL2x1c2h5UGVha3NcIjtcclxuaW1wb3J0IHsgbWFuZ3JvdmVNZWFkb3csIG1hbmdyb3ZlTWVhZG93T2JqZWN0cyB9IGZyb20gXCIuL01hcHMvbWFuZ3JvdmVNZWFkb3dcIjtcclxuaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBwbGF5ZXIsIGhhbmRsZVBsYXllck1vdmVtZW50LCBkZWFkIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcbmltcG9ydCBSZXR1cm5pbmdTaHVyaWtlbiBmcm9tIFwiLi9SZXR1cm5pbmdTaHVyaWtlblwiO1xyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xyXG5pbXBvcnQgT3BQbGF5ZXIgZnJvbSBcIi4vb3BQbGF5ZXJcIjtcclxuaW1wb3J0IHsgc3Bhd25EdXN0LCBwcmV3YXJtRHVzdCB9IGZyb20gXCIuL2VmZmVjdHNcIjtcclxuXHJcbi8vIFNvY2tldCBub3cgaW1wb3J0ZWQgZnJvbSBzdGFuZGFsb25lIG1vZHVsZSB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcclxuZnVuY3Rpb24gY2RiZygpIHtcclxuICAvKiBsb2dnaW5nIGRpc2FibGVkIGZvciBwcm9kdWN0aW9uICovXHJcbn1cclxuY2RiZygpO1xyXG5cclxuLy8gUGF0aCB0byBnZXQgYXNzZXRzXHJcbmNvbnN0IHN0YXRpY1BhdGggPSBcIi9hc3NldHNcIjtcclxuXHJcbi8vIFZhcmlhYmxlcyB0byBzdG9yZSBhbGwgb2YgdGhlIHNlc3Npb24gc3RvcmFnZSB2YWx1ZXNcclxuY29uc3QgZ2FtZUlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbikucG9wKCk7XHJcbmNvbnN0IHBhcnR5SWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicGFydHlcIik7XHJcbmNvbnN0IHVzZXJuYW1lID0gZ2V0Q29va2llKFwibmFtZVwiKTtcclxuY29uc3QgY2hhcmFjdGVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNoYXJhY3RlclwiKTtcclxuY29uc3Qgc3Bhd25QbGF0Zm9ybSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzcGF3blBsYXRmb3JtXCIpO1xyXG5jb25zdCBzcGF3biA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzcGF3blwiKTtcclxuY29uc3QgcGFydHlNZW1iZXJzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInBhcnR5TWVtYmVyc1wiKTtcclxuY29uc3QgcGFydHlNZW1iZXJzTnVtID0gTnVtYmVyKHBhcnR5TWVtYmVycyk7XHJcbmNvbnN0IG1hcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJtYXBcIik7XHJcblxyXG4vLyBNYXAgdmFyaWFsZVxyXG5sZXQgbWFwT2JqZWN0cztcclxuXHJcbi8vIExpc3RzIHRoYXQgc3RvcmUgYWxsIHRoZSBwbGF5ZXJzIGluIHBsYXllciB0ZWFtIGFuZCBvcCB0ZWFtXHJcbmNvbnN0IG9wcG9uZW50UGxheWVycyA9IFtdO1xyXG5jb25zdCB0ZWFtUGxheWVycyA9IFtdO1xyXG5sZXQgZ2FtZUVuZGVkID0gZmFsc2U7IC8vIHN0b3BzIHVwZGF0ZSBsb29wIG5ldHdvcmsgZW1pc3Npb25zIGFmdGVyIGdhbWUgb3ZlclxyXG4vLyBOZXQgc3luYyBoZWxwZXJzXHJcbmxldCBuZXRMYXN0U2VuZCA9IDA7XHJcbmNvbnN0IG5ldFNlbmRJbnRlcnZhbE1zID0gMTAwMCAvIDMwOyAvLyB0aHJvdHRsZSBjbGllbnQgbW92ZSBlbWl0cyB0byB+MzBIelxyXG5sZXQgc3RhdGVBY3RpdmUgPSBmYWxzZTsgLy8gb25jZSBzZXJ2ZXIgJ3N0YXRlJyBzbmFwc2hvdHMgc3RhcnQsIHByZWZlciB0aGVtIG92ZXIgbGVnYWN5ICdtb3ZlJ1xyXG5sZXQgbGFzdFNlcnZlclN0YXRlID0geyB0OiAwLCBwbGF5ZXJzOiB7fSB9O1xyXG5sZXQgaGFzU2VudEluaXRpYWxNb3ZlID0gZmFsc2U7IC8vIGdhdGUgcmVjb25jaWxpYXRpb24gdW50aWwgZmlyc3QgdmFsaWQgcHVibGlzaFxyXG5cclxuLy8gTm8gcmVtb3RlIHByb2plY3RpbGUgcmVnaXN0cnkgKGRldGVybWluaXN0aWMgc2ltdWxhdGlvbiBvbiBlYWNoIGNsaWVudClcclxuXHJcbi8vIFBoYXNlciBjbGFzcyB0byBzZXR1cCB0aGUgZ2FtZVxyXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIC8vIFByZWxvYWRzIGFzc2V0c1xyXG4gIHByZWxvYWQoKSB7XHJcbiAgICBjZGJnKCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJiYWNrZ3JvdW5kXCIsIGAke3N0YXRpY1BhdGh9L2JhY2tncm91bmQucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXHJcbiAgICAgIFwibWFuZ3JvdmUtYmFja2dyb3VuZFwiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9tYW5ncm92ZUJhY2tncm91bmQuanBnYFxyXG4gICAgKTtcclxuICAgIHRoaXMubG9hZC5hdGxhcyhcclxuICAgICAgXCJzcHJpdGVcIixcclxuICAgICAgYCR7c3RhdGljUGF0aH0vTmluamFfU3ByaXRlc2hlZXQucG5nYCxcclxuICAgICAgYCR7c3RhdGljUGF0aH0vYW5pbWF0aW9ucy5qc29uYFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuYXRsYXMoXHJcbiAgICAgIFwidHJvbGxcIixcclxuICAgICAgYCR7c3RhdGljUGF0aH0vdHJvbGxfc3ByaXRlc2hlZXQucG5nYCxcclxuICAgICAgYCR7c3RhdGljUGF0aH0vdHJvbGwuanNvbmBcclxuICAgICk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJ0aWxlcy1pbWFnZVwiLCBgJHtzdGF0aWNQYXRofS9tYXAucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQudGlsZW1hcFRpbGVkSlNPTihcInRpbGVzXCIsIGAke3N0YXRpY1BhdGh9L3RpbGVzaGVldC5qc29uYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJiYXNlXCIsIGAke3N0YXRpY1BhdGh9L2Jhc2UucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJwbGF0Zm9ybVwiLCBgJHtzdGF0aWNQYXRofS9sYXJnZVBsYXRmb3JtLnBuZ2ApO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFwic2lkZS1wbGF0Zm9ybVwiLCBgJHtzdGF0aWNQYXRofS9zaWRlUGxhdGZvcm0ucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJtZWRpdW0tcGxhdGZvcm1cIiwgYCR7c3RhdGljUGF0aH0vbWVkaXVtUGxhdGZvcm0ucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJ0aW55LXBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L3RpbnlQbGF0Zm9ybS5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtbGVmdFwiLCBgJHtzdGF0aWNQYXRofS9iYXNlTGVmdC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtbWlkZGxlXCIsIGAke3N0YXRpY1BhdGh9L2Jhc2VNaWRkbGUucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJiYXNlLXJpZ2h0XCIsIGAke3N0YXRpY1BhdGh9L2Jhc2VSaWdodC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2UtdG9wXCIsIGAke3N0YXRpY1BhdGh9L2Jhc2VUb3AucG5nYCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKFwic2h1cmlrZW5cIiwgYCR7c3RhdGljUGF0aH0vc2h1cmlrZW4ucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzaHVyaWtlblRocm93XCIsIGAke3N0YXRpY1BhdGh9L3NodXJpa2VuVGhyb3cubXAzYCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzaHVyaWtlbkhpdFwiLCBgJHtzdGF0aWNQYXRofS9oaXQubXAzYCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzaHVyaWtlbkhpdFdvb2RcIiwgYCR7c3RhdGljUGF0aH0vd29vZGhpdC53YXZgKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGNkYmcoKTtcclxuICAgIC8vIENyZWF0ZXMgdGhlIG1hcCBvYmplY3RzXHJcbiAgICBpZiAobWFwID09PSBcIjFcIikge1xyXG4gICAgICBtYXBPYmplY3RzID0gbHVzaHlQZWFrc09iamVjdHM7XHJcbiAgICAgIGx1c2h5UGVha3ModGhpcyk7XHJcbiAgICAgIGNkYmcoKTtcclxuICAgIH0gZWxzZSBpZiAobWFwID09PSBcIjJcIikge1xyXG4gICAgICBtYXBPYmplY3RzID0gbWFuZ3JvdmVNZWFkb3dPYmplY3RzO1xyXG4gICAgICBtYW5ncm92ZU1lYWRvdyh0aGlzKTtcclxuICAgICAgY2RiZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZXMgcGxheWVyIG9iamVjdFxyXG4gICAgY3JlYXRlUGxheWVyKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICB1c2VybmFtZSxcclxuICAgICAgY2hhcmFjdGVyLFxyXG4gICAgICBzcGF3blBsYXRmb3JtLFxyXG4gICAgICBzcGF3bixcclxuICAgICAgcGFydHlNZW1iZXJzLFxyXG4gICAgICBtYXAsXHJcbiAgICAgIG9wcG9uZW50UGxheWVyc1xyXG4gICAgKTtcclxuICAgIGNkYmcoKTtcclxuICAgIC8vIEFkZHMgY29sbGlzaW9uIGJldHdlZW4gbWFwIGFuZCBwbGF5ZXJcclxuXHJcbiAgICBtYXBPYmplY3RzLmZvckVhY2goKG1hcE9iamVjdCkgPT4ge1xyXG4gICAgICAvLyBBZGQgY29sbGlkZXIgYmV0d2VlbiB0aGUgb2JqZWN0IGFuZCBlYWNoIG1hcCBvYmplY3RcclxuICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihwbGF5ZXIsIG1hcE9iamVjdCk7XHJcbiAgICB9KTtcclxuICAgIGNkYmcoKTtcclxuXHJcbiAgICAvLyBNYWtlcyB0aGUgZmlnaHQgZWxlbWVudCB6b29tIGluIGF0IHRoZSBzdGFydCBvZiB0aGUgZ2FtZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWdodFwiKS5zdHlsZS53aWR0aCA9IFwiNjAlXCI7XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgdmFsdWVzIGZvciBZb3VyIFRlYW0gYW5kIE9wcG9zaW5nIFRlYW0gdGV4dFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwieW91ci10ZWFtXCJcclxuICAgICkudGV4dENvbnRlbnQgPSBgWW91ciBUZWFtOiAke3BhcnR5TWVtYmVyc30vJHtwYXJ0eU1lbWJlcnN9IHBsYXllcnNgO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwib3Bwb3NpbmctdGVhbVwiXHJcbiAgICApLnRleHRDb250ZW50ID0gYE9wcG9zaW5nIFRlYW06ICR7cGFydHlNZW1iZXJzfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XHJcblxyXG4gICAgLy8gSm9pbiBwZXItZ2FtZSByb29tIGZvciBzY29wZWQgc2VydmVyIGJyb2FkY2FzdHNcclxuICAgIHNvY2tldC5lbWl0KFwiam9pbi1nYW1lXCIsIHsgZ2FtZUlkIH0pO1xyXG4gICAgLy8gRW1pdHMgcGxheWVyLWpvaW5lZCBhbmQgY3JlYXRlcyB0aGUgb3AgcGxheWVyIG9iamVjdHNcclxuICAgIHNvY2tldC5lbWl0KFwicGxheWVyLWpvaW5lZFwiLCB7IHVzZXJuYW1lLCBjaGFyYWN0ZXIgfSk7XHJcbiAgICBjZGJnKCk7XHJcbiAgICBmZXRjaChcIi9wbGF5ZXJzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGdhbWVJZCwgdXNlcm5hbWUgfSksXHJcbiAgICB9KVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICBjZGJnKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS51c2VyVGVhbSkge1xyXG4gICAgICAgICAgLy8gVXNlciB0ZWFtXHJcbiAgICAgICAgICBpZiAoa2V5ICE9PSB1c2VybmFtZSkge1xyXG4gICAgICAgICAgICAvLyBFbnN1cmVzIHBsYXllciBpcyBub3QgYWRkZWQgYWdhaW5cclxuICAgICAgICAgICAgY29uc3QgdXNlclBsYXllciA9IG5ldyBPcFBsYXllcihcclxuICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcImNoYXJhY3RlclwiXSxcclxuICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgXCJ1c2VyXCIsXHJcbiAgICAgICAgICAgICAgZGF0YS51c2VyVGVhbVtrZXldW1wic3Bhd25QbGF0Zm9ybVwiXSxcclxuICAgICAgICAgICAgICBkYXRhLnVzZXJUZWFtW2tleV1bXCJzcGF3blwiXSxcclxuICAgICAgICAgICAgICBwYXJ0eU1lbWJlcnMsXHJcbiAgICAgICAgICAgICAgbWFwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRlYW1QbGF5ZXJzW2tleV0gPSB1c2VyUGxheWVyOyAvLyBBZGRzIHBsYXllciBvYmplY3QgdG8gdGhlIGxpc3RcclxuICAgICAgICAgICAgY2RiZyhcIm9wUGxheWVyIGNyZWF0ZWQgKHVzZXIgdGVhbSlcIiwgeyBrZXkgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEub3BUZWFtKSB7XHJcbiAgICAgICAgICBpZiAoa2V5ICE9PSB1c2VybmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IG5ldyBPcFBsYXllcihcclxuICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgIGRhdGEub3BUZWFtW2tleV1bXCJjaGFyYWN0ZXJcIl0sXHJcbiAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgIFwib3BcIixcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wic3Bhd25QbGF0Zm9ybVwiXSxcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wic3Bhd25cIl0sXHJcbiAgICAgICAgICAgICAgcGFydHlNZW1iZXJzLFxyXG4gICAgICAgICAgICAgIG1hcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvcHBvbmVudFBsYXllcnNba2V5XSA9IG9wcG9uZW50UGxheWVyO1xyXG4gICAgICAgICAgICBjZGJnKFwib3BQbGF5ZXIgY3JlYXRlZCAob3AgdGVhbSlcIiwgeyBrZXkgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgY2RiZygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyBBZnRlciAxIHNlY29uZCB0aGUgZmlnaHQgaW1hZ2UgaXMgcmVtb3ZlZFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWdodFwiKTtcclxuICAgICAgZmlnaHQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gICAgICBmaWdodC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBmaWdodC5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAvLyBQcmV3YXJtIHNtYWxsIGR1c3QgcG9vbFxyXG4gICAgcHJld2FybUR1c3QodGhpcywgOCk7XHJcblxyXG4gICAgLy8gQ29kZSB0aGF0IHJ1bnMgd2hlbiBhbm90aGVyIHBsYXllciBtb3ZlcyAobGVnYWN5KS4gRGlzYWJsZWQgd2hlbiBzdGF0ZUFjdGl2ZS5cclxuICAgIHNvY2tldC5vbihcIm1vdmVcIiwgKGRhdGEpID0+IHtcclxuICAgICAgY2RiZygpO1xyXG4gICAgICBpZiAoc3RhdGVBY3RpdmUpIHJldHVybjsgLy8gcHJlZmVyIGF1dGhvcml0YXRpdmUgc25hcHNob3RzXHJcbiAgICAgIGNvbnN0IG9wcG9uZW50UGxheWVyID1cclxuICAgICAgICBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIC8vIEZpbmRzIHBsYXllciBmcm9tIHRoZSBsaXN0XHJcbiAgICAgIGlmIChvcHBvbmVudFBsYXllcikge1xyXG4gICAgICAgIC8vIFNldHMgdGhlIHggYW5kIHkgb2YgdGhlIG9wcG9uZW50IGFzIHdlbGwgYXMgdGhlIGFuaW1haXRvblxyXG4gICAgICAgIGNvbnN0IHByZXZYID0gb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueDtcclxuICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC54ID0gZGF0YS54O1xyXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnkgPSBkYXRhLnk7XHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuZmxpcFggPSBkYXRhLmZsaXA7XHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnNldFBvc2l0aW9uKFxyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCxcclxuICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnkgLSBvcHBvbmVudFBsYXllci5vcHBvbmVudC5oZWlnaHQgKyAxMFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYW5pbXMucGxheShkYXRhLmFuaW1hdGlvbiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFJlbW90ZSBydW5uaW5nIGR1c3QgKGFwcHJveGltYXRlOiBpZiBtb3ZlZCBob3Jpem9udGFsbHkgZW5vdWdoKVxyXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnggLSBwcmV2WCk7XHJcbiAgICAgICAgaWYgKGRlbHRhWCA+IDMpIHtcclxuICAgICAgICAgIG9wcG9uZW50UGxheWVyLl9kdXN0VGltZXIgPSAob3Bwb25lbnRQbGF5ZXIuX2R1c3RUaW1lciB8fCAwKSArIDE2OyAvLyBhcHByb3hpbWF0ZSBmcmFtZSBkZWx0YVxyXG4gICAgICAgICAgaWYgKG9wcG9uZW50UGxheWVyLl9kdXN0VGltZXIgPj0gNzApIHtcclxuICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIuX2R1c3RUaW1lciA9IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IGRZID1cclxuICAgICAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC55ICsgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuaGVpZ2h0ICogMC40NTtcclxuICAgICAgICAgICAgc3Bhd25EdXN0KHRoaXMsIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LngsIGRZKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEF1dGhvcml0YXRpdmUgc2VydmVyIHNuYXBzaG90cyAodGhyb3R0bGVkIH4yMEh6KVxyXG4gICAgc29ja2V0Lm9uKFwic3RhdGVcIiwgKHBheWxvYWQpID0+IHtcclxuICAgICAgLy8gcGF5bG9hZDogeyBnYW1lSWQsIHQsIHBsYXllcnM6IHsgW3VzZXJuYW1lXToge3gseSxmbGlwLGFuaW1hdGlvbn0gfSB9XHJcbiAgICAgIGlmIChwYXlsb2FkLmdhbWVJZCAhPT0gZ2FtZUlkKSByZXR1cm47XHJcbiAgICAgIGxhc3RTZXJ2ZXJTdGF0ZSA9IHBheWxvYWQ7XHJcbiAgICAgIHN0YXRlQWN0aXZlID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gYW5vdGhlciBwbGF5ZXIgYXR0YWNrcywgdGhpcyBjYXRjaGVzIGl0XHJcbiAgICBzb2NrZXQub24oXCJhdHRhY2tcIiwgKGRhdGEpID0+IHtcclxuICAgICAgY2RiZygpO1xyXG4gICAgICBpZiAoZGF0YS5yZXR1cm5pbmcpIHtcclxuICAgICAgICBjb25zdCBvd25lcldyYXBwZXIgPVxyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXJzW2RhdGEubmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS5uYW1lXTtcclxuICAgICAgICBjb25zdCBvd25lclNwcml0ZSA9IG93bmVyV3JhcHBlciA/IG93bmVyV3JhcHBlci5vcHBvbmVudCA6IG51bGw7XHJcbiAgICAgICAgLy8gSW5zdGFudGlhdGUgZGV0ZXJtaW5pc3RpYyByZXR1cm5pbmcgc2h1cmlrZW4gKG5vbi1vd25lcilcclxuICAgICAgICBjb25zdCBzaHVyaWtlbiA9IG5ldyBSZXR1cm5pbmdTaHVyaWtlbihcclxuICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICB7IHg6IGRhdGEueCwgeTogZGF0YS55IH0sXHJcbiAgICAgICAgICBvd25lclNwcml0ZSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBkYXRhLmRpcmVjdGlvbixcclxuICAgICAgICAgICAgZm9yd2FyZERpc3RhbmNlOiBkYXRhLmZvcndhcmREaXN0YW5jZSB8fCA1MDAsXHJcbiAgICAgICAgICAgIG91dHdhcmREdXJhdGlvbjogZGF0YS5vdXR3YXJkRHVyYXRpb24gfHwgMzgwLFxyXG4gICAgICAgICAgICByZXR1cm5TcGVlZDogZGF0YS5yZXR1cm5TcGVlZCB8fCA5MDAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uU3BlZWQ6IGRhdGEucm90YXRpb25TcGVlZCB8fCAyMDAwLFxyXG4gICAgICAgICAgICBzY2FsZTogZGF0YS5zY2FsZSB8fCAwLjEsXHJcbiAgICAgICAgICAgIGRhbWFnZTogZGF0YS5kYW1hZ2UsXHJcbiAgICAgICAgICAgIGlzT3duZXI6IGZhbHNlLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gUmVtb3RlIGNvbGxpc2lvbiBvcHRpb25hbDogb21pdHRlZCBmb3Igc2ltcGxpY2l0eSAoYXV0aG9yaXRhdGl2ZSBoaXRzIGJ5IG93bmVyIG9ubHkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEJhc2ljIG5vbi1yZXR1cm5pbmcgcHJvamVjdGlsZSBmYWxsYmFjayAoaWYgZXZlciB1c2VkKVxyXG4gICAgICBjb25zdCBwcm9qID0gdGhpcy5waHlzaWNzLmFkZC5pbWFnZShkYXRhLngsIGRhdGEueSwgZGF0YS53ZWFwb24pO1xyXG4gICAgICBwcm9qLnNldFNjYWxlKGRhdGEuc2NhbGUgfHwgMC4xKTtcclxuICAgICAgcHJvai5zZXRWZWxvY2l0eSgoZGF0YS5kaXJlY3Rpb24gfHwgMSkgKiA0MDAsIDApO1xyXG4gICAgICBwcm9qLnNldEFuZ3VsYXJWZWxvY2l0eShkYXRhLnJvdGF0aW9uU3BlZWQgfHwgNjAwKTtcclxuICAgICAgcHJvai5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlZCBwcm9qZWN0aWxlLXVwZGF0ZS9kZXN0cm95IGxpc3RlbmVycyAobm8gbmV0d29yayBzeW5jaW5nKVxyXG5cclxuICAgIC8vIFdoZW4gYW5vdGhlciBwbGF5ZXIgZGllc1xyXG4gICAgc29ja2V0Lm9uKFwiZGVhdGhcIiwgKGRhdGEpID0+IHtcclxuICAgICAgY2RiZygpO1xyXG4gICAgICBpZiAoZGF0YS51c2VybmFtZSA9PT0gdXNlcm5hbWUpIHtcclxuICAgICAgICAvLyBTZWxmIGRlYXRoIGFscmVhZHkgaGFuZGxlZCB2aWEgaGVhbHRoLXVwZGF0ZSBsaXN0ZW5lciBpbiBwbGF5ZXIuanNcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPVxyXG4gICAgICAgIG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSB8fCB0ZWFtUGxheWVyc1tkYXRhLnVzZXJuYW1lXTtcclxuXHJcbiAgICAgIGlmICghb3Bwb25lbnRQbGF5ZXIpIHJldHVybjsgLy8gU2FmZXR5IGd1YXJkXHJcblxyXG4gICAgICBpZiAoZGF0YS51c2VybmFtZSBpbiBvcHBvbmVudFBsYXllcnMpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInlvdXItdGVhbVwiKS50ZXh0Q29udGVudCA9IGBZb3VyIFRlYW06ICR7XHJcbiAgICAgICAgICBwYXJ0eU1lbWJlcnNOdW0gLSAxXHJcbiAgICAgICAgfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgICAgICBcIm9wcG9zaW5nLXRlYW1cIlxyXG4gICAgICAgICkudGV4dENvbnRlbnQgPSBgT3Bwb3NpbmcgVGVhbTogJHtcclxuICAgICAgICAgIHBhcnR5TWVtYmVyc051bSAtIDFcclxuICAgICAgICB9LyR7cGFydHlNZW1iZXJzfSBwbGF5ZXJzYDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRHlpbmcgYW5pbWF0aW9uXHJcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmFuaW1zLnBsYXkoXCJkeWluZ1wiLCB0cnVlKTtcclxuICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYWxwaGEgPSAwLjU7XHJcbiAgICAgIC8vIFVzZSBsb2NhbCBzcHJpdGUgcG9zaXRpb24gKHNlcnZlciBtYXkgc2VuZCAwIGlmIG5vdCBwZXJzaXN0ZWQgeWV0KVxyXG4gICAgICBvcHBvbmVudFBsYXllci5vcFBsYXllck5hbWUuc2V0UG9zaXRpb24oXHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCxcclxuICAgICAgICBvcHBvbmVudFBsYXllci5vcFBsYXllck5hbWUueSArIDMwXHJcbiAgICAgICk7XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wQ3VycmVudEhlYWx0aCA9IDA7IC8vIGVuZm9yY2UgemVyb1xyXG4gICAgICBvcHBvbmVudFBsYXllci51cGRhdGVIZWFsdGhCYXIodHJ1ZSk7IC8vIGludGVybmFsbHkgY29tcHV0ZXMgWVxyXG5cclxuICAgICAgLy8gRGVsZXRlcyB0aGUgc3ByaXRlIGZyb20gdGhlIGdhbWVcclxuICAgICAgaWYgKG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSkge1xyXG4gICAgICAgIGRlbGV0ZSBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIH0gZWxzZSBpZiAodGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV0pIHtcclxuICAgICAgICBkZWxldGUgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdoZW4gZXZlcnlvbmUgaXMgZGVhZFxyXG4gICAgc29ja2V0Lm9uKFwiZ2FtZS1vdmVyXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNkYmcoKTtcclxuICAgICAgaWYgKGdhbWVJZCA9PT0gZGF0YS5nYW1lSWQpIHtcclxuICAgICAgICBnYW1lRW5kZWQgPSB0cnVlOyAvLyBzdG9wIGVtaXR0aW5nIGZ1cnRoZXIgbW92ZXNcclxuICAgICAgICBjb25zdCBnYW1lT3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1vdmVyXCIpO1xyXG4gICAgICAgIGlmIChkYXRhLmxvc2Vycy5pbmNsdWRlcyh1c2VybmFtZSkpIHtcclxuICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gXCJZb3UgTG9zZVwiO1xyXG4gICAgICAgICAgZ2FtZU92ZXIuc3R5bGUuY29sb3IgPSBcIiNjODEyMTJcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZ2FtZU92ZXIudGV4dENvbnRlbnQgPSBcIllvdSBXaW5cIjtcclxuICAgICAgICAgIGdhbWVPdmVyLnN0eWxlLmNvbG9yID0gXCIjMThjMzIxXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXRzIGVuZCBzY3JlZW4gbmFtZSB0byBwbGF5ZXIgbmFtZVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWUtdGV4dFwiKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLXRleHRcIikudGV4dENvbnRlbnQgPSBjaGFyYWN0ZXI7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLy8gUnVucyBhZnRlciAxIHNlY29uZCBvZiBkZWF0aFxyXG4gICAgICAgICAgLy8gRGlzYWJsZXMgbW92ZW1lbnRcclxuICAgICAgICAgIHRoaXMuaW5wdXQuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW92ZXJsYXlcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFyay1vdmVybGF5XCIpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9XHJcbiAgICAgICAgICAgIFwicmdiYSgwLCAwLCAwLCAwLjM2MylcIjtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgZnVuY3Rpb24gaXMgYSBidWlsdCBpbiBmdW5jdGlvbiB0aGF0IHJ1bnMgYXMgbXVjaCBhcyBwb3NzaWJsZS4gSXQgaXMgY29udHJvbGxlZCBieSB0aGUgcGhhc2VyIHNjZW5lXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKGdhbWVFbmRlZCkgcmV0dXJuOyAvLyBoYWx0IGxvb3Agd29yayBhZnRlciBnYW1lIG92ZXJcclxuICAgIGNkYmcoKTtcclxuICAgIGlmICghZGVhZCkge1xyXG4gICAgICBoYW5kbGVQbGF5ZXJNb3ZlbWVudCh0aGlzKTsgLy8gSGFuZGxlcyBtb3ZlbWVudFxyXG4gICAgICAvLyBUaHJvdHRsZWQgbW92ZSBlbWl0IChjbGllbnQtc2lkZSBwcmVkaWN0aW9uLCBzZXJ2ZXIgcmVjb25jaWxpYXRpb24pXHJcbiAgICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICBpZiAobm93IC0gbmV0TGFzdFNlbmQgPj0gbmV0U2VuZEludGVydmFsTXMpIHtcclxuICAgICAgICBuZXRMYXN0U2VuZCA9IG5vdztcclxuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdmVcIiwge1xyXG4gICAgICAgICAgeDogcGxheWVyLngsXHJcbiAgICAgICAgICB5OiBwbGF5ZXIueSxcclxuICAgICAgICAgIGZsaXA6IHBsYXllci5mbGlwWCxcclxuICAgICAgICAgIGFuaW1hdGlvbjogcGxheWVyLmFuaW1zLmN1cnJlbnRBbmltXHJcbiAgICAgICAgICAgID8gcGxheWVyLmFuaW1zLmN1cnJlbnRBbmltLmtleVxyXG4gICAgICAgICAgICA6IFwiaWRsZVwiLFxyXG4gICAgICAgICAgdXNlcm5hbWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFoYXNTZW50SW5pdGlhbE1vdmUpIGhhc1NlbnRJbml0aWFsTW92ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgY2RiZygpO1xyXG4gICAgfVxyXG4gICAgLy8gQXBwbHkgYXV0aG9yaXRhdGl2ZSBzdGF0ZSBzbW9vdGhpbmcgdG8gb3Bwb25lbnRzIGFuZCByZWNvbmNpbGUgbG9jYWwgcGxheWVyXHJcbiAgICBpZiAoc3RhdGVBY3RpdmUgJiYgbGFzdFNlcnZlclN0YXRlICYmIGxhc3RTZXJ2ZXJTdGF0ZS5wbGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHBsYXllcnNNYXAgPSBsYXN0U2VydmVyU3RhdGUucGxheWVycztcclxuICAgICAgY29uc3QgZHQgPSB0aGlzLmdhbWUubG9vcC5kZWx0YSAvIDEwMDA7XHJcbiAgICAgIGNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSArIChiIC0gYSkgKiB0O1xyXG4gICAgICBjb25zdCBzbW9vdGhGYWN0b3IgPSBQaGFzZXIuTWF0aC5DbGFtcChkdCAqIDEyLCAwLCAxKTsgLy8gcmVzcG9uc2l2ZW5lc3MgdnMuIHNtb290aG5lc3NcclxuXHJcbiAgICAgIC8vIFJlY29uY2lsZSBsb2NhbCBwbGF5ZXIgKGxpZ2h0IGNvcnJlY3Rpb24gdG8gYXZvaWQgaml0dGVyKVxyXG4gICAgICBjb25zdCBteVN0YXRlID0gcGxheWVyc01hcFt1c2VybmFtZV07XHJcbiAgICAgIGlmIChteVN0YXRlICYmICFkZWFkICYmIGhhc1NlbnRJbml0aWFsTW92ZSkge1xyXG4gICAgICAgIC8vIElnbm9yZSB1bmluaXRpYWxpemVkIHNlcnZlciBwb3NpdGlvbnMgKDAsMCkgdG8gcHJldmVudCB0ZWxlcG9ydC1mcm9tLWNvcm5lclxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIChteVN0YXRlLnggPT09IDAgJiYgbXlTdGF0ZS55ID09PSAwKSB8fFxyXG4gICAgICAgICAgTnVtYmVyLmlzTmFOKG15U3RhdGUueCkgfHxcclxuICAgICAgICAgIE51bWJlci5pc05hTihteVN0YXRlLnkpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAvLyB3YWl0IGZvciBhIHZhbGlkIHNuYXBzaG90IGFmdGVyIG91ciBmaXJzdCBtb3ZlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGVyclggPSBteVN0YXRlLnggLSBwbGF5ZXIueDtcclxuICAgICAgICAgIGNvbnN0IGVyclkgPSBteVN0YXRlLnkgLSBwbGF5ZXIueTtcclxuICAgICAgICAgIGNvbnN0IGVyciA9IE1hdGguaHlwb3QoZXJyWCwgZXJyWSk7XHJcbiAgICAgICAgICBjb25zdCBvbkdyb3VuZCA9ICEhKFxyXG4gICAgICAgICAgICBwbGF5ZXIuYm9keSAmJlxyXG4gICAgICAgICAgICBwbGF5ZXIuYm9keS50b3VjaGluZyAmJlxyXG4gICAgICAgICAgICBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKG9uR3JvdW5kKSB7XHJcbiAgICAgICAgICAgIC8vIE9uIGdyb3VuZDogYWxsb3cgbW9kZXJhdGUgY29ycmVjdGlvbnMgKHNuYXAgaWYgZmFyLCBzdGVlciBpZiBzbGlnaHQpXHJcbiAgICAgICAgICAgIGlmIChlcnIgPiA4MCkge1xyXG4gICAgICAgICAgICAgIHBsYXllci54ID0gbXlTdGF0ZS54O1xyXG4gICAgICAgICAgICAgIHBsYXllci55ID0gbXlTdGF0ZS55O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVyciA+IDgpIHtcclxuICAgICAgICAgICAgICBwbGF5ZXIueCA9IGxlcnAocGxheWVyLngsIG15U3RhdGUueCwgc21vb3RoRmFjdG9yICogMC42KTtcclxuICAgICAgICAgICAgICBwbGF5ZXIueSA9IGxlcnAocGxheWVyLnksIG15U3RhdGUueSwgc21vb3RoRmFjdG9yICogMC42KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSW4gYWlyOiBhdm9pZCB2ZXJ0aWNhbCBydWJiZXItYmFuZC4gU3RlZXIgaG9yaXpvbnRhbGx5LCBzbmFwIHZlcnRpY2FsIG9ubHkgaWYgd2F5IG9mZi5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGVyclgpID4gOCkge1xyXG4gICAgICAgICAgICAgIHBsYXllci54ID0gbGVycChwbGF5ZXIueCwgbXlTdGF0ZS54LCBzbW9vdGhGYWN0b3IgKiAwLjQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhlcnJZKSA+IDIyMCkge1xyXG4gICAgICAgICAgICAgIHBsYXllci55ID0gbXlTdGF0ZS55OyAvLyBzbmFwIG9ubHkgaWYgZXh0cmVtZWx5IGRpdmVyZ2VudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgb3Bwb25lbnRzIChib3RoIGVuZW15IGFuZCB1c2VyIHRlYW0gbWlycm9yKVxyXG4gICAgICBjb25zdCBhcHBseVRvID0gKHdyYXBwZXIsIG5hbWUpID0+IHtcclxuICAgICAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcclxuICAgICAgICBjb25zdCBzcHJpdGUgPSB3cmFwcGVyLm9wcG9uZW50O1xyXG4gICAgICAgIGNvbnN0IHMgPSBwbGF5ZXJzTWFwW25hbWVdO1xyXG4gICAgICAgIGlmICghcykgcmV0dXJuO1xyXG4gICAgICAgIC8vIFNraXAgdW5pbml0aWFsaXplZCB6ZXJvIHBvc2l0aW9ucyB0byBhdm9pZCB5YW5raW5nIGZyb20gc3Bhd24gdG8gY29ybmVyXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHMueCA9PT0gMCAmJiBzLnkgPT09IDApIHx8XHJcbiAgICAgICAgICBOdW1iZXIuaXNOYU4ocy54KSB8fFxyXG4gICAgICAgICAgTnVtYmVyLmlzTmFOKHMueSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZHggPSBzLnggLSBzcHJpdGUueDtcclxuICAgICAgICBjb25zdCBkeSA9IHMueSAtIHNwcml0ZS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLmh5cG90KGR4LCBkeSk7XHJcbiAgICAgICAgaWYgKGRpc3QgPiAxMDApIHtcclxuICAgICAgICAgIHNwcml0ZS54ID0gcy54O1xyXG4gICAgICAgICAgc3ByaXRlLnkgPSBzLnk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNwcml0ZS54ID0gbGVycChzcHJpdGUueCwgcy54LCBzbW9vdGhGYWN0b3IpO1xyXG4gICAgICAgICAgc3ByaXRlLnkgPSBsZXJwKHNwcml0ZS55LCBzLnksIHNtb290aEZhY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwcml0ZS5mbGlwWCA9ICEhcy5mbGlwO1xyXG4gICAgICAgIGlmIChzLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgc3ByaXRlLmFuaW1zLnBsYXkocy5hbmltYXRpb24sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVcGRhdGUgbmFtZSB0YWcgcG9zaXRpb25cclxuICAgICAgICB3cmFwcGVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihcclxuICAgICAgICAgIHNwcml0ZS54LFxyXG4gICAgICAgICAgc3ByaXRlLnkgLSBzcHJpdGUuaGVpZ2h0ICsgMTBcclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIG9wcG9uZW50UGxheWVycykge1xyXG4gICAgICAgIGFwcGx5VG8ob3Bwb25lbnRQbGF5ZXJzW25hbWVdLCBuYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGVhbVBsYXllcnMpIHtcclxuICAgICAgICBhcHBseVRvKHRlYW1QbGF5ZXJzW25hbWVdLCBuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gVXBkYXRlcyBoZWFsdGggYmFyc1xyXG4gICAgZm9yIChjb25zdCBwbGF5ZXIgaW4gb3Bwb25lbnRQbGF5ZXJzKSB7XHJcbiAgICAgIGNvbnN0IG9wcG9uZW50UGxheWVyID0gb3Bwb25lbnRQbGF5ZXJzW3BsYXllcl07XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLnVwZGF0ZUhlYWx0aEJhcigpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBwbGF5ZXIgaW4gdGVhbVBsYXllcnMpIHtcclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSB0ZWFtUGxheWVyc1twbGF5ZXJdO1xyXG4gICAgICBvcHBvbmVudFBsYXllci51cGRhdGVIZWFsdGhCYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBObyByZW1vdGUgcHJvamVjdGlsZSBpbnRlcnBvbGF0aW9uIHJlcXVpcmVkXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgdHlwZTogUGhhc2VyLkFVVE8sXHJcbiAgYW50aWFsaWFzOiB0cnVlLFxyXG4gIHJlc29sdXRpb246IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxyXG4gIHNjYWxlOiB7XHJcbiAgICAvLyBNYWtlcyBzdXJlIHRoZSBnYW1lIGxvb2tzIGdvb2Qgb24gYWxsIHNjcmVlbnNcclxuICAgIG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcbiAgICB3aWR0aDogXCIxMzAwcHhcIixcclxuICAgIGhlaWdodDogXCI2MDBweFwiLFxyXG4gIH0sXHJcbiAgc2NlbmU6IEdhbWVTY2VuZSxcclxuICBwaHlzaWNzOiB7XHJcbiAgICBkZWZhdWx0OiBcImFyY2FkZVwiLFxyXG4gICAgYXJjYWRlOiB7XHJcbiAgICAgIGdyYXZpdHk6IHsgeTogOTAwIH0sXHJcbiAgICAgIGRlYnVnOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcclxuXHJcbi8vIEdldHMgY29va2llIHZhbHVlXHJcbmZ1bmN0aW9uIGdldENvb2tpZShjb29raWVOYW1lKSB7XHJcbiAgY29uc3QgbmFtZSA9IGNvb2tpZU5hbWUgKyBcIj1cIjtcclxuICBjb25zdCBkZWNvZGVkQ29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgY29uc3QgY29va2llQXJyYXkgPSBkZWNvZGVkQ29va2llLnNwbGl0KFwiO1wiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgY29va2llID0gY29va2llQXJyYXlbaV0udHJpbSgpO1xyXG4gICAgaWYgKGNvb2tpZS5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbmV4cG9ydCB7IG9wcG9uZW50UGxheWVycywgdGVhbVBsYXllcnMgfTtcclxuIl0sIm5hbWVzIjpbIm5pbmphQW5pbWF0aW9ucyIsInNjZW5lIiwiYW5pbXMiLCJjcmVhdGUiLCJrZXkiLCJmcmFtZXMiLCJnZW5lcmF0ZUZyYW1lTmFtZXMiLCJwcmVmaXgiLCJlbmQiLCJ6ZXJvUGFkIiwiZnJhbWVSYXRlIiwicmVwZWF0IiwiYmFzZSIsInBsYXRmb3JtIiwibGVmdFBsYXRmb3JtIiwicmlnaHRQbGF0Zm9ybSIsImx1c2h5UGVha3NPYmplY3RzIiwibHVzaHlQZWFrcyIsImNhbnZhc1dpZHRoIiwiZ2FtZSIsImNvbmZpZyIsIndpZHRoIiwiY2FudmFzSGVpZ2h0IiwiaGVpZ2h0IiwiY2VudGVyWCIsImNhbWVyYXMiLCJtYWluIiwiYmFja2dyb3VuZCIsImFkZCIsInNwcml0ZSIsImRpc3BsYXlXaWR0aCIsInN5cyIsImNhbnZhcyIsImRpc3BsYXlIZWlnaHQiLCJzZXRPcmlnaW4iLCJwaHlzaWNzIiwiYm9keSIsImFsbG93R3Jhdml0eSIsInNldEltbW92YWJsZSIsInNldFNjYWxlIiwicHVzaCIsImJhc2VNaWRkbGUiLCJiYXNlVG9wIiwiYmFzZUxlZnQiLCJiYXNlUmlnaHQiLCJ0aW55UGxhdGZvcm0xIiwidGlueVBsYXRmb3JtMiIsInRpbnlQbGF0Zm9ybTMiLCJ0aW55UGxhdGZvcm00IiwidGlueVBsYXRmb3JtNSIsInRpbnlQbGF0Zm9ybTYiLCJtYW5ncm92ZU1lYWRvd09iamVjdHMiLCJtYW5ncm92ZU1lYWRvdyIsInNvY2tldCIsIlJldHVybmluZ1NodXJpa2VuIiwiX1BoYXNlciRQaHlzaWNzJEFyY2FkIiwiX2luaGVyaXRzIiwic3RhcnRQb3MiLCJvd25lclNwcml0ZSIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIngiLCJ5IiwiY2ZnIiwiT2JqZWN0IiwiYXNzaWduIiwiZGlyZWN0aW9uIiwiZm9yd2FyZERpc3RhbmNlIiwib3V0d2FyZER1cmF0aW9uIiwicmV0dXJuU3BlZWQiLCJyb3RhdGlvblNwZWVkIiwic2NhbGUiLCJkYW1hZ2UiLCJ1c2VybmFtZSIsImdhbWVJZCIsImlzT3duZXIiLCJtYXhMaWZldGltZSIsImhpdENvb2xkb3duIiwicGhhc2UiLCJlbGFwc2VkIiwidG90YWxFbGFwc2VkIiwiaG92ZXJEdXJhdGlvbiIsInJldHVybkFjY2VsZXJhdGlvbiIsImN1cnJlbnRSZXR1cm5TcGVlZCIsImhpdFRpbWVzdGFtcHMiLCJ0cmFpbEludGVydmFsIiwidHJhaWxBY2N1bSIsInRyYWlscyIsIm1heFRyYWlscyIsImV4aXN0aW5nIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsInNldERlcHRoIiwic2V0QW5ndWxhclZlbG9jaXR5Iiwic3RhcnRYIiwic3RhcnRZIiwiZW5kWCIsImVuZFkiLCJkaXBEb3duIiwiYnVsZ2VVcCIsImN0cmwxWCIsImN0cmwxWSIsImN0cmwyWCIsImN0cmwyWSIsImdsb3dDb2xvciIsImdsb3ciLCJncmFwaGljcyIsImRlcHRoIiwic2V0QmxlbmRNb2RlIiwiUGhhc2VyIiwiQmxlbmRNb2RlcyIsIkFERCIsIl9kcmF3R2xvdyIsInR3ZWVucyIsInRhcmdldHMiLCJmcm9tIiwidG8iLCJhbHBoYSIsImR1cmF0aW9uIiwieW95byIsImVhc2UiLCJldmVudHMiLCJvbiIsInVwZGF0ZVNodXJpa2VuIiwiX2NyZWF0ZUNsYXNzIiwidmFsdWUiLCJjb2xvckludCIsImJhc2VSYWRpdXMiLCJpbm5lclJhZGl1cyIsIm1pZFJhZGl1cyIsIm91dGVyUmFkaXVzIiwiYyIsIkRpc3BsYXkiLCJDb2xvciIsIkludGVnZXJUb0NvbG9yIiwiY2xlYXIiLCJmaWxsU3R5bGUiLCJjb2xvciIsImZpbGxDaXJjbGUiLCJjdWJpYyIsInQiLCJwMCIsInAxIiwicDIiLCJwMyIsIml0IiwidHJ5RGFtYWdlIiwidGFyZ2V0V3JhcHBlciIsInRhcmdldFVzZXJuYW1lIiwiX3VzZXJuYW1lIiwibmFtZSIsIm5vdyIsInRpbWUiLCJsYXN0IiwiZW1pdCIsImF0dGFja2VyIiwidGFyZ2V0IiwiYXR0YWNoRW5lbXlPdmVybGFwIiwib2JqZWN0cyIsIl90aGlzMiIsImZvckVhY2giLCJvYmoiLCJvcHBvbmVudCIsIm92ZXJsYXAiLCJhdHRhY2hNYXBPdmVybGFwIiwic3Bhd25UcmFpbCIsInMiLCJpbWFnZSIsIm9uQ29tcGxldGUiLCJkZXN0cm95IiwibGVuZ3RoIiwib2xkIiwic2hpZnQiLCJkZXN0cm95U2h1cmlrZW4iLCJvZmYiLCJfIiwiZGVsdGEiLCJhY3RpdmUiLCJyYXdUIiwiTWF0aCIsIkNsYW1wIiwiY29zIiwiUEkiLCJueCIsIm55Iiwic2V0UG9zaXRpb24iLCJkeCIsImR5IiwiZGlzdCIsInNxcnQiLCJtaW4iLCJzcGQiLCJvblJldHVybiIsImUiLCJQaHlzaWNzIiwiQXJjYWRlIiwiSW1hZ2UiLCJkZWZhdWx0IiwiZHVzdFBvb2wiLCJkdXN0UG9vbE1heCIsInNwYXduRHVzdCIsInRpbnQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJnIiwiZmluZCIsIm8iLCJiYXNlU2l6ZSIsIkJldHdlZW4iLCJhbHBoYVN0YXJ0IiwiRmxvYXRCZXR3ZWVuIiwicHVmZkNvbG9yIiwicmlzZSIsImRyaWZ0WCIsInNjYWxlVGFyZ2V0IiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsInByZXdhcm1EdXN0IiwiY291bnQiLCJpIiwiY2FsY3VsYXRlU3Bhd24iLCJjYWxjdWxhdGVNYW5ncm92ZVNwYXduIiwiT3BQbGF5ZXIiLCJjaGFyYWN0ZXIiLCJ0ZWFtIiwic3Bhd25QbGF0Zm9ybSIsInNwYXduIiwicGxheWVyc0luVGVhbSIsIm1hcCIsIm1hcE9iamVjdHMiLCJvcE1heEhlYWx0aCIsIm9wQ3VycmVudEhlYWx0aCIsIm9wSGVhbHRoQmFyV2lkdGgiLCJjcmVhdGVPcFBsYXllciIsInBsYXkiLCJvcEZyYW1lIiwiZnJhbWUiLCJzZXRTaXplIiwic2V0T2Zmc2V0Iiwib3BQbGF5ZXJOYW1lIiwidGV4dCIsInNldFN0eWxlIiwiZm9udCIsImZpbGwiLCJvcEhlYWx0aFRleHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJzdHJva2UiLCJzdHJva2VUaGlja25lc3MiLCJvcEhlYWx0aEJhciIsInVwZGF0ZUhlYWx0aEJhciIsImRhdGEiLCJoZWFsdGgiLCJkZWFkIiwiaGVhbHRoQmFyWSIsImhlYWx0aFBlcmNlbnRhZ2UiLCJkaXNwbGF5ZWRXaWR0aCIsImhlYWx0aEJhclgiLCJzZXRUZXh0IiwiY29uY2F0IiwiZmlsbFJlY3QiLCJsaW5lU3R5bGUiLCJzdHJva2VSb3VuZGVkUmVjdCIsImZpbGxSb3VuZGVkUmVjdCIsInBkYmciLCJwbGF5ZXIiLCJjdXJzb3JzIiwiY2FuV2FsbEp1bXAiLCJpc01vdmluZyIsImlzSnVtcGluZyIsImlzQXR0YWNraW5nIiwiY2FuQXR0YWNrIiwibWF4SGVhbHRoIiwiY3VycmVudEhlYWx0aCIsImhlYWx0aEJhcldpZHRoIiwiaGVhbHRoQmFyIiwiaGVhbHRoVGV4dCIsImFtbW9CYXIiLCJhbW1vQmFyQmFjayIsImFtbW9CYXJXaWR0aCIsImFtbW9Db29sZG93bk1zIiwiYW1tb0VsYXBzZWQiLCJhbW1vUmVhZHkiLCJhbW1vVHdlZW4iLCJwbGF5ZXJOYW1lIiwiaW5kaWNhdG9yVHJpYW5nbGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwicG9wIiwib3Bwb25lbnRQbGF5ZXJzUmVmIiwiZmlyZVRyYWlsVGltZXIiLCJmaXJlVHJhaWxJbnRlcnZhbCIsImZpcmVQb29sIiwiZmlyZVBvb2xNYXgiLCJkdXN0VGltZXIiLCJkdXN0SW50ZXJ2YWwiLCJzcGF3bkZpcmVGbGFtZSIsIkdldENvbG9yIiwiZHJpZnRZIiwiY3JlYXRlUGxheWVyIiwic2NlbmVQYXJhbSIsInNwYXduUGxhdGZvcm1QYXJhbSIsInNwYXduUGFyYW0iLCJwbGF5ZXJzSW5UZWFtUGFyYW0iLCJtYXBQYXJhbSIsIm9wcG9uZW50UGxheWVyc1BhcmFtIiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJ3b3JsZCIsImJvdW5kcyIsImJvdHRvbSIsInNldFRpbWVvdXQiLCJ0cmlhbmdsZSIsIkdlb20iLCJUcmlhbmdsZSIsImZpbGxUcmlhbmdsZVNoYXBlIiwicG9pbnRlciIsInJlbW92ZSIsInR3ZWVuUHJveHkiLCJvblVwZGF0ZSIsImRyYXdBbW1vQmFyIiwic2h1cmlrZW5Tb3VuZCIsInNvdW5kIiwic2V0Vm9sdW1lIiwic2V0UmF0ZSIsImZsaXBYIiwiYXJjSGVpZ2h0IiwicmV0dXJuaW5nIiwiZW5lbXlMaXN0IiwicGxheWVySWQiLCJ3ZWFwb24iLCJzZXRDdXJyZW50SGVhbHRoIiwiZm9yY2VkWCIsImZvcmNlZFkiLCJwZXJjZW50IiwiY2hhcmdpbmdDb2xvciIsInJlYWR5Q29sb3IiLCJyMSIsImcxIiwiYjEiLCJyMiIsImcyIiwiYjIiLCJyIiwicm91bmQiLCJiIiwiZmlsbENvbG9yIiwidGwiLCJ0ciIsImJsIiwiYnIiLCJhdmFpbGFibGVTcGFjZSIsImxlZnRNb3N0IiwiZ2V0Qm91bmRzIiwibGVmdCIsInNwYXduWSIsImdldFRvcENlbnRlciIsInNwYXduWCIsInBvc2l0aW9uIiwiU3RyaW5nIiwiaGFuZGxlUGxheWVyTW92ZW1lbnQiLCJzcGVlZCIsImp1bXBTcGVlZCIsImxlZnRLZXkiLCJpc0Rvd24iLCJhZGRLZXkiLCJyaWdodEtleSIsInJpZ2h0IiwidXBLZXkiLCJ1cCIsInNldFZlbG9jaXR5WCIsInRvdWNoaW5nIiwiZG93biIsInN0b3BNb3ZpbmciLCJqdW1wIiwid2FsbEp1bXAiLCJpc1BsYXlpbmciLCJmYWxsIiwiaWRsZSIsImxvb3AiLCJiYXNlWCIsImJhc2VZIiwiZHVzdFkiLCJkdXN0WCIsInJhbmRvbSIsInNldFZlbG9jaXR5WSIsIndhbGxKdW1wVHdlZW4iLCJlbmFibGVkIiwiaW8iLCJjZGJnIiwic3RhdGljUGF0aCIsInBhcnR5SWQiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRDb29raWUiLCJwYXJ0eU1lbWJlcnMiLCJwYXJ0eU1lbWJlcnNOdW0iLCJOdW1iZXIiLCJvcHBvbmVudFBsYXllcnMiLCJ0ZWFtUGxheWVycyIsImdhbWVFbmRlZCIsIm5ldExhc3RTZW5kIiwibmV0U2VuZEludGVydmFsTXMiLCJzdGF0ZUFjdGl2ZSIsImxhc3RTZXJ2ZXJTdGF0ZSIsInBsYXllcnMiLCJoYXNTZW50SW5pdGlhbE1vdmUiLCJHYW1lU2NlbmUiLCJfUGhhc2VyJFNjZW5lIiwicHJlbG9hZCIsImxvYWQiLCJhdGxhcyIsInRpbGVtYXBUaWxlZEpTT04iLCJhdWRpbyIsIm1hcE9iamVjdCIsImNvbGxpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidGV4dENvbnRlbnQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInVzZXJUZWFtIiwidXNlclBsYXllciIsIm9wVGVhbSIsIm9wcG9uZW50UGxheWVyIiwiZXJyb3IiLCJjb25zb2xlIiwiZmlnaHQiLCJvcGFjaXR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldlgiLCJmbGlwIiwiYW5pbWF0aW9uIiwiZGVsdGFYIiwiYWJzIiwiX2R1c3RUaW1lciIsImRZIiwicGF5bG9hZCIsIm93bmVyV3JhcHBlciIsInNodXJpa2VuIiwicHJvaiIsInNldFZlbG9jaXR5IiwiZ2FtZU92ZXIiLCJsb3NlcnMiLCJpbmNsdWRlcyIsImRpc3BsYXkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ1cGRhdGUiLCJwZXJmb3JtYW5jZSIsImN1cnJlbnRBbmltIiwicGxheWVyc01hcCIsImR0IiwibGVycCIsImEiLCJzbW9vdGhGYWN0b3IiLCJteVN0YXRlIiwiaXNOYU4iLCJlcnJYIiwiZXJyWSIsImVyciIsImh5cG90Iiwib25Hcm91bmQiLCJhcHBseVRvIiwid3JhcHBlciIsIlNjZW5lIiwidHlwZSIsIkFVVE8iLCJhbnRpYWxpYXMiLCJyZXNvbHV0aW9uIiwiZGV2aWNlUGl4ZWxSYXRpbyIsIm1vZGUiLCJTY2FsZSIsIkZJVCIsImF1dG9DZW50ZXIiLCJDRU5URVJfQk9USCIsImFyY2FkZSIsImdyYXZpdHkiLCJkZWJ1ZyIsIkdhbWUiLCJjb29raWVOYW1lIiwiZGVjb2RlZENvb2tpZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImNvb2tpZSIsImNvb2tpZUFycmF5IiwidHJpbSIsInN1YnN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=