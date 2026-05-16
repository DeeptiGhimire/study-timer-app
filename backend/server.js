const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Study Timer Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5=3000");
});