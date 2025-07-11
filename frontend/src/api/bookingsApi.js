// ✅ CORRECTION de src/api/bookingsApi.js

const API_URL = 'http://localhost:3000/api/bookings';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// ✅ Récupérer toutes les réservations avec filtres
export const fetchBookings = async (filters = {}) => {
    try {
        // ✅ Utiliser POST pour les filtres (comme dans votre backend)
        const res = await fetch(`${API_URL}/filter`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(filters),
        });

        if (!res.ok) {
            throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('📋 Réservations récupérées:', data);
        return data;
    } catch (error) {
        console.error('❌ Erreur récupération réservations:', error);
        throw error;
    }
};

// ✅ Créer une réservation (provider)
export const createBooking = async (data) => {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error('❌ Erreur création réservation:', error);
        throw error;
    }
};

// ✅ Créer une réservation publique (client)
export const createPublicBooking = async (bookingData) => {
    try {
        console.log('📝 Création réservation publique:', bookingData);

        const res = await fetch('http://localhost:3000/api/public/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Erreur ${res.status}`);
        }

        const data = await res.json();
        console.log('✅ Réservation créée:', data);
        return data;
    } catch (error) {
        console.error('❌ Erreur création réservation publique:', error);
        throw error;
    }
};

// ✅ Modifier le statut d'une réservation
export const updateBookingStatus = async (id, statusData) => {
    try {
        const res = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(statusData),
        });

        if (!res.ok) {
            throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error('❌ Erreur mise à jour statut:', error);
        throw error;
    }
};

// ✅ Récupérer une réservation par ID
export const getBookingById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            headers: getAuthHeaders(),
        });

        if (!res.ok) {
            throw new Error(`Erreur ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error('❌ Erreur récupération réservation:', error);
        throw error;
    }
};