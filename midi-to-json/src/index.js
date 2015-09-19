import MIDIConverter from "./MIDIConverter";
import JSONConverter from "./JSONConverter";
import Player from "./Player";
import Store from "./Store";

const SEC = 0, TICK = 1;

global.onload = () => {
  let { tempo, attackTime, releaseTime, unit } = Store.load();
  let app = new Vue({
    el: "#app",
    data: {
      isPlaying: false,
      data: null,
      source: null,
      tempo: tempo || 120,
      attackTime: attackTime || 0,
      releaseTime: releaseTime || 0,
      unit: unit || 0,
    },
    methods: {
      onChange() {
        Store.save({ tempo: this.tempo, attackTime: this.attackTime, releaseTime: this.releaseTime, unit: this.unit });
        this.update();
      },
      setData(data) {
        this.source = data;
        this.update();
      },
      update() {
        if (this.source === null) {
          return;
        }

        let data = JSONConverter.convert(this.source);

        if (this.unit === SEC) {
          data = JSONConverter.convertTicksToSeconds(data, this.tempo);
        }

        this.data = JSON.stringify(data, null, 2);
      },
      play() {
        if (this.data === null) {
          return;
        }

        if (!this.isPlaying) {
          let params = { attackTime: this.attackTime * 0.001, releaseTime: this.releaseTime * 0.001 };
          let data = JSON.parse(this.data);

          if (this.unit === TICK) {
            data = JSONConverter.convertTicksToSeconds(data, this.tempo);
          }

          Player.play(data, params, () => {
            this.isPlaying = false;
          });

          this.isPlaying = true;
        } else {
          Player.stop();

          this.isPlaying = false;
        }
      },
      timeFormat(x) {
        if (x >= 900) {
          return (x / 1000).toFixed(3) + " sec";
        }
        return x + " msec";
      },
    },
  });

  window.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, false);

  window.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let file = e.dataTransfer.files[0];

    if (file.type === "audio/mid" || file.type === "audio/midi") {
      MIDIConverter.convert(file, (data) => {
        app.setData(data);
      });
    }
  }, false);
};
