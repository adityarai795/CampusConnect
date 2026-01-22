const NodeMailer = require('nodemailer');

const transporter = NodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};

const welcomeEmail = async (to, name) => {
  const subject = 'Welcome to Our Service';
  const text = `Hello ${name},\n\nThank you for joining our service! We're excited to have you on board.\n\nBest regards,\nThe Team`;
  await sendEmail(to, subject, text);
};

const newApplicationEmail = async (to, appName) => {
  const subject = 'New Application Submitted';
  const text = `Hello,\n\nA new application named "${appName}" has been submitted.\n\nBest regards,\nThe Team`;
  await sendEmail(to, subject, text);
};

module.exports = { sendEmail, welcomeEmail, newApplicationEmail };