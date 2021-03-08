webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined;\n\n\n\nvar Page = function Page() {\n  var output;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.outputs);\n      output = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.outputs[0]; // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn() {\n    output.playNote(\"C4\");\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER?\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"MIDI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMINoteOn,\n      children: \"LUMI Note On C4\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"LUMI Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 57,\n    columnNumber: 9\n  }, _this);\n};\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiV2ViTWlkaSIsImVuYWJsZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJpbnB1dHMiLCJvdXRwdXRzIiwiZ2V0T3V0cHV0QnlJZCIsIndpbmRvdyIsIk1JRElfU1lTVEVNX01FU1NBR0VTIiwic3lzZXgiLCJvbkNsaWNrTFVNSU5vdGVPbiIsInBsYXlOb3RlIiwib25DbGlja0xVTUlTZXJpYWwiLCJzZW5kU3lzZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUNmLE1BQUlDLE1BQUo7O0FBRUEsWUFBbUM7QUFDL0JDLGtEQUFPLENBQUNDLE1BQVIsQ0FBZSxVQUFVQyxHQUFWLEVBQWU7QUFDMUIsVUFBSUEsR0FBSixFQUFTO0FBQ0xDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDRixHQUE3QztBQUNBO0FBQ0g7O0FBQ0RDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBRUFELGFBQU8sQ0FBQ0MsR0FBUixDQUFZSiw4Q0FBTyxDQUFDSyxNQUFwQjtBQUNBRixhQUFPLENBQUNDLEdBQVIsQ0FBWUosOENBQU8sQ0FBQ00sT0FBcEI7QUFFQVAsWUFBTSxHQUFHQyw4Q0FBTyxDQUFDTSxPQUFSLENBQWdCLENBQWhCLENBQVQsQ0FWMEIsQ0FXMUI7O0FBQ0FQLFlBQU0sR0FBR0MsOENBQU8sQ0FBQ08sYUFBUixDQUFzQixZQUF0QixDQUFULENBWjBCLENBYTFCOztBQUVBQyxZQUFNLENBQUMsU0FBRCxDQUFOLEdBQW9CUiw4Q0FBcEIsQ0FmMEIsQ0FlRztBQUU3QjtBQUNBO0FBQ0E7O0FBRUFBLG9EQUFPLENBQUNTLG9CQUFSLENBQTZCQyxLQUE3QixDQXJCMEIsQ0FxQlU7QUFFcEM7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHUyxLQXRDRCxFQXNDRztBQUFLO0FBdENSO0FBdUNIOztBQUVELE1BQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM1QlosVUFBTSxDQUFDYSxRQUFQLENBQWdCLElBQWhCO0FBQ0gsR0FGRDs7QUFJQSxNQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07QUFDNUJkLFVBQU0sQ0FBQ2UsU0FBUCxDQUFpQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUFqQixFQUFxQyxDQUFDLElBQUQsRUFBTyxJQUFQLENBQXJDLEVBRDRCLENBQ3dCO0FBQ3ZELEdBRkQ7O0FBSUEsc0JBQ0k7QUFBQSw0QkFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURKLGVBRUk7QUFBUSxhQUFPLEVBQUVILGlCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZKLGVBR0k7QUFBUSxhQUFPLEVBQUVFLGlCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUhKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURKO0FBT0gsQ0E1REQ7O0tBQU1mLEk7O0FBOERTQSxtRUFBZixFLENBVUEiLCJmaWxlIjoiLi9wYWdlcy9taWRpL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJNaWRpIGZyb20gXCJ3ZWJtaWRpXCI7XG5cbmNvbnN0IFBhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IG91dHB1dDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIFdlYk1pZGkuZW5hYmxlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgY291bGQgbm90IGJlIGVuYWJsZWQuXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGVuYWJsZWQhXCIpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLmlucHV0cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLm91dHB1dHMpO1xuXG4gICAgICAgICAgICBvdXRwdXQgPSBXZWJNaWRpLm91dHB1dHNbMF07XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxNTg0OTgyMzA3XCIpO1xuICAgICAgICAgICAgb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTA1NDEzMDg2N1wiKTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlOYW1lKFwiQXhpb20gUHJvIDI1IEV4dCBPdXRcIik7XG5cbiAgICAgICAgICAgIHdpbmRvd1tcIndlYm1pZGlcIl0gPSBXZWJNaWRpOyAvLyBGb3IgZGVidWdnaW5nXG5cbiAgICAgICAgICAgIC8vIG0uZ2V0T3V0cHV0QnlJZCgtMjA3NTE0MTM5NSkgTUlESSBNb25pdG9yIGJ5IFNub2l6ZVxuICAgICAgICAgICAgLy8gby5wbGF5Tm90ZShcIkMzXCIpXG4gICAgICAgICAgICAvLyBvLnN0b3BOb3RlKFwiQzNcIilcblxuICAgICAgICAgICAgV2ViTWlkaS5NSURJX1NZU1RFTV9NRVNTQUdFUy5zeXNleDsgLy8gI0YwID09IDI0MFxuXG4gICAgICAgICAgICAvLyBNYW51ZmFjdHVyZXIgSURzIChIZXhhZGVjaW1hbClcbiAgICAgICAgICAgIC8vIENNRSBYS2V5IEFpciAwMCAyMCA2M1xuICAgICAgICAgICAgLy8gUk9MSSAgICAgICAgIDAwIDIxIDEwXG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSU5vdGVPbiA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnBsYXlOb3RlKFwiQzRcIik7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2VyaWFsID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFsweDAwLCAweDIxLCAweDEwXSwgWzB4NzgsIDB4M2ZdKTsgLy8gUVVFUlkgU0VSSUFMIE5VTUJFUj9cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+TUlESTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSU5vdGVPbn0+TFVNSSBOb3RlIE9uIEM0PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMVU1JU2VyaWFsfT5MVU1JIFNlcmlhbCBOdW1iZXI8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1JREkgVGVzdHNcIixcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG4vLyBURVNUIExVTUkgS0VZU1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})