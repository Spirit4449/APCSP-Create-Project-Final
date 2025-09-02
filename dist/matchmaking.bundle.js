/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/matchmaking.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookies */ "./src/lib/cookies.js");
// matchmaking.js


var socket = io("/");
function mmdbg(label) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    console.log("[MM][".concat(new Date().toISOString(), "] ").concat(label), data);
  } catch (e) {
    console.log("[MM] ".concat(label));
  }
}
mmdbg("matchmaking page load", {
  partyId: window.location.pathname
});
var partyId = window.location.pathname.split("/").filter(Boolean).pop();
socket.on("game-started", function (data) {
  mmdbg("recv game-started", {
    partyId: data.partyId,
    foundId: data.foundId,
    gameId: data.gameId
  });
  // If either the found team or owner team
  if (partyId === data.foundId || partyId === data.partyId) {
    for (var team in data.gameData) {
      // For each team
      for (var playerKey in data.gameData[team]) {
        // For each player
        var player = data.gameData[team][playerKey];
        if (player["name"] === (0,_lib_cookies__WEBPACK_IMPORTED_MODULE_0__.getCookie)("name")) {
          // If name
          // Set session variables
          sessionStorage.setItem("character", player["character"]);
          sessionStorage.setItem("spawnPlatform", player["spawnPlatform"]);
          sessionStorage.setItem("spawn", player["spawn"]);
          sessionStorage.setItem("party", data.foundId);
          sessionStorage.setItem("partyMembers", data.partyMembers);
          sessionStorage.setItem("map", data.map);
        }
      }
    }
    var membersToFind = sessionStorage.getItem("membersToFind");
    var playersFound = document.getElementById("players-found");
    // Set textcontent of matchmaking players
    playersFound.textContent = "Players Found: ".concat(membersToFind, "/").concat(membersToFind);
    setTimeout(function () {
      window.location = "/game/".concat(data.gameId);
      mmdbg("navigate game", {
        gameId: data.gameId
      });
    }, 500);
  }
});

// If a player leaves, redirects back to party
socket.on("matchmaking-disconnect", function (data) {
  console.log("Got the disconnect message");
  mmdbg("recv matchmaking-disconnect", data);
  if (partyId === data.partyId) {
    window.location.href = "/party/".concat(partyId);
  }
});

// Random color function to change color of background periodicaly
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    // Chooses a random 6 digit string
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to set a random color as background
function changeBackgroundColor() {
  var background = document.querySelector(".background"); // Gets background object
  var color = getRandomColor(); // Calls random color funciton
  background.style.backgroundColor = color; // Sets background color
}
document.addEventListener("DOMContentLoaded", function () {
  setInterval(changeBackgroundColor, 5000); // Every 5 seconds background color is changed
  changeBackgroundColor();
  var leave = document.getElementById("leave");
  leave.addEventListener("click", function (event) {
    window.history.back();
  });

  // Changes text of finding players header
  var findingPlayers = document.getElementById("finding-players");
  setInterval(function () {
    findingPlayers.textContent = changeText();
  }, 1000);
  function changeText() {
    dots = [".", "..", "..."];
    var randomIndex = Math.floor(Math.random() * dots.length); // Randomly selects a dot amount from the list
    var item = dots[randomIndex];
    var text = "Finding Players ".concat(item);
    return text;
  }
  var playersFound = document.getElementById("players-found");
  var members = sessionStorage.getItem("matchmakingMembers");
  var membersToFind = sessionStorage.getItem("membersToFind");
  playersFound.textContent = "Players Found: ".concat(members, "/").concat(membersToFind);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQU1FLElBQUksc0JBQUFoRixNQUFBLENBQXNCK0UsSUFBSSxDQUFFO0lBQ3RDLE9BQU9DLElBQUk7RUFDYjtFQUVBLElBQU0xQixZQUFZLEdBQUdwRCxRQUFRLENBQUNxRCxjQUFjLENBQUMsZUFBZSxDQUFDO0VBQzdELElBQU0wQixPQUFPLEdBQUdqQyxjQUFjLENBQUNLLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztFQUM1RCxJQUFNRCxhQUFhLEdBQUdKLGNBQWMsQ0FBQ0ssT0FBTyxDQUFDLGVBQWUsQ0FBQztFQUM3REMsWUFBWSxDQUFDRSxXQUFXLHFCQUFBeEQsTUFBQSxDQUFxQmlGLE9BQU8sT0FBQWpGLE1BQUEsQ0FBSW9ELGFBQWEsQ0FBRTtBQUN6RSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvbGliL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9zcmMvbWF0Y2htYWtpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29va2llcy5qc1xyXG5cclxuY29uc3QgREVGQVVMVF9QQVRIID0gXCIvXCI7XHJcbmNvbnN0IERFRkFVTFRfU0FNRVNJVEUgPSBcIkxheFwiO1xyXG5cclxuLyoqXHJcbiAqIFNldCBhIG5vbi1IdHRwT25seSBjb29raWUgZnJvbSB0aGUgYnJvd3Nlci5cclxuICogTk9URTogWW91IGNhbm5vdCBzZXQvY2xlYXIgdGhlIHNpZ25lZCBIdHRwT25seSBpZGVudGl0eSBjb29raWUgKGd1ZXN0X2lkL3VzZXJfaWQpIGZyb20gSlMuXHJcbiAqIFVzZSBhIHNlcnZlciBlbmRwb2ludCAoZS5nLiwgUE9TVCAvbG9nb3V0KSB0byBjbGVhciBpZGVudGl0eSBjb29raWVzLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShcclxuICBuYW1lLFxyXG4gIHZhbHVlLFxyXG4gIHtcclxuICAgIGRheXMgPSAzMCwgICAgICAgICAgIC8vIGRlZmF1bHQgMzAgZGF5c1xyXG4gICAgcGF0aCA9IERFRkFVTFRfUEFUSCxcclxuICAgIHNhbWVTaXRlID0gREVGQVVMVF9TQU1FU0lURSwgLy8gXCJMYXhcIiBieSBkZWZhdWx0XHJcbiAgICBzZWN1cmUsICAgICAgICAgICAgICAvLyBhdXRvLXRydWUgb24gSFRUUFMgaWYgbm90IHByb3ZpZGVkXHJcbiAgfSA9IHt9XHJcbikge1xyXG4gIGNvbnN0IG1heEFnZSA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoZGF5cyAqIDI0ICogNjAgKiA2MCkpOyAvLyBzZWNvbmRzXHJcbiAgY29uc3QgaXNIdHRwcyA9XHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXHJcbiAgICB3aW5kb3cubG9jYXRpb24gJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcclxuICBjb25zdCB1c2VTZWN1cmUgPSBzZWN1cmUgPz8gaXNIdHRwcztcclxuXHJcbiAgbGV0IGNvb2tpZSA9XHJcbiAgICBgJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07IGAgK1xyXG4gICAgYE1heC1BZ2U9JHttYXhBZ2V9OyBQYXRoPSR7cGF0aH07IFNhbWVTaXRlPSR7c2FtZVNpdGV9YDtcclxuXHJcbiAgaWYgKHVzZVNlY3VyZSkgY29va2llICs9IFwiOyBTZWN1cmVcIjtcclxuXHJcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xyXG59XHJcblxyXG4vKiogQmFja3dhcmQgY29tcGF0aWJpbGl0eSBmb3IgZXhpc3RpbmcgaW1wb3J0cyAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29va2llID0gc2V0Q29va2llO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhIGNvb2tpZSB2YWx1ZSBieSBuYW1lLiBSZXR1cm5zIFwiXCIgaWYgbm90IGZvdW5kIChiYWNrd2FyZCBjb21wYXRpYmxlKS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUobmFtZSkge1xyXG4gIGNvbnN0IG5lZWRsZSA9IGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09YDtcclxuICBjb25zdCByYXcgPSBkb2N1bWVudC5jb29raWUgfHwgXCJcIjtcclxuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgcGFydHMgPSByYXcuc3BsaXQoXCI7IFwiKTtcclxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcclxuICAgIGlmIChwYXJ0LnN0YXJ0c1dpdGgobmVlZGxlKSkge1xyXG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnQuc2xpY2UobmVlZGxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGNvb2tpZSBieSBuYW1lLlxyXG4gKiBOT1RFOiBUaGlzIGNhbm5vdCBkZWxldGUgSHR0cE9ubHkgY29va2llcyBzZXQgYnkgdGhlIHNlcnZlcjsgdXNlIGEgc2VydmVyIHJvdXRlIChlLmcuLCAvbG9nb3V0KS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDb29raWUoXHJcbiAgbmFtZSxcclxuICB7IHBhdGggPSBERUZBVUxUX1BBVEgsIHNhbWVTaXRlID0gREVGQVVMVF9TQU1FU0lURSwgc2VjdXJlIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBpc0h0dHBzID1cclxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbiAmJlxyXG4gICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xyXG4gIGNvbnN0IHVzZVNlY3VyZSA9IHNlY3VyZSA/PyBpc0h0dHBzO1xyXG5cclxuICBsZXQgY29va2llID1cclxuICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09OyBNYXgtQWdlPTA7IFBhdGg9JHtwYXRofTsgU2FtZVNpdGU9JHtzYW1lU2l0ZX1gO1xyXG4gIGlmICh1c2VTZWN1cmUpIGNvb2tpZSArPSBcIjsgU2VjdXJlXCI7XHJcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xyXG59XHJcblxyXG4vKiogQ29udmVuaWVuY2UgaGVscGVyIGZvciB5b3VyIFVJIGJhbm5lciAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoKSB7XHJcbiAgcmV0dXJuIGdldENvb2tpZShcImRpc3BsYXlfbmFtZVwiKSB8fCBcIkd1ZXN0XCI7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBtYXRjaG1ha2luZy5qc1xyXG5cclxuaW1wb3J0IHsgZ2V0Q29va2llIH0gZnJvbSBcIi4vbGliL2Nvb2tpZXNcIjtcclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5mdW5jdGlvbiBtbWRiZyhsYWJlbCwgZGF0YSA9IHt9KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnNvbGUubG9nKGBbTU1dWyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfV0gJHtsYWJlbH1gLCBkYXRhKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgW01NXSAke2xhYmVsfWApO1xyXG4gIH1cclxufVxyXG5tbWRiZyhcIm1hdGNobWFraW5nIHBhZ2UgbG9hZFwiLCB7IHBhcnR5SWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSB9KTtcclxuXHJcbmxldCBwYXJ0eUlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbikucG9wKCk7XHJcblxyXG5zb2NrZXQub24oXCJnYW1lLXN0YXJ0ZWRcIiwgKGRhdGEpID0+IHtcclxuICBtbWRiZyhcInJlY3YgZ2FtZS1zdGFydGVkXCIsIHtcclxuICAgIHBhcnR5SWQ6IGRhdGEucGFydHlJZCxcclxuICAgIGZvdW5kSWQ6IGRhdGEuZm91bmRJZCxcclxuICAgIGdhbWVJZDogZGF0YS5nYW1lSWQsXHJcbiAgfSk7XHJcbiAgLy8gSWYgZWl0aGVyIHRoZSBmb3VuZCB0ZWFtIG9yIG93bmVyIHRlYW1cclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5mb3VuZElkIHx8IHBhcnR5SWQgPT09IGRhdGEucGFydHlJZCkge1xyXG4gICAgZm9yIChjb25zdCB0ZWFtIGluIGRhdGEuZ2FtZURhdGEpIHtcclxuICAgICAgLy8gRm9yIGVhY2ggdGVhbVxyXG4gICAgICBmb3IgKGNvbnN0IHBsYXllcktleSBpbiBkYXRhLmdhbWVEYXRhW3RlYW1dKSB7XHJcbiAgICAgICAgLy8gRm9yIGVhY2ggcGxheWVyXHJcbiAgICAgICAgY29uc3QgcGxheWVyID0gZGF0YS5nYW1lRGF0YVt0ZWFtXVtwbGF5ZXJLZXldO1xyXG4gICAgICAgIGlmIChwbGF5ZXJbXCJuYW1lXCJdID09PSBnZXRDb29raWUoXCJuYW1lXCIpKSB7XHJcbiAgICAgICAgICAvLyBJZiBuYW1lXHJcbiAgICAgICAgICAvLyBTZXQgc2Vzc2lvbiB2YXJpYWJsZXNcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjaGFyYWN0ZXJcIiwgcGxheWVyW1wiY2hhcmFjdGVyXCJdKTtcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJzcGF3blBsYXRmb3JtXCIsIHBsYXllcltcInNwYXduUGxhdGZvcm1cIl0pO1xyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInNwYXduXCIsIHBsYXllcltcInNwYXduXCJdKTtcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJwYXJ0eVwiLCBkYXRhLmZvdW5kSWQpO1xyXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInBhcnR5TWVtYmVyc1wiLCBkYXRhLnBhcnR5TWVtYmVycyk7XHJcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibWFwXCIsIGRhdGEubWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IG1lbWJlcnNUb0ZpbmQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibWVtYmVyc1RvRmluZFwiKTtcclxuICAgIGNvbnN0IHBsYXllcnNGb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVycy1mb3VuZFwiKTtcclxuICAgIC8vIFNldCB0ZXh0Y29udGVudCBvZiBtYXRjaG1ha2luZyBwbGF5ZXJzXHJcbiAgICBwbGF5ZXJzRm91bmQudGV4dENvbnRlbnQgPSBgUGxheWVycyBGb3VuZDogJHttZW1iZXJzVG9GaW5kfS8ke21lbWJlcnNUb0ZpbmR9YDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSBgL2dhbWUvJHtkYXRhLmdhbWVJZH1gO1xyXG4gICAgICBtbWRiZyhcIm5hdmlnYXRlIGdhbWVcIiwgeyBnYW1lSWQ6IGRhdGEuZ2FtZUlkIH0pO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gSWYgYSBwbGF5ZXIgbGVhdmVzLCByZWRpcmVjdHMgYmFjayB0byBwYXJ0eVxyXG5zb2NrZXQub24oXCJtYXRjaG1ha2luZy1kaXNjb25uZWN0XCIsIChkYXRhKSA9PiB7XHJcbiAgY29uc29sZS5sb2coXCJHb3QgdGhlIGRpc2Nvbm5lY3QgbWVzc2FnZVwiKTtcclxuICBtbWRiZyhcInJlY3YgbWF0Y2htYWtpbmctZGlzY29ubmVjdFwiLCBkYXRhKTtcclxuICBpZiAocGFydHlJZCA9PT0gZGF0YS5wYXJ0eUlkKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvcGFydHkvJHtwYXJ0eUlkfWA7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG4vLyBSYW5kb20gY29sb3IgZnVuY3Rpb24gdG8gY2hhbmdlIGNvbG9yIG9mIGJhY2tncm91bmQgcGVyaW9kaWNhbHlcclxuZnVuY3Rpb24gZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgY29uc3QgbGV0dGVycyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xyXG4gIGxldCBjb2xvciA9IFwiI1wiO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAvLyBDaG9vc2VzIGEgcmFuZG9tIDYgZGlnaXQgc3RyaW5nXHJcbiAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XHJcbiAgfVxyXG4gIHJldHVybiBjb2xvcjtcclxufVxyXG5cclxuLy8gRnVuY3Rpb24gdG8gc2V0IGEgcmFuZG9tIGNvbG9yIGFzIGJhY2tncm91bmRcclxuZnVuY3Rpb24gY2hhbmdlQmFja2dyb3VuZENvbG9yKCkge1xyXG4gIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmRcIik7IC8vIEdldHMgYmFja2dyb3VuZCBvYmplY3RcclxuICBjb25zdCBjb2xvciA9IGdldFJhbmRvbUNvbG9yKCk7IC8vIENhbGxzIHJhbmRvbSBjb2xvciBmdW5jaXRvblxyXG4gIGJhY2tncm91bmQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7IC8vIFNldHMgYmFja2dyb3VuZCBjb2xvclxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgc2V0SW50ZXJ2YWwoY2hhbmdlQmFja2dyb3VuZENvbG9yLCA1MDAwKTsgLy8gRXZlcnkgNSBzZWNvbmRzIGJhY2tncm91bmQgY29sb3IgaXMgY2hhbmdlZFxyXG4gIGNoYW5nZUJhY2tncm91bmRDb2xvcigpO1xyXG5cclxuICBjb25zdCBsZWF2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVhdmVcIik7XHJcbiAgbGVhdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBDaGFuZ2VzIHRleHQgb2YgZmluZGluZyBwbGF5ZXJzIGhlYWRlclxyXG4gIGNvbnN0IGZpbmRpbmdQbGF5ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5kaW5nLXBsYXllcnNcIik7XHJcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgZmluZGluZ1BsYXllcnMudGV4dENvbnRlbnQgPSBjaGFuZ2VUZXh0KCk7XHJcbiAgfSwgMTAwMCk7XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVRleHQoKSB7XHJcbiAgICBkb3RzID0gW1wiLlwiLCBcIi4uXCIsIFwiLi4uXCJdO1xyXG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkb3RzLmxlbmd0aCk7IC8vIFJhbmRvbWx5IHNlbGVjdHMgYSBkb3QgYW1vdW50IGZyb20gdGhlIGxpc3RcclxuICAgIGNvbnN0IGl0ZW0gPSBkb3RzW3JhbmRvbUluZGV4XTtcclxuICAgIGNvbnN0IHRleHQgPSBgRmluZGluZyBQbGF5ZXJzICR7aXRlbX1gO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwbGF5ZXJzRm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcnMtZm91bmRcIik7XHJcbiAgY29uc3QgbWVtYmVycyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJtYXRjaG1ha2luZ01lbWJlcnNcIik7XHJcbiAgY29uc3QgbWVtYmVyc1RvRmluZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJtZW1iZXJzVG9GaW5kXCIpO1xyXG4gIHBsYXllcnNGb3VuZC50ZXh0Q29udGVudCA9IGBQbGF5ZXJzIEZvdW5kOiAke21lbWJlcnN9LyR7bWVtYmVyc1RvRmluZH1gO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIkRFRkFVTFRfUEFUSCIsIkRFRkFVTFRfU0FNRVNJVEUiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJfcmVmIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX3JlZiRkYXlzIiwiZGF5cyIsIl9yZWYkcGF0aCIsInBhdGgiLCJfcmVmJHNhbWVTaXRlIiwic2FtZVNpdGUiLCJzZWN1cmUiLCJtYXhBZ2UiLCJNYXRoIiwibWF4IiwiZmxvb3IiLCJpc0h0dHBzIiwid2luZG93IiwibG9jYXRpb24iLCJwcm90b2NvbCIsInVzZVNlY3VyZSIsImNvb2tpZSIsImNvbmNhdCIsImVuY29kZVVSSUNvbXBvbmVudCIsImRvY3VtZW50IiwiY3JlYXRlQ29va2llIiwiZ2V0Q29va2llIiwibmVlZGxlIiwicmF3IiwicGFydHMiLCJzcGxpdCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJwYXJ0Iiwic3RhcnRzV2l0aCIsImRlY29kZVVSSUNvbXBvbmVudCIsInNsaWNlIiwiZXJyIiwiZSIsImYiLCJkZWxldGVDb29raWUiLCJfcmVmMiIsIl9yZWYyJHBhdGgiLCJfcmVmMiRzYW1lU2l0ZSIsImdldERpc3BsYXlOYW1lIiwic29ja2V0IiwiaW8iLCJtbWRiZyIsImxhYmVsIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwidG9JU09TdHJpbmciLCJwYXJ0eUlkIiwicGF0aG5hbWUiLCJmaWx0ZXIiLCJCb29sZWFuIiwicG9wIiwib24iLCJmb3VuZElkIiwiZ2FtZUlkIiwidGVhbSIsImdhbWVEYXRhIiwicGxheWVyS2V5IiwicGxheWVyIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwicGFydHlNZW1iZXJzIiwibWFwIiwibWVtYmVyc1RvRmluZCIsImdldEl0ZW0iLCJwbGF5ZXJzRm91bmQiLCJnZXRFbGVtZW50QnlJZCIsInRleHRDb250ZW50Iiwic2V0VGltZW91dCIsImhyZWYiLCJnZXRSYW5kb21Db2xvciIsImxldHRlcnMiLCJjb2xvciIsImkiLCJyYW5kb20iLCJjaGFuZ2VCYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kIiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEludGVydmFsIiwibGVhdmUiLCJldmVudCIsImhpc3RvcnkiLCJiYWNrIiwiZmluZGluZ1BsYXllcnMiLCJjaGFuZ2VUZXh0IiwiZG90cyIsInJhbmRvbUluZGV4IiwiaXRlbSIsInRleHQiLCJtZW1iZXJzIl0sInNvdXJjZVJvb3QiOiIifQ==