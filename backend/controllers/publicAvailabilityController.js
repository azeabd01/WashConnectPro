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