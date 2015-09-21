const N = 16;
const SILENT = 0;
const EXISTS = 1;

function findMarkers(audioBuffer) {
  let samples = audioBuffer.getChannelData(0);
  let sampleRate = audioBuffer.sampleRate;
  let checks = [];
  let result = [];
  let temp = new Float32Array(N);
  let state = SILENT;

  for (let i = 0, imax = samples.length; i < imax; i++) {
    temp[i % N] = samples[i];

    if (state === SILENT && isExists(temp)) {
      checks.push(i);
      state = EXISTS;
    } else if (state === EXISTS) {
      let elapsed = (i - checks[checks.length - 1]) / sampleRate;

      if (2 <= elapsed && isSilent(temp)) {
        checks.push(i);
        state = SILENT;
      }
    }
  }

  for (let i = 0, imax = checks.length - 1; i < imax; i += 2) {
    result.push({
      begin: checks[i] / audioBuffer.sampleRate,
      end: checks[i + 1] / audioBuffer.sampleRate,
    });
  }

  return result;
}

function isExists(temp) {
  let count = 0;

  for (let i = 0, imax = temp.length; i < imax; i++) {
    if (temp[i] !== 0) {
      count += 1;
    }
  }

  return 16 <= count;
}

function isSilent(temp) {
  for (let i = 0, imax = temp.length; i < imax; i++) {
    if (temp[i] !== 0) {
      return false;
    }
  }

  return true;
}

export default { findMarkers };
