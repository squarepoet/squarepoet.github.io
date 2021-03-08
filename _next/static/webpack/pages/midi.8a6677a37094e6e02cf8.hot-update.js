webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/LUMIKeys.ts":
/*!**************************************!*\
  !*** ./apps/shared/midi/LUMIKeys.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webmidi */ \"./node_modules/webmidi/webmidi.min.js\");\n/* harmony import */ var webmidi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webmidi__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n // This approach was inspired by:\n// https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n\nvar LUMIKeys;\n\n(function (_LUMIKeys) {\n  var ROLI_MANUFACTURER_ID = [0x00, 0x21, 0x10];\n  var outputs = []; // The DEVICE_ID might be different!\n  // We should allow the user of this page to customize the device ID.\n  // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?\n  // 0x37\n  // 0x07\n\n  var deviceID = 0x07;\n\n  function setDeviceID(devID) {\n    deviceID = devID;\n  }\n\n  function connect() {\n    // for (const i of WebMidi.inputs) {\n    //     inputs.push(i);\n    // }\n    var _iterator = _createForOfIteratorHelper(webmidi__WEBPACK_IMPORTED_MODULE_0___default.a.outputs),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var o = _step.value;\n\n        if (o.manufacturer.startsWith(\"ROLI\") && o.name.startsWith(\"LUMI\")) {\n          console.log(\"Found LUMI Keys\");\n          console.log(\"Output Port ID: \" + o.id);\n          outputs.push(o);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }\n\n  _LUMIKeys.connect = connect;\n\n  function sendCommandToAllDevices(command) {\n    var commandWithHeader = [0x77, deviceID].concat(command);\n    var checksum = createChecksum(command);\n    var commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);\n\n    var _iterator2 = _createForOfIteratorHelper(outputs),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var output = _step2.value;\n        output.sendSysex(ROLI_MANUFACTURER_ID, commandWithHeaderAndCheckSum);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  }\n\n  function createChecksum(values) {\n    var sum = values.length;\n\n    for (var i = 0; i < values.length; i++) {\n      sum = sum * 3 + values[i] & 0xff;\n    }\n\n    return sum & 0x7f;\n  }\n\n  function getClickHandler_SetScaleRoot(rootNote) {\n    return function () {\n      switch (rootNote) {\n        case \"C\":\n        default:\n          sendCommandToAllDevices([0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"C#\":\n          sendCommandToAllDevices([0x10, 0x30, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"D\":\n          sendCommandToAllDevices([0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"D#\":\n          sendCommandToAllDevices([0x10, 0x30, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"E\":\n          sendCommandToAllDevices([0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"F\":\n          sendCommandToAllDevices([0x10, 0x30, 0x23, 0x01, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"F#\":\n          sendCommandToAllDevices([0x10, 0x30, 0x43, 0x01, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"G\":\n          sendCommandToAllDevices([0x10, 0x30, 0x63, 0x01, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"G#\":\n          sendCommandToAllDevices([0x10, 0x30, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"A\":\n          sendCommandToAllDevices([0x10, 0x30, 0x23, 0x02, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"A#\":\n          sendCommandToAllDevices([0x10, 0x30, 0x43, 0x02, 0x00, 0x00, 0x00, 0x00]);\n          break;\n\n        case \"B\":\n          sendCommandToAllDevices([0x10, 0x30, 0x63, 0x02, 0x00, 0x00, 0x00, 0x00]);\n          break;\n      }\n    };\n  }\n\n  _LUMIKeys.getClickHandler_SetScaleRoot = getClickHandler_SetScaleRoot;\n\n  function getClickHandler_SetBrightness(brightnessValue) {\n    return function () {\n      var command = null;\n\n      switch (brightnessValue) {\n        case 0:\n          command = [10, 0x40, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00];\n          break;\n\n        case 0.25:\n          command = [10, 0x40, 0x24, 0x06, 0x00, 0x00, 0x00, 0x00];\n          break;\n\n        case 0.5:\n          command = [10, 0x40, 0x44, 0x0c, 0x00, 0x00, 0x00, 0x00];\n          break;\n\n        case 0.75:\n          command = [10, 0x40, 0x64, 0x12, 0x00, 0x00, 0x00, 0x00];\n          break;\n\n        case 1.0:\n        default:\n          command = [10, 0x40, 0x04, 0x19, 0x00, 0x00, 0x00, 0x00];\n          break;\n      }\n    };\n  }\n\n  _LUMIKeys.getClickHandler_SetBrightness = getClickHandler_SetBrightness;\n\n  function getClickHandler_SetScaleType(rootNote) {\n    return function () {\n      var command = null;\n\n      switch (rootNote) {\n        case \"chromatic\":\n          command = [0x10, 0x60, 0x42, 0x04, 0x00, 0x00, 0x00, 0x00]; // chromatic\n\n          break;\n\n        case \"major\":\n        default:\n          command = [0x10, 0x60, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00]; // major\n\n          break;\n\n        case \"minor\":\n          command = [0x10, 0x60, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00]; // minor\n\n          break;\n\n        case \"pentatonic-neutral\":\n          command = [0x10, 0x60, 0x62, 0x00, 0x00, 0x00, 0x00, 0x00]; // pentatonic neutral\n\n          break;\n\n        case \"pentatonic-major\":\n          command = [0x10, 0x60, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic major\n\n          break;\n\n        case \"pentatonic-minor\":\n          command = [0x10, 0x60, 0x22, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic minor\n\n          break;\n\n        case \"blues\":\n          command = [0x10, 0x60, 0x42, 0x01, 0x00, 0x00, 0x00, 0x00]; // blues\n\n          break;\n\n        case \"harmonic-minor\":\n          command = [0x10, 0x60, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00]; // harmonic minor\n\n          break;\n\n        case \"dorian\":\n          command = [0x10, 0x60, 0x62, 0x01, 0x00, 0x00, 0x00, 0x00]; // dorian\n\n          break;\n\n        case \"phrygian\":\n          command = [0x10, 0x60, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00]; // phrygian\n\n          break;\n\n        case \"lydian\":\n          command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // lydian\n\n          break;\n\n        case \"mixolydian\":\n          command = [0x10, 0x60, 0x42, 0x02, 0x00, 0x00, 0x00, 0x00]; // mixolydian\n\n          break;\n\n        case \"locrian\":\n          command = [0x10, 0x60, 0x62, 0x02, 0x00, 0x00, 0x00, 0x00]; // locrian\n\n          break;\n\n        case \"whole-tone\":\n          command = [0x10, 0x60, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00]; // whole tone\n\n          break;\n\n        case \"arabic-a\":\n          command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // arabic (a)\n\n          break;\n\n        case \"arabic-b\":\n          command = [0x10, 0x60, 0x42, 0x03, 0x00, 0x00, 0x00, 0x00]; // arabic (b)\n\n          break;\n\n        case \"japanese\":\n          command = [0x10, 0x60, 0x62, 0x03, 0x00, 0x00, 0x00, 0x00]; // japanese\n\n          break;\n\n        case \"ryukyu\":\n          command = [0x10, 0x60, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00]; // ryukyu\n\n          break;\n\n        case \"8-tone-spanish\":\n          command = [0x10, 0x60, 0x22, 0x04, 0x00, 0x00, 0x00, 0x00]; // 8-tone spanish\n\n          break;\n      }\n\n      sendCommandToAllDevices(command);\n    };\n  }\n\n  _LUMIKeys.getClickHandler_SetScaleType = getClickHandler_SetScaleType;\n\n  function getClickHandler_GetSerialNumber() {\n    return function () {\n      var _iterator3 = _createForOfIteratorHelper(outputs),\n          _step3;\n\n      try {\n        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n          var output = _step3.value;\n          output.sendSysex(ROLI_MANUFACTURER_ID, [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n        }\n      } catch (err) {\n        _iterator3.e(err);\n      } finally {\n        _iterator3.f();\n      }\n    };\n  }\n\n  _LUMIKeys.getClickHandler_GetSerialNumber = getClickHandler_GetSerialNumber;\n\n  function getClickHandler_Highlight(noteName) {\n    return function () {\n      var _iterator4 = _createForOfIteratorHelper(outputs),\n          _step4;\n\n      try {\n        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n          var output = _step4.value;\n          output.playNote(noteName, \"all\", {\n            duration: 1200\n            /* ms */\n\n          });\n        }\n      } catch (err) {\n        _iterator4.e(err);\n      } finally {\n        _iterator4.f();\n      }\n    };\n  }\n\n  _LUMIKeys.getClickHandler_Highlight = getClickHandler_Highlight;\n\n  function getClickHandler_TestXXX1() {\n    var command = [0x01, 0x03, 0x00];\n    return function () {\n      sendCommandToAllDevices(command);\n    };\n  }\n\n  _LUMIKeys.getClickHandler_TestXXX1 = getClickHandler_TestXXX1;\n\n  function getClickHandler_TestXXX2() {\n    // F0 00 21 10 77 00 01 01 00 5D\n    return function () {\n      var _iterator5 = _createForOfIteratorHelper(outputs),\n          _step5;\n\n      try {\n        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {\n          var output = _step5.value;\n          output.sendSysex(ROLI_MANUFACTURER_ID, [0x77, 0x07, 0x10, 0x02, 0x44]);\n        }\n      } catch (err) {\n        _iterator5.e(err);\n      } finally {\n        _iterator5.f();\n      }\n    };\n  }\n\n  _LUMIKeys.getClickHandler_TestXXX2 = getClickHandler_TestXXX2;\n})(LUMIKeys || (LUMIKeys = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LUMIKeys);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9MVU1JS2V5cy50cz8yOTNlIl0sIm5hbWVzIjpbIlJPTElfTUFOVUZBQ1RVUkVSX0lEIiwib3V0cHV0cyIsImRldmljZUlEIiwic2V0RGV2aWNlSUQiLCJkZXZJRCIsImNvbm5lY3QiLCJXZWJNaWRpIiwibyIsIm1hbnVmYWN0dXJlciIsInN0YXJ0c1dpdGgiLCJuYW1lIiwiY29uc29sZSIsImxvZyIsImlkIiwicHVzaCIsInNlbmRDb21tYW5kVG9BbGxEZXZpY2VzIiwiY29tbWFuZCIsImNvbW1hbmRXaXRoSGVhZGVyIiwiY29uY2F0IiwiY2hlY2tzdW0iLCJjcmVhdGVDaGVja3N1bSIsImNvbW1hbmRXaXRoSGVhZGVyQW5kQ2hlY2tTdW0iLCJvdXRwdXQiLCJzZW5kU3lzZXgiLCJ2YWx1ZXMiLCJzdW0iLCJsZW5ndGgiLCJpIiwiZ2V0Q2xpY2tIYW5kbGVyX1NldFNjYWxlUm9vdCIsInJvb3ROb3RlIiwiZ2V0Q2xpY2tIYW5kbGVyX1NldEJyaWdodG5lc3MiLCJicmlnaHRuZXNzVmFsdWUiLCJnZXRDbGlja0hhbmRsZXJfU2V0U2NhbGVUeXBlIiwiZ2V0Q2xpY2tIYW5kbGVyX0dldFNlcmlhbE51bWJlciIsImdldENsaWNrSGFuZGxlcl9IaWdobGlnaHQiLCJub3RlTmFtZSIsInBsYXlOb3RlIiwiZHVyYXRpb24iLCJnZXRDbGlja0hhbmRsZXJfVGVzdFhYWDEiLCJnZXRDbGlja0hhbmRsZXJfVGVzdFhYWDIiLCJMVU1JS2V5cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0NBRUE7QUFDQTs7Ozs7QUFFSSxNQUFNQSxvQkFBb0IsR0FBRyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixDQUE3QjtBQUVBLE1BQUlDLE9BQWlCLEdBQUcsRUFBeEIsQyxDQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBSUMsUUFBUSxHQUFHLElBQWY7O0FBQ0EsV0FBU0MsV0FBVCxDQUFxQkMsS0FB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S0FGRDtBQUdIOzs7O0FBRU0sV0FBU3VCLHdCQUFULEdBQW9DO0FBQ3ZDO0FBQ0EsV0FBTyxZQUFNO0FBQUEsa0RBQ1l0QyxPQURaO0FBQUE7O0FBQUE7QUFDVCwrREFBOEI7QUFBQSxjQUFuQnFCLE1BQW1CO0FBQzFCQSxnQkFBTSxDQUFDQyxTQUFQLENBQWlCdkIsb0JBQWpCLEVBQXVDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQXZDO0FBQ0g7QUFIUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSVosS0FKRDtBQUtIOzs7R0FqT0t3QyxRLEtBQUFBLFE7O0FBb09LQSx1RUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL21pZGkvTFVNSUtleXMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViTWlkaSwgeyBPdXRwdXQgfSBmcm9tIFwid2VibWlkaVwiO1xuXG4vLyBUaGlzIGFwcHJvYWNoIHdhcyBpbnNwaXJlZCBieTpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcbm5hbWVzcGFjZSBMVU1JS2V5cyB7XG4gICAgY29uc3QgUk9MSV9NQU5VRkFDVFVSRVJfSUQgPSBbMHgwMCwgMHgyMSwgMHgxMF07XG5cbiAgICBsZXQgb3V0cHV0czogT3V0cHV0W10gPSBbXTtcblxuICAgIC8vIFRoZSBERVZJQ0VfSUQgbWlnaHQgYmUgZGlmZmVyZW50IVxuICAgIC8vIFdlIHNob3VsZCBhbGxvdyB0aGUgdXNlciBvZiB0aGlzIHBhZ2UgdG8gY3VzdG9taXplIHRoZSBkZXZpY2UgSUQuXG4gICAgLy8gTWF5YmUgMHgzNyB3YXMgdGhlIGtpY2tzdGFydGVyIHZlcnNpb24gb2YgTFVNST8gSG93IGRvIHdlIHF1ZXJ5IHRoZSBkZXZpY2UgSUQ/XG4gICAgLy8gMHgzN1xuICAgIC8vIDB4MDdcbiAgICBsZXQgZGV2aWNlSUQgPSAweDA3O1xuICAgIGZ1bmN0aW9uIHNldERldmljZUlEKGRldklEKSB7XG4gICAgICAgIGRldmljZUlEID0gZGV2SUQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICAgIC8vIGZvciAoY29uc3QgaSBvZiBXZWJNaWRpLmlucHV0cykge1xuICAgICAgICAvLyAgICAgaW5wdXRzLnB1c2goaSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBmb3IgKGNvbnN0IG8gb2YgV2ViTWlkaS5vdXRwdXRzKSB7XG4gICAgICAgICAgICBpZiAoby5tYW51ZmFjdHVyZXIuc3RhcnRzV2l0aChcIlJPTElcIikgJiYgby5uYW1lLnN0YXJ0c1dpdGgoXCJMVU1JXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBMVU1JIEtleXNcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPdXRwdXQgUG9ydCBJRDogXCIgKyBvLmlkKTtcbiAgICAgICAgICAgICAgICBvdXRwdXRzLnB1c2gobyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZFRvQWxsRGV2aWNlcyhjb21tYW5kKSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRXaXRoSGVhZGVyID0gWzB4NzcsIGRldmljZUlEXS5jb25jYXQoY29tbWFuZCk7XG4gICAgICAgIGNvbnN0IGNoZWNrc3VtID0gY3JlYXRlQ2hlY2tzdW0oY29tbWFuZCk7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRXaXRoSGVhZGVyQW5kQ2hlY2tTdW0gPSBjb21tYW5kV2l0aEhlYWRlci5jb25jYXQoY2hlY2tzdW0pO1xuICAgICAgICBmb3IgKGNvbnN0IG91dHB1dCBvZiBvdXRwdXRzKSB7XG4gICAgICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFJPTElfTUFOVUZBQ1RVUkVSX0lELCBjb21tYW5kV2l0aEhlYWRlckFuZENoZWNrU3VtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNoZWNrc3VtKHZhbHVlcykge1xuICAgICAgICBsZXQgc3VtID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSA9IChzdW0gKiAzICsgdmFsdWVzW2ldKSAmIDB4ZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSAmIDB4N2Y7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENsaWNrSGFuZGxlcl9TZXRTY2FsZVJvb3Qocm9vdE5vdGUpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAocm9vdE5vdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ1wiOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHNlbmRDb21tYW5kVG9BbGxEZXZpY2VzKFsweDEwLCAweDMwLCAweDAzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJDI1wiOlxuICAgICAgICAgICAgICAgICAgICBzZW5kQ29tbWFuZFRvQWxsRGV2aWNlcyhbMHgxMCwgMHgzMCwgMHgyMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgICAgICAgICBzZW5kQ29tbWFuZFRvQWxsRGV2aWNlcyhbMHgxMCwgMHgzMCwgMHg0MywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRCNcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoWzB4MTAsIDB4MzAsIDB4NjMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoWzB4MTAsIDB4MzAsIDB4MDMsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkZcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoWzB4MTAsIDB4MzAsIDB4MjMsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkYjXCI6XG4gICAgICAgICAgICAgICAgICAgIHNlbmRDb21tYW5kVG9BbGxEZXZpY2VzKFsweDEwLCAweDMwLCAweDQzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJHXCI6XG4gICAgICAgICAgICAgICAgICAgIHNlbmRDb21tYW5kVG9BbGxEZXZpY2VzKFsweDEwLCAweDMwLCAweDYzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJHI1wiOlxuICAgICAgICAgICAgICAgICAgICBzZW5kQ29tbWFuZFRvQWxsRGV2aWNlcyhbMHgxMCwgMHgzMCwgMHgwMywgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiQVwiOlxuICAgICAgICAgICAgICAgICAgICBzZW5kQ29tbWFuZFRvQWxsRGV2aWNlcyhbMHgxMCwgMHgzMCwgMHgyMywgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiQSNcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoWzB4MTAsIDB4MzAsIDB4NDMsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkJcIjpcbiAgICAgICAgICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoWzB4MTAsIDB4MzAsIDB4NjMsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENsaWNrSGFuZGxlcl9TZXRCcmlnaHRuZXNzKGJyaWdodG5lc3NWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbWFuZCA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKGJyaWdodG5lc3NWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsxMCwgMHg0MCwgMHgwNCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMC4yNTpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsxMCwgMHg0MCwgMHgyNCwgMHgwNiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMC41OlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzEwLCAweDQwLCAweDQ0LCAweDBjLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAwLjc1OlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzEwLCAweDQwLCAweDY0LCAweDEyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxLjA6XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsxMCwgMHg0MCwgMHgwNCwgMHgxOSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgY29tbWFuZDogc2V0IGNvbG9yIG1vZGVcbiAgICAxMCA0MCAwMiAwMCAwMCAwMCAwMCAwMCAvLyByYWluYm93XG4gICAgMTAgNDAgMjIgMDAgMDAgMDAgMDAgMDAgLy8gc2luZ2xlIGNvbG9yIHNjYWxlXG4gICAgMTAgNDAgNDIgMDAgMDAgMDAgMDAgMDAgLy8gcGlhbm9cbiAgICAxMCA0MCA2MiAwMCAwMCAwMCAwMCAwMCAvLyBuaWdodFxuICAgICovXG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q2xpY2tIYW5kbGVyX1NldFNjYWxlVHlwZShyb290Tm90ZSkge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbW1hbmQgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoIChyb290Tm90ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaHJvbWF0aWNcIjpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDQyLCAweDA0LCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gY2hyb21hdGljXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWpvclwiOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIG1ham9yXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtaW5vclwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MjIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBtaW5vclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVudGF0b25pYy1uZXV0cmFsXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg2MiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIHBlbnRhdG9uaWMgbmV1dHJhbFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVudGF0b25pYy1tYWpvclwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MDIsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBwZW50YXRvbmljIG1ham9yXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwZW50YXRvbmljLW1pbm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgyMiwgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIHBlbnRhdG9uaWMgbWlub3JcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJsdWVzXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg0MiwgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIGJsdWVzXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoYXJtb25pYy1taW5vclwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBoYXJtb25pYyBtaW5vclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG9yaWFuXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg2MiwgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIGRvcmlhblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGhyeWdpYW5cIjpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDAyLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gcGhyeWdpYW5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImx5ZGlhblwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MjIsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBseWRpYW5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1peG9seWRpYW5cIjpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDQyLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gbWl4b2x5ZGlhblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9jcmlhblwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NjIsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBsb2NyaWFuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ3aG9sZS10b25lXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgwMiwgMHgwMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIHdob2xlIHRvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFyYWJpYy1hXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgyMiwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIGFyYWJpYyAoYSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFyYWJpYy1iXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg0MiwgMHgwMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIGFyYWJpYyAoYilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImphcGFuZXNlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg2MiwgMHgwMywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIGphcGFuZXNlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyeXVreXVcIjpcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDAyLCAweDA0LCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gcnl1a3l1XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCI4LXRvbmUtc3BhbmlzaFwiOlxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MjIsIDB4MDQsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyA4LXRvbmUgc3BhbmlzaFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRDb21tYW5kVG9BbGxEZXZpY2VzKGNvbW1hbmQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDbGlja0hhbmRsZXJfR2V0U2VyaWFsTnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvdXRwdXQgb2Ygb3V0cHV0cykge1xuICAgICAgICAgICAgICAgIG91dHB1dC5zZW5kU3lzZXgoUk9MSV9NQU5VRkFDVFVSRVJfSUQsIFsweDc4LCAweDNmXSk7IC8vIFFVRVJZIFNFUklBTCBOVU1CRVIgPT4gTEtCRDg0Q1dBOTVLS0o3VFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFNlbmRzIGEgTm90ZU9uIGFuZCB0aGVuIGEgTm90ZU9mZiBhZnRlciAxLjIgc2Vjb25kcy5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q2xpY2tIYW5kbGVyX0hpZ2hsaWdodChub3RlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG91dHB1dCBvZiBvdXRwdXRzKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnBsYXlOb3RlKG5vdGVOYW1lLCBcImFsbFwiLCB7IGR1cmF0aW9uOiAxMjAwIC8qIG1zICovIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFVua25vd24gY29tbWFuZDpcbiAgICAvLyAtIERFRklOSVRFTFkgTk9UIEJBVFRFUlkgTEVWRUxcbiAgICAvLyAwMSAwMyAwMFxuICAgIC8vIExVTUkgcmVzcG9uZHMgOCB0aW1lcyB3aXRoOlxuICAgIC8vICAgRjAgMDAgMjEgMTAgNzcgNDcgMDAgMDAgMDAgMDAgMjAgMDAgMDAgNkQgRjdcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q2xpY2tIYW5kbGVyX1Rlc3RYWFgxKCkge1xuICAgICAgICBjb25zdCBjb21tYW5kID0gWzB4MDEsIDB4MDMsIDB4MDBdO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgc2VuZENvbW1hbmRUb0FsbERldmljZXMoY29tbWFuZCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENsaWNrSGFuZGxlcl9UZXN0WFhYMigpIHtcbiAgICAgICAgLy8gRjAgMDAgMjEgMTAgNzcgMDAgMDEgMDEgMDAgNURcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3V0cHV0IG9mIG91dHB1dHMpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFJPTElfTUFOVUZBQ1RVUkVSX0lELCBbMHg3NywgMHgwNywgMHgxMCwgMHgwMiwgMHg0NF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTFVNSUtleXM7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./apps/shared/midi/LUMIKeys.ts\n");

/***/ })

})