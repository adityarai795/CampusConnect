
const Result = require("../models/ResultSchema");
module.exports.searchResultQuery = async (req, res) => {
  try {
    const { university } = req.query;
    const results = await Result.find({ University :{ $regex: university, $options: "i" } });
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    res.status(200).json({ results });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
 }
module.exports.viewResult=async (req, res) => {
  const { University } = req.body;
  try {
    const isFind = await Result.findOne({University: University });
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


module.exports.deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    await Result.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
