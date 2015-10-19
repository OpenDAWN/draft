export default function createLongDriveReverb(sampleRate) {
  let data = new Float32Array(sampleRate * 10);
  let length = data.length;

  for (let i = 0; i < length; i++) {
    let x = Math.sin(i / length * Math.PI);

    data[i] = x;
  }

  for (let i = 0, imax = Math.floor(length * 0.025); i < imax; i++) {
    data[i] = 1 - (i / imax);
  }

  for (let i = Math.floor(length * 0.925); i < length; i++) {
    data[i] = 0;
  }

  let sines = [ 21, 54, 245, 345, 986 ].map((freq) => {
    let phase = 0;
    let phaseStep = freq / sampleRate;
    let value = 0;

    return { phase, phaseStep, value };
  });

  for (let i = 5; i < length; i++) {
    sines.forEach((sine) => {
      sine.value = Math.sin(sine.phase * Math.PI * 2);
      sine.phase = sine.phaseStep;
    });
    let x = sines.map(({ value }) => value).reduce((a, b) => a * b, 1);

    data[i] *= x; // Math.random() * 2 - 1;
  }

  for (let i = 0; i < length; i++) {
    if (Math.random() < 0.08) {
      data[i] *= 2;
    }
  }

  for (let i = 2; i < length; i++) {
    data[i] = (data[i - 2] + data[i - 1] + data[i]) / 3;
  }

  return [ data ];
}
