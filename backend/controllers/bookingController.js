const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
    try {
        const { clientName, clientPhone, clientEmail, providerId, serviceId, scheduledDate, scheduledTime, vehicleInfo, notes } = req.body;
        const service = await Service.findById(serviceId);
        if (!service) return res.status(404).json({ message: 'Service non trouvé' });

        const booking = new Booking({
            clientName, clientPhone, clientEmail, providerId, serviceId,
            scheduledDate, scheduledTime, vehicleInfo,
            price: service.price, notes
        });

        await booking.save();
        await booking.populate('serviceId', 'name price duration');
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const { status, date } = req.query;
        const filter = { providerId: req.user.id };
        if (status) filter.status = status;
        if (date) {
            const d = new Date(date);
            const nextDay = new Date(d);
            nextDay.setDate(d.getDate() + 1);
            filter.scheduledDate = { $gte: d, $lt: nextDay };
        }
        const bookings = await Booking.find(filter)
            .populate('serviceId', 'name price duration')
            .sort({ scheduledDate: -1 });

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { status, cancellationReason } = req.body;
        const update = { status };
        if (status === 'completed') update.completedAt = new Date();
        if (status === 'cancelled') {
            update.cancelledAt = new Date();
            update.cancellationReason = cancellationReason;
        }

        const updated = await Booking.findOneAndUpdate(
            { _id: req.params.id, providerId: req.user.id },
            update,
            { new: true }
        ).populate('serviceId', 'name price duration');

        if (!updated) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getBookingStats = async (req, res) => {
    try {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
        const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

        const todayBookings = await Booking.countDocuments({
            providerId: req.user.id, scheduledDate: { $gte: today, $lt: tomorrow }
        });

        const monthlyBookings = await Booking.countDocuments({
            providerId: req.user.id, scheduledDate: { $gte: startMonth, $lt: endMonth }
        });

        const todayRevenue = await Booking.aggregate([
            { $match: { providerId: req.user.id, scheduledDate: { $gte: today, $lt: tomorrow }, status: { $in: ['completed', 'confirmed'] } } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        const monthlyRevenue = await Booking.aggregate([
            { $match: { providerId: req.user.id, scheduledDate: { $gte: startMonth, $lt: endMonth }, status: { $in: ['completed', 'confirmed'] } } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        const completed = await Booking.countDocuments({
            providerId: req.user.id, status: 'completed',
            scheduledDate: { $gte: startMonth, $lt: endMonth }
        });

        const completionRate = monthlyBookings > 0 ? Math.round((completed / monthlyBookings) * 100) : 0;

        res.json({
            todayBookings,
            monthlyBookings,
            todayRevenue: todayRevenue[0]?.total || 0,
            monthlyRevenue: monthlyRevenue[0]?.total || 0,
            completionRate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


