var socket = io();

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
var colorRed = document.getElementById("red");
var colorBlue = document.getElementById("blue");
var colorGreen = document.getElementById("green");
var colorBlack = document.getElementById("black");
var colorDefault = document.getElementById("default");

penColor = "#663399";
// ctx.lineJoin = "round";
// ctx.lineCap = "round";
// ctx.lineWidth = 10;

var isDrawing = false;
var lastMousePosition;


function draw(coordinates) {
  console.log("Draw function in side draw", coordinates);
  ctx.strokeStyle = coordinates.penColor;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  console.log("Show me the coordinates", coordinates);

  ctx.beginPath();
  ctx.moveTo(coordinates.lastMousePosition.x, coordinates.lastMousePosition.y);
  ctx.lineTo(coordinates.currentCoordinates.x, coordinates.currentCoordinates.y);
  ctx.stroke();
}

socket.on("draw-together", function(coordinates) {
  console.log("Socket coordinates", coordinates);
  draw(coordinates);
});

colorRed.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

colorBlue.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

colorGreen.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

colorBlack.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

colorDefault.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

canvas.addEventListener("mousedown", function(event) {
  isDrawing = true;
});

canvas.addEventListener("mousemove", function(event) {
  var currentCoordinates = {
    x : event.offsetX,
    y : event.offsetY
  };
  // lastMousePosition = currentCoordinates;
  coordinates = {
    currentCoordinates : currentCoordinates,
    lastMousePosition : lastMousePosition,
    penColor : penColor
  };
  console.log("The coordinates are now: ", coordinates);
  if (isDrawing === true) {
    if (lastMousePosition) {
      socket.emit("draw-together", coordinates);
      draw(coordinates);
    }
  }
  lastMousePosition = currentCoordinates;
});

canvas.addEventListener("mouseup", function(event) {
  // console.log(event);
  isDrawing = false;
});


canvas.addEventListener("mouseout", function () {
  isDrawing = false;
  // console.log(isDrawing);
});
