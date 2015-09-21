import ADSREnvelope from "@mohayonao/adsr-envelope";
import Operator from "@mohayonao/operator";
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
    peakLevel: 0.1,
    attackCurve: "exp",
  });
  env.duration = duration;

  let lfo = new Operator(audioContext);
  let osc = audioContext.createOscillator();
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();
  let t0 = playbackTime;
  let t1 = t0 + env.duration;

  lfo.frequency.value = 6;
  lfo.gain.setValueAtTime(6, t0);
  lfo.gain.linearRampToValueAtTime(12, t1);
  lfo.start(t0);
  lfo.stop(t1);
  lfo.connect(osc.detune);

  osc.type = "sawtooth";
  osc.frequency.value = midicps(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = () => {
    lfo.disconnect();
    osc.disconnect();
    lpf.disconnect();
    gain.disconnect();
    GCGuard.remove(osc);
  };
  GCGuard.append(osc);
  osc.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = midicps(noteNumber);
  lpf.Q.value = 16;
  lpf.connect(gain);

  env.applyTo(gain.gain, playbackTime);
  gain.connect(outlet);
}

export default { play };
