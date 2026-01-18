const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: String, // URL (Cloudinary / S3)
      // required: true,
    },

    coverLetter: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Rejected", "Hired"],
      default: "Applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String, // HR internal notes
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
