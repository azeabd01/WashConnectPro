import React from 'react';
import { Users, Calendar, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';

const RecentBookings = ({ bookings, onSeeAll }) => {
    // ✅ Vérifier si les données sont disponibles
    if (!Array.isArray(bookings)) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Réservations Récentes</h3>
                    <button
                        onClick={onSeeAll}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Voir tout
                    </button>
                </div>
                <div className="flex items-center justify-center py-8">
                    <p className="text-gray-500">Aucune donnée disponible</p>
                </div>
            </div>
        );
    }

    // ✅ Afficher message si aucune réservation
    if (bookings.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Réservations Récentes</h3>
                    <button
                        onClick={onSeeAll}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Voir tout
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center py-8">
                    <Calendar className="text-gray-300 mb-2" size={48} />
                    <p className="text-gray-500 text-center">
                        Aucune réservation récente
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Réservations Récentes</h3>
                <button
                    onClick={onSeeAll}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    Voir tout
                </button>
            </div>
            <div className="space-y-3">
                {bookings.map((booking) => (
                    <div 
                        key={booking.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {booking.client || 'Client inconnu'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {booking.service || 'Service inconnu'}
                                </p>
                                {booking.price && (
                                    <p className="text-xs text-green-600 font-medium">
                                        {booking.price} MAD
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                                <Clock size={12} />
                                <span>{booking.time || 'Heure inconnue'}</span>
                            </div>
                            <StatusBadge status={booking.status} />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* ✅ Afficher un lien vers toutes les réservations */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                    onClick={onSeeAll}
                    className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    Voir toutes les réservations →
                </button>
            </div>
        </div>
    );
};

export default RecentBookings;