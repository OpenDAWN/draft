const canvas = document.getElementById("canvas");

let _timetables = null;
let _animationId = 0;
let _imageData = null;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function draw(timetables, zoom, limit) {
  const context = canvas.getContext("2d");

  _timetables = timetables;

  context.fillStyle = "#2c3e50";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2ecc71";
  context.strokeStyle = "#bdc3c7";

  timetables.forEach((timetable, index) => {
    let y0 = (((index / timetables.length) * canvas.height)|0) + 0.5;
    let yh = Math.max(canvas.height / timetables.length, 1)|0;

    timetable.forEach((time) => {
      let x0 = (((time / limit) * canvas.width)|0) + 0.5;
      let xw = Math.max(canvas.width / limit, 1)|0;

      context.fillRect(x0, y0, xw, yh);
    });

    if (index) {
      context.beginPath();
      context.moveTo(0, (y0|0)+0.5);
      context.lineTo(canvas.width, (y0|0)+0.5);
      context.stroke();
    }
  });

  for (let time = 1; time < limit; time += 3600) {
    let x0 = (time / limit) * canvas.width;

    context.beginPath();
    context.moveTo((x0|0)+0.5, 0);
    context.lineTo((x0|0)+0.5, canvas.height);
    context.stroke();
  }

  _imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function play(index, duration) {
  const context = canvas.getContext("2d");

  context.strokeStyle = "#f1c40f";

  let startTime = Date.now();
  let y0 = (((index / _timetables.length) * canvas.height)|0) + 0.5;
  let yh = Math.max(canvas.height / _timetables.length, 1)|0;
  let y1 = y0 + yh;

  function animate() {
    if (_animationId === -1) {
      return;
    }
    context.putImageData(_imageData, 0, 0);

    let elapsed = (Date.now() - startTime) / 1000;
    let x0 = Math.max(0, Math.min(elapsed / duration, 1)) * canvas.width;
    let x1 = x0;

    context.beginPath();
    context.moveTo((x0|0)+0.5, y0);
    context.lineTo((x1|0)+0.5, y1);
    context.stroke();

    _animationId = requestAnimationFrame(animate);
  }

  _animationId = requestAnimationFrame(animate);
}

function stop() {
  _animationId = -1;
}

export default {
  draw(...args) {
    draw(...args);
  },
  play(...args) {
    play(...args);
  },
  stop(...args) {
    stop(...args);
  },
  get width() {
    return canvas.width;
  },
  get height() {
    return canvas.height;
  }
};
