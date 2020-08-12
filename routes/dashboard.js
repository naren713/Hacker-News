const express = require("express");

const router = express.Router();

const Posts = require("../model/Posts");

const Users = require("../model/Users");

const { ensureAuthenticated } = require("../auth");

router.get("/dashboard", (req, res) => {
  Posts.find({}).exec((error, data) => {
    if (error) throw error;
    res.render("partials/dashboard", { posts: data });
  });
});

module.exports = router;
