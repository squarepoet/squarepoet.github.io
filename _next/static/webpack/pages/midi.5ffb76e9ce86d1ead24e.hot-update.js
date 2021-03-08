webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_2__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\nvar Page = function Page() {\n  _s();\n\n  var output;\n  var input;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      });\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn() {\n    output.playNote(\"C4\", \"all\", {\n      duration: 2000\n    });\n  }; // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n  // 0x07 is the device ID?\n\n\n  var onClickLUMISetScaleRoot = function onClickLUMISetScaleRoot(rootNote) {\n    switch (rootNote) {\n      case \"C\":\n      default:\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41]); // Root: C\n\n        break;\n\n      case \"E\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: E\n\n        break;\n\n      case \"X\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: ?\n        // Major Scale\n        // 77 07 10 60 02 00 00 00 00 00 7E\n\n        break;\n    }\n  };\n\n  var createChecksum = function createChecksum() {\n    var values = [0x10, 0x60, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00];\n    var sum = values.length;\n\n    for (var i = 0; i < values.length; i++) {\n      sum = sum * 3 + values[i] & 0xff;\n    }\n\n    return sum & 0x7f;\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x01, 0x03, 0x00, 0x63]); // LUMI responds 8 times with:\n    // F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n  };\n\n  var onClickLUMITest = function onClickLUMITest() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x02, 0x44]);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {\n    console.log(createChecksum().toString(16));\n  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n      children: \"MIDI Test Page\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 114,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"LUMI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 115,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Set Scale Root\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 117,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: onClickLUMINoteOn,\n          children: \"Note On C4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 119,\n          columnNumber: 21\n        }, _this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 118,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 116,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 122,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Set Scale Root\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 124,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"C\");\n          },\n          children: \"C\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 126,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"E\");\n          },\n          children: \"E\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 127,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"X\");\n          },\n          children: \"X\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 128,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 125,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 123,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 132,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMICheck_XXX1,\n      children: \"Check ???\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 133,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 134,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 135,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 136,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMITest,\n      children: \"Test XXX\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 137,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 113,\n    columnNumber: 9\n  }, _this);\n};\n\n_s(Page, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiaW5wdXQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImlucHV0cyIsIm91dHB1dHMiLCJnZXRPdXRwdXRCeUlkIiwiZ2V0SW5wdXRCeU5hbWUiLCJhZGRMaXN0ZW5lciIsImUiLCJkYXRhU3RyaW5nIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJkYXRhIiwid2luZG93IiwiTUlESV9TWVNURU1fTUVTU0FHRVMiLCJzeXNleCIsIm9uQ2xpY2tMVU1JTm90ZU9uIiwicGxheU5vdGUiLCJkdXJhdGlvbiIsIm9uQ2xpY2tMVU1JU2V0U2NhbGVSb290Iiwicm9vdE5vdGUiLCJzZW5kU3lzZXgiLCJjcmVhdGVDaGVja3N1bSIsInZhbHVlcyIsInN1bSIsImxlbmd0aCIsImkiLCJvbkNsaWNrTFVNSVNlcmlhbCIsIm9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSIsIm9uQ2xpY2tMVU1JVGVzdCIsInVzZUVmZmVjdCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUFBOztBQUNmLE1BQUlDLE1BQUo7QUFDQSxNQUFJQyxLQUFKOztBQUVBLFlBQW1DO0FBQy9CQyxrREFBTyxDQUFDQyxNQUFSLENBQWUsVUFBVUMsR0FBVixFQUFlO0FBQzFCLFVBQUlBLEdBQUosRUFBUztBQUNMQyxlQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsR0FBN0M7QUFDQTtBQUNIOztBQUNEQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUVBRCxhQUFPLENBQUNDLEdBQVIsQ0FBWUosOENBQU8sQ0FBQ0ssTUFBcEI7QUFDQUYsYUFBTyxDQUFDQyxHQUFSLENBQVlKLDhDQUFPLENBQUNNLE9BQXBCLEVBUjBCLENB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QTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBcEJKLGVBcUJJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFyQkosZUFzQkk7QUFBUSxhQUFPLEVBQUVELGlCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXRCSixlQXVCSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBdkJKLGVBd0JJO0FBQVEsYUFBTyxFQUFFRSxlQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXhCSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FESjtBQTRCSCxDQXhJRDs7R0FBTWxDLEk7O0tBQUFBLEk7O0FBMElTQSxtRUFBZixFLENBVUEiLCJmaWxlIjoiLi9wYWdlcy9taWRpL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFdlYk1pZGkgZnJvbSBcIndlYm1pZGlcIjtcblxuY29uc3QgUGFnZSA9ICgpID0+IHtcbiAgICBsZXQgb3V0cHV0O1xuICAgIGxldCBpbnB1dDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIFdlYk1pZGkuZW5hYmxlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgY291bGQgbm90IGJlIGVuYWJsZWQuXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGVuYWJsZWQhXCIpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLmlucHV0cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLm91dHB1dHMpO1xuXG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLm91dHB1dHNbMF07XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxNTg0OTgyMzA3XCIpO1xuICAgICAgICAgICAgb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTA1NDEzMDg2N1wiKTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlOYW1lKFwiQXhpb20gUHJvIDI1IEV4dCBPdXRcIik7XG5cbiAgICAgICAgICAgIGlucHV0ID0gV2ViTWlkaS5nZXRJbnB1dEJ5TmFtZShcIkxVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aFwiKTtcbiAgICAgICAgICAgIGlucHV0LmFkZExpc3RlbmVyKFwic3lzZXhcIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFTdHJpbmcgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYIERBVEEgU1RSSU5HOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5wdXQuYWRkTGlzdGVuZXIoXCJjb250cm9sY2hhbmdlXCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2luZG93W1wid2VibWlkaVwiXSA9IFdlYk1pZGk7IC8vIEZvciBkZWJ1Z2dpbmdcblxuICAgICAgICAgICAgLy8gbS5nZXRPdXRwdXRCeUlkKC0yMDc1MTQxMzk1KSBNSURJIE1vbml0b3IgYnkgU25vaXplXG4gICAgICAgICAgICAvLyBvLnBsYXlOb3RlKFwiQzNcIilcbiAgICAgICAgICAgIC8vIG8uc3RvcE5vdGUoXCJDM1wiKVxuXG4gICAgICAgICAgICBXZWJNaWRpLk1JRElfU1lTVEVNX01FU1NBR0VTLnN5c2V4OyAvLyAjRjAgPT0gMjQwXG5cbiAgICAgICAgICAgIC8vIE1hbnVmYWN0dXJlciBJRHMgKEhleGFkZWNpbWFsKVxuICAgICAgICAgICAgLy8gQ01FIFhLZXkgQWlyIDAwIDIwIDYzXG4gICAgICAgICAgICAvLyBST0xJICAgICAgICAgMDAgMjEgMTBcblxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlbm9iL0xVTUktbGlnaHRzL2Jsb2IvbWFzdGVyL1NZU0VYLnR4dFxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMDEwMyAwMDYzIGY3XG4gICAgICAgICAgICA/Pz9cblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA0ZjAwIDAwMDAgMDAwMCA0NWY3XG4gICAgICAgICAgICBGMCAwMCAyMSAxMCA3NyAwNyAxMCAxMCAgNEYgMDAgMDAgMDAgMDAgMDAgNDUgRjdcblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA2ZjAwIDAwMDAgMDAwMCAyNWY3XG4gICAgICAgICAgICAqL1xuICAgICAgICB9LCB0cnVlIC8qIFNZU0VYIEVOQUJMRUQgKi8pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JTm90ZU9uID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQucGxheU5vdGUoXCJDNFwiLCBcImFsbFwiLCB7IGR1cmF0aW9uOiAyMDAwIH0pO1xuICAgIH07XG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmVub2IvTFVNSS1saWdodHMvYmxvYi9tYXN0ZXIvU1lTRVgudHh0XG4gICAgLy8gMHgwNyBpcyB0aGUgZGV2aWNlIElEP1xuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2V0U2NhbGVSb290ID0gKHJvb3ROb3RlKSA9PiB7XG4gICAgICAgIHN3aXRjaCAocm9vdE5vdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDXCI6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHgwMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHg0MV0pOyAvLyBSb290OiBDXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHgwMywgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgxMl0pOyAvLyBSb290OiBFXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiWFwiOlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHg0MywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgxMl0pOyAvLyBSb290OiA/XG4gICAgICAgICAgICAgICAgLy8gTWFqb3IgU2NhbGVcbiAgICAgICAgICAgICAgICAvLyA3NyAwNyAxMCA2MCAwMiAwMCAwMCAwMCAwMCAwMCA3RVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZUNoZWNrc3VtID0gKCkgPT4ge1xuICAgICAgICBsZXQgdmFsdWVzID0gWzB4MTAsIDB4NjAsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdO1xuICAgICAgICB2YXIgc3VtID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSA9IChzdW0gKiAzICsgdmFsdWVzW2ldKSAmIDB4ZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSAmIDB4N2Y7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2VyaWFsID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzgsIDB4M2ZdKTsgLy8gUVVFUlkgU0VSSUFMIE5VTUJFUiA9PiBMS0JEODRDV0E5NUtLSjdUXG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDAxLCAweDAzLCAweDAwLCAweDYzXSk7XG4gICAgICAgIC8vIExVTUkgcmVzcG9uZHMgOCB0aW1lcyB3aXRoOlxuICAgICAgICAvLyBGMCAwMCAyMSAxMCA3NyA0NyAwMCAwMCAwMCAwMCAyMCAwMCAwMCA2RCBGN1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVRlc3QgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgwMiwgMHg0NF0pO1xuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjcmVhdGVDaGVja3N1bSgpLnRvU3RyaW5nKDE2KSk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMT5NSURJIFRlc3QgUGFnZTwvaDE+XG4gICAgICAgICAgICA8aDI+TFVNSTwvaDI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+U2V0IFNjYWxlIFJvb3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JTm90ZU9ufT5Ob3RlIE9uIEM0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlNldCBTY2FsZSBSb290PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIkNcIil9PkM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIkVcIil9PkU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIlhcIil9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlDaGVja19YWFgxfT5DaGVjayA/Pz88L2J1dHRvbj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSVNlcmlhbH0+U2VyaWFsIE51bWJlcjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JVGVzdH0+VGVzdCBYWFg8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1JREkgVGVzdHNcIixcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG4vLyBURVNUIExVTUkgS0VZU1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})