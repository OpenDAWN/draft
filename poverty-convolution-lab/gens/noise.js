module.exports = function(sampleRate) {
  var numOfSamples = sampleRate * 4;
  var data = new Float32Array(numOfSamples);

  for (var i = 0; i < numOfSamples; i++) {
    data[i] = Math.random() - 0.5;
  }

  return [ data ];
};
