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




const Availability = require('../models/Availability');
const Booking = require('../models/Booking');

/**
 * Retourne les créneaux disponibles d'un provider à une date donnée,
 * en découpant les plages de disponibilité selon la durée demandée,
 * et en excluant ceux qui chevauchent une réservation existante.
 */
const getAvailableTimeSlots = async (providerId, date, duration) => {
    // Récupérer les disponibilités du provider pour la date
    const availability = await Availability.findOne({ providerId, date });
    if (!availability || !availability.slots.length) return [];

    // Récupérer les réservations du provider pour la date
    const bookings = await Booking.find({ providerId, date });

    // Helper pour convertir HH:mm en minutes
    const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    };

    // Helper inverse : minutes -> HH:mm
    const minutesToTime = (mins) => {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    const timeSlots = [];

    for (const slot of availability.slots) {
        // slot : { start: "09:00", end: "12:00" }
        const slotStart = timeToMinutes(slot.start);
        const slotEnd = timeToMinutes(slot.end);

        // Découpage de la plage en intervalles selon la durée
        for (let start = slotStart; start + duration <= slotEnd; start += duration) {
            const end = start + duration;
            const formatted = {
                start: minutesToTime(start),
                end: minutesToTime(end)
            };

            // Vérifier si chevauche une réservation existante
            const isOverlap = bookings.some(booking => {
                const bookingStart = timeToMinutes(booking.startTime);
                const bookingEnd = timeToMinutes(booking.endTime);

                return !(end <= bookingStart || start >= bookingEnd);
            });

            if (!isOverlap) {
                timeSlots.push(formatted);
            }
        }
    }

    return timeSlots;
};

const getAvailableTimeSlotsHandler = async (req, res) => {
    const { providerId, date, duration } = req.query;

    if (!providerId || !date || !duration) {
        return res.status(400).json({ message: 'Paramètres manquants' });
    }

    try {
        const slots = await getAvailableTimeSlots(providerId, date, parseInt(duration, 10));
        res.json({ slots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
// Utilise ta logique ici pour retourner les créneaux libres
const getPublicAvailability = async (req, res) => {
    const { providerId, date, duration } = req.query;

    if (!providerId || !date || !duration) {
        return res.status(400).json({ message: 'Paramètres manquants' });
    }

    try {
        const slots = await getAvailableTimeSlots(providerId, date, duration); // ta logique existante
        res.json({ slots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des créneaux' });
    }
};
module.exports = {
    getAvailableTimeSlots,
    getPublicAvailability,
    getAvailableTimeSlotsHandler
};




// const Availability = require('../models/Availability');
// const Booking = require('../models/Booking');

// const createAvailability = async (req, res) => {
//     try {
//         const { date, slots } = req.body;
//         const providerId = req.provider._id;  // **req.provider** au lieu de req.user ou req.client
//         const availability = new Availability({ providerId, date, slots });
//         await availability.save();
//         res.status(201).json(availability);
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur serveur' });
//     }
// };

// const getAvailabilities = async (req, res) => {
//     try {
//         const availabilities = await Availability.find({ providerId: req.provider._id });
//         res.json(availabilities);
//     } catch (err) {
//         res.status(500).json({ error: 'Erreur serveur' });
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
//     getAvailabilities,
//     getAvailableTimeSlots
// };
