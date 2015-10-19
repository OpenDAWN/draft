import _sample from "lodash.sample";

export default class Sequencer {
  constructor() {
    this.timerId = 0;
    this.onbang = () => {};
  }

  start() {
    if (this.timerId !== 0) {
      clearInterval(this.timerId);
    }
    let loop = () => {
      this.onbang();
      this.timerId = setTimeout(loop, _sample([ 220, 330, 440, 550, 660, 880, 990 ]));
    };

    loop();
  }

  stop() {
    if (this.timerId !== 0) {
      clearInterval(this.timerId);
    }
    this.timerId = 0;
  }
}
