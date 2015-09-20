(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./getAudioContext":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
(function (global){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mohayonaoWebAudioUtilsGetAudioContext = require("@mohayonao/web-audio-utils/getAudioContext");

var _mohayonaoWebAudioUtilsGetAudioContext2 = _interopRequireDefault(_mohayonaoWebAudioUtilsGetAudioContext);

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay = require("@mohayonao/web-audio-utils/enableMobileAutoPlay");

var _mohayonaoWebAudioUtilsEnableMobileAutoPlay2 = _interopRequireDefault(_mohayonaoWebAudioUtilsEnableMobileAutoPlay);

global.onload = function () {
  var audioContext = (0, _mohayonaoWebAudioUtilsGetAudioContext2["default"])();

  var app = new Vue({
    el: "#app",
    data: {
      state: "initialize"
    }
  });

  (0, _mohayonaoWebAudioUtilsEnableMobileAutoPlay2["default"])(audioContext, function () {
    app.state = "play?";

    var osc = audioContext.createOscillator();
    var gain = audioContext.createGain();

    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 5);
    osc.connect(gain);

    gain.gain.value = 0.25;
    gain.connect(audioContext.destination);
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"@mohayonao/web-audio-utils/enableMobileAutoPlay":1,"@mohayonao/web-audio-utils/getAudioContext":2}]},{},[3]);
