const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product.models");
const userModel = require("../models/user.models");

router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ user: req.user.email }).populate("cart");
  let bill = 0;
  user.cart.forEach((item) => {
    return (bill += Number(item.price) + 20 - Number(item.discount));
  });
  res.render("cart", { user, bill });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ user: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop");
});

module.exports = router;
