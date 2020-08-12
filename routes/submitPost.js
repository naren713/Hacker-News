const express = require("express");

const router = express.Router();

const Posts = require("../model/Posts");

const Users = require("../model/Users");

const autoIncrement = require("mongoose-auto-increment");

// const { ensureAuthenticated } = require("../auth");

router.get("/submit", (req, res) => {
  res.render("submitPost");
});

// Saving a Post to the db on the Posts schema

router.post("/submit", (req, res) => {
  const { title, url, text } = req.body;
  const newPost = new Posts({
    title: title,
    url: url,
    text: text,
    name: req.body.name,
  });
  // Posts.findByIdAndUpdate(Posts._id, { $push: { name: Users.name } });
  newPost
    .save()
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => console.log(error));
  // newPost.resetCount((err, nextCount) => {});
});

module.exports = router;
