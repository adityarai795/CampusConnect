const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UsersSchema");
const Organization = require("../models/OrginazationSchema");
const Teacher = require("../models/TeacherSchema");
module.exports.signUp = async (req, res) => {
  try {
    const { email, abcId, password } = req.body;
    let { role } = req.body;
    if (!role) {
      role = "user";
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists 4" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      abcId,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // 🔍 Search user across collections
    let user = await User.findOne({ email });
    let role = "user";


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
console.log("User found:", user);
    // 🔐 Always verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      role,
      status: user.isActive ?? true,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name || user.username,
        email: user.email,
        role,
        status: user.isActive ?? true,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message  ,
    });
  }
};

module.exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.forgetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getuser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Data fetch", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.showalluser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
