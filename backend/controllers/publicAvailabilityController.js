// controllers/publicAvailabilityController.js
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const moment = require('moment');

const getPublicAvailability = async (req, res) => {
    try {
        const { providerId, date, duration } = req.query;
        console.log('➡️ Requête reçue avec :', { providerId, date, duration });

        // Validation des paramètres
        if (!providerId || !date || !duration) {
            return res.status(400).json({
                message: 'providerId, date et duration sont requis.',
                received: { providerId, date, duration }
            });
        }

        if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
            return res.status(400).json({
                message: 'Format de date invalide. Utilisez YYYY-MM-DD.',
                received: { date }
            });
        }

        const serviceDuration = parseInt(duration);
        if (isNaN(serviceDuration) || serviceDuration <= 0) {
            return res.status(400).json({
                message: 'Duration doit être un nombre positif.',
                received: { duration }
            });
        }

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).json({
                message: 'Provider introuvable.',
                providerId
            });
        }

        console.log('📦 Provider trouvé :', provider.businessName);
        const dayOfWeek = moment(date, 'YYYY-MM-DD').format('dddd').toLowerCase();
        console.log('📅 Jour de la semaine:', dayOfWeek);

        const dayHours = provider.workingHours?.[dayOfWeek];
        console.log(`🕒 Horaires pour ${dayOfWeek} :`, dayHours);

        if (!dayHours || !dayHours.open || !dayHours.close || dayHours.isOpen === false) {
            return res.json({
                slots: [],
                message: `Provider fermé le ${dayOfWeek}`
            });
        }

        const start = moment(`${date} ${dayHours.open}`, 'YYYY-MM-DD HH:mm');
        const end = moment(`${date} ${dayHours.close}`, 'YYYY-MM-DD HH:mm');

        console.log('🕒 Heures de travail:', {
            start: start.format('YYYY-MM-DD HH:mm'),
            end: end.format('YYYY-MM-DD HH:mm')
        });

        const bookings = await Booking.find({
            providerId,
            date: new Date(date)
        });

        console.log('📅 Réservations existantes :', bookings.length);

        const bookedSlots = bookings.map(booking => {
            const startTime = moment(`${date} ${booking.startTime}`, 'YYYY-MM-DD HH:mm');
            const endTime = moment(`${date} ${booking.endTime}`, 'YYYY-MM-DD HH:mm');
            return {
                start: startTime,
                end: endTime,
            };
        });

        const slots = [];
        let current = start.clone();
        const intervalMinutes = 30;

        while (current.clone().add(serviceDuration, 'minutes').isSameOrBefore(end)) {
            const currentEnd = current.clone().add(serviceDuration, 'minutes');

            const isConflict = bookedSlots.some(bookedSlot =>
                current.isBefore(bookedSlot.end) && currentEnd.isAfter(bookedSlot.start)
            );

            if (!isConflict) {
                slots.push(current.format('HH:mm'));
            }

            current.add(intervalMinutes, 'minutes');
        }

        res.json({
            slots,
            info: {
                providerId,
                date,
                duration: serviceDuration,
                dayOfWeek,
                workingHours: dayHours,
                totalBookings: bookings.length,
                availableSlots: slots.length
            }
        });

    } catch (err) {
        console.error('❌ Erreur dans /api/public/availability :', err);
        res.status(500).json({
            message: 'Erreur serveur',
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

module.exports = {
    getPublicAvailability
};



















// // api/utils/availabilityUtils.js
// const Availability = require('../models/Availability');

// // Fonction utilitaire pour ajouter des minutes
// const addMinutes = (time, minutes) => {
//     const [hours, mins] = time.split(':').map(Number);
//     const totalMinutes = hours * 60 + mins + minutes;
//     const newHours = Math.floor(totalMinutes / 60);
//     const newMins = totalMinutes % 60;
//     return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
// };

// // Fonction pour générer des créneaux de 30 minutes
// const generateTimeSlots = (openTime, closeTime) => {
//     const slots = [];
//     let current = openTime;

//     while (current < closeTime) {
//         const start = current;
//         const end = addMinutes(current, 30);

//         if (end <= closeTime) {
//             slots.push({ start, end });
//         }

//         current = end;
//     }

//     return slots;
// };

// // Fonction principale : créer les disponibilités automatiques sur 30 jours
// const createAvailabilitiesFromWorkingHours = async (providerId, workingHours) => {
//     try {
//         const availabilities = [];
//         const today = new Date();

//         for (let i = 0; i < 30; i++) {
//             const currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);

//             const dayOfWeek = currentDate.getDay();
//             const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//             const dayName = dayNames[dayOfWeek];

//             const daySchedule = workingHours[dayName];

//             if (daySchedule && daySchedule.isOpen) {
//                 const slots = generateTimeSlots(daySchedule.open, daySchedule.close);

//                 const availability = new Availability({
//                     providerId,
//                     date: currentDate.toISOString().split('T')[0],
//                     slots: slots.map(slot => ({
//                         start: slot.start,
//                         end: slot.end,
//                         isBooked: false
//                     }))
//                 });

//                 availabilities.push(availability);
//             }
//         }

//         if (availabilities.length > 0) {
//             await Availability.insertMany(availabilities);
//             console.log(`✅ ${availabilities.length} disponibilités créées pour le provider ${providerId}`);
//         }

//     } catch (error) {
//         console.error('Erreur création des disponibilités:', error);
//     }
// };

// // GET /api/availability/:providerId?date=YYYY-MM-DD
// const getAvailabilityByDate = async (req, res) => {
//     try {
//         const { providerId } = req.params;
//         const { date } = req.query;

//         if (!date) {
//             return res.status(400).json({ message: 'La date est requise dans la query string (ex: ?date=2025-07-10)' });
//         }

//         const availability = await Availability.findOne({ providerId, date });

//         if (!availability) {
//             return res.status(404).json({ message: 'Aucune disponibilité trouvée pour ce jour' });
//         }

//         const availableSlots = availability.slots.filter(slot => !slot.isBooked);

//         res.status(200).json({
//             date: availability.date,
//             providerId: availability.providerId,
//             availableSlots
//         });

//     } catch (error) {
//         console.error('Erreur lors de la récupération des disponibilités:', error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// module.exports = {
//     createAvailabilitiesFromWorkingHours,
//     getAvailabilityByDate
// };




// const Availability = require('../models/Availability');
// const Booking = require('../models/Booking');

// /**
//  * Retourne les créneaux disponibles d'un provider à une date donnée,
//  * en découpant les plages de disponibilité selon la durée demandée,
//  * et en excluant ceux qui chevauchent une réservation existante.
//  */
// const getAvailableTimeSlots = async (providerId, date, duration) => {
//     // Récupérer les disponibilités du provider pour la date
//     const availability = await Availability.findOne({ providerId, date });
//     if (!availability || !availability.slots.length) return [];

//     // Récupérer les réservations du provider pour la date
//     const bookings = await Booking.find({ providerId, date });

//     // Helper pour convertir HH:mm en minutes
//     const timeToMinutes = (time) => {
//         const [h, m] = time.split(':').map(Number);
//         return h * 60 + m;
//     };

//     // Helper inverse : minutes -> HH:mm
//     const minutesToTime = (mins) => {
//         const h = Math.floor(mins / 60);
//         const m = mins % 60;
//         return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
//     };

//     const timeSlots = [];

//     for (const slot of availability.slots) {
//         // slot : { start: "09:00", end: "12:00" }
//         const slotStart = timeToMinutes(slot.start);
//         const slotEnd = timeToMinutes(slot.end);

//         // Découpage de la plage en intervalles selon la durée
//         for (let start = slotStart; start + duration <= slotEnd; start += duration) {
//             const end = start + duration;
//             const formatted = {
//                 start: minutesToTime(start),
//                 end: minutesToTime(end)
//             };

//             // Vérifier si chevauche une réservation existante
//             const isOverlap = bookings.some(booking => {
//                 const bookingStart = timeToMinutes(booking.startTime);
//                 const bookingEnd = timeToMinutes(booking.endTime);

//                 return !(end <= bookingStart || start >= bookingEnd);
//             });

//             if (!isOverlap) {
//                 timeSlots.push(formatted);
//             }
//         }
//     }

//     return timeSlots;
// };

// const getAvailableTimeSlotsHandler = async (req, res) => {
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
// };
// // Utilise ta logique ici pour retourner les créneaux libres
// const getPublicAvailability = async (req, res) => {
//     const { providerId, date, duration } = req.query;

//     if (!providerId || !date || !duration) {
//         return res.status(400).json({ message: 'Paramètres manquants' });
//     }

//     try {
//         const slots = await getAvailableTimeSlots(providerId, date, duration); // ta logique existante
//         res.json({ slots });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur lors de la récupération des créneaux' });
//     }
// };
// module.exports = {
//     getAvailableTimeSlots,
//     getPublicAvailability,
//     getAvailableTimeSlotsHandler
// };




// const Availability = require('../models/Availability');
// const Booking = require('../models/Booking');
// const Provider = require('../models/Provider');
// const { calculateAvailableTimeSlots } = require('../utils/availabilityUtils');

// // const createAvailability = async (req, res) => {
// //     try {
// //         const { date, slots } = req.body;
// //         const providerId = req.provider._id;  // **req.provider** au lieu de req.user ou req.client
// //         const availability = new Availability({ providerId, date, slots });
// //         await availability.save();
// //         res.status(201).json(availability);
// //     } catch (err) {
// //         res.status(500).json({ error: 'Erreur serveur' });
// //     }
// // };

// const getAvailabilities = async (req, res) => {
//     try {
//         const { serviceId, date } = req.query;
//         if (!serviceId || !date) return res.status(400).json({ message: 'serviceId et date requis' });

//         const service = await Service.findById(serviceId);
//         if (!service) return res.status(404).json({ message: 'Service non trouvé' });

//         const provider = await Provider.findById(service.providerId);
//         if (!provider) return res.status(404).json({ message: 'Prestataire non trouvé' });

//         const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
//         const workingHours = provider.workingHours[dayOfWeek];
//         if (!workingHours || !workingHours.isOpen) return res.json({ slots: [] });

//         const bookings = await Booking.find({
//             serviceId,
//             date,
//             status: { $in: ['pending', 'confirmed', 'in-progress'] }
//         });

//         const slots = calculateAvailableTimeSlots(workingHours.open, workingHours.close, service.duration, bookings);

//         res.json({ slots });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// const getAvailableTimeSlots = async (providerId, date, serviceDuration) => {
//     // 1. Récupérer les disponibilités du provider à cette date
//     const availability = await Availability.findOne({ providerId, date });
//     if (!availability) return [];

//     // 2. Récupérer les bookings confirmés ce jour-là
//     const bookings = await Booking.find({
//         providerId,
//         scheduledDate: date,
//         status: { $in: ['pending', 'confirmed'] },
//     });

//     // 3. Générer les créneaux en respectant la durée du service
//     const slots = [];

//     for (const slot of availability.slots) {
//         let start = slot.start; // "09:00"
//         const end = slot.end;   // "11:00"

//         // Fonction utilitaire pour ajouter minutes (exemple simplifié)
//         const addMinutes = (time, mins) => {
//             const [h, m] = time.split(':').map(Number);
//             const totalMins = h * 60 + m + mins;
//             const hh = String(Math.floor(totalMins / 60)).padStart(2, '0');
//             const mm = String(totalMins % 60).padStart(2, '0');
//             return `${hh}:${mm}`;
//         };

//         while (addMinutes(start, serviceDuration) <= end) {
//             const candidateStart = start;
//             const candidateEnd = addMinutes(start, serviceDuration);

//             // Vérifier si ce créneau ne chevauche aucun booking
//             const overlaps = bookings.some(b => {
//                 const bookedStart = b.scheduledTime; // ex: "09:30"
//                 const bookedEnd = addMinutes(b.scheduledTime, b.serviceDuration);
//                 return !(
//                     candidateEnd <= bookedStart ||
//                     candidateStart >= bookedEnd
//                 );
//             });

//             if (!overlaps) slots.push({ start: candidateStart, end: candidateEnd });

//             // Incrémenter start par pas (ex. 15 minutes)
//             start = addMinutes(start, 15);
//         }
//     }

//     return slots;
// };


// module.exports = {
//     createAvailability,
// getAvailabilities,
//     getAvailableTimeSlots
// };
