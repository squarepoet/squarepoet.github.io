webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/MIDIControllerIO.ts":
/*!**********************************************!*\
  !*** ./apps/shared/midi/MIDIControllerIO.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _LUMIKeys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n // Manufacturers:\n// Snoize / MIDI Monitor (Untitled XX)\n\nvar MIDIControllerIO;\n\n(function (_MIDIControllerIO) {\n  var inputs = [];\n  var outputs = [];\n  var soundOutput = null;\n  var logOutput = null;\n\n  function start() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.enable(function (err) {\n      if (err) {\n        console.log(\"WebMidi could not be enabled.\", err);\n        return;\n      }\n\n      console.log(\"WebMidi enabled!\");\n      setVariablesForDebugging();\n      printOutAllInputsAndOutputs();\n\n      var _iterator = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var i = _step.value;\n          inputs.push(i);\n          i.addListener(\"noteon\", \"all\", function (e) {\n            // console.log(e);\n            playMIDINote(e.note.number, e.rawVelocity);\n          });\n          i.addListener(\"noteoff\", \"all\", function (e) {\n            // console.log(e);\n            stopMIDINote(e.note.number, e.rawVelocity);\n          });\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      var _iterator2 = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var o = _step2.value;\n          outputs.push(o);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      _LUMIKeys__WEBPACK_IMPORTED_MODULE_1__[\"default\"].connect(); // output = WebMidi.outputs[0];\n      // output = WebMidi.getOutputById(\"1584982307\");\n      // output = WebMidi.getOutputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      // LUMI Keys Block KJ7T Bluetooth id: 1054130867\n      // Xkey Air 37 BLE Bluetooth id: -1021446226\n      // output = WebMidi.getOutputById(\"1054130867\");\n      // LUMI Keys Block KJ7T Bluetooth id: -899739147\n      // Xkey Air 37 BLE Bluetooth id: 1748751320\n      // input = WebMidi.getInputByName(\"LUMI Keys Block KJ7T Bluetooth\");\n      // if (!input) {\n      //     console.log(\"Input is: \" + input);\n      //     console.log(\"Cannot Find LUMI Keys\");\n      //     return;\n      // }\n      // input.addListener(\"sysex\", \"all\", function (e) {\n      //     console.log(\"SYSEX\");\n      //     console.log(e);\n      //     const dataString = new TextDecoder(\"utf-8\").decode(e.data);\n      //     console.log(\"SYSEX DATA STRING:\");\n      //     console.log(dataString);\n      // });\n      // input.addListener(\"controlchange\", \"all\", function (e) {\n      //     console.log(e);\n      // });\n      // m.getOutputById(-2075141395) MIDI Monitor by Snoize\n      // o.playNote(\"C3\")\n      // o.stopNote(\"C3\")\n      // WebMidi.MIDI_SYSTEM_MESSAGES.sysex; // #F0 == 240\n      // Manufacturer IDs (Hexadecimal)\n      // CME XKey Air 00 20 63\n      // ROLI         00 21 10\n\n      /*\n      f000 2110 7707 0103 0063 f7\n      ???\n       f000 2110 7707 1010 4f00 0000 0000 45f7\n      F0 00 21 10 77 07 10 10  4F 00 00 00 00 00 45 F7\n       f000 2110 7707 1010 6f00 0000 0000 25f7\n      */\n    }, true\n    /* SYSEX ENABLED */\n    );\n  }\n\n  _MIDIControllerIO.start = start;\n\n  function setVariablesForDebugging() {\n    window[\"wm\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a;\n    window[\"wm_i\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs;\n    window[\"wm_o\"] = webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs;\n  }\n\n  function printOutAllInputsAndOutputs() {\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.inputs.forEach(function (input) {\n      console.log(input);\n    });\n    webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs.forEach(function (output) {\n      console.log(output);\n    });\n  }\n\n  function attachSoundOutput(instrument) {\n    soundOutput = instrument;\n  }\n\n  _MIDIControllerIO.attachSoundOutput = attachSoundOutput;\n\n  function playMIDINote(midiNoteNumber) {\n    var velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 127.0;\n\n    if (soundOutput === null) {\n      console.log(\"playPianoNote: Piano has not been initialized.\");\n      return;\n    }\n\n    var duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.\n\n    var pianoKeyNumber = midiNoteNumber - 20;\n    soundOutput.play(pianoKeyNumber, duration, velocity / 127.0);\n  }\n\n  function stopMIDINote(midiNoteNumber) {\n    var velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 127.0;\n\n    if (soundOutput === null) {\n      console.log(\"playPianoNote: Piano has not been initialized.\");\n      return;\n    }\n\n    var duration = 0; // Setting duration to 0 means the note will NOT turn off automatically.\n\n    var pianoKeyNumber = midiNoteNumber - 20;\n    soundOutput.stop(pianoKeyNumber);\n  }\n\n  function attachLogOutput(logHandler) {\n    logOutput = logHandler;\n  }\n\n  _MIDIControllerIO.attachLogOutput = attachLogOutput;\n})(MIDIControllerIO || (MIDIControllerIO = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MIDIControllerIO);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9NSURJQ29udHJvbGxlcklPLnRzPzIwZjIiXSwibmFtZXMiOlsiaW5wdXRzIiwib3V0cHV0cyIsInNvdW5kT3V0cHV0IiwibG9nT3V0cHV0Iiwic3RhcnQiLCJXZWJNaWRpIiwiZW5hYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInNldFZhcmlhYmxlc0ZvckRlYnVnZ2luZyIsInByaW50T3V0QWxsSW5wdXRzQW5kT3V0cHV0cyIsImkiLCJwdXNoIiwiYWRkTGlzdGVuZXIiLCJlIiwicGxheU1JRElOb3RlIiwibm90ZSIsIm51bWJlciIsInJhd1ZlbG9jaXR5Iiwic3RvcE1JRElOb3RlIiwibyIsIkxVTUlLZXlzIiwiY29ubmVjdCIsIndpbmRvdyIsImZvckVhY2giLCJpbnB1dCIsIm91dHB1dCIsImF0dGFjaFNvdW5kT3V0cHV0IiwiaW5zdHJ1bWVudCIsIm1pZGlOb3RlTnVtYmVyIiwidmVsb2NpdHkiLCJkdXJhdGlvbiIsInBpYW5vS2V5TnVtYmVyIiwicGxheSIsInN0b3AiLCJhdHRhY2hMb2dPdXRwdXQiLCJsb2dIYW5kbGVyIiwiTUlESUNvbnRyb2xsZXJJTyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0NBS0E7QUFDQTs7Ozs7QUFFSSxNQUFJQSxNQUFlLEdBQUcsRUFBdEI7QUFDQSxNQUFJQyxPQUFpQixHQUFHLEVBQXhCO0FBRUEsTUFBSUMsV0FBdUIsR0FBRyxJQUE5QjtBQUNBLE1BQUlDLFNBQWdDLEdBQUcsSUFBdkM7O0FBRU8sV0FBU0MsS0FBVCxHQUFpQjtBQUNwQkMsa0RBQU8sQ0FBQ0MsTUFBUixDQUFlLFVBQVVDLEdBQVYsRUFBZTtBQUMxQixVQUFJQSxHQUFKLEVBQVM7QUFDTEMsZUFBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLEdBQTdDO0FBQ0E7QUFDSDs7QUFDREMsYUFBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFFQUMsOEJBQXdCO0FBQ3hC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QUNELFFBQU11QixRQUFRLEdBQUcsQ0FBakIsQ0FMb0QsQ0FLaEM7O0FBQ3BCLFFBQU1DLGNBQWMsR0FBR0gsY0FBYyxHQUFHLEVBQXhDO0FBQ0E1QixlQUFXLENBQUNpQyxJQUFaLENBQWlCRixjQUFqQjtBQUNIOztBQUVNLFdBQVNHLGVBQVQsQ0FBeUJDLFVBQXpCLEVBQXFDO0FBQ3hDbEMsYUFBUyxHQUFHa0MsVUFBWjtBQUNIOzs7R0FqSUtDLGdCLEtBQUFBLGdCOztBQW9JS0EsK0VBQWYiLCJmaWxlIjoiLi9hcHBzL3NoYXJlZC9taWRpL01JRElDb250cm9sbGVySU8udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViTWlkaSwgeyBJbnB1dCwgT3V0cHV0IH0gZnJvbSBcIndlYm1pZGlcIjtcblxuaW1wb3J0IEluc3RydW1lbnQgZnJvbSBcIi4uL3NvdW5kL0luc3RydW1lbnRcIjtcbmltcG9ydCBMVU1JS2V5cyBmcm9tIFwiLi9MVU1JS2V5c1wiO1xuXG4vLyBNYW51ZmFjdHVyZXJzOlxuLy8gU25vaXplIC8gTUlESSBNb25pdG9yIChVbnRpdGxlZCBYWClcbm5hbWVzcGFjZSBNSURJQ29udHJvbGxlcklPIHtcbiAgICBsZXQgaW5wdXRzOiBJbnB1dFtdID0gW107XG4gICAgbGV0IG91dHB1dHM6IE91dHB1dFtdID0gW107XG5cbiAgICBsZXQgc291bmRPdXRwdXQ6IEluc3RydW1lbnQgPSBudWxsO1xuICAgIGxldCBsb2dPdXRwdXQ6IChtc2c6IHN0cmluZykgPT4gdm9pZCA9IG51bGw7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIFdlYk1pZGkuZW5hYmxlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlYk1pZGkgY291bGQgbm90IGJlIGVuYWJsZWQuXCIsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZWJNaWRpIGVuYWJsZWQhXCIpO1xuXG4gICAgICAgICAgICBzZXRWYXJpYWJsZXNGb3JEZWJ1Z2dpbmcoKTtcbiAgICAgICAgICAgIHByaW50T3V0QWxsSW5wdXRzQW5kT3V0cHV0cygpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgV2ViTWlkaS5pbnB1dHMpIHtcbiAgICAgICAgICAgICAgICBpbnB1dHMucHVzaChpKTtcblxuICAgICAgICAgICAgICAgIGkuYWRkTGlzdGVuZXIoXCJub3Rlb25cIiwgXCJhbGxcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlNSURJTm90ZShlLm5vdGUubnVtYmVyLCBlLnJhd1ZlbG9jaXR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpLmFkZExpc3RlbmVyKFwibm90ZW9mZlwiLCBcImFsbFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcE1JRElOb3RlKGUubm90ZS5udW1iZXIsIGUucmF3VmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgV2ViTWlkaS5vdXRwdXRzKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0cy5wdXNoKG8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMVU1JS2V5cy5jb25uZWN0KCk7XG5cbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkub3V0cHV0c1swXTtcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlJZChcIjE1ODQ5ODIzMDdcIik7XG4gICAgICAgICAgICAvLyBvdXRwdXQgPSBXZWJNaWRpLmdldE91dHB1dEJ5TmFtZShcIkxVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aFwiKTtcbiAgICAgICAgICAgIC8vIExVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aCBpZDogMTA1NDEzMDg2N1xuICAgICAgICAgICAgLy8gWGtleSBBaXIgMzcgQkxFIEJsdWV0b290aCBpZDogLTEwMjE0NDYyMjZcbiAgICAgICAgICAgIC8vIG91dHB1dCA9IFdlYk1pZGkuZ2V0T3V0cHV0QnlJZChcIjEwNTQxMzA4NjdcIik7XG5cbiAgICAgICAgICAgIC8vIExVTUkgS2V5cyBCbG9jayBLSjdUIEJsdWV0b290aCBpZDogLTg5OTczOTE0N1xuICAgICAgICAgICAgLy8gWGtleSBBaXIgMzcgQkxFIEJsdWV0b290aCBpZDogMTc0ODc1MTMyMFxuICAgICAgICAgICAgLy8gaW5wdXQgPSBXZWJNaWRpLmdldElucHV0QnlOYW1lKFwiTFVNSSBLZXlzIEJsb2NrIEtKN1QgQmx1ZXRvb3RoXCIpO1xuXG4gICAgICAgICAgICAvLyBpZiAoIWlucHV0KSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJJbnB1dCBpczogXCIgKyBpbnB1dCk7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJDYW5ub3QgRmluZCBMVU1JIEtleXNcIik7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBpbnB1dC5hZGRMaXN0ZW5lcihcInN5c2V4XCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJTWVNFWFwiKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBkYXRhU3RyaW5nID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIikuZGVjb2RlKGUuZGF0YSk7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJTWVNFWCBEQVRBIFNUUklORzpcIik7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZGF0YVN0cmluZyk7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy8gaW5wdXQuYWRkTGlzdGVuZXIoXCJjb250cm9sY2hhbmdlXCIsIFwiYWxsXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy8gbS5nZXRPdXRwdXRCeUlkKC0yMDc1MTQxMzk1KSBNSURJIE1vbml0b3IgYnkgU25vaXplXG4gICAgICAgICAgICAvLyBvLnBsYXlOb3RlKFwiQzNcIilcbiAgICAgICAgICAgIC8vIG8uc3RvcE5vdGUoXCJDM1wiKVxuXG4gICAgICAgICAgICAvLyBXZWJNaWRpLk1JRElfU1lTVEVNX01FU1NBR0VTLnN5c2V4OyAvLyAjRjAgPT0gMjQwXG5cbiAgICAgICAgICAgIC8vIE1hbnVmYWN0dXJlciBJRHMgKEhleGFkZWNpbWFsKVxuICAgICAgICAgICAgLy8gQ01FIFhLZXkgQWlyIDAwIDIwIDYzXG4gICAgICAgICAgICAvLyBST0xJICAgICAgICAgMDAgMjEgMTBcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDAxMDMgMDA2MyBmN1xuICAgICAgICAgICAgPz8/XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNGYwMCAwMDAwIDAwMDAgNDVmN1xuICAgICAgICAgICAgRjAgMDAgMjEgMTAgNzcgMDcgMTAgMTAgIDRGIDAwIDAwIDAwIDAwIDAwIDQ1IEY3XG5cbiAgICAgICAgICAgIGYwMDAgMjExMCA3NzA3IDEwMTAgNmYwMCAwMDAwIDAwMDAgMjVmN1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfSwgdHJ1ZSAvKiBTWVNFWCBFTkFCTEVEICovKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRWYXJpYWJsZXNGb3JEZWJ1Z2dpbmcoKSB7XG4gICAgICAgIHdpbmRvd1tcIndtXCJdID0gV2ViTWlkaTtcbiAgICAgICAgd2luZG93W1wid21faVwiXSA9IFdlYk1pZGkuaW5wdXRzO1xuICAgICAgICB3aW5kb3dbXCJ3bV9vXCJdID0gV2ViTWlkaS5vdXRwdXRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByaW50T3V0QWxsSW5wdXRzQW5kT3V0cHV0cygpIHtcbiAgICAgICAgV2ViTWlkaS5pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFdlYk1pZGkub3V0cHV0cy5mb3JFYWNoKChvdXRwdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBhdHRhY2hTb3VuZE91dHB1dChpbnN0cnVtZW50OiBJbnN0cnVtZW50KSB7XG4gICAgICAgIHNvdW5kT3V0cHV0ID0gaW5zdHJ1bWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5TUlESU5vdGUobWlkaU5vdGVOdW1iZXIsIHZlbG9jaXR5ID0gMTI3LjApIHtcbiAgICAgICAgaWYgKHNvdW5kT3V0cHV0ID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXlQaWFub05vdGU6IFBpYW5vIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSAwOyAvLyBTZXR0aW5nIGR1cmF0aW9uIHRvIDAgbWVhbnMgdGhlIG5vdGUgd2lsbCBOT1QgdHVybiBvZmYgYXV0b21hdGljYWxseS5cbiAgICAgICAgY29uc3QgcGlhbm9LZXlOdW1iZXIgPSBtaWRpTm90ZU51bWJlciAtIDIwO1xuICAgICAgICBzb3VuZE91dHB1dC5wbGF5KHBpYW5vS2V5TnVtYmVyLCBkdXJhdGlvbiwgdmVsb2NpdHkgLyAxMjcuMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcE1JRElOb3RlKG1pZGlOb3RlTnVtYmVyLCB2ZWxvY2l0eSA9IDEyNy4wKSB7XG4gICAgICAgIGlmIChzb3VuZE91dHB1dCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5UGlhbm9Ob3RlOiBQaWFubyBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMDsgLy8gU2V0dGluZyBkdXJhdGlvbiB0byAwIG1lYW5zIHRoZSBub3RlIHdpbGwgTk9UIHR1cm4gb2ZmIGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIGNvbnN0IHBpYW5vS2V5TnVtYmVyID0gbWlkaU5vdGVOdW1iZXIgLSAyMDtcbiAgICAgICAgc291bmRPdXRwdXQuc3RvcChwaWFub0tleU51bWJlcik7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaExvZ091dHB1dChsb2dIYW5kbGVyKSB7XG4gICAgICAgIGxvZ091dHB1dCA9IGxvZ0hhbmRsZXI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNSURJQ29udHJvbGxlcklPO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/midi/MIDIControllerIO.ts\n");

/***/ })

})