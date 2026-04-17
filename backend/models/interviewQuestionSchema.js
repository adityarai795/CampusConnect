const mongoose = require("mongoose");
const interviewQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String, // optional (for admin/internal use)
    },

    role: {
      type: String,
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "HR",
        "Data Scientist",
        "DevOps Engineer",
        "Mobile Developer",
      ],
      required: true,
    },

    round: {
      type: String,
      enum: [
        "HR Round",
        "Technical Round",
        "DSA Round",
        "System Design Round",
        "Managerial Round",
      ],
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    category: {
      type: String, // e.g. "React", "Node.js", "Behavioral", "SQL"
    },

    tags: [
      {
        type: String, // e.g. ["JWT", "Authentication", "Hooks"]
      },
    ],

    company: {
      type: String, // optional (Google, Amazon etc.)
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "1-3 Years", "3-5 Years", "5+ Years"],
      default: "Fresher",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

 const InterviewQuestion= mongoose.model("InterviewQuestion", interviewQuestionSchema);
module.exports=InterviewQuestion;