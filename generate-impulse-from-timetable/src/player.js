import sample from "@mohayonao/utils/sample";
import RandGen from "@mohayonao/randgen";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import enableMobileAutoPlay from "@mohayonao/web-audio-utils/enableMobileAutoPlay";

let audioContext = getAudioContext();
let guardGC = [];

enableMobileAutoPlay();

function rendering(audioContext, timetable, limit, duration) {
  timetable.forEach((time) => {
    let t0 = time / limit * duration;
    let t1 = t0 + 0.025;
    let osc = audioContext.createOscillator();
    let amp = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.value = sample([ 440, 880, 1760, 3520 ], new RandGen(time * 1000).random);
    osc.start(t0);
    osc.stop(t1);

    amp.gain.setValueAtTime(0.75, t0);
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

      guardGC.splice(guardGC.indexOf(bufSrc), 1);
    };
    bufSrc.connect(audioContext.destination);

    guardGC.push(bufSrc);

    if (typeof callback === "function") {
      callback(renderedBuffer);
    }
  };
}

export default {
  play(...args) {
    play(...args);
  },
};
