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


// const Booking = require('../models/Booking');
// const Service = require('../models/Service');

// exports.createBooking = async (req, res) => {
//     try {
//         const { clientName, clientPhone, clientEmail, providerId, serviceId, scheduledDate, scheduledTime, vehicleInfo, notes } = req.body;
//         const service = await Service.findById(serviceId);
//         if (!service) return res.status(404).json({ message: 'Service non trouvé' });

//         const booking = new Booking({
//             clientName, clientPhone, clientEmail, providerId, serviceId,
//             scheduledDate, scheduledTime, vehicleInfo,
//             price: service.price, notes
//         });

//         await booking.save();
//         await booking.populate('serviceId', 'name price duration');
//         res.status(201).json(booking);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.getBookings = async (req, res) => {
//     try {
//         const { status, date } = req.query;
//         const filter = { providerId: req.user.id };
//         if (status) filter.status = status;
//         if (date) {
//             const d = new Date(date);
//             const nextDay = new Date(d);
//             nextDay.setDate(d.getDate() + 1);
//             filter.scheduledDate = { $gte: d, $lt: nextDay };
//         }
//         const bookings = await Booking.find(filter)
//             .populate('serviceId', 'name price duration')
//             .sort({ scheduledDate: -1 });

//         res.json(bookings);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.updateBookingStatus = async (req, res) => {
//     try {
//         const { status, cancellationReason } = req.body;
//         const update = { status };
//         if (status === 'completed') update.completedAt = new Date();
//         if (status === 'cancelled') {
//             update.cancelledAt = new Date();
//             update.cancellationReason = cancellationReason;
//         }

//         const updated = await Booking.findOneAndUpdate(
//             { _id: req.params.id, providerId: req.user.id },
//             update,
//             { new: true }
//         ).populate('serviceId', 'name price duration');

//         if (!updated) return res.status(404).json({ message: 'Réservation non trouvée' });
//         res.json(updated);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.getBookingStats = async (req, res) => {
//     try {
//         const today = new Date(); today.setHours(0, 0, 0, 0);
//         const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
//         const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//         const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

//         const todayBookings = await Booking.countDocuments({
//             providerId: req.user.id, scheduledDate: { $gte: today, $lt: tomorrow }
//         });

//         const monthlyBookings = await Booking.countDocuments({
//             providerId: req.user.id, scheduledDate: { $gte: startMonth, $lt: endMonth }
//         });

//         const todayRevenue = await Booking.aggregate([
//             { $match: { providerId: req.user.id, scheduledDate: { $gte: today, $lt: tomorrow }, status: { $in: ['completed', 'confirmed'] } } },
//             { $group: { _id: null, total: { $sum: '$price' } } }
//         ]);

//         const monthlyRevenue = await Booking.aggregate([
//             { $match: { providerId: req.user.id, scheduledDate: { $gte: startMonth, $lt: endMonth }, status: { $in: ['completed', 'confirmed'] } } },
//             { $group: { _id: null, total: { $sum: '$price' } } }
//         ]);

//         const completed = await Booking.countDocuments({
//             providerId: req.user.id, status: 'completed',
//             scheduledDate: { $gte: startMonth, $lt: endMonth }
//         });

//         const completionRate = monthlyBookings > 0 ? Math.round((completed / monthlyBookings) * 100) : 0;

//         res.json({
//             todayBookings,
//             monthlyBookings,
//             todayRevenue: todayRevenue[0]?.total || 0,
//             monthlyRevenue: monthlyRevenue[0]?.total || 0,
//             completionRate
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };


