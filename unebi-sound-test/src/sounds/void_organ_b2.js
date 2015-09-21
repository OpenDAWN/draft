import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";

let audioContext = getAudioContext();

function router() {
  let lpf = audioContext.createBiquadFilter();

  lpf.type = "lowpass";
  lpf.frequency.value = 660;
  lpf.Q.value = 12;

  return {
    inlet: lpf,
    outlet: lpf,
    dispose() {
      lpf.disconnect();
    }
  };
}

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.0078125,
    attackCurve: "exp",
  });
  env.duration = duration;

  let t0 = playbackTime;
  let t1 = t0 + env.duration;
  let osc = audioContext.createOscillator();
  let lpf = audioContext.createBiquadFilter();
  let gain = audioContext.createGain();

  osc.type = "sine";
  osc.frequency.value = midicps(noteNumber);
  osc.detune.value = 0;
  osc.start(t0);
  osc.stop(t1);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
    GCGuard.remove(osc);
  };
  GCGuard.append(osc);
  osc.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { router, play };
