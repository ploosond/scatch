const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).send({ err: "All fields are required!" });
  }

  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "You already have an account, please login.");
      res.redirect("/");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err.message);
          const user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "You successfully registered.");
          res.redirect("/");
        });
      });
    }
  } catch (err) {
    res.status(500).send({ err: "Something went wrong!" });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
