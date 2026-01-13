
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UsersSchema");
const Organization = require("../models/OrginazationSchema");
const Teacher = require("../models/TeacherSchema");
module.exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) { 
      return res.status(400).json({ message: "User already exists 4" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please provide email, password, and role",
      });
    }

    let user = null;

    if (role === "admin") {
      user = await Organization.findOne({ email });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = null;
    console.log(user)
    if (role === "user") {
     isMatch = await bcrypt.compare(password, user.password);
    } else {
      console.log(user.password,password);
      isMatch = true;
    }
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userData = {
      id: user._id,
      name: user.name || user.username,
      email: user.email,
      role: user.role || role,
      status: user.isActive || true,
    };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || role,
        status:user.isActive || true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
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
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.showalluser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users});

  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
}