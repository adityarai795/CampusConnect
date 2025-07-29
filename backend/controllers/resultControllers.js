
const Result = require("../models/ResultSchema");

module.exports.viewResult=async (req, res) => {
  const { University, Branch, Semester } = req.body;
  try {
    const isFind = await Result.findOne({ University });
    if (!isFind) {
      return res.status(400).json({ message: "Sorry for that Not Avilable" });
    }
    res.status(200).json({ message: isFind.link });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
}

module.exports.uploadResult= async (req, res) => {
  const { University, link } = req.body;
  try {
    if (!University || !link) {
      return res.status(402).json({ message: "Accurate data not found" });
    }
    const result = await Result.create({ University, link });
    res.status(201).json({ message: "Result link uploaded successfully", result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports.showall = async (req, res) => {
  try {
    const showall = await Result.find();

    res.status(200).json({ showall });
  } catch (error) {
    res.status(400).json({ message: "Not found", error });
  }
};