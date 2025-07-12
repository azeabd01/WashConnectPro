const express = require('express');
const router = express.Router();
const { 
    getAnalyticsOverview, 
    getWeeklyPerformance, 
    getRecentBookings,
    getDashboardData,
    getWorkingHoursAnalysis,
    getRealTimeStats
} = require('../controllers/analyticsController');
const auth = require('../middlewares/authMiddlewareProvider');

// ✅ Routes existantes
router.get('/overview', auth, getAnalyticsOverview);
router.get('/weekly-performance', auth, getWeeklyPerformance);
router.get('/recent-bookings', auth, getRecentBookings);
router.get('/dashboard', auth, getDashboardData);

// ✅ Nouvelles routes
router.get('/working-hours', auth, getWorkingHoursAnalysis);
router.get('/real-time', auth, getRealTimeStats);

module.exports = router;