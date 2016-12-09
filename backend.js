var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));



io.on("connection", function(socket) {
  console.log("Client connected");
  socket.on("draw-together", function(coordinates) {
    console.log("coordinates info sent by frontend", coordinates);
    socket.broadcast.emit("draw-together", coordinates);
    console.log("coordinates broadcast ", coordinates);
  });



});

http.listen(8000, function() {
  console.log("Listening on *:8000");
});
