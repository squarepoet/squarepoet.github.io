webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/sound/Instrument.ts":
/*!*****************************************!*\
  !*** ./apps/shared/sound/Instrument.ts ***!
  \*****************************************/
/*! exports provided: PianoType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PianoType\", function() { return InstrumentType; });\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/sound/Musical */ \"./apps/shared/sound/Musical.ts\");\n/* harmony import */ var apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Preloader */ \"./apps/shared/sound/Preloader.ts\");\n/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tone */ \"./node_modules/tone/build/esm/index.js\");\n\n\n\n\n\n\nvar InstrumentType;\n\n(function (InstrumentType) {\n  InstrumentType[InstrumentType[\"Basic\"] = 0] = \"Basic\";\n  InstrumentType[InstrumentType[\"FM\"] = 1] = \"FM\";\n  InstrumentType[InstrumentType[\"AM\"] = 2] = \"AM\";\n  InstrumentType[InstrumentType[\"Sampled_1\"] = 3] = \"Sampled_1\";\n  InstrumentType[InstrumentType[\"Sampled_2\"] = 4] = \"Sampled_2\";\n  InstrumentType[InstrumentType[\"Electric_1\"] = 5] = \"Electric_1\";\n})(InstrumentType || (InstrumentType = {}));\n\nvar AudioSDKType;\n\n(function (AudioSDKType) {\n  AudioSDKType[AudioSDKType[\"Tone\"] = 0] = \"Tone\";\n  AudioSDKType[AudioSDKType[\"Musical\"] = 1] = \"Musical\";\n})(AudioSDKType || (AudioSDKType = {}));\n\nvar INSTRUMENT_TYPE = InstrumentType.Electric_1;\n\nvar Instrument = /*#__PURE__*/function () {\n  // Tone.Instrument or Musical.Instrument\n  // For setting up Tone.Sampler\n  // Only call this from a user gesture, so we can call this.initWebAudio()!\n  function Instrument() {\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Instrument);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"sdk\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"type\", InstrumentType.Basic);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"instrument\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"isReady\", false);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"preloader\", null);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"samplesMap\", void 0);\n\n    Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, \"baseURL\", \"\");\n\n    this.type = INSTRUMENT_TYPE;\n    this.initWebAudio();\n  }\n\n  Object(_Users_ronyeh_Code_S_Web_squarepoet_github_io_src_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Instrument, [{\n    key: \"initWebAudio\",\n    value: function initWebAudio() {\n      if (!this.instrument) {\n        if (this.type === InstrumentType.Electric_1) {\n          this.sdk = AudioSDKType.Musical;\n          console.log(\"Start Musical.js\");\n          this.instrument = new apps_shared_sound_Musical__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Instrument(\"piano\");\n          this.isReady = true;\n        } else {\n          this.sdk = AudioSDKType.Tone;\n          console.log(\"Start Tone.js\");\n          tone__WEBPACK_IMPORTED_MODULE_5__[\"start\"]().then(function () {\n            console.log(\"Tone is Ready!\");\n          });\n\n          switch (this.type) {\n            case InstrumentType.Sampled_1:\n              this.setupPreloaderAndSamplesMap_1(); // this.isReady will be true after all the mp3 files load.\n\n              break;\n\n            case InstrumentType.Sampled_2:\n              this.setupPreloaderAndSamplesMap_2(); // this.isReady will be true after all the mp3 files load.\n\n              break;\n\n            case InstrumentType.FM:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"FMSynth\"]).toDestination();\n              this.isReady = true;\n              break;\n\n            case InstrumentType.AM:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"AMSynth\"]).toDestination();\n              this.isReady = true;\n              break;\n\n            default:\n              this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"PolySynth\"](tone__WEBPACK_IMPORTED_MODULE_5__[\"Synth\"]).toDestination();\n              this.isReady = true;\n              break;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"play\",\n    value: function play(pianoKeyNumber) {\n      var durationInSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n      var velocity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;\n\n      if (this.sdk === AudioSDKType.Tone) {\n        // Tone.js\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_5__[\"Frequency\"](pianoKeyNumber + 20, \"midi\").toNote();\n        console.log(\"Play \" + pianoKeyNumber + \" <=> \" + noteName);\n\n        if (durationInSeconds <= 0) {\n          this.instrument.triggerAttack(noteName, 0, velocity);\n        } else {\n          // this.instrument.triggerAttackRelease(noteName, \"4n\");\n          this.instrument.triggerAttackRelease(noteName, durationInSeconds); // this.instrument.triggerAttackRelease(noteName, durationInSeconds, 0 /* time from now */, velocity);\n        }\n      } else {\n        // Musical.js\n        // numerically (in Hz), or with midi numbers (as negative integers).\n        this.instrument.tone(-(pianoKeyNumber + 20)); // Musical.js accepts negative MIDI numbers 60 == Middle C (pianoKeyNumber === 40)\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop(pianoKeyNumber) {\n      if (this.sdk === AudioSDKType.Tone) {\n        var noteName = tone__WEBPACK_IMPORTED_MODULE_5__[\"Frequency\"](pianoKeyNumber + 20, \"midi\").toNote();\n        console.log(\"TRIGGER RELEASE \" + pianoKeyNumber + \" / \" + noteName);\n        this.instrument.triggerRelease(noteName);\n      } else {\n        // Musical.js\n        console.log(\"Musical.js does not support NoteOff\");\n      }\n    }\n  }, {\n    key: \"stopAllNotes\",\n    value: function stopAllNotes() {\n      console.log(this.type);\n\n      if (this.sdk === AudioSDKType.Tone) {\n        if (this.type === InstrumentType.Sampled_1 || this.type === InstrumentType.Sampled_2) {\n          console.log(\"stopAllNotes!\");\n          this.instrument.releaseAll(tone__WEBPACK_IMPORTED_MODULE_5__[\"now\"]());\n        } else {\n          console.log(\"stopAllNotes is NOT IMPLEMENTED FOR SYNTHS.\");\n        }\n      } else {\n        // Musical.js\n        console.log(\"stopAllNotes is NOT IMPLEMENTED FOR MUSICAL.JS\");\n      }\n    } // Sampled_1: Punchy Attack\n\n  }, {\n    key: \"setupPreloaderAndSamplesMap_1\",\n    value: function setupPreloaderAndSamplesMap_1() {\n      this.baseURL = \"/s/m/grand/\";\n      this.samplesMap = {\n        C1: \"4.mp3\",\n        C2: \"16.mp3\",\n        C3: \"28.mp3\",\n        D3: \"30.mp3\",\n        E3: \"32.mp3\",\n        G3: \"35.mp3\",\n        A3: \"37.mp3\",\n        B3: \"39.mp3\",\n        C4: \"40.mp3\",\n        D4: \"42.mp3\",\n        E4: \"44.mp3\",\n        F4: \"45.mp3\",\n        G4: \"47.mp3\",\n        A4: \"49.mp3\",\n        C5: \"52.mp3\",\n        F5: \"57.mp3\",\n        A5: \"61.mp3\",\n        C6: \"64.mp3\",\n        F6: \"69.mp3\",\n        C7: \"76.mp3\",\n        G7: \"83.mp3\",\n        C8: \"88.mp3\"\n      };\n      this.setupSamplerInstrument();\n    } // Sampled_2: Softer/Smoother\n\n  }, {\n    key: \"setupPreloaderAndSamplesMap_2\",\n    value: function setupPreloaderAndSamplesMap_2() {\n      this.baseURL = \"/s/m/bright/\";\n      this.samplesMap = {\n        C1: \"4.mp3\",\n        G1: \"11.mp3\",\n        C2: \"16.mp3\",\n        G2: \"23.mp3\",\n        C3: \"28.mp3\",\n        G3: \"35.mp3\",\n        C4: \"40.mp3\",\n        G4: \"47.mp3\",\n        C5: \"52.mp3\",\n        G5: \"59.mp3\",\n        C6: \"64.mp3\",\n        G6: \"71.mp3\",\n        C7: \"76.mp3\",\n        G7: \"83.mp3\",\n        C8: \"88.mp3\"\n      };\n      this.setupSamplerInstrument();\n    }\n  }, {\n    key: \"setupSamplerInstrument\",\n    value: function setupSamplerInstrument() {\n      var _this = this;\n\n      // Get absolute URLs for mp3 sample files to preload.\n      var filesToPreload = [];\n\n      for (var keyName in this.samplesMap) {\n        var fileName = this.samplesMap[keyName];\n        console.log(this.baseURL + fileName);\n        filesToPreload.push(this.baseURL + fileName);\n      } // Preload the files now.\n\n\n      if (!this.preloader) {\n        this.preloader = new apps_shared_sound_Preloader__WEBPACK_IMPORTED_MODULE_4__[\"default\"](filesToPreload);\n      } // Create a Tone.Sampler instrument\n\n\n      var config = {\n        release: 1,\n        baseUrl: this.baseURL,\n        onload: function onload(buffers) {\n          // Files successfully preloaded.\n          _this.isReady = true;\n        }\n      };\n      this.instrument = new tone__WEBPACK_IMPORTED_MODULE_5__[\"Sampler\"](this.samplesMap, config).toDestination();\n    }\n  }, {\n    key: \"isInitialized\",\n    get: function get() {\n      return this.instrument !== null && this.isReady;\n    }\n  }]);\n\n  return Instrument;\n}(); //////////////////////////////////////////////////////////////////////////////////////////////////\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Instrument);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cz8zOTM5Il0sIm5hbWVzIjpbIkluc3RydW1lbnRUeXBlIiwiQXVkaW9TREtUeXBlIiwiSU5TVFJVTUVOVF9UWVBFIiwiRWxlY3RyaWNfMSIsIkluc3RydW1lbnQiLCJCYXNpYyIsInR5cGUiLCJpbml0V2ViQXVkaW8iLCJpbnN0cnVtZW50Iiwic2RrIiwiTXVzaWNhbCIsImNvbnNvbGUiLCJsb2ciLCJpc1JlYWR5IiwiVG9uZSIsInRoZW4iLCJTYW1wbGVkXzEiLCJzZXR1cFByZWxvYWRlckFuZFNhbXBsZXNNYXBfMSIsIlNhbXBsZWRfMiIsInNldHVwUHJlbG9hZGVyQW5kU2FtcGxlc01hcF8yIiwiRk0iLCJ0b0Rlc3RpbmF0aW9uIiwiQU0iLCJwaWFub0tleU51bWJlciIsImR1cmF0aW9uSW5TZWNvbmRzIiwidmVsb2NpdHkiLCJub3RlTmFtZSIsInRvTm90ZSIsInRyaWdnZXJBdHRhY2siLCJ0cmlnZ2VyQXR0YWNrUmVsZWFzZSIsInRvbmUiLCJ0cmlnZ2VyUmVsZWFzZSIsInJlbGVhc2VBbGwiLCJiYXNlVVJMIiwic2FtcGxlc01hcCIsIkMxIiwiQzIiLCJDMyIsIkQzIiwiRTMiLCJHMyIsIkEzIiwiQjMiLCJDNCIsIkQ0IiwiRTQiLCJGNCIsIkc0IiwiQTQiLCJDNSIsIkY1IiwiQTUiLCJDNiIsIkY2IiwiQzciLCJHNyIsIkM4Iiwic2V0dXBTYW1wbGVySW5zdHJ1bWVudCIsIkcxIiwiRzIiLCJHNSIsIkc2IiwiZmlsZXNUb1ByZWxvYWQiLCJrZXlOYW1lIiwiZmlsZU5hbWUiLCJwdXNoIiwicHJlbG9hZGVyIiwiUHJlbG9hZGVyIiwiY29uZmlnIiwicmVsZWFzZSIsImJhc2VVcmwiLCJvbmxvYWQiLCJidWZmZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtJQUVLQSxjOztXQUFBQSxjO0FBQUFBLGdCLENBQUFBLGM7QUFBQUEsZ0Is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ZEMsVUFBRSxFQUFFLFFBZFU7QUFlZEMsVUFBRSxFQUFFO0FBZlUsT0FBbEI7QUFpQkEsV0FBS0Msc0JBQUw7QUFDSDs7OzZDQUV3QjtBQUFBOztBQUNyQjtBQUNBLFVBQU1LLGNBQWMsR0FBRyxFQUF2Qjs7QUFDQSxXQUFLLElBQU1DLE9BQVgsSUFBc0IsS0FBSzdCLFVBQTNCLEVBQXVDO0FBQ25DLFlBQU04QixRQUFRLEdBQUcsS0FBSzlCLFVBQUwsQ0FBZ0I2QixPQUFoQixDQUFqQjtBQUNBcEQsZUFBTyxDQUFDQyxHQUFSLENBQVksS0FBS3FCLE9BQUwsR0FBZStCLFFBQTNCO0FBQ0FGLHNCQUFjLENBQUNHLElBQWYsQ0FBb0IsS0FBS2hDLE9BQUwsR0FBZStCLFFBQW5DO0FBQ0gsT0FQb0IsQ0FRckI7OztBQUNBLFVBQUksQ0FBQyxLQUFLRSxTQUFWLEVBQXFCO0FBQ2pCLGFBQUtBLFNBQUwsR0FBaUIsSUFBSUMsbUVBQUosQ0FBY0wsY0FBZCxDQUFqQjtBQUNILE9BWG9CLENBWXJCOzs7QUFDQSxVQUFNTSxNQUFXLEdBQUc7QUFDaEJDLGVBQU8sRUFBRSxDQURPO0FBRWhCQyxlQUFPLEVBQUUsS0FBS3JDLE9BRkU7QUFHaEJzQyxjQUFNLEVBQUUsZ0JBQUNDLE9BQUQsRUFBa0I7QUFDdEI7QUFDQSxlQUFJLENBQUMzRCxPQUFMLEdBQWUsSUFBZjtBQUNIO0FBTmUsT0FBcEI7QUFRQSxXQUFLTCxVQUFMLEdBQWtCLElBQUlNLDRDQUFKLENBQWlCLEtBQUtvQixVQUF0QixFQUFrQ2tDLE1BQWxDLEVBQTBDL0MsYUFBMUMsRUFBbEI7QUFDSDs7O3dCQTdINEI7QUFDekIsYUFBTyxLQUFLYixVQUFMLEtBQW9CLElBQXBCLElBQTRCLEtBQUtLLE9BQXhDO0FBQ0g7Ozs7S0E4SEw7OztBQUVBO0FBRWVULHlFQUFmIiwiZmlsZSI6Ii4vYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNdXNpY2FsIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9NdXNpY2FsXCI7XG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9QcmVsb2FkZXJcIjtcbmltcG9ydCAqIGFzIFRvbmUgZnJvbSBcInRvbmVcIjtcblxuZW51bSBJbnN0cnVtZW50VHlwZSB7XG4gICAgQmFzaWMsXG4gICAgRk0sXG4gICAgQU0sXG4gICAgU2FtcGxlZF8xLFxuICAgIFNhbXBsZWRfMixcbiAgICBFbGVjdHJpY18xLCAvLyBNdXNpY2FsLmpzXG59XG5cbmVudW0gQXVkaW9TREtUeXBlIHtcbiAgICBUb25lLFxuICAgIE11c2ljYWwsXG59XG5cbmNvbnN0IElOU1RSVU1FTlRfVFlQRTogSW5zdHJ1bWVudFR5cGUgPSBJbnN0cnVtZW50VHlwZS5FbGVjdHJpY18xO1xuXG5jbGFzcyBJbnN0cnVtZW50IHtcbiAgICBzZGs6IEF1ZGlvU0RLVHlwZTtcbiAgICB0eXBlOiBJbnN0cnVtZW50VHlwZSA9IEluc3RydW1lbnRUeXBlLkJhc2ljO1xuICAgIGluc3RydW1lbnQ6IFRvbmUuUG9seVN5bnRoIHwgVG9uZS5TeW50aCB8IFRvbmUuRk1TeW50aCB8IFRvbmUuQU1TeW50aCB8IFRvbmUuU2FtcGxlciB8IE11c2ljYWwuSW5zdHJ1bWVudCA9IG51bGw7IC8vIFRvbmUuSW5zdHJ1bWVudCBvciBNdXNpY2FsLkluc3RydW1lbnRcbiAgICBwcml2YXRlIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBzZXR0aW5nIHVwIFRvbmUuU2FtcGxlclxuICAgIHByaXZhdGUgcHJlbG9hZGVyOiBQcmVsb2FkZXIgPSBudWxsO1xuICAgIHByaXZhdGUgc2FtcGxlc01hcDogYW55O1xuICAgIHByaXZhdGUgYmFzZVVSTDogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIE9ubHkgY2FsbCB0aGlzIGZyb20gYSB1c2VyIGdlc3R1cmUsIHNvIHdlIGNhbiBjYWxsIHRoaXMuaW5pdFdlYkF1ZGlvKCkhXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IElOU1RSVU1FTlRfVFlQRTtcbiAgICAgICAgdGhpcy5pbml0V2ViQXVkaW8oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRXZWJBdWRpbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RydW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEluc3RydW1lbnRUeXBlLkVsZWN0cmljXzEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNkayA9IEF1ZGlvU0RLVHlwZS5NdXNpY2FsO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgTXVzaWNhbC5qc1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RydW1lbnQgPSBuZXcgTXVzaWNhbC5JbnN0cnVtZW50KFwicGlhbm9cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGsgPSBBdWRpb1NES1R5cGUuVG9uZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0IFRvbmUuanNcIik7XG4gICAgICAgICAgICAgICAgVG9uZS5zdGFydCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvbmUgaXMgUmVhZHkhXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8xOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFByZWxvYWRlckFuZFNhbXBsZXNNYXBfMSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc1JlYWR5IHdpbGwgYmUgdHJ1ZSBhZnRlciBhbGwgdGhlIG1wMyBmaWxlcyBsb2FkLlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuU2FtcGxlZF8yOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR1cFByZWxvYWRlckFuZFNhbXBsZXNNYXBfMigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pc1JlYWR5IHdpbGwgYmUgdHJ1ZSBhZnRlciBhbGwgdGhlIG1wMyBmaWxlcyBsb2FkLlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuRk06XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RydW1lbnQgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5GTVN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSW5zdHJ1bWVudFR5cGUuQU06XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RydW1lbnQgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5BTVN5bnRoKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RydW1lbnQgPSBuZXcgVG9uZS5Qb2x5U3ludGgoVG9uZS5TeW50aCkudG9EZXN0aW5hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0luaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnN0cnVtZW50ICE9PSBudWxsICYmIHRoaXMuaXNSZWFkeTtcbiAgICB9XG5cbiAgICBwbGF5KHBpYW5vS2V5TnVtYmVyOiBudW1iZXIsIGR1cmF0aW9uSW5TZWNvbmRzOiBudW1iZXIgPSAwLCB2ZWxvY2l0eTogbnVtYmVyID0gMS4wKSB7XG4gICAgICAgIGlmICh0aGlzLnNkayA9PT0gQXVkaW9TREtUeXBlLlRvbmUpIHtcbiAgICAgICAgICAgIC8vIFRvbmUuanNcbiAgICAgICAgICAgIGNvbnN0IG5vdGVOYW1lID0gVG9uZS5GcmVxdWVuY3kocGlhbm9LZXlOdW1iZXIgKyAyMCwgXCJtaWRpXCIpLnRvTm90ZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5IFwiICsgcGlhbm9LZXlOdW1iZXIgKyBcIiA8PT4gXCIgKyBub3RlTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChkdXJhdGlvbkluU2Vjb25kcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0cnVtZW50LnRyaWdnZXJBdHRhY2sobm90ZU5hbWUsIDAsIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pbnN0cnVtZW50LnRyaWdnZXJBdHRhY2tSZWxlYXNlKG5vdGVOYW1lLCBcIjRuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdHJ1bWVudC50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgZHVyYXRpb25JblNlY29uZHMpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5zdHJ1bWVudC50cmlnZ2VyQXR0YWNrUmVsZWFzZShub3RlTmFtZSwgZHVyYXRpb25JblNlY29uZHMsIDAgLyogdGltZSBmcm9tIG5vdyAqLywgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTXVzaWNhbC5qc1xuICAgICAgICAgICAgLy8gbnVtZXJpY2FsbHkgKGluIEh6KSwgb3Igd2l0aCBtaWRpIG51bWJlcnMgKGFzIG5lZ2F0aXZlIGludGVnZXJzKS5cbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1bWVudC50b25lKC0ocGlhbm9LZXlOdW1iZXIgKyAyMCkpOyAvLyBNdXNpY2FsLmpzIGFjY2VwdHMgbmVnYXRpdmUgTUlESSBudW1iZXJzIDYwID09IE1pZGRsZSBDIChwaWFub0tleU51bWJlciA9PT0gNDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKHBpYW5vS2V5TnVtYmVyOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc2RrID09PSBBdWRpb1NES1R5cGUuVG9uZSkge1xuICAgICAgICAgICAgY29uc3Qgbm90ZU5hbWUgPSBUb25lLkZyZXF1ZW5jeShwaWFub0tleU51bWJlciArIDIwLCBcIm1pZGlcIikudG9Ob3RlKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRSSUdHRVIgUkVMRUFTRSBcIiArIHBpYW5vS2V5TnVtYmVyICsgXCIgLyBcIiArIG5vdGVOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuaW5zdHJ1bWVudC50cmlnZ2VyUmVsZWFzZShub3RlTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNdXNpY2FsLmpzXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk11c2ljYWwuanMgZG9lcyBub3Qgc3VwcG9ydCBOb3RlT2ZmXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RvcEFsbE5vdGVzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGUpO1xuICAgICAgICBpZiAodGhpcy5zZGsgPT09IEF1ZGlvU0RLVHlwZS5Ub25lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzEgfHwgdGhpcy50eXBlID09PSBJbnN0cnVtZW50VHlwZS5TYW1wbGVkXzIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0b3BBbGxOb3RlcyFcIik7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5zdHJ1bWVudCBhcyBUb25lLlNhbXBsZXIpLnJlbGVhc2VBbGwoVG9uZS5ub3coKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEFsbE5vdGVzIGlzIE5PVCBJTVBMRU1FTlRFRCBGT1IgU1lOVEhTLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE11c2ljYWwuanNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RvcEFsbE5vdGVzIGlzIE5PVCBJTVBMRU1FTlRFRCBGT1IgTVVTSUNBTC5KU1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNhbXBsZWRfMTogUHVuY2h5IEF0dGFja1xuICAgIHNldHVwUHJlbG9hZGVyQW5kU2FtcGxlc01hcF8xKCkge1xuICAgICAgICB0aGlzLmJhc2VVUkwgPSBcIi9zL20vZ3JhbmQvXCI7XG4gICAgICAgIHRoaXMuc2FtcGxlc01hcCA9IHtcbiAgICAgICAgICAgIEMxOiBcIjQubXAzXCIsXG4gICAgICAgICAgICBDMjogXCIxNi5tcDNcIixcbiAgICAgICAgICAgIEMzOiBcIjI4Lm1wM1wiLFxuICAgICAgICAgICAgRDM6IFwiMzAubXAzXCIsXG4gICAgICAgICAgICBFMzogXCIzMi5tcDNcIixcbiAgICAgICAgICAgIEczOiBcIjM1Lm1wM1wiLFxuICAgICAgICAgICAgQTM6IFwiMzcubXAzXCIsXG4gICAgICAgICAgICBCMzogXCIzOS5tcDNcIixcbiAgICAgICAgICAgIEM0OiBcIjQwLm1wM1wiLFxuICAgICAgICAgICAgRDQ6IFwiNDIubXAzXCIsXG4gICAgICAgICAgICBFNDogXCI0NC5tcDNcIixcbiAgICAgICAgICAgIEY0OiBcIjQ1Lm1wM1wiLFxuICAgICAgICAgICAgRzQ6IFwiNDcubXAzXCIsXG4gICAgICAgICAgICBBNDogXCI0OS5tcDNcIixcbiAgICAgICAgICAgIEM1OiBcIjUyLm1wM1wiLFxuICAgICAgICAgICAgRjU6IFwiNTcubXAzXCIsXG4gICAgICAgICAgICBBNTogXCI2MS5tcDNcIixcbiAgICAgICAgICAgIEM2OiBcIjY0Lm1wM1wiLFxuICAgICAgICAgICAgRjY6IFwiNjkubXAzXCIsXG4gICAgICAgICAgICBDNzogXCI3Ni5tcDNcIixcbiAgICAgICAgICAgIEc3OiBcIjgzLm1wM1wiLFxuICAgICAgICAgICAgQzg6IFwiODgubXAzXCIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0dXBTYW1wbGVySW5zdHJ1bWVudCgpO1xuICAgIH1cblxuICAgIC8vIFNhbXBsZWRfMjogU29mdGVyL1Ntb290aGVyXG4gICAgc2V0dXBQcmVsb2FkZXJBbmRTYW1wbGVzTWFwXzIoKSB7XG4gICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiL3MvbS9icmlnaHQvXCI7XG4gICAgICAgIHRoaXMuc2FtcGxlc01hcCA9IHtcbiAgICAgICAgICAgIEMxOiBcIjQubXAzXCIsXG4gICAgICAgICAgICBHMTogXCIxMS5tcDNcIixcbiAgICAgICAgICAgIEMyOiBcIjE2Lm1wM1wiLFxuICAgICAgICAgICAgRzI6IFwiMjMubXAzXCIsXG4gICAgICAgICAgICBDMzogXCIyOC5tcDNcIixcbiAgICAgICAgICAgIEczOiBcIjM1Lm1wM1wiLFxuICAgICAgICAgICAgQzQ6IFwiNDAubXAzXCIsXG4gICAgICAgICAgICBHNDogXCI0Ny5tcDNcIixcbiAgICAgICAgICAgIEM1OiBcIjUyLm1wM1wiLFxuICAgICAgICAgICAgRzU6IFwiNTkubXAzXCIsXG4gICAgICAgICAgICBDNjogXCI2NC5tcDNcIixcbiAgICAgICAgICAgIEc2OiBcIjcxLm1wM1wiLFxuICAgICAgICAgICAgQzc6IFwiNzYubXAzXCIsXG4gICAgICAgICAgICBHNzogXCI4My5tcDNcIixcbiAgICAgICAgICAgIEM4OiBcIjg4Lm1wM1wiLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldHVwU2FtcGxlckluc3RydW1lbnQoKTtcbiAgICB9XG5cbiAgICBzZXR1cFNhbXBsZXJJbnN0cnVtZW50KCkge1xuICAgICAgICAvLyBHZXQgYWJzb2x1dGUgVVJMcyBmb3IgbXAzIHNhbXBsZSBmaWxlcyB0byBwcmVsb2FkLlxuICAgICAgICBjb25zdCBmaWxlc1RvUHJlbG9hZCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gdGhpcy5zYW1wbGVzTWFwKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuc2FtcGxlc01hcFtrZXlOYW1lXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmFzZVVSTCArIGZpbGVOYW1lKTtcbiAgICAgICAgICAgIGZpbGVzVG9QcmVsb2FkLnB1c2godGhpcy5iYXNlVVJMICsgZmlsZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByZWxvYWQgdGhlIGZpbGVzIG5vdy5cbiAgICAgICAgaWYgKCF0aGlzLnByZWxvYWRlcikge1xuICAgICAgICAgICAgdGhpcy5wcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyKGZpbGVzVG9QcmVsb2FkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYSBUb25lLlNhbXBsZXIgaW5zdHJ1bWVudFxuICAgICAgICBjb25zdCBjb25maWc6IGFueSA9IHtcbiAgICAgICAgICAgIHJlbGVhc2U6IDEsXG4gICAgICAgICAgICBiYXNlVXJsOiB0aGlzLmJhc2VVUkwsXG4gICAgICAgICAgICBvbmxvYWQ6IChidWZmZXJzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBGaWxlcyBzdWNjZXNzZnVsbHkgcHJlbG9hZGVkLlxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluc3RydW1lbnQgPSBuZXcgVG9uZS5TYW1wbGVyKHRoaXMuc2FtcGxlc01hcCwgY29uZmlnKS50b0Rlc3RpbmF0aW9uKCk7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgeyBJbnN0cnVtZW50VHlwZSBhcyBQaWFub1R5cGUgfTtcblxuZXhwb3J0IGRlZmF1bHQgSW5zdHJ1bWVudDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/sound/Instrument.ts\n");

/***/ })

})