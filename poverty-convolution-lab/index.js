(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

},{}],2:[function(require,module,exports){
var getAudioContext = require("./getAudioContext");

module.exports = function(array, audioContext) {
  var buffer;

  audioContext = audioContext || getAudioContext();
  buffer = audioContext.createBuffer(array.length, array[0].length, audioContext.sampleRate);

  array.forEach(function(data, i) {
    buffer.getChannelData(i).set(data);
  });

  return buffer;
};

},{"./getAudioContext":4}],3:[function(require,module,exports){
(function (global){
var getAudioContext = require("./getAudioContext");

module.exports = function(path, audioContext) {
  audioContext = audioContext || getAudioContext();

  return new Promise(function(resolve, reject) {
    global.fetch(path).then(function(res) {
      return res.arrayBuffer();
    }).then(function(audioData) {
      audioContext.decodeAudioData(audioData, resolve, reject);
    });
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getAudioContext":4}],4:[function(require,module,exports){
(function (global){
var audioContext = null;

if (typeof global.AudioContext === "undefined" && typeof global.webkitAudioContext !== "undefined") {
  global.AudioContext = global.webkitAudioContext;
}
if (typeof global.OfflineAudioContext === "undefined" && typeof global.webkitOfflineAudioContext !== "undefined") {
  global.OfflineAudioContext = global.webkitOfflineAudioContext;
}

module.exports = function() {
  if (audioContext === null) {
    audioContext = new global.AudioContext();
  }
  return audioContext;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["decay", "gate-reverb", "fish-born", "noise"];
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsFetchAudioBuffer = require("@mohayonao/web-audio-utils/fetchAudioBuffer");

var _mohayonaoWebAudioUtilsFetchAudioBuffer2 = _interopRequireDefault(_mohayonaoWebAudioUtilsFetchAudioBuffer);

var _mohayonaoWebAudioUtilsCreateAudioBufferFromArray = require("@mohayonao/web-audio-utils/createAudioBufferFromArray");

var _mohayonaoWebAudioUtilsCreateAudioBufferFromArray2 = _interopRequireDefault(_mohayonaoWebAudioUtilsCreateAudioBufferFromArray);

var amenBuffer = null;
var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
var memo = [];

(0, _mohayonaoWebAudioUtilsFetchAudioBuffer2["default"])("amen.wav", audioContext).then(function (audioBuffer) {
  amenBuffer = audioBuffer;
});

function _play(impulseResponse) {
  var bufSrc = audioContext.createBufferSource();

  bufSrc.buffer = (0, _mohayonaoWebAudioUtilsCreateAudioBufferFromArray2["default"])(impulseResponse);

  bufSrc.start(audioContext.currentTime);
  bufSrc.stop(audioContext.currentTime + amenBuffer.duration);
  bufSrc.onended = function () {
    bufSrc.disconnect();
    memo.splice(memo.indexOf(bufSrc), 1);
  };
  memo.push(bufSrc);

  bufSrc.connect(audioContext.destination);
}

function _apply(impulseResponse) {
  var bufSrc = audioContext.createBufferSource();
  var reverb = audioContext.createConvolver();

  bufSrc.buffer = amenBuffer;
  reverb.buffer = (0, _mohayonaoWebAudioUtilsCreateAudioBufferFromArray2["default"])(impulseResponse);

  bufSrc.start(audioContext.currentTime);
  bufSrc.stop(audioContext.currentTime + amenBuffer.duration);
  bufSrc.onended = function () {
    bufSrc.disconnect();
    memo.splice(memo.indexOf(bufSrc), 1);
  };
  memo.push(bufSrc);

  bufSrc.connect(reverb);
  reverb.connect(audioContext.destination);
}

exports["default"] = {
  play: function play() {
    _play.apply(undefined, arguments);
  },
  apply: function apply() {
    _apply.apply(undefined, arguments);
  }
};
module.exports = exports["default"];

},{"@mohayonao/web-audio-utils/createAudioBufferFromArray":2,"@mohayonao/web-audio-utils/fetchAudioBuffer":3,"@mohayonao/web-audio-utils/getAudioContext":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var canvas = document.getElementById("canvas");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function _draw(impulseResponse) {
  var context = canvas.getContext("2d");

  context.fillStyle = "#2c3e50";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2ecc71";
  context.strokeStyle = "#bdc3c7";

  context.lineWidth = Math.pow(2, -6);

  impulseResponse.forEach(function (data, ch) {
    context.beginPath();

    var width = canvas.width;
    var height = canvas.height / impulseResponse.length;

    for (var i = 0, imax = data.length; i < imax; i++) {
      var x = (0, _mohayonaoUtilsLinlin2["default"])(i, 0, imax, 0, width);
      var y = (0, _mohayonaoUtilsLinlin2["default"])(data[i], +1, -1, height * ch, height * ch + height);

      context.lineTo(x, y);
    }

    context.stroke();
  });
}

exports["default"] = Object.defineProperties({
  draw: function draw() {
    _draw.apply(undefined, arguments);
  }
}, {
  width: {
    get: function get() {
      return canvas.width;
    },
    configurable: true,
    enumerable: true
  },
  height: {
    get: function get() {
      return canvas.height;
    },
    configurable: true,
    enumerable: true
  }
});
module.exports = exports["default"];

},{"@mohayonao/utils/linlin":1}],8:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _viewer = require("./viewer");

var _viewer2 = _interopRequireDefault(_viewer);

var _player = require("./player");

var _player2 = _interopRequireDefault(_player);

var _gens = require("./gens");

var _gens2 = _interopRequireDefault(_gens);

if (typeof global.window !== "undefined") {
  global.window.module = {};
}

global.onload = function () {
  var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
  var amenBuffer = null;

  function fetchSourceCode(name) {
    return fetch("gens/" + name + ".js").then(function (res) {
      return res.text();
    }).then(function (text) {
      return eval.call(null, text);
    });
  }

  new Vue({
    el: "#app",
    data: {
      gens: _gens2["default"],
      selectedGen: _gens2["default"][0] || "",
      code: "",
      impulseResponse: new Float32Array(0)
    },
    methods: {
      update: function update() {
        var _this = this;

        return fetch("gens/" + this.selectedGen + ".js").then(function (res) {
          return res.text();
        }).then(function (text) {
          _this.code = text;

          return eval.call(null, text);
        }).then(function (func) {
          setTimeout(function () {
            _this.impulseResponse = func(audioContext.sampleRate);
            _viewer2["default"].draw(_this.impulseResponse);
          }, 0);
        });
      },
      play: function play() {
        _player2["default"].play(this.impulseResponse);
      },
      apply: function apply() {
        _player2["default"].apply(this.impulseResponse);
      },
      onChange: function onChange() {
        this.update();
      }
    }
  }).update();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./gens":5,"./player":6,"./viewer":7,"@mohayonao/web-audio-utils/getAudioContext":4}]},{},[8]);
