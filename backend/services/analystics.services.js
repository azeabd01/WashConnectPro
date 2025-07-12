// ✅ VERSION CORRIGÉE DU SERVICE D'ANALYSE - FIXES MAJEURS
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const fetchAnalyticsOverview = async (providerId) => {
    const objectId = new mongoose.Types.ObjectId(providerId);

    console.log('🔍 Analyse des statistiques pour le provider:', providerId);

    const [totalBookings, completedBookings, cancelledBookings, revenueAgg, uniqueClients] = await Promise.all([
        Booking.countDocuments({ providerId: objectId }),
        Booking.countDocuments({ providerId: objectId, status: 'completed' }),
        Booking.countDocuments({ providerId: objectId, status: 'cancelled' }),
        Booking.aggregate([
            { $match: { providerId: objectId, status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]),
        Booking.distinct('clientId', { providerId: objectId })
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;
    const completionRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;

    console.log('📊 Résultats de l\'analyse globale:', {
        totalBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
        uniqueClients: uniqueClients.length
    });

    return {
        totalBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
        uniqueClients: uniqueClients.length,
        completionRate,
        previousBookings: 0,
        previousRevenue: 0,
        previousClients: 0
    };
};

const fetchWeeklyPerformance = async (providerId) => {
    try {
        const Provider = require('../models/Provider');
        const provider = await Provider.findById(providerId);

        if (!provider) {
            throw new Error('Provider not found');
        }

        // ✅ CORRECTION MAJEURE : Calculer correctement le début de semaine
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Calculer le lundi de la semaine courante
        const currentDay = today.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Dimanche = 0, donc on doit aller 6 jours en arrière
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - daysFromMonday);
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        console.log('📅 Période d\'analyse de la semaine courante:', {
            de: startOfWeek.toISOString().split('T')[0],
            à: endOfWeek.toISOString().split('T')[0],
            aujourdhui: today.toISOString().split('T')[0]
        });

        // ✅ Récupérer toutes les réservations de la semaine courante
        const weekBookings = await Booking.find({
            providerId: new mongoose.Types.ObjectId(providerId),
            $expr: {
                $and: [
                    { $gte: [{ $dateFromString: { dateString: "$scheduledDate" } }, startOfWeek] },
                    { $lte: [{ $dateFromString: { dateString: "$scheduledDate" } }, endOfWeek] }
                ]
            }
        }).sort({ scheduledDate: 1 });

        console.log('📋 Réservations trouvées pour la semaine:', weekBookings.length);
        
        // ✅ Debug : afficher toutes les réservations
        weekBookings.forEach(booking => {
            console.log(`📅 ${booking.scheduledDate} - ${booking.scheduledTime} - ${booking.status} - ${booking.price} MAD - ${booking.clientName}`);
        });

        // ✅ Grouper par date pour les statistiques
        const bookingsByDate = weekBookings.reduce((acc, booking) => {
            const date = booking.scheduledDate;
            if (!acc[date]) {
                acc[date] = {
                    date: date,
                    bookings: [],
                    totalBookings: 0,
                    completedBookings: 0,
                    cancelledBookings: 0,
                    pendingBookings: 0,
                    revenue: 0
                };
            }
            
            acc[date].bookings.push(booking);
            acc[date].totalBookings += 1;
            
            if (booking.status === 'completed') {
                acc[date].completedBookings += 1;
                acc[date].revenue += booking.price || 0;
            } else if (booking.status === 'cancelled') {
                acc[date].cancelledBookings += 1;
            } else if (booking.status === 'pending') {
                acc[date].pendingBookings += 1;
                // ✅ CORRECTION : Compter aussi les réservations pendantes dans le revenue potentiel
                acc[date].revenue += booking.price || 0;
            }
            
            return acc;
        }, {});

        console.log('📊 Données groupées par date:', Object.keys(bookingsByDate));

        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const performance = [];

        // ✅ Générer les données pour chaque jour de la semaine
        for (let i = 0; i < 7; i++) {
            const targetDate = new Date(startOfWeek);
            targetDate.setDate(startOfWeek.getDate() + i);
            const dateStr = targetDate.toISOString().split('T')[0];

            const dayData = bookingsByDate[dateStr];
            const dayKey = dayKeys[i];
            const isWorkingDay = provider.workingHours?.[dayKey]?.isOpen ?? true;
            const workingHours = provider.workingHours?.[dayKey] || {};

            const dayPerformance = {
                day: days[i],
                date: dateStr,
                bookings: dayData ? dayData.totalBookings : 0,
                revenue: dayData ? dayData.revenue : 0,
                avgPrice: dayData && dayData.completedBookings > 0 
                    ? Math.round(dayData.revenue / dayData.completedBookings) 
                    : 0,
                completedBookings: dayData ? dayData.completedBookings : 0,
                cancelledBookings: dayData ? dayData.cancelledBookings : 0,
                pendingBookings: dayData ? dayData.pendingBookings : 0,
                isWorkingDay: isWorkingDay,
                workingHours: isWorkingDay ? {
                    open: workingHours.open,
                    close: workingHours.close
                } : null,
                isInRange: true,
                isToday: dateStr === today.toISOString().split('T')[0],
                dayOfWeek: i
            };

            performance.push(dayPerformance);
            
            console.log(`📅 ${days[i]} (${dateStr}):`, {
                bookings: dayPerformance.bookings,
                completed: dayPerformance.completedBookings,
                cancelled: dayPerformance.cancelledBookings,
                pending: dayPerformance.pendingBookings,
                revenue: dayPerformance.revenue,
                isToday: dayPerformance.isToday
            });
        }

        // ✅ Calculer les totaux de la semaine
        const weekTotals = performance.reduce((acc, day) => {
            acc.totalBookings += day.bookings;
            acc.completedBookings += day.completedBookings;
            acc.cancelledBookings += day.cancelledBookings;
            acc.pendingBookings += day.pendingBookings;
            acc.totalRevenue += day.revenue;
            return acc;
        }, {
            totalBookings: 0,
            completedBookings: 0,
            cancelledBookings: 0,
            pendingBookings: 0,
            totalRevenue: 0
        });

        console.log('📈 Totaux de la semaine:', weekTotals);

        return {
            weeklyData: performance,
            weekTotals: weekTotals,
            period: {
                start: startOfWeek.toISOString().split('T')[0],
                end: endOfWeek.toISOString().split('T')[0],
                current: today.toISOString().split('T')[0]
            },
            metadata: {
                totalBookingsInPeriod: weekBookings.length,
                dateRange: `${startOfWeek.toLocaleDateString('fr-FR')} - ${endOfWeek.toLocaleDateString('fr-FR')}`
            }
        };

    } catch (error) {
        console.error('❌ Erreur dans fetchWeeklyPerformance:', error);
        throw error;
    }
};

// ✅ Fonction pour récupérer les statistiques réelles avec debug amélioré
const fetchRealTimeStats = async (providerId) => {
    try {
        console.log('🔄 Récupération des statistiques en temps réel...');
        
        const bookings = await Booking.find({
            providerId: new mongoose.Types.ObjectId(providerId)
        }).sort({ scheduledDate: -1 });

        console.log(`📊 Total des réservations trouvées: ${bookings.length}`);

        // ✅ Calculer les statistiques réelles avec plus de détails
        const stats = bookings.reduce((acc, booking) => {
            acc.total += 1;
            
            switch (booking.status) {
                case 'completed':
                    acc.completed += 1;
                    acc.revenue += booking.price || 0;
                    break;
                case 'cancelled':
                    acc.cancelled += 1;
                    break;
                case 'pending':
                    acc.pending += 1;
                    acc.potentialRevenue += booking.price || 0;
                    break;
                default:
                    acc.other += 1;
            }
            
            return acc;
        }, {
            total: 0,
            completed: 0,
            cancelled: 0,
            pending: 0,
            other: 0,
            revenue: 0,
            potentialRevenue: 0
        });

        console.log('📈 Statistiques réelles calculées:', stats);

        // ✅ Grouper par statut pour debug
        const statusBreakdown = bookings.reduce((acc, booking) => {
            acc[booking.status] = (acc[booking.status] || 0) + 1;
            return acc;
        }, {});

        console.log('📊 Répartition par statut:', statusBreakdown);

        return {
            ...stats,
            statusBreakdown,
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error('❌ Erreur dans fetchRealTimeStats:', error);
        throw error;
    }
};

const fetchMonthlyStats = async (providerId) => {
    try {
        // ✅ Analyser les 3 derniers mois
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        console.log('📅 Analyse mensuelle de:', {
            de: threeMonthsAgo.toISOString().split('T')[0],
            à: today.toISOString().split('T')[0]
        });

        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    providerId: new mongoose.Types.ObjectId(providerId),
                    scheduledDate: { 
                        $gte: threeMonthsAgo.toISOString().split('T')[0], 
                        $lte: today.toISOString().split('T')[0] 
                    }
                }
            },
            {
                $addFields: {
                    scheduledDateObj: { $dateFromString: { dateString: "$scheduledDate" } }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$scheduledDateObj" },
                    count: { $sum: 1 },
                    revenue: { 
                        $sum: { 
                            $cond: [
                                { $eq: ["$status", "completed"] }, 
                                "$price", 
                                0
                            ]
                        }
                    },
                    completedBookings: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        console.log('📊 Statistiques mensuelles:', monthlyBookings.length, 'jours avec activité');

        return monthlyBookings;
    } catch (error) {
        console.error('❌ Erreur dans fetchMonthlyStats:', error);
        throw error;
    }
};

const fetchTopServices = async (providerId) => {
    try {
        const topServices = await Booking.aggregate([
            {
                $match: {
                    providerId: new mongoose.Types.ObjectId(providerId)
                }
            },
            {
                $group: {
                    _id: "$serviceId",
                    count: { $sum: 1 },
                    revenue: { 
                        $sum: { 
                            $cond: [
                                { $eq: ["$status", "completed"] }, 
                                "$price", 
                                0
                            ]
                        }
                    },
                    completedBookings: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                        }
                    }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "services",
                    localField: "_id",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            {
                $addFields: {
                    serviceName: { $arrayElemAt: ["$serviceDetails.name", 0] },
                    servicePrice: { $arrayElemAt: ["$serviceDetails.price", 0] }
                }
            }
        ]);

        console.log('🏆 Top services:', topServices.length);

        return topServices;
    } catch (error) {
        console.error('❌ Erreur dans fetchTopServices:', error);
        throw error;
    }
};

const fetchRecentBookings = async (providerId, limit = 5) => {
    try {
        const recentBookings = await Booking.find({ providerId })
            .populate('clientId', 'name email')
            .populate('serviceId', 'name')
            .sort({ createdAt: -1 })
            .limit(limit);

        console.log('📋 Réservations récentes récupérées:', recentBookings.length);

        return recentBookings.map(booking => ({
            id: booking._id,
            client: booking.clientId?.name || booking.clientName || 'Inconnu',
            service: booking.serviceId?.name || 'Service inconnu',
            scheduledDate: booking.scheduledDate,
            scheduledTime: booking.scheduledTime,
            createdAt: booking.createdAt,
            status: booking.status,
            price: booking.price
        }));
    } catch (error) {
        console.error('❌ Erreur dans fetchRecentBookings:', error);
        throw error;
    }
};

module.exports = {
    fetchAnalyticsOverview,
    fetchWeeklyPerformance,
    fetchMonthlyStats,
    fetchTopServices,
    fetchRecentBookings,
    fetchRealTimeStats
};