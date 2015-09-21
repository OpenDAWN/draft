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
  let lfo1 = new Operator(audioContext);
  let lfo2 = new Operator(audioContext);
  let lpf = audioContext.createBiquadFilter();
  let gain1 = audioContext.createGain();
  let gain2 = audioContext.createGain();

  osc.type = "triangle";
  osc.frequency.value = midicps(noteNumber);
  osc.detune.value = +4;
  osc.start(t0);
  osc.stop(t1);
  osc.onended = () => {
    osc.disconnect();
    lfo1.disconnect();
    lfo2.disconnect();
    lpf.disconnect();
    gain1.disconnect();
    gain2.disconnect();
    GCGuard.remove(osc);
  };
  GCGuard.append(osc);
  osc.connect(gain1);

  lfo1.frequency.value = 5;
  lfo1.gain.value = 0.25;
  lfo1.start(t0);
  lfo1.stop(t1);
  lfo1.connect(gain1.gain);
  gain1.gain.value = 0;

  gain1.connect(lpf);

  lpf.type = "lowpass";
  lpf.frequency.value = midicps(noteNumber);
  lpf.Q.value = 24;
  lpf.connect(gain2);

  lfo2.frequency.value = 5;
  lfo2.gain.value = 120;
  lfo2.start(t0);
  lfo2.stop(t1);
  lfo2.connect(lpf.frequency);

  env.applyTo(gain2.gain, t0);
  gain2.connect(outlet);

}

export default { play };
