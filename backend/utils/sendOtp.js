const accountSid = process.env.TWILIO_API_KEY_SID;
const authToken = process.env.TWILIO_API_KEY_SECRET;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);

module.exports.sendOtp = async (toPhone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Otp from CampusConnect: ${otp}`,
      to: toPhone, // USER number (req.body se)
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio number
    });

    return message;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
