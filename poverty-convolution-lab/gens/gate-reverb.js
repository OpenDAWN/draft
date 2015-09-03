module.exports = function(sampleRate) {
  var numOfSamples = sampleRate * 2;
  var data = new Float32Array(numOfSamples);
  var gateSample = (sampleRate * 0.125)|0;

  for (var i = 0; i < numOfSamples; i++) {
    data[i] = Math.random() * 2 - 1;
    data[i] *= Math.pow(0.9999995, i);

    if (i < gateSample) {
      data[i] *= 1 - (i / numOfSamples);
    } else {
      data[i] *= Math.pow(0.9995, i - gateSample);
    }
  }

  return [ data ];
};
