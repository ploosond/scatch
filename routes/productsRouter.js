const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require("../models/product.models");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { image, name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
