(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

var EQ = function EQ(audioContext, paramList) {
  _classCallCheck(this, EQ);

  if (!Array.isArray(paramList) || paramList.length === 0) {
    paramList = [{}];
  }

  var filters = paramList.map(function (params) {
    var filter = audioContext.createBiquadFilter();

    filter.type = utils.filterType(params.type, "peaking");

    utils.setAudioParam(filter.frequency, utils.audioNode(params.frequency, 350));
    utils.setAudioParam(filter.detune, utils.audioNode(params.detune, 0));
    utils.setAudioParam(filter.Q, utils.audioNode(params.Q, 1));
    utils.setAudioParam(filter.gain, utils.audioNode(params.gain, 0));

    return filter;
  });

  if (2 <= filters.length) {
    (function () {
      for (var i = 0, imax = filters.length - 1; i < imax; i++) {
        filters[i].connect(filters[i + 1]);
      }

      var lastNode = filters[filters.length - 1];

      filters[0].connect = function () {
        lastNode.connect.apply(lastNode, arguments);
      };

      filters[0].disconnect = function () {
        lastNode.disconnect.apply(lastNode, arguments);
      };
    })();
  }

  filters[0].filters = filters;

  return filters[0];
};

exports["default"] = EQ;
module.exports = exports["default"];
},{"./utils":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _EQ = require("./EQ");

var _EQ2 = _interopRequireDefault(_EQ);

exports["default"] = _EQ2["default"];
module.exports = exports["default"];
},{"./EQ":2}],4:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterType = filterType;
exports.audioNode = audioNode;
exports.setAudioParam = setAudioParam;

function filterType(type, defaultValue) {
  return ({
    lowpass: "lowpass",
    highpass: "highpass",
    bandpass: "bandpass",
    lowshelf: "lowshelf",
    highshelf: "highshelf",
    peaking: "peaking",
    notch: "notch",
    allpass: "allpass",
    lpf: "lowpass",
    hpf: "highpass",
    bpf: "bandpass",
    apf: "allpass"
  })[String(type).toLowerCase()] || defaultValue;
}

function audioNode(node, defaultValue) {
  if (node instanceof global.AudioNode) {
    return node;
  }
  if (typeof node === "number" && isFinite(node)) {
    return node;
  }
  return defaultValue;
}

function setAudioParam(audioParam, value) {
  if (typeof value === "number") {
    audioParam.value = value;
  } else {
    audioParam.value = 0;
    value.connect(audioParam);
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./lib":9,"dup":1}],7:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mohayonaoEventEmitter = require("@mohayonao/event-emitter");

var _mohayonaoEventEmitter2 = _interopRequireDefault(_mohayonaoEventEmitter);

var _mohayonaoDefaults = require("@mohayonao/defaults");

var _mohayonaoDefaults2 = _interopRequireDefault(_mohayonaoDefaults);

var _defaultContext = require("./defaultContext");

var _defaultContext2 = _interopRequireDefault(_defaultContext);

var Timeline = (function (_EventEmitter) {
  _inherits(Timeline, _EventEmitter);

  function Timeline() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Timeline);

    _get(Object.getPrototypeOf(Timeline.prototype), "constructor", this).call(this);

    this.context = (0, _mohayonaoDefaults2["default"])(opts.context, _defaultContext2["default"]);
    this.interval = (0, _mohayonaoDefaults2["default"])(opts.interval, 0.025);
    this.aheadTime = (0, _mohayonaoDefaults2["default"])(opts.aheadTime, 0.1);
    this.timerAPI = (0, _mohayonaoDefaults2["default"])(opts.timerAPI, global);
    this.playbackTime = this.currentTime;

    this._timerId = 0;
    this._schedId = 0;
    this._events = [];
  }

  _createClass(Timeline, [{
    key: "start",
    value: function start(callback) {
      var _this = this;

      if (this._timerId === 0) {
        this._timerId = this.timerAPI.setInterval(function () {
          var t0 = _this.context.currentTime;
          var t1 = t0 + _this.aheadTime;

          _this._process(t0, t1);
        }, this.interval * 1000);

        this.emit("start");
      }

      if (callback) {
        this.insert(this.context.currentTime, callback);
      }

      return this;
    }
  }, {
    key: "stop",
    value: function stop(reset) {
      if (this._timerId !== 0) {
        this.timerAPI.clearInterval(this._timerId);
        this._timerId = 0;

        this.emit("stop");
      }

      if (reset) {
        this._events.splice(0);
      }

      return this;
    }
  }, {
    key: "insert",
    value: function insert(time, callback, args) {
      var id = ++this._schedId;
      var event = { id: id, time: time, callback: callback, args: args };
      var events = this._events;

      if (events.length === 0 || events[events.length - 1].time <= time) {
        events.push(event);
      } else {
        for (var i = 0, imax = events.length; i < imax; i++) {
          if (time < events[i].time) {
            events.splice(i, 0, event);
            break;
          }
        }
      }

      return id;
    }
  }, {
    key: "nextTick",
    value: function nextTick(callback, args) {
      return this.insert(this.playbackTime + this.aheadTime, callback, args);
    }
  }, {
    key: "remove",
    value: function remove(schedId) {
      var events = this._events;

      if (typeof schedId === "number") {
        for (var i = 0, imax = events.length; i < imax; i++) {
          if (schedId === events[i].id) {
            events.splice(i, 1);
            break;
          }
        }
      }

      return schedId;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this._events.splice(0);
    }
  }, {
    key: "_process",
    value: function _process(t0, t1) {
      var events = this._events;

      this.playbackTime = t0;
      this.emit("process", { playbackTime: this.playbackTime });

      while (events.length && events[0].time < t1) {
        var _event = events.shift();
        var playbackTime = _event.time;
        var args = _event.args;

        this.playbackTime = playbackTime;

        _event.callback({ playbackTime: playbackTime, args: args });
      }

      this.playbackTime = t0;
      this.emit("processed", { playbackTime: this.playbackTime });
    }
  }, {
    key: "state",
    get: function get() {
      return this._timerId !== 0 ? "running" : "suspended";
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.context.currentTime;
    }
  }, {
    key: "events",
    get: function get() {
      return this._events.slice();
    }
  }]);

  return Timeline;
})(_mohayonaoEventEmitter2["default"]);

exports["default"] = Timeline;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./defaultContext":8,"@mohayonao/defaults":10,"@mohayonao/event-emitter":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Object.defineProperties({}, {
  currentTime: {
    get: function get() {
      return Date.now() / 1000;
    },
    configurable: true,
    enumerable: true
  }
});
module.exports = exports["default"];
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Timeline = require("./Timeline");

var _Timeline2 = _interopRequireDefault(_Timeline);

exports["default"] = _Timeline2["default"];
module.exports = exports["default"];
},{"./Timeline":7}],10:[function(require,module,exports){
module.exports = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

},{}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
module.exports = function(array, target) {
  var index = array.indexOf(target);

  if (index !== -1) {
    return false;
  }

  array.push(target);

  return true;
};

},{}],13:[function(require,module,exports){
module.exports = function(db) {
  return Math.pow(10, db * 0.05);
};

},{}],14:[function(require,module,exports){
module.exports = function(start, stop, step) {
  var length, result;
  var i;

  if (typeof stop === "undefined") {
    stop = start || 0;
    start = 0;
  }
  step = step || 1;

  length = Math.max(Math.ceil((stop - start) / step), 0);
  result = Array(length);

  for (i = 0; i < length; i++) {
    result[i] = start;
    start += step;
  }

  return result;
};

},{}],15:[function(require,module,exports){
module.exports = function(array, target) {
  var index = array.indexOf(target);

  if (index === -1) {
    return false;
  }

  array.splice(index, 1);

  return true;
};

},{}],16:[function(require,module,exports){
module.exports = function(array, rand) {
  rand = rand || Math.random;

  return array[(rand() * array.length)|0];
};

},{}],17:[function(require,module,exports){
var appendIfNotExists = require("@mohayonao/utils/appendIfNotExists");
var removeIfExists = require("@mohayonao/utils/removeIfExists");

var memo = [];

module.exports = {
  append: function(node) {
    appendIfNotExists(memo, node);
  },
  remove: function(node) {
    removeIfExists(memo, node);
  },
};

},{"@mohayonao/utils/appendIfNotExists":12,"@mohayonao/utils/removeIfExists":15}],18:[function(require,module,exports){
(function (global){
var getAudioContext = require("./getAudioContext");

function fetchWithXHR(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new global.XMLHttpRequest();

    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";

    xhr.onload = function() {
      resolve({
        arrayBuffer: function() {
          return xhr.response;
        },
      });
    };

    xhr.onerror = function() {
      // TODO: error object
      reject({});
    };

    xhr.send();
  });
}

module.exports = function(path, audioContext) {
  audioContext = audioContext || getAudioContext();

  return new Promise(function(resolve, reject) {
    fetchWithXHR(path).then(function(res) {
      return res.arrayBuffer();
    }).then(function(audioData) {
      audioContext.decodeAudioData(audioData, resolve, reject);
    });
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getAudioContext":19}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
(function (global){
"use strict";

if (!(global === global.window && global.URL && global.Blob && global.Worker)) {
  module.exports = global;
} else {
  module.exports = (function() {
    var TIMER_WORKER_SOURCE = [
      "var timerIds = {}, _ = {};",
      "_.setInterval = function(args) {",
      "  timerIds[args.timerId] = setInterval(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearInterval = function(args) {",
      "  clearInterval(timerIds[args.timerId]);",
      "};",
      "_.setTimeout = function(args) {",
      "  timerIds[args.timerId] = setTimeout(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearTimeout = function(args) {",
      "  clearTimeout(timerIds[args.timerId]);",
      "};",
      "onmessage = function(e) { _[e.data.type](e.data) };"
    ].join("");

    var _timerId = 0;
    var _callbacks = {};
    var _timer = new global.Worker(global.URL.createObjectURL(
      new global.Blob([ TIMER_WORKER_SOURCE ], { type: "text/javascript" })
    ));

    _timer.onmessage = function(e) {
      if (_callbacks[e.data]) {
        _callbacks[e.data]();
      }
    };

    return {
      setInterval: function(callback, delay) {
        _timerId += 1;

        _timer.postMessage({ type: "setInterval", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = callback;

        return _timerId;
      },
      setTimeout: function(callback, delay) {
        _timerId += 1;

        _timer.postMessage({ type: "setTimeout", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = callback;

        return _timerId;
      },
      clearInterval: function(timerId) {
        _timer.postMessage({ type: "clearInterval", timerId: timerId });
        _callbacks[timerId] = null;
      },
      clearTimeout: function(timerId) {
        _timer.postMessage({ type: "clearTimeout", timerId: timerId });
        _callbacks[timerId] = null;
      }
    };
  })();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
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

var _mohayonaoTimeline = require("@mohayonao/timeline");

var _mohayonaoTimeline2 = _interopRequireDefault(_mohayonaoTimeline);

var _workerTimer = require("worker-timer");

var _workerTimer2 = _interopRequireDefault(_workerTimer);

var _mohayonaoEq = require("@mohayonao/eq");

var _mohayonaoEq2 = _interopRequireDefault(_mohayonaoEq);

var _Track = require("./Track");

var _Track2 = _interopRequireDefault(_Track);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsFetchAudioBuffer = require("@mohayonao/web-audio-utils/fetchAudioBuffer");

var _mohayonaoWebAudioUtilsFetchAudioBuffer2 = _interopRequireDefault(_mohayonaoWebAudioUtilsFetchAudioBuffer);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsRemoveIfExists = require("@mohayonao/utils/removeIfExists");

var _mohayonaoUtilsRemoveIfExists2 = _interopRequireDefault(_mohayonaoUtilsRemoveIfExists);

var _mohayonaoUtilsDbamp = require("@mohayonao/utils/dbamp");

var _mohayonaoUtilsDbamp2 = _interopRequireDefault(_mohayonaoUtilsDbamp);

var _mohayonaoUtilsRange = require("@mohayonao/utils/range");

var _mohayonaoUtilsRange2 = _interopRequireDefault(_mohayonaoUtilsRange);

var _mohayonaoUtilsSample = require("@mohayonao/utils/sample");

var _mohayonaoUtilsSample2 = _interopRequireDefault(_mohayonaoUtilsSample);

var INTERVAL = 100;
var NUM_OF_INLETS = 8;

var instance = null;

var Player = (function (_EventEmitter) {
  _inherits(Player, _EventEmitter);

  function Player() {
    var _this = this;

    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this);

    this.audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
    this.timeline = new _mohayonaoTimeline2["default"]({ context: this.audioContext, timerAPI: _workerTimer2["default"] });

    this.outlet = this.audioContext.createConvolver();
    this.outlet.connect(this.audioContext.destination);

    this.inlets = (0, _mohayonaoUtilsRange2["default"])(NUM_OF_INLETS).map(function (i) {
      var eq = new _mohayonaoEq2["default"](_this.audioContext, [{ frequency: 518.33, gain: 30, Q: 14.103 }, { frequency: 533.49, gain: 30, Q: 12.126 }, { frequency: 662.42, gain: 30, Q: 40 }, { frequency: 673.16, gain: 28.19, Q: 40 }, { frequency: 1050.98, gain: 30, Q: 40 }, { frequency: 1368.8, gain: 30, Q: 40 }, { frequency: 1648.9, gain: 30, Q: 40 }, { frequency: 1672, gain: 25.12, Q: 40 }, { type: "hpf", frequency: 86.957, Q: 0.025 }, { type: "lpf", frequency: 2296.3, Q: 0.9 }]);
      var pan = _this.audioContext.createPanner();
      var x = Math.sin(i / NUM_OF_INLETS * Math.PI * 2) * 0.5;
      var y = 0;
      var z = Math.cos(i / NUM_OF_INLETS * Math.PI * 2) * 0.25;

      pan.panningModel = "equalpower";
      pan.setPosition(x, y, z);

      eq.connect(pan);
      pan.connect(_this.outlet);

      return eq;
    });

    this.tracks = [];

    this.$onProcess = this.$onProcess.bind(this);

    (0, _mohayonaoWebAudioUtilsFetchAudioBuffer2["default"])("./assets/01.wav", this.audioContext).then(function (audioBuffer) {
      _this.audioBuffer = audioBuffer;
      (0, _mohayonaoWebAudioUtilsFetchAudioBuffer2["default"])("./assets/reverb.wav", _this.audioContext).then(function (audioBuffer) {
        _this.outlet.buffer = audioBuffer;
        _this.emit("ready");
      });
    });
  }

  _createClass(Player, [{
    key: "start",
    value: function start() {
      this.tracks = [];
      this.timeline.start(this.$onProcess);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.tracks = [];
      this.timeline.stop(true);
    }
  }, {
    key: "play",
    value: function play(playbackTime) {
      var _this2 = this;

      var bufSrc1 = this.audioContext.createBufferSource();
      var bufSrc2 = this.audioContext.createBufferSource();
      var gain = this.audioContext.createGain();

      bufSrc1.buffer = this.audioBuffer;
      bufSrc1.start(playbackTime);
      bufSrc1.connect((0, _mohayonaoUtilsSample2["default"])(this.inlets));

      bufSrc1.onended = function () {
        bufSrc1.stop(_this2.audioContext.currentTime);
        bufSrc1.disconnect();
        _mohayonaoWebAudioUtilsGCGuard2["default"].remove(bufSrc1);
      };
      _mohayonaoWebAudioUtilsGCGuard2["default"].append(bufSrc1);

      bufSrc2.buffer = this.audioBuffer;
      bufSrc2.start(playbackTime);
      bufSrc2.connect(gain);

      bufSrc2.onended = function () {
        bufSrc2.stop(_this2.audioContext.currentTime);
        bufSrc2.disconnect();
        gain.disconnect();
        _mohayonaoWebAudioUtilsGCGuard2["default"].remove(bufSrc2);
      };
      _mohayonaoWebAudioUtilsGCGuard2["default"].append(bufSrc2);

      gain.gain.value = Math.pow(2, -4);
      gain.connect(this.audioContext.destination);
    }
  }, {
    key: "appendTrack",
    value: function appendTrack() {
      var _this3 = this;

      var track = new _Track2["default"]();

      track.on("bang", function (_ref) {
        var playbackTime = _ref.playbackTime;

        _this3.play(playbackTime + 0.25);
      });
      track.on("loop", function () {
        if (_this3.tracks.length < 10 && Math.random() < 0.2) {
          _this3.appendTrack();
        }
        if (Math.random() < 0.1) {
          (0, _mohayonaoUtilsRemoveIfExists2["default"])(_this3.tracks, track);
        }
      });

      this.tracks.push(track);
    }
  }, {
    key: "$onProcess",
    value: function $onProcess(_ref2) {
      var playbackTime = _ref2.playbackTime;

      if (this.tracks.length === 0) {
        this.appendTrack();
      }

      this.tracks.forEach(function (track) {
        track.$onProcess(playbackTime, INTERVAL);
      });

      this.timeline.insert(playbackTime + INTERVAL * 0.001, this.$onProcess);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (instance === null) {
        instance = new Player();
      }
      return instance;
    }
  }]);

  return Player;
})(_mohayonaoEventEmitter2["default"]);

exports["default"] = Player;
module.exports = exports["default"];

},{"./Track":22,"@mohayonao/eq":1,"@mohayonao/event-emitter":5,"@mohayonao/timeline":6,"@mohayonao/utils/dbamp":13,"@mohayonao/utils/range":14,"@mohayonao/utils/removeIfExists":15,"@mohayonao/utils/sample":16,"@mohayonao/web-audio-utils/GCGuard":17,"@mohayonao/web-audio-utils/fetchAudioBuffer":18,"@mohayonao/web-audio-utils/getAudioContext":19,"worker-timer":20}],22:[function(require,module,exports){
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

var _mohayonaoUtilsSample = require("@mohayonao/utils/sample");

var _mohayonaoUtilsSample2 = _interopRequireDefault(_mohayonaoUtilsSample);

var _mohayonaoUtilsRange = require("@mohayonao/utils/range");

var _mohayonaoUtilsRange2 = _interopRequireDefault(_mohayonaoUtilsRange);

var Track = (function (_EventEmitter) {
  _inherits(Track, _EventEmitter);

  function Track() {
    _classCallCheck(this, Track);

    _get(Object.getPrototypeOf(Track.prototype), "constructor", this).call(this);

    this.interval = (0, _mohayonaoUtilsSample2["default"])([50, 125, 160, 205, 235]);
    this.pattern = (0, _mohayonaoUtilsRange2["default"])(8).map(function (_) {
      return 0.4 < Math.random();
    });
    this.index = 0;
    this.ticks = this.interval;
  }

  _createClass(Track, [{
    key: "$onProcess",
    value: function $onProcess(playbackTime, numOfTicks) {
      this.ticks -= numOfTicks;

      while (this.ticks <= 0) {
        var bang = this.pattern[this.index++];

        if (bang) {
          this.emit("bang", {
            playbackTime: playbackTime
          });
        }

        if (this.index === this.pattern.length) {
          this.emit("loop", this);
          this.index = 0;
        }

        this.ticks += this.interval;
      }
    }
  }]);

  return Track;
})(_mohayonaoEventEmitter2["default"]);

exports["default"] = Track;
module.exports = exports["default"];

},{"@mohayonao/event-emitter":5,"@mohayonao/utils/range":14,"@mohayonao/utils/sample":16}],23:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

window.onload = function () {
  var player = _Player2["default"].getInstance();

  var app = new Vue({
    el: "#app",
    data: {
      isReady: false,
      isPlaying: false
    },
    methods: {
      onClick: function onClick() {
        if (!this.isReady) {
          return;
        }
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
          player.start();
        } else {
          player.stop();
        }
      }
    }
  });

  player.on("ready", function () {
    app.isReady = true;
  });
};

},{"./Player":21}]},{},[23]);
