const Resource = require("../models/ResourceSchema");

module.exports.uploadResource = async (req, res) => {
  const { title, type, description, link, branch, semester, university } =
    req.body;
  try {
    const newResource = new Resource({
      title,
      type,
      description,
      link,
      branch,
      semester,
      university,
    });

    await newResource.save();
    res.status(201).json({
      message: "Resource uploaded successfully",
      resource: newResource,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.viewResource = async (req, res) => {
  const { type, title } = req.body;

  try {
    if (!type || !title) {
      return res.status(400).json({ error: "Type and Title are required" });
    }

    const resources = await Resource.find({
      type: type,
      title: { $regex: title, $options: "i" },
    });
    if (resources.length <= 0) {
      return res.status(400).json({ message: "Not available" });
    }
res.status(200).json({ message: foundResources });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.viewAll = async (req, res) => {
  try {
    const data = await Resource.find({});
    res.status(201).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
