const Job = require("../models/JobSchema.js");
const Application = require("../models/JobApplicantSchema.js");

module.exports.addJob = async (req, res) => {
  const {
    title,
    company,
    description,
    category,
    location,
    experience,
    JobType,
    link,
  } = req.body;
  const { recuriterId } = req.user.id;
  try {
    const job = await Job({
      title,
      company,
      description,
      category,
      location,
      experience,
      JobType,
      link,
    });
    await job.save();
    res.status(200).json({ message: "Job post successfully created", job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.showllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const showall = await Job.find()
      .skip(skip)
      .limit(limit)
      .sort({ jobPostedOn: -1 });
    if (!showall) {
      return res.status(404).json({ message: "Sorry for this not found" });
    }
    res.status(202).json({ message: showall });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

module.exports.applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { resume, coverLetter } = req.body;
    const applicantId = req.user.id;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const application = new Application({
      job: id,
      applicant: applicantId,
      resume,
      coverLetter,
    });
    await application.save();
    res.status(200).json({ message: "Applied Successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.myAppiliedJobs = async (req, res) => {
  try {
    const applicantId = req.user.id;
    const applications = await Application.find({ applicant: applicantId })
      .populate("job", "title company location JobType jobPostedOn status")
      .sort({ appliedAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Todo Frontend logic is pending
module.exports.getApplicantsForJob = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ _id: id })
      .populate(
        "applicant",
        "name email resume mobile academicDetails skills experience socialLinks",
      )
      .sort({ appliedAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchJobs = async (req, res) => {
  try {
    const { JobType, category, search, page = 1, limit = 10 } = req.query;

    const searchCriteria = {};

    // Filter by JobType
    if (JobType) {
      searchCriteria.JobType = JobType;
    }

    // Filter by Category
    if (category) {
      searchCriteria.category = category;
    }

    // Search text
    if (search) {
      searchCriteria.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total] = await Promise.all([
      Job.find(searchCriteria)
        .sort({ jobPostedOn: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Job.countDocuments(searchCriteria),
    ]);

    res.status(200).json({
      jobs,
      // pagination: {
      //   totalJobs: total,
      //   currentPage: Number(page),
      //   totalPages: Math.ceil(total / limit),
      // },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
