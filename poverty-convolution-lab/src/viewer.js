import linlin from "@mohayonao/utils/linlin";

const canvas = document.getElementById("canvas");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function draw(impulseResponse) {
  const context = canvas.getContext("2d");

  context.fillStyle = "#2c3e50";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#2ecc71";
  context.strokeStyle = "#bdc3c7";

  context.lineWidth = Math.pow(2, -6);

  impulseResponse.forEach((data, ch) => {
    context.beginPath();

    let width = canvas.width;
    let height = canvas.height / impulseResponse.length;

    for (let i = 0, imax = data.length; i < imax; i++) {
      let x = linlin(i, 0, imax, 0, width);
      let y = linlin(data[i], +1, -1, height * ch, height * ch + height);

      context.lineTo(x, y);
    }

    context.stroke();
  });
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
