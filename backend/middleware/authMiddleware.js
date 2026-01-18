const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/UsersSchema");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
};

module.exports = authMiddleware;
