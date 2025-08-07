const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  comment: String,
  like: {
    type: Number,
    default: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
