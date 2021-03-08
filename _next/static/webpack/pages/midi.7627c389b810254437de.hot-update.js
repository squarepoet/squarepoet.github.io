webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined;\n\n\n\nvar Page = function Page() {\n  var output;\n  var input;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      });\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn() {\n    output.playNote(\"C4\", \"all\", {\n      duration: 2000\n    });\n  };\n\n  var onClickLUMISetScale = function onClickLUMISetScale() {\n    //output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: E\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41]); // Root: C\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x01, 0x03, 0x00, 0x63]); // LUMI responds 8 times with:\n    // F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"MIDI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMINoteOn,\n      children: \"LUMI Note On C4\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISetScale,\n      children: \"LUMI Set Scale\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 83,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMICheck_XXX1,\n      children: \"LUMI Check ???\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 85,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"LUMI Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 79,\n    columnNumber: 9\n  }, _this);\n};\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiaW5wdXQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImlucHV0cyIsIm91dHB1dHMiLCJnZXRPdXRwdXRCeUlkIiwiZ2V0SW5wdXRCeU5hbWUiLCJhZGRMaXN0ZW5lciIsImUiLCJkYXRhU3RyaW5nIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJkYXRhIiwid2luZG93IiwiTUlESV9TWVNURU1fTUVTU0FHRVMiLCJzeXNleCIsIm9uQ2xpY2tMVU1JTm90ZU9uIiwicGxheU5vdGUiLCJkdXJhdGlvbiIsIm9uQ2xpY2tMVU1JU2V0U2NhbGUiLCJzZW5kU3lzZXgiLCJvbkNsaWNrTFVNSVNlcmlhbCIsIm9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2YsTUFBSUMsTUFBSjtBQUNBLE1BQUlDLEtBQUo7O0FBRUEsWUFBbUM7QUFDL0JDLGtEQUFPLENBQUNDLE1BQVIsQ0FBZSxVQUFVQyxHQUFWLEVBQWU7QUFDMUIsVUFBSUEsR0FBSixFQUFTO0FBQ0xDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDRixHQUE3QztBQUNBO0FBQ0g7O0FBQ0RDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBRUFELGFBQU8sQ0FBQ0MsR0FBUixDQUFZSiw4Q0FBTyxDQUFDSyxNQUFwQjtBQUNBRixhQUFPLENBQUNDLEdBQVIsQ0FBWUosOENBQU8sQ0FBQ00sT0FBcEIsRUFSMEIsQ0FVMUI7QUFDQTs7QUFDQVIsWUFBTSxHQUFHRSw4Q0FBTyxDQUFDTyxhQUFSLENBQXNCLFlBQXRCLENBQVQsQ0FaMEIsQ0FhMUI7O0FBRUFSLFdBQUssR0FBR0MsOENBQU8sQ0FBQ1EsY0FBUixDQUF1Qixn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S0FBTTFCLEk7O0FBeUZTQSxtRUFBZixFLENBVUEiLCJmaWxlIjoiLi9wYWdlcy9taWRpL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJNaWRpIGZyb20gXCJ3ZWJtaWRpXCI7XG5cbmNvbnN0IFBhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IG91dHB1dDtcbiAgICBsZXQgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBXZWJNaWRpLmVuYWJsZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGNvdWxkIG5vdCBiZSBlbmFibGVkLlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViTWlkaSBlbmFibGVkIVwiKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5pbnB1dHMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5vdXRwdXRzKTtcblxuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5vdXRwdXRzWzBdO1xuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTU4NDk4MjMwN1wiKTtcbiAgICAgICAgICAgIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlJZChcIjEwNTQxMzA4NjdcIik7XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5TmFtZShcIkF4aW9tIFBybyAyNSBFeHQgT3V0XCIpO1xuXG4gICAgICAgICAgICBpbnB1dCA9IFdlYk1pZGkuZ2V0SW5wdXRCeU5hbWUoXCJMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGhcIik7XG4gICAgICAgICAgICBpbnB1dC5hZGRMaXN0ZW5lcihcInN5c2V4XCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YVN0cmluZyA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpLmRlY29kZShlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5hZGRMaXN0ZW5lcihcImNvbnRyb2xjaGFuZ2VcIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3aW5kb3dbXCJ3ZWJtaWRpXCJdID0gV2ViTWlkaTsgLy8gRm9yIGRlYnVnZ2luZ1xuXG4gICAgICAgICAgICAvLyBtLmdldE91dHB1dEJ5SWQoLTIwNzUxNDEzOTUpIE1JREkgTW9uaXRvciBieSBTbm9pemVcbiAgICAgICAgICAgIC8vIG8ucGxheU5vdGUoXCJDM1wiKVxuICAgICAgICAgICAgLy8gby5zdG9wTm90ZShcIkMzXCIpXG5cbiAgICAgICAgICAgIFdlYk1pZGkuTUlESV9TWVNURU1fTUVTU0FHRVMuc3lzZXg7IC8vICNGMCA9PSAyNDBcblxuICAgICAgICAgICAgLy8gTWFudWZhY3R1cmVyIElEcyAoSGV4YWRlY2ltYWwpXG4gICAgICAgICAgICAvLyBDTUUgWEtleSBBaXIgMDAgMjAgNjNcbiAgICAgICAgICAgIC8vIFJPTEkgICAgICAgICAwMCAyMSAxMFxuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYmVub2IvTFVNSS1saWdodHMvYmxvYi9tYXN0ZXIvU1lTRVgudHh0XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBmMDAwIDIxMTAgNzcwNyAwMTAzIDAwNjMgZjdcbiAgICAgICAgICAgID8/P1xuXG4gICAgICAgICAgICBmMDAwIDIxMTAgNzcwNyAxMDEwIDRmMDAgMDAwMCAwMDAwIDQ1ZjdcbiAgICAgICAgICAgIEYwIDAwIDIxIDEwIDc3IDA3IDEwIDEwICA0RiAwMCAwMCAwMCAwMCAwMCA0NSBGN1xuXG4gICAgICAgICAgICBmMDAwIDIxMTAgNzcwNyAxMDEwIDZmMDAgMDAwMCAwMDAwIDI1ZjdcbiAgICAgICAgICAgICovXG4gICAgICAgIH0sIHRydWUgLyogU1lTRVggRU5BQkxFRCAqLyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb25DbGlja0xVTUlOb3RlT24gPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5wbGF5Tm90ZShcIkM0XCIsIFwiYWxsXCIsIHsgZHVyYXRpb246IDIwMDAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2V0U2NhbGUgPSAoKSA9PiB7XG4gICAgICAgIC8vb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDEyXSk7IC8vIFJvb3Q6IEVcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDQxXSk7IC8vIFJvb3Q6IENcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXJpYWwgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3OCwgMHgzZl0pOyAvLyBRVUVSWSBTRVJJQUwgTlVNQkVSID0+IExLQkQ4NENXQTk1S0tKN1RcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlDaGVja19YWFgxID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzcsIDB4MDcsIDB4MDEsIDB4MDMsIDB4MDAsIDB4NjNdKTtcbiAgICAgICAgLy8gTFVNSSByZXNwb25kcyA4IHRpbWVzIHdpdGg6XG4gICAgICAgIC8vIEYwIDAwIDIxIDEwIDc3IDQ3IDAwIDAwIDAwIDAwIDIwIDAwIDAwIDZEIEY3XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2Pk1JREk8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlOb3RlT259PkxVTUkgTm90ZSBPbiBDNDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JU2V0U2NhbGV9PkxVTUkgU2V0IFNjYWxlPC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlDaGVja19YWFgxfT5MVU1JIENoZWNrID8/PzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JU2VyaWFsfT5MVU1JIFNlcmlhbCBOdW1iZXI8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1JREkgVGVzdHNcIixcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG4vLyBURVNUIExVTUkgS0VZU1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})