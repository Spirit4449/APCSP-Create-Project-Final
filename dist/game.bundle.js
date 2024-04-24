/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   opponentPlayers: () => (/* binding */ opponentPlayers),
/* harmony export */   socket: () => (/* binding */ socket),
/* harmony export */   teamPlayers: () => (/* binding */ teamPlayers)
/* harmony export */ });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _opPlayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opPlayer */ "./src/opPlayer.js");
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
// Credits
// Shuriken Image: https://zh-partners.com/apps-sticker-banner-poster-printing-usage-and-part-of-logo-4809514.html
// Fight Image: https://pngtree.com/freepng/boxing-gloves-vector-red-and-blue-boxing-gloves-that-are-fighting-isolate-on-white-background_5295441.html





// Connect to the Socket.io server
var socket = io("/");
var staticPath = "/assets";
var gameId = window.location.pathname.split("/").filter(Boolean).pop();
var partyId = sessionStorage.getItem("party");
var username = getCookie("name");
var character = sessionStorage.getItem("character");
var spawnPlatform = sessionStorage.getItem("spawnPlatform");
var spawn = sessionStorage.getItem("spawn");
var partyMembers = sessionStorage.getItem("partyMembers");
var partyMembersNum = Number(partyMembers);
var opponentPlayers = [];
var teamPlayers = [];
var GameScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);
  function GameScene() {
    _classCallCheck(this, GameScene);
    return _callSuper(this, GameScene, arguments);
  }
  _createClass(GameScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("background", "".concat(staticPath, "/background.png"));
      this.load.atlas("sprite", "".concat(staticPath, "/spritesheet.png"), "".concat(staticPath, "/animations.json"));
      this.load.atlas("sprite3", "".concat(staticPath, "/spritesheet.png"), "".concat(staticPath, "/animations2.json"));
      this.load.atlas("sprite2", "".concat(staticPath, "/Ninja_Spritesheet2.png"), "".concat(staticPath, "/animations4.json"));
      this.load.image("tiles-image", "".concat(staticPath, "/map.png"));
      this.load.tilemapTiledJSON("tiles", "".concat(staticPath, "/tilesheet.json"));
      this.load.image("box", "".concat(staticPath, "/boundingbox.png"));
      this.load.image("base", "".concat(staticPath, "/base.png"));
      this.load.image("platform", "".concat(staticPath, "/largePlatform.png"));
      this.load.image("side-platform", "".concat(staticPath, "/sidePlatform.png"));
      this.load.image("shuriken", "".concat(staticPath, "/shuriken.png"));
      this.load.audio("shurikenThrow", "".concat(staticPath, "/shurikenThrow.mp3"));
      this.load.audio("shurikenHit", "".concat(staticPath, "/hit.mp3"));
      this.load.audio("shurikenHitWood", "".concat(staticPath, "/woodhit.wav"));
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;
      (0,_map__WEBPACK_IMPORTED_MODULE_0__.createMap)(this);
      (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)(this, username, character, spawnPlatform, spawn, partyMembers);
      this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_1__.player, _map__WEBPACK_IMPORTED_MODULE_0__.base);
      this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_1__.player, _map__WEBPACK_IMPORTED_MODULE_0__.platform);
      this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_1__.player, _map__WEBPACK_IMPORTED_MODULE_0__.leftPlatform);
      this.physics.add.collider(_player__WEBPACK_IMPORTED_MODULE_1__.player, _map__WEBPACK_IMPORTED_MODULE_0__.rightPlatform);
      document.getElementById('fight').style.width = '60%';
      document.getElementById('your-team').textContent = "Your Team: ".concat(partyMembers, "/").concat(partyMembers, " players");
      document.getElementById('opposing-team').textContent = "Opposing Team: ".concat(partyMembers, "/").concat(partyMembers, " players");
      socket.emit("player-joined", {
        username: username,
        character: character
      });
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
        for (var key in data.userTeam) {
          if (key !== username) {
            var userPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this, data.userTeam[key]["character"], key, "user", data.userTeam[key]["spawnPlatform"], data.userTeam[key]["spawn"], partyMembers);
            teamPlayers[key] = userPlayer;
          }
        }
        for (var _key in data.opTeam) {
          if (_key !== username) {
            var opponentPlayer = new _opPlayer__WEBPACK_IMPORTED_MODULE_2__["default"](_this, data.opTeam[_key]["character"], _key, "op", data.opTeam[_key]["spawnPlatform"], data.opTeam[_key]["spawn"], partyMembers);
            opponentPlayers[_key] = opponentPlayer;
          }
        }
      })["catch"](function (error) {
        console.error("Error:", error);
      });
      setTimeout(function () {
        var fight = document.getElementById('fight');
        fight.style.opacity = '0';
        fight.addEventListener('transitionend', function (event) {
          fight.remove();
        });
      }, 1000);
      socket.on("player-joined", function (data) {
        // if (!opponentPlayers[data.username]) {
        //   const opponentPlayer = new OpPlayer(this, data.character, data.username);
        //   opponentPlayers[data.username] = opponentPlayer;
        // }
      });
      socket.on("move", function (data) {
        var opponentPlayer = opponentPlayers[data.username] || teamPlayers[data.username];
        if (opponentPlayer) {
          opponentPlayer.opponent.x = data.x;
          opponentPlayer.opponent.y = data.y;
          opponentPlayer.opponent.flipX = data.flip;
          opponentPlayer.opPlayerName.setPosition(opponentPlayer.opponent.x, opponentPlayer.opponent.y - opponentPlayer.opponent.height + 10);
          opponentPlayer.opponent.anims.play(data.animation, true);
        }
      });
      socket.on("attack", function (data) {
        var scene = _this;
        var projectile = _this.physics.add.image(data.x, data.y, data.weapon);
        projectile.setScale(data.scale);
        projectile.setVelocity(data.velocity, 0);
        projectile.setAngularVelocity(data.angularVelocity);
        projectile.body.allowGravity = false;
        if (data.name in teamPlayers) {
          console.log("Teammate threw it");
          for (var _player in opponentPlayers) {
            var opponentPlayer = opponentPlayers[_player];
            addOverlap(projectile, opponentPlayer);
          }
        } else if (data.name in opponentPlayers) {
          console.log("Opponent threw it");
          for (var _player2 in teamPlayers) {
            var teamPlayer = teamPlayers[_player2];
            addOverlap(projectile, teamPlayer);
          }
          addOverlap(projectile, _player__WEBPACK_IMPORTED_MODULE_1__.player, true);
        }
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_0__.base);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_0__.leftPlatform);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_0__.rightPlatform);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_0__.platform);
        function addOverlap(projectile, object) {
          var player = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          if (object.opponent) {
            scene.physics.add.overlap(projectile, object.opponent, function (projectile) {
              object.opCurrentHealth -= data.damage;
              object.updateHealthBar();
              projectile.destroy(); // Destroy projectile on collision
            });
          } else if (player === true) {
            scene.physics.add.overlap(projectile, object, function (projectile) {
              (0,_player__WEBPACK_IMPORTED_MODULE_1__.setCurrentHealth)(1000);
              projectile.destroy(); // Destroy projectile on collision
            });
          } else {
            scene.physics.add.overlap(projectile, object, function (projectile) {
              projectile.destroy(); // Destroy projectile on collision
            });
          }
        }
      });
      socket.on("death", function (data) {
        var opponentPlayer = opponentPlayers[data.username] || teamPlayers[data.username];
        if (opponentPlayer in opponentPlayers) {
          document.getElementById('your-team').textContent = "Your Team: ".concat(partyMembersNum - 1, "/").concat(partyMembers, " players");
        } else {
          document.getElementById('opposing-team').textContent = "Opposing Team: ".concat(partyMembersNum - 1, "/").concat(partyMembers, " players");
        }
        opponentPlayer.opponent.anims.play("dying", true);
        opponentPlayer.opponent.alpha = 0.5;
        opponentPlayer.opPlayerName.setPosition(data.x, opponentPlayer.opPlayerName.y + 30);
        opponentPlayer.updateHealthBar(true, data.y - (opponentPlayer.opponent.height / 2 - 24));
        if (opponentPlayers[data.username]) {
          delete opponentPlayers[data.username];
        } else if (teamPlayers[data.username]) {
          delete teamPlayers[data.username];
        }
      });
      socket.on("game-over", function (data) {
        if (gameId === data.gameId) {
          var gameOver = document.getElementById('game-over');
          if (data.losers.includes(username)) {
            gameOver.textContent = 'You Lose';
            gameOver.style.color = '#c81212';
          } else {
            gameOver.textContent = 'You Win';
            gameOver.style.color = '#18c321';
          }
          document.getElementById('username-text').textContent = username;
          document.getElementById('character-text').textContent = character;
          setTimeout(function () {
            _this.input.enabled = false;
            document.getElementById("container").style.display = "flex";
            document.getElementById("dark-overlay").style.display = "block";
            document.getElementById("dark-overlay").style.backgroundColor = "rgba(0, 0, 0, 0.363)";
          }, 1000);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      if (!_player__WEBPACK_IMPORTED_MODULE_1__.dead) {
        (0,_player__WEBPACK_IMPORTED_MODULE_1__.handlePlayerMovement)(this);
        socket.emit("move", {
          x: _player__WEBPACK_IMPORTED_MODULE_1__.player.x,
          y: _player__WEBPACK_IMPORTED_MODULE_1__.player.y,
          flip: _player__WEBPACK_IMPORTED_MODULE_1__.player.flipX,
          animation: _player__WEBPACK_IMPORTED_MODULE_1__.player.anims.currentAnim,
          username: username
        });
      }
      for (var _player3 in opponentPlayers) {
        var opponentPlayer = opponentPlayers[_player3];
        opponentPlayer.updateHealthBar();
      }
      for (var _player4 in teamPlayers) {
        var _opponentPlayer = teamPlayers[_player4];
        _opponentPlayer.updateHealthBar();
      }
    }
  }]);
  return GameScene;
}(Phaser.Scene);
var config = {
  type: Phaser.AUTO,
  scale: {
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
  },
  render: {
    antialias: true
  }
};
var game = new Phaser.Game(config);
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


/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base: () => (/* binding */ base),
/* harmony export */   createMap: () => (/* binding */ createMap),
/* harmony export */   leftPlatform: () => (/* binding */ leftPlatform),
/* harmony export */   platform: () => (/* binding */ platform),
/* harmony export */   rightPlatform: () => (/* binding */ rightPlatform)
/* harmony export */ });
// map.js

// Globals
var base;
var platform;
var leftPlatform;
var rightPlatform;
function createMap(scene) {
  // Background
  var canvasWidth = scene.game.config.width;
  var canvasHeight = scene.game.config.height;
  var centerX = scene.cameras.main.width / 2;
  console.log(centerX);
  var background = scene.add.sprite(0, 0, "background");
  background.displayWidth = scene.sys.canvas.width;
  background.displayHeight = scene.sys.canvas.height + 200;
  background.setOrigin(0, 0);

  // Base
  base = scene.physics.add.sprite(centerX, 550, "base");
  base.body.allowGravity = false;
  base.setImmovable(true);
  base.setScale(0.7);

  // Platform
  platform = scene.physics.add.sprite(centerX, 250, "platform");
  platform.setScale(0.7);
  platform.body.allowGravity = false;
  platform.setImmovable(true);

  // Left Platform
  leftPlatform = scene.physics.add.sprite(centerX - 500, 260, "side-platform");
  leftPlatform.setScale(0.7);
  leftPlatform.body.allowGravity = false;
  leftPlatform.setImmovable(true);

  // Right Platform
  rightPlatform = scene.physics.add.sprite(centerX + 500, 260, "side-platform");
  rightPlatform.setScale(0.7);
  rightPlatform.body.allowGravity = false;
  rightPlatform.setImmovable(true);
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
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// opplayer.js



var OpPlayer = /*#__PURE__*/function () {
  function OpPlayer(scene, character, username, team, spawnPlatform, spawn, playersInTeam) {
    _classCallCheck(this, OpPlayer);
    this.scene = scene;
    this.character = character;
    this.username = username;
    this.team = team;
    this.spawnPlatform = spawnPlatform;
    this.spawn = spawn;
    this.playersInTeam = playersInTeam;
    this.opMaxHealth = 8000;
    this.opCurrentHealth = 8000;
    this.opHealthBarWidth = 60;
    this.createOpPlayer();
  }
  _createClass(OpPlayer, [{
    key: "createOpPlayer",
    value: function createOpPlayer() {
      this.opponent = this.scene.physics.add.sprite(-100, -100, "sprite2");
      this.opponent.body.allowGravity = false;
      this.opponent.anims.play("idle", true);
      if (this.spawnPlatform === "top") {
        (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_map__WEBPACK_IMPORTED_MODULE_0__.platform, this.spawn, this.opponent);
      } else if (this.spawnPlatform === "bottom") {
        (0,_player__WEBPACK_IMPORTED_MODULE_1__.calculateSpawn)(_map__WEBPACK_IMPORTED_MODULE_0__.base, this.spawn, this.opponent);
      }
      this.opFrame = this.opponent.frame;
      this.opponent.body.setSize(this.opFrame.width - 35, this.opFrame.width - 10);
      this.opponent.body.setOffset(this.opponent.body.width / 2, 10);
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
      this.updateHealthBar();
    }
  }, {
    key: "updateHealthBar",
    value: function updateHealthBar() {
      var dead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var healthBarY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.opCurrentHealth < 0) {
        this.opCurrentHealth = 0;
      }
      var healthPercentage = this.opCurrentHealth / this.opMaxHealth;
      var displayedWidth = this.opHealthBarWidth * healthPercentage;
      this.opHealthBar.clear();
      var healthBarX = this.opponent.x - this.opHealthBarWidth / 2;
      if (dead === false) {
        healthBarY = this.opponent.y - (this.opponent.height / 2 + 4);
        this.opHealthText.setText("".concat(this.opCurrentHealth));
      } else {
        this.opHealthText.setText('');
      }
      this.opHealthBar.fillStyle(0x595959);
      this.opHealthBar.fillRect(healthBarX, healthBarY, this.opHealthBarWidth, 9);
      this.opHealthBar.lineStyle(2, 0x000000);
      this.opHealthBar.strokeRoundedRect(healthBarX, healthBarY, this.opHealthBarWidth, 9, 3);
      if (this.team === 'user') {
        this.opHealthBar.fillStyle(0x2E88CA);
      } else {
        this.opHealthBar.fillStyle(0xBB5C39);
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
/* harmony export */   calculateSpawn: () => (/* binding */ calculateSpawn),
/* harmony export */   createPlayer: () => (/* binding */ createPlayer),
/* harmony export */   currentHealth: () => (/* binding */ currentHealth),
/* harmony export */   dead: () => (/* binding */ dead),
/* harmony export */   frame: () => (/* binding */ frame),
/* harmony export */   handlePlayerMovement: () => (/* binding */ handlePlayerMovement),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   setCurrentHealth: () => (/* binding */ setCurrentHealth)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./src/map.js");
// player.js


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
var currentHealth = 8000;
var dead = false;
var healthBarWidth = 60;
var healthBar;
var healthText;
var playerName;
var indicatorTriangle;
var username;
var gameId = window.location.pathname.split("/").filter(Boolean).pop();
var scene;
var spawn;
var playersInTeam;
var spawnPlatform;
function createPlayer(sceneParam, name, character, spawnPlatformParam, spawnParam, playersInTeamParam) {
  username = name;
  scene = sceneParam;
  spawn = spawnParam;
  playersInTeam = playersInTeamParam;
  spawnPlatform = spawnPlatformParam;
  cursors = scene.input.keyboard.createCursorKeys();

  // Animations
  scene.anims.create({
    key: "running",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "running",
      end: 5,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  scene.anims.create({
    key: "idle",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "idle",
      end: 4,
      zeroPad: 2
    }),
    frameRate: 3,
    repeat: -1
  });
  scene.anims.create({
    key: "jumping",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "jumping",
      end: 7,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  scene.anims.create({
    key: "sliding",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "wall",
      end: 0,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 2
  });
  scene.anims.create({
    key: "falling",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "falling",
      end: 2,
      zeroPad: 2
    }),
    frameRate: 20,
    repeat: 0
  });
  scene.anims.create({
    key: "throw",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "throw",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 15,
    repeat: 0
  });
  scene.anims.create({
    key: "dying",
    frames: scene.anims.generateFrameNames("sprite2", {
      prefix: "dying",
      end: 3,
      zeroPad: 2
    }),
    frameRate: 10,
    repeat: 0
  });
  player = scene.physics.add.sprite(-100, -100, "sprite2");
  player.anims.play("idle", true);
  scene.events.on("update", function () {
    if (player.y > scene.physics.world.bounds.bottom) {
      setTimeout(function () {
        currentHealth = 0;
      }, 500);
    }
  });
  if (spawnPlatform === "top") {
    calculateSpawn(_map__WEBPACK_IMPORTED_MODULE_1__.platform, spawn, player);
  } else if (spawnPlatform === "bottom") {
    calculateSpawn(_map__WEBPACK_IMPORTED_MODULE_1__.base, spawn, player);
  }
  frame = player.frame;
  player.body.setSize(frame.width - 35, frame.width - 10);
  player.body.setOffset(player.body.width / 2, 10);
  playerName = scene.add.text(player.x, player.y - player.height + 10, username);
  playerName.setStyle({
    font: "bold 8pt Arial",
    fill: "#000000"
  });
  playerName.setOrigin(0.5, 0);
  healthText = scene.add.text(0, 0, "", {
    fontFamily: "Arial",
    fontSize: "10px",
    color: "#FFFFFF",
    stroke: "#000000",
    // Set the stroke color
    strokeThickness: 4
  });
  healthBar = scene.add.graphics();

  // Triangle to show which one is the user
  indicatorTriangle = scene.add.graphics();
  var triangle = new Phaser.Geom.Triangle(player.x, player.y - 62,
  // Top point
  player.x - 13, player.y - 72,
  // Left point
  player.x + 13, player.y - 72 // Right point
  );
  indicatorTriangle.fillStyle(0x99ab2c);
  indicatorTriangle.fillTriangleShape(triangle);
  scene.input.on("pointerdown", function (pointer) {
    if (canAttack) {
      isAttacking = true;
      canAttack = false;
      setTimeout(function () {
        isAttacking = false;
        canAttack = true;
      }, 300);

      // Play the sound
      var shurikenSound = scene.sound.add("shurikenThrow");
      shurikenSound.setVolume(0.1);
      shurikenSound.setRate(1.3); // Change pitch
      shurikenSound.play();
      if (character === "Ninja") {
        var addOverlap = function addOverlap(projectile, object) {
          if (object.opponent) {
            scene.physics.add.overlap(projectile, object.opponent, function (projectile) {
              object.opCurrentHealth -= damage;
              object.updateHealthBar();
              projectile.destroy(); // Destroy projectile on collision

              var hitSound = scene.sound.add("shurikenHit");
              hitSound.setVolume(0.008);
              hitSound.play();
            });
          } else {
            scene.physics.add.overlap(projectile, object, function (projectile) {
              projectile.destroy(); // Destroy projectile on collision
              var hitSound = scene.sound.add("shurikenHitWood");
              hitSound.setVolume(0.01);
              hitSound.play();
            });
          }
        };
        player.anims.play("throw", true);

        // Variables
        var weapon = "shuriken";
        var scale = 0.1;
        var velocity = 800;
        var angularVelocity = 2000;
        var damage = 1000;
        var projectile = scene.physics.add.image(player.x, player.y, weapon);
        projectile.setScale(scale);
        if (player.flipX === true) {
          velocity = -velocity;
        }
        projectile.setVelocity(velocity, 0); // Set projectile velocity if flipped
        projectile.body.allowGravity = false;
        projectile.setAngularVelocity(angularVelocity);
        for (var playerId in _game__WEBPACK_IMPORTED_MODULE_0__.opponentPlayers) {
          var opponentPlayer = _game__WEBPACK_IMPORTED_MODULE_0__.opponentPlayers[playerId];
          addOverlap(projectile, opponentPlayer);
        }
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_1__.base);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_1__.leftPlatform);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_1__.rightPlatform);
        addOverlap(projectile, _map__WEBPACK_IMPORTED_MODULE_1__.platform);
        _game__WEBPACK_IMPORTED_MODULE_0__.socket.emit("attack", {
          x: player.x,
          y: player.y,
          weapon: weapon,
          scale: scale,
          velocity: velocity,
          angularVelocity: angularVelocity,
          damage: damage,
          name: name
        });
      }
    }
  });
}
function setCurrentHealth(damage) {
  currentHealth -= damage;
  updateHealthBar();
}
function updateHealthBar() {
  if (currentHealth <= 0) {
    currentHealth = 0;
    if (!dead) {
      dead = true;
      player.anims.play("dying", true);
      scene.input.enabled = false;
      player.alpha = 0.5;
      document.getElementById("dark-overlay").style.display = "block";
      document.getElementById("dark-overlay").style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      document.getElementById("dead").style.display = "block";
      document.getElementById('your-team').textContent = "Your Team: ".concat(playersInTeam - 1, "/").concat(playersInTeam, " Players");
      _game__WEBPACK_IMPORTED_MODULE_0__.socket.emit("death", {
        username: username,
        gameId: gameId,
        x: player.x,
        y: player.y
      });
    }
  }
  var healthPercentage = currentHealth / maxHealth;
  var displayedWidth = healthBarWidth * healthPercentage;
  healthBar.clear(); // Clear the graphics before redrawing

  var healthBarX = player.x - healthBarWidth / 2;
  var healthBarY;
  if (!dead) {
    healthBarY = player.y - (player.height / 2 + 4);
    healthText.setText("".concat(currentHealth));
  } else {
    healthBarY = player.y - (player.height / 2 - 24);
    healthText.setText("");
    playerName.setPosition(player.x, playerName.y + 30);
  }

  // Draw the background rectangle with the default fill color
  healthBar.fillStyle(0x595959);
  healthBar.fillRect(healthBarX, healthBarY, healthBarWidth, 9);

  // Draw the health bar background (stroke)
  healthBar.lineStyle(2, 0x000000);
  healthBar.strokeRoundedRect(healthBarX, healthBarY, healthBarWidth, 9, 3);

  // Draw the filled part of the health bar (green)
  healthBar.fillStyle(0x99ab2c);
  healthBar.fillRoundedRect(healthBarX, healthBarY, displayedWidth, 9, 3);
  healthText.setPosition(player.x - healthText.width / 2, healthBarY - 8);
  healthText.setDepth(2);
}
function calculateSpawn(platform, spawn, player) {
  var availableSpace = platform.width / playersInTeam;
  console.log(availableSpace);
  var leftMost = platform.getBounds().left;
  console.log(leftMost);
  var spawnY = platform.getTopCenter().y - player.height / 2;
  var spawnX = leftMost + spawn * availableSpace / 2 - player.width * 1.333;
  console.log(spawnX);
  player.x = spawnX;
  player.y = spawnY;
}
function handlePlayerMovement(scene) {
  var speed = 250;
  var jumpSpeed = 400;

  // Keys
  var leftKey = cursors.left.isDown || scene.input.keyboard.addKey("A").isDown;
  var rightKey = cursors.right.isDown || scene.input.keyboard.addKey("D").isDown;
  var upKey = cursors.up.isDown || scene.input.keyboard.addKey("W").isDown;

  // Left and right movement
  if (leftKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear();
    }
    player.setVelocityX(-speed);
    player.flipX = true;
    isMoving = true;
    if (player.body.touching.down && !isAttacking && !dead) {
      player.anims.play("running", true);
    }
  } else if (rightKey) {
    if (indicatorTriangle) {
      indicatorTriangle.clear();
    }
    player.flipX = false;
    player.setVelocityX(speed);
    isMoving = true;
    if (player.body.touching.down && !isAttacking && !dead) {
      player.anims.play("running", true);
    }
  } else {
    stopMoving();
  }

  // Jumping
  if (upKey && player.body.touching.down && !dead) {
    if (indicatorTriangle) {
      indicatorTriangle.clear();
    }
    jump();
  } else if ((player.body.touching.left || player.body.touching.right && !dead) && canWallJump && upKey) {
    wallJump();
  }
  if ((player.body.touching.left || player.body.touching.right && !dead) && !isAttacking) {
    player.anims.play("sliding", true);
  }

  // Check if the jump animation has completed
  if (!player.anims.isPlaying && !player.body.touching.down && !player.body.touching.left && !player.body.touching.right) {
    fall();
  }

  // If no movement animations are playing, play the 'idle' animation
  if (!isMoving && player.body.touching.down && !isJumping && !isAttacking && !dead) {
    idle();
  }
  updateHealthBar();
  playerName.setPosition(player.x, player.y - player.height + 10);
  function stopMoving() {
    player.setVelocityX(0);
    isMoving = false;
  }
  function jump() {
    player.anims.play("jumping", true);
    player.setVelocityY(-jumpSpeed);
    isMoving = true;
    isJumping = true;
  }
  function wallJump() {
    canWallJump = false;
    player.anims.play("sliding", true);
    player.setVelocityY(-jumpSpeed);
    var wallJumpTween = scene.tweens.add({
      targets: player,
      x: player.x + (player.body.touching.left ? 50 : -50),
      duration: 200,
      ease: "Linear",
      onComplete: function onComplete() {
        canWallJump = true;
      }
    });
    wallJumpTween.play();
  }
  function fall() {
    player.anims.play("falling", true);
    isJumping = false;
  }
  function idle() {
    player.anims.play("idle", true);
  }
}


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNGOzs7Ozs7O1VDeGNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvbWFwLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvb3BQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDcmVkaXRzXHJcbi8vIFNodXJpa2VuIEltYWdlOiBodHRwczovL3poLXBhcnRuZXJzLmNvbS9hcHBzLXN0aWNrZXItYmFubmVyLXBvc3Rlci1wcmludGluZy11c2FnZS1hbmQtcGFydC1vZi1sb2dvLTQ4MDk1MTQuaHRtbFxyXG4vLyBGaWdodCBJbWFnZTogaHR0cHM6Ly9wbmd0cmVlLmNvbS9mcmVlcG5nL2JveGluZy1nbG92ZXMtdmVjdG9yLXJlZC1hbmQtYmx1ZS1ib3hpbmctZ2xvdmVzLXRoYXQtYXJlLWZpZ2h0aW5nLWlzb2xhdGUtb24td2hpdGUtYmFja2dyb3VuZF81Mjk1NDQxLmh0bWxcclxuXHJcbmltcG9ydCB7IGNyZWF0ZU1hcCwgYmFzZSwgcGxhdGZvcm0sIGxlZnRQbGF0Zm9ybSwgcmlnaHRQbGF0Zm9ybSB9IGZyb20gXCIuL21hcFwiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZVBsYXllcixcclxuICBwbGF5ZXIsXHJcbiAgaGFuZGxlUGxheWVyTW92ZW1lbnQsXHJcbiAgc2V0Q3VycmVudEhlYWx0aCxcclxuICBkZWFkLFxyXG59IGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgT3BQbGF5ZXIgZnJvbSBcIi4vb3BQbGF5ZXJcIjtcclxuXHJcbi8vIENvbm5lY3QgdG8gdGhlIFNvY2tldC5pbyBzZXJ2ZXJcclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5cclxuY29uc3Qgc3RhdGljUGF0aCA9IFwiL2Fzc2V0c1wiO1xyXG5jb25zdCBnYW1lSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKS5wb3AoKTtcclxuY29uc3QgcGFydHlJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJwYXJ0eVwiKTtcclxuY29uc3QgdXNlcm5hbWUgPSBnZXRDb29raWUoXCJuYW1lXCIpO1xyXG5jb25zdCBjaGFyYWN0ZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY2hhcmFjdGVyXCIpO1xyXG5jb25zdCBzcGF3blBsYXRmb3JtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNwYXduUGxhdGZvcm1cIik7XHJcbmNvbnN0IHNwYXduID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNwYXduXCIpO1xyXG5jb25zdCBwYXJ0eU1lbWJlcnMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicGFydHlNZW1iZXJzXCIpO1xyXG5jb25zdCBwYXJ0eU1lbWJlcnNOdW0gPSBOdW1iZXIocGFydHlNZW1iZXJzKVxyXG5cclxuY29uc3Qgb3Bwb25lbnRQbGF5ZXJzID0gW107XHJcbmNvbnN0IHRlYW1QbGF5ZXJzID0gW107XHJcblxyXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJiYWNrZ3JvdW5kXCIsIGAke3N0YXRpY1BhdGh9L2JhY2tncm91bmQucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuYXRsYXMoXHJcbiAgICAgIFwic3ByaXRlXCIsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L3Nwcml0ZXNoZWV0LnBuZ2AsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L2FuaW1hdGlvbnMuanNvbmBcclxuICAgICk7XHJcbiAgICB0aGlzLmxvYWQuYXRsYXMoXHJcbiAgICAgIFwic3ByaXRlM1wiLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9zcHJpdGVzaGVldC5wbmdgLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9hbmltYXRpb25zMi5qc29uYFxyXG4gICAgKTtcclxuICAgIHRoaXMubG9hZC5hdGxhcyhcclxuICAgICAgXCJzcHJpdGUyXCIsXHJcbiAgICAgIGAke3N0YXRpY1BhdGh9L05pbmphX1Nwcml0ZXNoZWV0Mi5wbmdgLFxyXG4gICAgICBgJHtzdGF0aWNQYXRofS9hbmltYXRpb25zNC5qc29uYFxyXG4gICAgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcInRpbGVzLWltYWdlXCIsIGAke3N0YXRpY1BhdGh9L21hcC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC50aWxlbWFwVGlsZWRKU09OKFwidGlsZXNcIiwgYCR7c3RhdGljUGF0aH0vdGlsZXNoZWV0Lmpzb25gKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImJveFwiLCBgJHtzdGF0aWNQYXRofS9ib3VuZGluZ2JveC5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcImJhc2VcIiwgYCR7c3RhdGljUGF0aH0vYmFzZS5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZShcInBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L2xhcmdlUGxhdGZvcm0ucG5nYCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJzaWRlLXBsYXRmb3JtXCIsIGAke3N0YXRpY1BhdGh9L3NpZGVQbGF0Zm9ybS5wbmdgKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJzaHVyaWtlblwiLCBgJHtzdGF0aWNQYXRofS9zaHVyaWtlbi5wbmdgKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbyhcInNodXJpa2VuVGhyb3dcIiwgYCR7c3RhdGljUGF0aH0vc2h1cmlrZW5UaHJvdy5tcDNgKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbyhcInNodXJpa2VuSGl0XCIsIGAke3N0YXRpY1BhdGh9L2hpdC5tcDNgKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbyhcInNodXJpa2VuSGl0V29vZFwiLCBgJHtzdGF0aWNQYXRofS93b29kaGl0LndhdmApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgY3JlYXRlTWFwKHRoaXMpO1xyXG4gICAgY3JlYXRlUGxheWVyKHRoaXMsIHVzZXJuYW1lLCBjaGFyYWN0ZXIsIHNwYXduUGxhdGZvcm0sIHNwYXduLCBwYXJ0eU1lbWJlcnMpO1xyXG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihwbGF5ZXIsIGJhc2UpO1xyXG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihwbGF5ZXIsIHBsYXRmb3JtKTtcclxuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIocGxheWVyLCBsZWZ0UGxhdGZvcm0pO1xyXG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihwbGF5ZXIsIHJpZ2h0UGxhdGZvcm0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWdodCcpLnN0eWxlLndpZHRoID0gJzYwJSdcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneW91ci10ZWFtJykudGV4dENvbnRlbnQgPSBgWW91ciBUZWFtOiAke3BhcnR5TWVtYmVyc30vJHtwYXJ0eU1lbWJlcnN9IHBsYXllcnNgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Bwb3NpbmctdGVhbScpLnRleHRDb250ZW50ID0gYE9wcG9zaW5nIFRlYW06ICR7cGFydHlNZW1iZXJzfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2BcclxuXHJcblxyXG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXItam9pbmVkXCIsIHsgdXNlcm5hbWUsIGNoYXJhY3RlciB9KTtcclxuICAgIGZldGNoKFwiL3BsYXllcnNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZ2FtZUlkLCB1c2VybmFtZSB9KSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEudXNlclRlYW0pIHtcclxuICAgICAgICAgIGlmIChrZXkgIT09IHVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJQbGF5ZXIgPSBuZXcgT3BQbGF5ZXIoXHJcbiAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICBkYXRhLnVzZXJUZWFtW2tleV1bXCJjaGFyYWN0ZXJcIl0sXHJcbiAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgIFwidXNlclwiLFxyXG4gICAgICAgICAgICAgIGRhdGEudXNlclRlYW1ba2V5XVtcInNwYXduUGxhdGZvcm1cIl0sXHJcbiAgICAgICAgICAgICAgZGF0YS51c2VyVGVhbVtrZXldW1wic3Bhd25cIl0sXHJcbiAgICAgICAgICAgICAgcGFydHlNZW1iZXJzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRlYW1QbGF5ZXJzW2tleV0gPSB1c2VyUGxheWVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhLm9wVGVhbSkge1xyXG4gICAgICAgICAgaWYgKGtleSAhPT0gdXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSBuZXcgT3BQbGF5ZXIoXHJcbiAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICBkYXRhLm9wVGVhbVtrZXldW1wiY2hhcmFjdGVyXCJdLFxyXG4gICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICBcIm9wXCIsXHJcbiAgICAgICAgICAgICAgZGF0YS5vcFRlYW1ba2V5XVtcInNwYXduUGxhdGZvcm1cIl0sXHJcbiAgICAgICAgICAgICAgZGF0YS5vcFRlYW1ba2V5XVtcInNwYXduXCJdLFxyXG4gICAgICAgICAgICAgIHBhcnR5TWVtYmVyc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBvcHBvbmVudFBsYXllcnNba2V5XSA9IG9wcG9uZW50UGxheWVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlnaHQnKVxyXG4gICAgICBmaWdodC5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgICAgIGZpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBmaWdodC5yZW1vdmUoKVxyXG4gICAgICB9KTtcclxuICAgIH0sIDEwMDApXHJcblxyXG4gICAgc29ja2V0Lm9uKFwicGxheWVyLWpvaW5lZFwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAvLyBpZiAoIW9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSkge1xyXG4gICAgICAvLyAgIGNvbnN0IG9wcG9uZW50UGxheWVyID0gbmV3IE9wUGxheWVyKHRoaXMsIGRhdGEuY2hhcmFjdGVyLCBkYXRhLnVzZXJuYW1lKTtcclxuICAgICAgLy8gICBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0gPSBvcHBvbmVudFBsYXllcjtcclxuICAgICAgLy8gfVxyXG4gICAgfSk7XHJcbiAgICBzb2NrZXQub24oXCJtb3ZlXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wcG9uZW50UGxheWVyID1cclxuICAgICAgICBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV0gfHwgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIGlmIChvcHBvbmVudFBsYXllcikge1xyXG4gICAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LnggPSBkYXRhLng7XHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueSA9IGRhdGEueTtcclxuICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC5mbGlwWCA9IGRhdGEuZmxpcDtcclxuICAgICAgICBvcHBvbmVudFBsYXllci5vcFBsYXllck5hbWUuc2V0UG9zaXRpb24oXHJcbiAgICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC54LFxyXG4gICAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQueSAtIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmhlaWdodCArIDEwXHJcbiAgICAgICAgKTtcclxuICAgICAgICBvcHBvbmVudFBsYXllci5vcHBvbmVudC5hbmltcy5wbGF5KGRhdGEuYW5pbWF0aW9uLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzb2NrZXQub24oXCJhdHRhY2tcIiwgKGRhdGEpID0+IHtcclxuICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzO1xyXG4gICAgICBjb25zdCBwcm9qZWN0aWxlID0gdGhpcy5waHlzaWNzLmFkZC5pbWFnZShkYXRhLngsIGRhdGEueSwgZGF0YS53ZWFwb24pO1xyXG4gICAgICBwcm9qZWN0aWxlLnNldFNjYWxlKGRhdGEuc2NhbGUpO1xyXG4gICAgICBwcm9qZWN0aWxlLnNldFZlbG9jaXR5KGRhdGEudmVsb2NpdHksIDApO1xyXG4gICAgICBwcm9qZWN0aWxlLnNldEFuZ3VsYXJWZWxvY2l0eShkYXRhLmFuZ3VsYXJWZWxvY2l0eSk7XHJcbiAgICAgIHByb2plY3RpbGUuYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChkYXRhLm5hbWUgaW4gdGVhbVBsYXllcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRlYW1tYXRlIHRocmV3IGl0XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgcGxheWVyIGluIG9wcG9uZW50UGxheWVycykge1xyXG4gICAgICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSBvcHBvbmVudFBsYXllcnNbcGxheWVyXTtcclxuICAgICAgICAgIGFkZE92ZXJsYXAocHJvamVjdGlsZSwgb3Bwb25lbnRQbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLm5hbWUgaW4gb3Bwb25lbnRQbGF5ZXJzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPcHBvbmVudCB0aHJldyBpdFwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHBsYXllciBpbiB0ZWFtUGxheWVycykge1xyXG4gICAgICAgICAgY29uc3QgdGVhbVBsYXllciA9IHRlYW1QbGF5ZXJzW3BsYXllcl07XHJcbiAgICAgICAgICBhZGRPdmVybGFwKHByb2plY3RpbGUsIHRlYW1QbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRPdmVybGFwKHByb2plY3RpbGUsIHBsYXllciwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFkZE92ZXJsYXAocHJvamVjdGlsZSwgYmFzZSk7XHJcbiAgICAgIGFkZE92ZXJsYXAocHJvamVjdGlsZSwgbGVmdFBsYXRmb3JtKTtcclxuICAgICAgYWRkT3ZlcmxhcChwcm9qZWN0aWxlLCByaWdodFBsYXRmb3JtKTtcclxuICAgICAgYWRkT3ZlcmxhcChwcm9qZWN0aWxlLCBwbGF0Zm9ybSk7XHJcbiAgICAgIGZ1bmN0aW9uIGFkZE92ZXJsYXAocHJvamVjdGlsZSwgb2JqZWN0LCBwbGF5ZXIgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChvYmplY3Qub3Bwb25lbnQpIHtcclxuICAgICAgICAgIHNjZW5lLnBoeXNpY3MuYWRkLm92ZXJsYXAoXHJcbiAgICAgICAgICAgIHByb2plY3RpbGUsXHJcbiAgICAgICAgICAgIG9iamVjdC5vcHBvbmVudCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHByb2plY3RpbGUpIHtcclxuICAgICAgICAgICAgICBvYmplY3Qub3BDdXJyZW50SGVhbHRoIC09IGRhdGEuZGFtYWdlO1xyXG4gICAgICAgICAgICAgIG9iamVjdC51cGRhdGVIZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgICBwcm9qZWN0aWxlLmRlc3Ryb3koKTsgLy8gRGVzdHJveSBwcm9qZWN0aWxlIG9uIGNvbGxpc2lvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBzY2VuZS5waHlzaWNzLmFkZC5vdmVybGFwKHByb2plY3RpbGUsIG9iamVjdCwgZnVuY3Rpb24gKHByb2plY3RpbGUpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudEhlYWx0aCgxMDAwKTtcclxuICAgICAgICAgICAgcHJvamVjdGlsZS5kZXN0cm95KCk7IC8vIERlc3Ryb3kgcHJvamVjdGlsZSBvbiBjb2xsaXNpb25cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzY2VuZS5waHlzaWNzLmFkZC5vdmVybGFwKHByb2plY3RpbGUsIG9iamVjdCwgZnVuY3Rpb24gKHByb2plY3RpbGUpIHtcclxuICAgICAgICAgICAgcHJvamVjdGlsZS5kZXN0cm95KCk7IC8vIERlc3Ryb3kgcHJvamVjdGlsZSBvbiBjb2xsaXNpb25cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKFwiZGVhdGhcIiwgKGRhdGEpID0+IHtcclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPVxyXG4gICAgICAgIG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSB8fCB0ZWFtUGxheWVyc1tkYXRhLnVzZXJuYW1lXTtcclxuXHJcbiAgICAgIGlmIChvcHBvbmVudFBsYXllciBpbiBvcHBvbmVudFBsYXllcnMpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneW91ci10ZWFtJykudGV4dENvbnRlbnQgPSBgWW91ciBUZWFtOiAke3BhcnR5TWVtYmVyc051bSAtIDF9LyR7cGFydHlNZW1iZXJzfSBwbGF5ZXJzYFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHBvc2luZy10ZWFtJykudGV4dENvbnRlbnQgPSBgT3Bwb3NpbmcgVGVhbTogJHtwYXJ0eU1lbWJlcnNOdW0gLSAxfS8ke3BhcnR5TWVtYmVyc30gcGxheWVyc2BcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wcG9uZW50LmFuaW1zLnBsYXkoXCJkeWluZ1wiLCB0cnVlKTtcclxuICAgICAgb3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuYWxwaGEgPSAwLjU7XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLm9wUGxheWVyTmFtZS5zZXRQb3NpdGlvbihcclxuICAgICAgICBkYXRhLngsXHJcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXIub3BQbGF5ZXJOYW1lLnkgKyAzMFxyXG4gICAgICApO1xyXG4gICAgICBvcHBvbmVudFBsYXllci51cGRhdGVIZWFsdGhCYXIoXHJcbiAgICAgICAgdHJ1ZSxcclxuICAgICAgICBkYXRhLnkgLSAob3Bwb25lbnRQbGF5ZXIub3Bwb25lbnQuaGVpZ2h0IC8gMiAtIDI0KVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKG9wcG9uZW50UGxheWVyc1tkYXRhLnVzZXJuYW1lXSkge1xyXG4gICAgICAgIGRlbGV0ZSBvcHBvbmVudFBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIH0gZWxzZSBpZiAodGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV0pIHtcclxuICAgICAgICBkZWxldGUgdGVhbVBsYXllcnNbZGF0YS51c2VybmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc29ja2V0Lm9uKFwiZ2FtZS1vdmVyXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgIGlmIChnYW1lSWQgPT09IGRhdGEuZ2FtZUlkKSB7XHJcbiAgICAgICAgY29uc3QgZ2FtZU92ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vdmVyJylcclxuICAgICAgICBpZiAoZGF0YS5sb3NlcnMuaW5jbHVkZXModXNlcm5hbWUpKSB7XHJcbiAgICAgICAgICBnYW1lT3Zlci50ZXh0Q29udGVudCA9ICdZb3UgTG9zZSdcclxuICAgICAgICAgIGdhbWVPdmVyLnN0eWxlLmNvbG9yID0gJyNjODEyMTInXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGdhbWVPdmVyLnRleHRDb250ZW50ID0gJ1lvdSBXaW4nXHJcbiAgICAgICAgICBnYW1lT3Zlci5zdHlsZS5jb2xvciA9ICcjMThjMzIxJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lLXRleHQnKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJhY3Rlci10ZXh0JykudGV4dENvbnRlbnQgPSBjaGFyYWN0ZXJcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlucHV0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFyay1vdmVybGF5XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmstb3ZlcmxheVwiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxyXG4gICAgICAgICAgICBcInJnYmEoMCwgMCwgMCwgMC4zNjMpXCI7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKCFkZWFkKSB7XHJcbiAgICAgIGhhbmRsZVBsYXllck1vdmVtZW50KHRoaXMpO1xyXG4gICAgICBzb2NrZXQuZW1pdChcIm1vdmVcIiwge1xyXG4gICAgICAgIHg6IHBsYXllci54LFxyXG4gICAgICAgIHk6IHBsYXllci55LFxyXG4gICAgICAgIGZsaXA6IHBsYXllci5mbGlwWCxcclxuICAgICAgICBhbmltYXRpb246IHBsYXllci5hbmltcy5jdXJyZW50QW5pbSxcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IHBsYXllciBpbiBvcHBvbmVudFBsYXllcnMpIHtcclxuICAgICAgY29uc3Qgb3Bwb25lbnRQbGF5ZXIgPSBvcHBvbmVudFBsYXllcnNbcGxheWVyXTtcclxuICAgICAgb3Bwb25lbnRQbGF5ZXIudXBkYXRlSGVhbHRoQmFyKCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IHBsYXllciBpbiB0ZWFtUGxheWVycykge1xyXG4gICAgICBjb25zdCBvcHBvbmVudFBsYXllciA9IHRlYW1QbGF5ZXJzW3BsYXllcl07XHJcbiAgICAgIG9wcG9uZW50UGxheWVyLnVwZGF0ZUhlYWx0aEJhcigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIHR5cGU6IFBoYXNlci5BVVRPLFxyXG4gIHNjYWxlOiB7XHJcbiAgICBtb2RlOiBQaGFzZXIuU2NhbGUuRklULFxyXG4gICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxyXG4gICAgd2lkdGg6IFwiMTMwMHB4XCIsXHJcbiAgICBoZWlnaHQ6IFwiNjAwcHhcIixcclxuICB9LFxyXG4gIHNjZW5lOiBHYW1lU2NlbmUsXHJcbiAgcGh5c2ljczoge1xyXG4gICAgZGVmYXVsdDogXCJhcmNhZGVcIixcclxuICAgIGFyY2FkZToge1xyXG4gICAgICBncmF2aXR5OiB7IHk6IDc1MCB9LFxyXG4gICAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcmVuZGVyOiB7XHJcbiAgICBhbnRpYWxpYXM6IHRydWUsXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShjb29raWVOYW1lKSB7XHJcbiAgY29uc3QgbmFtZSA9IGNvb2tpZU5hbWUgKyBcIj1cIjtcclxuICBjb25zdCBkZWNvZGVkQ29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LmNvb2tpZSk7XHJcbiAgY29uc3QgY29va2llQXJyYXkgPSBkZWNvZGVkQ29va2llLnNwbGl0KFwiO1wiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgY29va2llID0gY29va2llQXJyYXlbaV0udHJpbSgpO1xyXG4gICAgaWYgKGNvb2tpZS5pbmRleE9mKG5hbWUpID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBjb29raWUuc3Vic3RyaW5nKG5hbWUubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbmV4cG9ydCB7IG9wcG9uZW50UGxheWVycywgdGVhbVBsYXllcnMsIHNvY2tldCB9O1xyXG4iLCIvLyBtYXAuanNcclxuXHJcbi8vIEdsb2JhbHNcclxubGV0IGJhc2U7XHJcbmxldCBwbGF0Zm9ybTtcclxubGV0IGxlZnRQbGF0Zm9ybTtcclxubGV0IHJpZ2h0UGxhdGZvcm07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKHNjZW5lKSB7XHJcbiAgLy8gQmFja2dyb3VuZFxyXG4gIGNvbnN0IGNhbnZhc1dpZHRoID0gc2NlbmUuZ2FtZS5jb25maWcud2lkdGg7XHJcbiAgY29uc3QgY2FudmFzSGVpZ2h0ID0gc2NlbmUuZ2FtZS5jb25maWcuaGVpZ2h0O1xyXG4gIGNvbnN0IGNlbnRlclggPSBzY2VuZS5jYW1lcmFzLm1haW4ud2lkdGggLyAyO1xyXG5cclxuICBjb25zb2xlLmxvZyhjZW50ZXJYKTtcclxuXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IHNjZW5lLmFkZC5zcHJpdGUoMCwgMCwgXCJiYWNrZ3JvdW5kXCIpO1xyXG4gIGJhY2tncm91bmQuZGlzcGxheVdpZHRoID0gc2NlbmUuc3lzLmNhbnZhcy53aWR0aDtcclxuICBiYWNrZ3JvdW5kLmRpc3BsYXlIZWlnaHQgPSBzY2VuZS5zeXMuY2FudmFzLmhlaWdodCArIDIwMDtcclxuICBiYWNrZ3JvdW5kLnNldE9yaWdpbigwLCAwKTtcclxuXHJcbiAgLy8gQmFzZVxyXG4gIGJhc2UgPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCwgNTUwLCBcImJhc2VcIik7XHJcbiAgYmFzZS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIGJhc2Uuc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG4gIGJhc2Uuc2V0U2NhbGUoMC43KTtcclxuXHJcbiAgLy8gUGxhdGZvcm1cclxuICBwbGF0Zm9ybSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYLCAyNTAsIFwicGxhdGZvcm1cIik7XHJcbiAgcGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcclxuICBwbGF0Zm9ybS5ib2R5LmFsbG93R3Jhdml0eSA9IGZhbHNlO1xyXG4gIHBsYXRmb3JtLnNldEltbW92YWJsZSh0cnVlKTtcclxuXHJcbiAgLy8gTGVmdCBQbGF0Zm9ybVxyXG4gIGxlZnRQbGF0Zm9ybSA9IHNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShjZW50ZXJYIC0gNTAwLCAyNjAsIFwic2lkZS1wbGF0Zm9ybVwiKTtcclxuICBsZWZ0UGxhdGZvcm0uc2V0U2NhbGUoMC43KTtcclxuICBsZWZ0UGxhdGZvcm0uYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICBsZWZ0UGxhdGZvcm0uc2V0SW1tb3ZhYmxlKHRydWUpO1xyXG5cclxuICAvLyBSaWdodCBQbGF0Zm9ybVxyXG4gIHJpZ2h0UGxhdGZvcm0gPSBzY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoY2VudGVyWCArIDUwMCwgMjYwLCBcInNpZGUtcGxhdGZvcm1cIik7XHJcbiAgcmlnaHRQbGF0Zm9ybS5zZXRTY2FsZSgwLjcpO1xyXG4gIHJpZ2h0UGxhdGZvcm0uYm9keS5hbGxvd0dyYXZpdHkgPSBmYWxzZTtcclxuICByaWdodFBsYXRmb3JtLnNldEltbW92YWJsZSh0cnVlKTtcclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBiYXNlLCBwbGF0Zm9ybSwgbGVmdFBsYXRmb3JtLCByaWdodFBsYXRmb3JtIH07XHJcbiIsIi8vIG9wcGxheWVyLmpzXHJcblxyXG5pbXBvcnQgeyBiYXNlLCBwbGF0Zm9ybSB9IGZyb20gXCIuL21hcFwiO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVTcGF3biB9IGZyb20gXCIuL3BsYXllclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBjaGFyYWN0ZXIsIHVzZXJuYW1lLCB0ZWFtLCBzcGF3blBsYXRmb3JtLCBzcGF3biwgcGxheWVyc0luVGVhbSkge1xyXG4gICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xyXG4gICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgIHRoaXMudGVhbSA9IHRlYW07XHJcbiAgICAgIHRoaXMuc3Bhd25QbGF0Zm9ybSA9IHNwYXduUGxhdGZvcm1cclxuICAgICAgdGhpcy5zcGF3biA9IHNwYXduXHJcbiAgICAgIHRoaXMucGxheWVyc0luVGVhbSA9IHBsYXllcnNJblRlYW1cclxuICAgICAgdGhpcy5vcE1heEhlYWx0aCA9IDgwMDA7XHJcbiAgICAgIHRoaXMub3BDdXJyZW50SGVhbHRoID0gODAwMDtcclxuICAgICAgdGhpcy5vcEhlYWx0aEJhcldpZHRoID0gNjA7XHJcbiAgICAgIHRoaXMuY3JlYXRlT3BQbGF5ZXIoKTtcclxuICAgIH1cclxuICBcclxuICAgIGNyZWF0ZU9wUGxheWVyKCkge1xyXG4gICAgICB0aGlzLm9wcG9uZW50ID0gdGhpcy5zY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUoLTEwMCwgLTEwMCwgXCJzcHJpdGUyXCIpO1xyXG4gICAgICB0aGlzLm9wcG9uZW50LmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMub3Bwb25lbnQuYW5pbXMucGxheShcImlkbGVcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICBpZiAodGhpcy5zcGF3blBsYXRmb3JtID09PSBcInRvcFwiKSB7XHJcbiAgICAgICAgY2FsY3VsYXRlU3Bhd24ocGxhdGZvcm0sIHRoaXMuc3Bhd24sIHRoaXMub3Bwb25lbnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc3Bhd25QbGF0Zm9ybSA9PT0gXCJib3R0b21cIikge1xyXG4gICAgICAgIGNhbGN1bGF0ZVNwYXduKGJhc2UsIHRoaXMuc3Bhd24sIHRoaXMub3Bwb25lbnQpO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHRoaXMub3BGcmFtZSA9IHRoaXMub3Bwb25lbnQuZnJhbWU7XHJcbiAgICAgIHRoaXMub3Bwb25lbnQuYm9keS5zZXRTaXplKHRoaXMub3BGcmFtZS53aWR0aCAtIDM1LCB0aGlzLm9wRnJhbWUud2lkdGggLSAxMCk7XHJcbiAgICAgIHRoaXMub3Bwb25lbnQuYm9keS5zZXRPZmZzZXQodGhpcy5vcHBvbmVudC5ib2R5LndpZHRoIC8gMiwgMTApO1xyXG4gIFxyXG4gICAgICB0aGlzLm9wUGxheWVyTmFtZSA9IHRoaXMuc2NlbmUuYWRkLnRleHQoXHJcbiAgICAgICAgdGhpcy5vcHBvbmVudC54LFxyXG4gICAgICAgIHRoaXMub3Bwb25lbnQueSAtIHRoaXMub3Bwb25lbnQuaGVpZ2h0ICsgMTAsXHJcbiAgICAgICAgdGhpcy51c2VybmFtZVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLm9wUGxheWVyTmFtZS5zZXRTdHlsZSh7XHJcbiAgICAgICAgZm9udDogXCJib2xkIDhwdCBBcmlhbFwiLFxyXG4gICAgICAgIGZpbGw6IFwiIzAwMDAwMFwiLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vcFBsYXllck5hbWUuc2V0T3JpZ2luKDAuNSwgMCk7XHJcbiAgXHJcbiAgICAgIHRoaXMub3BIZWFsdGhUZXh0ID0gdGhpcy5zY2VuZS5hZGQudGV4dCgwLCAwLCBcIlwiLCB7XHJcbiAgICAgICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG4gICAgICAgIGZvbnRTaXplOiBcIjEwcHhcIixcclxuICAgICAgICBjb2xvcjogXCIjRkZGRkZGXCIsXHJcbiAgICAgICAgc3Ryb2tlOiBcIiMwMDAwMDBcIixcclxuICAgICAgICBzdHJva2VUaGlja25lc3M6IDQsXHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICB0aGlzLm9wSGVhbHRoQmFyID0gdGhpcy5zY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuICBcclxuICBcclxuICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXIoKTtcclxuICAgIH1cclxuICBcclxuICAgIHVwZGF0ZUhlYWx0aEJhcihkZWFkPWZhbHNlLCBoZWFsdGhCYXJZPTApIHtcclxuICAgICAgaWYgKHRoaXMub3BDdXJyZW50SGVhbHRoIDwgMCkge1xyXG4gICAgICAgIHRoaXMub3BDdXJyZW50SGVhbHRoID0gMFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGhlYWx0aFBlcmNlbnRhZ2UgPSB0aGlzLm9wQ3VycmVudEhlYWx0aCAvIHRoaXMub3BNYXhIZWFsdGg7XHJcbiAgICAgIGNvbnN0IGRpc3BsYXllZFdpZHRoID0gdGhpcy5vcEhlYWx0aEJhcldpZHRoICogaGVhbHRoUGVyY2VudGFnZTtcclxuICBcclxuICAgICAgdGhpcy5vcEhlYWx0aEJhci5jbGVhcigpO1xyXG4gIFxyXG4gICAgICBjb25zdCBoZWFsdGhCYXJYID0gdGhpcy5vcHBvbmVudC54IC0gdGhpcy5vcEhlYWx0aEJhcldpZHRoIC8gMjtcclxuICAgICAgaWYgKGRlYWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgaGVhbHRoQmFyWSA9IHRoaXMub3Bwb25lbnQueSAtICh0aGlzLm9wcG9uZW50LmhlaWdodCAvIDIgKyA0KTtcclxuICAgICAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRUZXh0KGAke3RoaXMub3BDdXJyZW50SGVhbHRofWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3BIZWFsdGhUZXh0LnNldFRleHQoJycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFN0eWxlKDB4NTk1OTU5KTtcclxuICAgICAgdGhpcy5vcEhlYWx0aEJhci5maWxsUmVjdChoZWFsdGhCYXJYLCBoZWFsdGhCYXJZLCB0aGlzLm9wSGVhbHRoQmFyV2lkdGgsIDkpO1xyXG4gIFxyXG4gICAgICB0aGlzLm9wSGVhbHRoQmFyLmxpbmVTdHlsZSgyLCAweDAwMDAwMCk7XHJcbiAgICAgIHRoaXMub3BIZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgdGhpcy5vcEhlYWx0aEJhcldpZHRoLCA5LCAzKTtcclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLnRlYW0gPT09ICd1c2VyJykge1xyXG4gICAgICAgIHRoaXMub3BIZWFsdGhCYXIuZmlsbFN0eWxlKDB4MkU4OENBKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9wSGVhbHRoQmFyLmZpbGxTdHlsZSgweEJCNUMzOSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vcEhlYWx0aEJhci5maWxsUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgZGlzcGxheWVkV2lkdGgsIDksIDMpO1xyXG4gIFxyXG4gICAgICB0aGlzLm9wSGVhbHRoVGV4dC5zZXRQb3NpdGlvbih0aGlzLm9wcG9uZW50LnggLSB0aGlzLm9wSGVhbHRoVGV4dC53aWR0aCAvIDIsIGhlYWx0aEJhclkgLSA4KTtcclxuICAgICAgdGhpcy5vcEhlYWx0aFRleHQuc2V0RGVwdGgoMik7XHJcbiAgICB9XHJcbiAgfVxyXG4gICIsIi8vIHBsYXllci5qc1xyXG5pbXBvcnQgeyBvcHBvbmVudFBsYXllcnMsIHRlYW1QbGF5ZXJzLCBzb2NrZXQgfSBmcm9tIFwiLi9nYW1lXCI7XHJcbmltcG9ydCB7IGJhc2UsIHBsYXRmb3JtLCBsZWZ0UGxhdGZvcm0sIHJpZ2h0UGxhdGZvcm0gfSBmcm9tIFwiLi9tYXBcIjtcclxuLy8gR2xvYmFsc1xyXG5sZXQgcGxheWVyO1xyXG5sZXQgY3Vyc29ycztcclxubGV0IGNhbldhbGxKdW1wID0gdHJ1ZTtcclxubGV0IGlzTW92aW5nID0gZmFsc2U7XHJcbmxldCBpc0p1bXBpbmcgPSBmYWxzZTtcclxubGV0IGlzQXR0YWNraW5nID0gZmFsc2U7XHJcbmxldCBjYW5BdHRhY2sgPSB0cnVlO1xyXG5cclxubGV0IGZyYW1lO1xyXG5cclxubGV0IG1heEhlYWx0aCA9IDgwMDA7XHJcbmxldCBjdXJyZW50SGVhbHRoID0gODAwMDtcclxubGV0IGRlYWQgPSBmYWxzZTtcclxuXHJcbmxldCBoZWFsdGhCYXJXaWR0aCA9IDYwO1xyXG5sZXQgaGVhbHRoQmFyO1xyXG5sZXQgaGVhbHRoVGV4dDtcclxuXHJcbmxldCBwbGF5ZXJOYW1lO1xyXG5cclxubGV0IGluZGljYXRvclRyaWFuZ2xlO1xyXG5cclxubGV0IHVzZXJuYW1lO1xyXG5sZXQgZ2FtZUlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbikucG9wKCk7XHJcblxyXG5sZXQgc2NlbmU7XHJcblxyXG5sZXQgc3Bhd25cclxubGV0IHBsYXllcnNJblRlYW1cclxubGV0IHNwYXduUGxhdGZvcm1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoXHJcbiAgc2NlbmVQYXJhbSxcclxuICBuYW1lLFxyXG4gIGNoYXJhY3RlcixcclxuICBzcGF3blBsYXRmb3JtUGFyYW0sXHJcbiAgc3Bhd25QYXJhbSxcclxuICBwbGF5ZXJzSW5UZWFtUGFyYW1cclxuKSB7XHJcbiAgdXNlcm5hbWUgPSBuYW1lO1xyXG4gIHNjZW5lID0gc2NlbmVQYXJhbTtcclxuICBzcGF3biA9IHNwYXduUGFyYW1cclxuICBwbGF5ZXJzSW5UZWFtID0gcGxheWVyc0luVGVhbVBhcmFtXHJcbiAgc3Bhd25QbGF0Zm9ybSA9IHNwYXduUGxhdGZvcm1QYXJhbVxyXG5cclxuICBjdXJzb3JzID0gc2NlbmUuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG5cclxuICAvLyBBbmltYXRpb25zXHJcbiAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgIGtleTogXCJydW5uaW5nXCIsXHJcbiAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZTJcIiwge1xyXG4gICAgICBwcmVmaXg6IFwicnVubmluZ1wiLFxyXG4gICAgICBlbmQ6IDUsXHJcbiAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICB9KSxcclxuICAgIGZyYW1lUmF0ZTogMjAsXHJcbiAgICByZXBlYXQ6IDAsXHJcbiAgfSk7XHJcbiAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgIGtleTogXCJpZGxlXCIsXHJcbiAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZTJcIiwge1xyXG4gICAgICBwcmVmaXg6IFwiaWRsZVwiLFxyXG4gICAgICBlbmQ6IDQsXHJcbiAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICB9KSxcclxuICAgIGZyYW1lUmF0ZTogMyxcclxuICAgIHJlcGVhdDogLTEsXHJcbiAgfSk7XHJcbiAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgIGtleTogXCJqdW1waW5nXCIsXHJcbiAgICBmcmFtZXM6IHNjZW5lLmFuaW1zLmdlbmVyYXRlRnJhbWVOYW1lcyhcInNwcml0ZTJcIiwge1xyXG4gICAgICBwcmVmaXg6IFwianVtcGluZ1wiLFxyXG4gICAgICBlbmQ6IDcsXHJcbiAgICAgIHplcm9QYWQ6IDIsXHJcbiAgICB9KSxcclxuICAgIGZyYW1lUmF0ZTogMjAsXHJcbiAgICByZXBlYXQ6IDAsXHJcbiAgfSk7XHJcblxyXG4gIHNjZW5lLmFuaW1zLmNyZWF0ZSh7XHJcbiAgICBrZXk6IFwic2xpZGluZ1wiLFxyXG4gICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGUyXCIsIHtcclxuICAgICAgcHJlZml4OiBcIndhbGxcIixcclxuICAgICAgZW5kOiAwLFxyXG4gICAgICB6ZXJvUGFkOiAyLFxyXG4gICAgfSksXHJcbiAgICBmcmFtZVJhdGU6IDIwLFxyXG4gICAgcmVwZWF0OiAyLFxyXG4gIH0pO1xyXG5cclxuICBzY2VuZS5hbmltcy5jcmVhdGUoe1xyXG4gICAga2V5OiBcImZhbGxpbmdcIixcclxuICAgIGZyYW1lczogc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU5hbWVzKFwic3ByaXRlMlwiLCB7XHJcbiAgICAgIHByZWZpeDogXCJmYWxsaW5nXCIsXHJcbiAgICAgIGVuZDogMixcclxuICAgICAgemVyb1BhZDogMixcclxuICAgIH0pLFxyXG4gICAgZnJhbWVSYXRlOiAyMCxcclxuICAgIHJlcGVhdDogMCxcclxuICB9KTtcclxuXHJcbiAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgIGtleTogXCJ0aHJvd1wiLFxyXG4gICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGUyXCIsIHtcclxuICAgICAgcHJlZml4OiBcInRocm93XCIsXHJcbiAgICAgIGVuZDogMyxcclxuICAgICAgemVyb1BhZDogMixcclxuICAgIH0pLFxyXG4gICAgZnJhbWVSYXRlOiAxNSxcclxuICAgIHJlcGVhdDogMCxcclxuICB9KTtcclxuXHJcbiAgc2NlbmUuYW5pbXMuY3JlYXRlKHtcclxuICAgIGtleTogXCJkeWluZ1wiLFxyXG4gICAgZnJhbWVzOiBzY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTmFtZXMoXCJzcHJpdGUyXCIsIHtcclxuICAgICAgcHJlZml4OiBcImR5aW5nXCIsXHJcbiAgICAgIGVuZDogMyxcclxuICAgICAgemVyb1BhZDogMixcclxuICAgIH0pLFxyXG4gICAgZnJhbWVSYXRlOiAxMCxcclxuICAgIHJlcGVhdDogMCxcclxuICB9KTtcclxuXHJcbiAgcGxheWVyID0gc2NlbmUucGh5c2ljcy5hZGQuc3ByaXRlKC0xMDAsIC0xMDAsIFwic3ByaXRlMlwiKTtcclxuICBwbGF5ZXIuYW5pbXMucGxheShcImlkbGVcIiwgdHJ1ZSk7XHJcblxyXG4gIHNjZW5lLmV2ZW50cy5vbihcInVwZGF0ZVwiLCAoKSA9PiB7XHJcbiAgICBpZiAocGxheWVyLnkgPiBzY2VuZS5waHlzaWNzLndvcmxkLmJvdW5kcy5ib3R0b20pIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudEhlYWx0aCA9IDA7XHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGlmIChzcGF3blBsYXRmb3JtID09PSBcInRvcFwiKSB7XHJcbiAgICBjYWxjdWxhdGVTcGF3bihwbGF0Zm9ybSwgc3Bhd24sIHBsYXllcik7XHJcbiAgfSBlbHNlIGlmIChzcGF3blBsYXRmb3JtID09PSBcImJvdHRvbVwiKSB7XHJcbiAgICBjYWxjdWxhdGVTcGF3bihiYXNlLCBzcGF3biwgcGxheWVyKTtcclxuICB9XHJcblxyXG5cclxuICBmcmFtZSA9IHBsYXllci5mcmFtZTtcclxuICBwbGF5ZXIuYm9keS5zZXRTaXplKGZyYW1lLndpZHRoIC0gMzUsIGZyYW1lLndpZHRoIC0gMTApO1xyXG4gIHBsYXllci5ib2R5LnNldE9mZnNldChwbGF5ZXIuYm9keS53aWR0aCAvIDIsIDEwKTtcclxuXHJcbiAgcGxheWVyTmFtZSA9IHNjZW5lLmFkZC50ZXh0KFxyXG4gICAgcGxheWVyLngsXHJcbiAgICBwbGF5ZXIueSAtIHBsYXllci5oZWlnaHQgKyAxMCxcclxuICAgIHVzZXJuYW1lXHJcbiAgKTsgXHJcbiAgcGxheWVyTmFtZS5zZXRTdHlsZSh7XHJcbiAgICBmb250OiBcImJvbGQgOHB0IEFyaWFsXCIsXHJcbiAgICBmaWxsOiBcIiMwMDAwMDBcIixcclxuICB9KTtcclxuICBwbGF5ZXJOYW1lLnNldE9yaWdpbigwLjUsIDApO1xyXG5cclxuICBoZWFsdGhUZXh0ID0gc2NlbmUuYWRkLnRleHQoMCwgMCwgXCJcIiwge1xyXG4gICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG4gICAgZm9udFNpemU6IFwiMTBweFwiLFxyXG4gICAgY29sb3I6IFwiI0ZGRkZGRlwiLFxyXG4gICAgc3Ryb2tlOiBcIiMwMDAwMDBcIiwgLy8gU2V0IHRoZSBzdHJva2UgY29sb3JcclxuICAgIHN0cm9rZVRoaWNrbmVzczogNCxcclxuICB9KTtcclxuXHJcbiAgaGVhbHRoQmFyID0gc2NlbmUuYWRkLmdyYXBoaWNzKCk7XHJcblxyXG4gIC8vIFRyaWFuZ2xlIHRvIHNob3cgd2hpY2ggb25lIGlzIHRoZSB1c2VyXHJcbiAgaW5kaWNhdG9yVHJpYW5nbGUgPSBzY2VuZS5hZGQuZ3JhcGhpY3MoKTtcclxuXHJcbiAgY29uc3QgdHJpYW5nbGUgPSBuZXcgUGhhc2VyLkdlb20uVHJpYW5nbGUoXHJcbiAgICBwbGF5ZXIueCxcclxuICAgIHBsYXllci55IC0gNjIsIC8vIFRvcCBwb2ludFxyXG4gICAgcGxheWVyLnggLSAxMyxcclxuICAgIHBsYXllci55IC0gNzIsIC8vIExlZnQgcG9pbnRcclxuICAgIHBsYXllci54ICsgMTMsXHJcbiAgICBwbGF5ZXIueSAtIDcyIC8vIFJpZ2h0IHBvaW50XHJcbiAgKTtcclxuICBpbmRpY2F0b3JUcmlhbmdsZS5maWxsU3R5bGUoMHg5OWFiMmMpO1xyXG4gIGluZGljYXRvclRyaWFuZ2xlLmZpbGxUcmlhbmdsZVNoYXBlKHRyaWFuZ2xlKTtcclxuXHJcbiAgc2NlbmUuaW5wdXQub24oXCJwb2ludGVyZG93blwiLCBmdW5jdGlvbiAocG9pbnRlcikge1xyXG4gICAgaWYgKGNhbkF0dGFjaykge1xyXG4gICAgICBpc0F0dGFja2luZyA9IHRydWU7XHJcbiAgICAgIGNhbkF0dGFjayA9IGZhbHNlO1xyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaXNBdHRhY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICBjYW5BdHRhY2sgPSB0cnVlO1xyXG4gICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgLy8gUGxheSB0aGUgc291bmRcclxuICAgICAgbGV0IHNodXJpa2VuU291bmQgPSBzY2VuZS5zb3VuZC5hZGQoXCJzaHVyaWtlblRocm93XCIpO1xyXG4gICAgICBzaHVyaWtlblNvdW5kLnNldFZvbHVtZSgwLjEpO1xyXG5cclxuICAgICAgc2h1cmlrZW5Tb3VuZC5zZXRSYXRlKDEuMyk7IC8vIENoYW5nZSBwaXRjaFxyXG4gICAgICBzaHVyaWtlblNvdW5kLnBsYXkoKTtcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXIgPT09IFwiTmluamFcIikge1xyXG4gICAgICAgIHBsYXllci5hbmltcy5wbGF5KFwidGhyb3dcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBcInNodXJpa2VuXCI7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gMC4xO1xyXG4gICAgICAgIGxldCB2ZWxvY2l0eSA9IDgwMDtcclxuICAgICAgICBsZXQgYW5ndWxhclZlbG9jaXR5ID0gMjAwMDtcclxuICAgICAgICBsZXQgZGFtYWdlID0gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdGlsZSA9IHNjZW5lLnBoeXNpY3MuYWRkLmltYWdlKHBsYXllci54LCBwbGF5ZXIueSwgd2VhcG9uKTtcclxuICAgICAgICBwcm9qZWN0aWxlLnNldFNjYWxlKHNjYWxlKTtcclxuICAgICAgICBpZiAocGxheWVyLmZsaXBYID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB2ZWxvY2l0eSA9IC12ZWxvY2l0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvamVjdGlsZS5zZXRWZWxvY2l0eSh2ZWxvY2l0eSwgMCk7IC8vIFNldCBwcm9qZWN0aWxlIHZlbG9jaXR5IGlmIGZsaXBwZWRcclxuICAgICAgICBwcm9qZWN0aWxlLmJvZHkuYWxsb3dHcmF2aXR5ID0gZmFsc2U7XHJcbiAgICAgICAgcHJvamVjdGlsZS5zZXRBbmd1bGFyVmVsb2NpdHkoYW5ndWxhclZlbG9jaXR5KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwbGF5ZXJJZCBpbiBvcHBvbmVudFBsYXllcnMpIHtcclxuICAgICAgICAgIGNvbnN0IG9wcG9uZW50UGxheWVyID0gb3Bwb25lbnRQbGF5ZXJzW3BsYXllcklkXTtcclxuICAgICAgICAgIGFkZE92ZXJsYXAocHJvamVjdGlsZSwgb3Bwb25lbnRQbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkT3ZlcmxhcChwcm9qZWN0aWxlLCBiYXNlKTtcclxuICAgICAgICBhZGRPdmVybGFwKHByb2plY3RpbGUsIGxlZnRQbGF0Zm9ybSk7XHJcbiAgICAgICAgYWRkT3ZlcmxhcChwcm9qZWN0aWxlLCByaWdodFBsYXRmb3JtKTtcclxuICAgICAgICBhZGRPdmVybGFwKHByb2plY3RpbGUsIHBsYXRmb3JtKTtcclxuICAgICAgICBmdW5jdGlvbiBhZGRPdmVybGFwKHByb2plY3RpbGUsIG9iamVjdCkge1xyXG4gICAgICAgICAgaWYgKG9iamVjdC5vcHBvbmVudCkge1xyXG4gICAgICAgICAgICBzY2VuZS5waHlzaWNzLmFkZC5vdmVybGFwKFxyXG4gICAgICAgICAgICAgIHByb2plY3RpbGUsXHJcbiAgICAgICAgICAgICAgb2JqZWN0Lm9wcG9uZW50LFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIChwcm9qZWN0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3Qub3BDdXJyZW50SGVhbHRoIC09IGRhbWFnZTtcclxuICAgICAgICAgICAgICAgIG9iamVjdC51cGRhdGVIZWFsdGhCYXIoKTtcclxuICAgICAgICAgICAgICAgIHByb2plY3RpbGUuZGVzdHJveSgpOyAvLyBEZXN0cm95IHByb2plY3RpbGUgb24gY29sbGlzaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpdFNvdW5kID0gc2NlbmUuc291bmQuYWRkKFwic2h1cmlrZW5IaXRcIik7XHJcbiAgICAgICAgICAgICAgICBoaXRTb3VuZC5zZXRWb2x1bWUoMC4wMDgpO1xyXG4gICAgICAgICAgICAgICAgaGl0U291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNjZW5lLnBoeXNpY3MuYWRkLm92ZXJsYXAoXHJcbiAgICAgICAgICAgICAgcHJvamVjdGlsZSxcclxuICAgICAgICAgICAgICBvYmplY3QsXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKHByb2plY3RpbGUpIHtcclxuICAgICAgICAgICAgICAgIHByb2plY3RpbGUuZGVzdHJveSgpOyAvLyBEZXN0cm95IHByb2plY3RpbGUgb24gY29sbGlzaW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0U291bmQgPSBzY2VuZS5zb3VuZC5hZGQoXCJzaHVyaWtlbkhpdFdvb2RcIik7XHJcbiAgICAgICAgICAgICAgICBoaXRTb3VuZC5zZXRWb2x1bWUoMC4wMSk7XHJcbiAgICAgICAgICAgICAgICBoaXRTb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzb2NrZXQuZW1pdChcImF0dGFja1wiLCB7XHJcbiAgICAgICAgICB4OiBwbGF5ZXIueCxcclxuICAgICAgICAgIHk6IHBsYXllci55LFxyXG4gICAgICAgICAgd2VhcG9uLFxyXG4gICAgICAgICAgc2NhbGUsXHJcbiAgICAgICAgICB2ZWxvY2l0eSxcclxuICAgICAgICAgIGFuZ3VsYXJWZWxvY2l0eSxcclxuICAgICAgICAgIGRhbWFnZSxcclxuICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudEhlYWx0aChkYW1hZ2UpIHtcclxuICBjdXJyZW50SGVhbHRoIC09IGRhbWFnZTtcclxuICB1cGRhdGVIZWFsdGhCYXIoKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVIZWFsdGhCYXIoKSB7XHJcbiAgaWYgKGN1cnJlbnRIZWFsdGggPD0gMCkge1xyXG4gICAgY3VycmVudEhlYWx0aCA9IDA7XHJcbiAgICBpZiAoIWRlYWQpIHtcclxuICAgICAgZGVhZCA9IHRydWU7XHJcbiAgICAgIHBsYXllci5hbmltcy5wbGF5KFwiZHlpbmdcIiwgdHJ1ZSk7XHJcbiAgICAgIHNjZW5lLmlucHV0LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgcGxheWVyLmFscGhhID0gMC41O1xyXG5cclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW92ZXJsYXlcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW92ZXJsYXlcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgICBcInJnYmEoMCwgMCwgMCwgMC4xKVwiO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlYWRcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lvdXItdGVhbScpLnRleHRDb250ZW50ID0gYFlvdXIgVGVhbTogJHtwbGF5ZXJzSW5UZWFtLTF9LyR7cGxheWVyc0luVGVhbX0gUGxheWVyc2BcclxuICAgICAgc29ja2V0LmVtaXQoXCJkZWF0aFwiLCB7IHVzZXJuYW1lLCBnYW1lSWQsIHg6IHBsYXllci54LCB5OiBwbGF5ZXIueSB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgY29uc3QgaGVhbHRoUGVyY2VudGFnZSA9IGN1cnJlbnRIZWFsdGggLyBtYXhIZWFsdGg7XHJcbiAgY29uc3QgZGlzcGxheWVkV2lkdGggPSBoZWFsdGhCYXJXaWR0aCAqIGhlYWx0aFBlcmNlbnRhZ2U7XHJcblxyXG4gIGhlYWx0aEJhci5jbGVhcigpOyAvLyBDbGVhciB0aGUgZ3JhcGhpY3MgYmVmb3JlIHJlZHJhd2luZ1xyXG5cclxuICBjb25zdCBoZWFsdGhCYXJYID0gcGxheWVyLnggLSBoZWFsdGhCYXJXaWR0aCAvIDI7XHJcbiAgbGV0IGhlYWx0aEJhclk7XHJcbiAgaWYgKCFkZWFkKSB7XHJcbiAgICBoZWFsdGhCYXJZID0gcGxheWVyLnkgLSAocGxheWVyLmhlaWdodCAvIDIgKyA0KTtcclxuICAgIGhlYWx0aFRleHQuc2V0VGV4dChgJHtjdXJyZW50SGVhbHRofWApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBoZWFsdGhCYXJZID0gcGxheWVyLnkgLSAocGxheWVyLmhlaWdodCAvIDIgLSAyNCk7XHJcbiAgICBoZWFsdGhUZXh0LnNldFRleHQoXCJcIik7XHJcbiAgICBwbGF5ZXJOYW1lLnNldFBvc2l0aW9uKHBsYXllci54LCBwbGF5ZXJOYW1lLnkgKyAzMCk7XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBiYWNrZ3JvdW5kIHJlY3RhbmdsZSB3aXRoIHRoZSBkZWZhdWx0IGZpbGwgY29sb3JcclxuICBoZWFsdGhCYXIuZmlsbFN0eWxlKDB4NTk1OTU5KTtcclxuICBoZWFsdGhCYXIuZmlsbFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgaGVhbHRoQmFyV2lkdGgsIDkpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBoZWFsdGggYmFyIGJhY2tncm91bmQgKHN0cm9rZSlcclxuICBoZWFsdGhCYXIubGluZVN0eWxlKDIsIDB4MDAwMDAwKTtcclxuICBoZWFsdGhCYXIuc3Ryb2tlUm91bmRlZFJlY3QoaGVhbHRoQmFyWCwgaGVhbHRoQmFyWSwgaGVhbHRoQmFyV2lkdGgsIDksIDMpO1xyXG5cclxuICAvLyBEcmF3IHRoZSBmaWxsZWQgcGFydCBvZiB0aGUgaGVhbHRoIGJhciAoZ3JlZW4pXHJcbiAgaGVhbHRoQmFyLmZpbGxTdHlsZSgweDk5YWIyYyk7XHJcbiAgaGVhbHRoQmFyLmZpbGxSb3VuZGVkUmVjdChoZWFsdGhCYXJYLCBoZWFsdGhCYXJZLCBkaXNwbGF5ZWRXaWR0aCwgOSwgMyk7XHJcblxyXG4gIGhlYWx0aFRleHQuc2V0UG9zaXRpb24ocGxheWVyLnggLSBoZWFsdGhUZXh0LndpZHRoIC8gMiwgaGVhbHRoQmFyWSAtIDgpO1xyXG4gIGhlYWx0aFRleHQuc2V0RGVwdGgoMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNwYXduKHBsYXRmb3JtLCBzcGF3biwgcGxheWVyKSB7XHJcbiAgY29uc3QgYXZhaWxhYmxlU3BhY2UgPSBwbGF0Zm9ybS53aWR0aCAvIHBsYXllcnNJblRlYW07XHJcbiAgY29uc29sZS5sb2coYXZhaWxhYmxlU3BhY2UpO1xyXG4gIGNvbnN0IGxlZnRNb3N0ID0gcGxhdGZvcm0uZ2V0Qm91bmRzKCkubGVmdDtcclxuICBjb25zb2xlLmxvZyhsZWZ0TW9zdCk7XHJcbiAgY29uc3Qgc3Bhd25ZID0gcGxhdGZvcm0uZ2V0VG9wQ2VudGVyKCkueSAtIHBsYXllci5oZWlnaHQgLyAyO1xyXG5cclxuICBjb25zdCBzcGF3blggPVxyXG4gICAgbGVmdE1vc3QgKyAoc3Bhd24gKiBhdmFpbGFibGVTcGFjZSkgLyAyIC0gcGxheWVyLndpZHRoICogMS4zMzM7XHJcbiAgY29uc29sZS5sb2coc3Bhd25YKTtcclxuICBwbGF5ZXIueCA9IHNwYXduWDtcclxuICBwbGF5ZXIueSA9IHNwYXduWTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVBsYXllck1vdmVtZW50KHNjZW5lKSB7XHJcbiAgY29uc3Qgc3BlZWQgPSAyNTA7XHJcbiAgY29uc3QganVtcFNwZWVkID0gNDAwO1xyXG5cclxuICAvLyBLZXlzXHJcbiAgY29uc3QgbGVmdEtleSA9XHJcbiAgICBjdXJzb3JzLmxlZnQuaXNEb3duIHx8IHNjZW5lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIkFcIikuaXNEb3duO1xyXG4gIGNvbnN0IHJpZ2h0S2V5ID1cclxuICAgIGN1cnNvcnMucmlnaHQuaXNEb3duIHx8IHNjZW5lLmlucHV0LmtleWJvYXJkLmFkZEtleShcIkRcIikuaXNEb3duO1xyXG4gIGNvbnN0IHVwS2V5ID0gY3Vyc29ycy51cC5pc0Rvd24gfHwgc2NlbmUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KFwiV1wiKS5pc0Rvd247XHJcblxyXG4gIC8vIExlZnQgYW5kIHJpZ2h0IG1vdmVtZW50XHJcbiAgaWYgKGxlZnRLZXkpIHtcclxuICAgIGlmIChpbmRpY2F0b3JUcmlhbmdsZSkge1xyXG4gICAgICBpbmRpY2F0b3JUcmlhbmdsZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WCgtc3BlZWQpO1xyXG4gICAgcGxheWVyLmZsaXBYID0gdHJ1ZTtcclxuICAgIGlzTW92aW5nID0gdHJ1ZTtcclxuICAgIGlmIChwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmICFpc0F0dGFja2luZyAmJiAhZGVhZCkge1xyXG4gICAgICBwbGF5ZXIuYW5pbXMucGxheShcInJ1bm5pbmdcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyaWdodEtleSkge1xyXG4gICAgaWYgKGluZGljYXRvclRyaWFuZ2xlKSB7XHJcbiAgICAgIGluZGljYXRvclRyaWFuZ2xlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXIuZmxpcFggPSBmYWxzZTtcclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVgoc3BlZWQpO1xyXG4gICAgaXNNb3ZpbmcgPSB0cnVlO1xyXG4gICAgaWYgKHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiYgIWlzQXR0YWNraW5nICYmICFkZWFkKSB7XHJcbiAgICAgIHBsYXllci5hbmltcy5wbGF5KFwicnVubmluZ1wiLCB0cnVlKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgc3RvcE1vdmluZygpO1xyXG4gIH1cclxuXHJcbiAgLy8gSnVtcGluZ1xyXG4gIGlmICh1cEtleSAmJiBwbGF5ZXIuYm9keS50b3VjaGluZy5kb3duICYmICFkZWFkKSB7XHJcbiAgICBpZiAoaW5kaWNhdG9yVHJpYW5nbGUpIHtcclxuICAgICAgaW5kaWNhdG9yVHJpYW5nbGUuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIGp1bXAoKTtcclxuICB9IGVsc2UgaWYgKFxyXG4gICAgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgKHBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0ICYmICFkZWFkKSkgJiZcclxuICAgIGNhbldhbGxKdW1wICYmXHJcbiAgICB1cEtleVxyXG4gICkge1xyXG4gICAgd2FsbEp1bXAoKTtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgKHBsYXllci5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgKHBsYXllci5ib2R5LnRvdWNoaW5nLnJpZ2h0ICYmICFkZWFkKSkgJiZcclxuICAgICFpc0F0dGFja2luZ1xyXG4gICkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJzbGlkaW5nXCIsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgaWYgdGhlIGp1bXAgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWRcclxuICBpZiAoXHJcbiAgICAhcGxheWVyLmFuaW1zLmlzUGxheWluZyAmJlxyXG4gICAgIXBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiZcclxuICAgICFwbGF5ZXIuYm9keS50b3VjaGluZy5sZWZ0ICYmXHJcbiAgICAhcGxheWVyLmJvZHkudG91Y2hpbmcucmlnaHRcclxuICApIHtcclxuICAgIGZhbGwoKTtcclxuICB9XHJcblxyXG4gIC8vIElmIG5vIG1vdmVtZW50IGFuaW1hdGlvbnMgYXJlIHBsYXlpbmcsIHBsYXkgdGhlICdpZGxlJyBhbmltYXRpb25cclxuICBpZiAoXHJcbiAgICAhaXNNb3ZpbmcgJiZcclxuICAgIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24gJiZcclxuICAgICFpc0p1bXBpbmcgJiZcclxuICAgICFpc0F0dGFja2luZyAmJlxyXG4gICAgIWRlYWRcclxuICApIHtcclxuICAgIGlkbGUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhlYWx0aEJhcigpO1xyXG4gIHBsYXllck5hbWUuc2V0UG9zaXRpb24ocGxheWVyLngsIHBsYXllci55IC0gcGxheWVyLmhlaWdodCArIDEwKTtcclxuXHJcbiAgZnVuY3Rpb24gc3RvcE1vdmluZygpIHtcclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVgoMCk7XHJcbiAgICBpc01vdmluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24ganVtcCgpIHtcclxuICAgIHBsYXllci5hbmltcy5wbGF5KFwianVtcGluZ1wiLCB0cnVlKTtcclxuICAgIHBsYXllci5zZXRWZWxvY2l0eVkoLWp1bXBTcGVlZCk7XHJcbiAgICBpc01vdmluZyA9IHRydWU7XHJcbiAgICBpc0p1bXBpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gd2FsbEp1bXAoKSB7XHJcbiAgICBjYW5XYWxsSnVtcCA9IGZhbHNlO1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJzbGlkaW5nXCIsIHRydWUpO1xyXG4gICAgcGxheWVyLnNldFZlbG9jaXR5WSgtanVtcFNwZWVkKTtcclxuXHJcbiAgICBjb25zdCB3YWxsSnVtcFR3ZWVuID0gc2NlbmUudHdlZW5zLmFkZCh7XHJcbiAgICAgIHRhcmdldHM6IHBsYXllcixcclxuICAgICAgeDogcGxheWVyLnggKyAocGxheWVyLmJvZHkudG91Y2hpbmcubGVmdCA/IDUwIDogLTUwKSxcclxuICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgZWFzZTogXCJMaW5lYXJcIixcclxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhbldhbGxKdW1wID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgd2FsbEp1bXBUd2Vlbi5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmYWxsKCkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJmYWxsaW5nXCIsIHRydWUpO1xyXG4gICAgaXNKdW1waW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpZGxlKCkge1xyXG4gICAgcGxheWVyLmFuaW1zLnBsYXkoXCJpZGxlXCIsIHRydWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgcGxheWVyLCBmcmFtZSwgY3VycmVudEhlYWx0aCwgc2V0Q3VycmVudEhlYWx0aCwgZGVhZCwgY2FsY3VsYXRlU3Bhd24gfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImNyZWF0ZU1hcCIsImJhc2UiLCJwbGF0Zm9ybSIsImxlZnRQbGF0Zm9ybSIsInJpZ2h0UGxhdGZvcm0iLCJjcmVhdGVQbGF5ZXIiLCJwbGF5ZXIiLCJoYW5kbGVQbGF5ZXJNb3ZlbWVudCIsInNldEN1cnJlbnRIZWFsdGgiLCJkZWFkIiwiT3BQbGF5ZXIiLCJzb2NrZXQiLCJpbyIsInN0YXRpY1BhdGgiLCJnYW1lSWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwic3BsaXQiLCJmaWx0ZXIiLCJCb29sZWFuIiwicG9wIiwicGFydHlJZCIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInVzZXJuYW1lIiwiZ2V0Q29va2llIiwiY2hhcmFjdGVyIiwic3Bhd25QbGF0Zm9ybSIsInNwYXduIiwicGFydHlNZW1iZXJzIiwicGFydHlNZW1iZXJzTnVtIiwiTnVtYmVyIiwib3Bwb25lbnRQbGF5ZXJzIiwidGVhbVBsYXllcnMiLCJHYW1lU2NlbmUiLCJfUGhhc2VyJFNjZW5lIiwiX2luaGVyaXRzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsImFyZ3VtZW50cyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwicHJlbG9hZCIsImxvYWQiLCJpbWFnZSIsImNvbmNhdCIsImF0bGFzIiwidGlsZW1hcFRpbGVkSlNPTiIsImF1ZGlvIiwiY3JlYXRlIiwiX3RoaXMiLCJwaHlzaWNzIiwiYWRkIiwiY29sbGlkZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJ3aWR0aCIsInRleHRDb250ZW50IiwiZW1pdCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJ1c2VyVGVhbSIsInVzZXJQbGF5ZXIiLCJvcFRlYW0iLCJvcHBvbmVudFBsYXllciIsImVycm9yIiwiY29uc29sZSIsInNldFRpbWVvdXQiLCJmaWdodCIsIm9wYWNpdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJyZW1vdmUiLCJvbiIsIm9wcG9uZW50IiwieCIsInkiLCJmbGlwWCIsImZsaXAiLCJvcFBsYXllck5hbWUiLCJzZXRQb3NpdGlvbiIsImhlaWdodCIsImFuaW1zIiwicGxheSIsImFuaW1hdGlvbiIsInNjZW5lIiwicHJvamVjdGlsZSIsIndlYXBvbiIsInNldFNjYWxlIiwic2NhbGUiLCJzZXRWZWxvY2l0eSIsInZlbG9jaXR5Iiwic2V0QW5ndWxhclZlbG9jaXR5IiwiYW5ndWxhclZlbG9jaXR5IiwiYWxsb3dHcmF2aXR5IiwibmFtZSIsImxvZyIsImFkZE92ZXJsYXAiLCJ0ZWFtUGxheWVyIiwib2JqZWN0IiwibGVuZ3RoIiwidW5kZWZpbmVkIiwib3ZlcmxhcCIsIm9wQ3VycmVudEhlYWx0aCIsImRhbWFnZSIsInVwZGF0ZUhlYWx0aEJhciIsImRlc3Ryb3kiLCJhbHBoYSIsImdhbWVPdmVyIiwibG9zZXJzIiwiaW5jbHVkZXMiLCJjb2xvciIsImlucHV0IiwiZW5hYmxlZCIsImRpc3BsYXkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ1cGRhdGUiLCJjdXJyZW50QW5pbSIsIlBoYXNlciIsIlNjZW5lIiwiY29uZmlnIiwidHlwZSIsIkFVVE8iLCJtb2RlIiwiU2NhbGUiLCJGSVQiLCJhdXRvQ2VudGVyIiwiQ0VOVEVSX0JPVEgiLCJhcmNhZGUiLCJncmF2aXR5IiwiZGVidWciLCJyZW5kZXIiLCJhbnRpYWxpYXMiLCJnYW1lIiwiR2FtZSIsImNvb2tpZU5hbWUiLCJkZWNvZGVkQ29va2llIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiY29va2llIiwiY29va2llQXJyYXkiLCJpIiwidHJpbSIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImNlbnRlclgiLCJjYW1lcmFzIiwibWFpbiIsImJhY2tncm91bmQiLCJzcHJpdGUiLCJkaXNwbGF5V2lkdGgiLCJzeXMiLCJjYW52YXMiLCJkaXNwbGF5SGVpZ2h0Iiwic2V0T3JpZ2luIiwic2V0SW1tb3ZhYmxlIiwiY2FsY3VsYXRlU3Bhd24iLCJ0ZWFtIiwicGxheWVyc0luVGVhbSIsIm9wTWF4SGVhbHRoIiwib3BIZWFsdGhCYXJXaWR0aCIsImNyZWF0ZU9wUGxheWVyIiwib3BGcmFtZSIsImZyYW1lIiwic2V0U2l6ZSIsInNldE9mZnNldCIsInRleHQiLCJzZXRTdHlsZSIsImZvbnQiLCJmaWxsIiwib3BIZWFsdGhUZXh0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwic3Ryb2tlIiwic3Ryb2tlVGhpY2tuZXNzIiwib3BIZWFsdGhCYXIiLCJncmFwaGljcyIsImhlYWx0aEJhclkiLCJoZWFsdGhQZXJjZW50YWdlIiwiZGlzcGxheWVkV2lkdGgiLCJjbGVhciIsImhlYWx0aEJhclgiLCJzZXRUZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJsaW5lU3R5bGUiLCJzdHJva2VSb3VuZGVkUmVjdCIsImZpbGxSb3VuZGVkUmVjdCIsInNldERlcHRoIiwiZGVmYXVsdCIsImN1cnNvcnMiLCJjYW5XYWxsSnVtcCIsImlzTW92aW5nIiwiaXNKdW1waW5nIiwiaXNBdHRhY2tpbmciLCJjYW5BdHRhY2siLCJtYXhIZWFsdGgiLCJjdXJyZW50SGVhbHRoIiwiaGVhbHRoQmFyV2lkdGgiLCJoZWFsdGhCYXIiLCJoZWFsdGhUZXh0IiwicGxheWVyTmFtZSIsImluZGljYXRvclRyaWFuZ2xlIiwic2NlbmVQYXJhbSIsInNwYXduUGxhdGZvcm1QYXJhbSIsInNwYXduUGFyYW0iLCJwbGF5ZXJzSW5UZWFtUGFyYW0iLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJmcmFtZXMiLCJnZW5lcmF0ZUZyYW1lTmFtZXMiLCJwcmVmaXgiLCJlbmQiLCJ6ZXJvUGFkIiwiZnJhbWVSYXRlIiwicmVwZWF0IiwiZXZlbnRzIiwid29ybGQiLCJib3VuZHMiLCJib3R0b20iLCJ0cmlhbmdsZSIsIkdlb20iLCJUcmlhbmdsZSIsImZpbGxUcmlhbmdsZVNoYXBlIiwicG9pbnRlciIsInNodXJpa2VuU291bmQiLCJzb3VuZCIsInNldFZvbHVtZSIsInNldFJhdGUiLCJoaXRTb3VuZCIsInBsYXllcklkIiwiYXZhaWxhYmxlU3BhY2UiLCJsZWZ0TW9zdCIsImdldEJvdW5kcyIsImxlZnQiLCJzcGF3blkiLCJnZXRUb3BDZW50ZXIiLCJzcGF3blgiLCJzcGVlZCIsImp1bXBTcGVlZCIsImxlZnRLZXkiLCJpc0Rvd24iLCJhZGRLZXkiLCJyaWdodEtleSIsInJpZ2h0IiwidXBLZXkiLCJ1cCIsInNldFZlbG9jaXR5WCIsInRvdWNoaW5nIiwiZG93biIsInN0b3BNb3ZpbmciLCJqdW1wIiwid2FsbEp1bXAiLCJpc1BsYXlpbmciLCJmYWxsIiwiaWRsZSIsInNldFZlbG9jaXR5WSIsIndhbGxKdW1wVHdlZW4iLCJ0d2VlbnMiLCJ0YXJnZXRzIiwiZHVyYXRpb24iLCJlYXNlIiwib25Db21wbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=