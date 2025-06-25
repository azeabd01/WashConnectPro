const API_URL = 'http://localhost:3000/api/bookings';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const fetchBookings = async () => {
    const res = await fetch(API_URL, { method: 'GET', headers: getHeaders() });
    if (!res.ok) throw new Error('Erreur chargement des réservations');
    return res.json();
};

export const updateBookingStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Erreur mise à jour statut');
    return res.json();
};



// const API_URL = 'http://localhost:3000/api/bookings';

// const token = localStorage.getItem('token');
// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
// };

// export const fetchBookings = async () => {
//     const res = await fetch(API_URL, { method: 'POST', headers });
//     if (!res.ok) throw new Error('Erreur chargement des réservations');
//     return res.json();
// };

// export const updateBookingStatus = async (id, status) => {
//     const res = await fetch(`${API_URL}/${id}/status`, {
//         method: 'PATCH',
//         headers,
//         body: JSON.stringify({ status })
//     });
//     if (!res.ok) throw new Error('Erreur mise à jour statut');
//     return res.json();
// };
