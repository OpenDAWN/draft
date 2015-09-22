(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var LISTENERS = typeof Symbol !== "undefined" ? Symbol("LISTENERS") : "_@mohayonao/event-emitter:listeners";

function EventEmitter() {
  this[LISTENERS] = {};
}

EventEmitter.prototype.listeners = function(event) {
  if (this[LISTENERS].hasOwnProperty(event)) {
    return this[LISTENERS][event].map(function(listener) {
      return listener.listener || listener;
    }).reverse();
  }

  return [];
};

EventEmitter.prototype.addListener = function(event, listener) {
  if (typeof listener === "function") {
    if (!this[LISTENERS].hasOwnProperty(event)) {
      this[LISTENERS][event] = [ listener ];
    } else {
      this[LISTENERS][event].unshift(listener);
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(event, listener) {
  var _this, func;

  _this = this;

  if (typeof listener === "function") {
    func = function(arg1) {
      _this.removeListener(event, func);
      listener(arg1);
    };

    func.listener = listener;

    this.addListener(event, func);
  }

  return this;
};

EventEmitter.prototype.removeListener = function(event, listener) {
  var listeners, i;

  if (typeof listener === "function" && this[LISTENERS].hasOwnProperty(event)) {
    listeners = this[LISTENERS][event];

    for (i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === listener || listeners[i].listener === listener) {
        listeners.splice(i, 1);
        break;
      }
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(event) {
  if (typeof event === "undefined") {
    this[LISTENERS] = {};
  } else if (this[LISTENERS].hasOwnProperty(event)) {
    delete this[LISTENERS][event];
  }

  return this;
};

EventEmitter.prototype.emit = function(event, arg1) {
  var listeners, i;

  if (this[LISTENERS].hasOwnProperty(event)) {
    listeners = this[LISTENERS][event];

    for (i = listeners.length - 1; i >= 0; i--) {
      listeners[i](arg1);
    }
  }

  return this;
};

module.exports = EventEmitter;

},{}],2:[function(require,module,exports){
module.exports = function(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
};

},{}],3:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

},{}],4:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function decodeAudioData(file, successCallback, errorCallback) {
  var reader = new FileReader();

  reader.onloadend = function () {
    audioContext.decodeAudioData(reader.result, successCallback, errorCallback);
  };

  reader.readAsArrayBuffer(file);
}

exports["default"] = { decodeAudioData: decodeAudioData };
module.exports = exports["default"];

},{"@mohayonao/web-audio-utils/getAudioContext":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var Player = (function () {
  function Player() {
    _classCallCheck(this, Player);

    this.audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
    this.bufSrc = null;
    this.gain = null;
  }

  _createClass(Player, [{
    key: "start",
    value: function start(audioBuffer, marker) {
      var _this = this;

      var duration = marker.end - marker.begin;
      var t0 = this.audioContext.currentTime;
      var t1 = t0 + duration;

      this.bufSrc = this.audioContext.createBufferSource();
      this.gain = this.audioContext.createGain();

      this.bufSrc.buffer = audioBuffer;
      this.bufSrc.start(t0, marker.begin, duration);
      this.bufSrc.stop(t1);
      this.bufSrc.onended = function () {
        _this.stop();
      };
      this.bufSrc.connect(this.gain);

      this.gain.gain.value = 0.25;
      this.gain.connect(this.audioContext.destination);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.bufSrc !== null) {
        this.bufSrc.disconnect();
      }
      if (this.gain !== null) {
        this.gain.disconnect();
      }
      this.bufSrc = null;
      this.gain = null;
    }
  }]);

  return Player;
})();

exports["default"] = Player;
module.exports = exports["default"];

},{"@mohayonao/web-audio-utils/getAudioContext":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var N = 16;
var SILENT = 0;
var EXISTS = 1;

function findMarkers(audioBuffer) {
  var samples = audioBuffer.getChannelData(0);
  var sampleRate = audioBuffer.sampleRate;
  var checks = [];
  var result = [];
  var temp = new Float32Array(N);
  var state = SILENT;

  for (var i = 0, imax = samples.length; i < imax; i++) {
    temp[i % N] = samples[i];

    if (state === SILENT && isExists(temp)) {
      checks.push(i);
      state = EXISTS;
    } else if (state === EXISTS) {
      var elapsed = (i - checks[checks.length - 1]) / sampleRate;

      if (2 <= elapsed && isSilent(temp)) {
        checks.push(i);
        state = SILENT;
      }
    }
  }

  for (var i = 0, imax = checks.length - 1; i < imax; i += 2) {
    result.push({
      begin: checks[i] / audioBuffer.sampleRate,
      end: checks[i + 1] / audioBuffer.sampleRate
    });
  }

  return result;
}

function isExists(temp) {
  var count = 0;

  for (var i = 0, imax = temp.length; i < imax; i++) {
    if (temp[i] !== 0) {
      count += 1;
    }
  }

  return 16 <= count;
}

function isSilent(temp) {
  for (var i = 0, imax = temp.length; i < imax; i++) {
    if (temp[i] !== 0) {
      return false;
    }
  }

  return true;
}

exports["default"] = { findMarkers: findMarkers };
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mohayonaoEventEmitter = require("@mohayonao/event-emitter");

var _mohayonaoEventEmitter2 = _interopRequireDefault(_mohayonaoEventEmitter);

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var WaveViewer = (function (_EventEmitter) {
  _inherits(WaveViewer, _EventEmitter);

  function WaveViewer(canvas) {
    var _this = this;

    _classCallCheck(this, WaveViewer);

    _get(Object.getPrototypeOf(WaveViewer.prototype), "constructor", this).call(this);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.canvas = canvas;
    this.audioBuffer = null;
    this.imageData = null;
    this.markers = [];
    this.selected = null;
    this.mouse = null;

    canvas.addEventListener("mousedown", function (e) {
      if (_this.audioBuffer === null) {
        return;
      }
      _this.mouse = {
        x0: e.offsetX,
        y0: e.offsetY,
        x1: e.offsetX,
        y1: e.offsetY
      };
      _this.drawMarkers();
    });

    canvas.addEventListener("mousemove", function (e) {
      if (_this.mouse) {
        _this.mouse.x1 = e.offsetX;
        _this.mouse.y1 = e.offsetY;
        _this.drawMarkers();
      }
    });

    canvas.addEventListener("mouseup", function (e) {
      if (_this.audioBuffer === null) {
        return;
      }
      var begin = (0, _mohayonaoUtilsLinlin2["default"])(_this.mouse.x0, 0, _this.width, 0, _this.audioBuffer.duration);
      var end = (0, _mohayonaoUtilsLinlin2["default"])(e.offsetX, 0, _this.width, 0, _this.audioBuffer.duration);

      if (2 <= Math.abs(end - begin)) {
        _this.createNewMarker({ begin: begin, end: end });
      }

      _this.mouse = null;
      _this.drawMarkers();
    });
  }

  _createClass(WaveViewer, [{
    key: "draw",
    value: function draw(audioBuffer) {
      this.audioBuffer = audioBuffer;

      var context = this.canvas.getContext("2d");

      context.lineWidth = 0.25;
      context.strokeStyle = "#0f0";
      context.fillStyle = "#000";

      context.fillRect(0, 0, this.width, this.height);

      for (var ch = 0; ch < 2; ch++) {
        var samples = this.audioBuffer.getChannelData(ch);

        context.beginPath();

        for (var i = 0, imax = samples.length; i < imax; i++) {
          var x = i / imax * this.width;
          var y = (0, _mohayonaoUtilsLinlin2["default"])(samples[i], -1, 1, this.height * 0.5, 0);

          y += ch * this.height * 0.5;

          context.lineTo(x, y);
        }

        context.stroke();
      }

      this.imageData = context.getImageData(0, 0, this.width, this.height);
    }
  }, {
    key: "setMarkers",
    value: function setMarkers(markers) {
      if (this.audioBuffer === null) {
        return;
      }

      this.markers = markers;
      this.drawMarkers();
    }
  }, {
    key: "select",
    value: function select(selected) {
      this.selected = selected;
    }
  }, {
    key: "drawMarkers",
    value: function drawMarkers() {
      var _this2 = this;

      var duration = this.audioBuffer.duration;
      var context = this.canvas.getContext("2d");

      context.putImageData(this.imageData, 0, 0);

      this.markers.forEach(function (marker) {
        var x0 = (0, _mohayonaoUtilsLinlin2["default"])(marker.begin, 0, duration, 0, _this2.width);
        var x1 = (0, _mohayonaoUtilsLinlin2["default"])(marker.end, 0, duration, 0, _this2.width);

        var color = "rgba(192, 192, 192, 0.4)";

        if (_this2.selected && _this2.selected.begin === marker.begin) {
          color = "rgba(255, 192, 192, 0.8)";
        }
        context.fillStyle = color;

        context.fillRect(x0, 0, x1 - x0, _this2.height);
      });

      if (this.mouse) {
        context.fillStyle = "rgba(192, 192, 255, 0.6)";
        context.fillRect(this.mouse.x0, 0, this.mouse.x1 - this.mouse.x0, this.height);
      }
    }
  }, {
    key: "createNewMarker",
    value: function createNewMarker(_ref) {
      var begin = _ref.begin;
      var end = _ref.end;

      this.emit("new-marker", { begin: begin, end: end });
    }
  }, {
    key: "width",
    get: function get() {
      return this.canvas.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.canvas.height;
    }
  }]);

  return WaveViewer;
})(_mohayonaoEventEmitter2["default"]);

exports["default"] = WaveViewer;
module.exports = exports["default"];

},{"@mohayonao/event-emitter":1,"@mohayonao/utils/linlin":3}],9:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _AudioConverter = require("./AudioConverter");

var _AudioConverter2 = _interopRequireDefault(_AudioConverter);

var _WaveViewer = require("./WaveViewer");

var _WaveViewer2 = _interopRequireDefault(_WaveViewer);

var _WaveDetector = require("./WaveDetector");

var _WaveDetector2 = _interopRequireDefault(_WaveDetector);

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _mohayonaoUtilsConstrain = require("@mohayonao/utils/constrain");

var _mohayonaoUtilsConstrain2 = _interopRequireDefault(_mohayonaoUtilsConstrain);

var KEYUP = 38;
var KEYDOWN = 40;
var MAX_NODE_ID = 3;

global.onload = function () {
  var waveViewer = new _WaveViewer2["default"](document.getElementById("canvas"));
  var player = new _Player2["default"]();

  var app = new Vue({
    el: "#app",
    data: {
      message: "drop a *.wav file",
      markers: [],
      command: 1
    },
    computed: {
      json: {
        get: function get() {
          var _this = this;

          return JSON.stringify(this.markers.map(function (marker) {
            return {
              time: +marker.begin,
              command: +_this.command,
              noteType: +marker.noteType,
              nodeId: +marker.nodeId
            };
          }), null, 2);
        }
      }
    },
    methods: {
      setAudioBuffer: function setAudioBuffer(audioBuffer) {
        player.audioBuffer = audioBuffer;
        this.markers = _WaveDetector2["default"].findMarkers(player.audioBuffer).map(function (_ref) {
          var begin = _ref.begin;
          var end = _ref.end;

          return { begin: begin, end: end, noteType: convertToNoteTypeFromDuration(end - begin), nodeId: 0 };
        });

        waveViewer.draw(player.audioBuffer);
        waveViewer.setMarkers(this.markers);

        app.message = "ready";
      },
      preview: function preview() {
        if (this.selected) {
          player.stop();
          player.start(player.audioBuffer, this.selected);
        }
      },
      stop: function stop() {
        player.stop();
      },
      createNewLabel: function createNewLabel(_ref2) {
        var begin = _ref2.begin;
        var end = _ref2.end;

        this.markers.push({ begin: begin, end: end, noteType: 0, nodeId: 0 });
        this.onChange();
      },
      selectWith: function selectWith(index) {
        if (this.markers[index]) {
          this.selected = this.markers[index];
          waveViewer.select(this.selected);
          waveViewer.drawMarkers();
        }
      },
      removeWith: function removeWith(index) {
        if (this.markers[index] === this.selected) {
          this.selected = null;
          waveViewer.select(this.selected);
        }
        this.markers.$remove(index);
        waveViewer.drawMarkers();
      },
      onChange: function onChange() {
        this.markers.forEach(function (marker) {
          if (marker.end < marker.begin) {
            var _ref3 = [marker.end, marker.begin];
            marker.begin = _ref3[0];
            marker.end = _ref3[1];
          }
          marker.noteType = convertToNoteTypeFromDuration(marker.end - marker.begin);
        });
        this.markers.sort(function (a, b) {
          return a.begin - b.begin;
        });

        waveViewer.drawMarkers();
      },
      onKeydown: function onKeydown(e, index, type) {
        var duration = player.audioBuffer.duration;

        if (e.keyCode === KEYUP) {
          if (type === "begin" || type === "end") {
            this.markers[index][type] = (0, _mohayonaoUtilsConstrain2["default"])(+this.markers[index][type] + 0.05, 0, duration);
            this.onChange();
          }
          if (type === "nodeId") {
            this.markers[index][type] = (0, _mohayonaoUtilsConstrain2["default"])(+this.markers[index][type] + 1, 0, MAX_NODE_ID);
          }
        }
        if (e.keyCode === KEYDOWN) {
          if (type === "begin" || type === "end") {
            this.markers[index][type] = (0, _mohayonaoUtilsConstrain2["default"])(+this.markers[index][type] - 0.05, 0, duration);
            this.onChange();
          }
          if (type === "nodeId") {
            this.markers[index][type] = (0, _mohayonaoUtilsConstrain2["default"])(this.markers[index][type] - 1, 0, MAX_NODE_ID);
          }
        }
      }
    }
  });

  function convertToNoteTypeFromDuration(duration) {
    if (duration < 8) {
      return 0;
    }
    if (duration < 16) {
      return 1;
    }
    return 2;
  }

  waveViewer.on("new-marker", function (_ref4) {
    var begin = _ref4.begin;
    var end = _ref4.end;

    app.createNewLabel({ begin: begin, end: end });
  });

  window.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);

  window.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var file = e.dataTransfer.files[0];

    if (/^audio\/(?:x-aiff|x-wav|aiff|wav|wave)$/.test(file.type)) {
      app.message = "loading...";
      _AudioConverter2["default"].decodeAudioData(file, function (audioBuffer) {
        app.setAudioBuffer(audioBuffer);
      }, function (e) {
        app.message = String(e);
      });
    }
  }, false);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioConverter":5,"./Player":6,"./WaveDetector":7,"./WaveViewer":8,"@mohayonao/utils/constrain":2}]},{},[9]);
