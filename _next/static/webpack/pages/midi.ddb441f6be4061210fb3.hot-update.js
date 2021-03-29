webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/midi/SetScaleType.tsx":
/*!************************************!*\
  !*** ./apps/midi/SetScaleType.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apps/shared/midi/LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/apps/midi/SetScaleType.tsx\",\n    _this = undefined;\n\n\n\nvar SetScaleType = function SetScaleType() {\n  var buttonStyle = {\n    width: \"140px\",\n    height: \"30px\"\n  };\n\n  var generateButtons = function generateButtons(scaleNames) {\n    return scaleNames.map(function (val) {\n      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetScaleType(val),\n        children: val.replace(/-/g, \" \")\n      }, \"setScale_\" + val, false, {\n        fileName: _jsxFileName,\n        lineNumber: 9,\n        columnNumber: 17\n      }, _this);\n    });\n  };\n\n  var row0 = [\"major\", \"minor\", \"blues\", \"harmonic-minor\", \"major-pentatonic\", \"minor-pentatonic\", \"neutral-pentatonic\"];\n  var row1 = [\"dorian\", \"phrygian\", \"lydian\", \"mixolydian\", \"locrian\"];\n  var row2 = [\"chromatic\", \"whole-tone\", \"arabic-a\", \"arabic-b\", \"japanese\", \"ryukyu\", \"8-tone-spanish\"];\n  var row0_buttons = generateButtons(row0);\n  var row1_buttons = generateButtons(row1);\n  var row2_buttons = generateButtons(row2);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"Scale Type\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 25,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: row0_buttons\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: row1_buttons\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: row2_buttons\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 24,\n    columnNumber: 9\n  }, _this);\n};\n\n_c = SetScaleType;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SetScaleType);\n\nvar _c;\n\n$RefreshReg$(_c, \"SetScaleType\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9taWRpL1NldFNjYWxlVHlwZS50c3g/ODVkYiJdLCJuYW1lcyI6WyJTZXRTY2FsZVR5cGUiLCJidXR0b25TdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2VuZXJhdGVCdXR0b25zIiwic2NhbGVOYW1lcyIsIm1hcCIsInZhbCIsIkxVTUlLZXlzIiwiZ2V0Q2xpY2tIYW5kbGVyX1NldFNjYWxlVHlwZSIsInJlcGxhY2UiLCJyb3cwIiwicm93MSIsInJvdzIiLCJyb3cwX2J1dHRvbnMiLCJyb3cxX2J1dHRvbnMiLCJyb3cyX2J1dHRvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1BLFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU07QUFDdkIsTUFBTUMsV0FBVyxHQUFHO0FBQUVDLFNBQUssRUFBRSxPQUFUO0FBQWtCQyxVQUFNLEVBQUU7QUFBMUIsR0FBcEI7O0FBRUEsTUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxVQUFELEVBQTBCO0FBQzlDLFdBQU9BLFVBQVUsQ0FBQ0MsR0FBWCxDQUFlLFVBQUNDLEdBQUQsRUFBUztBQUMzQiwwQkFDSTtBQUFnQyxhQUFLLEVBQUVOLFdBQXZDO0FBQW9ELGVBQU8sRUFBRU8saUVBQVEsQ0FBQ0MsNEJBQVQsQ0FBc0NGLEdBQXRDLENBQTdEO0FBQUEsa0JBQ0tBLEdBQUcsQ0FBQ0csT0FBSixDQUFZLElBQVosRUFBa0IsR0FBbEI7QUFETCxTQUFhLGNBQWNILEdBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESjtBQUtILEtBTk0sQ0FBUDtBQU9ILEdBUkQ7O0FBVUEsTUFBTUksSUFBSSxHQUFHLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsT0FBbkIsRUFBNEIsZ0JBQTVCLEVBQThDLGtCQUE5QyxFQUFrRSxrQkFBbEUsRUFBc0Ysb0JBQXRGLENBQWI7QUFDQSxNQUFNQyxJQUFJLEdBQUcsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixRQUF2QixFQUFpQyxZQUFqQyxFQUErQyxTQUEvQyxDQUFiO0FBQ0EsTUFBTUMsSUFBSSxHQUFHLENBQUMsV0FBRCxFQUFjLFlBQWQsRUFBNEIsVUFBNUIsRUFBd0MsVUFBeEMsRUFBb0QsVUFBcEQsRUFBZ0UsUUFBaEUsRUFBMEUsZ0JBQTFFLENBQWI7QUFDQSxNQUFNQyxZQUFZLEdBQUdWLGVBQWUsQ0FBQ08sSUFBRCxDQUFwQztBQUNBLE1BQU1JLFlBQVksR0FBR1gsZUFBZSxDQUFDUSxJQUFELENBQXBDO0FBQ0EsTUFBTUksWUFBWSxHQUFHWixlQUFlLENBQUNTLElBQUQsQ0FBcEM7QUFFQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREosZUFFSTtBQUFBLGdCQUFNQztBQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFGSixlQUdJO0FBQUEsZ0JBQU1DO0FBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUhKLGVBSUk7QUFBQSxnQkFBTUM7QUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREo7QUFRSCxDQTVCRDs7S0FBTWhCLFk7QUE2QlNBLDJFQUFmIiwiZmlsZSI6Ii4vYXBwcy9taWRpL1NldFNjYWxlVHlwZS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTFVNSUtleXMgZnJvbSBcImFwcHMvc2hhcmVkL21pZGkvTFVNSUtleXNcIjtcblxuY29uc3QgU2V0U2NhbGVUeXBlID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvblN0eWxlID0geyB3aWR0aDogXCIxNDBweFwiLCBoZWlnaHQ6IFwiMzBweFwiIH07XG5cbiAgICBjb25zdCBnZW5lcmF0ZUJ1dHRvbnMgPSAoc2NhbGVOYW1lczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgcmV0dXJuIHNjYWxlTmFtZXMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e1wic2V0U2NhbGVfXCIgKyB2YWx9IHN0eWxlPXtidXR0b25TdHlsZX0gb25DbGljaz17TFVNSUtleXMuZ2V0Q2xpY2tIYW5kbGVyX1NldFNjYWxlVHlwZSh2YWwpfT5cbiAgICAgICAgICAgICAgICAgICAge3ZhbC5yZXBsYWNlKC8tL2csIFwiIFwiKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCByb3cwID0gW1wibWFqb3JcIiwgXCJtaW5vclwiLCBcImJsdWVzXCIsIFwiaGFybW9uaWMtbWlub3JcIiwgXCJtYWpvci1wZW50YXRvbmljXCIsIFwibWlub3ItcGVudGF0b25pY1wiLCBcIm5ldXRyYWwtcGVudGF0b25pY1wiXTtcbiAgICBjb25zdCByb3cxID0gW1wiZG9yaWFuXCIsIFwicGhyeWdpYW5cIiwgXCJseWRpYW5cIiwgXCJtaXhvbHlkaWFuXCIsIFwibG9jcmlhblwiXTtcbiAgICBjb25zdCByb3cyID0gW1wiY2hyb21hdGljXCIsIFwid2hvbGUtdG9uZVwiLCBcImFyYWJpYy1hXCIsIFwiYXJhYmljLWJcIiwgXCJqYXBhbmVzZVwiLCBcInJ5dWt5dVwiLCBcIjgtdG9uZS1zcGFuaXNoXCJdO1xuICAgIGNvbnN0IHJvdzBfYnV0dG9ucyA9IGdlbmVyYXRlQnV0dG9ucyhyb3cwKTtcbiAgICBjb25zdCByb3cxX2J1dHRvbnMgPSBnZW5lcmF0ZUJ1dHRvbnMocm93MSk7XG4gICAgY29uc3Qgcm93Ml9idXR0b25zID0gZ2VuZXJhdGVCdXR0b25zKHJvdzIpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+U2NhbGUgVHlwZTwvZGl2PlxuICAgICAgICAgICAgPGRpdj57cm93MF9idXR0b25zfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj57cm93MV9idXR0b25zfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj57cm93Ml9idXR0b25zfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNldFNjYWxlVHlwZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/midi/SetScaleType.tsx\n");

/***/ })

})