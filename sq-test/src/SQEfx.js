import FeedbackDelay from "@mohayonao/feedback-delay";
import Operator from "@mohayonao/operator";
import EQ from "@mohayonao/eq";

export default class SQEfx {
  constructor(audioContext) {
    this.context = audioContext;

    this.outlet = this.context.createGain();
    this.inGain0 = this.context.createGain();
    this.inGain1 = this.context.createGain();
    this.inGain2 = this.context.createGain();
    this.outGain0 = this.context.createGain();
    this.outGain1 = this.context.createGain();
    this.outGain2 = this.context.createGain();

    this.inGain0.connect(this.outGain0);

    this.comb = new FeedbackDelay(this.context);
    this.inGain1.connect(this.comb);
    this.comb.connect(this.outGain1);

    this.conv = this.context.createConvolver();

    // { frequency: 518.33, gain: 30, Q: 14.103 },
    // { frequency: 533.49, gain: 30, Q: 12.126 },
    // { frequency: 662.42, gain: 30, Q: 40 },
    // { frequency: 673.16, gain: 28.19, Q: 40 },
    // { frequency: 1050.98, gain: 30, Q: 40 },
    // { frequency: 1368.8, gain: 30, Q: 40 },
    // { frequency: 1648.9, gain: 30, Q: 40 },
    // { frequency: 1672, gain: 25.12, Q: 40 },
    // { type: "hpf", frequency: 86.957, Q: 0.025 },
    // { type: "lpf", frequency: 2296.3, Q: 0.9 },

    this.eq = new EQ(this.context, [
      { frequency: 518.33, gain: 25, Q: 6.24 },
      { frequency: 533.49, gain: 25, Q: 5.309 },
      { frequency: 662.42, gain: 25, Q: 26.699 },
      { frequency: 673.16, gain: 28.19, Q: 26.699 },
      { frequency: 1050.98, gain: 30, Q: 26.699 },
      { frequency: 1368.8, gain: 45, Q: 26.699 },
      { frequency: 1648.9, gain: 25, Q: 26.699 },
      { frequency: 1672, gain: 25.12, Q: 26.699 },
      { type: "hpf", frequency: 86.957, Q: 0.025 },
      { type: "lpf", frequency: 2296.3, Q: 5.9 },
    ]);
    this.inGain2.connect(this.eq);
    this.eq.connect(this.outGain2);

    this.outGain1.connect(this.eq);

    this.outGain0.connect(this.outlet);
    this.outGain1.connect(this.conv);
    this.outGain2.connect(this.conv);

    this.conv.connect(this.outlet);
  }

  set reverb(audioBuffer) {
    this.conv.buffer = audioBuffer;
  }

  connect(...args) {
    this.outlet.connect(...args);
  }

  disconnect(...args) {
    this.outlet.disconnect(...args);
  }

  dispose() {

  }

  __connectFrom(source, ...args) {
    source.connect(this.inGain0, ...args);
    source.connect(this.inGain1, ...args);
    source.connect(this.inGain2, ...args);
  }
}
