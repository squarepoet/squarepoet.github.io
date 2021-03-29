webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: InstrumentType, validateInstrumentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstrumentType\", function() { return InstrumentType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateInstrumentType\", function() { return validateInstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apps/shared/sound/ToneInfo */ \"./apps/shared/sound/ToneInfo.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\n // #TODO: Can we reimplement the Musical.js sound with Tone.js?\n// See https://tonejs.github.io/docs/14.7.77/Oscillator.html\n// A Typescript enum is just a two way mapping between index and the string representation.\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"SynthBasic\"] = 0] = \"SynthBasic\";\n  InstrumentType[InstrumentType[\"SynthFM\"] = 1] = \"SynthFM\";\n  InstrumentType[InstrumentType[\"SynthAM\"] = 2] = \"SynthAM\";\n  InstrumentType[InstrumentType[\"SynthMusicalJS\"] = 3] = \"SynthMusicalJS\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 4] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 5] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"SynthPluck\"] = 6] = \"SynthPluck\";\n  InstrumentType[InstrumentType[\"COUNT\"] = 7] = \"COUNT\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar validateInstrumentType = function validateInstrumentType(inputValue) {\n  var instrumentTypeNumber = parseInt(inputValue);\n\n  if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {\n    return instrumentTypeNumber; // inputValue was VALID!\n  } else {\n    return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.\n  }\n};\n\nvar Instrument = /*#__PURE__*/function () {\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can start WebAudio!\n  function Instrument(type) {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.SynthBasic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJSInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_PluckInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"musicalJSInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = type;\n\n    if (this.type === InstrumentType.SynthMusicalJS) {\n      console.log(\"Creating a Musical JS Instrument\");\n      this.musicalJSInstrument = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n      this.isReady = true;\n    } else {\n      console.log(\"Creating a Tone JS Instrument\");\n\n      if (!apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning) {\n        tone__WEBPACK_IMPORTED_MODULE_6__[\"start\"]().then(function () {\n          console.log(\"Tone is Ready!\");\n          apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning = true;\n        });\n      }\n\n      switch (this.type) {\n        case InstrumentType.Sampled_1:\n          // Stereo\n          this.baseURL = \"/s/m/grand/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            C2: \"16.mp3\",\n            C3: \"28.mp3\",\n            D3: \"30.mp3\",\n            E3: \"32.mp3\",\n            G3: \"35.mp3\",\n            A3: \"37.mp3\",\n            B3: \"39.mp3\",\n            C4: \"40.mp3\",\n            D4: \"42.mp3\",\n            E4: \"44.mp3\",\n            F4: \"45.mp3\",\n            G4: \"47.mp3\",\n            A4: \"49.mp3\",\n            C5: \"52.mp3\",\n            F5: \"57.mp3\",\n            A5: \"61.mp3\",\n            C6: \"64.mp3\",\n            F6: \"69.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.01\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.Sampled_2:\n          // Mono\n          this.baseURL = \"/s/m/bright/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            G1: \"11.mp3\",\n            C2: \"16.mp3\",\n            G2: \"23.mp3\",\n            C3: \"28.mp3\",\n            G3: \"35.mp3\",\n            C4: \"40.mp3\",\n            G4: \"47.mp3\",\n            C5: \"52.mp3\",\n            G5: \"59.mp3\",\n            C6: \"64.mp3\",\n            G6: \"71.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.05\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.SynthFM:\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"FMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthAM:\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"AMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthPluck:\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PluckSynth\"]({}).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthBasic:\n        default:\n          // Basic\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"Synth\"]).toDestination();\n          this.isReady = true;\n          break;\n      }\n    }\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n      var durationInfo = durationInSeconds > 0 ? \" for \".concat(durationInSeconds, \" seconds\") : \"\";\n      var velocityInfo = \" at velocity = \" + velocity;\n      console.log(\"Instrument: PLAY \" + pianoKeyNumber + durationInfo + velocityInfo);\n      var midiNoteNumber = pianoKeyNumber + 20;\n\n      if (this.toneJSInstrument) {\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n\n        if (durationInSeconds > 0) {\n          this.toneJSInstrument.triggerAttackRelease(noteName, durationInSeconds, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        } else {\n          this.toneJSInstrument.triggerAttack(noteName, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        }\n      } else {\n        // Musical.js\n        // tone(...) parameter is specified\n        // as a positive integer in Hz\n        //   OR\n        // as a negative integer in MIDI note numbers\n        //   MIDI number 60 == Middle C == pianoKeyNumber 40\n        this.musicalJSInstrument.tone(-midiNoteNumber);\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      console.log(\"Instrument: STOP \" + pianoKeyNumber);\n\n      if (this.toneJSInstrument) {\n        var midiNoteNumber = pianoKeyNumber + 20;\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n        this.toneJSInstrument.triggerRelease(noteName);\n      } else {// Musical.js does not need STOP, since each tone has the same length.\n      }\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument(options) {\n      var _this = this;\n\n      this.isReady = false; // Get absolute URLs for mp3 sample files to preload.\n\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload); // Create a Tone.Sampler instrument\n\n      var config = {\n        urls: this.samplesMap,\n        baseUrl: this.baseURL,\n        attack: options.attack,\n        // determines how quickly the note comes in (the attack part of the ADSR envelope)\n        release: 0.8,\n        // determines how quickly the note falls off (the release part of the ADSR envelope)\n        curve: \"exponential\",\n        // exponential | linear\n        onload: function onload() {\n          _this.isReady = true;\n        }\n      };\n      this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"Sampler\"](config).toDestination();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.preloader = null;\n\n      if (this.toneJSInstrument) {\n        this.toneJSInstrument.dispose();\n        this.toneJSInstrument = null;\n      }\n\n      if (this.musicalJSInstrument) {\n        this.musicalJSInstrument = null;\n      }\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwidmFsaWRhdGVJbnN0cnVtZW50VHlwZSIsImlucHV0VmFsdWUiLCJpbnN0cnVtZW50VHlwZU51bWJlciIsInBhcnNlSW50IiwiaXNOYU4iLCJDT1VOVCIsIlN5bnRoQmFzaWMiLCJJbnN0cnVtZW50IiwidHlwZSIsIlN5bnRoTXVzaWNhbEpTIiwiY29uc29sZSIsImxvZyIsIm11c2ljYWxKU0luc3RydW1lbnQiLCJNdXNpY2FsIiwiaXNSZWFkeSIsIlRvbmVJbmZvIiwiaXNSdW5uaW5nIiwiVG9uZSIsInRoZW4iLCJTYW1wbGVkXzEiLCJiYXNlVVJMIiwic2FtcGxlc01hcCIsIkMxIiwiQzIiLCJDMyIsIkQzIiwiRTMiLCJHMyIsIkEzIiwiQjMiLCJDNCIsIkQ0IiwiRTQiLCJGNCIsIkc0IiwiQTQiLCJDNSIsIkY1IiwiQTUiLCJDNiIsIkY2IiwiQzciLCJHNyIsIkM4Iiwic2V0dXBTYW1wbGVySW5zdHJ1bWVudCIsImF0dGFjayIsIlNhbXBsZWRfMiIsIkcxIiwiRzIiLCJHNSIsIkc2IiwiU3ludGhGTSIsInRvbmVKU0luc3RydW1lbnQiLCJ0b0Rlc3RpbmF0aW9uIiwiU3ludGhBTSIsIlN5bnRoUGx1Y2siLCJwaWFub0tleU51bWJlciIsImR1cmF0aW9uSW5TZWNvbmRzIiwidmVsb2NpdHkiLCJkdXJhdGlvbkluZm8iLCJ2ZWxvY2l0eUluZm8iLCJtaWRpTm90ZU51bWJlciIsIm5vdGVOYW1lIiwidG9Ob3RlIiwidHJpZ2dlckF0dGFja1JlbGVhc2UiLCJ0cmlnZ2VyQXR0YWNrIiwidG9uZSIsInRyaWdnZXJSZWxlYXNlIiwib3B0aW9ucyIsImZpbGVzVG9QcmVsb2FkIiwia2V5TmFtZSIsImZpbGVOYW1lIiwicHVzaCIsInByZWxvYWRlciIsIlByZWxvYWRlciIsImNvbmZpZyIsInVybHMiLCJiYXNlVXJs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QXpCLEVBQXhCO0FBQ0g7Ozs4QkFFUztBQUNOLFdBQUtvQixTQUFMLEdBQWlCLElBQWpCOztBQUNBLFVBQUksS0FBS3JCLGdCQUFULEVBQTJCO0FBQ3ZCLGFBQUtBLGdCQUFMLENBQXNCNkIsT0FBdEI7QUFDQSxhQUFLN0IsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDSDs7QUFDRCxVQUFJLEtBQUt4QyxtQkFBVCxFQUE4QjtBQUMxQixhQUFLQSxtQkFBTCxHQUEyQixJQUEzQjtBQUNIO0FBQ0o7Ozt3QkE3RTBCO0FBQ3ZCLGFBQU8sS0FBS0UsT0FBWjtBQUNIOzs7O0tBOEVMOzs7QUFFQTtBQUVlUCx5RUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL3NvdW5kL0luc3RydW1lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVzaWNhbCBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvTXVzaWNhbFwiO1xuaW1wb3J0IFByZWxvYWRlciBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvUHJlbG9hZGVyXCI7XG5pbXBvcnQgVG9uZUluZm8gZnJvbSBcImFwcHMvc2hhcmVkL3NvdW5kL1RvbmVJbmZvXCI7XG5pbXBvcnQgKiBhcyBUb25lIGZyb20gXCJ0b25lXCI7XG5cbi8vICNUT0RPOiBDYW4gd2UgcmVpbXBsZW1lbnQgdGhlIE11c2ljYWwuanMgc291bmQgd2l0aCBUb25lLmpzP1xuLy8gU2VlIGh0dHBzOi8vdG9uZWpzLmdpdGh1Yi5pby9kb2NzLzE0LjcuNzcvT3NjaWxsYXRvci5odG1sXG5cbi8vIEEgVHlwZXNjcmlwdCBlbnVtIGlzIGp1c3QgYSB0d28gd2F5IG1hcHBpbmcgYmV0d2VlbiBpbmRleCBhbmQgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbmVudW0gSW5zdHJ1bWVudFR5cGUge1xuICAgIFN5bnRoQmFzaWMgPSAwLFxuICAgIFN5bnRoRk0sXG4gICAgU3ludGhBTSxcbiAgICBTeW50aE11c2ljYWxKUywgLy8gTXVzaWNhbC5qcyBieSBQZW5jaWxDb2RlXG4gICAgU2FtcGxlZF8xLFxuICAgIFNhbXBsZWRfMixcbiAgICBTeW50aFBsdWNrLFxuICAgIENPVU5ULCAvLyBPbGQgc2Nob29sISA6LVxcXG59XG5cbmNvbnN0IHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUgPSAoaW5wdXRWYWx1ZTogYW55KTogSW5zdHJ1bWVudFR5cGUgPT4ge1xuICAgIGNvbnN0IGluc3RydW1lbnRUeXBlTnVtYmVyID0gcGFyc2VJbnQoaW5wdXRWYWx1ZSk7XG4gICAgaWYgKCFpc05hTihpbnN0cnVtZW50VHlwZU51bWJlcikgJiYgaW5zdHJ1bWVudFR5cGVOdW1iZXIgPj0gMCAmJiBpbnN0cnVtZW50VHlwZU51bWJlciA8IEluc3RydW1lbnRUeXBlLkNPVU5UKSB7XG4gICAgICAgIHJldHVybiBpbnN0cnVtZW50VHlwZU51bWJlciBhcyBJbnN0cnVtZW50VHlwZTsgLy8gaW5wdXRWYWx1ZSB3YXMgVkFMSUQhXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEluc3RydW1lbnRUeXBlLlN5bnRoQmFzaWM7IC8vIGlucHV0VmFsdWUgd2FzIE5PVCBWQUxJRCwgc28gd2UgcmV0dXJuIHRoZSBkZWZhdWx0IEluc3RydW1lbnRUeXBlLlxuICAgIH1cbn07XG5cbmNsYXNzIEluc3RydW1lbnQge1xuICAgIHR5cGU6IEluc3RydW1lbnRUeXBlID0gSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYztcblxuICAgIHRvbmVKU0luc3RydW1lbnQ6IFRvbmUuUG9seVN5bnRoIHwgVG9uZS5TYW1wbGVyID0gbnVsbDtcbiAgICB0b25lSlNfUGx1Y2tJbnN0cnVtZW50OiBUb25lLlBsdWNrU3ludGggPSBudWxsO1xuICAgIG11c2ljYWxKU0luc3RydW1lbnQ6IE11c2ljYWwuSW5zdHJ1bWVudCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBzZXR0aW5nIHVwIFRvbmUuU2FtcGxlclxuICAgIHByaXZhdGUgcHJlbG9hZGVyOiBQcmVsb2FkZXIgPSBudWxsO1xuICAgIHByaXZhdGUgc2FtcGxlc01hcDogYW55O1xuICAgIHByaXZhdGUgYmFzZVVSTDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIE9ubHkgY2FsbCB0aGlzIGZyb20gYSB1c2VyIGdlc3R1cmUsIHNvIHdlIGNhbiBzdGFydCBXZWJBdWRpbyFcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJbnN0cnVtZW50VHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBJbnN0cnVtZW50VHlwZS5TeW50aE11c2ljYWxKUykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBhIE11c2ljYWwgSlMgSW5zdHJ1bWVudFwiKTtcbiAgICAgICAgICAgIHRoaXMubXVzaWNhbEpTSW5zdHJ1bWVudCA9IG5ldyBNdXNpY2FsLkluc3RydW1lbnQoXCJwaWFub1wiKTtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIGEgVG9uZSBKUyBJbnN0cnVtZW50XCIpO1xuICAgICAgICAgICAgaWYgKCFUb25lSW5mby5pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBUb25lLnN0YXJ0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9uZSBpcyBSZWFkeSFcIik7XG4gICAgICAgICAgICAgICAgICAgIFRvbmVJbmZvLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8xOlxuICAgICAgICAgICAgICAgICAgICAvLyBTdGVyZW9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVVJMID0gXCIvcy9tL2dyYW5kL1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbXBsZXNNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDMTogXCI0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzI6IFwiMTYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMzogXCIyOC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEQzOiBcIjMwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRTM6IFwiMzIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMzogXCIzNS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEEzOiBcIjM3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQjM6IFwiMzkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNDogXCI0MC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEQ0OiBcIjQyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRTQ6IFwiNDQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBGNDogXCI0NS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc0OiBcIjQ3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTQ6IFwiNDkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNTogXCI1Mi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY1OiBcIjU3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTU6IFwiNjEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNjogXCI2NC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY2OiBcIjY5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzc6IFwiNzYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNzogXCI4My5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM4OiBcIjg4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwU2FtcGxlckluc3RydW1lbnQoeyBhdHRhY2s6IDAuMDEgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzI6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vbm9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVVJMID0gXCIvcy9tL2JyaWdodC9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVzTWFwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQzE6IFwiNC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEcxOiBcIjExLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzI6IFwiMTYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMjogXCIyMy5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzM6IFwiMzUubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNDogXCI0MC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc0OiBcIjQ3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzU6IFwiNTIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNTogXCI1OS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzY6IFwiNzEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCh7IGF0dGFjazogMC4wNSB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlzUmVhZHkgd2lsbCBiZSB0cnVlIGFmdGVyIGFsbCB0aGUgbXAzIGZpbGVzIGxvYWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhGTTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50ID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuRk1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoQU06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudCA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLkFNU3ludGgpLnRvRGVzdGluYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aFBsdWNrOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQgPSBuZXcgVG9uZS5QbHVja1N5bnRoKHt9KS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYzpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBCYXNpY1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNJbml0aWFsaXplZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkeTtcbiAgICB9XG5cbiAgICBwbGF5KHBpYW5vS2V5TnVtYmVyOiBudW1iZXIsIGR1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLCB2ZWxvY2l0eTogbnVtYmVyID0gMS4wKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uSW5mbyA9IGR1cmF0aW9uSW5TZWNvbmRzID4gMCA/IGAgZm9yICR7ZHVyYXRpb25JblNlY29uZHN9IHNlY29uZHNgIDogXCJcIjtcbiAgICAgICAgY29uc3QgdmVsb2NpdHlJbmZvID0gXCIgYXQgdmVsb2NpdHkgPSBcIiArIHZlbG9jaXR5O1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluc3RydW1lbnQ6IFBMQVkgXCIgKyBwaWFub0tleU51bWJlciArIGR1cmF0aW9uSW5mbyArIHZlbG9jaXR5SW5mbyk7XG5cbiAgICAgICAgY29uc3QgbWlkaU5vdGVOdW1iZXIgPSBwaWFub0tleU51bWJlciArIDIwO1xuXG4gICAgICAgIGlmICh0aGlzLnRvbmVKU0luc3RydW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGVOYW1lID0gVG9uZS5GcmVxdWVuY3kobWlkaU5vdGVOdW1iZXIsIFwibWlkaVwiKS50b05vdGUoKTtcblxuICAgICAgICAgICAgaWYgKGR1cmF0aW9uSW5TZWNvbmRzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudC50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgZHVyYXRpb25JblNlY29uZHMsIFRvbmUubm93KCksIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50LnRyaWdnZXJBdHRhY2sobm90ZU5hbWUsIFRvbmUubm93KCksIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanNcbiAgICAgICAgICAgIC8vIHRvbmUoLi4uKSBwYXJhbWV0ZXIgaXMgc3BlY2lmaWVkXG4gICAgICAgICAgICAvLyBhcyBhIHBvc2l0aXZlIGludGVnZXIgaW4gSHpcbiAgICAgICAgICAgIC8vICAgT1JcbiAgICAgICAgICAgIC8vIGFzIGEgbmVnYXRpdmUgaW50ZWdlciBpbiBNSURJIG5vdGUgbnVtYmVyc1xuICAgICAgICAgICAgLy8gICBNSURJIG51bWJlciA2MCA9PSBNaWRkbGUgQyA9PSBwaWFub0tleU51bWJlciA0MFxuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNJbnN0cnVtZW50LnRvbmUoLW1pZGlOb3RlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AocGlhbm9LZXlOdW1iZXI6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluc3RydW1lbnQ6IFNUT1AgXCIgKyBwaWFub0tleU51bWJlcik7XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU0luc3RydW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pZGlOb3RlTnVtYmVyID0gcGlhbm9LZXlOdW1iZXIgKyAyMDtcbiAgICAgICAgICAgIGNvbnN0IG5vdGVOYW1lID0gVG9uZS5GcmVxdWVuY3kobWlkaU5vdGVOdW1iZXIsIFwibWlkaVwiKS50b05vdGUoKTtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudC50cmlnZ2VyUmVsZWFzZShub3RlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNdXNpY2FsLmpzIGRvZXMgbm90IG5lZWQgU1RPUCwgc2luY2UgZWFjaCB0b25lIGhhcyB0aGUgc2FtZSBsZW5ndGguXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXR1cFNhbXBsZXJJbnN0cnVtZW50KG9wdGlvbnM6IGFueSkge1xuICAgICAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyBHZXQgYWJzb2x1dGUgVVJMcyBmb3IgbXAzIHNhbXBsZSBmaWxlcyB0byBwcmVsb2FkLlxuICAgICAgICBjb25zdCBmaWxlc1RvUHJlbG9hZCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gdGhpcy5zYW1wbGVzTWFwKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuc2FtcGxlc01hcFtrZXlOYW1lXTtcbiAgICAgICAgICAgIGZpbGVzVG9QcmVsb2FkLnB1c2godGhpcy5iYXNlVVJMICsgZmlsZU5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJlbG9hZCB0aGUgZmlsZXMgbm93LlxuICAgICAgICB0aGlzLnByZWxvYWRlciA9IG5ldyBQcmVsb2FkZXIoZmlsZXNUb1ByZWxvYWQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIFRvbmUuU2FtcGxlciBpbnN0cnVtZW50XG4gICAgICAgIGNvbnN0IGNvbmZpZzogYW55ID0ge1xuICAgICAgICAgICAgdXJsczogdGhpcy5zYW1wbGVzTWFwLFxuICAgICAgICAgICAgYmFzZVVybDogdGhpcy5iYXNlVVJMLFxuICAgICAgICAgICAgYXR0YWNrOiBvcHRpb25zLmF0dGFjaywgLy8gZGV0ZXJtaW5lcyBob3cgcXVpY2tseSB0aGUgbm90ZSBjb21lcyBpbiAodGhlIGF0dGFjayBwYXJ0IG9mIHRoZSBBRFNSIGVudmVsb3BlKVxuICAgICAgICAgICAgcmVsZWFzZTogMC44LCAvLyBkZXRlcm1pbmVzIGhvdyBxdWlja2x5IHRoZSBub3RlIGZhbGxzIG9mZiAodGhlIHJlbGVhc2UgcGFydCBvZiB0aGUgQURTUiBlbnZlbG9wZSlcbiAgICAgICAgICAgIGN1cnZlOiBcImV4cG9uZW50aWFsXCIsIC8vIGV4cG9uZW50aWFsIHwgbGluZWFyXG4gICAgICAgICAgICBvbmxvYWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50ID0gbmV3IFRvbmUuU2FtcGxlcihjb25maWcpLnRvRGVzdGluYXRpb24oKTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWRlciA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU0luc3RydW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudC5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11c2ljYWxKU0luc3RydW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNhbEpTSW5zdHJ1bWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCB7IEluc3RydW1lbnRUeXBlLCB2YWxpZGF0ZUluc3RydW1lbnRUeXBlIH07XG5cbmV4cG9ydCBkZWZhdWx0IEluc3RydW1lbnQ7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})