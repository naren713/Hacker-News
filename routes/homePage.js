const expres = require("express");

const router = expres.Router();

const mongoose = require("mongoose");

const Posts = require("../model/Posts");

// Displaying the posts on Home page

router.get("/", (req, res) => {
  Posts.find({}).exec((error, data) => {
    if (error) throw error;
    res.render("homePage", { posts: data });
  });
});

module.exports = router;
