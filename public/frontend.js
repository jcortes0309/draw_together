var socket = io();

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d")
ctx.strokeStyle = "#663399";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

var isDrawing = false;
var lastMousePosition;


function draw(coordinates) {
  // if (!isDrawing) return; // will stop the function from running when isDrawing is false
  // console.log("Called by the mousedown event");
  console.log("Show me the coordinates", coordinates);
  // console.log("coordinate x is: ", coordinates.x);
  // console.log("coordinate y is: ", coordinates.y);
  ctx.beginPath();
  ctx.moveTo(coordinates.lastMousePosition.x, coordinates.lastMousePosition.y);
  ctx.lineTo(coordinates.currentCoordinates.x, coordinates.currentCoordinates.y);
  ctx.stroke();
}

socket.on("draw-together", function(coordinates) {
  draw(coordinates);
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
    lastMousePosition : lastMousePosition
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
