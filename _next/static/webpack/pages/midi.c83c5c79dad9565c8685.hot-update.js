webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/MIDIControllerIO.ts":
/*!**********************************************!*\
  !*** ./apps/shared/midi/MIDIControllerIO.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n // Manufacturers:\n// Snoize / MIDI Monitor (Untitled XX)\n\nvar MIDIControllerIO;\n\n(function (_MIDIControllerIO) {\n  var inputs = [];\n  var outputs = [];\n\n  function start() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      setVariablesForDebugging();\n      printOutAllInputsAndOutputs();\n\n      var _iterator = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var i = _step.value;\n          inputs.push(i);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      var _iterator2 = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var o = _step2.value;\n          outputs.push(o);\n        } // output = WebMidi.outputs[0];\n        // output = WebMidi.getOutputById(\"1584982307\");\n        // output = WebMidi.getOutputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n        // LUMI Keys Block KJ7T Bluetooth id: 1054130867\n        // Xkey Air 37 BLE Bluetooth id: -1021446226\n\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.getOutputById(\"1054130867\"); // LUMI Keys Block KJ7T Bluetooth id: -899739147\n      // Xkey Air 37 BLE Bluetooth id: 1748751320\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n\n      if (!input) {\n        console.log(\"Input is: \" + input);\n        console.log(\"Cannot Find LUMI Keys\");\n        return;\n      }\n\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      }); // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  _MIDIControllerIO.start = start;\n\n  function setVariablesForDebugging() {\n    window[\"webmidi\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a;\n    window[\"m_in\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs;\n    window[\"m_out\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs;\n  }\n\n  function printOutAllInputsAndOutputs() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs.forEach(function (input) {\n      console.log(input);\n    });\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs.forEach(function (output) {\n      console.log(output);\n    });\n  }\n})(MIDIControllerIO || (MIDIControllerIO = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MIDIControllerIO);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9NSURJQ29udHJvbGxlcklPLnRzPzIwZjIiXSwibmFtZXMiOlsiaW5wdXRzIiwib3V0cHV0cyIsInN0YXJ0IiwiV2ViTWlkaSIsImVuYWJsZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzZXRWYXJpYWJsZXNGb3JEZWJ1Z2dpbmciLCJwcmludE91dEFsbElucHV0c0FuZE91dHB1dHMiLCJpIiwicHVzaCIsIm8iLCJvdXRwdXQiLCJnZXRPdXRwdXRCeUlkIiwiaW5wdXQiLCJnZXRJbnB1dEJ5TmFtZSIsImFkZExpc3RlbmVyIiwiZSIsImRhdGFTdHJpbmciLCJUZXh0RGVjb2RlciIsImRlY29kZSIsImRhdGEiLCJNSURJX1NZU1RFTV9NRVNTQUdFUyIsInN5c2V4Iiwid2luZG93IiwiZm9yRWFjaCIsIk1JRElDb250cm9sbGVySU8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztDQUVBO0FBQ0E7Ozs7O0FBRUksTUFBSUEsTUFBZSxHQUFHLEVBQXRCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4Qjs7QUFFTyxXQUFTQyxLQUFULEdBQWlCO0FBQ3BCQyxrREFBTyxDQUFDQyxNQUFSLENBQWUsVUFBVUMsR0FBVixFQUFlO0FBQzFCLFVBQUlBLEdBQUosRUFBUztBQUNMQyxlQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsR0FBN0M7QUFDQTtBQUNIOztBQUNEQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUVBQyw4QkFBd0I7QUFDeEJDLGlDQUEyQjs7QUFSRCxpREFVVk4sOENBQU8sQ0FBQ0gsTUFWRTtBQUFBOztBQUFBO0FBVTFCLDREQUFnQztBQUFBLGNBQXJCVSxDQUFxQjtBQUM1QlYsZ0JBQU0sQ0FBQ1csSUFBUCxDQUFZRCxDQUFaO0FBQ0g7QUFaeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrREFjVlAsOENBQU8sQ0FBQ0YsT0FkRTtBQUFBOztBQUFBO0FBYzFCLCtEQUFpQztBQUFBLGNBQXRCVyxDQUFzQjtBQUM3QlgsaUJBQU8sQ0FBQ1UsSUFBUixDQUFhQyxDQUFiO0FBQ0gsU0FoQnlCLENBa0IxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXRCMEI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF1QjFCQyxZQUFNLEdBQUdWLDhDQUFPLENBQUNXLGFBQVIsQ0FBc0IsWUFBdEIsQ0FBVCxDQXZCMEIsQ0F5QjFCO0FBQ0E7O0FBQ0FDLFdBQUssR0FBR1osOENBQU8sQ0FBQ2EsY0FBUixDQUF1QixnQ0FBdkIsQ0FBUjs7QUFFQSxVQUFJLENBQUNELEtBQUwsRUFBWTtBQUNSVCxlQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFlUSxLQUEzQjtBQUNBVCxlQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBO0FBQ0g7O0FBRURRLFdBQUssQ0FBQ0UsV0FBTixDQUFrQixPQUFsQixFQUEyQixLQUEzQixFQUFrQyxVQUFVQyxDQUFWLEVBQWE7QUFDM0NaLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDQUQsZUFBTyxDQUFDQyxHQUFSLENBQVlXLENBQVo7QUFDQSxZQUFNQyxVQUFVLEdBQUcsSUFBSUMsV0FBSixDQUFnQixPQUFoQixFQUF5QkMsTUFBekIsQ0FBZ0NILENBQUMsQ0FBQ0ksSUFBbEMsQ0FBbkI7QUFDQWhCLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBQ0FELGVBQU8sQ0FBQ0MsR0FBUixDQUFZWSxVQUFaO0FBQ0gsT0FORDtBQU9BSixXQUFLLENBQUNFLFdBQU4sQ0FBa0IsZUFBbEIsRUFBbUMsS0FBbkMsRUFBMEMsVUFBVUMsQ0FBVixFQUFhO0FBQ25EWixlQUFPLENBQUNDLEdBQVIsQ0FBWVcsQ0FBWjtBQUNILE9BRkQsRUExQzBCLENBOEMxQjtBQUNBO0FBQ0E7O0FBRUFmLG9EQUFPLENBQUNvQixvQkFBUixDQUE2QkMsS0FBN0IsQ0FsRDBCLENBa0RVO0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdTLEtBakVELEVBaUVHO0FBQUs7QUFqRVI7QUFrRUg7Ozs7QUFFRCxXQUFTaEIsd0JBQVQsR0FBb0M7QUFDaENpQixVQUFNLENBQUMsU0FBRCxDQUFOLEdBQW9CdEIsOENBQXBCO0FBQ0FzQixVQUFNLENBQUMsTUFBRCxDQUFOLEdBQWlCdEIsOENBQU8sQ0FBQ0gsTUFBekI7QUFDQXlCLFVBQU0sQ0FBQyxPQUFELENBQU4sR0FBa0J0Qiw4Q0FBTyxDQUFDRixPQUExQjtBQUNIOztBQUVELFdBQVNRLDJCQUFULEdBQXVDO0FBQ25DTixrREFBTyxDQUFDSCxNQUFSLENBQWUwQixPQUFmLENBQXVCLFVBQUNYLEtBQUQsRUFBVztBQUM5QlQsYUFBTyxDQUFDQyxHQUFSLENBQVlRLEtBQVo7QUFDSCxLQUZEO0FBR0FaLGtEQUFPLENBQUNGLE9BQVIsQ0FBZ0J5QixPQUFoQixDQUF3QixVQUFDYixNQUFELEVBQVk7QUFDaENQLGFBQU8sQ0FBQ0MsR0FBUixDQUFZTSxNQUFaO0FBQ0gsS0FGRDtBQUdIO0dBdEZLYyxnQixLQUFBQSxnQjs7QUF5RktBLCtFQUFmIiwiZmlsZSI6Ii4vYXBwcy9zaGFyZWQvbWlkaS9NSURJQ29udHJvbGxlcklPLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYk1pZGksIHsgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJ3ZWJtaWRpXCI7XG5cbi8vIE1hbnVmYWN0dXJlcnM6XG4vLyBTbm9pemUgLyBNSURJIE1vbml0b3IgKFVudGl0bGVkIFhYKVxubmFtZXNwYWNlIE1JRElDb250cm9sbGVySU8ge1xuICAgIGxldCBpbnB1dHM6IElucHV0W10gPSBbXTtcbiAgICBsZXQgb3V0cHV0czogT3V0cHV0W10gPSBbXTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgV2ViTWlkaS5lbmFibGUoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViTWlkaSBjb3VsZCBub3QgYmUgZW5hYmxlZC5cIiwgZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgZW5hYmxlZCFcIik7XG5cbiAgICAgICAgICAgIHNldFZhcmlhYmxlc0ZvckRlYnVnZ2luZygpO1xuICAgICAgICAgICAgcHJpbnRPdXRBbGxJbnB1dHNBbmRPdXRwdXRzKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiBXZWJNaWRpLmlucHV0cykge1xuICAgICAgICAgICAgICAgIGlucHV0cy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgV2ViTWlkaS5vdXRwdXRzKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0cy5wdXNoKG8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLm91dHB1dHNbMF07XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxNTg0OTgyMzA3XCIpO1xuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeU5hbWUoXCJMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGhcIik7XG4gICAgICAgICAgICAvLyBMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGggaWQ6IDEwNTQxMzA4NjdcbiAgICAgICAgICAgIC8vIFhrZXkgQWlyIDM3IEJMRSBCbHVldG9vdGggaWQ6IC0xMDIxNDQ2MjI2XG4gICAgICAgICAgICBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5SWQoXCIxMDU0MTMwODY3XCIpO1xuXG4gICAgICAgICAgICAvLyBMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGggaWQ6IC04OTk3MzkxNDdcbiAgICAgICAgICAgIC8vIFhrZXkgQWlyIDM3IEJMRSBCbHVldG9vdGggaWQ6IDE3NDg3NTEzMjBcbiAgICAgICAgICAgIGlucHV0ID0gV2ViTWlkaS5nZXRJbnB1dEJ5TmFtZShcIkxVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aFwiKTtcblxuICAgICAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5wdXQgaXM6IFwiICsgaW5wdXQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2Fubm90IEZpbmQgTFVNSSBLZXlzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXQuYWRkTGlzdGVuZXIoXCJzeXNleFwiLCBcImFsbFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1lTRVhcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YVN0cmluZyA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpLmRlY29kZShlLmRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1lTRVggREFUQSBTVFJJTkc6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTdHJpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5hZGRMaXN0ZW5lcihcImNvbnRyb2xjaGFuZ2VcIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBtLmdldE91dHB1dEJ5SWQoLTIwNzUxNDEzOTUpIE1JREkgTW9uaXRvciBieSBTbm9pemVcbiAgICAgICAgICAgIC8vIG8ucGxheU5vdGUoXCJDM1wiKVxuICAgICAgICAgICAgLy8gby5zdG9wTm90ZShcIkMzXCIpXG5cbiAgICAgICAgICAgIFdlYk1pZGkuTUlESV9TWVNURU1fTUVTU0FHRVMuc3lzZXg7IC8vICNGMCA9PSAyNDBcblxuICAgICAgICAgICAgLy8gTWFudWZhY3R1cmVyIElEcyAoSGV4YWRlY2ltYWwpXG4gICAgICAgICAgICAvLyBDTUUgWEtleSBBaXIgMDAgMjAgNjNcbiAgICAgICAgICAgIC8vIFJPTEkgICAgICAgICAwMCAyMSAxMFxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMDEwMyAwMDYzIGY3XG4gICAgICAgICAgICA/Pz9cblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA0ZjAwIDAwMDAgMDAwMCA0NWY3XG4gICAgICAgICAgICBGMCAwMCAyMSAxMCA3NyAwNyAxMCAxMCAgNEYgMDAgMDAgMDAgMDAgMDAgNDUgRjdcblxuICAgICAgICAgICAgZjAwMCAyMTEwIDc3MDcgMTAxMCA2ZjAwIDAwMDAgMDAwMCAyNWY3XG4gICAgICAgICAgICAqL1xuICAgICAgICB9LCB0cnVlIC8qIFNZU0VYIEVOQUJMRUQgKi8pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFZhcmlhYmxlc0ZvckRlYnVnZ2luZygpIHtcbiAgICAgICAgd2luZG93W1wid2VibWlkaVwiXSA9IFdlYk1pZGk7XG4gICAgICAgIHdpbmRvd1tcIm1faW5cIl0gPSBXZWJNaWRpLmlucHV0cztcbiAgICAgICAgd2luZG93W1wibV9vdXRcIl0gPSBXZWJNaWRpLm91dHB1dHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJpbnRPdXRBbGxJbnB1dHNBbmRPdXRwdXRzKCkge1xuICAgICAgICBXZWJNaWRpLmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgV2ViTWlkaS5vdXRwdXRzLmZvckVhY2goKG91dHB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cob3V0cHV0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNSURJQ29udHJvbGxlcklPO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/midi/MIDIControllerIO.ts\n");

/***/ })

})