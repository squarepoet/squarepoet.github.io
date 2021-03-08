webpackHotUpdate_N_E("pages/piano/v2",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: PianoType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PianoType\", function() { return InstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"Basic\"] = 0] = \"Basic\";\n  InstrumentType[InstrumentType[\"FM\"] = 1] = \"FM\";\n  InstrumentType[InstrumentType[\"AM\"] = 2] = \"AM\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 3] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 4] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"Electric_1\"] = 5] = \"Electric_1\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar AudioSDKType;\n\n(function (AudioSDKType) {\n  AudioSDKType[AudioSDKType[\"Tone\"] = 0] = \"Tone\";\n  AudioSDKType[AudioSDKType[\"Musical\"] = 1] = \"Musical\";\n})(AudioSDKType || (AudioSDKType = {}));\n\nvar INSTRUMENT_TYPE = InstrumentType.Electric_1;\n\nvar Instrument = /*#__PURE__*/function () {\n  // Tone.Instrument or Musical.Instrument\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can call this.initWebAudio()!\n  function Instrument() {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"sdk\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.Basic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"instrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = INSTRUMENT_TYPE;\n    this.initWebAudio();\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"initWebAudio\",\n    value: function initWebAudio() {\n      if (!this.instrument) {\n        if (this.type === InstrumentType.Electric_1) {\n          this.sdk = AudioSDKType.Musical;\n          console.log(\"Start Musical.js\");\n          this.instrument = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n          this.isReady = true;\n        } else {\n          this.sdk = AudioSDKType.Tone;\n          console.log(\"Start Tone.js\");\n          tone__WEBPACK_IMPORTED_MODULE_5__[\"start\"]().then(function () {\n            console.log(\"Tone is Ready!\");\n          });\n\n          switch (this.type) {\n            case InstrumentType.Sampled_1:\n              this.setupPreloaderAndSamplesMap_1(); // this.isReady will be true after all the mp3 files load.\n\n              break;\n\n            case InstrumentType.Sampled_2:\n              this.setupPreloaderAndSamplesMap_2(); // this.isReady will be true after all the mp3 files load.\n\n              break;\n\n            case InstrumentType.FM:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"FMSynth\"]).toDestination();\n              this.isReady = true;\n              break;\n\n            case InstrumentType.AM:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"AMSynth\"]).toDestination();\n              this.isReady = true;\n              break;\n\n            default:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"Synth\"]).toDestination();\n              this.isReady = true;\n              break;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n\n      if (this.sdk === AudioSDKType.Tone) {\n        // Tone.js\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_5__[\"Frequency\"](pianoKeyNumber + 20, \"midi\").toNote();\n        console.log(\"Play \" + pianoKeyNumber + \" <=> \" + noteName);\n\n        if (durationInSeconds <= 0) {\n          this.instrument.triggerAttack(noteName, 0, velocity);\n        } else {\n          // this.instrument.triggerAttackRelease(noteName, \"4n\");\n          this.instrument.triggerAttackRelease(noteName, durationInSeconds); // this.instrument.triggerAttackRelease(noteName, durationInSeconds, 0 /* time from now */, velocity);\n        }\n      } else {\n        // Musical.js\n        // numerically (in Hz), or with midi numbers (as negative integers).\n        this.instrument.tone(-(pianoKeyNumber + 20)); // Musical.js accepts negative MIDI numbers 60 == Middle C (pianoKeyNumber === 40)\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      if (this.sdk === AudioSDKType.Tone) {\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_5__[\"Frequency\"](pianoKeyNumber + 20, \"midi\").toNote();\n        console.log(\"TRIGGER RELEASE \" + pianoKeyNumber + \" / \" + noteName);\n        this.instrument.triggerRelease(noteName);\n      } else {\n        // Musical.js\n        console.log(\"Musical.js does not support NoteOff\");\n      }\n    }\n  }, {\n    key: \"stopAllNotes\",\n    value: function stopAllNotes() {\n      console.log(this.type);\n\n      if (this.sdk === AudioSDKType.Tone) {\n        if (this.type === InstrumentType.Sampled_1 || this.type === InstrumentType.Sampled_2) {\n          console.log(\"stopAllNotes!\");\n          this.instrument.releaseAll(tone__WEBPACK_IMPORTED_MODULE_5__[\"now\"]());\n        } else {\n          console.log(\"NOT IMPLEMENTED FOR SYNTHS: TRIGGER RELEASE ALL\");\n        }\n      } else {}\n    } // Sampled_1: Punchy Attack\n\n  }, {\n    key: \"setupPreloaderAndSamplesMap_1\",\n    value: function setupPreloaderAndSamplesMap_1() {\n      this.baseURL = \"/s/m/grand/\";\n      this.samplesMap = {\n        C1: \"4.mp3\",\n        C2: \"16.mp3\",\n        C3: \"28.mp3\",\n        D3: \"30.mp3\",\n        E3: \"32.mp3\",\n        G3: \"35.mp3\",\n        A3: \"37.mp3\",\n        B3: \"39.mp3\",\n        C4: \"40.mp3\",\n        D4: \"42.mp3\",\n        E4: \"44.mp3\",\n        F4: \"45.mp3\",\n        G4: \"47.mp3\",\n        A4: \"49.mp3\",\n        C5: \"52.mp3\",\n        F5: \"57.mp3\",\n        A5: \"61.mp3\",\n        C6: \"64.mp3\",\n        F6: \"69.mp3\",\n        C7: \"76.mp3\",\n        G7: \"83.mp3\",\n        C8: \"88.mp3\"\n      };\n      this.setupSamplerInstrument();\n    } // Sampled_2: Softer/Smoother\n\n  }, {\n    key: \"setupPreloaderAndSamplesMap_2\",\n    value: function setupPreloaderAndSamplesMap_2() {\n      this.baseURL = \"/s/m/bright/\";\n      this.samplesMap = {\n        C1: \"4.mp3\",\n        G1: \"11.mp3\",\n        C2: \"16.mp3\",\n        G2: \"23.mp3\",\n        C3: \"28.mp3\",\n        G3: \"35.mp3\",\n        C4: \"40.mp3\",\n        G4: \"47.mp3\",\n        C5: \"52.mp3\",\n        G5: \"59.mp3\",\n        C6: \"64.mp3\",\n        G6: \"71.mp3\",\n        C7: \"76.mp3\",\n        G7: \"83.mp3\",\n        C8: \"88.mp3\"\n      };\n      this.setupSamplerInstrument();\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument() {\n      var _this = this;\n\n      // Get absolute URLs for mp3 sample files to preload.\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        console.log(this.baseURL + fileName);\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      if (!this.preloader) {\n        this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload);\n      } // Create a Tone.Sampler instrument\n\n\n      var config = {\n        release: 1,\n        baseUrl: this.baseURL,\n        onload: function onload(buffers) {\n          // Files successfully preloaded.\n          _this.isReady = true;\n        }\n      };\n      this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"Sampler\"](this.samplesMap, config).toDestination();\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.instrument !== null && this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwiQXVkaW9TREtUeXBlIiwiSU5TVFJVTUVOVF9UWVBFIiwiRWxlY3RyaWNfMSIsIkluc3RydW1lbnQiLCJCYXNpYyIsInR5cGUiLCJpbml0V2ViQXVkaW8iLCJpbnN0cnVtZW50Iiwic2RrIiwiTXVzaWNhbCIsImNvbnNvbGUiLCJsb2ciLCJpc1JlYWR5IiwiVG9uZSIsInRoZW4iLCJTYW1wbGVkXzEiLCJzZXR1cFByZWxvYWRlckFuZFNhbXBsZXNNYXBfMSIsIlNhbXBsZWRfMiIsInNldHVwUHJlbG9hZGVyQW5kU2FtcGxlc01hcF8yIiwiRk0iLCJ0b0Rlc3RpbmF0aW9uIiwiQU0iLCJwaWFub0tleU51bWJlciIsImR1cmF0aW9uSW5TZWNvbmRzIiwidmVsb2NpdHkiLCJub3RlTmFtZSIsInRvTm90ZSIsInRyaWdnZXJBdHRhY2siLCJ0cmlnZ2VyQXR0YWNrUmVsZWFzZSIsInRvbmUiLCJ0cmlnZ2VyUmVsZWFzZSIsInJlbGVhc2VBbGwiLCJiYXNlVVJMIiwic2FtcGxlc01hcCIsIkMxIiwiQzIiLCJDMyIsIkQzIiwiRTMiLCJHMyIsIkEzIiwiQjMiLCJDNCIsIkQ0IiwiRTQiLCJGNCIsIkc0IiwiQTQiLCJDNSIsIkY1IiwiQTUiLCJDNiIsIkY2IiwiQzciLCJHNyIsIkM4Iiwic2V0dXBTYW1wbGVySW5zdHJ1bWVudCIsIkcxIiwiRzIiLCJHNSIsIkc2IiwiZmlsZXNUb1ByZWxvYWQiLCJrZXlOYW1lIiwiZmlsZU5hbWUiLCJwdXNoIiwicHJlbG9hZGVyIiwiUHJlbG9hZGVyIiwiY29uZmlnIiwicmVsZWFzZSIsImJhc2VVcmwiLCJvbmxvYWQiLCJidWZmZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtJQUVLQSxjOztXQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0Is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LE9BQWxCO0FBaUJBLFdBQUtDLHNCQUFMO0FBQ0g7Ozs2Q0FFd0I7QUFBQTs7QUFDckI7QUFDQSxVQUFNSyxjQUFjLEdBQUcsRUFBdkI7O0FBQ0EsV0FBSyxJQUFNQyxPQUFYLElBQXNCLEtBQUs3QixVQUEzQixFQUF1QztBQUNuQyxZQUFNOEIsUUFBUSxHQUFHLEtBQUs5QixVQUFMLENBQWdCNkIsT0FBaEIsQ0FBakI7QUFDQXBELGVBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtxQixPQUFMLEdBQWUrQixRQUEzQjtBQUNBRixzQkFBYyxDQUFDRyxJQUFmLENBQW9CLEtBQUtoQyxPQUFMLEdBQWUrQixRQUFuQztBQUNILE9BUG9CLENBUXJCOzs7QUFDQSxVQUFJLENBQUMsS0FBS0UsU0FBVixFQUFxQjtBQUNqQixhQUFLQSxTQUFMLEdBQWlCLElBQUlDLG1FQUFKLENBQWNMLGNBQWQsQ0FBakI7QUFDSCxPQVhvQixDQVlyQjs7O0FBQ0EsVUFBTU0sTUFBVyxHQUFHO0FBQ2hCQyxlQUFPLEVBQUUsQ0FETztBQUVoQkMsZUFBTyxFQUFFLEtBQUtyQyxPQUZFO0FBR2hCc0MsY0FBTSxFQUFFLGdCQUFDQyxPQUFELEVBQWtCO0FBQ3RCO0FBQ0EsZUFBSSxDQUFDM0QsT0FBTCxHQUFlLElBQWY7QUFDSDtBQU5lLE9BQXBCO0FBUUEsV0FBS0wsVUFBTCxHQUFrQixJQUFJTSw0Q0FBSixDQUFpQixLQUFLb0IsVUFBdEIsRUFBa0NrQyxNQUFsQyxFQUEwQy9DLGFBQTFDLEVBQWxCO0FBQ0g7Ozt3QkEzSDRCO0FBQ3pCLGFBQU8sS0FBS2IsVUFBTCxLQUFvQixJQUFwQixJQUE0QixLQUFLSyxPQUF4QztBQUNIOzs7O0tBNEhMOzs7QUFFQTtBQUVlVCx5RUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL3NvdW5kL0luc3RydW1lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVzaWNhbCBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvTXVzaWNhbFwiO1xuaW1wb3J0IFByZWxvYWRlciBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvUHJlbG9hZGVyXCI7XG5pbXBvcnQgKiBhcyBUb25lIGZyb20gXCJ0b25lXCI7XG5cbmVudW0gSW5zdHJ1bWVudFR5cGUge1xuICAgIEJhc2ljLFxuICAgIEZNLFxuICAgIEFNLFxuICAgIFNhbXBsZWRfMSxcbiAgICBTYW1wbGVkXzIsXG4gICAgRWxlY3RyaWNfMSwgLy8gTXVzaWNhbC5qc1xufVxuXG5lbnVtIEF1ZGlvU0RLVHlwZSB7XG4gICAgVG9uZSxcbiAgICBNdXNpY2FsLFxufVxuXG5jb25zdCBJTlNUUlVNRU5UX1RZUEU6IEluc3RydW1lbnRUeXBlID0gSW5zdHJ1bWVudFR5cGUuRWxlY3RyaWNfMTtcblxuY2xhc3MgSW5zdHJ1bWVudCB7XG4gICAgc2RrOiBBdWRpb1NES1R5cGU7XG4gICAgdHlwZTogSW5zdHJ1bWVudFR5cGUgPSBJbnN0cnVtZW50VHlwZS5CYXNpYztcbiAgICBpbnN0cnVtZW50OiBUb25lLlBvbHlTeW50aCB8IFRvbmUuU3ludGggfCBUb25lLkZNU3ludGggfCBUb25lLkFNU3ludGggfCBUb25lLlNhbXBsZXIgfCBNdXNpY2FsLkluc3RydW1lbnQgPSBudWxsOyAvLyBUb25lLkluc3RydW1lbnQgb3IgTXVzaWNhbC5JbnN0cnVtZW50XG4gICAgcHJpdmF0ZSBpc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBGb3Igc2V0dGluZyB1cCBUb25lLlNhbXBsZXJcbiAgICBwcml2YXRlIHByZWxvYWRlcjogUHJlbG9hZGVyID0gbnVsbDtcbiAgICBwcml2YXRlIHNhbXBsZXNNYXA6IGFueTtcbiAgICBwcml2YXRlIGJhc2VVUkw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBPbmx5IGNhbGwgdGhpcyBmcm9tIGEgdXNlciBnZXN0dXJlLCBzbyB3ZSBjYW4gY2FsbCB0aGlzLmluaXRXZWJBdWRpbygpIVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBJTlNUUlVNRU5UX1RZUEU7XG4gICAgICAgIHRoaXMuaW5pdFdlYkF1ZGlvKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0V2ViQXVkaW8oKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnN0cnVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBJbnN0cnVtZW50VHlwZS5FbGVjdHJpY18xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGsgPSBBdWRpb1NES1R5cGUuTXVzaWNhbDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IE11c2ljYWwuanNcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVtZW50ID0gbmV3IE11c2ljYWwuSW5zdHJ1bWVudChcInBpYW5vXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrID0gQXVkaW9TREtUeXBlLlRvbmU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydCBUb25lLmpzXCIpO1xuICAgICAgICAgICAgICAgIFRvbmUuc3RhcnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUb25lIGlzIFJlYWR5IVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlNhbXBsZWRfMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBQcmVsb2FkZXJBbmRTYW1wbGVzTWFwXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLlNhbXBsZWRfMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBQcmVsb2FkZXJBbmRTYW1wbGVzTWFwXzIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaXNSZWFkeSB3aWxsIGJlIHRydWUgYWZ0ZXIgYWxsIHRoZSBtcDMgZmlsZXMgbG9hZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLkZNOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVtZW50ID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuRk1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEluc3RydW1lbnRUeXBlLkFNOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVtZW50ID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuQU1TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVtZW50ID0gbmV3IFRvbmUuUG9seVN5bnRoKFRvbmUuU3ludGgpLnRvRGVzdGluYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaXNJbml0aWFsaXplZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1bWVudCAhPT0gbnVsbCAmJiB0aGlzLmlzUmVhZHk7XG4gICAgfVxuXG4gICAgcGxheShwaWFub0tleU51bWJlcjogbnVtYmVyLCBkdXJhdGlvbkluU2Vjb25kczogbnVtYmVyID0gMCwgdmVsb2NpdHk6IG51bWJlciA9IDEuMCkge1xuICAgICAgICBpZiAodGhpcy5zZGsgPT09IEF1ZGlvU0RLVHlwZS5Ub25lKSB7XG4gICAgICAgICAgICAvLyBUb25lLmpzXG4gICAgICAgICAgICBjb25zdCBub3RlTmFtZSA9IFRvbmUuRnJlcXVlbmN5KHBpYW5vS2V5TnVtYmVyICsgMjAsIFwibWlkaVwiKS50b05vdGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheSBcIiArIHBpYW5vS2V5TnVtYmVyICsgXCIgPD0+IFwiICsgbm90ZU5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZHVyYXRpb25JblNlY29uZHMgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdHJ1bWVudC50cmlnZ2VyQXR0YWNrKG5vdGVOYW1lLCAwLCB2ZWxvY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5zdHJ1bWVudC50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgXCI0blwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RydW1lbnQudHJpZ2dlckF0dGFja1JlbGVhc2Uobm90ZU5hbWUsIGR1cmF0aW9uSW5TZWNvbmRzKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmluc3RydW1lbnQudHJpZ2dlckF0dGFja1JlbGVhc2Uobm90ZU5hbWUsIGR1cmF0aW9uSW5TZWNvbmRzLCAwIC8qIHRpbWUgZnJvbSBub3cgKi8sIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanNcbiAgICAgICAgICAgIC8vIG51bWVyaWNhbGx5IChpbiBIeiksIG9yIHdpdGggbWlkaSBudW1iZXJzIChhcyBuZWdhdGl2ZSBpbnRlZ2VycykuXG4gICAgICAgICAgICB0aGlzLmluc3RydW1lbnQudG9uZSgtKHBpYW5vS2V5TnVtYmVyICsgMjApKTsgLy8gTXVzaWNhbC5qcyBhY2NlcHRzIG5lZ2F0aXZlIE1JREkgbnVtYmVycyA2MCA9PSBNaWRkbGUgQyAocGlhbm9LZXlOdW1iZXIgPT09IDQwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcChwaWFub0tleU51bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNkayA9PT0gQXVkaW9TREtUeXBlLlRvbmUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGVOYW1lID0gVG9uZS5GcmVxdWVuY3kocGlhbm9LZXlOdW1iZXIgKyAyMCwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUUklHR0VSIFJFTEVBU0UgXCIgKyBwaWFub0tleU51bWJlciArIFwiIC8gXCIgKyBub3RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmluc3RydW1lbnQudHJpZ2dlclJlbGVhc2Uobm90ZU5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTXVzaWNhbC5qc1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNdXNpY2FsLmpzIGRvZXMgbm90IHN1cHBvcnQgTm90ZU9mZlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BBbGxOb3RlcygpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlKTtcbiAgICAgICAgaWYgKHRoaXMuc2RrID09PSBBdWRpb1NES1R5cGUuVG9uZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8xIHx8IHRoaXMudHlwZSA9PT0gSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdG9wQWxsTm90ZXMhXCIpO1xuICAgICAgICAgICAgICAgICh0aGlzLmluc3RydW1lbnQgYXMgVG9uZS5TYW1wbGVyKS5yZWxlYXNlQWxsKFRvbmUubm93KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PVCBJTVBMRU1FTlRFRCBGT1IgU1lOVEhTOiBUUklHR0VSIFJFTEVBU0UgQUxMXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2FtcGxlZF8xOiBQdW5jaHkgQXR0YWNrXG4gICAgc2V0dXBQcmVsb2FkZXJBbmRTYW1wbGVzTWFwXzEoKSB7XG4gICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiL3MvbS9ncmFuZC9cIjtcbiAgICAgICAgdGhpcy5zYW1wbGVzTWFwID0ge1xuICAgICAgICAgICAgQzE6IFwiNC5tcDNcIixcbiAgICAgICAgICAgIEMyOiBcIjE2Lm1wM1wiLFxuICAgICAgICAgICAgQzM6IFwiMjgubXAzXCIsXG4gICAgICAgICAgICBEMzogXCIzMC5tcDNcIixcbiAgICAgICAgICAgIEUzOiBcIjMyLm1wM1wiLFxuICAgICAgICAgICAgRzM6IFwiMzUubXAzXCIsXG4gICAgICAgICAgICBBMzogXCIzNy5tcDNcIixcbiAgICAgICAgICAgIEIzOiBcIjM5Lm1wM1wiLFxuICAgICAgICAgICAgQzQ6IFwiNDAubXAzXCIsXG4gICAgICAgICAgICBENDogXCI0Mi5tcDNcIixcbiAgICAgICAgICAgIEU0OiBcIjQ0Lm1wM1wiLFxuICAgICAgICAgICAgRjQ6IFwiNDUubXAzXCIsXG4gICAgICAgICAgICBHNDogXCI0Ny5tcDNcIixcbiAgICAgICAgICAgIEE0OiBcIjQ5Lm1wM1wiLFxuICAgICAgICAgICAgQzU6IFwiNTIubXAzXCIsXG4gICAgICAgICAgICBGNTogXCI1Ny5tcDNcIixcbiAgICAgICAgICAgIEE1OiBcIjYxLm1wM1wiLFxuICAgICAgICAgICAgQzY6IFwiNjQubXAzXCIsXG4gICAgICAgICAgICBGNjogXCI2OS5tcDNcIixcbiAgICAgICAgICAgIEM3OiBcIjc2Lm1wM1wiLFxuICAgICAgICAgICAgRzc6IFwiODMubXAzXCIsXG4gICAgICAgICAgICBDODogXCI4OC5tcDNcIixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXR1cFNhbXBsZXJJbnN0cnVtZW50KCk7XG4gICAgfVxuXG4gICAgLy8gU2FtcGxlZF8yOiBTb2Z0ZXIvU21vb3RoZXJcbiAgICBzZXR1cFByZWxvYWRlckFuZFNhbXBsZXNNYXBfMigpIHtcbiAgICAgICAgdGhpcy5iYXNlVVJMID0gXCIvcy9tL2JyaWdodC9cIjtcbiAgICAgICAgdGhpcy5zYW1wbGVzTWFwID0ge1xuICAgICAgICAgICAgQzE6IFwiNC5tcDNcIixcbiAgICAgICAgICAgIEcxOiBcIjExLm1wM1wiLFxuICAgICAgICAgICAgQzI6IFwiMTYubXAzXCIsXG4gICAgICAgICAgICBHMjogXCIyMy5tcDNcIixcbiAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgRzM6IFwiMzUubXAzXCIsXG4gICAgICAgICAgICBDNDogXCI0MC5tcDNcIixcbiAgICAgICAgICAgIEc0OiBcIjQ3Lm1wM1wiLFxuICAgICAgICAgICAgQzU6IFwiNTIubXAzXCIsXG4gICAgICAgICAgICBHNTogXCI1OS5tcDNcIixcbiAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgRzY6IFwiNzEubXAzXCIsXG4gICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCgpO1xuICAgIH1cblxuICAgIHNldHVwU2FtcGxlckluc3RydW1lbnQoKSB7XG4gICAgICAgIC8vIEdldCBhYnNvbHV0ZSBVUkxzIGZvciBtcDMgc2FtcGxlIGZpbGVzIHRvIHByZWxvYWQuXG4gICAgICAgIGNvbnN0IGZpbGVzVG9QcmVsb2FkID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5TmFtZSBpbiB0aGlzLnNhbXBsZXNNYXApIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5zYW1wbGVzTWFwW2tleU5hbWVdO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5iYXNlVVJMICsgZmlsZU5hbWUpO1xuICAgICAgICAgICAgZmlsZXNUb1ByZWxvYWQucHVzaCh0aGlzLmJhc2VVUkwgKyBmaWxlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJlbG9hZCB0aGUgZmlsZXMgbm93LlxuICAgICAgICBpZiAoIXRoaXMucHJlbG9hZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnByZWxvYWRlciA9IG5ldyBQcmVsb2FkZXIoZmlsZXNUb1ByZWxvYWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBhIFRvbmUuU2FtcGxlciBpbnN0cnVtZW50XG4gICAgICAgIGNvbnN0IGNvbmZpZzogYW55ID0ge1xuICAgICAgICAgICAgcmVsZWFzZTogMSxcbiAgICAgICAgICAgIGJhc2VVcmw6IHRoaXMuYmFzZVVSTCxcbiAgICAgICAgICAgIG9ubG9hZDogKGJ1ZmZlcnM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEZpbGVzIHN1Y2Nlc3NmdWxseSBwcmVsb2FkZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5zdHJ1bWVudCA9IG5ldyBUb25lLlNhbXBsZXIodGhpcy5zYW1wbGVzTWFwLCBjb25maWcpLnRvRGVzdGluYXRpb24oKTtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCB7IEluc3RydW1lbnRUeXBlIGFzIFBpYW5vVHlwZSB9O1xuXG5leHBvcnQgZGVmYXVsdCBJbnN0cnVtZW50O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})