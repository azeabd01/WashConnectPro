const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.fetchAnalyticsOverview = async (providerId) => {
    const bookings = await Booking.find({ provider: providerId });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
    const uniqueClients = new Set(bookings.map((b) => b.user.toString())).size;

    return {
        totalBookings,
        totalRevenue,
        uniqueClients
    };
};

exports.fetchWeeklyPerformance = async (providerId) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const bookings = await Booking.aggregate([
        {
            $match: {
                provider: new mongoose.Types.ObjectId(providerId),
                createdAt: { $gte: oneWeekAgo }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: "$createdAt" },
                count: { $sum: 1 },
                revenue: { $sum: "$price" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const performance = Array(7).fill().map((_, i) => ({
        day: days[i],
        bookings: 0,
        revenue: 0
    }));

    bookings.forEach((entry) => {
        const index = (entry._id + 5) % 7; // aligner sur Lun-Dim
        performance[index] = {
            day: days[index],
            bookings: entry.count,
            revenue: entry.revenue
        };
    });

    return performance;
};
