const express = require('express');
const { getHero, updateHero } = require('../controllers/heroController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getHero);
router.put('/', auth, updateHero);

module.exports = router;
