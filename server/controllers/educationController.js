const Education = require('../models/Education');

// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/education
// @access  Private
const createEducation = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!edu) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.json({ success: true, message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
