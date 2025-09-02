/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/characters/draven/anim.js":
/*!***************************************!*\
  !*** ./src/characters/draven/anim.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animations: () => (/* binding */ animations)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function animations(scene) {
  var NAME = "draven";
  var tex = scene.textures.get(NAME);
  var allNames = tex && tex.getFrameNames() || [];
  var lower = new Map(allNames.map(function (n) {
    return [n.toLowerCase(), n];
  }));
  var findFrames = function findFrames(candidates) {
    // candidates: array of lowercase prefixes to try (e.g., ["running", "run"])
    // Return sorted frame names by numeric suffix when present.
    var matched = [];
    var _iterator = _createForOfIteratorHelper(allNames),
      _step;
    try {
      var _loop = function _loop() {
        var name = _step.value;
        var ln = name.toLowerCase();
        if (candidates.some(function (p) {
          return ln.startsWith(p);
        })) {
          matched.push(name);
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
      // Sort by trailing number if any, else lexicographically
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    matched.sort(function (a, b) {
      var ra = /(\d+)(?=\D*$)/.exec(a);
      var rb = /(\d+)(?=\D*$)/.exec(b);
      if (ra && rb) return parseInt(ra[1], 10) - parseInt(rb[1], 10);
      return a.localeCompare(b);
    });
    return matched;
  };
  var make = function make(key, prefixes, frameRate, repeat) {
    if (scene.anims.exists(key)) return; // don't duplicate
    var frames = findFrames(prefixes);
    if (!frames.length) return; // skip if not present
    scene.anims.create({
      key: key,
      frames: frames.map(function (f) {
        return {
          key: NAME,
          frame: f
        };
      }),
      frameRate: frameRate,
      repeat: repeat
    });
  };

  // Try reasonable prefix variants for robustness across atlases
  make("".concat(NAME, "-running"), ["running", "run"], 20, 0);
  make("".concat(NAME, "-idle"), ["idle", "stand", "idle_"], 3, -1);
  make("".concat(NAME, "-jumping"), ["jumping", "jump"], 20, 0);
  make("".concat(NAME, "-sliding"), ["wall", "slide", "sliding"], 20, 2);
  make("".concat(NAME, "-falling"), ["falling", "fall"], 20, 0);
  make("".concat(NAME, "-throw"), ["throw", "attack", "attack_throw"], 15, 0);
  make("".concat(NAME, "-dying"), ["dying", "death", "dead"], 10, 0);
}

/***/ }),

/***/ "./src/characters/draven/constructor.js":
/*!**********************************************!*\
  !*** ./src/characters/draven/constructor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../socket */ "./src/socket.js");
/* harmony import */ var _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/characterStats.js */ "./src/lib/characterStats.js");
/* harmony import */ var _anim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./anim */ "./src/characters/draven/anim.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./effects */ "./src/characters/draven/effects.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/characters/draven/draven.js





// Single source of truth for this character's name/key
var NAME = "draven";
var draven = /*#__PURE__*/function () {
  function draven(_ref) {
    var scene = _ref.scene,
      player = _ref.player,
      username = _ref.username,
      gameId = _ref.gameId,
      opponentPlayersRef = _ref.opponentPlayersRef,
      mapObjects = _ref.mapObjects,
      ammoHooks = _ref.ammoHooks;
    _classCallCheck(this, draven);
    this.scene = scene;
    this.player = player;
    this.username = username;
    this.gameId = gameId;
    this.opponentPlayersRef = opponentPlayersRef;
    this.mapObjects = mapObjects;
    this.ammo = ammoHooks;
  }
  _createClass(draven, [{
    key: "attachInput",
    value: function attachInput() {
      var _this = this;
      this.scene.input.on("pointerdown", function () {
        return _this.handlePointerDown();
      });
    }

    // Common default behavior for firing attacks
  }, {
    key: "performDefaultAttack",
    value: function performDefaultAttack(payloadBuilder, onAfterFire) {
      var _this$ammo = this.ammo,
        getAmmoCooldownMs = _this$ammo.getAmmoCooldownMs,
        tryConsume = _this$ammo.tryConsume,
        setCanAttack = _this$ammo.setCanAttack,
        setIsAttacking = _this$ammo.setIsAttacking,
        drawAmmoBar = _this$ammo.drawAmmoBar;
      if (!tryConsume()) return false;
      setIsAttacking(true);
      setCanAttack(false);
      var cooldown = getAmmoCooldownMs();
      this.scene.time.delayedCall(cooldown, function () {
        return setCanAttack(true);
      });
      setTimeout(function () {
        return setIsAttacking(false);
      }, 250);
      var payload = typeof payloadBuilder === "function" ? payloadBuilder() : null;
      if (payload) _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("attack", payload);
      drawAmmoBar();
      if (typeof onAfterFire === "function") onAfterFire();
      return true;
    }

    // Draven-specific: simple staff arc swipe similar to Thorg's visual for now
  }, {
    key: "handlePointerDown",
    value: function handlePointerDown() {
      var _this2 = this;
      var p = this.player;
      var direction = p.flipX ? -1 : 1;
      var range = 105;
      var duration = 260;
      var stats = this.constructor.getStats && this.constructor.getStats() || {};
      var damage = stats.damage;
      return this.performDefaultAttack(function () {
        if (_this2.scene.anims && (_this2.scene.anims.exists("".concat(NAME, "-throw")) || _this2.scene.anims.exists("throw"))) {
          p.anims.play(_this2.scene.anims.exists("".concat(NAME, "-throw")) ? "".concat(NAME, "-throw") : "throw", true);
        }

        // Visual placeholder: small arc draw using graphics
        var g = _this2.scene.add.graphics();
        g.setDepth(5);
        g.setBlendMode(Phaser.BlendModes.ADD);
        var main = 0xffe29e;
        var outline = 0xfff6d1;
        var thickness = Math.max(12, Math.round(range * 0.18));
        var rx = range;
        var ry = Math.round(range * 0.55);
        var rxInner = Math.max(4, rx - thickness);
        var ryInner = Math.max(3, ry - Math.round(thickness * 0.7));
        var cx = function cx() {
          return p.x + (direction >= 0 ? 20 : -20);
        };
        var cy = function cy() {
          return p.y - p.height * 0.15;
        };
        var ept = function ept(theta, rx0, ry0) {
          return {
            x: cx() + direction * rx0 * Math.cos(theta),
            y: cy() + ry0 * Math.sin(theta)
          };
        };
        var startRad = Phaser.Math.DegToRad(-80);
        var endRad = Phaser.Math.DegToRad(80);
        var proxy = {
          t: 0
        };
        var steps = 18;
        _this2.scene.tweens.add({
          targets: proxy,
          t: 1,
          duration: duration,
          ease: "Sine.easeOut",
          onUpdate: function onUpdate() {
            var now = Phaser.Math.Linear(startRad, endRad, proxy.t);
            var t0 = Phaser.Math.Linear(startRad, now, Math.max(0, proxy.t - 0.25));
            g.clear();
            g.fillStyle(main, 0.85);
            g.beginPath();
            for (var i = 0; i <= steps; i++) {
              var a = Phaser.Math.Linear(t0, now, i / steps);
              var pnt = ept(a, rx, ry);
              if (i === 0) g.moveTo(pnt.x, pnt.y);else g.lineTo(pnt.x, pnt.y);
            }
            for (var _i = steps; _i >= 0; _i--) {
              var _a = Phaser.Math.Linear(t0, now, _i / steps);
              var _pnt = ept(_a, rxInner, ryInner);
              g.lineTo(_pnt.x, _pnt.y);
            }
            g.closePath();
            g.fillPath();
            g.lineStyle(Math.max(2, Math.floor(thickness * 0.3)), outline, 0.9);
            g.beginPath();
            for (var _i2 = 0; _i2 <= steps; _i2++) {
              var _a2 = Phaser.Math.Linear(Math.max(t0, now - 0.25), now, _i2 / steps);
              var _pnt2 = ept(_a2, rx + 2, ry + 1);
              if (_i2 === 0) g.moveTo(_pnt2.x, _pnt2.y);else g.lineTo(_pnt2.x, _pnt2.y);
            }
            g.strokePath();
          },
          onComplete: function onComplete() {
            return g.destroy();
          }
        });

        // Owner-side simple hit detection in arc
        var already = new Set();
        var enemies = Object.values(_this2.opponentPlayersRef || {});
        var tip = {
          x: function x() {
            return cx() + direction * rx;
          },
          y: function y() {
            return cy();
          }
        };
        _this2.scene.time.delayedCall(Math.floor(duration * 0.5), function () {
          for (var _i3 = 0, _enemies = enemies; _i3 < _enemies.length; _i3++) {
            var wrap = _enemies[_i3];
            var spr = wrap && wrap.opponent;
            var name = wrap && wrap.username;
            if (!spr || !name || already.has(name)) continue;
            var dist = Phaser.Math.Distance.Between(spr.x, spr.y, tip.x(), tip.y());
            var dx = spr.x - cx();
            if (dist <= 50 && Math.sign(dx) === Math.sign(direction)) {
              already.add(name);
              _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("hit", {
                attacker: _this2.username,
                target: name,
                damage: damage,
                gameId: _this2.gameId
              });
            }
          }
        });
        return {
          name: _this2.username,
          type: "".concat(NAME, "-slash"),
          direction: direction,
          range: range,
          duration: duration
        };
      });
    }
  }], [{
    key: "getTextureKey",
    value: function getTextureKey() {
      return draven.textureKey;
    }
  }, {
    key: "preload",
    value: function preload(scene) {
      var staticPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/assets";
      // Load atlas and projectile/sounds
      scene.load.atlas(NAME, "".concat(staticPath, "/").concat(NAME, "/spritesheet.png"), "".concat(staticPath, "/").concat(NAME, "/animations.json"));
      // Ensure nearest-neighbor sampling for crisp pixel art
      scene.load.on(Phaser.Loader.Events.COMPLETE, function () {
        var tex = scene.textures.get(NAME);
        if (tex && tex.source && tex.source[0] && tex.source[0].glTexture) {
          // WebGL path: set filter to NEAREST
          tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
        }
        // Also set global default for this scene's game (Phaser 3.70)
        if (scene.game && scene.game.config) {
          scene.game.config.pixelArt = true;
          scene.game.config.antialias = false;
        }
      });
    }
  }, {
    key: "setupAnimations",
    value: function setupAnimations(scene) {
      (0,_anim__WEBPACK_IMPORTED_MODULE_2__.animations)(scene);
    }

    // Remote attack visualization for draven (slash effect only)
  }, {
    key: "handleRemoteAttack",
    value: function handleRemoteAttack(scene, data, ownerWrapper) {}

    // Per-character gameplay and presentation stats
  }, {
    key: "getStats",
    value: function getStats() {
      return _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__.characterStats.draven;
    }
  }]);
  return draven;
}();
// Main texture key used for this character's sprite
_defineProperty(draven, "textureKey", NAME);
// Optional per-player effects class to be used for this character
_defineProperty(draven, "Effects", _effects__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (draven);

/***/ }),

/***/ "./src/characters/draven/effects.js":
/*!******************************************!*\
  !*** ./src/characters/draven/effects.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DravenEffects)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Draven-specific per-player effects (fire trail)
var DravenEffects = /*#__PURE__*/function () {
  function DravenEffects(scene, sprite) {
    _classCallCheck(this, DravenEffects);
    this.scene = scene;
    this.sprite = sprite;
    this._timer = 0;
    this._interval = 45; // ms between flame spawns
    this._pool = [];
    this._poolMax = 60;
  }

  // Internal: get a pooled graphics object
  _createClass(DravenEffects, [{
    key: "_acquire",
    value: function _acquire() {
      var g = this._pool.find(function (o) {
        return !o.active;
      });
      if (!g) {
        g = this.scene.add.graphics();
        this._pool.push(g);
      }
      g.active = true;
      g.clear();
      g.setDepth(0); // behind player
      return g;
    }
  }, {
    key: "_release",
    value: function _release(g) {
      g.active = false;
      g.alpha = 1;
      g.scale = 1;
      g.clear();
      if (this._pool.length > this._poolMax) {
        var old = this._pool.find(function (o) {
          return !o.active;
        });
        if (old) {
          old.destroy();
          var idx = this._pool.indexOf(old);
          if (idx >= 0) this._pool.splice(idx, 1);
        }
      }
    }
  }, {
    key: "_spawnFlame",
    value: function _spawnFlame(x, y) {
      var _this = this;
      var g = this._acquire();
      var baseSize = Phaser.Math.Between(5, 9);
      // Glow layers
      g.fillStyle(0x312841, 0.35);
      g.fillCircle(0, 0, baseSize);
      g.fillStyle(0xba5d22, 0.55);
      g.fillCircle(0, 0, baseSize * 0.65);
      g.fillStyle(Phaser.Display.Color.GetColor(49, Phaser.Math.Between(30, 60), 60), 0.9);
      g.fillCircle(0, 0, baseSize * 0.35);
      g.x = x + Phaser.Math.Between(-3, 3);
      g.y = y + Phaser.Math.Between(-3, 3);
      var driftX = Phaser.Math.Between(-12, 12);
      var driftY = Phaser.Math.Between(-18, -4);
      var scaleTarget = Phaser.Math.FloatBetween(0.15, 0.35);
      var duration = Phaser.Math.Between(260, 420);
      g.scale = 1;
      this.scene.tweens.add({
        targets: g,
        x: g.x + driftX,
        y: g.y + driftY,
        scale: scaleTarget,
        alpha: 0,
        duration: duration,
        ease: "Cubic.easeOut",
        onComplete: function onComplete() {
          return _this._release(g);
        }
      });
    }

    // Update per-frame. isMoving: boolean, dead: boolean
  }, {
    key: "update",
    value: function update(deltaMs, isMoving, dead) {
      if (!this.sprite || dead) return;
      if (!isMoving) return;
      this._timer += deltaMs;
      if (this._timer >= this._interval) {
        this._timer = 0;
        var baseX = this.sprite.x - (this.sprite.flipX ? -14 : 14);
        var baseY = this.sprite.y + 8;
        var count = Phaser.Math.Between(1, 2);
        for (var i = 0; i < count; i++) this._spawnFlame(baseX, baseY);
      }
    }
  }]);
  return DravenEffects;
}();


/***/ }),

/***/ "./src/characters/index.js":
/*!*********************************!*\
  !*** ./src/characters/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFor: () => (/* binding */ createFor),
/* harmony export */   getEffectsClass: () => (/* binding */ getEffectsClass),
/* harmony export */   getStats: () => (/* binding */ getStats),
/* harmony export */   getTextureKey: () => (/* binding */ getTextureKey),
/* harmony export */   handleRemoteAttack: () => (/* binding */ handleRemoteAttack),
/* harmony export */   preloadAll: () => (/* binding */ preloadAll),
/* harmony export */   resolveAnimKey: () => (/* binding */ resolveAnimKey),
/* harmony export */   setupAll: () => (/* binding */ setupAll),
/* harmony export */   setupFor: () => (/* binding */ setupFor)
/* harmony export */ });
/* harmony import */ var _ninja_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ninja/constructor */ "./src/characters/ninja/constructor.js");
/* harmony import */ var _thorg_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thorg/constructor */ "./src/characters/thorg/constructor.js");
/* harmony import */ var _draven_constructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draven/constructor */ "./src/characters/draven/constructor.js");
/* harmony import */ var _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/characterStats.js */ "./src/lib/characterStats.js");
// src/characters/index.js




var registry = {
  ninja: _ninja_constructor__WEBPACK_IMPORTED_MODULE_0__["default"],
  thorg: _thorg_constructor__WEBPACK_IMPORTED_MODULE_1__["default"],
  draven: _draven_constructor__WEBPACK_IMPORTED_MODULE_2__["default"]
};
function preloadAll(scene, staticPath) {
  // Preload assets for all registered characters (simple now, scalable later)
  for (var _i = 0, _Object$keys = Object.keys(registry); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var Cls = registry[key];
    if (Cls.preload) Cls.preload(scene, staticPath);
  }
}
function setupFor(scene, character) {
  var Cls = registry[character];
  if (Cls && Cls.setupAnimations) Cls.setupAnimations(scene);
}
function setupAll(scene) {
  for (var _i2 = 0, _Object$keys2 = Object.keys(registry); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    var Cls = registry[key];
    if (Cls && Cls.setupAnimations) Cls.setupAnimations(scene);
  }
}
function createFor(character, deps) {
  var Cls = registry[character];
  if (!Cls) return null;
  return new Cls(deps);
}

// Returns the Phaser texture key for a given character's main sprite/atlas
function getTextureKey(character) {
  var Cls = registry[character];
  // Prefer an explicit textureKey static, fallback to common "sprite"
  return Cls && (Cls.textureKey || typeof Cls.getTextureKey === "function" && Cls.getTextureKey()) || "sprite";
}

// Delegate handling of a remotely received attack to the character module
function handleRemoteAttack(scene, character, data, ownerWrapper) {
  var Cls = registry[character];
  if (Cls && typeof Cls.handleRemoteAttack === "function") {
    Cls.handleRemoteAttack(scene, data, ownerWrapper);
    return true;
  }
  return false;
}

// Resolve a generic animation key (e.g., 'idle') to a character-specific
// key (e.g., 'ninja-idle' or 'thorg-idle') if present; otherwise, fallback.
function resolveAnimKey(scene, character, genericKey) {
  var fallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "idle";
  var _char = (character || "").toLowerCase();
  var anims = scene && scene.anims;
  if (!anims) return genericKey;

  // If a fully-qualified key is provided (e.g., "ninja-running"):
  if (genericKey && genericKey.includes("-")) {
    // 1) If it already matches this character and exists, use it as-is
    if (genericKey.toLowerCase().startsWith("".concat(_char, "-")) && anims.exists(genericKey)) {
      return genericKey;
    }
    // 2) Try remapping to this character's namespace preserving the suffix
    var suffix = genericKey.split("-").slice(1).join("-");
    var remapped = "".concat(_char, "-").concat(suffix);
    if (anims.exists(remapped)) return remapped;
    // 3) As a last resort, if the given key exists (even for other char), return it
    if (anims.exists(genericKey)) return genericKey;
  }

  // Generic (unprefixed) resolution flow
  var preferred = "".concat(_char, "-").concat(genericKey);
  if (anims.exists(preferred)) return preferred;
  if (anims.exists(genericKey)) return genericKey;
  var fbPreferred = "".concat(_char, "-").concat(fallback);
  if (anims.exists(fbPreferred)) return fbPreferred;
  return anims.exists(fallback) ? fallback : genericKey;
}

// Get merged stats for a character from centralized stats
function getStats(character) {
  return _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_3__.characterStats[character] || _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_3__.characterStats.ninja; // fallback to ninja if character not found
}

// Optional: returns the Effects class for a character, or null if none
function getEffectsClass(character) {
  var Cls = registry[character];
  return Cls && (Cls.Effects || typeof Cls.getEffects === "function" && Cls.getEffects()) || null;
}

/***/ }),

/***/ "./src/characters/ninja/anim.js":
/*!**************************************!*\
  !*** ./src/characters/ninja/anim.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animations: () => (/* binding */ animations)
/* harmony export */ });
function animations(scene) {
  if (!scene.anims.exists("ninja-running")) scene.anims.create({
    key: "ninja-running",
    // Name of animation
    frames: scene.anims.generateFrameNames("ninja", {
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
  if (!scene.anims.exists("ninja-idle")) scene.anims.create({
    key: "ninja-idle",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "idle",
      end: 4,
      zeroPad: 2
    }),
    frameRate: 3,
    repeat: -1
  });
  if (!scene.anims.exists("ninja-jumping")) scene.anims.create({
    key: "ninja-jumping",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "jumping",
      end: 7,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  if (!scene.anims.exists("ninja-sliding")) scene.anims.create({
    key: "ninja-sliding",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "wall",
      end: 0,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 2
  });
  if (!scene.anims.exists("ninja-falling")) scene.anims.create({
    key: "ninja-falling",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "falling",
      end: 2,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  if (!scene.anims.exists("ninja-throw")) scene.anims.create({
    key: "ninja-throw",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "throw",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 15,
    repeat: 0
  });
  if (!scene.anims.exists("ninja-dying")) scene.anims.create({
    key: "ninja-dying",
    frames: scene.anims.generateFrameNames("ninja", {
      prefix: "dying",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 10,
    repeat: 0
  });
}

/***/ }),

/***/ "./src/characters/ninja/attack.js":
/*!****************************************!*\
  !*** ./src/characters/ninja/attack.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReturningShuriken)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../socket */ "./src/socket.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
      hitCooldown: 300
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
      if (!this.cfg.isOwner) return false; // only owner reports hits
      if (!targetWrapper) return false;
      var targetUsername = targetWrapper.username || targetWrapper._username || targetWrapper.name || "unknown";
      var now = this.scene.time.now;
      var last = this.hitTimestamps[targetUsername] || 0;
      if (now - last < this.cfg.hitCooldown) return false;
      this.hitTimestamps[targetUsername] = now;
      // Emit server-authoritative damage event
      _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("hit", {
        attacker: this.cfg.username,
        target: targetUsername,
        damage: this.cfg.damage,
        gameId: this.cfg.gameId
      });
      // Play hit SFX locally for the owner
      try {
        this.scene.sound.play("shurikenHit", {
          volume: 0.1,
          rate: 1.0
        });
      } catch (e) {}
      return true;
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

/***/ "./src/characters/ninja/constructor.js":
/*!*********************************************!*\
  !*** ./src/characters/ninja/constructor.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../socket */ "./src/socket.js");
/* harmony import */ var _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/characterStats.js */ "./src/lib/characterStats.js");
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attack */ "./src/characters/ninja/attack.js");
/* harmony import */ var _anim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./anim */ "./src/characters/ninja/anim.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/characters/ninja/ninja.js





// Single source of truth for this character's name/key
var NAME = "ninja";
var Ninja = /*#__PURE__*/function () {
  function Ninja(_ref) {
    var scene = _ref.scene,
      player = _ref.player,
      username = _ref.username,
      gameId = _ref.gameId,
      opponentPlayersRef = _ref.opponentPlayersRef,
      mapObjects = _ref.mapObjects,
      ammoHooks = _ref.ammoHooks;
    _classCallCheck(this, Ninja);
    this.scene = scene;
    this.player = player;
    this.username = username;
    this.gameId = gameId;
    this.opponentPlayersRef = opponentPlayersRef;
    this.mapObjects = mapObjects;
    this.ammo = ammoHooks;
  }
  _createClass(Ninja, [{
    key: "attachInput",
    value: function attachInput() {
      var _this = this;
      this.scene.input.on("pointerdown", function () {
        return _this.handlePointerDown();
      });
    }

    // Generic/default attack flow: ammo checks, flags, UI, socket emit
  }, {
    key: "performDefaultAttack",
    value: function performDefaultAttack(payloadBuilder, onAfterFire) {
      var _this$ammo = this.ammo,
        getAmmoCooldownMs = _this$ammo.getAmmoCooldownMs,
        tryConsume = _this$ammo.tryConsume,
        setCanAttack = _this$ammo.setCanAttack,
        setIsAttacking = _this$ammo.setIsAttacking,
        drawAmmoBar = _this$ammo.drawAmmoBar;
      if (!tryConsume()) return false;
      setCanAttack(false);
      setIsAttacking(true);
      var cooldown = getAmmoCooldownMs();
      this.scene.time.delayedCall(cooldown, function () {
        return setCanAttack(true);
      });
      // Reset attacking state a bit after shot
      setTimeout(function () {
        return setIsAttacking(false);
      }, 300);

      // Build and broadcast attack payload
      var payload = typeof payloadBuilder === "function" ? payloadBuilder() : null;
      if (payload) _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("attack", payload);

      // Update UI
      drawAmmoBar();
      if (typeof onAfterFire === "function") onAfterFire();
      return true;
    }

    // Ninja-specific attack: spawn a returning shuriken with owner-side collisions
  }, {
    key: "handlePointerDown",
    value: function handlePointerDown() {
      var _this2 = this;
      var p = this.player;
      var direction = p.flipX ? -1 : 1;
      var stats = this.constructor.getStats && this.constructor.getStats() || {};
      var damage = stats.damage;
      var fired = this.performDefaultAttack(function () {
        // Play throw anim and sfx
        var sfx = _this2.scene.sound.add("shurikenThrow");
        sfx.setVolume(0.1);
        sfx.setRate(1.3);
        sfx.play();
        if (_this2.scene.anims && (_this2.scene.anims.exists("".concat(NAME, "-throw")) || _this2.scene.anims.exists("throw"))) {
          p.anims.play(_this2.scene.anims.exists("".concat(NAME, "-throw")) ? "".concat(NAME, "-throw") : "throw", true);
        }
        var config = {
          direction: direction,
          username: _this2.username,
          gameId: _this2.gameId,
          isOwner: true,
          damage: damage,
          rotationSpeed: 2000,
          forwardDistance: 500,
          arcHeight: 160,
          outwardDuration: 380,
          returnSpeed: 900
        };
        var returning = new _attack__WEBPACK_IMPORTED_MODULE_2__["default"](_this2.scene, {
          x: p.x,
          y: p.y
        }, p, config);

        // Owner-only collisions
        var enemyList = Object.values(_this2.opponentPlayersRef || {});
        returning.attachEnemyOverlap(enemyList);
        returning.attachMapOverlap(_this2.mapObjects);

        // Perk: grant ammo on return
        var _this2$ammo = _this2.ammo,
          grantCharge = _this2$ammo.grantCharge,
          setCanAttack = _this2$ammo.setCanAttack,
          drawAmmoBar = _this2$ammo.drawAmmoBar;
        returning.onReturn = function () {
          grantCharge(1);
          setCanAttack(true);
          drawAmmoBar();
        };
        return {
          x: p.x,
          y: p.y,
          scale: config.scale || 0.1,
          damage: config.damage,
          name: _this2.username,
          returning: true,
          direction: direction,
          forwardDistance: config.forwardDistance,
          outwardDuration: config.outwardDuration,
          returnSpeed: config.returnSpeed,
          rotationSpeed: config.rotationSpeed
        };
      });
      return fired;
    }
  }], [{
    key: "getTextureKey",
    value: function getTextureKey() {
      return Ninja.textureKey;
    }
  }, {
    key: "preload",
    value: function preload(scene) {
      var staticPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/assets";
      // Load atlas and projectile/sounds
      scene.load.atlas(NAME, "".concat(staticPath, "/").concat(NAME, "/spritesheet.png"), "".concat(staticPath, "/").concat(NAME, "/animations.json"));
      scene.load.image("shuriken", "".concat(staticPath, "/").concat(NAME, "/shuriken.png"));
      scene.load.audio("shurikenThrow", "".concat(staticPath, "/").concat(NAME, "/shurikenThrow.mp3"));
      scene.load.audio("shurikenHit", "".concat(staticPath, "/").concat(NAME, "/hit.mp3"));
      scene.load.audio("shurikenHitWood", "".concat(staticPath, "/").concat(NAME, "/woodhit.wav"));
    }
  }, {
    key: "setupAnimations",
    value: function setupAnimations(scene) {
      (0,_anim__WEBPACK_IMPORTED_MODULE_3__.animations)(scene);
    }

    // Per-character gameplay and presentation stats
  }, {
    key: "getStats",
    value: function getStats() {
      return _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__.characterStats.ninja;
    }

    // Handle remote attack events for opponents using this character
  }, {
    key: "handleRemoteAttack",
    value: function handleRemoteAttack(scene, data, ownerWrapper) {
      // Support returning shuriken as emitted by local Ninja.attack()
      if (data.returning) {
        var ownerSprite = ownerWrapper ? ownerWrapper.opponent : null;
        // Instantiate a non-owner returning shuriken so visuals match
        var shuriken = new _attack__WEBPACK_IMPORTED_MODULE_2__["default"](scene, {
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
        // Remote collision intentionally omitted (owner authoritative)
        return true;
      }

      // Fallback for simple projectiles if ever used
      var proj = scene.physics.add.image(data.x, data.y, data.weapon || "shuriken");
      proj.setScale(data.scale || 0.1);
      proj.setVelocity((data.direction || 1) * 400, 0);
      proj.setAngularVelocity(data.rotationSpeed || 600);
      proj.body.allowGravity = false;
      return true;
    }
  }]);
  return Ninja;
}();
// Main texture key used for this character's sprite
_defineProperty(Ninja, "textureKey", NAME);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ninja);

/***/ }),

/***/ "./src/characters/thorg/anim.js":
/*!**************************************!*\
  !*** ./src/characters/thorg/anim.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animations: () => (/* binding */ animations)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function animations(scene) {
  var NAME = "thorg";
  var tex = scene.textures.get(NAME);
  var allNames = tex && tex.getFrameNames() || [];
  var lower = new Map(allNames.map(function (n) {
    return [n.toLowerCase(), n];
  }));
  var findFrames = function findFrames(candidates) {
    // candidates: array of lowercase prefixes to try (e.g., ["running", "run"])
    // Return sorted frame names by numeric suffix when present.
    var matched = [];
    var _iterator = _createForOfIteratorHelper(allNames),
      _step;
    try {
      var _loop = function _loop() {
        var name = _step.value;
        var ln = name.toLowerCase();
        if (candidates.some(function (p) {
          return ln.startsWith(p);
        })) {
          matched.push(name);
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
      // Sort by trailing number if any, else lexicographically
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    matched.sort(function (a, b) {
      var ra = /(\d+)(?=\D*$)/.exec(a);
      var rb = /(\d+)(?=\D*$)/.exec(b);
      if (ra && rb) return parseInt(ra[1], 10) - parseInt(rb[1], 10);
      return a.localeCompare(b);
    });
    return matched;
  };
  var make = function make(key, prefixes, frameRate, repeat) {
    if (scene.anims.exists(key)) return; // don't duplicate
    var frames = findFrames(prefixes);
    if (!frames.length) return; // skip if not present
    scene.anims.create({
      key: key,
      frames: frames.map(function (f) {
        return {
          key: NAME,
          frame: f
        };
      }),
      frameRate: frameRate,
      repeat: repeat
    });
  };

  // Try reasonable prefix variants for robustness across atlases
  make("".concat(NAME, "-running"), ["running", "run"], 20, 0);
  make("".concat(NAME, "-idle"), ["idle", "stand", "idle_"], 5, -1);
  make("".concat(NAME, "-jumping"), ["jumping", "jump"], 20, 0);
  make("".concat(NAME, "-sliding"), ["wall", "slide", "sliding"], 20, 2);
  make("".concat(NAME, "-falling"), ["falling", "fall"], 20, 0);
  make("".concat(NAME, "-throw"), ["throw", "attack", "attack_throw"], 15, 0);
  make("".concat(NAME, "-dying"), ["dying", "death", "dead"], 10, 0);
}

/***/ }),

/***/ "./src/characters/thorg/constructor.js":
/*!*********************************************!*\
  !*** ./src/characters/thorg/constructor.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../socket */ "./src/socket.js");
/* harmony import */ var _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/characterStats.js */ "./src/lib/characterStats.js");
/* harmony import */ var _anim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./anim */ "./src/characters/thorg/anim.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/characters/thorg/thorg.js




// Single source of truth for this character's name/key
var NAME = "thorg";
var Thorg = /*#__PURE__*/function () {
  function Thorg(_ref) {
    var scene = _ref.scene,
      player = _ref.player,
      username = _ref.username,
      gameId = _ref.gameId,
      opponentPlayersRef = _ref.opponentPlayersRef,
      mapObjects = _ref.mapObjects,
      ammoHooks = _ref.ammoHooks;
    _classCallCheck(this, Thorg);
    this.scene = scene;
    this.player = player;
    this.username = username;
    this.gameId = gameId;
    this.opponentPlayersRef = opponentPlayersRef;
    this.mapObjects = mapObjects;
    this.ammo = ammoHooks;
  }
  _createClass(Thorg, [{
    key: "attachInput",
    value: function attachInput() {
      var _this = this;
      this.scene.input.on("pointerdown", function () {
        return _this.handlePointerDown();
      });
    }

    // Common default behavior for firing attacks
  }, {
    key: "performDefaultAttack",
    value: function performDefaultAttack(payloadBuilder, onAfterFire) {
      var _this$ammo = this.ammo,
        getAmmoCooldownMs = _this$ammo.getAmmoCooldownMs,
        tryConsume = _this$ammo.tryConsume,
        setCanAttack = _this$ammo.setCanAttack,
        setIsAttacking = _this$ammo.setIsAttacking,
        drawAmmoBar = _this$ammo.drawAmmoBar;
      if (!tryConsume()) return false;
      setIsAttacking(true);
      setCanAttack(false);
      var cooldown = getAmmoCooldownMs();
      this.scene.time.delayedCall(cooldown, function () {
        return setCanAttack(true);
      });
      setTimeout(function () {
        return setIsAttacking(false);
      }, 250);
      var payload = typeof payloadBuilder === "function" ? payloadBuilder() : null;
      if (payload) _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("attack", payload);
      drawAmmoBar();
      if (typeof onAfterFire === "function") onAfterFire();
      return true;
    }
  }, {
    key: "handlePointerDown",
    value: function handlePointerDown() {
      var _this2 = this;
      var p = this.player;
      var direction = p.flipX ? -1 : 1;
      var range = 90;
      var duration = 220; // ms
      var stats = this.constructor.getStats && this.constructor.getStats() || {};
      var damage = stats.damage;

      // Character-specific execution wrapped by default attack flow
      return this.performDefaultAttack(function () {
        // Play a suitable animation
        if (_this2.scene.anims && (_this2.scene.anims.exists("".concat(NAME, "-throw")) || _this2.scene.anims.exists("throw"))) {
          p.anims.play(_this2.scene.anims.exists("".concat(NAME, "-throw")) ? "".concat(NAME, "-throw") : "throw", true);
        }

        // Local visual effect
        Thorg._spawnSlashEffect(_this2.scene, p, direction, range, duration);

        // Owner-side hit detection
        var alreadyHit = new Set();
        var enemies = Object.values(_this2.opponentPlayersRef || {});
        var centerOffsetY = p.height * 0.2;
        var cx = function cx() {
          return p.x + (direction >= 0 ? 10 : -10);
        };
        var cy = function cy() {
          return p.y - centerOffsetY;
        };
        var startRad = Phaser.Math.DegToRad(direction >= 0 ? -60 : 240);
        var endRad = Phaser.Math.DegToRad(direction >= 0 ? 60 : 120);
        var proxy = {
          t: 0
        };
        _this2.scene.tweens.add({
          targets: proxy,
          t: 1,
          duration: duration,
          ease: "Sine.easeOut",
          onUpdate: function onUpdate() {
            var cur = Phaser.Math.Linear(startRad, endRad, proxy.t);
            var tipX = cx() + direction * Math.cos(cur) * range;
            var tipY = cy() + Math.sin(cur) * Math.round(range * 0.6);
            for (var _i = 0, _enemies = enemies; _i < _enemies.length; _i++) {
              var wrap = _enemies[_i];
              var spr = wrap && wrap.opponent;
              var name = wrap && wrap.username;
              if (!spr || !name || alreadyHit.has(name)) continue;
              var dx = spr.x - cx();
              var dist = Math.hypot(spr.x - tipX, spr.y - tipY);
              if (dist <= 38 && Math.sign(dx) === Math.sign(direction)) {
                alreadyHit.add(name);
                _socket__WEBPACK_IMPORTED_MODULE_0__["default"].emit("hit", {
                  attacker: _this2.username,
                  target: name,
                  damage: damage,
                  gameId: _this2.gameId
                });
              }
            }
          }
        });
        return {
          name: _this2.username,
          type: "".concat(NAME, "-slash"),
          direction: direction,
          range: range,
          duration: duration
        };
      });
    }
  }], [{
    key: "getTextureKey",
    value: function getTextureKey() {
      return Thorg.textureKey;
    }
  }, {
    key: "preload",
    value: function preload(scene) {
      var staticPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/assets";
      // Load atlas and projectile/sounds
      scene.load.atlas(NAME, "".concat(staticPath, "/").concat(NAME, "/spritesheet.png"), "".concat(staticPath, "/").concat(NAME, "/animations.json"));
      // Optional VFX sprite (place at /assets/thorg/slash.png). Falls back to vector if missing.
      // scene.load.image("shuriken", `${staticPath}/thorg/shuriken.png`);
      // scene.load.audio("shurikenThrow", `${staticPath}/thorg/shurikenThrow.mp3`);
      // scene.load.audio("shurikenHit", `${staticPath}/thorg/hit.mp3`);
    }
  }, {
    key: "setupAnimations",
    value: function setupAnimations(scene) {
      (0,_anim__WEBPACK_IMPORTED_MODULE_2__.animations)(scene);
    }

    // Remote attack visualization for Thorg (slash effect only)
  }, {
    key: "handleRemoteAttack",
    value: function handleRemoteAttack(scene, data, ownerWrapper) {
      if (data.type !== "".concat(NAME, "-slash")) return false;
      var ownerSprite = ownerWrapper ? ownerWrapper.opponent : null;
      if (!ownerSprite) return true; // nothing to show
      // Spawn a visual-only slash effect attached to the owner sprite
      Thorg._spawnSlashEffect(scene, ownerSprite, data.direction, data.range, data.duration);
      return true;
    }

    // Shared helper to render the slash effect (graphics stroke arc)
  }, {
    key: "_spawnSlashEffect",
    value: function _spawnSlashEffect(scene, sprite) {
      var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var range = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
      var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 300;
      // If we have an image, animate it along an overhead oval path. Otherwise, fallback to vector band.
      var hasTex = scene.textures.exists("".concat(NAME, "-weapon"));
      var originOffsetY = sprite.height * 0.1;
      var cx = function cx() {
        return sprite.x + (direction >= 0 ? 10 : -10);
      };
      var cy = function cy() {
        return sprite.y - originOffsetY;
      };
      var rx = range;
      var ry = Math.round(range * 0.6);
      var startRad = Phaser.Math.DegToRad(-90);
      var endRad = Phaser.Math.DegToRad(90);
      if (hasTex) {
        var eff = scene.add.image(cx(), cy(), "".concat(NAME, "-weapon"));
        eff.setDepth(6);
        eff.setScale(0.9);
        eff.setOrigin(direction >= 0 ? 0.1 : 0.9, 0.5); // pivot near the sword
        eff.setFlipX(direction < 0);
        var _proxy = {
          t: 0
        };
        var tween = scene.tweens.add({
          targets: _proxy,
          t: 1,
          duration: duration,
          ease: "Sine.easeOut",
          onUpdate: function onUpdate() {
            var a = Phaser.Math.Linear(startRad, endRad, _proxy.t);
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            eff.x = cx() + direction * rx * cos;
            eff.y = cy() + ry * sin;
            // Face along tangent of the path
            var tangent = Math.atan2(ry * Math.cos(a), -direction * rx * Math.sin(a));
            eff.rotation = tangent;
          },
          onComplete: function onComplete() {
            eff.destroy();
          }
        });
        return tween;
      }

      // Fallback: draw an additive oval band (previous implementation)
      var g = scene.add.graphics();
      g.setDepth(5);
      g.setBlendMode(Phaser.BlendModes.ADD);
      var mainColor = 0x9ed1ff;
      var outlineColor = 0xe4f5ff;
      var thickness = Math.max(14, Math.round(range * 0.22));
      var rxInner = Math.max(6, rx - thickness);
      var ryInner = Math.max(4, ry - Math.round(thickness * 0.75));
      var ept = function ept(theta, rx0, ry0) {
        return {
          x: cx() + direction * rx0 * Math.cos(theta),
          y: cy() + ry0 * Math.sin(theta)
        };
      };
      var proxy = {
        t: 0
      };
      var steps = 18;
      return scene.tweens.add({
        targets: proxy,
        t: 1,
        duration: duration,
        ease: "Sine.easeOut",
        onUpdate: function onUpdate() {
          var now = Phaser.Math.Linear(startRad, endRad, proxy.t);
          var t0 = Phaser.Math.Linear(startRad, now, Math.max(0, proxy.t - 0.25));
          g.clear();
          g.fillStyle(mainColor, 0.85);
          g.beginPath();
          for (var i = 0; i <= steps; i++) {
            var a = Phaser.Math.Linear(t0, now, i / steps);
            var p = ept(a, rx, ry);
            if (i === 0) g.moveTo(p.x, p.y);else g.lineTo(p.x, p.y);
          }
          for (var _i2 = steps; _i2 >= 0; _i2--) {
            var _a = Phaser.Math.Linear(t0, now, _i2 / steps);
            var _p = ept(_a, rxInner, ryInner);
            g.lineTo(_p.x, _p.y);
          }
          g.closePath();
          g.fillPath();
          g.lineStyle(Math.max(2, Math.floor(thickness * 0.3)), outlineColor, 0.9);
          g.beginPath();
          for (var _i3 = 0; _i3 <= steps; _i3++) {
            var _a2 = Phaser.Math.Linear(Math.max(t0, now - 0.25), now, _i3 / steps);
            var _p2 = ept(_a2, rx + 2, ry + 1);
            if (_i3 === 0) g.moveTo(_p2.x, _p2.y);else g.lineTo(_p2.x, _p2.y);
          }
          g.strokePath();
        },
        onComplete: function onComplete() {
          return g.destroy();
        }
      });
    }

    // Per-character gameplay and presentation stats
  }, {
    key: "getStats",
    value: function getStats() {
      return _lib_characterStats_js__WEBPACK_IMPORTED_MODULE_1__.characterStats.thorg;
    }
  }]);
  return Thorg;
}();
// Main texture key used for this character's sprite
_defineProperty(Thorg, "textureKey", NAME);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thorg);

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
  var tint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0xbbbbbb;
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
  // Slightly higher starting alpha range for better visibility
  var alphaStart = Phaser.Math.FloatBetween(0.45, 0.65);
  var puffColor = Phaser.Display.Color.IntegerToColor(tint);
  // Outer soft ring
  g.fillStyle(puffColor.color, alphaStart * 0.6);
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

// Note: character-specific effects (like Draven's fire trail) live in
// their own files under src/characters/<char>/effects.js.

/***/ }),

/***/ "./src/lib/characterStats.js":
/*!***********************************!*\
  !*** ./src/lib/characterStats.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_CHARACTER: () => (/* binding */ DEFAULT_CHARACTER),
/* harmony export */   LEVEL_CAP: () => (/* binding */ LEVEL_CAP),
/* harmony export */   characterStats: () => (/* binding */ characterStats),
/* harmony export */   defaultCharacterList: () => (/* binding */ defaultCharacterList),
/* harmony export */   getAllCharacters: () => (/* binding */ getAllCharacters),
/* harmony export */   getCharacterStats: () => (/* binding */ getCharacterStats),
/* harmony export */   getDamage: () => (/* binding */ getDamage),
/* harmony export */   getFreeCharacters: () => (/* binding */ getFreeCharacters),
/* harmony export */   getHealth: () => (/* binding */ getHealth),
/* harmony export */   getSpecialDamage: () => (/* binding */ getSpecialDamage),
/* harmony export */   unlockPrice: () => (/* binding */ unlockPrice),
/* harmony export */   upgradePrice: () => (/* binding */ upgradePrice)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
// Character stats without dependencies on Phaser or character classes
// Single source of truth for all character stats and constants

// Default character for new users
var DEFAULT_CHARACTER = "ninja";
var LEVEL_CAP = 5;
var characterStats = {
  ninja: {
    baseHealth: 8000,
    attackDescription: "Unleashes a shuriken that boomerangs back.",
    baseDamage: 1000,
    ammoCooldownMs: 200,
    ammoReloadMs: 1400,
    ammoCapacity: 1,
    specialDescription: "Dashes forward, releasing a flurry of shurikens.",
    specialBaseDamage: 2000,
    specialChargeHits: 3,
    spriteScale: 1,
    body: {
      widthShrink: 35,
      heightShrink: 10,
      offsetXFromHalf: 0,
      offsetY: 10
    },
    description: "A swift and agile fighter.",
    free: true
  },
  thorg: {
    baseHealth: 13000,
    attackDescription: "Swings a heavy axe in a short arc, pushing back nearby enemies.",
    baseDamage: 1800,
    ammoCooldownMs: 350,
    ammoReloadMs: 1000,
    ammoCapacity: 3,
    specialDescription: "Slams the ground to send a shockwave forward.",
    specialBaseDamage: 2800,
    specialChargeHits: 4,
    spriteScale: 0.7,
    body: {
      widthShrink: 30,
      heightShrink: 8,
      offsetXFromHalf: -43,
      offsetY: 8
    },
    description: "A sturdy frontline bruiser with crushing blows.",
    free: true
  },
  draven: {
    baseHealth: 6000,
    attackDescription: "Puffs out a magical smoke that deals splash baseDamage to everyone in the path.",
    baseDamage: 1800,
    ammoCooldownMs: 250,
    ammoReloadMs: 1700,
    ammoCapacity: 3,
    specialDescription: "Unleashes a staff nova that expands outward.",
    specialBaseDamage: 2400,
    specialChargeHits: 3,
    spriteScale: 1.2,
    body: {
      widthShrink: 220,
      heightShrink: 195,
      offsetXFromHalf: 90,
      offsetY: 113,
      // Shift body to the right when facing left to cover staff
      flipOffset: 5
    },
    description: "A dark sorcerer who manipulates shadows.",
    unlockPrice: 280
  }
};
function getCharacterStats(character) {
  return characterStats[character] || undefined;
}
function getAllCharacters() {
  return Object.keys(characterStats);
}
function getFreeCharacters() {
  return Object.keys(characterStats).filter(function (_char) {
    return characterStats[_char].free;
  });
}
function defaultCharacterList() {
  return Object.fromEntries(Object.keys(characterStats).map(function (_char2) {
    return [_char2, characterStats[_char2].free ? 1 : 0];
  }));
}
function getHealth(character, level) {
  return characterStats[character].baseHealth + (level - 1) * 500;
}
function getDamage(character, level) {
  return characterStats[character].baseDamage + (level - 1) * 100;
}
function getSpecialDamage(character, level) {
  return characterStats[character].specialBaseDamage + (level - 1) * 200;
}

// The level upgrade price reflects the current level the character is at
// If the character was at level 1 it would cost 200 to go to level 2
function upgradePrice(level) {
  return 200 * Math.pow(2, level - 1); // Doubles every level
}
function unlockPrice(character) {
  return characterStats[character].unlockPrice || undefined;
}

// CommonJS export for server-side compatibility
if ( true && module.exports) {
  module.exports = {
    DEFAULT_CHARACTER: DEFAULT_CHARACTER,
    LEVEL_CAP: LEVEL_CAP,
    characterStats: characterStats,
    defaultCharacterList: defaultCharacterList,
    upgradePrice: upgradePrice,
    unlockPrice: unlockPrice
  };
}

/***/ }),

/***/ "./src/lib/cookies.js":
/*!****************************!*\
  !*** ./src/lib/cookies.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCookie: () => (/* binding */ createCookie),
/* harmony export */   deleteCookie: () => (/* binding */ deleteCookie),
/* harmony export */   getCookie: () => (/* binding */ getCookie),
/* harmony export */   getDisplayName: () => (/* binding */ getDisplayName),
/* harmony export */   setCookie: () => (/* binding */ setCookie)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// cookies.js

var DEFAULT_PATH = "/";
var DEFAULT_SAMESITE = "Lax";

/**
 * Set a non-HttpOnly cookie from the browser.
 * NOTE: You cannot set/clear the signed HttpOnly identity cookie (guest_id/user_id) from JS.
 * Use a server endpoint (e.g., POST /logout) to clear identity cookies.
 */
function setCookie(name, value) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$days = _ref.days,
    days = _ref$days === void 0 ? 30 : _ref$days,
    _ref$path = _ref.path,
    path = _ref$path === void 0 ? DEFAULT_PATH : _ref$path,
    _ref$sameSite = _ref.sameSite,
    sameSite = _ref$sameSite === void 0 ? DEFAULT_SAMESITE : _ref$sameSite,
    secure = _ref.secure;
  var maxAge = Math.max(0, Math.floor(days * 24 * 60 * 60)); // seconds
  var isHttps = typeof window !== "undefined" && window.location && window.location.protocol === "https:";
  var useSecure = secure !== null && secure !== void 0 ? secure : isHttps;
  var cookie = "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value), "; ") + "Max-Age=".concat(maxAge, "; Path=").concat(path, "; SameSite=").concat(sameSite);
  if (useSecure) cookie += "; Secure";
  document.cookie = cookie;
}

/** Backward compatibility for existing imports */
var createCookie = setCookie;

/**
 * Get a cookie value by name. Returns "" if not found (backward compatible).
 */
function getCookie(name) {
  var needle = "".concat(encodeURIComponent(name), "=");
  var raw = document.cookie || "";
  if (!raw) return "";
  var parts = raw.split("; ");
  var _iterator = _createForOfIteratorHelper(parts),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;
      if (part.startsWith(needle)) {
        return decodeURIComponent(part.slice(needle.length));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return "";
}

/**
 * Delete a cookie by name.
 * NOTE: This cannot delete HttpOnly cookies set by the server; use a server route (e.g., /logout).
 */
function deleteCookie(name) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$path = _ref2.path,
    path = _ref2$path === void 0 ? DEFAULT_PATH : _ref2$path,
    _ref2$sameSite = _ref2.sameSite,
    sameSite = _ref2$sameSite === void 0 ? DEFAULT_SAMESITE : _ref2$sameSite,
    secure = _ref2.secure;
  var isHttps = typeof window !== "undefined" && window.location && window.location.protocol === "https:";
  var useSecure = secure !== null && secure !== void 0 ? secure : isHttps;
  var cookie = "".concat(encodeURIComponent(name), "=; Max-Age=0; Path=").concat(path, "; SameSite=").concat(sameSite);
  if (useSecure) cookie += "; Secure";
  document.cookie = cookie;
}

/** Convenience helper for your UI banner */
function getDisplayName() {
  return getCookie("display_name") || "Guest";
}

/***/ }),

/***/ "./src/maps/lushyPeaks.js":
/*!********************************!*\
  !*** ./src/maps/lushyPeaks.js ***!
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
  var background = scene.add.sprite(0, -180, "lushy-bg");
  // Set background to the size of the canvas
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 500; // add 500 to prevent distortion
  background.setOrigin(0, 0);

  // Base
  base = scene.physics.add.sprite(centerX, 550, "lushy-base");
  base.body.allowGravity = false; // Doesn't allow gravity
  base.setImmovable(true); // Makes sure it doesn't move
  base.setScale(0.7); // Makes it smaller
  lushyPeaksObjects.push(base);

  // Platform
  platform = scene.physics.add.sprite(centerX, 250, "lushy-platform");
  platform.setScale(0.7);
  platform.body.allowGravity = false;
  platform.setImmovable(true);
  lushyPeaksObjects.push(platform);

  // Left Platform
  leftPlatform = scene.physics.add.sprite(centerX - 500, 260, "lushy-side-platform");
  leftPlatform.setScale(0.7);
  leftPlatform.body.allowGravity = false;
  leftPlatform.setImmovable(true);
  lushyPeaksObjects.push(leftPlatform);

  // Right Platform
  rightPlatform = scene.physics.add.sprite(centerX + 500, 260, "lushy-side-platform");
  rightPlatform.setScale(0.7);
  rightPlatform.body.allowGravity = false;
  rightPlatform.setImmovable(true);
  lushyPeaksObjects.push(rightPlatform);
}


/***/ }),

/***/ "./src/maps/mangroveMeadow.js":
/*!************************************!*\
  !*** ./src/maps/mangroveMeadow.js ***!
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
  var background = scene.add.sprite(0, -180, "mangrove-bg");
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
/* harmony import */ var _maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maps/lushyPeaks */ "./src/maps/lushyPeaks.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./characters */ "./src/characters/index.js");
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
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
    this.effects = null; // per-opponent effects (e.g., Draven fire)
    this.createOpPlayer();
  }
  _createClass(OpPlayer, [{
    key: "createOpPlayer",
    value: function createOpPlayer() {
      var _bs$widthShrink,
        _bs$heightShrink,
        _this = this;
      // Creates the sprite
      var textureKey = (0,_characters__WEBPACK_IMPORTED_MODULE_2__.getTextureKey)(this.character);
      this.opponent = this.scene.physics.add.sprite(-100, -100, textureKey);
      // Avoid first-frame pop: hide until frame/body configured and spawn applied
      this.opponent.setVisible(false);
      var stats = (0,_characters__WEBPACK_IMPORTED_MODULE_2__.getStats)(this.character);
      this.bodyConfig = stats && stats.body || {};
      // Apply per-character max health for correct bar scaling
      if (stats && typeof stats.maxHealth === "number") {
        this.opMaxHealth = stats.maxHealth;
        this.opCurrentHealth = this.opMaxHealth;
      }
      if (stats.spriteScale && stats.spriteScale !== 1) {
        this.opponent.setScale(stats.spriteScale);
      }
      this.opponent.body.allowGravity = false;
      this.opponent.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_2__.resolveAnimKey)(this.scene, this.character, "idle"), true);

      // Configure frame/body BEFORE computing spawn for correct initial grounding
      this.opFrame = this.opponent.frame;
      var bs = this.bodyConfig;
      var widthShrink = (_bs$widthShrink = bs.widthShrink) !== null && _bs$widthShrink !== void 0 ? _bs$widthShrink : 35;
      var heightShrink = (_bs$heightShrink = bs.heightShrink) !== null && _bs$heightShrink !== void 0 ? _bs$heightShrink : 10;
      this.opponent.body.setSize(this.opFrame.width - widthShrink, this.opFrame.height - heightShrink);
      this.applyFlipOffset();

      // Per-character effects: instantiate if available for this character
      var EffectsCls = (0,_characters__WEBPACK_IMPORTED_MODULE_2__.getEffectsClass)(this.character);
      if (EffectsCls) {
        this.effects = new EffectsCls(this.scene, this.opponent);
        this.scene.events.on("update", this._onSceneUpdate, this);
      }

      // Sets spawns
      if (this.spawnPlatform === "bottom") {
        if (this.map === "1") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.base, this.spawn, this.opponent);
        } else if (this.map === "2") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateMangroveSpawn)("bottom", this.spawn, this.opponent);
        }
      } else if (this.spawnPlatform === "top") {
        if (this.map === "1") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_0__.platform, this.spawn, this.opponent);
        } else if (this.map === "2") {
          (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateMangroveSpawn)("top", this.spawn, this.opponent);
        }
      }

      // Reveal only after position is finalized
      this.opponent.setVisible(true);

      // Sets the text of the name to username
      var bodyTop = this.opponent.body ? this.opponent.body.y : this.opponent.y - this.opponent.height / 2;
      this.opPlayerName = this.scene.add.text(this.opponent.x, bodyTop - 36, this.username);
      this.opPlayerName.setStyle({
        font: "bold 8pt Arial",
        fill: "#000000"
      });
      this.opPlayerName.setOrigin(0.5, 0);
      this.opPlayerName.setDepth(3); // above health text

      this.opHealthText = this.scene.add.text(0, 0, "", {
        fontFamily: "Arial",
        fontSize: "10px",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 4
      });
      this.opHealthBar = this.scene.add.graphics();

      // Initially updates health bar and name positioning
      this.updateHealthBar();
      this.updateUIPosition();

      // Listen for health updates for this opponent
      _socket__WEBPACK_IMPORTED_MODULE_3__["default"].on("health-update", function (data) {
        // data: { username, health, gameId }
        if (data.username === _this.username) {
          _this.opCurrentHealth = data.health;
          if (_this.opCurrentHealth <= 0) {
            _this.opCurrentHealth = 0;
            _this.updateHealthBar(true); // show dead styling & 0
            // Stop effects if any
            if (_this.effects) {
              // no explicit destroy needed, just stop updating
              _this.scene.events.off("update", _this._onSceneUpdate, _this);
              _this.effects = null;
            }
          } else {
            _this.updateHealthBar();
          }
        }
      });
    }
  }, {
    key: "_onSceneUpdate",
    value: function _onSceneUpdate() {
      if (this.effects && this.opponent) {
        // Determine simple moving state: horizontal velocity or recent tweening
        var moving = this.opponent.body && Math.abs(this.opponent.body.velocity.x) > 5 || !!this.movementTween;
        var isDead = this.opCurrentHealth <= 0;
        this.effects.update(this.scene.game.loop.delta, moving, isDead);
      }
    }

    // Adjust body offset depending on facing; uses optional flipOffset from body config
  }, {
    key: "applyFlipOffset",
    value: function applyFlipOffset() {
      var _bs$offsetXFromHalf, _bs$offsetY;
      if (!this.opponent || !this.opponent.body) return;
      var bs = this.bodyConfig || {};
      var offsetXFromHalf = (_bs$offsetXFromHalf = bs.offsetXFromHalf) !== null && _bs$offsetXFromHalf !== void 0 ? _bs$offsetXFromHalf : 0;
      var offsetY = (_bs$offsetY = bs.offsetY) !== null && _bs$offsetY !== void 0 ? _bs$offsetY : 10;
      var flipOffset = bs.flipOffset || 0; // falsy -> 0
      var extra = this.opponent.flipX ? flipOffset : 0;
      this.opponent.body.setOffset(this.opponent.body.width / 2 + offsetXFromHalf + extra, offsetY);
    }

    // Public helper to sync UI positions immediately (used after teleports/initial position set)
  }, {
    key: "updateUIPosition",
    value: function updateUIPosition() {
      if (!this.opponent) return;
      var bodyTop = this.opponent.body ? this.opponent.body.y : this.opponent.y - this.opponent.height / 2;
      if (this.opPlayerName) {
        this.opPlayerName.setPosition(this.opponent.x, bodyTop - 36);
      }
      this.updateHealthBar(false);
    }
  }, {
    key: "updateHealthBar",
    value: function updateHealthBar() {
      var dead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var healthBarY = arguments.length > 1 ? arguments[1] : undefined;
      if (this.opCurrentHealth < 0) {
        // Prevents health from going negative
        this.opCurrentHealth = 0;
      }
      // Sets percentage of health
      var healthPercentage = Math.max(0, Math.min(1, this.opCurrentHealth / this.opMaxHealth));
      var displayedWidth = this.opHealthBarWidth * healthPercentage;

      // Clears previous health bar graphics
      this.opHealthBar.clear();

      // Sets x in the center
      var healthBarX = this.opponent.x - this.opHealthBarWidth / 2;
      // If no explicit Y provided, anchor to the sprite's body top so it doesn't jump
      var bodyTop = this.opponent.body ? this.opponent.body.y : this.opponent.y - this.opponent.height / 2;
      var y = typeof healthBarY === "number" && !Number.isNaN(healthBarY) ? healthBarY : bodyTop - 15;
      if (dead === false) {
        this.opHealthText.setText("".concat(this.opCurrentHealth));
      } else {
        this.opHealthText.setText("0");
      }
      this.opHealthBar.fillStyle(0x595959);
      this.opHealthBar.fillRect(healthBarX, y, this.opHealthBarWidth, 9);

      // Creates a black border around healthbar
      this.opHealthBar.lineStyle(3, 0x000000);
      this.opHealthBar.strokeRoundedRect(healthBarX, y, this.opHealthBarWidth, 9, 3);
      if (this.team === "user") {
        this.opHealthBar.fillStyle(0x2e88ca); // blue color for user team
      } else {
        this.opHealthBar.fillStyle(0xbb5c39); // red color for op team
      }
      this.opHealthBar.fillRoundedRect(healthBarX, y, displayedWidth, 9, 3);
      this.opHealthText.setPosition(this.opponent.x - this.opHealthText.width / 2, y - 8);
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
      if (this.effects) {
        this.scene.events.off("update", this._onSceneUpdate, this);
        this.effects = null;
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
/* harmony import */ var _maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps/lushyPeaks */ "./src/maps/lushyPeaks.js");
/* harmony import */ var _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maps/mangroveMeadow */ "./src/maps/mangroveMeadow.js");
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./characters */ "./src/characters/index.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./effects */ "./src/effects.js");
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
// SFX state
var sfxWalkCooldown = 0;
var wasOnGround = false;
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
var ammoCooldownMs = 1200; // time between shots
var ammoReloadMs = 1200; // time to reload one charge
var ammoCapacity = 1; // number of segments
var ammoCharges = 1; // current charges available
var nextFireTime = 0; // timestamp (ms) when we can fire again
var reloadTimerMs = 0; // accumulates while reloading toward ammoReloadMs

var playerName;
var indicatorTriangle;
var username;
var gameId = window.location.pathname.split("/").filter(Boolean).pop();
var scene;
// Persist the selected character so movement helpers can resolve anim keys
var currentCharacter;
var spawn;
var playersInTeam;
var spawnPlatform;
var mapObjects;
var map;
var opponentPlayersRef; // injected from game.js to avoid circular import
var dustTimer = 0;
var dustInterval = 70; // ms between dust puffs when running

// Body config and flip-offset applier hoisted for use across functions
var bodyConfig = null;
var applyFlipOffsetLocal = null;
var charEffects = null; // per-character, per-player effects handler (e.g., Draven fire)

// Create player function
function createPlayer(sceneParam, name, character, spawnPlatformParam, spawnParam, playersInTeamParam, mapParam, opponentPlayersParam) {
  var _stats$maxHealth, _stats$ammoCooldownMs, _stats$ammoReloadMs, _stats$ammoCapacity, _bs$widthShrink, _bs$heightShrink;
  username = name;
  scene = sceneParam;
  spawn = spawnParam;
  playersInTeam = playersInTeamParam;
  spawnPlatform = spawnPlatformParam;
  map = mapParam;
  opponentPlayersRef = opponentPlayersParam;
  // Remember the chosen character for animation resolution in update loop
  currentCharacter = character;
  pdbg();
  cursors = scene.input.keyboard.createCursorKeys();

  // Animations are registered globally in game.js via setupAll(scene)

  // Create player sprite!! Use character's texture key
  var textureKey = (0,_characters__WEBPACK_IMPORTED_MODULE_3__.getTextureKey)(character);
  player = scene.physics.add.sprite(-100, -100, textureKey);
  player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "idle"), true); // Play idle animation
  // Hide until we've configured frame/body and spawn to avoid a mid-air first render
  player.setVisible(false);
  pdbg();

  // Apply character stats (health, ammo, sprite/body sizing)
  var stats = (0,_characters__WEBPACK_IMPORTED_MODULE_3__.getStats)(character);
  maxHealth = (_stats$maxHealth = stats.maxHealth) !== null && _stats$maxHealth !== void 0 ? _stats$maxHealth : maxHealth;
  currentHealth = maxHealth;
  ammoCooldownMs = (_stats$ammoCooldownMs = stats.ammoCooldownMs) !== null && _stats$ammoCooldownMs !== void 0 ? _stats$ammoCooldownMs : ammoCooldownMs;
  ammoReloadMs = (_stats$ammoReloadMs = stats.ammoReloadMs) !== null && _stats$ammoReloadMs !== void 0 ? _stats$ammoReloadMs : ammoReloadMs;
  ammoCapacity = Math.max(1, (_stats$ammoCapacity = stats.ammoCapacity) !== null && _stats$ammoCapacity !== void 0 ? _stats$ammoCapacity : ammoCapacity);
  ammoCharges = ammoCapacity;
  nextFireTime = 0;
  reloadTimerMs = 0;
  if (stats.spriteScale && stats.spriteScale !== 1) {
    player.setScale(stats.spriteScale);
  }

  // Establish frame/body sizing BEFORE computing spawn so height math is correct
  frame = player.frame;
  var bs = stats && stats.body || {};
  bodyConfig = bs; // persist for use in movement function
  var widthShrink = (_bs$widthShrink = bs.widthShrink) !== null && _bs$widthShrink !== void 0 ? _bs$widthShrink : 35;
  var heightShrink = (_bs$heightShrink = bs.heightShrink) !== null && _bs$heightShrink !== void 0 ? _bs$heightShrink : 10;
  player.body.setSize(frame.width - widthShrink, frame.width - heightShrink);
  // Helper to adjust body offset when flipping
  applyFlipOffsetLocal = function applyFlipOffsetLocal() {
    var _cfg$offsetXFromHalf, _cfg$offsetY;
    if (!player || !player.body) return;
    var cfg = bodyConfig || {};
    var flipOffset = cfg.flipOffset || 0; // falsy -> 0
    var extra = player.flipX ? flipOffset : 0;
    player.body.setOffset(player.body.width / 2 + ((_cfg$offsetXFromHalf = cfg.offsetXFromHalf) !== null && _cfg$offsetXFromHalf !== void 0 ? _cfg$offsetXFromHalf : 0) + extra, (_cfg$offsetY = cfg.offsetY) !== null && _cfg$offsetY !== void 0 ? _cfg$offsetY : 10);
  };
  applyFlipOffsetLocal();

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
    mapObjects = _maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.lushyPeaksObjects;
  } else if (map === "2") {
    mapObjects = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.mangroveMeadowObjects;
  }

  // Sets spawn based on session storage data
  if (spawnPlatform === "bottom") {
    if (map === "1") {
      calculateSpawn(_maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.base, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("bottom", spawn, player);
    }
  } else if (spawnPlatform === "top") {
    if (map === "1") {
      calculateSpawn(_maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.platform, spawn, player);
    } else if (map === "2") {
      calculateMangroveSpawn("top", spawn, player);
    }
  }

  // Now that position is finalized, reveal the sprite for the first grounded render
  player.setVisible(true);

  // Frame/body already configured above prior to spawn for correct initial grounding

  // Player name text anchored to physics body top (not frame height)
  var bodyTop = player.body ? player.body.y : player.y - player.height / 2;
  playerName = scene.add.text(player.x, bodyTop - 50, username);
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

  // Arrow above the body top so it's consistent across different frame paddings
  var triangle = new Phaser.Geom.Triangle(player.x, bodyTop - 10,
  // Top point
  player.x - 13, bodyTop - 20,
  // Left point
  player.x + 13, bodyTop - 20 // Right point
  );
  indicatorTriangle.fillStyle(0x99ab2c); // Green color
  indicatorTriangle.fillTriangleShape(triangle);

  // Character controller wiring (centralized per character)
  var ammoHooks = {
    // stats
    getAmmoCapacity: function getAmmoCapacity() {
      return ammoCapacity;
    },
    getAmmoCooldownMs: function getAmmoCooldownMs() {
      return ammoCooldownMs;
    },
    getAmmoReloadMs: function getAmmoReloadMs() {
      return ammoReloadMs;
    },
    // state
    getCharges: function getCharges() {
      return ammoCharges;
    },
    getNextFireTime: function getNextFireTime() {
      return nextFireTime;
    },
    // actions
    tryConsume: function tryConsume() {
      var now = Date.now();
      if (!canAttack) return false;
      if (now < nextFireTime) return false;
      if (ammoCharges <= 0) return false;
      ammoCharges -= 1;
      nextFireTime = now + ammoCooldownMs;
      // start/restart reloading if not full
      if (ammoCharges < ammoCapacity && reloadTimerMs <= 0) reloadTimerMs = 0;
      return true;
    },
    grantCharge: function grantCharge() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      ammoCharges = Math.min(ammoCapacity, ammoCharges + n);
      if (ammoCharges >= ammoCapacity) reloadTimerMs = 0;
      _drawAmmoBar();
    },
    setCanAttack: function setCanAttack(v) {
      return canAttack = v;
    },
    setIsAttacking: function setIsAttacking(v) {
      return isAttacking = v;
    },
    // view
    drawAmmoBar: function drawAmmoBar() {
      return _drawAmmoBar();
    }
  };
  var ctrl = (0,_characters__WEBPACK_IMPORTED_MODULE_3__.createFor)(character, {
    scene: scene,
    player: player,
    username: username,
    gameId: gameId,
    opponentPlayersRef: opponentPlayersRef,
    mapObjects: mapObjects,
    ammoHooks: ammoHooks
  });
  if (ctrl && ctrl.attachInput) ctrl.attachInput();

  // Per-character effects: instantiate if the character provides an Effects class
  var EffectsCls = (0,_characters__WEBPACK_IMPORTED_MODULE_3__.getEffectsClass)(currentCharacter);
  charEffects = EffectsCls ? new EffectsCls(scene, player) : null;
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
  var bodyTop = player.body ? player.body.y : player.y - player.height / 2;
  // Always anchor to bodyTop so it doesn't jump when dead
  var y = bodyTop - 20; // just above body

  if (!dead) {
    healthText.setText("".concat(currentHealth));
  } else {
    // Show 0 instead of blank when dead
    healthText.setText("0");
    playerName.setPosition(player.x, playerName.y + 30);
  }

  // Draw the background rectangle with the default fill color
  healthBar.fillStyle(0x595959);
  healthBar.fillRect(healthBarX, y, healthBarWidth, 9);

  // Draw the health bar background (stroke)
  healthBar.lineStyle(3, 0x000000);
  healthBar.strokeRoundedRect(healthBarX, y, healthBarWidth, 9, 3);

  // Draw the filled part of the health bar (green)
  healthBar.fillStyle(0x99ab2c);
  healthBar.fillRoundedRect(healthBarX, y, displayedWidth, 9, 3);
  healthText.setPosition(player.x - healthText.width / 2, y - 8);
  healthText.setDepth(2);

  // Draw ammo bar underneath health (only for local player & when alive)
  _drawAmmoBar(healthBarX, y + 11);
}
function _drawAmmoBar(forcedX, forcedY) {
  if (!ammoBar || !ammoBarBack) return;
  var x = forcedX !== undefined ? forcedX : player.x - ammoBarWidth / 2;
  var bodyTop = player.body ? player.body.y : player.y - player.height / 2;
  var y = forcedY !== undefined ? forcedY : bodyTop - 9; // just under health bar
  ammoBarBack.clear();
  ammoBar.clear();

  // Background
  ammoBarBack.fillStyle(0x222222, 0.65);
  ammoBarBack.fillRoundedRect(x, y, ammoBarWidth, 6, 3);
  ammoBarBack.lineStyle(2, 0x000000, 0.9);
  ammoBarBack.strokeRoundedRect(x, y, ammoBarWidth, 6, 3);

  // Draw segmented charges (like Brawl Stars)
  var gap = 2;
  var segmentWidth = (ammoBarWidth - gap * (ammoCapacity - 1)) / ammoCapacity;
  for (var i = 0; i < ammoCapacity; i++) {
    var segX = x + i * (segmentWidth + gap);
    // Determine fill for this segment
    var percent = 0;
    if (i < ammoCharges) {
      percent = 1; // full charge
    } else if (i === ammoCharges) {
      // currently reloading this segment: percent based on reload progress
      percent = Phaser.Math.Clamp(reloadTimerMs / ammoReloadMs, 0, 1);
    } else {
      percent = 0; // future segments empty
    }
    // Colors
    var emptyColor = 0x333333;
    var readyColor = 0xff4040;
    var chargingColor = 0xb32121;
    var fillColor = percent >= 1 ? readyColor : chargingColor;
    // Fill base (empty)
    ammoBar.fillStyle(emptyColor, 0.5);
    ammoBar.fillRoundedRect(segX, y, segmentWidth, 6, 2);
    // Fill current percent
    if (percent > 0) {
      ammoBar.fillStyle(fillColor, 0.95);
      ammoBar.fillRoundedRect(segX, y, segmentWidth * percent, 6, 2);
    }
  }
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
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform1;
    } else if (spawn === "2") {
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform2;
    } else if (spawn === "3") {
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform3;
    }
  } else if (position === "bottom") {
    if (spawn === "1") {
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform4;
    } else if (spawn === "2") {
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform5;
    } else if (spawn === "3") {
      platform = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.tinyPlatform6;
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
    var wasFlip = player.flipX;
    player.flipX = true; // Mirrors the body of the player
    if (player.flipX !== wasFlip && applyFlipOffsetLocal) applyFlipOffsetLocal();
    isMoving = true; // Sets the isMoving to true
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "running"), true);
      // Footstep SFX throttled
      sfxWalkCooldown += scene.game.loop.delta;
      if (sfxWalkCooldown >= 280) {
        sfxWalkCooldown = 0;
        scene.sound.play("sfx-step", {
          volume: 0.18
        });
      }
    }
    // Right movement
  } else if (rightKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear(); // Removes indicator triangle if the player has moved
    }
    var _wasFlip = player.flipX;
    player.flipX = false; // Undos the mirror of the player
    if (player.flipX !== _wasFlip && applyFlipOffsetLocal) applyFlipOffsetLocal();
    player.setVelocityX(speed); // Sets velocity torwards right
    isMoving = true; // Sets moving variable
    if (player.body.touching.down && !isAttacking && !dead) {
      // If the player is not in the air or attacking or dead, it plays the running animation
      player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "running"), true);
      // Footstep SFX throttled
      sfxWalkCooldown += scene.game.loop.delta;
      if (sfxWalkCooldown >= 280) {
        sfxWalkCooldown = 0;
        scene.sound.play("sfx-step", {
          volume: 0.2
        });
      }
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
    scene.sound.play("sfx-jump", {
      volume: 0.6
    });
  } else if (
  // If player is touching a wall while jumping
  (player.body.touching.left || player.body.touching.right && !dead) && canWallJump && upKey) {
    wallJump(); // Calls walljump
    scene.sound.play("sfx-walljump", {
      volume: 0.9
    });
  }
  if ((player.body.touching.left || player.body.touching.right && !dead) && !isAttacking) {
    player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "sliding"), true); // Plays sliding animation
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
  // Keep name anchored to body top regardless of frame padding
  var uiTop = player.body ? player.body.y : player.y - player.height / 2;
  playerName.setPosition(player.x, uiTop - 22);

  // Landing detection (transition airborne -> grounded)
  var onGround = player.body.touching.down;
  if (!wasOnGround && onGround && !dead) {
    scene.sound.play("sfx-land", {
      volume: 0.8
    });
  }
  wasOnGround = onGround;

  // Ammo reload tick
  if (ammoCharges < ammoCapacity) {
    reloadTimerMs += scene.game.loop.delta;
    if (reloadTimerMs >= ammoReloadMs) {
      reloadTimerMs = 0;
      ammoCharges = Math.min(ammoCapacity, ammoCharges + 1);
    }
  } else {
    reloadTimerMs = 0; // full, no reload progress
  }
  // Redraw ammo bar periodically (cheap draw)
  if (!dead) _drawAmmoBar();

  // Per-character effects update (e.g., Draven fire trail)
  if (charEffects) {
    charEffects.update(scene.game.loop.delta, isMoving, dead);
  }
  dustTimer += scene.game.loop.delta;

  // Ground running dust (only while on ground & moving)
  if (!dead && isMoving && player.body.touching.down && dustTimer >= dustInterval) {
    dustTimer = 0;
    // Spawn at the physics body's bottom to account for per-character frame sizing
    var bodyBottom = player.body ? player.body.y + player.body.height : player.y + player.height / 2;
    var dustY = bodyBottom - 2; // slight lift to avoid z-fighting
    var dustX = player.x + (player.flipX ? -18 : 18) * 0.3;
    (0,_effects__WEBPACK_IMPORTED_MODULE_4__.spawnDust)(scene, dustX, dustY);
    if (Math.random() < 0.3) {
      // occasional extra puff for variability
      (0,_effects__WEBPACK_IMPORTED_MODULE_4__.spawnDust)(scene, dustX + Phaser.Math.Between(-6, 6), dustY + Phaser.Math.Between(-2, 2));
    }
  }
  function stopMoving() {
    player.setVelocityX(0); // Sets the player to not moving
    isMoving = false;
  }
  function jump() {
    player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "jumping"), true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }
  function wallJump() {
    canWallJump = false;
    player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "sliding"), true);
    pdbg();
    player.setVelocityY(-jumpSpeed);
    // Horizontal kick and sound handled above

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
    player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "falling"), true);
    pdbg();
    isJumping = false;
  }
  function idle() {
    player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "idle"), true);
    pdbg();
  }
}


// Listen for authoritative health updates from server
_socket__WEBPACK_IMPORTED_MODULE_0__["default"].on("health-update", function (data) {
  if (data.gameId !== gameId) return;
  if (data.username === username) {
    var prev = currentHealth;
    currentHealth = data.health;
    pdbg();
    // SFX: play damage vs heal feedback
    if (scene && scene.sound && !dead) {
      var delta = currentHealth - prev;
      if (delta < 0) {
        // Took damage
        scene.sound.play("sfx-damage", {
          volume: 0.1
        });
      } else if (delta > 0) {
        var s = scene.sound.add("sfx-heal", {
          volume: 0.1
        });
      }
    }
    if (currentHealth <= 0) {
      if (!dead) {
        dead = true;
        player.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_3__.resolveAnimKey)(scene, currentCharacter, "dying"), true);
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
// Minimal singleton Socket.IO client
// <script src="/socket.io/socket.io.js"></script> is already included in index.html
var socket = window.io({
  // same-origin; send cookies so the server can read signed cookie
  withCredentials: true,
  autoConnect: true
});
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   opponentPlayers: () => (/* binding */ opponentPlayers),
/* harmony export */   teamPlayers: () => (/* binding */ teamPlayers)
/* harmony export */ });
/* harmony import */ var _lib_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookies */ "./src/lib/cookies.js");
/* harmony import */ var _maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps/lushyPeaks */ "./src/maps/lushyPeaks.js");
/* harmony import */ var _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maps/mangroveMeadow */ "./src/maps/mangroveMeadow.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _characters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./characters */ "./src/characters/index.js");
/* harmony import */ var _socket__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./socket */ "./src/socket.js");
/* harmony import */ var _opPlayer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opPlayer */ "./src/opPlayer.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./effects */ "./src/effects.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// game.js










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
var username = (0,_lib_cookies__WEBPACK_IMPORTED_MODULE_0__.getCookie)("name");
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
      this.load.image("lushy-bg", "".concat(staticPath, "/Lushy/gameBg.png"));
      this.load.image("mangrove-bg", "".concat(staticPath, "/Mangrove/gameBg.png"));
      // Character assets (preload all registered characters)
      (0,_characters__WEBPACK_IMPORTED_MODULE_4__.preloadAll)(this, staticPath);
      this.load.atlas("troll", "".concat(staticPath, "/troll_spritesheet.png"), "".concat(staticPath, "/troll.json"));
      this.load.image("tiles-image", "".concat(staticPath, "/map.png"));
      this.load.tilemapTiledJSON("tiles", "".concat(staticPath, "/tilesheet.json"));
      this.load.image("lushy-base", "".concat(staticPath, "/Lushy/base.png"));
      this.load.image("lushy-platform", "".concat(staticPath, "/Lushy/largePlatform.png"));
      this.load.image("lushy-side-platform", "".concat(staticPath, "/Lushy/sidePlatform.png"));
      // this.load.image("lushy-medium-platform", `${staticPath}/Lushy/mediumPlatform.png`);
      this.load.image("mangrove-tiny-platform", "".concat(staticPath, "/Mangrove/tinyPlatform.png"));
      this.load.image("mangrove-base-left", "".concat(staticPath, "/Mangrove/baseLeft.png"));
      this.load.image("mangrove-base-middle", "".concat(staticPath, "/Mangrove/baseMiddle.png"));
      this.load.image("mangrove-base-right", "".concat(staticPath, "/Mangrove/baseRight.png"));
      this.load.image("mangrove-base-top", "".concat(staticPath, "/Mangrove/baseTop.png"));
      this.load.image("thorg-weapon", "".concat(staticPath, "/thorg/weapon.png"));
      // Movement SFX (place files under /assets/audio)
      this.load.audio("sfx-step", "".concat(staticPath, "/step.ogg"));
      this.load.audio("sfx-jump", "".concat(staticPath, "/jump.mp3"));
      this.load.audio("sfx-land", "".concat(staticPath, "/land.mp3"));
      this.load.audio("sfx-walljump", "".concat(staticPath, "/walljump.mp3"));
      // Combat/health SFX
      this.load.audio("sfx-damage", "".concat(staticPath, "/damage.mp3"));
      this.load.audio("sfx-heal", "".concat(staticPath, "/heal.mp3"));
      // Music (non-looping bgm, separate win/lose stingers)
      this.load.audio("main", "".concat(staticPath, "/main.wav"));
      this.load.audio("win", "".concat(staticPath, "/win.mp3"));
      this.load.audio("lose", "".concat(staticPath, "/lose.wav"));
    }
  }, {
    key: "create",
    value: function create() {
      var _this$cameras,
        _this = this,
        _this$input$keyboard;
      cdbg();
      // Ensure camera renders on whole pixels for crisp sprites
      ((_this$cameras = this.cameras) === null || _this$cameras === void 0 ? void 0 : _this$cameras.main) && (this.cameras.main.roundPixels = true);
      // Creates the map objects
      if (map === "1") {
        mapObjects = _maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.lushyPeaksObjects;
        (0,_maps_lushyPeaks__WEBPACK_IMPORTED_MODULE_1__.lushyPeaks)(this);
        cdbg();
      } else if (map === "2") {
        mapObjects = _maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.mangroveMeadowObjects;
        (0,_maps_mangroveMeadow__WEBPACK_IMPORTED_MODULE_2__.mangroveMeadow)(this);
        cdbg();
      }

      // Ensure all character animations are registered for this scene
      (0,_characters__WEBPACK_IMPORTED_MODULE_4__.setupAll)(this);

      // Background music: play once (2:30 track), no loop, but only after audio unlock (user gesture)
      this._bgmStarted = false;
      var startBgm = function startBgm() {
        if (_this._bgmStarted) return;
        _this._bgmStarted = true;
        try {
          if (!_this.bgmMain) {
            _this.bgmMain = _this.sound.add("main", {
              volume: 0.02,
              loop: false
            });
          }
          _this.bgmMain.play();
        } catch (e) {}
      };
      if (this.sound.locked) {
        // Phaser will emit 'unlocked' on first user interaction
        this.sound.once("unlocked", startBgm);
      } else {
        // If already unlocked, start immediately; also set a safe first-click hook
        startBgm();
      }
      // Extra safety: if for some reason 'unlocked' doesn't fire, start on first pointer/keydown
      this.input.once("pointerdown", startBgm);
      (_this$input$keyboard = this.input.keyboard) === null || _this$input$keyboard === void 0 || _this$input$keyboard.once("keydown", startBgm);

      // Creates player object
      (0,_player__WEBPACK_IMPORTED_MODULE_3__.createPlayer)(this, username, character, spawnPlatform, spawn, partyMembers, map, opponentPlayers);
      cdbg();
      // Toggle physics debug with Ctrl+M
      this.input.keyboard.on("keydown-M", function (e) {
        var _this$physics, _this$sys;
        if (!e.ctrlKey) return;
        var world = (_this$physics = _this.physics) === null || _this$physics === void 0 ? void 0 : _this$physics.world;
        if (!world) return;
        // Flip debug draw state
        world.drawDebug = !world.drawDebug;
        // Clear previous graphics and show/hide accordingly
        if (world.debugGraphic) {
          world.debugGraphic.clear();
          world.debugGraphic.setVisible(world.drawDebug);
        }
        // Also update the config reference if present (helps some plugins check)
        if ((_this$sys = _this.sys) !== null && _this$sys !== void 0 && (_this$sys = _this$sys.game) !== null && _this$sys !== void 0 && (_this$sys = _this$sys.config) !== null && _this$sys !== void 0 && (_this$sys = _this$sys.physics) !== null && _this$sys !== void 0 && _this$sys.arcade) {
          _this.sys.game.config.physics.arcade.debug = world.drawDebug;
        }
      });
      // Adds collision between map and player

      mapObjects.forEach(function (mapObject) {
        // Add collider between the object and each map object
        _this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_3__.player, mapObject);
      });
      cdbg();

      // Makes the fight element zoom in at the start of the game
      document.getElementById("fight").style.width = "60%";

      // Sets the values for Your Team and Opposing Team text
      document.getElementById("your-team").textContent = "Your Team: ".concat(partyMembers, "/").concat(partyMembers, " players");
      document.getElementById("opposing-team").textContent = "Opposing Team: ".concat(partyMembers, "/").concat(partyMembers, " players");
      // Emits player-joined and creates the op player objects
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].emit("player-joined", {
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
            var userPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_6__["default"](_this, data.userTeam[key]["character"], key, "user", data.userTeam[key]["spawnPlatform"], data.userTeam[key]["spawn"], partyMembers, map);
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
            var opponentPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_6__["default"](_this, data.opTeam[_key]["character"], _key, "op", data.opTeam[_key]["spawnPlatform"], data.opTeam[_key]["spawn"], partyMembers, map);
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
      (0,_effects__WEBPACK_IMPORTED_MODULE_7__.prewarmDust)(this, 8);

      // Code that runs when another player moves (legacy fallback). Disabled when stateActive.
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].on("move", function (data) {
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
                // Update name tag position during tween using bodyTop
                var spr = opponentPlayer.opponent;
                var bodyTop = spr.body ? spr.body.y : spr.y - spr.height / 2;
                opponentPlayer.opPlayerName.setPosition(spr.x, bodyTop - 36);
              },
              onComplete: function onComplete() {
                opponentPlayer.movementTween = null;
              }
            });
          }

          // Update flip and animation immediately (these don't need tweening)
          opponentPlayer.opponent.flipX = data.flip;
          if (typeof opponentPlayer.applyFlipOffset === "function") {
            opponentPlayer.applyFlipOffset();
          }
          opponentPlayer.opponent.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_4__.resolveAnimKey)(_this, opponentPlayer.character, data.animation, "idle"), true);

          // Update name tag position
          var bodyTop = opponentPlayer.opponent.body ? opponentPlayer.opponent.body.y : opponentPlayer.opponent.y - opponentPlayer.opponent.height / 2;
          opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, bodyTop - 36);

          // Remote running dust (approximate: if moved horizontally enough)
          if (deltaX > 3) {
            opponentPlayer._dustTimer = (opponentPlayer._dustTimer || 0) + 16; // approximate frame delta
            if (opponentPlayer._dustTimer >= 70) {
              opponentPlayer._dustTimer = 0;
              var spr = opponentPlayer.opponent;
              var bottom = spr.body ? spr.body.y + spr.body.height : spr.y + spr.height / 2;
              (0,_effects__WEBPACK_IMPORTED_MODULE_7__.spawnDust)(_this, spr.x, bottom - 2);
            }
          }
        }
      });

      // Authoritative server snapshots (throttled from server)
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].on("state", function (payload) {
        if (payload.gameId !== gameId) return;
        stateActive = true;
        stateBuffer.push(payload);
        // keep buffer bounded
        if (stateBuffer.length > MAX_STATE_BUFFER) stateBuffer.shift();
      });

      // When another player attacks, delegate to that player's character module
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].on("attack", function (data) {
        cdbg();
        var ownerWrapper = opponentPlayers[data.name] || teamPlayers[data.name];
        var ownerCharacter = ownerWrapper ? ownerWrapper.character : null;
        // Try character-specific handler first
        var handled = ownerCharacter ? (0,_characters__WEBPACK_IMPORTED_MODULE_4__.handleRemoteAttack)(_this, ownerCharacter, data, ownerWrapper) : false;
        if (handled) return;
        console.log("not handled");
        // Generic fallback for simple projectiles
        var proj = _this.physics.add.image(data.x, data.y, "fireball");
        proj.setScale(0.4);
        proj.setVelocity((data.direction || 1) * 400, 0);
        proj.flipX = (data === null || data === void 0 ? void 0 : data.direction) < 0;
        proj.body.allowGravity = false;
      });

      // Removed projectile-update/destroy listeners (no network syncing)

      // When another player dies
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].on("death", function (data) {
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

        // Dying animation (character-aware)
        opponentPlayer.opponent.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_4__.resolveAnimKey)(_this, opponentPlayer.character, "dying"), true);
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
      _socket__WEBPACK_IMPORTED_MODULE_5__["default"].on("game-over", function (data) {
        cdbg();
        if (gameId === data.gameId) {
          gameEnded = true; // stop emitting further moves
          // Stop background music and play result music
          try {
            if (_this.bgmMain && _this.bgmMain.isPlaying) _this.bgmMain.stop();
            var isLoser = data.losers.includes(username);
            var key = isLoser ? "lose" : "win";
            var vol = isLoser ? 0.5 : 0.6;
            _this.bgmResult = _this.sound.add(key, {
              volume: vol,
              loop: false
            });
            _this.bgmResult.play();
          } catch (e) {
            // ignore if asset missing
          }
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
          document.getElementById("character-text").textContent = "".concat(character[0].toUpperCase() + character.slice(1));
          document.getElementById("character-image").src = "/assets/".concat(character, "/body.png");
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
      var _this2 = this;
      if (gameEnded) return; // halt loop work after game over
      cdbg();
      if (!_player__WEBPACK_IMPORTED_MODULE_3__.dead) {
        var _player$anims$current;
        (0,_player__WEBPACK_IMPORTED_MODULE_3__.handlePlayerMovement)(this); // Handles movement

        // Throttle movement updates to reduce network traffic and improve smoothness
        var now = Date.now();
        var currentState = {
          x: Math.round(_player__WEBPACK_IMPORTED_MODULE_3__.player.x),
          y: Math.round(_player__WEBPACK_IMPORTED_MODULE_3__.player.y),
          flip: _player__WEBPACK_IMPORTED_MODULE_3__.player.flipX,
          animation: ((_player$anims$current = _player__WEBPACK_IMPORTED_MODULE_3__.player.anims.currentAnim) === null || _player$anims$current === void 0 ? void 0 : _player$anims$current.key) || "idle"
        };

        // Only send movement update if enough time has passed AND something meaningful changed
        var positionChanged = Math.abs(currentState.x - lastPlayerState.x) > 1 || Math.abs(currentState.y - lastPlayerState.y) > 1;
        var stateChanged = positionChanged || currentState.flip !== lastPlayerState.flip || currentState.animation !== lastPlayerState.animation;
        if (stateChanged && now - lastMovementSent >= movementThrottleMs) {
          _socket__WEBPACK_IMPORTED_MODULE_5__["default"].emit("move", {
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
          var prevFlip = spr.flipX;
          spr.flipX = !!animSrc.flip;
          if (spr.flipX !== prevFlip && typeof wrapper.applyFlipOffset === "function") {
            wrapper.applyFlipOffset();
          }
          if (animSrc.animation) {
            spr.anims.play((0,_characters__WEBPACK_IMPORTED_MODULE_4__.resolveAnimKey)(_this2, wrapper.character, animSrc.animation, "idle"), true);
          }

          // Name tag
          var bodyTop = spr.body ? spr.body.y : spr.y - spr.height / 2;
          wrapper.opPlayerName.setPosition(spr.x, bodyTop - 36);
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
  // Pixel-art friendly settings
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  resolution: window.devicePixelRatio,
  scale: {
    // Makes sure the game looks good on all screens
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1300,
    height: 600
  },
  scene: GameScene,
  physics: {
    "default": "arcade",
    arcade: {
      gravity: {
        y: 750
      },
      debug: true
    }
  }
};
var game = new Phaser.Game(config);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUVtckIsU0FBUztFQUNoQjNZLE9BQU8sRUFBRTtJQUNQLFdBQVMsUUFBUTtJQUNqQjJaLE1BQU0sRUFBRTtNQUNOb0YsT0FBTyxFQUFFO1FBQUVucUIsQ0FBQyxFQUFFO01BQUksQ0FBQztNQUNuQmdsQixLQUFLLEVBQUU7SUFDVDtFQUNGO0FBQ0YsQ0FBQztBQUVELElBQU14Z0IsSUFBSSxHQUFHLElBQUl4RixNQUFNLENBQUNvckIsSUFBSSxDQUFDM2xCLE1BQU0sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvY2hhcmFjdGVycy9kcmF2ZW4vYW5pbS5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2NoYXJhY3RlcnMvZHJhdmVuL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvY2hhcmFjdGVycy9kcmF2ZW4vZWZmZWN0cy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2NoYXJhY3RlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9jaGFyYWN0ZXJzL25pbmphL2FuaW0uanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9jaGFyYWN0ZXJzL25pbmphL2F0dGFjay5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2NoYXJhY3RlcnMvbmluamEvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9jaGFyYWN0ZXJzL3Rob3JnL2FuaW0uanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9jaGFyYWN0ZXJzL3Rob3JnL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvZWZmZWN0cy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2xpYi9jaGFyYWN0ZXJTdGF0cy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL2xpYi9jb29raWVzLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvbWFwcy9sdXNoeVBlYWtzLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvbWFwcy9tYW5ncm92ZU1lYWRvdy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL29wUGxheWVyLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvc29ja2V0LmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9nYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhbmltYXRpb25zKHNjZW5lKSB7XHJcbiAgY29uc3QgTkFNRSA9IFwiZHJhdmVuXCI7XHJcbiAgY29uc3QgdGV4ID0gc2NlbmUudGV4dHVyZXMuZ2V0KE5BTUUpO1xyXG4gIGNvbnN0IGFsbE5hbWVzID0gKHRleCAmJiB0ZXguZ2V0RnJhbWVOYW1lcygpKSB8fCBbXTtcclxuICBjb25zdCBsb3dlciA9IG5ldyBNYXAoYWxsTmFtZXMubWFwKChuKSA9PiBbbi50b0xvd2VyQ2FzZSgpLCBuXSkpO1xyXG5cclxuICBjb25zdCBmaW5kRnJhbWVzID0gKGNhbmRpZGF0ZXMpID0+IHtcclxuICAgIC8vIGNhbmRpZGF0ZXM6IGFycmF5IG9mIGxvd2VyY2FzZSBwcmVmaXhlcyB0byB0cnkgKGUuZy4sIFtcInJ1bm5pbmdcIiwgXCJydW5cIl0pXHJcbiAgICAvLyBSZXR1cm4gc29ydGVkIGZyYW1lIG5hbWVzIGJ5IG51bWVyaWMgc3VmZml4IHdoZW4gcHJlc2VudC5cclxuICAgIGNvbnN0IG1hdGNoZWQgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBhbGxOYW1lcykge1xyXG4gICAgICBjb25zdCBsbiA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKGNhbmRpZGF0ZXMuc29tZSgocCkgPT4gbG4uc3RhcnRzV2l0aChwKSkpIHtcclxuICAgICAgICBtYXRjaGVkLnB1c2gobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFNvcnQgYnkgdHJhaWxpbmcgbnVtYmVyIGlmIGFueSwgZWxzZSBsZXhpY29ncmFwaGljYWxseVxyXG4gICAgbWF0Y2hlZC5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJhID0gLyhcXGQrKSg/PVxcRCokKS8uZXhlYyhhKTtcclxuICAgICAgY29uc3QgcmIgPSAvKFxcZCspKD89XFxEKiQpLy5leGVjKGIpO1xyXG4gICAgICBpZiAocmEgJiYgcmIpIHJldHVybiBwYXJzZUludChyYVsxXSwgMTApIC0gcGFyc2VJbnQocmJbMV0sIDEwKTtcclxuICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZWQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWFrZSA9IChrZXksIHByZWZpeGVzLCBmcmFtZVJhdGUsIHJlcGVhdCkgPT4ge1xyXG4gICAgaWYgKHNjZW5lLmFuaW1zLmV4aXN0cyhrZXkpKSByZXR1cm47IC8vIGRvbid0IGR1cGxpY2F0ZVxyXG4gICAgY29uc3QgZnJhbWVzID0gZmluZEZyYW1lcyhwcmVmaXhlcyk7XHJcbiAgICBpZiAoIWZyYW1lcy5sZW5ndGgpIHJldHVybjsgLy8gc2tpcCBpZiBub3QgcHJlc2VudFxyXG4gICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAga2V5LFxyXG4gICAgICBmcmFtZXM6IGZyYW1lcy5tYXAoKGYpID0+ICh7IGtleTogTkFNRSwgZnJhbWU6IGYgfSkpLFxyXG4gICAgICBmcmFtZVJhdGUsXHJcbiAgICAgIHJlcGVhdCxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFRyeSByZWFzb25hYmxlIHByZWZpeCB2YXJpYW50cyBmb3Igcm9idXN0bmVzcyBhY3Jvc3MgYXRsYXNlc1xyXG4gIG1ha2UoYCR7TkFNRX0tcnVubmluZ2AsIFtcInJ1bm5pbmdcIiwgXCJydW5cIl0sIDIwLCAwKTtcclxuICBtYWtlKGAke05BTUV9LWlkbGVgLCBbXCJpZGxlXCIsIFwic3RhbmRcIiwgXCJpZGxlX1wiXSwgMywgLTEpO1xyXG4gIG1ha2UoYCR7TkFNRX0tanVtcGluZ2AsIFtcImp1bXBpbmdcIiwgXCJqdW1wXCJdLCAyMCwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS1zbGlkaW5nYCwgW1wid2FsbFwiLCBcInNsaWRlXCIsIFwic2xpZGluZ1wiXSwgMjAsIDIpO1xyXG4gIG1ha2UoYCR7TkFNRX0tZmFsbGluZ2AsIFtcImZhbGxpbmdcIiwgXCJmYWxsXCJdLCAyMCwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS10aHJvd2AsIFtcInRocm93XCIsIFwiYXR0YWNrXCIsIFwiYXR0YWNrX3Rocm93XCJdLCAxNSwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS1keWluZ2AsIFtcImR5aW5nXCIsIFwiZGVhdGhcIiwgXCJkZWFkXCJdLCAxMCwgMCk7XHJcbn1cclxuIiwiLy8gc3JjL2NoYXJhY3RlcnMvZHJhdmVuL2RyYXZlbi5qc1xyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuLi8uLi9zb2NrZXRcIjtcclxuaW1wb3J0IHsgY2hhcmFjdGVyU3RhdHMgfSBmcm9tIFwiLi4vLi4vbGliL2NoYXJhY3RlclN0YXRzLmpzXCI7XHJcbmltcG9ydCB7IGFuaW1hdGlvbnMgfSBmcm9tIFwiLi9hbmltXCI7XHJcbmltcG9ydCBEcmF2ZW5FZmZlY3RzIGZyb20gXCIuL2VmZmVjdHNcIjtcclxuXHJcbi8vIFNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHRoaXMgY2hhcmFjdGVyJ3MgbmFtZS9rZXlcclxuY29uc3QgTkFNRSA9IFwiZHJhdmVuXCI7XHJcblxyXG5jbGFzcyBkcmF2ZW4ge1xyXG4gIC8vIE1haW4gdGV4dHVyZSBrZXkgdXNlZCBmb3IgdGhpcyBjaGFyYWN0ZXIncyBzcHJpdGVcclxuICBzdGF0aWMgdGV4dHVyZUtleSA9IE5BTUU7XHJcbiAgLy8gT3B0aW9uYWwgcGVyLXBsYXllciBlZmZlY3RzIGNsYXNzIHRvIGJlIHVzZWQgZm9yIHRoaXMgY2hhcmFjdGVyXHJcbiAgc3RhdGljIEVmZmVjdHMgPSBEcmF2ZW5FZmZlY3RzO1xyXG4gIHN0YXRpYyBnZXRUZXh0dXJlS2V5KCkge1xyXG4gICAgcmV0dXJuIGRyYXZlbi50ZXh0dXJlS2V5O1xyXG4gIH1cclxuICBzdGF0aWMgcHJlbG9hZChzY2VuZSwgc3RhdGljUGF0aCA9IFwiL2Fzc2V0c1wiKSB7XHJcbiAgICAvLyBMb2FkIGF0bGFzIGFuZCBwcm9qZWN0aWxlL3NvdW5kc1xyXG4gICAgc2NlbmUubG9hZC5hdGxhcyhcclxuICAgICAgTkFNRSxcclxuICAgICAgYCR7c3RhdGljUGF0aH0vJHtOQU1FfS9zcHJpdGVzaGVldC5wbmdgLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS8ke05BTUV9L2FuaW1hdGlvbnMuanNvbmBcclxuICAgICk7XHJcbiAgICAvLyBFbnN1cmUgbmVhcmVzdC1uZWlnaGJvciBzYW1wbGluZyBmb3IgY3Jpc3AgcGl4ZWwgYXJ0XHJcbiAgICBzY2VuZS5sb2FkLm9uKFBoYXNlci5Mb2FkZXIuRXZlbnRzLkNPTVBMRVRFLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleCA9IHNjZW5lLnRleHR1cmVzLmdldChOQU1FKTtcclxuICAgICAgaWYgKHRleCAmJiB0ZXguc291cmNlICYmIHRleC5zb3VyY2VbMF0gJiYgdGV4LnNvdXJjZVswXS5nbFRleHR1cmUpIHtcclxuICAgICAgICAvLyBXZWJHTCBwYXRoOiBzZXQgZmlsdGVyIHRvIE5FQVJFU1RcclxuICAgICAgICB0ZXguc2V0RmlsdGVyKFBoYXNlci5UZXh0dXJlcy5GaWx0ZXJNb2RlLk5FQVJFU1QpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFsc28gc2V0IGdsb2JhbCBkZWZhdWx0IGZvciB0aGlzIHNjZW5lJ3MgZ2FtZSAoUGhhc2VyIDMuNzApXHJcbiAgICAgIGlmIChzY2VuZS5nYW1lICYmIHNjZW5lLmdhbWUuY29uZmlnKSB7XHJcbiAgICAgICAgc2NlbmUuZ2FtZS5jb25maWcucGl4ZWxBcnQgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmdhbWUuY29uZmlnLmFudGlhbGlhcyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzZXR1cEFuaW1hdGlvbnMoc2NlbmUpIHtcclxuICAgIGFuaW1hdGlvbnMoc2NlbmUpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3RlIGF0dGFjayB2aXN1YWxpemF0aW9uIGZvciBkcmF2ZW4gKHNsYXNoIGVmZmVjdCBvbmx5KVxyXG4gIHN0YXRpYyBoYW5kbGVSZW1vdGVBdHRhY2soc2NlbmUsIGRhdGEsIG93bmVyV3JhcHBlcikge31cclxuXHJcbiAgLy8gUGVyLWNoYXJhY3RlciBnYW1lcGxheSBhbmQgcHJlc2VudGF0aW9uIHN0YXRzXHJcbiAgc3RhdGljIGdldFN0YXRzKCkge1xyXG4gICAgcmV0dXJuIGNoYXJhY3RlclN0YXRzLmRyYXZlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHNjZW5lLFxyXG4gICAgcGxheWVyLFxyXG4gICAgdXNlcm5hbWUsXHJcbiAgICBnYW1lSWQsXHJcbiAgICBvcHBvbmVudFBsYXllcnNSZWYsXHJcbiAgICBtYXBPYmplY3RzLFxyXG4gICAgYW1tb0hvb2tzLFxyXG4gIH0pIHtcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgdGhpcy5nYW1lSWQgPSBnYW1lSWQ7XHJcbiAgICB0aGlzLm9wcG9uZW50UGxheWVyc1JlZiA9IG9wcG9uZW50UGxheWVyc1JlZjtcclxuICAgIHRoaXMubWFwT2JqZWN0cyA9IG1hcE9iamVjdHM7XHJcbiAgICB0aGlzLmFtbW8gPSBhbW1vSG9va3M7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hJbnB1dCgpIHtcclxuICAgIHRoaXMuc2NlbmUuaW5wdXQub24oXCJwb2ludGVyZG93blwiLCAoKSA9PiB0aGlzLmhhbmRsZVBvaW50ZXJEb3duKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ29tbW9uIGRlZmF1bHQgYmVoYXZpb3IgZm9yIGZpcmluZyBhdHRhY2tzXHJcbiAgcGVyZm9ybURlZmF1bHRBdHRhY2socGF5bG9hZEJ1aWxkZXIsIG9uQWZ0ZXJGaXJlKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGdldEFtbW9Db29sZG93bk1zLFxyXG4gICAgICB0cnlDb25zdW1lLFxyXG4gICAgICBzZXRDYW5BdHRhY2ssXHJcbiAgICAgIHNldElzQXR0YWNraW5nLFxyXG4gICAgICBkcmF3QW1tb0JhcixcclxuICAgIH0gPSB0aGlzLmFtbW87XHJcblxyXG4gICAgaWYgKCF0cnlDb25zdW1lKCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldElzQXR0YWNraW5nKHRydWUpO1xyXG4gICAgc2V0Q2FuQXR0YWNrKGZhbHNlKTtcclxuXHJcbiAgICBjb25zdCBjb29sZG93biA9IGdldEFtbW9Db29sZG93bk1zKCk7XHJcbiAgICB0aGlzLnNjZW5lLnRpbWUuZGVsYXllZENhbGwoY29vbGRvd24sICgpID0+IHNldENhbkF0dGFjayh0cnVlKSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldElzQXR0YWNraW5nKGZhbHNlKSwgMjUwKTtcclxuXHJcbiAgICBjb25zdCBwYXlsb2FkID1cclxuICAgICAgdHlwZW9mIHBheWxvYWRCdWlsZGVyID09PSBcImZ1bmN0aW9uXCIgPyBwYXlsb2FkQnVpbGRlcigpIDogbnVsbDtcclxuICAgIGlmIChwYXlsb2FkKSBzb2NrZXQuZW1pdChcImF0dGFja1wiLCBwYXlsb2FkKTtcclxuICAgIGRyYXdBbW1vQmFyKCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQWZ0ZXJGaXJlID09PSBcImZ1bmN0aW9uXCIpIG9uQWZ0ZXJGaXJlKCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIERyYXZlbi1zcGVjaWZpYzogc2ltcGxlIHN0YWZmIGFyYyBzd2lwZSBzaW1pbGFyIHRvIFRob3JnJ3MgdmlzdWFsIGZvciBub3dcclxuICBoYW5kbGVQb2ludGVyRG93bigpIHtcclxuICAgIGNvbnN0IHAgPSB0aGlzLnBsYXllcjtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHAuZmxpcFggPyAtMSA6IDE7XHJcbiAgICBjb25zdCByYW5nZSA9IDEwNTtcclxuICAgIGNvbnN0IGR1cmF0aW9uID0gMjYwO1xyXG4gICAgY29uc3Qgc3RhdHMgPVxyXG4gICAgICAodGhpcy5jb25zdHJ1Y3Rvci5nZXRTdGF0cyAmJiB0aGlzLmNvbnN0cnVjdG9yLmdldFN0YXRzKCkpIHx8IHt9O1xyXG4gICAgY29uc3QgZGFtYWdlID0gc3RhdHMuZGFtYWdlO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnBlcmZvcm1EZWZhdWx0QXR0YWNrKCgpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2NlbmUuYW5pbXMgJiZcclxuICAgICAgICAodGhpcy5zY2VuZS5hbmltcy5leGlzdHMoYCR7TkFNRX0tdGhyb3dgKSB8fFxyXG4gICAgICAgICAgdGhpcy5zY2VuZS5hbmltcy5leGlzdHMoXCJ0aHJvd1wiKSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcC5hbmltcy5wbGF5KFxyXG4gICAgICAgICAgdGhpcy5zY2VuZS5hbmltcy5leGlzdHMoYCR7TkFNRX0tdGhyb3dgKSA/IGAke05BTUV9LXRocm93YCA6IFwidGhyb3dcIixcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBWaXN1YWwgcGxhY2Vob2xkZXI6IHNtYWxsIGFyYyBkcmF3IHVzaW5nIGdyYXBoaWNzXHJcbiAgICAgIGNvbnN0IGcgPSB0aGlzLnNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gICAgICBnLnNldERlcHRoKDUpO1xyXG4gICAgICBnLnNldEJsZW5kTW9kZShQaGFzZXIuQmxlbmRNb2Rlcy5BREQpO1xyXG4gICAgICBjb25zdCBtYWluID0gMHhmZmUyOWU7XHJcbiAgICAgIGNvbnN0IG91dGxpbmUgPSAweGZmZjZkMTtcclxuICAgICAgY29uc3QgdGhpY2tuZXNzID0gTWF0aC5tYXgoMTIsIE1hdGgucm91bmQocmFuZ2UgKiAwLjE4KSk7XHJcbiAgICAgIGNvbnN0IHJ4ID0gcmFuZ2U7XHJcbiAgICAgIGNvbnN0IHJ5ID0gTWF0aC5yb3VuZChyYW5nZSAqIDAuNTUpO1xyXG4gICAgICBjb25zdCByeElubmVyID0gTWF0aC5tYXgoNCwgcnggLSB0aGlja25lc3MpO1xyXG4gICAgICBjb25zdCByeUlubmVyID0gTWF0aC5tYXgoMywgcnkgLSBNYXRoLnJvdW5kKHRoaWNrbmVzcyAqIDAuNykpO1xyXG4gICAgICBjb25zdCBjeCA9ICgpID0+IHAueCArIChkaXJlY3Rpb24gPj0gMCA/IDIwIDogLTIwKTtcclxuICAgICAgY29uc3QgY3kgPSAoKSA9PiBwLnkgLSBwLmhlaWdodCAqIDAuMTU7XHJcbiAgICAgIGNvbnN0IGVwdCA9ICh0aGV0YSwgcngwLCByeTApID0+ICh7XHJcbiAgICAgICAgeDogY3goKSArIGRpcmVjdGlvbiAqIHJ4MCAqIE1hdGguY29zKHRoZXRhKSxcclxuICAgICAgICB5OiBjeSgpICsgcnkwICogTWF0aC5zaW4odGhldGEpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHN0YXJ0UmFkID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoLTgwKTtcclxuICAgICAgY29uc3QgZW5kUmFkID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoODApO1xyXG4gICAgICBjb25zdCBwcm94eSA9IHsgdDogMCB9O1xyXG4gICAgICBjb25zdCBzdGVwcyA9IDE4O1xyXG4gICAgICB0aGlzLnNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAgIHRhcmdldHM6IHByb3h5LFxyXG4gICAgICAgIHQ6IDEsXHJcbiAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgZWFzZTogXCJTaW5lLmVhc2VPdXRcIixcclxuICAgICAgICBvblVwZGF0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgbm93ID0gUGhhc2VyLk1hdGguTGluZWFyKHN0YXJ0UmFkLCBlbmRSYWQsIHByb3h5LnQpO1xyXG4gICAgICAgICAgY29uc3QgdDAgPSBQaGFzZXIuTWF0aC5MaW5lYXIoXHJcbiAgICAgICAgICAgIHN0YXJ0UmFkLFxyXG4gICAgICAgICAgICBub3csXHJcbiAgICAgICAgICAgIE1hdGgubWF4KDAsIHByb3h5LnQgLSAwLjI1KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGcuY2xlYXIoKTtcclxuICAgICAgICAgIGcuZmlsbFN0eWxlKG1haW4sIDAuODUpO1xyXG4gICAgICAgICAgZy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHN0ZXBzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYSA9IFBoYXNlci5NYXRoLkxpbmVhcih0MCwgbm93LCBpIC8gc3RlcHMpO1xyXG4gICAgICAgICAgICBjb25zdCBwbnQgPSBlcHQoYSwgcngsIHJ5KTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIGcubW92ZVRvKHBudC54LCBwbnQueSk7XHJcbiAgICAgICAgICAgIGVsc2UgZy5saW5lVG8ocG50LngsIHBudC55KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZvciAobGV0IGkgPSBzdGVwczsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgYSA9IFBoYXNlci5NYXRoLkxpbmVhcih0MCwgbm93LCBpIC8gc3RlcHMpO1xyXG4gICAgICAgICAgICBjb25zdCBwbnQgPSBlcHQoYSwgcnhJbm5lciwgcnlJbm5lcik7XHJcbiAgICAgICAgICAgIGcubGluZVRvKHBudC54LCBwbnQueSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBnLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgZy5maWxsUGF0aCgpO1xyXG4gICAgICAgICAgZy5saW5lU3R5bGUoTWF0aC5tYXgoMiwgTWF0aC5mbG9vcih0aGlja25lc3MgKiAwLjMpKSwgb3V0bGluZSwgMC45KTtcclxuICAgICAgICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzdGVwczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSBQaGFzZXIuTWF0aC5MaW5lYXIoXHJcbiAgICAgICAgICAgICAgTWF0aC5tYXgodDAsIG5vdyAtIDAuMjUpLFxyXG4gICAgICAgICAgICAgIG5vdyxcclxuICAgICAgICAgICAgICBpIC8gc3RlcHNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgcG50ID0gZXB0KGEsIHJ4ICsgMiwgcnkgKyAxKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDApIGcubW92ZVRvKHBudC54LCBwbnQueSk7XHJcbiAgICAgICAgICAgIGVsc2UgZy5saW5lVG8ocG50LngsIHBudC55KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGcuc3Ryb2tlUGF0aCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4gZy5kZXN0cm95KCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gT3duZXItc2lkZSBzaW1wbGUgaGl0IGRldGVjdGlvbiBpbiBhcmNcclxuICAgICAgY29uc3QgYWxyZWFkeSA9IG5ldyBTZXQoKTtcclxuICAgICAgY29uc3QgZW5lbWllcyA9IE9iamVjdC52YWx1ZXModGhpcy5vcHBvbmVudFBsYXllcnNSZWYgfHwge30pO1xyXG4gICAgICBjb25zdCB0aXAgPSB7IHg6ICgpID0+IGN4KCkgKyBkaXJlY3Rpb24gKiByeCwgeTogKCkgPT4gY3koKSB9O1xyXG4gICAgICB0aGlzLnNjZW5lLnRpbWUuZGVsYXllZENhbGwoTWF0aC5mbG9vcihkdXJhdGlvbiAqIDAuNSksICgpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHdyYXAgb2YgZW5lbWllcykge1xyXG4gICAgICAgICAgY29uc3Qgc3ByID0gd3JhcCAmJiB3cmFwLm9wcG9uZW50O1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IHdyYXAgJiYgd3JhcC51c2VybmFtZTtcclxuICAgICAgICAgIGlmICghc3ByIHx8ICFuYW1lIHx8IGFscmVhZHkuaGFzKG5hbWUpKSBjb250aW51ZTtcclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBQaGFzZXIuTWF0aC5EaXN0YW5jZS5CZXR3ZWVuKFxyXG4gICAgICAgICAgICBzcHIueCxcclxuICAgICAgICAgICAgc3ByLnksXHJcbiAgICAgICAgICAgIHRpcC54KCksXHJcbiAgICAgICAgICAgIHRpcC55KClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCBkeCA9IHNwci54IC0gY3goKTtcclxuICAgICAgICAgIGlmIChkaXN0IDw9IDUwICYmIE1hdGguc2lnbihkeCkgPT09IE1hdGguc2lnbihkaXJlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIGFscmVhZHkuYWRkKG5hbWUpO1xyXG4gICAgICAgICAgICBzb2NrZXQuZW1pdChcImhpdFwiLCB7XHJcbiAgICAgICAgICAgICAgYXR0YWNrZXI6IHRoaXMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgdGFyZ2V0OiBuYW1lLFxyXG4gICAgICAgICAgICAgIGRhbWFnZSxcclxuICAgICAgICAgICAgICBnYW1lSWQ6IHRoaXMuZ2FtZUlkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiB0aGlzLnVzZXJuYW1lLFxyXG4gICAgICAgIHR5cGU6IGAke05BTUV9LXNsYXNoYCxcclxuICAgICAgICBkaXJlY3Rpb24sXHJcbiAgICAgICAgcmFuZ2UsXHJcbiAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRyYXZlbjtcclxuIiwiLy8gRHJhdmVuLXNwZWNpZmljIHBlci1wbGF5ZXIgZWZmZWN0cyAoZmlyZSB0cmFpbClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXZlbkVmZmVjdHMge1xyXG4gIGNvbnN0cnVjdG9yKHNjZW5lLCBzcHJpdGUpIHtcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgdGhpcy5fdGltZXIgPSAwO1xyXG4gICAgdGhpcy5faW50ZXJ2YWwgPSA0NTsgLy8gbXMgYmV0d2VlbiBmbGFtZSBzcGF3bnNcclxuICAgIHRoaXMuX3Bvb2wgPSBbXTtcclxuICAgIHRoaXMuX3Bvb2xNYXggPSA2MDtcclxuICB9XHJcblxyXG4gIC8vIEludGVybmFsOiBnZXQgYSBwb29sZWQgZ3JhcGhpY3Mgb2JqZWN0XHJcbiAgX2FjcXVpcmUoKSB7XHJcbiAgICBsZXQgZyA9IHRoaXMuX3Bvb2wuZmluZCgobykgPT4gIW8uYWN0aXZlKTtcclxuICAgIGlmICghZykge1xyXG4gICAgICBnID0gdGhpcy5zY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuICAgICAgdGhpcy5fcG9vbC5wdXNoKGcpO1xyXG4gICAgfVxyXG4gICAgZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgZy5jbGVhcigpO1xyXG4gICAgZy5zZXREZXB0aCgwKTsgLy8gYmVoaW5kIHBsYXllclxyXG4gICAgcmV0dXJuIGc7XHJcbiAgfVxyXG5cclxuICBfcmVsZWFzZShnKSB7XHJcbiAgICBnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgZy5hbHBoYSA9IDE7XHJcbiAgICBnLnNjYWxlID0gMTtcclxuICAgIGcuY2xlYXIoKTtcclxuICAgIGlmICh0aGlzLl9wb29sLmxlbmd0aCA+IHRoaXMuX3Bvb2xNYXgpIHtcclxuICAgICAgY29uc3Qgb2xkID0gdGhpcy5fcG9vbC5maW5kKChvKSA9PiAhby5hY3RpdmUpO1xyXG4gICAgICBpZiAob2xkKSB7XHJcbiAgICAgICAgb2xkLmRlc3Ryb3koKTtcclxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLl9wb29sLmluZGV4T2Yob2xkKTtcclxuICAgICAgICBpZiAoaWR4ID49IDApIHRoaXMuX3Bvb2wuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zcGF3bkZsYW1lKHgsIHkpIHtcclxuICAgIGNvbnN0IGcgPSB0aGlzLl9hY3F1aXJlKCk7XHJcbiAgICBjb25zdCBiYXNlU2l6ZSA9IFBoYXNlci5NYXRoLkJldHdlZW4oNSwgOSk7XHJcbiAgICAvLyBHbG93IGxheWVyc1xyXG4gICAgZy5maWxsU3R5bGUoMHgzMTI4NDEsIDAuMzUpO1xyXG4gICAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplKTtcclxuICAgIGcuZmlsbFN0eWxlKDB4YmE1ZDIyLCAwLjU1KTtcclxuICAgIGcuZmlsbENpcmNsZSgwLCAwLCBiYXNlU2l6ZSAqIDAuNjUpO1xyXG4gICAgZy5maWxsU3R5bGUoXHJcbiAgICAgIFBoYXNlci5EaXNwbGF5LkNvbG9yLkdldENvbG9yKDQ5LCBQaGFzZXIuTWF0aC5CZXR3ZWVuKDMwLCA2MCksIDYwKSxcclxuICAgICAgMC45XHJcbiAgICApO1xyXG4gICAgZy5maWxsQ2lyY2xlKDAsIDAsIGJhc2VTaXplICogMC4zNSk7XHJcbiAgICBnLnggPSB4ICsgUGhhc2VyLk1hdGguQmV0d2VlbigtMywgMyk7XHJcbiAgICBnLnkgPSB5ICsgUGhhc2VyLk1hdGguQmV0d2VlbigtMywgMyk7XHJcbiAgICBjb25zdCBkcmlmdFggPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKC0xMiwgMTIpO1xyXG4gICAgY29uc3QgZHJpZnRZID0gUGhhc2VyLk1hdGguQmV0d2VlbigtMTgsIC00KTtcclxuICAgIGNvbnN0IHNjYWxlVGFyZ2V0ID0gUGhhc2VyLk1hdGguRmxvYXRCZXR3ZWVuKDAuMTUsIDAuMzUpO1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDI2MCwgNDIwKTtcclxuICAgIGcuc2NhbGUgPSAxO1xyXG4gICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgdGFyZ2V0czogZyxcclxuICAgICAgeDogZy54ICsgZHJpZnRYLFxyXG4gICAgICB5OiBnLnkgKyBkcmlmdFksXHJcbiAgICAgIHNjYWxlOiBzY2FsZVRhcmdldCxcclxuICAgICAgYWxwaGE6IDAsXHJcbiAgICAgIGR1cmF0aW9uLFxyXG4gICAgICBlYXNlOiBcIkN1YmljLmVhc2VPdXRcIixcclxuICAgICAgb25Db21wbGV0ZTogKCkgPT4gdGhpcy5fcmVsZWFzZShnKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlIHBlci1mcmFtZS4gaXNNb3Zpbmc6IGJvb2xlYW4sIGRlYWQ6IGJvb2xlYW5cclxuICB1cGRhdGUoZGVsdGFNcywgaXNNb3ZpbmcsIGRlYWQpIHtcclxuICAgIGlmICghdGhpcy5zcHJpdGUgfHwgZGVhZCkgcmV0dXJuO1xyXG4gICAgaWYgKCFpc01vdmluZykgcmV0dXJuO1xyXG4gICAgdGhpcy5fdGltZXIgKz0gZGVsdGFNcztcclxuICAgIGlmICh0aGlzLl90aW1lciA+PSB0aGlzLl9pbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLl90aW1lciA9IDA7XHJcbiAgICAgIGNvbnN0IGJhc2VYID0gdGhpcy5zcHJpdGUueCAtICh0aGlzLnNwcml0ZS5mbGlwWCA/IC0xNCA6IDE0KTtcclxuICAgICAgY29uc3QgYmFzZVkgPSB0aGlzLnNwcml0ZS55ICsgODtcclxuICAgICAgY29uc3QgY291bnQgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDEsIDIpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHRoaXMuX3NwYXduRmxhbWUoYmFzZVgsIGJhc2VZKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gc3JjL2NoYXJhY3RlcnMvaW5kZXguanNcclxuaW1wb3J0IE5pbmphIGZyb20gXCIuL25pbmphL2NvbnN0cnVjdG9yXCI7XHJcbmltcG9ydCBUaG9yZyBmcm9tIFwiLi90aG9yZy9jb25zdHJ1Y3RvclwiO1xyXG5pbXBvcnQgRHJhdmVuIGZyb20gXCIuL2RyYXZlbi9jb25zdHJ1Y3RvclwiO1xyXG5pbXBvcnQgeyBjaGFyYWN0ZXJTdGF0cyB9IGZyb20gXCIuLi9saWIvY2hhcmFjdGVyU3RhdHMuanNcIjtcclxuXHJcbmNvbnN0IHJlZ2lzdHJ5ID0ge1xyXG4gIG5pbmphOiBOaW5qYSxcclxuICB0aG9yZzogVGhvcmcsXHJcbiAgZHJhdmVuOiBEcmF2ZW4sXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJlbG9hZEFsbChzY2VuZSwgc3RhdGljUGF0aCkge1xyXG4gIC8vIFByZWxvYWQgYXNzZXRzIGZvciBhbGwgcmVnaXN0ZXJlZCBjaGFyYWN0ZXJzIChzaW1wbGUgbm93LCBzY2FsYWJsZSBsYXRlcilcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZWdpc3RyeSkpIHtcclxuICAgIGNvbnN0IENscyA9IHJlZ2lzdHJ5W2tleV07XHJcbiAgICBpZiAoQ2xzLnByZWxvYWQpIENscy5wcmVsb2FkKHNjZW5lLCBzdGF0aWNQYXRoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEZvcihzY2VuZSwgY2hhcmFjdGVyKSB7XHJcbiAgY29uc3QgQ2xzID0gcmVnaXN0cnlbY2hhcmFjdGVyXTtcclxuICBpZiAoQ2xzICYmIENscy5zZXR1cEFuaW1hdGlvbnMpIENscy5zZXR1cEFuaW1hdGlvbnMoc2NlbmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBbGwoc2NlbmUpIHtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZWdpc3RyeSkpIHtcclxuICAgIGNvbnN0IENscyA9IHJlZ2lzdHJ5W2tleV07XHJcbiAgICBpZiAoQ2xzICYmIENscy5zZXR1cEFuaW1hdGlvbnMpIENscy5zZXR1cEFuaW1hdGlvbnMoc2NlbmUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcihjaGFyYWN0ZXIsIGRlcHMpIHtcclxuICBjb25zdCBDbHMgPSByZWdpc3RyeVtjaGFyYWN0ZXJdO1xyXG4gIGlmICghQ2xzKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gbmV3IENscyhkZXBzKTtcclxufVxyXG5cclxuLy8gUmV0dXJucyB0aGUgUGhhc2VyIHRleHR1cmUga2V5IGZvciBhIGdpdmVuIGNoYXJhY3RlcidzIG1haW4gc3ByaXRlL2F0bGFzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0dXJlS2V5KGNoYXJhY3Rlcikge1xyXG4gIGNvbnN0IENscyA9IHJlZ2lzdHJ5W2NoYXJhY3Rlcl07XHJcbiAgLy8gUHJlZmVyIGFuIGV4cGxpY2l0IHRleHR1cmVLZXkgc3RhdGljLCBmYWxsYmFjayB0byBjb21tb24gXCJzcHJpdGVcIlxyXG4gIHJldHVybiAoXHJcbiAgICAoQ2xzICYmXHJcbiAgICAgIChDbHMudGV4dHVyZUtleSB8fFxyXG4gICAgICAgICh0eXBlb2YgQ2xzLmdldFRleHR1cmVLZXkgPT09IFwiZnVuY3Rpb25cIiAmJiBDbHMuZ2V0VGV4dHVyZUtleSgpKSkpIHx8XHJcbiAgICBcInNwcml0ZVwiXHJcbiAgKTtcclxufVxyXG5cclxuLy8gRGVsZWdhdGUgaGFuZGxpbmcgb2YgYSByZW1vdGVseSByZWNlaXZlZCBhdHRhY2sgdG8gdGhlIGNoYXJhY3RlciBtb2R1bGVcclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJlbW90ZUF0dGFjayhzY2VuZSwgY2hhcmFjdGVyLCBkYXRhLCBvd25lcldyYXBwZXIpIHtcclxuICBjb25zdCBDbHMgPSByZWdpc3RyeVtjaGFyYWN0ZXJdO1xyXG4gIGlmIChDbHMgJiYgdHlwZW9mIENscy5oYW5kbGVSZW1vdGVBdHRhY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgQ2xzLmhhbmRsZVJlbW90ZUF0dGFjayhzY2VuZSwgZGF0YSwgb3duZXJXcmFwcGVyKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vIFJlc29sdmUgYSBnZW5lcmljIGFuaW1hdGlvbiBrZXkgKGUuZy4sICdpZGxlJykgdG8gYSBjaGFyYWN0ZXItc3BlY2lmaWNcclxuLy8ga2V5IChlLmcuLCAnbmluamEtaWRsZScgb3IgJ3Rob3JnLWlkbGUnKSBpZiBwcmVzZW50OyBvdGhlcndpc2UsIGZhbGxiYWNrLlxyXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUFuaW1LZXkoXHJcbiAgc2NlbmUsXHJcbiAgY2hhcmFjdGVyLFxyXG4gIGdlbmVyaWNLZXksXHJcbiAgZmFsbGJhY2sgPSBcImlkbGVcIlxyXG4pIHtcclxuICBjb25zdCBjaGFyID0gKGNoYXJhY3RlciB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGFuaW1zID0gc2NlbmUgJiYgc2NlbmUuYW5pbXM7XHJcbiAgaWYgKCFhbmltcykgcmV0dXJuIGdlbmVyaWNLZXk7XHJcblxyXG4gIC8vIElmIGEgZnVsbHktcXVhbGlmaWVkIGtleSBpcyBwcm92aWRlZCAoZS5nLiwgXCJuaW5qYS1ydW5uaW5nXCIpOlxyXG4gIGlmIChnZW5lcmljS2V5ICYmIGdlbmVyaWNLZXkuaW5jbHVkZXMoXCItXCIpKSB7XHJcbiAgICAvLyAxKSBJZiBpdCBhbHJlYWR5IG1hdGNoZXMgdGhpcyBjaGFyYWN0ZXIgYW5kIGV4aXN0cywgdXNlIGl0IGFzLWlzXHJcbiAgICBpZiAoXHJcbiAgICAgIGdlbmVyaWNLZXkudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGAke2NoYXJ9LWApICYmXHJcbiAgICAgIGFuaW1zLmV4aXN0cyhnZW5lcmljS2V5KVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBnZW5lcmljS2V5O1xyXG4gICAgfVxyXG4gICAgLy8gMikgVHJ5IHJlbWFwcGluZyB0byB0aGlzIGNoYXJhY3RlcidzIG5hbWVzcGFjZSBwcmVzZXJ2aW5nIHRoZSBzdWZmaXhcclxuICAgIGNvbnN0IHN1ZmZpeCA9IGdlbmVyaWNLZXkuc3BsaXQoXCItXCIpLnNsaWNlKDEpLmpvaW4oXCItXCIpO1xyXG4gICAgY29uc3QgcmVtYXBwZWQgPSBgJHtjaGFyfS0ke3N1ZmZpeH1gO1xyXG4gICAgaWYgKGFuaW1zLmV4aXN0cyhyZW1hcHBlZCkpIHJldHVybiByZW1hcHBlZDtcclxuICAgIC8vIDMpIEFzIGEgbGFzdCByZXNvcnQsIGlmIHRoZSBnaXZlbiBrZXkgZXhpc3RzIChldmVuIGZvciBvdGhlciBjaGFyKSwgcmV0dXJuIGl0XHJcbiAgICBpZiAoYW5pbXMuZXhpc3RzKGdlbmVyaWNLZXkpKSByZXR1cm4gZ2VuZXJpY0tleTtcclxuICB9XHJcblxyXG4gIC8vIEdlbmVyaWMgKHVucHJlZml4ZWQpIHJlc29sdXRpb24gZmxvd1xyXG4gIGNvbnN0IHByZWZlcnJlZCA9IGAke2NoYXJ9LSR7Z2VuZXJpY0tleX1gO1xyXG4gIGlmIChhbmltcy5leGlzdHMocHJlZmVycmVkKSkgcmV0dXJuIHByZWZlcnJlZDtcclxuICBpZiAoYW5pbXMuZXhpc3RzKGdlbmVyaWNLZXkpKSByZXR1cm4gZ2VuZXJpY0tleTtcclxuICBjb25zdCBmYlByZWZlcnJlZCA9IGAke2NoYXJ9LSR7ZmFsbGJhY2t9YDtcclxuICBpZiAoYW5pbXMuZXhpc3RzKGZiUHJlZmVycmVkKSkgcmV0dXJuIGZiUHJlZmVycmVkO1xyXG4gIHJldHVybiBhbmltcy5leGlzdHMoZmFsbGJhY2spID8gZmFsbGJhY2sgOiBnZW5lcmljS2V5O1xyXG59XHJcblxyXG4vLyBHZXQgbWVyZ2VkIHN0YXRzIGZvciBhIGNoYXJhY3RlciBmcm9tIGNlbnRyYWxpemVkIHN0YXRzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0cyhjaGFyYWN0ZXIpIHtcclxuICByZXR1cm4gY2hhcmFjdGVyU3RhdHNbY2hhcmFjdGVyXSB8fCBjaGFyYWN0ZXJTdGF0cy5uaW5qYTsgLy8gZmFsbGJhY2sgdG8gbmluamEgaWYgY2hhcmFjdGVyIG5vdCBmb3VuZFxyXG59XHJcblxyXG4vLyBPcHRpb25hbDogcmV0dXJucyB0aGUgRWZmZWN0cyBjbGFzcyBmb3IgYSBjaGFyYWN0ZXIsIG9yIG51bGwgaWYgbm9uZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWZmZWN0c0NsYXNzKGNoYXJhY3Rlcikge1xyXG4gIGNvbnN0IENscyA9IHJlZ2lzdHJ5W2NoYXJhY3Rlcl07XHJcbiAgcmV0dXJuIChcclxuICAgIChDbHMgJiZcclxuICAgICAgKENscy5FZmZlY3RzIHx8XHJcbiAgICAgICAgKHR5cGVvZiBDbHMuZ2V0RWZmZWN0cyA9PT0gXCJmdW5jdGlvblwiICYmIENscy5nZXRFZmZlY3RzKCkpKSkgfHxcclxuICAgIG51bGxcclxuICApO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBhbmltYXRpb25zKHNjZW5lKSB7XHJcbiAgaWYgKCFzY2VuZS5hbmltcy5leGlzdHMoXCJuaW5qYS1ydW5uaW5nXCIpKVxyXG4gICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAga2V5OiBcIm5pbmphLXJ1bm5pbmdcIiwgLy8gTmFtZSBvZiBhbmltYXRpb25cclxuICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJuaW5qYVwiLCB7XHJcbiAgICAgICAgcHJlZml4OiBcInJ1bm5pbmdcIiwgLy8gTmFtZSBpbnNpZGUgb2YganNvbiBmaWxlXHJcbiAgICAgICAgZW5kOiA1LCAvLyBMZW5ndGggb2YgYW5pbWF0aW9uIGluIGZyYW1lcyAoU2luY2UgdGhlIG51bWJlcnMgc3RhcnQgYXQgMCwgdGhlIGVuZCBpcyBhbHdheXMgMSBtb3JlLiBTbyA1ICsgMSA9IDYgZnJhbWVzKVxyXG4gICAgICAgIHplcm9QYWQ6IDIsIC8vIE51bWJlciBvZiB6ZXJvcyBpbiBqc29uIGZpbGVcclxuICAgICAgfSksXHJcbiAgICAgIGZyYW1lUmF0ZTogMjAsIC8vIE51bWJlciBvZiBmcmFtZXMgcGVyIHNlY29uZFxyXG4gICAgICByZXBlYXQ6IDAsIC8vIE51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgKDAgbWVhbnMgbm9uZSkgKC0xIG1lYW5zIGluZmluaXRlIHRpbWVzKVxyXG4gICAgfSk7XHJcbiAgaWYgKCFzY2VuZS5hbmltcy5leGlzdHMoXCJuaW5qYS1pZGxlXCIpKVxyXG4gICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAga2V5OiBcIm5pbmphLWlkbGVcIixcclxuICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJuaW5qYVwiLCB7XHJcbiAgICAgICAgcHJlZml4OiBcImlkbGVcIixcclxuICAgICAgICBlbmQ6IDQsXHJcbiAgICAgICAgemVyb1BhZDogMixcclxuICAgICAgfSksXHJcbiAgICAgIGZyYW1lUmF0ZTogMyxcclxuICAgICAgcmVwZWF0OiAtMSxcclxuICAgIH0pO1xyXG4gIGlmICghc2NlbmUuYW5pbXMuZXhpc3RzKFwibmluamEtanVtcGluZ1wiKSlcclxuICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgIGtleTogXCJuaW5qYS1qdW1waW5nXCIsXHJcbiAgICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwibmluamFcIiwge1xyXG4gICAgICAgIHByZWZpeDogXCJqdW1waW5nXCIsXHJcbiAgICAgICAgZW5kOiA3LFxyXG4gICAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICAgIH0pLFxyXG4gICAgICBmcmFtZVJhdGU6IDIwLFxyXG4gICAgICByZXBlYXQ6IDAsXHJcbiAgICB9KTtcclxuXHJcbiAgaWYgKCFzY2VuZS5hbmltcy5leGlzdHMoXCJuaW5qYS1zbGlkaW5nXCIpKVxyXG4gICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAga2V5OiBcIm5pbmphLXNsaWRpbmdcIixcclxuICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJuaW5qYVwiLCB7XHJcbiAgICAgICAgcHJlZml4OiBcIndhbGxcIixcclxuICAgICAgICBlbmQ6IDAsXHJcbiAgICAgICAgemVyb1BhZDogMixcclxuICAgICAgfSksXHJcbiAgICAgIGZyYW1lUmF0ZTogMjAsXHJcbiAgICAgIHJlcGVhdDogMixcclxuICAgIH0pO1xyXG5cclxuICBpZiAoIXNjZW5lLmFuaW1zLmV4aXN0cyhcIm5pbmphLWZhbGxpbmdcIikpXHJcbiAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xyXG4gICAgICBrZXk6IFwibmluamEtZmFsbGluZ1wiLFxyXG4gICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcIm5pbmphXCIsIHtcclxuICAgICAgICBwcmVmaXg6IFwiZmFsbGluZ1wiLFxyXG4gICAgICAgIGVuZDogMixcclxuICAgICAgICB6ZXJvUGFkOiAyLFxyXG4gICAgICB9KSxcclxuICAgICAgZnJhbWVSYXRlOiAyMCxcclxuICAgICAgcmVwZWF0OiAwLFxyXG4gICAgfSk7XHJcblxyXG4gIGlmICghc2NlbmUuYW5pbXMuZXhpc3RzKFwibmluamEtdGhyb3dcIikpXHJcbiAgICBzY2VuZS5hbmltcy5jcmVhdGUoe1xyXG4gICAgICBrZXk6IFwibmluamEtdGhyb3dcIixcclxuICAgICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJuaW5qYVwiLCB7XHJcbiAgICAgICAgcHJlZml4OiBcInRocm93XCIsXHJcbiAgICAgICAgZW5kOiAzLFxyXG4gICAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICAgIH0pLFxyXG4gICAgICBmcmFtZVJhdGU6IDE1LFxyXG4gICAgICByZXBlYXQ6IDAsXHJcbiAgICB9KTtcclxuXHJcbiAgaWYgKCFzY2VuZS5hbmltcy5leGlzdHMoXCJuaW5qYS1keWluZ1wiKSlcclxuICAgIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICAgIGtleTogXCJuaW5qYS1keWluZ1wiLFxyXG4gICAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcIm5pbmphXCIsIHtcclxuICAgICAgICBwcmVmaXg6IFwiZHlpbmdcIixcclxuICAgICAgICBlbmQ6IDMsXHJcbiAgICAgICAgemVyb1BhZDogMixcclxuICAgICAgfSksXHJcbiAgICAgIGZyYW1lUmF0ZTogMTAsXHJcbiAgICAgIHJlcGVhdDogMCxcclxuICAgIH0pO1xyXG59XHJcbiIsIi8vIFJldHVybmluZ1NodXJpa2VuLmpzXHJcbi8vIEN1cnZlZCwgcmV0dXJuaW5nLCBwaWVyY2luZyBzaHVyaWtlbiB3aXRoIGRldGVybWluaXN0aWMgbG9jYWwgc2ltdWxhdGlvbi5cclxuXHJcbmltcG9ydCBzb2NrZXQgZnJvbSBcIi4uLy4uL3NvY2tldFwiOyAvLyBvd25lci1vbmx5IGhpdCBldmVudHNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJldHVybmluZ1NodXJpa2VuIGV4dGVuZHMgUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkltYWdlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge1BoYXNlci5TY2VuZX0gc2NlbmVcclxuICAgKiBAcGFyYW0ge3t4Om51bWJlcix5Om51bWJlcn19IHN0YXJ0UG9zXHJcbiAgICogQHBhcmFtIHtQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlfSBvd25lclNwcml0ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzY2VuZSwgc3RhcnRQb3MsIG93bmVyU3ByaXRlLCBjb25maWcpIHtcclxuICAgIHN1cGVyKHNjZW5lLCBzdGFydFBvcy54LCBzdGFydFBvcy55LCBcInNodXJpa2VuXCIpO1xyXG4gICAgdGhpcy5vd25lclNwcml0ZSA9IG93bmVyU3ByaXRlO1xyXG4gICAgdGhpcy5jZmcgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB7XHJcbiAgICAgICAgZGlyZWN0aW9uOiAxLFxyXG4gICAgICAgIGZvcndhcmREaXN0YW5jZTogNTIwLFxyXG4gICAgICAgIG91dHdhcmREdXJhdGlvbjogNjAwLCAvLyBtc1xyXG4gICAgICAgIHJldHVyblNwZWVkOiA1ODAsIC8vIHB4L3MgKGNhcClcclxuICAgICAgICByb3RhdGlvblNwZWVkOiA5NTAsIC8vIGRlZy9zXHJcbiAgICAgICAgc2NhbGU6IDAuMSxcclxuICAgICAgICBkYW1hZ2U6IDEwMDAsXHJcbiAgICAgICAgdXNlcm5hbWU6IFwiXCIsXHJcbiAgICAgICAgZ2FtZUlkOiBcIlwiLFxyXG4gICAgICAgIGlzT3duZXI6IGZhbHNlLFxyXG4gICAgICAgIG1heExpZmV0aW1lOiA3MDAwLFxyXG4gICAgICAgIGhpdENvb2xkb3duOiAzMDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpZyB8fCB7fVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBQaGFzZSBzdGF0ZVxyXG4gICAgdGhpcy5waGFzZSA9IFwib3V0d2FyZFwiOyAvLyBvdXR3YXJkIC0+IGhvdmVyIC0+IHJldHVyblxyXG4gICAgdGhpcy5lbGFwc2VkID0gMDsgLy8gbXMgaW4gY3VycmVudCBwaGFzZVxyXG4gICAgdGhpcy50b3RhbEVsYXBzZWQgPSAwOyAvLyBtcyB0b3RhbCBsaWZlXHJcbiAgICB0aGlzLmhvdmVyRHVyYXRpb24gPSAxMDA7IC8vIG1zIHRvIGhvdmVyIGJlZm9yZSByZXR1cm5pbmdcclxuICAgIHRoaXMucmV0dXJuQWNjZWxlcmF0aW9uID0gODAwOyAvLyBweC9zXjJcclxuICAgIHRoaXMuY3VycmVudFJldHVyblNwZWVkID0gdGhpcy5jZmcucmV0dXJuU3BlZWQgKiAwLjA4OyAvLyByYW1wIHVwXHJcbiAgICB0aGlzLmhpdFRpbWVzdGFtcHMgPSB7fTsgLy8gdXNlcm5hbWUgLT4gbGFzdCBoaXQgbXNcclxuXHJcbiAgICAvLyBUcmFpbCBzdGF0ZVxyXG4gICAgdGhpcy50cmFpbEludGVydmFsID0gMzA7IC8vIG1zXHJcbiAgICB0aGlzLnRyYWlsQWNjdW0gPSAwO1xyXG4gICAgdGhpcy50cmFpbHMgPSBbXTtcclxuICAgIHRoaXMubWF4VHJhaWxzID0gNDA7XHJcblxyXG4gICAgLy8gQWRkIHRvIHNjZW5lIC8gcGh5c2ljc1xyXG4gICAgc2NlbmUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gICAgc2NlbmUucGh5c2ljcy5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgICB0aGlzLnNldFNjYWxlKHRoaXMuY2ZnLnNjYWxlKTtcclxuICAgIHRoaXMuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0RGVwdGgoNSk7XHJcbiAgICB0aGlzLnNldEFuZ3VsYXJWZWxvY2l0eSh0aGlzLmNmZy5yb3RhdGlvblNwZWVkICogdGhpcy5jZmcuZGlyZWN0aW9uKTtcclxuXHJcbiAgICAvLyBQYXRoIGNvbnRyb2wgcG9pbnRzIChzbGlnaHQgZGlwIHRoZW4gYnVsZ2UpXHJcbiAgICB0aGlzLnN0YXJ0WCA9IHN0YXJ0UG9zLng7XHJcbiAgICB0aGlzLnN0YXJ0WSA9IHN0YXJ0UG9zLnk7XHJcbiAgICB0aGlzLmVuZFggPSB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZTtcclxuICAgIHRoaXMuZW5kWSA9IHRoaXMuc3RhcnRZO1xyXG4gICAgY29uc3QgZGlwRG93biA9IDIwO1xyXG4gICAgY29uc3QgYnVsZ2VVcCA9IDQwO1xyXG4gICAgdGhpcy5jdHJsMVggPVxyXG4gICAgICB0aGlzLnN0YXJ0WCArIHRoaXMuY2ZnLmRpcmVjdGlvbiAqIHRoaXMuY2ZnLmZvcndhcmREaXN0YW5jZSAqIDAuMjU7XHJcbiAgICB0aGlzLmN0cmwxWSA9IHRoaXMuc3RhcnRZICsgZGlwRG93bjtcclxuICAgIHRoaXMuY3RybDJYID1cclxuICAgICAgdGhpcy5zdGFydFggKyB0aGlzLmNmZy5kaXJlY3Rpb24gKiB0aGlzLmNmZy5mb3J3YXJkRGlzdGFuY2UgKiAwLjY7XHJcbiAgICB0aGlzLmN0cmwyWSA9IHRoaXMuc3RhcnRZIC0gYnVsZ2VVcDtcclxuXHJcbiAgICAvLyBVbmlmaWVkIHN1YnRsZSBnbG93IChibHVlIGlmIG93bmVyLCByZWQgb3RoZXJ3aXNlKVxyXG4gICAgY29uc3QgZ2xvd0NvbG9yID0gdGhpcy5jZmcuaXNPd25lciA/IDB4MmU5YmZmIDogMHhmZjNhMmU7XHJcbiAgICB0aGlzLmdsb3cgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuICAgIHRoaXMuZ2xvdy5zZXREZXB0aCh0aGlzLmRlcHRoIC0gMSk7XHJcbiAgICB0aGlzLmdsb3cuc2V0QmxlbmRNb2RlKFBoYXNlci5CbGVuZE1vZGVzLkFERCk7XHJcbiAgICB0aGlzLl9kcmF3R2xvdyhnbG93Q29sb3IpO1xyXG4gICAgc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHRoaXMuZ2xvdyxcclxuICAgICAgc2NhbGU6IHsgZnJvbTogMC45NSwgdG86IDEuMTUgfSxcclxuICAgICAgYWxwaGE6IHsgZnJvbTogMC45LCB0bzogMC41NSB9LFxyXG4gICAgICBkdXJhdGlvbjogNjAwLFxyXG4gICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICBlYXNlOiBcIlNpbmUuZWFzZUluT3V0XCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCB0aGlzLnVwZGF0ZVNodXJpa2VuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIF9kcmF3R2xvdyhjb2xvckludCkge1xyXG4gICAgY29uc3QgYmFzZVJhZGl1cyA9IDg1ICogdGhpcy5jZmcuc2NhbGU7XHJcbiAgICBjb25zdCBpbm5lclJhZGl1cyA9IGJhc2VSYWRpdXMgKiAwLjQyO1xyXG4gICAgY29uc3QgbWlkUmFkaXVzID0gYmFzZVJhZGl1cyAqIDAuOTtcclxuICAgIGNvbnN0IG91dGVyUmFkaXVzID0gYmFzZVJhZGl1cyAqIDEuMjtcclxuICAgIGNvbnN0IGMgPSBQaGFzZXIuRGlzcGxheS5Db2xvci5JbnRlZ2VyVG9Db2xvcihjb2xvckludCk7XHJcbiAgICB0aGlzLmdsb3cuY2xlYXIoKTtcclxuICAgIHRoaXMuZ2xvdy54ID0gdGhpcy54O1xyXG4gICAgdGhpcy5nbG93LnkgPSB0aGlzLnk7XHJcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuNDIpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxDaXJjbGUoMCwgMCwgb3V0ZXJSYWRpdXMpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxTdHlsZShjLmNvbG9yLCAwLjcyKTtcclxuICAgIHRoaXMuZ2xvdy5maWxsQ2lyY2xlKDAsIDAsIG1pZFJhZGl1cyk7XHJcbiAgICB0aGlzLmdsb3cuZmlsbFN0eWxlKGMuY29sb3IsIDAuOTUpO1xyXG4gICAgdGhpcy5nbG93LmZpbGxDaXJjbGUoMCwgMCwgaW5uZXJSYWRpdXMpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3ViaWMgQmV6aWVyIGludGVycG9sYXRpb24gaGVscGVyXHJcbiAgY3ViaWModCwgcDAsIHAxLCBwMiwgcDMpIHtcclxuICAgIGNvbnN0IGl0ID0gMSAtIHQ7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBpdCAqIGl0ICogaXQgKiBwMCArXHJcbiAgICAgIDMgKiBpdCAqIGl0ICogdCAqIHAxICtcclxuICAgICAgMyAqIGl0ICogdCAqIHQgKiBwMiArXHJcbiAgICAgIHQgKiB0ICogdCAqIHAzXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdHJ5RGFtYWdlKHRhcmdldFdyYXBwZXIpIHtcclxuICAgIGlmICghdGhpcy5jZmcuaXNPd25lcikgcmV0dXJuIGZhbHNlOyAvLyBvbmx5IG93bmVyIHJlcG9ydHMgaGl0c1xyXG4gICAgaWYgKCF0YXJnZXRXcmFwcGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCB0YXJnZXRVc2VybmFtZSA9XHJcbiAgICAgIHRhcmdldFdyYXBwZXIudXNlcm5hbWUgfHxcclxuICAgICAgdGFyZ2V0V3JhcHBlci5fdXNlcm5hbWUgfHxcclxuICAgICAgdGFyZ2V0V3JhcHBlci5uYW1lIHx8XHJcbiAgICAgIFwidW5rbm93blwiO1xyXG4gICAgY29uc3Qgbm93ID0gdGhpcy5zY2VuZS50aW1lLm5vdztcclxuICAgIGNvbnN0IGxhc3QgPSB0aGlzLmhpdFRpbWVzdGFtcHNbdGFyZ2V0VXNlcm5hbWVdIHx8IDA7XHJcbiAgICBpZiAobm93IC0gbGFzdCA8IHRoaXMuY2ZnLmhpdENvb2xkb3duKSByZXR1cm4gZmFsc2U7XHJcbiAgICB0aGlzLmhpdFRpbWVzdGFtcHNbdGFyZ2V0VXNlcm5hbWVdID0gbm93O1xyXG4gICAgLy8gRW1pdCBzZXJ2ZXItYXV0aG9yaXRhdGl2ZSBkYW1hZ2UgZXZlbnRcclxuICAgIHNvY2tldC5lbWl0KFwiaGl0XCIsIHtcclxuICAgICAgYXR0YWNrZXI6IHRoaXMuY2ZnLnVzZXJuYW1lLFxyXG4gICAgICB0YXJnZXQ6IHRhcmdldFVzZXJuYW1lLFxyXG4gICAgICBkYW1hZ2U6IHRoaXMuY2ZnLmRhbWFnZSxcclxuICAgICAgZ2FtZUlkOiB0aGlzLmNmZy5nYW1lSWQsXHJcbiAgICB9KTtcclxuICAgIC8vIFBsYXkgaGl0IFNGWCBsb2NhbGx5IGZvciB0aGUgb3duZXJcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuc2NlbmUuc291bmQucGxheShcInNodXJpa2VuSGl0XCIsIHsgdm9sdW1lOiAwLjEsIHJhdGU6IDEuMCB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGF0dGFjaEVuZW15T3ZlcmxhcChvYmplY3RzKSB7XHJcbiAgICBvYmplY3RzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICBpZiAoIW9iaikgcmV0dXJuO1xyXG4gICAgICBjb25zdCBzcHJpdGUgPSBvYmoub3Bwb25lbnQgfHwgb2JqO1xyXG4gICAgICB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLm92ZXJsYXAodGhpcywgc3ByaXRlLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG9iai5vcHBvbmVudCkgdGhpcy50cnlEYW1hZ2Uob2JqKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF0dGFjaE1hcE92ZXJsYXAoKSB7XHJcbiAgICAvLyBJbnRlbnRpb25hbGx5IGJsYW5rIChwcm9qZWN0aWxlIGlnbm9yZXMgbWFwIG5vdylcclxuICB9XHJcblxyXG4gIHNwYXduVHJhaWwoKSB7XHJcbiAgICBjb25zdCBzID0gdGhpcy5zY2VuZS5hZGQuaW1hZ2UodGhpcy54LCB0aGlzLnksIFwic2h1cmlrZW5cIik7XHJcbiAgICBzLnNldFNjYWxlKHRoaXMuY2ZnLnNjYWxlICogMC40KTtcclxuICAgIHMuc2V0RGVwdGgoNCk7XHJcbiAgICBzLmFscGhhID0gMC4zNTtcclxuICAgIHRoaXMuc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHMsXHJcbiAgICAgIGFscGhhOiAwLFxyXG4gICAgICBzY2FsZTogeyBmcm9tOiBzLnNjYWxlLCB0bzogcy5zY2FsZSAqIDAuMTUgfSxcclxuICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgICAgZWFzZTogXCJDdWJpYy5lYXNlT3V0XCIsXHJcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHMuZGVzdHJveSgpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRyYWlscy5wdXNoKHMpO1xyXG4gICAgaWYgKHRoaXMudHJhaWxzLmxlbmd0aCA+IHRoaXMubWF4VHJhaWxzKSB7XHJcbiAgICAgIGNvbnN0IG9sZCA9IHRoaXMudHJhaWxzLnNoaWZ0KCk7XHJcbiAgICAgIGlmIChvbGQgJiYgb2xkLmRlc3Ryb3kpIG9sZC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXN0cm95U2h1cmlrZW4oKSB7XHJcbiAgICBpZiAoIXRoaXMuc2NlbmUpIHJldHVybjtcclxuICAgIHRoaXMuc2NlbmUuZXZlbnRzLm9mZihcInVwZGF0ZVwiLCB0aGlzLnVwZGF0ZVNodXJpa2VuLCB0aGlzKTtcclxuICAgIHRoaXMudHJhaWxzLmZvckVhY2goKHQpID0+IHQgJiYgdC5kZXN0cm95ICYmIHQuZGVzdHJveSgpKTtcclxuICAgIHRoaXMudHJhaWxzLmxlbmd0aCA9IDA7XHJcbiAgICBpZiAodGhpcy5nbG93ICYmIHRoaXMuZ2xvdy5kZXN0cm95KSB0aGlzLmdsb3cuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaHVyaWtlbihfLCBkZWx0YSkge1xyXG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5lbGFwc2VkICs9IGRlbHRhO1xyXG4gICAgdGhpcy50b3RhbEVsYXBzZWQgKz0gZGVsdGE7XHJcbiAgICB0aGlzLnRyYWlsQWNjdW0gKz0gZGVsdGE7XHJcbiAgICBpZiAodGhpcy50cmFpbEFjY3VtID49IHRoaXMudHJhaWxJbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLnNwYXduVHJhaWwoKTtcclxuICAgICAgdGhpcy50cmFpbEFjY3VtID0gMDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRvdGFsRWxhcHNlZCA+IHRoaXMuY2ZnLm1heExpZmV0aW1lKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveVNodXJpa2VuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5waGFzZSA9PT0gXCJvdXR3YXJkXCIpIHtcclxuICAgICAgY29uc3QgcmF3VCA9IFBoYXNlci5NYXRoLkNsYW1wKFxyXG4gICAgICAgIHRoaXMuZWxhcHNlZCAvIHRoaXMuY2ZnLm91dHdhcmREdXJhdGlvbixcclxuICAgICAgICAwLFxyXG4gICAgICAgIDFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdCA9ICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIHJhd1QpKSAvIDI7IC8vIGVhc2UgaW4tb3V0XHJcbiAgICAgIGNvbnN0IG54ID0gdGhpcy5jdWJpYyhcclxuICAgICAgICB0LFxyXG4gICAgICAgIHRoaXMuc3RhcnRYLFxyXG4gICAgICAgIHRoaXMuY3RybDFYLFxyXG4gICAgICAgIHRoaXMuY3RybDJYLFxyXG4gICAgICAgIHRoaXMuZW5kWFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBueSA9IHRoaXMuY3ViaWMoXHJcbiAgICAgICAgdCxcclxuICAgICAgICB0aGlzLnN0YXJ0WSxcclxuICAgICAgICB0aGlzLmN0cmwxWSxcclxuICAgICAgICB0aGlzLmN0cmwyWSxcclxuICAgICAgICB0aGlzLmVuZFlcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zZXRQb3NpdGlvbihueCwgbnkpO1xyXG4gICAgICBpZiAocmF3VCA+PSAxKSB7XHJcbiAgICAgICAgdGhpcy5waGFzZSA9IFwiaG92ZXJcIjtcclxuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0QW5ndWxhclZlbG9jaXR5KFxyXG4gICAgICAgICAgdGhpcy5jZmcucm90YXRpb25TcGVlZCAqIDAuNTUgKiB0aGlzLmNmZy5kaXJlY3Rpb25cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGhhc2UgPT09IFwiaG92ZXJcIikge1xyXG4gICAgICBpZiAodGhpcy5lbGFwc2VkID49IHRoaXMuaG92ZXJEdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMucGhhc2UgPSBcInJldHVyblwiO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRBbmd1bGFyVmVsb2NpdHkoXHJcbiAgICAgICAgICB0aGlzLmNmZy5yb3RhdGlvblNwZWVkICogMS4xNSAqIHRoaXMuY2ZnLmRpcmVjdGlvblxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5waGFzZSA9PT0gXCJyZXR1cm5cIikge1xyXG4gICAgICBpZiAoIXRoaXMub3duZXJTcHJpdGUgfHwgIXRoaXMub3duZXJTcHJpdGUuYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy54ICs9XHJcbiAgICAgICAgICB0aGlzLmNmZy5kaXJlY3Rpb24gKiAodGhpcy5jdXJyZW50UmV0dXJuU3BlZWQgKiAoZGVsdGEgLyAxMDAwKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLm93bmVyU3ByaXRlLnggLSB0aGlzLng7XHJcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLm93bmVyU3ByaXRlLnkgLSB0aGlzLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgfHwgMTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRSZXR1cm5TcGVlZCA9IE1hdGgubWluKFxyXG4gICAgICAgICAgdGhpcy5jZmcucmV0dXJuU3BlZWQsXHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRSZXR1cm5TcGVlZCArIHRoaXMucmV0dXJuQWNjZWxlcmF0aW9uICogKGRlbHRhIC8gMTAwMClcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHNwZCA9IHRoaXMuY3VycmVudFJldHVyblNwZWVkICogKGRlbHRhIC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbihcclxuICAgICAgICAgIHRoaXMueCArIChkeCAvIGRpc3QpICogc3BkLFxyXG4gICAgICAgICAgdGhpcy55ICsgKGR5IC8gZGlzdCkgKiBzcGRcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChkaXN0IDwgMzApIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5jZmcuaXNPd25lciAmJlxyXG4gICAgICAgICAgICB0aGlzLm9uUmV0dXJuICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm9uUmV0dXJuID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIHRoaXMub25SZXR1cm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIC8qIHNpbGVudCAqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lTaHVyaWtlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBnbG93IHBvc2l0aW9uXHJcbiAgICBpZiAodGhpcy5nbG93KSB7XHJcbiAgICAgIHRoaXMuZ2xvdy54ID0gdGhpcy54O1xyXG4gICAgICB0aGlzLmdsb3cueSA9IHRoaXMueTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gc3JjL2NoYXJhY3RlcnMvbmluamEvbmluamEuanNcclxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi4vLi4vc29ja2V0XCI7XHJcbmltcG9ydCB7IGNoYXJhY3RlclN0YXRzIH0gZnJvbSBcIi4uLy4uL2xpYi9jaGFyYWN0ZXJTdGF0cy5qc1wiO1xyXG5pbXBvcnQgUmV0dXJuaW5nU2h1cmlrZW4gZnJvbSBcIi4vYXR0YWNrXCI7XHJcbmltcG9ydCB7IGFuaW1hdGlvbnMgfSBmcm9tIFwiLi9hbmltXCI7XHJcblxyXG4vLyBTaW5nbGUgc291cmNlIG9mIHRydXRoIGZvciB0aGlzIGNoYXJhY3RlcidzIG5hbWUva2V5XHJcbmNvbnN0IE5BTUUgPSBcIm5pbmphXCI7XHJcblxyXG5jbGFzcyBOaW5qYSB7XHJcbiAgLy8gTWFpbiB0ZXh0dXJlIGtleSB1c2VkIGZvciB0aGlzIGNoYXJhY3RlcidzIHNwcml0ZVxyXG4gIHN0YXRpYyB0ZXh0dXJlS2V5ID0gTkFNRTtcclxuICBzdGF0aWMgZ2V0VGV4dHVyZUtleSgpIHtcclxuICAgIHJldHVybiBOaW5qYS50ZXh0dXJlS2V5O1xyXG4gIH1cclxuICBzdGF0aWMgcHJlbG9hZChzY2VuZSwgc3RhdGljUGF0aCA9IFwiL2Fzc2V0c1wiKSB7XHJcbiAgICAvLyBMb2FkIGF0bGFzIGFuZCBwcm9qZWN0aWxlL3NvdW5kc1xyXG4gICAgc2NlbmUubG9hZC5hdGxhcyhcclxuICAgICAgTkFNRSxcclxuICAgICAgYCR7c3RhdGljUGF0aH0vJHtOQU1FfS9zcHJpdGVzaGVldC5wbmdgLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS8ke05BTUV9L2FuaW1hdGlvbnMuanNvbmBcclxuICAgICk7XHJcbiAgICBzY2VuZS5sb2FkLmltYWdlKFwic2h1cmlrZW5cIiwgYCR7c3RhdGljUGF0aH0vJHtOQU1FfS9zaHVyaWtlbi5wbmdgKTtcclxuICAgIHNjZW5lLmxvYWQuYXVkaW8oXHJcbiAgICAgIFwic2h1cmlrZW5UaHJvd1wiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS8ke05BTUV9L3NodXJpa2VuVGhyb3cubXAzYFxyXG4gICAgKTtcclxuICAgIHNjZW5lLmxvYWQuYXVkaW8oXCJzaHVyaWtlbkhpdFwiLCBgJHtzdGF0aWNQYXRofS8ke05BTUV9L2hpdC5tcDNgKTtcclxuICAgIHNjZW5lLmxvYWQuYXVkaW8oXCJzaHVyaWtlbkhpdFdvb2RcIiwgYCR7c3RhdGljUGF0aH0vJHtOQU1FfS93b29kaGl0LndhdmApO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNldHVwQW5pbWF0aW9ucyhzY2VuZSkge1xyXG4gICAgYW5pbWF0aW9ucyhzY2VuZSk7XHJcbiAgfVxyXG5cclxuICAvLyBQZXItY2hhcmFjdGVyIGdhbWVwbGF5IGFuZCBwcmVzZW50YXRpb24gc3RhdHNcclxuICBzdGF0aWMgZ2V0U3RhdHMoKSB7XHJcbiAgICByZXR1cm4gY2hhcmFjdGVyU3RhdHMubmluamE7XHJcbiAgfVxyXG5cclxuICAvLyBIYW5kbGUgcmVtb3RlIGF0dGFjayBldmVudHMgZm9yIG9wcG9uZW50cyB1c2luZyB0aGlzIGNoYXJhY3RlclxyXG4gIHN0YXRpYyBoYW5kbGVSZW1vdGVBdHRhY2soc2NlbmUsIGRhdGEsIG93bmVyV3JhcHBlcikge1xyXG4gICAgLy8gU3VwcG9ydCByZXR1cm5pbmcgc2h1cmlrZW4gYXMgZW1pdHRlZCBieSBsb2NhbCBOaW5qYS5hdHRhY2soKVxyXG4gICAgaWYgKGRhdGEucmV0dXJuaW5nKSB7XHJcbiAgICAgIGNvbnN0IG93bmVyU3ByaXRlID0gb3duZXJXcmFwcGVyID8gb3duZXJXcmFwcGVyLm9wcG9uZW50IDogbnVsbDtcclxuICAgICAgLy8gSW5zdGFudGlhdGUgYSBub24tb3duZXIgcmV0dXJuaW5nIHNodXJpa2VuIHNvIHZpc3VhbHMgbWF0Y2hcclxuICAgICAgY29uc3Qgc2h1cmlrZW4gPSBuZXcgUmV0dXJuaW5nU2h1cmlrZW4oXHJcbiAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgeyB4OiBkYXRhLngsIHk6IGRhdGEueSB9LFxyXG4gICAgICAgIG93bmVyU3ByaXRlLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRpcmVjdGlvbjogZGF0YS5kaXJlY3Rpb24sXHJcbiAgICAgICAgICBmb3J3YXJkRGlzdGFuY2U6IGRhdGEuZm9yd2FyZERpc3RhbmNlIHx8IDUwMCxcclxuICAgICAgICAgIG91dHdhcmREdXJhdGlvbjogZGF0YS5vdXR3YXJkRHVyYXRpb24gfHwgMzgwLFxyXG4gICAgICAgICAgcmV0dXJuU3BlZWQ6IGRhdGEucmV0dXJuU3BlZWQgfHwgOTAwLFxyXG4gICAgICAgICAgcm90YXRpb25TcGVlZDogZGF0YS5yb3RhdGlvblNwZWVkIHx8IDIwMDAsXHJcbiAgICAgICAgICBzY2FsZTogZGF0YS5zY2FsZSB8fCAwLjEsXHJcbiAgICAgICAgICBkYW1hZ2U6IGRhdGEuZGFtYWdlLFxyXG4gICAgICAgICAgaXNPd25lcjogZmFsc2UsXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICAvLyBSZW1vdGUgY29sbGlzaW9uIGludGVudGlvbmFsbHkgb21pdHRlZCAob3duZXIgYXV0aG9yaXRhdGl2ZSlcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmFsbGJhY2sgZm9yIHNpbXBsZSBwcm9qZWN0aWxlcyBpZiBldmVyIHVzZWRcclxuICAgIGNvbnN0IHByb2ogPSBzY2VuZS5waHlzaWNzLmFkZC5pbWFnZShcclxuICAgICAgZGF0YS54LFxyXG4gICAgICBkYXRhLnksXHJcbiAgICAgIGRhdGEud2VhcG9uIHx8IFwic2h1cmlrZW5cIlxyXG4gICAgKTtcclxuICAgIHByb2ouc2V0U2NhbGUoZGF0YS5zY2FsZSB8fCAwLjEpO1xyXG4gICAgcHJvai5zZXRWZWxvY2l0eSgoZGF0YS5kaXJlY3Rpb24gfHwgMSkgKiA0MDAsIDApO1xyXG4gICAgcHJvai5zZXRBbmd1bGFyVmVsb2NpdHkoZGF0YS5yb3RhdGlvblNwZWVkIHx8IDYwMCk7XHJcbiAgICBwcm9qLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHNjZW5lLFxyXG4gICAgcGxheWVyLFxyXG4gICAgdXNlcm5hbWUsXHJcbiAgICBnYW1lSWQsXHJcbiAgICBvcHBvbmVudFBsYXllcnNSZWYsXHJcbiAgICBtYXBPYmplY3RzLFxyXG4gICAgYW1tb0hvb2tzLFxyXG4gIH0pIHtcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgdGhpcy5nYW1lSWQgPSBnYW1lSWQ7XHJcbiAgICB0aGlzLm9wcG9uZW50UGxheWVyc1JlZiA9IG9wcG9uZW50UGxheWVyc1JlZjtcclxuICAgIHRoaXMubWFwT2JqZWN0cyA9IG1hcE9iamVjdHM7XHJcbiAgICB0aGlzLmFtbW8gPSBhbW1vSG9va3M7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hJbnB1dCgpIHtcclxuICAgIHRoaXMuc2NlbmUuaW5wdXQub24oXCJwb2ludGVyZG93blwiLCAoKSA9PiB0aGlzLmhhbmRsZVBvaW50ZXJEb3duKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gR2VuZXJpYy9kZWZhdWx0IGF0dGFjayBmbG93OiBhbW1vIGNoZWNrcywgZmxhZ3MsIFVJLCBzb2NrZXQgZW1pdFxyXG4gIHBlcmZvcm1EZWZhdWx0QXR0YWNrKHBheWxvYWRCdWlsZGVyLCBvbkFmdGVyRmlyZSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBnZXRBbW1vQ29vbGRvd25NcyxcclxuICAgICAgdHJ5Q29uc3VtZSxcclxuICAgICAgc2V0Q2FuQXR0YWNrLFxyXG4gICAgICBzZXRJc0F0dGFja2luZyxcclxuICAgICAgZHJhd0FtbW9CYXIsXHJcbiAgICB9ID0gdGhpcy5hbW1vO1xyXG5cclxuICAgIGlmICghdHJ5Q29uc3VtZSgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRDYW5BdHRhY2soZmFsc2UpO1xyXG4gICAgc2V0SXNBdHRhY2tpbmcodHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgY29vbGRvd24gPSBnZXRBbW1vQ29vbGRvd25NcygpO1xyXG4gICAgdGhpcy5zY2VuZS50aW1lLmRlbGF5ZWRDYWxsKGNvb2xkb3duLCAoKSA9PiBzZXRDYW5BdHRhY2sodHJ1ZSkpO1xyXG4gICAgLy8gUmVzZXQgYXR0YWNraW5nIHN0YXRlIGEgYml0IGFmdGVyIHNob3RcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNBdHRhY2tpbmcoZmFsc2UpLCAzMDApO1xyXG5cclxuICAgIC8vIEJ1aWxkIGFuZCBicm9hZGNhc3QgYXR0YWNrIHBheWxvYWRcclxuICAgIGNvbnN0IHBheWxvYWQgPVxyXG4gICAgICB0eXBlb2YgcGF5bG9hZEJ1aWxkZXIgPT09IFwiZnVuY3Rpb25cIiA/IHBheWxvYWRCdWlsZGVyKCkgOiBudWxsO1xyXG4gICAgaWYgKHBheWxvYWQpIHNvY2tldC5lbWl0KFwiYXR0YWNrXCIsIHBheWxvYWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBVSVxyXG4gICAgZHJhd0FtbW9CYXIoKTtcclxuICAgIGlmICh0eXBlb2Ygb25BZnRlckZpcmUgPT09IFwiZnVuY3Rpb25cIikgb25BZnRlckZpcmUoKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gTmluamEtc3BlY2lmaWMgYXR0YWNrOiBzcGF3biBhIHJldHVybmluZyBzaHVyaWtlbiB3aXRoIG93bmVyLXNpZGUgY29sbGlzaW9uc1xyXG4gIGhhbmRsZVBvaW50ZXJEb3duKCkge1xyXG4gICAgY29uc3QgcCA9IHRoaXMucGxheWVyO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gcC5mbGlwWCA/IC0xIDogMTtcclxuXHJcbiAgICBjb25zdCBzdGF0cyA9XHJcbiAgICAgICh0aGlzLmNvbnN0cnVjdG9yLmdldFN0YXRzICYmIHRoaXMuY29uc3RydWN0b3IuZ2V0U3RhdHMoKSkgfHwge307XHJcbiAgICBjb25zdCBkYW1hZ2UgPSBzdGF0cy5kYW1hZ2U7XHJcblxyXG4gICAgY29uc3QgZmlyZWQgPSB0aGlzLnBlcmZvcm1EZWZhdWx0QXR0YWNrKCgpID0+IHtcclxuICAgICAgLy8gUGxheSB0aHJvdyBhbmltIGFuZCBzZnhcclxuICAgICAgY29uc3Qgc2Z4ID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoXCJzaHVyaWtlblRocm93XCIpO1xyXG4gICAgICBzZnguc2V0Vm9sdW1lKDAuMSk7XHJcbiAgICAgIHNmeC5zZXRSYXRlKDEuMyk7XHJcbiAgICAgIHNmeC5wbGF5KCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNjZW5lLmFuaW1zICYmXHJcbiAgICAgICAgKHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKGAke05BTUV9LXRocm93YCkgfHxcclxuICAgICAgICAgIHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKFwidGhyb3dcIikpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHAuYW5pbXMucGxheShcclxuICAgICAgICAgIHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKGAke05BTUV9LXRocm93YCkgPyBgJHtOQU1FfS10aHJvd2AgOiBcInRocm93XCIsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICB1c2VybmFtZTogdGhpcy51c2VybmFtZSxcclxuICAgICAgICBnYW1lSWQ6IHRoaXMuZ2FtZUlkLFxyXG4gICAgICAgIGlzT3duZXI6IHRydWUsXHJcbiAgICAgICAgZGFtYWdlLFxyXG4gICAgICAgIHJvdGF0aW9uU3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgZm9yd2FyZERpc3RhbmNlOiA1MDAsXHJcbiAgICAgICAgYXJjSGVpZ2h0OiAxNjAsXHJcbiAgICAgICAgb3V0d2FyZER1cmF0aW9uOiAzODAsXHJcbiAgICAgICAgcmV0dXJuU3BlZWQ6IDkwMCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IHJldHVybmluZyA9IG5ldyBSZXR1cm5pbmdTaHVyaWtlbihcclxuICAgICAgICB0aGlzLnNjZW5lLFxyXG4gICAgICAgIHsgeDogcC54LCB5OiBwLnkgfSxcclxuICAgICAgICBwLFxyXG4gICAgICAgIGNvbmZpZ1xyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gT3duZXItb25seSBjb2xsaXNpb25zXHJcbiAgICAgIGNvbnN0IGVuZW15TGlzdCA9IE9iamVjdC52YWx1ZXModGhpcy5vcHBvbmVudFBsYXllcnNSZWYgfHwge30pO1xyXG4gICAgICByZXR1cm5pbmcuYXR0YWNoRW5lbXlPdmVybGFwKGVuZW15TGlzdCk7XHJcbiAgICAgIHJldHVybmluZy5hdHRhY2hNYXBPdmVybGFwKHRoaXMubWFwT2JqZWN0cyk7XHJcblxyXG4gICAgICAvLyBQZXJrOiBncmFudCBhbW1vIG9uIHJldHVyblxyXG4gICAgICBjb25zdCB7IGdyYW50Q2hhcmdlLCBzZXRDYW5BdHRhY2ssIGRyYXdBbW1vQmFyIH0gPSB0aGlzLmFtbW87XHJcbiAgICAgIHJldHVybmluZy5vblJldHVybiA9ICgpID0+IHtcclxuICAgICAgICBncmFudENoYXJnZSgxKTtcclxuICAgICAgICBzZXRDYW5BdHRhY2sodHJ1ZSk7XHJcbiAgICAgICAgZHJhd0FtbW9CYXIoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogcC54LFxyXG4gICAgICAgIHk6IHAueSxcclxuICAgICAgICBzY2FsZTogY29uZmlnLnNjYWxlIHx8IDAuMSxcclxuICAgICAgICBkYW1hZ2U6IGNvbmZpZy5kYW1hZ2UsXHJcbiAgICAgICAgbmFtZTogdGhpcy51c2VybmFtZSxcclxuICAgICAgICByZXR1cm5pbmc6IHRydWUsXHJcbiAgICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICAgIGZvcndhcmREaXN0YW5jZTogY29uZmlnLmZvcndhcmREaXN0YW5jZSxcclxuICAgICAgICBvdXR3YXJkRHVyYXRpb246IGNvbmZpZy5vdXR3YXJkRHVyYXRpb24sXHJcbiAgICAgICAgcmV0dXJuU3BlZWQ6IGNvbmZpZy5yZXR1cm5TcGVlZCxcclxuICAgICAgICByb3RhdGlvblNwZWVkOiBjb25maWcucm90YXRpb25TcGVlZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmaXJlZDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5pbmphO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gYW5pbWF0aW9ucyhzY2VuZSkge1xyXG4gIGNvbnN0IE5BTUUgPSBcInRob3JnXCI7XHJcbiAgY29uc3QgdGV4ID0gc2NlbmUudGV4dHVyZXMuZ2V0KE5BTUUpO1xyXG4gIGNvbnN0IGFsbE5hbWVzID0gKHRleCAmJiB0ZXguZ2V0RnJhbWVOYW1lcygpKSB8fCBbXTtcclxuICBjb25zdCBsb3dlciA9IG5ldyBNYXAoYWxsTmFtZXMubWFwKChuKSA9PiBbbi50b0xvd2VyQ2FzZSgpLCBuXSkpO1xyXG5cclxuICBjb25zdCBmaW5kRnJhbWVzID0gKGNhbmRpZGF0ZXMpID0+IHtcclxuICAgIC8vIGNhbmRpZGF0ZXM6IGFycmF5IG9mIGxvd2VyY2FzZSBwcmVmaXhlcyB0byB0cnkgKGUuZy4sIFtcInJ1bm5pbmdcIiwgXCJydW5cIl0pXHJcbiAgICAvLyBSZXR1cm4gc29ydGVkIGZyYW1lIG5hbWVzIGJ5IG51bWVyaWMgc3VmZml4IHdoZW4gcHJlc2VudC5cclxuICAgIGNvbnN0IG1hdGNoZWQgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBhbGxOYW1lcykge1xyXG4gICAgICBjb25zdCBsbiA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKGNhbmRpZGF0ZXMuc29tZSgocCkgPT4gbG4uc3RhcnRzV2l0aChwKSkpIHtcclxuICAgICAgICBtYXRjaGVkLnB1c2gobmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFNvcnQgYnkgdHJhaWxpbmcgbnVtYmVyIGlmIGFueSwgZWxzZSBsZXhpY29ncmFwaGljYWxseVxyXG4gICAgbWF0Y2hlZC5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJhID0gLyhcXGQrKSg/PVxcRCokKS8uZXhlYyhhKTtcclxuICAgICAgY29uc3QgcmIgPSAvKFxcZCspKD89XFxEKiQpLy5leGVjKGIpO1xyXG4gICAgICBpZiAocmEgJiYgcmIpIHJldHVybiBwYXJzZUludChyYVsxXSwgMTApIC0gcGFyc2VJbnQocmJbMV0sIDEwKTtcclxuICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZWQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWFrZSA9IChrZXksIHByZWZpeGVzLCBmcmFtZVJhdGUsIHJlcGVhdCkgPT4ge1xyXG4gICAgaWYgKHNjZW5lLmFuaW1zLmV4aXN0cyhrZXkpKSByZXR1cm47IC8vIGRvbid0IGR1cGxpY2F0ZVxyXG4gICAgY29uc3QgZnJhbWVzID0gZmluZEZyYW1lcyhwcmVmaXhlcyk7XHJcbiAgICBpZiAoIWZyYW1lcy5sZW5ndGgpIHJldHVybjsgLy8gc2tpcCBpZiBub3QgcHJlc2VudFxyXG4gICAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgICAga2V5LFxyXG4gICAgICBmcmFtZXM6IGZyYW1lcy5tYXAoKGYpID0+ICh7IGtleTogTkFNRSwgZnJhbWU6IGYgfSkpLFxyXG4gICAgICBmcmFtZVJhdGUsXHJcbiAgICAgIHJlcGVhdCxcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFRyeSByZWFzb25hYmxlIHByZWZpeCB2YXJpYW50cyBmb3Igcm9idXN0bmVzcyBhY3Jvc3MgYXRsYXNlc1xyXG4gIG1ha2UoYCR7TkFNRX0tcnVubmluZ2AsIFtcInJ1bm5pbmdcIiwgXCJydW5cIl0sIDIwLCAwKTtcclxuICBtYWtlKGAke05BTUV9LWlkbGVgLCBbXCJpZGxlXCIsIFwic3RhbmRcIiwgXCJpZGxlX1wiXSwgNSwgLTEpO1xyXG4gIG1ha2UoYCR7TkFNRX0tanVtcGluZ2AsIFtcImp1bXBpbmdcIiwgXCJqdW1wXCJdLCAyMCwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS1zbGlkaW5nYCwgW1wid2FsbFwiLCBcInNsaWRlXCIsIFwic2xpZGluZ1wiXSwgMjAsIDIpO1xyXG4gIG1ha2UoYCR7TkFNRX0tZmFsbGluZ2AsIFtcImZhbGxpbmdcIiwgXCJmYWxsXCJdLCAyMCwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS10aHJvd2AsIFtcInRocm93XCIsIFwiYXR0YWNrXCIsIFwiYXR0YWNrX3Rocm93XCJdLCAxNSwgMCk7XHJcbiAgbWFrZShgJHtOQU1FfS1keWluZ2AsIFtcImR5aW5nXCIsIFwiZGVhdGhcIiwgXCJkZWFkXCJdLCAxMCwgMCk7XHJcbn1cclxuIiwiLy8gc3JjL2NoYXJhY3RlcnMvdGhvcmcvdGhvcmcuanNcclxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi4vLi4vc29ja2V0XCI7XHJcbmltcG9ydCB7IGNoYXJhY3RlclN0YXRzIH0gZnJvbSBcIi4uLy4uL2xpYi9jaGFyYWN0ZXJTdGF0cy5qc1wiO1xyXG5pbXBvcnQgeyBhbmltYXRpb25zIH0gZnJvbSBcIi4vYW5pbVwiO1xyXG5cclxuLy8gU2luZ2xlIHNvdXJjZSBvZiB0cnV0aCBmb3IgdGhpcyBjaGFyYWN0ZXIncyBuYW1lL2tleVxyXG5jb25zdCBOQU1FID0gXCJ0aG9yZ1wiO1xyXG5cclxuY2xhc3MgVGhvcmcge1xyXG4gIC8vIE1haW4gdGV4dHVyZSBrZXkgdXNlZCBmb3IgdGhpcyBjaGFyYWN0ZXIncyBzcHJpdGVcclxuICBzdGF0aWMgdGV4dHVyZUtleSA9IE5BTUU7XHJcbiAgc3RhdGljIGdldFRleHR1cmVLZXkoKSB7XHJcbiAgICByZXR1cm4gVGhvcmcudGV4dHVyZUtleTtcclxuICB9XHJcbiAgc3RhdGljIHByZWxvYWQoc2NlbmUsIHN0YXRpY1BhdGggPSBcIi9hc3NldHNcIikge1xyXG4gICAgLy8gTG9hZCBhdGxhcyBhbmQgcHJvamVjdGlsZS9zb3VuZHNcclxuICAgIHNjZW5lLmxvYWQuYXRsYXMoXHJcbiAgICAgIE5BTUUsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9LyR7TkFNRX0vc3ByaXRlc2hlZXQucG5nYCxcclxuICAgICAgYCR7c3RhdGljUGF0aH0vJHtOQU1FfS9hbmltYXRpb25zLmpzb25gXHJcbiAgICApO1xyXG4gICAgLy8gT3B0aW9uYWwgVkZYIHNwcml0ZSAocGxhY2UgYXQgL2Fzc2V0cy90aG9yZy9zbGFzaC5wbmcpLiBGYWxscyBiYWNrIHRvIHZlY3RvciBpZiBtaXNzaW5nLlxyXG4gICAgLy8gc2NlbmUubG9hZC5pbWFnZShcInNodXJpa2VuXCIsIGAke3N0YXRpY1BhdGh9L3Rob3JnL3NodXJpa2VuLnBuZ2ApO1xyXG4gICAgLy8gc2NlbmUubG9hZC5hdWRpbyhcInNodXJpa2VuVGhyb3dcIiwgYCR7c3RhdGljUGF0aH0vdGhvcmcvc2h1cmlrZW5UaHJvdy5tcDNgKTtcclxuICAgIC8vIHNjZW5lLmxvYWQuYXVkaW8oXCJzaHVyaWtlbkhpdFwiLCBgJHtzdGF0aWNQYXRofS90aG9yZy9oaXQubXAzYCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2V0dXBBbmltYXRpb25zKHNjZW5lKSB7XHJcbiAgICBhbmltYXRpb25zKHNjZW5lKTtcclxuICB9XHJcblxyXG4gIC8vIFJlbW90ZSBhdHRhY2sgdmlzdWFsaXphdGlvbiBmb3IgVGhvcmcgKHNsYXNoIGVmZmVjdCBvbmx5KVxyXG4gIHN0YXRpYyBoYW5kbGVSZW1vdGVBdHRhY2soc2NlbmUsIGRhdGEsIG93bmVyV3JhcHBlcikge1xyXG4gICAgaWYgKGRhdGEudHlwZSAhPT0gYCR7TkFNRX0tc2xhc2hgKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBvd25lclNwcml0ZSA9IG93bmVyV3JhcHBlciA/IG93bmVyV3JhcHBlci5vcHBvbmVudCA6IG51bGw7XHJcbiAgICBpZiAoIW93bmVyU3ByaXRlKSByZXR1cm4gdHJ1ZTsgLy8gbm90aGluZyB0byBzaG93XHJcbiAgICAvLyBTcGF3biBhIHZpc3VhbC1vbmx5IHNsYXNoIGVmZmVjdCBhdHRhY2hlZCB0byB0aGUgb3duZXIgc3ByaXRlXHJcbiAgICBUaG9yZy5fc3Bhd25TbGFzaEVmZmVjdChcclxuICAgICAgc2NlbmUsXHJcbiAgICAgIG93bmVyU3ByaXRlLFxyXG4gICAgICBkYXRhLmRpcmVjdGlvbixcclxuICAgICAgZGF0YS5yYW5nZSxcclxuICAgICAgZGF0YS5kdXJhdGlvblxyXG4gICAgKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gU2hhcmVkIGhlbHBlciB0byByZW5kZXIgdGhlIHNsYXNoIGVmZmVjdCAoZ3JhcGhpY3Mgc3Ryb2tlIGFyYylcclxuICBzdGF0aWMgX3NwYXduU2xhc2hFZmZlY3QoXHJcbiAgICBzY2VuZSxcclxuICAgIHNwcml0ZSxcclxuICAgIGRpcmVjdGlvbiA9IDEsXHJcbiAgICByYW5nZSA9IDIwLFxyXG4gICAgZHVyYXRpb24gPSAzMDBcclxuICApIHtcclxuICAgIC8vIElmIHdlIGhhdmUgYW4gaW1hZ2UsIGFuaW1hdGUgaXQgYWxvbmcgYW4gb3ZlcmhlYWQgb3ZhbCBwYXRoLiBPdGhlcndpc2UsIGZhbGxiYWNrIHRvIHZlY3RvciBiYW5kLlxyXG4gICAgY29uc3QgaGFzVGV4ID0gc2NlbmUudGV4dHVyZXMuZXhpc3RzKGAke05BTUV9LXdlYXBvbmApO1xyXG4gICAgY29uc3Qgb3JpZ2luT2Zmc2V0WSA9IHNwcml0ZS5oZWlnaHQgKiAwLjE7XHJcbiAgICBjb25zdCBjeCA9ICgpID0+IHNwcml0ZS54ICsgKGRpcmVjdGlvbiA+PSAwID8gMTAgOiAtMTApO1xyXG4gICAgY29uc3QgY3kgPSAoKSA9PiBzcHJpdGUueSAtIG9yaWdpbk9mZnNldFk7XHJcbiAgICBjb25zdCByeCA9IHJhbmdlO1xyXG4gICAgY29uc3QgcnkgPSBNYXRoLnJvdW5kKHJhbmdlICogMC42KTtcclxuICAgIGNvbnN0IHN0YXJ0UmFkID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoLTkwKTtcclxuICAgIGNvbnN0IGVuZFJhZCA9IFBoYXNlci5NYXRoLkRlZ1RvUmFkKDkwKTtcclxuXHJcbiAgICBpZiAoaGFzVGV4KSB7XHJcbiAgICAgIGNvbnN0IGVmZiA9IHNjZW5lLmFkZC5pbWFnZShjeCgpLCBjeSgpLCBgJHtOQU1FfS13ZWFwb25gKTtcclxuICAgICAgZWZmLnNldERlcHRoKDYpO1xyXG4gICAgICBlZmYuc2V0U2NhbGUoMC45KTtcclxuICAgICAgZWZmLnNldE9yaWdpbihkaXJlY3Rpb24gPj0gMCA/IDAuMSA6IDAuOSwgMC41KTsgLy8gcGl2b3QgbmVhciB0aGUgc3dvcmRcclxuICAgICAgZWZmLnNldEZsaXBYKGRpcmVjdGlvbiA8IDApO1xyXG5cclxuICAgICAgY29uc3QgcHJveHkgPSB7IHQ6IDAgfTtcclxuICAgICAgY29uc3QgdHdlZW4gPSBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICB0YXJnZXRzOiBwcm94eSxcclxuICAgICAgICB0OiAxLFxyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICAgIGVhc2U6IFwiU2luZS5lYXNlT3V0XCIsXHJcbiAgICAgICAgb25VcGRhdGU6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGEgPSBQaGFzZXIuTWF0aC5MaW5lYXIoc3RhcnRSYWQsIGVuZFJhZCwgcHJveHkudCk7XHJcbiAgICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGEpO1xyXG4gICAgICAgICAgZWZmLnggPSBjeCgpICsgZGlyZWN0aW9uICogcnggKiBjb3M7XHJcbiAgICAgICAgICBlZmYueSA9IGN5KCkgKyByeSAqIHNpbjtcclxuICAgICAgICAgIC8vIEZhY2UgYWxvbmcgdGFuZ2VudCBvZiB0aGUgcGF0aFxyXG4gICAgICAgICAgY29uc3QgdGFuZ2VudCA9IE1hdGguYXRhbjIoXHJcbiAgICAgICAgICAgIHJ5ICogTWF0aC5jb3MoYSksXHJcbiAgICAgICAgICAgIC1kaXJlY3Rpb24gKiByeCAqIE1hdGguc2luKGEpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgZWZmLnJvdGF0aW9uID0gdGFuZ2VudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgIGVmZi5kZXN0cm95KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB0d2VlbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjazogZHJhdyBhbiBhZGRpdGl2ZSBvdmFsIGJhbmQgKHByZXZpb3VzIGltcGxlbWVudGF0aW9uKVxyXG4gICAgY29uc3QgZyA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gICAgZy5zZXREZXB0aCg1KTtcclxuICAgIGcuc2V0QmxlbmRNb2RlKFBoYXNlci5CbGVuZE1vZGVzLkFERCk7XHJcbiAgICBjb25zdCBtYWluQ29sb3IgPSAweDllZDFmZjtcclxuICAgIGNvbnN0IG91dGxpbmVDb2xvciA9IDB4ZTRmNWZmO1xyXG4gICAgY29uc3QgdGhpY2tuZXNzID0gTWF0aC5tYXgoMTQsIE1hdGgucm91bmQocmFuZ2UgKiAwLjIyKSk7XHJcbiAgICBjb25zdCByeElubmVyID0gTWF0aC5tYXgoNiwgcnggLSB0aGlja25lc3MpO1xyXG4gICAgY29uc3QgcnlJbm5lciA9IE1hdGgubWF4KDQsIHJ5IC0gTWF0aC5yb3VuZCh0aGlja25lc3MgKiAwLjc1KSk7XHJcblxyXG4gICAgY29uc3QgZXB0ID0gKHRoZXRhLCByeDAsIHJ5MCkgPT4gKHtcclxuICAgICAgeDogY3goKSArIGRpcmVjdGlvbiAqIHJ4MCAqIE1hdGguY29zKHRoZXRhKSxcclxuICAgICAgeTogY3koKSArIHJ5MCAqIE1hdGguc2luKHRoZXRhKSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHByb3h5ID0geyB0OiAwIH07XHJcbiAgICBjb25zdCBzdGVwcyA9IDE4O1xyXG4gICAgcmV0dXJuIHNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICB0YXJnZXRzOiBwcm94eSxcclxuICAgICAgdDogMSxcclxuICAgICAgZHVyYXRpb24sXHJcbiAgICAgIGVhc2U6IFwiU2luZS5lYXNlT3V0XCIsXHJcbiAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gUGhhc2VyLk1hdGguTGluZWFyKHN0YXJ0UmFkLCBlbmRSYWQsIHByb3h5LnQpO1xyXG4gICAgICAgIGNvbnN0IHQwID0gUGhhc2VyLk1hdGguTGluZWFyKFxyXG4gICAgICAgICAgc3RhcnRSYWQsXHJcbiAgICAgICAgICBub3csXHJcbiAgICAgICAgICBNYXRoLm1heCgwLCBwcm94eS50IC0gMC4yNSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGcuY2xlYXIoKTtcclxuICAgICAgICBnLmZpbGxTdHlsZShtYWluQ29sb3IsIDAuODUpO1xyXG4gICAgICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc3RlcHM7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgYSA9IFBoYXNlci5NYXRoLkxpbmVhcih0MCwgbm93LCBpIC8gc3RlcHMpO1xyXG4gICAgICAgICAgY29uc3QgcCA9IGVwdChhLCByeCwgcnkpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIGcubW92ZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgIGVsc2UgZy5saW5lVG8ocC54LCBwLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gc3RlcHM7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBjb25zdCBhID0gUGhhc2VyLk1hdGguTGluZWFyKHQwLCBub3csIGkgLyBzdGVwcyk7XHJcbiAgICAgICAgICBjb25zdCBwID0gZXB0KGEsIHJ4SW5uZXIsIHJ5SW5uZXIpO1xyXG4gICAgICAgICAgZy5saW5lVG8ocC54LCBwLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGcuZmlsbFBhdGgoKTtcclxuICAgICAgICBnLmxpbmVTdHlsZShcclxuICAgICAgICAgIE1hdGgubWF4KDIsIE1hdGguZmxvb3IodGhpY2tuZXNzICogMC4zKSksXHJcbiAgICAgICAgICBvdXRsaW5lQ29sb3IsXHJcbiAgICAgICAgICAwLjlcclxuICAgICAgICApO1xyXG4gICAgICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc3RlcHM7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgYSA9IFBoYXNlci5NYXRoLkxpbmVhcihcclxuICAgICAgICAgICAgTWF0aC5tYXgodDAsIG5vdyAtIDAuMjUpLFxyXG4gICAgICAgICAgICBub3csXHJcbiAgICAgICAgICAgIGkgLyBzdGVwc1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IHAgPSBlcHQoYSwgcnggKyAyLCByeSArIDEpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIGcubW92ZVRvKHAueCwgcC55KTtcclxuICAgICAgICAgIGVsc2UgZy5saW5lVG8ocC54LCBwLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnLnN0cm9rZVBhdGgoKTtcclxuICAgICAgfSxcclxuICAgICAgb25Db21wbGV0ZTogKCkgPT4gZy5kZXN0cm95KCksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFBlci1jaGFyYWN0ZXIgZ2FtZXBsYXkgYW5kIHByZXNlbnRhdGlvbiBzdGF0c1xyXG4gIHN0YXRpYyBnZXRTdGF0cygpIHtcclxuICAgIHJldHVybiBjaGFyYWN0ZXJTdGF0cy50aG9yZztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHtcclxuICAgIHNjZW5lLFxyXG4gICAgcGxheWVyLFxyXG4gICAgdXNlcm5hbWUsXHJcbiAgICBnYW1lSWQsXHJcbiAgICBvcHBvbmVudFBsYXllcnNSZWYsXHJcbiAgICBtYXBPYmplY3RzLFxyXG4gICAgYW1tb0hvb2tzLFxyXG4gIH0pIHtcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgdGhpcy5nYW1lSWQgPSBnYW1lSWQ7XHJcbiAgICB0aGlzLm9wcG9uZW50UGxheWVyc1JlZiA9IG9wcG9uZW50UGxheWVyc1JlZjtcclxuICAgIHRoaXMubWFwT2JqZWN0cyA9IG1hcE9iamVjdHM7XHJcbiAgICB0aGlzLmFtbW8gPSBhbW1vSG9va3M7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hJbnB1dCgpIHtcclxuICAgIHRoaXMuc2NlbmUuaW5wdXQub24oXCJwb2ludGVyZG93blwiLCAoKSA9PiB0aGlzLmhhbmRsZVBvaW50ZXJEb3duKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ29tbW9uIGRlZmF1bHQgYmVoYXZpb3IgZm9yIGZpcmluZyBhdHRhY2tzXHJcbiAgcGVyZm9ybURlZmF1bHRBdHRhY2socGF5bG9hZEJ1aWxkZXIsIG9uQWZ0ZXJGaXJlKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGdldEFtbW9Db29sZG93bk1zLFxyXG4gICAgICB0cnlDb25zdW1lLFxyXG4gICAgICBzZXRDYW5BdHRhY2ssXHJcbiAgICAgIHNldElzQXR0YWNraW5nLFxyXG4gICAgICBkcmF3QW1tb0JhcixcclxuICAgIH0gPSB0aGlzLmFtbW87XHJcblxyXG4gICAgaWYgKCF0cnlDb25zdW1lKCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldElzQXR0YWNraW5nKHRydWUpO1xyXG4gICAgc2V0Q2FuQXR0YWNrKGZhbHNlKTtcclxuXHJcbiAgICBjb25zdCBjb29sZG93biA9IGdldEFtbW9Db29sZG93bk1zKCk7XHJcbiAgICB0aGlzLnNjZW5lLnRpbWUuZGVsYXllZENhbGwoY29vbGRvd24sICgpID0+IHNldENhbkF0dGFjayh0cnVlKSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldElzQXR0YWNraW5nKGZhbHNlKSwgMjUwKTtcclxuXHJcbiAgICBjb25zdCBwYXlsb2FkID1cclxuICAgICAgdHlwZW9mIHBheWxvYWRCdWlsZGVyID09PSBcImZ1bmN0aW9uXCIgPyBwYXlsb2FkQnVpbGRlcigpIDogbnVsbDtcclxuICAgIGlmIChwYXlsb2FkKSBzb2NrZXQuZW1pdChcImF0dGFja1wiLCBwYXlsb2FkKTtcclxuICAgIGRyYXdBbW1vQmFyKCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQWZ0ZXJGaXJlID09PSBcImZ1bmN0aW9uXCIpIG9uQWZ0ZXJGaXJlKCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVBvaW50ZXJEb3duKCkge1xyXG4gICAgY29uc3QgcCA9IHRoaXMucGxheWVyO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gcC5mbGlwWCA/IC0xIDogMTtcclxuICAgIGNvbnN0IHJhbmdlID0gOTA7XHJcbiAgICBjb25zdCBkdXJhdGlvbiA9IDIyMDsgLy8gbXNcclxuICAgIGNvbnN0IHN0YXRzID1cclxuICAgICAgKHRoaXMuY29uc3RydWN0b3IuZ2V0U3RhdHMgJiYgdGhpcy5jb25zdHJ1Y3Rvci5nZXRTdGF0cygpKSB8fCB7fTtcclxuICAgIGNvbnN0IGRhbWFnZSA9IHN0YXRzLmRhbWFnZTtcclxuXHJcbiAgICAvLyBDaGFyYWN0ZXItc3BlY2lmaWMgZXhlY3V0aW9uIHdyYXBwZWQgYnkgZGVmYXVsdCBhdHRhY2sgZmxvd1xyXG4gICAgcmV0dXJuIHRoaXMucGVyZm9ybURlZmF1bHRBdHRhY2soKCkgPT4ge1xyXG4gICAgICAvLyBQbGF5IGEgc3VpdGFibGUgYW5pbWF0aW9uXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNjZW5lLmFuaW1zICYmXHJcbiAgICAgICAgKHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKGAke05BTUV9LXRocm93YCkgfHxcclxuICAgICAgICAgIHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKFwidGhyb3dcIikpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHAuYW5pbXMucGxheShcclxuICAgICAgICAgIHRoaXMuc2NlbmUuYW5pbXMuZXhpc3RzKGAke05BTUV9LXRocm93YCkgPyBgJHtOQU1FfS10aHJvd2AgOiBcInRocm93XCIsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTG9jYWwgdmlzdWFsIGVmZmVjdFxyXG4gICAgICBUaG9yZy5fc3Bhd25TbGFzaEVmZmVjdCh0aGlzLnNjZW5lLCBwLCBkaXJlY3Rpb24sIHJhbmdlLCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAvLyBPd25lci1zaWRlIGhpdCBkZXRlY3Rpb25cclxuICAgICAgY29uc3QgYWxyZWFkeUhpdCA9IG5ldyBTZXQoKTtcclxuICAgICAgY29uc3QgZW5lbWllcyA9IE9iamVjdC52YWx1ZXModGhpcy5vcHBvbmVudFBsYXllcnNSZWYgfHwge30pO1xyXG4gICAgICBjb25zdCBjZW50ZXJPZmZzZXRZID0gcC5oZWlnaHQgKiAwLjI7XHJcbiAgICAgIGNvbnN0IGN4ID0gKCkgPT4gcC54ICsgKGRpcmVjdGlvbiA+PSAwID8gMTAgOiAtMTApO1xyXG4gICAgICBjb25zdCBjeSA9ICgpID0+IHAueSAtIGNlbnRlck9mZnNldFk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0UmFkID0gUGhhc2VyLk1hdGguRGVnVG9SYWQoZGlyZWN0aW9uID49IDAgPyAtNjAgOiAyNDApO1xyXG4gICAgICBjb25zdCBlbmRSYWQgPSBQaGFzZXIuTWF0aC5EZWdUb1JhZChkaXJlY3Rpb24gPj0gMCA/IDYwIDogMTIwKTtcclxuICAgICAgY29uc3QgcHJveHkgPSB7IHQ6IDAgfTtcclxuICAgICAgdGhpcy5zY2VuZS50d2VlbnMuYWRkKHtcclxuICAgICAgICB0YXJnZXRzOiBwcm94eSxcclxuICAgICAgICB0OiAxLFxyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICAgIGVhc2U6IFwiU2luZS5lYXNlT3V0XCIsXHJcbiAgICAgICAgb25VcGRhdGU6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGN1ciA9IFBoYXNlci5NYXRoLkxpbmVhcihzdGFydFJhZCwgZW5kUmFkLCBwcm94eS50KTtcclxuICAgICAgICAgIGNvbnN0IHRpcFggPSBjeCgpICsgZGlyZWN0aW9uICogTWF0aC5jb3MoY3VyKSAqIHJhbmdlO1xyXG4gICAgICAgICAgY29uc3QgdGlwWSA9IGN5KCkgKyBNYXRoLnNpbihjdXIpICogTWF0aC5yb3VuZChyYW5nZSAqIDAuNik7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHdyYXAgb2YgZW5lbWllcykge1xyXG4gICAgICAgICAgICBjb25zdCBzcHIgPSB3cmFwICYmIHdyYXAub3Bwb25lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB3cmFwICYmIHdyYXAudXNlcm5hbWU7XHJcbiAgICAgICAgICAgIGlmICghc3ByIHx8ICFuYW1lIHx8IGFscmVhZHlIaXQuaGFzKG5hbWUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgY29uc3QgZHggPSBzcHIueCAtIGN4KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLmh5cG90KHNwci54IC0gdGlwWCwgc3ByLnkgLSB0aXBZKTtcclxuICAgICAgICAgICAgaWYgKGRpc3QgPD0gMzggJiYgTWF0aC5zaWduKGR4KSA9PT0gTWF0aC5zaWduKGRpcmVjdGlvbikpIHtcclxuICAgICAgICAgICAgICBhbHJlYWR5SGl0LmFkZChuYW1lKTtcclxuICAgICAgICAgICAgICBzb2NrZXQuZW1pdChcImhpdFwiLCB7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tlcjogdGhpcy51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbmFtZSxcclxuICAgICAgICAgICAgICAgIGRhbWFnZSxcclxuICAgICAgICAgICAgICAgIGdhbWVJZDogdGhpcy5nYW1lSWQsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogdGhpcy51c2VybmFtZSxcclxuICAgICAgICB0eXBlOiBgJHtOQU1FfS1zbGFzaGAsXHJcbiAgICAgICAgZGlyZWN0aW9uLFxyXG4gICAgICAgIHJhbmdlLFxyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUaG9yZztcclxuIiwiLy8gZWZmZWN0cy5qc1xyXG4vLyBTaGFyZWQgbGlnaHR3ZWlnaHQgVkZYIGhlbHBlcnMgKGR1c3QgLyBzbW9rZSBwdWZmcyBmb3IgcnVubmluZylcclxuXHJcbmNvbnN0IGR1c3RQb29sID0gW107XHJcbmNvbnN0IGR1c3RQb29sTWF4ID0gMTIwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwYXduRHVzdChzY2VuZSwgeCwgeSwgdGludCA9IDB4YmJiYmJiKSB7XHJcbiAgbGV0IGcgPSBkdXN0UG9vbC5maW5kKChvKSA9PiAhby5hY3RpdmUpO1xyXG4gIGlmICghZykge1xyXG4gICAgZyA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gICAgZHVzdFBvb2wucHVzaChnKTtcclxuICB9XHJcbiAgZy5hY3RpdmUgPSB0cnVlO1xyXG4gIGcuY2xlYXIoKTtcclxuICBnLnNldERlcHRoKDEpOyAvLyBiZWhpbmQgcGxheWVycyAocGxheWVyIGRlcHRoIGFzc3VtZWQgPjEgZm9yIG1haW4gc3ByaXRlKVxyXG4gIGNvbnN0IGJhc2VTaXplID0gUGhhc2VyLk1hdGguQmV0d2Vlbig2LCAxMCk7XHJcbiAgLy8gU2xpZ2h0bHkgaGlnaGVyIHN0YXJ0aW5nIGFscGhhIHJhbmdlIGZvciBiZXR0ZXIgdmlzaWJpbGl0eVxyXG4gIGNvbnN0IGFscGhhU3RhcnQgPSBQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC40NSwgMC42NSk7XHJcbiAgY29uc3QgcHVmZkNvbG9yID0gUGhhc2VyLkRpc3BsYXkuQ29sb3IuSW50ZWdlclRvQ29sb3IodGludCk7XHJcbiAgLy8gT3V0ZXIgc29mdCByaW5nXHJcbiAgZy5maWxsU3R5bGUocHVmZkNvbG9yLmNvbG9yLCBhbHBoYVN0YXJ0ICogMC42KTtcclxuICBnLmZpbGxDaXJjbGUoMCwgMCwgYmFzZVNpemUpO1xyXG4gIC8vIElubmVyIGRlbnNlciBjb3JlXHJcbiAgZy5maWxsU3R5bGUocHVmZkNvbG9yLmNvbG9yLCBhbHBoYVN0YXJ0KTtcclxuICBnLmZpbGxDaXJjbGUoMCwgMCwgYmFzZVNpemUgKiAwLjU1KTtcclxuICBnLnggPSB4ICsgUGhhc2VyLk1hdGguQmV0d2VlbigtNCwgNCk7XHJcbiAgZy55ID0geSArIFBoYXNlci5NYXRoLkJldHdlZW4oLTIsIDIpO1xyXG4gIGNvbnN0IHJpc2UgPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDEwLCAyMik7XHJcbiAgY29uc3QgZHJpZnRYID0gUGhhc2VyLk1hdGguQmV0d2VlbigtMTIsIDEyKTtcclxuICBjb25zdCBzY2FsZVRhcmdldCA9IFBoYXNlci5NYXRoLkZsb2F0QmV0d2VlbigxLjIsIDEuNik7XHJcbiAgY29uc3QgZHVyYXRpb24gPSBQaGFzZXIuTWF0aC5CZXR3ZWVuKDM4MCwgNTIwKTtcclxuICBnLnNjYWxlID0gMTtcclxuICBnLmFscGhhID0gYWxwaGFTdGFydDtcclxuICBzY2VuZS50d2VlbnMuYWRkKHtcclxuICAgIHRhcmdldHM6IGcsXHJcbiAgICB4OiBnLnggKyBkcmlmdFgsXHJcbiAgICB5OiBnLnkgLSByaXNlLFxyXG4gICAgYWxwaGE6IDAsXHJcbiAgICBzY2FsZTogc2NhbGVUYXJnZXQsXHJcbiAgICBkdXJhdGlvbixcclxuICAgIGVhc2U6IFwiQ3ViaWMuZWFzZU91dFwiLFxyXG4gICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICBnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICBnLmFscGhhID0gMTtcclxuICAgICAgZy5zY2FsZSA9IDE7XHJcbiAgICAgIGcuY2xlYXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgaWYgKGR1c3RQb29sLmxlbmd0aCA+IGR1c3RQb29sTWF4KSB7XHJcbiAgICBjb25zdCBvbGQgPSBkdXN0UG9vbC5maW5kKChvKSA9PiAhby5hY3RpdmUpO1xyXG4gICAgaWYgKG9sZCkge1xyXG4gICAgICBvbGQuZGVzdHJveSgpO1xyXG4gICAgICBjb25zdCBpZHggPSBkdXN0UG9vbC5pbmRleE9mKG9sZCk7XHJcbiAgICAgIGlmIChpZHggPj0gMCkgZHVzdFBvb2wuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJld2FybUR1c3Qoc2NlbmUsIGNvdW50ID0gNikge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgc3Bhd25EdXN0KHNjZW5lLCAtOTk5OSwgLTk5OTkpO1xyXG4gIH1cclxuICBkdXN0UG9vbC5mb3JFYWNoKChnKSA9PiB7XHJcbiAgICBnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgZy5jbGVhcigpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBOb3RlOiBjaGFyYWN0ZXItc3BlY2lmaWMgZWZmZWN0cyAobGlrZSBEcmF2ZW4ncyBmaXJlIHRyYWlsKSBsaXZlIGluXHJcbi8vIHRoZWlyIG93biBmaWxlcyB1bmRlciBzcmMvY2hhcmFjdGVycy88Y2hhcj4vZWZmZWN0cy5qcy5cclxuIiwiLy8gQ2hhcmFjdGVyIHN0YXRzIHdpdGhvdXQgZGVwZW5kZW5jaWVzIG9uIFBoYXNlciBvciBjaGFyYWN0ZXIgY2xhc3Nlc1xyXG4vLyBTaW5nbGUgc291cmNlIG9mIHRydXRoIGZvciBhbGwgY2hhcmFjdGVyIHN0YXRzIGFuZCBjb25zdGFudHNcclxuXHJcbi8vIERlZmF1bHQgY2hhcmFjdGVyIGZvciBuZXcgdXNlcnNcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ0hBUkFDVEVSID0gXCJuaW5qYVwiO1xyXG5leHBvcnQgY29uc3QgTEVWRUxfQ0FQID0gNTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGFyYWN0ZXJTdGF0cyA9IHtcclxuICBuaW5qYToge1xyXG4gICAgYmFzZUhlYWx0aDogODAwMCxcclxuICAgIGF0dGFja0Rlc2NyaXB0aW9uOiBcIlVubGVhc2hlcyBhIHNodXJpa2VuIHRoYXQgYm9vbWVyYW5ncyBiYWNrLlwiLFxyXG4gICAgYmFzZURhbWFnZTogMTAwMCxcclxuICAgIGFtbW9Db29sZG93bk1zOiAyMDAsXHJcbiAgICBhbW1vUmVsb2FkTXM6IDE0MDAsXHJcbiAgICBhbW1vQ2FwYWNpdHk6IDEsXHJcbiAgICBzcGVjaWFsRGVzY3JpcHRpb246IFwiRGFzaGVzIGZvcndhcmQsIHJlbGVhc2luZyBhIGZsdXJyeSBvZiBzaHVyaWtlbnMuXCIsXHJcbiAgICBzcGVjaWFsQmFzZURhbWFnZTogMjAwMCxcclxuICAgIHNwZWNpYWxDaGFyZ2VIaXRzOiAzLFxyXG4gICAgc3ByaXRlU2NhbGU6IDEsXHJcbiAgICBib2R5OiB7XHJcbiAgICAgIHdpZHRoU2hyaW5rOiAzNSxcclxuICAgICAgaGVpZ2h0U2hyaW5rOiAxMCxcclxuICAgICAgb2Zmc2V0WEZyb21IYWxmOiAwLFxyXG4gICAgICBvZmZzZXRZOiAxMCxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBIHN3aWZ0IGFuZCBhZ2lsZSBmaWdodGVyLlwiLFxyXG4gICAgZnJlZTogdHJ1ZSxcclxuICB9LFxyXG5cclxuICB0aG9yZzoge1xyXG4gICAgYmFzZUhlYWx0aDogMTMwMDAsXHJcbiAgICBhdHRhY2tEZXNjcmlwdGlvbjpcclxuICAgICAgXCJTd2luZ3MgYSBoZWF2eSBheGUgaW4gYSBzaG9ydCBhcmMsIHB1c2hpbmcgYmFjayBuZWFyYnkgZW5lbWllcy5cIixcclxuICAgIGJhc2VEYW1hZ2U6IDE4MDAsXHJcbiAgICBhbW1vQ29vbGRvd25NczogMzUwLFxyXG4gICAgYW1tb1JlbG9hZE1zOiAxMDAwLFxyXG4gICAgYW1tb0NhcGFjaXR5OiAzLFxyXG4gICAgc3BlY2lhbERlc2NyaXB0aW9uOiBcIlNsYW1zIHRoZSBncm91bmQgdG8gc2VuZCBhIHNob2Nrd2F2ZSBmb3J3YXJkLlwiLFxyXG4gICAgc3BlY2lhbEJhc2VEYW1hZ2U6IDI4MDAsXHJcbiAgICBzcGVjaWFsQ2hhcmdlSGl0czogNCxcclxuICAgIHNwcml0ZVNjYWxlOiAwLjcsXHJcbiAgICBib2R5OiB7XHJcbiAgICAgIHdpZHRoU2hyaW5rOiAzMCxcclxuICAgICAgaGVpZ2h0U2hyaW5rOiA4LFxyXG4gICAgICBvZmZzZXRYRnJvbUhhbGY6IC00MyxcclxuICAgICAgb2Zmc2V0WTogOCxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBIHN0dXJkeSBmcm9udGxpbmUgYnJ1aXNlciB3aXRoIGNydXNoaW5nIGJsb3dzLlwiLFxyXG4gICAgZnJlZTogdHJ1ZSxcclxuICB9LFxyXG5cclxuICBkcmF2ZW46IHtcclxuICAgIGJhc2VIZWFsdGg6IDYwMDAsXHJcbiAgICBhdHRhY2tEZXNjcmlwdGlvbjpcclxuICAgICAgXCJQdWZmcyBvdXQgYSBtYWdpY2FsIHNtb2tlIHRoYXQgZGVhbHMgc3BsYXNoIGJhc2VEYW1hZ2UgdG8gZXZlcnlvbmUgaW4gdGhlIHBhdGguXCIsXHJcbiAgICBiYXNlRGFtYWdlOiAxODAwLFxyXG4gICAgYW1tb0Nvb2xkb3duTXM6IDI1MCxcclxuICAgIGFtbW9SZWxvYWRNczogMTcwMCxcclxuICAgIGFtbW9DYXBhY2l0eTogMyxcclxuICAgIHNwZWNpYWxEZXNjcmlwdGlvbjogXCJVbmxlYXNoZXMgYSBzdGFmZiBub3ZhIHRoYXQgZXhwYW5kcyBvdXR3YXJkLlwiLFxyXG4gICAgc3BlY2lhbEJhc2VEYW1hZ2U6IDI0MDAsXHJcbiAgICBzcGVjaWFsQ2hhcmdlSGl0czogMyxcclxuICAgIHNwcml0ZVNjYWxlOiAxLjIsXHJcbiAgICBib2R5OiB7XHJcbiAgICAgIHdpZHRoU2hyaW5rOiAyMjAsXHJcbiAgICAgIGhlaWdodFNocmluazogMTk1LFxyXG4gICAgICBvZmZzZXRYRnJvbUhhbGY6IDkwLFxyXG4gICAgICBvZmZzZXRZOiAxMTMsXHJcbiAgICAgIC8vIFNoaWZ0IGJvZHkgdG8gdGhlIHJpZ2h0IHdoZW4gZmFjaW5nIGxlZnQgdG8gY292ZXIgc3RhZmZcclxuICAgICAgZmxpcE9mZnNldDogNSxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBIGRhcmsgc29yY2VyZXIgd2hvIG1hbmlwdWxhdGVzIHNoYWRvd3MuXCIsXHJcbiAgICB1bmxvY2tQcmljZTogMjgwXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFyYWN0ZXJTdGF0cyhjaGFyYWN0ZXIpIHtcclxuICByZXR1cm4gY2hhcmFjdGVyU3RhdHNbY2hhcmFjdGVyXSB8fCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxDaGFyYWN0ZXJzKCkge1xyXG4gIHJldHVybiBPYmplY3Qua2V5cyhjaGFyYWN0ZXJTdGF0cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGcmVlQ2hhcmFjdGVycygpIHtcclxuICByZXR1cm4gT2JqZWN0LmtleXMoY2hhcmFjdGVyU3RhdHMpLmZpbHRlcihcclxuICAgIChjaGFyKSA9PiBjaGFyYWN0ZXJTdGF0c1tjaGFyXS5mcmVlXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDaGFyYWN0ZXJMaXN0KCkge1xyXG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICBPYmplY3Qua2V5cyhjaGFyYWN0ZXJTdGF0cykubWFwKChjaGFyKSA9PiBbXHJcbiAgICAgIGNoYXIsXHJcbiAgICAgIGNoYXJhY3RlclN0YXRzW2NoYXJdLmZyZWUgPyAxIDogMCxcclxuICAgIF0pXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlYWx0aChjaGFyYWN0ZXIsIGxldmVsKSB7XHJcbiAgcmV0dXJuIGNoYXJhY3RlclN0YXRzW2NoYXJhY3Rlcl0uYmFzZUhlYWx0aCArIChsZXZlbCAtIDEpICogNTAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGFtYWdlKGNoYXJhY3RlciwgbGV2ZWwpIHtcclxuICByZXR1cm4gY2hhcmFjdGVyU3RhdHNbY2hhcmFjdGVyXS5iYXNlRGFtYWdlICsgKGxldmVsIC0gMSkgKiAxMDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVjaWFsRGFtYWdlKGNoYXJhY3RlciwgbGV2ZWwpIHtcclxuICByZXR1cm4gY2hhcmFjdGVyU3RhdHNbY2hhcmFjdGVyXS5zcGVjaWFsQmFzZURhbWFnZSArIChsZXZlbCAtIDEpICogMjAwO1xyXG59XHJcblxyXG4vLyBUaGUgbGV2ZWwgdXBncmFkZSBwcmljZSByZWZsZWN0cyB0aGUgY3VycmVudCBsZXZlbCB0aGUgY2hhcmFjdGVyIGlzIGF0XHJcbi8vIElmIHRoZSBjaGFyYWN0ZXIgd2FzIGF0IGxldmVsIDEgaXQgd291bGQgY29zdCAyMDAgdG8gZ28gdG8gbGV2ZWwgMlxyXG5leHBvcnQgZnVuY3Rpb24gdXBncmFkZVByaWNlKGxldmVsKSB7XHJcbiAgcmV0dXJuIDIwMCAqIDIgKiogKGxldmVsIC0gMSk7IC8vIERvdWJsZXMgZXZlcnkgbGV2ZWxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVubG9ja1ByaWNlKGNoYXJhY3Rlcikge1xyXG4gIHJldHVybiBjaGFyYWN0ZXJTdGF0c1tjaGFyYWN0ZXJdLnVubG9ja1ByaWNlIHx8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8gQ29tbW9uSlMgZXhwb3J0IGZvciBzZXJ2ZXItc2lkZSBjb21wYXRpYmlsaXR5XHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBERUZBVUxUX0NIQVJBQ1RFUixcclxuICAgIExFVkVMX0NBUCxcclxuICAgIGNoYXJhY3RlclN0YXRzLFxyXG4gICAgZGVmYXVsdENoYXJhY3Rlckxpc3QsXHJcbiAgICB1cGdyYWRlUHJpY2UsXHJcbiAgICB1bmxvY2tQcmljZVxyXG4gIH07XHJcbn1cclxuIiwiLy8gY29va2llcy5qc1xyXG5cclxuY29uc3QgREVGQVVMVF9QQVRIID0gXCIvXCI7XHJcbmNvbnN0IERFRkFVTFRfU0FNRVNJVEUgPSBcIkxheFwiO1xyXG5cclxuLyoqXHJcbiAqIFNldCBhIG5vbi1IdHRwT25seSBjb29raWUgZnJvbSB0aGUgYnJvd3Nlci5cclxuICogTk9URTogWW91IGNhbm5vdCBzZXQvY2xlYXIgdGhlIHNpZ25lZCBIdHRwT25seSBpZGVudGl0eSBjb29raWUgKGd1ZXN0X2lkL3VzZXJfaWQpIGZyb20gSlMuXHJcbiAqIFVzZSBhIHNlcnZlciBlbmRwb2ludCAoZS5nLiwgUE9TVCAvbG9nb3V0KSB0byBjbGVhciBpZGVudGl0eSBjb29raWVzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShcclxuICBuYW1lLFxyXG4gIHZhbHVlLFxyXG4gIHtcclxuICAgIGRheXMgPSAzMCwgICAgICAgICAgIC8vIGRlZmF1bHQgMzAgZGF5c1xyXG4gICAgcGF0aCA9IERFRkFVTFRfUEFUSCxcclxuICAgIHNhbWVTaXRlID0gREVGQVVMVF9TQU1FU0lURSwgLy8gXCJMYXhcIiBieSBkZWZhdWx0XHJcbiAgICBzZWN1cmUsICAgICAgICAgICAgICAvLyBhdXRvLXRydWUgb24gSFRUUFMgaWYgbm90IHByb3ZpZGVkXHJcbiAgfSA9IHt9XHJcbikge1xyXG4gIGNvbnN0IG1heEFnZSA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoZGF5cyAqIDI0ICogNjAgKiA2MCkpOyAvLyBzZWNvbmRzXHJcbiAgY29uc3QgaXNIdHRwcyA9XHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXHJcbiAgICB3aW5kb3cubG9jYXRpb24gJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcclxuICBjb25zdCB1c2VTZWN1cmUgPSBzZWN1cmUgPz8gaXNIdHRwcztcclxuXHJcbiAgbGV0IGNvb2tpZSA9XHJcbiAgICBgJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07IGAgK1xyXG4gICAgYE1heC1BZ2U9JHttYXhBZ2V9OyBQYXRoPSR7cGF0aH07IFNhbWVTaXRlPSR7c2FtZVNpdGV9YDtcclxuXHJcbiAgaWYgKHVzZVNlY3VyZSkgY29va2llICs9IFwiOyBTZWN1cmVcIjtcclxuXHJcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xyXG59XHJcblxyXG4vKiogQmFja3dhcmQgY29tcGF0aWJpbGl0eSBmb3IgZXhpc3RpbmcgaW1wb3J0cyAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29va2llID0gc2V0Q29va2llO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhIGNvb2tpZSB2YWx1ZSBieSBuYW1lLiBSZXR1cm5zIFwiXCIgaWYgbm90IGZvdW5kIChiYWNrd2FyZCBjb21wYXRpYmxlKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gIGNvbnN0IG5lZWRsZSA9IGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09YDtcclxuICBjb25zdCByYXcgPSBkb2N1bWVudC5jb29raWUgfHwgXCJcIjtcclxuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoXCI7IFwiKTtcclxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcclxuICAgIGlmIChwYXJ0LnN0YXJ0c1dpdGgobmVlZGxlKSkge1xyXG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnQuc2xpY2UobmVlZGxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGNvb2tpZSBieSBuYW1lLlxyXG4gKiBOT1RFOiBUaGlzIGNhbm5vdCBkZWxldGUgSHR0cE9ubHkgY29va2llcyBzZXQgYnkgdGhlIHNlcnZlcjsgdXNlIGEgc2VydmVyIHJvdXRlIChlLmcuLCAvbG9nb3V0KS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb29raWUoXHJcbiAgbmFtZSxcclxuICB7IHBhdGggPSBERUZBVUxUX1BBVEgsIHNhbWVTaXRlID0gREVGQVVMVF9TQU1FU0lURSwgc2VjdXJlIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBpc0h0dHBzID1cclxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbiAmJlxyXG4gICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xyXG4gIGNvbnN0IHVzZVNlY3VyZSA9IHNlY3VyZSA/PyBpc0h0dHBzO1xyXG5cclxuICBsZXQgY29va2llID1cclxuICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09OyBNYXgtQWdlPTA7IFBhdGg9JHtwYXRofTsgU2FtZVNpdGU9JHtzYW1lU2l0ZX1gO1xyXG4gIGlmICh1c2VTZWN1cmUpIGNvb2tpZSArPSBcIjsgU2VjdXJlXCI7XHJcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xyXG59XHJcblxyXG4vKiogQ29udmVuaWVuY2UgaGVscGVyIGZvciB5b3VyIFVJIGJhbm5lciAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoKSB7XHJcbiAgcmV0dXJuIGdldENvb2tpZShcImRpc3BsYXlfbmFtZVwiKSB8fCBcIkd1ZXN0XCI7XHJcbn1cclxuIiwiLy8gbWFwLmpzXHJcblxyXG4vLyBHbG9iYWxzXHJcbmxldCBiYXNlO1xyXG5sZXQgcGxhdGZvcm07XHJcbmxldCBsZWZ0UGxhdGZvcm07XHJcbmxldCByaWdodFBsYXRmb3JtO1xyXG5cclxuY29uc3QgbHVzaHlQZWFrc09iamVjdHMgPSBbXVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGx1c2h5UGVha3Moc2NlbmUpIHtcclxuICAvLyBDYW52YXMgdmFyaWFibGVzXHJcbiAgY29uc3QgY2FudmFzV2lkdGggPSBzY2VuZS5nYW1lLmNvbmZpZy53aWR0aDtcclxuICBjb25zdCBjYW52YXNIZWlnaHQgPSBzY2VuZS5nYW1lLmNvbmZpZy5oZWlnaHQ7XHJcbiAgY29uc3QgY2VudGVyWCA9IHNjZW5lLmNhbWVyYXMubWFpbi53aWR0aCAvIDI7XHJcblxyXG4gIC8vIFNldHVwIGJhY2tncm91bmQgcG9zaXRpb25cclxuICBjb25zdCBiYWNrZ3JvdW5kID0gc2NlbmUuYWRkLnNwcml0ZSgwLCAtMTgwLCBcImx1c2h5LWJnXCIpO1xyXG4gIC8vIFNldCBiYWNrZ3JvdW5kIHRvIHRoZSBzaXplIG9mIHRoZSBjYW52YXNcclxuICBiYWNrZ3JvdW5kLmRpc3BsYXlXaWR0aCA9IHNjZW5lLnN5cy5jYW52YXMud2lkdGg7XHJcbiAgYmFja2dyb3VuZC5kaXNwbGF5SGVpZ2h0ID0gc2NlbmUuc3lzLmNhbnZhcy5oZWlnaHQgKyA1MDA7IC8vIGFkZCA1MDAgdG8gcHJldmVudCBkaXN0b3J0aW9uXHJcbiAgYmFja2dyb3VuZC5zZXRPcmlnaW4oMCwgMCk7XHJcblxyXG4gIC8vIEJhc2VcclxuICBiYXNlID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDU1MCwgXCJsdXNoeS1iYXNlXCIpO1xyXG4gIGJhc2UuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XHJcbiAgYmFzZS5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXHJcbiAgYmFzZS5zZXRTY2FsZSgwLjcpOyAvLyBNYWtlcyBpdCBzbWFsbGVyXHJcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChiYXNlKVxyXG5cclxuICAvLyBQbGF0Zm9ybVxyXG4gIHBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclgsIDI1MCwgXCJsdXNoeS1wbGF0Zm9ybVwiKTtcclxuICBwbGF0Zm9ybS5zZXRTY2FsZSgwLjcpO1xyXG4gIHBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgcGxhdGZvcm0uc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIGx1c2h5UGVha3NPYmplY3RzLnB1c2gocGxhdGZvcm0pXHJcblxyXG4gIC8vIExlZnQgUGxhdGZvcm1cclxuICBsZWZ0UGxhdGZvcm0gPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDUwMCwgMjYwLCBcImx1c2h5LXNpZGUtcGxhdGZvcm1cIik7XHJcbiAgbGVmdFBsYXRmb3JtLnNldFNjYWxlKDAuNyk7XHJcbiAgbGVmdFBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgbGVmdFBsYXRmb3JtLnNldEltbW92YWJsZSh0cnVlKTtcclxuICBsdXNoeVBlYWtzT2JqZWN0cy5wdXNoKGxlZnRQbGF0Zm9ybSlcclxuXHJcbiAgLy8gUmlnaHQgUGxhdGZvcm1cclxuICByaWdodFBsYXRmb3JtID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKGNlbnRlclggKyA1MDAsIDI2MCwgXCJsdXNoeS1zaWRlLXBsYXRmb3JtXCIpO1xyXG4gIHJpZ2h0UGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcclxuICByaWdodFBsYXRmb3JtLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgcmlnaHRQbGF0Zm9ybS5zZXRJbW1vdmFibGUodHJ1ZSk7XHJcbiAgbHVzaHlQZWFrc09iamVjdHMucHVzaChyaWdodFBsYXRmb3JtKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgbHVzaHlQZWFrc09iamVjdHMsIGJhc2UsIHBsYXRmb3JtIH07XHJcbiIsIi8vIG1hcC5qc1xyXG5cclxuLy8gR2xvYmFsc1xyXG5sZXQgYmFzZU1pZGRsZTtcclxubGV0IGJhc2VUb3A7XHJcbmxldCBiYXNlTGVmdDtcclxubGV0IGJhc2VSaWdodDtcclxubGV0IHRpbnlQbGF0Zm9ybTE7XHJcbmxldCB0aW55UGxhdGZvcm0yO1xyXG5sZXQgdGlueVBsYXRmb3JtMztcclxubGV0IHRpbnlQbGF0Zm9ybTQ7XHJcbmxldCB0aW55UGxhdGZvcm01O1xyXG5sZXQgdGlueVBsYXRmb3JtNjtcclxuXHJcbmNvbnN0IG1hbmdyb3ZlTWVhZG93T2JqZWN0cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hbmdyb3ZlTWVhZG93KHNjZW5lKSB7XHJcbiAgLy8gQ2FudmFzIHZhcmlhYmxlc1xyXG4gIGNvbnN0IGNhbnZhc1dpZHRoID0gc2NlbmUuZ2FtZS5jb25maWcud2lkdGg7XHJcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xyXG4gIGNvbnN0IGNlbnRlclggPSBzY2VuZS5jYW1lcmFzLm1haW4ud2lkdGggLyAyO1xyXG5cclxuICAvLyBTZXR1cCBiYWNrZ3JvdW5kIHBvc2l0aW9uXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IHNjZW5lLmFkZC5zcHJpdGUoMCwgLTE4MCwgXCJtYW5ncm92ZS1iZ1wiKTtcclxuICAvLyBTZXQgYmFja2dyb3VuZCB0byB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzXHJcbiAgYmFja2dyb3VuZC5kaXNwbGF5V2lkdGggPSBzY2VuZS5zeXMuY2FudmFzLndpZHRoO1xyXG4gIGJhY2tncm91bmQuZGlzcGxheUhlaWdodCA9IHNjZW5lLnN5cy5jYW52YXMuaGVpZ2h0ICsgNTAwOyAvLyBhZGQgNTAwIHRvIHByZXZlbnQgZGlzdG9ydGlvblxyXG4gIGJhY2tncm91bmQuc2V0T3JpZ2luKDAsIDApO1xyXG5cclxuICAvLyBCYXNlIE1pZGRsZVxyXG4gIGJhc2VNaWRkbGUgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCwgNjAwLCBcIm1hbmdyb3ZlLWJhc2UtbWlkZGxlXCIpO1xyXG4gIGJhc2VNaWRkbGUuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XHJcbiAgYmFzZU1pZGRsZS5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXHJcbiAgYmFzZU1pZGRsZS5zZXRTY2FsZSgwLjYpOyAvLyBNYWtlcyBpdCBzbWFsbGVyXHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLnB1c2goYmFzZU1pZGRsZSk7XHJcblxyXG4gIC8vIEJhc2UgVG9wXHJcbiAgYmFzZVRvcCA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYLCA0MDgsIFwibWFuZ3JvdmUtYmFzZS10b3BcIik7XHJcbiAgYmFzZVRvcC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcclxuICBiYXNlVG9wLnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcclxuICBiYXNlVG9wLnNldFNjYWxlKDAuNik7IC8vIE1ha2VzIGl0IHNtYWxsZXJcclxuICBtYW5ncm92ZU1lYWRvd09iamVjdHMucHVzaChiYXNlVG9wKTtcclxuXHJcbiAgLy8gQmFzZSBMZWZ0XHJcbiAgYmFzZUxlZnQgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDQyMiwgNjM4LCBcIm1hbmdyb3ZlLWJhc2UtbGVmdFwiKTtcclxuICBiYXNlTGVmdC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlOyAvLyBEb2Vzbid0IGFsbG93IGdyYXZpdHlcclxuICBiYXNlTGVmdC5zZXRJbW1vdmFibGUodHJ1ZSk7IC8vIE1ha2VzIHN1cmUgaXQgZG9lc24ndCBtb3ZlXHJcbiAgYmFzZUxlZnQuc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKGJhc2VMZWZ0KTtcclxuXHJcbiAgLy8gQmFzZSBSaWdodFxyXG4gIGJhc2VSaWdodCA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYICsgNDIyLCA2MzgsIFwibWFuZ3JvdmUtYmFzZS1yaWdodFwiKTtcclxuICBiYXNlUmlnaHQuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTsgLy8gRG9lc24ndCBhbGxvdyBncmF2aXR5XHJcbiAgYmFzZVJpZ2h0LnNldEltbW92YWJsZSh0cnVlKTsgLy8gTWFrZXMgc3VyZSBpdCBkb2Vzbid0IG1vdmVcclxuICBiYXNlUmlnaHQuc2V0U2NhbGUoMC42KTsgLy8gTWFrZXMgaXQgc21hbGxlclxyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKGJhc2VSaWdodCk7XHJcblxyXG4gIC8vIFBsYXRmb3JtXHJcbiAgdGlueVBsYXRmb3JtMSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gMjgwLCAzMjUsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm0xLnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtMS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTEuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTEpO1xyXG5cclxuICAvLyBQbGF0Zm9ybSAyXHJcbiAgdGlueVBsYXRmb3JtMiA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYICsgMjgwLCAzMjUsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm0yLnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtMi5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTIuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTIpO1xyXG5cclxuICAvLyBQbGF0Zm9ybSAzXHJcbiAgdGlueVBsYXRmb3JtMyA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gNDMwLCAyMDAsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm0zLnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtMy5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTMuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTMpO1xyXG5cclxuICAvLyBQbGF0Zm9ybSA0XHJcbiAgdGlueVBsYXRmb3JtNCA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYICsgNDMwLCAyMDAsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm00LnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtNC5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTQuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTQpO1xyXG5cclxuICAvLyBQbGF0Zm9ybSA1XHJcbiAgdGlueVBsYXRmb3JtNSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gMTMwLCAxNTAsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm01LnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtNS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTUuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTUpO1xyXG5cclxuICAvLyBQbGF0Zm9ybSA2XHJcbiAgdGlueVBsYXRmb3JtNiA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYICsgMTMwLCAxNTAsIFwibWFuZ3JvdmUtdGlueS1wbGF0Zm9ybVwiKTtcclxuICB0aW55UGxhdGZvcm02LnNldFNjYWxlKDAuNik7XHJcbiAgdGlueVBsYXRmb3JtNi5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHRpbnlQbGF0Zm9ybTYuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIG1hbmdyb3ZlTWVhZG93T2JqZWN0cy5wdXNoKHRpbnlQbGF0Zm9ybTYpO1xyXG59XHJcblxyXG5leHBvcnQgeyBtYW5ncm92ZU1lYWRvd09iamVjdHMsIHRpbnlQbGF0Zm9ybTEsIHRpbnlQbGF0Zm9ybTIsIHRpbnlQbGF0Zm9ybTMsIHRpbnlQbGF0Zm9ybTQsIHRpbnlQbGF0Zm9ybTUsIHRpbnlQbGF0Zm9ybTYgfTtcclxuIiwiLy8gb3BwbGF5ZXIuanNcclxuXHJcbmltcG9ydCB7IGJhc2UsIHBsYXRmb3JtIH0gZnJvbSBcIi4vbWFwcy9sdXNoeVBlYWtzXCI7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNwYXduLCBjYWxjdWxhdGVNYW5ncm92ZVNwYXduIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0VGV4dHVyZUtleSxcclxuICByZXNvbHZlQW5pbUtleSxcclxuICBnZXRTdGF0cyxcclxuICBnZXRFZmZlY3RzQ2xhc3MsXHJcbn0gZnJvbSBcIi4vY2hhcmFjdGVyc1wiO1xyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgc2NlbmUsXHJcbiAgICBjaGFyYWN0ZXIsXHJcbiAgICB1c2VybmFtZSxcclxuICAgIHRlYW0sXHJcbiAgICBzcGF3blBsYXRmb3JtLFxyXG4gICAgc3Bhd24sXHJcbiAgICBwbGF5ZXJzSW5UZWFtLFxyXG4gICAgbWFwXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcclxuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgIHRoaXMudGVhbSA9IHRlYW07XHJcbiAgICB0aGlzLnNwYXduUGxhdGZvcm0gPSBzcGF3blBsYXRmb3JtO1xyXG4gICAgdGhpcy5zcGF3biA9IHNwYXduO1xyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICB0aGlzLm1hcE9iamVjdHM7XHJcbiAgICB0aGlzLnBsYXllcnNJblRlYW0gPSBwbGF5ZXJzSW5UZWFtO1xyXG4gICAgdGhpcy5vcE1heEhlYWx0aCA9IDgwMDA7XHJcbiAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IDgwMDA7XHJcbiAgICB0aGlzLm9wSGVhbHRoQmFyV2lkdGggPSA2MDtcclxuICAgIHRoaXMubW92ZW1lbnRUd2VlbiA9IG51bGw7IC8vIFN0b3JlIHJlZmVyZW5jZSB0byBjdXJyZW50IG1vdmVtZW50IHR3ZWVuXHJcbiAgICB0aGlzLmVmZmVjdHMgPSBudWxsOyAvLyBwZXItb3Bwb25lbnQgZWZmZWN0cyAoZS5nLiwgRHJhdmVuIGZpcmUpXHJcbiAgICB0aGlzLmNyZWF0ZU9wUGxheWVyKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVPcFBsYXllcigpIHtcclxuICAgIC8vIENyZWF0ZXMgdGhlIHNwcml0ZVxyXG4gICAgY29uc3QgdGV4dHVyZUtleSA9IGdldFRleHR1cmVLZXkodGhpcy5jaGFyYWN0ZXIpO1xyXG4gICAgdGhpcy5vcHBvbmVudCA9IHRoaXMuc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKC0xMDAsIC0xMDAsIHRleHR1cmVLZXkpO1xyXG4gICAgLy8gQXZvaWQgZmlyc3QtZnJhbWUgcG9wOiBoaWRlIHVudGlsIGZyYW1lL2JvZHkgY29uZmlndXJlZCBhbmQgc3Bhd24gYXBwbGllZFxyXG4gICAgdGhpcy5vcHBvbmVudC5zZXRWaXNpYmxlKGZhbHNlKTtcclxuICAgIGNvbnN0IHN0YXRzID0gZ2V0U3RhdHModGhpcy5jaGFyYWN0ZXIpO1xyXG4gICAgdGhpcy5ib2R5Q29uZmlnID0gKHN0YXRzICYmIHN0YXRzLmJvZHkpIHx8IHt9O1xyXG4gICAgLy8gQXBwbHkgcGVyLWNoYXJhY3RlciBtYXggaGVhbHRoIGZvciBjb3JyZWN0IGJhciBzY2FsaW5nXHJcbiAgICBpZiAoc3RhdHMgJiYgdHlwZW9mIHN0YXRzLm1heEhlYWx0aCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICB0aGlzLm9wTWF4SGVhbHRoID0gc3RhdHMubWF4SGVhbHRoO1xyXG4gICAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IHRoaXMub3BNYXhIZWFsdGg7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhdHMuc3ByaXRlU2NhbGUgJiYgc3RhdHMuc3ByaXRlU2NhbGUgIT09IDEpIHtcclxuICAgICAgdGhpcy5vcHBvbmVudC5zZXRTY2FsZShzdGF0cy5zcHJpdGVTY2FsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wcG9uZW50LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLm9wcG9uZW50LmFuaW1zLnBsYXkoXHJcbiAgICAgIHJlc29sdmVBbmltS2V5KHRoaXMuc2NlbmUsIHRoaXMuY2hhcmFjdGVyLCBcImlkbGVcIiksXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcblxyXG4gICAgLy8gQ29uZmlndXJlIGZyYW1lL2JvZHkgQkVGT1JFIGNvbXB1dGluZyBzcGF3biBmb3IgY29ycmVjdCBpbml0aWFsIGdyb3VuZGluZ1xyXG4gICAgdGhpcy5vcEZyYW1lID0gdGhpcy5vcHBvbmVudC5mcmFtZTtcclxuICAgIGNvbnN0IGJzID0gdGhpcy5ib2R5Q29uZmlnO1xyXG4gICAgY29uc3Qgd2lkdGhTaHJpbmsgPSBicy53aWR0aFNocmluayA/PyAzNTtcclxuICAgIGNvbnN0IGhlaWdodFNocmluayA9IGJzLmhlaWdodFNocmluayA/PyAxMDtcclxuICAgIHRoaXMub3Bwb25lbnQuYm9keS5zZXRTaXplKFxyXG4gICAgICB0aGlzLm9wRnJhbWUud2lkdGggLSB3aWR0aFNocmluayxcclxuICAgICAgdGhpcy5vcEZyYW1lLmhlaWdodCAtIGhlaWdodFNocmlua1xyXG4gICAgKTtcclxuICAgIHRoaXMuYXBwbHlGbGlwT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUGVyLWNoYXJhY3RlciBlZmZlY3RzOiBpbnN0YW50aWF0ZSBpZiBhdmFpbGFibGUgZm9yIHRoaXMgY2hhcmFjdGVyXHJcbiAgICBjb25zdCBFZmZlY3RzQ2xzID0gZ2V0RWZmZWN0c0NsYXNzKHRoaXMuY2hhcmFjdGVyKTtcclxuICAgIGlmIChFZmZlY3RzQ2xzKSB7XHJcbiAgICAgIHRoaXMuZWZmZWN0cyA9IG5ldyBFZmZlY3RzQ2xzKHRoaXMuc2NlbmUsIHRoaXMub3Bwb25lbnQpO1xyXG4gICAgICB0aGlzLnNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCB0aGlzLl9vblNjZW5lVXBkYXRlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXRzIHNwYXduc1xyXG4gICAgaWYgKHRoaXMuc3Bhd25QbGF0Zm9ybSA9PT0gXCJib3R0b21cIikge1xyXG4gICAgICBpZiAodGhpcy5tYXAgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlU3Bhd24oYmFzZSwgdGhpcy5zcGF3biwgdGhpcy5vcHBvbmVudCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXAgPT09IFwiMlwiKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlTWFuZ3JvdmVTcGF3bihcImJvdHRvbVwiLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNwYXduUGxhdGZvcm0gPT09IFwidG9wXCIpIHtcclxuICAgICAgaWYgKHRoaXMubWFwID09PSBcIjFcIikge1xyXG4gICAgICAgIGNhbGN1bGF0ZVNwYXduKHBsYXRmb3JtLCB0aGlzLnNwYXduLCB0aGlzLm9wcG9uZW50KTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1hcCA9PT0gXCIyXCIpIHtcclxuICAgICAgICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKFwidG9wXCIsIHRoaXMuc3Bhd24sIHRoaXMub3Bwb25lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZWFsIG9ubHkgYWZ0ZXIgcG9zaXRpb24gaXMgZmluYWxpemVkXHJcbiAgICB0aGlzLm9wcG9uZW50LnNldFZpc2libGUodHJ1ZSk7XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgdGV4dCBvZiB0aGUgbmFtZSB0byB1c2VybmFtZVxyXG4gICAgY29uc3QgYm9keVRvcCA9IHRoaXMub3Bwb25lbnQuYm9keVxyXG4gICAgICA/IHRoaXMub3Bwb25lbnQuYm9keS55XHJcbiAgICAgIDogdGhpcy5vcHBvbmVudC55IC0gdGhpcy5vcHBvbmVudC5oZWlnaHQgLyAyO1xyXG4gICAgdGhpcy5vcFBsYXllck5hbWUgPSB0aGlzLnNjZW5lLmFkZC50ZXh0KFxyXG4gICAgICB0aGlzLm9wcG9uZW50LngsXHJcbiAgICAgIGJvZHlUb3AgLSAzNixcclxuICAgICAgdGhpcy51c2VybmFtZVxyXG4gICAgKTtcclxuICAgIHRoaXMub3BQbGF5ZXJOYW1lLnNldFN0eWxlKHtcclxuICAgICAgZm9udDogXCJib2xkIDhwdCBBcmlhbFwiLFxyXG4gICAgICBmaWxsOiBcIiMwMDAwMDBcIixcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vcFBsYXllck5hbWUuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgICB0aGlzLm9wUGxheWVyTmFtZS5zZXREZXB0aCgzKTsgLy8gYWJvdmUgaGVhbHRoIHRleHRcclxuXHJcbiAgICB0aGlzLm9wSGVhbHRoVGV4dCA9IHRoaXMuc2NlbmUuYWRkLnRleHQoMCwgMCwgXCJcIiwge1xyXG4gICAgICBmb250RmFtaWx5OiBcIkFyaWFsXCIsXHJcbiAgICAgIGZvbnRTaXplOiBcIjEwcHhcIixcclxuICAgICAgY29sb3I6IFwiI0ZGRkZGRlwiLFxyXG4gICAgICBzdHJva2U6IFwiIzAwMDAwMFwiLFxyXG4gICAgICBzdHJva2VUaGlja25lc3M6IDQsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9wSGVhbHRoQmFyID0gdGhpcy5zY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuXHJcbiAgICAvLyBJbml0aWFsbHkgdXBkYXRlcyBoZWFsdGggYmFyIGFuZCBuYW1lIHBvc2l0aW9uaW5nXHJcbiAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcigpO1xyXG4gICAgdGhpcy51cGRhdGVVSVBvc2l0aW9uKCk7XHJcblxyXG4gICAgLy8gTGlzdGVuIGZvciBoZWFsdGggdXBkYXRlcyBmb3IgdGhpcyBvcHBvbmVudFxyXG4gICAgc29ja2V0Lm9uKFwiaGVhbHRoLXVwZGF0ZVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAvLyBkYXRhOiB7IHVzZXJuYW1lLCBoZWFsdGgsIGdhbWVJZCB9XHJcbiAgICAgIGlmIChkYXRhLnVzZXJuYW1lID09PSB0aGlzLnVzZXJuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5vcEN1cnJlbnRIZWFsdGggPSBkYXRhLmhlYWx0aDtcclxuICAgICAgICBpZiAodGhpcy5vcEN1cnJlbnRIZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgdGhpcy5vcEN1cnJlbnRIZWFsdGggPSAwO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXIodHJ1ZSk7IC8vIHNob3cgZGVhZCBzdHlsaW5nICYgMFxyXG4gICAgICAgICAgLy8gU3RvcCBlZmZlY3RzIGlmIGFueVxyXG4gICAgICAgICAgaWYgKHRoaXMuZWZmZWN0cykge1xyXG4gICAgICAgICAgICAvLyBubyBleHBsaWNpdCBkZXN0cm95IG5lZWRlZCwganVzdCBzdG9wIHVwZGF0aW5nXHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuZXZlbnRzLm9mZihcInVwZGF0ZVwiLCB0aGlzLl9vblNjZW5lVXBkYXRlLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RzID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX29uU2NlbmVVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5lZmZlY3RzICYmIHRoaXMub3Bwb25lbnQpIHtcclxuICAgICAgLy8gRGV0ZXJtaW5lIHNpbXBsZSBtb3Zpbmcgc3RhdGU6IGhvcml6b250YWwgdmVsb2NpdHkgb3IgcmVjZW50IHR3ZWVuaW5nXHJcbiAgICAgIGNvbnN0IG1vdmluZyA9XHJcbiAgICAgICAgKHRoaXMub3Bwb25lbnQuYm9keSAmJiBNYXRoLmFicyh0aGlzLm9wcG9uZW50LmJvZHkudmVsb2NpdHkueCkgPiA1KSB8fFxyXG4gICAgICAgICEhdGhpcy5tb3ZlbWVudFR3ZWVuO1xyXG4gICAgICBjb25zdCBpc0RlYWQgPSB0aGlzLm9wQ3VycmVudEhlYWx0aCA8PSAwO1xyXG4gICAgICB0aGlzLmVmZmVjdHMudXBkYXRlKHRoaXMuc2NlbmUuZ2FtZS5sb29wLmRlbHRhLCBtb3ZpbmcsIGlzRGVhZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGp1c3QgYm9keSBvZmZzZXQgZGVwZW5kaW5nIG9uIGZhY2luZzsgdXNlcyBvcHRpb25hbCBmbGlwT2Zmc2V0IGZyb20gYm9keSBjb25maWdcclxuICBhcHBseUZsaXBPZmZzZXQoKSB7XHJcbiAgICBpZiAoIXRoaXMub3Bwb25lbnQgfHwgIXRoaXMub3Bwb25lbnQuYm9keSkgcmV0dXJuO1xyXG4gICAgY29uc3QgYnMgPSB0aGlzLmJvZHlDb25maWcgfHwge307XHJcbiAgICBjb25zdCBvZmZzZXRYRnJvbUhhbGYgPSBicy5vZmZzZXRYRnJvbUhhbGYgPz8gMDtcclxuICAgIGNvbnN0IG9mZnNldFkgPSBicy5vZmZzZXRZID8/IDEwO1xyXG4gICAgY29uc3QgZmxpcE9mZnNldCA9IGJzLmZsaXBPZmZzZXQgfHwgMDsgLy8gZmFsc3kgLT4gMFxyXG4gICAgY29uc3QgZXh0cmEgPSB0aGlzLm9wcG9uZW50LmZsaXBYID8gZmxpcE9mZnNldCA6IDA7XHJcbiAgICB0aGlzLm9wcG9uZW50LmJvZHkuc2V0T2Zmc2V0KFxyXG4gICAgICB0aGlzLm9wcG9uZW50LmJvZHkud2lkdGggLyAyICsgb2Zmc2V0WEZyb21IYWxmICsgZXh0cmEsXHJcbiAgICAgIG9mZnNldFlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBQdWJsaWMgaGVscGVyIHRvIHN5bmMgVUkgcG9zaXRpb25zIGltbWVkaWF0ZWx5ICh1c2VkIGFmdGVyIHRlbGVwb3J0cy9pbml0aWFsIHBvc2l0aW9uIHNldClcclxuICB1cGRhdGVVSVBvc2l0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wcG9uZW50KSByZXR1cm47XHJcbiAgICBjb25zdCBib2R5VG9wID0gdGhpcy5vcHBvbmVudC5ib2R5XHJcbiAgICAgID8gdGhpcy5vcHBvbmVudC5ib2R5LnlcclxuICAgICAgOiB0aGlzLm9wcG9uZW50LnkgLSB0aGlzLm9wcG9uZW50LmhlaWdodCAvIDI7XHJcbiAgICBpZiAodGhpcy5vcFBsYXllck5hbWUpIHtcclxuICAgICAgdGhpcy5vcFBsYXllck5hbWUuc2V0UG9zaXRpb24odGhpcy5vcHBvbmVudC54LCBib2R5VG9wIC0gMzYpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSGVhbHRoQmFyKGRlYWQgPSBmYWxzZSwgaGVhbHRoQmFyWSkge1xyXG4gICAgaWYgKHRoaXMub3BDdXJyZW50SGVhbHRoIDwgMCkge1xyXG4gICAgICAvLyBQcmV2ZW50cyBoZWFsdGggZnJvbSBnb2luZyBuZWdhdGl2ZVxyXG4gICAgICB0aGlzLm9wQ3VycmVudEhlYWx0aCA9IDA7XHJcbiAgICB9XHJcbiAgICAvLyBTZXRzIHBlcmNlbnRhZ2Ugb2YgaGVhbHRoXHJcbiAgICBjb25zdCBoZWFsdGhQZXJjZW50YWdlID0gTWF0aC5tYXgoXHJcbiAgICAgIDAsXHJcbiAgICAgIE1hdGgubWluKDEsIHRoaXMub3BDdXJyZW50SGVhbHRoIC8gdGhpcy5vcE1heEhlYWx0aClcclxuICAgICk7XHJcbiAgICBjb25zdCBkaXNwbGF5ZWRXaWR0aCA9IHRoaXMub3BIZWFsdGhCYXJXaWR0aCAqIGhlYWx0aFBlcmNlbnRhZ2U7XHJcblxyXG4gICAgLy8gQ2xlYXJzIHByZXZpb3VzIGhlYWx0aCBiYXIgZ3JhcGhpY3NcclxuICAgIHRoaXMub3BIZWFsdGhCYXIuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBTZXRzIHggaW4gdGhlIGNlbnRlclxyXG4gICAgY29uc3QgaGVhbHRoQmFyWCA9IHRoaXMub3Bwb25lbnQueCAtIHRoaXMub3BIZWFsdGhCYXJXaWR0aCAvIDI7XHJcbiAgICAvLyBJZiBubyBleHBsaWNpdCBZIHByb3ZpZGVkLCBhbmNob3IgdG8gdGhlIHNwcml0ZSdzIGJvZHkgdG9wIHNvIGl0IGRvZXNuJ3QganVtcFxyXG4gICAgY29uc3QgYm9keVRvcCA9IHRoaXMub3Bwb25lbnQuYm9keVxyXG4gICAgICA/IHRoaXMub3Bwb25lbnQuYm9keS55XHJcbiAgICAgIDogdGhpcy5vcHBvbmVudC55IC0gdGhpcy5vcHBvbmVudC5oZWlnaHQgLyAyO1xyXG4gICAgY29uc3QgeSA9XHJcbiAgICAgIHR5cGVvZiBoZWFsdGhCYXJZID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNOYU4oaGVhbHRoQmFyWSlcclxuICAgICAgICA/IGhlYWx0aEJhcllcclxuICAgICAgICA6IGJvZHlUb3AgLSAxNTtcclxuICAgIGlmIChkZWFkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRUZXh0KGAke3RoaXMub3BDdXJyZW50SGVhbHRofWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcEhlYWx0aFRleHQuc2V0VGV4dChgMGApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5maWxsU3R5bGUoMHg1OTU5NTkpO1xyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5maWxsUmVjdChoZWFsdGhCYXJYLCB5LCB0aGlzLm9wSGVhbHRoQmFyV2lkdGgsIDkpO1xyXG5cclxuICAgIC8vIENyZWF0ZXMgYSBibGFjayBib3JkZXIgYXJvdW5kIGhlYWx0aGJhclxyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5saW5lU3R5bGUoMywgMHgwMDAwMDApO1xyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5zdHJva2VSb3VuZGVkUmVjdChcclxuICAgICAgaGVhbHRoQmFyWCxcclxuICAgICAgeSxcclxuICAgICAgdGhpcy5vcEhlYWx0aEJhcldpZHRoLFxyXG4gICAgICA5LFxyXG4gICAgICAzXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnRlYW0gPT09IFwidXNlclwiKSB7XHJcbiAgICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFN0eWxlKDB4MmU4OGNhKTsgLy8gYmx1ZSBjb2xvciBmb3IgdXNlciB0ZWFtXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweGJiNWMzOSk7IC8vIHJlZCBjb2xvciBmb3Igb3AgdGVhbVxyXG4gICAgfVxyXG4gICAgdGhpcy5vcEhlYWx0aEJhci5maWxsUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgeSwgZGlzcGxheWVkV2lkdGgsIDksIDMpO1xyXG5cclxuICAgIHRoaXMub3BIZWFsdGhUZXh0LnNldFBvc2l0aW9uKFxyXG4gICAgICB0aGlzLm9wcG9uZW50LnggLSB0aGlzLm9wSGVhbHRoVGV4dC53aWR0aCAvIDIsXHJcbiAgICAgIHkgLSA4XHJcbiAgICApO1xyXG4gICAgdGhpcy5vcEhlYWx0aFRleHQuc2V0RGVwdGgoMik7XHJcbiAgfVxyXG5cclxuICAvLyBDbGVhbiB1cCBtZXRob2QgdG8gc3RvcCBhbnkgYWN0aXZlIHR3ZWVucyBhbmQgcmVtb3ZlIHNwcml0ZXNcclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMubW92ZW1lbnRUd2Vlbikge1xyXG4gICAgICB0aGlzLm1vdmVtZW50VHdlZW4ucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMubW92ZW1lbnRUd2VlbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lZmZlY3RzKSB7XHJcbiAgICAgIHRoaXMuc2NlbmUuZXZlbnRzLm9mZihcInVwZGF0ZVwiLCB0aGlzLl9vblNjZW5lVXBkYXRlLCB0aGlzKTtcclxuICAgICAgdGhpcy5lZmZlY3RzID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wcG9uZW50KSB7XHJcbiAgICAgIHRoaXMub3Bwb25lbnQuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3BQbGF5ZXJOYW1lKSB7XHJcbiAgICAgIHRoaXMub3BQbGF5ZXJOYW1lLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wSGVhbHRoVGV4dCkge1xyXG4gICAgICB0aGlzLm9wSGVhbHRoVGV4dC5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcEhlYWx0aEJhcikge1xyXG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gcGxheWVyLmpzXHJcbi8vIE5PVEU6IFJlZmFjdG9yZWQgdG8gcmVtb3ZlIGNpcmN1bGFyIGRlcGVuZGVuY3kgb24gZ2FtZS5qcy5cclxuLy8gc29ja2V0IG5vdyBjb21lcyBmcm9tIHN0YW5kYWxvbmUgc29ja2V0LmpzIGFuZCBvcHBvbmVudFBsYXllcnMgYXJlIHBhc3NlZCBpbnRvIGNyZWF0ZVBsYXllci5cclxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi9zb2NrZXRcIjtcclxuZnVuY3Rpb24gcGRiZygpIHtcclxuICAvKiBsb2dnaW5nIGRpc2FibGVkICovXHJcbn1cclxuaW1wb3J0IHsgbHVzaHlQZWFrc09iamVjdHMsIGJhc2UsIHBsYXRmb3JtIH0gZnJvbSBcIi4vbWFwcy9sdXNoeVBlYWtzXCI7XHJcbmltcG9ydCB7XHJcbiAgbWFuZ3JvdmVNZWFkb3dPYmplY3RzLFxyXG4gIHRpbnlQbGF0Zm9ybTEsXHJcbiAgdGlueVBsYXRmb3JtMixcclxuICB0aW55UGxhdGZvcm0zLFxyXG4gIHRpbnlQbGF0Zm9ybTQsXHJcbiAgdGlueVBsYXRmb3JtNSxcclxuICB0aW55UGxhdGZvcm02LFxyXG59IGZyb20gXCIuL21hcHMvbWFuZ3JvdmVNZWFkb3dcIjtcclxuaW1wb3J0IHtcclxuICBjcmVhdGVGb3IgYXMgY3JlYXRlQ2hhcmFjdGVyRm9yLFxyXG4gIGdldFRleHR1cmVLZXksXHJcbiAgcmVzb2x2ZUFuaW1LZXksXHJcbiAgZ2V0U3RhdHMsXHJcbiAgZ2V0RWZmZWN0c0NsYXNzLFxyXG59IGZyb20gXCIuL2NoYXJhY3RlcnNcIjtcclxuaW1wb3J0IHsgc3Bhd25EdXN0IH0gZnJvbSBcIi4vZWZmZWN0c1wiO1xyXG4vLyBHbG9iYWxzXHJcbmxldCBwbGF5ZXI7XHJcbmxldCBjdXJzb3JzO1xyXG5sZXQgY2FuV2FsbEp1bXAgPSB0cnVlO1xyXG5sZXQgaXNNb3ZpbmcgPSBmYWxzZTtcclxubGV0IGlzSnVtcGluZyA9IGZhbHNlO1xyXG5sZXQgaXNBdHRhY2tpbmcgPSBmYWxzZTtcclxubGV0IGNhbkF0dGFjayA9IHRydWU7XHJcbi8vIFNGWCBzdGF0ZVxyXG5sZXQgc2Z4V2Fsa0Nvb2xkb3duID0gMDtcclxubGV0IHdhc09uR3JvdW5kID0gZmFsc2U7XHJcblxyXG5sZXQgZnJhbWU7XHJcblxyXG5sZXQgbWF4SGVhbHRoID0gODAwMDtcclxubGV0IGN1cnJlbnRIZWFsdGggPSA4MDAwOyAvLyBDbGllbnQtc2lkZSBjb3B5IChkaXNwbGF5IG9ubHkpXHJcbmxldCBkZWFkID0gZmFsc2U7XHJcblxyXG5sZXQgaGVhbHRoQmFyV2lkdGggPSA2MDtcclxubGV0IGhlYWx0aEJhcjtcclxubGV0IGhlYWx0aFRleHQ7XHJcbi8vIEFtbW8vQ29vbGRvd24gYmFyIChjbGllbnQtc2lkZSBvbmx5KVxyXG5sZXQgYW1tb0JhcjsgLy8gZ3JhcGhpY3NcclxubGV0IGFtbW9CYXJCYWNrOyAvLyBiYWNrZ3JvdW5kIGdyYXBoaWNzXHJcbmxldCBhbW1vQmFyV2lkdGggPSA2MDtcclxubGV0IGFtbW9Db29sZG93bk1zID0gMTIwMDsgLy8gdGltZSBiZXR3ZWVuIHNob3RzXHJcbmxldCBhbW1vUmVsb2FkTXMgPSAxMjAwOyAvLyB0aW1lIHRvIHJlbG9hZCBvbmUgY2hhcmdlXHJcbmxldCBhbW1vQ2FwYWNpdHkgPSAxOyAvLyBudW1iZXIgb2Ygc2VnbWVudHNcclxubGV0IGFtbW9DaGFyZ2VzID0gMTsgLy8gY3VycmVudCBjaGFyZ2VzIGF2YWlsYWJsZVxyXG5sZXQgbmV4dEZpcmVUaW1lID0gMDsgLy8gdGltZXN0YW1wIChtcykgd2hlbiB3ZSBjYW4gZmlyZSBhZ2FpblxyXG5sZXQgcmVsb2FkVGltZXJNcyA9IDA7IC8vIGFjY3VtdWxhdGVzIHdoaWxlIHJlbG9hZGluZyB0b3dhcmQgYW1tb1JlbG9hZE1zXHJcblxyXG5sZXQgcGxheWVyTmFtZTtcclxuXHJcbmxldCBpbmRpY2F0b3JUcmlhbmdsZTtcclxuXHJcbmxldCB1c2VybmFtZTtcclxubGV0IGdhbWVJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIikuZmlsdGVyKEJvb2xlYW4pLnBvcCgpO1xyXG5cclxubGV0IHNjZW5lO1xyXG4vLyBQZXJzaXN0IHRoZSBzZWxlY3RlZCBjaGFyYWN0ZXIgc28gbW92ZW1lbnQgaGVscGVycyBjYW4gcmVzb2x2ZSBhbmltIGtleXNcclxubGV0IGN1cnJlbnRDaGFyYWN0ZXI7XHJcblxyXG5sZXQgc3Bhd247XHJcbmxldCBwbGF5ZXJzSW5UZWFtO1xyXG5sZXQgc3Bhd25QbGF0Zm9ybTtcclxubGV0IG1hcE9iamVjdHM7XHJcbmxldCBtYXA7XHJcbmxldCBvcHBvbmVudFBsYXllcnNSZWY7IC8vIGluamVjdGVkIGZyb20gZ2FtZS5qcyB0byBhdm9pZCBjaXJjdWxhciBpbXBvcnRcclxubGV0IGR1c3RUaW1lciA9IDA7XHJcbmNvbnN0IGR1c3RJbnRlcnZhbCA9IDcwOyAvLyBtcyBiZXR3ZWVuIGR1c3QgcHVmZnMgd2hlbiBydW5uaW5nXHJcblxyXG4vLyBCb2R5IGNvbmZpZyBhbmQgZmxpcC1vZmZzZXQgYXBwbGllciBob2lzdGVkIGZvciB1c2UgYWNyb3NzIGZ1bmN0aW9uc1xyXG5sZXQgYm9keUNvbmZpZyA9IG51bGw7XHJcbmxldCBhcHBseUZsaXBPZmZzZXRMb2NhbCA9IG51bGw7XHJcbmxldCBjaGFyRWZmZWN0cyA9IG51bGw7IC8vIHBlci1jaGFyYWN0ZXIsIHBlci1wbGF5ZXIgZWZmZWN0cyBoYW5kbGVyIChlLmcuLCBEcmF2ZW4gZmlyZSlcclxuXHJcbi8vIENyZWF0ZSBwbGF5ZXIgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcihcclxuICBzY2VuZVBhcmFtLFxyXG4gIG5hbWUsXHJcbiAgY2hhcmFjdGVyLFxyXG4gIHNwYXduUGxhdGZvcm1QYXJhbSxcclxuICBzcGF3blBhcmFtLFxyXG4gIHBsYXllcnNJblRlYW1QYXJhbSxcclxuICBtYXBQYXJhbSxcclxuICBvcHBvbmVudFBsYXllcnNQYXJhbVxyXG4pIHtcclxuICB1c2VybmFtZSA9IG5hbWU7XHJcbiAgc2NlbmUgPSBzY2VuZVBhcmFtO1xyXG4gIHNwYXduID0gc3Bhd25QYXJhbTtcclxuICBwbGF5ZXJzSW5UZWFtID0gcGxheWVyc0luVGVhbVBhcmFtO1xyXG4gIHNwYXduUGxhdGZvcm0gPSBzcGF3blBsYXRmb3JtUGFyYW07XHJcbiAgbWFwID0gbWFwUGFyYW07XHJcbiAgb3Bwb25lbnRQbGF5ZXJzUmVmID0gb3Bwb25lbnRQbGF5ZXJzUGFyYW07XHJcbiAgLy8gUmVtZW1iZXIgdGhlIGNob3NlbiBjaGFyYWN0ZXIgZm9yIGFuaW1hdGlvbiByZXNvbHV0aW9uIGluIHVwZGF0ZSBsb29wXHJcbiAgY3VycmVudENoYXJhY3RlciA9IGNoYXJhY3RlcjtcclxuICBwZGJnKCk7XHJcbiAgY3Vyc29ycyA9IHNjZW5lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuXHJcbiAgLy8gQW5pbWF0aW9ucyBhcmUgcmVnaXN0ZXJlZCBnbG9iYWxseSBpbiBnYW1lLmpzIHZpYSBzZXR1cEFsbChzY2VuZSlcclxuXHJcbiAgLy8gQ3JlYXRlIHBsYXllciBzcHJpdGUhISBVc2UgY2hhcmFjdGVyJ3MgdGV4dHVyZSBrZXlcclxuICBjb25zdCB0ZXh0dXJlS2V5ID0gZ2V0VGV4dHVyZUtleShjaGFyYWN0ZXIpO1xyXG4gIHBsYXllciA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZSgtMTAwLCAtMTAwLCB0ZXh0dXJlS2V5KTtcclxuICBwbGF5ZXIuYW5pbXMucGxheShyZXNvbHZlQW5pbUtleShzY2VuZSwgY3VycmVudENoYXJhY3RlciwgXCJpZGxlXCIpLCB0cnVlKTsgLy8gUGxheSBpZGxlIGFuaW1hdGlvblxyXG4gIC8vIEhpZGUgdW50aWwgd2UndmUgY29uZmlndXJlZCBmcmFtZS9ib2R5IGFuZCBzcGF3biB0byBhdm9pZCBhIG1pZC1haXIgZmlyc3QgcmVuZGVyXHJcbiAgcGxheWVyLnNldFZpc2libGUoZmFsc2UpO1xyXG4gIHBkYmcoKTtcclxuXHJcbiAgLy8gQXBwbHkgY2hhcmFjdGVyIHN0YXRzIChoZWFsdGgsIGFtbW8sIHNwcml0ZS9ib2R5IHNpemluZylcclxuICBjb25zdCBzdGF0cyA9IGdldFN0YXRzKGNoYXJhY3Rlcik7XHJcbiAgbWF4SGVhbHRoID0gc3RhdHMubWF4SGVhbHRoID8/IG1heEhlYWx0aDtcclxuICBjdXJyZW50SGVhbHRoID0gbWF4SGVhbHRoO1xyXG4gIGFtbW9Db29sZG93bk1zID0gc3RhdHMuYW1tb0Nvb2xkb3duTXMgPz8gYW1tb0Nvb2xkb3duTXM7XHJcbiAgYW1tb1JlbG9hZE1zID0gc3RhdHMuYW1tb1JlbG9hZE1zID8/IGFtbW9SZWxvYWRNcztcclxuICBhbW1vQ2FwYWNpdHkgPSBNYXRoLm1heCgxLCBzdGF0cy5hbW1vQ2FwYWNpdHkgPz8gYW1tb0NhcGFjaXR5KTtcclxuICBhbW1vQ2hhcmdlcyA9IGFtbW9DYXBhY2l0eTtcclxuICBuZXh0RmlyZVRpbWUgPSAwO1xyXG4gIHJlbG9hZFRpbWVyTXMgPSAwO1xyXG4gIGlmIChzdGF0cy5zcHJpdGVTY2FsZSAmJiBzdGF0cy5zcHJpdGVTY2FsZSAhPT0gMSkge1xyXG4gICAgcGxheWVyLnNldFNjYWxlKHN0YXRzLnNwcml0ZVNjYWxlKTtcclxuICB9XHJcblxyXG4gIC8vIEVzdGFibGlzaCBmcmFtZS9ib2R5IHNpemluZyBCRUZPUkUgY29tcHV0aW5nIHNwYXduIHNvIGhlaWdodCBtYXRoIGlzIGNvcnJlY3RcclxuICBmcmFtZSA9IHBsYXllci5mcmFtZTtcclxuICBjb25zdCBicyA9IChzdGF0cyAmJiBzdGF0cy5ib2R5KSB8fCB7fTtcclxuICBib2R5Q29uZmlnID0gYnM7IC8vIHBlcnNpc3QgZm9yIHVzZSBpbiBtb3ZlbWVudCBmdW5jdGlvblxyXG4gIGNvbnN0IHdpZHRoU2hyaW5rID0gYnMud2lkdGhTaHJpbmsgPz8gMzU7XHJcbiAgY29uc3QgaGVpZ2h0U2hyaW5rID0gYnMuaGVpZ2h0U2hyaW5rID8/IDEwO1xyXG4gIHBsYXllci5ib2R5LnNldFNpemUoZnJhbWUud2lkdGggLSB3aWR0aFNocmluaywgZnJhbWUud2lkdGggLSBoZWlnaHRTaHJpbmspO1xyXG4gIC8vIEhlbHBlciB0byBhZGp1c3QgYm9keSBvZmZzZXQgd2hlbiBmbGlwcGluZ1xyXG4gIGFwcGx5RmxpcE9mZnNldExvY2FsID0gKCkgPT4ge1xyXG4gICAgaWYgKCFwbGF5ZXIgfHwgIXBsYXllci5ib2R5KSByZXR1cm47XHJcbiAgICBjb25zdCBjZmcgPSBib2R5Q29uZmlnIHx8IHt9O1xyXG4gICAgY29uc3QgZmxpcE9mZnNldCA9IGNmZy5mbGlwT2Zmc2V0IHx8IDA7IC8vIGZhbHN5IC0+IDBcclxuICAgIGNvbnN0IGV4dHJhID0gcGxheWVyLmZsaXBYID8gZmxpcE9mZnNldCA6IDA7XHJcbiAgICBwbGF5ZXIuYm9keS5zZXRPZmZzZXQoXHJcbiAgICAgIHBsYXllci5ib2R5LndpZHRoIC8gMiArIChjZmcub2Zmc2V0WEZyb21IYWxmID8/IDApICsgZXh0cmEsXHJcbiAgICAgIGNmZy5vZmZzZXRZID8/IDEwXHJcbiAgICApO1xyXG4gIH07XHJcbiAgYXBwbHlGbGlwT2Zmc2V0TG9jYWwoKTtcclxuXHJcbiAgLy8gTGlzdGVuZXIgdG8gZGV0ZWN0IGlmIHBsYXllciBsZWF2ZXMgdGhlIHdvcmxkIGJvdW5kc1xyXG4gIHNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCAoKSA9PiB7XHJcbiAgICBpZiAocGxheWVyLnkgPiBzY2VuZS5waHlzaWNzLndvcmxkLmJvdW5kcy5ib3R0b20gKyA1MCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBSZXF1ZXN0IGEgc3VpY2lkZSBpZiBwbGF5ZXIgZmFsbHMgb3V0ICh0cmVhdCBhcyBzZWxmLWhpdCB0byA5OTk5OSlcclxuICAgICAgICBpZiAoIWRlYWQpIHtcclxuICAgICAgICAgIHNvY2tldC5lbWl0KFwiaGl0XCIsIHtcclxuICAgICAgICAgICAgYXR0YWNrZXI6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICBkYW1hZ2U6IDk5OTk5LFxyXG4gICAgICAgICAgICBnYW1lSWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHBkYmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIE1hcFxyXG4gIGlmIChtYXAgPT09IFwiMVwiKSB7XHJcbiAgICBtYXBPYmplY3RzID0gbHVzaHlQZWFrc09iamVjdHM7XHJcbiAgfSBlbHNlIGlmIChtYXAgPT09IFwiMlwiKSB7XHJcbiAgICBtYXBPYmplY3RzID0gbWFuZ3JvdmVNZWFkb3dPYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0cyBzcGF3biBiYXNlZCBvbiBzZXNzaW9uIHN0b3JhZ2UgZGF0YVxyXG4gIGlmIChzcGF3blBsYXRmb3JtID09PSBcImJvdHRvbVwiKSB7XHJcbiAgICBpZiAobWFwID09PSBcIjFcIikge1xyXG4gICAgICBjYWxjdWxhdGVTcGF3bihiYXNlLCBzcGF3biwgcGxheWVyKTtcclxuICAgIH0gZWxzZSBpZiAobWFwID09PSBcIjJcIikge1xyXG4gICAgICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKFwiYm90dG9tXCIsIHNwYXduLCBwbGF5ZXIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoc3Bhd25QbGF0Zm9ybSA9PT0gXCJ0b3BcIikge1xyXG4gICAgaWYgKG1hcCA9PT0gXCIxXCIpIHtcclxuICAgICAgY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHNwYXduLCBwbGF5ZXIpO1xyXG4gICAgfSBlbHNlIGlmIChtYXAgPT09IFwiMlwiKSB7XHJcbiAgICAgIGNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24oXCJ0b3BcIiwgc3Bhd24sIHBsYXllcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBOb3cgdGhhdCBwb3NpdGlvbiBpcyBmaW5hbGl6ZWQsIHJldmVhbCB0aGUgc3ByaXRlIGZvciB0aGUgZmlyc3QgZ3JvdW5kZWQgcmVuZGVyXHJcbiAgcGxheWVyLnNldFZpc2libGUodHJ1ZSk7XHJcblxyXG4gIC8vIEZyYW1lL2JvZHkgYWxyZWFkeSBjb25maWd1cmVkIGFib3ZlIHByaW9yIHRvIHNwYXduIGZvciBjb3JyZWN0IGluaXRpYWwgZ3JvdW5kaW5nXHJcblxyXG4gIC8vIFBsYXllciBuYW1lIHRleHQgYW5jaG9yZWQgdG8gcGh5c2ljcyBib2R5IHRvcCAobm90IGZyYW1lIGhlaWdodClcclxuICBjb25zdCBib2R5VG9wID0gcGxheWVyLmJvZHkgPyBwbGF5ZXIuYm9keS55IDogcGxheWVyLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjtcclxuICBwbGF5ZXJOYW1lID0gc2NlbmUuYWRkLnRleHQocGxheWVyLngsIGJvZHlUb3AgLSA1MCwgdXNlcm5hbWUpO1xyXG4gIHBsYXllck5hbWUuc2V0U3R5bGUoe1xyXG4gICAgZm9udDogXCJib2xkIDhwdCBBcmlhbFwiLFxyXG4gICAgZmlsbDogXCIjMDAwMDAwXCIsXHJcbiAgfSk7XHJcbiAgcGxheWVyTmFtZS5zZXRPcmlnaW4oMC41LCAwKTtcclxuXHJcbiAgLy8gSGVhbHRoIHRleHRcclxuICBoZWFsdGhUZXh0ID0gc2NlbmUuYWRkLnRleHQoMCwgMCwgXCJcIiwge1xyXG4gICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG4gICAgZm9udFNpemU6IFwiMTBweFwiLFxyXG4gICAgY29sb3I6IFwiI0ZGRkZGRlwiLCAvLyBXaGl0ZVxyXG4gICAgc3Ryb2tlOiBcIiMwMDAwMDBcIiwgLy8gQmxhY2tcclxuICAgIHN0cm9rZVRoaWNrbmVzczogNCxcclxuICB9KTtcclxuXHJcbiAgLy8gSGVhbHRoIGJhclxyXG4gIGhlYWx0aEJhciA9IHNjZW5lLmFkZC5ncmFwaGljcygpO1xyXG4gIC8vIEFtbW8gYmFyIGJhY2tncm91bmQgJiBmaWxsIChyZW5kZXIgb3JkZXI6IGJhY2tncm91bmQsIGZpbGwpXHJcbiAgYW1tb0JhckJhY2sgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuICBhbW1vQmFyID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcblxyXG4gIC8vIFRyaWFuZ2xlIHRvIHNob3cgd2hpY2ggb25lIGlzIHRoZSB1c2VyLiBEaXNzYXBlYXJzIHdoZW4gdGhlIHBsYXllciBtb3Zlc1xyXG4gIGluZGljYXRvclRyaWFuZ2xlID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcblxyXG4gIC8vIEFycm93IGFib3ZlIHRoZSBib2R5IHRvcCBzbyBpdCdzIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBmcmFtZSBwYWRkaW5nc1xyXG4gIGNvbnN0IHRyaWFuZ2xlID0gbmV3IFBoYXNlci5HZW9tLlRyaWFuZ2xlKFxyXG4gICAgcGxheWVyLngsXHJcbiAgICBib2R5VG9wIC0gMTAsIC8vIFRvcCBwb2ludFxyXG4gICAgcGxheWVyLnggLSAxMyxcclxuICAgIGJvZHlUb3AgLSAyMCwgLy8gTGVmdCBwb2ludFxyXG4gICAgcGxheWVyLnggKyAxMyxcclxuICAgIGJvZHlUb3AgLSAyMCAvLyBSaWdodCBwb2ludFxyXG4gICk7XHJcbiAgaW5kaWNhdG9yVHJpYW5nbGUuZmlsbFN0eWxlKDB4OTlhYjJjKTsgLy8gR3JlZW4gY29sb3JcclxuICBpbmRpY2F0b3JUcmlhbmdsZS5maWxsVHJpYW5nbGVTaGFwZSh0cmlhbmdsZSk7XHJcblxyXG4gIC8vIENoYXJhY3RlciBjb250cm9sbGVyIHdpcmluZyAoY2VudHJhbGl6ZWQgcGVyIGNoYXJhY3RlcilcclxuICBjb25zdCBhbW1vSG9va3MgPSB7XHJcbiAgICAvLyBzdGF0c1xyXG4gICAgZ2V0QW1tb0NhcGFjaXR5OiAoKSA9PiBhbW1vQ2FwYWNpdHksXHJcbiAgICBnZXRBbW1vQ29vbGRvd25NczogKCkgPT4gYW1tb0Nvb2xkb3duTXMsXHJcbiAgICBnZXRBbW1vUmVsb2FkTXM6ICgpID0+IGFtbW9SZWxvYWRNcyxcclxuICAgIC8vIHN0YXRlXHJcbiAgICBnZXRDaGFyZ2VzOiAoKSA9PiBhbW1vQ2hhcmdlcyxcclxuICAgIGdldE5leHRGaXJlVGltZTogKCkgPT4gbmV4dEZpcmVUaW1lLFxyXG4gICAgLy8gYWN0aW9uc1xyXG4gICAgdHJ5Q29uc3VtZTogKCkgPT4ge1xyXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBpZiAoIWNhbkF0dGFjaykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAobm93IDwgbmV4dEZpcmVUaW1lKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhbW1vQ2hhcmdlcyA8PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGFtbW9DaGFyZ2VzIC09IDE7XHJcbiAgICAgIG5leHRGaXJlVGltZSA9IG5vdyArIGFtbW9Db29sZG93bk1zO1xyXG4gICAgICAvLyBzdGFydC9yZXN0YXJ0IHJlbG9hZGluZyBpZiBub3QgZnVsbFxyXG4gICAgICBpZiAoYW1tb0NoYXJnZXMgPCBhbW1vQ2FwYWNpdHkgJiYgcmVsb2FkVGltZXJNcyA8PSAwKSByZWxvYWRUaW1lck1zID0gMDtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgZ3JhbnRDaGFyZ2U6IChuID0gMSkgPT4ge1xyXG4gICAgICBhbW1vQ2hhcmdlcyA9IE1hdGgubWluKGFtbW9DYXBhY2l0eSwgYW1tb0NoYXJnZXMgKyBuKTtcclxuICAgICAgaWYgKGFtbW9DaGFyZ2VzID49IGFtbW9DYXBhY2l0eSkgcmVsb2FkVGltZXJNcyA9IDA7XHJcbiAgICAgIGRyYXdBbW1vQmFyKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0Q2FuQXR0YWNrOiAodikgPT4gKGNhbkF0dGFjayA9IHYpLFxyXG4gICAgc2V0SXNBdHRhY2tpbmc6ICh2KSA9PiAoaXNBdHRhY2tpbmcgPSB2KSxcclxuICAgIC8vIHZpZXdcclxuICAgIGRyYXdBbW1vQmFyOiAoKSA9PiBkcmF3QW1tb0JhcigpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGN0cmwgPSBjcmVhdGVDaGFyYWN0ZXJGb3IoY2hhcmFjdGVyLCB7XHJcbiAgICBzY2VuZSxcclxuICAgIHBsYXllcixcclxuICAgIHVzZXJuYW1lLFxyXG4gICAgZ2FtZUlkLFxyXG4gICAgb3Bwb25lbnRQbGF5ZXJzUmVmLFxyXG4gICAgbWFwT2JqZWN0cyxcclxuICAgIGFtbW9Ib29rcyxcclxuICB9KTtcclxuICBpZiAoY3RybCAmJiBjdHJsLmF0dGFjaElucHV0KSBjdHJsLmF0dGFjaElucHV0KCk7XHJcblxyXG4gIC8vIFBlci1jaGFyYWN0ZXIgZWZmZWN0czogaW5zdGFudGlhdGUgaWYgdGhlIGNoYXJhY3RlciBwcm92aWRlcyBhbiBFZmZlY3RzIGNsYXNzXHJcbiAgY29uc3QgRWZmZWN0c0NscyA9IGdldEVmZmVjdHNDbGFzcyhjdXJyZW50Q2hhcmFjdGVyKTtcclxuICBjaGFyRWZmZWN0cyA9IEVmZmVjdHNDbHMgPyBuZXcgRWZmZWN0c0NscyhzY2VuZSwgcGxheWVyKSA6IG51bGw7XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIHNldCBoZWFsdGggb2YgcGxheWVyIGZyb20gYW5vdGhlciBmaWxlXHJcbmZ1bmN0aW9uIHNldEN1cnJlbnRIZWFsdGgoZGFtYWdlKSB7XHJcbiAgLy8gRGVwcmVjYXRlZDogc2VydmVyIGF1dGhvcml0YXRpdmUuIEtlcHQgZm9yIGNvbXBhdGliaWxpdHkgKG5vLW9wIGRpc3BsYXkgdXBkYXRlIG9ubHkpXHJcbiAgY3VycmVudEhlYWx0aCAtPSBkYW1hZ2U7XHJcbiAgaWYgKGN1cnJlbnRIZWFsdGggPCAwKSBjdXJyZW50SGVhbHRoID0gMDtcclxuICB1cGRhdGVIZWFsdGhCYXIoKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVIZWFsdGhCYXIoKSB7XHJcbiAgaWYgKGN1cnJlbnRIZWFsdGggPD0gMCkgY3VycmVudEhlYWx0aCA9IDA7XHJcbiAgY29uc3QgaGVhbHRoUGVyY2VudGFnZSA9IGN1cnJlbnRIZWFsdGggLyBtYXhIZWFsdGg7XHJcbiAgY29uc3QgZGlzcGxheWVkV2lkdGggPSBoZWFsdGhCYXJXaWR0aCAqIGhlYWx0aFBlcmNlbnRhZ2U7XHJcbiAgcGRiZygpO1xyXG5cclxuICBoZWFsdGhCYXIuY2xlYXIoKTsgLy8gQ2xlYXIgdGhlIGdyYXBoaWNzIGJlZm9yZSByZWRyYXdpbmdcclxuXHJcbiAgY29uc3QgaGVhbHRoQmFyWCA9IHBsYXllci54IC0gaGVhbHRoQmFyV2lkdGggLyAyO1xyXG4gIGNvbnN0IGJvZHlUb3AgPSBwbGF5ZXIuYm9keSA/IHBsYXllci5ib2R5LnkgOiBwbGF5ZXIueSAtIHBsYXllci5oZWlnaHQgLyAyO1xyXG4gIC8vIEFsd2F5cyBhbmNob3IgdG8gYm9keVRvcCBzbyBpdCBkb2Vzbid0IGp1bXAgd2hlbiBkZWFkXHJcbiAgY29uc3QgeSA9IGJvZHlUb3AgLSAyMDsgLy8ganVzdCBhYm92ZSBib2R5XHJcblxyXG4gIGlmICghZGVhZCkge1xyXG4gICAgaGVhbHRoVGV4dC5zZXRUZXh0KGAke2N1cnJlbnRIZWFsdGh9YCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFNob3cgMCBpbnN0ZWFkIG9mIGJsYW5rIHdoZW4gZGVhZFxyXG4gICAgaGVhbHRoVGV4dC5zZXRUZXh0KGAwYCk7XHJcbiAgICBwbGF5ZXJOYW1lLnNldFBvc2l0aW9uKHBsYXllci54LCBwbGF5ZXJOYW1lLnkgKyAzMCk7XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSB3aXRoIHRoZSBkZWZhdWx0IGZpbGwgY29sb3JcclxuICBoZWFsdGhCYXIuZmlsbFN0eWxlKDB4NTk1OTU5KTtcclxuICBoZWFsdGhCYXIuZmlsbFJlY3QoaGVhbHRoQmFyWCwgeSwgaGVhbHRoQmFyV2lkdGgsIDkpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBoZWFsdGggYmFyIGJhY2tncm91bmQgKHN0cm9rZSlcclxuICBoZWFsdGhCYXIubGluZVN0eWxlKDMsIDB4MDAwMDAwKTtcclxuICBoZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgeSwgaGVhbHRoQmFyV2lkdGgsIDksIDMpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBmaWxsZWQgcGFydCBvZiB0aGUgaGVhbHRoIGJhciAoZ3JlZW4pXHJcbiAgaGVhbHRoQmFyLmZpbGxTdHlsZSgweDk5YWIyYyk7XHJcbiAgaGVhbHRoQmFyLmZpbGxSb3VuZGVkUmVjdChoZWFsdGhCYXJYLCB5LCBkaXNwbGF5ZWRXaWR0aCwgOSwgMyk7XHJcblxyXG4gIGhlYWx0aFRleHQuc2V0UG9zaXRpb24ocGxheWVyLnggLSBoZWFsdGhUZXh0LndpZHRoIC8gMiwgeSAtIDgpO1xyXG4gIGhlYWx0aFRleHQuc2V0RGVwdGgoMik7XHJcblxyXG4gIC8vIERyYXcgYW1tbyBiYXIgdW5kZXJuZWF0aCBoZWFsdGggKG9ubHkgZm9yIGxvY2FsIHBsYXllciAmIHdoZW4gYWxpdmUpXHJcbiAgZHJhd0FtbW9CYXIoaGVhbHRoQmFyWCwgeSArIDExKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0FtbW9CYXIoZm9yY2VkWCwgZm9yY2VkWSkge1xyXG4gIGlmICghYW1tb0JhciB8fCAhYW1tb0JhckJhY2spIHJldHVybjtcclxuICBjb25zdCB4ID0gZm9yY2VkWCAhPT0gdW5kZWZpbmVkID8gZm9yY2VkWCA6IHBsYXllci54IC0gYW1tb0JhcldpZHRoIC8gMjtcclxuICBjb25zdCBib2R5VG9wID0gcGxheWVyLmJvZHkgPyBwbGF5ZXIuYm9keS55IDogcGxheWVyLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjtcclxuICBjb25zdCB5ID0gZm9yY2VkWSAhPT0gdW5kZWZpbmVkID8gZm9yY2VkWSA6IGJvZHlUb3AgLSA5OyAvLyBqdXN0IHVuZGVyIGhlYWx0aCBiYXJcclxuICBhbW1vQmFyQmFjay5jbGVhcigpO1xyXG4gIGFtbW9CYXIuY2xlYXIoKTtcclxuXHJcbiAgLy8gQmFja2dyb3VuZFxyXG4gIGFtbW9CYXJCYWNrLmZpbGxTdHlsZSgweDIyMjIyMiwgMC42NSk7XHJcbiAgYW1tb0JhckJhY2suZmlsbFJvdW5kZWRSZWN0KHgsIHksIGFtbW9CYXJXaWR0aCwgNiwgMyk7XHJcbiAgYW1tb0JhckJhY2subGluZVN0eWxlKDIsIDB4MDAwMDAwLCAwLjkpO1xyXG4gIGFtbW9CYXJCYWNrLnN0cm9rZVJvdW5kZWRSZWN0KHgsIHksIGFtbW9CYXJXaWR0aCwgNiwgMyk7XHJcblxyXG4gIC8vIERyYXcgc2VnbWVudGVkIGNoYXJnZXMgKGxpa2UgQnJhd2wgU3RhcnMpXHJcbiAgY29uc3QgZ2FwID0gMjtcclxuICBjb25zdCBzZWdtZW50V2lkdGggPSAoYW1tb0JhcldpZHRoIC0gZ2FwICogKGFtbW9DYXBhY2l0eSAtIDEpKSAvIGFtbW9DYXBhY2l0eTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtbW9DYXBhY2l0eTsgaSsrKSB7XHJcbiAgICBjb25zdCBzZWdYID0geCArIGkgKiAoc2VnbWVudFdpZHRoICsgZ2FwKTtcclxuICAgIC8vIERldGVybWluZSBmaWxsIGZvciB0aGlzIHNlZ21lbnRcclxuICAgIGxldCBwZXJjZW50ID0gMDtcclxuICAgIGlmIChpIDwgYW1tb0NoYXJnZXMpIHtcclxuICAgICAgcGVyY2VudCA9IDE7IC8vIGZ1bGwgY2hhcmdlXHJcbiAgICB9IGVsc2UgaWYgKGkgPT09IGFtbW9DaGFyZ2VzKSB7XHJcbiAgICAgIC8vIGN1cnJlbnRseSByZWxvYWRpbmcgdGhpcyBzZWdtZW50OiBwZXJjZW50IGJhc2VkIG9uIHJlbG9hZCBwcm9ncmVzc1xyXG4gICAgICBwZXJjZW50ID0gUGhhc2VyLk1hdGguQ2xhbXAocmVsb2FkVGltZXJNcyAvIGFtbW9SZWxvYWRNcywgMCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwZXJjZW50ID0gMDsgLy8gZnV0dXJlIHNlZ21lbnRzIGVtcHR5XHJcbiAgICB9XHJcbiAgICAvLyBDb2xvcnNcclxuICAgIGNvbnN0IGVtcHR5Q29sb3IgPSAweDMzMzMzMztcclxuICAgIGNvbnN0IHJlYWR5Q29sb3IgPSAweGZmNDA0MDtcclxuICAgIGNvbnN0IGNoYXJnaW5nQ29sb3IgPSAweGIzMjEyMTtcclxuICAgIGNvbnN0IGZpbGxDb2xvciA9IHBlcmNlbnQgPj0gMSA/IHJlYWR5Q29sb3IgOiBjaGFyZ2luZ0NvbG9yO1xyXG4gICAgLy8gRmlsbCBiYXNlIChlbXB0eSlcclxuICAgIGFtbW9CYXIuZmlsbFN0eWxlKGVtcHR5Q29sb3IsIDAuNSk7XHJcbiAgICBhbW1vQmFyLmZpbGxSb3VuZGVkUmVjdChzZWdYLCB5LCBzZWdtZW50V2lkdGgsIDYsIDIpO1xyXG4gICAgLy8gRmlsbCBjdXJyZW50IHBlcmNlbnRcclxuICAgIGlmIChwZXJjZW50ID4gMCkge1xyXG4gICAgICBhbW1vQmFyLmZpbGxTdHlsZShmaWxsQ29sb3IsIDAuOTUpO1xyXG4gICAgICBhbW1vQmFyLmZpbGxSb3VuZGVkUmVjdChzZWdYLCB5LCBzZWdtZW50V2lkdGggKiBwZXJjZW50LCA2LCAyKTtcclxuICAgIH1cclxuICB9XHJcbiAgYW1tb0Jhci5zZXREZXB0aCgyKTtcclxuICBhbW1vQmFyQmFjay5zZXREZXB0aCgxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHNwYXduLCBwbGF5ZXIpIHtcclxuICBjb25zdCBhdmFpbGFibGVTcGFjZSA9IHBsYXRmb3JtLndpZHRoIC8gcGxheWVyc0luVGVhbTsgLy8gU3BhY2UgZm9yIGVhY2ggcGxheWVyXHJcbiAgY29uc3QgbGVmdE1vc3QgPSBwbGF0Zm9ybS5nZXRCb3VuZHMoKS5sZWZ0OyAvLyBMZWZ0bW9zdCB4IGNvcmQgb2YgdGhlIHBsYXRmb3JtXHJcbiAgY29uc3Qgc3Bhd25ZID0gcGxhdGZvcm0uZ2V0VG9wQ2VudGVyKCkueSAtIHBsYXllci5oZWlnaHQgLyAyOyAvLyBHZXRzIHkgY29yZGluYXRlIGZvciB0aGUgcGxheWVyIGJ5IGNhbGN1bGF0aW5nIHRoZSBjZW50ZXIgYW5kIHN1YnRyYWN0aW5nIGhhbGYgdGhlIHBsYXllciBoZWlnaHQuIFNpbmNlIHRoZSBwbGF5ZXIgeSBpcyBhdCB0aGUgY2VudGVyLlxyXG5cclxuICBjb25zdCBzcGF3blggPSBsZWZ0TW9zdCArIChzcGF3biAqIGF2YWlsYWJsZVNwYWNlKSAvIDIgLSBwbGF5ZXIud2lkdGggKiAxLjMzMzsgLy8gQ2FsY3VsYXRlcyBzcGF3bnggYnkgY29tYmluaW5nIGFsbCB0aGUgcHJldmlvdXMgdmFyaWFibGVzLiAxLjMzMyBpcyBtdWx0aXBsaWVkIHRvIHBlcmZlY3QgdGhlIHBvc2l0aW9uIG9mIHRoZSBzcGF3biBvdGhlcndpc2UgaXQgaXMgb2Zmc2V0IHRvIHRoZSByaWdodC5cclxuICBwbGF5ZXIueCA9IHNwYXduWDtcclxuICBwbGF5ZXIueSA9IHNwYXduWTtcclxufVxyXG5mdW5jdGlvbiBjYWxjdWxhdGVNYW5ncm92ZVNwYXduKHBvc2l0aW9uLCBzcGF3blBhcmFtLCBwbGF5ZXIpIHtcclxuICBsZXQgcGxhdGZvcm07XHJcbiAgbGV0IHNwYXduID0gU3RyaW5nKHNwYXduUGFyYW0pO1xyXG4gIGlmIChwb3NpdGlvbiA9PT0gXCJ0b3BcIikge1xyXG4gICAgaWYgKHNwYXduID09PSBcIjFcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTE7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjJcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTI7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjNcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gXCJib3R0b21cIikge1xyXG4gICAgaWYgKHNwYXduID09PSBcIjFcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTQ7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjJcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTU7XHJcbiAgICB9IGVsc2UgaWYgKHNwYXduID09PSBcIjNcIikge1xyXG4gICAgICBwbGF0Zm9ybSA9IHRpbnlQbGF0Zm9ybTY7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBhdmFpbGFibGVTcGFjZSA9IHBsYXRmb3JtLndpZHRoO1xyXG4gIGNvbnN0IGxlZnRNb3N0ID0gcGxhdGZvcm0uZ2V0Qm91bmRzKCkubGVmdDsgLy8gTGVmdG1vc3QgeCBjb3JkIG9mIHRoZSBwbGF0Zm9ybVxyXG4gIGNvbnN0IHNwYXduWSA9IHBsYXRmb3JtLmdldFRvcENlbnRlcigpLnkgLSBwbGF5ZXIuaGVpZ2h0IC8gMjsgLy8gR2V0cyB5IGNvcmRpbmF0ZSBmb3IgdGhlIHBsYXllciBieSBjYWxjdWxhdGluZyB0aGUgY2VudGVyIGFuZCBzdWJ0cmFjdGluZyBoYWxmIHRoZSBwbGF5ZXIgaGVpZ2h0LiBTaW5jZSB0aGUgcGxheWVyIHkgaXMgYXQgdGhlIGNlbnRlci5cclxuXHJcbiAgY29uc3Qgc3Bhd25YID0gbGVmdE1vc3QgKyBhdmFpbGFibGVTcGFjZSAvIDIgLSBwbGF5ZXIud2lkdGg7XHJcbiAgcGxheWVyLnggPSBzcGF3blg7XHJcbiAgcGxheWVyLnkgPSBzcGF3blk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVQbGF5ZXJNb3ZlbWVudChzY2VuZSkge1xyXG4gIGNvbnN0IHNwZWVkID0gMjUwO1xyXG4gIGNvbnN0IGp1bXBTcGVlZCA9IDQwMDtcclxuXHJcbiAgLy8gS2V5cy4gUGxheWVyIGNhbiB1c2UgZWl0aGVyIGFycm93IGtleXMgb3IgV0FTRFxyXG4gIGNvbnN0IGxlZnRLZXkgPVxyXG4gICAgY3Vyc29ycy5sZWZ0LmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJBXCIpLmlzRG93bjtcclxuICBjb25zdCByaWdodEtleSA9XHJcbiAgICBjdXJzb3JzLnJpZ2h0LmlzRG93biB8fCBzY2VuZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoXCJEXCIpLmlzRG93bjtcclxuICBjb25zdCB1cEtleSA9IGN1cnNvcnMudXAuaXNEb3duIHx8IHNjZW5lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIldcIikuaXNEb3duO1xyXG5cclxuICAvLyBMZWZ0IG1vdmVtZW50XHJcbiAgaWYgKGxlZnRLZXkpIHtcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBtb3ZlZFxyXG4gICAgfVxyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WCgtc3BlZWQpOyAvLyBTZXRzIHZlbG9jaXR5IHRvIG5lZ2F0aXZlIHNvIHRoYXQgaXQgbW92ZXMgbGVmdFxyXG4gICAgY29uc3Qgd2FzRmxpcCA9IHBsYXllci5mbGlwWDtcclxuICAgIHBsYXllci5mbGlwWCA9IHRydWU7IC8vIE1pcnJvcnMgdGhlIGJvZHkgb2YgdGhlIHBsYXllclxyXG4gICAgaWYgKHBsYXllci5mbGlwWCAhPT0gd2FzRmxpcCAmJiBhcHBseUZsaXBPZmZzZXRMb2NhbClcclxuICAgICAgYXBwbHlGbGlwT2Zmc2V0TG9jYWwoKTtcclxuICAgIGlzTW92aW5nID0gdHJ1ZTsgLy8gU2V0cyB0aGUgaXNNb3ZpbmcgdG8gdHJ1ZVxyXG4gICAgaWYgKHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWlzQXR0YWNraW5nICYmICFkZWFkKSB7XHJcbiAgICAgIC8vIElmIHRoZSBwbGF5ZXIgaXMgbm90IGluIHRoZSBhaXIgb3IgYXR0YWNraW5nIG9yIGRlYWQsIGl0IHBsYXlzIHRoZSBydW5uaW5nIGFuaW1hdGlvblxyXG4gICAgICBwbGF5ZXIuYW5pbXMucGxheShcclxuICAgICAgICByZXNvbHZlQW5pbUtleShzY2VuZSwgY3VycmVudENoYXJhY3RlciwgXCJydW5uaW5nXCIpLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgICAgLy8gRm9vdHN0ZXAgU0ZYIHRocm90dGxlZFxyXG4gICAgICBzZnhXYWxrQ29vbGRvd24gKz0gc2NlbmUuZ2FtZS5sb29wLmRlbHRhO1xyXG4gICAgICBpZiAoc2Z4V2Fsa0Nvb2xkb3duID49IDI4MCkge1xyXG4gICAgICAgIHNmeFdhbGtDb29sZG93biA9IDA7XHJcbiAgICAgICAgc2NlbmUuc291bmQucGxheShcInNmeC1zdGVwXCIsIHsgdm9sdW1lOiAwLjE4IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBSaWdodCBtb3ZlbWVudFxyXG4gIH0gZWxzZSBpZiAocmlnaHRLZXkpIHtcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBtb3ZlZFxyXG4gICAgfVxyXG4gICAgY29uc3Qgd2FzRmxpcCA9IHBsYXllci5mbGlwWDtcclxuICAgIHBsYXllci5mbGlwWCA9IGZhbHNlOyAvLyBVbmRvcyB0aGUgbWlycm9yIG9mIHRoZSBwbGF5ZXJcclxuICAgIGlmIChwbGF5ZXIuZmxpcFggIT09IHdhc0ZsaXAgJiYgYXBwbHlGbGlwT2Zmc2V0TG9jYWwpXHJcbiAgICAgIGFwcGx5RmxpcE9mZnNldExvY2FsKCk7XHJcbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlYKHNwZWVkKTsgLy8gU2V0cyB2ZWxvY2l0eSB0b3J3YXJkcyByaWdodFxyXG4gICAgaXNNb3ZpbmcgPSB0cnVlOyAvLyBTZXRzIG1vdmluZyB2YXJpYWJsZVxyXG4gICAgaWYgKHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWlzQXR0YWNraW5nICYmICFkZWFkKSB7XHJcbiAgICAgIC8vIElmIHRoZSBwbGF5ZXIgaXMgbm90IGluIHRoZSBhaXIgb3IgYXR0YWNraW5nIG9yIGRlYWQsIGl0IHBsYXlzIHRoZSBydW5uaW5nIGFuaW1hdGlvblxyXG4gICAgICBwbGF5ZXIuYW5pbXMucGxheShcclxuICAgICAgICByZXNvbHZlQW5pbUtleShzY2VuZSwgY3VycmVudENoYXJhY3RlciwgXCJydW5uaW5nXCIpLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgICAgLy8gRm9vdHN0ZXAgU0ZYIHRocm90dGxlZFxyXG4gICAgICBzZnhXYWxrQ29vbGRvd24gKz0gc2NlbmUuZ2FtZS5sb29wLmRlbHRhO1xyXG4gICAgICBpZiAoc2Z4V2Fsa0Nvb2xkb3duID49IDI4MCkge1xyXG4gICAgICAgIHNmeFdhbGtDb29sZG93biA9IDA7XHJcbiAgICAgICAgc2NlbmUuc291bmQucGxheShcInNmeC1zdGVwXCIsIHsgdm9sdW1lOiAwLjIgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgc3RvcE1vdmluZygpOyAvLyBJZiBubyBrZXkgaXMgYmVpbmcgcHJlc3NlZCwgaXQgY2FsbHMgdGhlIHN0b3AgbW92aW5nIGZ1bmN0aW9uXHJcbiAgfVxyXG5cclxuICAvLyBKdW1waW5nXHJcbiAgaWYgKHVwS2V5ICYmIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWRlYWQpIHtcclxuICAgIC8vIElmIHBsYXllciBpcyB0b3VjaGluZyBncm91bmQgYW5kIGp1bXBpbmdcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpOyAvLyBSZW1vdmVzIGluZGljYXRvciB0cmlhbmdsZSBpZiB0aGUgcGxheWVyIGhhcyBqdW1wZWRcclxuICAgIH1cclxuICAgIGp1bXAoKTsgLy8gQ2FsbHMganVtcFxyXG4gICAgc2NlbmUuc291bmQucGxheShcInNmeC1qdW1wXCIsIHsgdm9sdW1lOiAwLjYgfSk7XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIC8vIElmIHBsYXllciBpcyB0b3VjaGluZyBhIHdhbGwgd2hpbGUganVtcGluZ1xyXG4gICAgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgKHBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0ICYmICFkZWFkKSkgJiZcclxuICAgIGNhbldhbGxKdW1wICYmXHJcbiAgICB1cEtleVxyXG4gICkge1xyXG4gICAgd2FsbEp1bXAoKTsgLy8gQ2FsbHMgd2FsbGp1bXBcclxuICAgIHNjZW5lLnNvdW5kLnBsYXkoXCJzZngtd2FsbGp1bXBcIiwgeyB2b2x1bWU6IDAuOSB9KTtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgKHBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0ICYmICFkZWFkKSkgJiZcclxuICAgICFpc0F0dGFja2luZ1xyXG4gICkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkocmVzb2x2ZUFuaW1LZXkoc2NlbmUsIGN1cnJlbnRDaGFyYWN0ZXIsIFwic2xpZGluZ1wiKSwgdHJ1ZSk7IC8vIFBsYXlzIHNsaWRpbmcgYW5pbWF0aW9uXHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiB0aGUganVtcCBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxyXG4gIGlmIChcclxuICAgICFwbGF5ZXIuYW5pbXMuaXNQbGF5aW5nICYmXHJcbiAgICAhcGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJlxyXG4gICAgIXBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgJiZcclxuICAgICFwbGF5ZXIuYm9keS50b3VjaGluZy5yaWdodFxyXG4gICkge1xyXG4gICAgZmFsbCgpOyAvLyBQbGF5cyBmYWxsaW5nIGFuaW1hdGlvbiBpZiB0aGUgcGxheWVyIGlzIG5vdCB0b3VjaGluZyBhIHdhbGwgb3IgaWYgYW55IG90aGVyIGFuaW1hdGlvbiBpcyBwbGF5aW5nXHJcbiAgfVxyXG5cclxuICAvLyBJZiBubyBtb3ZlbWVudCBhbmltYXRpb25zIGFyZSBwbGF5aW5nLCBwbGF5IHRoZSAnaWRsZScgYW5pbWF0aW9uXHJcbiAgaWYgKFxyXG4gICAgIWlzTW92aW5nICYmXHJcbiAgICBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmXHJcbiAgICAhaXNKdW1waW5nICYmXHJcbiAgICAhaXNBdHRhY2tpbmcgJiZcclxuICAgICFkZWFkXHJcbiAgKSB7XHJcbiAgICBpZGxlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIZWFsdGhCYXIoKTsgLy8gVXBkYXRlcyB0aGUgaGVhbHRoIGJhciBhZnRlciB0aGUgbmV3IHBsYXllciBwb3NpdGlvblxyXG4gIC8vIEtlZXAgbmFtZSBhbmNob3JlZCB0byBib2R5IHRvcCByZWdhcmRsZXNzIG9mIGZyYW1lIHBhZGRpbmdcclxuICBjb25zdCB1aVRvcCA9IHBsYXllci5ib2R5ID8gcGxheWVyLmJvZHkueSA6IHBsYXllci55IC0gcGxheWVyLmhlaWdodCAvIDI7XHJcbiAgcGxheWVyTmFtZS5zZXRQb3NpdGlvbihwbGF5ZXIueCwgdWlUb3AgLSAyMik7XHJcblxyXG4gIC8vIExhbmRpbmcgZGV0ZWN0aW9uICh0cmFuc2l0aW9uIGFpcmJvcm5lIC0+IGdyb3VuZGVkKVxyXG4gIGNvbnN0IG9uR3JvdW5kID0gcGxheWVyLmJvZHkudG91Y2hpbmcuZG93bjtcclxuICBpZiAoIXdhc09uR3JvdW5kICYmIG9uR3JvdW5kICYmICFkZWFkKSB7XHJcbiAgICBzY2VuZS5zb3VuZC5wbGF5KFwic2Z4LWxhbmRcIiwgeyB2b2x1bWU6IDAuOCB9KTtcclxuICB9XHJcbiAgd2FzT25Hcm91bmQgPSBvbkdyb3VuZDtcclxuXHJcbiAgLy8gQW1tbyByZWxvYWQgdGlja1xyXG4gIGlmIChhbW1vQ2hhcmdlcyA8IGFtbW9DYXBhY2l0eSkge1xyXG4gICAgcmVsb2FkVGltZXJNcyArPSBzY2VuZS5nYW1lLmxvb3AuZGVsdGE7XHJcbiAgICBpZiAocmVsb2FkVGltZXJNcyA+PSBhbW1vUmVsb2FkTXMpIHtcclxuICAgICAgcmVsb2FkVGltZXJNcyA9IDA7XHJcbiAgICAgIGFtbW9DaGFyZ2VzID0gTWF0aC5taW4oYW1tb0NhcGFjaXR5LCBhbW1vQ2hhcmdlcyArIDEpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZWxvYWRUaW1lck1zID0gMDsgLy8gZnVsbCwgbm8gcmVsb2FkIHByb2dyZXNzXHJcbiAgfVxyXG4gIC8vIFJlZHJhdyBhbW1vIGJhciBwZXJpb2RpY2FsbHkgKGNoZWFwIGRyYXcpXHJcbiAgaWYgKCFkZWFkKSBkcmF3QW1tb0JhcigpO1xyXG5cclxuICAvLyBQZXItY2hhcmFjdGVyIGVmZmVjdHMgdXBkYXRlIChlLmcuLCBEcmF2ZW4gZmlyZSB0cmFpbClcclxuICBpZiAoY2hhckVmZmVjdHMpIHtcclxuICAgIGNoYXJFZmZlY3RzLnVwZGF0ZShzY2VuZS5nYW1lLmxvb3AuZGVsdGEsIGlzTW92aW5nLCBkZWFkKTtcclxuICB9XHJcblxyXG4gIGR1c3RUaW1lciArPSBzY2VuZS5nYW1lLmxvb3AuZGVsdGE7XHJcblxyXG4gIC8vIEdyb3VuZCBydW5uaW5nIGR1c3QgKG9ubHkgd2hpbGUgb24gZ3JvdW5kICYgbW92aW5nKVxyXG4gIGlmIChcclxuICAgICFkZWFkICYmXHJcbiAgICBpc01vdmluZyAmJlxyXG4gICAgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93biAmJlxyXG4gICAgZHVzdFRpbWVyID49IGR1c3RJbnRlcnZhbFxyXG4gICkge1xyXG4gICAgZHVzdFRpbWVyID0gMDtcclxuICAgIC8vIFNwYXduIGF0IHRoZSBwaHlzaWNzIGJvZHkncyBib3R0b20gdG8gYWNjb3VudCBmb3IgcGVyLWNoYXJhY3RlciBmcmFtZSBzaXppbmdcclxuICAgIGNvbnN0IGJvZHlCb3R0b20gPSBwbGF5ZXIuYm9keVxyXG4gICAgICA/IHBsYXllci5ib2R5LnkgKyBwbGF5ZXIuYm9keS5oZWlnaHRcclxuICAgICAgOiBwbGF5ZXIueSArIHBsYXllci5oZWlnaHQgLyAyO1xyXG4gICAgY29uc3QgZHVzdFkgPSBib2R5Qm90dG9tIC0gMjsgLy8gc2xpZ2h0IGxpZnQgdG8gYXZvaWQgei1maWdodGluZ1xyXG4gICAgY29uc3QgZHVzdFggPSBwbGF5ZXIueCArIChwbGF5ZXIuZmxpcFggPyAtMTggOiAxOCkgKiAwLjM7XHJcbiAgICBzcGF3bkR1c3Qoc2NlbmUsIGR1c3RYLCBkdXN0WSk7XHJcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMykge1xyXG4gICAgICAvLyBvY2Nhc2lvbmFsIGV4dHJhIHB1ZmYgZm9yIHZhcmlhYmlsaXR5XHJcbiAgICAgIHNwYXduRHVzdChcclxuICAgICAgICBzY2VuZSxcclxuICAgICAgICBkdXN0WCArIFBoYXNlci5NYXRoLkJldHdlZW4oLTYsIDYpLFxyXG4gICAgICAgIGR1c3RZICsgUGhhc2VyLk1hdGguQmV0d2VlbigtMiwgMilcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3BNb3ZpbmcoKSB7XHJcbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlYKDApOyAvLyBTZXRzIHRoZSBwbGF5ZXIgdG8gbm90IG1vdmluZ1xyXG4gICAgaXNNb3ZpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGp1bXAoKSB7XHJcbiAgICBwbGF5ZXIuYW5pbXMucGxheShyZXNvbHZlQW5pbUtleShzY2VuZSwgY3VycmVudENoYXJhY3RlciwgXCJqdW1waW5nXCIpLCB0cnVlKTtcclxuICAgIHBkYmcoKTtcclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVkoLWp1bXBTcGVlZCk7XHJcbiAgICBpc01vdmluZyA9IHRydWU7XHJcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gd2FsbEp1bXAoKSB7XHJcbiAgICBjYW5XYWxsSnVtcCA9IGZhbHNlO1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkocmVzb2x2ZUFuaW1LZXkoc2NlbmUsIGN1cnJlbnRDaGFyYWN0ZXIsIFwic2xpZGluZ1wiKSwgdHJ1ZSk7XHJcbiAgICBwZGJnKCk7XHJcbiAgICBwbGF5ZXIuc2V0VmVsb2NpdHlZKC1qdW1wU3BlZWQpO1xyXG4gICAgLy8gSG9yaXpvbnRhbCBraWNrIGFuZCBzb3VuZCBoYW5kbGVkIGFib3ZlXHJcblxyXG4gICAgY29uc3Qgd2FsbEp1bXBUd2VlbiA9IHNjZW5lLnR3ZWVucy5hZGQoe1xyXG4gICAgICAvLyBUaGlzIHR3ZWVuIHNtb290aHMgdGhlIGtpY2tiYWNrIGZyb20gdGhlIHdhbGxqdW1wXHJcbiAgICAgIHRhcmdldHM6IHBsYXllcixcclxuICAgICAgeDogcGxheWVyLnggKyAocGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCA/IDUwIDogLTUwKSwgLy8gTW92ZXMgdGhlIHBsYXllciAtNTAgb3IgNTAgY29yZHMgYXdheSBkZXBlbmRpbmcgb24gcG9zaXRpb25cclxuICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgZWFzZTogXCJMaW5lYXJcIixcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhbldhbGxKdW1wID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgd2FsbEp1bXBUd2Vlbi5wbGF5KCk7IC8vIFBsYXlzIHRoZSB0d2VlblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmFsbCgpIHtcclxuICAgIHBsYXllci5hbmltcy5wbGF5KHJlc29sdmVBbmltS2V5KHNjZW5lLCBjdXJyZW50Q2hhcmFjdGVyLCBcImZhbGxpbmdcIiksIHRydWUpO1xyXG4gICAgcGRiZygpO1xyXG4gICAgaXNKdW1waW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpZGxlKCkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkocmVzb2x2ZUFuaW1LZXkoc2NlbmUsIGN1cnJlbnRDaGFyYWN0ZXIsIFwiaWRsZVwiKSwgdHJ1ZSk7XHJcbiAgICBwZGJnKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIHBsYXllcixcclxuICBmcmFtZSxcclxuICBjdXJyZW50SGVhbHRoLFxyXG4gIHNldEN1cnJlbnRIZWFsdGgsXHJcbiAgZGVhZCxcclxuICBjYWxjdWxhdGVTcGF3bixcclxuICBjYWxjdWxhdGVNYW5ncm92ZVNwYXduLFxyXG59O1xyXG5cclxuLy8gTGlzdGVuIGZvciBhdXRob3JpdGF0aXZlIGhlYWx0aCB1cGRhdGVzIGZyb20gc2VydmVyXHJcbnNvY2tldC5vbihcImhlYWx0aC11cGRhdGVcIiwgKGRhdGEpID0+IHtcclxuICBpZiAoZGF0YS5nYW1lSWQgIT09IGdhbWVJZCkgcmV0dXJuO1xyXG4gIGlmIChkYXRhLnVzZXJuYW1lID09PSB1c2VybmFtZSkge1xyXG4gICAgY29uc3QgcHJldiA9IGN1cnJlbnRIZWFsdGg7XHJcbiAgICBjdXJyZW50SGVhbHRoID0gZGF0YS5oZWFsdGg7XHJcbiAgICBwZGJnKCk7XHJcbiAgICAvLyBTRlg6IHBsYXkgZGFtYWdlIHZzIGhlYWwgZmVlZGJhY2tcclxuICAgIGlmIChzY2VuZSAmJiBzY2VuZS5zb3VuZCAmJiAhZGVhZCkge1xyXG4gICAgICBjb25zdCBkZWx0YSA9IGN1cnJlbnRIZWFsdGggLSBwcmV2O1xyXG4gICAgICBpZiAoZGVsdGEgPCAwKSB7XHJcbiAgICAgICAgLy8gVG9vayBkYW1hZ2VcclxuICAgICAgICBzY2VuZS5zb3VuZC5wbGF5KFwic2Z4LWRhbWFnZVwiLCB7IHZvbHVtZTogMC4xIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlbHRhID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHMgPSBzY2VuZS5zb3VuZC5hZGQoXCJzZngtaGVhbFwiLCB7IHZvbHVtZTogMC4xIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudEhlYWx0aCA8PSAwKSB7XHJcbiAgICAgIGlmICghZGVhZCkge1xyXG4gICAgICAgIGRlYWQgPSB0cnVlO1xyXG4gICAgICAgIHBsYXllci5hbmltcy5wbGF5KFxyXG4gICAgICAgICAgcmVzb2x2ZUFuaW1LZXkoc2NlbmUsIGN1cnJlbnRDaGFyYWN0ZXIsIFwiZHlpbmdcIiksXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzY2VuZS5pbnB1dC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgcGxheWVyLmFscGhhID0gMC41O1xyXG4gICAgICAgIHBkYmcoKTtcclxuICAgICAgfVxyXG4gICAgICBjdXJyZW50SGVhbHRoID0gMDsgLy8gZm9yY2UgZXhhY3QgMFxyXG4gICAgfVxyXG4gICAgdXBkYXRlSGVhbHRoQmFyKCk7IC8vIGFsd2F5cyByZWZyZXNoIChjb3ZlcnMgZGVhdGggY2FzZSB3aGVyZSBtb3ZlbWVudCBsb29wIHN0b3BzKVxyXG4gIH1cclxufSk7XHJcbiIsIi8vIE1pbmltYWwgc2luZ2xldG9uIFNvY2tldC5JTyBjbGllbnRcclxuLy8gPHNjcmlwdCBzcmM9XCIvc29ja2V0LmlvL3NvY2tldC5pby5qc1wiPjwvc2NyaXB0PiBpcyBhbHJlYWR5IGluY2x1ZGVkIGluIGluZGV4Lmh0bWxcclxuY29uc3Qgc29ja2V0ID0gd2luZG93LmlvKHtcclxuICAvLyBzYW1lLW9yaWdpbjsgc2VuZCBjb29raWVzIHNvIHRoZSBzZXJ2ZXIgY2FuIHJlYWQgc2lnbmVkIGNvb2tpZVxyXG4gIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICBhdXRvQ29ubmVjdDogdHJ1ZSxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHNvY2tldDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gZ2FtZS5qc1xyXG5cclxuaW1wb3J0IHsgZ2V0Q29va2llIH0gZnJvbSBcIi4vbGliL2Nvb2tpZXNcIjtcclxuaW1wb3J0IHsgbHVzaHlQZWFrcywgbHVzaHlQZWFrc09iamVjdHMgfSBmcm9tIFwiLi9tYXBzL2x1c2h5UGVha3NcIjtcclxuaW1wb3J0IHsgbWFuZ3JvdmVNZWFkb3csIG1hbmdyb3ZlTWVhZG93T2JqZWN0cyB9IGZyb20gXCIuL21hcHMvbWFuZ3JvdmVNZWFkb3dcIjtcclxuaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBwbGF5ZXIsIGhhbmRsZVBsYXllck1vdmVtZW50LCBkZWFkIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcbmltcG9ydCB7XHJcbiAgcHJlbG9hZEFsbCxcclxuICBoYW5kbGVSZW1vdGVBdHRhY2ssXHJcbiAgc2V0dXBBbGwsXHJcbiAgcmVzb2x2ZUFuaW1LZXksXHJcbn0gZnJvbSBcIi4vY2hhcmFjdGVyc1wiO1xyXG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldFwiO1xyXG5pbXBvcnQgT3BQbGF5ZXIgZnJvbSBcIi4vb3BQbGF5ZXJcIjtcclxuaW1wb3J0IHsgc3Bhd25EdXN0LCBwcmV3YXJtRHVzdCB9IGZyb20gXCIuL2VmZmVjdHNcIjtcclxuXHJcbi8vIFNvY2tldCBub3cgaW1wb3J0ZWQgZnJvbSBzdGFuZGFsb25lIG1vZHVsZSB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHNcclxuZnVuY3Rpb24gY2RiZygpIHtcclxuICAvKiBsb2dnaW5nIGRpc2FibGVkIGZvciBwcm9kdWN0aW9uICovXHJcbn1cclxuY2RiZygpO1xyXG5cclxuLy8gUGF0aCB0byBnZXQgYXNzZXRzXHJcbmNvbnN0IHN0YXRpY1BhdGggPSBcIi9hc3NldHNcIjtcclxuXHJcbi8vIFZhcmlhYmxlcyB0byBzdG9yZSBhbGwgb2YgdGhlIHNlc3Npb24gc3RvcmFnZSB2YWx1ZXNcclxuY29uc3QgZ2FtZUlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbikucG9wKCk7XHJcbmNvbnN0IHBhcnR5SWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicGFydHlcIik7XHJcbmNvbnN0IHVzZXJuYW1lID0gZ2V0Q29va2llKFwibmFtZVwiKTtcclxuY29uc3QgY2hhcmFjdGVyID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImNoYXJhY3RlclwiKTtcclxuY29uc3Qgc3Bhd25QbGF0Zm9ybSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzcGF3blBsYXRmb3JtXCIpO1xyXG5jb25zdCBzcGF3biA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzcGF3blwiKTtcclxuY29uc3QgcGFydHlNZW1iZXJzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInBhcnR5TWVtYmVyc1wiKTtcclxuY29uc3QgcGFydHlNZW1iZXJzTnVtID0gTnVtYmVyKHBhcnR5TWVtYmVycyk7XHJcbmNvbnN0IG1hcCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJtYXBcIik7XHJcblxyXG4vLyBNYXAgdmFyaWFsZVxyXG5sZXQgbWFwT2JqZWN0cztcclxuXHJcbi8vIExpc3RzIHRoYXQgc3RvcmUgYWxsIHRoZSBwbGF5ZXJzIGluIHBsYXllciB0ZWFtIGFuZCBvcCB0ZWFtXHJcbmNvbnN0IG9wcG9uZW50UGxheWVycyA9IFtdO1xyXG5jb25zdCB0ZWFtUGxheWVycyA9IFtdO1xyXG5sZXQgZ2FtZUVuZGVkID0gZmFsc2U7IC8vIHN0b3BzIHVwZGF0ZSBsb29wIG5ldHdvcmsgZW1pc3Npb25zIGFmdGVyIGdhbWUgb3ZlclxyXG5cclxuLy8gTW92ZW1lbnQgdGhyb3R0bGluZyB2YXJpYWJsZXNcclxubGV0IGxhc3RNb3ZlbWVudFNlbnQgPSAwO1xyXG5jb25zdCBtb3ZlbWVudFRocm90dGxlTXMgPSAyNTsgLy8gU2VuZCBtb3ZlbWVudCB1cGRhdGVzIGV2ZXJ5IDEwMG1zIChhYm91dCAxMCBGUFMpXHJcbmxldCBsYXN0UGxheWVyU3RhdGUgPSB7IHg6IDAsIHk6IDAsIGZsaXA6IGZhbHNlLCBhbmltYXRpb246IG51bGwgfTtcclxuXHJcbi8vIFNlcnZlciBzbmFwc2hvdCBpbnRlcnBvbGF0aW9uXHJcbmxldCBzdGF0ZUFjdGl2ZSA9IGZhbHNlOyAvLyBzZXQgdHJ1ZSBvbmNlIHdlIHN0YXJ0IHJlY2VpdmluZyBzZXJ2ZXIgc25hcHNob3RzXHJcbmNvbnN0IHN0YXRlQnVmZmVyID0gW107IC8vIHF1ZXVlIG9mIHsgdCwgcGxheWVyczogeyBbdXNlcm5hbWVdOiB7eCx5LGZsaXAsYW5pbWF0aW9ufSB9IH1cclxuY29uc3QgTUFYX1NUQVRFX0JVRkZFUiA9IDYwOyAvLyB+NCBzZWNvbmRzIGF0IDE1IEh6XHJcbmxldCBpbnRlcnBEZWxheU1zID0gMTAwOyAvLyByZW5kZXIgfjgwLTEyMG1zIGluIHRoZSBwYXN0IChkZWZhdWx0IDEwMG1zKVxyXG5cclxuLy8gTm8gcmVtb3RlIHByb2plY3RpbGUgcmVnaXN0cnkgKGRldGVybWluaXN0aWMgc2ltdWxhdGlvbiBvbiBlYWNoIGNsaWVudClcclxuXHJcbi8vIFBoYXNlciBjbGFzcyB0byBzZXR1cCB0aGUgZ2FtZVxyXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIC8vIFByZWxvYWRzIGFzc2V0c1xyXG4gIHByZWxvYWQoKSB7XHJcbiAgICBjZGJnKCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJsdXNoeS1iZ1wiLCBgJHtzdGF0aWNQYXRofS9MdXNoeS9nYW1lQmcucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJtYW5ncm92ZS1iZ1wiLCBgJHtzdGF0aWNQYXRofS9NYW5ncm92ZS9nYW1lQmcucG5nYCk7XHJcbiAgICAvLyBDaGFyYWN0ZXIgYXNzZXRzIChwcmVsb2FkIGFsbCByZWdpc3RlcmVkIGNoYXJhY3RlcnMpXHJcbiAgICBwcmVsb2FkQWxsKHRoaXMsIHN0YXRpY1BhdGgpO1xyXG5cclxuICAgIHRoaXMubG9hZC5hdGxhcyhcclxuICAgICAgXCJ0cm9sbFwiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS90cm9sbF9zcHJpdGVzaGVldC5wbmdgLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS90cm9sbC5qc29uYFxyXG4gICAgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcInRpbGVzLWltYWdlXCIsIGAke3N0YXRpY1BhdGh9L21hcC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC50aWxlbWFwVGlsZWRKU09OKFwidGlsZXNcIiwgYCR7c3RhdGljUGF0aH0vdGlsZXNoZWV0Lmpzb25gKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImx1c2h5LWJhc2VcIiwgYCR7c3RhdGljUGF0aH0vTHVzaHkvYmFzZS5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImx1c2h5LXBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L0x1c2h5L2xhcmdlUGxhdGZvcm0ucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXHJcbiAgICAgIFwibHVzaHktc2lkZS1wbGF0Zm9ybVwiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9MdXNoeS9zaWRlUGxhdGZvcm0ucG5nYFxyXG4gICAgKTtcclxuICAgIC8vIHRoaXMubG9hZC5pbWFnZShcImx1c2h5LW1lZGl1bS1wbGF0Zm9ybVwiLCBgJHtzdGF0aWNQYXRofS9MdXNoeS9tZWRpdW1QbGF0Zm9ybS5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcclxuICAgICAgXCJtYW5ncm92ZS10aW55LXBsYXRmb3JtXCIsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L01hbmdyb3ZlL3RpbnlQbGF0Zm9ybS5wbmdgXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFxyXG4gICAgICBcIm1hbmdyb3ZlLWJhc2UtbGVmdFwiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9NYW5ncm92ZS9iYXNlTGVmdC5wbmdgXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFxyXG4gICAgICBcIm1hbmdyb3ZlLWJhc2UtbWlkZGxlXCIsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L01hbmdyb3ZlL2Jhc2VNaWRkbGUucG5nYFxyXG4gICAgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcclxuICAgICAgXCJtYW5ncm92ZS1iYXNlLXJpZ2h0XCIsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L01hbmdyb3ZlL2Jhc2VSaWdodC5wbmdgXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKFwibWFuZ3JvdmUtYmFzZS10b3BcIiwgYCR7c3RhdGljUGF0aH0vTWFuZ3JvdmUvYmFzZVRvcC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcInRob3JnLXdlYXBvblwiLCBgJHtzdGF0aWNQYXRofS90aG9yZy93ZWFwb24ucG5nYCk7XHJcbiAgICAvLyBNb3ZlbWVudCBTRlggKHBsYWNlIGZpbGVzIHVuZGVyIC9hc3NldHMvYXVkaW8pXHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzZngtc3RlcFwiLCBgJHtzdGF0aWNQYXRofS9zdGVwLm9nZ2ApO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKFwic2Z4LWp1bXBcIiwgYCR7c3RhdGljUGF0aH0vanVtcC5tcDNgKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbyhcInNmeC1sYW5kXCIsIGAke3N0YXRpY1BhdGh9L2xhbmQubXAzYCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzZngtd2FsbGp1bXBcIiwgYCR7c3RhdGljUGF0aH0vd2FsbGp1bXAubXAzYCk7XHJcbiAgICAvLyBDb21iYXQvaGVhbHRoIFNGWFxyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKFwic2Z4LWRhbWFnZVwiLCBgJHtzdGF0aWNQYXRofS9kYW1hZ2UubXAzYCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJzZngtaGVhbFwiLCBgJHtzdGF0aWNQYXRofS9oZWFsLm1wM2ApO1xyXG4gICAgLy8gTXVzaWMgKG5vbi1sb29waW5nIGJnbSwgc2VwYXJhdGUgd2luL2xvc2Ugc3RpbmdlcnMpXHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJtYWluXCIsIGAke3N0YXRpY1BhdGh9L21haW4ud2F2YCk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oXCJ3aW5cIiwgYCR7c3RhdGljUGF0aH0vd2luLm1wM2ApO1xyXG4gICAgdGhpcy5sb2FkLmF1ZGlvKFwibG9zZVwiLCBgJHtzdGF0aWNQYXRofS9sb3NlLndhdmApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgY2RiZygpO1xyXG4gICAgLy8gRW5zdXJlIGNhbWVyYSByZW5kZXJzIG9uIHdob2xlIHBpeGVscyBmb3IgY3Jpc3Agc3ByaXRlc1xyXG4gICAgdGhpcy5jYW1lcmFzPy5tYWluICYmICh0aGlzLmNhbWVyYXMubWFpbi5yb3VuZFBpeGVscyA9IHRydWUpO1xyXG4gICAgLy8gQ3JlYXRlcyB0aGUgbWFwIG9iamVjdHNcclxuICAgIGlmIChtYXAgPT09IFwiMVwiKSB7XHJcbiAgICAgIG1hcE9iamVjdHMgPSBsdXNoeVBlYWtzT2JqZWN0cztcclxuICAgICAgbHVzaHlQZWFrcyh0aGlzKTtcclxuICAgICAgY2RiZygpO1xyXG4gICAgfSBlbHNlIGlmIChtYXAgPT09IFwiMlwiKSB7XHJcbiAgICAgIG1hcE9iamVjdHMgPSBtYW5ncm92ZU1lYWRvd09iamVjdHM7XHJcbiAgICAgIG1hbmdyb3ZlTWVhZG93KHRoaXMpO1xyXG4gICAgICBjZGJnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW5zdXJlIGFsbCBjaGFyYWN0ZXIgYW5pbWF0aW9ucyBhcmUgcmVnaXN0ZXJlZCBmb3IgdGhpcyBzY2VuZVxyXG4gICAgc2V0dXBBbGwodGhpcyk7XHJcblxyXG4gICAgLy8gQmFja2dyb3VuZCBtdXNpYzogcGxheSBvbmNlICgyOjMwIHRyYWNrKSwgbm8gbG9vcCwgYnV0IG9ubHkgYWZ0ZXIgYXVkaW8gdW5sb2NrICh1c2VyIGdlc3R1cmUpXHJcbiAgICB0aGlzLl9iZ21TdGFydGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBzdGFydEJnbSA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2JnbVN0YXJ0ZWQpIHJldHVybjtcclxuICAgICAgdGhpcy5fYmdtU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmJnbU1haW4pIHtcclxuICAgICAgICAgIHRoaXMuYmdtTWFpbiA9IHRoaXMuc291bmQuYWRkKFwibWFpblwiLCB7XHJcbiAgICAgICAgICAgIHZvbHVtZTogMC4wMixcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iZ21NYWluLnBsYXkoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5zb3VuZC5sb2NrZWQpIHtcclxuICAgICAgLy8gUGhhc2VyIHdpbGwgZW1pdCAndW5sb2NrZWQnIG9uIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb25cclxuICAgICAgdGhpcy5zb3VuZC5vbmNlKFwidW5sb2NrZWRcIiwgc3RhcnRCZ20pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSWYgYWxyZWFkeSB1bmxvY2tlZCwgc3RhcnQgaW1tZWRpYXRlbHk7IGFsc28gc2V0IGEgc2FmZSBmaXJzdC1jbGljayBob29rXHJcbiAgICAgIHN0YXJ0QmdtKCk7XHJcbiAgICB9XHJcbiAgICAvLyBFeHRyYSBzYWZldHk6IGlmIGZvciBzb21lIHJlYXNvbiAndW5sb2NrZWQnIGRvZXNuJ3QgZmlyZSwgc3RhcnQgb24gZmlyc3QgcG9pbnRlci9rZXlkb3duXHJcbiAgICB0aGlzLmlucHV0Lm9uY2UoXCJwb2ludGVyZG93blwiLCBzdGFydEJnbSk7XHJcbiAgICB0aGlzLmlucHV0LmtleWJvYXJkPy5vbmNlKFwia2V5ZG93blwiLCBzdGFydEJnbSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlcyBwbGF5ZXIgb2JqZWN0XHJcbiAgICBjcmVhdGVQbGF5ZXIoXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIHVzZXJuYW1lLFxyXG4gICAgICBjaGFyYWN0ZXIsXHJcbiAgICAgIHNwYXduUGxhdGZvcm0sXHJcbiAgICAgIHNwYXduLFxyXG4gICAgICBwYXJ0eU1lbWJlcnMsXHJcbiAgICAgIG1hcCxcclxuICAgICAgb3Bwb25lbnRQbGF5ZXJzXHJcbiAgICApO1xyXG4gICAgY2RiZygpO1xyXG4gICAgLy8gVG9nZ2xlIHBoeXNpY3MgZGVidWcgd2l0aCBDdHJsK01cclxuICAgIHRoaXMuaW5wdXQua2V5Ym9hcmQub24oXCJrZXlkb3duLU1cIiwgKGUpID0+IHtcclxuICAgICAgaWYgKCFlLmN0cmxLZXkpIHJldHVybjtcclxuICAgICAgY29uc3Qgd29ybGQgPSB0aGlzLnBoeXNpY3M/LndvcmxkO1xyXG4gICAgICBpZiAoIXdvcmxkKSByZXR1cm47XHJcbiAgICAgIC8vIEZsaXAgZGVidWcgZHJhdyBzdGF0ZVxyXG4gICAgICB3b3JsZC5kcmF3RGVidWcgPSAhd29ybGQuZHJhd0RlYnVnO1xyXG4gICAgICAvLyBDbGVhciBwcmV2aW91cyBncmFwaGljcyBhbmQgc2hvdy9oaWRlIGFjY29yZGluZ2x5XHJcbiAgICAgIGlmICh3b3JsZC5kZWJ1Z0dyYXBoaWMpIHtcclxuICAgICAgICB3b3JsZC5kZWJ1Z0dyYXBoaWMuY2xlYXIoKTtcclxuICAgICAgICB3b3JsZC5kZWJ1Z0dyYXBoaWMuc2V0VmlzaWJsZSh3b3JsZC5kcmF3RGVidWcpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFsc28gdXBkYXRlIHRoZSBjb25maWcgcmVmZXJlbmNlIGlmIHByZXNlbnQgKGhlbHBzIHNvbWUgcGx1Z2lucyBjaGVjaylcclxuICAgICAgaWYgKHRoaXMuc3lzPy5nYW1lPy5jb25maWc/LnBoeXNpY3M/LmFyY2FkZSkge1xyXG4gICAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLnBoeXNpY3MuYXJjYWRlLmRlYnVnID0gd29ybGQuZHJhd0RlYnVnO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEFkZHMgY29sbGlzaW9uIGJldHdlZW4gbWFwIGFuZCBwbGF5ZXJcclxuXHJcbiAgICBtYXBPYmplY3RzLmZvckVhY2goKG1hcE9iamVjdCkgPT4ge1xyXG4gICAgICAvLyBBZGQgY29sbGlkZXIgYmV0d2VlbiB0aGUgb2JqZWN0IGFuZCBlYWNoIG1hcCBvYmplY3RcclxuICAgICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihwbGF5ZXIsIG1hcE9iamVjdCk7XHJcbiAgICB9KTtcclxuICAgIGNkYmcoKTtcclxuXHJcbiAgICAvLyBNYWtlcyB0aGUgZmlnaHQgZWxlbWVudCB6b29tIGluIGF0IHRoZSBzdGFydCBvZiB0aGUgZ2FtZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWdodFwiKS5zdHlsZS53aWR0aCA9IFwiNjAlXCI7XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgdmFsdWVzIGZvciBZb3VyIFRlYW0gYW5kIE9wcG9zaW5nIFRlYW0gdGV4dFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwieW91ci10ZWFtXCJcclxuICAgICkudGV4dENvbnRlbnQgPSBgWW91ciBUZWFtOiAke3BhcnR5TWVtYmVyc30vJHtwYXJ0eU1lbWJlcnN9IHBsYXllcnNgO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwib3Bwb3NpbmctdGVhbVwiXHJcbiAgICApLnRleHRDb250ZW50ID0gYE9wcG9zaW5nIFRlYW06ICR7cGFydHlNZW1iZXJzfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XHJcbiAgICAvLyBFbWl0cyBwbGF5ZXItam9pbmVkIGFuZCBjcmVhdGVzIHRoZSBvcCBwbGF5ZXIgb2JqZWN0c1xyXG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXItam9pbmVkXCIsIHsgdXNlcm5hbWUsIGNoYXJhY3RlciB9KTtcclxuICAgIGNkYmcoKTtcclxuICAgIGZldGNoKFwiL3BsYXllcnNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZ2FtZUlkLCB1c2VybmFtZSB9KSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNkYmcoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLnVzZXJUZWFtKSB7XHJcbiAgICAgICAgICAvLyBVc2VyIHRlYW1cclxuICAgICAgICAgIGlmIChrZXkgIT09IHVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIEVuc3VyZXMgcGxheWVyIGlzIG5vdCBhZGRlZCBhZ2FpblxyXG4gICAgICAgICAgICBjb25zdCB1c2VyUGxheWVyID0gbmV3IE9wUGxheWVyKFxyXG4gICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgZGF0YS51c2VyVGVhbVtrZXldW1wiY2hhcmFjdGVyXCJdLFxyXG4gICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICBcInVzZXJcIixcclxuICAgICAgICAgICAgICBkYXRhLnVzZXJUZWFtW2tleV1bXCJzcGF3blBsYXRmb3JtXCJdLFxyXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcInNwYXduXCJdLFxyXG4gICAgICAgICAgICAgIHBhcnR5TWVtYmVycyxcclxuICAgICAgICAgICAgICBtYXBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGVhbVBsYXllcnNba2V5XSA9IHVzZXJQbGF5ZXI7IC8vIEFkZHMgcGxheWVyIG9iamVjdCB0byB0aGUgbGlzdFxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdpdGggY3VycmVudCBwb3NpdGlvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcInhcIl0gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcInlcIl0gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICB1c2VyUGxheWVyLm9wcG9uZW50LnggPSBkYXRhLnVzZXJUZWFtW2tleV1bXCJ4XCJdO1xyXG4gICAgICAgICAgICAgIHVzZXJQbGF5ZXIub3Bwb25lbnQueSA9IGRhdGEudXNlclRlYW1ba2V5XVtcInlcIl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2RiZyhcIm9wUGxheWVyIGNyZWF0ZWQgKHVzZXIgdGVhbSlcIiwgeyBrZXkgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEub3BUZWFtKSB7XHJcbiAgICAgICAgICBpZiAoa2V5ICE9PSB1c2VybmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IG5ldyBPcFBsYXllcihcclxuICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgIGRhdGEub3BUZWFtW2tleV1bXCJjaGFyYWN0ZXJcIl0sXHJcbiAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgIFwib3BcIixcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wic3Bhd25QbGF0Zm9ybVwiXSxcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wic3Bhd25cIl0sXHJcbiAgICAgICAgICAgICAgcGFydHlNZW1iZXJzLFxyXG4gICAgICAgICAgICAgIG1hcFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvcHBvbmVudFBsYXllcnNba2V5XSA9IG9wcG9uZW50UGxheWVyO1xyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHdpdGggY3VycmVudCBwb3NpdGlvbiBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgIGRhdGEub3BUZWFtW2tleV1bXCJ4XCJdICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wieVwiXSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnggPSBkYXRhLm9wVGVhbVtrZXldW1wieFwiXTtcclxuICAgICAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC55ID0gZGF0YS5vcFRlYW1ba2V5XVtcInlcIl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2RiZyhcIm9wUGxheWVyIGNyZWF0ZWQgKG9wIHRlYW0pXCIsIHsga2V5IH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGNkYmcoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gQWZ0ZXIgMSBzZWNvbmQgdGhlIGZpZ2h0IGltYWdlIGlzIHJlbW92ZWRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlnaHRcIik7XHJcbiAgICAgIGZpZ2h0LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgICAgZmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZmlnaHQucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMTAwMCk7XHJcblxyXG4gICAgLy8gUHJld2FybSBzbWFsbCBkdXN0IHBvb2xcclxuICAgIHByZXdhcm1EdXN0KHRoaXMsIDgpO1xyXG5cclxuICAgIC8vIENvZGUgdGhhdCBydW5zIHdoZW4gYW5vdGhlciBwbGF5ZXIgbW92ZXMgKGxlZ2FjeSBmYWxsYmFjaykuIERpc2FibGVkIHdoZW4gc3RhdGVBY3RpdmUuXHJcbiAgICBzb2NrZXQub24oXCJtb3ZlXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNkYmcoKTtcclxuICAgICAgaWYgKHN0YXRlQWN0aXZlKSByZXR1cm47IC8vIHByZWZlciBhdXRob3JpdGF0aXZlIGludGVycG9sYXRpb25cclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPVxyXG4gICAgICAgIG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSB8fCB0ZWFtUGxheWVyc1tkYXRhLnVzZXJuYW1lXTtcclxuICAgICAgLy8gRmluZHMgcGxheWVyIGZyb20gdGhlIGxpc3RcclxuICAgICAgaWYgKG9wcG9uZW50UGxheWVyKSB7XHJcbiAgICAgICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIHBvc2l0aW9uIGZvciBzbW9vdGggdHdlZW5pbmdcclxuICAgICAgICBjb25zdCBwcmV2WCA9IG9wcG9uZW50UGxheWVyLm9wcG9uZW50Lng7XHJcbiAgICAgICAgY29uc3QgcHJldlkgPSBvcHBvbmVudFBsYXllci5vcHBvbmVudC55O1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgZGlzdGFuY2UgdG8gZGV0ZXJtaW5lIGlmIHdlIHNob3VsZCB0d2VlbiBvciB0ZWxlcG9ydFxyXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKGRhdGEueCAtIHByZXZYKTtcclxuICAgICAgICBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyhkYXRhLnkgLSBwcmV2WSk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIHRvbyBsYXJnZSAocGxheWVyIHRlbGVwb3J0ZWQsIHJlc3Bhd25lZCwgZXRjLiksIGRvbid0IHR3ZWVuXHJcbiAgICAgICAgY29uc3QgbWF4VHdlZW5EaXN0YW5jZSA9IDMwMDtcclxuXHJcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gbWF4VHdlZW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgLy8gVGVsZXBvcnQgaW1tZWRpYXRlbHkgZm9yIGxhcmdlIGRpc3RhbmNlc1xyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueCA9IGRhdGEueDtcclxuICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnkgPSBkYXRhLnk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFN0b3AgYW55IGV4aXN0aW5nIG1vdmVtZW50IHR3ZWVuXHJcbiAgICAgICAgICBpZiAob3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2Vlbikge1xyXG4gICAgICAgICAgICBvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuLnJlbW92ZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIENyZWF0ZSBzbW9vdGggbW92ZW1lbnQgdHdlZW4gd2l0aCBvdmVybGFwIHByb3RlY3Rpb25cclxuICAgICAgICAgIGNvbnN0IHR3ZWVuRHVyYXRpb24gPSBNYXRoLm1pbigxNTAsIGRpc3RhbmNlICogMC44KTsgLy8gU2NhbGUgZHVyYXRpb24gd2l0aCBkaXN0YW5jZSwgbWF4IDE1MG1zXHJcblxyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2VlbiA9IHRoaXMudHdlZW5zLmFkZCh7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IG9wcG9uZW50UGxheWVyLm9wcG9uZW50LFxyXG4gICAgICAgICAgICB4OiBkYXRhLngsXHJcbiAgICAgICAgICAgIHk6IGRhdGEueSxcclxuICAgICAgICAgICAgZHVyYXRpb246IHR3ZWVuRHVyYXRpb24sXHJcbiAgICAgICAgICAgIGVhc2U6IFwiUG93ZXIyLmVhc2VPdXRcIiwgLy8gU21vb3RoZXIgZWFzaW5nIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy8gVXBkYXRlIG5hbWUgdGFnIHBvc2l0aW9uIGR1cmluZyB0d2VlbiB1c2luZyBib2R5VG9wXHJcbiAgICAgICAgICAgICAgY29uc3Qgc3ByID0gb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQ7XHJcbiAgICAgICAgICAgICAgY29uc3QgYm9keVRvcCA9IHNwci5ib2R5ID8gc3ByLmJvZHkueSA6IHNwci55IC0gc3ByLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnNldFBvc2l0aW9uKHNwci54LCBib2R5VG9wIC0gMzYpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2VlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBmbGlwIGFuZCBhbmltYXRpb24gaW1tZWRpYXRlbHkgKHRoZXNlIGRvbid0IG5lZWQgdHdlZW5pbmcpXHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuZmxpcFggPSBkYXRhLmZsaXA7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHBvbmVudFBsYXllci5hcHBseUZsaXBPZmZzZXQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIuYXBwbHlGbGlwT2Zmc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmFuaW1zLnBsYXkoXHJcbiAgICAgICAgICByZXNvbHZlQW5pbUtleShcclxuICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgb3Bwb25lbnRQbGF5ZXIuY2hhcmFjdGVyLFxyXG4gICAgICAgICAgICBkYXRhLmFuaW1hdGlvbixcclxuICAgICAgICAgICAgXCJpZGxlXCJcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIG5hbWUgdGFnIHBvc2l0aW9uXHJcbiAgICAgICAgY29uc3QgYm9keVRvcCA9IG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmJvZHlcclxuICAgICAgICAgID8gb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYm9keS55XHJcbiAgICAgICAgICA6IG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnkgLSBvcHBvbmVudFBsYXllci5vcHBvbmVudC5oZWlnaHQgLyAyO1xyXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihcclxuICAgICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LngsXHJcbiAgICAgICAgICBib2R5VG9wIC0gMzZcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSZW1vdGUgcnVubmluZyBkdXN0IChhcHByb3hpbWF0ZTogaWYgbW92ZWQgaG9yaXpvbnRhbGx5IGVub3VnaClcclxuICAgICAgICBpZiAoZGVsdGFYID4gMykge1xyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIuX2R1c3RUaW1lciA9IChvcHBvbmVudFBsYXllci5fZHVzdFRpbWVyIHx8IDApICsgMTY7IC8vIGFwcHJveGltYXRlIGZyYW1lIGRlbHRhXHJcbiAgICAgICAgICBpZiAob3Bwb25lbnRQbGF5ZXIuX2R1c3RUaW1lciA+PSA3MCkge1xyXG4gICAgICAgICAgICBvcHBvbmVudFBsYXllci5fZHVzdFRpbWVyID0gMDtcclxuICAgICAgICAgICAgY29uc3Qgc3ByID0gb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IHNwci5ib2R5XHJcbiAgICAgICAgICAgICAgPyBzcHIuYm9keS55ICsgc3ByLmJvZHkuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgOiBzcHIueSArIHNwci5oZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBzcGF3bkR1c3QodGhpcywgc3ByLngsIGJvdHRvbSAtIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXV0aG9yaXRhdGl2ZSBzZXJ2ZXIgc25hcHNob3RzICh0aHJvdHRsZWQgZnJvbSBzZXJ2ZXIpXHJcbiAgICBzb2NrZXQub24oXCJzdGF0ZVwiLCAocGF5bG9hZCkgPT4ge1xyXG4gICAgICBpZiAocGF5bG9hZC5nYW1lSWQgIT09IGdhbWVJZCkgcmV0dXJuO1xyXG4gICAgICBzdGF0ZUFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHN0YXRlQnVmZmVyLnB1c2gocGF5bG9hZCk7XHJcbiAgICAgIC8vIGtlZXAgYnVmZmVyIGJvdW5kZWRcclxuICAgICAgaWYgKHN0YXRlQnVmZmVyLmxlbmd0aCA+IE1BWF9TVEFURV9CVUZGRVIpIHN0YXRlQnVmZmVyLnNoaWZ0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXaGVuIGFub3RoZXIgcGxheWVyIGF0dGFja3MsIGRlbGVnYXRlIHRvIHRoYXQgcGxheWVyJ3MgY2hhcmFjdGVyIG1vZHVsZVxyXG4gICAgc29ja2V0Lm9uKFwiYXR0YWNrXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNkYmcoKTtcclxuICAgICAgY29uc3Qgb3duZXJXcmFwcGVyID0gb3Bwb25lbnRQbGF5ZXJzW2RhdGEubmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS5uYW1lXTtcclxuICAgICAgY29uc3Qgb3duZXJDaGFyYWN0ZXIgPSBvd25lcldyYXBwZXIgPyBvd25lcldyYXBwZXIuY2hhcmFjdGVyIDogbnVsbDtcclxuICAgICAgLy8gVHJ5IGNoYXJhY3Rlci1zcGVjaWZpYyBoYW5kbGVyIGZpcnN0XHJcbiAgICAgIGNvbnN0IGhhbmRsZWQgPSBvd25lckNoYXJhY3RlclxyXG4gICAgICAgID8gaGFuZGxlUmVtb3RlQXR0YWNrKHRoaXMsIG93bmVyQ2hhcmFjdGVyLCBkYXRhLCBvd25lcldyYXBwZXIpXHJcbiAgICAgICAgOiBmYWxzZTtcclxuICAgICAgaWYgKGhhbmRsZWQpIHJldHVybjtcclxuICAgICAgY29uc29sZS5sb2coXCJub3QgaGFuZGxlZFwiKTtcclxuICAgICAgLy8gR2VuZXJpYyBmYWxsYmFjayBmb3Igc2ltcGxlIHByb2plY3RpbGVzXHJcbiAgICAgIGNvbnN0IHByb2ogPSB0aGlzLnBoeXNpY3MuYWRkLmltYWdlKGRhdGEueCwgZGF0YS55LCBcImZpcmViYWxsXCIpO1xyXG4gICAgICBwcm9qLnNldFNjYWxlKDAuNCk7XHJcbiAgICAgIHByb2ouc2V0VmVsb2NpdHkoKGRhdGEuZGlyZWN0aW9uIHx8IDEpICogNDAwLCAwKTtcclxuICAgICAgcHJvai5mbGlwWCA9IGRhdGE/LmRpcmVjdGlvbiA8IDA7XHJcbiAgICAgIHByb2ouYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbW92ZWQgcHJvamVjdGlsZS11cGRhdGUvZGVzdHJveSBsaXN0ZW5lcnMgKG5vIG5ldHdvcmsgc3luY2luZylcclxuXHJcbiAgICAvLyBXaGVuIGFub3RoZXIgcGxheWVyIGRpZXNcclxuICAgIHNvY2tldC5vbihcImRlYXRoXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNkYmcoKTtcclxuICAgICAgaWYgKGRhdGEudXNlcm5hbWUgPT09IHVzZXJuYW1lKSB7XHJcbiAgICAgICAgLy8gU2VsZiBkZWF0aCBhbHJlYWR5IGhhbmRsZWQgdmlhIGhlYWx0aC11cGRhdGUgbGlzdGVuZXIgaW4gcGxheWVyLmpzXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9wcG9uZW50UGxheWVyID1cclxuICAgICAgICBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcblxyXG4gICAgICBpZiAoIW9wcG9uZW50UGxheWVyKSByZXR1cm47IC8vIFNhZmV0eSBndWFyZFxyXG5cclxuICAgICAgLy8gU3RvcCBhbnkgYWN0aXZlIG1vdmVtZW50IHR3ZWVuIGZvciB0aGUgZHlpbmcgcGxheWVyXHJcbiAgICAgIGlmIChvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuKSB7XHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIubW92ZW1lbnRUd2Vlbi5yZW1vdmUoKTtcclxuICAgICAgICBvcHBvbmVudFBsYXllci5tb3ZlbWVudFR3ZWVuID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRhdGEudXNlcm5hbWUgaW4gb3Bwb25lbnRQbGF5ZXJzKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ5b3VyLXRlYW1cIikudGV4dENvbnRlbnQgPSBgWW91ciBUZWFtOiAke1xyXG4gICAgICAgICAgcGFydHlNZW1iZXJzTnVtIC0gMVxyXG4gICAgICAgIH0vJHtwYXJ0eU1lbWJlcnN9IHBsYXllcnNgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgXCJvcHBvc2luZy10ZWFtXCJcclxuICAgICAgICApLnRleHRDb250ZW50ID0gYE9wcG9zaW5nIFRlYW06ICR7XHJcbiAgICAgICAgICBwYXJ0eU1lbWJlcnNOdW0gLSAxXHJcbiAgICAgICAgfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2A7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIER5aW5nIGFuaW1hdGlvbiAoY2hhcmFjdGVyLWF3YXJlKVxyXG4gICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC5hbmltcy5wbGF5KFxyXG4gICAgICAgIHJlc29sdmVBbmltS2V5KHRoaXMsIG9wcG9uZW50UGxheWVyLmNoYXJhY3RlciwgXCJkeWluZ1wiKSxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmFscGhhID0gMC41O1xyXG4gICAgICAvLyBVc2UgbG9jYWwgc3ByaXRlIHBvc2l0aW9uIChzZXJ2ZXIgbWF5IHNlbmQgMCBpZiBub3QgcGVyc2lzdGVkIHlldClcclxuICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnNldFBvc2l0aW9uKFxyXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LngsXHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnkgKyAzMFxyXG4gICAgICApO1xyXG4gICAgICBvcHBvbmVudFBsYXllci5vcEN1cnJlbnRIZWFsdGggPSAwOyAvLyBlbmZvcmNlIHplcm9cclxuICAgICAgb3Bwb25lbnRQbGF5ZXIudXBkYXRlSGVhbHRoQmFyKHRydWUpOyAvLyBpbnRlcm5hbGx5IGNvbXB1dGVzIFlcclxuXHJcbiAgICAgIC8vIERlbGV0ZXMgdGhlIHNwcml0ZSBmcm9tIHRoZSBnYW1lXHJcbiAgICAgIGlmIChvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0pIHtcclxuICAgICAgICBkZWxldGUgb3Bwb25lbnRQbGF5ZXJzW2RhdGEudXNlcm5hbWVdO1xyXG4gICAgICB9IGVsc2UgaWYgKHRlYW1QbGF5ZXJzW2RhdGEudXNlcm5hbWVdKSB7XHJcbiAgICAgICAgZGVsZXRlIHRlYW1QbGF5ZXJzW2RhdGEudXNlcm5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXaGVuIGV2ZXJ5b25lIGlzIGRlYWRcclxuICAgIHNvY2tldC5vbihcImdhbWUtb3ZlclwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICBjZGJnKCk7XHJcbiAgICAgIGlmIChnYW1lSWQgPT09IGRhdGEuZ2FtZUlkKSB7XHJcbiAgICAgICAgZ2FtZUVuZGVkID0gdHJ1ZTsgLy8gc3RvcCBlbWl0dGluZyBmdXJ0aGVyIG1vdmVzXHJcbiAgICAgICAgLy8gU3RvcCBiYWNrZ3JvdW5kIG11c2ljIGFuZCBwbGF5IHJlc3VsdCBtdXNpY1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5iZ21NYWluICYmIHRoaXMuYmdtTWFpbi5pc1BsYXlpbmcpIHRoaXMuYmdtTWFpbi5zdG9wKCk7XHJcbiAgICAgICAgICBjb25zdCBpc0xvc2VyID0gZGF0YS5sb3NlcnMuaW5jbHVkZXModXNlcm5hbWUpO1xyXG4gICAgICAgICAgY29uc3Qga2V5ID0gaXNMb3NlciA/IFwibG9zZVwiIDogXCJ3aW5cIjtcclxuICAgICAgICAgIGNvbnN0IHZvbCA9IGlzTG9zZXIgPyAwLjUgOiAwLjY7XHJcbiAgICAgICAgICB0aGlzLmJnbVJlc3VsdCA9IHRoaXMuc291bmQuYWRkKGtleSwgeyB2b2x1bWU6IHZvbCwgbG9vcDogZmFsc2UgfSk7XHJcbiAgICAgICAgICB0aGlzLmJnbVJlc3VsdC5wbGF5KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gaWdub3JlIGlmIGFzc2V0IG1pc3NpbmdcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtb3ZlclwiKTtcclxuICAgICAgICBpZiAoZGF0YS5sb3NlcnMuaW5jbHVkZXModXNlcm5hbWUpKSB7XHJcbiAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9IFwiWW91IExvc2VcIjtcclxuICAgICAgICAgIGdhbWVPdmVyLnN0eWxlLmNvbG9yID0gXCIjYzgxMjEyXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gXCJZb3UgV2luXCI7XHJcbiAgICAgICAgICBnYW1lT3Zlci5zdHlsZS5jb2xvciA9IFwiIzE4YzMyMVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0cyBlbmQgc2NyZWVuIG5hbWUgdG8gcGxheWVyIG5hbWVcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJuYW1lLXRleHRcIikudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci10ZXh0XCIpLnRleHRDb250ZW50ID0gYCR7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJbMF0udG9VcHBlckNhc2UoKSArIGNoYXJhY3Rlci5zbGljZSgxKVxyXG4gICAgICAgIH1gO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgXCJjaGFyYWN0ZXItaW1hZ2VcIlxyXG4gICAgICAgICkuc3JjID0gYC9hc3NldHMvJHtjaGFyYWN0ZXJ9L2JvZHkucG5nYDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBSdW5zIGFmdGVyIDEgc2Vjb25kIG9mIGRlYXRoXHJcbiAgICAgICAgICAvLyBEaXNhYmxlcyBtb3ZlbWVudFxyXG4gICAgICAgICAgdGhpcy5pbnB1dC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmstb3ZlcmxheVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW92ZXJsYXlcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgICAgICAgXCJyZ2JhKDAsIDAsIDAsIDAuMzYzKVwiO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSBmdW5jdGlvbiBpcyBhIGJ1aWx0IGluIGZ1bmN0aW9uIHRoYXQgcnVucyBhcyBtdWNoIGFzIHBvc3NpYmxlLiBJdCBpcyBjb250cm9sbGVkIGJ5IHRoZSBwaGFzZXIgc2NlbmVcclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoZ2FtZUVuZGVkKSByZXR1cm47IC8vIGhhbHQgbG9vcCB3b3JrIGFmdGVyIGdhbWUgb3ZlclxyXG4gICAgY2RiZygpO1xyXG4gICAgaWYgKCFkZWFkKSB7XHJcbiAgICAgIGhhbmRsZVBsYXllck1vdmVtZW50KHRoaXMpOyAvLyBIYW5kbGVzIG1vdmVtZW50XHJcblxyXG4gICAgICAvLyBUaHJvdHRsZSBtb3ZlbWVudCB1cGRhdGVzIHRvIHJlZHVjZSBuZXR3b3JrIHRyYWZmaWMgYW5kIGltcHJvdmUgc21vb3RobmVzc1xyXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XHJcbiAgICAgICAgeDogTWF0aC5yb3VuZChwbGF5ZXIueCksXHJcbiAgICAgICAgeTogTWF0aC5yb3VuZChwbGF5ZXIueSksXHJcbiAgICAgICAgZmxpcDogcGxheWVyLmZsaXBYLFxyXG4gICAgICAgIGFuaW1hdGlvbjogcGxheWVyLmFuaW1zLmN1cnJlbnRBbmltPy5rZXkgfHwgXCJpZGxlXCIsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBPbmx5IHNlbmQgbW92ZW1lbnQgdXBkYXRlIGlmIGVub3VnaCB0aW1lIGhhcyBwYXNzZWQgQU5EIHNvbWV0aGluZyBtZWFuaW5nZnVsIGNoYW5nZWRcclxuICAgICAgY29uc3QgcG9zaXRpb25DaGFuZ2VkID1cclxuICAgICAgICBNYXRoLmFicyhjdXJyZW50U3RhdGUueCAtIGxhc3RQbGF5ZXJTdGF0ZS54KSA+IDEgfHxcclxuICAgICAgICBNYXRoLmFicyhjdXJyZW50U3RhdGUueSAtIGxhc3RQbGF5ZXJTdGF0ZS55KSA+IDE7XHJcbiAgICAgIGNvbnN0IHN0YXRlQ2hhbmdlZCA9XHJcbiAgICAgICAgcG9zaXRpb25DaGFuZ2VkIHx8XHJcbiAgICAgICAgY3VycmVudFN0YXRlLmZsaXAgIT09IGxhc3RQbGF5ZXJTdGF0ZS5mbGlwIHx8XHJcbiAgICAgICAgY3VycmVudFN0YXRlLmFuaW1hdGlvbiAhPT0gbGFzdFBsYXllclN0YXRlLmFuaW1hdGlvbjtcclxuXHJcbiAgICAgIGlmIChzdGF0ZUNoYW5nZWQgJiYgbm93IC0gbGFzdE1vdmVtZW50U2VudCA+PSBtb3ZlbWVudFRocm90dGxlTXMpIHtcclxuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdmVcIiwge1xyXG4gICAgICAgICAgeDogY3VycmVudFN0YXRlLngsXHJcbiAgICAgICAgICB5OiBjdXJyZW50U3RhdGUueSxcclxuICAgICAgICAgIGZsaXA6IGN1cnJlbnRTdGF0ZS5mbGlwLFxyXG4gICAgICAgICAgYW5pbWF0aW9uOiBjdXJyZW50U3RhdGUuYW5pbWF0aW9uLFxyXG4gICAgICAgICAgdXNlcm5hbWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxhc3RNb3ZlbWVudFNlbnQgPSBub3c7XHJcbiAgICAgICAgbGFzdFBsYXllclN0YXRlID0geyAuLi5jdXJyZW50U3RhdGUgfTtcclxuICAgICAgICBjZGJnKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbnRlcnBvbGF0ZSByZW1vdGUgZW50aXRpZXMgfjEwMG1zIGluIHRoZSBwYXN0IGZvciBzbW9vdGhuZXNzXHJcbiAgICBpZiAoc3RhdGVBY3RpdmUgJiYgc3RhdGVCdWZmZXIubGVuZ3RoID49IDEpIHtcclxuICAgICAgY29uc3QgbmV3ZXN0ID0gc3RhdGVCdWZmZXJbc3RhdGVCdWZmZXIubGVuZ3RoIC0gMV07XHJcbiAgICAgIGNvbnN0IHRhcmdldFQgPSBuZXdlc3QudCAtIGludGVycERlbGF5TXM7XHJcblxyXG4gICAgICAvLyBGaW5kIHR3byBzbmFwc2hvdHMgc3Vycm91bmRpbmcgdGFyZ2V0VFxyXG4gICAgICBsZXQgb2xkZXIgPSBudWxsO1xyXG4gICAgICBsZXQgbmV3ZXIgPSBudWxsO1xyXG4gICAgICBmb3IgKGxldCBpID0gc3RhdGVCdWZmZXIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBjb25zdCBzID0gc3RhdGVCdWZmZXJbaV07XHJcbiAgICAgICAgaWYgKHMudCA8PSB0YXJnZXRUKSB7XHJcbiAgICAgICAgICBvbGRlciA9IHM7XHJcbiAgICAgICAgICBuZXdlciA9IHN0YXRlQnVmZmVyW2kgKyAxXSB8fCBzO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghb2xkZXIpIHtcclxuICAgICAgICBvbGRlciA9IHN0YXRlQnVmZmVyWzBdO1xyXG4gICAgICAgIG5ld2VyID0gc3RhdGVCdWZmZXJbMV0gfHwgb2xkZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHQwID0gb2xkZXIudDtcclxuICAgICAgY29uc3QgdDEgPSBNYXRoLm1heChuZXdlci50LCB0MCArIDEpO1xyXG4gICAgICBjb25zdCBhbHBoYSA9IFBoYXNlci5NYXRoLkNsYW1wKCh0YXJnZXRUIC0gdDApIC8gKHQxIC0gdDApLCAwLCAxKTtcclxuICAgICAgY29uc3QgbGVycCA9IChhLCBiLCB0KSA9PiBhICsgKGIgLSBhKSAqIHQ7XHJcblxyXG4gICAgICBjb25zdCBhcHBseUludGVycCA9ICh3cmFwcGVyLCBuYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc3ByID0gd3JhcHBlci5vcHBvbmVudDtcclxuICAgICAgICAvLyBjYW5jZWwgYW55IGxlZ2FjeSB0d2VlbiB0byBhdm9pZCBmaWdodGluZyBpbnRlcnBvbGF0aW9uXHJcbiAgICAgICAgaWYgKHdyYXBwZXIubW92ZW1lbnRUd2Vlbikge1xyXG4gICAgICAgICAgd3JhcHBlci5tb3ZlbWVudFR3ZWVuLnJlbW92ZSgpO1xyXG4gICAgICAgICAgd3JhcHBlci5tb3ZlbWVudFR3ZWVuID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgczAgPSBvbGRlci5wbGF5ZXJzW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IHMxID0gbmV3ZXIucGxheWVyc1tuYW1lXSB8fCBzMDtcclxuICAgICAgICBpZiAoIXMwICYmICFzMSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGFTdGF0ZSA9IHMwIHx8IHMxO1xyXG4gICAgICAgIGNvbnN0IGJTdGF0ZSA9IHMxIHx8IHMwO1xyXG4gICAgICAgIGlmICghYVN0YXRlKSByZXR1cm47XHJcbiAgICAgICAgLy8gSWdub3JlIG9idmlvdXNseSBib2d1cyBzdGF0ZXNcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGFTdGF0ZS54KSB8fCBOdW1iZXIuaXNOYU4oYVN0YXRlLnkpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGl4ID0gbGVycChhU3RhdGUueCwgYlN0YXRlPy54ID8/IGFTdGF0ZS54LCBhbHBoYSk7XHJcbiAgICAgICAgY29uc3QgaXkgPSBsZXJwKGFTdGF0ZS55LCBiU3RhdGU/LnkgPz8gYVN0YXRlLnksIGFscGhhKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaHVnZSB0ZWxlcG9ydCBiZXR3ZWVuIGZyYW1lcywgc25hcCB0byBkZXN0aW5hdGlvblxyXG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLmh5cG90KFxyXG4gICAgICAgICAgKGJTdGF0ZT8ueCA/PyBhU3RhdGUueCkgLSBhU3RhdGUueCxcclxuICAgICAgICAgIChiU3RhdGU/LnkgPz8gYVN0YXRlLnkpIC0gYVN0YXRlLnlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChkaXN0ID4gMjYwKSB7XHJcbiAgICAgICAgICBzcHIueCA9IGJTdGF0ZT8ueCA/PyBhU3RhdGUueDtcclxuICAgICAgICAgIHNwci55ID0gYlN0YXRlPy55ID8/IGFTdGF0ZS55O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzcHIueCA9IGl4O1xyXG4gICAgICAgICAgc3ByLnkgPSBpeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9yaWVudGF0aW9uL2FuaW1hdGlvbjogdGFrZSBmcm9tIG5ld2VyIGlmIHByZXNlbnRcclxuICAgICAgICBjb25zdCBhbmltU3JjID0gYlN0YXRlICYmIGJTdGF0ZS5hbmltYXRpb24gPyBiU3RhdGUgOiBhU3RhdGU7XHJcbiAgICAgICAgY29uc3QgcHJldkZsaXAgPSBzcHIuZmxpcFg7XHJcbiAgICAgICAgc3ByLmZsaXBYID0gISFhbmltU3JjLmZsaXA7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgc3ByLmZsaXBYICE9PSBwcmV2RmxpcCAmJlxyXG4gICAgICAgICAgdHlwZW9mIHdyYXBwZXIuYXBwbHlGbGlwT2Zmc2V0ID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHdyYXBwZXIuYXBwbHlGbGlwT2Zmc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmltU3JjLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgc3ByLmFuaW1zLnBsYXkoXHJcbiAgICAgICAgICAgIHJlc29sdmVBbmltS2V5KHRoaXMsIHdyYXBwZXIuY2hhcmFjdGVyLCBhbmltU3JjLmFuaW1hdGlvbiwgXCJpZGxlXCIpLFxyXG4gICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTmFtZSB0YWdcclxuICAgICAgICBjb25zdCBib2R5VG9wID0gc3ByLmJvZHkgPyBzcHIuYm9keS55IDogc3ByLnkgLSBzcHIuaGVpZ2h0IC8gMjtcclxuICAgICAgICB3cmFwcGVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihzcHIueCwgYm9keVRvcCAtIDM2KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBvcHBvbmVudFBsYXllcnMpXHJcbiAgICAgICAgYXBwbHlJbnRlcnAob3Bwb25lbnRQbGF5ZXJzW25hbWVdLCBuYW1lKTtcclxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRlYW1QbGF5ZXJzKSBhcHBseUludGVycCh0ZWFtUGxheWVyc1tuYW1lXSwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICAvLyBVcGRhdGVzIGhlYWx0aCBiYXJzXHJcbiAgICBmb3IgKGNvbnN0IHBsYXllciBpbiBvcHBvbmVudFBsYXllcnMpIHtcclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSBvcHBvbmVudFBsYXllcnNbcGxheWVyXTtcclxuICAgICAgb3Bwb25lbnRQbGF5ZXIudXBkYXRlSGVhbHRoQmFyKCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IHBsYXllciBpbiB0ZWFtUGxheWVycykge1xyXG4gICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IHRlYW1QbGF5ZXJzW3BsYXllcl07XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLnVwZGF0ZUhlYWx0aEJhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIHJlbW90ZSBwcm9qZWN0aWxlIGludGVycG9sYXRpb24gcmVxdWlyZWRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICB0eXBlOiBQaGFzZXIuQVVUTyxcclxuICAvLyBQaXhlbC1hcnQgZnJpZW5kbHkgc2V0dGluZ3NcclxuICBwaXhlbEFydDogdHJ1ZSxcclxuICByb3VuZFBpeGVsczogdHJ1ZSxcclxuICBhbnRpYWxpYXM6IGZhbHNlLFxyXG4gIHJlc29sdXRpb246IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxyXG4gIHNjYWxlOiB7XHJcbiAgICAvLyBNYWtlcyBzdXJlIHRoZSBnYW1lIGxvb2tzIGdvb2Qgb24gYWxsIHNjcmVlbnNcclxuICAgIG1vZGU6IFBoYXNlci5TY2FsZS5GSVQsXHJcbiAgICBhdXRvQ2VudGVyOiBQaGFzZXIuU2NhbGUuQ0VOVEVSX0JPVEgsXHJcbiAgICB3aWR0aDogMTMwMCxcclxuICAgIGhlaWdodDogNjAwLFxyXG4gIH0sXHJcbiAgc2NlbmU6IEdhbWVTY2VuZSxcclxuICBwaHlzaWNzOiB7XHJcbiAgICBkZWZhdWx0OiBcImFyY2FkZVwiLFxyXG4gICAgYXJjYWRlOiB7XHJcbiAgICAgIGdyYXZpdHk6IHsgeTogNzUwIH0sXHJcbiAgICAgIGRlYnVnOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShjb25maWcpO1xyXG5cclxuZXhwb3J0IHsgb3Bwb25lbnRQbGF5ZXJzLCB0ZWFtUGxheWVycyB9O1xyXG4iXSwibmFtZXMiOlsiYW5pbWF0aW9ucyIsInNjZW5lIiwiTkFNRSIsInRleCIsInRleHR1cmVzIiwiZ2V0IiwiYWxsTmFtZXMiLCJnZXRGcmFtZU5hbWVzIiwibG93ZXIiLCJNYXAiLCJtYXAiLCJuIiwidG9Mb3dlckNhc2UiLCJmaW5kRnJhbWVzIiwiY2FuZGlkYXRlcyIsIm1hdGNoZWQiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJuYW1lIiwidmFsdWUiLCJsbiIsInNvbWUiLCJwIiwic3RhcnRzV2l0aCIsInB1c2giLCJzIiwiZG9uZSIsImVyciIsImUiLCJmIiwic29ydCIsImEiLCJiIiwicmEiLCJleGVjIiwicmIiLCJwYXJzZUludCIsImxvY2FsZUNvbXBhcmUiLCJtYWtlIiwia2V5IiwicHJlZml4ZXMiLCJmcmFtZVJhdGUiLCJyZXBlYXQiLCJhbmltcyIsImV4aXN0cyIsImZyYW1lcyIsImxlbmd0aCIsImNyZWF0ZSIsImZyYW1lIiwiY29uY2F0Iiwic29ja2V0IiwiY2hhcmFjdGVyU3RhdHMiLCJEcmF2ZW5FZmZlY3RzIiwiZHJhdmVuIiwiX3JlZiIsInBsYXllciIsInVzZXJuYW1lIiwiZ2FtZUlkIiwib3Bwb25lbnRQbGF5ZXJzUmVmIiwibWFwT2JqZWN0cyIsImFtbW9Ib29rcyIsIl9jbGFzc0NhbGxDaGVjayIsImFtbW8iLCJfY3JlYXRlQ2xhc3MiLCJhdHRhY2hJbnB1dCIsIl90aGlzIiwiaW5wdXQiLCJvbiIsImhhbmRsZVBvaW50ZXJEb3duIiwicGVyZm9ybURlZmF1bHRBdHRhY2siLCJwYXlsb2FkQnVpbGRlciIsIm9uQWZ0ZXJGaXJlIiwiX3RoaXMkYW1tbyIsImdldEFtbW9Db29sZG93bk1zIiwidHJ5Q29uc3VtZSIsInNldENhbkF0dGFjayIsInNldElzQXR0YWNraW5nIiwiZHJhd0FtbW9CYXIiLCJjb29sZG93biIsInRpbWUiLCJkZWxheWVkQ2FsbCIsInNldFRpbWVvdXQiLCJwYXlsb2FkIiwiZW1pdCIsIl90aGlzMiIsImRpcmVjdGlvbiIsImZsaXBYIiwicmFuZ2UiLCJkdXJhdGlvbiIsInN0YXRzIiwiY29uc3RydWN0b3IiLCJnZXRTdGF0cyIsImRhbWFnZSIsInBsYXkiLCJnIiwiYWRkIiwiZ3JhcGhpY3MiLCJzZXREZXB0aCIsInNldEJsZW5kTW9kZSIsIlBoYXNlciIsIkJsZW5kTW9kZXMiLCJBREQiLCJtYWluIiwib3V0bGluZSIsInRoaWNrbmVzcyIsIk1hdGgiLCJtYXgiLCJyb3VuZCIsInJ4IiwicnkiLCJyeElubmVyIiwicnlJbm5lciIsImN4IiwieCIsImN5IiwieSIsImhlaWdodCIsImVwdCIsInRoZXRhIiwicngwIiwicnkwIiwiY29zIiwic2luIiwic3RhcnRSYWQiLCJEZWdUb1JhZCIsImVuZFJhZCIsInByb3h5IiwidCIsInN0ZXBzIiwidHdlZW5zIiwidGFyZ2V0cyIsImVhc2UiLCJvblVwZGF0ZSIsIm5vdyIsIkxpbmVhciIsInQwIiwiY2xlYXIiLCJmaWxsU3R5bGUiLCJiZWdpblBhdGgiLCJpIiwicG50IiwibW92ZVRvIiwibGluZVRvIiwiY2xvc2VQYXRoIiwiZmlsbFBhdGgiLCJsaW5lU3R5bGUiLCJmbG9vciIsInN0cm9rZVBhdGgiLCJvbkNvbXBsZXRlIiwiZGVzdHJveSIsImFscmVhZHkiLCJTZXQiLCJlbmVtaWVzIiwiT2JqZWN0IiwidmFsdWVzIiwidGlwIiwiX2kzIiwiX2VuZW1pZXMiLCJ3cmFwIiwic3ByIiwib3Bwb25lbnQiLCJoYXMiLCJkaXN0IiwiRGlzdGFuY2UiLCJCZXR3ZWVuIiwiZHgiLCJzaWduIiwiYXR0YWNrZXIiLCJ0YXJnZXQiLCJ0eXBlIiwiZ2V0VGV4dHVyZUtleSIsInRleHR1cmVLZXkiLCJwcmVsb2FkIiwic3RhdGljUGF0aCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImxvYWQiLCJhdGxhcyIsIkxvYWRlciIsIkV2ZW50cyIsIkNPTVBMRVRFIiwic291cmNlIiwiZ2xUZXh0dXJlIiwic2V0RmlsdGVyIiwiVGV4dHVyZXMiLCJGaWx0ZXJNb2RlIiwiTkVBUkVTVCIsImdhbWUiLCJjb25maWciLCJwaXhlbEFydCIsImFudGlhbGlhcyIsInNldHVwQW5pbWF0aW9ucyIsImhhbmRsZVJlbW90ZUF0dGFjayIsImRhdGEiLCJvd25lcldyYXBwZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJzcHJpdGUiLCJfdGltZXIiLCJfaW50ZXJ2YWwiLCJfcG9vbCIsIl9wb29sTWF4IiwiX2FjcXVpcmUiLCJmaW5kIiwibyIsImFjdGl2ZSIsIl9yZWxlYXNlIiwiYWxwaGEiLCJzY2FsZSIsIm9sZCIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJfc3Bhd25GbGFtZSIsImJhc2VTaXplIiwiZmlsbENpcmNsZSIsIkRpc3BsYXkiLCJDb2xvciIsIkdldENvbG9yIiwiZHJpZnRYIiwiZHJpZnRZIiwic2NhbGVUYXJnZXQiLCJGbG9hdEJldHdlZW4iLCJ1cGRhdGUiLCJkZWx0YU1zIiwiaXNNb3ZpbmciLCJkZWFkIiwiYmFzZVgiLCJiYXNlWSIsImNvdW50IiwiZGVmYXVsdCIsIk5pbmphIiwiVGhvcmciLCJEcmF2ZW4iLCJyZWdpc3RyeSIsIm5pbmphIiwidGhvcmciLCJwcmVsb2FkQWxsIiwiX2kiLCJfT2JqZWN0JGtleXMiLCJrZXlzIiwiQ2xzIiwic2V0dXBGb3IiLCJjaGFyYWN0ZXIiLCJzZXR1cEFsbCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJjcmVhdGVGb3IiLCJkZXBzIiwicmVzb2x2ZUFuaW1LZXkiLCJnZW5lcmljS2V5IiwiZmFsbGJhY2siLCJjaGFyIiwiaW5jbHVkZXMiLCJzdWZmaXgiLCJzcGxpdCIsInNsaWNlIiwiam9pbiIsInJlbWFwcGVkIiwicHJlZmVycmVkIiwiZmJQcmVmZXJyZWQiLCJnZXRFZmZlY3RzQ2xhc3MiLCJFZmZlY3RzIiwiZ2V0RWZmZWN0cyIsImdlbmVyYXRlRnJhbWVOYW1lcyIsInByZWZpeCIsImVuZCIsInplcm9QYWQiLCJSZXR1cm5pbmdTaHVyaWtlbiIsIl9QaGFzZXIkUGh5c2ljcyRBcmNhZCIsIl9pbmhlcml0cyIsInN0YXJ0UG9zIiwib3duZXJTcHJpdGUiLCJfY2FsbFN1cGVyIiwiY2ZnIiwiYXNzaWduIiwiZm9yd2FyZERpc3RhbmNlIiwib3V0d2FyZER1cmF0aW9uIiwicmV0dXJuU3BlZWQiLCJyb3RhdGlvblNwZWVkIiwiaXNPd25lciIsIm1heExpZmV0aW1lIiwiaGl0Q29vbGRvd24iLCJwaGFzZSIsImVsYXBzZWQiLCJ0b3RhbEVsYXBzZWQiLCJob3ZlckR1cmF0aW9uIiwicmV0dXJuQWNjZWxlcmF0aW9uIiwiY3VycmVudFJldHVyblNwZWVkIiwiaGl0VGltZXN0YW1wcyIsInRyYWlsSW50ZXJ2YWwiLCJ0cmFpbEFjY3VtIiwidHJhaWxzIiwibWF4VHJhaWxzIiwiZXhpc3RpbmciLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwicGh5c2ljcyIsInNldFNjYWxlIiwiYm9keSIsImFsbG93R3Jhdml0eSIsInNldEFuZ3VsYXJWZWxvY2l0eSIsInN0YXJ0WCIsInN0YXJ0WSIsImVuZFgiLCJlbmRZIiwiZGlwRG93biIsImJ1bGdlVXAiLCJjdHJsMVgiLCJjdHJsMVkiLCJjdHJsMlgiLCJjdHJsMlkiLCJnbG93Q29sb3IiLCJnbG93IiwiZGVwdGgiLCJfZHJhd0dsb3ciLCJmcm9tIiwidG8iLCJ5b3lvIiwiZXZlbnRzIiwidXBkYXRlU2h1cmlrZW4iLCJjb2xvckludCIsImJhc2VSYWRpdXMiLCJpbm5lclJhZGl1cyIsIm1pZFJhZGl1cyIsIm91dGVyUmFkaXVzIiwiYyIsIkludGVnZXJUb0NvbG9yIiwiY29sb3IiLCJjdWJpYyIsInAwIiwicDEiLCJwMiIsInAzIiwiaXQiLCJ0cnlEYW1hZ2UiLCJ0YXJnZXRXcmFwcGVyIiwidGFyZ2V0VXNlcm5hbWUiLCJfdXNlcm5hbWUiLCJsYXN0Iiwic291bmQiLCJ2b2x1bWUiLCJyYXRlIiwiYXR0YWNoRW5lbXlPdmVybGFwIiwib2JqZWN0cyIsImZvckVhY2giLCJvYmoiLCJvdmVybGFwIiwiYXR0YWNoTWFwT3ZlcmxhcCIsInNwYXduVHJhaWwiLCJpbWFnZSIsInNoaWZ0IiwiZGVzdHJveVNodXJpa2VuIiwib2ZmIiwiXyIsImRlbHRhIiwicmF3VCIsIkNsYW1wIiwiUEkiLCJueCIsIm55Iiwic2V0UG9zaXRpb24iLCJkeSIsInNxcnQiLCJtaW4iLCJzcGQiLCJvblJldHVybiIsIlBoeXNpY3MiLCJBcmNhZGUiLCJJbWFnZSIsImZpcmVkIiwic2Z4Iiwic2V0Vm9sdW1lIiwic2V0UmF0ZSIsImFyY0hlaWdodCIsInJldHVybmluZyIsImVuZW15TGlzdCIsIl90aGlzMiRhbW1vIiwiZ3JhbnRDaGFyZ2UiLCJhdWRpbyIsInNodXJpa2VuIiwicHJvaiIsIndlYXBvbiIsInNldFZlbG9jaXR5IiwiX3NwYXduU2xhc2hFZmZlY3QiLCJhbHJlYWR5SGl0IiwiY2VudGVyT2Zmc2V0WSIsImN1ciIsInRpcFgiLCJ0aXBZIiwiaHlwb3QiLCJoYXNUZXgiLCJvcmlnaW5PZmZzZXRZIiwiZWZmIiwic2V0T3JpZ2luIiwic2V0RmxpcFgiLCJ0d2VlbiIsInRhbmdlbnQiLCJhdGFuMiIsInJvdGF0aW9uIiwibWFpbkNvbG9yIiwib3V0bGluZUNvbG9yIiwiZHVzdFBvb2wiLCJkdXN0UG9vbE1heCIsInNwYXduRHVzdCIsInRpbnQiLCJhbHBoYVN0YXJ0IiwicHVmZkNvbG9yIiwicmlzZSIsInByZXdhcm1EdXN0IiwiREVGQVVMVF9DSEFSQUNURVIiLCJMRVZFTF9DQVAiLCJiYXNlSGVhbHRoIiwiYXR0YWNrRGVzY3JpcHRpb24iLCJiYXNlRGFtYWdlIiwiYW1tb0Nvb2xkb3duTXMiLCJhbW1vUmVsb2FkTXMiLCJhbW1vQ2FwYWNpdHkiLCJzcGVjaWFsRGVzY3JpcHRpb24iLCJzcGVjaWFsQmFzZURhbWFnZSIsInNwZWNpYWxDaGFyZ2VIaXRzIiwic3ByaXRlU2NhbGUiLCJ3aWR0aFNocmluayIsImhlaWdodFNocmluayIsIm9mZnNldFhGcm9tSGFsZiIsIm9mZnNldFkiLCJkZXNjcmlwdGlvbiIsImZyZWUiLCJmbGlwT2Zmc2V0IiwidW5sb2NrUHJpY2UiLCJnZXRDaGFyYWN0ZXJTdGF0cyIsImdldEFsbENoYXJhY3RlcnMiLCJnZXRGcmVlQ2hhcmFjdGVycyIsImZpbHRlciIsImRlZmF1bHRDaGFyYWN0ZXJMaXN0IiwiZnJvbUVudHJpZXMiLCJnZXRIZWFsdGgiLCJsZXZlbCIsImdldERhbWFnZSIsImdldFNwZWNpYWxEYW1hZ2UiLCJ1cGdyYWRlUHJpY2UiLCJwb3ciLCJtb2R1bGUiLCJleHBvcnRzIiwiREVGQVVMVF9QQVRIIiwiREVGQVVMVF9TQU1FU0lURSIsInNldENvb2tpZSIsIl9yZWYkZGF5cyIsImRheXMiLCJfcmVmJHBhdGgiLCJwYXRoIiwiX3JlZiRzYW1lU2l0ZSIsInNhbWVTaXRlIiwic2VjdXJlIiwibWF4QWdlIiwiaXNIdHRwcyIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJ1c2VTZWN1cmUiLCJjb29raWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUNvb2tpZSIsImdldENvb2tpZSIsIm5lZWRsZSIsInJhdyIsInBhcnRzIiwicGFydCIsImRlY29kZVVSSUNvbXBvbmVudCIsImRlbGV0ZUNvb2tpZSIsIl9yZWYyIiwiX3JlZjIkcGF0aCIsIl9yZWYyJHNhbWVTaXRlIiwiZ2V0RGlzcGxheU5hbWUiLCJiYXNlIiwicGxhdGZvcm0iLCJsZWZ0UGxhdGZvcm0iLCJyaWdodFBsYXRmb3JtIiwibHVzaHlQZWFrc09iamVjdHMiLCJsdXNoeVBlYWtzIiwiY2FudmFzV2lkdGgiLCJ3aWR0aCIsImNhbnZhc0hlaWdodCIsImNlbnRlclgiLCJjYW1lcmFzIiwiYmFja2dyb3VuZCIsImRpc3BsYXlXaWR0aCIsInN5cyIsImNhbnZhcyIsImRpc3BsYXlIZWlnaHQiLCJzZXRJbW1vdmFibGUiLCJiYXNlTWlkZGxlIiwiYmFzZVRvcCIsImJhc2VMZWZ0IiwiYmFzZVJpZ2h0IiwidGlueVBsYXRmb3JtMSIsInRpbnlQbGF0Zm9ybTIiLCJ0aW55UGxhdGZvcm0zIiwidGlueVBsYXRmb3JtNCIsInRpbnlQbGF0Zm9ybTUiLCJ0aW55UGxhdGZvcm02IiwibWFuZ3JvdmVNZWFkb3dPYmplY3RzIiwibWFuZ3JvdmVNZWFkb3ciLCJjYWxjdWxhdGVTcGF3biIsImNhbGN1bGF0ZU1hbmdyb3ZlU3Bhd24iLCJPcFBsYXllciIsInRlYW0iLCJzcGF3blBsYXRmb3JtIiwic3Bhd24iLCJwbGF5ZXJzSW5UZWFtIiwib3BNYXhIZWFsdGgiLCJvcEN1cnJlbnRIZWFsdGgiLCJvcEhlYWx0aEJhcldpZHRoIiwibW92ZW1lbnRUd2VlbiIsImVmZmVjdHMiLCJjcmVhdGVPcFBsYXllciIsIl9icyR3aWR0aFNocmluayIsIl9icyRoZWlnaHRTaHJpbmsiLCJzZXRWaXNpYmxlIiwiYm9keUNvbmZpZyIsIm1heEhlYWx0aCIsIm9wRnJhbWUiLCJicyIsInNldFNpemUiLCJhcHBseUZsaXBPZmZzZXQiLCJFZmZlY3RzQ2xzIiwiX29uU2NlbmVVcGRhdGUiLCJib2R5VG9wIiwib3BQbGF5ZXJOYW1lIiwidGV4dCIsInNldFN0eWxlIiwiZm9udCIsImZpbGwiLCJvcEhlYWx0aFRleHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJzdHJva2UiLCJzdHJva2VUaGlja25lc3MiLCJvcEhlYWx0aEJhciIsInVwZGF0ZUhlYWx0aEJhciIsInVwZGF0ZVVJUG9zaXRpb24iLCJoZWFsdGgiLCJtb3ZpbmciLCJhYnMiLCJ2ZWxvY2l0eSIsImlzRGVhZCIsImxvb3AiLCJfYnMkb2Zmc2V0WEZyb21IYWxmIiwiX2JzJG9mZnNldFkiLCJleHRyYSIsInNldE9mZnNldCIsImhlYWx0aEJhclkiLCJoZWFsdGhQZXJjZW50YWdlIiwiZGlzcGxheWVkV2lkdGgiLCJoZWFsdGhCYXJYIiwiTnVtYmVyIiwiaXNOYU4iLCJzZXRUZXh0IiwiZmlsbFJlY3QiLCJzdHJva2VSb3VuZGVkUmVjdCIsImZpbGxSb3VuZGVkUmVjdCIsInJlbW92ZSIsInBkYmciLCJjcmVhdGVDaGFyYWN0ZXJGb3IiLCJjdXJzb3JzIiwiY2FuV2FsbEp1bXAiLCJpc0p1bXBpbmciLCJpc0F0dGFja2luZyIsImNhbkF0dGFjayIsInNmeFdhbGtDb29sZG93biIsIndhc09uR3JvdW5kIiwiY3VycmVudEhlYWx0aCIsImhlYWx0aEJhcldpZHRoIiwiaGVhbHRoQmFyIiwiaGVhbHRoVGV4dCIsImFtbW9CYXIiLCJhbW1vQmFyQmFjayIsImFtbW9CYXJXaWR0aCIsImFtbW9DaGFyZ2VzIiwibmV4dEZpcmVUaW1lIiwicmVsb2FkVGltZXJNcyIsInBsYXllck5hbWUiLCJpbmRpY2F0b3JUcmlhbmdsZSIsInBhdGhuYW1lIiwiQm9vbGVhbiIsInBvcCIsImN1cnJlbnRDaGFyYWN0ZXIiLCJkdXN0VGltZXIiLCJkdXN0SW50ZXJ2YWwiLCJhcHBseUZsaXBPZmZzZXRMb2NhbCIsImNoYXJFZmZlY3RzIiwiY3JlYXRlUGxheWVyIiwic2NlbmVQYXJhbSIsInNwYXduUGxhdGZvcm1QYXJhbSIsInNwYXduUGFyYW0iLCJwbGF5ZXJzSW5UZWFtUGFyYW0iLCJtYXBQYXJhbSIsIm9wcG9uZW50UGxheWVyc1BhcmFtIiwiX3N0YXRzJG1heEhlYWx0aCIsIl9zdGF0cyRhbW1vQ29vbGRvd25NcyIsIl9zdGF0cyRhbW1vUmVsb2FkTXMiLCJfc3RhdHMkYW1tb0NhcGFjaXR5Iiwia2V5Ym9hcmQiLCJjcmVhdGVDdXJzb3JLZXlzIiwiX2NmZyRvZmZzZXRYRnJvbUhhbGYiLCJfY2ZnJG9mZnNldFkiLCJ3b3JsZCIsImJvdW5kcyIsImJvdHRvbSIsInRyaWFuZ2xlIiwiR2VvbSIsIlRyaWFuZ2xlIiwiZmlsbFRyaWFuZ2xlU2hhcGUiLCJnZXRBbW1vQ2FwYWNpdHkiLCJnZXRBbW1vUmVsb2FkTXMiLCJnZXRDaGFyZ2VzIiwiZ2V0TmV4dEZpcmVUaW1lIiwiRGF0ZSIsInYiLCJjdHJsIiwic2V0Q3VycmVudEhlYWx0aCIsImZvcmNlZFgiLCJmb3JjZWRZIiwiZ2FwIiwic2VnbWVudFdpZHRoIiwic2VnWCIsInBlcmNlbnQiLCJlbXB0eUNvbG9yIiwicmVhZHlDb2xvciIsImNoYXJnaW5nQ29sb3IiLCJmaWxsQ29sb3IiLCJhdmFpbGFibGVTcGFjZSIsImxlZnRNb3N0IiwiZ2V0Qm91bmRzIiwibGVmdCIsInNwYXduWSIsImdldFRvcENlbnRlciIsInNwYXduWCIsInBvc2l0aW9uIiwiU3RyaW5nIiwiaGFuZGxlUGxheWVyTW92ZW1lbnQiLCJzcGVlZCIsImp1bXBTcGVlZCIsImxlZnRLZXkiLCJpc0Rvd24iLCJhZGRLZXkiLCJyaWdodEtleSIsInJpZ2h0IiwidXBLZXkiLCJ1cCIsInNldFZlbG9jaXR5WCIsIndhc0ZsaXAiLCJ0b3VjaGluZyIsImRvd24iLCJzdG9wTW92aW5nIiwianVtcCIsIndhbGxKdW1wIiwiaXNQbGF5aW5nIiwiZmFsbCIsImlkbGUiLCJ1aVRvcCIsIm9uR3JvdW5kIiwiYm9keUJvdHRvbSIsImR1c3RZIiwiZHVzdFgiLCJyYW5kb20iLCJzZXRWZWxvY2l0eVkiLCJ3YWxsSnVtcFR3ZWVuIiwicHJldiIsImVuYWJsZWQiLCJpbyIsIndpdGhDcmVkZW50aWFscyIsImF1dG9Db25uZWN0IiwiY2RiZyIsInBhcnR5SWQiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJ0eU1lbWJlcnMiLCJwYXJ0eU1lbWJlcnNOdW0iLCJvcHBvbmVudFBsYXllcnMiLCJ0ZWFtUGxheWVycyIsImdhbWVFbmRlZCIsImxhc3RNb3ZlbWVudFNlbnQiLCJtb3ZlbWVudFRocm90dGxlTXMiLCJsYXN0UGxheWVyU3RhdGUiLCJmbGlwIiwiYW5pbWF0aW9uIiwic3RhdGVBY3RpdmUiLCJzdGF0ZUJ1ZmZlciIsIk1BWF9TVEFURV9CVUZGRVIiLCJpbnRlcnBEZWxheU1zIiwiR2FtZVNjZW5lIiwiX1BoYXNlciRTY2VuZSIsInRpbGVtYXBUaWxlZEpTT04iLCJfdGhpcyRjYW1lcmFzIiwiX3RoaXMkaW5wdXQka2V5Ym9hcmQiLCJyb3VuZFBpeGVscyIsIl9iZ21TdGFydGVkIiwic3RhcnRCZ20iLCJiZ21NYWluIiwibG9ja2VkIiwib25jZSIsIl90aGlzJHBoeXNpY3MiLCJfdGhpcyRzeXMiLCJjdHJsS2V5IiwiZHJhd0RlYnVnIiwiZGVidWdHcmFwaGljIiwiYXJjYWRlIiwiZGVidWciLCJtYXBPYmplY3QiLCJjb2xsaWRlciIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJ0ZXh0Q29udGVudCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwidXNlclRlYW0iLCJ1c2VyUGxheWVyIiwib3BUZWFtIiwib3Bwb25lbnRQbGF5ZXIiLCJlcnJvciIsImNvbnNvbGUiLCJmaWdodCIsIm9wYWNpdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2WCIsInByZXZZIiwiZGVsdGFYIiwiZGVsdGFZIiwiZGlzdGFuY2UiLCJtYXhUd2VlbkRpc3RhbmNlIiwidHdlZW5EdXJhdGlvbiIsIl9kdXN0VGltZXIiLCJvd25lckNoYXJhY3RlciIsImhhbmRsZWQiLCJsb2ciLCJzdG9wIiwiaXNMb3NlciIsImxvc2VycyIsInZvbCIsImJnbVJlc3VsdCIsImdhbWVPdmVyIiwidG9VcHBlckNhc2UiLCJzcmMiLCJkaXNwbGF5IiwiYmFja2dyb3VuZENvbG9yIiwiX3BsYXllciRhbmltcyRjdXJyZW50IiwiY3VycmVudFN0YXRlIiwiY3VycmVudEFuaW0iLCJwb3NpdGlvbkNoYW5nZWQiLCJzdGF0ZUNoYW5nZWQiLCJfb2JqZWN0U3ByZWFkIiwibmV3ZXN0IiwidGFyZ2V0VCIsIm9sZGVyIiwibmV3ZXIiLCJ0MSIsImxlcnAiLCJhcHBseUludGVycCIsIndyYXBwZXIiLCJfYlN0YXRlJHgiLCJfYlN0YXRlJHkiLCJfYlN0YXRlJHgyIiwiX2JTdGF0ZSR5MiIsInMwIiwicGxheWVycyIsInMxIiwiYVN0YXRlIiwiYlN0YXRlIiwiaXgiLCJpeSIsIl9iU3RhdGUkeDMiLCJfYlN0YXRlJHkzIiwiYW5pbVNyYyIsInByZXZGbGlwIiwiU2NlbmUiLCJBVVRPIiwicmVzb2x1dGlvbiIsImRldmljZVBpeGVsUmF0aW8iLCJtb2RlIiwiU2NhbGUiLCJGSVQiLCJhdXRvQ2VudGVyIiwiQ0VOVEVSX0JPVEgiLCJncmF2aXR5IiwiR2FtZSJdLCJzb3VyY2VSb290IjoiIn0=