var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));



io.on("connection", function(socket) {
  console.log("Client connected");
  socket.on("draw-together", function(coordinates) {
    socket.broadcast.emit("draw-together", coordinates);
  });



});

http.listen(8000, function() {
  console.log("Listening on *:8000");
});
