const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  Collage: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

const Post = mongoose.model("Post", PostsSchema);

module.exports = Post;