// const accountSid = process.env.TWILIO_API_KEY_SID;
// const authToken = process.env.TWILIO_API_KEY_SECRET;
// const fromPhone = process.env.TWILIO_PHONE_NUMBER;

// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Hello from twilio-node",
//     to: "+91 8924812781", // Text your number
//     from: fromPhone, // From a valid Twilio number
//   })
//   .then((message) => console.log(message.sid));



const axios = require("axios");

exports.sendSMS = async (phone, otp) => {
  const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    params: {
      authorization: process.env.FAST2SMS_API_KEY,
      route: "otp",
      variables_values: otp,
      numbers: phone,
    },
  });

  return response.data;
};
