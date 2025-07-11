const express = require('express');
const router = express.Router();
const {
    getActiveServices,
    // getServicesByProvider
} = require('../controllers/serviceController');
// const { 
    // getAvailableTimeSlots,
    // getAvailableTimeSlotsHandler,
    // getPublicAvailability 
// } = require('../controllers/availabilityController');

router.get('/', getActiveServices);
// router.get('/availability', getPublicAvailability);
// router.get('/availabilities/slots', getAvailableTimeSlots);
// router.get('/slots', getAvailableTimeSlotsHandler);

// router.get('/:providerId', getServicesByProvider);

module.exports = router;
