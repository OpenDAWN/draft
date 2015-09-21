import EventEmitter from "@mohayonao/event-emitter";
import linlin from "@mohayonao/utils/linlin";

export default class WaveViewer extends EventEmitter {
  constructor(canvas) {
    super();

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.canvas = canvas;
    this.audioBuffer = null;
    this.imageData = null;
    this.markers = [];
    this.selected = null;
    this.mouse = null;

    canvas.addEventListener("mousedown", (e) => {
      if (this.audioBuffer === null) {
        return;
      }
      this.mouse = {
        x0: e.offsetX,
        y0: e.offsetY,
        x1: e.offsetX,
        y1: e.offsetY,
      };
      this.drawMarkers();
    });

    canvas.addEventListener("mousemove", (e) => {
      if (this.mouse) {
        this.mouse.x1 = e.offsetX;
        this.mouse.y1 = e.offsetY;
        this.drawMarkers();
      }
    });

    canvas.addEventListener("mouseup", (e) => {
      if (this.audioBuffer === null) {
        return;
      }
      let begin = linlin(this.mouse.x0, 0, this.width, 0, this.audioBuffer.duration);
      let end = linlin(e.offsetX, 0, this.width, 0, this.audioBuffer.duration);

      if (2 <= Math.abs(end - begin)) {
        this.createNewMarker({ begin, end });
      }

      this.mouse = null;
      this.drawMarkers();
    });
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  draw(audioBuffer) {
    this.audioBuffer = audioBuffer;

    let context = this.canvas.getContext("2d");

    context.lineWidth = 0.25;
    context.strokeStyle = "#0f0";
    context.fillStyle = "#000";

    context.fillRect(0, 0, this.width, this.height);

    for (let ch = 0; ch < 2; ch++) {
      let samples = this.audioBuffer.getChannelData(ch);

      context.beginPath();

      for (let i = 0, imax = samples.length; i < imax; i++) {
        let x = (i / imax) * this.width;
        let y = linlin(samples[i], -1, 1, this.height * 0.5, 0);

        y += ch * this.height * 0.5;

        context.lineTo(x, y);
      }

      context.stroke();
    }

    this.imageData = context.getImageData(0, 0, this.width, this.height);
  }

  setMarkers(markers) {
    if (this.audioBuffer === null) {
      return;
    }

    this.markers = markers;
    this.drawMarkers();
  }

  select(selected) {
    this.selected = selected;
  }

  drawMarkers() {
    let duration = this.audioBuffer.duration;
    let context = this.canvas.getContext("2d");

    context.putImageData(this.imageData, 0, 0);

    this.markers.forEach((marker) => {
      let x0 = linlin(marker.begin, 0, duration, 0, this.width);
      let x1 = linlin(marker.end, 0, duration, 0, this.width);

      let color = "rgba(192, 192, 192, 0.4)";

      if (this.selected && this.selected.begin === marker.begin) {
        color = "rgba(255, 192, 192, 0.8)";
      }
      context.fillStyle = color;

      context.fillRect(x0, 0, x1 - x0, this.height);
    });

    if (this.mouse) {
      context.fillStyle = "rgba(192, 192, 255, 0.6)";
      context.fillRect(this.mouse.x0, 0, this.mouse.x1 - this.mouse.x0, this.height);
    }
  }

  createNewMarker({ begin, end }) {
    this.emit("new-marker", { begin, end });
  }
}
