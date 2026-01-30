const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic mail sender
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"CampusConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err) {
    console.error("Email Error:", err.message);
    return {
      success: false,
      error: err.message,
    };
  }
};

// Welcome mail
const welcomeEmail = async (to, name) => {
  const subject = "Welcome to CampusConnect Service";
  const text = `Hello ${name},

Welcome to CampusConnect! We're excited to have you on board.

Best regards,  
The CampusConnect Team`;

  return await sendEmail(to, subject, text);
};

const newApplicationEmail = async (to, appName) => {
  const subject = "New Application Submitted";
  const text = `Hello,\n\nA new application named "${appName}" has been submitted.\n\nBest regards,\nThe Team`;
  await sendEmail(to, subject, text);
};

const ambassadorApprovalEmail = async (to, name) => {
  const subject = "Campus Ambassador Application Approved";
  const text = `Hello ${name},
Congratulations! Your application to become a Campus Ambassador has been approved. Welcome aboard!

Best regards,  
The CampusConnect Team`;
  return await sendEmail(to, subject, text);
};

const contactEmailToAdmin = async (from, subject, message) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const fullSubject = `Contact Form Submission: ${subject}`;
  const text = `You have received a new message from the contact form:\n\nFrom: ${from}\n\nMessage:\n${message}`;
  return await sendEmail(adminEmail, fullSubject, text);
}
module.exports = {
  sendEmail,
  welcomeEmail,
  newApplicationEmail,
  ambassadorApprovalEmail,
  contactEmailToAdmin,
};
