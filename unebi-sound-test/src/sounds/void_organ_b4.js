import ADSREnvelope from "@mohayonao/adsr-envelope";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import createAudioBufferFromArray from "@mohayonao/web-audio-utils/createAudioBufferFromArray";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import midicps from "@mohayonao/utils/midicps";

let impulses = new Float32Array(2560);

impulses[0] = 0.5;
impulses[1] = -0.25;
impulses[2] = +0.25;

let audioContext = getAudioContext();
let buffer = createAudioBufferFromArray([ impulses ], audioContext);

function play({ playbackTime, args: [ outlet, { noteNumber, duration } ]}) {
  let env = new ADSREnvelope({
    attackTime: 5,
    decayTime: 3,
    sustainLevel: 0.7,
    releaseTime: 0.5,
    peakLevel: 0.2,
    attackCurve: "exp",
  });
  env.duration = duration;

  let t0 = playbackTime;
  let t1 = t0 + env.duration;
  let osc1 = audioContext.createOscillator();
  let osc2 = audioContext.createOscillator();
  let buf = audioContext.createBufferSource();
  let gain = audioContext.createGain();

  osc1.frequency.value = 10000;
  osc1.detune.value = +4;
  osc1.start(t0);
  osc1.stop(t1);
  osc1.connect(gain)
  osc1.onended = () => {
    osc1.disconnect();
    osc2.disconnect();
    buf.disconnect();
    gain.disconnect();
    GCGuard.remove(osc1);
  };
  GCGuard.append(osc1);

  osc2.frequency.value = 10000;
  osc2.detune.value = -4;
  osc2.start(t0);
  osc2.stop(t1);
  osc2.connect(gain)

  buf.buffer = buffer;
  buf.loop = true;
  buf.start(t0);
  buf.stop(t1);

  buf.connect(gain);

  env.applyTo(gain.gain, t0);
  gain.connect(outlet);
}

export default { play };
