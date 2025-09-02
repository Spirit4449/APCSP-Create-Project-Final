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
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookies */ "./src/lib/cookies.js");
// welcome.js


// Credits to https://www.w3schools.com/js/js_cookies.asp for helping with cookie code

document.addEventListener("DOMContentLoaded", function () {
  var nameForm = document.getElementById("nameForm");
  var nameInput = document.getElementById("nameInput");

  // Handle form submission
  nameForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    submitForm();
  });

  // Handle enter key press
  nameInput.addEventListener("keypress", function (event) {
    document.getElementById("name-taken").style.visibility = "hidden"; // Removes name-taken message when typing
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      submitForm();
    }
  });
  function submitForm() {
    var name = nameInput.value;
    if (name.trim() === "") {
      // Checks if a name has been supplied
      alert("Please enter your name."); // Alerts the user to pick a name
    } else {
      fetch("/create-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name
        })
      }).then(function (response) {
        if (response.ok) {
          (0,_lib_cookies__WEBPACK_IMPORTED_MODULE_0__.createCookie)("name", name); // Sets cookie to the name of the user
          if (document.referrer) {
            window.location.href = document.referrer; // If a page sent the user here, it will send the user back to that page
          } else {
            // Otherwise the user is sent to the default page location
            window.location.href = "/";
          }
        } else {
          document.getElementById("name-taken").style.visibility = "visible"; // If response is not ok that means the name is taken
        }
      })["catch"](function (error) {
        console.error("Error:", error);
      });
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDLE1BQU07TUFDTEMsS0FBSyxDQUFDLGNBQWMsRUFBRTtRQUNwQkMsTUFBTSxFQUFFLE1BQU07UUFDZEMsT0FBTyxFQUFFO1VBQ1AsY0FBYyxFQUFFO1FBQ2xCLENBQUM7UUFDREMsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztVQUFFbkUsSUFBSSxFQUFKQTtRQUFLLENBQUM7TUFDL0IsQ0FBQyxDQUFDLENBQ0NvRSxJQUFJLENBQUMsVUFBQ0MsUUFBUSxFQUFLO1FBQ2xCLElBQUlBLFFBQVEsQ0FBQ0MsRUFBRSxFQUFFO1VBQ2Y1QywwREFBWSxDQUFDLE1BQU0sRUFBRTFCLElBQUksQ0FBQyxDQUFDLENBQUM7VUFDNUIsSUFBSXlCLFFBQVEsQ0FBQzhDLFFBQVEsRUFBRTtZQUNyQnJELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDcUQsSUFBSSxHQUFHL0MsUUFBUSxDQUFDOEMsUUFBUSxDQUFDLENBQUM7VUFDNUMsQ0FBQyxNQUFNO1lBQ0w7WUFDQXJELE1BQU0sQ0FBQ0MsUUFBUSxDQUFDcUQsSUFBSSxHQUFHLEdBQUc7VUFDNUI7UUFDRixDQUFDLE1BQU07VUFDTC9DLFFBQVEsQ0FBQzJCLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQ0ssS0FBSyxDQUFDQyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDdEU7TUFDRixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUNlLEtBQUssRUFBSztRQUNoQkMsT0FBTyxDQUFDRCxLQUFLLENBQUMsUUFBUSxFQUFFQSxLQUFLLENBQUM7TUFDaEMsQ0FBQyxDQUFDO0lBQ047RUFDRjtBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9saWIvY29va2llcy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy93ZWxjb21lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvb2tpZXMuanNcclxuXHJcbmNvbnN0IERFRkFVTFRfUEFUSCA9IFwiL1wiO1xyXG5jb25zdCBERUZBVUxUX1NBTUVTSVRFID0gXCJMYXhcIjtcclxuXHJcbi8qKlxyXG4gKiBTZXQgYSBub24tSHR0cE9ubHkgY29va2llIGZyb20gdGhlIGJyb3dzZXIuXHJcbiAqIE5PVEU6IFlvdSBjYW5ub3Qgc2V0L2NsZWFyIHRoZSBzaWduZWQgSHR0cE9ubHkgaWRlbnRpdHkgY29va2llIChndWVzdF9pZC91c2VyX2lkKSBmcm9tIEpTLlxyXG4gKiBVc2UgYSBzZXJ2ZXIgZW5kcG9pbnQgKGUuZy4sIFBPU1QgL2xvZ291dCkgdG8gY2xlYXIgaWRlbnRpdHkgY29va2llcy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb29raWUoXHJcbiAgbmFtZSxcclxuICB2YWx1ZSxcclxuICB7XHJcbiAgICBkYXlzID0gMzAsICAgICAgICAgICAvLyBkZWZhdWx0IDMwIGRheXNcclxuICAgIHBhdGggPSBERUZBVUxUX1BBVEgsXHJcbiAgICBzYW1lU2l0ZSA9IERFRkFVTFRfU0FNRVNJVEUsIC8vIFwiTGF4XCIgYnkgZGVmYXVsdFxyXG4gICAgc2VjdXJlLCAgICAgICAgICAgICAgLy8gYXV0by10cnVlIG9uIEhUVFBTIGlmIG5vdCBwcm92aWRlZFxyXG4gIH0gPSB7fVxyXG4pIHtcclxuICBjb25zdCBtYXhBZ2UgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKGRheXMgKiAyNCAqIDYwICogNjApKTsgLy8gc2Vjb25kc1xyXG4gIGNvbnN0IGlzSHR0cHMgPVxyXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxyXG4gICAgd2luZG93LmxvY2F0aW9uICYmXHJcbiAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XHJcbiAgY29uc3QgdXNlU2VjdXJlID0gc2VjdXJlID8/IGlzSHR0cHM7XHJcblxyXG4gIGxldCBjb29raWUgPVxyXG4gICAgYCR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9OyBgICtcclxuICAgIGBNYXgtQWdlPSR7bWF4QWdlfTsgUGF0aD0ke3BhdGh9OyBTYW1lU2l0ZT0ke3NhbWVTaXRlfWA7XHJcblxyXG4gIGlmICh1c2VTZWN1cmUpIGNvb2tpZSArPSBcIjsgU2VjdXJlXCI7XHJcblxyXG4gIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcclxufVxyXG5cclxuLyoqIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgZm9yIGV4aXN0aW5nIGltcG9ydHMgKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvb2tpZSA9IHNldENvb2tpZTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBjb29raWUgdmFsdWUgYnkgbmFtZS4gUmV0dXJucyBcIlwiIGlmIG5vdCBmb3VuZCAoYmFja3dhcmQgY29tcGF0aWJsZSkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcclxuICBjb25zdCBuZWVkbGUgPSBgJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9PWA7XHJcbiAgY29uc3QgcmF3ID0gZG9jdW1lbnQuY29va2llIHx8IFwiXCI7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KFwiOyBcIik7XHJcbiAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XHJcbiAgICBpZiAocGFydC5zdGFydHNXaXRoKG5lZWRsZSkpIHtcclxuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXJ0LnNsaWNlKG5lZWRsZS5sZW5ndGgpKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWxldGUgYSBjb29raWUgYnkgbmFtZS5cclxuICogTk9URTogVGhpcyBjYW5ub3QgZGVsZXRlIEh0dHBPbmx5IGNvb2tpZXMgc2V0IGJ5IHRoZSBzZXJ2ZXI7IHVzZSBhIHNlcnZlciByb3V0ZSAoZS5nLiwgL2xvZ291dCkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQ29va2llKFxyXG4gIG5hbWUsXHJcbiAgeyBwYXRoID0gREVGQVVMVF9QQVRILCBzYW1lU2l0ZSA9IERFRkFVTFRfU0FNRVNJVEUsIHNlY3VyZSB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgaXNIdHRwcyA9XHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXHJcbiAgICB3aW5kb3cubG9jYXRpb24gJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcclxuICBjb25zdCB1c2VTZWN1cmUgPSBzZWN1cmUgPz8gaXNIdHRwcztcclxuXHJcbiAgbGV0IGNvb2tpZSA9XHJcbiAgICBgJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9PTsgTWF4LUFnZT0wOyBQYXRoPSR7cGF0aH07IFNhbWVTaXRlPSR7c2FtZVNpdGV9YDtcclxuICBpZiAodXNlU2VjdXJlKSBjb29raWUgKz0gXCI7IFNlY3VyZVwiO1xyXG4gIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcclxufVxyXG5cclxuLyoqIENvbnZlbmllbmNlIGhlbHBlciBmb3IgeW91ciBVSSBiYW5uZXIgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKCkge1xyXG4gIHJldHVybiBnZXRDb29raWUoXCJkaXNwbGF5X25hbWVcIikgfHwgXCJHdWVzdFwiO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gd2VsY29tZS5qc1xyXG5pbXBvcnQgeyBjcmVhdGVDb29raWUgfSBmcm9tIFwiLi9saWIvY29va2llc1wiO1xyXG5cclxuLy8gQ3JlZGl0cyB0byBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzL2pzX2Nvb2tpZXMuYXNwIGZvciBoZWxwaW5nIHdpdGggY29va2llIGNvZGVcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBuYW1lRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZUZvcm1cIik7XHJcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lSW5wdXRcIik7XHJcblxyXG4gIC8vIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cclxuICBuYW1lRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgc3VibWl0Rm9ybSgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBIYW5kbGUgZW50ZXIga2V5IHByZXNzXHJcbiAgbmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS10YWtlblwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgLy8gUmVtb3ZlcyBuYW1lLXRha2VuIG1lc3NhZ2Ugd2hlbiB0eXBpbmdcclxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50IGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXHJcbiAgICAgIHN1Ym1pdEZvcm0oKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc3VibWl0Rm9ybSgpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBpZiAobmFtZS50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgLy8gQ2hlY2tzIGlmIGEgbmFtZSBoYXMgYmVlbiBzdXBwbGllZFxyXG4gICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWUuXCIpOyAvLyBBbGVydHMgdGhlIHVzZXIgdG8gcGljayBhIG5hbWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZldGNoKFwiL2NyZWF0ZS1uYW1lXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBuYW1lIH0pLFxyXG4gICAgICB9KVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvb2tpZShcIm5hbWVcIiwgbmFtZSk7IC8vIFNldHMgY29va2llIHRvIHRoZSBuYW1lIG9mIHRoZSB1c2VyXHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlcikge1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQucmVmZXJyZXI7IC8vIElmIGEgcGFnZSBzZW50IHRoZSB1c2VyIGhlcmUsIGl0IHdpbGwgc2VuZCB0aGUgdXNlciBiYWNrIHRvIHRoYXQgcGFnZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0aGUgdXNlciBpcyBzZW50IHRvIHRoZSBkZWZhdWx0IHBhZ2UgbG9jYXRpb25cclxuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWUtdGFrZW5cIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiOyAvLyBJZiByZXNwb25zZSBpcyBub3Qgb2sgdGhhdCBtZWFucyB0aGUgbmFtZSBpcyB0YWtlblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTsiXSwibmFtZXMiOlsiREVGQVVMVF9QQVRIIiwiREVGQVVMVF9TQU1FU0lURSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsIl9yZWYiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcmVmJGRheXMiLCJkYXlzIiwiX3JlZiRwYXRoIiwicGF0aCIsIl9yZWYkc2FtZVNpdGUiLCJzYW1lU2l0ZSIsInNlY3VyZSIsIm1heEFnZSIsIk1hdGgiLCJtYXgiLCJmbG9vciIsImlzSHR0cHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwidXNlU2VjdXJlIiwiY29va2llIiwiY29uY2F0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVDb29raWUiLCJnZXRDb29raWUiLCJuZWVkbGUiLCJyYXciLCJwYXJ0cyIsInNwbGl0IiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInBhcnQiLCJzdGFydHNXaXRoIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2xpY2UiLCJlcnIiLCJlIiwiZiIsImRlbGV0ZUNvb2tpZSIsIl9yZWYyIiwiX3JlZjIkcGF0aCIsIl9yZWYyJHNhbWVTaXRlIiwiZ2V0RGlzcGxheU5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwibmFtZUZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIm5hbWVJbnB1dCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXRGb3JtIiwic3R5bGUiLCJ2aXNpYmlsaXR5Iiwia2V5IiwidHJpbSIsImFsZXJ0IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsInJlZmVycmVyIiwiaHJlZiIsImVycm9yIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=