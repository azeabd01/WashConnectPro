const express = require('express');
const auth = require('../middlewares/authMiddlewareProvider');
const {
    getBookings,
    getBookingById,
    updateBookingStatus,
    createBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/', auth, getBookings);
router.post('/', auth, createBooking);
router.get('/:id', auth, getBookingById);
router.patch('/:id/status', auth, updateBookingStatus);

module.exports = router;
