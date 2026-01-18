const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UsersSchema");

module.exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // assume this is set in middleware
    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const userDetail = await User.findById(userId).select("-password"); // exclude password
    if (!userDetail) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    return res.status(200).json({ data: userDetail });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log("Received academicDetails:", req.body);
    // Safety check
    if (Array.isArray(req.body.academicDetails)) {
      req.body.academicDetails = req.body.academicDetails.map((item) => {
        const updatedItem = { ...item };

        if (item.institutionType === "school") {
          updatedItem.grade = item.branchOrClass || "";
          updatedItem.section = item.semesterOrGrade || "";

          // optional cleanup
          delete updatedItem.branch;
          delete updatedItem.semester;
        } else {
          updatedItem.branch = item.branchOrClass || "";
          updatedItem.semester = item.semesterOrGrade || "";

          // optional cleanup
          delete updatedItem.grade;
          delete updatedItem.section;
        }

        return updatedItem;
      });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
