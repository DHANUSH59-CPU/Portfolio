const Contact = require('../models/Contact');

// @route   GET /api/contact
// @access  Public
const getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/contact
// @access  Private
const updateContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create(req.body);
    } else {
      contact = await Contact.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/contact/resume
// @desc    Download resume PDF
// @access  Public
const getResume = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact || !contact.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Decode base64 and send as PDF
    const resumeBuffer = Buffer.from(contact.resume, 'base64');
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${contact.resumeFileName || 'resume.pdf'}"`,
      'Content-Length': resumeBuffer.length,
    });
    res.send(resumeBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getContact, updateContact, getResume };
