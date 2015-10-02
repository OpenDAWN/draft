import EventEmitter from "@mohayonao/event-emitter";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import fetchAudioBuffer from "@mohayonao/web-audio-utils/fetchAudioBuffer";
import midicps from "@mohayonao/utils/midicps";
import SQEfx from "./SQEfx";

export default class Player extends EventEmitter {
  constructor() {
    super();

    this.audioContext = getAudioContext();

    Promise.all([
      fetchAudioBuffer("./assets/source.wav").then((audioBuffer) => {
        this.source = audioBuffer;
      }),
      fetchAudioBuffer("./assets/reverb.wav").then((audioBuffer) => {
        this.reverb = audioBuffer;
      }),
    ]).then(() => {
      this.emit("ready");
    });
  }

  start() {
    this.buf = this.audioContext.createBufferSource();
    this.efx = new SQEfx(this.audioContext);

    this.buf.buffer = this.source;
    this.buf.loop = true;
    this.buf.start(this.audioContext.currentTime);
    this.buf.connect(this.efx);

    this.efx.comb.delayTime.value = 0.25;
    this.efx.comb.feedback.value = 0.9;
    this.efx.outGain0.gain.value = 0.5;
    this.efx.outGain1.gain.value = 0.1;
    this.efx.outGain2.gain.value = 1;
    this.efx.reverb = this.reverb;
    this.efx.connect(this.audioContext.destination);
  }

  stop() {
    this.buf.stop(this.audioContext.currentTime);
    this.buf.disconnect();
    this.efx.dispose();
    this.buf = null;
    this.efx = null;
    this.conv = null;
  }
}
