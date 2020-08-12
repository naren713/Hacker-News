const express = require("express");

const router = express.Router();

const Users = require("../model/Users");

const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register");
});

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check Required Fields
  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please fill all fields" });
  }

  // Check Passwords Match
  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  // Check Pasword Length
  if (password.length < 6) {
    errors.push({ message: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation pass
    Users.findOne({ email: email }).then((user) => {
      if (user) {
        // User Exists
        errors.push({ message: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new Users({
          name,
          email,
          password,
        });
        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Encrypt Password
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are registered now and can Login!"
                );
                res.redirect("login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
