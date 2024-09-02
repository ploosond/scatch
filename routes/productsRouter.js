const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Hllo from Products!`);
});

module.exports = router;
