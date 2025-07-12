// src/api/analyticsApi.js
const API_URL = 'http://localhost:3000/api/analytics';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// 📊 Vue d'ensemble des stats
export const fetchOverview = async () => {
    try {
        const res = await fetch(`${API_URL}/overview`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des statistiques');
        }
        
        const response = await res.json();
        console.log('📊 Overview API Response:', response);
        
        // ✅ Retourner les données selon la structure de votre backend
        return response.data || response;
    } catch (error) {
        console.error('❌ Erreur fetchOverview:', error);
        throw error;
    }
};

export const fetchWeeklyPerformance = async () => {
    try {
        const response = await fetch(`${API_URL}/weekly-performance`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('📈 Weekly Performance API Response:', data);
        
        // ✅ Validation et retour des données selon votre backend
        if (!data.success) {
            console.warn('API returned unsuccessful response:', data);
            return [];
        }

        // Retourner les données hebdomadaires
        return data.data || [];
    } catch (error) {
        console.error('❌ Error fetching weekly performance:', error);
        return [];
    }
};

// ✅ Nouvelles fonctions pour récupérer les données complètes
export const fetchRecentBookings = async (limit = 5) => {
    try {
        const res = await fetch(`${API_URL}/recent-bookings?limit=${limit}`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des réservations récentes');
        }
        
        const response = await res.json();
        console.log('📋 Recent Bookings API Response:', response);
        
        return response.data || [];
    } catch (error) {
        console.error('❌ Erreur fetchRecentBookings:', error);
        return [];
    }
};

// ✅ Récupérer toutes les données du dashboard en une fois
export const fetchDashboardData = async () => {
    try {
        const res = await fetch(`${API_URL}/dashboard`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des données du dashboard');
        }
        
        const response = await res.json();
        console.log('🎯 Dashboard API Response:', response);
        
        return response.data || {};
    } catch (error) {
        console.error('❌ Erreur fetchDashboardData:', error);
        throw error;
    }
};

// ✅ Fonction pour récupérer les stats en temps réel
export const fetchRealTimeStats = async () => {
    try {
        const res = await fetch(`${API_URL}/overview`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des stats temps réel');
        }
        
        const response = await res.json();
        return response.data || {};
    } catch (error) {
        console.error('❌ Erreur fetchRealTimeStats:', error);
        throw error;
    }
};