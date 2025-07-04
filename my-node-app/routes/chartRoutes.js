const express = require('express');
const { getBarChartData, getPieChartData } = require('../controllers/chartController');
const router = express.Router();

router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);
module.exports = router;
