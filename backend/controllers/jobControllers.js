// const Job = require("../models/JobSchema.js");
const Job = require("../models/JobSchema.js")
module.exports.addJob = async (req, res) => {
  const { title, description, category, city, location, JobType } = req.body;
  try {
    const job = await Job({
      title,
      description,
      category,
      city,
      location,
      JobType,
    });
    await job.save();
    res.status(200).json({ message: "Job post successfully created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.showllPost = async (req, res) => {
  try {
    const showall = await Job.find();
    if (!showall) {
      return res.status(404).json({message:"Sorry for this not fount"})
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
