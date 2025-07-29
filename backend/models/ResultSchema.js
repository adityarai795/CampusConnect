const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  University: {
    type: String,
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