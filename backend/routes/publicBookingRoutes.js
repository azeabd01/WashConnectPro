// routes/publicBookings.js
const express = require('express');
const router = express.Router();

const { createPublicBooking } = require('../controllers/bookingController');

router.post('/', createPublicBooking);

module.exports = router;