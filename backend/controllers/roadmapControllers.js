const Roadmap = require("../models/RoadmapSchema");

module.exports.getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.getRoadmapById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Mongo ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid roadmap ID" });
    }

    const roadmap = await Roadmap.findById(id)
      .populate("createdBy", "name email")
      .populate("steps.quiz")
      .populate("steps.project")
      .populate("steps.coding");

    // If not found
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    // Send response
    res.status(200).json(roadmap);
  } catch (error) {
    console.error("Get Roadmap Error:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports.createRoadmap = async (req, res) => {
  try {
    const roadmapData = req.body;
    const newRoadmap = new Roadmap(roadmapData);
    await newRoadmap.save();
    res.status(201).json(newRoadmap);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.updateRoadmap = async (req, res) => {};
module.exports.deleteRoadmap = async (req, res) => {};
