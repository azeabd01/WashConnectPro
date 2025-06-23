// pages/dashboard/OverviewTab.jsx
import React from 'react';
import StatsCard from '../../components/StatsCard';
import BookingsTable from '../../components/BookingsTable';
import RecentBookings from '../../components/RecentBookings';
import WeeklyPerformance from '../../components/WeeklyPerformance';
import {
    ShoppingCart,
    DollarSign,
    Star,
    Users
} from 'lucide-react';

const OverviewTab = () => {
    const stats = [
        { label: 'Réservations', value: 150, icon: ShoppingCart, bg: 'bg-blue-100', color: 'text-blue-600' },
        { label: 'Revenu', value: '12,500 MAD', icon: DollarSign, bg: 'bg-green-100', color: 'text-green-600' },
        { label: 'Avis Clients', value: '4.8/5', icon: Star, bg: 'bg-yellow-100', color: 'text-yellow-600' },
        { label: 'Utilisateurs', value: 280, icon: Users, bg: 'bg-purple-100', color: 'text-purple-600' },
    ];

    const bookings = [
        { id: 1, client: 'Ahmed R.', service: 'Pack complet', time: '09:00', status: 'Confirmé', price: 120 },
        { id: 2, client: 'Yassine B.', service: 'Lavage extérieur', time: '11:30', status: 'En attente', price: 50 },
        { id: 3, client: 'Sanae D.', service: 'Intérieur', time: '14:00', status: 'En cours', price: 70 }
    ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatsCard key={i} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <div className="xl:col-span-2">
                    <BookingsTable bookings={bookings} />
                </div>
                <div>
                    <RecentBookings bookings={bookings} />
                </div>
            </div>

            <WeeklyPerformance data={performance} />
        </>
    );
};

export default OverviewTab;
