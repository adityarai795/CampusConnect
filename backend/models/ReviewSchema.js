const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
CommentSchema.post("findOneAndDelete", async (comment) => {
  if (comment) {
    await mongoose
      .model("Post")
      .updateMany(
        { comment: comment._id },
        { $pull: { comment: comment._id } }
      );
  }
});
const Comment = mongoose.model("Comment", CommentSchema);

const likeReview = new mongoose.Schema({
  like: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = mongoose.model("Like", likeReview);






module.exports = {Like ,Comment};
