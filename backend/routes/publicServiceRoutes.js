const express = require('express');
const router = express.Router();
const {
    getActiveServices,
    getServicesByProvider
} = require('../controllers/serviceController');
const { 
    getAvailableTimeSlots,
    getAvailableTimeSlotsHandler,
    getPublicAvailability 
} = require('../controllers/availabilityController');

router.get('/', getActiveServices);
router.get('/availability', getPublicAvailability);
router.get('/availabilities/slots', getAvailableTimeSlots);
router.get('/slots', getAvailableTimeSlotsHandler);

router.get('/:providerId', getServicesByProvider);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { getAvailableTimeSlots } = require('../controllers/availabilityController');

// router.get('/slots', async (req, res) => {
//     const { providerId, date, duration } = req.query;

//     if (!providerId || !date || !duration) {
//         return res.status(400).json({ message: 'Paramètres manquants' });
//     }

//     try {
//         const slots = await getAvailableTimeSlots(providerId, date, parseInt(duration, 10));
//         res.json({ slots });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// });

// module.exports = router;
