const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const mongoose = require('mongoose');

// ✅ Fonction pour filtrer les réservations annulées
const filterCancelledBookings = (bookings) => {
    return bookings.filter(booking => 
        booking.status !== 'cancelled' && 
        booking.status !== 'annulée' &&
        booking.status !== 'canceled'
    );
};

const fetchAnalyticsOverview = async (providerId) => {
    try {
        // ✅ Récupérer les informations du provider pour les horaires
        const provider = await Provider.findById(providerId);
        if (!provider) {
            throw new Error('Provider not found');
        }

        // ✅ Récupérer toutes les réservations du provider avec correction des champs
        const allBookings = await Booking.find({ providerId: providerId })
            .populate('clientId', 'name email')
            .populate('serviceId', 'name price')
            .sort({ createdAt: -1 });

        // ✅ Filtrer les réservations annulées
        const bookings = filterCancelledBookings(allBookings);

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
        
        // ✅ Compter les clients uniques via clientId (sans les annulées)
        const uniqueClients = new Set(
            bookings
                .filter(b => b.clientId)
                .map(b => b.clientId.toString())
        ).size;

        // Calculs additionnels
        const avgPricePerBooking = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;
        
        // ✅ Réservations par statut (sans les annulées)
        const bookingsByStatus = bookings.reduce((acc, booking) => {
            const status = booking.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Évolution mensuelle (30 derniers jours) - sans les annulées
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentBookings = bookings.filter(b => 
            new Date(b.createdAt) >= thirtyDaysAgo
        );

        // ✅ Analyse des horaires de travail
        const workingHours = provider.workingHours || {};
        const workingDaysInfo = Object.entries(workingHours).map(([day, hours]) => ({
            day,
            isOpen: hours.isOpen || false,
            openTime: hours.open || null,
            closeTime: hours.close || null
        }));

        const openDays = workingDaysInfo.filter(day => day.isOpen).length;
        const closedDays = 7 - openDays;

        return {
            totalBookings,
            totalRevenue,
            uniqueClients,
            avgPricePerBooking,
            bookingsByStatus,
            monthlyGrowth: {
                bookings: recentBookings.length,
                revenue: recentBookings.reduce((sum, b) => sum + (b.price || 0), 0)
            },
            // ✅ Nouvelles données sur les horaires
            workingSchedule: {
                openDays,
                closedDays,
                workingDaysInfo
            }
        };
    } catch (error) {
        console.error('Erreur fetchAnalyticsOverview:', error);
        throw error;
    }
};

const fetchWeeklyPerformance = async (providerId) => {
    try {
        // ✅ Récupérer les informations du provider pour les horaires
        const provider = await Provider.findById(providerId);
        if (!provider) {
            throw new Error('Provider not found');
        }

        // Calculer la semaine courante (lundi à dimanche)
        const now = new Date();
        const startOfWeek = new Date(now);
        const dayOfWeek = now.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(now.getDate() - daysToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        // ✅ Récupérer les réservations de la semaine avec correction des champs
        const allBookings = await Booking.find({
            providerId: new mongoose.Types.ObjectId(providerId),
            scheduledDate: {
                $gte: startOfWeek.toISOString().split('T')[0],
                $lte: endOfWeek.toISOString().split('T')[0]
            }
        }).populate('serviceId', 'name price');

        // ✅ Filtrer les réservations annulées
        const bookings = filterCancelledBookings(allBookings);

        // Grouper par date de réservation
        const dailyStats = {};
        
        bookings.forEach(booking => {
            const scheduledDate = booking.scheduledDate;
            const bookingDate = new Date(scheduledDate);
            const dayOfWeek = bookingDate.getDay();
            // Convertir dimanche (0) à 6, lundi (1) à 0, etc.
            const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            
            if (!dailyStats[dayIndex]) {
                dailyStats[dayIndex] = {
                    bookings: 0,
                    revenue: 0,
                    prices: []
                };
            }
            
            dailyStats[dayIndex].bookings += 1;
            dailyStats[dayIndex].revenue += booking.price || 0;
            dailyStats[dayIndex].prices.push(booking.price || 0);
        });

        // Noms des jours et mapping vers les horaires du provider
        const daysNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const daysMapping = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        
        // ✅ Créer les données pour chaque jour avec horaires réels
        const weeklyData = Array(7).fill().map((_, dayIndex) => {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + dayIndex);
            
            const stats = dailyStats[dayIndex] || { bookings: 0, revenue: 0, prices: [] };
            const avgPrice = stats.prices.length > 0 
                ? Math.round(stats.prices.reduce((sum, price) => sum + price, 0) / stats.prices.length)
                : 0;

            // ✅ Récupérer les horaires réels du provider
            const dayName = daysMapping[dayIndex];
            const daySchedule = provider.workingHours?.[dayName] || {};
            const isWorkingDay = daySchedule.isOpen || false;

            return {
                day: daysNames[dayIndex],
                date: currentDate.toISOString().split('T')[0],
                bookings: stats.bookings,
                revenue: stats.revenue,
                avgPrice: avgPrice,
                isWorkingDay: isWorkingDay,
                workingHours: isWorkingDay ? {
                    open: daySchedule.open || '09:00',
                    close: daySchedule.close || '18:00'
                } : null,
                // ✅ Informations supplémentaires
                dayStatus: isWorkingDay ? 'open' : 'closed',
                efficiency: isWorkingDay ? (stats.bookings > 0 ? 'active' : 'inactive') : 'closed'
            };
        });

        return weeklyData;
    } catch (error) {
        console.error('Erreur fetchWeeklyPerformance:', error);
        throw error;
    }
};

// ✅ Fonction pour récupérer les réservations récentes avec correction (sans annulées)
const fetchRecentBookings = async (providerId, limit = 5) => {
    try {
        const allBookings = await Booking.find({ providerId: providerId })
            .populate('clientId', 'name email')
            .populate('serviceId', 'name price')
            .sort({ createdAt: -1 })
            .limit(limit * 2); // Récupérer plus pour compenser les annulées

        // ✅ Filtrer les réservations annulées puis limiter
        const bookings = filterCancelledBookings(allBookings).slice(0, limit);

        return bookings.map(booking => ({
            id: booking._id,
            bookingNumber: booking.bookingNumber,
            client: booking.clientName || booking.clientId?.name || 'Client inconnu',
            clientEmail: booking.clientEmail || booking.clientId?.email || '',
            service: booking.serviceId?.name || 'Service inconnu',
            price: booking.price || 0,
            scheduledDate: booking.scheduledDate,
            scheduledTime: booking.scheduledTime,
            status: booking.status || 'pending',
            createdAt: booking.createdAt,
            vehicleInfo: booking.vehicleInfo || {},
            paymentStatus: booking.paymentStatus || 'pending'
        }));
    } catch (error) {
        console.error('Erreur fetchRecentBookings:', error);
        throw error;
    }
};

// ✅ Nouvelle fonction pour analyser les horaires de travail
const fetchWorkingHoursAnalysis = async (providerId) => {
    try {
        const provider = await Provider.findById(providerId);
        if (!provider) {
            throw new Error('Provider not found');
        }

        const workingHours = provider.workingHours || {};
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const daysNamesInFrench = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        const schedule = daysOfWeek.map((day, index) => {
            const daySchedule = workingHours[day] || {};
            const isOpen = daySchedule.isOpen || false;
            
            return {
                day: day,
                dayName: daysNamesInFrench[index],
                dayShort: daysNamesInFrench[index].substring(0, 3),
                isOpen: isOpen,
                openTime: isOpen ? (daySchedule.open || '09:00') : null,
                closeTime: isOpen ? (daySchedule.close || '18:00') : null,
                status: isOpen ? 'open' : 'closed',
                // Calcul des heures de travail
                workingHours: isOpen ? calculateWorkingHours(daySchedule.open || '09:00', daySchedule.close || '18:00') : 0
            };
        });

        const openDays = schedule.filter(day => day.isOpen);
        const closedDays = schedule.filter(day => !day.isOpen);
        const totalWorkingHours = schedule.reduce((sum, day) => sum + day.workingHours, 0);

        return {
            schedule,
            summary: {
                openDays: openDays.length,
                closedDays: closedDays.length,
                totalWorkingHours: totalWorkingHours,
                averageWorkingHoursPerDay: openDays.length > 0 ? Math.round((totalWorkingHours / openDays.length) * 10) / 10 : 0
            },
            openDaysList: openDays.map(day => day.dayName),
            closedDaysList: closedDays.map(day => day.dayName)
        };
    } catch (error) {
        console.error('Erreur fetchWorkingHoursAnalysis:', error);
        throw error;
    }
};

// ✅ Fonction utilitaire pour calculer les heures de travail
const calculateWorkingHours = (openTime, closeTime) => {
    try {
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = closeTime.split(':').map(Number);
        
        const openMinutes = openHour * 60 + openMinute;
        const closeMinutes = closeHour * 60 + closeMinute;
        
        const diffMinutes = closeMinutes - openMinutes;
        return Math.round((diffMinutes / 60) * 10) / 10;
    } catch (error) {
        console.error('Erreur calcul heures de travail:', error);
        return 0;
    }
};

// ✅ Fonction pour récupérer toutes les données du dashboard
const fetchDashboardData = async (providerId) => {
    try {
        const [overview, weeklyPerformance, recentBookings, workingHoursAnalysis] = await Promise.all([
            fetchAnalyticsOverview(providerId),
            fetchWeeklyPerformance(providerId),
            fetchRecentBookings(providerId, 10),
            fetchWorkingHoursAnalysis(providerId)
        ]);

        return {
            overview,
            weeklyPerformance,
            recentBookings,
            workingHoursAnalysis,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Erreur fetchDashboardData:', error);
        throw error;
    }
};

module.exports = {
    fetchAnalyticsOverview,
    fetchWeeklyPerformance,
    fetchRecentBookings,
    fetchDashboardData,
    fetchWorkingHoursAnalysis
};