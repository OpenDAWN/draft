import EventEmitter from "@mohayonao/event-emitter";
import Timeline from "@mohayonao/timeline";
import WorkerTimer from "worker-timer";
import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import enableMobileAutoPlay from "@mohayonao/web-audio-utils/enableMobileAutoPlay";
import sounds from "./sounds";

export default class Player extends EventEmitter {
  constructor() {
    super();

    this.audioContext = enableMobileAutoPlay(getAudioContext());
    this.timeline = new Timeline({ context: this.audioContext, timerAPI: WorkerTimer });

    this.outlet = this.audioContext.createGain();
    this.outlet.connect(this.audioContext.destination);
  }

  play({ name, data }) {
    if (!data || data.length === 0 || !sounds[name]) {
      return;
    }
    let lastItem = data[data.length - 1];
    let currentTime = this.timeline.currentTime;
    let totalDuration = lastItem.time + lastItem.duration;
    let soundFunc = sounds[name].play;
    let outlet = this.outlet;

    if (typeof sounds[name].router === "function") {
      let router = sounds[name].router(currentTime, totalDuration);

      router.outlet.connect(this.outlet);

      this.timeline.insert(currentTime + totalDuration + 0.25, () => {
        router.dispose();
      });

      outlet = router.inlet;
    }

    data.forEach(({ time, noteNumber, duration }) => {
      let playbackTime = currentTime + time;

      this.timeline.insert(playbackTime, soundFunc, [ outlet, { noteNumber, duration } ])
    });

    this.timeline.start();
  }

  stop() {
    this.timeline.stop(true);
  }
}
