const Booking = require('../models/Booking');
const Service = require('../models/Service');
const moment = require('moment');

// GET /api/bookings
// POST /api/bookings - avec filtres dans req.body
const getBookings = async (req, res) => {
    try {
        // Ici on prend les filtres depuis req.body (au lieu de req.query)
        const { status, date, limit = 50 } = req.body || {};

        let query = { providerId: req.provider.id };

        if (status && status !== 'all') query.status = status;

        if (date) {
            const startDate = moment(date).startOf('day');
            const endDate = moment(date).endOf('day');
            query.scheduledDate = { $gte: startDate.toDate(), $lte: endDate.toDate() };
        }

        const bookings = await Booking.find(query)
            .populate('serviceId', 'name category')
            .sort({ scheduledDate: -1, scheduledTime: -1 })
            .limit(parseInt(limit));

        res.json({ bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// GET /api/bookings/:id
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, providerId: req.provider.id })
            .populate('serviceId', 'name description price duration category');

        if (!booking) return res.status(404).json({ message: 'Réservation non trouvée' });

        res.json({ booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const validStatus = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'Statut invalide' });
        }

        const booking = await Booking.findOne({ _id: req.params.id, providerId: req.provider.id });
        if (!booking) return res.status(404).json({ message: 'Réservation non trouvée' });

        booking.status = status;
        if (notes) booking.notes = notes;

        if (status === 'completed') {
            booking.completedAt = new Date();
            await Service.findByIdAndUpdate(booking.serviceId, { $inc: { bookingCount: 1 } });
        } else if (status === 'cancelled') {
            booking.cancelledAt = new Date();
        }

        await booking.save();

        res.json({ message: 'Statut mis à jour avec succès', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const {
            clientName,
            clientPhone,
            clientEmail,
            serviceId,
            scheduledDate,
            scheduledTime,
            vehicleInfo,
            notes
        } = req.body;

        const service = await Service.findOne({ _id: serviceId, providerId: req.provider.id, isActive: true });
        if (!service) return res.status(404).json({ message: 'Service non trouvé ou inactif' });

        const booking = new Booking({
            clientName,
            clientPhone,
            clientEmail,
            providerId: req.provider.id,
            serviceId,
            scheduledDate: new Date(scheduledDate),
            scheduledTime,
            price: service.price,
            vehicleInfo,
            notes
        });

        await booking.save();
        await booking.populate('serviceId', 'name category');

        res.status(201).json({ message: 'Réservation créée avec succès', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const createPublicBooking = async (req, res) => {
    try {
        const {
            clientName,
            clientPhone,
            clientEmail,
            serviceId,
            scheduledDate,
            scheduledTime,
            vehicleInfo,
            notes
        } = req.body;

        // Vérifier que le service existe et est actif
        const service = await Service.findOne({
            _id: serviceId,
            isActive: true
        }).populate('providerId');

        if (!service) {
            return res.status(404).json({ message: 'Service non trouvé ou inactif' });
        }

        // Créer la réservation
        const booking = new Booking({
            clientName,
            clientPhone,
            clientEmail,
            providerId: service.providerId._id,
            serviceId,
            scheduledDate: new Date(scheduledDate),
            scheduledTime,
            price: service.price,
            vehicleInfo,
            notes
        });

        await booking.save();
        await booking.populate('serviceId', 'name category');

        res.status(201).json({
            message: 'Réservation créée avec succès',
            booking: {
                ...booking.toObject(),
                provider: {
                    companyName: service.providerId.companyName,
                    phone: service.providerId.phone,
                    email: service.providerId.email
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


module.exports = {
    getBookings,
    getBookingById,
    updateBookingStatus,
    createBooking,
    createPublicBooking
};


