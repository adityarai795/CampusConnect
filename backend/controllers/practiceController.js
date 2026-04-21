const CodingProblem = require("../models/CodingProblemSchema.js");
const Project = require("../models/ProjectIdeaSchema.js");
const QuizQuestion = require("../models/quizQuestionSchema.js");
const InterviewQuestion = require("../models/interviewQuestionSchema.js");

module.exports.addCodingProblem = async (req, res) => {
  try {
    const createdProblem = await CodingProblem.create(req.body);
    res.status(201).json({
      message: "Coding problem created successfully",
      problem: createdProblem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getCodingProblem = async (req, res) => {
  try {
    const problem = await CodingProblem.find().sort({ _id: -1 });
    res.status(200).json({ problem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateCodingProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProblem = await CodingProblem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProblem) {
      return res.status(404).json({ message: "Coding problem not found" });
    }

    res.status(200).json({
      message: "Coding problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteCodingProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await CodingProblem.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({ message: "Coding problem not found" });
    }

    res.status(200).json({ message: "Coding problem deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Quiz Question Controllers
module.exports.addBulkQuizQuestions = async (req, res) => {
  try {
    const quizQuestions = req.body; // Expecting an array of quiz questions
    const createdQuizQuestions = await QuizQuestion.insertMany(quizQuestions);
    res.status(201).json({
      message: "Bulk quiz questions created successfully",
      quizQuestions: createdQuizQuestions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports.addQuizQuestion = async (req, res) => {
  try {
    const createdQuiz = await QuizQuestion.create(req.body);
    res.status(201).json({
      message: "Quiz question created successfully",
      quiz: createdQuiz,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getQuizQuestions = async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find().sort({ _id: -1 });
    res.status(200).json({ quizQuestions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuiz = await QuizQuestion.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz question not found" });
    }

    res.status(200).json({
      message: "Quiz question updated successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteQuizQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await QuizQuestion.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz question not found" });
    }

    res.status(200).json({ message: "Quiz question deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getQuizQuestionByCategory = async (req, res) => {
  try {
    const { topic } = req.params;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // Case-insensitive match
    const quizQuestions = await QuizQuestion.find({
      topic: { $regex: new RegExp(`^${topic}$`, "i") },
      isActive: true,
    });

    if (quizQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this topic",
      });
    }

    res.status(200).json({
      success: true,
      count: quizQuestions.length,
      quizQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Project Idea Controllers
module.exports.addProjectIdea = async (req, res) => {
  try {
    const createdProject = await Project.create(req.body);
    res.status(201).json({
      message: "Project idea created successfully",
      project: createdProject,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getProjectIdeas = async (req, res) => {
  try {
    const projects = await Project.find().sort({ _id: -1 });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateProjectIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project idea not found" });
    }

    res.status(200).json({
      message: "Project idea updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteProjectIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project idea not found" });
    }

    res.status(200).json({ message: "Project idea deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.searchResourcesOnPractice = async (req, res) => {
  try {
    res.status(200).json({ message: "Search not implemented yet" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.filterPracticeResources = async (req, res) => {
  try {
    res.status(200).json({ message: "Filter not implemented yet" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.addRoadMap = async (req, res) => {
  try {
    res.status(200).json({ message: "Roadmap endpoint is not managed here" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getRoadMaps = async (req, res) => {
  try {
    res.status(200).json({ roadmaps: [] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getRoadMapById = async (req, res) => {
  try {
    res.status(200).json({ message: "Roadmap endpoint is not managed here" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.searchRoadMaps = async (req, res) => {
  try {
    res.status(200).json({ message: "Roadmap search is not implemented here" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getMyProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalProblems = await CodingProblem.countDocuments({});
    const solvedProblems = await CodingProblem.countDocuments({
      userId,
      status: true,
    });
    res.status(200).json({ totalProblems, solvedProblems });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateMyProgress = async (req, res) => {
  try {
    res.status(200).json({
      message: "Progress updates are not stored in this admin module",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ CREATE
module.exports.createQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.create(req.body);
    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET ALL (with filters)
module.exports.getAllQuestions = async (req, res) => {
  try {
    const { role, round, difficulty, category } = req.query;

    let filter = {};

    if (role) filter.role = role;
    if (round) filter.round = round;
    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const questions = await InterviewQuestion.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET SINGLE
module.exports.getQuestionById = async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ UPDATE
module.exports.updateQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ DELETE
module.exports.deleteQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};