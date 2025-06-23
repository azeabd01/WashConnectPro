import React from 'react';

const StatsCard = ({ label, value, icon: Icon, bg, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`p-3 ${bg} rounded-lg`}>
                <Icon className={color} size={24} />
            </div>
        </div>
    </div>
);

export default StatsCard;
