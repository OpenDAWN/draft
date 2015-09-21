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
      gain.disconnect();
    },
  };
}

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 0.005,
    decayTime: 0.25,
    sustainLevel: 0.8,
    releaseTime: 0.05,
    peakLevel: 0.125 + rand2(1) * 0.05,
  });
  env.duration = duration;

  let t0 = playbackTime;
  let t1 = t0 + env.duration;
  let osc = audioContext.createOscillator();
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = midicps(noteNumber);
  osc.start(t0);
  osc.stop(t1);
  osc.onended = () => {
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

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { router, play };
