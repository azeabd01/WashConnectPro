// ✅ CORRECTION des routes/bookings.js

const express = require('express');
const auth = require('../middlewares/authMiddlewareProvider');
const {
    getBookings,
    getBookingById,
    updateBookingStatus,
    createBooking
} = require('../controllers/bookingController');

const router = express.Router();

// ✅ GET et POST pour récupérer les réservations (avec filtres)
router.get('/', auth, getBookings);
router.post('/filter', auth, getBookings); // ✅ Route pour filtres POST

router.post('/', auth, createBooking);
router.get('/:id', auth, getBookingById);
router.patch('/:id/status', auth, updateBookingStatus);

module.exports = router;