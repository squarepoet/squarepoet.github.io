webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/midi/SetOctaveAndBrightness.tsx":
/*!**********************************************!*\
  !*** ./apps/midi/SetOctaveAndBrightness.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/readOnlyError */ \"./node_modules/@babel/runtime/helpers/esm/readOnlyError.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apps/shared/midi/LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\n\n\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/apps/midi/SetOctaveAndBrightness.tsx\",\n    _this = undefined;\n\n\n\nvar SetOctaveAndBrightness = function SetOctaveAndBrightness() {\n  var buttonStyle = {\n    width: \"80px\",\n    height: \"40px\"\n  };\n  var octaveOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];\n  var setOctaveButtons = octaveOffsets.map(function (octaveNum) {\n    var localStyle = buttonStyle;\n\n    if (octaveNum === 0) {\n      localStyle = (Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_readOnlyError__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"localStyle\"), {\n        width: \"160px\",\n        height: \"40px\"\n      });\n    }\n\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"button\", {\n      style: buttonStyle,\n      onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getClickHandler_SetOctave(octaveNum),\n      children: octaveNum\n    }, \"setOctave_\" + octaveNum, false, {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 13\n    }, _this);\n  });\n  var brightnessLevels = [100, 75, 50, 25, 20, 10, 1, 0];\n  var setBrightnessButtons = brightnessLevels.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"button\", {\n      style: buttonStyle,\n      onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getClickHandler_SetBrightness(val),\n      children: [val, \"%\"]\n    }, \"setBrightness_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 24,\n      columnNumber: 13\n    }, _this);\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n        children: \"Set Octave \\uD83C\\uDFBC\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 33,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n        children: setOctaveButtons\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n        children: \"Brightness \\u2600\\uFE0F\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 38,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n        children: setBrightnessButtons\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true);\n};\n\n_c = SetOctaveAndBrightness;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SetOctaveAndBrightness);\n\nvar _c;\n\n$RefreshReg$(_c, \"SetOctaveAndBrightness\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9taWRpL1NldE9jdGF2ZUFuZEJyaWdodG5lc3MudHN4P2Q4ZDciXSwibmFtZXMiOlsiU2V0T2N0YXZlQW5kQnJpZ2h0bmVzcyIsImJ1dHRvblN0eWxlIiwid2lkdGgiLCJoZWlnaHQiLCJvY3RhdmVPZmZzZXRzIiwic2V0T2N0YXZlQnV0dG9ucyIsIm1hcCIsIm9jdGF2ZU51bSIsImxvY2FsU3R5bGUiLCJMVU1JS2V5cyIsImdldENsaWNrSGFuZGxlcl9TZXRPY3RhdmUiLCJicmlnaHRuZXNzTGV2ZWxzIiwic2V0QnJpZ2h0bmVzc0J1dHRvbnMiLCJ2YWwiLCJnZXRDbGlja0hhbmRsZXJfU2V0QnJpZ2h0bmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0EsSUFBTUEsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixHQUFNO0FBQ2pDLE1BQU1DLFdBQVcsR0FBRztBQUFFQyxTQUFLLEVBQUUsTUFBVDtBQUFpQkMsVUFBTSxFQUFFO0FBQXpCLEdBQXBCO0FBRUEsTUFBTUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxDQUFOLEVBQVMsQ0FBQyxDQUFWLEVBQWEsQ0FBQyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLENBQXRCO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdELGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQixVQUFDQyxTQUFELEVBQWU7QUFDdEQsUUFBTUMsVUFBVSxHQUFHUCxXQUFuQjs7QUFDQSxRQUFJTSxTQUFTLEtBQUssQ0FBbEIsRUFBcUI7QUFDakJDLGdCQUFVLDBLQUFHO0FBQUVOLGFBQUssRUFBRSxPQUFUO0FBQWtCQyxjQUFNLEVBQUU7QUFBMUIsT0FBSCxDQUFWO0FBQ0g7O0FBRUQsd0JBQ0k7QUFBdUMsV0FBSyxFQUFFRixXQUE5QztBQUEyRCxhQUFPLEVBQUVRLGlFQUFRLENBQUNDLHlCQUFULENBQW1DSCxTQUFuQyxDQUFwRTtBQUFBLGdCQUNLQTtBQURMLE9BQWEsZUFBZUEsU0FBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBS0gsR0FYd0IsQ0FBekI7QUFhQSxNQUFNSSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUQsRUFBTSxFQUFOLEVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsQ0FBekI7QUFDQSxNQUFNQyxvQkFBb0IsR0FBR0QsZ0JBQWdCLENBQUNMLEdBQWpCLENBQXFCLFVBQUNPLEdBQUQsRUFBUztBQUN2RCx3QkFDSTtBQUFxQyxXQUFLLEVBQUVaLFdBQTVDO0FBQXlELGFBQU8sRUFBRVEsaUVBQVEsQ0FBQ0ssNkJBQVQsQ0FBdUNELEdBQXZDLENBQWxFO0FBQUEsaUJBQ0tBLEdBREw7QUFBQSxPQUFhLG1CQUFtQkEsR0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBS0gsR0FONEIsQ0FBN0I7QUFRQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUEsOEJBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESixlQUVJO0FBQUEsa0JBQU1SO0FBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKLGVBS0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUxKLGVBTUk7QUFBQSw4QkFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURKLGVBRUk7QUFBQSxrQkFBTU87QUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBTko7QUFBQSxrQkFESjtBQWFILENBdkNEOztLQUFNWixzQjtBQXdDU0EscUZBQWYiLCJmaWxlIjoiLi9hcHBzL21pZGkvU2V0T2N0YXZlQW5kQnJpZ2h0bmVzcy50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTFVNSUtleXMgZnJvbSBcImFwcHMvc2hhcmVkL21pZGkvTFVNSUtleXNcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmNvbnN0IFNldE9jdGF2ZUFuZEJyaWdodG5lc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uU3R5bGUgPSB7IHdpZHRoOiBcIjgwcHhcIiwgaGVpZ2h0OiBcIjQwcHhcIiB9O1xuXG4gICAgY29uc3Qgb2N0YXZlT2Zmc2V0cyA9IFstNCwgLTMsIC0yLCAtMSwgMCwgMSwgMiwgMywgNCwgNV07XG4gICAgY29uc3Qgc2V0T2N0YXZlQnV0dG9ucyA9IG9jdGF2ZU9mZnNldHMubWFwKChvY3RhdmVOdW0pID0+IHtcbiAgICAgICAgY29uc3QgbG9jYWxTdHlsZSA9IGJ1dHRvblN0eWxlO1xuICAgICAgICBpZiAob2N0YXZlTnVtID09PSAwKSB7XG4gICAgICAgICAgICBsb2NhbFN0eWxlID0geyB3aWR0aDogXCIxNjBweFwiLCBoZWlnaHQ6IFwiNDBweFwiIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e1wic2V0T2N0YXZlX1wiICsgb2N0YXZlTnVtfSBzdHlsZT17YnV0dG9uU3R5bGV9IG9uQ2xpY2s9e0xVTUlLZXlzLmdldENsaWNrSGFuZGxlcl9TZXRPY3RhdmUob2N0YXZlTnVtKX0+XG4gICAgICAgICAgICAgICAge29jdGF2ZU51bX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYnJpZ2h0bmVzc0xldmVscyA9IFsxMDAsIDc1LCA1MCwgMjUsIDIwLCAxMCwgMSwgMF07XG4gICAgY29uc3Qgc2V0QnJpZ2h0bmVzc0J1dHRvbnMgPSBicmlnaHRuZXNzTGV2ZWxzLm1hcCgodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uIGtleT17XCJzZXRCcmlnaHRuZXNzX1wiICsgdmFsfSBzdHlsZT17YnV0dG9uU3R5bGV9IG9uQ2xpY2s9e0xVTUlLZXlzLmdldENsaWNrSGFuZGxlcl9TZXRCcmlnaHRuZXNzKHZhbCl9PlxuICAgICAgICAgICAgICAgIHt2YWx9JVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlNldCBPY3RhdmUg8J+OvDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3NldE9jdGF2ZUJ1dHRvbnN9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PkJyaWdodG5lc3Mg4piA77iPPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57c2V0QnJpZ2h0bmVzc0J1dHRvbnN9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC8+XG4gICAgKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTZXRPY3RhdmVBbmRCcmlnaHRuZXNzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/midi/SetOctaveAndBrightness.tsx\n");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _readOnlyError; });\nfunction _readOnlyError(name) {\n  throw new TypeError(\"\\\"\" + name + \"\\\" is read-only\");\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3JlYWRPbmx5RXJyb3IuanM/YjFmOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQWU7QUFDZjtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3JlYWRPbmx5RXJyb3IuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcmVhZE9ubHlFcnJvcihuYW1lKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJcXFwiXCIgKyBuYW1lICsgXCJcXFwiIGlzIHJlYWQtb25seVwiKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@babel/runtime/helpers/esm/readOnlyError.js\n");

/***/ }),

/***/ "./node_modules/classnames/index.js":
false

})