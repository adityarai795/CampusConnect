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
  collage: String,
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

PostsSchema.post("findOneAndDelete", async (post) => {
  if (post) {
    await mongoose.model("Comment").deleteMany({ _id: { $in: post.comment } });
  }
});

const Post = mongoose.model("Post", PostsSchema);

module.exports = Post;