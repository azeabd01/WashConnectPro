// ✅ CORRECTION des routes/publicBookings.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const { createPublicBooking } = require('../controllers/bookingController');

// ✅ Validation des données pour réservation publique
const validatePublicBooking = [
    body('clientId').notEmpty().withMessage('clientId est requis'),
    body('clientName').notEmpty().withMessage('Nom du client requis'),
    body('clientPhone').notEmpty().withMessage('Téléphone du client requis'),
    body('serviceId').notEmpty().withMessage('Service requis'),
    body('scheduledDate').notEmpty().withMessage('Date de réservation requise'),
    body('scheduledTime').notEmpty().withMessage('Heure de réservation requise'),
];

router.post('/', validatePublicBooking, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Données invalides',
            errors: errors.array()
        });
    }
    next();
}, createPublicBooking);

module.exports = router;
