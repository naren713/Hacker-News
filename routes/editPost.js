const express = require("express");

const router = express.Router();

const Posts = require("../model/Posts");

router.get("/dashboard/edit/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.render("editPost", { post: post });
  } catch {
    res.redirect("/dashboard");
  }
});

router.put("/dashboard/edit/:id", async (req, res) => {
  let post;
  try {
    post = await Posts.findById(req.params.id);
    post.title = req.body.title;
    post.url = req.body.url;
    post.text = req.body.text;
    await post.save();
    res.redirect("dashboard");
  } catch {
    if (post == null) {
      res.render("dashboard");
    } else {
      res.render("editPost", {
        post: post,
        err: "Failed to Update",
      });
    }
  }
});

module.exports = router;
