const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  recuriterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  company: {
    type: String,
    default: "Confidential",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    enum: ["IT", "Marketing", "Finance", "HR", "Sales", "Other"],
    default: "IT",
  },
  location: {
    type: String,
  },
  JobType: {
    type: String,
    enum: ["InternShip", "Part time", "Full Time", "Virtual", "Remote"],
    default: "Full Time",
  },
  experience: {
    type: String,
    default: "Not Specified",
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
  }
});

const JobSchema = mongoose.model("Job", jobSchema);

module.exports = JobSchema;


