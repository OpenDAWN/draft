import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";

export default class Player {
  constructor() {
    this.audioContext = getAudioContext();
    this.bufSrc = null;
    this.gain = null;
  }

  start(audioBuffer, marker) {
    let duration = marker.end - marker.begin;
    let t0 = this.audioContext.currentTime;
    let t1 = t0 + duration;

    this.bufSrc = this.audioContext.createBufferSource();
    this.gain = this.audioContext.createGain();

    this.bufSrc.buffer = audioBuffer;
    this.bufSrc.start(t0, marker.begin, duration);
    this.bufSrc.stop(t1);
    this.bufSrc.onended = () => {
      this.stop();
    };
    this.bufSrc.connect(this.gain);

    this.gain.gain.value = 0.25;
    this.gain.connect(this.audioContext.destination);
  }

  stop() {
    if (this.bufSrc !== null) {
      this.bufSrc.disconnect();
    }
    if (this.gain !== null) {
      this.gain.disconnect();
    }
    this.bufSrc = null;
    this.gain = null;
  }
}
