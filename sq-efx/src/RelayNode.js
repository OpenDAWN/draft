import AltAudioNode from "altnode.alt-audio-node";

let _buffer = null;

export default class RelayNode extends AltAudioNode {
  constructor(audioContext) {
    super(audioContext);

    this._bufSrc = audioContext.createBufferSource();
  }

  setAudioBuffer(audioBuffer) {
    this._bufSrc.buffer = audioBuffer;
  }

  start(t0) {
    this._bufSrc.start(t0);
  }

  stop(t0) {
    this._bufSrc.stop(t0);
  }

  connect(...args) {
    this._bufSrc.connect(...args);
  }

  disconnect(...args) {
    this._bufSrc.disconnect(...args);
  }
}
