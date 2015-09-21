import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";
import rand2 from "@mohayonao/utils/rand2";

let audioContext = getAudioContext();

function router(currentTime, totalDuration) {
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  lpf.type = "lowpass";
  lpf.frequency.value = 1200;
  lpf.Q.value = 24;
  lpf.connect(gain);

  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.linearRampToValueAtTime(0.5, currentTime + totalDuration * 0.5);
  gain.gain.linearRampToValueAtTime(0, currentTime + totalDuration);

  return {
    inlet: lpf,
    outlet: gain,
    dispose() {
      inlet.disconnect();
      outlet.disconnect();
    },
  };
}

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 0.125,
    decayTime: 0.125,
    sustainLevel: 0.025,
    releaseTime: 1.25,
    peakLevel: 0.015625,
    attackCurve: "exp",
    releaseCurve: "exp",
  });
  env.duration = duration;

  let t0 = playbackTime;
  let t1 = t0 + env.duration;
  let osc1 = audioContext.createOscillator();
  let osc2 = audioContext.createOscillator();
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.value = midicps(noteNumber);
  osc1.detune.setValueAtTime(8, t0);
  osc1.detune.linearRampToValueAtTime(10, t1);
  osc1.start(t0);
  osc1.stop(t1);
  osc1.onended = () => {
    osc1.disconnect();
    osc2.disconnect();
    lpf.disconnect();
    gain.disconnect();
    GCGuard.remove(osc1);
  };
  GCGuard.append(osc1);
  osc1.connect(gain);

  osc2.type = "sawtooth";
  osc2.frequency.value = midicps(noteNumber);
  osc2.detune.setValueAtTime(-8, t0);
  osc2.detune.linearRampToValueAtTime(-10, t1);
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { router, play };
