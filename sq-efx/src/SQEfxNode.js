import AltAudioNode from "altnode.alt-audio-node";
import EQNode from "altnode.eq-node";
import MixerGainNode from "altnode.mixer-gain-node";

const INCREASE_INTERVAL = 5;

let eqSettings = [
  { frequency: 518.33, gain: 30, Q: 14.103 },
  { frequency: 533.49, gain: 30, Q: 12.126 },
  { frequency: 662.42, gain: 30, Q: 40 },
  { frequency: 673.16, gain: 28.19, Q: 40 },
  { frequency: 1050.98, gain: 30, Q: 40 },
  { frequency: 1368.8, gain: 30, Q: 40 },
  { frequency: 1648.9, gain: 30, Q: 40 },
  { frequency: 1672, gain: 25.12, Q: 40 },
  { type: "hpf", frequency: 86.957, Q: 0.025 },
  { type: "lpf", frequency: 2296.3, Q: 0.9 }
];

export default class SQEfxNode extends AltAudioNode {
  constructor(audioContext) {
    super(audioContext);

    this.efxFlags = { eq: false, reverb: false };

    this._inlet = audioContext.createGain();
    this._eq = new EQNode(audioContext, eqSettings);
    this._reverb = audioContext.createConvolver();
    this.mixer = new MixerGainNode(audioContext, 3);

    this._inlet.connect(this.mixer, 0, 0);
    this._inlet.connect(this._eq);

    this._eq.connect(this.mixer, 0, 1);
    this._eq.connect(this._reverb);

    this._reverb.connect(this.mixer, 0, 2);

    let t0 = audioContext.currentTime;
    this.mixer.getChannelGain(0).setValueAtTime(0.60, t0);
    this.mixer.getChannelGain(1).setValueAtTime(0.00, t0);
    this.mixer.getChannelGain(2).setValueAtTime(0.00, t0);

    this._outlet = this.mixer;
  }

  setEfxLevel(level) {
    console.log("efxLevel: " + level.toFixed(3));

    let t0 = this.context.currentTime;

    if (this.efxFlags.eq) {
      if (0.0 <= level && level < 0.7) {
        console.log("===============> EQ OFF <===============");
        this.efxFlags.eq = false;
        this.mixer.getChannelGain(0).setTargetAtTime(0.60, t0, 1);
        this.mixer.getChannelGain(1).setTargetAtTime(0.00, t0, 2);
        this.mixer.getChannelGain(2).setTargetAtTime(0.00, t0, 4);
      }
    } else {
      if (0.7 <= level) {
        console.log("===============> EQ ON <===============");
        this.efxFlags.eq = true;
        this.mixer.getChannelGain(0).setTargetAtTime(0.15, t0, 5);
        this.mixer.getChannelGain(1).setTargetAtTime(0.45, t0, 3);
      }
    }

    if (this.efxFlags.reverb) {
      if (0.2 <= level && level < 0.85) {
        console.log("===============> REVERB ON <===============");
        this.efxFlags.reverb = false;
      }
    } else {
      if (0.85 <= level) {
        this.efxFlags.reverb = true;
        console.log("===============> REVERB ON <===============");
        this.mixer.getChannelGain(0).setTargetAtTime(0.00, t0, 1);
        this.mixer.getChannelGain(1).setTargetAtTime(0.25, t0, 3);
        this.mixer.getChannelGain(2).setTargetAtTime(0.75, t0, 5);
      }
    }
  }

  setAudioBuffer(buffer) {
    this._reverb.buffer = buffer;
  }

  connect(...args) {
    this._outlet.connect(...args);
  }

  disconnect(...args) {
    this._outlet.disconnect(...args);
  }

  __connectFrom(source, ...args) {
    source.connect(this._inlet, ...args);
  }
}
