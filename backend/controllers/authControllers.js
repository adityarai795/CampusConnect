const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const User = require("../models/UsersSchema");
const { oauth2Client } = require("../utils/googleAuth");
const CampusAmbassador = require("../models/ambassadorSchema");

const { welcomeEmail,ambassadorApprovalEmail } = require("../utils/email.js");
// Helper function to generate unique ABC ID
const generateAbcId = () => {
  return "ABC" + Date.now() + Math.floor(Math.random() * 1000);
};

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, name, abcId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      abcId,
      authProviders: {
        local: {
          enabled: true,
          password: hashedPassword,
        },
        google: {
          enabled: false,
        },
      },
    });
    await welcomeEmail(email, name);
    return res.status(201).json({
      success: true,
      message: "User created",
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.authProviders.local.enabled) {
      return res.status(400).json({
        message: "This account uses Google login",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.authProviders.local.password,
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    console.log("Google Login - Code received:", code);
    console.log(
      "CLIENT_ID:",
      process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + "...",
    );
    console.log(
      "CLIENT_SECRET:",
      process.env.GOOGLE_CLIENT_SECRET?.substring(0, 10) + "...",
    );
    console.log("REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "No authorization code provided",
      });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();
    const { email, name, id: googleId } = data;

    let user = await User.findOne({
      $or: [{ "authProviders.google.googleId": googleId }, { email }],
    });

    // 🆕 First time Google user
    if (!user) {
      user = await User.create({
        name,
        email,
        abcId: generateAbcId(),
        password: "OAUTH_GOOGLE",
        authProviders: {
          local: {
            enabled: false,
            password: null,
          },
          google: {
            enabled: true,
            googleId: googleId,
          },
        },
      });
    } else {
      // 🔗 Link Google to existing email account
      user.authProviders.google = {
        enabled: true,
        googleId: googleId,
      };
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Google authentication failed",
      error: err.message,
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



module.exports.getAmbassadors = async (req, res) => { 
  try {
    const ambassadors = await CampusAmbassador.find();
    return res.status(200).json({ ambassadors });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.createAmbassador = async (req, res) => { 
  try {
    const ambassadorData = req.body;
    const newAmbassador = await CampusAmbassador.create(ambassadorData);
    return res.status(201).json({ message: "Ambassador created", ambassador: newAmbassador });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};


module.exports.approveAmbassador = async (req, res) => { 
  try {
    const { id } = req.params;
    const ambassador = await CampusAmbassador.findById(id);
    if (!ambassador) {
      return res.status(404).json({ message: "Ambassador not found" });
    }
    const email = ambassador.email;
    const user= await User.findOne({email:email});
    if(!user){
      return res.status(404).json({ message: "User not found for this ambassador email" });
    }
    user.role = "ambassador";
    await user.save();
    ambassador.status = "approved";
    await ambassador.save();
    await ambassadorApprovalEmail(email, ambassador.name);  
    return res.status(200).json({ message: "Ambassador approved", ambassador });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
