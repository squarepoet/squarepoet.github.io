webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/MIDIControllerIO.ts":
/*!**********************************************!*\
  !*** ./apps/shared/midi/MIDIControllerIO.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _LUMIKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n // Manufacturers:\n// Snoize / MIDI Monitor (Untitled XX)\n\nvar MIDIControllerIO;\n\n(function (_MIDIControllerIO) {\n  var inputs = [];\n  var outputs = [];\n\n  function start() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      setVariablesForDebugging();\n      printOutAllInputsAndOutputs();\n\n      var _iterator = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var i = _step.value;\n          inputs.push(i);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      var _iterator2 = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var o = _step2.value;\n          outputs.push(o);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      _LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].connect(); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n      // output = WebMidi.getOutputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      // LUMI Keys Block KJ7T Bluetooth id: 1054130867\n      // Xkey Air 37 BLE Bluetooth id: -1021446226\n\n      output = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.getOutputById(\"1054130867\"); // LUMI Keys Block KJ7T Bluetooth id: -899739147\n      // Xkey Air 37 BLE Bluetooth id: 1748751320\n\n      input = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n\n      if (!input) {\n        console.log(\"Input is: \" + input);\n        console.log(\"Cannot Find LUMI Keys\");\n        return;\n      }\n\n      input.addListener(\"sysex\", \"all\", function (e) {\n        console.log(\"SYSEX\");\n        console.log(e);\n        var dataString = new TextDecoder(\"utf-8\").decode(e.data);\n        console.log(\"SYSEX DATA STRING:\");\n        console.log(dataString);\n      });\n      input.addListener(\"controlchange\", \"all\", function (e) {\n        console.log(e);\n      }); // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n\n      webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  _MIDIControllerIO.start = start;\n\n  function setVariablesForDebugging() {\n    window[\"wm\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a;\n    window[\"wm_i\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs;\n    window[\"wm_o\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs;\n  }\n\n  function printOutAllInputsAndOutputs() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs.forEach(function (input) {\n      console.log(input);\n    });\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs.forEach(function (output) {\n      console.log(output);\n    });\n  }\n})(MIDIControllerIO || (MIDIControllerIO = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MIDIControllerIO);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9NSURJQ29udHJvbGxlcklPLnRzPzIwZjIiXSwibmFtZXMiOlsiaW5wdXRzIiwib3V0cHV0cyIsInN0YXJ0IiwiV2ViTWlkaSIsImVuYWJsZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzZXRWYXJpYWJsZXNGb3JEZWJ1Z2dpbmciLCJwcmludE91dEFsbElucHV0c0FuZE91dHB1dHMiLCJpIiwicHVzaCIsIm8iLCJMVU1JS2V5cyIsImNvbm5lY3QiLCJvdXRwdXQiLCJnZXRPdXRwdXRCeUlkIiwiaW5wdXQiLCJnZXRJbnB1dEJ5TmFtZSIsImFkZExpc3RlbmVyIiwiZSIsImRhdGFTdHJpbmciLCJUZXh0RGVjb2RlciIsImRlY29kZSIsImRhdGEiLCJNSURJX1NZU1RFTV9NRVNTQUdFUyIsInN5c2V4Iiwid2luZG93IiwiZm9yRWFjaCIsIk1JRElDb250cm9sbGVySU8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtDQUlBO0FBQ0E7Ozs7O0FBRUksTUFBSUEsTUFBZSxHQUFHLEVBQXRCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4Qjs7QUFFTyxXQUFTQyxLQUFULEdBQWlCO0FBQ3BCQyxrREFBTyxDQUFDQyxNQUFSLENBQWUsVUFBVUMsR0FBVixFQUFlO0FBQzFCLFVBQUlBLEdBQUosRUFBUztBQUNMQyxlQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsR0FBN0M7QUFDQTtBQUNIOztBQUNEQyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUVBQyw4QkFBd0I7QUFDeEJDLGlDQUEyQjs7QUFSRCxpREFVVk4sOENBQU8sQ0FBQ0gsTUFWRTtBQUFBOztBQUFBO0FBVTFCLDREQUFnQztBQUFBLGNBQXJCVSxDQUFxQjtBQUM1QlYsZ0JBQU0sQ0FBQ1csSUFBUCxDQUFZRCxDQUFaO0FBQ0g7QUFaeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrREFjVlAsOENBQU8sQ0FBQ0YsT0FkRTtBQUFBOztBQUFBO0FBYzFCLCtEQUFpQztBQUFBLGNBQXRCVyxDQUFzQjtBQUM3QlgsaUJBQU8sQ0FBQ1UsSUFBUixDQUFhQyxDQUFiO0FBQ0g7QUFoQnlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0IxQkMsdURBQVEsQ0FBQ0MsT0FBVCxHQWxCMEIsQ0FvQjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FDLFlBQU0sR0FBR1osOENBQU8sQ0FBQ2EsYUFBUixDQUFzQixZQUF0QixDQUFULENBekIwQixDQTJCMUI7QUFDQTs7QUFDQUMsV0FBSyxHQUFHZCw4Q0FBTyxDQUFDZSxjQUFSLENBQXVCLGdDQUF2QixDQUFSOztBQUVBLFVBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1JYLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQWVVLEtBQTNCO0FBQ0FYLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaO0FBQ0E7QUFDSDs7QUFFRFUsV0FBSyxDQUFDRSxXQUFOLENBQWtCLE9BQWxCLEVBQTJCLEtBQTNCLEVBQWtDLFVBQVVDLENBQVYsRUFBYTtBQUMzQ2QsZUFBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNBRCxlQUFPLENBQUNDLEdBQVIsQ0FBWWEsQ0FBWjtBQUNBLFlBQU1DLFVBQVUsR0FBRyxJQUFJQyxXQUFKLENBQWdCLE9BQWhCLEVBQXlCQyxNQUF6QixDQUFnQ0gsQ0FBQyxDQUFDSSxJQUFsQyxDQUFuQjtBQUNBbEIsZUFBTyxDQUFDQyxHQUFSLENBQVksb0JBQVo7QUFDQUQsZUFBTyxDQUFDQyxHQUFSLENBQVljLFVBQVo7QUFDSCxPQU5EO0FBT0FKLFdBQUssQ0FBQ0UsV0FBTixDQUFrQixlQUFsQixFQUFtQyxLQUFuQyxFQUEwQyxVQUFVQyxDQUFWLEVBQWE7QUFDbkRkLGVBQU8sQ0FBQ0MsR0FBUixDQUFZYSxDQUFaO0FBQ0gsT0FGRCxFQTVDMEIsQ0FnRDFCO0FBQ0E7QUFDQTs7QUFFQWpCLG9EQUFPLENBQUNzQixvQkFBUixDQUE2QkMsS0FBN0IsQ0FwRDBCLENBb0RVO0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdTLEtBbkVELEVBbUVHO0FBQUs7QUFuRVI7QUFvRUg7Ozs7QUFFRCxXQUFTbEIsd0JBQVQsR0FBb0M7QUFDaENtQixVQUFNLENBQUMsSUFBRCxDQUFOLEdBQWV4Qiw4Q0FBZjtBQUNBd0IsVUFBTSxDQUFDLE1BQUQsQ0FBTixHQUFpQnhCLDhDQUFPLENBQUNILE1BQXpCO0FBQ0EyQixVQUFNLENBQUMsTUFBRCxDQUFOLEdBQWlCeEIsOENBQU8sQ0FBQ0YsT0FBekI7QUFDSDs7QUFFRCxXQUFTUSwyQkFBVCxHQUF1QztBQUNuQ04sa0RBQU8sQ0FBQ0gsTUFBUixDQUFlNEIsT0FBZixDQUF1QixVQUFDWCxLQUFELEVBQVc7QUFDOUJYLGFBQU8sQ0FBQ0MsR0FBUixDQUFZVSxLQUFaO0FBQ0gsS0FGRDtBQUdBZCxrREFBTyxDQUFDRixPQUFSLENBQWdCMkIsT0FBaEIsQ0FBd0IsVUFBQ2IsTUFBRCxFQUFZO0FBQ2hDVCxhQUFPLENBQUNDLEdBQVIsQ0FBWVEsTUFBWjtBQUNILEtBRkQ7QUFHSDtHQXhGS2MsZ0IsS0FBQUEsZ0I7O0FBMkZLQSwrRUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL21pZGkvTUlESUNvbnRyb2xsZXJJTy50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJNaWRpLCB7IElucHV0LCBPdXRwdXQgfSBmcm9tIFwid2VibWlkaVwiO1xuXG5pbXBvcnQgTFVNSUtleXMgZnJvbSBcIi4vTFVNSUtleXNcIjtcblxuLy8gTWFudWZhY3R1cmVyczpcbi8vIFNub2l6ZSAvIE1JREkgTW9uaXRvciAoVW50aXRsZWQgWFgpXG5uYW1lc3BhY2UgTUlESUNvbnRyb2xsZXJJTyB7XG4gICAgbGV0IGlucHV0czogSW5wdXRbXSA9IFtdO1xuICAgIGxldCBvdXRwdXRzOiBPdXRwdXRbXSA9IFtdO1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBXZWJNaWRpLmVuYWJsZShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGNvdWxkIG5vdCBiZSBlbmFibGVkLlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViTWlkaSBlbmFibGVkIVwiKTtcblxuICAgICAgICAgICAgc2V0VmFyaWFibGVzRm9yRGVidWdnaW5nKCk7XG4gICAgICAgICAgICBwcmludE91dEFsbElucHV0c0FuZE91dHB1dHMoKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBpIG9mIFdlYk1pZGkuaW5wdXRzKSB7XG4gICAgICAgICAgICAgICAgaW5wdXRzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbyBvZiBXZWJNaWRpLm91dHB1dHMpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRzLnB1c2gobyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExVTUlLZXlzLmNvbm5lY3QoKTtcblxuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5vdXRwdXRzWzBdO1xuICAgICAgICAgICAgLy8gb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTU4NDk4MjMwN1wiKTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlOYW1lKFwiTFVNSSBLZXlzIEJsb2NrIEtKN1QgQmx1ZXRvb3RoXCIpO1xuICAgICAgICAgICAgLy8gTFVNSSBLZXlzIEJsb2NrIEtKN1QgQmx1ZXRvb3RoIGlkOiAxMDU0MTMwODY3XG4gICAgICAgICAgICAvLyBYa2V5IEFpciAzNyBCTEUgQmx1ZXRvb3RoIGlkOiAtMTAyMTQ0NjIyNlxuICAgICAgICAgICAgb3V0cHV0ID0gV2ViTWlkaS5nZXRPdXRwdXRCeUlkKFwiMTA1NDEzMDg2N1wiKTtcblxuICAgICAgICAgICAgLy8gTFVNSSBLZXlzIEJsb2NrIEtKN1QgQmx1ZXRvb3RoIGlkOiAtODk5NzM5MTQ3XG4gICAgICAgICAgICAvLyBYa2V5IEFpciAzNyBCTEUgQmx1ZXRvb3RoIGlkOiAxNzQ4NzUxMzIwXG4gICAgICAgICAgICBpbnB1dCA9IFdlYk1pZGkuZ2V0SW5wdXRCeU5hbWUoXCJMVU1JIEtleXMgQmxvY2sgS0o3VCBCbHVldG9vdGhcIik7XG5cbiAgICAgICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklucHV0IGlzOiBcIiArIGlucHV0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBGaW5kIExVTUkgS2V5c1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0LmFkZExpc3RlbmVyKFwic3lzZXhcIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFTdHJpbmcgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNZU0VYIERBVEEgU1RSSU5HOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhU3RyaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5wdXQuYWRkTGlzdGVuZXIoXCJjb250cm9sY2hhbmdlXCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gbS5nZXRPdXRwdXRCeUlkKC0yMDc1MTQxMzk1KSBNSURJIE1vbml0b3IgYnkgU25vaXplXG4gICAgICAgICAgICAvLyBvLnBsYXlOb3RlKFwiQzNcIilcbiAgICAgICAgICAgIC8vIG8uc3RvcE5vdGUoXCJDM1wiKVxuXG4gICAgICAgICAgICBXZWJNaWRpLk1JRElfU1lTVEVNX01FU1NBR0VTLnN5c2V4OyAvLyAjRjAgPT0gMjQwXG5cbiAgICAgICAgICAgIC8vIE1hbnVmYWN0dXJlciBJRHMgKEhleGFkZWNpbWFsKVxuICAgICAgICAgICAgLy8gQ01FIFhLZXkgQWlyIDAwIDIwIDYzXG4gICAgICAgICAgICAvLyBST0xJICAgICAgICAgMDAgMjEgMTBcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRWYXJpYWJsZXNGb3JEZWJ1Z2dpbmcoKSB7XG4gICAgICAgIHdpbmRvd1tcIndtXCJdID0gV2ViTWlkaTtcbiAgICAgICAgd2luZG93W1wid21faVwiXSA9IFdlYk1pZGkuaW5wdXRzO1xuICAgICAgICB3aW5kb3dbXCJ3bV9vXCJdID0gV2ViTWlkaS5vdXRwdXRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByaW50T3V0QWxsSW5wdXRzQW5kT3V0cHV0cygpIHtcbiAgICAgICAgV2ViTWlkaS5pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFdlYk1pZGkub3V0cHV0cy5mb3JFYWNoKChvdXRwdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTUlESUNvbnRyb2xsZXJJTztcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/midi/MIDIControllerIO.ts\n");

/***/ })

})