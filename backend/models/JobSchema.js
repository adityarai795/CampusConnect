const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
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
  city: {
    type: String,
  },
  location: {
    type: String,
  },
  JobType: {
    type: String,
    // required: true,
    enum: ["InternShip", "Part time", "Full Time", "Virtual", "Remote"],
    default: "Full Time",
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
    default:"https://ad.com"
  }
});

const JobSchema = mongoose.model("Job", jobSchema);

module.exports = JobSchema;


