import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import enableMobileAutoPlay from "@mohayonao/web-audio-utils/enableMobileAutoPlay";

const audioContext = enableMobileAutoPlay(getAudioContext());
const gcGuard = [];

function rendering(audioContext, timetable, limit, duration) {
  timetable.forEach((time) => {
    let t0 = time / limit * duration;
    let t1 = t0 + 0.025;
    let osc = audioContext.createOscillator();
    let amp = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.value = [ 440, 880, 1760, 3520 ][Math.floor(time / timetable.length) % 4];
    osc.start(t0);
    osc.stop(t1);

    amp.gain.setValueAtTime(0.0, t0);
    amp.gain.linearRampToValueAtTime(0.5, t0 + 0.003);
    amp.gain.linearRampToValueAtTime(0.00, t1);

    osc.connect(amp);
    amp.connect(audioContext.destination);
  });
}

function play(timetable, limit, duration, callback) {
  let sampleRate = audioContext.sampleRate;
  let length = Math.floor(duration * sampleRate);
  let offContext = new OfflineAudioContext(1, length, sampleRate);

  rendering(offContext, timetable, limit, duration);
  offContext.startRendering();

  offContext.oncomplete = ({ renderedBuffer }) => {
    let bufSrc = audioContext.createBufferSource();

    bufSrc.buffer = renderedBuffer;

    let t0 = audioContext.currentTime;
    let t1 = t0 + renderedBuffer.duration;

    bufSrc.start(t0);
    bufSrc.stop(t1);
    bufSrc.onended = () => {
      bufSrc.disconnect();

      gcGuard.splice(gcGuard.indexOf(bufSrc), 1);
    };
    bufSrc.connect(audioContext.destination);

    gcGuard.push(bufSrc);

    if (typeof callback === "function") {
      callback(renderedBuffer);
    }
  };
}

function stop() {
  gcGuard.splice(0).forEach((bufSrc) => {
    bufSrc.disconnect();
  });
}

export default {
  play(...args) {
    play(...args);
  },
  stop(...args) {
    stop(...args);
  },
};
