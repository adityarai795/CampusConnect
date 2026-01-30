const express = require("express");
const router = express.Router();
const { sendOtp } = require("../utils/sendOtp");

// TEMP STORE (Production me DB / Redis use karo)
const otpStore = new Map();

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// SEND OTP API
router.get("/send", async (req, res) => {
  const phone = "+919839930768"; // for testing purpose
  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone required" });
  }

  const otp = generateOTP();

  // Save OTP with expiry
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  try {
    await sendOtp(phone, otp);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
