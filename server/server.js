var express = require("express");
var port = process.env.PORT || 5000;
var app = express();
var path = require("path");
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.listen(port, function () {
  return console.log("Listening on port " + port);
});
