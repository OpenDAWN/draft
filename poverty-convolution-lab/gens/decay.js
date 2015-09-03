module.exports = function(sampleRate) {
  var numOfSamples = sampleRate * 4;
  var data = new Float32Array(numOfSamples);

  for (var i = 0; i < numOfSamples; i++) {
    data[i] = Math.random() * 2 - 1;
    data[i] *= Math.pow(0.99995, i);
  }

  return [ data ];
};
