webpackHotUpdate_N_E("pages/midi",{

/***/ "./apps/shared/midi/LUMIKeys.ts":
/*!**************************************!*\
  !*** ./apps/shared/midi/LUMIKeys.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {var LUMIKeys;\n\n(function (_LUMIKeys) {\n  var ROLI_MANUFACTURER_ID = [0x00, 0x21, 0x10];\n  var outputDevices = null;\n\n  function createChecksum(values) {\n    var sum = values.length;\n\n    for (var i = 0; i < values.length; i++) {\n      sum = sum * 3 + values[i] & 0xff;\n    }\n\n    return sum & 0x7f;\n  } // github user benob has a different device ID:\n  // [0x77, 0x37].concat(values).concat([checksum(values)]);\n  // We should allow the user of this page to customize the device ID.\n  // Maybe 0x37 was the kickstarter version of LUMI? How do we query the device ID?\n\n\n  var DEVICE_ID = 0x07;\n\n  var sendLUMICommand = function sendLUMICommand(command) {\n    var commandWithHeader = [0x77, DEVICE_ID].concat(command);\n    var checksum = createChecksum(command);\n    var commandWithHeaderAndCheckSum = commandWithHeader.concat(checksum);\n    output.sendSysex(ROLI_MANUFACTURER_ID, commandWithHeaderAndCheckSum);\n  }; // https://github.com/benob/LUMI-lights/blob/master/SYSEX.txt\n  // 0x07 is the device ID?\n\n\n  var onClickLUMISetScaleRoot = function onClickLUMISetScaleRoot(rootNote) {\n    switch (rootNote) {\n      case \"C\":\n      default:\n        sendLUMICommand([0x10, 0x30, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"C#\":\n        sendLUMICommand([0x10, 0x30, 0x23, 0x00, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"D\":\n        sendLUMICommand([0x10, 0x30, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"D#\":\n        sendLUMICommand([0x10, 0x30, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"E\":\n        sendLUMICommand([0x10, 0x30, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"F\":\n        sendLUMICommand([0x10, 0x30, 0x23, 0x01, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"F#\":\n        sendLUMICommand([0x10, 0x30, 0x43, 0x01, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"G\":\n        sendLUMICommand([0x10, 0x30, 0x63, 0x01, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"G#\":\n        sendLUMICommand([0x10, 0x30, 0x03, 0x02, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"A\":\n        sendLUMICommand([0x10, 0x30, 0x23, 0x02, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"A#\":\n        sendLUMICommand([0x10, 0x30, 0x43, 0x02, 0x00, 0x00, 0x00, 0x00]);\n        break;\n\n      case \"B\":\n        sendLUMICommand([0x10, 0x30, 0x63, 0x02, 0x00, 0x00, 0x00, 0x00]);\n        break;\n    }\n  };\n  /*\n  \n  Add Brightness Toggles.\n  BRIGHTNESS\n  10 40 04 00 00 00 00 00 // 0%\n  10 40 24 06 00 00 00 00 // 25%\n  10 40 44 0C 00 00 00 00 // 50%\n  10 40 64 12 00 00 00 00 // 75%\n  10 40 04 19 00 00 00 00 // 100%\n  */\n\n  /*\n  command: set color mode\n  10 40 02 00 00 00 00 00 // rainbow\n  10 40 22 00 00 00 00 00 // single color scale\n  10 40 42 00 00 00 00 00 // piano\n  10 40 62 00 00 00 00 00 // night\n  */\n\n\n  var onClickLUMISetScaleType = function onClickLUMISetScaleType(rootNote) {\n    var command = null;\n\n    switch (rootNote) {\n      case \"chromatic\":\n        command = [0x10, 0x60, 0x42, 0x04, 0x00, 0x00, 0x00, 0x00]; // chromatic\n\n        break;\n\n      case \"major\":\n      default:\n        command = [0x10, 0x60, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00]; // major\n\n        break;\n\n      case \"minor\":\n        command = [0x10, 0x60, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00]; // minor\n\n        break;\n\n      case \"pentatonic-neutral\":\n        command = [0x10, 0x60, 0x62, 0x00, 0x00, 0x00, 0x00, 0x00]; // pentatonic neutral\n\n        break;\n\n      case \"pentatonic-major\":\n        command = [0x10, 0x60, 0x02, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic major\n\n        break;\n\n      case \"pentatonic-minor\":\n        command = [0x10, 0x60, 0x22, 0x01, 0x00, 0x00, 0x00, 0x00]; // pentatonic minor\n\n        break;\n\n      case \"blues\":\n        command = [0x10, 0x60, 0x42, 0x01, 0x00, 0x00, 0x00, 0x00]; // blues\n\n        break;\n\n      case \"harmonic-minor\":\n        command = [0x10, 0x60, 0x42, 0x00, 0x00, 0x00, 0x00, 0x00]; // harmonic minor\n\n        break;\n\n      case \"dorian\":\n        command = [0x10, 0x60, 0x62, 0x01, 0x00, 0x00, 0x00, 0x00]; // dorian\n\n        break;\n\n      case \"phrygian\":\n        command = [0x10, 0x60, 0x02, 0x02, 0x00, 0x00, 0x00, 0x00]; // phrygian\n\n        break;\n\n      case \"lydian\":\n        command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // lydian\n\n        break;\n\n      case \"mixolydian\":\n        command = [0x10, 0x60, 0x42, 0x02, 0x00, 0x00, 0x00, 0x00]; // mixolydian\n\n        break;\n\n      case \"locrian\":\n        command = [0x10, 0x60, 0x62, 0x02, 0x00, 0x00, 0x00, 0x00]; // locrian\n\n        break;\n\n      case \"whole-tone\":\n        command = [0x10, 0x60, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00]; // whole tone\n\n        break;\n\n      case \"arabic-a\":\n        command = [0x10, 0x60, 0x22, 0x02, 0x00, 0x00, 0x00, 0x00]; // arabic (a)\n\n        break;\n\n      case \"arabic-b\":\n        command = [0x10, 0x60, 0x42, 0x03, 0x00, 0x00, 0x00, 0x00]; // arabic (b)\n\n        break;\n\n      case \"japanese\":\n        command = [0x10, 0x60, 0x62, 0x03, 0x00, 0x00, 0x00, 0x00]; // japanese\n\n        break;\n\n      case \"ryukyu\":\n        command = [0x10, 0x60, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00]; // ryukyu\n\n        break;\n\n      case \"8-tone-spanish\":\n        command = [0x10, 0x60, 0x22, 0x04, 0x00, 0x00, 0x00, 0x00]; // 8-tone spanish\n\n        break;\n    }\n\n    sendLUMICommand(command);\n  };\n\n  var onClickLUMISerial = function onClickLUMISerial() {\n    output.sendSysex(ROLI_MANUFACTURER_ID, [0x78, 0x3f]); // QUERY SERIAL NUMBER => LKBD84CWA95KKJ7T\n  }; // Unknown command:\n  // - DEFINITELY NOT BATTERY LEVEL\n  // 01 03 00\n  // LUMI responds 8 times with:\n  //   F0 00 21 10 77 47 00 00 00 00 20 00 00 6D F7\n\n\n  var onClickLUMICheck_XXX1 = function onClickLUMICheck_XXX1() {\n    var command = [0x01, 0x03, 0x00];\n    sendLUMICommand(command);\n  };\n\n  var onClickLUMITest = function onClickLUMITest() {\n    output.sendSysex(ROLI_MANUFACTURER_ID, [0x77, 0x07, 0x10, 0x02, 0x44]);\n  };\n\n  function getClickHandler_Play(noteName) {\n    return function () {\n      output.playNote(noteName, \"all\", {\n        duration: 2000\n      });\n    };\n  }\n\n  _LUMIKeys.getClickHandler_Play = getClickHandler_Play;\n})(LUMIKeys || (LUMIKeys = {}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LUMIKeys);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwcy9zaGFyZWQvbWlkaS9MVU1JS2V5cy50cz8yOTNlIl0sIm5hbWVzIjpbIlJPTElfTUFOVUZBQ1RVUkVSX0lEIiwib3V0cHV0RGV2aWNlcyIsImNyZWF0ZUNoZWNrc3VtIiwidmFsdWVzIiwic3VtIiwibGVuZ3RoIiwiaSIsIkRFVklDRV9JRCIsInNlbmRMVU1JQ29tbWFuZCIsImNvbW1hbmQiLCJjb21tYW5kV2l0aEhlYWRlciIsImNvbmNhdCIsImNoZWNrc3VtIiwiY29tbWFuZFdpdGhIZWFkZXJBbmRDaGVja1N1bSIsIm91dHB1dCIsInNlbmRTeXNleCIsIm9uQ2xpY2tMVU1JU2V0U2NhbGVSb290Iiwicm9vdE5vdGUiLCJvbkNsaWNrTFVNSVNldFNjYWxlVHlwZSIsIm9uQ2xpY2tMVU1JU2VyaWFsIiwib25DbGlja0xVTUlDaGVja19YWFgxIiwib25DbGlja0xVTUlUZXN0IiwiZ2V0Q2xpY2tIYW5kbGVyX1BsYXkiLCJub3RlTmFtZSIsInBsYXlOb3RlIiwiZHVyYXRpb24iLCJMVU1JS2V5cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUdJLE1BQU1BLG9CQUFvQixHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQTdCO0FBRUEsTUFBSUMsYUFBb0IsR0FBRyxJQUEzQjs7QUFFQSxXQUFTQyxjQUFULENBQXdCQyxNQUF4QixFQUFnQztBQUM1QixRQUFJQyxHQUFHLEdBQUdELE1BQU0sQ0FBQ0UsTUFBakI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxNQUFNLENBQUNFLE1BQTNCLEVBQW1DQyxDQUFDLEVBQXBDLEVBQXdDO0FBQ3BDRixTQUFHLEdBQUlBLEdBQUcsR0FBRyxDQUFOLEdBQVVELE1BQU0sQ0FBQ0csQ0FBRCxDQUFqQixHQUF3QixJQUE5QjtBQUNIOztBQUNELFdBQU9GLEdBQUcsR0FBRyxJQUFiO0FBQ0gsRyxDQUVEO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxNQUFNRyxTQUFTLEdBQUcsSUFBbEI7O0FBQ0EsTUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxPQUFELEVBQWE7QUFDakMsUUFBTUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFELEVBQU9ILFNBQVAsRUFBa0JJLE1BQWxCLENBQXlCRixPQUF6QixDQUExQjtBQUNBLFFBQU1HLFFBQVEsR0FBR1YsY0FBYyxDQUFDTyxPQUFELENBQS9CO0FBQ0EsUUFBTUksNEJBQTRCLEdBQUdILGlCQUFpQixDQUFDQyxNQUFsQixDQUF5QkMsUUFBekIsQ0FBckM7QUFDQUUsVUFBTSxDQUFDQyxTQUFQLENBQWlCZixvQkFBakIsRUFBdUNhLDRCQUF2QztBQUNILEdBTEQsQyxDQU9BO0FBQ0E7OztBQUNBLE1BQU1HLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ0MsUUFBRCxFQUFjO0FBQzFDLFlBQVFBLFFBQVI7QUFDSSxXQUFLLEdBQUw7QUFDQTtBQUNJVCx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssSUFBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUssR0FBTDtBQUNJQSx1QkFBZSxDQUFDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLENBQUQsQ0FBZjtBQUNBOztBQUNKLFdBQUss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LEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDMUJQLFVBQU0sQ0FBQ0MsU0FBUCxDQUFpQmYsb0JBQWpCLEVBQXVDLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQXZDO0FBQ0gsR0FGRDs7QUFJTyxXQUFTc0Isb0JBQVQsQ0FBOEJDLFFBQTlCLEVBQWdEO0FBQ25ELFdBQU8sWUFBTTtBQUNUVCxZQUFNLENBQUNVLFFBQVAsQ0FBZ0JELFFBQWhCLEVBQTBCLEtBQTFCLEVBQWlDO0FBQUVFLGdCQUFRLEVBQUU7QUFBWixPQUFqQztBQUNILEtBRkQ7QUFHSDs7O0dBL0tLQyxRLEtBQUFBLFE7O0FBa0xLQSx1RUFBZiIsImZpbGUiOiIuL2FwcHMvc2hhcmVkL21pZGkvTFVNSUtleXMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViTWlkaSBmcm9tIFwid2VibWlkaVwiO1xuXG5uYW1lc3BhY2UgTFVNSUtleXMge1xuICAgIGNvbnN0IFJPTElfTUFOVUZBQ1RVUkVSX0lEID0gWzB4MDAsIDB4MjEsIDB4MTBdO1xuXG4gICAgbGV0IG91dHB1dERldmljZXM6IGFueVtdID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNoZWNrc3VtKHZhbHVlcykge1xuICAgICAgICBsZXQgc3VtID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSA9IChzdW0gKiAzICsgdmFsdWVzW2ldKSAmIDB4ZmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSAmIDB4N2Y7XG4gICAgfVxuXG4gICAgLy8gZ2l0aHViIHVzZXIgYmVub2IgaGFzIGEgZGlmZmVyZW50IGRldmljZSBJRDpcbiAgICAvLyBbMHg3NywgMHgzN10uY29uY2F0KHZhbHVlcykuY29uY2F0KFtjaGVja3N1bSh2YWx1ZXMpXSk7XG4gICAgLy8gV2Ugc2hvdWxkIGFsbG93IHRoZSB1c2VyIG9mIHRoaXMgcGFnZSB0byBjdXN0b21pemUgdGhlIGRldmljZSBJRC5cbiAgICAvLyBNYXliZSAweDM3IHdhcyB0aGUga2lja3N0YXJ0ZXIgdmVyc2lvbiBvZiBMVU1JPyBIb3cgZG8gd2UgcXVlcnkgdGhlIGRldmljZSBJRD9cbiAgICBjb25zdCBERVZJQ0VfSUQgPSAweDA3O1xuICAgIGNvbnN0IHNlbmRMVU1JQ29tbWFuZCA9IChjb21tYW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRXaXRoSGVhZGVyID0gWzB4NzcsIERFVklDRV9JRF0uY29uY2F0KGNvbW1hbmQpO1xuICAgICAgICBjb25zdCBjaGVja3N1bSA9IGNyZWF0ZUNoZWNrc3VtKGNvbW1hbmQpO1xuICAgICAgICBjb25zdCBjb21tYW5kV2l0aEhlYWRlckFuZENoZWNrU3VtID0gY29tbWFuZFdpdGhIZWFkZXIuY29uY2F0KGNoZWNrc3VtKTtcbiAgICAgICAgb3V0cHV0LnNlbmRTeXNleChST0xJX01BTlVGQUNUVVJFUl9JRCwgY29tbWFuZFdpdGhIZWFkZXJBbmRDaGVja1N1bSk7XG4gICAgfTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5vYi9MVU1JLWxpZ2h0cy9ibG9iL21hc3Rlci9TWVNFWC50eHRcbiAgICAvLyAweDA3IGlzIHRoZSBkZXZpY2UgSUQ/XG4gICAgY29uc3Qgb25DbGlja0xVTUlTZXRTY2FsZVJvb3QgPSAocm9vdE5vdGUpID0+IHtcbiAgICAgICAgc3dpdGNoIChyb290Tm90ZSkge1xuICAgICAgICAgICAgY2FzZSBcIkNcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDAzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQyNcIjpcbiAgICAgICAgICAgICAgICBzZW5kTFVNSUNvbW1hbmQoWzB4MTAsIDB4MzAsIDB4MjMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJEXCI6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDQzLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRCNcIjpcbiAgICAgICAgICAgICAgICBzZW5kTFVNSUNvbW1hbmQoWzB4MTAsIDB4MzAsIDB4NjMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJFXCI6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDAzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRlwiOlxuICAgICAgICAgICAgICAgIHNlbmRMVU1JQ29tbWFuZChbMHgxMCwgMHgzMCwgMHgyMywgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkYjXCI6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDQzLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiR1wiOlxuICAgICAgICAgICAgICAgIHNlbmRMVU1JQ29tbWFuZChbMHgxMCwgMHgzMCwgMHg2MywgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkcjXCI6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDAzLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQVwiOlxuICAgICAgICAgICAgICAgIHNlbmRMVU1JQ29tbWFuZChbMHgxMCwgMHgzMCwgMHgyMywgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkEjXCI6XG4gICAgICAgICAgICAgICAgc2VuZExVTUlDb21tYW5kKFsweDEwLCAweDMwLCAweDQzLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQlwiOlxuICAgICAgICAgICAgICAgIHNlbmRMVU1JQ29tbWFuZChbMHgxMCwgMHgzMCwgMHg2MywgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgXG4gICAgQWRkIEJyaWdodG5lc3MgVG9nZ2xlcy5cbiAgICBCUklHSFRORVNTXG4gICAgMTAgNDAgMDQgMDAgMDAgMDAgMDAgMDAgLy8gMCVcbiAgICAxMCA0MCAyNCAwNiAwMCAwMCAwMCAwMCAvLyAyNSVcbiAgICAxMCA0MCA0NCAwQyAwMCAwMCAwMCAwMCAvLyA1MCVcbiAgICAxMCA0MCA2NCAxMiAwMCAwMCAwMCAwMCAvLyA3NSVcbiAgICAxMCA0MCAwNCAxOSAwMCAwMCAwMCAwMCAvLyAxMDAlXG4gICAgKi9cblxuICAgIC8qXG4gICAgY29tbWFuZDogc2V0IGNvbG9yIG1vZGVcbiAgICAxMCA0MCAwMiAwMCAwMCAwMCAwMCAwMCAvLyByYWluYm93XG4gICAgMTAgNDAgMjIgMDAgMDAgMDAgMDAgMDAgLy8gc2luZ2xlIGNvbG9yIHNjYWxlXG4gICAgMTAgNDAgNDIgMDAgMDAgMDAgMDAgMDAgLy8gcGlhbm9cbiAgICAxMCA0MCA2MiAwMCAwMCAwMCAwMCAwMCAvLyBuaWdodFxuICAgICovXG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVNldFNjYWxlVHlwZSA9IChyb290Tm90ZSkgPT4ge1xuICAgICAgICBsZXQgY29tbWFuZCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAocm9vdE5vdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjaHJvbWF0aWNcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NDIsIDB4MDQsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBjaHJvbWF0aWNcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtYWpvclwiOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBtYWpvclxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1pbm9yXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDIyLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gbWlub3JcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZW50YXRvbmljLW5ldXRyYWxcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NjIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBwZW50YXRvbmljIG5ldXRyYWxcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZW50YXRvbmljLW1ham9yXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDAyLCAweDAxLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gcGVudGF0b25pYyBtYWpvclxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBlbnRhdG9uaWMtbWlub3JcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MjIsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBwZW50YXRvbmljIG1pbm9yXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYmx1ZXNcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NDIsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBibHVlc1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhhcm1vbmljLW1pbm9yXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDQyLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gaGFybW9uaWMgbWlub3JcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3JpYW5cIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NjIsIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBkb3JpYW5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwaHJ5Z2lhblwiOlxuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgwMiwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIHBocnlnaWFuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibHlkaWFuXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDIyLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gbHlkaWFuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWl4b2x5ZGlhblwiOlxuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHg0MiwgMHgwMiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIG1peG9seWRpYW5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsb2NyaWFuXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDYyLCAweDAyLCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gbG9jcmlhblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIndob2xlLXRvbmVcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MDIsIDB4MDMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyB3aG9sZSB0b25lXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXJhYmljLWFcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4MjIsIDB4MDIsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBhcmFiaWMgKGEpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXJhYmljLWJcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NDIsIDB4MDMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBhcmFiaWMgKGIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiamFwYW5lc2VcIjpcbiAgICAgICAgICAgICAgICBjb21tYW5kID0gWzB4MTAsIDB4NjAsIDB4NjIsIDB4MDMsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBdOyAvLyBqYXBhbmVzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJ5dWt5dVwiOlxuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBbMHgxMCwgMHg2MCwgMHgwMiwgMHgwNCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMF07IC8vIHJ5dWt5dVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjgtdG9uZS1zcGFuaXNoXCI6XG4gICAgICAgICAgICAgICAgY29tbWFuZCA9IFsweDEwLCAweDYwLCAweDIyLCAweDA0LCAweDAwLCAweDAwLCAweDAwLCAweDAwXTsgLy8gOC10b25lIHNwYW5pc2hcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzZW5kTFVNSUNvbW1hbmQoY29tbWFuZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xpY2tMVU1JU2VyaWFsID0gKCkgPT4ge1xuICAgICAgICBvdXRwdXQuc2VuZFN5c2V4KFJPTElfTUFOVUZBQ1RVUkVSX0lELCBbMHg3OCwgMHgzZl0pOyAvLyBRVUVSWSBTRVJJQUwgTlVNQkVSID0+IExLQkQ4NENXQTk1S0tKN1RcbiAgICB9O1xuXG4gICAgLy8gVW5rbm93biBjb21tYW5kOlxuICAgIC8vIC0gREVGSU5JVEVMWSBOT1QgQkFUVEVSWSBMRVZFTFxuICAgIC8vIDAxIDAzIDAwXG4gICAgLy8gTFVNSSByZXNwb25kcyA4IHRpbWVzIHdpdGg6XG4gICAgLy8gICBGMCAwMCAyMSAxMCA3NyA0NyAwMCAwMCAwMCAwMCAyMCAwMCAwMCA2RCBGN1xuICAgIGNvbnN0IG9uQ2xpY2tMVU1JQ2hlY2tfWFhYMSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IFsweDAxLCAweDAzLCAweDAwXTtcbiAgICAgICAgc2VuZExVTUlDb21tYW5kKGNvbW1hbmQpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNsaWNrTFVNSVRlc3QgPSAoKSA9PiB7XG4gICAgICAgIG91dHB1dC5zZW5kU3lzZXgoUk9MSV9NQU5VRkFDVFVSRVJfSUQsIFsweDc3LCAweDA3LCAweDEwLCAweDAyLCAweDQ0XSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDbGlja0hhbmRsZXJfUGxheShub3RlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXQucGxheU5vdGUobm90ZU5hbWUsIFwiYWxsXCIsIHsgZHVyYXRpb246IDIwMDAgfSk7XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMVU1JS2V5cztcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./apps/shared/midi/LUMIKeys.ts\n");

/***/ })

})