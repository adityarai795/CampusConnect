const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  University: {
    type: String,
    enum: [
      "AKTU", "BBD", "DDU", "DU", "CBSE", "UPBOARD", "OTHER"
    ],
    unique: true,
  },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Result = new mongoose.model("Result", ResultSchema);

module.exports = Result;