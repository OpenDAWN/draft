import EventEmitter from "@mohayonao/event-emitter";
import Timeline from "@mohayonao/timeline";
import WorkerTimer from "worker-timer";
import EQ from "@mohayonao/eq";
import Track from "./Track";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import fetchAudioBuffer from "@mohayonao/web-audio-utils/fetchAudioBuffer";
import GCGuard from "@mohayonao/web-audio-utils/GCGuard";
import removeIfExists from "@mohayonao/utils/removeIfExists";
import dbamp from "@mohayonao/utils/dbamp";
import range from "@mohayonao/utils/range";
import sample from "@mohayonao/utils/sample";

const INTERVAL = 100;
const NUM_OF_INLETS = 8;

let instance = null;

export default class Player extends EventEmitter {
  constructor() {
    super();

    this.audioContext = getAudioContext();
    this.timeline = new Timeline({ context: this.audioContext, timerAPI: WorkerTimer });

    this.outlet = this.audioContext.createConvolver();
    this.outlet.connect(this.audioContext.destination);

    this.inlets = range(NUM_OF_INLETS).map((i) => {
      let eq = new EQ(this.audioContext, [
        { frequency: 518.33, gain: 30, Q: 14.103 },
        { frequency: 533.49, gain: 30, Q: 12.126 },
        { frequency: 662.42, gain: 30, Q: 40 },
        { frequency: 673.16, gain: 28.19, Q: 40 },
        { frequency: 1050.98, gain: 30, Q: 40 },
        { frequency: 1368.8, gain: 30, Q: 40 },
        { frequency: 1648.9, gain: 30, Q: 40 },
        { frequency: 1672, gain: 25.12, Q: 40 },
        { type: "hpf", frequency: 86.957, Q: 0.025 },
        { type: "lpf", frequency: 2296.3, Q: 0.9 },
      ]);
      let pan = this.audioContext.createPanner();
      let x = Math.sin((i / NUM_OF_INLETS) * Math.PI * 2) * 0.5;
      let y = 0;
      let z = Math.cos((i / NUM_OF_INLETS) * Math.PI * 2) * 0.25;

      pan.panningModel = "equalpower";
      pan.setPosition(x, y, z);

      eq.connect(pan);
      pan.connect(this.outlet);

      return eq;
    });

    this.tracks = [];

    this.$onProcess = this.$onProcess.bind(this);

    fetchAudioBuffer("./assets/01.wav", this.audioContext).then((audioBuffer) => {
      this.audioBuffer = audioBuffer;
      fetchAudioBuffer("./assets/reverb.wav", this.audioContext).then((audioBuffer) => {
        this.outlet.buffer = audioBuffer;
        this.emit("ready");
      });
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
    let bufSrc1 = this.audioContext.createBufferSource();
    let bufSrc2 = this.audioContext.createBufferSource();
    let gain = this.audioContext.createGain();

    bufSrc1.buffer = this.audioBuffer;
    bufSrc1.start(playbackTime);
    bufSrc1.connect(sample(this.inlets));

    bufSrc1.onended = () => {
      bufSrc1.stop(this.audioContext.currentTime);
      bufSrc1.disconnect();
      GCGuard.remove(bufSrc1);
    };
    GCGuard.append(bufSrc1);

    bufSrc2.buffer = this.audioBuffer;
    bufSrc2.start(playbackTime);
    bufSrc2.connect(gain);

    bufSrc2.onended = () => {
      bufSrc2.stop(this.audioContext.currentTime);
      bufSrc2.disconnect();
      gain.disconnect();
      GCGuard.remove(bufSrc2);
    };
    GCGuard.append(bufSrc2);

    gain.gain.value = Math.pow(2, -4);
    gain.connect(this.audioContext.destination);
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

  static getInstance() {
    if (instance === null) {
      instance = new Player();
    }
    return instance;
  }
}
