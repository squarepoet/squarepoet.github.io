webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: InstrumentType, validateInstrumentType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstrumentType\", function() { return InstrumentType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateInstrumentType\", function() { return validateInstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apps/shared/sound/ToneInfo */ \"./apps/shared/sound/ToneInfo.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\n // #TODO: Can we reimplement the Musical.js sound with Tone.js?\n// See https://tonejs.github.io/docs/14.7.77/Oscillator.html\n// A Typescript enum is just a two way mapping between index and the string representation.\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"SynthBasic\"] = 0] = \"SynthBasic\";\n  InstrumentType[InstrumentType[\"SynthFM\"] = 1] = \"SynthFM\";\n  InstrumentType[InstrumentType[\"SynthAM\"] = 2] = \"SynthAM\";\n  InstrumentType[InstrumentType[\"SynthMusicalJS\"] = 3] = \"SynthMusicalJS\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 4] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 5] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"SynthPluck\"] = 6] = \"SynthPluck\";\n  InstrumentType[InstrumentType[\"COUNT\"] = 7] = \"COUNT\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar validateInstrumentType = function validateInstrumentType(inputValue) {\n  var instrumentTypeNumber = parseInt(inputValue);\n\n  if (!isNaN(instrumentTypeNumber) && instrumentTypeNumber >= 0 && instrumentTypeNumber < InstrumentType.COUNT) {\n    return instrumentTypeNumber; // inputValue was VALID!\n  } else {\n    return InstrumentType.SynthBasic; // inputValue was NOT VALID, so we return the default InstrumentType.\n  }\n};\n\nvar Instrument = /*#__PURE__*/function () {\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can start WebAudio!\n  function Instrument(type) {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.SynthBasic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJSInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"toneJS_PluckInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"musicalJSInstrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = type;\n\n    if (this.type === InstrumentType.SynthMusicalJS) {\n      console.log(\"Creating a Musical JS Instrument\");\n      this.musicalJSInstrument = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n      this.isReady = true;\n    } else {\n      console.log(\"Creating a Tone JS Instrument\");\n\n      if (!apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning) {\n        tone__WEBPACK_IMPORTED_MODULE_6__[\"start\"]().then(function () {\n          console.log(\"Tone is Ready!\");\n          apps_shared_sound_ToneInfo__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isRunning = true;\n        });\n      }\n\n      switch (this.type) {\n        case InstrumentType.Sampled_1:\n          // Stereo\n          this.baseURL = \"/s/m/grand/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            C2: \"16.mp3\",\n            C3: \"28.mp3\",\n            D3: \"30.mp3\",\n            E3: \"32.mp3\",\n            G3: \"35.mp3\",\n            A3: \"37.mp3\",\n            B3: \"39.mp3\",\n            C4: \"40.mp3\",\n            D4: \"42.mp3\",\n            E4: \"44.mp3\",\n            F4: \"45.mp3\",\n            G4: \"47.mp3\",\n            A4: \"49.mp3\",\n            C5: \"52.mp3\",\n            F5: \"57.mp3\",\n            A5: \"61.mp3\",\n            C6: \"64.mp3\",\n            F6: \"69.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.01\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.Sampled_2:\n          // Mono\n          this.baseURL = \"/s/m/bright/\";\n          this.samplesMap = {\n            C1: \"4.mp3\",\n            G1: \"11.mp3\",\n            C2: \"16.mp3\",\n            G2: \"23.mp3\",\n            C3: \"28.mp3\",\n            G3: \"35.mp3\",\n            C4: \"40.mp3\",\n            G4: \"47.mp3\",\n            C5: \"52.mp3\",\n            G5: \"59.mp3\",\n            C6: \"64.mp3\",\n            G6: \"71.mp3\",\n            C7: \"76.mp3\",\n            G7: \"83.mp3\",\n            C8: \"88.mp3\"\n          };\n          this.setupSamplerInstrument({\n            attack: 0.05\n          }); // this.isReady will be true after all the mp3 files load.\n\n          break;\n\n        case InstrumentType.SynthFM:\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"FMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthAM:\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"AMSynth\"]).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthPluck:\n          this.toneJS_PluckInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PluckSynth\"]({}).toDestination();\n          this.isReady = true;\n          break;\n\n        case InstrumentType.SynthBasic:\n        default:\n          // Basic\n          this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_6__[\"Synth\"]).toDestination();\n          this.isReady = true;\n          break;\n      }\n    }\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n      var durationInfo = durationInSeconds > 0 ? \" for \".concat(durationInSeconds, \" seconds\") : \"\";\n      var velocityInfo = \" at velocity = \" + velocity;\n      console.log(\"Instrument: PLAY \" + pianoKeyNumber + durationInfo + velocityInfo);\n      var midiNoteNumber = pianoKeyNumber + 20;\n\n      if (this.toneJSInstrument) {\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n\n        if (durationInSeconds > 0) {\n          this.toneJSInstrument.triggerAttackRelease(noteName, durationInSeconds, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        } else {\n          this.toneJSInstrument.triggerAttack(noteName, tone__WEBPACK_IMPORTED_MODULE_6__[\"now\"](), velocity);\n        }\n      } else if (this.toneJS_PluckInstrument) {} else {\n        // Musical.js\n        // tone(...) parameter is specified\n        // as a positive integer in Hz\n        //   OR\n        // as a negative integer in MIDI note numbers\n        //   MIDI number 60 == Middle C == pianoKeyNumber 40\n        this.musicalJSInstrument.tone(-midiNoteNumber);\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      console.log(\"Instrument: STOP \" + pianoKeyNumber);\n\n      if (this.toneJSInstrument) {\n        var midiNoteNumber = pianoKeyNumber + 20;\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_6__[\"Frequency\"](midiNoteNumber, \"midi\").toNote();\n        this.toneJSInstrument.triggerRelease(noteName);\n      } else {// Musical.js does not need STOP, since each tone has the same length.\n      }\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument(options) {\n      var _this = this;\n\n      this.isReady = false; // Get absolute URLs for mp3 sample files to preload.\n\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload); // Create a Tone.Sampler instrument\n\n      var config = {\n        urls: this.samplesMap,\n        baseUrl: this.baseURL,\n        attack: options.attack,\n        // determines how quickly the note comes in (the attack part of the ADSR envelope)\n        release: 0.8,\n        // determines how quickly the note falls off (the release part of the ADSR envelope)\n        curve: \"exponential\",\n        // exponential | linear\n        onload: function onload() {\n          _this.isReady = true;\n        }\n      };\n      this.toneJSInstrument = new tone__WEBPACK_IMPORTED_MODULE_6__[\"Sampler\"](config).toDestination();\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      this.preloader = null;\n\n      if (this.toneJSInstrument) {\n        this.toneJSInstrument.dispose();\n        this.toneJSInstrument = null;\n      }\n\n      if (this.musicalJSInstrument) {\n        this.musicalJSInstrument = null;\n      }\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwidmFsaWRhdGVJbnN0cnVtZW50VHlwZSIsImlucHV0VmFsdWUiLCJpbnN0cnVtZW50VHlwZU51bWJlciIsInBhcnNlSW50IiwiaXNOYU4iLCJDT1VOVCIsIlN5bnRoQmFzaWMiLCJJbnN0cnVtZW50IiwidHlwZSIsIlN5bnRoTXVzaWNhbEpTIiwiY29uc29sZSIsImxvZyIsIm11c2ljYWxKU0luc3RydW1lbnQiLCJNdXNpY2FsIiwiaXNSZWFkeSIsIlRvbmVJbmZvIiwiaXNSdW5uaW5nIiwiVG9uZSIsInRoZW4iLCJTYW1wbGVkXzEiLCJiYXNlVVJMIiwic2FtcGxlc01hcCIsIkMxIiwiQzIiLCJDMyIsIkQzIiwiRTMiLCJHMyIsIkEzIiwiQjMiLCJDNCIsIkQ0IiwiRTQiLCJGNCIsIkc0IiwiQTQiLCJDNSIsIkY1IiwiQTUiLCJDNiIsIkY2IiwiQzciLCJHNyIsIkM4Iiwic2V0dXBTYW1wbGVySW5zdHJ1bWVudCIsImF0dGFjayIsIlNhbXBsZWRfMiIsIkcxIiwiRzIiLCJHNSIsIkc2IiwiU3ludGhGTSIsInRvbmVKU0luc3RydW1lbnQiLCJ0b0Rlc3RpbmF0aW9uIiwiU3ludGhBTSIsIlN5bnRoUGx1Y2siLCJ0b25lSlNfUGx1Y2tJbnN0cnVtZW50IiwicGlhbm9LZXlOdW1iZXIiLCJkdXJhdGlvbkluU2Vjb25kcyIsInZlbG9jaXR5IiwiZHVyYXRpb25JbmZvIiwidmVsb2NpdHlJbmZvIiwibWlkaU5vdGVOdW1iZXIiLCJub3RlTmFtZSIsInRvTm90ZSIsInRyaWdnZXJBdHRhY2tSZWxlYXNlIiwidHJpZ2dlckF0dGFjayIsInRvbmUiLCJ0cmlnZ2VyUmVsZWFzZSIsIm9wdGlvbnMiLCJmaWxlc1RvUHJlbG9hZCIsImtleU5hbWUiLCJmaWxlTmFtZSIsInB1c2giLCJwcmVsb2FkZXIiLCJQcmVsb2FkZXIiLCJjb25maWciLCJ1cmxzIiwiYmFzZVVybCIsInJlbGVhc2UiLCJjdXJ2ZSIsIm9ubG9hZCIsImRpc3Bvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7Q0FHQTtBQUNBO0FBRUE7O0lBQ0tBLGM7O1dBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0IsQ0FBQUEsYztBQUFBQSxnQixDQUFBQSxjO0dBQUFBLGMsS0FBQUEsYzs7QUFXTCxJQUFNQyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLENBQUNDLFVBQUQsRUFBcUM7QUFDaEUsTUFBTUMsb0JBQW9CLEdBQUdDLFFBQVEsQ0FBQ0YsVUFBRCxDQUFyQzs7QUFDQSxNQUFJLENBQUNHLEtBQUssQ0FBQ0Ysb0JBQUQsQ0FBTixJQUFnQ0Esb0JBQW9CLElBQUksQ0FBeEQsSUFBNkRBLG9CQUFvQixHQUFHSCxjQUFjLENBQUNNLEtBQXZHLEVBQThHO0FBQzFHLFdBQU9ILG9CQUFQLENBRDBHLENBQzNEO0FBQ2xELEdBRkQsTUFFTztBQUNILFdBQU9ILGNBQWMsQ0FBQ08sVUFBdEIsQ0FERyxDQUMrQjtBQUNyQztBQUNKLENBUEQ7O0lBU01DLFU7QUFTRjtBQUtBO0FBQ0Esc0JBQVlDLElBQVosRUFBa0M7QUFBQTs7QUFBQSwwS0FkWFQsY0FBYyxDQUFDTyxVQWNKOztBQUFBLHNMQVpnQixJQVloQjs7QUFBQSw0TEFYUSxJQVdSOztBQUFBLHlMQVZRLElBVVI7O0FBQUEsNktBUlAsS0FRTzs7QUFBQSwrS0FMSCxJQUtHOztBQUFBOztBQUFBLDZLQUhSLEVBR1E7O0FBQzlCLFNBQUtFLElBQUwsR0FBWUEsSUFBWjs7QUFDQSxRQUFJLEtBQUtBLElBQUwsS0FBY1QsY0FBYyxDQUFDVSxjQUFqQyxFQUFpRDtBQUM3Q0MsYUFBTyxDQUFDQyxHQUFSLENBQVksa0NBQVo7QUFDQSxXQUFLQyxtQkFBTCxHQUEyQixJQUFJQyxpRUFBTyxDQUFDTixVQUFaLENBQXVCLE9BQXZCLENBQTNCO0FBQ0EsV0FBS08sT0FBTCxHQUFlLElBQWY7QUFDSCxLQUpELE1BSU87QUFDSEosYUFBTyxDQUFDQyxHQUFSLENBQVksK0JBQVo7O0FBQ0EsVUFBSSxDQUFDSSxrRUFBUSxDQUFDQyxTQUFkLEVBQXlCO0FBQ3JCQyxrREFBQSxHQUFhQyxJQUFiLENBQWtCLFlBQU07QUFDcEJSLGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBSSw0RUFBUSxDQUFDQyxTQUFULEdBQXFCLElBQXJCO0FBQ0gsU0FIRDtBQUlIOztBQUNELGNBQVEsS0FBS1IsSUFBYjtBQUNJLGFBQUtULGNBQWMsQ0FBQ29CLFNBQXBCO0FBQ0k7QUFDQSxlQUFLQyxPQUFMLEdBQWUsYUFBZjtBQUNBLGVBQUtDLFVBQUwsR0FBa0I7QUFDZEMsY0FBRSxFQUFFLE9BRFU7QUFFZEMsY0FBRSxFQUFFLFFBRlU7QUFHZEMsY0FBRSxFQUFFLFFBSFU7QUFJZEMsY0FBRSxFQUFFLFFBSlU7QUFLZEMsY0FBRSxFQUFFLFFBTFU7QUFNZEMsY0FBRSxFQUFFLFFBTlU7QUFPZEMsY0FBRSxFQUFFLFFBUFU7QUFRZEMsY0FBRSxFQUFFLFFBUlU7QUFTZEMsY0FBRSxFQUFFLFFBVFU7QUFVZEMsY0FBRSxFQUFFLFFBVlU7QUFXZEMsY0FBRSxFQUFFLFFBWFU7QUFZZEMsY0FBRSxFQUFFLFFBWlU7QUFhZEMsY0FBRSxFQUFFLFFBYlU7QUFjZEMsY0FBRSxFQUFFLFFBZFU7QUFlZEMsY0FBRSxFQUFFLFFBZlU7QUFnQmRDLGNBQUUsRUFBRSxRQWhCVTtBQWlCZEMsY0FBRSxFQUFFLFFBakJVO0FBa0JkQyxjQUFFLEVBQUUsUUFsQlU7QUFtQmRDLGNBQUUsRUFBRSxRQW5CVTtBQW9CZEMsY0FBRSxFQUFFLFFBcEJVO0FBcUJkQyxjQUFFLEVBQUUsUUFyQlU7QUFzQmRDLGNBQUUsRUFBRTtBQXRCVSxXQUFsQjtBQXdCQSxlQUFLQyxzQkFBTCxDQUE0QjtBQUFFQyxrQkFBTSxFQUFFO0FBQVYsV0FBNUIsRUEzQkosQ0E0Qkk7O0FBQ0E7O0FBQ0osYUFBSzlDLGNBQWMsQ0FBQytDLFNBQXBCO0FBQ0k7QUFDQSxlQUFLMUIsT0FBTCxHQUFlLGNBQWY7QUFDQSxlQUFLQyxVQUFMLEdBQWtCO0FBQ2RDLGNBQUUsRUFBRSxPQURVO0FBRWR5QixjQUFFLEVBQUUsUUFGVTtBQUdkeEIsY0FBRSxFQUFFLFFBSFU7QUFJZHlCLGNBQUUsRUFBRSxRQUpVO0FBS2R4QixjQUFFLEVBQUUsUUFMVTtBQU1kRyxjQUFFLEVBQUUsUUFOVTtBQU9kRyxjQUFFLEVBQUUsUUFQVTtBQVFkSSxjQUFFLEVBQUUsUUFSVTtBQVNkRSxjQUFFLEVBQUUsUUFUVTtBQVVkYSxjQUFFLEVBQUUsUUFWVTtBQVdkVixjQUFFLEVBQUUsUUFYVTtBQVlkVyxjQUFFLEVBQUUsUUFaVTtBQWFkVCxjQUFFLEVBQUUsUUFiVTtBQWNkQyxjQUFFLEVBQUUsUUFkVTtBQWVkQyxjQUFFLEVBQUU7QUFmVSxXQUFsQjtBQWlCQSxlQUFLQyxzQkFBTCxDQUE0QjtBQUFFQyxrQkFBTSxFQUFFO0FBQVYsV0FBNUIsRUFwQkosQ0FzQkk7O0FBQ0E7O0FBQ0osYUFBSzlDLGNBQWMsQ0FBQ29ELE9BQXBCO0FBQ0ksZUFBS0MsZ0JBQUwsR0FBd0IsSUFBSW5DLDhDQUFKLENBQW1CQSw0Q0FBbkIsRUFBaUNvQyxhQUFqQyxFQUF4QjtBQUNBLGVBQUt2QyxPQUFMLEdBQWUsSUFBZjtBQUNBOztBQUNKLGFBQUtmLGNBQWMsQ0FBQ3VELE9BQXBCO0FBQ0ksZUFBS0YsZ0JBQUwsR0FBd0IsSUFBSW5DLDhDQUFKLENBQW1CQSw0Q0FBbkIsRUFBaUNvQyxhQUFqQyxFQUF4QjtBQUNBLGVBQUt2QyxPQUFMLEdBQWUsSUFBZjtBQUNBOztBQUNKLGFBQUtmLGNBQWMsQ0FBQ3dELFVBQXBCO0FBQ0ksZUFBS0Msc0JBQUwsR0FBOEIsSUFBSXZDLCtDQUFKLENBQW9CLEVBQXBCLEVBQXdCb0MsYUFBeEIsRUFBOUI7QUFDQSxlQUFLdkMsT0FBTCxHQUFlLElBQWY7QUFDQTs7QUFDSixhQUFLZixjQUFjLENBQUNPLFVBQXBCO0FBQ0E7QUFDSTtBQUNBLGVBQUs4QyxnQkFBTCxHQUF3QixJQUFJbkMsOENBQUosQ0FBbUJBLDBDQUFuQixFQUErQm9DLGFBQS9CLEVBQXhCO0FBQ0EsZUFBS3ZDLE9BQUwsR0FBZSxJQUFmO0FBQ0E7QUF4RVI7QUEwRUg7QUFDSjs7Ozt5QkFNSTJDLGMsRUFBK0U7QUFBQSxVQUF2REMsaUJBQXVELHVFQUEzQixDQUEyQjtBQUFBLFVBQXhCQyxRQUF3Qix1RUFBTCxHQUFLO0FBQ2hGLFVBQU1DLFlBQVksR0FBR0YsaUJBQWlCLEdBQUcsQ0FBcEIsa0JBQWdDQSxpQkFBaEMsZ0JBQThELEVBQW5GO0FBQ0EsVUFBTUcsWUFBWSxHQUFHLG9CQUFvQkYsUUFBekM7QUFDQWpELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFzQjhDLGNBQXRCLEdBQXVDRyxZQUF2QyxHQUFzREMsWUFBbEU7QUFFQSxVQUFNQyxjQUFjLEdBQUdMLGNBQWMsR0FBRyxFQUF4Qzs7QUFFQSxVQUFJLEtBQUtMLGdCQUFULEVBQTJCO0FBQ3ZCLFlBQU1XLFFBQVEsR0FBRzlDLDhDQUFBLENBQWU2QyxjQUFmLEVBQStCLE1BQS9CLEVBQXVDRSxNQUF2QyxFQUFqQjs7QUFFQSxZQUFJTixpQkFBaUIsR0FBRyxDQUF4QixFQUEyQjtBQUN2QixlQUFLTixnQkFBTCxDQUFzQmEsb0JBQXRCLENBQTJDRixRQUEzQyxFQUFxREwsaUJBQXJELEVBQXdFekMsd0NBQUEsRUFBeEUsRUFBb0YwQyxRQUFwRjtBQUNILFNBRkQsTUFFTztBQUNILGVBQUtQLGdCQUFMLENBQXNCYyxhQUF0QixDQUFvQ0gsUUFBcEMsRUFBOEM5Qyx3Q0FBQSxFQUE5QyxFQUEwRDBDLFFBQTFEO0FBQ0g7QUFDSixPQVJELE1BUU8sSUFBSSxLQUFLSCxzQkFBVCxFQUFpQyxDQUN2QyxDQURNLE1BQ0E7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLNUMsbUJBQUwsQ0FBeUJ1RCxJQUF6QixDQUE4QixDQUFDTCxjQUEvQjtBQUNIO0FBQ0o7Ozt5QkFFSUwsYyxFQUF3QjtBQUN6Qi9DLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFzQjhDLGNBQWxDOztBQUNBLFVBQUksS0FBS0wsZ0JBQVQsRUFBMkI7QUFDdkIsWUFBTVUsY0FBYyxHQUFHTCxjQUFjLEdBQUcsRUFBeEM7QUFDQSxZQUFNTSxRQUFRLEdBQUc5Qyw4Q0FBQSxDQUFlNkMsY0FBZixFQUErQixNQUEvQixFQUF1Q0UsTUFBdkMsRUFBakI7QUFDQSxhQUFLWixnQkFBTCxDQUFzQmdCLGNBQXRCLENBQXFDTCxRQUFyQztBQUNILE9BSkQsTUFJTyxDQUNIO0FBQ0g7QUFDSjs7OzJDQUVzQk0sTyxFQUFjO0FBQUE7O0FBQ2pDLFdBQUt2RCxPQUFMLEdBQWUsS0FBZixDQURpQyxDQUdqQzs7QUFDQSxVQUFNd0QsY0FBYyxHQUFHLEVBQXZCOztBQUNBLFdBQUssSUFBTUMsT0FBWCxJQUFzQixLQUFLbEQsVUFBM0IsRUFBdUM7QUFDbkMsWUFBTW1ELFFBQVEsR0FBRyxLQUFLbkQsVUFBTCxDQUFnQmtELE9BQWhCLENBQWpCO0FBQ0FELHNCQUFjLENBQUNHLElBQWYsQ0FBb0IsS0FBS3JELE9BQUwsR0FBZW9ELFFBQW5DO0FBQ0gsT0FSZ0MsQ0FVakM7OztBQUNBLFdBQUtFLFNBQUwsR0FBaUIsSUFBSUMsbUVBQUosQ0FBY0wsY0FBZCxDQUFqQixDQVhpQyxDQWFqQzs7QUFDQSxVQUFNTSxNQUFXLEdBQUc7QUFDaEJDLFlBQUksRUFBRSxLQUFLeEQsVUFESztBQUVoQnlELGVBQU8sRUFBRSxLQUFLMUQsT0FGRTtBQUdoQnlCLGNBQU0sRUFBRXdCLE9BQU8sQ0FBQ3hCLE1BSEE7QUFHUTtBQUN4QmtDLGVBQU8sRUFBRSxHQUpPO0FBSUY7QUFDZEMsYUFBSyxFQUFFLGFBTFM7QUFLTTtBQUN0QkMsY0FBTSxFQUFFLGtCQUFNO0FBQ1YsZUFBSSxDQUFDbkUsT0FBTCxHQUFlLElBQWY7QUFDSDtBQVJlLE9BQXBCO0FBVUEsV0FBS3NDLGdCQUFMLEdBQXdCLElBQUluQyw0Q0FBSixDQUFpQjJELE1BQWpCLEVBQXlCdkIsYUFBekIsRUFBeEI7QUFDSDs7OzhCQUVTO0FBQ04sV0FBS3FCLFNBQUwsR0FBaUIsSUFBakI7O0FBQ0EsVUFBSSxLQUFLdEIsZ0JBQVQsRUFBMkI7QUFDdkIsYUFBS0EsZ0JBQUwsQ0FBc0I4QixPQUF0QjtBQUNBLGFBQUs5QixnQkFBTCxHQUF3QixJQUF4QjtBQUNIOztBQUNELFVBQUksS0FBS3hDLG1CQUFULEVBQThCO0FBQzFCLGFBQUtBLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0g7QUFDSjs7O3dCQTlFMEI7QUFDdkIsYUFBTyxLQUFLRSxPQUFaO0FBQ0g7Ozs7S0ErRUw7OztBQUVBO0FBRWVQLHlFQUFmIiwiZmlsZSI6Ii4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNdXNpY2FsIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9NdXNpY2FsXCI7XG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9QcmVsb2FkZXJcIjtcbmltcG9ydCBUb25lSW5mbyBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvVG9uZUluZm9cIjtcbmltcG9ydCAqIGFzIFRvbmUgZnJvbSBcInRvbmVcIjtcblxuLy8gI1RPRE86IENhbiB3ZSByZWltcGxlbWVudCB0aGUgTXVzaWNhbC5qcyBzb3VuZCB3aXRoIFRvbmUuanM/XG4vLyBTZWUgaHR0cHM6Ly90b25lanMuZ2l0aHViLmlvL2RvY3MvMTQuNy43Ny9Pc2NpbGxhdG9yLmh0bWxcblxuLy8gQSBUeXBlc2NyaXB0IGVudW0gaXMganVzdCBhIHR3byB3YXkgbWFwcGluZyBiZXR3ZWVuIGluZGV4IGFuZCB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLlxuZW51bSBJbnN0cnVtZW50VHlwZSB7XG4gICAgU3ludGhCYXNpYyA9IDAsXG4gICAgU3ludGhGTSxcbiAgICBTeW50aEFNLFxuICAgIFN5bnRoTXVzaWNhbEpTLCAvLyBNdXNpY2FsLmpzIGJ5IFBlbmNpbENvZGVcbiAgICBTYW1wbGVkXzEsXG4gICAgU2FtcGxlZF8yLFxuICAgIFN5bnRoUGx1Y2ssXG4gICAgQ09VTlQsIC8vIE9sZCBzY2hvb2whIDotXFxcbn1cblxuY29uc3QgdmFsaWRhdGVJbnN0cnVtZW50VHlwZSA9IChpbnB1dFZhbHVlOiBhbnkpOiBJbnN0cnVtZW50VHlwZSA9PiB7XG4gICAgY29uc3QgaW5zdHJ1bWVudFR5cGVOdW1iZXIgPSBwYXJzZUludChpbnB1dFZhbHVlKTtcbiAgICBpZiAoIWlzTmFOKGluc3RydW1lbnRUeXBlTnVtYmVyKSAmJiBpbnN0cnVtZW50VHlwZU51bWJlciA+PSAwICYmIGluc3RydW1lbnRUeXBlTnVtYmVyIDwgSW5zdHJ1bWVudFR5cGUuQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGluc3RydW1lbnRUeXBlTnVtYmVyIGFzIEluc3RydW1lbnRUeXBlOyAvLyBpbnB1dFZhbHVlIHdhcyBWQUxJRCFcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gSW5zdHJ1bWVudFR5cGUuU3ludGhCYXNpYzsgLy8gaW5wdXRWYWx1ZSB3YXMgTk9UIFZBTElELCBzbyB3ZSByZXR1cm4gdGhlIGRlZmF1bHQgSW5zdHJ1bWVudFR5cGUuXG4gICAgfVxufTtcblxuY2xhc3MgSW5zdHJ1bWVudCB7XG4gICAgdHlwZTogSW5zdHJ1bWVudFR5cGUgPSBJbnN0cnVtZW50VHlwZS5TeW50aEJhc2ljO1xuXG4gICAgdG9uZUpTSW5zdHJ1bWVudDogVG9uZS5Qb2x5U3ludGggfCBUb25lLlNhbXBsZXIgPSBudWxsO1xuICAgIHRvbmVKU19QbHVja0luc3RydW1lbnQ6IFRvbmUuUGx1Y2tTeW50aCA9IG51bGw7XG4gICAgbXVzaWNhbEpTSW5zdHJ1bWVudDogTXVzaWNhbC5JbnN0cnVtZW50ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIHNldHRpbmcgdXAgVG9uZS5TYW1wbGVyXG4gICAgcHJpdmF0ZSBwcmVsb2FkZXI6IFByZWxvYWRlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzYW1wbGVzTWFwOiBhbnk7XG4gICAgcHJpdmF0ZSBiYXNlVVJMOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgLy8gT25seSBjYWxsIHRoaXMgZnJvbSBhIHVzZXIgZ2VzdHVyZSwgc28gd2UgY2FuIHN0YXJ0IFdlYkF1ZGlvIVxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEluc3RydW1lbnRUeXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEluc3RydW1lbnRUeXBlLlN5bnRoTXVzaWNhbEpTKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIGEgTXVzaWNhbCBKUyBJbnN0cnVtZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNJbnN0cnVtZW50ID0gbmV3IE11c2ljYWwuSW5zdHJ1bWVudChcInBpYW5vXCIpO1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgYSBUb25lIEpTIEluc3RydW1lbnRcIik7XG4gICAgICAgICAgICBpZiAoIVRvbmVJbmZvLmlzUnVubmluZykge1xuICAgICAgICAgICAgICAgIFRvbmUuc3RhcnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb25lIGlzIFJlYWR5IVwiKTtcbiAgICAgICAgICAgICAgICAgICAgVG9uZUluZm8uaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzE6XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0ZXJlb1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VVUkwgPSBcIi9zL20vZ3JhbmQvXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlc01hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEMxOiBcIjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMjogXCIxNi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRDM6IFwiMzAubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBFMzogXCIzMi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEczOiBcIjM1Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQTM6IFwiMzcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBCMzogXCIzOS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM0OiBcIjQwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRDQ6IFwiNDIubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBFNDogXCI0NC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEY0OiBcIjQ1Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzQ6IFwiNDcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBBNDogXCI0OS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM1OiBcIjUyLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRjU6IFwiNTcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBBNTogXCI2MS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRjY6IFwiNjkubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCh7IGF0dGFjazogMC4wMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc1JlYWR5IHdpbGwgYmUgdHJ1ZSBhZnRlciBhbGwgdGhlIG1wMyBmaWxlcyBsb2FkLlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlNhbXBsZWRfMjpcbiAgICAgICAgICAgICAgICAgICAgLy8gTW9ub1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VVUkwgPSBcIi9zL20vYnJpZ2h0L1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbXBsZXNNYXAgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDMTogXCI0Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzE6IFwiMTEubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDMjogXCIxNi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEcyOiBcIjIzLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzM6IFwiMjgubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHMzogXCIzNS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM0OiBcIjQwLm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzQ6IFwiNDcubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDNTogXCI1Mi5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEc1OiBcIjU5Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgQzY6IFwiNjQubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBHNjogXCI3MS5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEM3OiBcIjc2Lm1wM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRzc6IFwiODMubXAzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDODogXCI4OC5tcDNcIixcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFNhbXBsZXJJbnN0cnVtZW50KHsgYXR0YWNrOiAwLjA1IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aEZNOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5GTVN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU3ludGhBTTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50ID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuQU1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlN5bnRoUGx1Y2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTX1BsdWNrSW5zdHJ1bWVudCA9IG5ldyBUb25lLlBsdWNrU3ludGgoe30pLnRvRGVzdGluYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBJbnN0cnVtZW50VHlwZS5TeW50aEJhc2ljOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vIEJhc2ljXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudCA9IG5ldyBUb25lLlBvbHlTeW50aChUb25lLlN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0luaXRpYWxpemVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1JlYWR5O1xuICAgIH1cblxuICAgIHBsYXkocGlhbm9LZXlOdW1iZXI6IG51bWJlciwgZHVyYXRpb25JblNlY29uZHM6IG51bWJlciA9IDAsIHZlbG9jaXR5OiBudW1iZXIgPSAxLjApIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb25JbmZvID0gZHVyYXRpb25JblNlY29uZHMgPiAwID8gYCBmb3IgJHtkdXJhdGlvbkluU2Vjb25kc30gc2Vjb25kc2AgOiBcIlwiO1xuICAgICAgICBjb25zdCB2ZWxvY2l0eUluZm8gPSBcIiBhdCB2ZWxvY2l0eSA9IFwiICsgdmVsb2NpdHk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogUExBWSBcIiArIHBpYW5vS2V5TnVtYmVyICsgZHVyYXRpb25JbmZvICsgdmVsb2NpdHlJbmZvKTtcblxuICAgICAgICBjb25zdCBtaWRpTm90ZU51bWJlciA9IHBpYW5vS2V5TnVtYmVyICsgMjA7XG5cbiAgICAgICAgaWYgKHRoaXMudG9uZUpTSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShtaWRpTm90ZU51bWJlciwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuXG4gICAgICAgICAgICBpZiAoZHVyYXRpb25JblNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50LnRyaWdnZXJBdHRhY2tSZWxlYXNlKG5vdGVOYW1lLCBkdXJhdGlvbkluU2Vjb25kcywgVG9uZS5ub3coKSwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQudHJpZ2dlckF0dGFjayhub3RlTmFtZSwgVG9uZS5ub3coKSwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG9uZUpTX1BsdWNrSW5zdHJ1bWVudCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTXVzaWNhbC5qc1xuICAgICAgICAgICAgLy8gdG9uZSguLi4pIHBhcmFtZXRlciBpcyBzcGVjaWZpZWRcbiAgICAgICAgICAgIC8vIGFzIGEgcG9zaXRpdmUgaW50ZWdlciBpbiBIelxuICAgICAgICAgICAgLy8gICBPUlxuICAgICAgICAgICAgLy8gYXMgYSBuZWdhdGl2ZSBpbnRlZ2VyIGluIE1JREkgbm90ZSBudW1iZXJzXG4gICAgICAgICAgICAvLyAgIE1JREkgbnVtYmVyIDYwID09IE1pZGRsZSBDID09IHBpYW5vS2V5TnVtYmVyIDQwXG4gICAgICAgICAgICB0aGlzLm11c2ljYWxKU0luc3RydW1lbnQudG9uZSgtbWlkaU5vdGVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcChwaWFub0tleU51bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5zdHJ1bWVudDogU1RPUCBcIiArIHBpYW5vS2V5TnVtYmVyKTtcbiAgICAgICAgaWYgKHRoaXMudG9uZUpTSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgY29uc3QgbWlkaU5vdGVOdW1iZXIgPSBwaWFub0tleU51bWJlciArIDIwO1xuICAgICAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShtaWRpTm90ZU51bWJlciwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50LnRyaWdnZXJSZWxlYXNlKG5vdGVOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanMgZG9lcyBub3QgbmVlZCBTVE9QLCBzaW5jZSBlYWNoIHRvbmUgaGFzIHRoZSBzYW1lIGxlbmd0aC5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwU2FtcGxlckluc3RydW1lbnQob3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEdldCBhYnNvbHV0ZSBVUkxzIGZvciBtcDMgc2FtcGxlIGZpbGVzIHRvIHByZWxvYWQuXG4gICAgICAgIGNvbnN0IGZpbGVzVG9QcmVsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5TmFtZSBpbiB0aGlzLnNhbXBsZXNNYXApIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5zYW1wbGVzTWFwW2tleU5hbWVdO1xuICAgICAgICAgICAgZmlsZXNUb1ByZWxvYWQucHVzaCh0aGlzLmJhc2VVUkwgKyBmaWxlTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVsb2FkIHRoZSBmaWxlcyBub3cuXG4gICAgICAgIHRoaXMucHJlbG9hZGVyID0gbmV3IFByZWxvYWRlcihmaWxlc1RvUHJlbG9hZCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgVG9uZS5TYW1wbGVyIGluc3RydW1lbnRcbiAgICAgICAgY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgICAgICAgICB1cmxzOiB0aGlzLnNhbXBsZXNNYXAsXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLmJhc2VVUkwsXG4gICAgICAgICAgICBhdHRhY2s6IG9wdGlvbnMuYXR0YWNrLCAvLyBkZXRlcm1pbmVzIGhvdyBxdWlja2x5IHRoZSBub3RlIGNvbWVzIGluICh0aGUgYXR0YWNrIHBhcnQgb2YgdGhlIEFEU1IgZW52ZWxvcGUpXG4gICAgICAgICAgICByZWxlYXNlOiAwLjgsIC8vIGRldGVybWluZXMgaG93IHF1aWNrbHkgdGhlIG5vdGUgZmFsbHMgb2ZmICh0aGUgcmVsZWFzZSBwYXJ0IG9mIHRoZSBBRFNSIGVudmVsb3BlKVxuICAgICAgICAgICAgY3VydmU6IFwiZXhwb25lbnRpYWxcIiwgLy8gZXhwb25lbnRpYWwgfCBsaW5lYXJcbiAgICAgICAgICAgIG9ubG9hZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvbmVKU0luc3RydW1lbnQgPSBuZXcgVG9uZS5TYW1wbGVyKGNvbmZpZykudG9EZXN0aW5hdGlvbigpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMucHJlbG9hZGVyID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMudG9uZUpTSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgdGhpcy50b25lSlNJbnN0cnVtZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMudG9uZUpTSW5zdHJ1bWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVzaWNhbEpTSW5zdHJ1bWVudCkge1xuICAgICAgICAgICAgdGhpcy5tdXNpY2FsSlNJbnN0cnVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHsgSW5zdHJ1bWVudFR5cGUsIHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUgfTtcblxuZXhwb3J0IGRlZmF1bHQgSW5zdHJ1bWVudDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})