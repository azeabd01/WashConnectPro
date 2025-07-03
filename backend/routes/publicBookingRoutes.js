// routes/publicBookings.js
const express = require('express');
const router = express.Router();
// const Booking = require('../models/Booking');
// const Service = require('../models/Service');
const { createPublicBooking } = require('../controllers/bookingController');

// POST /api/public/bookings - Créer une réservation publique

router.post('/', createPublicBooking);





// router.post('/', async (req, res) => {
//     try {
//         const {
//             clientName,
//             clientPhone,
//             clientEmail,
//             serviceId,
//             scheduledDate,
//             scheduledTime,
//             vehicleInfo,
//             notes
//         } = req.body;

//         // Vérifier que le service existe et est actif
//         const service = await Service.findOne({ 
//             _id: serviceId, 
//             isActive: true 
//         }).populate('providerId');

//         if (!service) {
//             return res.status(404).json({ message: 'Service non trouvé ou inactif' });
//         }

//         // Créer la réservation
//         const booking = new Booking({
//             clientName,
//             clientPhone,
//             clientEmail,
//             providerId: service.providerId._id, // ID du prestataire du service
//             serviceId,
//             scheduledDate: new Date(scheduledDate),
//             scheduledTime,
//             price: service.price,
//             vehicleInfo,
//             notes
//         });

//         await booking.save();
//         await booking.populate('serviceId', 'name category');

//         res.status(201).json({ 
//             message: 'Réservation créée avec succès', 
//             booking: {
//                 ...booking.toObject(),
//                 provider: {
//                     companyName: service.providerId.companyName,
//                     phone: service.providerId.phone,
//                     email: service.providerId.email
//                 }
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// });

module.exports = router;