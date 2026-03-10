const express = require('express');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getSkills);
router.post('/', auth, createSkill);
router.put('/:id', auth, updateSkill);
router.delete('/:id', auth, deleteSkill);

module.exports = router;
