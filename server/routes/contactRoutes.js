const express = require('express');
const { getContact, updateContact, getResume } = require('../controllers/contactController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getContact);
router.put('/', auth, updateContact);
router.get('/resume', getResume);

module.exports = router;
