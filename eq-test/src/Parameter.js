import EventEmitter from "@mohayonao/event-emitter";
import LaunchControl from "@mohayonao/launch-control/webmidi";
import linexp from "@mohayonao/utils/linexp";
import linlin from "@mohayonao/utils/linlin";

let instance = null;

function q(x) {
  return linlin(x, 0, 127, 0.1, 40);
}

function g(x) {
  return linlin(x, 0, 127, 0, 40);
}

export default class Parameter extends EventEmitter {
  constructor() {
    super();

    this.launchControl = new LaunchControl();
    this.launchControl.open();
    this.values = new Float32Array([
      518.33, 30, 14.103,
      533.49, 30, 12.126,
      662.42, 30, 40,
      673.16, 28.19, 40,
      1050.98, 30, 40,
      1368.8, 30, 40,
      1648.9, 30, 40,
      1672, 25.12, 40,
    ]);

    this.launchControl.on("message", ({ dataType, track, value }) => {
      let index = (track * 3) + (dataType === "knob1" ? 1 : 2);

      if (typeof index === "number") {
        if (index % 3 === 1) {
          this.values[index] = q(value)
        } else {
          this.values[index] = g(value);
        }
        this.emit("update", { values: this.values });
      }
    });
  }

  static getInstance() {
    if (instance === null) {
      instance = new Parameter();
    }
    return instance;
  }
}
