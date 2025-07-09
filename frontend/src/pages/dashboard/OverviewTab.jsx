import React, { useEffect, useState } from 'react';
import  {fetchOverview, fetchWeeklyPerformance} from '../../api/analyticsApi';
import StatsCard from '../../components/StatsCard';
// import BookingsTable from '../../components/BookingsTable';
import WeeklyPerformance from '../../components/WeeklyPerformance';
import { ShoppingCart, DollarSign, Users, Star } from 'lucide-react';

const OverviewTab = () => {
    const [overview, setOverview] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchOverview();
                const perf = await fetchWeeklyPerformance();
                setOverview(data);
                setPerformance(perf);
            } catch (err) {
                console.error('Erreur chargement overview:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <p>Chargement des données...</p>;

    const stats = [
        { label: 'Réservations', value: overview.totalBookings, icon: ShoppingCart, bg: 'bg-blue-100', color: 'text-blue-600' },
        { label: 'Revenu', value: `${overview.totalRevenue} MAD`, icon: DollarSign, bg: 'bg-green-100', color: 'text-green-600' },
        { label: 'Clients uniques', value: overview.uniqueClients, icon: Users, bg: 'bg-purple-100', color: 'text-purple-600' },
        { label: 'Avis Clients', value: '4.8/5', icon: Star, bg: 'bg-yellow-100', color: 'text-yellow-600' }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatsCard key={i} {...s} />
                ))}
            </div>

            <div className="mt-6">
                <WeeklyPerformance data={performance} />
            </div>
        </>
    );
};

export default OverviewTab;