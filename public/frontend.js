var socket = io();

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;

var colorDefault = document.getElementById("default");
var colorRed = document.getElementById("red");
var colorBlue = document.getElementById("blue");
var colorGreen = document.getElementById("green");
var colorBlack = document.getElementById("black");

var eraser = document.getElementById("eraser");
var clearPage = document.getElementById("clear-page");

penColor = "#663399";
// ctx.lineJoin = "round";
// ctx.lineCap = "round";
// ctx.lineWidth = 10;

var isDrawing = false;
var lastMousePosition;


function draw(coordinates) {
  console.log("coordinates inside draw", coordinates);
  if (coordinates.penColor === "white") {
    console.log("I am white");
    ctx.lineWidth = 25;
  } else {
    ctx.lineWidth = 10;
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

socket.on("draw-together", function(coordinates) {
  draw(coordinates);
});

//////////////////////////////
// Start pen color section //
/////////////////////////////

colorDefault.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
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

eraser.addEventListener("click", function(event) {
  penColor = event.srcElement.value;
});

////////////////////////////
// End pen color section //
///////////////////////////

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

clearPage.addEventListener("click", function() {
  location.reload();
});
