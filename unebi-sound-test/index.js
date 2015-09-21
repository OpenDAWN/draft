(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ADSRParams = require("./ADSRParams");

var _ADSRParams2 = _interopRequireDefault(_ADSRParams);

var ADSREnvelope = (function () {
  function ADSREnvelope(opts) {
    _classCallCheck(this, ADSREnvelope);

    this._ = new _ADSRParams2["default"](opts);
  }

  _createClass(ADSREnvelope, [{
    key: "valueAt",
    value: function valueAt() {
      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return this._.valueAt(time);
    }
  }, {
    key: "applyTo",
    value: function applyTo(audioParam, playbackTime) {
      this.getWebAudioAPIMethods(playbackTime).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var method = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        audioParam[method](value, time);
      });

      return this;
    }
  }, {
    key: "getWebAudioAPIMethods",
    value: function getWebAudioAPIMethods() {
      var playbackTime = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return this._.methods(playbackTime);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new ADSREnvelope({
        attackTime: this._.attackTime,
        decayTime: this._.decayTime,
        sustainLevel: this._.sustainLevel,
        releaseTime: this._.releaseTime,
        gateTime: this._.gateTime,
        peakLevel: this._.peakLevel,
        epsilon: this._.epsilon,
        attackCurve: this._.attackCurve,
        decayCurve: this._.decayCurve,
        releaseCurve: this._.releaseCurve
      });
    }
  }, {
    key: "duration",
    set: function set(value) {
      this._.setDuration(value);
    },
    get: function get() {
      return this._.duration;
    }
  }, {
    key: "attackTime",
    set: function set(value) {
      this._.setAttackTime(value);
    },
    get: function get() {
      return this._.attackTime;
    }
  }, {
    key: "decayTime",
    set: function set(value) {
      this._.setDecayTime(value);
    },
    get: function get() {
      return this._.decayTime;
    }
  }, {
    key: "sustainLevel",
    set: function set(value) {
      this._.setSustainLevel(value);
    },
    get: function get() {
      return this._.sustainLevel;
    }
  }, {
    key: "releaseTime",
    set: function set(value) {
      this._.setReleaseTime(value);
    },
    get: function get() {
      return this._.releaseTime;
    }
  }, {
    key: "gateTime",
    set: function set(value) {
      this._.setGateTime(value);
    },
    get: function get() {
      return this._.gateTime;
    }
  }, {
    key: "peakLevel",
    set: function set(value) {
      this._.setPeakLevel(value);
    },
    get: function get() {
      return this._.peakLevel;
    }
  }, {
    key: "epsilon",
    set: function set(value) {
      this._.setEpsilon(value);
    },
    get: function get() {
      return this._.epsilon;
    }
  }, {
    key: "attackCurve",
    set: function set(value) {
      this._.setAttackCurve(value);
    },
    get: function get() {
      return this._.attackCurve;
    }
  }, {
    key: "decayCurve",
    set: function set(value) {
      this._.setDecayCurve(value);
    },
    get: function get() {
      return this._.decayCurve;
    }
  }, {
    key: "releaseCurve",
    set: function set(value) {
      this._.setReleaseCurve(value);
    },
    get: function get() {
      return this._.releaseCurve;
    }
  }]);

  return ADSREnvelope;
})();

exports["default"] = ADSREnvelope;
module.exports = exports["default"];
},{"./ADSRParams":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mohayonaoUtilsDefaults = require("@mohayonao/utils/defaults");

var _mohayonaoUtilsDefaults2 = _interopRequireDefault(_mohayonaoUtilsDefaults);

var _mohayonaoUtilsConstrain = require("@mohayonao/utils/constrain");

var _mohayonaoUtilsConstrain2 = _interopRequireDefault(_mohayonaoUtilsConstrain);

var _EnvelopeBuilder = require("./EnvelopeBuilder");

var _EnvelopeBuilder2 = _interopRequireDefault(_EnvelopeBuilder);

var _EnvelopeValue = require("./EnvelopeValue");

var _EnvelopeValue2 = _interopRequireDefault(_EnvelopeValue);

var _defaultValues = require("./defaultValues");

var _defaultValues2 = _interopRequireDefault(_defaultValues);

var _constants = require("./constants");

var EPSILON = 2.220446049250313e-16;

var ADSRParams = (function () {
  function ADSRParams() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ADSRParams);

    this.attackTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.attackTime, _defaultValues2["default"].attackTime));
    this.decayTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.decayTime, _defaultValues2["default"].decayTime));
    this.sustainLevel = level((0, _mohayonaoUtilsDefaults2["default"])(opts.sustainLevel, _defaultValues2["default"].sustainLevel));
    this.releaseTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.releaseTime, _defaultValues2["default"].releaseTime));
    this.gateTime = time((0, _mohayonaoUtilsDefaults2["default"])(opts.gateTime, _defaultValues2["default"].gateTime));
    this.peakLevel = time((0, _mohayonaoUtilsDefaults2["default"])(opts.peakLevel, _defaultValues2["default"].peakLevel));
    this.epsilon = epsilon((0, _mohayonaoUtilsDefaults2["default"])(opts.epsilon, _defaultValues2["default"].epsilon));
    this.attackCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.attackCurve, _defaultValues2["default"].attackCurve));
    this.decayCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.decayCurve, _defaultValues2["default"].decayCurve));
    this.releaseCurve = curve((0, _mohayonaoUtilsDefaults2["default"])(opts.releaseCurve, _defaultValues2["default"].releaseCurve));
    this.update();
  }

  _createClass(ADSRParams, [{
    key: "valueAt",
    value: function valueAt(time) {
      return _EnvelopeValue2["default"].at(this.envelope, time);
    }
  }, {
    key: "methods",
    value: function methods(playbackTime) {
      return this.envelope.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var type = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        return [method(type), value, playbackTime + time];
      });
    }
  }, {
    key: "setDuration",
    value: function setDuration(value) {
      var duration = time(value);

      this.setGateTime(duration - this.releaseTime);
    }
  }, {
    key: "setAttackTime",
    value: function setAttackTime(value) {
      this.attackTime = time(value);
      this.update();
    }
  }, {
    key: "setDecayTime",
    value: function setDecayTime(value) {
      this.decayTime = time(value);
      this.update();
    }
  }, {
    key: "setSustainLevel",
    value: function setSustainLevel(value) {
      this.sustainLevel = level(value);
      this.update();
    }
  }, {
    key: "setReleaseTime",
    value: function setReleaseTime(value) {
      this.releaseTime = time(value);
      this.update();
    }
  }, {
    key: "setGateTime",
    value: function setGateTime(value) {
      this.gateTime = time(value);
      this.update();
    }
  }, {
    key: "setPeakLevel",
    value: function setPeakLevel(value) {
      this.peakLevel = time(value);
      this.update();
    }
  }, {
    key: "setEpsilon",
    value: function setEpsilon(value) {
      this.epsilon = epsilon(value);
      this.update();
    }
  }, {
    key: "setAttackCurve",
    value: function setAttackCurve(value) {
      this.attackCurve = curve(value);
      this.update();
    }
  }, {
    key: "setDecayCurve",
    value: function setDecayCurve(value) {
      this.decayCurve = curve(value);
      this.update();
    }
  }, {
    key: "setReleaseCurve",
    value: function setReleaseCurve(value) {
      this.releaseCurve = curve(value);
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.duration = this.gateTime + this.releaseTime;
      this.envelope = _EnvelopeBuilder2["default"].build(this);
    }
  }]);

  return ADSRParams;
})();

exports["default"] = ADSRParams;

function time(value) {
  return Math.max(0, value) || 0;
}

function level(value) {
  return (0, _mohayonaoUtilsConstrain2["default"])(+value, 0, 1) || 0;
}

function epsilon(value) {
  return (0, _mohayonaoUtilsConstrain2["default"])(+value, EPSILON, 1e-2) || 1e-3;
}

function curve(type) {
  return type === "exp" ? "exp" : "lin";
}

function method(type) {
  switch (type) {
    case _constants.SET:
      return "setValueAtTime";
    case _constants.LIN:
      return "linearRampToValueAtTime";
    case _constants.EXP:
      return "exponentialRampToValueAtTime";
    default:
    // do nothing
  }
}
module.exports = exports["default"];
},{"./EnvelopeBuilder":4,"./EnvelopeValue":6,"./constants":7,"./defaultValues":8,"@mohayonao/utils/constrain":19,"@mohayonao/utils/defaults":20}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var _mohayonaoUtilsLinexp = require("@mohayonao/utils/linexp");

var _mohayonaoUtilsLinexp2 = _interopRequireDefault(_mohayonaoUtilsLinexp);

var _constants = require("./constants");

var _EnvelopeReducer = require("./EnvelopeReducer");

var _EnvelopeReducer2 = _interopRequireDefault(_EnvelopeReducer);

function build(params) {
  var envelope = buildEnvelope(params);

  envelope = _EnvelopeReducer2["default"].reduce(envelope);

  return envelope;
}

function getCurveItems(curveType, epsilon) {
  if (curveType === "exp") {
    return { zero: epsilon, calc: _mohayonaoUtilsLinexp2["default"], type: _constants.EXP };
  }
  return { zero: 0, calc: _mohayonaoUtilsLinlin2["default"], type: _constants.LIN };
}

function buildEnvelope(params) {
  var attackTime = params.attackTime;
  var decayTime = params.decayTime;
  var gateTime = params.gateTime;
  var releaseTime = params.releaseTime;

  var envType = 0;

  envType += 0 < attackTime ? 4 : 0;
  envType += 0 < decayTime ? 2 : 0;
  envType += 0 < releaseTime ? 1 : 0;

  switch (envType) {
    case 0:
      return buildSustainEnvelope(params);
    case 1:
      return buildSustainReleaseEnvelope(params);
    case 2:
      if (gateTime <= decayTime) {
        return buildDecayEnvelope(params);
      }
      return buildDecaySustainEnvelope(params);
    case 3:
      if (gateTime <= decayTime) {
        return buildDecayReleaseEnvelope(params);
      }
      return buildDecaySustainReleaseEnvelope(params);
    case 4:
      if (gateTime <= attackTime) {
        return buildAttackEnvelope(params);
      }
      return buildAttackSustainEnvelope(params);
    case 5:
      if (gateTime <= attackTime) {
        return buildAttackReleaseEnvelope(params);
      }
      return buildAttackSustainReleaseEnvelope(params);
    case 6:
      if (gateTime <= attackTime) {
        return buildAttackEnvelope(params);
      }
      if (gateTime <= attackTime + decayTime) {
        return buildAttackDecayEnvelope(params);
      }
      return buildAttackDecaySustainEnvelope(params);
    case 7:
      if (gateTime <= attackTime) {
        return buildAttackReleaseEnvelope(params);
      }
      if (gateTime <= attackTime + decayTime) {
        return buildAttackDecayReleaseEnvelope(params);
      }
      return buildAttackDecaySustainReleaseEnvelope(params);
    default:
    // do nothing
  }
}

function buildSustainEnvelope(params) {
  //
  //
  // ----------*
  //           |
  //           +---------
  // 0         12
  //
  var result = [];
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = params.sustainLevel * params.peakLevel;
  var v1 = params.sustainLevel * params.peakLevel;
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([_constants.SET, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildSustainReleaseEnvelope(params) {
  //
  //
  // ----------*
  //            \
  //             +-------
  // 0         1 2
  var result = [];
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v1 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v2 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([_constants.SET, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildDecaySustainEnvelope(params) {
  // +
  //  \
  //   +-------*
  //           |
  //           +---------
  // 0 1       23
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.decayTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime;
  var v0 = Math.max(d.zero, params.peakLevel);
  var v1 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v3 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);

  return result;
}

function buildDecayEnvelope(params) {
  // +
  //  \
  //   *
  //   |
  //   +-----------------
  // 0 12
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = Math.max(d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildDecaySustainReleaseEnvelope(params) {
  // +
  //  \
  //   +-------*
  //            \
  //             +-------
  // 0 1       2 3
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.decayTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime + params.releaseTime;
  var v0 = Math.max(d.zero, r.zero, params.peakLevel);
  var v1 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v3 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([r.type, v3, t3]);

  return result;
}

function buildDecayReleaseEnvelope(params) {
  // +
  //  \
  //   *
  //    \
  //     +---------------
  // 0 1 2
  var result = [];
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = Math.max(d.zero, r.zero, params.peakLevel);
  var vx = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v1 = d.calc(t1, 0, params.decayTime, v0, vx);
  var v2 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([d.type, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildAttackSustainEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /        |
  // +         +---------
  // 0   12    34
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, params.peakLevel);
  var v2 = params.sustainLevel * params.peakLevel;
  var v3 = params.sustainLevel * params.peakLevel;
  var v4 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([_constants.SET, v4, t4]);

  return result;
}

function buildAttackEnvelope(params) {
  //
  //
  //   *
  //  /|
  // + +-----------------
  // 0 12
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime;
  var v0 = a.zero;
  var vx = Math.max(a.zero, params.peakLevel);
  var v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  var v2 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);

  return result;
}

function buildAttackSustainReleaseEnvelope(params) {
  //     +
  //    /|
  //   / +-----*
  //  /         \
  // +           +-------
  // 0   12    3 4
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, params.peakLevel);
  var v2 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(r.zero, params.sustainLevel * params.peakLevel);
  var v4 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([_constants.SET, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([r.type, v4, t4]);

  return result;
}

function buildAttackReleaseEnvelope(params) {
  //
  //
  //   *
  //  / \
  // +   +---------------
  // 0 1 2
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.gateTime;
  var t2 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var vx = Math.max(a.zero, params.peakLevel);
  var v1 = a.calc(t1, 0, params.attackTime, v0, vx);
  var v2 = r.zero;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([r.type, v2, t2]);

  return result;
}

function buildAttackDecaySustainEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /        |
  // +         +---------
  // 0   1 2   34
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime + params.decayTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var v2 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v4 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([_constants.SET, v4, t4]);

  return result;
}

function buildAttackDecayEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /    |
  // +     +-------------
  // 0   1 23
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  var v3 = 0;

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);

  return result;
}

function buildAttackDecaySustainReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   +---*
  //  /         \
  // +           +-------
  // 0   1 2   3 4
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.attackTime + params.decayTime;
  var t3 = params.gateTime;
  var t4 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var v2 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v3 = Math.max(d.zero, r.zero, params.sustainLevel * params.peakLevel);
  var v4 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([_constants.SET, v3, t3]);
  result.push([r.type, v4, t4]);

  return result;
}

function buildAttackDecayReleaseEnvelope(params) {
  //     +
  //    / \
  //   /   *
  //  /     \
  // +       +-----------
  // 0   1 2 3
  var result = [];
  var a = getCurveItems(params.attackCurve, params.epsilon);
  var d = getCurveItems(params.decayCurve, params.epsilon);
  var r = getCurveItems(params.releaseCurve, params.epsilon);
  var t0 = 0;
  var t1 = params.attackTime;
  var t2 = params.gateTime;
  var t3 = params.gateTime + params.releaseTime;
  var v0 = a.zero;
  var v1 = Math.max(a.zero, d.zero, params.peakLevel);
  var vx = Math.max(d.zero, params.sustainLevel * params.peakLevel);
  var v2 = d.calc(t2, params.attackTime, params.attackTime + params.decayTime, v1, vx);
  var v3 = Math.max(d.zero, r.zero);

  result.push([_constants.SET, v0, t0]);
  result.push([a.type, v1, t1]);
  result.push([d.type, v2, t2]);
  result.push([r.type, v3, t3]);

  return result;
}

exports["default"] = { build: build };
module.exports = exports["default"];
},{"./EnvelopeReducer":5,"./constants":7,"@mohayonao/utils/linexp":21,"@mohayonao/utils/linlin":22}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("./constants");

function reduce(envelope) {
  envelope = envelope.filter(function (items) {
    return isFinite(items[_constants.TIME]);
  });

  var changed = undefined;

  do {
    changed = false;

    if (2 <= envelope.length) {
      var a = envelope[envelope.length - 2];
      var b = envelope[envelope.length - 1];

      if (a[_constants.VALUE] === b[_constants.VALUE]) {
        envelope.pop();
      }
    }

    for (var i = envelope.length - 2; i >= 0; i--) {
      var a = envelope[i];
      var b = envelope[i + 1];

      if (a[_constants.TYPE] === _constants.SET) {
        if (b[_constants.TYPE] !== _constants.SET) {
          if (a[_constants.VALUE] === b[_constants.VALUE] || a[_constants.TIME] === b[_constants.TIME]) {
            b[_constants.TYPE] = _constants.SET;
            changed = true;
          }
        } else if (a[_constants.TIME] === b[_constants.TIME]) {
          envelope.splice(i, 1);
          changed = true;
        }
      }
    }
  } while (changed && envelope.length);

  return envelope;
}

exports["default"] = { reduce: reduce };
module.exports = exports["default"];
},{"./constants":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoUtilsLinlin = require("@mohayonao/utils/linlin");

var _mohayonaoUtilsLinlin2 = _interopRequireDefault(_mohayonaoUtilsLinlin);

var _mohayonaoUtilsLinexp = require("@mohayonao/utils/linexp");

var _mohayonaoUtilsLinexp2 = _interopRequireDefault(_mohayonaoUtilsLinexp);

var _constants = require("./constants");

function at(envelope, time) {
  for (var i = 0, imax = envelope.length - 1; i < imax; i++) {
    var e0 = envelope[i];
    var e1 = envelope[i + 1];

    if (e0[_constants.TIME] <= time && time < e1[_constants.TIME]) {
      switch (e1[_constants.TYPE]) {
        case _constants.LIN:
          return (0, _mohayonaoUtilsLinlin2["default"])(time, e0[_constants.TIME], e1[_constants.TIME], e0[_constants.VALUE], e1[_constants.VALUE]);
        case _constants.EXP:
          return (0, _mohayonaoUtilsLinexp2["default"])(time, e0[_constants.TIME], e1[_constants.TIME], e0[_constants.VALUE], e1[_constants.VALUE]);
        default:
          return e0[_constants.VALUE];
      }
    }
  }

  return envelope.length ? envelope[envelope.length - 1][_constants.VALUE] : 0;
}

exports["default"] = { at: at };
module.exports = exports["default"];
},{"./constants":7,"@mohayonao/utils/linexp":21,"@mohayonao/utils/linlin":22}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET = 0;
exports.SET = SET;
var LIN = 1;
exports.LIN = LIN;
var EXP = 2;

exports.EXP = EXP;
var TYPE = 0;
exports.TYPE = TYPE;
var VALUE = 1;
exports.VALUE = VALUE;
var TIME = 2;
exports.TIME = TIME;
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  attackTime: 0.01,
  decayTime: 0.3,
  sustainLevel: 0.5,
  releaseTime: 1,
  gateTime: 1,
  peakLevel: 1,
  epsilon: 1e-3,
  attackCurve: "lin",
  decayCurve: "lin",
  releaseCurve: "lin"
};
module.exports = exports["default"];
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ADSREnvelope = require("./ADSREnvelope");

var _ADSREnvelope2 = _interopRequireDefault(_ADSREnvelope);

exports["default"] = _ADSREnvelope2["default"];
module.exports = exports["default"];
},{"./ADSREnvelope":2}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./lib":13,"dup":1}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OSCILLATOR = typeof Symbol !== "undefined" ? Symbol("OSCILLATOR") : "_@mohayonao/operator:OSCILLATOR";
exports.OSCILLATOR = OSCILLATOR;
var GAIN = typeof Symbol !== "undefined" ? Symbol("GAIN") : "_@mohayonao/operator:GAIN";
exports.GAIN = GAIN;
var ENVELOPES = typeof Symbol !== "undefined" ? Symbol("ENVELOPES") : "_@mohayonao/operator:ENVELOPES";

exports.ENVELOPES = ENVELOPES;

var Operator = (function () {
  function Operator(audioContext) {
    _classCallCheck(this, Operator);

    this[OSCILLATOR] = audioContext.createOscillator();
    this[GAIN] = audioContext.createGain();
    this[ENVELOPES] = {};
  }

  _createClass(Operator, [{
    key: "connect",
    value: function connect(destination) {
      this[OSCILLATOR].connect(this[GAIN]);
      this[GAIN].connect(destination);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _GAIN;

      this[OSCILLATOR].disconnect();
      (_GAIN = this[GAIN]).disconnect.apply(_GAIN, arguments);
    }
  }, {
    key: "start",
    value: function start(when) {
      applyTo(this[ENVELOPES].frequency, this[OSCILLATOR].frequency, when);
      applyTo(this[ENVELOPES].detune, this[OSCILLATOR].detune, when);
      applyTo(this[ENVELOPES].gain, this[GAIN].gain, when);
      this[OSCILLATOR].start(when);
    }
  }, {
    key: "stop",
    value: function stop(when) {
      this[OSCILLATOR].stop(when);
    }
  }, {
    key: "setPeriodicWave",
    value: function setPeriodicWave(periodicWave) {
      this[OSCILLATOR].setPeriodicWave(periodicWave);
    }
  }, {
    key: "setEnvelope",
    value: function setEnvelope(envelope) {
      var target = arguments[1] === undefined ? "gain" : arguments[1];

      this[ENVELOPES][target] = envelope;
    }
  }, {
    key: "getEnvelope",
    value: function getEnvelope() {
      var target = arguments[0] === undefined ? "gain" : arguments[0];

      return this[ENVELOPES][target];
    }
  }, {
    key: "context",
    get: function get() {
      return this[OSCILLATOR].context;
    }
  }, {
    key: "type",
    get: function get() {
      return this[OSCILLATOR].type;
    },
    set: function set(value) {
      this[OSCILLATOR].type = value;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this[OSCILLATOR].frequency;
    }
  }, {
    key: "detune",
    get: function get() {
      return this[OSCILLATOR].detune;
    }
  }, {
    key: "onended",
    get: function get() {
      return this[OSCILLATOR].onended;
    },
    set: function set(value) {
      this[OSCILLATOR].onended = value;
    }
  }, {
    key: "gain",
    get: function get() {
      return this[GAIN].gain;
    }
  }]);

  return Operator;
})();

exports["default"] = Operator;

function applyTo(envelope, audioParam, startTime) {
  if (envelope && typeof envelope.applyTo === "function") {
    envelope.applyTo(audioParam, startTime);
  }
}
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Operator = require("./Operator");

var _Operator2 = _interopRequireDefault(_Operator);

exports["default"] = _Operator2["default"];
module.exports = exports["default"];
},{"./Operator":12}],14:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"./lib":17,"dup":1}],15:[function(require,module,exports){
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
},{"./defaultContext":16,"@mohayonao/defaults":18,"@mohayonao/event-emitter":10}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Timeline = require("./Timeline");

var _Timeline2 = _interopRequireDefault(_Timeline);

exports["default"] = _Timeline2["default"];
module.exports = exports["default"];
},{"./Timeline":15}],18:[function(require,module,exports){
module.exports = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

},{}],19:[function(require,module,exports){
module.exports = function(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
};

},{}],20:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],21:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return Math.pow(outMax / outMin, (value - inMin) / (inMax - inMin)) * outMin;
};

},{}],22:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

},{}],23:[function(require,module,exports){
module.exports = function(midi) {
  return 440 * Math.pow(2, (midi - 69) * 1 / 12);
};

},{}],24:[function(require,module,exports){
module.exports = function(value, rand) {
  rand = rand || Math.random;

  return (rand() * 2 - 1) * value;
};

},{}],25:[function(require,module,exports){
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
  dispose: function() {
    return memo.splice(0);
  },
};

},{"@mohayonao/utils/appendIfNotExists":29,"@mohayonao/utils/removeIfExists":30}],26:[function(require,module,exports){
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

},{"./getAudioContext":28}],27:[function(require,module,exports){
(function (global){
var getAudioContext = require("./getAudioContext");

/* eslint-disable no-unused-vars */

module.exports = function(audioContext, callback) {
  var memo = null;

  if (!("ontouchend" in global)) {
    if (typeof callback === "function") {
      setTimeout(callback, 0);
    }
    return audioContext;
  }

  audioContext = audioContext || getAudioContext();

  function choreFunction() {
    var bufSrc = audioContext.createBufferSource();
    var buffer = audioContext.createBuffer(1, 128, audioContext.sampleRate);

    bufSrc.buffer = buffer;
    bufSrc.start(audioContext.currentTime);
    bufSrc.stop(audioContext.currentTime + buffer.duration);
    bufSrc.connect(audioContext.destination);
    bufSrc.onended = function() {
      bufSrc.disconnect();
      memo = null;
      if (typeof callback === "function") {
        callback();
      }
    };
    memo = bufSrc;

    global.removeEventListener("touchend", choreFunction);
  }

  global.addEventListener("touchend", choreFunction);

  return audioContext;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./getAudioContext":28}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
module.exports = function(array, target) {
  var index = array.indexOf(target);

  if (index !== -1) {
    return false;
  }

  array.push(target);

  return true;
};

},{}],30:[function(require,module,exports){
module.exports = function(array, target) {
  var index = array.indexOf(target);

  if (index === -1) {
    return false;
  }

  array.splice(index, 1);

  return true;
};

},{}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY = "/unebi-sound-test/data";

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

exports["default"] = { save: save, load: load };
module.exports = exports["default"];

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = [{
  name: "void_organ_a1",
  data: require("./data/void_organ_a1"),
  desc: "F#G#A#　連弾2"
},
// {
//   name: "void_organ_a2",
//   desc: "F#　ゆらぎ",
// },
// {
//   name: "void_organ_a3",
//   desc: "D#　ゆらぎ",
// },
// {
//   name: "void_organ_a4",
//   desc: "低音F#　高音D#",
// },
{
  name: "void_organ_b1",
  data: require("./data/void_organ_b1"),
  desc: "低音単音　F　ゆらぎ"
}, {
  name: "void_organ_b2",
  data: require("./data/void_organ_b2"),
  desc: "クラスター音"
}, {
  name: "void_organ_b3",
  data: require("./data/void_organ_b3"),
  desc: "コード　B　D"
}, {
  name: "void_organ_b4",
  data: require("./data/void_organ_b4"),
  desc: "高周波の電子音"
}, {
  name: "void_organ_c1",
  data: require("./data/void_organ_c1"),
  desc: "コード B D C"
}, {
  name: "void_organ_c2",
  data: require("./data/void_organ_c2"),
  desc: "単音　B D G　フェードインアウト"
},
// {
//   name: "void_organ_c3",
//   desc: "単音　B　スウィープ",
// },
{
  name: "void_organ_c4",
  data: require("./data/void_organ_c4"),
  desc: "単音　D　ゆらぎ"
}, {
  name: "void_organ_d1",
  data: require("./data/void_organ_d1"),
  desc: "単音　B"
}, {
  name: "void_organ_d2",
  data: require("./data/void_organ_d2"),
  desc: "単音　E　ゆらぎ"
},
// {
//   name: "void_organ_d3",
//   desc: "単音　E　ゆらぎ(2)",
// },
{
  name: "void_organ_d4",
  data: require("./data/void_organ_d4"),
  desc: "コード　C G"
}];
module.exports = exports["default"];

},{"./data/void_organ_a1":35,"./data/void_organ_b1":36,"./data/void_organ_b2":37,"./data/void_organ_b3":38,"./data/void_organ_b4":39,"./data/void_organ_c1":40,"./data/void_organ_c2":41,"./data/void_organ_c4":42,"./data/void_organ_d1":43,"./data/void_organ_d2":44,"./data/void_organ_d4":45}],34:[function(require,module,exports){
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

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay = require("@mohayonao/web-audio-utils/enableMobileAutoPlay");

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay2 = _interopRequireDefault(_mohayonaoWebAudioUtilsEnableMobileAutoPlay);

var _sounds = require("./sounds");

var _sounds2 = _interopRequireDefault(_sounds);

var Player = (function (_EventEmitter) {
  _inherits(Player, _EventEmitter);

  function Player() {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this);

    this.audioContext = (0, _mohayonaoWebAudioUtilsEnableMobileAutoPlay2["default"])((0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])());
    this.timeline = new _mohayonaoTimeline2["default"]({ context: this.audioContext, timerAPI: _workerTimer2["default"] });

    this.outlet = this.audioContext.createGain();
    this.outlet.connect(this.audioContext.destination);
  }

  _createClass(Player, [{
    key: "play",
    value: function play(_ref) {
      var _this = this;

      var name = _ref.name;
      var data = _ref.data;

      if (!data || data.length === 0 || !_sounds2["default"][name]) {
        return;
      }
      var lastItem = data[data.length - 1];
      var currentTime = this.timeline.currentTime;
      var totalDuration = lastItem.time + lastItem.duration;
      var soundFunc = _sounds2["default"][name].play;
      var outlet = this.outlet;

      if (typeof _sounds2["default"][name].router === "function") {
        (function () {
          var router = _sounds2["default"][name].router(currentTime, totalDuration);

          router.outlet.connect(_this.outlet);

          _this.timeline.insert(currentTime + totalDuration + 0.25, function () {
            router.dispose();
          });

          outlet = router.inlet;
        })();
      }

      data.forEach(function (_ref2) {
        var time = _ref2.time;
        var noteNumber = _ref2.noteNumber;
        var duration = _ref2.duration;

        var playbackTime = currentTime + time;

        _this.timeline.insert(playbackTime, soundFunc, [outlet, { noteNumber: noteNumber, duration: duration }]);
      });

      this.timeline.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.timeline.stop(true);
    }
  }]);

  return Player;
})(_mohayonaoEventEmitter2["default"]);

exports["default"] = Player;
module.exports = exports["default"];

},{"./sounds":46,"@mohayonao/event-emitter":10,"@mohayonao/timeline":14,"@mohayonao/web-audio-utils/enableMobileAutoPlay":27,"@mohayonao/web-audio-utils/getAudioContext":28,"worker-timer":31}],35:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 0.15748093785718084,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 0.32579454536549746,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 0.48505603397265074,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 0.637876379294321,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 0.7998949472885579,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 0.9662885451875627,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 1.1196218254510313,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 1.2632636165525764,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 1.4255055115465074,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 1.5913213717844337,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 1.74286953558214,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 1.9039593105856327,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 2.055202420921996,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 2.1984972709603605,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 2.3452787992358206,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 2.5155179999954997,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 2.6882137964479624,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 2.838090210435912,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 3.013157050618902,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 3.1665828421339395,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 3.31673862926662,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 3.474485566997901,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 3.6206109885033224,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 3.7654539549071346,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 3.914699605396018,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 4.0809986006934205,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 4.222062855828554,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 4.368995171748102,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 4.533391642924398,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 4.710052937911823,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 4.879043073039502,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 5.041125883786008,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 5.1830882602371275,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 5.345993382483721,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 5.5034491040464495,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 5.653169595832005,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 5.819983575372025,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 5.974273238182068,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 6.11471122561954,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 6.255363933062181,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 6.397994184801355,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 6.556255485769362,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 6.702222385657952,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 6.878593669906259,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 7.024791899584234,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 7.193182097133249,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 7.343417199067772,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 7.515220612678677,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 7.673900930704549,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 7.838928738469257,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 7.991019830573349,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 8.158018814576788,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 8.332314654504879,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 8.484333551526069,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 8.646715220473705,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 8.808893230492249,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 8.968874189546332,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 9.138163726739586,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 9.280543138403447,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 9.422925263587386,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 9.602415925888344,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 9.750362808471545,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 9.912836341941729,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 10.066822018334642,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 10.211878622760997,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 10.386850377060474,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 10.559070876305924,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 10.71326827689074,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 10.89111785857007,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 11.052066152552143,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 11.223156865136698,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 11.369326362013817,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 11.532055297270418,
    "noteNumber": 68,
    "duration": 0.2
  },
  {
    "time": 11.678633512938395,
    "noteNumber": 70,
    "duration": 0.2
  },
  {
    "time": 11.820357273714617,
    "noteNumber": 66,
    "duration": 0.2
  },
  {
    "time": 11.978133876565844,
    "noteNumber": 68,
    "duration": 0.2
  }
]

},{}],36:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 65,
    "duration": 12
  }
]

},{}],37:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 68,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 69,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 70,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 71,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 72,
    "duration": 12
  },
  {
    "time": 1.4,
    "noteNumber": 73,
    "duration": 10.6
  },
  {
    "time": 1.4,
    "noteNumber": 74,
    "duration": 10.6
  },
]

},{}],38:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 71,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 74,
    "duration": 12
  },
]

},{}],39:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 114,
    "duration": 12
  }
]

},{}],40:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 71,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 74,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 79,
    "duration": 12
  }
]

},{}],41:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 71,
    "duration": 2
  },
  {
    "time": 1.9595,
    "noteNumber": 74,
    "duration": 2
  },
  {
    "time": 4.0422,
    "noteNumber": 79,
    "duration": 2
  }
]

},{}],42:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 0.38,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 0.9400000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 1.32,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 1.8800000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 2.2600000000000002,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 2.8200000000000003,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 3.2,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 3.7600000000000002,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 4.140000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 4.700000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 5.080000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 5.640000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 6.0200000000000005,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 6.58,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 6.96,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 7.52,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 7.8999999999999995,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 8.459999999999999,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 8.84,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 9.4,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 9.780000000000001,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 10.340000000000002,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 10.720000000000002,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 11.280000000000003,
    "noteNumber": 86,
    "duration": 2
  },
  {
    "time": 11.660000000000004,
    "noteNumber": 86,
    "duration": 2
  }
]

},{}],43:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 83,
    "duration": 12
  }
]

},{}],44:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 88,
    "duration": 12
  }
]

},{}],45:[function(require,module,exports){
module.exports=[
  {
    "time": 0,
    "noteNumber": 72,
    "duration": 12
  },
  {
    "time": 0,
    "noteNumber": 79,
    "duration": 12
  },
]

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  void_organ_a1: require("./void_organ_a1"),
  void_organ_b1: require("./void_organ_b1"),
  void_organ_b2: require("./void_organ_b2"),
  void_organ_b3: require("./void_organ_b3"),
  void_organ_b4: require("./void_organ_b4"),
  void_organ_c1: require("./void_organ_c1"),
  void_organ_c2: require("./void_organ_c2"),
  void_organ_c4: require("./void_organ_c4"),
  void_organ_d1: require("./void_organ_d1"),
  void_organ_d2: require("./void_organ_d2"),
  void_organ_d4: require("./void_organ_d4")
};
module.exports = exports["default"];

},{"./void_organ_a1":47,"./void_organ_b1":48,"./void_organ_b2":49,"./void_organ_b3":50,"./void_organ_b4":51,"./void_organ_c1":52,"./void_organ_c2":53,"./void_organ_c4":54,"./void_organ_d1":55,"./void_organ_d2":56,"./void_organ_d4":57}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function router(currentTime, totalDuration) {
  var gain = audioContext.createGain();

  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.linearRampToValueAtTime(0.5, currentTime + totalDuration * 0.5);
  gain.gain.linearRampToValueAtTime(0, currentTime + totalDuration);

  return {
    inlet: gain,
    outlet: gain,
    dispose: function dispose() {
      gain.disconnect();
    }
  };
}

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 0.005,
    decayTime: 0.25,
    sustainLevel: 0.8,
    releaseTime: 0.05,
    peakLevel: 0.125 + (0, _mohayonaoUtilsRand22["default"])(1) * 0.05
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    osc.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { router: router, play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.4,
    attackCurve: "exp"
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc1.detune.value = +25;
  osc1.start(t0);
  osc1.stop(t1);
  osc1.onended = function () {
    osc1.disconnect();
    osc2.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc1);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc1);
  osc1.connect(lpf);

  osc2.type = "sawtooth";
  osc2.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc2.detune.value = -25;
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function router() {
  var lpf = audioContext.createBiquadFilter();

  lpf.type = "lowpass";
  lpf.frequency.value = 660;
  lpf.Q.value = 12;

  return {
    inlet: lpf,
    outlet: lpf,
    dispose: function dispose() {
      lpf.disconnect();
    }
  };
}

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.0078125,
    attackCurve: "exp"
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.detune.value = 0;
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    osc.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { router: router, play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoOperator = require("@mohayonao/operator");

var _mohayonaoOperator2 = _interopRequireDefault(_mohayonaoOperator);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.1,
    attackCurve: "exp"
  });
  env.duration = duration;

  var lfo = new _mohayonaoOperator2["default"](audioContext);
  var osc = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();
  var t0 = playbackTime;
  var t1 = t0 + env.duration;

  lfo.frequency.value = 6;
  lfo.gain.setValueAtTime(6, t0);
  lfo.gain.linearRampToValueAtTime(12, t1);
  lfo.start(t0);
  lfo.stop(t1);
  lfo.connect(osc.detune);

  osc.type = "sawtooth";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    lfo.disconnect();
    osc.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, playbackTime);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/operator":11,"@mohayonao/utils/midicps":23,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsCreateAudioBufferFromArray = require("@mohayonao/web-audio-utils/createAudioBufferFromArray");

var _mohayonaoWebAudioUtilsCreateAudioBufferFromArray2 = _interopRequireDefault(_mohayonaoWebAudioUtilsCreateAudioBufferFromArray);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var impulses = new Float32Array(2560);

impulses[0] = 0.5;
impulses[1] = -0.25;
impulses[2] = +0.25;

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
var buffer = (0, _mohayonaoWebAudioUtilsCreateAudioBufferFromArray2["default"])([impulses], audioContext);

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.2,
    attackCurve: "exp"
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var buf = audioContext.createBufferSource();
  var gain = audioContext.createGain();

  osc1.frequency.value = 10000;
  osc1.detune.value = +4;
  osc1.start(t0);
  osc1.stop(t1);
  osc1.connect(gain);
  osc1.onended = function () {
    osc1.disconnect();
    osc2.disconnect();
    buf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc1);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc1);

  osc2.frequency.value = 10000;
  osc2.detune.value = -4;
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(gain);

  buf.buffer = buffer;
  buf.loop = true;
  buf.start(t0);
  buf.stop(t1);

  buf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/createAudioBufferFromArray":26,"@mohayonao/web-audio-utils/getAudioContext":28}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function router(currentTime, totalDuration) {
  var gain = audioContext.createGain();

  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.linearRampToValueAtTime(0.5, currentTime + totalDuration * 0.5);
  gain.gain.linearRampToValueAtTime(0, currentTime + totalDuration);

  return {
    inlet: gain,
    outlet: gain,
    dispose: function dispose() {
      gain.diconnect();
    }
  };
}

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 0.005,
    decayTime: 0.25,
    sustainLevel: 0.8,
    releaseTime: 0.05,
    peakLevel: 0.0625
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc1.detune.value = +2;
  osc1.start(t0);
  osc1.stop(t1);
  osc1.onended = function () {
    osc1.disconnect();
    osc2.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc1);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc1);
  osc1.connect(lpf);

  osc2.type = "sawtooth";
  osc2.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc2.detune.value = -2;
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { router: router, play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 0.25,
    decayTime: 0,
    sustainLevel: 1,
    releaseTime: 1.75,
    peakLevel: 0.03125,
    attackCurve: "exp",
    releaseCurve: "exp"
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc1.detune.setValueAtTime(8, t0);
  osc1.detune.linearRampToValueAtTime(10, t1);
  osc1.start(t0);
  osc1.stop(t1);
  osc1.onended = function () {
    osc1.disconnect();
    osc2.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc1);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc1);
  osc1.connect(lpf);

  osc2.type = "sawtooth";
  osc2.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc2.detune.setValueAtTime(-8, t0);
  osc2.detune.linearRampToValueAtTime(-10, t1);
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 24;
  lpf.connect(gain);

  env.applyTo(gain.gain, playbackTime);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function router(currentTime, totalDuration) {
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  lpf.type = "lowpass";
  lpf.frequency.value = 1200;
  lpf.Q.value = 24;
  lpf.connect(gain);

  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.linearRampToValueAtTime(0.5, currentTime + totalDuration * 0.5);
  gain.gain.linearRampToValueAtTime(0, currentTime + totalDuration);

  return {
    inlet: lpf,
    outlet: gain,
    dispose: function dispose() {
      inlet.disconnect();
      outlet.disconnect();
    }
  };
}

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 0.125,
    decayTime: 0.125,
    sustainLevel: 0.025,
    releaseTime: 1.25,
    peakLevel: 0.015625,
    attackCurve: "exp",
    releaseCurve: "exp"
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc1.detune.setValueAtTime(8, t0);
  osc1.detune.linearRampToValueAtTime(10, t1);
  osc1.start(t0);
  osc1.stop(t1);
  osc1.onended = function () {
    osc1.disconnect();
    osc2.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc1);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc1);
  osc1.connect(gain);

  osc2.type = "sawtooth";
  osc2.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc2.detune.setValueAtTime(-8, t0);
  osc2.detune.linearRampToValueAtTime(-10, t1);
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { router: router, play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoOperator = require("@mohayonao/operator");

var _mohayonaoOperator2 = _interopRequireDefault(_mohayonaoOperator);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 8,
    decayTime: 2,
    sustainLevel: 0.8,
    releaseTime: 2,
    peakLevel: 0.125
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc = audioContext.createOscillator();
  var lfo = new _mohayonaoOperator2["default"](audioContext);
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  lfo.frequency.value = 6;
  lfo.gain.value = 5;
  lfo.start(t0);
  lfo.stop(t1);
  lfo.connect(osc.detune);

  osc.type = "triangle";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    osc.disconnect();
    lfo.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/operator":11,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoOperator = require("@mohayonao/operator");

var _mohayonaoOperator2 = _interopRequireDefault(_mohayonaoOperator);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 8,
    decayTime: 2,
    sustainLevel: 0.8,
    releaseTime: 2,
    peakLevel: 0.125
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc = audioContext.createOscillator();
  var lfo1 = new _mohayonaoOperator2["default"](audioContext);
  var lfo2 = new _mohayonaoOperator2["default"](audioContext);
  var lpf = audioContext.createBiquadFilter();
  var gain1 = audioContext.createGain();
  var gain2 = audioContext.createGain();

  osc.type = "triangle";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.detune.value = +4;
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    osc.disconnect();
    lfo1.disconnect();
    lfo2.disconnect();
    lpf.disconnect();
    gain1.disconnect();
    gain2.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(gain1);

  lfo1.frequency.value = 5;
  lfo1.gain.value = 0.25;
  lfo1.start(t0);
  lfo1.stop(t1);
  lfo1.connect(gain1.gain);
  gain1.gain.value = 0;

  gain1.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 24;
  lpf.connect(gain2);

  lfo2.frequency.value = 5;
  lfo2.gain.value = 120;
  lfo2.start(t0);
  lfo2.stop(t1);
  lfo2.connect(lpf.frequency);

  env.applyTo(gain2.gain, t0);
  gain2.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/operator":11,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoOperator = require("@mohayonao/operator");

var _mohayonaoOperator2 = _interopRequireDefault(_mohayonaoOperator);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsGCGuard = require("@mohayonao/web-audio-utils/GCGuard");

var _mohayonaoWebAudioUtilsGCGuard2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGCGuard);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRand2 = require("@mohayonao/utils/rand2");

var _mohayonaoUtilsRand22 = _interopRequireDefault(_mohayonaoUtilsRand2);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

function play(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 2);

  var outlet = _ref$args[0];
  var _ref$args$1 = _ref$args[1];
  var noteNumber = _ref$args$1.noteNumber;
  var duration = _ref$args$1.duration;

  var env = new _mohayonaoAdsrEnvelope2["default"]({
    attackTime: 8,
    decayTime: 2,
    sustainLevel: 0.8,
    releaseTime: 2,
    peakLevel: 0.125
  });
  env.duration = duration;

  var t0 = playbackTime;
  var t1 = t0 + env.duration;
  var osc = audioContext.createOscillator();
  var lfo = new _mohayonaoOperator2["default"](audioContext);
  var lpf = audioContext.createBiquadFilter();
  var gain = audioContext.createGain();

  lfo.frequency.value = 6;
  lfo.gain.value = 5;
  lfo.start(t0);
  lfo.stop(t1);
  lfo.connect(osc.detune);

  osc.type = "triangle";
  osc.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = function () {
    osc.disconnect();
    lfo.disconnect();
    lpf.disconnect();
    gain.disconnect();
    _mohayonaoWebAudioUtilsGCGuard2["default"].remove(osc);
  };
  _mohayonaoWebAudioUtilsGCGuard2["default"].append(osc);
  osc.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

exports["default"] = { play: play };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/operator":11,"@mohayonao/utils/midicps":23,"@mohayonao/utils/rand2":24,"@mohayonao/web-audio-utils/GCGuard":25,"@mohayonao/web-audio-utils/getAudioContext":28}],58:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Patterns = require("./Patterns");

var _Patterns2 = _interopRequireDefault(_Patterns);

var _LocalStorage = require("./LocalStorage");

var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

global.onload = function () {
  var player = new _Player2["default"]();
  var app = new Vue({
    el: "#app",
    data: {
      selected: "",
      options: _Patterns2["default"].map(function (_ref) {
        var name = _ref.name;
        return name;
      }),
      desc: ""
    },
    methods: {
      onClick: function onClick() {
        var _this = this;

        player.stop();

        if (this.selected) {
          var patterns = _Patterns2["default"].filter(function (_ref2) {
            var name = _ref2.name;
            return name === _this.selected;
          });

          if (patterns.length) {
            player.play(patterns[0]);
          }
        }
      },
      onChange: function onChange() {
        var _this2 = this;

        if (this.selected) {
          var patterns = _Patterns2["default"].filter(function (_ref3) {
            var name = _ref3.name;
            return name === _this2.selected;
          });

          if (patterns.length) {
            this.desc = patterns[0].desc;
          }

          _LocalStorage2["default"].save({ selected: this.selected });
        }
      }
    }
  });

  app.selected = _LocalStorage2["default"].load().selected || "";
  app.onChange();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./LocalStorage":32,"./Patterns":33,"./Player":34}]},{},[58]);
