// ✅ components/StatusBadge.jsx

import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    text: 'En attente',
                    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
                };
            case 'confirmed':
                return {
                    text: 'Confirmée',
                    className: 'bg-blue-100 text-blue-800 border-blue-200'
                };
            case 'in-progress':
                return {
                    text: 'En cours',
                    className: 'bg-orange-100 text-orange-800 border-orange-200'
                };
            case 'completed':
                return {
                    text: 'Terminée',
                    className: 'bg-green-100 text-green-800 border-green-200'
                };
            case 'cancelled':
                return {
                    text: 'Annulée',
                    className: 'bg-red-100 text-red-800 border-red-200'
                };
            default:
                return {
                    text: status || 'Inconnu',
                    className: 'bg-gray-100 text-gray-800 border-gray-200'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
            {config.text}
        </span>
    );
};

export default StatusBadge;
