const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Notes", "Question Paper", "Youtube", "Important Courses"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    branch: {
      type: String,
    },
    semester: {
      type: String,
    },
    university: {
      type: String,
    },
    tags: [String],
  },
  { timestamps: true },
);

const Resource =new mongoose.model("Resource", ResourceSchema);
module.exports = Resource;
