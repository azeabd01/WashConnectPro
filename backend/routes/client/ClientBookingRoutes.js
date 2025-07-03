const express = require('express');
const router = express.Router();
const authClient = require('../../middlewares/authClientMiddleware');
const {
    getMyActiveBookings,
    getMyBookingHistory
} = require('../../controllers/client/clientBookingController');

router.get('/active', authClient, getMyActiveBookings);
router.get('/history', authClient, getMyBookingHistory);

module.exports = router;
