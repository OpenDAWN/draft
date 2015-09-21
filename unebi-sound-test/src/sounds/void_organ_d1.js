import ADSREnvelope from "@mohayonao/adsr-envelope";
import Operator from "@mohayonao/operator";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";
import rand2 from "@mohayonao/utils/rand2";

let audioContext = getAudioContext();

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 8,
    decayTime: 2,
    sustainLevel: 0.8,
    releaseTime: 2,
    peakLevel: 0.125,
  });
  env.duration = duration;

  let t0 = playbackTime;
  let t1 = t0 + env.duration;
  let osc = audioContext.createOscillator();
  let lfo = new Operator(audioContext);
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  lfo.frequency.value = 6;
  lfo.gain.value = 5;
  lfo.start(t0);
  lfo.stop(t1);
  lfo.connect(osc.detune);

  osc.type = "triangle";
  osc.frequency.value = midicps(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = () => {
    osc.disconnect();
    lfo.disconnect();
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

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { play };
