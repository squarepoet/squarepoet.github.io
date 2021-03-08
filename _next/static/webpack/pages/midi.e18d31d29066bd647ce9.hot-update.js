webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_2__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n\n\n\nvar Page = function Page() {\n  _s();\n\n  var output;\n  var input;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      });\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_2___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_2___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn(noteName) {\n    output.playNote(noteName, \"all\", {\n      duration: 2000\n    });\n  }; // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n  // 0x07 is the device ID?\n\n\n  var onClickLUMISetScaleRoot = function onClickLUMISetScaleRoot(rootNote) {\n    switch (rootNote) {\n      case \"C\":\n      default:\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x41]); // Root: C\n\n        break;\n\n      case \"E\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: E\n\n        break;\n\n      case \"X\":\n        output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00, 0x12]); // Root: ?\n        // Major Scale\n        // 77 07 10 60 02 00 00 00 00 00 7E\n\n        break;\n    }\n  }; // github user benob has a different device ID:\n  // [0x77, 0x37].concat(values).concat([checksum(values)]);\n  // We should allow the user of this page to customize the device ID.\n  // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?\n\n\n  var sendLUMICommand = function sendLUMICommand(command) {\n    var commandWithHeader = [0x77, 0x07].concat(command);\n    var checksum = createChecksum(command);\n    var commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);\n    var ROLIManufacturerID = [0x00, 0x21, 0x10];\n    output.sendSysex(ROLIManufacturerID, commandWithHeader);\n  };\n\n  var createChecksum = function createChecksum(values) {\n    var sum = values.length;\n\n    for (var i = 0; i < values.length; i++) {\n      sum = sum * 3 + values[i] & 0xff;\n    }\n\n    return sum & 0x7f;\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x01, 0x03, 0x00, 0x63]); // LUMI responds 8 times with:\n    // F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n  };\n\n  var onClickLUMITest = function onClickLUMITest() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x77, 0x07, 0x10, 0x02, 0x44]);\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {}, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n      children: \"MIDI Test Page\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 123,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h2\", {\n      children: \"LUMI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 124,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Light Up Note\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 126,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"C4\");\n          },\n          children: \"Note On C4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 128,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"D4\");\n          },\n          children: \"Note On D4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 129,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"E4\");\n          },\n          children: \"Note On E4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 130,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"F4\");\n          },\n          children: \"Note On F4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 131,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"G4\");\n          },\n          children: \"Note On G4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 132,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"A4\");\n          },\n          children: \"Note On A4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 133,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMINoteOn(\"B4\");\n          },\n          children: \"Note On B4\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 134,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 127,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 125,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 137,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: \"Set Scale Root\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 139,\n        columnNumber: 17\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"C\");\n          },\n          children: \"C\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 141,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"E\");\n          },\n          children: \"E\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 142,\n          columnNumber: 21\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n          onClick: function onClick() {\n            return onClickLUMISetScaleRoot(\"X\");\n          },\n          children: \"X\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 143,\n          columnNumber: 21\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 140,\n        columnNumber: 17\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 138,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 147,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMICheck_XXX1,\n      children: \"Check ???\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 148,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 149,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 150,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 151,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMITest,\n      children: \"Test XXX\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 152,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 122,\n    columnNumber: 9\n  }, _this);\n};\n\n_s(Page, \"OD7bBpZva5O2jO+Puf00hKivP7c=\");\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiaW5wdXQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImlucHV0cyIsIm91dHB1dHMiLCJnZXRPdXRwdXRCeUlkIiwiZ2V0SW5wdXRCeU5hbWUiLCJhZGRMaXN0ZW5lciIsImUiLCJkYXRhU3RyaW5nIiwiVGV4dERlY29kZXIiLCJkZWNvZGUiLCJkYXRhIiwid2luZG93IiwiTUlESV9TWVNURU1fTUVTU0FHRVMiLCJzeXNleCIsIm9uQ2xpY2tMVU1JTm90ZU9uIiwibm90ZU5hbWUiLCJwbGF5Tm90ZSIsImR1cmF0aW9uIiwib25DbGlja0xVTUlTZXRTY2FsZVJvb3QiLCJyb290Tm90ZSIsInNlbmRTeXNleCIsInNlbmRMVU1JQ29tbWFuZCIsImNvbW1hbmQiLCJjb21tYW5kV2l0aEhlYWRlciIsImNvbmNhdCIsImNoZWNrc3VtIiwiY3JlYXRlQ2hlY2tzdW0iLCJjb21tYW5kV2l0aEhlYWRlckFuZENoZWNrU3VtIiwiUk9MSU1hbnVmYWN0dXJlcklEIiwidmFsdWVzIiwic3VtIiwibGVuZ3RoIiwiaSIsIm9uQ2xpY2tMVU1JU2VyaWFsIiwib25DbGlja0xVTUlDaGVja19YWFgxIiwib25DbGlja0xVTUlUZXN0IiwidXNlRWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUFBOztBQUNmLE1BQUlDLE1BQUo7QUFDQSxNQUFJQyxLQUFKOztBQUVBLFlBQW1DO0FBQy9CQyxrREFBTyxDQUFDQyxNQUFSLENBQWUsVUFBVUMsR0FBVixFQUFlO0FBQzFCLFVBQUlBLEdBQUosRUFBUztBQUNMQyxlQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsR0FBN0M7QUFDQTtBQUNIOztBQUNEQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUVBRCxhQUFPLENBQUNDLEdBQVIsQ0FBWUosOENBQU8sQ0FBQ0ssTUFBcEI7QUFDQUYsYUFBTyxDQUFDQyxHQUFSLENBQVlKLDhDQUFPLENBQUNNLE9BQXBCLEVBUjBCLENBVTFCO0FBQ0E7O0FBQ0FSLFlBQU0sR0FBR0UsOENBQU8sQ0FBQ08sYUFBUixDQUFzQixZQUF0QixDQUFULENBWjBCLENBYTFCOztBQUVBUixXQUFLLEdBQUdDLDhDQUFPLENBQUNRLGNBQVIsQ0FBdUIsZ0NBQXZCLENBQVI7QUFDQVQsV0FBSyxDQUFDVSxXQUFOLENBQWtCLE9BQWxCLEVBQTJCLEtBQTNCLEVBQWtDLFVBQVVDLENBQVYsRUFBYTtBQUMzQ1AsZUFBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNBRCxlQUFPLENBQUNDLEdBQVIsQ0FBWU0sQ0FBWjtBQUNBLFlBQU1DLFVBQVUsR0FBRyxJQUFJQyxXQUFKLENBQWdCLE9BQWhCLEVBQXlCQyxNQUF6QixDQUFnQ0gsQ0FBQyxDQUFDSSxJQUFsQyxDQUFuQjtBQUNBWCxlQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBRCxlQUFPLENBQUNDLEdBQVIsQ0FBWU8sVUFBWjtBQUNILE9BTkQ7QUFPQVosV0FBSyxDQUFDVSxXQUFOLENBQWtCLGVBQWxCLEVBQW1DLEtBQW5DLEVBQTBDLFVBQVVDLENBQVYsRUFBYTtBQUNuRFAsZUFBTyxDQUFDQyxHQUFSLENBQVlNLENBQVo7QUFDSCxPQUZEO0FBSUFLLFlBQU0sQ0FBQyxTQUFELENBQU4sR0FBb0JmLDhDQUFwQixDQTNCMEIsQ0EyQkc7QUFFN0I7QUFDQTtBQUNBOztBQUVBQSxvREFBTyxDQUFDZ0Isb0JBQVIsQ0FBNkJDLEtBQTdCLENBakMwQixDQWlDVTtBQUVwQztBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdTLEtBbERELEVBa0RHO0FBQUs7QUFsRFI7QUFtREg7O0FBRUQsTUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxRQUFELEVBQWM7QUFDcENyQixVQUFNLENBQUNzQixRQUFQLENBQWdCRCxRQUFoQixFQUEwQixLQUExQixFQUFpQztBQUFFRSxjQUFRLEVBQUU7QUFBWixLQUFqQztBQUNILEdBRkQsQ0ExRGUsQ0E4RGY7QUFDQTs7O0FBQ0EsTUFBTUMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDQyxRQUFELEVBQWM7QUFDMUMsWUFBUUEsUUFBUjtBQUNJLFdBQUssR0FBTDtBQUNBO0FBQ0l6QixjQUFNLENBQUMwQixTQUFQLENBQWlCLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWpCLEVBQXFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLEVBQWlELElBQWpELEVBQXVELElBQXZELEVBQTZELElBQTdELENBQXJDLEVBREosQ0FDOEc7O0FBQzFHOztBQUNKLFdBQUssR0FBTDtBQUNJMUIsY0FBTSxDQUFDMEIsU0FBUCxDQUFpQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFqQixFQUFxQyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQyxJQUFyQyxFQUEyQyxJQUEzQyxFQUFpRCxJQUFqRCxFQUF1RCxJQUF2RCxFQUE2RCxJQUE3RCxDQUFyQyxFQURKLENBQzhHOztBQUMxRzs7QUFDSixXQUFLLEdBQUw7QUFDSTFCLGNBQU0sQ0FBQzBCLFNBQVAsQ0FBaUIsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FBakIsRUFBcUMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsRUFBNkQsSUFBN0QsQ0FBckMsRUFESixDQUM4RztBQUMxRztBQUNBOztBQUNBO0FBWlI7QUFjSCxHQWZELENBaEVlLENBaUZmO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxNQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLE9BQUQsRUFBYTtBQUNqQyxRQUFNQyxpQkFBaUIsR0FBRyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWFDLE1BQWIsQ0FBb0JGLE9BQXBCLENBQTFCO0FBQ0EsUUFBTUcsUUFBUSxHQUFHQyxjQUFjLENBQUNKLE9BQUQsQ0FBL0I7QUFDQSxRQUFNSyw0QkFBNEIsR0FBR0osaUJBQWlCLENBQUNDLE1BQWxCLENBQXlCQyxRQUF6QixDQUFyQztBQUNBLFFBQU1HLGtCQUFrQixHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQTNCO0FBQ0FsQyxVQUFNLENBQUMwQixTQUFQLENBQWlCUSxrQkFBakIsRUFBcUNMLGlCQUFyQztBQUNILEdBTkQ7O0FBUUEsTUFBTUcsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDRyxNQUFELEVBQVk7QUFDL0IsUUFBSUMsR0FBRyxHQUFHRCxNQUFNLENBQUNFLE1BQWpCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsTUFBTSxDQUFDRSxNQUEzQixFQUFtQ0MsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQ0YsU0FBRyxHQUFJQSxHQUFHLEdBQUcsQ0FBTixHQUFVRCxNQUFNLENBQUNHLENBQUQsQ0FBakIsR0FBd0IsSUFBOUI7QUFDSDs7QUFDRCxXQUFPRixHQUFHLEdBQUcsSUFBYjtBQUNILEdBTkQ7O0FBUUEsTUFBTUcsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzVCdkMsVUFBTSxDQUFDMEIsU0FBUCxDQUFpQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFqQixFQUFxQyxDQUFDLElBQUQsRUFBTyxJQUFQLENBQXJDLEVBRDRCLENBQ3dCO0FBQ3ZELEdBRkQ7O0FBSUEsTUFBTWMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixHQUFNO0FBQ2hDeEMsVUFBTSxDQUFDMEIsU0FBUCxDQUFpQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFqQixFQUFxQyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixDQUFyQyxFQURnQyxDQUVoQztBQUNBO0FBQ0gsR0FKRDs7QUFNQSxNQUFNZSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDMUJ6QyxVQUFNLENBQUMwQixTQUFQLENBQWlCLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWpCLEVBQXFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQXJDO0FBQ0gsR0FGRDs7QUFJQWdCLHlEQUFTLENBQUMsWUFBTSxDQUFFLENBQVQsRUFBVyxFQUFYLENBQVQ7QUFFQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREosZUFFSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZKLGVBR0k7QUFBQSw4QkFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURKLGVBRUk7QUFBQSxnQ0FDSTtBQUFRLGlCQUFPLEVBQUU7QUFBQSxtQkFBTXRCLGlCQUFpQixDQUFDLElBQUQsQ0FBdkI7QUFBQSxXQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFESixlQUVJO0FBQVEsaUJBQU8sRUFBRTtBQUFBLG1CQUFNQSxpQkFBaUIsQ0FBQyxJQUFELENBQXZCO0FBQUEsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRkosZUFHSTtBQUFRLGlCQUFPLEVBQUU7QUFBQSxtQkFBTUEsaUJBQWlCLENBQUMsSUFBRCxDQUF2QjtBQUFBLFdBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUhKLGVBSUk7QUFBUSxpQkFBTyxFQUFFO0FBQUEsbUJBQU1BLGlCQUFpQixDQUFDLElBQUQsQ0FBdkI7QUFBQSxXQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFKSixlQUtJO0FBQVEsaUJBQU8sRUFBRTtBQUFBLG1CQUFNQSxpQkFBaUIsQ0FBQyxJQUFELENBQXZCO0FBQUEsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBTEosZUFNSTtBQUFRLGlCQUFPLEVBQUU7QUFBQSxtQkFBTUEsaUJBQWlCLENBQUMsSUFBRCxDQUF2QjtBQUFBLFdBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQU5KLGVBT0k7QUFBUSxpQkFBTyxFQUFFO0FBQUEsbUJBQU1BLGlCQUFpQixDQUFDLElBQUQsQ0FBdkI7QUFBQSxXQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFQSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFISixlQWVJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFmSixlQWdCSTtBQUFBLDhCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREosZUFFSTtBQUFBLGdDQUNJO0FBQVEsaUJBQU8sRUFBRTtBQUFBLG1CQUFNSSx1QkFBdUIsQ0FBQyxHQUFELENBQTdCO0FBQUEsV0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREosZUFFSTtBQUFRLGlCQUFPLEVBQUU7QUFBQSxtQkFBTUEsdUJBQXVCLENBQUMsR0FBRCxDQUE3QjtBQUFBLFdBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZKLGVBR0k7QUFBUSxpQkFBTyxFQUFFO0FBQUEsbUJBQU1BLHVCQUF1QixDQUFDLEdBQUQsQ0FBN0I7QUFBQSxXQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFoQkosZUF5Qkk7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXpCSixlQTBCSTtBQUFRLGFBQU8sRUFBRWdCLHFCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTFCSixlQTJCSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBM0JKLGVBNEJJO0FBQVEsYUFBTyxFQUFFRCxpQkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE1QkosZUE2Qkk7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTdCSixlQThCSTtBQUFRLGFBQU8sRUFBRUUsZUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE5Qko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREo7QUFrQ0gsQ0F2SkQ7O0dBQU0xQyxJOztLQUFBQSxJOztBQXlKU0EsbUVBQWYsRSxDQVVBIiwiZmlsZSI6Ii4vcGFnZXMvbWlkaS9pbmRleC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBXZWJNaWRpIGZyb20gXCJ3ZWJtaWRpXCI7XG5cbmNvbnN0IFBhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IG91dHB1dDtcbiAgICBsZXQgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBXZWJNaWRpLmVuYWJsZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGNvdWxkIG5vdCBiZSBlbmFibGVkLlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViTWlkaSBlbmFibGVkIVwiKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5pbnB1dHMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coV2ViTWlkaS5vdXRwdXRzKTtcblxuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5vdXRwdXRzWzBdO1xuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTU4NDk4MjMwN1wiKTtcbiAgICAgICAgICAgIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlJZChcIjEwNTQxMzA4NjdcIik7XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5TmFtZShcIkF4aW9tIFBybyAyNSBFeHQgT3V0XCIpO1xuXG4gICAgICAgICAgICBpbnB1dCA9IFdlYk1pZGkuZ2V0SW5wdXRCeU5hbWUoXCJMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGhcIik7XG4gICAgICAgICAgICBpbnB1dC5hZGRMaXN0ZW5lcihcInN5c2V4XCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTWVNFWFwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhU3RyaW5nID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIikuZGVjb2RlKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTWVNFWCBEQVRBIFNUUklORzpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVN0cmluZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlucHV0LmFkZExpc3RlbmVyKFwiY29udHJvbGNoYW5nZVwiLCBcImFsbFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHdpbmRvd1tcIndlYm1pZGlcIl0gPSBXZWJNaWRpOyAvLyBGb3IgZGVidWdnaW5nXG5cbiAgICAgICAgICAgIC8vIG0uZ2V0T3V0cHV0QnlJZCgtMjA3NTE0MTM5NSkgTUlESSBNb25pdG9yIGJ5IFNub2l6ZVxuICAgICAgICAgICAgLy8gby5wbGF5Tm90ZShcIkMzXCIpXG4gICAgICAgICAgICAvLyBvLnN0b3BOb3RlKFwiQzNcIilcblxuICAgICAgICAgICAgV2ViTWlkaS5NSURJX1NZU1RFTV9NRVNTQUdFUy5zeXNleDsgLy8gI0YwID09IDI0MFxuXG4gICAgICAgICAgICAvLyBNYW51ZmFjdHVyZXIgSURzIChIZXhhZGVjaW1hbClcbiAgICAgICAgICAgIC8vIENNRSBYS2V5IEFpciAwMCAyMCA2M1xuICAgICAgICAgICAgLy8gUk9MSSAgICAgICAgIDAwIDIxIDEwXG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSU5vdGVPbiA9IChub3RlTmFtZSkgPT4ge1xuICAgICAgICBvdXRwdXQucGxheU5vdGUobm90ZU5hbWUsIFwiYWxsXCIsIHsgZHVyYXRpb246IDIwMDAgfSk7XG4gICAgfTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcbiAgICAvLyAweDA3IGlzIHRoZSBkZXZpY2UgSUQ/XG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXRTY2FsZVJvb3QgPSAocm9vdE5vdGUpID0+IHtcbiAgICAgICAgc3dpdGNoIChyb290Tm90ZSkge1xuICAgICAgICAgICAgY2FzZSBcIkNcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDQxXSk7IC8vIFJvb3Q6IENcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJFXCI6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDAzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDEyXSk7IC8vIFJvb3Q6IEVcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJYXCI6XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDEwLCAweDMwLCAweDQzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDEyXSk7IC8vIFJvb3Q6ID9cbiAgICAgICAgICAgICAgICAvLyBNYWpvciBTY2FsZVxuICAgICAgICAgICAgICAgIC8vIDc3IDA3IDEwIDYwIDAyIDAwIDAwIDAwIDAwIDAwIDdFXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZ2l0aHViIHVzZXIgYmVub2IgaGFzIGEgZGlmZmVyZW50IGRldmljZSBJRDpcbiAgICAvLyBbMHg3NywgMHgzN10uY29uY2F0KHZhbHVlcykuY29uY2F0KFtjaGVja3N1bSh2YWx1ZXMpXSk7XG4gICAgLy8gV2Ugc2hvdWxkIGFsbG93IHRoZSB1c2VyIG9mIHRoaXMgcGFnZSB0byBjdXN0b21pemUgdGhlIGRldmljZSBJRC5cbiAgICAvLyBNYXliZSAweDM3IHdhcyB0aGUga2lja3N0YXJ0ZXIgdmVyc2lvbiBvZiBMVU1JPyBIb3cgZG8gd2UgcXVlcnkgdGhlIGRldmljZSBJRD9cbiAgICBjb25zdCBzZW5kTFVNSUNvbW1hbmQgPSAoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBjb21tYW5kV2l0aEhlYWRlciA9IFsweDc3LCAweDA3XS5jb25jYXQoY29tbWFuZCk7XG4gICAgICAgIGNvbnN0IGNoZWNrc3VtID0gY3JlYXRlQ2hlY2tzdW0oY29tbWFuZCk7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRXaXRoSGVhZGVyQW5kQ2hlY2tTdW0gPSBjb21tYW5kV2l0aEhlYWRlci5jb25jYXQoY2hlY2tzdW0pO1xuICAgICAgICBjb25zdCBST0xJTWFudWZhY3R1cmVySUQgPSBbMHgwMCwgMHgyMSwgMHgxMF07XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoUk9MSU1hbnVmYWN0dXJlcklELCBjb21tYW5kV2l0aEhlYWRlcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZUNoZWNrc3VtID0gKHZhbHVlcykgPT4ge1xuICAgICAgICB2YXIgc3VtID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSA9IChzdW0gKiAzICsgdmFsdWVzW2ldKSAmIDB4ZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSAmIDB4N2Y7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2VyaWFsID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzgsIDB4M2ZdKTsgLy8gUVVFUlkgU0VSSUFMIE5VTUJFUiA9PiBMS0JEODRDV0E5NUtLSjdUXG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChbMHgwMCwgMHgyMSwgMHgxMF0sIFsweDc3LCAweDA3LCAweDAxLCAweDAzLCAweDAwLCAweDYzXSk7XG4gICAgICAgIC8vIExVTUkgcmVzcG9uZHMgOCB0aW1lcyB3aXRoOlxuICAgICAgICAvLyBGMCAwMCAyMSAxMCA3NyA0NyAwMCAwMCAwMCAwMCAyMCAwMCAwMCA2RCBGN1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVRlc3QgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3NywgMHgwNywgMHgxMCwgMHgwMiwgMHg0NF0pO1xuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge30sIFtdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDE+TUlESSBUZXN0IFBhZ2U8L2gxPlxuICAgICAgICAgICAgPGgyPkxVTUk8L2gyPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PkxpZ2h0IFVwIE5vdGU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JTm90ZU9uKFwiQzRcIil9Pk5vdGUgT24gQzQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSU5vdGVPbihcIkQ0XCIpfT5Ob3RlIE9uIEQ0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlOb3RlT24oXCJFNFwiKX0+Tm90ZSBPbiBFNDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JTm90ZU9uKFwiRjRcIil9Pk5vdGUgT24gRjQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrTFVNSU5vdGVPbihcIkc0XCIpfT5Ob3RlIE9uIEc0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0xVTUlOb3RlT24oXCJBNFwiKX0+Tm90ZSBPbiBBNDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JTm90ZU9uKFwiQjRcIil9Pk5vdGUgT24gQjQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+U2V0IFNjYWxlIFJvb3Q8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JU2V0U2NhbGVSb290KFwiQ1wiKX0+QzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JU2V0U2NhbGVSb290KFwiRVwiKX0+RTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2tMVU1JU2V0U2NhbGVSb290KFwiWFwiKX0+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSUNoZWNrX1hYWDF9PkNoZWNrID8/PzwvYnV0dG9uPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JU2VyaWFsfT5TZXJpYWwgTnVtYmVyPC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlUZXN0fT5UZXN0IFhYWDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTUlESSBUZXN0c1wiLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbi8vIFRFU1QgTFVNSSBLRVlTXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})