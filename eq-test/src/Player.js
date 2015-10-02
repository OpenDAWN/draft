import EventEmitter from "@mohayonao/event-emitter";
import Timeline from "@mohayonao/timeline";
import ADSREnvelope from "@mohayonao/adsr-envelope";
import WorkerTimer from "worker-timer";
import Track from "./Track";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import enableMobileAutoPlay from "@mohayonao/web-audio-utils/enableMobileAutoPlay";
import fetchAudioBuffer from "@mohayonao/web-audio-utils/fetchAudioBuffer";
import splitAudioBuffer from "@mohayonao/web-audio-utils/splitAudioBuffer";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import range from "@mohayonao/utils/range";
import sample from "@mohayonao/utils/sample";
import removeIfExists from "@mohayonao/utils/removeIfExists";

const INTERVAL = 100;
const NUM_OF_INLETS = 8;

export default class Player extends EventEmitter {
  constructor() {
    super();

    this.audioContext = enableMobileAutoPlay(getAudioContext());
    this.timeline = new Timeline({ context: this.audioContext, timerAPI: WorkerTimer });

    this.outlet = this.audioContext.createGain();
    this.inlets = range(NUM_OF_INLETS).map((i) => {
      let pan = this.audioContext.createPanner();
      let x = Math.sin((i / NUM_OF_INLETS) * Math.PI * 2) * 0.5;
      let y = 0;
      let z = Math.cos((i / NUM_OF_INLETS) * Math.PI * 2) * 0.25;

      pan.panningModel = "equalpower";
      pan.setPosition(x, y, z);

      pan.connect(this.outlet);

      return pan;
    });
    this.outlet.connect(this.audioContext.destination);

    this.tracks = [];

    this.$onProcess = this.$onProcess.bind(this);

    Promise.all([
      fetchAudioBuffer("./assets/source.wav").then((audioBuffer) => {
        let n = Math.floor(audioBuffer.duration / 1);

        this.buffers = splitAudioBuffer(audioBuffer, n);
      }),
    ]).then(() => {
      this.emit("ready");
    });
  }

  start() {
    this.tracks = [];
    this.timeline.start(this.$onProcess);
  }

  stop() {
    this.tracks = [];
    this.timeline.stop(true);
  }

  play(playbackTime) {
    let bufSrc = this.audioContext.createBufferSource();
    let gain = this.audioContext.createGain();
    let buffer = sample(this.buffers);
    let duration = buffer.duration;
    let t0 = playbackTime;
    let t1 = t0 + duration;
    let envelope = new ADSREnvelope({
      attackTime: 0.1,
      decayTime: 0,
      sustainLevel: 1,
      releaseTime: 0.1,
      duration: duration,
    });

    bufSrc.buffer = buffer;
    bufSrc.start(t0);
    bufSrc.stop(t1);
    bufSrc.connect(gain);

    envelope.applyTo(gain.gain, t0);
    gain.connect(sample(this.inlets));

    this.timeline.nextTick(t1, () => {
      bufSrc.disconnect();
      gain.disconnect();
    });
  }

  appendTrack() {
    let track = new Track();

    track.on("bang", ({ playbackTime }) => {
      this.play(playbackTime + 0.25);
    });
    track.on("loop", () => {
      if (this.tracks.length < 10 && Math.random() < 0.2) {
        this.appendTrack();
      }
      if (Math.random() < 0.1) {
        removeIfExists(this.tracks, track);
      }
    });

    this.tracks.push(track);
  }

  $onProcess({ playbackTime }) {
    if (this.tracks.length === 0) {
      this.appendTrack();
    }

    this.tracks.forEach((track) => {
      track.$onProcess(playbackTime, INTERVAL);
    });

    this.timeline.insert(playbackTime + INTERVAL * 0.001, this.$onProcess);
  }
}
