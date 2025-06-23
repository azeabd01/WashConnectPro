// pages/dashboard/BookingsTab.jsx
import React from 'react';
import BookingsTable from '../../components/BookingsTable';

const BookingsTab = () => {
    const bookings = [
        { id: 1, client: 'Ahmed R.', service: 'Pack complet', time: '09:00', status: 'Confirmé', price: 120 },
        { id: 2, client: 'Yassine B.', service: 'Lavage extérieur', time: '11:30', status: 'En attente', price: 50 },
        { id: 3, client: 'Sanae D.', service: 'Intérieur', time: '14:00', status: 'En cours', price: 70 }
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Toutes les Réservations</h2>
            <BookingsTable bookings={bookings} />
        </>
    );
};

export default BookingsTab;
