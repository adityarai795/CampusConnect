const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    techStack: [String],
    description: String,
    features: [String],
    githubSample: String,
    tags: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
