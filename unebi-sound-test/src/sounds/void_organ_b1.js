import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";

let audioContext = getAudioContext();

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.4,
    attackCurve: "exp",
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
  osc1.detune.value = +25;
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
  osc1.connect(lpf);

  osc2.type = "sawtooth";
  osc2.frequency.value = midicps(noteNumber);
  osc2.detune.value = -25;
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = midicps(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { play };
