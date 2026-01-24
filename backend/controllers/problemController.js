const Problem = require("../models/CodingProblemSchema.js");

module.exports.addCodingProblem = async (req, res) => {
  try {
    const { problem, status, level, topic, link } = req.body;

    const newProblem = new Problem({ problem, status, level, topic, link });
    await newProblem.save();
    res.status(200).json({ message: "Problem added", newProblem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getallCodingProblem = async (req, res) => {
  try {
    const problem = await Problem.find();
    if (!problem) {
      return res
        .status(404)
        .json({ message: "Problem not find Something went wrong" });
    }
    res.status(200).json({ message: "Problem find", problem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteCodingProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
      return res
        .status(404)
        .json({ message: "Problem not find Something went wrong" });
    }
    await Problem.findByIdAndDelete(id);
    res.status(200).json({ message: "Coding Problem successfully Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





// Quiz Problem Controllers will be added here in future
module.exports.getallQuizProblem = async (req, res) => {
  try {
    const problem = await Problem.find();
    if (!problem) {
      return res
        .status(404)
        .json({ message: "Problem not find Something went wrong" });
    }
    res.status(200).json({ message: "Problem find", problem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Additional Quiz Problem controllers can be added here
module.exports.addQuizProblem = async (req, res) => {
  // Implementation for adding quiz problem
}

module.exports.deleteQuizProblem = async (req, res) => {
  // Implementation for deleting quiz problem
}

module.exports.updateQuizProblem = async (req, res) => {
  // Implementation for updating quiz problem
}