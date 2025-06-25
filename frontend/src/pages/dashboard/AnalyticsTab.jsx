// pages/dashboard/AnalyticsTab.jsx
import React from 'react';
import WeeklyPerformance from '../../components/WeeklyPerformance';

const AnalyticsTab = () => {
    const performance = [
        { day: 'Lun', bookings: 8, revenue: 500 },
        { day: 'Mar', bookings: 12, revenue: 750 },
        { day: 'Mer', bookings: 5, revenue: 320 },
        { day: 'Jeu', bookings: 14, revenue: 910 },
        { day: 'Ven', bookings: 11, revenue: 700 },
        { day: 'Sam', bookings: 9, revenue: 620 },
        { day: 'Dim', bookings: 3, revenue: 180 }
    ];

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques Hebdomadaires</h2>
            <WeeklyPerformance data={performance} />
        </>
    );
};

export default AnalyticsTab;
