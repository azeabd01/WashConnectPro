// ✅ BookingsTab.jsx dynamique avec filtrage et statuts

import React, { useEffect, useState } from 'react';
import BookingsTable from '../../components/BookingsTable';
import { fetchBookings, updateBookingStatus } from '../../api/bookingsApi';

const BookingsTab = () => {
    const [bookings, setBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(false);

    // ✅ Charger les réservations avec filtre
    const loadBookings = async () => {
        try {
            setLoading(true);
            const data = await fetchBookings({ status: statusFilter });
            setBookings(data.bookings);
        } catch (err) {
            console.error('Erreur chargement réservations:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, [statusFilter]);

    // ✅ Changer le statut d'une réservation
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            loadBookings();
        } catch (err) {
            alert('Erreur mise à jour du statut');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Toutes les Réservations</h2>
                <select
                    className="border rounded px-3 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Tous</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminée</option>
                    <option value="cancelled">Annulée</option>
                </select>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <BookingsTable bookings={bookings} onStatusChange={handleStatusUpdate} />
            )}
        </div>
    );
};

export default BookingsTab;


// // pages/dashboard/BookingsTab.jsx
// import React from 'react';
// import BookingsTable from '../../components/BookingsTable';

// const BookingsTab = () => {
//     const bookings = [
//         { id: 1, client: 'Ahmed R.', service: 'Pack complet', time: '09:00', status: 'Confirmé', price: 120 },
//         { id: 2, client: 'Yassine B.', service: 'Lavage extérieur', time: '11:30', status: 'En attente', price: 50 },
//         { id: 3, client: 'Sanae D.', service: 'Intérieur', time: '14:00', status: 'En cours', price: 70 }
//     ];

//     return (
//         <>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Toutes les Réservations</h2>
//             <BookingsTable bookings={bookings} />
//         </>
//     );
// };

// export default BookingsTab;
