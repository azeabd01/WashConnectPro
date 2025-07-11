// routes/publicAvailability.js
const express = require('express');
const router = express.Router();
const { getPublicAvailability } = require('../controllers/publicAvailabilityController');

// Route publique pour obtenir les créneaux disponibles
router.get('/', getPublicAvailability);

module.exports = router;
