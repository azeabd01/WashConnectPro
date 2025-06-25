import React from 'react';
import { Users } from 'lucide-react';
import StatusBadge from './StatusBadge';

const RecentBookings = ({ bookings, onSeeAll }) => {
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
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users size={16} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{booking.client}</p>
                                <p className="text-sm text-gray-600">{booking.service}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                            <StatusBadge status={booking.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBookings;
