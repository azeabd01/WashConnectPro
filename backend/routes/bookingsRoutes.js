const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {
    createBooking,
    getBookings,
    updateBookingStatus,
    getBookingStats
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.patch('/:id/status', updateBookingStatus);
router.get('/stats', getBookingStats);

module.exports = router;
