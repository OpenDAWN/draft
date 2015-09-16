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
    value: function valueAt(time) {
      return this._.valueAt(time);
    }
  }, {
    key: "applyTo",
    value: function applyTo(audioParam, playbackTime) {
      this.getWebAudioAPIMethods().forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var method = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];

        audioParam[method](value, time + playbackTime);
      });

      return this;
    }
  }, {
    key: "getWebAudioAPIMethods",
    value: function getWebAudioAPIMethods() {
      return this._.methods();
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
    value: function methods() {
      return this.envelope.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var type = _ref2[0];
        var value = _ref2[1];
        var time = _ref2[2];
        return [method(type), value, time];
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
},{"./EnvelopeBuilder":4,"./EnvelopeValue":6,"./constants":7,"./defaultValues":8,"@mohayonao/utils/constrain":10,"@mohayonao/utils/defaults":11}],4:[function(require,module,exports){
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
},{"./EnvelopeReducer":5,"./constants":7,"@mohayonao/utils/linexp":12,"@mohayonao/utils/linlin":13}],5:[function(require,module,exports){
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
},{"./constants":7,"@mohayonao/utils/linexp":12,"@mohayonao/utils/linlin":13}],7:[function(require,module,exports){
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
module.exports = function(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
};

},{}],11:[function(require,module,exports){
module.exports = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

},{}],12:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return Math.pow(outMax / outMin, (value - inMin) / (inMax - inMin)) * outMin;
};

},{}],13:[function(require,module,exports){
module.exports = function(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
};

},{}],14:[function(require,module,exports){
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
},{"./defaultContext":16,"@mohayonao/defaults":18,"@mohayonao/event-emitter":19}],16:[function(require,module,exports){
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
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = function(midi) {
  return 440 * Math.pow(2, (midi - 69) * 1 / 12);
};

},{}],21:[function(require,module,exports){
module.exports = function(array, target) {
  var index = array.indexOf(target);

  if (index === -1) {
    return false;
  }

  array.splice(index, 1);

  return true;
};

},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){

},{}],24:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":25}],25:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
module.exports=[
  {"hexcode":"0x00", "family":"Piano", "instrument":"Acoustic Grand Piano"},
  {"hexcode":"0x01", "family":"Piano", "instrument":"Bright Acoustic Piano"},
  {"hexcode":"0x02", "family":"Piano", "instrument":"Electric Grand Piano"},
  {"hexcode":"0x03", "family":"Piano", "instrument":"Honky-tonk Piano"},
  {"hexcode":"0x04", "family":"Piano", "instrument":"Electric Piano 1"},
  {"hexcode":"0x05", "family":"Piano", "instrument":"Electric Piano 2"},
  {"hexcode":"0x06", "family":"Piano", "instrument":"Harpsichord"},
  {"hexcode":"0x07", "family":"Piano", "instrument":"Clavichord"},
  {"hexcode":"0x08", "family":"Chromatic Percussion", "instrument":"Celesta"},
  {"hexcode":"0x09", "family":"Chromatic Percussion", "instrument":"Glockenspiel"},
  {"hexcode":"0x0A", "family":"Chromatic Percussion", "instrument":"Music Box"},
  {"hexcode":"0x0B", "family":"Chromatic Percussion", "instrument":"Vibraphone"},
  {"hexcode":"0x0C", "family":"Chromatic Percussion", "instrument":"Marimba"},
  {"hexcode":"0x0D", "family":"Chromatic Percussion", "instrument":"Xylophone"},
  {"hexcode":"0x0E", "family":"Chromatic Percussion", "instrument":"Tubular bells"},
  {"hexcode":"0x0F", "family":"Chromatic Percussion", "instrument":"Dulcimer"},
  {"hexcode":"0x10", "family":"Organ", "instrument":"Drawbar Organ"},
  {"hexcode":"0x11", "family":"Organ", "instrument":"Percussive Organ"},
  {"hexcode":"0x12", "family":"Organ", "instrument":"Rock Organ"},
  {"hexcode":"0x13", "family":"Organ", "instrument":"Church Organ"},
  {"hexcode":"0x14", "family":"Organ", "instrument":"Reed Organ"},
  {"hexcode":"0x15", "family":"Organ", "instrument":"Accordion"},
  {"hexcode":"0x16", "family":"Organ", "instrument":"Harmonica"},
  {"hexcode":"0x17", "family":"Organ", "instrument":"Tango Accordion"},
  {"hexcode":"0x18", "family":"Guitar", "instrument":"Acoustic Guitar (nylon)"},
  {"hexcode":"0x19", "family":"Guitar", "instrument":"Acoustic Guitar (steel)"},
  {"hexcode":"0x1A", "family":"Guitar", "instrument":"Electric Guitar (jazz)"},
  {"hexcode":"0x1B", "family":"Guitar", "instrument":"Electric Guitar (clean)"},
  {"hexcode":"0x1C", "family":"Guitar", "instrument":"Electric Guitar (muted)"},
  {"hexcode":"0x1D", "family":"Guitar", "instrument":"Overdriven Guitar"},
  {"hexcode":"0x1E", "family":"Guitar", "instrument":"Distortion Guitar"},
  {"hexcode":"0x1F", "family":"Guitar", "instrument":"Guitar harmonics"},
  {"hexcode":"0x20", "family":"Bass", "instrument":"Acoustic Bass"},
  {"hexcode":"0x21", "family":"Bass", "instrument":"Electric Bass (finger)"},
  {"hexcode":"0x22", "family":"Bass", "instrument":"Electric Bass (pick)"},
  {"hexcode":"0x23", "family":"Bass", "instrument":"Fretless Bass"},
  {"hexcode":"0x24", "family":"Bass", "instrument":"Slap Bass 1"},
  {"hexcode":"0x25", "family":"Bass", "instrument":"Slap bass 2"},
  {"hexcode":"0x26", "family":"Bass", "instrument":"Synth Bass 1"},
  {"hexcode":"0x27", "family":"Bass", "instrument":"Synth Bass 2"},
  {"hexcode":"0x28", "family":"Strings", "instrument":"Violin"},
  {"hexcode":"0x29", "family":"Strings", "instrument":"Viola"},
  {"hexcode":"0x2A", "family":"Strings", "instrument":"Cello"},
  {"hexcode":"0x2B", "family":"Strings", "instrument":"Contrabass"},
  {"hexcode":"0x2C", "family":"Strings", "instrument":"Tremolo Strings"},
  {"hexcode":"0x2D", "family":"Strings", "instrument":"Pizzicato Strings"},
  {"hexcode":"0x2E", "family":"Strings", "instrument":"Orchestral Harp"},
  {"hexcode":"0x2F", "family":"Strings", "instrument":"Timpani"},
  {"hexcode":"0x30", "family":"Ensemble", "instrument":"String Ensemble 1"},
  {"hexcode":"0x31", "family":"Ensemble", "instrument":"String Ensemble 2"},
  {"hexcode":"0x32", "family":"Ensemble", "instrument":"SynthStrings 1"},
  {"hexcode":"0x33", "family":"Ensemble", "instrument":"SynthStrings 2"},
  {"hexcode":"0x34", "family":"Ensemble", "instrument":"Choir Aahs"},
  {"hexcode":"0x35", "family":"Ensemble", "instrument":"Voice Oohs"},
  {"hexcode":"0x36", "family":"Ensemble", "instrument":"Synth Voice"},
  {"hexcode":"0x37", "family":"Ensemble", "instrument":"Orchestra Hit"},
  {"hexcode":"0x38", "family":"Brass", "instrument":"Trumpet"},
  {"hexcode":"0x39", "family":"Brass", "instrument":"Trombone"},
  {"hexcode":"0x3A", "family":"Brass", "instrument":"Tuba"},
  {"hexcode":"0x3B", "family":"Brass", "instrument":"Muted Trombone"},
  {"hexcode":"0x3C", "family":"Brass", "instrument":"French Horn"},
  {"hexcode":"0x3D", "family":"Brass", "instrument":"Brass Section"},
  {"hexcode":"0x3E", "family":"Brass", "instrument":"SynthBrass 1"},
  {"hexcode":"0x3F", "family":"Brass", "instrument":"SynthBrass 2"},
  {"hexcode":"0x40", "family":"Reed", "instrument":"Soprano Sax"},
  {"hexcode":"0x41", "family":"Reed", "instrument":"Alto Sax"},
  {"hexcode":"0x42", "family":"Reed", "instrument":"Tenor Sax"},
  {"hexcode":"0x43", "family":"Reed", "instrument":"Baritone Sax"},
  {"hexcode":"0x44", "family":"Reed", "instrument":"Oboe"},
  {"hexcode":"0x45", "family":"Reed", "instrument":"English Horn"},
  {"hexcode":"0x46", "family":"Reed", "instrument":"Bassoon"},
  {"hexcode":"0x47", "family":"Reed", "instrument":"Clarinet"},
  {"hexcode":"0x48", "family":"Pipe", "instrument":"Piccolo"},
  {"hexcode":"0x49", "family":"Pipe", "instrument":"Flute"},
  {"hexcode":"0x4A", "family":"Pipe", "instrument":"Recorder"},
  {"hexcode":"0x4B", "family":"Pipe", "instrument":"Pan Flute"},
  {"hexcode":"0x4C", "family":"Pipe", "instrument":"Blown Bottle"},
  {"hexcode":"0x4D", "family":"Pipe", "instrument":"Shakuhachi"},
  {"hexcode":"0x4E", "family":"Pipe", "instrument":"Whistle"},
  {"hexcode":"0x4F", "family":"Pipe", "instrument":"Ocarina"},
  {"hexcode":"0x50", "family":"Synth Lead", "instrument":"Lead 1 (square)"},
  {"hexcode":"0x51", "family":"Synth Lead", "instrument":"Lead 2 (sawtooth)"},
  {"hexcode":"0x52", "family":"Synth Lead", "instrument":"Lead 3 (calliope)"},
  {"hexcode":"0x53", "family":"Synth Lead", "instrument":"Lead 4 (chiff)"},
  {"hexcode":"0x54", "family":"Synth Lead", "instrument":"Lead 5 (charang)"},
  {"hexcode":"0x55", "family":"Synth Lead", "instrument":"Lead 6 (voice)"},
  {"hexcode":"0x56", "family":"Synth Lead", "instrument":"Lead 7 (fifths)"},
  {"hexcode":"0x57", "family":"Synth Lead", "instrument":"Lead 8 (bass + lead)"},
  {"hexcode":"0x58", "family":"Synth Pad", "instrument":"Pad 1 (new age)"},
  {"hexcode":"0x59", "family":"Synth Pad", "instrument":"Pad 2 (warm)"},
  {"hexcode":"0x5A", "family":"Synth Pad", "instrument":"Pad 3 (polysynth)"},
  {"hexcode":"0x5B", "family":"Synth Pad", "instrument":"Pad 4 (choir)"},
  {"hexcode":"0x5C", "family":"Synth Pad", "instrument":"Pad 5 (bowed)"},
  {"hexcode":"0x5D", "family":"Synth Pad", "instrument":"Pad 6 (metallic)"},
  {"hexcode":"0x5E", "family":"Synth Pad", "instrument":"Pad 7 (halo)"},
  {"hexcode":"0x5F", "family":"Synth Pad", "instrument":"Pad 8 (sweep)"},
  {"hexcode":"0x60", "family":"Synth Effects", "instrument":"FX 1 (rain)"},
  {"hexcode":"0x61", "family":"Synth Effects", "instrument":"FX 2 (soundtrack)"},
  {"hexcode":"0x62", "family":"Synth Effects", "instrument":"FX 3 (crystal)"},
  {"hexcode":"0x63", "family":"Synth Effects", "instrument":"FX 4 (atmosphere)"},
  {"hexcode":"0x64", "family":"Synth Effects", "instrument":"FX 5 (brightness)"},
  {"hexcode":"0x65", "family":"Synth Effects", "instrument":"FX 6 (goblins)"},
  {"hexcode":"0x66", "family":"Synth Effects", "instrument":"FX 7 (echoes)"},
  {"hexcode":"0x67", "family":"Synth Effects", "instrument":"FX 8 (sci-fi)"},
  {"hexcode":"0x68", "family":"Ethnic", "instrument":"Sitar"},
  {"hexcode":"0x69", "family":"Ethnic", "instrument":"Banjo"},
  {"hexcode":"0x6A", "family":"Ethnic", "instrument":"Shamisen"},
  {"hexcode":"0x6B", "family":"Ethnic", "instrument":"Koto"},
  {"hexcode":"0x6C", "family":"Ethnic", "instrument":"Kalimba"},
  {"hexcode":"0x6D", "family":"Ethnic", "instrument":"Bag pipe"},
  {"hexcode":"0x6E", "family":"Ethnic", "instrument":"Fiddle"},
  {"hexcode":"0x6F", "family":"Ethnic", "instrument":"Shanai"},
  {"hexcode":"0x70", "family":"Percussive", "instrument":"Tinkle Bell"},
  {"hexcode":"0x71", "family":"Percussive", "instrument":"Agogo"},
  {"hexcode":"0x72", "family":"Percussive", "instrument":"Steel Drums"},
  {"hexcode":"0x73", "family":"Percussive", "instrument":"Woodblock"},
  {"hexcode":"0x74", "family":"Percussive", "instrument":"Taiko Drum"},
  {"hexcode":"0x75", "family":"Percussive", "instrument":"Melodic Tom"},
  {"hexcode":"0x76", "family":"Percussive", "instrument":"Synth Drum"},
  {"hexcode":"0x77", "family":"Percussive", "instrument":"Reverse Cymbal"},
  {"hexcode":"0x78", "family":"Sound Effects", "instrument":"Guitar Fret Noise"},
  {"hexcode":"0x79", "family":"Sound Effects", "instrument":"Breath Noise"},
  {"hexcode":"0x7A", "family":"Sound Effects", "instrument":"Seashore"},
  {"hexcode":"0x7B", "family":"Sound Effects", "instrument":"Bird Tweet"},
  {"hexcode":"0x7C", "family":"Sound Effects", "instrument":"Telephone Ring"},
  {"hexcode":"0x7D", "family":"Sound Effects", "instrument":"Helicopter"},
  {"hexcode":"0x7E", "family":"Sound Effects", "instrument":"Applause"},
  {"hexcode":"0x7F", "family":"Sound Effects", "instrument":"Gunshot"}
]

},{}],27:[function(require,module,exports){
var fs = require('fs')
  , midiParser = require('midi-file-parser')
  , path = require('path')
  , Midi = require('jsmidgen')
  , instruments = require('./instruments.json');

module.exports = {
  midiToJson: function(midi) {
    return midiParser(midi);
  },
  jsonToMidi: function(songJson) {
    var file = new Midi.File();

    songJson.tracks.forEach(function(t) {
      var track = new Midi.Track();
      file.addTrack(track);

      t.forEach(function(note) {
        if (note.subtype === 'programChange') {
          var instrument = instruments[note.programNumber].hexcode;
          track.setInstrument(note.channel, instrument);
        } else if (note.subtype === 'setTempo') {
          var microsecondsPerBeat = note.microsecondsPerBeat;
          var microsecondsPerMin = 60000000;
          var ticksPerBeat = songJson.header.ticksPerBeat;
          var bpm = (ticksPerBeat/128)*microsecondsPerMin/microsecondsPerBeat;
          track.setTempo(bpm, note.deltaTime);
        } else if (note.subtype === 'noteOn') {
          var noteStr = noteFromMidiPitch(note.noteNumber);
          track.addNoteOn(note.channel, noteStr, note.deltaTime, note.velocity);
        } else if (note.subtype === 'noteOff') {
          var noteStr = noteFromMidiPitch(note.noteNumber);
          track.addNoteOff(note.channel, noteStr, note.deltaTime);
        } else if ( note != 'undefined' && note != null
              && note.hasOwnProperty("deltaTime") &&   typeof note.channel !== 'undefined'
              && ( note.channel >= 0 &&  note.channel < 16 ) ) {
          // Work around: dummy pitchbend (with no bending) instead various controller messages
          // until proper encoding calls are implemented (probably in jsmidgen)
          // This is needed in order to maintain correct deltaTime
          var pitchBend = new Midi.Event(
            {
              time:   note.deltaTime,
              type:   Midi.Event.PITCH_BEND,
              param1: 0x00, // LSB of centered
              param2: 0x40  // MSB of centered
             });
          track.addEvent(pitchBend);
        }
      });
    });

    return file.toBytes();

    function noteFromMidiPitch(p) {
      var noteDict = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
      var octave = Math.floor((p-12)/12);
      var note = noteDict[p-octave*12-12];
      return note+octave;
    }
  }
};

},{"./instruments.json":26,"fs":23,"jsmidgen":28,"midi-file-parser":29,"path":24}],28:[function(require,module,exports){
var Midi = {};

(function(exported) {

	var DEFAULT_VOLUME   = exported.DEFAULT_VOLUME   = 90;
	var DEFAULT_DURATION = exported.DEFAULT_DURATION = 128;
	var DEFAULT_CHANNEL  = exported.DEFAULT_CHANNEL  = 0;

	/* ******************************************************************
	 * Utility functions
	 ****************************************************************** */

	var Util = {

		midi_letter_pitches: { a:21, b:23, c:12, d:14, e:16, f:17, g:19 },

		midiPitchFromNote: function(n) {
			var matches = /([a-g])(#+|b+)?([0-9]+)$/i.exec(n);
			var note = matches[1].toLowerCase(), accidental = matches[2] || '', octave = parseInt(matches[3], 10);
			return (12 * octave) + Util.midi_letter_pitches[note] + (accidental.substr(0,1)=='#'?1:-1) * accidental.length;
		},

		ensureMidiPitch: function(p) {
			if (typeof p == 'number' || !/[^0-9]/.test(p)) {
				// numeric pitch
				return parseInt(p, 10);
			} else {
				// assume it's a note name
				return Util.midiPitchFromNote(p);
			}
		},

		midi_pitches_letter: { '12':'c', '13':'c#', '14':'d', '15':'d#', '16':'e', '17':'f', '18':'f#', '19':'g', '20':'g#', '21':'a', '22':'a#', '23':'b' },
		midi_flattened_notes: { 'a#':'bb', 'c#':'db', 'd#':'eb', 'f#':'gb', 'g#':'ab' },

		noteFromMidiPitch: function(n, returnFlattened) {
			var octave = 0, noteNum = n, noteName, returnFlattened = returnFlattened || false;
			if (n > 23) {
				// noteNum is on octave 1 or more
				octave = Math.floor(n/12) - 1;
				// subtract number of octaves from noteNum
				noteNum = n - octave * 12;
			}

			// get note name (c#, d, f# etc)
			noteName = Util.midi_pitches_letter[noteNum];
			// Use flattened notes if requested (e.g. f# should be output as gb)
			if (returnFlattened && noteName.indexOf('#') > 0) {
				noteName = Util.midi_flattened_notes[noteName];
			}
			return noteName + octave;
		},

		mpqnFromBpm: function(bpm) {
			var mpqn = Math.floor(60000000 / bpm);
			var ret=[];
			do {
				ret.unshift(mpqn & 0xFF);
				mpqn >>= 8;
			} while (mpqn);
			while (ret.length < 3) {
				ret.push(0);
			}
			return ret;
		},

		bpmFromMpqn: function(mpqn) {
			var m = mpqn;
			if (typeof mpqn[0] != 'undefined') {
				m = 0;
				for (var i=0, l=mpqn.length-1; l >= 0; ++i, --l) {
					m |= mpqn[i] << l;
				}
			}
			return Math.floor(60000000 / mpqn);
		},

		/*
		 * Converts an array of bytes to a string of hexadecimal characters. Prepares
		 * it to be converted into a base64 string.
		 *
		 * @param byteArray {Array} array of bytes that will be converted to a string
		 * @returns hexadecimal string
		 */
		codes2Str: function(byteArray) {
			return String.fromCharCode.apply(null, byteArray);
		},

		/*
		 * Converts a String of hexadecimal values to an array of bytes. It can also
		 * add remaining "0" nibbles in order to have enough bytes in the array as the
		 * |finalBytes| parameter.
		 *
		 * @param str {String} string of hexadecimal values e.g. "097B8A"
		 * @param finalBytes {Integer} Optional. The desired number of bytes that the returned array should contain
		 * @returns array of nibbles.
		 */

		str2Bytes: function (str, finalBytes) {
			if (finalBytes) {
				while ((str.length / 2) < finalBytes) { str = "0" + str; }
			}

			var bytes = [];
			for (var i=str.length-1; i>=0; i = i-2) {
				var chars = i === 0 ? str[i] : str[i-1] + str[i];
				bytes.unshift(parseInt(chars, 16));
			}

			return bytes;
		},

		/**
		 * Translates number of ticks to MIDI timestamp format, returning an array of
		 * bytes with the time values. Midi has a very particular time to express time,
		 * take a good look at the spec before ever touching this function.
		 *
		 * @param ticks {Integer} Number of ticks to be translated
		 * @returns Array of bytes that form the MIDI time value
		 */
		translateTickTime: function(ticks) {
			var buffer = ticks & 0x7F;
		
			while (ticks = ticks >> 7) {
				buffer <<= 8;
				buffer |= ((ticks & 0x7F) | 0x80);
			}
		
			var bList = [];
			while (true) {
				bList.push(buffer & 0xff);
		
				if (buffer & 0x80) { buffer >>= 8; }
				else { break; }
			}
			return bList;
		},

	};

	/* ******************************************************************
	 * Event class
	 ****************************************************************** */

	var MidiEvent = function(params) {
		if (!this) return new MidiEvent(params);
		if (params &&
				(params.type    !== null || params.type    !== undefined) &&
				(params.channel !== null || params.channel !== undefined) &&
				(params.param1  !== null || params.param1  !== undefined)) {
			this.setTime(params.time);
			this.setType(params.type);
			this.setChannel(params.channel);
			this.setParam1(params.param1);
			this.setParam2(params.param2);
		}
	};

	// event codes
	MidiEvent.NOTE_OFF           = 0x80;
	MidiEvent.NOTE_ON            = 0x90;
	MidiEvent.AFTER_TOUCH        = 0xA0;
	MidiEvent.CONTROLLER         = 0xB0;
	MidiEvent.PROGRAM_CHANGE     = 0xC0;
	MidiEvent.CHANNEL_AFTERTOUCH = 0xD0;
	MidiEvent.PITCH_BEND         = 0xE0;


	MidiEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	MidiEvent.prototype.setType = function(type) {
		if (type < MidiEvent.NOTE_OFF || type > MidiEvent.PITCH_BEND) {
			throw new Error("Trying to set an unknown event: " + type);
		}

		this.type = type;
	};

	MidiEvent.prototype.setChannel = function(channel) {
		if (channel < 0 || channel > 15) {
			throw new Error("Channel is out of bounds.");
		}

		this.channel = channel;
	};

	MidiEvent.prototype.setParam1 = function(p) {
		this.param1 = p;
	};

	MidiEvent.prototype.setParam2 = function(p) {
		this.param2 = p;
	};

	MidiEvent.prototype.toBytes = function() {
		var byteArray = [];

		var typeChannelByte = this.type | (this.channel & 0xF);

		byteArray.push.apply(byteArray, this.time);
		byteArray.push(typeChannelByte);
		byteArray.push(this.param1);

		// Some events don't have a second parameter
		if (this.param2 !== undefined && this.param2 !== null) {
			byteArray.push(this.param2);
		}
		return byteArray;
	};

	/* ******************************************************************
	 * MetaEvent class
	 ****************************************************************** */

	var MetaEvent = function(params) {
		if (!this) return new MetaEvent(params);
		var p = params || {};
		this.setTime(params.time);
		this.setType(params.type);
		this.setData(params.data);
	};

	MetaEvent.SEQUENCE   = 0x00;
	MetaEvent.TEXT       = 0x01;
	MetaEvent.COPYRIGHT  = 0x02;
	MetaEvent.TRACK_NAME = 0x03;
	MetaEvent.INSTRUMENT = 0x04;
	MetaEvent.LYRIC      = 0x05;
	MetaEvent.MARKER     = 0x06;
	MetaEvent.CUE_POINT  = 0x07;
	MetaEvent.CHANNEL_PREFIX = 0x20;
	MetaEvent.END_OF_TRACK   = 0x2f;
	MetaEvent.TEMPO      = 0x51;
	MetaEvent.SMPTE      = 0x54;
	MetaEvent.TIME_SIG   = 0x58;
	MetaEvent.KEY_SIG    = 0x59;
	MetaEvent.SEQ_EVENT  = 0x7f;

	MetaEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	MetaEvent.prototype.setType = function(t) {
		this.type = t;
	};

	MetaEvent.prototype.setData = function(d) {
		this.data = d;
	};

	MetaEvent.prototype.toBytes = function() {
		if (!this.type || !this.data || !this.time) {
			throw new Error("Type or data for meta-event not specified.");
		}

		var byteArray = [];
		byteArray.push.apply(byteArray, this.time);
		byteArray.push(0xFF, this.type);

		// If data is an array, we assume that it contains several bytes. We
		// apend them to byteArray.
		if (Array.isArray(this.data)) {
			byteArray.push(this.data.length);
			byteArray.push.apply(byteArray, this.data);
		} else if (this.data !== null && this.data !== undefined) {
			byteArray.push(1, this.data);
		}

		return byteArray;
	};

	/* ******************************************************************
	 * Track class
	 ****************************************************************** */

	var Track = function(config) {
		if (!this) return new Track(config);
		var c = config || {};
		this.events = c.events || [];
	};

	Track.START_BYTES = [0x4d, 0x54, 0x72, 0x6b];
	Track.END_BYTES   = [0x00, 0xFF, 0x2F, 0x00];

	Track.prototype.addEvent = function(event) {
		this.events.push(event);
	};

	Track.prototype.addNoteOn = Track.prototype.noteOn = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_ON,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.addNoteOff = Track.prototype.noteOff = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_OFF,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.addNote = Track.prototype.note = function(channel, pitch, dur, time, velocity) {
		this.noteOn(channel, pitch, time, velocity);
		if (dur) {
			this.noteOff(channel, pitch, dur, velocity);
		}
		return this;
	};

	Track.prototype.setInstrument = Track.prototype.instrument = function(channel, instrument, time) {
		this.events.push(new MidiEvent({
			type: MidiEvent.PROGRAM_CHANGE,
			channel: channel,
			param1: instrument,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.setTempo = Track.prototype.tempo = function(bpm, time) {
		this.events.push(new MetaEvent({
			type: MetaEvent.TEMPO,
			data: Util.mpqnFromBpm(bpm),
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.toBytes = function() {
		var trackLength = 0;
		var eventBytes = [];
		var startBytes = Track.START_BYTES;
		var endBytes   = Track.END_BYTES;

		var addEventBytes = function(event) {
			var bytes = event.toBytes();
			trackLength += bytes.length;
			eventBytes.push.apply(eventBytes, bytes);
		};

		this.events.forEach(addEventBytes);

		// Add the end-of-track bytes to the sum of bytes for the track, since
		// they are counted (unlike the start-of-track ones).
		trackLength += endBytes.length;

		// Makes sure that track length will fill up 4 bytes with 0s in case
		// the length is less than that (the usual case).
		var lengthBytes = Util.str2Bytes(trackLength.toString(16), 4);

		return startBytes.concat(lengthBytes, eventBytes, endBytes);
	};

	/* ******************************************************************
	 * File class
	 ****************************************************************** */

	var File = function(config){
		if (!this) return new File(config);
		var c = config || {};
		this.tracks = c.tracks || [];
	};

	File.HDR_CHUNKID     = "MThd";             // File magic cookie
	File.HDR_CHUNK_SIZE  = "\x00\x00\x00\x06"; // Header length for SMF
	File.HDR_TYPE0       = "\x00\x00";         // Midi Type 0 id
	File.HDR_TYPE1       = "\x00\x01";         // Midi Type 1 id
	File.HDR_SPEED       = "\x00\x80";         // Defaults to 128 ticks per beat

	File.prototype.addTrack = function(track) {
		if (track) {
			this.tracks.push(track);
			return this;
		} else {
			track = new Track();
			this.tracks.push(track);
			return track;
		}
	};

	File.prototype.toBytes = function() {
		var trackCount = this.tracks.length.toString(16);

		// prepare the file header
		var bytes = File.HDR_CHUNKID + File.HDR_CHUNK_SIZE + File.HDR_TYPE0;

		// add the number of tracks (2 bytes)
		bytes += Util.codes2Str(Util.str2Bytes(trackCount, 2));
		// add the number of ticks per beat (currently hardcoded)
		bytes += File.HDR_SPEED;

		// iterate over the tracks, converting to bytes too
		this.tracks.forEach(function(track) {
			bytes += Util.codes2Str(track.toBytes());
		});

		return bytes;
	};

	/* ******************************************************************
	 * Exports
	 ****************************************************************** */

	exported.Util = Util;
	exported.File = File;
	exported.Track = Track;
	exported.Event = MidiEvent;
	exported.MetaEvent = MetaEvent;

})( Midi );

if (typeof module != 'undefined' && module !== null) {
	module.exports = Midi;
} else if (typeof exports != 'undefined' && exports !== null) {
	exports = Midi;
} else {
	this.Midi = Midi;
}

},{}],29:[function(require,module,exports){
// https://github.com/gasman/jasmid
//
//

module.exports = function(file){
	return MidiFile(file)
};

function MidiFile(data) {
	function readChunk(stream) {
		var id = stream.read(4);
		var length = stream.readInt32();
		return {
			'id': id,
			'length': length,
			'data': stream.read(length)
		};
	}
	
	var lastEventTypeByte;
	
	function readEvent(stream) {
		var event = {};
		event.deltaTime = stream.readVarInt();
		var eventTypeByte = stream.readInt8();
		if ((eventTypeByte & 0xf0) == 0xf0) {
			/* system / meta event */
			if (eventTypeByte == 0xff) {
				/* meta event */
				event.type = 'meta';
				var subtypeByte = stream.readInt8();
				var length = stream.readVarInt();
				switch(subtypeByte) {
					case 0x00:
						event.subtype = 'sequenceNumber';
						if (length != 2) throw "Expected length for sequenceNumber event is 2, got " + length;
						event.number = stream.readInt16();
						return event;
					case 0x01:
						event.subtype = 'text';
						event.text = stream.read(length);
						return event;
					case 0x02:
						event.subtype = 'copyrightNotice';
						event.text = stream.read(length);
						return event;
					case 0x03:
						event.subtype = 'trackName';
						event.text = stream.read(length);
						return event;
					case 0x04:
						event.subtype = 'instrumentName';
						event.text = stream.read(length);
						return event;
					case 0x05:
						event.subtype = 'lyrics';
						event.text = stream.read(length);
						return event;
					case 0x06:
						event.subtype = 'marker';
						event.text = stream.read(length);
						return event;
					case 0x07:
						event.subtype = 'cuePoint';
						event.text = stream.read(length);
						return event;
					case 0x20:
						event.subtype = 'midiChannelPrefix';
						if (length != 1) throw "Expected length for midiChannelPrefix event is 1, got " + length;
						event.channel = stream.readInt8();
						return event;
					case 0x2f:
						event.subtype = 'endOfTrack';
						if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length;
						return event;
					case 0x51:
						event.subtype = 'setTempo';
						if (length != 3) throw "Expected length for setTempo event is 3, got " + length;
						event.microsecondsPerBeat = (
							(stream.readInt8() << 16)
							+ (stream.readInt8() << 8)
							+ stream.readInt8()
						)
						return event;
					case 0x54:
						event.subtype = 'smpteOffset';
						if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length;
						var hourByte = stream.readInt8();
						event.frameRate = {
							0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30
						}[hourByte & 0x60];
						event.hour = hourByte & 0x1f;
						event.min = stream.readInt8();
						event.sec = stream.readInt8();
						event.frame = stream.readInt8();
						event.subframe = stream.readInt8();
						return event;
					case 0x58:
						event.subtype = 'timeSignature';
						if (length != 4) throw "Expected length for timeSignature event is 4, got " + length;
						event.numerator = stream.readInt8();
						event.denominator = Math.pow(2, stream.readInt8());
						event.metronome = stream.readInt8();
						event.thirtyseconds = stream.readInt8();
						return event;
					case 0x59:
						event.subtype = 'keySignature';
						if (length != 2) throw "Expected length for keySignature event is 2, got " + length;
						event.key = stream.readInt8(true);
						event.scale = stream.readInt8();
						return event;
					case 0x7f:
						event.subtype = 'sequencerSpecific';
						event.data = stream.read(length);
						return event;
					default:
						// console.log("Unrecognised meta event subtype: " + subtypeByte);
						event.subtype = 'unknown'
						event.data = stream.read(length);
						return event;
				}
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf0) {
				event.type = 'sysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else if (eventTypeByte == 0xf7) {
				event.type = 'dividedSysEx';
				var length = stream.readVarInt();
				event.data = stream.read(length);
				return event;
			} else {
				throw "Unrecognised MIDI event type byte: " + eventTypeByte;
			}
		} else {
			/* channel event */
			var param1;
			if ((eventTypeByte & 0x80) == 0) {
				/* running status - reuse lastEventTypeByte as the event type.
					eventTypeByte is actually the first parameter
				*/
				param1 = eventTypeByte;
				eventTypeByte = lastEventTypeByte;
			} else {
				param1 = stream.readInt8();
				lastEventTypeByte = eventTypeByte;
			}
			var eventType = eventTypeByte >> 4;
			event.channel = eventTypeByte & 0x0f;
			event.type = 'channel';
			switch (eventType) {
				case 0x08:
					event.subtype = 'noteOff';
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					return event;
				case 0x09:
					event.noteNumber = param1;
					event.velocity = stream.readInt8();
					if (event.velocity == 0) {
						event.subtype = 'noteOff';
					} else {
						event.subtype = 'noteOn';
					}
					return event;
				case 0x0a:
					event.subtype = 'noteAftertouch';
					event.noteNumber = param1;
					event.amount = stream.readInt8();
					return event;
				case 0x0b:
					event.subtype = 'controller';
					event.controllerType = param1;
					event.value = stream.readInt8();
					return event;
				case 0x0c:
					event.subtype = 'programChange';
					event.programNumber = param1;
					return event;
				case 0x0d:
					event.subtype = 'channelAftertouch';
					event.amount = param1;
					return event;
				case 0x0e:
					event.subtype = 'pitchBend';
					event.value = param1 + (stream.readInt8() << 7);
					return event;
				default:
					throw "Unrecognised MIDI event type: " + eventType
					/* 
					console.log("Unrecognised MIDI event type: " + eventType);
					stream.readInt8();
					event.subtype = 'unknown';
					return event;
					*/
			}
		}
	}
	
	stream = Stream(data);
	var headerChunk = readChunk(stream);
	if (headerChunk.id != 'MThd' || headerChunk.length != 6) {
		throw "Bad .mid file - header not found";
	}
	var headerStream = Stream(headerChunk.data);
	var formatType = headerStream.readInt16();
	var trackCount = headerStream.readInt16();
	var timeDivision = headerStream.readInt16();
	
	if (timeDivision & 0x8000) {
		throw "Expressing time division in SMTPE frames is not supported yet"
	} else {
		ticksPerBeat = timeDivision;
	}
	
	var header = {
		'formatType': formatType,
		'trackCount': trackCount,
		'ticksPerBeat': ticksPerBeat
	}
	var tracks = [];
	for (var i = 0; i < header.trackCount; i++) {
		tracks[i] = [];
		var trackChunk = readChunk(stream);
		if (trackChunk.id != 'MTrk') {
			throw "Unexpected chunk - expected MTrk, got "+ trackChunk.id;
		}
		var trackStream = Stream(trackChunk.data);
		while (!trackStream.eof()) {
			var event = readEvent(trackStream);
			tracks[i].push(event);
			//console.log(event);
		}
	}
	
	return {
		'header': header,
		'tracks': tracks
	}
};

/* Wrapper for accessing strings through sequential reads */
function Stream(str) {
	var position = 0;
	
	function read(length) {
		var result = str.substr(position, length);
		position += length;
		return result;
	}
	
	/* read a big-endian 32-bit integer */
	function readInt32() {
		var result = (
			(str.charCodeAt(position) << 24)
			+ (str.charCodeAt(position + 1) << 16)
			+ (str.charCodeAt(position + 2) << 8)
			+ str.charCodeAt(position + 3));
		position += 4;
		return result;
	}

	/* read a big-endian 16-bit integer */
	function readInt16() {
		var result = (
			(str.charCodeAt(position) << 8)
			+ str.charCodeAt(position + 1));
		position += 2;
		return result;
	}
	
	/* read an 8-bit integer */
	function readInt8(signed) {
		var result = str.charCodeAt(position);
		if (signed && result > 127) result -= 256;
		position += 1;
		return result;
	}
	
	function eof() {
		return position >= str.length;
	}
	
	/* read a MIDI-style variable-length integer
		(big-endian value in groups of 7 bits,
		with top bit set to signify that another byte follows)
	*/
	function readVarInt() {
		var result = 0;
		while (true) {
			var b = readInt8();
			if (b & 0x80) {
				result += (b & 0x7f);
				result <<= 7;
			} else {
				/* b is the last byte */
				return result + b;
			}
		}
	}
	
	return {
		'eof': eof,
		'read': read,
		'readInt32': readInt32,
		'readInt16': readInt16,
		'readInt8': readInt8,
		'readVarInt': readVarInt
	}
}
},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ticksToSeconds(ticks, tempo, ticksPerBeat) {
  return ticks / ticksPerBeat * (60 / tempo);
}

function convert(data, tempo) {
  var ticksPerBeat = data.header.ticksPerBeat;
  var tracks = [];

  data.tracks.forEach(function (track, i) {
    var time = 0;
    var memo = [];

    tracks[i] = [];

    track.forEach(function (items, j) {
      time += items.deltaTime;

      if (items.subtype === "noteOn") {
        var note = {};

        note.time = time;
        note.track = i;
        note.noteNumber = items.noteNumber, note.velocity = items.velocity;

        if (!memo[items.noteNumber]) {
          memo[items.noteNumber] = [];
        }

        memo[items.noteNumber].push(note);

        tracks[i].push(note);
      }

      if (items.subtype === "noteOff") {
        if (!memo[items.noteNumber]) {
          console.log([i, j, time], items.noteNumber + " NOT exists?");
        } else {
          memo[items.noteNumber][0].gateTime = time - memo[items.noteNumber][0].time;
          memo[items.noteNumber].shift();
        }
      }
    });
  });

  tracks = tracks.reduce(function (a, b) {
    return a.concat(b);
  }, []);
  tracks.sort(function (a, b) {
    return a.time - b.time;
  });

  return tracks;
}

function convertTicksToSeconds(data, tempo) {
  return data.map(function (items) {
    return {
      time: ticksToSeconds(items.time, tempo, ticksPerBeat),
      track: items.track,
      noteNumber: items.noteNumber,
      velocity: items.velocity,
      gateTime: ticksToSeconds(items.gateTime, tempo, ticksPerBeat)
    };
  });
}

exports["default"] = { convert: convert, convertTicksToSeconds: convertTicksToSeconds };
module.exports = exports["default"];

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _midiConverter = require("midi-converter");

var _midiConverter2 = _interopRequireDefault(_midiConverter);

function convert(file, callback) {
  var reader = new FileReader();

  reader.onloadend = function () {
    callback(_midiConverter2["default"].midiToJson(reader.result));
  };

  reader.readAsBinaryString(file);
}

exports["default"] = { convert: convert };
module.exports = exports["default"];

},{"midi-converter":27}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoTimeline = require("@mohayonao/timeline");

var _mohayonaoTimeline2 = _interopRequireDefault(_mohayonaoTimeline);

var _mohayonaoAdsrEnvelope = require("@mohayonao/adsr-envelope");

var _mohayonaoAdsrEnvelope2 = _interopRequireDefault(_mohayonaoAdsrEnvelope);

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoUtilsMidicps = require("@mohayonao/utils/midicps");

var _mohayonaoUtilsMidicps2 = _interopRequireDefault(_mohayonaoUtilsMidicps);

var _mohayonaoUtilsRemoveIfExists = require("@mohayonao/utils/removeIfExists");

var _mohayonaoUtilsRemoveIfExists2 = _interopRequireDefault(_mohayonaoUtilsRemoveIfExists);

var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();
var timeline = new _mohayonaoTimeline2["default"]({ context: audioContext });
var envelope = new _mohayonaoAdsrEnvelope2["default"]({ decayTime: 0, sustainLevel: 1, releaseCurve: "exp" });
var GCGuard = [];

function play(data, params, callback) {
  var currentTime = audioContext.currentTime;

  timeline.removeAll();

  data.forEach(function (items, index) {
    timeline.insert(currentTime + items.time, noteOn, [items]);

    if (index === data.length - 1) {
      timeline.insert(currentTime + items.time + items.gateTime, callback);
    }
  });

  envelope.attackTime = params.attackTime;
  envelope.releaseTime = params.releaseTime;

  timeline.start();
}

function stop() {
  GCGuard.splice(0).forEach(function (oscillator) {
    oscillator.disconnect();
    oscillator.gain.disconnect();
  });
  timeline.stop(true);
}

function noteOn(_ref) {
  var playbackTime = _ref.playbackTime;

  var _ref$args = _slicedToArray(_ref.args, 1);

  var _ref$args$0 = _ref$args[0];
  var noteNumber = _ref$args$0.noteNumber;
  var velocity = _ref$args$0.velocity;
  var gateTime = _ref$args$0.gateTime;

  var oscillator = audioContext.createOscillator();
  var gain = audioContext.createGain();

  envelope.gateTime = gateTime;
  envelope.peakLevel = 0.5 * velocity / 128;
  envelope.applyTo(gain.gain, playbackTime);

  oscillator.frequency.value = (0, _mohayonaoUtilsMidicps2["default"])(noteNumber);
  oscillator.start(playbackTime);
  oscillator.stop(playbackTime + envelope.duration);
  oscillator.onended = function () {
    oscillator.disconnect();
    oscillator.gain.disconnect();
    (0, _mohayonaoUtilsRemoveIfExists2["default"])(GCGuard, oscillator);
  };
  oscillator.connect(gain);
  oscillator.gain = gain;
  GCGuard.push(oscillator);

  gain.connect(audioContext.destination);
}

exports["default"] = { play: play, stop: stop };
module.exports = exports["default"];

},{"@mohayonao/adsr-envelope":1,"@mohayonao/timeline":14,"@mohayonao/utils/midicps":20,"@mohayonao/utils/removeIfExists":21,"@mohayonao/web-audio-utils/getAudioContext":22}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY = location.origin + "/draft/midi-to-json/state";

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

exports["default"] = { save: save, load: load };
module.exports = exports["default"];

},{}],34:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _MIDIConverter = require("./MIDIConverter");

var _MIDIConverter2 = _interopRequireDefault(_MIDIConverter);

var _JSONConverter = require("./JSONConverter");

var _JSONConverter2 = _interopRequireDefault(_JSONConverter);

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Store = require("./Store");

var _Store2 = _interopRequireDefault(_Store);

var SEC = 0,
    TICK = 1;

global.onload = function () {
  var _Store$load = _Store2["default"].load();

  var tempo = _Store$load.tempo;
  var attackTime = _Store$load.attackTime;
  var releaseTime = _Store$load.releaseTime;
  var unit = _Store$load.unit;

  var app = new Vue({
    el: "#app",
    data: {
      isPlaying: false,
      data: null,
      source: null,
      tempo: tempo || 120,
      attackTime: attackTime || 0,
      releaseTime: releaseTime || 0,
      unit: unit || 0
    },
    methods: {
      onChange: function onChange() {
        _Store2["default"].save({ tempo: this.tempo, attackTime: this.attackTime, releaseTime: this.releaseTime, unit: this.unit });
        this.update();
      },
      setData: function setData(data) {
        this.source = data;
        this.update();
      },
      update: function update() {
        if (this.source === null) {
          return;
        }

        var data = _JSONConverter2["default"].convert(this.source);

        if (this.unit === SEC) {
          data = _JSONConverter2["default"].convertTicksToSeconds(data, this.tempo);
        }

        this.data = JSON.stringify(data, null, 2);
      },
      play: function play() {
        var _this = this;

        if (this.data === null) {
          return;
        }

        if (!this.isPlaying) {
          var params = { attackTime: this.attackTime * 0.001, releaseTime: this.releaseTime * 0.001 };
          var data = JSON.parse(this.data);

          if (this.unit === TICK) {
            data = _JSONConverter2["default"].convertTicksToSeconds(data, this.tempo);
          }

          _Player2["default"].play(data, params, function () {
            _this.isPlaying = false;
          });

          this.isPlaying = true;
        } else {
          _Player2["default"].stop();

          this.isPlaying = false;
        }
      },
      timeFormat: function timeFormat(x) {
        if (x >= 900) {
          return (x / 1000).toFixed(3) + " sec";
        }
        return x + " msec";
      }
    }
  });

  window.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);

  window.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var file = e.dataTransfer.files[0];

    if (file.type === "audio/mid") {
      _MIDIConverter2["default"].convert(file, function (data) {
        app.setData(data);
      });
    }
  }, false);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./JSONConverter":30,"./MIDIConverter":31,"./Player":32,"./Store":33}]},{},[34]);
