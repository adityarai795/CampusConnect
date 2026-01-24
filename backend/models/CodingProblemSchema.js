const mongoose = require("mongoose");

const codingProblemSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  level: {
    type: String,
    required: true,
  },
  tags: [String],
});

const CodingProblem = mongoose.model("CodingProblem", codingProblemSchema);

module.exports = CodingProblem;