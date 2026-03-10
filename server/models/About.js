const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String, // base64 encoded
      default: '',
    },
    highlights: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
