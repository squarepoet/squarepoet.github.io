webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_2__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\nvar Page = function Page() {\n  _s();\n\n  var output;\n  var input;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      });\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn(noteName) {\n    output.playNote(noteName, \"all\", {\n      duration: 2000\n    });\n  }; // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n  // 0x07 is the device ID?\n\n\n  var onClickLUMISetScaleRoot = function onClickLUMISetScaleRoot(rootNote) {\n    switch (rootNote) {\n      case \"C\":\n      default:\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41]); // Root: C\n\n        break;\n\n      case \"E\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: E\n\n        break;\n\n      case \"X\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: ?\n        // Major Scale\n        // 77 07 10 60 02 00 00 00 00 00 7E\n\n        break;\n    }\n  };\n\n  var sendLUMICommand = function sendLUMICommand(values) {\n    var commandWithChecksum = [0x77, 0x07];\n    output.sendSysex([0x00, 0x21, 0x10], commandWithChecksum);\n  };\n\n  var createChecksum = function createChecksum(values) {\n    var sum = values.length;\n\n    for (var i = 0; i < values.length; i++) {\n      sum = sum * 3 + values[i] & 0xff;\n    }\n\n    return sum & 0x7f;\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x01, 0x03, 0x00, 0x63]); // LUMI responds 8 times with:\n    // F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n  };\n\n  var onClickLUMITest = function onClickLUMITest() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x02, 0x44]);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {}, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n      children: \"MIDI Test Page\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 116,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"LUMI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 117,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Light Up Note\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 119,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"C4\");\n          },\n          children: \"Note On C4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 121,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"D4\");\n          },\n          children: \"Note On D4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 122,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"E4\");\n          },\n          children: \"Note On E4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 123,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"F4\");\n          },\n          children: \"Note On F4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 124,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"G4\");\n          },\n          children: \"Note On G4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 125,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"A4\");\n          },\n          children: \"Note On A4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 126,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"B4\");\n          },\n          children: \"Note On B4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 127,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 120,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 118,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 130,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Set Scale Root\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 132,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"C\");\n          },\n          children: \"C\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 134,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"E\");\n          },\n          children: \"E\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 135,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"X\");\n          },\n          children: \"X\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 136,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 133,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 131,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 140,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMICheck_XXX1,\n      children: \"Check ???\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 141,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 142,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 143,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 144,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMITest,\n      children: \"Test XXX\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 145,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 115,\n    columnNumber: 9\n  }, _this);\n};\n\n_s(Page, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiaW5wdXQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImlucHV0cyIsIm91dHB1dHMiLCJnZXRPdXRwdXRCeUlkIiwiZ2V0SW5wdXRCeU5hbWUiLCJhZGRMaXN0ZW5lciIsImUiLCJkYXRhU3RyaW5nIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJkYXRhIiwid2luZG93IiwiTUlESV9TWVNURU1fTUVTU0FHRVMiLCJzeXNleCIsIm9uQ2xpY2tMVU1JTm90ZU9uIiwibm90ZU5hbWUiLCJwbGF5Tm90ZSIsImR1cmF0aW9uIiwib25DbGlja0xVTUlTZXRTY2FsZVJvb3QiLCJyb290Tm90ZSIsInNlbmRTeXNleCIsInNlbmRMVU1JQ29tbWFuZCIsInZhbHVlcyIsImNvbW1hbmRXaXRoQ2hlY2tzdW0iLCJjcmVhdGVDaGVja3N1bSIsInN1bSIsImxlbmd0aCIsImkiLCJvbkNsaWNrTFVNSVNlcmlhbCIsIm9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSIsIm9uQ2xpY2tMVU1JVGVzdCIsInVzZUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFBQTs7QUFDZixNQUFJQyxNQUFKO0FBQ0EsTUFBSUMsS0FBSjs7QUFFQSxZQUFtQztBQUMvQkMsa0RBQU8sQ0FBQ0MsTUFBUixDQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUMxQixVQUFJQSxHQUFKLEVBQVM7QUFDTEMsZUFBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLEdBQTdDO0FBQ0E7QUFDSDs7QUFDREMsYUFBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFFQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlKLDhDQUFPLENBQUNLLE1BQXBCO0FBQ0FGLGFBQU8sQ0FB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STtBQUFRLGFBQU8sRUFBRUUsZUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE5Qko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREo7QUFrQ0gsQ0FoSkQ7O0dBQU1yQyxJOztLQUFBQSxJOztBQWtKU0EsbUVBQWYsRSxDQVVBIiwiZmlsZSI6Ii4vcGFnZXMvbWlkaS9pbmRleC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBXZWJNaWRpIGZyb20gXCJ3ZWJtaWRpXCI7XG5cbmNvbnN0IFBhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IG91dHB1dDtcbiAgICBsZXQgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBXZWJNaWRpLmVuYWJsZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGNvdWxkIG5vdCBiZSBlbmFibGVkLlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViTWlkaSBlbmFibGVkIVwiKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5pbnB1dHMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5vdXRwdXRzKTtcblxuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5vdXRwdXRzWzBdO1xuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTU4NDk4MjMwN1wiKTtcbiAgICAgICAgICAgIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlJZChcIjEwNTQxMzA4NjdcIik7XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5TmFtZShcIkF4aW9tIFBybyAyNSBFeHQgT3V0XCIpO1xuXG4gICAgICAgICAgICBpbnB1dCA9IFdlYk1pZGkuZ2V0SW5wdXRCeU5hbWUoXCJMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGhcIik7XG4gICAgICAgICAgICBpbnB1dC5hZGRMaXN0ZW5lcihcInN5c2V4XCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTWVNFWFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhU3RyaW5nID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIikuZGVjb2RlKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTWVNFWCBEQVRBIFNUUklORzpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVN0cmluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlucHV0LmFkZExpc3RlbmVyKFwiY29udHJvbGNoYW5nZVwiLCBcImFsbFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHdpbmRvd1tcIndlYm1pZGlcIl0gPSBXZWJNaWRpOyAvLyBGb3IgZGVidWdnaW5nXG5cbiAgICAgICAgICAgIC8vIG0uZ2V0T3V0cHV0QnlJZCgtMjA3NTE0MTM5NSkgTUlESSBNb25pdG9yIGJ5IFNub2l6ZVxuICAgICAgICAgICAgLy8gby5wbGF5Tm90ZShcIkMzXCIpXG4gICAgICAgICAgICAvLyBvLnN0b3BOb3RlKFwiQzNcIilcblxuICAgICAgICAgICAgV2ViTWlkaS5NSURJX1NZU1RFTV9NRVNTQUdFUy5zeXNleDsgLy8gI0YwID09IDI0MFxuXG4gICAgICAgICAgICAvLyBNYW51ZmFjdHVyZXIgSURzIChIZXhhZGVjaW1hbClcbiAgICAgICAgICAgIC8vIENNRSBYS2V5IEFpciAwMCAyMCA2M1xuICAgICAgICAgICAgLy8gUk9MSSAgICAgICAgIDAwIDIxIDEwXG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSU5vdGVPbiA9IChub3RlTmFtZSkgPT4ge1xuICAgICAgICBvdXRwdXQucGxheU5vdGUobm90ZU5hbWUsIFwiYWxsXCIsIHsgZHVyYXRpb246IDIwMDAgfSk7XG4gICAgfTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcbiAgICAvLyAweDA3IGlzIHRoZSBkZXZpY2UgSUQ/XG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXRTY2FsZVJvb3QgPSAocm9vdE5vdGUpID0+IHtcbiAgICAgICAgc3dpdGNoIChyb290Tm90ZSkge1xuICAgICAgICAgICAgY2FzZSBcIkNcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDQxXSk7IC8vIFJvb3Q6IENcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJFXCI6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDEyXSk7IC8vIFJvb3Q6IEVcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJYXCI6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDQzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDEyXSk7IC8vIFJvb3Q6ID9cbiAgICAgICAgICAgICAgICAvLyBNYWpvciBTY2FsZVxuICAgICAgICAgICAgICAgIC8vIDc3IDA3IDEwIDYwIDAyIDAwIDAwIDAwIDAwIDAwIDdFXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2VuZExVTUlDb21tYW5kID0gKHZhbHVlcykgPT4ge1xuICAgICAgICBsZXQgY29tbWFuZFdpdGhDaGVja3N1bSA9IFsweDc3LCAweDA3XTtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIGNvbW1hbmRXaXRoQ2hlY2tzdW0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVDaGVja3N1bSA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgdmFyIHN1bSA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gPSAoc3VtICogMyArIHZhbHVlc1tpXSkgJiAweGZmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW0gJiAweDdmO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVNlcmlhbCA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc4LCAweDNmXSk7IC8vIFFVRVJZIFNFUklBTCBOVU1CRVIgPT4gTEtCRDg0Q1dBOTVLS0o3VFxuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSUNoZWNrX1hYWDEgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgwMSwgMHgwMywgMHgwMCwgMHg2M10pO1xuICAgICAgICAvLyBMVU1JIHJlc3BvbmRzIDggdGltZXMgd2l0aDpcbiAgICAgICAgLy8gRjAgMDAgMjEgMTAgNzcgNDcgMDAgMDAgMDAgMDAgMjAgMDAgMDAgNkQgRjdcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlUZXN0ID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzcsIDB4MDcsIDB4MTAsIDB4MDIsIDB4NDRdKTtcbiAgICB9O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHt9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgxPk1JREkgVGVzdCBQYWdlPC9oMT5cbiAgICAgICAgICAgIDxoMj5MVU1JPC9oMj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5MaWdodCBVcCBOb3RlPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSU5vdGVPbihcIkM0XCIpfT5Ob3RlIE9uIEM0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlOb3RlT24oXCJENFwiKX0+Tm90ZSBPbiBENDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JTm90ZU9uKFwiRTRcIil9Pk5vdGUgT24gRTQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSU5vdGVPbihcIkY0XCIpfT5Ob3RlIE9uIEY0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlOb3RlT24oXCJHNFwiKX0+Tm90ZSBPbiBHNDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JTm90ZU9uKFwiQTRcIil9Pk5vdGUgT24gQTQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSU5vdGVPbihcIkI0XCIpfT5Ob3RlIE9uIEI0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlNldCBTY2FsZSBSb290PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIkNcIil9PkM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIkVcIil9PkU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSVNldFNjYWxlUm9vdChcIlhcIil9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlDaGVja19YWFgxfT5DaGVjayA/Pz88L2J1dHRvbj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSVNlcmlhbH0+U2VyaWFsIE51bWJlcjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JVGVzdH0+VGVzdCBYWFg8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1JREkgVGVzdHNcIixcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG4vLyBURVNUIExVTUkgS0VZU1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})