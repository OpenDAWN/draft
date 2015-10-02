import "@mohayonao/web-audio-utils/enableCustomAudioNode"

export default class CombFilter {
  constructor(audioContext) {
    this.context = audioContext;

    this.delay = this.context.createDelay();
    this.gain = this.context.createGain();

    this.delay.connect(this.gain);
    this.gain.connect(this.delay);
  }

  get delayTime() {
    return this.delay.delayTime;
  }

  get feedback() {
    return this.gain.gain;
  }

  connect(...args) {
    this.delay.connect(...args);
  }

  disconnect(...args) {
    this.delay.disconnect(...args);
  }

  dispose() {
    this.delay.disconnect();
    this.gain.disconnect();
    this.delay = null;
    this.gain = null;
  }

  __connectFrom(source, ...args) {
    source.connect(this.delay, ...args);
  }
}
