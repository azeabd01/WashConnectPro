// src/api/publicServicesApi.js
const API_URL = 'http://localhost:3000/api/public';

// ✅ Tous les services actifs (optionnellement par catégorie)
export const fetchPublicServices = async (category = null) => {
    const url = category && category !== 'all'
        ? `${API_URL}/services?category=${category}`
        : `${API_URL}/services`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Erreur lors du chargement des services');
    const data = await res.json();
    return data.services; // ✅ on retourne services directement
};

// ✅ Services d’un prestataire spécifique
export const fetchProviderServices = async (providerId) => {
    const res = await fetch(`${API_URL}/services/${providerId}`);
    if (!res.ok) throw new Error('Erreur lors du chargement des services du prestataire');
    const data = await res.json();
    return data.services; // ✅ même logique
};


// ➕ Créer une réservation publique
export const createPublicBooking = async (bookingData) => {
    const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erreur lors de la création de la réservation');
    }
    return res.json();
};