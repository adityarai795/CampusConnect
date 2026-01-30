const Resource = require("../models/ResourceSchema");
const Users = require('../models/UsersSchema');
const Result = require('../models/ResultSchema');
const Job = require('../models/JobSchema');
const { contactEmailToAdmin } = require("../utils/email.js");
const Contact = require("../models/contactSchema.js");

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

module.exports.contactFormSubmit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message, type: 'contact' });
    await contact.save();
    contactEmailToAdmin(email, subject, message);
    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existingContact = await Contact
      .findOne({ email: email, type: 'subscribe' });
    if (existingContact) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }
    const contact = new Contact({ email, type: 'subscribe' });
    await contact.save();
    res.status(200).json({ message: "Subscribed successfully" });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}