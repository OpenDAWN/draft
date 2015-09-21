import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";
import rand2 from "@mohayonao/utils/rand2";

let audioContext = getAudioContext();

function router(currentTime, totalDuration) {
  let gain = audioContext.createGain();

  gain.gain.setValueAtTime(0, currentTime);
  gain.gain.linearRampToValueAtTime(0.5, currentTime + totalDuration * 0.5);
  gain.gain.linearRampToValueAtTime(0, currentTime + totalDuration);

  return {
    inlet: gain,
    outlet: gain,
    dispose() {
      gain.diconnect();
    }
  };
}

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 0.005,
    decayTime: 0.25,
    sustainLevel: 0.8,
    releaseTime: 0.05,
    peakLevel: 0.0625,
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
  osc1.detune.value = +2;
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
  osc2.detune.value = -2;
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

export default { router, play };
