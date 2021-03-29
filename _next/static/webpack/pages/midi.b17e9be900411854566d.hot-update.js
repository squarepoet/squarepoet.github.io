webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/ComputerKeyboardMusicInput.ts":
/*!********************************************************!*\
  !*** ./apps/shared/midi/ComputerKeyboardMusicInput.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {// Use computer keyboard input to play the piano.\n// Pressing\n// a s d f g h j k l ; ' => c d e f g a b c d e f\n// w e | t y u | o p => c# d# | f# g# a# b# | c# d#\n// We can connect an Instrument object to this handle the sound output.\n// We can connect an object to receive MIDI events, or we can broadcast it as a midi device, perhaps?\nvar ComputerKeyboardMusicInput;\n\n(function (_ComputerKeyboardMusicInput) {\n  var octaveNumber = 4; // C4 is middle C.\n\n  var source = null; // KeyEvents come from this source.\n\n  var soundOutput = null; // MIDI events are sent to this destination, which will output sound.\n  // key/value pair:\n  // key: a computer key that is currently held down by the user.\n  // value: the piano key that it corresponds to.\n\n  var pressedKey = new Map();\n  var computerKeyToPianoKey = new Map([[\"KeyA\", -8], // C => pianoKey 40 is middle C\n  [\"KeyW\", -7], //   C#/Db\n  [\"KeyS\", -6], // D\n  [\"KeyE\", -5], //   D#/Eb\n  [\"KeyD\", -4], // E\n  [\"KeyF\", -3], // F\n  [\"KeyT\", -2], //   F# / Gb\n  [\"KeyG\", -1], // G\n  [\"KeyY\", 0], //   G# / Ab\n  [\"KeyH\", 1], // A\n  [\"KeyU\", 2], //   A#/Bb\n  [\"KeyJ\", 3], // B\n  [\"KeyK\", 4], // C\n  [\"KeyO\", 5], //   C#/Db\n  [\"KeyL\", 6], // D\n  [\"KeyP\", 7], //   D#/Eb\n  [\"Semicolon\", 8], // E\n  [\"Quote\", 9] // F\n  ]);\n\n  function onKeyDown(e) {\n    console.log(e.code);\n\n    if (e.ctrlKey && e.altKey) {\n      if (e.code == \"ArrowLeft\") {\n        octaveNumber--;\n\n        if (octaveNumber < 0) {\n          octaveNumber = 0;\n        }\n      } else if (e.code == \"ArrowRight\") {\n        octaveNumber++;\n\n        if (octaveNumber > 7) {\n          octaveNumber = 7;\n        }\n      }\n\n      console.log(\"Octave is now: \" + octaveNumber);\n    }\n\n    if (document.activeElement && document.activeElement.tagName.toLowerCase() === \"input\") {\n      console.log(\"IGNORE ME\");\n      return;\n    }\n\n    if (!soundOutput || !soundOutput.isInitialized) {\n      return;\n    }\n\n    var code = e.code;\n\n    if (computerKeyToPianoKey.has(code) && !pressedKey.has(code)) {\n      var pianoKeyNumber = computerKeyToPianoKey.get(code) + octaveNumber * 12;\n      pressedKey.set(code, pianoKeyNumber);\n      soundOutput.play(pianoKeyNumber, 0, 0.8\n      /* volume */\n      );\n    }\n  }\n\n  function onKeyUp(e) {\n    if (!soundOutput || !soundOutput.isInitialized) {\n      return;\n    }\n\n    var code = e.code;\n\n    if (computerKeyToPianoKey.has(code)) {\n      soundOutput.stop(pressedKey.get(code));\n      pressedKey[\"delete\"](code);\n    }\n  }\n\n  function registerKeyHandlersForElement(e) {\n    source = e;\n    source.addEventListener(\"keydown\", onKeyDown);\n    source.addEventListener(\"keyup\", onKeyUp);\n  }\n\n  _ComputerKeyboardMusicInput.registerKeyHandlersForElement = registerKeyHandlersForElement;\n\n  function setSoundOutput(i) {\n    soundOutput = i;\n  }\n\n  _ComputerKeyboardMusicInput.setSoundOutput = setSoundOutput;\n\n  function reset() {\n    if (source) {\n      source.removeEventListener(\"keydown\", onKeyDown);\n      source.removeEventListener(\"keyup\", onKeyUp);\n      source = null;\n    }\n\n    if (soundOutput) {\n      soundOutput = null;\n    }\n  }\n})(ComputerKeyboardMusicInput || (ComputerKeyboardMusicInput = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ComputerKeyboardMusicInput);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9Db21wdXRlcktleWJvYXJkTXVzaWNJbnB1dC50cz9kZWJlIl0sIm5hbWVzIjpbIm9jdGF2ZU51bWJlciIsInNvdXJjZSIsInNvdW5kT3V0cHV0IiwicHJlc3NlZEtleSIsIk1hcCIsImNvbXB1dGVyS2V5VG9QaWFub0tleSIsIm9uS2V5RG93biIsImUiLCJjb25zb2xlIiwibG9nIiwiY29kZSIsImN0cmxLZXkiLCJhbHRLZXkiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJpc0luaXRpYWxpemVkIiwiaGFzIiwicGlhbm9LZXlOdW1iZXIiLCJnZXQiLCJzZXQiLCJwbGF5Iiwib25LZXlVcCIsInN0b3AiLCJyZWdpc3RlcktleUhhbmRsZXJzRm9yRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRTb3VuZE91dHB1dCIsImkiLCJyZXNldCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFLSSxNQUFJQSxZQUFZLEdBQUcsQ0FBbkIsQyxDQUFzQjs7QUFFdEIsTUFBSUMsTUFBNEIsR0FBRyxJQUFuQyxDLENBQXlDOztBQUN6QyxNQUFJQyxXQUF1QixHQUFHLElBQTlCLEMsQ0FBb0M7QUFFcEM7QUFDQTtBQUNBOztBQUNBLE1BQUlDLFVBQVUsR0FBRyxJQUFJQyxHQUFKLEVBQWpCO0FBRUEsTUFBSUMscUJBQXFCLEdBQUcsSUFBSUQsR0FBSixDQUFRLENBQ2hDLENBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQURnQyxFQUNsQjtBQUNkLEdBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQUZnQyxFQUVsQjtBQUNkLEdBQUMsTUFBRCxFQUFTLENBQUMsQ0FBVixDQUhnQyxFQUdsQjtBQUNkLEdBQUMsTUFBRCxF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LFVBQVUsQ0FBQ2lCLEdBQVgsQ0FBZVYsSUFBZixDQUFqQjtBQUNBUCxnQkFBVSxVQUFWLENBQWtCTyxJQUFsQjtBQUNIO0FBQ0o7O0FBRU0sV0FBU2UsNkJBQVQsQ0FBdUNsQixDQUF2QyxFQUFnRTtBQUNuRU4sVUFBTSxHQUFHTSxDQUFUO0FBQ0FOLFVBQU0sQ0FBQ3lCLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DcEIsU0FBbkM7QUFDQUwsVUFBTSxDQUFDeUIsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNILE9BQWpDO0FBQ0g7Ozs7QUFFTSxXQUFTSSxjQUFULENBQXdCQyxDQUF4QixFQUF1QztBQUMxQzFCLGVBQVcsR0FBRzBCLENBQWQ7QUFDSDs7OztBQUVELFdBQVNDLEtBQVQsR0FBaUI7QUFDYixRQUFJNUIsTUFBSixFQUFZO0FBQ1JBLFlBQU0sQ0FBQzZCLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDeEIsU0FBdEM7QUFDQUwsWUFBTSxDQUFDNkIsbUJBQVAsQ0FBMkIsT0FBM0IsRUFBb0NQLE9BQXBDO0FBQ0F0QixZQUFNLEdBQUcsSUFBVDtBQUNIOztBQUNELFFBQUlDLFdBQUosRUFBaUI7QUFDYkEsaUJBQVcsR0FBRyxJQUFkO0FBQ0g7QUFDSjtHQTlGSzZCLDBCLEtBQUFBLDBCOztBQWlHS0EseUZBQWYiLCJmaWxlIjoiLi9hcHBzL3NoYXJlZC9taWRpL0NvbXB1dGVyS2V5Ym9hcmRNdXNpY0lucHV0LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVXNlIGNvbXB1dGVyIGtleWJvYXJkIGlucHV0IHRvIHBsYXkgdGhlIHBpYW5vLlxuLy8gUHJlc3Npbmdcbi8vIGEgcyBkIGYgZyBoIGogayBsIDsgJyA9PiBjIGQgZSBmIGcgYSBiIGMgZCBlIGZcbi8vIHcgZSB8IHQgeSB1IHwgbyBwID0+IGMjIGQjIHwgZiMgZyMgYSMgYiMgfCBjIyBkI1xuLy8gV2UgY2FuIGNvbm5lY3QgYW4gSW5zdHJ1bWVudCBvYmplY3QgdG8gdGhpcyBoYW5kbGUgdGhlIHNvdW5kIG91dHB1dC5cbi8vIFdlIGNhbiBjb25uZWN0IGFuIG9iamVjdCB0byByZWNlaXZlIE1JREkgZXZlbnRzLCBvciB3ZSBjYW4gYnJvYWRjYXN0IGl0IGFzIGEgbWlkaSBkZXZpY2UsIHBlcmhhcHM/XG5cbmltcG9ydCBJbnN0cnVtZW50IGZyb20gXCJhcHBzL3NoYXJlZC9zb3VuZC9JbnN0cnVtZW50XCI7XG5cbm5hbWVzcGFjZSBDb21wdXRlcktleWJvYXJkTXVzaWNJbnB1dCB7XG4gICAgbGV0IG9jdGF2ZU51bWJlciA9IDQ7IC8vIEM0IGlzIG1pZGRsZSBDLlxuXG4gICAgbGV0IHNvdXJjZTogSFRNTEVsZW1lbnQgfCBXaW5kb3cgPSBudWxsOyAvLyBLZXlFdmVudHMgY29tZSBmcm9tIHRoaXMgc291cmNlLlxuICAgIGxldCBzb3VuZE91dHB1dDogSW5zdHJ1bWVudCA9IG51bGw7IC8vIE1JREkgZXZlbnRzIGFyZSBzZW50IHRvIHRoaXMgZGVzdGluYXRpb24sIHdoaWNoIHdpbGwgb3V0cHV0IHNvdW5kLlxuXG4gICAgLy8ga2V5L3ZhbHVlIHBhaXI6XG4gICAgLy8ga2V5OiBhIGNvbXB1dGVyIGtleSB0aGF0IGlzIGN1cnJlbnRseSBoZWxkIGRvd24gYnkgdGhlIHVzZXIuXG4gICAgLy8gdmFsdWU6IHRoZSBwaWFubyBrZXkgdGhhdCBpdCBjb3JyZXNwb25kcyB0by5cbiAgICBsZXQgcHJlc3NlZEtleSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgICBsZXQgY29tcHV0ZXJLZXlUb1BpYW5vS2V5ID0gbmV3IE1hcChbXG4gICAgICAgIFtcIktleUFcIiwgLThdLCAvLyBDID0+IHBpYW5vS2V5IDQwIGlzIG1pZGRsZSBDXG4gICAgICAgIFtcIktleVdcIiwgLTddLCAvLyAgIEMjL0RiXG4gICAgICAgIFtcIktleVNcIiwgLTZdLCAvLyBEXG4gICAgICAgIFtcIktleUVcIiwgLTVdLCAvLyAgIEQjL0ViXG4gICAgICAgIFtcIktleURcIiwgLTRdLCAvLyBFXG4gICAgICAgIFtcIktleUZcIiwgLTNdLCAvLyBGXG4gICAgICAgIFtcIktleVRcIiwgLTJdLCAvLyAgIEYjIC8gR2JcbiAgICAgICAgW1wiS2V5R1wiLCAtMV0sIC8vIEdcbiAgICAgICAgW1wiS2V5WVwiLCAwXSwgLy8gICBHIyAvIEFiXG4gICAgICAgIFtcIktleUhcIiwgMV0sIC8vIEFcbiAgICAgICAgW1wiS2V5VVwiLCAyXSwgLy8gICBBIy9CYlxuICAgICAgICBbXCJLZXlKXCIsIDNdLCAvLyBCXG4gICAgICAgIFtcIktleUtcIiwgNF0sIC8vIENcbiAgICAgICAgW1wiS2V5T1wiLCA1XSwgLy8gICBDIy9EYlxuICAgICAgICBbXCJLZXlMXCIsIDZdLCAvLyBEXG4gICAgICAgIFtcIktleVBcIiwgN10sIC8vICAgRCMvRWJcbiAgICAgICAgW1wiU2VtaWNvbG9uXCIsIDhdLCAvLyBFXG4gICAgICAgIFtcIlF1b3RlXCIsIDldLCAvLyBGXG4gICAgXSk7XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLmNvZGUpO1xuICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICBvY3RhdmVOdW1iZXItLTtcbiAgICAgICAgICAgICAgICBpZiAob2N0YXZlTnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBvY3RhdmVOdW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5jb2RlID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgb2N0YXZlTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgaWYgKG9jdGF2ZU51bWJlciA+IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2N0YXZlTnVtYmVyID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9jdGF2ZSBpcyBub3c6IFwiICsgb2N0YXZlTnVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSUdOT1JFIE1FXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc291bmRPdXRwdXQgfHwgIXNvdW5kT3V0cHV0LmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2RlID0gZS5jb2RlO1xuICAgICAgICBpZiAoY29tcHV0ZXJLZXlUb1BpYW5vS2V5Lmhhcyhjb2RlKSAmJiAhcHJlc3NlZEtleS5oYXMoY29kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBpYW5vS2V5TnVtYmVyID0gY29tcHV0ZXJLZXlUb1BpYW5vS2V5LmdldChjb2RlKSArIG9jdGF2ZU51bWJlciAqIDEyO1xuICAgICAgICAgICAgcHJlc3NlZEtleS5zZXQoY29kZSwgcGlhbm9LZXlOdW1iZXIpO1xuICAgICAgICAgICAgc291bmRPdXRwdXQucGxheShwaWFub0tleU51bWJlciwgMCwgMC44IC8qIHZvbHVtZSAqLyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwKGUpIHtcbiAgICAgICAgaWYgKCFzb3VuZE91dHB1dCB8fCAhc291bmRPdXRwdXQuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvZGUgPSBlLmNvZGU7XG4gICAgICAgIGlmIChjb21wdXRlcktleVRvUGlhbm9LZXkuaGFzKGNvZGUpKSB7XG4gICAgICAgICAgICBzb3VuZE91dHB1dC5zdG9wKHByZXNzZWRLZXkuZ2V0KGNvZGUpKTtcbiAgICAgICAgICAgIHByZXNzZWRLZXkuZGVsZXRlKGNvZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyS2V5SGFuZGxlcnNGb3JFbGVtZW50KGU6IEhUTUxFbGVtZW50IHwgV2luZG93KSB7XG4gICAgICAgIHNvdXJjZSA9IGU7XG4gICAgICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5VXApO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBzZXRTb3VuZE91dHB1dChpOiBJbnN0cnVtZW50KSB7XG4gICAgICAgIHNvdW5kT3V0cHV0ID0gaTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgc291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5VXApO1xuICAgICAgICAgICAgc291cmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291bmRPdXRwdXQpIHtcbiAgICAgICAgICAgIHNvdW5kT3V0cHV0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcHV0ZXJLZXlib2FyZE11c2ljSW5wdXQ7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./apps/shared/midi/ComputerKeyboardMusicInput.ts\n");

/***/ })

})