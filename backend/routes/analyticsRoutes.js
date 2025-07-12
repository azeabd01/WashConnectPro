const express = require('express');
const router = express.Router();
const { 
    getAnalyticsOverview, 
    getWeeklyPerformance,
    getMonthlyStats,
    getTopServices,
    getRecentBookings,
    getDashboardData,
    getDebugStats
} = require('../controllers/analyticsController');
const auth = require('../middlewares/authMiddlewareProvider');

router.get('/overview', auth, getAnalyticsOverview);
router.get('/weekly-performance', auth, getWeeklyPerformance);


// Dans analyticsRoutes.js
router.get('/monthly-stats', auth, getMonthlyStats);
router.get('/top-services', auth, getTopServices);
router.get('/recent-bookings', auth, getRecentBookings);
router.get('/dashboard', auth, getDashboardData); // Tout en une fois
router.get('/debug', getDebugStats);

module.exports = router;