module.exports.addCodingProblem = async (req, res) => { };

module.exports.getCodingProblem=async (req, res) => { };

module.exports.updateCodingProblem= async (req, res) => { };

// Quiz Question Controllers
module.exports.addQuizQuestion = async (req, res) => { };

module.exports.getQuizQuestions = async (req, res) => { };

module.exports.updateQuizQuestion = async (req, res) => { };


// Project Idea Controllers

module.exports.addProjectIdea = async (req, res) => { };

module.exports.getProjectIdeas = async (req, res) => { };


module.exports.searchResourcesOnPractice = async (req, res) => {};

module.exports.filterPracticeResources = async (req, res) => { };





// RoadMap Controllers
module.exports.addRoadMap= async (req, res) => { };

module.exports.getRoadMaps = async (req, res) => { };

module.exports.getRoadMapById = async (req, res) => { };

module.exports.searchRoadMaps = async (req, res) => { };



module.exports.getMyProgress = async (req, res) => {
  const { id } = req.user._id;
  try {
    const totalProblems = await Problem.countDocuments({ userId: id });
    const solvedProblems = await Problem.countDocuments({
      userId: id,
      status: "solved",
    });
    res.status(200).json({ totalProblems, solvedProblems });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateMyProgress = async (req, res) => { };

