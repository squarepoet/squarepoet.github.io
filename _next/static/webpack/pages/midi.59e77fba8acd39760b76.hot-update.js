webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/midi/App.ts":
/*!**************************!*\
  !*** ./apps/midi/App.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var apps_shared_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apps/shared/Constants */ \"./apps/shared/Constants.ts\");\n/* harmony import */ var apps_shared_midi_ComputerKeyboardMusicInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apps/shared/midi/ComputerKeyboardMusicInput */ \"./apps/shared/midi/ComputerKeyboardMusicInput.ts\");\n/* harmony import */ var apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apps/shared/midi/LUMIKeys */ \"./apps/shared/midi/LUMIKeys.ts\");\n/* harmony import */ var apps_shared_midi_MIDIControllerIO__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apps/shared/midi/MIDIControllerIO */ \"./apps/shared/midi/MIDIControllerIO.ts\");\n/* harmony import */ var apps_shared_sound_Instrument__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apps/shared/sound/Instrument */ \"./apps/shared/sound/Instrument.ts\");\n/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! store2 */ \"./node_modules/store2/dist/store2.js\");\n/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(store2__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar App;\n\n(function (_App) {\n  var midiEventsLogArray = [];\n  var lumiEventsLogArray = [];\n  var setDeviceList = null;\n  var setMIDIEventsLog = null;\n  var setLUMIEventsLog = null;\n  var setSelectedInstrument = null;\n  var soundOutput = null;\n\n  function start() {\n    var savedInstrument = Object(apps_shared_sound_Instrument__WEBPACK_IMPORTED_MODULE_4__[\"validateInstrumentType\"])(store2__WEBPACK_IMPORTED_MODULE_5___default.a.get(apps_shared_Constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].StoreKeys.PIANO_TYPE));\n    setSelectedInstrument(savedInstrument);\n\n    var listenerForStartingWebAudio = function listenerForStartingWebAudio(e) {\n      console.log(typeof e);\n      removeListenersForStartingWebAudio();\n      startMIDIControllerIOWithSavedInstrument();\n      setMIDIEventsLog(\"Press some keys on your MIDI device to play sounds.\");\n    };\n\n    var addListenersForStartingWebAudio = function addListenersForStartingWebAudio() {\n      window.addEventListener(\"keydown\", listenerForStartingWebAudio);\n      document.addEventListener(\"touchstart\", listenerForStartingWebAudio);\n      document.addEventListener(\"mousedown\", listenerForStartingWebAudio);\n    };\n\n    var removeListenersForStartingWebAudio = function removeListenersForStartingWebAudio() {\n      window.removeEventListener(\"keydown\", listenerForStartingWebAudio);\n      document.removeEventListener(\"touchstart\", listenerForStartingWebAudio);\n      document.removeEventListener(\"mousedown\", listenerForStartingWebAudio);\n    }; // Make sure we call it!\n\n\n    addListenersForStartingWebAudio();\n\n    var startMIDIControllerIOWithSavedInstrument = function startMIDIControllerIOWithSavedInstrument() {\n      apps_shared_midi_MIDIControllerIO__WEBPACK_IMPORTED_MODULE_3__[\"default\"].start();\n      setInstrument(savedInstrument);\n      apps_shared_midi_ComputerKeyboardMusicInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"].registerKeyHandlersForElement(window);\n    }; // Print a color message to the console.\n\n\n    console.log(\"%cHello MIDI 🎹\", \"color:yellow;font-size:22px;font-weight:bold;background:black;\"); // Add some info to the informational text area.\n\n    setMIDIEventsLog(\"Tap/Click here to connect to your MIDI device.\");\n    setLUMIEventsLog(\"Connect your LUMI Keys via Bluetooth or USB.\");\n    apps_shared_midi_MIDIControllerIO__WEBPACK_IMPORTED_MODULE_3__[\"default\"].attachLogOutput(function (msg) {\n      midiEventsLogArray.unshift(msg);\n      setMIDIEventsLog(midiEventsLogArray.join(\"\\n\"));\n    });\n    apps_shared_midi_MIDIControllerIO__WEBPACK_IMPORTED_MODULE_3__[\"default\"].attachDeviceListOutput(function (txt) {\n      setDeviceList(txt);\n    });\n    apps_shared_midi_LUMIKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].attachLogOutput(function (msg) {\n      console.log(msg);\n      lumiEventsLogArray.unshift(msg);\n      setLUMIEventsLog(lumiEventsLogArray.join(\"\\n\"));\n    });\n  }\n\n  _App.start = start;\n\n  function onSelectInstrumentChange(e) {\n    var instrumentType = Object(apps_shared_sound_Instrument__WEBPACK_IMPORTED_MODULE_4__[\"validateInstrumentType\"])(e.target.value);\n    console.log(\"Saving \" + instrumentType);\n    store2__WEBPACK_IMPORTED_MODULE_5___default.a.set(apps_shared_Constants__WEBPACK_IMPORTED_MODULE_0__[\"default\"].StoreKeys.PIANO_TYPE, instrumentType);\n    setSelectedInstrument(instrumentType);\n    setInstrument(instrumentType);\n  }\n\n  _App.onSelectInstrumentChange = onSelectInstrumentChange;\n\n  function setInstrument(instrumentType) {\n    if (soundOutput) {\n      if (soundOutput.type === instrumentType) {\n        console.log(\"You chose the same instrumentType. Nothing more to do here.\");\n        return;\n      }\n\n      console.log(\"Disposing of previous soundOutput.\");\n      soundOutput.dispose();\n    }\n\n    console.log(\"Set Instrument Type: \" + instrumentType);\n    soundOutput = new apps_shared_sound_Instrument__WEBPACK_IMPORTED_MODULE_4__[\"default\"](instrumentType);\n    apps_shared_midi_ComputerKeyboardMusicInput__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setSoundOutput(soundOutput);\n    apps_shared_midi_MIDIControllerIO__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setSoundOutput(soundOutput);\n  }\n\n  function setHandlers(handlers) {\n    console.log(\"Handlers Set to:\");\n    console.log(handlers);\n    setDeviceList = handlers.setDeviceList;\n    setMIDIEventsLog = handlers.setMIDIEventsLog;\n    setLUMIEventsLog = handlers.setLUMIEventsLog;\n    setSelectedInstrument = handlers.setSelectedInstrument;\n  }\n\n  _App.setHandlers = setHandlers;\n})(App || (App = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9taWRpL0FwcC50cz8zYWZkIl0sIm5hbWVzIjpbIm1pZGlFdmVudHNMb2dBcnJheSIsImx1bWlFdmVudHNMb2dBcnJheSIsInNldERldmljZUxpc3QiLCJzZXRNSURJRXZlbnRzTG9nIiwic2V0TFVNSUV2ZW50c0xvZyIsInNldFNlbGVjdGVkSW5zdHJ1bWVudCIsInNvdW5kT3V0cHV0Iiwic3RhcnQiLCJzYXZlZEluc3RydW1lbnQiLCJ2YWxpZGF0ZUluc3RydW1lbnRUeXBlIiwic3RvcmUiLCJnZXQiLCJDb25zdGFudHMiLCJTdG9yZUtleXMiLCJQSUFOT19UWVBFIiwibGlzdGVuZXJGb3JTdGFydGluZ1dlYkF1ZGlvIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmVMaXN0ZW5lcnNGb3JTdGFydGluZ1dlYkF1ZGlvIiwic3RhcnRNSURJQ29udHJvbGxlcklPV2l0aFNhdmVkSW5zdHJ1bWVudCIsImFkZExpc3RlbmVyc0ZvclN0YXJ0aW5nV2ViQXVkaW8iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiTUlESUNvbnRyb2xsZXJJTyIsInNldEluc3RydW1lbnQiLCJDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dCIsInJlZ2lzdGVyS2V5SGFuZGxlcnNGb3JFbGVtZW50IiwiYXR0YWNoTG9nT3V0cHV0IiwibXNnIiwidW5zaGlmdCIsImpvaW4iLCJhdHRhY2hEZXZpY2VMaXN0T3V0cHV0IiwidHh0IiwiTFVNSUtleXMiLCJvblNlbGVjdEluc3RydW1lbnRDaGFuZ2UiLCJpbnN0cnVtZW50VHlwZSIsInRhcmdldCIsInZhbHVlIiwic2V0IiwidHlwZSIsImRpc3Bvc2UiLCJJbnN0cnVtZW50Iiwic2V0U291bmRPdXRwdXQiLCJzZXRIYW5kbGVycyIsImhhbmRsZXJzIiwiQXBwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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QSxHOztBQW1HS0Esa0VBQWYiLCJmaWxlIjoiLi9hcHBzL21pZGkvQXBwLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnN0YW50cyBmcm9tIFwiYXBwcy9zaGFyZWQvQ29uc3RhbnRzXCI7XG5pbXBvcnQgQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXQgZnJvbSBcImFwcHMvc2hhcmVkL21pZGkvQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXRcIjtcbmltcG9ydCBMVU1JS2V5cyBmcm9tIFwiYXBwcy9zaGFyZWQvbWlkaS9MVU1JS2V5c1wiO1xuaW1wb3J0IE1JRElDb250cm9sbGVySU8gZnJvbSBcImFwcHMvc2hhcmVkL21pZGkvTUlESUNvbnRyb2xsZXJJT1wiO1xuaW1wb3J0IEluc3RydW1lbnQsIHsgSW5zdHJ1bWVudFR5cGUsIHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUgfSBmcm9tIFwiYXBwcy9zaGFyZWQvc291bmQvSW5zdHJ1bWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gXCJzdG9yZTJcIjtcblxubmFtZXNwYWNlIEFwcCB7XG4gICAgY29uc3QgbWlkaUV2ZW50c0xvZ0FycmF5ID0gW107XG4gICAgY29uc3QgbHVtaUV2ZW50c0xvZ0FycmF5ID0gW107XG5cbiAgICBsZXQgc2V0RGV2aWNlTGlzdDogKHN0cmluZykgPT4gdm9pZCA9IG51bGw7XG4gICAgbGV0IHNldE1JRElFdmVudHNMb2c6IChzdHJpbmcpID0+IHZvaWQgPSBudWxsO1xuICAgIGxldCBzZXRMVU1JRXZlbnRzTG9nOiAoc3RyaW5nKSA9PiB2b2lkID0gbnVsbDtcbiAgICBsZXQgc2V0U2VsZWN0ZWRJbnN0cnVtZW50OiAoc3RyaW5nKSA9PiB2b2lkID0gbnVsbDtcblxuICAgIGxldCBzb3VuZE91dHB1dDogSW5zdHJ1bWVudCA9IG51bGw7XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHNhdmVkSW5zdHJ1bWVudCA9IHZhbGlkYXRlSW5zdHJ1bWVudFR5cGUoc3RvcmUuZ2V0KENvbnN0YW50cy5TdG9yZUtleXMuUElBTk9fVFlQRSkpO1xuICAgICAgICBzZXRTZWxlY3RlZEluc3RydW1lbnQoc2F2ZWRJbnN0cnVtZW50KTtcblxuICAgICAgICBjb25zdCBsaXN0ZW5lckZvclN0YXJ0aW5nV2ViQXVkaW8gPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codHlwZW9mIGUpO1xuICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXJzRm9yU3RhcnRpbmdXZWJBdWRpbygpO1xuICAgICAgICAgICAgc3RhcnRNSURJQ29udHJvbGxlcklPV2l0aFNhdmVkSW5zdHJ1bWVudCgpO1xuICAgICAgICAgICAgc2V0TUlESUV2ZW50c0xvZyhcIlByZXNzIHNvbWUga2V5cyBvbiB5b3VyIE1JREkgZGV2aWNlIHRvIHBsYXkgc291bmRzLlwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhZGRMaXN0ZW5lcnNGb3JTdGFydGluZ1dlYkF1ZGlvID0gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGxpc3RlbmVyRm9yU3RhcnRpbmdXZWJBdWRpbyk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBsaXN0ZW5lckZvclN0YXJ0aW5nV2ViQXVkaW8pO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBsaXN0ZW5lckZvclN0YXJ0aW5nV2ViQXVkaW8pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUxpc3RlbmVyc0ZvclN0YXJ0aW5nV2ViQXVkaW8gPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbGlzdGVuZXJGb3JTdGFydGluZ1dlYkF1ZGlvKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGxpc3RlbmVyRm9yU3RhcnRpbmdXZWJBdWRpbyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmVyRm9yU3RhcnRpbmdXZWJBdWRpbyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGNhbGwgaXQhXG4gICAgICAgIGFkZExpc3RlbmVyc0ZvclN0YXJ0aW5nV2ViQXVkaW8oKTtcblxuICAgICAgICBjb25zdCBzdGFydE1JRElDb250cm9sbGVySU9XaXRoU2F2ZWRJbnN0cnVtZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgTUlESUNvbnRyb2xsZXJJTy5zdGFydCgpO1xuICAgICAgICAgICAgc2V0SW5zdHJ1bWVudChzYXZlZEluc3RydW1lbnQpO1xuICAgICAgICAgICAgQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXQucmVnaXN0ZXJLZXlIYW5kbGVyc0ZvckVsZW1lbnQod2luZG93KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBQcmludCBhIGNvbG9yIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWNIZWxsbyBNSURJIPCfjrlcIiwgXCJjb2xvcjp5ZWxsb3c7Zm9udC1zaXplOjIycHg7Zm9udC13ZWlnaHQ6Ym9sZDtiYWNrZ3JvdW5kOmJsYWNrO1wiKTtcblxuICAgICAgICAvLyBBZGQgc29tZSBpbmZvIHRvIHRoZSBpbmZvcm1hdGlvbmFsIHRleHQgYXJlYS5cbiAgICAgICAgc2V0TUlESUV2ZW50c0xvZyhcIlRhcC9DbGljayBoZXJlIHRvIGNvbm5lY3QgdG8geW91ciBNSURJIGRldmljZS5cIik7XG4gICAgICAgIHNldExVTUlFdmVudHNMb2coXCJDb25uZWN0IHlvdXIgTFVNSSBLZXlzIHZpYSBCbHVldG9vdGggb3IgVVNCLlwiKTtcblxuICAgICAgICBNSURJQ29udHJvbGxlcklPLmF0dGFjaExvZ091dHB1dCgobXNnKSA9PiB7XG4gICAgICAgICAgICBtaWRpRXZlbnRzTG9nQXJyYXkudW5zaGlmdChtc2cpO1xuICAgICAgICAgICAgc2V0TUlESUV2ZW50c0xvZyhtaWRpRXZlbnRzTG9nQXJyYXkuam9pbihcIlxcblwiKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE1JRElDb250cm9sbGVySU8uYXR0YWNoRGV2aWNlTGlzdE91dHB1dCgodHh0KSA9PiB7XG4gICAgICAgICAgICBzZXREZXZpY2VMaXN0KHR4dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExVTUlLZXlzLmF0dGFjaExvZ091dHB1dCgobXNnKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICAgICAgbHVtaUV2ZW50c0xvZ0FycmF5LnVuc2hpZnQobXNnKTtcbiAgICAgICAgICAgIHNldExVTUlFdmVudHNMb2cobHVtaUV2ZW50c0xvZ0FycmF5LmpvaW4oXCJcXG5cIikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gb25TZWxlY3RJbnN0cnVtZW50Q2hhbmdlKGUpIHtcbiAgICAgICAgY29uc3QgaW5zdHJ1bWVudFR5cGUgPSB2YWxpZGF0ZUluc3RydW1lbnRUeXBlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTYXZpbmcgXCIgKyBpbnN0cnVtZW50VHlwZSk7XG4gICAgICAgIHN0b3JlLnNldChDb25zdGFudHMuU3RvcmVLZXlzLlBJQU5PX1RZUEUsIGluc3RydW1lbnRUeXBlKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRJbnN0cnVtZW50KGluc3RydW1lbnRUeXBlKTtcbiAgICAgICAgc2V0SW5zdHJ1bWVudChpbnN0cnVtZW50VHlwZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW5zdHJ1bWVudChpbnN0cnVtZW50VHlwZTogSW5zdHJ1bWVudFR5cGUpIHtcbiAgICAgICAgaWYgKHNvdW5kT3V0cHV0KSB7XG4gICAgICAgICAgICBpZiAoc291bmRPdXRwdXQudHlwZSA9PT0gaW5zdHJ1bWVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBjaG9zZSB0aGUgc2FtZSBpbnN0cnVtZW50VHlwZS4gTm90aGluZyBtb3JlIHRvIGRvIGhlcmUuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzcG9zaW5nIG9mIHByZXZpb3VzIHNvdW5kT3V0cHV0LlwiKTtcbiAgICAgICAgICAgIHNvdW5kT3V0cHV0LmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBJbnN0cnVtZW50IFR5cGU6IFwiICsgaW5zdHJ1bWVudFR5cGUpO1xuICAgICAgICBzb3VuZE91dHB1dCA9IG5ldyBJbnN0cnVtZW50KGluc3RydW1lbnRUeXBlKTtcbiAgICAgICAgQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXQuc2V0U291bmRPdXRwdXQoc291bmRPdXRwdXQpO1xuICAgICAgICBNSURJQ29udHJvbGxlcklPLnNldFNvdW5kT3V0cHV0KHNvdW5kT3V0cHV0KTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0SGFuZGxlcnMoaGFuZGxlcnM6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhhbmRsZXJzIFNldCB0bzpcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGhhbmRsZXJzKTtcblxuICAgICAgICBzZXREZXZpY2VMaXN0ID0gaGFuZGxlcnMuc2V0RGV2aWNlTGlzdDtcbiAgICAgICAgc2V0TUlESUV2ZW50c0xvZyA9IGhhbmRsZXJzLnNldE1JRElFdmVudHNMb2c7XG4gICAgICAgIHNldExVTUlFdmVudHNMb2cgPSBoYW5kbGVycy5zZXRMVU1JRXZlbnRzTG9nO1xuICAgICAgICBzZXRTZWxlY3RlZEluc3RydW1lbnQgPSBoYW5kbGVycy5zZXRTZWxlY3RlZEluc3RydW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/midi/App.ts\n");

/***/ })

})