const {
    fetchAnalyticsOverview,
    fetchWeeklyPerformance
} = require('../services/analystics.services');

const getAnalyticsOverview = async (req, res) => {
    try {
        const providerId = req.provider.id;  // <-- ici

        const data = await fetchAnalyticsOverview(providerId);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur analytics overview :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getWeeklyPerformance = async (req, res) => {
    try {
        const providerId = req.provider.id;  // <-- ici

        const data = await fetchWeeklyPerformance(providerId);
        res.status(200).json(data);
    } catch (error) {
        console.error('Erreur weekly performance :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
module.exports = {
    getAnalyticsOverview,
    getWeeklyPerformance
};




// const Booking = require('../models/Booking');
// const mongoose = require('mongoose');

// // GET /api/analytics/overview
// const getAnalyticsOverview = async (req, res) => {
//     try {
//         const providerId = req.user.id;

//         const bookings = await Booking.find({ provider: providerId });

//         const totalBookings = bookings.length;

//         const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

//         const uniqueClients = new Set(bookings.map((b) => b.user.toString())).size;

//         res.status(200).json({
//             totalBookings,
//             totalRevenue,
//             uniqueClients
//         });
//     } catch (error) {
//         console.error('Erreur analytics overview :', error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// // GET /api/analytics/weekly-performance
// const getWeeklyPerformance = async (req, res) => {
//     try {
//         const providerId = req.user.id;

//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

//         const bookings = await Booking.aggregate([
//             {
//                 $match: {
//                     provider: new mongoose.Types.ObjectId(providerId),
//                     createdAt: { $gte: oneWeekAgo }
//                 }
//             },
//             {
//                 $group: {
//                     _id: { $dayOfWeek: "$createdAt" },
//                     count: { $sum: 1 },
//                     revenue: { $sum: "$price" }
//                 }
//             },
//             {
//                 $sort: { _id: 1 }
//             }
//         ]);

//         const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

//         const performance = Array(7).fill().map((_, i) => ({
//             day: days[i],
//             bookings: 0,
//             revenue: 0
//         }));

//         bookings.forEach((entry) => {
//             const index = (entry._id + 5) % 7; // aligner sur Lun-Dim
//             performance[index] = {
//                 day: days[index],
//                 bookings: entry.count,
//                 revenue: entry.revenue
//             };
//         });

//         res.status(200).json(performance);
//     } catch (error) {
//         console.error('Erreur weekly performance :', error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// module.exports = {
//     getAnalyticsOverview,
//     getWeeklyPerformance
// };
