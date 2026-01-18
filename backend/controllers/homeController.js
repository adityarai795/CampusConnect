const Resource = require("../models/ResourceSchema");
const Users = require('../models/UsersSchema');
const Result = require('../models/ResultSchema');
const Job = require('../models/JobSchema');

module.exports.homePageData = async (req, res) => { 
  try {
    const totalJobs = await Job.countDocuments({});
    const totalResources = await Resource.countDocuments({});
    const totalUsers = await Users.countDocuments({});
    const totalResults = await Result.countDocuments({});
    res.status(200).json({
      totalJobs,
      totalResources,
      totalUsers,
      totalResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}