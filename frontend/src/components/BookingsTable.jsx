// ✅ CORRECTION de components/BookingsTable.jsx

import React from 'react';
import { Users, Calendar, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';

const BookingsTable = ({ bookings, onStatusChange, loading }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement des réservations...</p>
            </div>
        );
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune réservation trouvée</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Client', 'Service', 'Date', 'Heure', 'Statut', 'Prix', 'Actions'].map((title, idx) => (
                                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <Users size={14} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.clientName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {booking.clientPhone}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {booking.serviceId?.name || 'Service supprimé'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex items-center">
                                        <Calendar size={14} className="text-gray-400 mr-1" />
                                        {booking.scheduledDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex items-center">
                                        <Clock size={14} className="text-gray-400 mr-1" />
                                        {booking.scheduledTime}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={booking.status} />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {booking.price} MAD
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-700">
                                            Voir
                                        </button>
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => onStatusChange(booking._id, { status: 'confirmed' })}
                                                    className="text-green-600 hover:text-green-700"
                                                >
                                                    Confirmer
                                                </button>
                                                <button
                                                    onClick={() => onStatusChange(booking._id, { status: 'cancelled' })}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Annuler
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <button
                                                onClick={() => onStatusChange(booking._id, { status: 'in-progress' })}
                                                className="text-orange-600 hover:text-orange-700"
                                            >
                                                Démarrer
                                            </button>
                                        )}
                                        {booking.status === 'in-progress' && (
                                            <button
                                                onClick={() => onStatusChange(booking._id, { status: 'completed' })}
                                                className="text-green-600 hover:text-green-700"
                                            >
                                                Terminer
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsTable;
