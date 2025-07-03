// src/api/bookings.js
const API_URL = 'http://localhost:3000/api/bookings';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// 📦 Récupérer toutes les réservations
export const fetchBookings = async () => {
    const res = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des réservations');
    return res.json();
};

// ➕ Créer une réservation
export const createBooking = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erreur lors de la création de la réservation');
    return res.json();
};

// 🔁 Modifier le statut
export const updateBookingStatus = async (id, statusPayload) => {
    const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(statusPayload),
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du statut');
    return res.json();
};

// 🔍 Détail d'une réservation
export const getBookingById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Réservation non trouvée');
    return res.json();
};




// const API_URL = 'http://localhost:3000/api/bookings';

// const getHeaders = () => ({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
// });

// export const fetchBookings = async () => {
//     const res = await fetch(API_URL, { method: 'GET', headers: getHeaders() });
//     if (!res.ok) throw new Error('Erreur chargement des réservations');
//     return res.json();
// };

// export const updateBookingStatus = async (id, status) => {
//     const res = await fetch(`${API_URL}/${id}/status`, {
//         method: 'PATCH',
//         headers: getHeaders(),
//         body: JSON.stringify({ status })
//     });
//     if (!res.ok) throw new Error('Erreur mise à jour statut');
//     return res.json();
// };



