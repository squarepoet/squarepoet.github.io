webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: InstrumentType, validateInstrumentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstrumentType\", function() { return InstrumentType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateInstrumentType\", function() { return validateInstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apps/shared/sound/ToneInfo */ \"./apps/shared/sound/ToneInfo.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\n // #TODO: Can we reimplement the Musical.js sound with Tone.js?\n// See https://tonejs.github.io/docs/14.7.77/Oscillator.html\n// A Typescript enum is just a two way mapping between index and the string representation.\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"SynthBasic\"] = 0] = \"SynthBasic\";\n  InstrumentType[InstrumentType[\"SynthFM\"] = 1] = \"SynthFM\";\n  InstrumentType[InstrumentType[\"SynthAM\"] = 2] = \"SynthAM\";\n  InstrumentType[InstrumentType[\"SynthMusicalJS\"] = 3] = \"SynthMusicalJS\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 4] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 5] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"SynthPluck\"] = 6] = \"SynthPluck\";\n  InstrumentType[InstrumentType[\"COUNT\"] = 7] = \"COUNT\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar validateInstrumentType = function validateInstrumentType(inputValue) {\n  var instrumentTypeNumber = parseInt(inputValue);\n\n  if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {\n    return instrumentTypeNumber; // inputValue was VALID!\n  } else {\n    return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.\n  }\n};\n\nvar Instrument = /*#__PURE__*/function () {\n  // Several options for instrument timbre.\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can start WebAudio!\n  function Instrument(type) {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.SynthBasic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_SynthOrSampler\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_Pluck\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"musicalJS_Synth\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = type;\n\n    if (this.type === InstrumentType.SynthMusicalJS) {\n      console.log(\"Creating a Musical JS Instrument\");\n      this.musicalJS_Synth = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n      this.isReady = true;\n    } else {\n      console.log(\"Creating a Tone JS Instrument\");\n\n      if (!apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning) {\n        tone__WEBPACK_IMPORTED_MODULE_6__[\"start\"]().then(function () {\n          console.log(\"Tone is Ready!\");\n          apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning = true;\n        });\n      }\n\n      switch (this.type) {\n        case InstrumentType.Sampled_1:\n          // Stereo\n          this.baseURL = \"/s/m/grand/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            C2: \"16.mp3\",\n            C3: \"28.mp3\",\n            D3: \"30.mp3\",\n            E3: \"32.mp3\",\n            G3: \"35.mp3\",\n            A3: \"37.mp3\",\n            B3: \"39.mp3\",\n            C4: \"40.mp3\",\n            D4: \"42.mp3\",\n            E4: \"44.mp3\",\n            F4: \"45.mp3\",\n            G4: \"47.mp3\",\n            A4: \"49.mp3\",\n            C5: \"52.mp3\",\n            F5: \"57.mp3\",\n            A5: \"61.mp3\",\n            C6: \"64.mp3\",\n            F6: \"69.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.01\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.Sampled_2:\n          // Mono\n          this.baseURL = \"/s/m/bright/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            G1: \"11.mp3\",\n            C2: \"16.mp3\",\n            G2: \"23.mp3\",\n            C3: \"28.mp3\",\n            G3: \"35.mp3\",\n            C4: \"40.mp3\",\n            G4: \"47.mp3\",\n            C5: \"52.mp3\",\n            G5: \"59.mp3\",\n            C6: \"64.mp3\",\n            G6: \"71.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.05\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.SynthFM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"FMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthAM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"AMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthPluck:\n          window.alert(\"The Guitar #1 synth is currently really shitty. Please do not proceed.\");\n          this.toneJS_Pluck = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PluckSynth\"]({\n            attackNoise: 5,\n            dampening: 4000,\n            resonance: 0.98,\n            release: 0\n          }).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthBasic:\n        default:\n          // Basic\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"Synth\"]).toDestination();\n          this.isReady = true;\n          break;\n      }\n    }\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n      var durationInfo = durationInSeconds > 0 ? \" for \".concat(durationInSeconds, \" seconds\") : \"\";\n      var velocityInfo = \" at velocity = \" + velocity;\n      console.log(\"Instrument: PLAY \" + pianoKeyNumber + durationInfo + velocityInfo);\n      var midiNoteNumber = pianoKeyNumber + 20;\n      var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n\n      if (this.toneJS_SynthOrSampler) {\n        if (durationInSeconds > 0) {\n          this.toneJS_SynthOrSampler.triggerAttackRelease(noteName, durationInSeconds, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        } else {\n          this.toneJS_SynthOrSampler.triggerAttack(noteName, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        }\n      } else if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.triggerAttack(noteName);\n      } else {\n        // Musical.js\n        // tone(...) parameter is specified\n        // as a positive integer in Hz\n        //   OR\n        // as a negative integer in MIDI note numbers\n        //   MIDI number 60 == Middle C == pianoKeyNumber 40\n        this.musicalJS_Synth.tone(-midiNoteNumber);\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      console.log(\"Instrument: STOP \" + pianoKeyNumber);\n\n      if (this.toneJS_SynthOrSampler) {\n        var midiNoteNumber = pianoKeyNumber + 20;\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n        this.toneJS_SynthOrSampler.triggerRelease(noteName);\n      } else {// Tone.js/PluckSynth does not need STOP, since each sound has the same length.\n        // Musical.js does not need STOP, since each sound has the same length.\n      }\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument(options) {\n      var _this = this;\n\n      this.isReady = false; // Get absolute URLs for mp3 sample files to preload.\n\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload); // Create a Tone.Sampler instrument\n\n      var config = {\n        urls: this.samplesMap,\n        baseUrl: this.baseURL,\n        attack: options.attack,\n        // determines how quickly the note comes in (the attack part of the ADSR envelope)\n        release: 0.8,\n        // determines how quickly the note falls off (the release part of the ADSR envelope)\n        curve: \"exponential\",\n        // exponential | linear\n        onload: function onload() {\n          _this.isReady = true;\n        }\n      };\n      this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"Sampler\"](config).toDestination();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.preloader = null;\n\n      if (this.toneJS_SynthOrSampler) {\n        this.toneJS_SynthOrSampler.dispose();\n        this.toneJS_SynthOrSampler = null;\n      }\n\n      if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.dispose();\n        this.toneJS_Pluck = null;\n      }\n\n      if (this.musicalJS_Synth) {\n        this.musicalJS_Synth = null;\n      }\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwidmFsaWRhdGVJbnN0cnVtZW50VHlwZSIsImlucHV0VmFsdWUiLCJpbnN0cnVtZW50VHlwZU51bWJlciIsInBhcnNlSW50IiwiaXNOYU4iLCJDT1VOVCIsIlN5bnRoQmFzaWMiLCJJbnN0cnVtZW50IiwidHlwZSIsIlN5bnRoTXVzaWNhbEpTIiwiY29uc29sZSIsImxvZyIsIm11c2ljYWxKU19TeW50aCIsIk11c2ljYWwiLCJpc1JlYWR5IiwiVG9uZUluZm8iLCJpc1J1bm5pbmciLCJUb25lIiwidGhlbiIsIlNhbXBsZWRfMSIsImJhc2VVUkwiLCJzYW1wbGVzTWFwIiwiQzEiLCJDMiIsIkMzIiwiRDMiLCJFMyIsIkczIiwiQTMiLCJCMyIsIkM0IiwiRDQiLCJFNCIsIkY0IiwiRzQiLCJBNCIsIkM1IiwiRjUiLCJBNSIsIkM2IiwiRjYiLCJDNyIsIkc3IiwiQzgiLCJzZXR1cFNhbXBsZXJJbnN0cnVtZW50IiwiYXR0YWNrIiwiU2FtcGxlZF8yIiwiRzEiLCJHMiIsIkc1IiwiRzYiLCJTeW50aEZNIiwidG9uZUpTX1N5bnRoT3JTYW1wbGVyIiwidG9EZXN0aW5hdGlvbiIsIlN5bnRoQU0iLCJTeW50aFBsdWNrIiwid2luZG93IiwiYWxlcnQiLCJ0b25lSlNfUGx1Y2siLCJhdHRhY2tOb2lzZSIsImRhbXBlbmluZyIsInJlc29uYW5jZSIsInJlbGVhc2UiLCJwaWFub0tleU51bWJlciIsImR1cmF0aW9uSW5TZWNvbmRzIiwidmVsb2NpdHkiLCJkdXJhdGlvbkluZm8iLCJ2ZWxvY2l0eUluZm8iLCJtaWRpTm90ZU51bWJlciIsIm5vdGVOYW1lIiwidG9Ob3RlIiwidHJpZ2dlckF0dGFja1JlbGVhc2UiLCJ0cmlnZ2VyQXR0YWNrIiwidG9uZSIsInRyaWdnZXJSZWxlYXNlIiwib3B0aW9ucyIsImZpbGVzVG9QcmVsb2FkIiwia2V5TmFtZSIsImZpbGVOYW1lIiwicHVzaCIsInByZWxvYWRlciIsIlByZWxvYWRlciIsImNvbmZpZyIsInVybHMiLCJiYXNlVXJsIiwiY3VydmUiLCJvbmxvYWQiLCJkaXNwb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0NBR0E7QUFDQTtBQUVBOztJQUNLQSxjOztXQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztHQUFBQSxjLEtBQUFBLGM7O0FBV0wsSUFBTUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDQyxVQUFELEVBQXFDO0FBQ2hFLE1BQU1DLG9CQUFvQixHQUFHQyxRQUFRLENBQUNGLFVBQUQsQ0FBckM7O0FBQ0EsTUFBSSxDQUFDRyxLQUFLLENBQUNGLG9CQUFELENBQU4sSUFBZ0NBLG9CQUFvQixJQUFJLENBQXhELElBQTZEQSxvQkFBb0IsR0FBR0gsY0FBYyxDQUFDTSxLQUF2RyxFQUE4RztBQUMxRyxXQUFPSCxvQkFBUCxDQUQwRyxDQUMzRDtBQUNsRCxHQUZELE1BRU87QUFDSCxXQUFPSCxjQUFjLENBQUNPLFVBQXRCLENBREcsQ0FDK0I7QUFDckM7QUFDSixDQVBEOztJQVNNQyxVO0FBR0Y7QUFPQTtBQUtBO0FBQ0Esc0JBQVlDLElBQVosRUFBa0M7QUFBQTs7QUFBQSwwS0FmWFQsY0FBYyxDQUFDTyxVQWVKOztBQUFBLDJMQVpxQixJQVlyQjs7QUFBQSxrTEFYRixJQVdFOztBQUFBLHFMQVZJLElBVUo7O0FBQUEsNktBUlAsS0FRTzs7QUFBQSwrS0FMSCxJQUtHOztBQUFBOztBQUFBLDZLQUhSLEVBR1E7O0FBQzlCLFNBQUtFLElBQUwsR0FBWUEsSUFBWjs7QUFDQSxRQUFJLEtBQUtBLElBQUwsS0FBY1QsY0FBYyxD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LEdBQUc7QUFDaEJDLFlBQUksRUFBRSxLQUFLOUQsVUFESztBQUVoQitELGVBQU8sRUFBRSxLQUFLaEUsT0FGRTtBQUdoQnlCLGNBQU0sRUFBRThCLE9BQU8sQ0FBQzlCLE1BSEE7QUFHUTtBQUN4QmlCLGVBQU8sRUFBRSxHQUpPO0FBSUY7QUFDZHVCLGFBQUssRUFBRSxhQUxTO0FBS007QUFDdEJDLGNBQU0sRUFBRSxrQkFBTTtBQUNWLGVBQUksQ0FBQ3hFLE9BQUwsR0FBZSxJQUFmO0FBQ0g7QUFSZSxPQUFwQjtBQVVBLFdBQUtzQyxxQkFBTCxHQUE2QixJQUFJbkMsNENBQUosQ0FBaUJpRSxNQUFqQixFQUF5QjdCLGFBQXpCLEVBQTdCO0FBQ0g7Ozs4QkFFUztBQUNOLFdBQUsyQixTQUFMLEdBQWlCLElBQWpCOztBQUNBLFVBQUksS0FBSzVCLHFCQUFULEVBQWdDO0FBQzVCLGFBQUtBLHFCQUFMLENBQTJCbUMsT0FBM0I7QUFDQSxhQUFLbkMscUJBQUwsR0FBNkIsSUFBN0I7QUFDSDs7QUFDRCxVQUFJLEtBQUtNLFlBQVQsRUFBdUI7QUFDbkIsYUFBS0EsWUFBTCxDQUFrQjZCLE9BQWxCO0FBQ0EsYUFBSzdCLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDs7QUFDRCxVQUFJLEtBQUs5QyxlQUFULEVBQTBCO0FBQ3RCLGFBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDtBQUNKOzs7d0JBbkYwQjtBQUN2QixhQUFPLEtBQUtFLE9BQVo7QUFDSDs7OztLQW9GTDs7O0FBRUE7QUFFZVAseUVBQWYiLCJmaWxlIjoiLi9hcHBzL3NoYXJlZC9zb3VuZC9JbnN0cnVtZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE11c2ljYWwgZnJvbSBcImFwcHMvc2hhcmVkL3NvdW5kL011c2ljYWxcIjtcbmltcG9ydCBQcmVsb2FkZXIgZnJvbSBcImFwcHMvc2hhcmVkL3NvdW5kL1ByZWxvYWRlclwiO1xuaW1wb3J0IFRvbmVJbmZvIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9Ub25lSW5mb1wiO1xuaW1wb3J0ICogYXMgVG9uZSBmcm9tIFwidG9uZVwiO1xuXG4vLyAjVE9ETzogQ2FuIHdlIHJlaW1wbGVtZW50IHRoZSBNdXNpY2FsLmpzIHNvdW5kIHdpdGggVG9uZS5qcz9cbi8vIFNlZSBodHRwczovL3RvbmVqcy5naXRodWIuaW8vZG9jcy8xNC43Ljc3L09zY2lsbGF0b3IuaHRtbFxuXG4vLyBBIFR5cGVzY3JpcHQgZW51bSBpcyBqdXN0IGEgdHdvIHdheSBtYXBwaW5nIGJldHdlZW4gaW5kZXggYW5kIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG5lbnVtIEluc3RydW1lbnRUeXBlIHtcbiAgICBTeW50aEJhc2ljID0gMCxcbiAgICBTeW50aEZNLFxuICAgIFN5bnRoQU0sXG4gICAgU3ludGhNdXNpY2FsSlMsIC8vIE11c2ljYWwuanMgYnkgUGVuY2lsQ29kZVxuICAgIFNhbXBsZWRfMSxcbiAgICBTYW1wbGVkXzIsXG4gICAgU3ludGhQbHVjayxcbiAgICBDT1VOVCwgLy8gT2xkIHNjaG9vbCEgOi1cXFxufVxuXG5jb25zdCB2YWxpZGF0ZUluc3RydW1lbnRUeXBlID0gKGlucHV0VmFsdWU6IGFueSk6IEluc3RydW1lbnRUeXBlID0+IHtcbiAgICBjb25zdCBpbnN0cnVtZW50VHlwZU51bWJlciA9IHBhcnNlSW50KGlucHV0VmFsdWUpO1xuICAgIGlmICghaXNOYU4oaW5zdHJ1bWVudFR5cGVOdW1iZXIpICYmIGluc3RydW1lbnRUeXBlTnVtYmVyID49IDAgJiYgaW5zdHJ1bWVudFR5cGVOdW1iZXIgPCBJbnN0cnVtZW50VHlwZS5DT1VOVCkge1xuICAgICAgICByZXR1cm4gaW5zdHJ1bWVudFR5cGVOdW1iZXIgYXMgSW5zdHJ1bWVudFR5cGU7IC8vIGlucHV0VmFsdWUgd2FzIFZBTElEIVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBJbnN0cnVtZW50VHlwZS5TeW50aEJhc2ljOyAvLyBpbnB1dFZhbHVlIHdhcyBOT1QgVkFMSUQsIHNvIHdlIHJldHVybiB0aGUgZGVmYXVsdCBJbnN0cnVtZW50VHlwZS5cbiAgICB9XG59O1xuXG5jbGFzcyBJbnN0cnVtZW50IHtcbiAgICB0eXBlOiBJbnN0cnVtZW50VHlwZSA9IEluc3RydW1lbnRUeXBlLlN5bnRoQmFzaWM7XG5cbiAgICAvLyBTZXZlcmFsIG9wdGlvbnMgZm9yIGluc3RydW1lbnQgdGltYnJlLlxuICAgIHRvbmVKU19TeW50aE9yU2FtcGxlcjogVG9uZS5Qb2x5U3ludGggfCBUb25lLlNhbXBsZXIgPSBudWxsO1xuICAgIHRvbmVKU19QbHVjazogVG9uZS5QbHVja1N5bnRoID0gbnVsbDtcbiAgICBtdXNpY2FsSlNfU3ludGg6IE11c2ljYWwuSW5zdHJ1bWVudCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBzZXR0aW5nIHVwIFRvbmUuU2FtcGxlclxuICAgIHByaXZhdGUgcHJlbG9hZGVyOiBQcmVsb2FkZXIgPSBudWxsO1xuICAgIHByaXZhdGUgc2FtcGxlc01hcDogYW55O1xuICAgIHByaXZhdGUgYmFzZVVSTDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIE9ubHkgY2FsbCB0aGlzIGZyb20gYSB1c2VyIGdlc3R1cmUsIHNvIHdlIGNhbiBzdGFydCBXZWJBdWRpbyFcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJbnN0cnVtZW50VHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBJbnN0cnVtZW50VHlwZS5TeW50aE11c2ljYWxKUykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBhIE11c2ljYWwgSlMgSW5zdHJ1bWVudFwiKTtcbiAgICAgICAgICAgIHRoaXMubXVzaWNhbEpTX1N5bnRoID0gbmV3IE11c2ljYWwuSW5zdHJ1bWVudChcInBpYW5vXCIpO1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgYSBUb25lIEpTIEluc3RydW1lbnRcIik7XG4gICAgICAgICAgICBpZiAoIVRvbmVJbmZvLmlzUnVubmluZykge1xuICAgICAgICAgICAgICAgIFRvbmUuc3RhcnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb25lIGlzIFJlYWR5IVwiKTtcbiAgICAgICAgICAgICAgICAgICAgVG9uZUluZm8uaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzE6XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0ZXJlb1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VVUkwgPSBcIi9zL20vZ3JhbmQvXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlc01hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEMxOiBcIjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMjogXCIxNi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRDM6IFwiMzAubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBFMzogXCIzMi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEczOiBcIjM1Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTM6IFwiMzcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBCMzogXCIzOS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM0OiBcIjQwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRDQ6IFwiNDIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBFNDogXCI0NC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY0OiBcIjQ1Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzQ6IFwiNDcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBBNDogXCI0OS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM1OiBcIjUyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRjU6IFwiNTcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBBNTogXCI2MS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRjY6IFwiNjkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCh7IGF0dGFjazogMC4wMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc1JlYWR5IHdpbGwgYmUgdHJ1ZSBhZnRlciBhbGwgdGhlIG1wMyBmaWxlcyBsb2FkLlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlNhbXBsZWRfMjpcbiAgICAgICAgICAgICAgICAgICAgLy8gTW9ub1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VVUkwgPSBcIi9zL20vYnJpZ2h0L1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbXBsZXNNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDMTogXCI0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzE6IFwiMTEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMjogXCIxNi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEcyOiBcIjIzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzM6IFwiMjgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMzogXCIzNS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM0OiBcIjQwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzQ6IFwiNDcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNTogXCI1Mi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc1OiBcIjU5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzY6IFwiNjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNjogXCI3MS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM3OiBcIjc2Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzc6IFwiODMubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDODogXCI4OC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFNhbXBsZXJJbnN0cnVtZW50KHsgYXR0YWNrOiAwLjA1IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aEZNOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlciA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLkZNU3ludGgpLnRvRGVzdGluYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aEFNOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlciA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLkFNU3ludGgpLnRvRGVzdGluYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aFBsdWNrOlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGUgR3VpdGFyICMxIHN5bnRoIGlzIGN1cnJlbnRseSByZWFsbHkgc2hpdHR5LiBQbGVhc2UgZG8gbm90IHByb2NlZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19QbHVjayA9IG5ldyBUb25lLlBsdWNrU3ludGgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrTm9pc2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1wZW5pbmc6IDQwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbmFuY2U6IDAuOTgsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlOiAwLFxuICAgICAgICAgICAgICAgICAgICB9KS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYzpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBCYXNpY1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlciA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLlN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0luaXRpYWxpemVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1JlYWR5O1xuICAgIH1cblxuICAgIHBsYXkocGlhbm9LZXlOdW1iZXI6IG51bWJlciwgZHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAsIHZlbG9jaXR5OiBudW1iZXIgPSAxLjApIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb25JbmZvID0gZHVyYXRpb25JblNlY29uZHMgPiAwID8gYCBmb3IgJHtkdXJhdGlvbkluU2Vjb25kc30gc2Vjb25kc2AgOiBcIlwiO1xuICAgICAgICBjb25zdCB2ZWxvY2l0eUluZm8gPSBcIiBhdCB2ZWxvY2l0eSA9IFwiICsgdmVsb2NpdHk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogUExBWSBcIiArIHBpYW5vS2V5TnVtYmVyICsgZHVyYXRpb25JbmZvICsgdmVsb2NpdHlJbmZvKTtcblxuICAgICAgICBjb25zdCBtaWRpTm90ZU51bWJlciA9IHBpYW5vS2V5TnVtYmVyICsgMjA7XG5cbiAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShtaWRpTm90ZU51bWJlciwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICBpZiAodGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIpIHtcbiAgICAgICAgICAgIGlmIChkdXJhdGlvbkluU2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlci50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgZHVyYXRpb25JblNlY29uZHMsIFRvbmUubm93KCksIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIudHJpZ2dlckF0dGFjayhub3RlTmFtZSwgVG9uZS5ub3coKSwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9uZUpTX1BsdWNrKSB7XG4gICAgICAgICAgICB0aGlzLnRvbmVKU19QbHVjay50cmlnZ2VyQXR0YWNrKG5vdGVOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanNcbiAgICAgICAgICAgIC8vIHRvbmUoLi4uKSBwYXJhbWV0ZXIgaXMgc3BlY2lmaWVkXG4gICAgICAgICAgICAvLyBhcyBhIHBvc2l0aXZlIGludGVnZXIgaW4gSHpcbiAgICAgICAgICAgIC8vICAgT1JcbiAgICAgICAgICAgIC8vIGFzIGEgbmVnYXRpdmUgaW50ZWdlciBpbiBNSURJIG5vdGUgbnVtYmVyc1xuICAgICAgICAgICAgLy8gICBNSURJIG51bWJlciA2MCA9PSBNaWRkbGUgQyA9PSBwaWFub0tleU51bWJlciA0MFxuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNfU3ludGgudG9uZSgtbWlkaU5vdGVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcChwaWFub0tleU51bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogU1RPUCBcIiArIHBpYW5vS2V5TnVtYmVyKTtcbiAgICAgICAgaWYgKHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBtaWRpTm90ZU51bWJlciA9IHBpYW5vS2V5TnVtYmVyICsgMjA7XG4gICAgICAgICAgICBjb25zdCBub3RlTmFtZSA9IFRvbmUuRnJlcXVlbmN5KG1pZGlOb3RlTnVtYmVyLCBcIm1pZGlcIikudG9Ob3RlKCk7XG4gICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlci50cmlnZ2VyUmVsZWFzZShub3RlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUb25lLmpzL1BsdWNrU3ludGggZG9lcyBub3QgbmVlZCBTVE9QLCBzaW5jZSBlYWNoIHNvdW5kIGhhcyB0aGUgc2FtZSBsZW5ndGguXG4gICAgICAgICAgICAvLyBNdXNpY2FsLmpzIGRvZXMgbm90IG5lZWQgU1RPUCwgc2luY2UgZWFjaCBzb3VuZCBoYXMgdGhlIHNhbWUgbGVuZ3RoLlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0dXBTYW1wbGVySW5zdHJ1bWVudChvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gR2V0IGFic29sdXRlIFVSTHMgZm9yIG1wMyBzYW1wbGUgZmlsZXMgdG8gcHJlbG9hZC5cbiAgICAgICAgY29uc3QgZmlsZXNUb1ByZWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBrZXlOYW1lIGluIHRoaXMuc2FtcGxlc01hcCkge1xuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLnNhbXBsZXNNYXBba2V5TmFtZV07XG4gICAgICAgICAgICBmaWxlc1RvUHJlbG9hZC5wdXNoKHRoaXMuYmFzZVVSTCArIGZpbGVOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZWxvYWQgdGhlIGZpbGVzIG5vdy5cbiAgICAgICAgdGhpcy5wcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKGZpbGVzVG9QcmVsb2FkKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBUb25lLlNhbXBsZXIgaW5zdHJ1bWVudFxuICAgICAgICBjb25zdCBjb25maWc6IGFueSA9IHtcbiAgICAgICAgICAgIHVybHM6IHRoaXMuc2FtcGxlc01hcCxcbiAgICAgICAgICAgIGJhc2VVcmw6IHRoaXMuYmFzZVVSTCxcbiAgICAgICAgICAgIGF0dGFjazogb3B0aW9ucy5hdHRhY2ssIC8vIGRldGVybWluZXMgaG93IHF1aWNrbHkgdGhlIG5vdGUgY29tZXMgaW4gKHRoZSBhdHRhY2sgcGFydCBvZiB0aGUgQURTUiBlbnZlbG9wZSlcbiAgICAgICAgICAgIHJlbGVhc2U6IDAuOCwgLy8gZGV0ZXJtaW5lcyBob3cgcXVpY2tseSB0aGUgbm90ZSBmYWxscyBvZmYgKHRoZSByZWxlYXNlIHBhcnQgb2YgdGhlIEFEU1IgZW52ZWxvcGUpXG4gICAgICAgICAgICBjdXJ2ZTogXCJleHBvbmVudGlhbFwiLCAvLyBleHBvbmVudGlhbCB8IGxpbmVhclxuICAgICAgICAgICAgb25sb2FkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyID0gbmV3IFRvbmUuU2FtcGxlcihjb25maWcpLnRvRGVzdGluYXRpb24oKTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWRlciA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlcikge1xuICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU19QbHVjaykge1xuICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2suZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11c2ljYWxKU19TeW50aCkge1xuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNfU3ludGggPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgeyBJbnN0cnVtZW50VHlwZSwgdmFsaWRhdGVJbnN0cnVtZW50VHlwZSB9O1xuXG5leHBvcnQgZGVmYXVsdCBJbnN0cnVtZW50O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})