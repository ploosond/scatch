const express = require("express");
const app = express();

app.get("", (req, res) => {
  res.send(`Hllo`);
});

app.listen(3000);
