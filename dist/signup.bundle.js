/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/accounts.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/accounts.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Shared styles for login and signup pages */

html,
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #1e1e2e, #26263a);
  min-height: 100vh;
  color: #e2e8f0;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.auth-card {
  background: linear-gradient(145deg, #2d3748, #4a5568);
  border: 2px solid #4a5568;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4a9eff, #6b46c1);
  border-radius: 12px 12px 0 0;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.subtitle {
  margin: 0 0 32px 0;
  font-size: 16px;
  color: #a0aec0;
  font-weight: 400;
}

.guest-info {
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;
  color: #e2e8f0;
}

.guest-name {
  font-weight: 600;
  color: #4a9eff;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #f7fafc;
  font-size: 14px;
}

.form-input {
  width: 100%;
  height: 48px;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid #4a5568;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  color: #e2e8f0;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4a9eff;
  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);
}

.form-input::placeholder {
  color: #a0aec0;
}

.auth-button {
  width: 100%;
  height: 48px;
  background: linear-gradient(145deg, #4a9eff, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
  margin-top: 8px;
}

.auth-button:hover {
  background: linear-gradient(145deg, #3182ce, #2c5aa0);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 158, 255, 0.4);
}

.auth-button:active {
  transform: translateY(0);
}

.auth-button:disabled {
  background: linear-gradient(145deg, #4a5568, #374151);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 15px;
  display: none;
}

.success-message {
  color: #10b981;
  font-size: 14px;
  margin-top: 8px;
  display: none;
}

.link-section {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-link {
  color: #a0aec0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.auth-link:hover {
  color: #4a9eff;
}

.back-link {
  margin-top: 5px;
  color: #a0aec0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #4a9eff;
}

/* Loading animation */
.loading {
  display: none;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive design */
@media (max-width: 480px) {
  .auth-card {
    padding: 30px 20px;
    margin: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles/accounts.css"],"names":[],"mappings":"AAAA,6CAA6C;;AAE7C;;EAEE,SAAS;EACT,kCAAkC;EAClC,qDAAqD;EACrD,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,kBAAkB;EAClB,sBAAsB;EACtB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,qDAAqD;EACrD,yBAAyB;EACzB,mBAAmB;EACnB,aAAa;EACb;2CACyC;EACzC,WAAW;EACX,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,QAAQ;EACR,WAAW;EACX,oDAAoD;EACpD,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,iBAAiB;EACjB,cAAc;EACd,2CAA2C;AAC7C;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,mCAAmC;EACnC,yCAAyC;EACzC,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,8BAA8B;EAC9B,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,cAAc;EACd,kCAAkC;EAClC,yBAAyB;EACzB,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,6CAA6C;AAC/C;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,qDAAqD;EACrD,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,yBAAyB;EACzB,gBAAgB;EAChB,eAAe;EACf,kCAAkC;EAClC,yBAAyB;EACzB,qBAAqB;EACrB,8CAA8C;EAC9C,eAAe;AACjB;;AAEA;EACE,qDAAqD;EACrD,2BAA2B;EAC3B,8CAA8C;AAChD;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,qDAAqD;EACrD,mBAAmB;EACnB,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,cAAc;EACd,eAAe;EACf,eAAe;EACf,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,cAAc;EACd,qBAAqB;EACrB,eAAe;EACf,2BAA2B;AAC7B;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,cAAc;EACd,qBAAqB;EACrB,eAAe;EACf,2BAA2B;AAC7B;;AAEA;EACE,cAAc;AAChB;;AAEA,sBAAsB;AACtB;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,0CAA0C;EAC1C,kBAAkB;EAClB,yBAAyB;EACzB,uCAAuC;EACvC,iBAAiB;AACnB;;AAEA;EACE;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA,sBAAsB;AACtB;EACE;IACE,kBAAkB;IAClB,YAAY;EACd;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,eAAe;EACjB;AACF","sourcesContent":["/* Shared styles for login and signup pages */\r\n\r\nhtml,\r\nbody {\r\n  margin: 0;\r\n  font-family: \"Poppins\", sans-serif;\r\n  background: linear-gradient(135deg, #1e1e2e, #26263a);\r\n  min-height: 100vh;\r\n  color: #e2e8f0;\r\n}\r\n\r\n.container {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  text-align: center;\r\n  flex-direction: column;\r\n  padding: 20px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.auth-card {\r\n  background: linear-gradient(145deg, #2d3748, #4a5568);\r\n  border: 2px solid #4a5568;\r\n  border-radius: 12px;\r\n  padding: 40px;\r\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8),\r\n    inset 0 1px 0 rgba(255, 255, 255, 0.06);\r\n  width: 100%;\r\n  max-width: 450px;\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n\r\n.auth-card::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  height: 4px;\r\n  background: linear-gradient(90deg, #4a9eff, #6b46c1);\r\n  border-radius: 12px 12px 0 0;\r\n}\r\n\r\nh1 {\r\n  margin: 0 0 8px 0;\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n  color: #ffffff;\r\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);\r\n}\r\n\r\n.subtitle {\r\n  margin: 0 0 32px 0;\r\n  font-size: 16px;\r\n  color: #a0aec0;\r\n  font-weight: 400;\r\n}\r\n\r\n.guest-info {\r\n  background: rgba(74, 158, 255, 0.1);\r\n  border: 1px solid rgba(74, 158, 255, 0.3);\r\n  border-radius: 8px;\r\n  padding: 16px;\r\n  margin-bottom: 32px;\r\n  color: #e2e8f0;\r\n}\r\n\r\n.guest-name {\r\n  font-weight: 600;\r\n  color: #4a9eff;\r\n}\r\n\r\n.form-group {\r\n  margin-bottom: 20px;\r\n  text-align: left;\r\n}\r\n\r\n.form-label {\r\n  display: block;\r\n  margin-bottom: 8px;\r\n  font-weight: 600;\r\n  color: #f7fafc;\r\n  font-size: 14px;\r\n}\r\n\r\n.form-input {\r\n  width: 100%;\r\n  height: 48px;\r\n  background: rgba(0, 0, 0, 0.2);\r\n  border: 2px solid #4a5568;\r\n  border-radius: 8px;\r\n  padding: 0 16px;\r\n  font-size: 16px;\r\n  color: #e2e8f0;\r\n  font-family: \"Poppins\", sans-serif;\r\n  transition: all 0.3s ease;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.form-input:focus {\r\n  outline: none;\r\n  border-color: #4a9eff;\r\n  box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.1);\r\n}\r\n\r\n.form-input::placeholder {\r\n  color: #a0aec0;\r\n}\r\n\r\n.auth-button {\r\n  width: 100%;\r\n  height: 48px;\r\n  background: linear-gradient(145deg, #4a9eff, #3182ce);\r\n  color: white;\r\n  border: none;\r\n  border-radius: 8px;\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  font-weight: 600;\r\n  font-size: 16px;\r\n  font-family: \"Poppins\", sans-serif;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);\r\n  margin-top: 8px;\r\n}\r\n\r\n.auth-button:hover {\r\n  background: linear-gradient(145deg, #3182ce, #2c5aa0);\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 8px 25px rgba(74, 158, 255, 0.4);\r\n}\r\n\r\n.auth-button:active {\r\n  transform: translateY(0);\r\n}\r\n\r\n.auth-button:disabled {\r\n  background: linear-gradient(145deg, #4a5568, #374151);\r\n  cursor: not-allowed;\r\n  transform: none;\r\n  box-shadow: none;\r\n}\r\n\r\n.error-message {\r\n  color: #ef4444;\r\n  font-size: 14px;\r\n  margin-top: 15px;\r\n  display: none;\r\n}\r\n\r\n.success-message {\r\n  color: #10b981;\r\n  font-size: 14px;\r\n  margin-top: 8px;\r\n  display: none;\r\n}\r\n\r\n.link-section {\r\n  margin-top: 15px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n}\r\n\r\n.auth-link {\r\n  color: #a0aec0;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  transition: color 0.3s ease;\r\n}\r\n\r\n.auth-link:hover {\r\n  color: #4a9eff;\r\n}\r\n\r\n.back-link {\r\n  margin-top: 5px;\r\n  color: #a0aec0;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  transition: color 0.3s ease;\r\n}\r\n\r\n.back-link:hover {\r\n  color: #4a9eff;\r\n}\r\n\r\n/* Loading animation */\r\n.loading {\r\n  display: none;\r\n  width: 20px;\r\n  height: 20px;\r\n  border: 2px solid rgba(255, 255, 255, 0.3);\r\n  border-radius: 50%;\r\n  border-top-color: #ffffff;\r\n  animation: spin 1s ease-in-out infinite;\r\n  margin-right: 8px;\r\n}\r\n\r\n@keyframes spin {\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.button-content {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n/* Responsive design */\r\n@media (max-width: 480px) {\r\n  .auth-card {\r\n    padding: 30px 20px;\r\n    margin: 10px;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 24px;\r\n  }\r\n\r\n  .subtitle {\r\n    font-size: 14px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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

/***/ "./src/styles/accounts.css":
/*!*********************************!*\
  !*** ./src/styles/accounts.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_accounts_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./accounts.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/accounts.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_accounts_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_accounts_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_accounts_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_accounts_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/signup.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_cookies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookies.js */ "./src/lib/cookies.js");
/* harmony import */ var _styles_accounts_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/accounts.css */ "./src/styles/accounts.css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



// -----------------------------
// Config (mirror server rules)
// -----------------------------
var USERNAME_RE = /^[a-zA-Z0-9_.-]{3,14}$/;
var MIN_PW = 6;
var MAX_PW = 32;

// -----------------------------
// DOM
// -----------------------------
var form = document.getElementById("signupForm");
var signupBtn = document.getElementById("signupBtn");
var loading = document.getElementById("loading");
var buttonText = document.getElementById("buttonText");
var errorMessage = document.getElementById("errorMessage");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");

// Display current guest name (server uses "display_name")
document.getElementById("guestName").textContent = (0,_lib_cookies_js__WEBPACK_IMPORTED_MODULE_0__.getDisplayName)();

// Accessibility hint for errors
errorMessage.setAttribute("role", "alert");
errorMessage.setAttribute("aria-live", "polite");

// -----------------------------
// Helpers
// -----------------------------
function setLoading(isLoading) {
  signupBtn.disabled = isLoading;
  loading.style.display = isLoading ? "block" : "none";
  buttonText.textContent = isLoading ? "Creating..." : "Create Account";
}
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}
function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}
function clientValidate(username, password) {
  if (!username || !password) {
    return "Username and password are required.";
  }
  if (!USERNAME_RE.test(username)) {
    return "Username must be 3–14 chars: letters, numbers, _ . - only.";
  }
  if (password.length < MIN_PW || password.length > MAX_PW) {
    return "Password must be ".concat(MIN_PW, "\u2013").concat(MAX_PW, " characters.");
  }
  return null;
}

// Optional: inline validation UX
function markValidity() {
  // Username
  var u = usernameInput.value.trim();
  if (!u || !USERNAME_RE.test(u)) {
    usernameInput.setCustomValidity("Username must be 3–14 chars: letters, numbers, _ . - only.");
  } else {
    usernameInput.setCustomValidity("");
  }
  // Password
  var p = passwordInput.value;
  if (!p || p.length < MIN_PW || p.length > MAX_PW) {
    passwordInput.setCustomValidity("Password must be ".concat(MIN_PW, "\u2013").concat(MAX_PW, " characters."));
  } else {
    passwordInput.setCustomValidity("");
  }
}
usernameInput.addEventListener("input", markValidity);
passwordInput.addEventListener("input", markValidity);

// -----------------------------
// Submit
// -----------------------------
form.addEventListener("submit", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var username, password, validationError, _data, _data2, _data3, response, data, msg;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          hideError();
          username = usernameInput.value.trim();
          password = passwordInput.value;
          validationError = clientValidate(username, password);
          if (!validationError) {
            _context.next = 8;
            break;
          }
          showError(validationError);
          return _context.abrupt("return");
        case 8:
          setLoading(true);
          _context.prev = 9;
          _context.next = 12;
          return fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            // Server only expects username/password; guest session comes from cookies.
            body: JSON.stringify({
              username: username,
              password: password
            }),
            credentials: "same-origin"
          });
        case 12:
          response = _context.sent;
          // Attempt to parse body even on non-2xx (server returns JSON errors)
          data = null;
          _context.prev = 14;
          _context.next = 17;
          return response.json();
        case 17:
          data = _context.sent;
          _context.next = 22;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](14);
        case 22:
          if (!(response.ok && (_data = data) !== null && _data !== void 0 && _data.success)) {
            _context.next = 26;
            break;
          }
          buttonText.textContent = "Account Created!";
          // Give cookies a tick to update, then go home
          setTimeout(function () {
            window.location.href = "/";
          }, 600);
          return _context.abrupt("return");
        case 26:
          // Map known server responses to user-friendly messages
          // Status-driven defaults:
          msg = ((_data2 = data) === null || _data2 === void 0 ? void 0 : _data2.error) || (response.status === 409 ? "That username is taken. Try another." : response.status === 400 ? "Invalid signup request." : "Failed to create account."); // Fine-grained messages from your server’s /signup code
          _context.t1 = (_data3 = data) === null || _data3 === void 0 ? void 0 : _data3.error;
          _context.next = _context.t1 === "Username and password are required." ? 30 : _context.t1 === "Username must be 3-14 chars: letters, numbers, _ . - only." ? 32 : _context.t1 === "Password must be ".concat(MIN_PW, "-").concat(MAX_PW, " characters.") ? 34 : _context.t1 === "Guest session not found." ? 36 : _context.t1 === "This account is already permanent." ? 38 : _context.t1 === "Username is already taken." ? 40 : _context.t1 === "Unable to complete signup. Please try again." ? 42 : 44;
          break;
        case 30:
          msg = "Username and password are required.";
          return _context.abrupt("break", 45);
        case 32:
          msg = "Username must be 3–14 chars: letters, numbers, _ . - only.";
          return _context.abrupt("break", 45);
        case 34:
          msg = "Password must be ".concat(MIN_PW, "\u2013").concat(MAX_PW, " characters.");
          return _context.abrupt("break", 45);
        case 36:
          msg = "Guest session not found. Go to the main page and try again.";
          return _context.abrupt("break", 45);
        case 38:
          msg = "This account is already permanent. You can log in instead.";
          return _context.abrupt("break", 45);
        case 40:
          msg = "That username is taken. Try another.";
          return _context.abrupt("break", 45);
        case 42:
          msg = "Could not complete signup. Please try again.";
          return _context.abrupt("break", 45);
        case 44:
          return _context.abrupt("break", 45);
        case 45:
          showError(msg);
          _context.next = 51;
          break;
        case 48:
          _context.prev = 48;
          _context.t2 = _context["catch"](9);
          showError("Network error. Please check your connection and try again.");
        case 51:
          _context.prev = 51;
          setLoading(false);
          return _context.finish(51);
        case 54:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 48, 51, 54], [14, 20]]);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

// Auto-focus username field
usernameInput.focus();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUM2RztBQUNqQjtBQUM1Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxrR0FBa0csT0FBTyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLEtBQUssT0FBTyxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZ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UUFBQTtVQUduRVAsR0FBRyx1QkFBQWxILE1BQUEsQ0FBdUI2RSxNQUFNLFlBQUE3RSxNQUFBLENBQUk4RSxNQUFNLGlCQUFjO1VBQUMsT0FBQXVDLFFBQUEsQ0FBQUksTUFBQTtRQUFBO1VBR3pEUCxHQUFHLEdBQUcsNkRBQTZEO1VBQUMsT0FBQUcsUUFBQSxDQUFBSSxNQUFBO1FBQUE7VUFHcEVQLEdBQUcsR0FBRyw0REFBNEQ7VUFBQyxPQUFBRyxRQUFBLENBQUFJLE1BQUE7UUFBQTtVQUduRVAsR0FBRyxHQUFHLHNDQUFzQztVQUFDLE9BQUFHLFFBQUEsQ0FBQUksTUFBQTtRQUFBO1VBRzdDUCxHQUFHLEdBQUcsOENBQThDO1VBQUMsT0FBQUcsUUFBQSxDQUFBSSxNQUFBO1FBQUE7VUFBQSxPQUFBSixRQUFBLENBQUFJLE1BQUE7UUFBQTtVQU96RDNCLFNBQVMsQ0FBQ29CLEdBQUcsQ0FBQztVQUFDRyxRQUFBLENBQUFFLElBQUE7VUFBQTtRQUFBO1VBQUFGLFFBQUEsQ0FBQUMsSUFBQTtVQUFBRCxRQUFBLENBQUFzQixFQUFBLEdBQUF0QixRQUFBO1VBRWZ2QixTQUFTLENBQUMsNERBQTRELENBQUM7UUFBQztVQUFBdUIsUUFBQSxDQUFBQyxJQUFBO1VBRXhFN0IsVUFBVSxDQUFDLEtBQUssQ0FBQztVQUFDLE9BQUE0QixRQUFBLENBQUF1QixNQUFBO1FBQUE7UUFBQTtVQUFBLE9BQUF2QixRQUFBLENBQUF3QixJQUFBO01BQUE7SUFBQSxHQUFBbEMsT0FBQTtFQUFBLENBRXJCO0VBQUEsaUJBQUFtQyxFQUFBO0lBQUEsT0FBQW5LLElBQUEsQ0FBQThGLEtBQUEsT0FBQTdGLFNBQUE7RUFBQTtBQUFBLElBQUM7O0FBRUY7QUFDQXlHLGFBQWEsQ0FBQzBELEtBQUssQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL3N0eWxlcy9hY2NvdW50cy5jc3MiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC8uL3NyYy9saWIvY29va2llcy5qcyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL3N0eWxlcy9hY2NvdW50cy5jc3M/NjI5MyIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXBjc3AtY3JlYXRlLXByb2plY3QtLS1maW5hbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FwY3NwLWNyZWF0ZS1wcm9qZWN0LS0tZmluYWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9hcGNzcC1jcmVhdGUtcHJvamVjdC0tLWZpbmFsLy4vc3JjL3NpZ251cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyogU2hhcmVkIHN0eWxlcyBmb3IgbG9naW4gYW5kIHNpZ251cCBwYWdlcyAqL1xyXG5cclxuaHRtbCxcclxuYm9keSB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgc2Fucy1zZXJpZjtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWUxZTJlLCAjMjYyNjNhKTtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICBjb2xvcjogI2UyZThmMDtcclxufVxyXG5cclxuLmNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEwMHZ3O1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmF1dGgtY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzJkMzc0OCwgIzRhNTU2OCk7XHJcbiAgYm9yZGVyOiAycHggc29saWQgIzRhNTU2ODtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDQwcHg7XHJcbiAgYm94LXNoYWRvdzogMCAyMHB4IDUwcHggcmdiYSgwLCAwLCAwLCAwLjgpLFxyXG4gICAgaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDYpO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNDUwcHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5hdXRoLWNhcmQ6OmJlZm9yZSB7XHJcbiAgY29udGVudDogXCJcIjtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgaGVpZ2h0OiA0cHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNGE5ZWZmLCAjNmI0NmMxKTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4IDEycHggMCAwO1xyXG59XHJcblxyXG5oMSB7XHJcbiAgbWFyZ2luOiAwIDAgOHB4IDA7XHJcbiAgZm9udC1zaXplOiAyOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIHRleHQtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XHJcbn1cclxuXHJcbi5zdWJ0aXRsZSB7XHJcbiAgbWFyZ2luOiAwIDAgMzJweCAwO1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBjb2xvcjogI2EwYWVjMDtcclxuICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcblxyXG4uZ3Vlc3QtaW5mbyB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSg3NCwgMTU4LCAyNTUsIDAuMSk7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg3NCwgMTU4LCAyNTUsIDAuMyk7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcclxuICBjb2xvcjogI2UyZThmMDtcclxufVxyXG5cclxuLmd1ZXN0LW5hbWUge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6ICM0YTllZmY7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuXHJcbi5mb3JtLWxhYmVsIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2Y3ZmFmYztcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5mb3JtLWlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjIpO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICM0YTU1Njg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDAgMTZweDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgY29sb3I6ICNlMmU4ZjA7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBzYW5zLXNlcmlmO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmZvcm0taW5wdXQ6Zm9jdXMge1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyLWNvbG9yOiAjNGE5ZWZmO1xyXG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDc0LCAxNTgsIDI1NSwgMC4xKTtcclxufVxyXG5cclxuLmZvcm0taW5wdXQ6OnBsYWNlaG9sZGVyIHtcclxuICBjb2xvcjogI2EwYWVjMDtcclxufVxyXG5cclxuLmF1dGgtYnV0dG9uIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzRhOWVmZiwgIzMxODJjZSk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBzYW5zLXNlcmlmO1xyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSg3NCwgMTU4LCAyNTUsIDAuMyk7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG59XHJcblxyXG4uYXV0aC1idXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMzMTgyY2UsICMyYzVhYTApO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICBib3gtc2hhZG93OiAwIDhweCAyNXB4IHJnYmEoNzQsIDE1OCwgMjU1LCAwLjQpO1xyXG59XHJcblxyXG4uYXV0aC1idXR0b246YWN0aXZlIHtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbn1cclxuXHJcbi5hdXRoLWJ1dHRvbjpkaXNhYmxlZCB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzRhNTU2OCwgIzM3NDE1MSk7XHJcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcclxuICB0cmFuc2Zvcm06IG5vbmU7XHJcbiAgYm94LXNoYWRvdzogbm9uZTtcclxufVxyXG5cclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gIGNvbG9yOiAjZWY0NDQ0O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5zdWNjZXNzLW1lc3NhZ2Uge1xyXG4gIGNvbG9yOiAjMTBiOTgxO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmxpbmstc2VjdGlvbiB7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiA4cHg7XHJcbn1cclxuXHJcbi5hdXRoLWxpbmsge1xyXG4gIGNvbG9yOiAjYTBhZWMwO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uYXV0aC1saW5rOmhvdmVyIHtcclxuICBjb2xvcjogIzRhOWVmZjtcclxufVxyXG5cclxuLmJhY2stbGluayB7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIGNvbG9yOiAjYTBhZWMwO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uYmFjay1saW5rOmhvdmVyIHtcclxuICBjb2xvcjogIzRhOWVmZjtcclxufVxyXG5cclxuLyogTG9hZGluZyBhbmltYXRpb24gKi9cclxuLmxvYWRpbmcge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm9yZGVyLXRvcC1jb2xvcjogI2ZmZmZmZjtcclxuICBhbmltYXRpb246IHNwaW4gMXMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XHJcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgdG8ge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICB9XHJcbn1cclxuXHJcbi5idXR0b24tY29udGVudCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4vKiBSZXNwb25zaXZlIGRlc2lnbiAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuYXV0aC1jYXJkIHtcclxuICAgIHBhZGRpbmc6IDMwcHggMjBweDtcclxuICAgIG1hcmdpbjogMTBweDtcclxuICB9XHJcblxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICB9XHJcblxyXG4gIC5zdWJ0aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgfVxyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9hY2NvdW50cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsNkNBQTZDOztBQUU3Qzs7RUFFRSxTQUFTO0VBQ1Qsa0NBQWtDO0VBQ2xDLHFEQUFxRDtFQUNyRCxpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscURBQXFEO0VBQ3JELHlCQUF5QjtFQUN6QixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiOzJDQUN5QztFQUN6QyxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsUUFBUTtFQUNSLFdBQVc7RUFDWCxvREFBb0Q7RUFDcEQsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsY0FBYztFQUNkLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyx5Q0FBeUM7RUFDekMsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWiw4QkFBOEI7RUFDOUIseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZUFBZTtFQUNmLGNBQWM7RUFDZCxrQ0FBa0M7RUFDbEMseUJBQXlCO0VBQ3pCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oscURBQXFEO0VBQ3JELFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQ0FBa0M7RUFDbEMseUJBQXlCO0VBQ3pCLHFCQUFxQjtFQUNyQiw4Q0FBOEM7RUFDOUMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHFEQUFxRDtFQUNyRCwyQkFBMkI7RUFDM0IsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UscURBQXFEO0VBQ3JELG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsY0FBYztFQUNkLGVBQWU7RUFDZixlQUFlO0VBQ2YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsWUFBWTtFQUNaLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHVDQUF1QztFQUN2QyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRTtJQUNFLHlCQUF5QjtFQUMzQjtBQUNGOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0U7SUFDRSxrQkFBa0I7SUFDbEIsWUFBWTtFQUNkOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBTaGFyZWQgc3R5bGVzIGZvciBsb2dpbiBhbmQgc2lnbnVwIHBhZ2VzICovXFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUG9wcGluc1xcXCIsIHNhbnMtc2VyaWY7XFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWUxZTJlLCAjMjYyNjNhKTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgY29sb3I6ICNlMmU4ZjA7XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi5hdXRoLWNhcmQge1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzJkMzc0OCwgIzRhNTU2OCk7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCAjNGE1NTY4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDQwcHg7XFxyXFxuICBib3gtc2hhZG93OiAwIDIwcHggNTBweCByZ2JhKDAsIDAsIDAsIDAuOCksXFxyXFxuICAgIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWF4LXdpZHRoOiA0NTBweDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5hdXRoLWNhcmQ6OmJlZm9yZSB7XFxyXFxuICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIGhlaWdodDogNHB4O1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNGE5ZWZmLCAjNmI0NmMxKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEycHggMTJweCAwIDA7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIG1hcmdpbjogMCAwIDhweCAwO1xcclxcbiAgZm9udC1zaXplOiAyOHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjb2xvcjogI2ZmZmZmZjtcXHJcXG4gIHRleHQtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBtYXJnaW46IDAgMCAzMnB4IDA7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBjb2xvcjogI2EwYWVjMDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxyXFxufVxcclxcblxcclxcbi5ndWVzdC1pbmZvIHtcXHJcXG4gIGJhY2tncm91bmQ6IHJnYmEoNzQsIDE1OCwgMjU1LCAwLjEpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg3NCwgMTU4LCAyNTUsIDAuMyk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxyXFxuICBwYWRkaW5nOiAxNnB4O1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcXHJcXG4gIGNvbG9yOiAjZTJlOGYwO1xcclxcbn1cXHJcXG5cXHJcXG4uZ3Vlc3QtbmFtZSB7XFxyXFxuICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgY29sb3I6ICM0YTllZmY7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLWdyb3VwIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS1sYWJlbCB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIG1hcmdpbi1ib3R0b206IDhweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBjb2xvcjogI2Y3ZmFmYztcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcm0taW5wdXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDQ4cHg7XFxyXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCAjNGE1NTY4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcclxcbiAgcGFkZGluZzogMCAxNnB4O1xcclxcbiAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgY29sb3I6ICNlMmU4ZjA7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlBvcHBpbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLWlucHV0OmZvY3VzIHtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBib3JkZXItY29sb3I6ICM0YTllZmY7XFxyXFxuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg3NCwgMTU4LCAyNTUsIDAuMSk7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLWlucHV0OjpwbGFjZWhvbGRlciB7XFxyXFxuICBjb2xvcjogI2EwYWVjMDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGgtYnV0dG9uIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiA0OHB4O1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE0NWRlZywgIzRhOWVmZiwgIzMxODJjZSk7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUG9wcGluc1xcXCIsIHNhbnMtc2VyaWY7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcclxcbiAgYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDc0LCAxNTgsIDI1NSwgMC4zKTtcXHJcXG4gIG1hcmdpbi10b3A6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGgtYnV0dG9uOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsICMzMTgyY2UsICMyYzVhYTApO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xcclxcbiAgYm94LXNoYWRvdzogMCA4cHggMjVweCByZ2JhKDc0LCAxNTgsIDI1NSwgMC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGgtYnV0dG9uOmFjdGl2ZSB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxyXFxufVxcclxcblxcclxcbi5hdXRoLWJ1dHRvbjpkaXNhYmxlZCB7XFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCAjNGE1NTY4LCAjMzc0MTUxKTtcXHJcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxyXFxuICB0cmFuc2Zvcm06IG5vbmU7XFxyXFxuICBib3gtc2hhZG93OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3ItbWVzc2FnZSB7XFxyXFxuICBjb2xvcjogI2VmNDQ0NDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VjY2Vzcy1tZXNzYWdlIHtcXHJcXG4gIGNvbG9yOiAjMTBiOTgxO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgbWFyZ2luLXRvcDogOHB4O1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxpbmstc2VjdGlvbiB7XFxyXFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGgtbGluayB7XFxyXFxuICBjb2xvcjogI2EwYWVjMDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGgtbGluazpob3ZlciB7XFxyXFxuICBjb2xvcjogIzRhOWVmZjtcXHJcXG59XFxyXFxuXFxyXFxuLmJhY2stbGluayB7XFxyXFxuICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICBjb2xvcjogI2EwYWVjMDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhY2stbGluazpob3ZlciB7XFxyXFxuICBjb2xvcjogIzRhOWVmZjtcXHJcXG59XFxyXFxuXFxyXFxuLyogTG9hZGluZyBhbmltYXRpb24gKi9cXHJcXG4ubG9hZGluZyB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgd2lkdGg6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBib3JkZXItdG9wLWNvbG9yOiAjZmZmZmZmO1xcclxcbiAgYW5pbWF0aW9uOiBzcGluIDFzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3BpbiB7XFxyXFxuICB0byB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5idXR0b24tY29udGVudCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZXNwb25zaXZlIGRlc2lnbiAqL1xcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xcclxcbiAgLmF1dGgtY2FyZCB7XFxyXFxuICAgIHBhZGRpbmc6IDMwcHggMjBweDtcXHJcXG4gICAgbWFyZ2luOiAxMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgaDEge1xcclxcbiAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuc3VidGl0bGUge1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBjb29raWVzLmpzXHJcblxyXG5jb25zdCBERUZBVUxUX1BBVEggPSBcIi9cIjtcclxuY29uc3QgREVGQVVMVF9TQU1FU0lURSA9IFwiTGF4XCI7XHJcblxyXG4vKipcclxuICogU2V0IGEgbm9uLUh0dHBPbmx5IGNvb2tpZSBmcm9tIHRoZSBicm93c2VyLlxyXG4gKiBOT1RFOiBZb3UgY2Fubm90IHNldC9jbGVhciB0aGUgc2lnbmVkIEh0dHBPbmx5IGlkZW50aXR5IGNvb2tpZSAoZ3Vlc3RfaWQvdXNlcl9pZCkgZnJvbSBKUy5cclxuICogVXNlIGEgc2VydmVyIGVuZHBvaW50IChlLmcuLCBQT1NUIC9sb2dvdXQpIHRvIGNsZWFyIGlkZW50aXR5IGNvb2tpZXMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29va2llKFxyXG4gIG5hbWUsXHJcbiAgdmFsdWUsXHJcbiAge1xyXG4gICAgZGF5cyA9IDMwLCAgICAgICAgICAgLy8gZGVmYXVsdCAzMCBkYXlzXHJcbiAgICBwYXRoID0gREVGQVVMVF9QQVRILFxyXG4gICAgc2FtZVNpdGUgPSBERUZBVUxUX1NBTUVTSVRFLCAvLyBcIkxheFwiIGJ5IGRlZmF1bHRcclxuICAgIHNlY3VyZSwgICAgICAgICAgICAgIC8vIGF1dG8tdHJ1ZSBvbiBIVFRQUyBpZiBub3QgcHJvdmlkZWRcclxuICB9ID0ge31cclxuKSB7XHJcbiAgY29uc3QgbWF4QWdlID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihkYXlzICogMjQgKiA2MCAqIDYwKSk7IC8vIHNlY29uZHNcclxuICBjb25zdCBpc0h0dHBzID1cclxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgIHdpbmRvdy5sb2NhdGlvbiAmJlxyXG4gICAgd2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xyXG4gIGNvbnN0IHVzZVNlY3VyZSA9IHNlY3VyZSA/PyBpc0h0dHBzO1xyXG5cclxuICBsZXQgY29va2llID1cclxuICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX09JHtlbmNvZGVVUklDb21wb25lbnQodmFsdWUpfTsgYCArXHJcbiAgICBgTWF4LUFnZT0ke21heEFnZX07IFBhdGg9JHtwYXRofTsgU2FtZVNpdGU9JHtzYW1lU2l0ZX1gO1xyXG5cclxuICBpZiAodXNlU2VjdXJlKSBjb29raWUgKz0gXCI7IFNlY3VyZVwiO1xyXG5cclxuICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XHJcbn1cclxuXHJcbi8qKiBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciBleGlzdGluZyBpbXBvcnRzICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDb29raWUgPSBzZXRDb29raWU7XHJcblxyXG4vKipcclxuICogR2V0IGEgY29va2llIHZhbHVlIGJ5IG5hbWUuIFJldHVybnMgXCJcIiBpZiBub3QgZm91bmQgKGJhY2t3YXJkIGNvbXBhdGlibGUpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XHJcbiAgY29uc3QgbmVlZGxlID0gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT1gO1xyXG4gIGNvbnN0IHJhdyA9IGRvY3VtZW50LmNvb2tpZSB8fCBcIlwiO1xyXG4gIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBwYXJ0cyA9IHJhdy5zcGxpdChcIjsgXCIpO1xyXG4gIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xyXG4gICAgaWYgKHBhcnQuc3RhcnRzV2l0aChuZWVkbGUpKSB7XHJcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFydC5zbGljZShuZWVkbGUubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogRGVsZXRlIGEgY29va2llIGJ5IG5hbWUuXHJcbiAqIE5PVEU6IFRoaXMgY2Fubm90IGRlbGV0ZSBIdHRwT25seSBjb29raWVzIHNldCBieSB0aGUgc2VydmVyOyB1c2UgYSBzZXJ2ZXIgcm91dGUgKGUuZy4sIC9sb2dvdXQpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZShcclxuICBuYW1lLFxyXG4gIHsgcGF0aCA9IERFRkFVTFRfUEFUSCwgc2FtZVNpdGUgPSBERUZBVUxUX1NBTUVTSVRFLCBzZWN1cmUgfSA9IHt9XHJcbikge1xyXG4gIGNvbnN0IGlzSHR0cHMgPVxyXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxyXG4gICAgd2luZG93LmxvY2F0aW9uICYmXHJcbiAgICB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XHJcbiAgY29uc3QgdXNlU2VjdXJlID0gc2VjdXJlID8/IGlzSHR0cHM7XHJcblxyXG4gIGxldCBjb29raWUgPVxyXG4gICAgYCR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT07IE1heC1BZ2U9MDsgUGF0aD0ke3BhdGh9OyBTYW1lU2l0ZT0ke3NhbWVTaXRlfWA7XHJcbiAgaWYgKHVzZVNlY3VyZSkgY29va2llICs9IFwiOyBTZWN1cmVcIjtcclxuICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XHJcbn1cclxuXHJcbi8qKiBDb252ZW5pZW5jZSBoZWxwZXIgZm9yIHlvdXIgVUkgYmFubmVyICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZSgpIHtcclxuICByZXR1cm4gZ2V0Q29va2llKFwiZGlzcGxheV9uYW1lXCIpIHx8IFwiR3Vlc3RcIjtcclxufVxyXG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWNjb3VudHMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYWNjb3VudHMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgZ2V0RGlzcGxheU5hbWUgfSBmcm9tIFwiLi9saWIvY29va2llcy5qc1wiO1xyXG5pbXBvcnQgXCIuL3N0eWxlcy9hY2NvdW50cy5jc3NcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvbmZpZyAobWlycm9yIHNlcnZlciBydWxlcylcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgVVNFUk5BTUVfUkUgPSAvXlthLXpBLVowLTlfLi1dezMsMTR9JC87XHJcbmNvbnN0IE1JTl9QVyA9IDY7XHJcbmNvbnN0IE1BWF9QVyA9IDMyO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gRE9NXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cEZvcm1cIik7XHJcbmNvbnN0IHNpZ251cEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwQnRuXCIpO1xyXG5jb25zdCBsb2FkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkaW5nXCIpO1xyXG5jb25zdCBidXR0b25UZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25UZXh0XCIpO1xyXG5jb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTWVzc2FnZVwiKTtcclxuY29uc3QgdXNlcm5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIik7XHJcbmNvbnN0IHBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpO1xyXG5cclxuLy8gRGlzcGxheSBjdXJyZW50IGd1ZXN0IG5hbWUgKHNlcnZlciB1c2VzIFwiZGlzcGxheV9uYW1lXCIpXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3Vlc3ROYW1lXCIpLnRleHRDb250ZW50ID0gZ2V0RGlzcGxheU5hbWUoKTtcclxuXHJcbi8vIEFjY2Vzc2liaWxpdHkgaGludCBmb3IgZXJyb3JzXHJcbmVycm9yTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYWxlcnRcIik7XHJcbmVycm9yTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxpdmVcIiwgXCJwb2xpdGVcIik7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBIZWxwZXJzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIHNldExvYWRpbmcoaXNMb2FkaW5nKSB7XHJcbiAgc2lnbnVwQnRuLmRpc2FibGVkID0gaXNMb2FkaW5nO1xyXG4gIGxvYWRpbmcuc3R5bGUuZGlzcGxheSA9IGlzTG9hZGluZyA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG4gIGJ1dHRvblRleHQudGV4dENvbnRlbnQgPSBpc0xvYWRpbmcgPyBcIkNyZWF0aW5nLi4uXCIgOiBcIkNyZWF0ZSBBY2NvdW50XCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dFcnJvcihtZXNzYWdlKSB7XHJcbiAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICBlcnJvck1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUVycm9yKCkge1xyXG4gIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgZXJyb3JNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xpZW50VmFsaWRhdGUodXNlcm5hbWUsIHBhc3N3b3JkKSB7XHJcbiAgaWYgKCF1c2VybmFtZSB8fCAhcGFzc3dvcmQpIHtcclxuICAgIHJldHVybiBcIlVzZXJuYW1lIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQuXCI7XHJcbiAgfVxyXG4gIGlmICghVVNFUk5BTUVfUkUudGVzdCh1c2VybmFtZSkpIHtcclxuICAgIHJldHVybiBcIlVzZXJuYW1lIG11c3QgYmUgM+KAkzE0IGNoYXJzOiBsZXR0ZXJzLCBudW1iZXJzLCBfIC4gLSBvbmx5LlwiO1xyXG4gIH1cclxuICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgTUlOX1BXIHx8IHBhc3N3b3JkLmxlbmd0aCA+IE1BWF9QVykge1xyXG4gICAgcmV0dXJuIGBQYXNzd29yZCBtdXN0IGJlICR7TUlOX1BXfeKAkyR7TUFYX1BXfSBjaGFyYWN0ZXJzLmA7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vLyBPcHRpb25hbDogaW5saW5lIHZhbGlkYXRpb24gVVhcclxuZnVuY3Rpb24gbWFya1ZhbGlkaXR5KCkge1xyXG4gIC8vIFVzZXJuYW1lXHJcbiAgY29uc3QgdSA9IHVzZXJuYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gIGlmICghdSB8fCAhVVNFUk5BTUVfUkUudGVzdCh1KSkge1xyXG4gICAgdXNlcm5hbWVJbnB1dC5zZXRDdXN0b21WYWxpZGl0eShcIlVzZXJuYW1lIG11c3QgYmUgM+KAkzE0IGNoYXJzOiBsZXR0ZXJzLCBudW1iZXJzLCBfIC4gLSBvbmx5LlwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXNlcm5hbWVJbnB1dC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcclxuICB9XHJcbiAgLy8gUGFzc3dvcmRcclxuICBjb25zdCBwID0gcGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuICBpZiAoIXAgfHwgcC5sZW5ndGggPCBNSU5fUFcgfHwgcC5sZW5ndGggPiBNQVhfUFcpIHtcclxuICAgIHBhc3N3b3JkSW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkoYFBhc3N3b3JkIG11c3QgYmUgJHtNSU5fUFd94oCTJHtNQVhfUFd9IGNoYXJhY3RlcnMuYCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBhc3N3b3JkSW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XHJcbiAgfVxyXG59XHJcbnVzZXJuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIG1hcmtWYWxpZGl0eSk7XHJcbnBhc3N3b3JkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIG1hcmtWYWxpZGl0eSk7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBTdWJtaXRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGhpZGVFcnJvcigpO1xyXG5cclxuICBjb25zdCB1c2VybmFtZSA9IHVzZXJuYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gIGNvbnN0IHBhc3N3b3JkID0gcGFzc3dvcmRJbnB1dC52YWx1ZTtcclxuXHJcbiAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gY2xpZW50VmFsaWRhdGUodXNlcm5hbWUsIHBhc3N3b3JkKTtcclxuICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XHJcbiAgICBzaG93RXJyb3IodmFsaWRhdGlvbkVycm9yKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL3NpZ251cFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgLy8gU2VydmVyIG9ubHkgZXhwZWN0cyB1c2VybmFtZS9wYXNzd29yZDsgZ3Vlc3Qgc2Vzc2lvbiBjb21lcyBmcm9tIGNvb2tpZXMuXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcm5hbWUsIHBhc3N3b3JkIH0pLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQXR0ZW1wdCB0byBwYXJzZSBib2R5IGV2ZW4gb24gbm9uLTJ4eCAoc2VydmVyIHJldHVybnMgSlNPTiBlcnJvcnMpXHJcbiAgICBsZXQgZGF0YSA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIGtlZXAgbnVsbCBpZiBub3QgSlNPTlxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5vayAmJiBkYXRhPy5zdWNjZXNzKSB7XHJcbiAgICAgIGJ1dHRvblRleHQudGV4dENvbnRlbnQgPSBcIkFjY291bnQgQ3JlYXRlZCFcIjtcclxuICAgICAgLy8gR2l2ZSBjb29raWVzIGEgdGljayB0byB1cGRhdGUsIHRoZW4gZ28gaG9tZVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9LCA2MDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFwIGtub3duIHNlcnZlciByZXNwb25zZXMgdG8gdXNlci1mcmllbmRseSBtZXNzYWdlc1xyXG4gICAgLy8gU3RhdHVzLWRyaXZlbiBkZWZhdWx0czpcclxuICAgIGxldCBtc2cgPVxyXG4gICAgICBkYXRhPy5lcnJvciB8fFxyXG4gICAgICAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDlcclxuICAgICAgICA/IFwiVGhhdCB1c2VybmFtZSBpcyB0YWtlbi4gVHJ5IGFub3RoZXIuXCJcclxuICAgICAgICA6IHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwXHJcbiAgICAgICAgPyBcIkludmFsaWQgc2lnbnVwIHJlcXVlc3QuXCJcclxuICAgICAgICA6IFwiRmFpbGVkIHRvIGNyZWF0ZSBhY2NvdW50LlwiKTtcclxuXHJcbiAgICAvLyBGaW5lLWdyYWluZWQgbWVzc2FnZXMgZnJvbSB5b3VyIHNlcnZlcuKAmXMgL3NpZ251cCBjb2RlXHJcbiAgICBzd2l0Y2ggKGRhdGE/LmVycm9yKSB7XHJcbiAgICAgIGNhc2UgXCJVc2VybmFtZSBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkLlwiOlxyXG4gICAgICAgIG1zZyA9IFwiVXNlcm5hbWUgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZC5cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIlVzZXJuYW1lIG11c3QgYmUgMy0xNCBjaGFyczogbGV0dGVycywgbnVtYmVycywgXyAuIC0gb25seS5cIjpcclxuICAgICAgICBtc2cgPSBcIlVzZXJuYW1lIG11c3QgYmUgM+KAkzE0IGNoYXJzOiBsZXR0ZXJzLCBudW1iZXJzLCBfIC4gLSBvbmx5LlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIGBQYXNzd29yZCBtdXN0IGJlICR7TUlOX1BXfS0ke01BWF9QV30gY2hhcmFjdGVycy5gOlxyXG4gICAgICAgIG1zZyA9IGBQYXNzd29yZCBtdXN0IGJlICR7TUlOX1BXfeKAkyR7TUFYX1BXfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJHdWVzdCBzZXNzaW9uIG5vdCBmb3VuZC5cIjpcclxuICAgICAgICBtc2cgPSBcIkd1ZXN0IHNlc3Npb24gbm90IGZvdW5kLiBHbyB0byB0aGUgbWFpbiBwYWdlIGFuZCB0cnkgYWdhaW4uXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJUaGlzIGFjY291bnQgaXMgYWxyZWFkeSBwZXJtYW5lbnQuXCI6XHJcbiAgICAgICAgbXNnID0gXCJUaGlzIGFjY291bnQgaXMgYWxyZWFkeSBwZXJtYW5lbnQuIFlvdSBjYW4gbG9nIGluIGluc3RlYWQuXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJVc2VybmFtZSBpcyBhbHJlYWR5IHRha2VuLlwiOlxyXG4gICAgICAgIG1zZyA9IFwiVGhhdCB1c2VybmFtZSBpcyB0YWtlbi4gVHJ5IGFub3RoZXIuXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJVbmFibGUgdG8gY29tcGxldGUgc2lnbnVwLiBQbGVhc2UgdHJ5IGFnYWluLlwiOlxyXG4gICAgICAgIG1zZyA9IFwiQ291bGQgbm90IGNvbXBsZXRlIHNpZ251cC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBrZWVwIG1zZyBhcyBjb21wdXRlZCBhYm92ZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dFcnJvcihtc2cpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgc2hvd0Vycm9yKFwiTmV0d29yayBlcnJvci4gUGxlYXNlIGNoZWNrIHlvdXIgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLlwiKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIEF1dG8tZm9jdXMgdXNlcm5hbWUgZmllbGRcclxudXNlcm5hbWVJbnB1dC5mb2N1cygpO1xyXG4iXSwibmFtZXMiOlsiREVGQVVMVF9QQVRIIiwiREVGQVVMVF9TQU1FU0lURSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsIl9yZWYiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcmVmJGRheXMiLCJkYXlzIiwiX3JlZiRwYXRoIiwicGF0aCIsIl9yZWYkc2FtZVNpdGUiLCJzYW1lU2l0ZSIsInNlY3VyZSIsIm1heEFnZSIsIk1hdGgiLCJtYXgiLCJmbG9vciIsImlzSHR0cHMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwidXNlU2VjdXJlIiwiY29va2llIiwiY29uY2F0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVDb29raWUiLCJnZXRDb29raWUiLCJuZWVkbGUiLCJyYXciLCJwYXJ0cyIsInNwbGl0IiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInBhcnQiLCJzdGFydHNXaXRoIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2xpY2UiLCJlcnIiLCJlIiwiZiIsImRlbGV0ZUNvb2tpZSIsIl9yZWYyIiwiX3JlZjIkcGF0aCIsIl9yZWYyJHNhbWVTaXRlIiwiZ2V0RGlzcGxheU5hbWUiLCJ0IiwiciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIl9PdmVybG9hZFlpZWxkIiwiayIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIlVTRVJOQU1FX1JFIiwiTUlOX1BXIiwiTUFYX1BXIiwiZm9ybSIsImdldEVsZW1lbnRCeUlkIiwic2lnbnVwQnRuIiwibG9hZGluZyIsImJ1dHRvblRleHQiLCJlcnJvck1lc3NhZ2UiLCJ1c2VybmFtZUlucHV0IiwicGFzc3dvcmRJbnB1dCIsInRleHRDb250ZW50Iiwic2V0QXR0cmlidXRlIiwic2V0TG9hZGluZyIsImlzTG9hZGluZyIsImRpc2FibGVkIiwic3R5bGUiLCJkaXNwbGF5Iiwic2hvd0Vycm9yIiwibWVzc2FnZSIsImhpZGVFcnJvciIsImNsaWVudFZhbGlkYXRlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInRlc3QiLCJtYXJrVmFsaWRpdHkiLCJ0cmltIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwidmFsaWRhdGlvbkVycm9yIiwiX2RhdGEiLCJfZGF0YTIiLCJfZGF0YTMiLCJyZXNwb25zZSIsImRhdGEiLCJtc2ciLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicHJldmVudERlZmF1bHQiLCJhYnJ1cHQiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWRlbnRpYWxzIiwic2VudCIsImpzb24iLCJ0MCIsIm9rIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJocmVmIiwiZXJyb3IiLCJzdGF0dXMiLCJ0MSIsInQyIiwiZmluaXNoIiwic3RvcCIsIl94IiwiZm9jdXMiXSwic291cmNlUm9vdCI6IiJ9