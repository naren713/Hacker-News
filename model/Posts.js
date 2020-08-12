const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

var deepPopulate = require("mongoose-deep-populate")(mongoose);

// const Users = require("../model/Users");

const PostsSchema = new mongoose.Schema({
  postId: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  text: {
    type: String,
  },
  name: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

autoIncrement.initialize(mongoose.connection);

PostsSchema.plugin(autoIncrement.plugin, { model: "Posts", field: "postId" });

PostsSchema.plugin(deepPopulate);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
