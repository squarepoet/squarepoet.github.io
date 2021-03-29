webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: InstrumentType, validateInstrumentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstrumentType\", function() { return InstrumentType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateInstrumentType\", function() { return validateInstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apps/shared/sound/ToneInfo */ \"./apps/shared/sound/ToneInfo.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\n // #TODO: Can we reimplement the Musical.js sound with Tone.js?\n// See https://tonejs.github.io/docs/14.7.77/Oscillator.html\n// A Typescript enum is just a two way mapping between index and the string representation.\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"SynthBasic\"] = 0] = \"SynthBasic\";\n  InstrumentType[InstrumentType[\"SynthFM\"] = 1] = \"SynthFM\";\n  InstrumentType[InstrumentType[\"SynthAM\"] = 2] = \"SynthAM\";\n  InstrumentType[InstrumentType[\"SynthMusicalJS\"] = 3] = \"SynthMusicalJS\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 4] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 5] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"SynthPluck\"] = 6] = \"SynthPluck\";\n  InstrumentType[InstrumentType[\"COUNT\"] = 7] = \"COUNT\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar validateInstrumentType = function validateInstrumentType(inputValue) {\n  var instrumentTypeNumber = parseInt(inputValue);\n\n  if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {\n    return instrumentTypeNumber; // inputValue was VALID!\n  } else {\n    return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.\n  }\n};\n\nvar Instrument = /*#__PURE__*/function () {\n  // Several options for instrument timbre.\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can start WebAudio!\n  function Instrument(type) {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.SynthBasic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_SynthOrSampler\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_Pluck\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"musicalJS_Synth\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = type;\n\n    if (this.type === InstrumentType.SynthMusicalJS) {\n      console.log(\"Creating a Musical JS Instrument\");\n      this.musicalJS_Synth = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n      this.isReady = true;\n    } else {\n      console.log(\"Creating a Tone JS Instrument\");\n\n      if (!apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning) {\n        tone__WEBPACK_IMPORTED_MODULE_6__[\"start\"]().then(function () {\n          console.log(\"Tone is Ready!\");\n          apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning = true;\n        });\n      }\n\n      switch (this.type) {\n        case InstrumentType.Sampled_1:\n          // Stereo\n          this.baseURL = \"/s/m/grand/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            C2: \"16.mp3\",\n            C3: \"28.mp3\",\n            D3: \"30.mp3\",\n            E3: \"32.mp3\",\n            G3: \"35.mp3\",\n            A3: \"37.mp3\",\n            B3: \"39.mp3\",\n            C4: \"40.mp3\",\n            D4: \"42.mp3\",\n            E4: \"44.mp3\",\n            F4: \"45.mp3\",\n            G4: \"47.mp3\",\n            A4: \"49.mp3\",\n            C5: \"52.mp3\",\n            F5: \"57.mp3\",\n            A5: \"61.mp3\",\n            C6: \"64.mp3\",\n            F6: \"69.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.01\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.Sampled_2:\n          // Mono\n          this.baseURL = \"/s/m/bright/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            G1: \"11.mp3\",\n            C2: \"16.mp3\",\n            G2: \"23.mp3\",\n            C3: \"28.mp3\",\n            G3: \"35.mp3\",\n            C4: \"40.mp3\",\n            G4: \"47.mp3\",\n            C5: \"52.mp3\",\n            G5: \"59.mp3\",\n            C6: \"64.mp3\",\n            G6: \"71.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.05\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.SynthFM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"FMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthAM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"AMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthPluck:\n          this.toneJS_Pluck = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PluckSynth\"]({\n            attackNoise: 1,\n            dampening: 4000,\n            resonance: 1,\n            release: 2\n          }).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthBasic:\n        default:\n          // Basic\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"Synth\"]).toDestination();\n          this.isReady = true;\n          break;\n      }\n    }\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n      var durationInfo = durationInSeconds > 0 ? \" for \".concat(durationInSeconds, \" seconds\") : \"\";\n      var velocityInfo = \" at velocity = \" + velocity;\n      console.log(\"Instrument: PLAY \" + pianoKeyNumber + durationInfo + velocityInfo);\n      var midiNoteNumber = pianoKeyNumber + 20;\n      var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n\n      if (this.toneJS_SynthOrSampler) {\n        if (durationInSeconds > 0) {\n          this.toneJS_SynthOrSampler.triggerAttackRelease(noteName, durationInSeconds, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        } else {\n          this.toneJS_SynthOrSampler.triggerAttack(noteName, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        }\n      } else if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.triggerAttack(noteName);\n      } else {\n        // Musical.js\n        // tone(...) parameter is specified\n        // as a positive integer in Hz\n        //   OR\n        // as a negative integer in MIDI note numbers\n        //   MIDI number 60 == Middle C == pianoKeyNumber 40\n        this.musicalJS_Synth.tone(-midiNoteNumber);\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      console.log(\"Instrument: STOP \" + pianoKeyNumber);\n\n      if (this.toneJS_SynthOrSampler) {\n        var midiNoteNumber = pianoKeyNumber + 20;\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n        this.toneJS_SynthOrSampler.triggerRelease(noteName);\n      } else {// Tone.js/PluckSynth does not need STOP, since each sound has the same length.\n        // Musical.js does not need STOP, since each sound has the same length.\n      }\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument(options) {\n      var _this = this;\n\n      this.isReady = false; // Get absolute URLs for mp3 sample files to preload.\n\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload); // Create a Tone.Sampler instrument\n\n      var config = {\n        urls: this.samplesMap,\n        baseUrl: this.baseURL,\n        attack: options.attack,\n        // determines how quickly the note comes in (the attack part of the ADSR envelope)\n        release: 0.8,\n        // determines how quickly the note falls off (the release part of the ADSR envelope)\n        curve: \"exponential\",\n        // exponential | linear\n        onload: function onload() {\n          _this.isReady = true;\n        }\n      };\n      this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"Sampler\"](config).toDestination();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.preloader = null;\n\n      if (this.toneJS_SynthOrSampler) {\n        this.toneJS_SynthOrSampler.dispose();\n        this.toneJS_SynthOrSampler = null;\n      }\n\n      if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.dispose();\n        this.toneJS_Pluck = null;\n      }\n\n      if (this.musicalJS_Synth) {\n        this.musicalJS_Synth = null;\n      }\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwidmFsaWRhdGVJbnN0cnVtZW50VHlwZSIsImlucHV0VmFsdWUiLCJpbnN0cnVtZW50VHlwZU51bWJlciIsInBhcnNlSW50IiwiaXNOYU4iLCJDT1VOVCIsIlN5bnRoQmFzaWMiLCJJbnN0cnVtZW50IiwidHlwZSIsIlN5bnRoTXVzaWNhbEpTIiwiY29uc29sZSIsImxvZyIsIm11c2ljYWxKU19TeW50aCIsIk11c2ljYWwiLCJpc1JlYWR5IiwiVG9uZUluZm8iLCJpc1J1bm5pbmciLCJUb25lIiwidGhlbiIsIlNhbXBsZWRfMSIsImJhc2VVUkwiLCJzYW1wbGVzTWFwIiwiQzEiLCJDMiIsIkMzIiwiRDMiLCJFMyIsIkczIiwiQTMiLCJCMyIsIkM0IiwiRDQiLCJFNCIsIkY0IiwiRzQiLCJBNCIsIkM1IiwiRjUiLCJBNSIsIkM2IiwiRjYiLCJDNyIsIkc3IiwiQzgiLCJzZXR1cFNhbXBsZXJJbnN0cnVtZW50IiwiYXR0YWNrIiwiU2FtcGxlZF8yIiwiRzEiLCJHMiIsIkc1IiwiRzYiLCJTeW50aEZNIiwidG9uZUpTX1N5bnRoT3JTYW1wbGVyIiwidG9EZXN0aW5hdGlvbiIsIlN5bnRoQU0iLCJTeW50aFBsdWNrIiwidG9uZUpTX1BsdWNrIiwiYXR0YWNrTm9pc2UiLCJkYW1wZW5pbmciLCJyZXNvbmFuY2UiLCJyZWxlYXNlIiwicGlhbm9LZXlOdW1iZXIiLCJkdXJhdGlvbkluU2Vjb25kcyIsInZlbG9jaXR5IiwiZHVyYXRpb25JbmZvIiwidmVsb2NpdHlJbmZvIiwibWlkaU5vdGVOdW1iZXIiLCJub3RlTmFtZSIsInRvTm90ZSIsInRyaWdnZXJBdHRhY2tSZWxlYXNlIiwidHJpZ2dlckF0dGFjayIsInRvbmUiLCJ0cmlnZ2VyUmVsZWFzZSIsIm9wdGlvbnMiLCJmaWxlc1RvUHJlbG9hZCIsImtleU5hbWUiLCJmaWxlTmFtZSIsInB1c2giLCJwcmVsb2FkZXIiLCJQcmVsb2FkZXIiLCJjb25maWciLCJ1cmxzIiwiYmFzZVVybCIsImN1cnZlIiwib25sb2FkIiwiZGlzcG9zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtDQUdBO0FBQ0E7QUFFQTs7SUFDS0EsYzs7V0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7R0FBQUEsYyxLQUFBQSxjOztBQVdMLElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsVUFBRCxFQUFxQztBQUNoRSxNQUFNQyxvQkFBb0IsR0FBR0MsUUFBUSxDQUFDRixVQUFELENBQXJDOztBQUNBLE1BQUksQ0FBQ0csS0FBSyxDQUFDRixvQkFBRCxDQUFOLElBQWdDQSxvQkFBb0IsSUFBSSxDQUF4RCxJQUE2REEsb0JBQW9CLEdBQUdILGNBQWMsQ0FBQ00sS0FBdkcsRUFBOEc7QUFDMUcsV0FBT0gsb0JBQVAsQ0FEMEcsQ0FDM0Q7QUFDbEQsR0FGRCxNQUVPO0FBQ0gsV0FBT0gsY0FBYyxDQUFDTyxVQUF0QixDQURHLENBQytCO0FBQ3JDO0FBQ0osQ0FQRDs7SUFTTUMsVTtBQUdGO0FBT0E7QUFLQTtBQUNBLHNCQUFZQyxJQUFaLEVBQWtDO0FBQUE7O0FBQUEsMEtBZlhULGNBQWMsQ0FBQ08sVUFlSjs7QUFBQSwyTEFacUIsSUFZckI7O0FBQUEsa0xBWEYsSUFXRTs7QUFBQSxxTEFWSSxJQVVKOztBQUFBLDZLQVJQLEtBUU87O0FBQUEsK0tBTEgsSUFLRzs7QUFBQTs7QUFBQSw2S0FIUixFQUdROztBQUM5QixTQUFLRSxJQUFMLEdBQVlBLElBQVo7O0FBQ0EsUUFBSSxLQUFLQSxJQUFMLEtBQWNULGNBQWMsQ0FBQ1UsY0FBakMsRUFBaUQ7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LEtBQUs5RCxPQUZFO0FBR2hCeUIsY0FBTSxFQUFFNEIsT0FBTyxDQUFDNUIsTUFIQTtBQUdRO0FBQ3hCZSxlQUFPLEVBQUUsR0FKTztBQUlGO0FBQ2R1QixhQUFLLEVBQUUsYUFMUztBQUtNO0FBQ3RCQyxjQUFNLEVBQUUsa0JBQU07QUFDVixlQUFJLENBQUN0RSxPQUFMLEdBQWUsSUFBZjtBQUNIO0FBUmUsT0FBcEI7QUFVQSxXQUFLc0MscUJBQUwsR0FBNkIsSUFBSW5DLDRDQUFKLENBQWlCK0QsTUFBakIsRUFBeUIzQixhQUF6QixFQUE3QjtBQUNIOzs7OEJBRVM7QUFDTixXQUFLeUIsU0FBTCxHQUFpQixJQUFqQjs7QUFDQSxVQUFJLEtBQUsxQixxQkFBVCxFQUFnQztBQUM1QixhQUFLQSxxQkFBTCxDQUEyQmlDLE9BQTNCO0FBQ0EsYUFBS2pDLHFCQUFMLEdBQTZCLElBQTdCO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLSSxZQUFULEVBQXVCO0FBQ25CLGFBQUtBLFlBQUwsQ0FBa0I2QixPQUFsQjtBQUNBLGFBQUs3QixZQUFMLEdBQW9CLElBQXBCO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLNUMsZUFBVCxFQUEwQjtBQUN0QixhQUFLQSxlQUFMLEdBQXVCLElBQXZCO0FBQ0g7QUFDSjs7O3dCQW5GMEI7QUFDdkIsYUFBTyxLQUFLRSxPQUFaO0FBQ0g7Ozs7S0FvRkw7OztBQUVBO0FBRWVQLHlFQUFmIiwiZmlsZSI6Ii4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNdXNpY2FsIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9NdXNpY2FsXCI7XG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9QcmVsb2FkZXJcIjtcbmltcG9ydCBUb25lSW5mbyBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvVG9uZUluZm9cIjtcbmltcG9ydCAqIGFzIFRvbmUgZnJvbSBcInRvbmVcIjtcblxuLy8gI1RPRE86IENhbiB3ZSByZWltcGxlbWVudCB0aGUgTXVzaWNhbC5qcyBzb3VuZCB3aXRoIFRvbmUuanM/XG4vLyBTZWUgaHR0cHM6Ly90b25lanMuZ2l0aHViLmlvL2RvY3MvMTQuNy43Ny9Pc2NpbGxhdG9yLmh0bWxcblxuLy8gQSBUeXBlc2NyaXB0IGVudW0gaXMganVzdCBhIHR3byB3YXkgbWFwcGluZyBiZXR3ZWVuIGluZGV4IGFuZCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuZW51bSBJbnN0cnVtZW50VHlwZSB7XG4gICAgU3ludGhCYXNpYyA9IDAsXG4gICAgU3ludGhGTSxcbiAgICBTeW50aEFNLFxuICAgIFN5bnRoTXVzaWNhbEpTLCAvLyBNdXNpY2FsLmpzIGJ5IFBlbmNpbENvZGVcbiAgICBTYW1wbGVkXzEsXG4gICAgU2FtcGxlZF8yLFxuICAgIFN5bnRoUGx1Y2ssXG4gICAgQ09VTlQsIC8vIE9sZCBzY2hvb2whIDotXFxcbn1cblxuY29uc3QgdmFsaWRhdGVJbnN0cnVtZW50VHlwZSA9IChpbnB1dFZhbHVlOiBhbnkpOiBJbnN0cnVtZW50VHlwZSA9PiB7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR5cGVOdW1iZXIgPSBwYXJzZUludChpbnB1dFZhbHVlKTtcbiAgICBpZiAoIWlzTmFOKGluc3RydW1lbnRUeXBlTnVtYmVyKSAmJiBpbnN0cnVtZW50VHlwZU51bWJlciA+PSAwICYmIGluc3RydW1lbnRUeXBlTnVtYmVyIDwgSW5zdHJ1bWVudFR5cGUuQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGluc3RydW1lbnRUeXBlTnVtYmVyIGFzIEluc3RydW1lbnRUeXBlOyAvLyBpbnB1dFZhbHVlIHdhcyBWQUxJRCFcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYzsgLy8gaW5wdXRWYWx1ZSB3YXMgTk9UIFZBTElELCBzbyB3ZSByZXR1cm4gdGhlIGRlZmF1bHQgSW5zdHJ1bWVudFR5cGUuXG4gICAgfVxufTtcblxuY2xhc3MgSW5zdHJ1bWVudCB7XG4gICAgdHlwZTogSW5zdHJ1bWVudFR5cGUgPSBJbnN0cnVtZW50VHlwZS5TeW50aEJhc2ljO1xuXG4gICAgLy8gU2V2ZXJhbCBvcHRpb25zIGZvciBpbnN0cnVtZW50IHRpbWJyZS5cbiAgICB0b25lSlNfU3ludGhPclNhbXBsZXI6IFRvbmUuUG9seVN5bnRoIHwgVG9uZS5TYW1wbGVyID0gbnVsbDtcbiAgICB0b25lSlNfUGx1Y2s6IFRvbmUuUGx1Y2tTeW50aCA9IG51bGw7XG4gICAgbXVzaWNhbEpTX1N5bnRoOiBNdXNpY2FsLkluc3RydW1lbnQgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBGb3Igc2V0dGluZyB1cCBUb25lLlNhbXBsZXJcbiAgICBwcml2YXRlIHByZWxvYWRlcjogUHJlbG9hZGVyID0gbnVsbDtcbiAgICBwcml2YXRlIHNhbXBsZXNNYXA6IGFueTtcbiAgICBwcml2YXRlIGJhc2VVUkw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBPbmx5IGNhbGwgdGhpcyBmcm9tIGEgdXNlciBnZXN0dXJlLCBzbyB3ZSBjYW4gc3RhcnQgV2ViQXVkaW8hXG4gICAgY29uc3RydWN0b3IodHlwZTogSW5zdHJ1bWVudFR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gSW5zdHJ1bWVudFR5cGUuU3ludGhNdXNpY2FsSlMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgYSBNdXNpY2FsIEpTIEluc3RydW1lbnRcIik7XG4gICAgICAgICAgICB0aGlzLm11c2ljYWxKU19TeW50aCA9IG5ldyBNdXNpY2FsLkluc3RydW1lbnQoXCJwaWFub1wiKTtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIGEgVG9uZSBKUyBJbnN0cnVtZW50XCIpO1xuICAgICAgICAgICAgaWYgKCFUb25lSW5mby5pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBUb25lLnN0YXJ0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG9uZSBpcyBSZWFkeSFcIik7XG4gICAgICAgICAgICAgICAgICAgIFRvbmVJbmZvLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8xOlxuICAgICAgICAgICAgICAgICAgICAvLyBTdGVyZW9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVVJMID0gXCIvcy9tL2dyYW5kL1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbXBsZXNNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDMTogXCI0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzI6IFwiMTYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMzogXCIyOC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEQzOiBcIjMwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRTM6IFwiMzIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMzogXCIzNS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEEzOiBcIjM3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQjM6IFwiMzkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNDogXCI0MC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEQ0OiBcIjQyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRTQ6IFwiNDQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBGNDogXCI0NS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc0OiBcIjQ3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTQ6IFwiNDkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNTogXCI1Mi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY1OiBcIjU3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTU6IFwiNjEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNjogXCI2NC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY2OiBcIjY5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzc6IFwiNzYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNzogXCI4My5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM4OiBcIjg4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwU2FtcGxlckluc3RydW1lbnQoeyBhdHRhY2s6IDAuMDEgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzI6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vbm9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlVVJMID0gXCIvcy9tL2JyaWdodC9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVzTWFwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQzE6IFwiNC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEcxOiBcIjExLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzI6IFwiMTYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMjogXCIyMy5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzM6IFwiMzUubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNDogXCI0MC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc0OiBcIjQ3Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzU6IFwiNTIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNTogXCI1OS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzY6IFwiNzEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCh7IGF0dGFjazogMC4wNSB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlzUmVhZHkgd2lsbCBiZSB0cnVlIGFmdGVyIGFsbCB0aGUgbXAzIGZpbGVzIGxvYWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhGTTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5GTVN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhBTTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5BTVN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhQbHVjazpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2sgPSBuZXcgVG9uZS5QbHVja1N5bnRoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFja05vaXNlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFtcGVuaW5nOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb25hbmNlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsZWFzZTogMixcbiAgICAgICAgICAgICAgICAgICAgfSkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoQmFzaWM6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy8gQmFzaWNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNJbml0aWFsaXplZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkeTtcbiAgICB9XG5cbiAgICBwbGF5KHBpYW5vS2V5TnVtYmVyOiBudW1iZXIsIGR1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLCB2ZWxvY2l0eTogbnVtYmVyID0gMS4wKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uSW5mbyA9IGR1cmF0aW9uSW5TZWNvbmRzID4gMCA/IGAgZm9yICR7ZHVyYXRpb25JblNlY29uZHN9IHNlY29uZHNgIDogXCJcIjtcbiAgICAgICAgY29uc3QgdmVsb2NpdHlJbmZvID0gXCIgYXQgdmVsb2NpdHkgPSBcIiArIHZlbG9jaXR5O1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluc3RydW1lbnQ6IFBMQVkgXCIgKyBwaWFub0tleU51bWJlciArIGR1cmF0aW9uSW5mbyArIHZlbG9jaXR5SW5mbyk7XG5cbiAgICAgICAgY29uc3QgbWlkaU5vdGVOdW1iZXIgPSBwaWFub0tleU51bWJlciArIDIwO1xuXG4gICAgICAgIGNvbnN0IG5vdGVOYW1lID0gVG9uZS5GcmVxdWVuY3kobWlkaU5vdGVOdW1iZXIsIFwibWlkaVwiKS50b05vdGUoKTtcbiAgICAgICAgaWYgKHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyKSB7XG4gICAgICAgICAgICBpZiAoZHVyYXRpb25JblNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIudHJpZ2dlckF0dGFja1JlbGVhc2Uobm90ZU5hbWUsIGR1cmF0aW9uSW5TZWNvbmRzLCBUb25lLm5vdygpLCB2ZWxvY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyLnRyaWdnZXJBdHRhY2sobm90ZU5hbWUsIFRvbmUubm93KCksIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvbmVKU19QbHVjaykge1xuICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2sudHJpZ2dlckF0dGFjayhub3RlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNdXNpY2FsLmpzXG4gICAgICAgICAgICAvLyB0b25lKC4uLikgcGFyYW1ldGVyIGlzIHNwZWNpZmllZFxuICAgICAgICAgICAgLy8gYXMgYSBwb3NpdGl2ZSBpbnRlZ2VyIGluIEh6XG4gICAgICAgICAgICAvLyAgIE9SXG4gICAgICAgICAgICAvLyBhcyBhIG5lZ2F0aXZlIGludGVnZXIgaW4gTUlESSBub3RlIG51bWJlcnNcbiAgICAgICAgICAgIC8vICAgTUlESSBudW1iZXIgNjAgPT0gTWlkZGxlIEMgPT0gcGlhbm9LZXlOdW1iZXIgNDBcbiAgICAgICAgICAgIHRoaXMubXVzaWNhbEpTX1N5bnRoLnRvbmUoLW1pZGlOb3RlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AocGlhbm9LZXlOdW1iZXI6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluc3RydW1lbnQ6IFNUT1AgXCIgKyBwaWFub0tleU51bWJlcik7XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlcikge1xuICAgICAgICAgICAgY29uc3QgbWlkaU5vdGVOdW1iZXIgPSBwaWFub0tleU51bWJlciArIDIwO1xuICAgICAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShtaWRpTm90ZU51bWJlciwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIudHJpZ2dlclJlbGVhc2Uobm90ZU5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVG9uZS5qcy9QbHVja1N5bnRoIGRvZXMgbm90IG5lZWQgU1RPUCwgc2luY2UgZWFjaCBzb3VuZCBoYXMgdGhlIHNhbWUgbGVuZ3RoLlxuICAgICAgICAgICAgLy8gTXVzaWNhbC5qcyBkb2VzIG5vdCBuZWVkIFNUT1AsIHNpbmNlIGVhY2ggc291bmQgaGFzIHRoZSBzYW1lIGxlbmd0aC5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwU2FtcGxlckluc3RydW1lbnQob3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEdldCBhYnNvbHV0ZSBVUkxzIGZvciBtcDMgc2FtcGxlIGZpbGVzIHRvIHByZWxvYWQuXG4gICAgICAgIGNvbnN0IGZpbGVzVG9QcmVsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5TmFtZSBpbiB0aGlzLnNhbXBsZXNNYXApIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5zYW1wbGVzTWFwW2tleU5hbWVdO1xuICAgICAgICAgICAgZmlsZXNUb1ByZWxvYWQucHVzaCh0aGlzLmJhc2VVUkwgKyBmaWxlTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVsb2FkIHRoZSBmaWxlcyBub3cuXG4gICAgICAgIHRoaXMucHJlbG9hZGVyID0gbmV3IFByZWxvYWRlcihmaWxlc1RvUHJlbG9hZCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgVG9uZS5TYW1wbGVyIGluc3RydW1lbnRcbiAgICAgICAgY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgICAgICAgICB1cmxzOiB0aGlzLnNhbXBsZXNNYXAsXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLmJhc2VVUkwsXG4gICAgICAgICAgICBhdHRhY2s6IG9wdGlvbnMuYXR0YWNrLCAvLyBkZXRlcm1pbmVzIGhvdyBxdWlja2x5IHRoZSBub3RlIGNvbWVzIGluICh0aGUgYXR0YWNrIHBhcnQgb2YgdGhlIEFEU1IgZW52ZWxvcGUpXG4gICAgICAgICAgICByZWxlYXNlOiAwLjgsIC8vIGRldGVybWluZXMgaG93IHF1aWNrbHkgdGhlIG5vdGUgZmFsbHMgb2ZmICh0aGUgcmVsZWFzZSBwYXJ0IG9mIHRoZSBBRFNSIGVudmVsb3BlKVxuICAgICAgICAgICAgY3VydmU6IFwiZXhwb25lbnRpYWxcIiwgLy8gZXhwb25lbnRpYWwgfCBsaW5lYXJcbiAgICAgICAgICAgIG9ubG9hZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlciA9IG5ldyBUb25lLlNhbXBsZXIoY29uZmlnKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5wcmVsb2FkZXIgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50b25lSlNfUGx1Y2spIHtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTX1BsdWNrLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTX1BsdWNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tdXNpY2FsSlNfU3ludGgpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNhbEpTX1N5bnRoID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHsgSW5zdHJ1bWVudFR5cGUsIHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUgfTtcblxuZXhwb3J0IGRlZmF1bHQgSW5zdHJ1bWVudDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})