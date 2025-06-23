import React from 'react';
import { Users } from 'lucide-react';
import StatusBadge from './StatusBadge';

const BookingsTable = ({ bookings }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Client', 'Service', 'Heure', 'Statut', 'Prix', 'Actions'].map((title, idx) => (
                                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <Users size={14} className="text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{booking.client}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{booking.service}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{booking.time}</td>
                                <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.price} MAD</td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-700">Voir</button>
                                        <button className="text-green-600 hover:text-green-700">Confirmer</button>
                                        <button className="text-red-600 hover:text-red-700">Annuler</button>
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
