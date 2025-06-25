import React from 'react';

const StatusBadge = ({ status }) => {
    const colors = {
        'In Progress': 'bg-blue-100 text-blue-800',
        'Confirmed': 'bg-green-100 text-green-800',
        'En Pending': 'bg-yellow-100 text-yellow-800',
        'Completed': 'bg-gray-100 text-gray-800'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;


