const Booking = require('../../models/Booking');

// Mes réservations (en cours, sauf completed & cancelled)
exports.getMyActiveBookings = async (req, res) => {
    try {
        const clientEmail = req.client.email;
        const bookings = await Booking.find({
            clientEmail,
            status: { $in: ['pending', 'confirmed', 'in-progress'] }
        })
            .populate('serviceId', 'name price duration')
            .populate('providerId', 'name businessName');

        res.json({ bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Historique du client
exports.getMyBookingHistory = async (req, res) => {
    try {
        const clientEmail = req.client.email;
        const bookings = await Booking.find({
            clientEmail,
            status: 'completed'
        })
            .populate('serviceId', 'name price duration')
            .populate('providerId', 'name businessName');

        res.json({ bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
