const express = require('express');
const { initializeData } = require('../controllers/initController');
const router = express.Router();

router.get('/init', initializeData);
module.exports = router;
