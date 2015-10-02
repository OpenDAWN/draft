import EventEmitter from "@mohayonao/event-emitter";
import sample from "@mohayonao/utils/sample";
import range from "@mohayonao/utils/range";

export default class Track extends EventEmitter {
  constructor() {
    super();

    this.interval = sample([ 229, 269, 347 ]);
    this.pattern = range(8).map(_ => 0.4 < Math.random());
    this.index = 0;
    this.ticks = this.interval;
  }

  $onProcess(playbackTime, numOfTicks) {
    this.ticks -= numOfTicks;

    while (this.ticks <= 0) {
      let bang = this.pattern[this.index++];

      if (bang) {
        this.emit("bang", {
          playbackTime: playbackTime,
        });
      }

      if (this.index === this.pattern.length) {
        this.emit("loop", this);
        this.index = 0;
      }

      this.ticks += this.interval;
    }
  }
}
