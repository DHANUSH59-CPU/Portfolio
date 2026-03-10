const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    greeting: {
      type: String,
      default: 'Hello, I\'m',
    },
    name: {
      type: String,
      required: true,
      default: 'Dhanush Kumar S R',
    },
    titles: {
      type: [String],
      default: ['AI Engineer', 'Full-Stack Developer', 'Problem Solver'],
    },
    subtitle: {
      type: String,
      default: 'Passionate about building intelligent systems and beautiful web experiences.',
    },
    profileImage: {
      type: String, // base64 encoded
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
