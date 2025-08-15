// const Job = require("../models/JobSchema.js");
const Job = require("../models/JobSchema.js")
module.exports.addJob = async (req, res) => {
  const { title, description, category, city, location, JobType,link } = req.body;
  try {
    const job = await Job({
      title,
      description,
      category,
      city,
      location,
      JobType,
      link,
    });
    await job.save();
    res.status(200).json({ message: "Job post successfully created",job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.showllPost = async (req, res) => {
  try {
    const showall = await Job.find().sort({ _id: -1 });
    if (!showall) {
      return res.status(404).json({message:"Sorry for this not found"})
    }
    res.status(202).json({ message: showall });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

module.exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// module.exports = { addJob };
