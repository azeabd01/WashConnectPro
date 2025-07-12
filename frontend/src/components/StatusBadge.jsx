import React from 'react';

const StatusBadge = ({ status }) => {
    // ✅ Configuration des styles pour chaque statut
    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'En attente',
                    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
                };
            case 'confirmed':
                return {
                    label: 'Confirmée',
                    className: 'bg-blue-100 text-blue-800 border-blue-200'
                };
            case 'in-progress':
                return {
                    label: 'En cours',
                    className: 'bg-purple-100 text-purple-800 border-purple-200'
                };
            case 'completed':
                return {
                    label: 'Terminée',
                    className: 'bg-green-100 text-green-800 border-green-200'
                };
            case 'cancelled':
                return {
                    label: 'Annulée',
                    className: 'bg-red-100 text-red-800 border-red-200'
                };
            default:
                return {
                    label: 'Inconnu',
                    className: 'bg-gray-100 text-gray-800 border-gray-200'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
            ${config.className}
        `}>
            {config.label}
        </span>
    );
};

export default StatusBadge;