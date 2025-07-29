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

    return res.status(200).json({ message: userDetail });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
