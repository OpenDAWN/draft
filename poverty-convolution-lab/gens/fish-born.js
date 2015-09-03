module.exports = function(sampleRate) {
  var numOfSamples = sampleRate * 4;
  var data = new Float32Array(numOfSamples);
  var delaySample = (0.125 * sampleRate)|0;
  var x = 1;

  for (var i = 0; i < numOfSamples; i++) {
    data[i] = Math.random() * 2 - 1;
    data[i] *= Math.pow(0.9999, i);
    data[i] *= x;

    x *= 0.95;

    if (i % delaySample === 0) {
      x = 1 - (i / numOfSamples);
    }
  }

  return [ data ];
};
