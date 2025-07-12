const {
    fetchAnalyticsOverview,
    fetchWeeklyPerformance,
    fetchMonthlyStats,
    fetchTopServices,
    fetchRecentBookings,
    fetchRealTimeStats
} = require('../services/analystics.services');

const getAnalyticsOverview = async (req, res) => {
    try {
        const providerId = req.provider.id;
        console.log('📊 Demande d\'analyse pour le provider:', providerId);
        
        const data = await fetchAnalyticsOverview(providerId);
        
        res.status(200).json({
            success: true,
            data,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur analytics overview :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des données',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getWeeklyPerformance = async (req, res) => {
    try {
        const providerId = req.provider.id;
        console.log('📈 Demande de performance hebdomadaire pour:', providerId);
        
        const data = await fetchWeeklyPerformance(providerId);
        
        // ✅ CORRECTION : Retourner les données avec plus de contexte
        res.status(200).json({
            success: true,
            data: data.weeklyData, // Les données par jour
            weekTotals: data.weekTotals, // Les totaux de la semaine
            period: data.period, // La période analysée
            metadata: data.metadata, // Métadonnées pour debug
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur weekly performance :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des performances',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ✅ Route de debug améliorée
const getDebugStats = async (req, res) => {
    try {
        const providerId = req.provider.id;
        console.log('🔍 Demande de statistiques debug pour:', providerId);
        
        const [overview, realTimeStats, weeklyData] = await Promise.all([
            fetchAnalyticsOverview(providerId),
            fetchRealTimeStats(providerId),
            fetchWeeklyPerformance(providerId)
        ]);
        
        // ✅ Calculer les différences pour identifier les problèmes
        const weeklyTotal = weeklyData.weekTotals?.totalBookings || 0;
        const weeklyRevenue = weeklyData.weekTotals?.totalRevenue || 0;
        
        const analysis = {
            dateCalculation: {
                today: new Date().toISOString().split('T')[0],
                weekStart: weeklyData.period?.start,
                weekEnd: weeklyData.period?.end
            },
            bookingCounts: {
                overview: overview.totalBookings,
                realTime: realTimeStats.total,
                weekly: weeklyTotal
            },
            revenue: {
                overview: overview.totalRevenue,
                realTime: realTimeStats.revenue,
                weekly: weeklyRevenue
            },
            statusBreakdown: realTimeStats.statusBreakdown,
            weeklyBreakdown: weeklyData.weeklyData?.map(day => ({
                day: day.day,
                date: day.date,
                bookings: day.bookings,
                revenue: day.revenue,
                isToday: day.isToday
            }))
        };
        
        res.status(200).json({
            success: true,
            debug: {
                overview,
                realTimeStats,
                weeklyData,
                analysis
            },
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur debug stats :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des statistiques de debug',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getMonthlyStats = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchMonthlyStats(providerId);
        
        res.status(200).json({
            success: true,
            data,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur monthly stats :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des statistiques mensuelles',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getTopServices = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchTopServices(providerId);
        
        res.status(200).json({
            success: true,
            data,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur top services :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des services populaires',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getRecentBookings = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const limit = parseInt(req.query.limit) || 5;
        const data = await fetchRecentBookings(providerId, limit);
        
        res.status(200).json({
            success: true,
            data,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur recent bookings :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des réservations récentes',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getDashboardData = async (req, res) => {
    try {
        const providerId = req.provider.id;
        
        // ✅ Récupérer toutes les données en parallèle
        const [overview, performance, topServices, recentBookings, realTimeStats] = await Promise.all([
            fetchAnalyticsOverview(providerId),
            fetchWeeklyPerformance(providerId),
            fetchTopServices(providerId),
            fetchRecentBookings(providerId, 5),
            fetchRealTimeStats(providerId)
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                overview,
                performance: performance.weeklyData,
                weekTotals: performance.weekTotals,
                topServices,
                recentBookings,
                realTimeStats,
                period: performance.period,
                metadata: performance.metadata
            },
            timestamp: new Date()
        });
    } catch (error) {
        console.error('❌ Erreur dashboard data :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des données du tableau de bord',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    getAnalyticsOverview,
    getWeeklyPerformance,
    getMonthlyStats,
    getTopServices,
    getRecentBookings,
    getDashboardData,
    getDebugStats
};