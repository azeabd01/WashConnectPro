const Booking = require('../models/Booking');
const Service = require('../models/Service');
const moment = require('moment');

// GET /api/bookings
const getBookings = async (req, res) => {
    try {
        console.log('📋 Récupération des réservations pour provider:', req.provider.id);

        // ✅ Gérer les filtres depuis req.body OU req.query
        const filters = req.method === 'POST' ? req.body : req.query;
        const { status, date, limit = 50 } = filters || {};

        let query = { providerId: req.provider.id };

        if (status && status !== 'all') {
            query.status = status;
        }

        if (date) {
            // ✅ Chercher par date exacte (format: 2025-07-08)
            query.scheduledDate = date;
        }

        console.log('🔍 Query utilisée:', query);

        const bookings = await Booking.find(query)
            .populate('serviceId', 'name category')
            .populate('clientId', 'name email phone') // ✅ Populate client info
            .sort({ scheduledDate: -1, scheduledTime: -1 })
            .limit(parseInt(limit));

        console.log('📋 Réservations trouvées:', bookings.length);

        res.json({ bookings });
    } catch (err) {
        console.error('❌ Erreur récupération réservations:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

const createPublicBooking = async (req, res) => {
    try {
        console.log('➡️ Données reçues pour réservation publique:', req.body);

        const {
            clientId,
            clientName,
            clientPhone,
            clientEmail,
            serviceId,
            providerId,
            scheduledDate,
            scheduledTime, // ⚠️ Assurez-vous que ce champ est bien envoyé
            vehicleInfo,
            notes
        } = req.body;

        // ✅ Validation des champs requis
        if (!clientId) {
            return res.status(400).json({ message: 'clientId est requis' });
        }
        if (!scheduledTime) {
            return res.status(400).json({ message: 'scheduledTime est requis' });
        }

        // Vérifier que le service existe et est actif
        const service = await Service.findOne({
            _id: serviceId,
            isActive: true
        }).populate('providerId');

        if (!service) {
            return res.status(404).json({ message: 'Service non trouvé ou inactif' });
        }

        // ✅ Générer automatiquement le bookingNumber
        const count = await Booking.countDocuments();
        const bookingNumber = `LAV${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;

        // ✅ Créer la réservation avec tous les champs requis
        const booking = new Booking({
            bookingNumber, // ✅ Généré automatiquement
            clientId, // ✅ Fourni par le client
            clientName,
            clientPhone,
            clientEmail,
            providerId: service.providerId._id,
            serviceId,
            scheduledDate,
            scheduledTime, // ✅ Fourni par le client
            price: service.price,
            vehicleInfo,
            notes
        });

        console.log('📝 Réservation à sauvegarder:', booking);

        await booking.save();
        await booking.populate('serviceId', 'name category');

        res.status(201).json({
            message: 'Réservation créée avec succès',
            booking: {
                ...booking.toObject(),
                provider: {
                    businessName: service.providerId.businessName,
                    phone: service.providerId.phone,
                    email: service.providerId.email
                }
            }
        });
    } catch (err) {
        console.error('❌ Erreur création réservation:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
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
module.exports = {
    getBookings,
    getBookingById,
    updateBookingStatus,
    createBooking,
    createPublicBooking
};