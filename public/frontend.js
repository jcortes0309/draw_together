var socket = io();
socket.on("draw-together", function(coordinates) {
  draw(coordinates);
});

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;

var penColor = "#000";
var penWidth = 10;
// ctx.lineJoin = "round";
// ctx.lineCap = "round";

var isDrawing = false;
var lastMousePosition;

function draw(coordinates) {
  if (coordinates.penColor === "white") {
    ctx.lineWidth = 25;
  } else {
    ctx.lineWidth = coordinates.penWidth;
  }
  ctx.strokeStyle = coordinates.penColor;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // console.log("Show me the coordinates", coordinates);

  ctx.beginPath();
  ctx.moveTo(coordinates.lastMousePosition.x, coordinates.lastMousePosition.y);
  ctx.lineTo(coordinates.currentCoordinates.x, coordinates.currentCoordinates.y);
  ctx.stroke();
}

///////////////////////////////////
// Start drawing options section //
///////////////////////////////////
// use selector string to initialize on single element
// more information can be found at http://www.jqueryrain.com/?HXLLAi6v and https://www.npmjs.com/package/huebee
var hueb = new Huebee("#color-input", {
  // options
  setBGColor: true,
  saturations: 2,
  customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ]
});

document.getElementById("color-input").innerHTML = penColor;
document.getElementById("color-input").style.background = penColor;
var eraser = document.getElementById("eraser");
var clearPage = document.getElementById("clear-page");

// get color from button with id color-input (initialized as hueb)
penColor = hueb.on("change", function(color) {
  penColor = color;
});

var pen_width = document.getElementById("pen-width");
pen_width.addEventListener("change", function(event) {
  penWidth = event.srcElement.value;
});

eraser.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

clearPage.addEventListener("click", function() {
  location.reload();
});
/////////////////////////////////
// End drawing options section //
/////////////////////////////////

///////////////////////////////////
// Start event listeners section //
///////////////////////////////////
canvas.addEventListener("mousedown", function(event) {
  isDrawing = true;
});

canvas.addEventListener("mousemove", function(event) {
  var currentCoordinates = {
    x : event.offsetX,
    y : event.offsetY
  };
  coordinates = {
    currentCoordinates : currentCoordinates,
    lastMousePosition : lastMousePosition,
    penColor : penColor,
    penWidth : penWidth
  };
  if (isDrawing === true) {
    if (lastMousePosition) {
      socket.emit("draw-together", coordinates);
      draw(coordinates);
    }
  }
  lastMousePosition = currentCoordinates;
});

canvas.addEventListener("mouseup", function(event) {
  isDrawing = false;
});

canvas.addEventListener("mouseout", function() {
  isDrawing = false;
});
/////////////////////////////////
// End event listeners section //
/////////////////////////////////
