webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: InstrumentType, validateInstrumentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstrumentType\", function() { return InstrumentType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateInstrumentType\", function() { return validateInstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apps/shared/sound/ToneInfo */ \"./apps/shared/sound/ToneInfo.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\n // #TODO: Can we reimplement the Musical.js sound with Tone.js?\n// See https://tonejs.github.io/docs/14.7.77/Oscillator.html\n// A Typescript enum is just a two way mapping between index and the string representation.\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"SynthBasic\"] = 0] = \"SynthBasic\";\n  InstrumentType[InstrumentType[\"SynthFM\"] = 1] = \"SynthFM\";\n  InstrumentType[InstrumentType[\"SynthAM\"] = 2] = \"SynthAM\";\n  InstrumentType[InstrumentType[\"SynthMusicalJS\"] = 3] = \"SynthMusicalJS\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 4] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 5] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"SynthPluck\"] = 6] = \"SynthPluck\";\n  InstrumentType[InstrumentType[\"COUNT\"] = 7] = \"COUNT\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar validateInstrumentType = function validateInstrumentType(inputValue) {\n  var instrumentTypeNumber = parseInt(inputValue);\n\n  if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {\n    return instrumentTypeNumber; // inputValue was VALID!\n  } else {\n    return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.\n  }\n};\n\nvar Instrument = /*#__PURE__*/function () {\n  // Several options for instrument timbre.\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can start WebAudio!\n  function Instrument(type) {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.SynthBasic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_SynthOrSampler\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_Pluck\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"musicalJS_Synth\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = type;\n\n    if (this.type === InstrumentType.SynthMusicalJS) {\n      console.log(\"Creating a Musical JS Instrument\");\n      this.musicalJS_Synth = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n      this.isReady = true;\n    } else {\n      console.log(\"Creating a Tone JS Instrument\");\n\n      if (!apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning) {\n        tone__WEBPACK_IMPORTED_MODULE_6__[\"start\"]().then(function () {\n          console.log(\"Tone is Ready!\");\n          apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning = true;\n        });\n      }\n\n      switch (this.type) {\n        case InstrumentType.Sampled_1:\n          // Stereo\n          this.baseURL = \"/s/m/grand/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            C2: \"16.mp3\",\n            C3: \"28.mp3\",\n            D3: \"30.mp3\",\n            E3: \"32.mp3\",\n            G3: \"35.mp3\",\n            A3: \"37.mp3\",\n            B3: \"39.mp3\",\n            C4: \"40.mp3\",\n            D4: \"42.mp3\",\n            E4: \"44.mp3\",\n            F4: \"45.mp3\",\n            G4: \"47.mp3\",\n            A4: \"49.mp3\",\n            C5: \"52.mp3\",\n            F5: \"57.mp3\",\n            A5: \"61.mp3\",\n            C6: \"64.mp3\",\n            F6: \"69.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.01\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.Sampled_2:\n          // Mono\n          this.baseURL = \"/s/m/bright/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            G1: \"11.mp3\",\n            C2: \"16.mp3\",\n            G2: \"23.mp3\",\n            C3: \"28.mp3\",\n            G3: \"35.mp3\",\n            C4: \"40.mp3\",\n            G4: \"47.mp3\",\n            C5: \"52.mp3\",\n            G5: \"59.mp3\",\n            C6: \"64.mp3\",\n            G6: \"71.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.05\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.SynthFM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"FMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthAM:\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"AMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthPluck:\n          console.log(\"%cThe pluck synth is currently really shitty. Please do not proceed. 🙉\", \"color:red;font-size:16px;font-weight:bold;\");\n          this.toneJS_Pluck = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PluckSynth\"]({\n            attackNoise: 0.2,\n            dampening: 2000,\n            resonance: 0.982,\n            release: 1\n          }).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthBasic:\n        default:\n          // Basic\n          this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"Synth\"]).toDestination();\n          this.isReady = true;\n          break;\n      }\n    }\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n\n      if (velocity > 1) {\n        velocity = 1;\n      } else if (velocity < 0) {\n        velocity = 0;\n      }\n\n      var durationInfo = durationInSeconds > 0 ? \" for \".concat(durationInSeconds, \" seconds\") : \"\";\n      var velocityInfo = \" at velocity = \" + velocity;\n      console.log(\"Instrument: PLAY \" + pianoKeyNumber + durationInfo + velocityInfo);\n      var midiNoteNumber = pianoKeyNumber + 20;\n      var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n\n      if (this.toneJS_SynthOrSampler) {\n        if (durationInSeconds > 0) {\n          this.toneJS_SynthOrSampler.triggerAttackRelease(noteName, durationInSeconds, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        } else {\n          this.toneJS_SynthOrSampler.triggerAttack(noteName, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        }\n      } else if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.triggerAttack(noteName);\n      } else {\n        // Musical.js\n        // tone(...) parameter is specified\n        // as a positive integer in Hz\n        //   OR\n        // as a negative integer in MIDI note numbers\n        //   MIDI number 60 == Middle C == pianoKeyNumber 40\n        this.musicalJS_Synth.tone(-midiNoteNumber);\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      console.log(\"Instrument: STOP \" + pianoKeyNumber);\n\n      if (this.toneJS_SynthOrSampler) {\n        var midiNoteNumber = pianoKeyNumber + 20;\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n        this.toneJS_SynthOrSampler.triggerRelease(noteName);\n      } else {// Tone.js/PluckSynth does not need STOP, since each sound has the same length.\n        // Musical.js does not need STOP, since each sound has the same length.\n      }\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument(options) {\n      var _this = this;\n\n      this.isReady = false; // Get absolute URLs for mp3 sample files to preload.\n\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload); // Create a Tone.Sampler instrument\n\n      var config = {\n        urls: this.samplesMap,\n        baseUrl: this.baseURL,\n        attack: options.attack,\n        // determines how quickly the note comes in (the attack part of the ADSR envelope)\n        release: 0.8,\n        // determines how quickly the note falls off (the release part of the ADSR envelope)\n        curve: \"exponential\",\n        // exponential | linear\n        onload: function onload() {\n          _this.isReady = true;\n        }\n      };\n      this.toneJS_SynthOrSampler = new tone__WEBPACK_IMPORTED_MODULE_6__[\"Sampler\"](config).toDestination();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.preloader = null;\n\n      if (this.toneJS_SynthOrSampler) {\n        this.toneJS_SynthOrSampler.dispose();\n        this.toneJS_SynthOrSampler = null;\n      }\n\n      if (this.toneJS_Pluck) {\n        this.toneJS_Pluck.dispose();\n        this.toneJS_Pluck = null;\n      }\n\n      if (this.musicalJS_Synth) {\n        this.musicalJS_Synth = null;\n      }\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwidmFsaWRhdGVJbnN0cnVtZW50VHlwZSIsImlucHV0VmFsdWUiLCJpbnN0cnVtZW50VHlwZU51bWJlciIsInBhcnNlSW50IiwiaXNOYU4iLCJDT1VOVCIsIlN5bnRoQmFzaWMiLCJJbnN0cnVtZW50IiwidHlwZSIsIlN5bnRoTXVzaWNhbEpTIiwiY29uc29sZSIsImxvZyIsIm11c2ljYWxKU19TeW50aCIsIk11c2ljYWwiLCJpc1JlYWR5IiwiVG9uZUluZm8iLCJpc1J1bm5pbmciLCJUb25lIiwidGhlbiIsIlNhbXBsZWRfMSIsImJhc2VVUkwiLCJzYW1wbGVzTWFwIiwiQzEiLCJDMiIsIkMzIiwiRDMiLCJFMyIsIkczIiwiQTMiLCJCMyIsIkM0IiwiRDQiLCJFNCIsIkY0IiwiRzQiLCJBNCIsIkM1IiwiRjUiLCJBNSIsIkM2IiwiRjYiLCJDNyIsIkc3IiwiQzgiLCJzZXR1cFNhbXBsZXJJbnN0cnVtZW50IiwiYXR0YWNrIiwiU2FtcGxlZF8yIiwiRzEiLCJHMiIsIkc1IiwiRzYiLCJTeW50aEZNIiwidG9uZUpTX1N5bnRoT3JTYW1wbGVyIiwidG9EZXN0aW5hdGlvbiIsIlN5bnRoQU0iLCJTeW50aFBsdWNrIiwidG9uZUpTX1BsdWNrIiwiYXR0YWNrTm9pc2UiLCJkYW1wZW5pbmciLCJyZXNvbmFuY2UiLCJyZWxlYXNlIiwicGlhbm9LZXlOdW1iZXIiLCJkdXJhdGlvbkluU2Vjb25kcyIsInZlbG9jaXR5IiwiZHVyYXRpb25JbmZvIiwidmVsb2NpdHlJbmZvIiwibWlkaU5vdGVOdW1iZXIiLCJub3RlTmFtZSIsInRvTm90ZSIsInRyaWdnZXJBdHRhY2tSZWxlYXNlIiwidHJpZ2dlckF0dGFjayIsInRvbmUiLCJ0cmlnZ2VyUmVsZWFzZSIsIm9wdGlvbnMiLCJmaWxlc1RvUHJlbG9hZCIsImtleU5hbWUiLCJmaWxlTmFtZSIsInB1c2giLCJwcmVsb2FkZXIiLCJQcmVsb2FkZXIiLCJjb25maWciLCJ1cmxzIiwiYmFzZVVybCIsImN1cnZlIiwib25sb2FkIiwiZGlzcG9zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtDQUdBO0FBQ0E7QUFFQTs7SUFDS0EsYzs7V0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7R0FBQUEsYyxLQUFBQSxjOztBQVdMLElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsQ0FBQ0MsVUFBRCxFQUFxQztBQUNoRSxNQUFNQyxvQkFBb0IsR0FBR0MsUUFBUSxDQUFDRixVQUFELENBQXJDOztBQUNBLE1BQUksQ0FBQ0csS0FBSyxDQUFDRixvQkFBRCxDQUFOLElBQWdDQSxvQkFBb0IsSUFBSSxDQUF4RCxJQUE2REEsb0JBQW9CLEdBQUdILGNBQWMsQ0FBQ00sS0FBdkcsRUFBOEc7QUFDMUcsV0FBT0gsb0JBQVAsQ0FEMEcsQ0FDM0Q7QUFDbEQsR0FGRCxNQUVPO0FBQ0gsV0FBT0gsY0FBYyxDQUFDTyxVQUF0QixDQURHLENBQytCO0FBQ3JDO0FBQ0osQ0FQRDs7SUFTTUMsVTtBQUdGO0FBT0E7QUFLQTtBQUNBLHNCQUFZQyxJQUFaLEVBQWtDO0FBQUE7O0FBQUEsMEtBZlhULGNBQWMsQ0FBQ08sVUFlSjs7QUFBQSwyTEFacUIsSUFZckI7O0FBQUEsa0xBWEYsSUFXRTs7QUFBQSxxTEFWSSxJQVVKOztBQUFBLDZLQVJQLEtBUU87O0FBQUEsK0tBTEgsSUFLRzs7QUFBQTs7QUFBQSw2S0FIUixFQUdROztBQUM5QixTQUFLRSxJQUFMLEdBQVlBLElBQVo7O0FBQ0EsUUFBSSxLQUFLQSxJQUFMLEtBQWNULGNBQWMsQ0FBQ1UsY0FBakMsRUFBaUQ7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S0FBS3pELE9BQUwsR0FBZXdELFFBQW5DO0FBQ0gsT0FSZ0MsQ0FVakM7OztBQUNBLFdBQUtFLFNBQUwsR0FBaUIsSUFBSUMsbUVBQUosQ0FBY0wsY0FBZCxDQUFqQixDQVhpQyxDQWFqQzs7QUFDQSxVQUFNTSxNQUFXLEdBQUc7QUFDaEJDLFlBQUksRUFBRSxLQUFLNUQsVUFESztBQUVoQjZELGVBQU8sRUFBRSxLQUFLOUQsT0FGRTtBQUdoQnlCLGNBQU0sRUFBRTRCLE9BQU8sQ0FBQzVCLE1BSEE7QUFHUTtBQUN4QmUsZUFBTyxFQUFFLEdBSk87QUFJRjtBQUNkdUIsYUFBSyxFQUFFLGFBTFM7QUFLTTtBQUN0QkMsY0FBTSxFQUFFLGtCQUFNO0FBQ1YsZUFBSSxDQUFDdEUsT0FBTCxHQUFlLElBQWY7QUFDSDtBQVJlLE9BQXBCO0FBVUEsV0FBS3NDLHFCQUFMLEdBQTZCLElBQUluQyw0Q0FBSixDQUFpQitELE1BQWpCLEVBQXlCM0IsYUFBekIsRUFBN0I7QUFDSDs7OzhCQUVTO0FBQ04sV0FBS3lCLFNBQUwsR0FBaUIsSUFBakI7O0FBQ0EsVUFBSSxLQUFLMUIscUJBQVQsRUFBZ0M7QUFDNUIsYUFBS0EscUJBQUwsQ0FBMkJpQyxPQUEzQjtBQUNBLGFBQUtqQyxxQkFBTCxHQUE2QixJQUE3QjtBQUNIOztBQUNELFVBQUksS0FBS0ksWUFBVCxFQUF1QjtBQUNuQixhQUFLQSxZQUFMLENBQWtCNkIsT0FBbEI7QUFDQSxhQUFLN0IsWUFBTCxHQUFvQixJQUFwQjtBQUNIOztBQUNELFVBQUksS0FBSzVDLGVBQVQsRUFBMEI7QUFDdEIsYUFBS0EsZUFBTCxHQUF1QixJQUF2QjtBQUNIO0FBQ0o7Ozt3QkF6RjBCO0FBQ3ZCLGFBQU8sS0FBS0UsT0FBWjtBQUNIOzs7O0tBMEZMOzs7QUFFQTtBQUVlUCx5RUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL3NvdW5kL0luc3RydW1lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVzaWNhbCBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvTXVzaWNhbFwiO1xuaW1wb3J0IFByZWxvYWRlciBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvUHJlbG9hZGVyXCI7XG5pbXBvcnQgVG9uZUluZm8gZnJvbSBcImFwcHMvc2hhcmVkL3NvdW5kL1RvbmVJbmZvXCI7XG5pbXBvcnQgKiBhcyBUb25lIGZyb20gXCJ0b25lXCI7XG5cbi8vICNUT0RPOiBDYW4gd2UgcmVpbXBsZW1lbnQgdGhlIE11c2ljYWwuanMgc291bmQgd2l0aCBUb25lLmpzP1xuLy8gU2VlIGh0dHBzOi8vdG9uZWpzLmdpdGh1Yi5pby9kb2NzLzE0LjcuNzcvT3NjaWxsYXRvci5odG1sXG5cbi8vIEEgVHlwZXNjcmlwdCBlbnVtIGlzIGp1c3QgYSB0d28gd2F5IG1hcHBpbmcgYmV0d2VlbiBpbmRleCBhbmQgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbmVudW0gSW5zdHJ1bWVudFR5cGUge1xuICAgIFN5bnRoQmFzaWMgPSAwLFxuICAgIFN5bnRoRk0sXG4gICAgU3ludGhBTSxcbiAgICBTeW50aE11c2ljYWxKUywgLy8gTXVzaWNhbC5qcyBieSBQZW5jaWxDb2RlXG4gICAgU2FtcGxlZF8xLFxuICAgIFNhbXBsZWRfMixcbiAgICBTeW50aFBsdWNrLFxuICAgIENPVU5ULCAvLyBPbGQgc2Nob29sISA6LVxcXG59XG5cbmNvbnN0IHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUgPSAoaW5wdXRWYWx1ZTogYW55KTogSW5zdHJ1bWVudFR5cGUgPT4ge1xuICAgIGNvbnN0IGluc3RydW1lbnRUeXBlTnVtYmVyID0gcGFyc2VJbnQoaW5wdXRWYWx1ZSk7XG4gICAgaWYgKCFpc05hTihpbnN0cnVtZW50VHlwZU51bWJlcikgJiYgaW5zdHJ1bWVudFR5cGVOdW1iZXIgPj0gMCAmJiBpbnN0cnVtZW50VHlwZU51bWJlciA8IEluc3RydW1lbnRUeXBlLkNPVU5UKSB7XG4gICAgICAgIHJldHVybiBpbnN0cnVtZW50VHlwZU51bWJlciBhcyBJbnN0cnVtZW50VHlwZTsgLy8gaW5wdXRWYWx1ZSB3YXMgVkFMSUQhXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEluc3RydW1lbnRUeXBlLlN5bnRoQmFzaWM7IC8vIGlucHV0VmFsdWUgd2FzIE5PVCBWQUxJRCwgc28gd2UgcmV0dXJuIHRoZSBkZWZhdWx0IEluc3RydW1lbnRUeXBlLlxuICAgIH1cbn07XG5cbmNsYXNzIEluc3RydW1lbnQge1xuICAgIHR5cGU6IEluc3RydW1lbnRUeXBlID0gSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYztcblxuICAgIC8vIFNldmVyYWwgb3B0aW9ucyBmb3IgaW5zdHJ1bWVudCB0aW1icmUuXG4gICAgdG9uZUpTX1N5bnRoT3JTYW1wbGVyOiBUb25lLlBvbHlTeW50aCB8IFRvbmUuU2FtcGxlciA9IG51bGw7XG4gICAgdG9uZUpTX1BsdWNrOiBUb25lLlBsdWNrU3ludGggPSBudWxsO1xuICAgIG11c2ljYWxKU19TeW50aDogTXVzaWNhbC5JbnN0cnVtZW50ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIHNldHRpbmcgdXAgVG9uZS5TYW1wbGVyXG4gICAgcHJpdmF0ZSBwcmVsb2FkZXI6IFByZWxvYWRlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzYW1wbGVzTWFwOiBhbnk7XG4gICAgcHJpdmF0ZSBiYXNlVVJMOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy8gT25seSBjYWxsIHRoaXMgZnJvbSBhIHVzZXIgZ2VzdHVyZSwgc28gd2UgY2FuIHN0YXJ0IFdlYkF1ZGlvIVxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEluc3RydW1lbnRUeXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEluc3RydW1lbnRUeXBlLlN5bnRoTXVzaWNhbEpTKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIGEgTXVzaWNhbCBKUyBJbnN0cnVtZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNfU3ludGggPSBuZXcgTXVzaWNhbC5JbnN0cnVtZW50KFwicGlhbm9cIik7XG4gICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBhIFRvbmUgSlMgSW5zdHJ1bWVudFwiKTtcbiAgICAgICAgICAgIGlmICghVG9uZUluZm8uaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgVG9uZS5zdGFydCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvbmUgaXMgUmVhZHkhXCIpO1xuICAgICAgICAgICAgICAgICAgICBUb25lSW5mby5pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlNhbXBsZWRfMTpcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RlcmVvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiL3MvbS9ncmFuZC9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVzTWFwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQzE6IFwiNC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMyOiBcIjE2Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzM6IFwiMjgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBEMzogXCIzMC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEUzOiBcIjMyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzM6IFwiMzUubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBBMzogXCIzNy5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEIzOiBcIjM5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzQ6IFwiNDAubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBENDogXCI0Mi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEU0OiBcIjQ0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRjQ6IFwiNDUubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNDogXCI0Ny5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEE0OiBcIjQ5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzU6IFwiNTIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBGNTogXCI1Ny5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEE1OiBcIjYxLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzY6IFwiNjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBGNjogXCI2OS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM3OiBcIjc2Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzc6IFwiODMubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDODogXCI4OC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFNhbXBsZXJJbnN0cnVtZW50KHsgYXR0YWNrOiAwLjAxIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmlzUmVhZHkgd2lsbCBiZSB0cnVlIGFmdGVyIGFsbCB0aGUgbXAzIGZpbGVzIGxvYWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8yOlxuICAgICAgICAgICAgICAgICAgICAvLyBNb25vXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiL3MvbS9icmlnaHQvXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlc01hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEMxOiBcIjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMTogXCIxMS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMyOiBcIjE2Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzI6IFwiMjMubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMzogXCIyOC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEczOiBcIjM1Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzQ6IFwiNDAubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNDogXCI0Ny5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM1OiBcIjUyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzU6IFwiNTkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNjogXCI2NC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc2OiBcIjcxLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzc6IFwiNzYubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNzogXCI4My5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM4OiBcIjg4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHVwU2FtcGxlckluc3RydW1lbnQoeyBhdHRhY2s6IDAuMDUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc1JlYWR5IHdpbGwgYmUgdHJ1ZSBhZnRlciBhbGwgdGhlIG1wMyBmaWxlcyBsb2FkLlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoRk06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuRk1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoQU06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuQU1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoUGx1Y2s6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWNUaGUgcGx1Y2sgc3ludGggaXMgY3VycmVudGx5IHJlYWxseSBzaGl0dHkuIFBsZWFzZSBkbyBub3QgcHJvY2VlZC4g8J+ZiVwiLCBcImNvbG9yOnJlZDtmb250LXNpemU6MTZweDtmb250LXdlaWdodDpib2xkO1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19QbHVjayA9IG5ldyBUb25lLlBsdWNrU3ludGgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNrTm9pc2U6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbXBlbmluZzogMjAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29uYW5jZTogMC45ODIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlOiAxLFxuICAgICAgICAgICAgICAgICAgICB9KS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYzpcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBCYXNpY1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlciA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLlN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0luaXRpYWxpemVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1JlYWR5O1xuICAgIH1cblxuICAgIHBsYXkocGlhbm9LZXlOdW1iZXI6IG51bWJlciwgZHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAsIHZlbG9jaXR5OiBudW1iZXIgPSAxLjApIHtcbiAgICAgICAgaWYgKHZlbG9jaXR5ID4gMSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHZlbG9jaXR5IDwgMCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHVyYXRpb25JbmZvID0gZHVyYXRpb25JblNlY29uZHMgPiAwID8gYCBmb3IgJHtkdXJhdGlvbkluU2Vjb25kc30gc2Vjb25kc2AgOiBcIlwiO1xuICAgICAgICBjb25zdCB2ZWxvY2l0eUluZm8gPSBcIiBhdCB2ZWxvY2l0eSA9IFwiICsgdmVsb2NpdHk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogUExBWSBcIiArIHBpYW5vS2V5TnVtYmVyICsgZHVyYXRpb25JbmZvICsgdmVsb2NpdHlJbmZvKTtcblxuICAgICAgICBjb25zdCBtaWRpTm90ZU51bWJlciA9IHBpYW5vS2V5TnVtYmVyICsgMjA7XG5cbiAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShtaWRpTm90ZU51bWJlciwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICBpZiAodGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIpIHtcbiAgICAgICAgICAgIGlmIChkdXJhdGlvbkluU2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlci50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgZHVyYXRpb25JblNlY29uZHMsIFRvbmUubm93KCksIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIudHJpZ2dlckF0dGFjayhub3RlTmFtZSwgVG9uZS5ub3coKSwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9uZUpTX1BsdWNrKSB7XG4gICAgICAgICAgICB0aGlzLnRvbmVKU19QbHVjay50cmlnZ2VyQXR0YWNrKG5vdGVOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanNcbiAgICAgICAgICAgIC8vIHRvbmUoLi4uKSBwYXJhbWV0ZXIgaXMgc3BlY2lmaWVkXG4gICAgICAgICAgICAvLyBhcyBhIHBvc2l0aXZlIGludGVnZXIgaW4gSHpcbiAgICAgICAgICAgIC8vICAgT1JcbiAgICAgICAgICAgIC8vIGFzIGEgbmVnYXRpdmUgaW50ZWdlciBpbiBNSURJIG5vdGUgbnVtYmVyc1xuICAgICAgICAgICAgLy8gICBNSURJIG51bWJlciA2MCA9PSBNaWRkbGUgQyA9PSBwaWFub0tleU51bWJlciA0MFxuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNfU3ludGgudG9uZSgtbWlkaU5vdGVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcChwaWFub0tleU51bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogU1RPUCBcIiArIHBpYW5vS2V5TnVtYmVyKTtcbiAgICAgICAgaWYgKHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBtaWRpTm90ZU51bWJlciA9IHBpYW5vS2V5TnVtYmVyICsgMjA7XG4gICAgICAgICAgICBjb25zdCBub3RlTmFtZSA9IFRvbmUuRnJlcXVlbmN5KG1pZGlOb3RlTnVtYmVyLCBcIm1pZGlcIikudG9Ob3RlKCk7XG4gICAgICAgICAgICB0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlci50cmlnZ2VyUmVsZWFzZShub3RlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUb25lLmpzL1BsdWNrU3ludGggZG9lcyBub3QgbmVlZCBTVE9QLCBzaW5jZSBlYWNoIHNvdW5kIGhhcyB0aGUgc2FtZSBsZW5ndGguXG4gICAgICAgICAgICAvLyBNdXNpY2FsLmpzIGRvZXMgbm90IG5lZWQgU1RPUCwgc2luY2UgZWFjaCBzb3VuZCBoYXMgdGhlIHNhbWUgbGVuZ3RoLlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0dXBTYW1wbGVySW5zdHJ1bWVudChvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gR2V0IGFic29sdXRlIFVSTHMgZm9yIG1wMyBzYW1wbGUgZmlsZXMgdG8gcHJlbG9hZC5cbiAgICAgICAgY29uc3QgZmlsZXNUb1ByZWxvYWQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBrZXlOYW1lIGluIHRoaXMuc2FtcGxlc01hcCkge1xuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLnNhbXBsZXNNYXBba2V5TmFtZV07XG4gICAgICAgICAgICBmaWxlc1RvUHJlbG9hZC5wdXNoKHRoaXMuYmFzZVVSTCArIGZpbGVOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZWxvYWQgdGhlIGZpbGVzIG5vdy5cbiAgICAgICAgdGhpcy5wcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKGZpbGVzVG9QcmVsb2FkKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBUb25lLlNhbXBsZXIgaW5zdHJ1bWVudFxuICAgICAgICBjb25zdCBjb25maWc6IGFueSA9IHtcbiAgICAgICAgICAgIHVybHM6IHRoaXMuc2FtcGxlc01hcCxcbiAgICAgICAgICAgIGJhc2VVcmw6IHRoaXMuYmFzZVVSTCxcbiAgICAgICAgICAgIGF0dGFjazogb3B0aW9ucy5hdHRhY2ssIC8vIGRldGVybWluZXMgaG93IHF1aWNrbHkgdGhlIG5vdGUgY29tZXMgaW4gKHRoZSBhdHRhY2sgcGFydCBvZiB0aGUgQURTUiBlbnZlbG9wZSlcbiAgICAgICAgICAgIHJlbGVhc2U6IDAuOCwgLy8gZGV0ZXJtaW5lcyBob3cgcXVpY2tseSB0aGUgbm90ZSBmYWxscyBvZmYgKHRoZSByZWxlYXNlIHBhcnQgb2YgdGhlIEFEU1IgZW52ZWxvcGUpXG4gICAgICAgICAgICBjdXJ2ZTogXCJleHBvbmVudGlhbFwiLCAvLyBleHBvbmVudGlhbCB8IGxpbmVhclxuICAgICAgICAgICAgb25sb2FkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9uZUpTX1N5bnRoT3JTYW1wbGVyID0gbmV3IFRvbmUuU2FtcGxlcihjb25maWcpLnRvRGVzdGluYXRpb24oKTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLnByZWxvYWRlciA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU19TeW50aE9yU2FtcGxlcikge1xuICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNfU3ludGhPclNhbXBsZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRvbmVKU19QbHVjaykge1xuICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2suZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNfUGx1Y2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11c2ljYWxKU19TeW50aCkge1xuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNfU3ludGggPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgeyBJbnN0cnVtZW50VHlwZSwgdmFsaWRhdGVJbnN0cnVtZW50VHlwZSB9O1xuXG5leHBvcnQgZGVmYXVsdCBJbnN0cnVtZW50O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})