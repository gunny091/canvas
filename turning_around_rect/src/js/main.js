const canvas = document.querySelector("canvas#canvas");
const ctx = canvas.getContext("2d");

let secPerLap = 10;
let speed;
let padding = 50;
let size = 100;
let color = "green";

const bodypadding = 25;
let char;
let lapText;
let timerText;
let frameRateText;
function reset() {
  canvas.width = window.innerWidth - bodypadding * 2;
  canvas.height = window.innerHeight - bodypadding * 2;
  char = {
    x: padding,
    y: padding,
    xspeed: 0,
    yspeed: 0,
    width: size,
    height: size,
    color: color,
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },
  };
  char.xarea = [padding, canvas.width - padding - char.width];
  char.yarea = [padding, canvas.height - padding - char.height];
  speed = (2 * (char.xarea[1] + char.yarea[1] - char.xarea[0] - char.yarea[0])) / (60 * secPerLap);
  char.xspeed = speed;

  lapText = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    innerText: "",
    font: "bold 72px mono",
    color: "black",
    draw() {
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(this.innerText, this.x, this.y);
    },
  };
  lapText.innerText = "0";
  timerText = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 10,
    innerText: "",
    font: "48px mono",
    color: "gray",
    draw() {
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(this.innerText, this.x, this.y);
    },
  };
  timerText.innerText = "0";
  frameRateText = {
    x: canvas.width / 2,
    y: canvas.height / 2 - 75,
    innerText: "",
    font: "32px mono",
    color: "gray",
    draw() {
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(this.innerText, this.x, this.y);
    },
  };
  frameRateText.innerText = "0";
}
window.addEventListener("resize", reset);
window.addEventListener("click", reset);
reset();

function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  char.draw();
  char.x += char.xspeed;
  char.y += char.yspeed;
  if (char.x > char.xarea[1]) {
    char.x = char.xarea[1];
    char.xspeed = 0;
    char.yspeed = speed;
  }
  if (char.y > char.yarea[1]) {
    char.y = char.yarea[1];
    char.yspeed = 0;
    char.xspeed = -speed;
  }
  if (char.x < char.xarea[0]) {
    char.x = char.xarea[0];
    char.xspeed = 0;
    char.yspeed = -speed;
  }
  if (char.y < char.yarea[0]) {
    char.y = char.yarea[0];
    char.yspeed = 0;
    char.xspeed = speed;
    lapText.innerText = String(parseInt(lapText.innerText) + 1);
    prevTime = time;
  }
  frameRateText.innerText = String(parseInt(frameRateText.innerText) + 1);

  lapText.draw();
  timerText.draw();
  frameRateText.draw();
}
function perSec() {
  timerText.innerText = String(parseInt(timerText.innerText) + 1);
}

setInterval(main, 1000 / 60);
setInterval(perSec, 1000);
