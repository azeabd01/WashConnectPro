// ✅ CORRECTION de pages/dashboard/BookingsTab.jsx

import React, { useEffect, useState } from 'react';
import { Calendar, Filter, RefreshCw } from 'lucide-react';
import BookingsTable from '../../components/BookingsTable';
import { fetchBookings, updateBookingStatus } from '../../api/bookingsApi';

const BookingsTab = () => {
    const [bookings, setBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [loading, setLoading] = useState(false);

    // ✅ Charger les réservations avec filtres
    const loadBookings = async () => {
        try {
            setLoading(true);
            const filters = {};

            if (statusFilter !== 'all') {
                filters.status = statusFilter;
            }

            if (dateFilter) {
                filters.date = dateFilter;
            }

            console.log('🔍 Filtres appliqués:', filters);

            const data = await fetchBookings(filters);
            setBookings(data.bookings || []);
        } catch (err) {
            console.error('❌ Erreur chargement réservations:', err);
            // Vous pouvez ajouter une notification toast ici
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, [statusFilter, dateFilter]);

    // ✅ Changer le statut d'une réservation
    const handleStatusUpdate = async (bookingId, statusData) => {
        try {
            await updateBookingStatus(bookingId, statusData);
            loadBookings(); // Recharger les données
        } catch (err) {
            console.error('❌ Erreur mise à jour statut:', err);
            alert('Erreur lors de la mise à jour du statut');
        }
    };

    return (
        <div className="p-6">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Réservations</h2>
                    <p className="text-gray-600">Gérez toutes vos réservations</p>
                </div>
                <button
                    onClick={loadBookings}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <RefreshCw size={16} />
                    Actualiser
                </button>
            </div>

            {/* Filtres */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Filtres:</span>
                    </div>

                    <select
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmées</option>
                        <option value="in-progress">En cours</option>
                        <option value="completed">Terminées</option>
                        <option value="cancelled">Annulées</option>
                    </select>

                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>

                    {(statusFilter !== 'all' || dateFilter) && (
                        <button
                            onClick={() => {
                                setStatusFilter('all');
                                setDateFilter('');
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>
            </div>

            {/* Tableau des réservations */}
            <BookingsTable
                bookings={bookings}
                onStatusChange={handleStatusUpdate}
                loading={loading}
            />
        </div>
    );
};

export default BookingsTab;