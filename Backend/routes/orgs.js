const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Org = require("../model/Org");


//@route  POST api/orgs/register
//@desc   Registering organization / Returning organization details
//@access Public
router.post("/register", (req, res) => {
  Org.findOne({ email: req.body.email }, (err, org) => {
    if (err) {
      console.log(err);
    } else if (org) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newOrg = new Org({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newOrg.password, salt, (error, hash) => {
          if (error) throw error;
          newOrg.password = hash;
          newOrg.save((err, org) => {
            if (err) console.log(err);
            else {
              res.json(org);
            }
          });
        });
      });
    }
  });
});

//@route  POST api/orgs/login
//@desc   Login org / Returning jwt token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Org.findOne({ email }, (err, org) => {
    if (err) {
      console.log(err);
    } else if (!org) {
      return res.status(404).json({ email: "Organization not found !" });
    } else {
      bcrypt.compare(password, org.password).then(isMatch => {
        if (isMatch) {
          res.json({ msg: "Success" });
          //User matched
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    }
  });
});



module.exports = router;
