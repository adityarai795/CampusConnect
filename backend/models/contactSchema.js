const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  type: {
    type: String,
    enum:['subscribe','contact'],
    default:'subscribe'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;