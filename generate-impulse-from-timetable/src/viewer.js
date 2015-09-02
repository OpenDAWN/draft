const canvas = document.getElementById("canvas");

canvas.width = 1280;
canvas.height = 480;

function draw(timetables, zoom, limit) {
  const context = canvas.getContext("2d");

  context.fillStyle = "#2c3e50";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2ecc71";
  context.strokeStyle = "#bdc3c7";

  timetables.forEach((timetable, index) => {
    let y0 = ((index / timetables.length) * canvas.height)|0 + 0.5;
    let yh = Math.max(canvas.height / timetables.length, 1)|0;

    timetable.forEach((time) => {
      let x0 = ((time / limit) * canvas.width)|0 + 0.5;
      let xw = Math.max(canvas.width / limit, 1)|0;

      context.fillRect(x0, y0, xw, yh);
    });

    context.beginPath();
    context.moveTo(0, (y0|0)+0.5);
    context.lineTo(canvas.width, (y0|0)+0.5);
    context.stroke();
  });

  for (let time = 0; time < limit; time += 3600) {
    let x0 = (time / limit) * canvas.width;

    context.beginPath();
    context.moveTo((x0|0)+0.5, 0);
    context.lineTo((x0|0)+0.5, canvas.height);
    context.stroke();
  }
}

export default {
  draw(...args) {
    draw(...args);
  },
  get width() {
    return canvas.width;
  },
  get height() {
    return canvas.height;
  }
};
