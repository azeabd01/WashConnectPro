const {
    fetchAnalyticsOverview,
    fetchWeeklyPerformance,
    fetchRecentBookings,
    fetchDashboardData,
    fetchWorkingHoursAnalysis
} = require('../services/analystics.services');

const getAnalyticsOverview = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchAnalyticsOverview(providerId);
        
        res.status(200).json({
            success: true,
            data: data,
            message: 'Statistiques récupérées avec succès'
        });
    } catch (error) {
        console.error('Erreur analytics overview :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement des statistiques' 
        });
    }
};

const getWeeklyPerformance = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchWeeklyPerformance(providerId);
        
        res.status(200).json({
            success: true,
            data: data,
            message: 'Performance hebdomadaire récupérée avec succès'
        });
    } catch (error) {
        console.error('Erreur weekly performance :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement de la performance hebdomadaire' 
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
            data: data,
            message: 'Réservations récentes récupérées avec succès'
        });
    } catch (error) {
        console.error('Erreur recent bookings :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement des réservations récentes' 
        });
    }
};

const getDashboardData = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchDashboardData(providerId);
        
        res.status(200).json({
            success: true,
            data: data,
            message: 'Données du dashboard récupérées avec succès'
        });
    } catch (error) {
        console.error('Erreur dashboard data :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement des données du dashboard' 
        });
    }
};

// ✅ Nouveau contrôleur pour les horaires de travail
const getWorkingHoursAnalysis = async (req, res) => {
    try {
        const providerId = req.provider.id;
        const data = await fetchWorkingHoursAnalysis(providerId);
        
        res.status(200).json({
            success: true,
            data: data,
            message: 'Analyse des horaires de travail récupérée avec succès'
        });
    } catch (error) {
        console.error('Erreur working hours analysis :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement de l\'analyse des horaires' 
        });
    }
};

// ✅ Contrôleur pour les statistiques en temps réel (sans réservations annulées)
const getRealTimeStats = async (req, res) => {
    try {
        const providerId = req.provider.id;
        
        // Récupérer les statistiques de base
        const overview = await fetchAnalyticsOverview(providerId);
        
        // Ajouter des données temps réel
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // Réservations d'aujourd'hui
        const Booking = require('../models/Booking');
        const allTodayBookings = await Booking.find({
            providerId: providerId,
            scheduledDate: today
        }).populate('serviceId', 'name');

        // ✅ Filtrer les réservations annulées
        const todayBookings = allTodayBookings.filter(booking => 
            booking.status !== 'cancelled' && 
            booking.status !== 'annulée' &&
            booking.status !== 'canceled'
        );

        const todayStats = {
            bookings: todayBookings.length,
            revenue: todayBookings.reduce((sum, b) => sum + (b.price || 0), 0),
            pending: todayBookings.filter(b => b.status === 'pending').length,
            confirmed: todayBookings.filter(b => b.status === 'confirmed').length,
            inProgress: todayBookings.filter(b => b.status === 'in-progress').length,
            completed: todayBookings.filter(b => b.status === 'completed').length,
            // ✅ Ajouter les statistiques des annulées pour info (optionnel)
            cancelled: allTodayBookings.filter(b => 
                b.status === 'cancelled' || 
                b.status === 'annulée' || 
                b.status === 'canceled'
            ).length
        };

        const data = {
            ...overview,
            today: todayStats,
            lastUpdated: now.toISOString()
        };
        
        res.status(200).json({
            success: true,
            data: data,
            message: 'Statistiques temps réel récupérées avec succès'
        });
    } catch (error) {
        console.error('Erreur real time stats :', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors du chargement des statistiques temps réel' 
        });
    }
};

module.exports = {
    getAnalyticsOverview,
    getWeeklyPerformance,
    getRecentBookings,
    getDashboardData,
    getWorkingHoursAnalysis,
    getRealTimeStats
};