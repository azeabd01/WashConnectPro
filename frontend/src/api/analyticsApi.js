const API_URL = 'http://localhost:3000/api/analytics';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// ✅ Vue d'ensemble des stats
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
        
        return response.data || response;
    } catch (error) {
        console.error('❌ Erreur fetchOverview:', error);
        throw error;
    }
};

// ✅ Performance hebdomadaire
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
        
        if (!data.success) {
            console.warn('API returned unsuccessful response:', data);
            return [];
        }

        return data.data || [];
    } catch (error) {
        console.error('❌ Error fetching weekly performance:', error);
        return [];
    }
};

// ✅ Réservations récentes
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

// ✅ Données complètes du dashboard
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

// ✅ Nouvelle fonction pour l'analyse des horaires de travail
export const fetchWorkingHoursAnalysis = async () => {
    try {
        const res = await fetch(`${API_URL}/working-hours`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement de l\'analyse des horaires');
        }
        
        const response = await res.json();
        console.log('⏰ Working Hours Analysis API Response:', response);
        
        return response.data || {};
    } catch (error) {
        console.error('❌ Erreur fetchWorkingHoursAnalysis:', error);
        throw error;
    }
};

// ✅ Statistiques en temps réel
export const fetchRealTimeStats = async () => {
    try {
        const res = await fetch(`${API_URL}/real-time`, {
            headers: getAuthHeaders(),
        });
        
        if (!res.ok) {
            throw new Error('Erreur lors du chargement des stats temps réel');
        }
        
        const response = await res.json();
        console.log('⚡ Real Time Stats API Response:', response);
        
        return response.data || {};
    } catch (error) {
        console.error('❌ Erreur fetchRealTimeStats:', error);
        throw error;
    }
};