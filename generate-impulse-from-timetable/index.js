(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandGen = function RandGen() {
  var seed = arguments.length <= 0 || arguments[0] === undefined ? Date.now() : arguments[0];

  _classCallCheck(this, RandGen);

  var i1 = seed;
  var i2 = (seed << 16) + (seed >> 16);
  var z = i1 >>> 0 || 362436069;
  var w = i2 >>> 0 || 521288629;

  this.random = function () {
    z = 36969 * (z & 65535) + (z >>> 16) & 0xFFFFFFFF;
    w = 18000 * (w & 65535) + (w >>> 16) & 0xFFFFFFFF;

    var value = ((z & 0xFFFF) << 16 | w & 0xFFFF) >>> 0;

    return value / 4294967296;
  };
};

exports["default"] = RandGen;
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _RandGen = require("./RandGen");

var _RandGen2 = _interopRequireDefault(_RandGen);

exports["default"] = _RandGen2["default"];
module.exports = exports["default"];
},{"./RandGen":2}],4:[function(require,module,exports){
module.exports = function(array, rand) {
  rand = rand || Math.random;

  return array[(rand() * array.length)|0];
};

},{}],5:[function(require,module,exports){
(function (global){
var getAudioContext = require("./getAudioContext");

/* eslint-disable no-unused-vars */

module.exports = function(audioContext) {
  var memo = null;

  if (!("ontouchstart" in global)) {
    return;
  }

  audioContext = audioContext || getAudioContext();

  function choreFunction() {
    var bufSrc = audioContext.createBufferSource();

    bufSrc.start(audioContext.currentTime);
    bufSrc.stop(audioContext.currentTime + 0.001);
    bufSrc.connect(audioContext.destination);
    bufSrc.onended = function() {
      bufSrc.disconnect();
      memo = null;
    };
    memo = bufSrc;

    global.removeEventListener("touchstart", choreFunction);
  }

  global.addEventListener("touchstart", choreFunction);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getAudioContext":6}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _inlineWorker = require("inline-worker");

var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

var _EncoderWorker = require("./EncoderWorker");

var _EncoderWorker2 = _interopRequireDefault(_EncoderWorker);

var instance = null;

var Encoder = (function () {
  function Encoder() {
    var _this = this;

    var format = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Encoder);

    this.format = {
      floatingPoint: !!format.floatingPoint,
      bitDepth: format.bitDepth | 0 || 16
    };
    this._worker = new _inlineWorker2["default"](_EncoderWorker2["default"], _EncoderWorker2["default"].self);
    this._worker.onmessage = function (_ref) {
      var data = _ref.data;

      var callback = _this._callbacks[data.callbackId];

      if (callback) {
        if (data.type === "encoded") {
          callback.resolve(data.buffer);
        } else {
          callback.reject(new Error(data.message));
        }
      }

      _this._callbacks[data.callbackId] = null;
    };
    this._callbacks = [];
  }

  _createClass(Encoder, [{
    key: "encode",
    value: function encode(audioData, format) {
      var _this2 = this;

      if (format == null || typeof format !== "object") {
        format = this.format;
      }
      return new Promise(function (resolve, reject) {
        var callbackId = _this2._callbacks.length;

        _this2._callbacks.push({ resolve: resolve, reject: reject });

        var numberOfChannels = audioData.channelData.length;
        var length = audioData.channelData[0].length;
        var sampleRate = audioData.sampleRate;
        var buffers = audioData.channelData.map(function (data) {
          return data.buffer;
        });

        audioData = { numberOfChannels: numberOfChannels, length: length, sampleRate: sampleRate, buffers: buffers };

        _this2._worker.postMessage({
          type: "encode", audioData: audioData, format: format, callbackId: callbackId
        }, audioData.buffers);
      });
    }
  }], [{
    key: "encode",
    value: function encode(audioData, format) {
      if (instance === null) {
        instance = new Encoder();
      }
      return instance.encode(audioData, format);
    }
  }]);

  return Encoder;
})();

exports["default"] = Encoder;
module.exports = exports["default"];
},{"./EncoderWorker":8,"inline-worker":12}],8:[function(require,module,exports){
var dataview2 = require("dataview2");

var self = {};

function encoder() {
  self.onmessage = function(e) {
    if (e.data.type === "encode") {
      self.encode(e.data.callbackId, e.data.audioData, e.data.format);
    }
  };

  self.encode = function(callbackId, audioData, format) {
    function successCallback(buffer) {
      self.postMessage({
        type: "encoded",
        callbackId: callbackId,
        buffer: buffer,
      }, [ buffer ]);
    }

    function errorCallback(err) {
      self.postMessage({
        type: "error",
        callbackId: callbackId,
        message: err.message,
      });
    }

    self.encodeWav(audioData, format).then(successCallback, errorCallback);
  };

  self.encodeWav = function(audioData, format) {
    format.floatingPoint = !!format.floatingPoint;
    format.bitDepth = (format.bitDepth|0) || 16;

    return new Promise(function(resolve) {
      var numberOfChannels = audioData.numberOfChannels;
      var sampleRate = audioData.sampleRate;
      var bytes = format.bitDepth >> 3;
      var length = audioData.length * numberOfChannels * bytes;
      var writer = new BufferWriter(44 + length);

      writer.writeString("RIFF"); // RIFF header
      writer.writeUint32(writer.length - 8); // file length
      writer.writeString("WAVE"); // RIFF Type

      writer.writeString("fmt "); // format chunk identifier
      writer.writeUint32(16);     // format chunk length
      writer.writeUint16(format.floatingPoint ? 0x0003 : 0x0001); // format (PCM)
      writer.writeUint16(numberOfChannels); // number of channels
      writer.writeUint32(sampleRate);       // sample rate
      writer.writeUint32(sampleRate * numberOfChannels * bytes); // byte rate
      writer.writeUint16(numberOfChannels * bytes); // block size
      writer.writeUint16(format.bitDepth); // bits per sample

      writer.writeString("data"); // data chunk identifier
      writer.writeUint32(length); // data chunk length

      var channelData = audioData.buffers.map(function(buffer) {
        return new Float32Array(buffer);
      });

      writer.writePCM(channelData, format);

      resolve(writer.buffer);
    });
  };

  function BufferWriter(length) {
    if (typeof dataview2 !== "undefined") {
      this.buffer = new dataview2.Buffer2(length);
      this.view = new dataview2.DataView2(this.buffer);
    } else {
      this.buffer = new ArrayBuffer(length);
      this.view = new DataView(this.buffer);
    }
    this.length = length;
    this.pos = 0;
  }

  BufferWriter.prototype.writeUint8 = function(data) {
    this.view.setUint8(this.pos, data);
    this.pos += 1;
  };

  BufferWriter.prototype.writeUint16 = function(data) {
    this.view.setUint16(this.pos, data, true);
    this.pos += 2;
  };

  BufferWriter.prototype.writeUint32 = function(data) {
    this.view.setUint32(this.pos, data, true);
    this.pos += 4;
  };

  BufferWriter.prototype.writeString = function(data) {
    for (var i = 0; i < data.length; i++) {
      this.writeUint8(data.charCodeAt(i));
    }
  };

  BufferWriter.prototype.writePCM8 = function(x) {
    x = Math.max(-128, Math.min(x * 128, 127))|0;
    this.view.setInt8(this.pos, x);
    this.pos += 1;
  };

  BufferWriter.prototype.writePCM16 = function(x) {
    x = Math.max(-32768, Math.min(x * 32768, 32767))|0;
    this.view.setInt16(this.pos, x, true);
    this.pos += 2;
  };

  BufferWriter.prototype.writePCM24 = function(x) {
    x = Math.max(-8388608, Math.min(x * 8388608, 8388607))|0;
    this.view.setUint8(this.pos + 0, (x >>  0) & 0xff);
    this.view.setUint8(this.pos + 1, (x >>  8) & 0xff);
    this.view.setUint8(this.pos + 2, (x >> 16) & 0xff);
    this.pos += 3;
  };

  BufferWriter.prototype.writePCM32 = function(x) {
    x = Math.max(-2147483648, Math.min(x * 2147483648, 2147483647))|0;
    this.view.setInt32(this.pos, x, true);
    this.pos += 4;
  };

  BufferWriter.prototype.writePCM32F = function(x) {
    this.view.setFloat32(this.pos, x, true);
    this.pos += 4;
  };

  BufferWriter.prototype.writePCM64F = function(x) {
    this.view.setFloat64(this.pos, x, true);
    this.pos += 8;
  };

  BufferWriter.prototype.writePCM = function(channelData, format) {
    var length = channelData[0].length;
    var numberOfChannels = channelData.length;
    var method = "writePCM" + format.bitDepth;

    if (format.floatingPoint) {
      method += "F";
    }

    if (!this[method]) {
      throw new Error("not suppoerted bit depth " + format.bitDepth);
    }

    for (var i = 0; i < length; i++) {
      for (var ch = 0; ch < numberOfChannels; ch++) {
        this[method](channelData[ch][i]);
      }
    }
  };

  self.BufferWriter = BufferWriter;
}

encoder.self = encoder.util = self;

module.exports = encoder;

},{"dataview2":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Encoder = require("./Encoder");

var _Encoder2 = _interopRequireDefault(_Encoder);

exports["default"] = _Encoder2["default"];
module.exports = exports["default"];
},{"./Encoder":7}],10:[function(require,module,exports){
(function (global){
var BufferDataView = require("buffer-dataview");

function DataView2(buffer) {
  if (global.Buffer && buffer instanceof global.Buffer) {
    return new BufferDataView(buffer);
  }
  return new DataView(buffer);
}

function Buffer2(n) {
  if (global.Buffer) {
    return new global.Buffer(n);
  }
  return new Uint8Array(n).buffer;
}

module.exports = {
  DataView2: DataView2,
  Buffer2: Buffer2,
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer-dataview":11}],11:[function(require,module,exports){

/**
 * Module exports.
 */

module.exports = DataView;

/**
 * Very minimal `DataView` implementation that wraps (doesn't *copy*)
 * Node.js Buffer instances.
 *
 *  Spec: http://www.khronos.org/registry/typedarray/specs/latest/#8
 *  MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays/DataView
 *
 * @param {Buffer} buffer
 * @param {Number} byteOffset (optional)
 * @param {Number} byteLength (optional)
 * @api public
 */

function DataView (buffer, byteOffset, byteLength) {
  if (!(this instanceof DataView)) throw new TypeError('Constructor DataView requires \'new\'');
  if (!buffer || null == buffer.length) throw new TypeError('First argument to DataView constructor must be a Buffer');
  if (null == byteOffset) byteOffset = 0;
  if (null == byteLength) byteLength = buffer.length;
  this.buffer = buffer;
  this.byteOffset = byteOffset | 0;
  this.byteLength = byteLength | 0;
}

/**
 * "Get" functions.
 */

DataView.prototype.getInt8 = function (byteOffset) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  return this.buffer.readInt8(offset);
};

DataView.prototype.getUint8 = function (byteOffset) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  return this.buffer.readUInt8(offset);
};

DataView.prototype.getInt16 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readInt16LE(offset);
  } else {
    return this.buffer.readInt16BE(offset);
  }
};

DataView.prototype.getUint16 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readUInt16LE(offset);
  } else {
    return this.buffer.readUInt16BE(offset);
  }
};

DataView.prototype.getInt32 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readInt32LE(offset);
  } else {
    return this.buffer.readInt32BE(offset);
  }
};

DataView.prototype.getUint32 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readUInt32LE(offset);
  } else {
    return this.buffer.readUInt32BE(offset);
  }
};

DataView.prototype.getFloat32 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readFloatLE(offset);
  } else {
    return this.buffer.readFloatBE(offset);
  }
};

DataView.prototype.getFloat64 = function (byteOffset, littleEndian) {
  if (arguments.length < 1) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    return this.buffer.readDoubleLE(offset);
  } else {
    return this.buffer.readDoubleBE(offset);
  }
};

/**
 * "Set" functions.
 */

DataView.prototype.setInt8 = function (byteOffset, value) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from -128 to 128
  value = ((value + 128) & 255) - 128;
  this.buffer.writeInt8(value, offset);
};

DataView.prototype.setUint8 = function (byteOffset, value) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from 0 to 255
  value = value & 255;
  this.buffer.writeUInt8(value, offset);
};

DataView.prototype.setInt16 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from -32768 to 32768
  value = ((value + 32768) & 65535) - 32768;
  if (littleEndian) {
    this.buffer.writeInt16LE(value, offset);
  } else {
    this.buffer.writeInt16BE(value, offset);
  }
};

DataView.prototype.setUint16 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from 0 to 65535
  value = value & 65535;
  if (littleEndian) {
    this.buffer.writeUInt16LE(value, offset);
  } else {
    this.buffer.writeUInt16BE(value, offset);
  }
};

DataView.prototype.setInt32 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from -2147483648 to 2147483648
  value |= 0;
  if (littleEndian) {
    this.buffer.writeInt32LE(value, offset);
  } else {
    this.buffer.writeInt32BE(value, offset);
  }
};

DataView.prototype.setUint32 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  // wrap the `value` from 0 to 4294967295
  value = value >>> 0;
  if (littleEndian) {
    this.buffer.writeUInt32LE(value, offset);
  } else {
    this.buffer.writeUInt32BE(value, offset);
  }
};

DataView.prototype.setFloat32 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    this.buffer.writeFloatLE(value, offset);
  } else {
    this.buffer.writeFloatBE(value, offset);
  }
};

DataView.prototype.setFloat64 = function (byteOffset, value, littleEndian) {
  if (arguments.length < 2) throw new TypeError('invalid_argument');
  var offset = this.byteOffset + (byteOffset | 0);
  var max = this.byteOffset + this.byteLength - 1;
  if (offset < this.byteOffset || offset > max) {
    throw new RangeError('Offset is outside the bounds of the DataView');
  }
  if (littleEndian) {
    this.buffer.writeDoubleLE(value, offset);
  } else {
    this.buffer.writeDoubleBE(value, offset);
  }
};

},{}],12:[function(require,module,exports){
"use strict";

module.exports = require("./inline-worker");
},{"./inline-worker":13}],13:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

var InlineWorker = (function () {
  function InlineWorker(func, self) {
    var _this = this;

    _classCallCheck(this, InlineWorker);

    if (WORKER_ENABLED) {
      var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
      var url = global.URL.createObjectURL(new global.Blob([functionBody], { type: "text/javascript" }));

      return new global.Worker(url);
    }

    this.self = self;
    this.self.postMessage = function (data) {
      setTimeout(function () {
        _this.onmessage({ data: data });
      }, 0);
    };

    setTimeout(function () {
      func.call(self);
    }, 0);
  }

  _createClass(InlineWorker, {
    postMessage: {
      value: function postMessage(data) {
        var _this = this;

        setTimeout(function () {
          _this.self.onmessage({ data: data });
        }, 0);
      }
    }
  });

  return InlineWorker;
})();

module.exports = InlineWorker;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TO_N = [1380, 2460, 1500, 2460, 1500, 2880, 1980, 3540, 2820, 3540, 3540, 4320, 4080, 2640, 1860, 1380, 2160, 2640, 2220, 2460, 1920, 2940, 3540];
var TO_S = [3900, 1620, 2400, 1500, 2280, 3780, 3660, 3540, 3540, 3480, 3600, 2580, 2340, 2280, 2160, 1560, 1980, 2520, 2100, 1920, 2100, 2700, 2700];

function rotate(list, index) {
  var result = list.slice();

  return result.slice(index).concat(result.slice(0, index));
}

function crawl(list, zoom, limit) {
  var result = [];
  var time = 0;
  var i = 0;

  while (time < limit) {
    time += list[i++ % list.length] * zoom;

    result.push(time);
  }

  return result;
}

exports["default"] = function (zoom, limit) {
  var result = [];

  for (var i = 0; i < TO_N.length; i++) {
    for (var j = 0; j < TO_S.length; j++) {
      var a = crawl(rotate(TO_N, i), zoom, limit);
      var b = crawl(rotate(TO_S, j), zoom, limit);

      result.push([].concat(a, b).map(function (x) {
        return limit <= x ? x % limit : x;
      }).sort(function (a, b) {
        return a - b;
      }));
    }
  }

  return result;
};

module.exports = exports["default"];

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsSample = require("@mohayonao/utils/sample");

var _mohayonaoUtilsSample2 = _interopRequireDefault(_mohayonaoUtilsSample);

var _mohayonaoRandgen = require("@mohayonao/randgen");

var _mohayonaoRandgen2 = _interopRequireDefault(_mohayonaoRandgen);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay = require("@mohayonao/web-audio-utils/enableMobileAutoPlay");

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay2 = _interopRequireDefault(_mohayonaoWebAudioUtilsEnableMobileAutoPlay);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
var guardGC = [];

(0, _mohayonaoWebAudioUtilsEnableMobileAutoPlay2["default"])();

function rendering(audioContext, timetable, limit, duration) {
  timetable.forEach(function (time) {
    var t0 = time / limit * duration;
    var t1 = t0 + 0.025;
    var osc = audioContext.createOscillator();
    var amp = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.value = (0, _mohayonaoUtilsSample2["default"])([440, 880, 1760, 3520], new _mohayonaoRandgen2["default"](time * 1000).random);
    osc.start(t0);
    osc.stop(t1);

    amp.gain.setValueAtTime(0.75, t0);
    amp.gain.linearRampToValueAtTime(0.00, t1);

    osc.connect(amp);
    amp.connect(audioContext.destination);
  });
}

function _play(timetable, limit, duration, callback) {
  var sampleRate = audioContext.sampleRate;
  var length = Math.floor(duration * sampleRate);
  var offContext = new OfflineAudioContext(1, length, sampleRate);

  rendering(offContext, timetable, limit, duration);
  offContext.startRendering();

  offContext.oncomplete = function (_ref) {
    var renderedBuffer = _ref.renderedBuffer;

    var bufSrc = audioContext.createBufferSource();

    bufSrc.buffer = renderedBuffer;

    var t0 = audioContext.currentTime;
    var t1 = t0 + renderedBuffer.duration;

    bufSrc.start(t0);
    bufSrc.stop(t1);
    bufSrc.onended = function () {
      bufSrc.disconnect();

      guardGC.splice(guardGC.indexOf(bufSrc), 1);
    };
    bufSrc.connect(audioContext.destination);

    guardGC.push(bufSrc);

    if (typeof callback === "function") {
      callback(renderedBuffer);
    }
  };
}

exports["default"] = {
  play: function play() {
    _play.apply(undefined, arguments);
  }
};
module.exports = exports["default"];

},{"@mohayonao/randgen":1,"@mohayonao/utils/sample":4,"@mohayonao/web-audio-utils/enableMobileAutoPlay":5,"@mohayonao/web-audio-utils/getAudioContext":6}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = document.getElementById("canvas");

canvas.width = 1280;
canvas.height = 480;

function _draw(timetables, zoom, limit) {
  var context = canvas.getContext("2d");

  context.fillStyle = "#2c3e50";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2ecc71";
  context.strokeStyle = "#bdc3c7";

  timetables.forEach(function (timetable, index) {
    var y0 = index / timetables.length * canvas.height | 0 + 0.5;
    var yh = Math.max(canvas.height / timetables.length, 1) | 0;

    timetable.forEach(function (time) {
      var x0 = time / limit * canvas.width | 0 + 0.5;
      var xw = Math.max(canvas.width / limit, 1) | 0;

      context.fillRect(x0, y0, xw, yh);
    });

    context.beginPath();
    context.moveTo(0, (y0 | 0) + 0.5);
    context.lineTo(canvas.width, (y0 | 0) + 0.5);
    context.stroke();
  });

  for (var time = 0; time < limit; time += 3600) {
    var x0 = time / limit * canvas.width;

    context.beginPath();
    context.moveTo((x0 | 0) + 0.5, 0);
    context.lineTo((x0 | 0) + 0.5, canvas.height);
    context.stroke();
  }
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

},{}],17:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _wavEncoder = require("wav-encoder");

var _wavEncoder2 = _interopRequireDefault(_wavEncoder);

var _createTimetable = require("./createTimetable");

var _createTimetable2 = _interopRequireDefault(_createTimetable);

var _viewer = require("./viewer");

var _viewer2 = _interopRequireDefault(_viewer);

var _player = require("./player");

var _player2 = _interopRequireDefault(_player);

global.URL = global.URL || global.webkitURL;

global.onload = function () {
  function densityToZoom(density) {
    return 1 - density / 100;
  }

  new Vue({
    el: "#app",
    data: {
      density: 0,
      duration: 4,
      zoom: 1,
      limit: 14400,
      data: [],
      link: ""
    },
    methods: {
      draw: function draw() {
        _viewer2["default"].draw(this.data, this.zoom, this.limit);

        return this;
      },
      update: function update() {
        var select = this.density % 27;

        this.data = (0, _createTimetable2["default"])(this.zoom, this.limit).filter(function (_, i) {
          return i % 27 === select;
        });

        return this;
      },
      onChangeDensity: function onChangeDensity() {
        this.zoom = densityToZoom(this.density);
        this.limit = 14400;
        this.update().draw();
      },
      onClick: function onClick(e) {
        var _this = this;

        var index = Math.floor(this.data.length * (e.offsetY / _viewer2["default"].height));

        this.link = "";

        _player2["default"].play(this.data[index], this.limit, this.duration, function (buffer) {
          _wavEncoder2["default"].encode({
            sampleRate: buffer.sampleRate,
            channelData: [buffer.getChannelData(0)]
          }).then(function (bytes) {
            var blob = new Blob([bytes], { type: "audio/wav" });

            _this.link = URL.createObjectURL(blob);
          });
        });
      }
    }
  }).update().draw();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./createTimetable":14,"./player":15,"./viewer":16,"wav-encoder":9}]},{},[17]);
