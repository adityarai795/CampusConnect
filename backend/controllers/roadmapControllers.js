const Roadmap = require("../models/RoadmapSchema");

module.exports.getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.status(200).json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports.getRoadmapById = async (req, res) => {};

module.exports.createRoadmap = async (req, res) => {};

module.exports.updateRoadmap = async (req, res) => {};
module.exports.deleteRoadmap = async (req, res) => {};
