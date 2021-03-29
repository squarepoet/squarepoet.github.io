webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Preloader.ts":
/*!****************************************!*\
  !*** ./apps/shared/sound/Preloader.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Preloader; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nvar Preloader = function Preloader(files) {\n  var _this = this;\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Preloader);\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, \"filesToLoad\", []);\n\n  var _iterator = _createForOfIteratorHelper(files),\n      _step;\n\n  try {\n    var _loop = function _loop() {\n      var file = _step.value;\n      var buffer = new tone__WEBPACK_IMPORTED_MODULE_2__[\"ToneAudioBuffer\"](file, function () {\n        console.log(\"Preloaded \" + file);\n      });\n\n      _this.filesToLoad.push(buffer);\n    };\n\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      _loop();\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n};\n\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvUHJlbG9hZGVyLnRzP2JhMmIiXSwibmFtZXMiOlsiUHJlbG9hZGVyIiwiZmlsZXMiLCJmaWxlIiwiYnVmZmVyIiwiVG9uZUF1ZGlvQnVmZmVyIiwiY29uc29sZSIsImxvZyIsImZpbGVzVG9Mb2FkIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLFMsR0FHakIsbUJBQVlDLEtBQVosRUFBNkI7QUFBQTs7QUFBQTs7QUFBQSwrS0FGSSxFQUVKOztBQUFBLDZDQUNSQSxLQURRO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFVBQ2hCQyxJQURnQjtBQUVyQixVQUFNQyxNQUFNLEdBQUcsSUFBSUMsb0RBQUosQ0FBb0JGLElBQXBCLEVBQTBCLFlBQVk7QUFDakRHLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQWVKLElBQTNCO0FBQ0gsT0FGYyxDQUFmOztBQUdBLFdBQUksQ0FBQ0ssV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0JMLE1BQXRCO0FBTHFCOztBQUN6Qix3REFBd0I7QUFBQTtBQUt2QjtBQU53QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLEMiLCJmaWxlIjoiLi9hcHBzL3NoYXJlZC9zb3VuZC9QcmVsb2FkZXIudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb25lQXVkaW9CdWZmZXIgfSBmcm9tIFwidG9uZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkZXIge1xuICAgIGZpbGVzVG9Mb2FkOiBUb25lQXVkaW9CdWZmZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoZmlsZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBUb25lQXVkaW9CdWZmZXIoZmlsZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJlbG9hZGVkIFwiICsgZmlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZmlsZXNUb0xvYWQucHVzaChidWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/sound/Preloader.ts\n");

/***/ })

})