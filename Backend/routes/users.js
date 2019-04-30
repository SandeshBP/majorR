const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../model/User");

//@route  POST api/users/register
//@desc   Registering user / Returning user details
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      return res.json({ email: "User already exists" });
    } else {
      const newUser = new User({
        mobile: req.body.mobile,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser.save((err, user) => {
            if (err) console.log(err);
            else {
              res.json(user);
            }
          });
        });
      });
    }
  });
});

//@route  POST api/users/login
//@desc   Login user / Returning jwt token
//@access Public
router.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      return res.json({ email: "User not found !" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.json({ msg:user._id});
          //User matched
        } else {
          return res.json({ password: "Password incorrect" });
        }
      });
    }
  });
});

module.exports = router;
