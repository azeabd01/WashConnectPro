const express = require('express');
const router = express.Router();
const { getAnalyticsOverview, getWeeklyPerformance } = require('../controllers/analyticsController');
const auth = require('../middlewares/authMiddleware');

router.get('/overview', auth, getAnalyticsOverview);
router.get('/weekly-performance', auth, getWeeklyPerformance);

module.exports = router;
