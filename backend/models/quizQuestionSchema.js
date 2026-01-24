const quizSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
    tags: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Quiz", quizSchema);
