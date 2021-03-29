webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/ComputerKeyboardMusicInput.ts":
/*!********************************************************!*\
  !*** ./apps/shared/midi/ComputerKeyboardMusicInput.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {// Use computer keyboard input to play the piano.\n// Pressing\n// a s d f g h j k l ; ' => c d e f g a b c d e f\n// w e | t y u | o p => c# d# | f# g# a# b# | c# d#\n// We can connect an Instrument object to this handle the sound output.\n// We can connect an object to receive MIDI events, or we can broadcast it as a midi device, perhaps?\nvar ComputerKeyboardMusicInput;\n\n(function (_ComputerKeyboardMusicInput) {\n  var octaveNumber = 4; // C4 is middle C.\n\n  var source = null; // KeyEvents come from this source.\n\n  var soundOutput = null; // MIDI events are sent to this destination, which will output sound.\n\n  var mapping = {\n    a: 40,\n    // C => pianoKey 40 is middle C\n    w: 41,\n    //   C#/Db\n    s: 42,\n    // D\n    e: 43,\n    //   D#/Eb\n    d: 44,\n    // E\n    f: 45,\n    // F\n    t: 46,\n    //   F# / Gb\n    g: 47,\n    // G\n    y: 48,\n    //   G# / Ab\n    h: 49,\n    // A\n    u: 50,\n    //   A#/Bb\n    j: 51,\n    // B\n    //\n    k: 52,\n    // C\n    o: 53,\n    //   C#/Db\n    l: 54,\n    // D\n    p: 55,\n    //   D#/Eb\n    \";\": 56,\n    // E\n    \"'\": 57 // F\n\n  };\n\n  function onKeyDown(e) {\n    console.log(e.code);\n    console.log(\"SEND A NOTE ON\");\n\n    if (soundOutput) {\n      soundOutput.play(40, 0, 60);\n    }\n  }\n\n  function onKeyUp(e) {\n    console.log(e.code);\n    console.log(\"SEND A NOTE OFF\");\n\n    if (soundOutput) {\n      soundOutput.stop(40);\n    }\n  }\n\n  function registerKeyHandlersForElement(e) {\n    source = e;\n    source.addEventListener(\"keydown\", onKeyDown);\n    source.addEventListener(\"keyup\", onKeyUp);\n  }\n\n  _ComputerKeyboardMusicInput.registerKeyHandlersForElement = registerKeyHandlersForElement;\n\n  function setSoundOutput(i) {\n    soundOutput = i;\n  }\n\n  _ComputerKeyboardMusicInput.setSoundOutput = setSoundOutput;\n\n  function reset() {\n    if (source) {\n      source.removeEventListener(\"keydown\", onKeyDown);\n      source.removeEventListener(\"keyup\", onKeyUp);\n      source = null;\n    }\n\n    if (soundOutput) {\n      soundOutput = null;\n    }\n  }\n})(ComputerKeyboardMusicInput || (ComputerKeyboardMusicInput = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ComputerKeyboardMusicInput);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9Db21wdXRlcktleWJvYXJkTXVzaWNJbnB1dC50cz9kZWJlIl0sIm5hbWVzIjpbIm9jdGF2ZU51bWJlciIsInNvdXJjZSIsInNvdW5kT3V0cHV0IiwibWFwcGluZyIsImEiLCJ3IiwicyIsImUiLCJkIiwiZiIsInQiLCJnIiwieSIsImgiLCJ1IiwiaiIsImsiLCJvIiwibCIsInAiLCJvbktleURvd24iLCJjb25zb2xlIiwibG9nIiwiY29kZSIsInBsYXkiLCJvbktleVVwIiwic3RvcCIsInJlZ2lzdGVyS2V5SGFuZGxlcnNGb3JFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFNvdW5kT3V0cHV0IiwiaSIsInJlc2V0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkNvbXB1dGVyS2V5Ym9hcmRNdXNpY0lucHV0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUtJLE1BQUlBLFlBQVksR0FBRyxDQUFuQixDLENBQXNCOztBQUV0QixNQUFJQyxNQUE0QixHQUFHLElBQW5DLEMsQ0FBeUM7O0FBQ3pDLE1BQUlDLFdBQXVCLEdBQUcsSUFBOUIsQyxDQUFvQzs7QUFFcEMsTUFBSUMsT0FBTyxHQUFHO0FBQ1ZDLEtBQUMsRUFBRSxFQURPO0FBQ0g7QUFDUEMsS0FBQyxFQUFFLEVBRk87QUFFSDtBQUNQQyxLQUFDLEVBQUUsRUFITztBQUdIO0FBQ1BDLEtBQUMsRUFBRSxFQUpPO0FBSUg7QUFDUEMsS0FBQyxFQUFFLEVBTE87QUFLSDtBQUNQQyxLQUFDLEVBQUUsRUFOTztBQU1IO0FBQ1BDLEtBQUMsRUFBRSxFQVBPO0FBT0g7QUFDUEMsS0FBQyxFQUFFLEVBUk87QUFRSDtBQUNQQyxLQUFDLEVBQUUsRUFUTztBQVNIO0FBQ1BDLEtBQUMsRUFBRSxFQVZPO0FBVUg7QUFDUEMsS0FBQyxFQUFFLEVBWE87QUFXSDtBQUNQQyxLQUFDLEVBQUUsRUFaTztBQVlIO0FBQ1A7QUFDQUMsS0FBQyxFQUFFLEVBZE87QUFjSDtBQUNQQyxLQUFDLEVBQUUsRUFmTztBQWVIO0FBQ1BDLEtBQUMsRUFBRSxFQWhCTztBQWdCSDtBQUNQQyxLQUFDLEVBQUUsRUFqQk87QUFpQkg7QUFDUCxTQUFLLEVBbEJLO0FBa0JEO0FBQ1QsU0FBSyxFQW5CSyxDQW1CRDs7QUFuQkMsR0FBZDs7QUFzQkEsV0FBU0MsU0FBVCxDQUFtQmIsQ0FBbkIsRUFBc0I7QUFDbEJjLFdBQU8sQ0FBQ0MsR0FBUixDQUFZZixDQUFDLENBQUNnQixJQUFkO0FBQ0FGLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaOztBQUNBLFFBQUlwQixXQUFKLEVBQWlCO0FBQ2JBLGlCQUFXLENBQUNzQixJQUFaLENBQWlCLEVBQWpCLEVBQXFCLENBQXJCLEVBQXdCLEVBQXhCO0FBQ0g7QUFDSjs7QUFFRCxXQUFTQyxPQUFULENBQWlCbEIsQ0FBakIsRUFBb0I7QUFDaEJjLFdBQU8sQ0FBQ0MsR0FBUixDQUFZZixDQUFDLENBQUNnQixJQUFkO0FBQ0FGLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaOztBQUNBLFFBQUlwQixXQUFKLEVBQWlCO0FBQ2JBLGlCQUFXLENBQUN3QixJQUFaLENBQWlCLEVBQWpCO0FBQ0g7QUFDSjs7QUFFTSxXQUFTQyw2QkFBVCxDQUF1Q3BCLENBQXZDLEVBQWdFO0FBQ25FTixVQUFNLEdBQUdNLENBQVQ7QUFDQU4sVUFBTSxDQUFDMkIsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNSLFNBQW5DO0FBQ0FuQixVQUFNLENBQUMyQixnQkFBUCxDQUF3QixPQUF4QixFQUFpQ0gsT0FBakM7QUFDSDs7OztBQUVNLFdBQVNJLGNBQVQsQ0FBd0JDLENBQXhCLEVBQXVDO0FBQzFDNUIsZUFBVyxHQUFHNEIsQ0FBZDtBQUNIOzs7O0FBRUQsV0FBU0MsS0FBVCxHQUFpQjtBQUNiLFFBQUk5QixNQUFKLEVBQVk7QUFDUkEsWUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0NaLFNBQXRDO0FBQ0FuQixZQUFNLENBQUMrQixtQkFBUCxDQUEyQixPQUEzQixFQUFvQ1AsT0FBcEM7QUFDQXhCLFlBQU0sR0FBRyxJQUFUO0FBQ0g7O0FBQ0QsUUFBSUMsV0FBSixFQUFpQjtBQUNiQSxpQkFBVyxHQUFHLElBQWQ7QUFDSDtBQUNKO0dBL0RLK0IsMEIsS0FBQUEsMEI7O0FBa0VLQSx5RkFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL21pZGkvQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBVc2UgY29tcHV0ZXIga2V5Ym9hcmQgaW5wdXQgdG8gcGxheSB0aGUgcGlhbm8uXG4vLyBQcmVzc2luZ1xuLy8gYSBzIGQgZiBnIGggaiBrIGwgOyAnID0+IGMgZCBlIGYgZyBhIGIgYyBkIGUgZlxuLy8gdyBlIHwgdCB5IHUgfCBvIHAgPT4gYyMgZCMgfCBmIyBnIyBhIyBiIyB8IGMjIGQjXG4vLyBXZSBjYW4gY29ubmVjdCBhbiBJbnN0cnVtZW50IG9iamVjdCB0byB0aGlzIGhhbmRsZSB0aGUgc291bmQgb3V0cHV0LlxuLy8gV2UgY2FuIGNvbm5lY3QgYW4gb2JqZWN0IHRvIHJlY2VpdmUgTUlESSBldmVudHMsIG9yIHdlIGNhbiBicm9hZGNhc3QgaXQgYXMgYSBtaWRpIGRldmljZSwgcGVyaGFwcz9cblxuaW1wb3J0IEluc3RydW1lbnQgZnJvbSBcImFwcHMvc2hhcmVkL3NvdW5kL0luc3RydW1lbnRcIjtcblxubmFtZXNwYWNlIENvbXB1dGVyS2V5Ym9hcmRNdXNpY0lucHV0IHtcbiAgICBsZXQgb2N0YXZlTnVtYmVyID0gNDsgLy8gQzQgaXMgbWlkZGxlIEMuXG5cbiAgICBsZXQgc291cmNlOiBIVE1MRWxlbWVudCB8IFdpbmRvdyA9IG51bGw7IC8vIEtleUV2ZW50cyBjb21lIGZyb20gdGhpcyBzb3VyY2UuXG4gICAgbGV0IHNvdW5kT3V0cHV0OiBJbnN0cnVtZW50ID0gbnVsbDsgLy8gTUlESSBldmVudHMgYXJlIHNlbnQgdG8gdGhpcyBkZXN0aW5hdGlvbiwgd2hpY2ggd2lsbCBvdXRwdXQgc291bmQuXG5cbiAgICBsZXQgbWFwcGluZyA9IHtcbiAgICAgICAgYTogNDAsIC8vIEMgPT4gcGlhbm9LZXkgNDAgaXMgbWlkZGxlIENcbiAgICAgICAgdzogNDEsIC8vICAgQyMvRGJcbiAgICAgICAgczogNDIsIC8vIERcbiAgICAgICAgZTogNDMsIC8vICAgRCMvRWJcbiAgICAgICAgZDogNDQsIC8vIEVcbiAgICAgICAgZjogNDUsIC8vIEZcbiAgICAgICAgdDogNDYsIC8vICAgRiMgLyBHYlxuICAgICAgICBnOiA0NywgLy8gR1xuICAgICAgICB5OiA0OCwgLy8gICBHIyAvIEFiXG4gICAgICAgIGg6IDQ5LCAvLyBBXG4gICAgICAgIHU6IDUwLCAvLyAgIEEjL0JiXG4gICAgICAgIGo6IDUxLCAvLyBCXG4gICAgICAgIC8vXG4gICAgICAgIGs6IDUyLCAvLyBDXG4gICAgICAgIG86IDUzLCAvLyAgIEMjL0RiXG4gICAgICAgIGw6IDU0LCAvLyBEXG4gICAgICAgIHA6IDU1LCAvLyAgIEQjL0ViXG4gICAgICAgIFwiO1wiOiA1NiwgLy8gRVxuICAgICAgICBcIidcIjogNTcsIC8vIEZcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25LZXlEb3duKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5jb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTRU5EIEEgTk9URSBPTlwiKTtcbiAgICAgICAgaWYgKHNvdW5kT3V0cHV0KSB7XG4gICAgICAgICAgICBzb3VuZE91dHB1dC5wbGF5KDQwLCAwLCA2MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5jb2RlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTRU5EIEEgTk9URSBPRkZcIik7XG4gICAgICAgIGlmIChzb3VuZE91dHB1dCkge1xuICAgICAgICAgICAgc291bmRPdXRwdXQuc3RvcCg0MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJLZXlIYW5kbGVyc0ZvckVsZW1lbnQoZTogSFRNTEVsZW1lbnQgfCBXaW5kb3cpIHtcbiAgICAgICAgc291cmNlID0gZTtcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldFNvdW5kT3V0cHV0KGk6IEluc3RydW1lbnQpIHtcbiAgICAgICAgc291bmRPdXRwdXQgPSBpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXlVcCk7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VuZE91dHB1dCkge1xuICAgICAgICAgICAgc291bmRPdXRwdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/midi/ComputerKeyboardMusicInput.ts\n");

/***/ })

})