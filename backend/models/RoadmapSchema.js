const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "DSA",
        "DevOps",
        "Mobile",
        "AI/ML",
      ],
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    thumbnail: {
      type: String,
    },
    tags: [String],

    steps: [
      {
        title: String,
        description: String,
        order: Number,

        resources: [
          {
            type: {
              type: String,
              enum: ["Article", "Video", "Course", "Docs", "Practice"],
            },
            title: String,
            link: String,
          },
        ],

        quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
        },

        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
        coding: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CodingProblemSchema",
        },
        usefulLinks: [
          {
            title: String,
            link: String,
          },
        ],
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
