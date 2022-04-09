const canvas = document.querySelector("canvas#canvas");
const ctx = canvas.getContext("2d");

const secPerLap = 10;
let speed = 0;
const padding = 50;
const size = 100;
const color = "green";

const bodypadding = 25;
let char;
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
}
window.addEventListener("resize", reset);
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
  }
}
setInterval(main, 1000 / 60);
