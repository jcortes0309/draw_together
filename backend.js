var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));


http.listen(3000, function() {
  console.log("Listening on *:3000");
});
