webpackHotUpdate_N_E("pages/midi",{

/***/ "./pages/midi/index.tsx":
/*!******************************!*\
  !*** ./pages/midi/index.tsx ***!
  \******************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _jsxFileName = \"/Users/ronyeh/Code/S/Web/squarepoet.github.io.src/pages/midi/index.tsx\",\n    _this = undefined;\n\n\n\nvar Page = function Page() {\n  var output;\n\n  if (true) {\n    webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.inputs);\n      console.log(webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.outputs); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.getOutputById(\"1054130867\"); // output = WebMidi.getOutputByName(\"Axiom Pro 25 Ext Out\");\n\n      window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_1___default.a; // For debugging\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_1___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n      // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  var onClickLUMINoteOn = function onClickLUMINoteOn() {\n    output.playNote(\"C4\", \"all\", {\n      duration: 2000\n    });\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex([0x00, 0x21, 0x10], [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: \"MIDI\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMINoteOn,\n      children: \"LUMI Note On C4\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 59,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"br\", {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 13\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n      onClick: onClickLUMISerial,\n      children: \"LUMI Serial Number\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 13\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 57,\n    columnNumber: 9\n  }, _this);\n};\n\n_c = Page;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page); // TEST LUMI KEYS\n\nvar _c;\n\n$RefreshReg$(_c, \"Page\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWlkaS9pbmRleC50c3g/NTBhYiJdLCJuYW1lcyI6WyJQYWdlIiwib3V0cHV0IiwiV2ViTWlkaSIsImVuYWJsZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJpbnB1dHMiLCJvdXRwdXRzIiwiZ2V0T3V0cHV0QnlJZCIsIndpbmRvdyIsIk1JRElfU1lTVEVNX01FU1NBR0VTIiwic3lzZXgiLCJvbkNsaWNrTFVNSU5vdGVPbiIsInBsYXlOb3RlIiwiZHVyYXRpb24iLCJvbkNsaWNrTFVNSVNlcmlhbCIsInNlbmRTeXNleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2YsTUFBSUMsTUFBSjs7QUFFQSxZQUFtQztBQUMvQkMsa0RBQU8sQ0FBQ0MsTUFBUixDQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUMxQixVQUFJQSxHQUFKLEVBQVM7QUFDTEMsZUFBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLEdBQTdDO0FBQ0E7QUFDSDs7QUFDREMsYUFBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFFQUQsYUFBTyxDQUFDQyxHQUFSLENBQVlKLDhDQUFPLENBQUNLLE1BQXBCO0FBQ0FGLGFBQU8sQ0FBQ0MsR0FBUixDQUFZSiw4Q0FBTyxDQUFDTSxPQUFwQixFQVIwQixDQVUxQjtBQUNBOztBQUNBUCxZQUFNLEdBQUdDLDhDQUFPLENBQUNPLGFBQVIsQ0FBc0IsWUFBdEIsQ0FBVCxDQVowQixDQWExQjs7QUFFQUMsWUFBTSxDQUFDLFNBQUQsQ0FBTixHQUFvQlIsOENBQXBCLENBZjBCLENBZUc7QUFFN0I7QUFDQTtBQUNBOztBQUVBQSxvREFBTyxDQUFDUyxvQkFBUixDQUE2QkMsS0FBN0IsQ0FyQjBCLENBcUJVO0FBRXBDO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR1MsS0F0Q0QsRUFzQ0c7QUFBSztBQXRDUjtBQXVDSDs7QUFFRCxNQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQU07QUFDNUJaLFVBQU0sQ0FBQ2EsUUFBUCxDQUFnQixJQUFoQixFQUFzQixLQUF0QixFQUE2QjtBQUFFQyxjQUFRLEVBQUU7QUFBWixLQUE3QjtBQUNILEdBRkQ7O0FBSUEsTUFBTUMsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzVCZixVQUFNLENBQUNnQixTQUFQLENBQWlCLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWpCLEVBQXFDLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBckMsRUFENEIsQ0FDd0I7QUFDdkQsR0FGRDs7QUFJQSxzQkFDSTtBQUFBLDRCQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBREosZUFFSTtBQUFRLGFBQU8sRUFBRUosaUJBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRkosZUFHSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSEosZUFJSTtBQUFRLGFBQU8sRUFBRUcsaUJBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREo7QUFRSCxDQTdERDs7S0FBTWhCLEk7O0FBK0RTQSxtRUFBZixFLENBVUEiLCJmaWxlIjoiLi9wYWdlcy9taWRpL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJNaWRpIGZyb20gXCJ3ZWJtaWRpXCI7XG5cbmNvbnN0IFBhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IG91dHB1dDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIFdlYk1pZGkuZW5hYmxlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgY291bGQgbm90IGJlIGVuYWJsZWQuXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGVuYWJsZWQhXCIpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLmlucHV0cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhXZWJNaWRpLm91dHB1dHMpO1xuXG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLm91dHB1dHNbMF07XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxNTg0OTgyMzA3XCIpO1xuICAgICAgICAgICAgb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTA1NDEzMDg2N1wiKTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlOYW1lKFwiQXhpb20gUHJvIDI1IEV4dCBPdXRcIik7XG5cbiAgICAgICAgICAgIHdpbmRvd1tcIndlYm1pZGlcIl0gPSBXZWJNaWRpOyAvLyBGb3IgZGVidWdnaW5nXG5cbiAgICAgICAgICAgIC8vIG0uZ2V0T3V0cHV0QnlJZCgtMjA3NTE0MTM5NSkgTUlESSBNb25pdG9yIGJ5IFNub2l6ZVxuICAgICAgICAgICAgLy8gby5wbGF5Tm90ZShcIkMzXCIpXG4gICAgICAgICAgICAvLyBvLnN0b3BOb3RlKFwiQzNcIilcblxuICAgICAgICAgICAgV2ViTWlkaS5NSURJX1NZU1RFTV9NRVNTQUdFUy5zeXNleDsgLy8gI0YwID09IDI0MFxuXG4gICAgICAgICAgICAvLyBNYW51ZmFjdHVyZXIgSURzIChIZXhhZGVjaW1hbClcbiAgICAgICAgICAgIC8vIENNRSBYS2V5IEFpciAwMCAyMCA2M1xuICAgICAgICAgICAgLy8gUk9MSSAgICAgICAgIDAwIDIxIDEwXG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSU5vdGVPbiA9ICgpID0+IHtcbiAgICAgICAgb3V0cHV0LnBsYXlOb3RlKFwiQzRcIiwgXCJhbGxcIiwgeyBkdXJhdGlvbjogMjAwMCB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXJpYWwgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoWzB4MDAsIDB4MjEsIDB4MTBdLCBbMHg3OCwgMHgzZl0pOyAvLyBRVUVSWSBTRVJJQUwgTlVNQkVSID0+IExLQkQ4NENXQTk1S0tKN1RcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+TUlESTwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTFVNSU5vdGVPbn0+TFVNSSBOb3RlIE9uIEM0PC9idXR0b24+XG4gICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25DbGlja0xVTUlTZXJpYWx9PkxVTUkgU2VyaWFsIE51bWJlcjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGl0bGU6IFwiTUlESSBUZXN0c1wiLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbi8vIFRFU1QgTFVNSSBLRVlTXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/midi/index.tsx\n");

/***/ })

})