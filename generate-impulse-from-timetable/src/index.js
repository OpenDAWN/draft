import WavEncoder from "wav-encoder";
import createTimetable from "./createTimetable";
import viewer from "./viewer";
import player from "./player";

global.URL = global.URL || global.webkitURL;

global.onload = () => {
  function densityToZoom(density) {
    return 1 - (density / 100);
  }

  new Vue({
    el: "#app",
    data: {
      density: 0,
      duration: 4,
      zoom: 1,
      limit: 14400,
      data: [],
      link: "",
    },
    methods: {
      draw() {
        viewer.draw(this.data, this.zoom, this.limit);

        return this;
      },
      update() {
        let select = this.density % 27;

        this.data = createTimetable(this.zoom, this.limit).filter((_, i) => i % 27 === select);

        return this;
      },
      onChangeDensity() {
        this.zoom = densityToZoom(this.density);
        this.limit = 14400;
        this.update().draw();
      },
      onClick(e) {
        let index = Math.floor(this.data.length * (e.offsetY / viewer.height));

        this.link = "";

        player.play(this.data[index], this.limit, this.duration, (buffer) => {
          WavEncoder.encode({
            sampleRate: buffer.sampleRate,
            channelData: [ buffer.getChannelData(0) ],
          }).then((bytes) => {
            let blob = new Blob([ bytes ], { type: "audio/wav" });

            this.link = URL.createObjectURL(blob);
          });
        });
      }
    },
  }).update().draw();
};
