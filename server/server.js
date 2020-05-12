var express = require("express");
var port = process.env.port || 5000;
var app = express();
var path = require("path");
app.listen(port, function () { return console.log("Listening on port " + port); });
app.get("/", function (req, res) {
    res.send(path.join(__dirname, "/client/build", "index.html"));
});
app.listen(port);
