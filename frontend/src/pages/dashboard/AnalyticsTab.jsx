// pages/dashboard/AnalyticsTab.jsx
import React, { useState, useEffect } from 'react';
import WeeklyPerformance from '../../components/WeeklyPerformance';
import { fetchWeeklyPerformance } from '../../api/analyticsApi'; // (⚠️ assure-toi que ce fichier existe et exporte bien la fonction)

const AnalyticsTab = () => {
    const [performance, setPerformance] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchWeeklyPerformance();
            setPerformance(data);
        };
        load();
    }, []);

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques Hebdomadaires</h2>
            <WeeklyPerformance data={performance} />
        </>
    );
};

export default AnalyticsTab;
