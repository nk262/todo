'use strict';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const size = 256;
const aspect = 4 / 3;

function setCanvasSize() {
  let width = window.innerWidth, height = window.innerHeight;
  if (height * aspect <= width)
    { width = height * aspect }
  else
    { height = width / aspect }
  canvas.style.width  = width + "px";
  canvas.style.height = height + "px";
  canvas.width = size;
  canvas.height = size / aspect;
}

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

window.onload = () => {
ctx.fillStyle = "#0f0";
ctx.fillRect(0, 0, 50, 50);
}