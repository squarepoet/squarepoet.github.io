webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/ComputerKeyboardMusicInput.ts":
/*!********************************************************!*\
  !*** ./apps/shared/midi/ComputerKeyboardMusicInput.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {// Use computer keyboard input to play the piano.\n// Pressing\n// a s d f g h j k l ; ' => c d e f g a b c d e f\n// w e | t y u | o p => c# d# | f# g# a# b# | c# d#\n// We can connect an Instrument object to this handle the sound output.\n// We can connect an object to receive MIDI events, or we can broadcast it as a midi device, perhaps?\nvar ComputerKeyboardMusicInput;\n\n(function (_ComputerKeyboardMusicInput) {\n  var octaveNumber = 4; // C4 is middle C.\n\n  var source = null; // KeyEvents come from this source.\n\n  var soundOutput = null; // MIDI events are sent to this destination, which will output sound.\n  // key/value pair:\n  // key: a computer key that is currently held down by the user.\n  // value: the piano key that it corresponds to.\n\n  var pressedKey = new Map();\n  var computerKeyToPianoKey = new Map([[\"KeyA\", -8], // C => pianoKey 40 is middle C\n  [\"KeyW\", -7], //   C#/Db\n  [\"KeyS\", -6], // D\n  [\"KeyE\", -5], //   D#/Eb\n  [\"KeyD\", -4], // E\n  [\"KeyF\", -3], // F\n  [\"KeyT\", -2], //   F# / Gb\n  [\"KeyG\", -1], // G\n  [\"KeyY\", 0], //   G# / Ab\n  [\"KeyH\", 1], // A\n  [\"KeyU\", 2], //   A#/Bb\n  [\"KeyJ\", 3], // B\n  [\"KeyK\", 4], // C\n  [\"KeyO\", 5], //   C#/Db\n  [\"KeyL\", 6], // D\n  [\"KeyP\", 7], //   D#/Eb\n  [\"Semicolon\", 8], // E\n  [\"Quote\", 9] // F\n  ]);\n\n  function onKeyDown(e) {\n    console.log(typeof document.activeElement.tagName);\n    var code = e.code;\n\n    if (soundOutput && soundOutput.isInitialized) {\n      if (computerKeyToPianoKey.has(code) && !pressedKey.has(code)) {\n        var pianoKeyNumber = computerKeyToPianoKey.get(code) + octaveNumber * 12;\n        pressedKey.set(code, pianoKeyNumber);\n        soundOutput.play(pianoKeyNumber, 0, 0.8\n        /* volume */\n        );\n      }\n    }\n  }\n\n  function onKeyUp(e) {\n    var code = e.code;\n\n    if (soundOutput && soundOutput.isInitialized) {\n      if (computerKeyToPianoKey.has(code)) {\n        soundOutput.stop(pressedKey.get(code));\n        pressedKey[\"delete\"](code);\n      }\n    }\n  }\n\n  function registerKeyHandlersForElement(e) {\n    source = e;\n    source.addEventListener(\"keydown\", onKeyDown);\n    source.addEventListener(\"keyup\", onKeyUp);\n  }\n\n  _ComputerKeyboardMusicInput.registerKeyHandlersForElement = registerKeyHandlersForElement;\n\n  function setSoundOutput(i) {\n    soundOutput = i;\n  }\n\n  _ComputerKeyboardMusicInput.setSoundOutput = setSoundOutput;\n\n  function reset() {\n    if (source) {\n      source.removeEventListener(\"keydown\", onKeyDown);\n      source.removeEventListener(\"keyup\", onKeyUp);\n      source = null;\n    }\n\n    if (soundOutput) {\n      soundOutput = null;\n    }\n  }\n})(ComputerKeyboardMusicInput || (ComputerKeyboardMusicInput = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ComputerKeyboardMusicInput);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9Db21wdXRlcktleWJvYXJkTXVzaWNJbnB1dC50cz9kZWJlIl0sIm5hbWVzIjpbIm9jdGF2ZU51bWJlciIsInNvdXJjZSIsInNvdW5kT3V0cHV0IiwicHJlc3NlZEtleSIsIk1hcCIsImNvbXB1dGVyS2V5VG9QaWFub0tleSIsIm9uS2V5RG93biIsImUiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwidGFnTmFtZSIsImNvZGUiLCJpc0luaXRpYWxpemVkIiwiaGFzIiwicGlhbm9LZXlOdW1iZXIiLCJnZXQiLCJzZXQiLCJwbGF5Iiwib25LZXlVcCIsInN0b3AiLCJyZWdpc3RlcktleUhhbmRsZXJzRm9yRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRTb3VuZE91dHB1dCIsImkiLCJyZXNldCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFLSSxNQUFJQSxZQUFZLEdBQUcsQ0FBbkIsQyxDQUFzQjs7QUFFdEIsTUFBSUMsTUFBNEIsR0FBRyxJQUFuQyxDLENBQXlDOztBQUN6QyxNQUFJQyxXQUF1QixHQUFHLElBQTlCLEMsQ0FBb0M7QUFFcEM7QUFDQTtBQUNBOztBQUNBLE1BQUlDLFVBQVUsR0FBRyxJQUFJQyxHQUFKLEVBQWpCO0FBRUEsTUFBSUMscUJBQXFCLEdBQUcsSUFBSUQsR0FBSixDQUFRLENBQ2hDLENBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQURnQyxFQUNsQjtBQUNkLEdBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQUZnQyxFQUVsQjtBQUNkLEdBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQUhnQyxFQUdsQjtBQUNkLEdBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQUpnQyxFQUlsQjtBQUNkLEdB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QUFBLDBCOztBQTRFS0EseUZBQWYiLCJmaWxlIjoiLi9hcHBzL3NoYXJlZC9taWRpL0NvbXB1dGVyS2V5Ym9hcmRNdXNpY0lucHV0LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVXNlIGNvbXB1dGVyIGtleWJvYXJkIGlucHV0IHRvIHBsYXkgdGhlIHBpYW5vLlxuLy8gUHJlc3Npbmdcbi8vIGEgcyBkIGYgZyBoIGogayBsIDsgJyA9PiBjIGQgZSBmIGcgYSBiIGMgZCBlIGZcbi8vIHcgZSB8IHQgeSB1IHwgbyBwID0+IGMjIGQjIHwgZiMgZyMgYSMgYiMgfCBjIyBkI1xuLy8gV2UgY2FuIGNvbm5lY3QgYW4gSW5zdHJ1bWVudCBvYmplY3QgdG8gdGhpcyBoYW5kbGUgdGhlIHNvdW5kIG91dHB1dC5cbi8vIFdlIGNhbiBjb25uZWN0IGFuIG9iamVjdCB0byByZWNlaXZlIE1JREkgZXZlbnRzLCBvciB3ZSBjYW4gYnJvYWRjYXN0IGl0IGFzIGEgbWlkaSBkZXZpY2UsIHBlcmhhcHM/XG5cbmltcG9ydCBJbnN0cnVtZW50IGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9JbnN0cnVtZW50XCI7XG5cbm5hbWVzcGFjZSBDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dCB7XG4gICAgbGV0IG9jdGF2ZU51bWJlciA9IDQ7IC8vIEM0IGlzIG1pZGRsZSBDLlxuXG4gICAgbGV0IHNvdXJjZTogSFRNTEVsZW1lbnQgfCBXaW5kb3cgPSBudWxsOyAvLyBLZXlFdmVudHMgY29tZSBmcm9tIHRoaXMgc291cmNlLlxuICAgIGxldCBzb3VuZE91dHB1dDogSW5zdHJ1bWVudCA9IG51bGw7IC8vIE1JREkgZXZlbnRzIGFyZSBzZW50IHRvIHRoaXMgZGVzdGluYXRpb24sIHdoaWNoIHdpbGwgb3V0cHV0IHNvdW5kLlxuXG4gICAgLy8ga2V5L3ZhbHVlIHBhaXI6XG4gICAgLy8ga2V5OiBhIGNvbXB1dGVyIGtleSB0aGF0IGlzIGN1cnJlbnRseSBoZWxkIGRvd24gYnkgdGhlIHVzZXIuXG4gICAgLy8gdmFsdWU6IHRoZSBwaWFubyBrZXkgdGhhdCBpdCBjb3JyZXNwb25kcyB0by5cbiAgICBsZXQgcHJlc3NlZEtleSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgICBsZXQgY29tcHV0ZXJLZXlUb1BpYW5vS2V5ID0gbmV3IE1hcChbXG4gICAgICAgIFtcIktleUFcIiwgLThdLCAvLyBDID0+IHBpYW5vS2V5IDQwIGlzIG1pZGRsZSBDXG4gICAgICAgIFtcIktleVdcIiwgLTddLCAvLyAgIEMjL0RiXG4gICAgICAgIFtcIktleVNcIiwgLTZdLCAvLyBEXG4gICAgICAgIFtcIktleUVcIiwgLTVdLCAvLyAgIEQjL0ViXG4gICAgICAgIFtcIktleURcIiwgLTRdLCAvLyBFXG4gICAgICAgIFtcIktleUZcIiwgLTNdLCAvLyBGXG4gICAgICAgIFtcIktleVRcIiwgLTJdLCAvLyAgIEYjIC8gR2JcbiAgICAgICAgW1wiS2V5R1wiLCAtMV0sIC8vIEdcbiAgICAgICAgW1wiS2V5WVwiLCAwXSwgLy8gICBHIyAvIEFiXG4gICAgICAgIFtcIktleUhcIiwgMV0sIC8vIEFcbiAgICAgICAgW1wiS2V5VVwiLCAyXSwgLy8gICBBIy9CYlxuICAgICAgICBbXCJLZXlKXCIsIDNdLCAvLyBCXG4gICAgICAgIFtcIktleUtcIiwgNF0sIC8vIENcbiAgICAgICAgW1wiS2V5T1wiLCA1XSwgLy8gICBDIy9EYlxuICAgICAgICBbXCJLZXlMXCIsIDZdLCAvLyBEXG4gICAgICAgIFtcIktleVBcIiwgN10sIC8vICAgRCMvRWJcbiAgICAgICAgW1wiU2VtaWNvbG9uXCIsIDhdLCAvLyBFXG4gICAgICAgIFtcIlF1b3RlXCIsIDldLCAvLyBGXG4gICAgXSk7XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGUuY29kZTtcbiAgICAgICAgaWYgKHNvdW5kT3V0cHV0ICYmIHNvdW5kT3V0cHV0LmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGlmIChjb21wdXRlcktleVRvUGlhbm9LZXkuaGFzKGNvZGUpICYmICFwcmVzc2VkS2V5Lmhhcyhjb2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpYW5vS2V5TnVtYmVyID0gY29tcHV0ZXJLZXlUb1BpYW5vS2V5LmdldChjb2RlKSArIG9jdGF2ZU51bWJlciAqIDEyO1xuICAgICAgICAgICAgICAgIHByZXNzZWRLZXkuc2V0KGNvZGUsIHBpYW5vS2V5TnVtYmVyKTtcbiAgICAgICAgICAgICAgICBzb3VuZE91dHB1dC5wbGF5KHBpYW5vS2V5TnVtYmVyLCAwLCAwLjggLyogdm9sdW1lICovKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5VXAoZSkge1xuICAgICAgICBjb25zdCBjb2RlID0gZS5jb2RlO1xuICAgICAgICBpZiAoc291bmRPdXRwdXQgJiYgc291bmRPdXRwdXQuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgaWYgKGNvbXB1dGVyS2V5VG9QaWFub0tleS5oYXMoY29kZSkpIHtcbiAgICAgICAgICAgICAgICBzb3VuZE91dHB1dC5zdG9wKHByZXNzZWRLZXkuZ2V0KGNvZGUpKTtcbiAgICAgICAgICAgICAgICBwcmVzc2VkS2V5LmRlbGV0ZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiByZWdpc3RlcktleUhhbmRsZXJzRm9yRWxlbWVudChlOiBIVE1MRWxlbWVudCB8IFdpbmRvdykge1xuICAgICAgICBzb3VyY2UgPSBlO1xuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleVVwKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0U291bmRPdXRwdXQoaTogSW5zdHJ1bWVudCkge1xuICAgICAgICBzb3VuZE91dHB1dCA9IGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICAgICAgc291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleVVwKTtcbiAgICAgICAgICAgIHNvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdW5kT3V0cHV0KSB7XG4gICAgICAgICAgICBzb3VuZE91dHB1dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVyS2V5Ym9hcmRNdXNpY0lucHV0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./apps/shared/midi/ComputerKeyboardMusicInput.ts\n");

/***/ })

})