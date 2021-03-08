webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined;\n\n\n\nvar Page = function Page() {\n  var output;\n  var input;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      });\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn() {\n    output.playNote(\"C4\", \"all\", {\n      duration: 2000\n    });\n  };\n\n  var onClickLUMISetScale = function onClickLUMISetScale(rootNote) {\n    switch (rootNote) {\n      case \"C\":\n      default:\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41]); // Root: C\n\n        break;\n\n      case \"E\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: E\n\n        break;\n\n      case \"X\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: ?\n\n        break;\n    }\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x01, 0x03, 0x00, 0x63]); // LUMI responds 8 times with:\n    // F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n  };\n\n  var onClickLUMITest = function onClickLUMITest() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x02, 0x44]);\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"MIDI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 96,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMINoteOn,\n      children: \"LUMI Note On C4\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 97,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"LUMI Set Scale Root\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 99,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: function onClick() {\n        return onClickLUMISetScale(\"C\");\n      },\n      children: \"C\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 100,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: function onClick() {\n        return onClickLUMISetScale(\"E\");\n      },\n      children: \"E\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 101,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: function onClick() {\n        return onClickLUMISetScale(\"X\");\n      },\n      children: \"X\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 102,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMICheck_XXX1,\n      children: \"LUMI Check ???\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 105,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"LUMI Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 106,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 107,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMITest,\n      children: \"LUMI Test XXX\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 108,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 95,\n    columnNumber: 9\n  }, _this);\n};\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiaW5wdXQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImlucHV0cyIsIm91dHB1dHMiLCJnZXRPdXRwdXRCeUlkIiwiZ2V0SW5wdXRCeU5hbWUiLCJhZGRMaXN0ZW5lciIsImUiLCJkYXRhU3RyaW5nIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJkYXRhIiwid2luZG93IiwiTUlESV9TWVNURU1fTUVTU0FHRVMiLCJzeXNleCIsIm9uQ2xpY2tMVU1JTm90ZU9uIiwicGxheU5vdGUiLCJkdXJhdGlvbiIsIm9uQ2xpY2tMVU1JU2V0U2NhbGUiLCJyb290Tm90ZSIsInNlbmRTeXNleCIsIm9uQ2xpY2tMVU1JU2VyaWFsIiwib25DbGlja0xVTUlDaGVja19YWFgxIiwib25DbGlja0xVTUlUZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDZixNQUFJQyxNQUFKO0FBQ0EsTUFBSUMsS0FBSjs7QUFFQSxZQUFtQztBQUMvQkMsa0RBQU8sQ0FBQ0MsTUFBUixDQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUMxQixVQUFJQSxHQUFKLEVBQVM7QUFDTEMsZUFBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLEdBQTdDO0FBQ0E7QUFDSDs7QUFDREMsYUFBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFFQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlKLDhDQUFPLENBQUNLLE1BQXBCO0FBQ0FGLGFBQU8sQ0FBQ0MsR0FBUixDQUFZSiw4Q0FBTyxDQUFDTSxPQUFwQixFQVIwQixDQVUxQjtBQUNBOztBQUNBUixZQUFNLEdBQUdFLDhDQUFPLENBQUNPLGFBQVIsQ0FBc0IsWUFBdEIsQ0FBVCxDQVowQixDQWExQjs7QUFFQVIsV0FBSyxH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QUFFSSxxQkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFUSixlQVVJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFWSixlQVdJO0FBQVEsYUFBTyxFQUFFRCxpQkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFYSixlQVlJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFaSixlQWFJO0FBQVEsYUFBTyxFQUFFRSxlQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURKO0FBaUJILENBNUdEOztLQUFNN0IsSTs7QUE4R1NBLG1FQUFmLEUsQ0FVQSIsImZpbGUiOiIuL3BhZ2VzL21pZGkvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYk1pZGkgZnJvbSBcIndlYm1pZGlcIjtcblxuY29uc3QgUGFnZSA9ICgpID0+IHtcbiAgICBsZXQgb3V0cHV0O1xuICAgIGxldCBpbnB1dDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIFdlYk1pZGkuZW5hYmxlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgY291bGQgbm90IGJlIGVuYWJsZWQuXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGVuYWJsZWQhXCIpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLmlucHV0cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLm91dHB1dHMpO1xuXG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLm91dHB1dHNbMF07XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxNTg0OTgyMzA3XCIpO1xuICAgICAgICAgICAgb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTA1NDEzMDg2N1wiKTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlOYW1lKFwiQXhpb20gUHJvIDI1IEV4dCBPdXRcIik7XG5cbiAgICAgICAgICAgIGlucHV0ID0gV2ViTWlkaS5nZXRJbnB1dEJ5TmFtZShcIkxVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aFwiKTtcbiAgICAgICAgICAgIGlucHV0LmFkZExpc3RlbmVyKFwic3lzZXhcIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFTdHJpbmcgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYIERBVEEgU1RSSU5HOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5wdXQuYWRkTGlzdGVuZXIoXCJjb250cm9sY2hhbmdlXCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd2luZG93W1wid2VibWlkaVwiXSA9IFdlYk1pZGk7IC8vIEZvciBkZWJ1Z2dpbmdcblxuICAgICAgICAgICAgLy8gbS5nZXRPdXRwdXRCeUlkKC0yMDc1MTQxMzk1KSBNSURJIE1vbml0b3IgYnkgU25vaXplXG4gICAgICAgICAgICAvLyBvLnBsYXlOb3RlKFwiQzNcIilcbiAgICAgICAgICAgIC8vIG8uc3RvcE5vdGUoXCJDM1wiKVxuXG4gICAgICAgICAgICBXZWJNaWRpLk1JRElfU1lTVEVNX01FU1NBR0VTLnN5c2V4OyAvLyAjRjAgPT0gMjQwXG5cbiAgICAgICAgICAgIC8vIE1hbnVmYWN0dXJlciBJRHMgKEhleGFkZWNpbWFsKVxuICAgICAgICAgICAgLy8gQ01FIFhLZXkgQWlyIDAwIDIwIDYzXG4gICAgICAgICAgICAvLyBST0xJICAgICAgICAgMDAgMjEgMTBcblxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlbm9iL0xVTUktbGlnaHRzL2Jsb2IvbWFzdGVyL1NZU0VYLnR4dFxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMDEwMyAwMDYzIGY3XG4gICAgICAgICAgICA/Pz9cblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA0ZjAwIDAwMDAgMDAwMCA0NWY3XG4gICAgICAgICAgICBGMCAwMCAyMSAxMCA3NyAwNyAxMCAxMCAgNEYgMDAgMDAgMDAgMDAgMDAgNDUgRjdcblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA2ZjAwIDAwMDAgMDAwMCAyNWY3XG4gICAgICAgICAgICAqL1xuICAgICAgICB9LCB0cnVlIC8qIFNZU0VYIEVOQUJMRUQgKi8pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JTm90ZU9uID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQucGxheU5vdGUoXCJDNFwiLCBcImFsbFwiLCB7IGR1cmF0aW9uOiAyMDAwIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVNldFNjYWxlID0gKHJvb3ROb3RlKSA9PiB7XG4gICAgICAgIHN3aXRjaCAocm9vdE5vdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJDXCI6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHgwMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHg0MV0pOyAvLyBSb290OiBDXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRVwiOlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHgwMywgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgxMl0pOyAvLyBSb290OiBFXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiWFwiOlxuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgzMCwgMHgwMywgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgxMl0pOyAvLyBSb290OiA/XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXJpYWwgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3OCwgMHgzZl0pOyAvLyBRVUVSWSBTRVJJQUwgTlVNQkVSID0+IExLQkQ4NENXQTk1S0tKN1RcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlDaGVja19YWFgxID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzcsIDB4MDcsIDB4MDEsIDB4MDMsIDB4MDAsIDB4NjNdKTtcbiAgICAgICAgLy8gTFVNSSByZXNwb25kcyA4IHRpbWVzIHdpdGg6XG4gICAgICAgIC8vIEYwIDAwIDIxIDEwIDc3IDQ3IDAwIDAwIDAwIDAwIDIwIDAwIDAwIDZEIEY3XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JVGVzdCA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDAyLCAweDQ0XSk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2Pk1JREk8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlOb3RlT259PkxVTUkgTm90ZSBPbiBDNDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8ZGl2PkxVTUkgU2V0IFNjYWxlIFJvb3Q8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlTZXRTY2FsZShcIkNcIil9PkM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlTZXRTY2FsZShcIkVcIil9PkU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlTZXRTY2FsZShcIlhcIil9Plg8L2J1dHRvbj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSUNoZWNrX1hYWDF9PkxVTUkgQ2hlY2sgPz8/PC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlTZXJpYWx9PkxVTUkgU2VyaWFsIE51bWJlcjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JVGVzdH0+TFVNSSBUZXN0IFhYWDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTUlESSBUZXN0c1wiLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbi8vIFRFU1QgTFVNSSBLRVlTXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})