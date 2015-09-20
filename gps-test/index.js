(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

global.onload = function () {
  var isEnabledGPS = !!global.navigator.geolocation;

  var LOCATIONS = {
    unebi: [34.508369, 135.793686],
    square: [34.506784, 135.795755],
    kango: [34.510087, 135.795766],
    uoko: [34.507943, 135.795779],
    "yagi-net": [34.511390, 135.795899]
  };

  var app = new Vue({
    el: "#app",
    data: {
      latitude: 0,
      longitude: 0,
      guess: isEnabledGPS ? "" : "NOT SUPPORTED",
      reports: Object.keys(LOCATIONS).map(function (key) {
        return {
          place: key,
          latitude: LOCATIONS[key][0],
          longitude: LOCATIONS[key][1],
          distance: NaN,
          info: ""
        };
      })
    },
    methods: {
      onClick: function onClick() {
        var _this = this;

        if (isEnabledGPS) {
          this.guess = "SEARCH...";

          global.navigator.geolocation.getCurrentPosition(function (pos) {
            _this.latitude = pos.coords.latitude;
            _this.longitude = pos.coords.longitude;

            var maxDistance = Infinity;
            var nearPlace = null;

            _this.reports.forEach(function (items) {
              var dx = items.latitude - _this.latitude;
              var dy = items.longitude - _this.longitude;
              var distance = Math.sqrt(dx * dx + dy * dy);

              items.distance = distance;
              items.info = distance / 0.0001 + "m";

              if (distance < maxDistance) {
                nearPlace = items;
                maxDistance = distance;
              }
            });

            if (nearPlace.distance <= 0.0002) {
              _this.guess = nearPlace.place;
            } else {
              _this.guess = "NONE";
            }
          }, function (e) {
            _this.guess = "ERROR: " + e;
          });
        }
      }
    }
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
