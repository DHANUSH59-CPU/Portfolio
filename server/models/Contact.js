const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    leetcode: {
      type: String,
      default: '',
    },
    resume: {
      type: String, // base64 encoded PDF
      default: '',
    },
    resumeFileName: {
      type: String,
      default: 'resume.pdf',
    },
    tagline: {
      type: String,
      default: 'Let\'s build something amazing together!',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
