var socket = io();

const canvas = document.getElementById("draw-canvas");
const ctx = canvas.getContext("2d")
ctx.strokeStyle = "#663399";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;

var isDrawing = false;

function draw(coordinates) {
  // if (!isDrawing) return; // will stop the function from running when isDrawing is false
  // console.log("Called by the mousedown event");
  // console.log(coordinates);
  ctx.beginPath();
  ctx.moveTo(coordinates.x, coordinates.y);
  ctx.lineTo(coordinates.x, coordinates.y);
  ctx.stroke();
}

socket.on("draw-together", function(coordinates) {
  // console.log(coordinates);
  console.log("Value of isDrawing inside socket.on before it's turned to true", isDrawing);
  // isDrawing = true;
  console.log("Value of isDrawing inside socket.on after it's turned to true", isDrawing);
  draw(coordinates);
});

canvas.addEventListener("mousedown", function(event) {
  // console.log("Value of isDrawing inside the mousedown function before it's turned to true", isDrawing);
  isDrawing = true;
  // console.log("Value of isDrawing inside the mousedown function after it's turned to true", isDrawing);
});

canvas.addEventListener("mousemove", function(event) {
  var coordinates = {
    x : event.offsetX,
    y : event.offsetY
  };
  if (isDrawing === true){
    socket.emit("draw-together", coordinates);
    draw(coordinates);
  }
});

canvas.addEventListener("mouseup", function(event) {
  // console.log(event);
  isDrawing = false;
});


canvas.addEventListener("mouseout", function () {
  isDrawing = false;
  // console.log(isDrawing);
});
