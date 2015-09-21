import AudioConverter from "./AudioConverter";
import WaveViewer from "./WaveViewer";
import WaveDetector from "./WaveDetector";
import Player from "./Player";
import constrain from "@mohayonao/utils/constrain";

const KEYUP = 38;
const KEYDOWN = 40;
const MAX_NODE_ID = 3;

global.onload = () => {
  let waveViewer = new WaveViewer(document.getElementById("canvas"));
  let player = new Player();

  let app = new Vue({
    el: "#app",
    data: {
      message: "drop a *.wav file",
      markers: [],
      command: 1,
    },
    computed: {
      json: {
        get() {
          return JSON.stringify(this.markers.map((marker) => {
            return {
              time: +marker.begin,
              command: +this.command,
              noteType: +marker.noteType,
              nodeId: +marker.nodeId,
            };
          }), null, 2);
        },
      },
    },
    methods: {
      setAudioBuffer(audioBuffer) {
        player.audioBuffer = audioBuffer;
        this.markers = WaveDetector.findMarkers(player.audioBuffer).map(({ begin, end }) => {
          return { begin, end, noteType: convertToNoteTypeFromDuration(end - begin), nodeId: 0 };
        });

        waveViewer.draw(player.audioBuffer);
        waveViewer.setMarkers(this.markers);

        app.message = "ready";
      },
      preview() {
        if (this.selected) {
          player.stop();
          player.start(player.audioBuffer, this.selected);
        }
      },
      stop() {
        player.stop();
      },
      createNewLabel({ begin, end }) {
        this.markers.push({ begin, end, noteType: 0, nodeId: 0 });
        this.onChange();
      },
      selectWith(index) {
        if (this.markers[index]) {
          this.selected = this.markers[index];
          waveViewer.select(this.selected);
          waveViewer.drawMarkers();
        }
      },
      removeWith(index) {
        if (this.markers[index] === this.selected) {
          this.selected = null;
          waveViewer.select(this.selected);
        }
        this.markers.$remove(index);
        waveViewer.drawMarkers();
      },
      onChange() {
        this.markers.forEach((marker) => {
          if (marker.end < marker.begin) {
            [ marker.begin, marker.end ] = [ marker.end, marker.begin ];
          }
          marker.noteType = convertToNoteTypeFromDuration(marker.end - marker.begin);
        });
        this.markers.sort((a, b) => a.begin - b.begin);

        waveViewer.drawMarkers();
      },
      onKeydown(e, index, type) {
        let duration = player.audioBuffer.duration;

        if (e.keyCode === KEYUP) {
          if (type === "begin" || type === "end") {
            this.markers[index][type] = constrain(+this.markers[index][type] + 0.05, 0, duration);
            this.onChange();
          }
          if (type === "nodeId") {
            this.markers[index][type] = constrain(+this.markers[index][type] + 1, 0, MAX_NODE_ID);
          }
        }
        if (e.keyCode === KEYDOWN) {
          if (type === "begin" || type === "end") {
            this.markers[index][type] = constrain(+this.markers[index][type] - 0.05, 0, duration);
            this.onChange();
          }
          if (type === "nodeId") {
            this.markers[index][type] = constrain(this.markers[index][type] - 1, 0, MAX_NODE_ID);
          }
        }
      }
    },
  });

  function convertToNoteTypeFromDuration(duration) {
    if (duration < 8) {
      return 0;
    }
    if (duration < 16) {
      return 1;
    }
    return 2;
  }

  waveViewer.on("new-marker", ({ begin, end }) => {
    app.createNewLabel({ begin, end });
  });

  window.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, false);

  window.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let file = e.dataTransfer.files[0];

    if (/^audio\/(?:x-aiff|x-wav|aiff|wav|wave)$/.test(file.type)) {
      app.message = "loading...";
      AudioConverter.decodeAudioData(file, (audioBuffer) => {
        app.setAudioBuffer(audioBuffer);
      }, (e) => {
        app.message = String(e);
      });
    }
  }, false);
};
