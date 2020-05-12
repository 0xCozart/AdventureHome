const express = require("express");
const port = process.env.port || 5000;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
