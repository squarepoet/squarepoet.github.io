webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/midi/ModeCustomization.tsx":
/*!*****************************************!*\
  !*** ./apps/midi/ModeCustomization.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apps/shared/midi/LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\n\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/apps/midi/ModeCustomization.tsx\",\n    _this = undefined;\n\n\n\nvar ModeCustomization = function ModeCustomization() {\n  var buttonStyle = {\n    height: \"40px\",\n    margin: \"8px 0px\"\n  };\n  var modeNumbers = [1, 2, 3, 4];\n  var headerRow = modeNumbers.map(function (val, index) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"a\", {\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SwitchToMode(val),\n        children: [\"Mode \", val]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 10,\n        columnNumber: 17\n      }, _this)\n    }, \"switchToMode_\" + val, false, {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 13\n    }, _this);\n  });\n  var row0 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetColorMode(val, \"pro\"),\n        children: \"pro\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 18,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"highlight root note with single rainbow color\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 21,\n        columnNumber: 17\n      }, _this)]\n    }, \"setColorModePro_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 13\n    }, _this);\n  });\n  var row1 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetColorMode(val, \"user\"),\n        children: \"user\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 29,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"highlight root note with user selected color\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 32,\n        columnNumber: 17\n      }, _this)]\n    }, \"setColorModeUser_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 13\n    }, _this);\n  });\n  var row2 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetColorMode(val, \"piano\"),\n        children: \"piano \\uD83C\\uDFB9\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 40,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"white and black keys\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 43,\n        columnNumber: 17\n      }, _this)]\n    }, \"setColorModePiano_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 13\n    }, _this);\n  });\n  var row3 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetColorMode(val, \"stage\"),\n        children: \"stage \\uD83C\\uDFA7\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"dim rainbow colors, appropriate for a dark room\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 54,\n        columnNumber: 17\n      }, _this)]\n    }, \"setColorModeStage_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 50,\n      columnNumber: 13\n    }, _this);\n  });\n  var row4 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: buttonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_SetColorMode(val, \"rainbow\"),\n        children: \"rainbow \\uD83C\\uDF08\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"bright rainbow colors, black sharps/flats\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 65,\n        columnNumber: 17\n      }, _this)]\n    }, \"setColorModeRainbow_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 13\n    }, _this);\n  });\n  var pitchBendButtonStyle = {\n    width: \"50%\",\n    height: \"50px\",\n    margin: \"8px 0px\"\n  };\n  var row5 = modeNumbers.map(function (val) {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dtCell\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtCellNote\",\n        children: \"pitch bend\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 75,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: pitchBendButtonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_PitchBend(val, true),\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"b\", {\n          children: \"ON\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 77,\n          columnNumber: 21\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        style: pitchBendButtonStyle,\n        onClick: apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getClickHandler_PitchBend(val, false),\n        children: \"off\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 79,\n        columnNumber: 17\n      }, _this)]\n    }, \"setPitchBend_\" + val, true, {\n      fileName: _jsxFileName,\n      lineNumber: 74,\n      columnNumber: 13\n    }, _this);\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      className: \"dt\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtHead\",\n        children: headerRow\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 89,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        className: \"dtBody\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row0\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 91,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row1\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 92,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row2\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 93,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row3\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 94,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row4\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 95,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          className: \"dtRow\",\n          children: row5\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 96,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 90,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 13\n    }, _this)\n  }, void 0, false);\n};\n\n_c = ModeCustomization;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModeCustomization);\n\nvar _c;\n\n$RefreshReg$(_c, \"ModeCustomization\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9taWRpL01vZGVDdXN0b21pemF0aW9uLnRzeD81ZjkzIl0sIm5hbWVzIjpbIk1vZGVDdXN0b21pemF0aW9uIiwiYnV0dG9uU3R5bGUiLCJoZWlnaHQiLCJtYXJnaW4iLCJtb2RlTnVtYmVycyIsImhlYWRlclJvdyIsIm1hcCIsInZhbCIsImluZGV4IiwiTFVNSUtleXMiLCJnZXRDbGlja0hhbmRsZXJfU3dpdGNoVG9Nb2RlIiwicm93MCIsImdldENsaWNrSGFuZGxlcl9TZXRDb2xvck1vZGUiLCJyb3cxIiwicm93MiIsInJvdzMiLCJyb3c0IiwicGl0Y2hCZW5kQnV0dG9uU3R5bGUiLCJ3aWR0aCIsInJvdzUiLCJnZXRDbGlja0hhbmRsZXJfUGl0Y2hCZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzVCLE1BQU1DLFdBQVcsR0FBRztBQUFFQyxVQUFNLEVBQUUsTUFBVjtBQUFrQkMsVUFBTSxFQUFFO0FBQTFCLEdBQXBCO0FBRUEsTUFBTUMsV0FBVyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFwQjtBQUNBLE1BQU1DLFNBQVMsR0FBR0QsV0FBVyxDQUFDRSxHQUFaLENBQWdCLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM5Qyx3QkFDSTtBQUFpQyxlQUFTLEVBQUMsUUFBM0M7QUFBQSw2QkFDSTtBQUFHLGVBQU8sRUFBRUMsaUVBQVEsQ0FBQ0MsNEJBQVQsQ0FBc0NILEdBQXRDLENBQVo7QUFBQSw0QkFBOERBLEdBQTlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKLE9BQVUsa0JBQWtCQSxHQUE1QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREo7QUFLSCxHQU5pQixDQUFsQjtBQVFBLE1BQU1JLElBQUksR0FBR1AsV0FBVyxDQUFDRSxHQUFaLENBQWdCLFVBQUNDLEdBQUQsRUFBUztBQUNsQyx3QkFDSTtBQUFvQyxlQUFTLEVBQUMsUUFBOUM7QUFBQSw4QkFDSTtBQUFRLGFBQUssRUFBRU4sV0FBZjtBQUE0QixlQUFPLEVBQUVRLGlFQUFRLENBQUNHLDRCQUFULENBQXNDTCxHQUF0QyxFQUEyQyxLQUEzQyxDQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURKLGVBSUk7QUFBSyxpQkFBUyxFQUFDLFlBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFKSjtBQUFBLE9BQVUscUJBQXFCQSxHQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREo7QUFRSCxHQVRZLENBQWI7QUFXQSxNQUFNTSxJQUFJLEdBQUdULFdBQVcsQ0FBQ0UsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQVM7QUFDbEMsd0JBQ0k7QUFBcUMsZUFBUyxFQUFDLFFBQS9DO0FBQUEsOEJBQ0k7QUFBUSxhQUFLLEVBQUVOLFdBQWY7QUFBNEIsZUFBTyxFQUFFUSxpRUFBUSxDQUFDRyw0QkFBVCxDQUFzQ0wsR0FBdEMsRUFBMkMsTUFBM0MsQ0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESixlQUlJO0FBQUssaUJBQVMsRUFBQyxZQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSko7QUFBQSxPQUFVLHNCQUFzQkEsR0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBUUgsR0FUWSxDQUFiO0FBV0EsTUFBTU8sSUFBSSxHQUFHVixXQUFXLENBQUNFLEdBQVosQ0FBZ0IsVUFBQ0MsR0FBRCxFQUFTO0FBQ2xDLHdCQUNJO0FBQXNDLGVBQVMsRUFBQyxRQUFoRDtBQUFBLDhCQUNJO0FBQVEsYUFBSyxFQUFFTixXQUFmO0FBQTRCLGVBQU8sRUFBRVEsaUVBQVEsQ0FBQ0csNEJBQVQsQ0FBc0NMLEdBQXRDLEVBQTJDLE9BQTNDLENBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREosZUFJSTtBQUFLLGlCQUFTLEVBQUMsWUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUpKO0FBQUEsT0FBVSx1QkFBdUJBLEdBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFESjtBQVFILEdBVFksQ0FBYjtBQVdBLE1BQU1RLElBQUksR0FBR1gsV0FBVyxDQUFDRSxHQUFaLENBQWdCLFVBQUNDLEdBQUQsRUFBUztBQUNsQyx3QkFDSTtBQUFzQyxlQUFTLEVBQUMsUUFBaEQ7QUFBQSw4QkFDSTtBQUFRLGFBQUssRUFBRU4sV0FBZjtBQUE0QixlQUFPLEVBQUVRLGlFQUFRLENBQUNHLDRCQUFULENBQXNDTCxHQUF0QyxFQUEyQyxPQUEzQyxDQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURKLGVBSUk7QUFBSyxpQkFBUyxFQUFDLFlBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFKSjtBQUFBLE9BQVUsdUJBQXVCQSxHQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREo7QUFRSCxHQVRZLENBQWI7QUFXQSxNQUFNUyxJQUFJLEdBQUdaLFdBQVcsQ0FBQ0UsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQVM7QUFDbEMsd0JBQ0k7QUFBd0MsZUFBUyxFQUFDLFFBQWxEO0FBQUEsOEJBQ0k7QUFBUSxhQUFLLEVBQUVOLFdBQWY7QUFBNEIsZUFBTyxFQUFFUSxpRUFBUSxDQUFDRyw0QkFBVCxDQUFzQ0wsR0FBdEMsRUFBMkMsU0FBM0MsQ0FBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESixlQUlJO0FBQUssaUJBQVMsRUFBQyxZQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSko7QUFBQSxPQUFVLHlCQUF5QkEsR0FBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBUUgsR0FUWSxDQUFiO0FBV0EsTUFBTVUsb0JBQW9CLEdBQUc7QUFBRUMsU0FBSyxFQUFFLEtBQVQ7QUFBZ0JoQixVQUFNLEVBQUUsTUFBeEI7QUFBZ0NDLFVBQU0sRUFBRTtBQUF4QyxHQUE3QjtBQUVBLE1BQU1nQixJQUFJLEdBQUdmLFdBQVcsQ0FBQ0UsR0FBWixDQUFnQixVQUFDQyxHQUFELEVBQVM7QUFDbEMsd0JBQ0k7QUFBaUMsZUFBUyxFQUFDLFFBQTNDO0FBQUEsOEJBQ0k7QUFBSyxpQkFBUyxFQUFDLFlBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESixlQUVJO0FBQVEsYUFBSyxFQUFFVSxvQkFBZjtBQUFxQyxlQUFPLEVBQUVSLGlFQUFRLENBQUNXLHlCQUFULENBQW1DYixHQUFuQyxFQUF3QyxJQUF4QyxDQUE5QztBQUFBLCtCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUZKLGVBS0k7QUFBUSxhQUFLLEVBQUVVLG9CQUFmO0FBQXFDLGVBQU8sRUFBRVIsaUVBQVEsQ0FBQ1cseUJBQVQsQ0FBbUNiLEdBQW5DLEVBQXdDLEtBQXhDLENBQTlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTEo7QUFBQSxPQUFVLGtCQUFrQkEsR0FBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKO0FBV0gsR0FaWSxDQUFiO0FBY0Esc0JBQ0k7QUFBQSwyQkFDSTtBQUFLLGVBQVMsRUFBQyxJQUFmO0FBQUEsOEJBQ0k7QUFBSyxpQkFBUyxFQUFDLFFBQWY7QUFBQSxrQkFBeUJGO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFESixlQUVJO0FBQUssaUJBQVMsRUFBQyxRQUFmO0FBQUEsZ0NBQ0k7QUFBSyxtQkFBUyxFQUFDLE9BQWY7QUFBQSxvQkFBd0JNO0FBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREosZUFFSTtBQUFLLG1CQUFTLEVBQUMsT0FBZjtBQUFBLG9CQUF3QkU7QUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFGSixlQUdJO0FBQUssbUJBQVMsRUFBQyxPQUFmO0FBQUEsb0JBQXdCQztBQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUhKLGVBSUk7QUFBSyxtQkFBUyxFQUFDLE9BQWY7QUFBQSxvQkFBd0JDO0FBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSkosZUFLSTtBQUFLLG1CQUFTLEVBQUMsT0FBZjtBQUFBLG9CQUF3QkM7QUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFMSixlQU1JO0FBQUssbUJBQVMsRUFBQyxPQUFmO0FBQUEsb0JBQXdCRztBQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU5KO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKLG1CQURKO0FBZUgsQ0FsR0Q7O0tBQU1uQixpQjtBQW9HU0EsZ0ZBQWYiLCJmaWxlIjoiLi9hcHBzL21pZGkvTW9kZUN1c3RvbWl6YXRpb24udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExVTUlLZXlzIGZyb20gXCJhcHBzL3NoYXJlZC9taWRpL0xVTUlLZXlzXCI7XG5cbmNvbnN0IE1vZGVDdXN0b21pemF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvblN0eWxlID0geyBoZWlnaHQ6IFwiNDBweFwiLCBtYXJnaW46IFwiOHB4IDBweFwiIH07XG5cbiAgICBjb25zdCBtb2RlTnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAgICBjb25zdCBoZWFkZXJSb3cgPSBtb2RlTnVtYmVycy5tYXAoKHZhbCwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcInN3aXRjaFRvTW9kZV9cIiArIHZhbH0gY2xhc3NOYW1lPVwiZHRDZWxsXCI+XG4gICAgICAgICAgICAgICAgPGEgb25DbGljaz17TFVNSUtleXMuZ2V0Q2xpY2tIYW5kbGVyX1N3aXRjaFRvTW9kZSh2YWwpfT5Nb2RlIHt2YWx9PC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByb3cwID0gbW9kZU51bWJlcnMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcInNldENvbG9yTW9kZVByb19cIiArIHZhbH0gY2xhc3NOYW1lPVwiZHRDZWxsXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17YnV0dG9uU3R5bGV9IG9uQ2xpY2s9e0xVTUlLZXlzLmdldENsaWNrSGFuZGxlcl9TZXRDb2xvck1vZGUodmFsLCBcInByb1wiKX0+XG4gICAgICAgICAgICAgICAgICAgIHByb1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRDZWxsTm90ZVwiPmhpZ2hsaWdodCByb290IG5vdGUgd2l0aCBzaW5nbGUgcmFpbmJvdyBjb2xvcjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByb3cxID0gbW9kZU51bWJlcnMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcInNldENvbG9yTW9kZVVzZXJfXCIgKyB2YWx9IGNsYXNzTmFtZT1cImR0Q2VsbFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e2J1dHRvblN0eWxlfSBvbkNsaWNrPXtMVU1JS2V5cy5nZXRDbGlja0hhbmRsZXJfU2V0Q29sb3JNb2RlKHZhbCwgXCJ1c2VyXCIpfT5cbiAgICAgICAgICAgICAgICAgICAgdXNlclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRDZWxsTm90ZVwiPmhpZ2hsaWdodCByb290IG5vdGUgd2l0aCB1c2VyIHNlbGVjdGVkIGNvbG9yPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJvdzIgPSBtb2RlTnVtYmVycy5tYXAoKHZhbCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBrZXk9e1wic2V0Q29sb3JNb2RlUGlhbm9fXCIgKyB2YWx9IGNsYXNzTmFtZT1cImR0Q2VsbFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e2J1dHRvblN0eWxlfSBvbkNsaWNrPXtMVU1JS2V5cy5nZXRDbGlja0hhbmRsZXJfU2V0Q29sb3JNb2RlKHZhbCwgXCJwaWFub1wiKX0+XG4gICAgICAgICAgICAgICAgICAgIHBpYW5vIPCfjrlcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImR0Q2VsbE5vdGVcIj53aGl0ZSBhbmQgYmxhY2sga2V5czwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByb3czID0gbW9kZU51bWJlcnMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtcInNldENvbG9yTW9kZVN0YWdlX1wiICsgdmFsfSBjbGFzc05hbWU9XCJkdENlbGxcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtidXR0b25TdHlsZX0gb25DbGljaz17TFVNSUtleXMuZ2V0Q2xpY2tIYW5kbGVyX1NldENvbG9yTW9kZSh2YWwsIFwic3RhZ2VcIil9PlxuICAgICAgICAgICAgICAgICAgICBzdGFnZSDwn46nXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkdENlbGxOb3RlXCI+ZGltIHJhaW5ib3cgY29sb3JzLCBhcHByb3ByaWF0ZSBmb3IgYSBkYXJrIHJvb208L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgcm93NCA9IG1vZGVOdW1iZXJzLm1hcCgodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17XCJzZXRDb2xvck1vZGVSYWluYm93X1wiICsgdmFsfSBjbGFzc05hbWU9XCJkdENlbGxcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtidXR0b25TdHlsZX0gb25DbGljaz17TFVNSUtleXMuZ2V0Q2xpY2tIYW5kbGVyX1NldENvbG9yTW9kZSh2YWwsIFwicmFpbmJvd1wiKX0+XG4gICAgICAgICAgICAgICAgICAgIHJhaW5ib3cg8J+MiFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRDZWxsTm90ZVwiPmJyaWdodCByYWluYm93IGNvbG9ycywgYmxhY2sgc2hhcnBzL2ZsYXRzPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHBpdGNoQmVuZEJ1dHRvblN0eWxlID0geyB3aWR0aDogXCI1MCVcIiwgaGVpZ2h0OiBcIjUwcHhcIiwgbWFyZ2luOiBcIjhweCAwcHhcIiB9O1xuXG4gICAgY29uc3Qgcm93NSA9IG1vZGVOdW1iZXJzLm1hcCgodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17XCJzZXRQaXRjaEJlbmRfXCIgKyB2YWx9IGNsYXNzTmFtZT1cImR0Q2VsbFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRDZWxsTm90ZVwiPnBpdGNoIGJlbmQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtwaXRjaEJlbmRCdXR0b25TdHlsZX0gb25DbGljaz17TFVNSUtleXMuZ2V0Q2xpY2tIYW5kbGVyX1BpdGNoQmVuZCh2YWwsIHRydWUpfT5cbiAgICAgICAgICAgICAgICAgICAgPGI+T048L2I+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17cGl0Y2hCZW5kQnV0dG9uU3R5bGV9IG9uQ2xpY2s9e0xVTUlLZXlzLmdldENsaWNrSGFuZGxlcl9QaXRjaEJlbmQodmFsLCBmYWxzZSl9PlxuICAgICAgICAgICAgICAgICAgICBvZmZcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImR0SGVhZFwiPntoZWFkZXJSb3d9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkdEJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkdFJvd1wiPntyb3cwfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImR0Um93XCI+e3JvdzF9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRSb3dcIj57cm93Mn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkdFJvd1wiPntyb3czfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImR0Um93XCI+e3JvdzR9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHRSb3dcIj57cm93NX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kZUN1c3RvbWl6YXRpb247XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./apps/midi/ModeCustomization.tsx\n");

/***/ })

})