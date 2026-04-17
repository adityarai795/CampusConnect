const mongoose = require("mongoose");
const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      enum: [
        "DSA",
        "Operating System",
        "DBMS",
        "Computer Networks",
        "JavaScript",
        "React",
        "Node.js",
      ],
      required: true,
    },

    subTopic: {
      type: String, // e.g. "Arrays", "Scheduling", "Indexing"
    },

    options: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],

    explanation: {
      type: String, // why answer is correct
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    marks: {
      type: Number,
      default: 1,
    },

    tags: [
      {
        type: String, // e.g. ["array", "sorting"]
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
module.exports = QuizQuestion;
