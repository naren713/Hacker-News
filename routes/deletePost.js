const express = require("express");

const router = express.Router();

const Posts = require("../model/Posts");

router.delete("/dashboard/delete/:id", async (req, res) => {
  let post;
  try {
    post = await Posts.findById(req.params.id);
    await post.remove();
    res.redirect("/dashboard");
  } catch {
    if (post == null) {
      res.render("dashboard");
    } else {
      res.render("dashboard/delete/:id");
    }
  }
});

module.exports = router;
