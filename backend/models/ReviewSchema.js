const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 1,
  },
  comment: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
