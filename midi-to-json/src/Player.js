import Timeline from "@mohayonao/timeline";
import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import midicps from "@mohayonao/utils/midicps";
import removeIfExists from "@mohayonao/utils/removeIfExists";

let audioContext = getAudioContext();
let timeline = new Timeline({ context: audioContext });
let envelope = new ADSREnvelope({ decayTime: 0, sustainLevel: 1, releaseCurve: "exp" });
let GCGuard = [];

function play(data, params, callback) {
  let currentTime = audioContext.currentTime;

  timeline.removeAll();

  data.forEach((items, index) => {
    timeline.insert(currentTime + items.time, noteOn, [ items ]);

    if (index === data.length - 1) {
      timeline.insert(currentTime + items.time + items.gateTime, callback);
    }
  });

  envelope.attackTime = params.attackTime;
  envelope.releaseTime = params.releaseTime;

  timeline.start();
}

function stop() {
  GCGuard.splice(0).forEach((oscillator) => {
    oscillator.disconnect();
    oscillator.gain.disconnect();
  });
  timeline.stop(true);
}

function noteOn({ playbackTime, args: [ { noteNumber, velocity, gateTime } ] }) {
  let oscillator = audioContext.createOscillator();
  let gain = audioContext.createGain();

  envelope.gateTime = gateTime;
  envelope.peakLevel = 0.5 * velocity / 128;
  envelope.applyTo(gain.gain, playbackTime);

  oscillator.frequency.value = midicps(noteNumber);
  oscillator.start(playbackTime);
  oscillator.stop(playbackTime + envelope.duration);
  oscillator.onended = () => {
    oscillator.disconnect();
    oscillator.gain.disconnect();
    removeIfExists(GCGuard, oscillator);
  };
  oscillator.connect(gain);
  oscillator.gain = gain;
  GCGuard.push(oscillator);

  gain.connect(audioContext.destination);
}

export default { play, stop };
