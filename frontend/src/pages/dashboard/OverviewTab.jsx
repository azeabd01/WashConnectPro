import React, { useEffect, useState, useCallback } from 'react';
import { 
    fetchOverview, 
    fetchWeeklyPerformance, 
    fetchRecentBookings, 
    fetchDashboardData 
} from '../../api/analyticsApi';
import RecentBookings from '../../components/RecentBookings';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, DollarSign, Users, Star, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

const OverviewTab = () => {
    const navigate = useNavigate();

    // États pour les données
    const [overview, setOverview] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    // ✅ Fonction pour transformer les données de réservation
    const transformBookingData = (booking) => {
        console.log('📋 Transformation booking:', booking);
        
        return {
            id: booking._id || booking.id,
            // ✅ Priorité: clientName > clientId.name > 'Client inconnu'
            client: booking.clientName || 
                    booking.clientId?.name || 
                    booking.client || 
                    'Client inconnu',
            // ✅ Priorité: serviceId.name > service > 'Service inconnu'
            service: booking.serviceId?.name || 
                    booking.service || 
                    'Service inconnu',
            // ✅ Formater l'heure correctement
            time: formatBookingTime(booking.scheduledDate, booking.scheduledTime),
            status: booking.status || 'pending',
            date: booking.scheduledDate,
            price: booking.price || 0,
            // ✅ Informations supplémentaires
            clientEmail: booking.clientEmail || booking.clientId?.email || '',
            bookingNumber: booking.bookingNumber || '',
            vehicleInfo: booking.vehicleInfo || {}
        };
    };

    // ✅ Fonction pour charger toutes les données du dashboard
    const loadDashboardData = useCallback(async () => {
        try {
            setError(null);
            console.log('🔄 Chargement des données du dashboard...');

            // ✅ Utiliser la route dashboard qui récupère tout en une fois
            const dashboardData = await fetchDashboardData();
            
            console.log('📊 Données dashboard reçues:', dashboardData);

            // ✅ Extraire et normaliser les données
            if (dashboardData.overview) {
                setOverview(dashboardData.overview);
            }

            // ✅ Récupérer les données de performance hebdomadaire
            if (Array.isArray(dashboardData.weeklyPerformance)) {
                setPerformance(dashboardData.weeklyPerformance);
            } else if (dashboardData.performance) {
                setPerformance(dashboardData.performance);
            }

            // ✅ CORRECTION: Meilleure transformation des réservations récentes
            if (Array.isArray(dashboardData.recentBookings)) {
                console.log('🔄 Transformation des réservations récentes:', dashboardData.recentBookings);
                
                const transformedBookings = dashboardData.recentBookings.map(booking => {
                    const transformed = transformBookingData(booking);
                    console.log('✅ Booking transformé:', transformed);
                    return transformed;
                });
                
                setRecentBookings(transformedBookings);
            }

            setLastUpdated(new Date());
            console.log('✅ Données chargées avec succès');

        } catch (err) {
            console.error('❌ Erreur chargement dashboard:', err);
            setError('Impossible de charger les données. Veuillez réessayer.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // ✅ Fonction alternative pour charger les données séparément
    const loadDataSeparately = useCallback(async () => {
        try {
            setError(null);
            console.log('🔄 Chargement des données séparément...');

            // Charger les données en parallèle
            const [overviewData, performanceData, bookingsData] = await Promise.all([
                fetchOverview().catch(err => {
                    console.error('Erreur overview:', err);
                    return null;
                }),
                fetchWeeklyPerformance().catch(err => {
                    console.error('Erreur performance:', err);
                    return [];
                }),
                fetchRecentBookings(6).catch(err => { // ✅ Récupérer 6 réservations
                    console.error('Erreur bookings:', err);
                    return [];
                })
            ]);

            // ✅ Normaliser les données overview
            if (overviewData) {
                setOverview(overviewData);
            }

            // ✅ Normaliser les données performance
            if (Array.isArray(performanceData)) {
                setPerformance(performanceData);
            }

            // ✅ CORRECTION: Meilleure transformation des réservations
            if (Array.isArray(bookingsData)) {
                console.log('🔄 Transformation des réservations (séparées):', bookingsData);
                
                const transformedBookings = bookingsData.map(booking => {
                    const transformed = transformBookingData(booking);
                    console.log('✅ Booking transformé (séparé):', transformed);
                    return transformed;
                });
                
                setRecentBookings(transformedBookings);
            }

            setLastUpdated(new Date());
            console.log('✅ Données chargées séparément avec succès');

        } catch (err) {
            console.error('❌ Erreur chargement données:', err);
            setError('Impossible de charger les données. Veuillez réessayer.');
            // ✅ En cas d'erreur, essayer de charger au moins les réservations
            try {
                const bookingsData = await fetchRecentBookings(6);
                if (Array.isArray(bookingsData)) {
                    const transformedBookings = bookingsData.map(transformBookingData);
                    setRecentBookings(transformedBookings);
                }
            } catch (fallbackErr) {
                console.error('❌ Erreur fallback réservations:', fallbackErr);
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // ✅ Fonction pour formater l'heure de réservation
    const formatBookingTime = (date, time) => {
        if (!date) return 'Date inconnue';
        
        try {
            const bookingDate = new Date(date);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (bookingDate.toDateString() === today.toDateString()) {
                return `Aujourd'hui ${time || ''}`;
            } else if (bookingDate.toDateString() === yesterday.toDateString()) {
                return `Hier ${time || ''}`;
            } else {
                return `${bookingDate.toLocaleDateString('fr-FR')} ${time || ''}`;
            }
        } catch (error) {
            return `${date} ${time || ''}`;
        }
    };

    // ✅ Fonction pour rafraîchir les données
    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        // Essayer d'abord la route dashboard, sinon charger séparément
        try {
            await loadDashboardData();
        } catch (err) {
            console.log('🔄 Fallback vers chargement séparé...');
            await loadDataSeparately();
        }
    }, [loadDashboardData, loadDataSeparately]);

    // ✅ Chargement initial
    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    // ✅ Auto-refresh toutes les 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            loadDashboardData();
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(interval);
    }, [loadDashboardData]);

    // ✅ Calculer les tendances
    const calculateTrend = (current, previous) => {
        if (!previous || previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    };

    // ✅ Calculer les stats hebdomadaires avec les vraies données
    const calculateWeeklyStats = () => {
        if (!Array.isArray(performance) || performance.length === 0) {
            return { bookings: 0, revenue: 0 };
        }

        return performance.reduce((acc, day) => ({
            bookings: acc.bookings + (day.bookings || 0),
            revenue: acc.revenue + (day.revenue || 0)
        }), { bookings: 0, revenue: 0 });
    };

    // ✅ NOUVEAU: Calculer les stats des réservations terminées
    const calculateCompletedStats = () => {
        // Vérifier si les données overview contiennent les stats terminées
        if (overview && overview.completedBookings !== undefined) {
            return {
                bookings: overview.completedBookings || 0,
                revenue: overview.completedRevenue || 0
            };
        }

        // Sinon, calculer à partir des réservations récentes si disponibles
        if (Array.isArray(recentBookings) && recentBookings.length > 0) {
            const completedBookings = recentBookings.filter(booking => 
                booking.status === 'completed' || booking.status === 'terminé'
            );
            
            const totalRevenue = completedBookings.reduce((sum, booking) => 
                sum + (booking.price || 0), 0
            );

            return {
                bookings: completedBookings.length,
                revenue: totalRevenue
            };
        }

        // Valeurs par défaut si aucune donnée
        return { bookings: 0, revenue: 0 };
    };

    const weeklyStats = calculateWeeklyStats();
    const completedStats = calculateCompletedStats();

    // ✅ Configuration des statistiques avec données réelles - MODIFIÉ
    const getStatsConfig = () => {
        if (!overview && !performance && !recentBookings) return [];

        return [
            {
                label: 'Réservations Terminées',
                value: completedStats.bookings,
                icon: ShoppingCart,
                bg: 'bg-green-100',
                color: 'text-green-600',
                trend: calculateTrend(completedStats.bookings, overview?.previousCompletedBookings || 0)
            },
            {
                label: 'Revenu Total (Terminées)',
                value: `${completedStats.revenue} MAD`,
                icon: DollarSign,
                bg: 'bg-blue-100',
                color: 'text-blue-600',
                trend: calculateTrend(completedStats.revenue, overview?.previousCompletedRevenue || 0)
            },
            {
                label: 'Clients Uniques',
                value: overview?.uniqueClients || 0,
                icon: Users,
                bg: 'bg-purple-100',
                color: 'text-purple-600',
                trend: calculateTrend(overview?.uniqueClients || 0, overview?.previousClients || 0)
            },
            {
                label: 'Revenu de la semaine',
                value: `${weeklyStats.revenue} MAD`,
                icon: DollarSign,
                bg: 'bg-blue-100',
                color: 'text-blue-600',
                trend: 0
            }
        ];
    };

    // ✅ Composant de chargement
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2">
                    <RefreshCw className="animate-spin" size={20} />
                    <span>Chargement des données...</span>
                </div>
            </div>
        );
    }

    const statsConfig = getStatsConfig();

    return (
        <div className="space-y-6">
            {/* Header avec bouton de rafraîchissement */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Aperçu Général</h2>
                    {lastUpdated && (
                        <p className="text-sm text-gray-500 mt-1">
                            Dernière mise à jour: {lastUpdated.toLocaleTimeString()}
                        </p>
                    )}
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2  bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
                    {refreshing ? 'Actualisation...' : 'Actualiser'}
                </button>
            </div>

            {/* Affichage des erreurs */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-red-800">{error}</p>
                        <button
                            onClick={handleRefresh}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            )}

            {/* Message si pas de données */}
            {!overview && !performance && !loading && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-yellow-800">Aucune donnée disponible pour le moment</p>
                        <button
                            onClick={handleRefresh}
                            className="text-yellow-600 hover:text-yellow-800 font-medium"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            )}

            {/* Cartes de statistiques */}
            {statsConfig.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {statsConfig.map((stat, index) => (
                        <EnhancedStatsCard key={index} {...stat} />
                    ))}
                </div>
            )}

            {/* Section principale */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Réservations récentes */}
                <RecentBookings
                    bookings={recentBookings}
                    onSeeAll={() => navigate('/dashboard/provider/bookings')}
                />

                {/* Résumé de la semaine avec vraies données */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Résumé de la Semaine</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total réservations</span>
                            <span className="font-semibold">{weeklyStats.bookings}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Revenu généré</span>
                            <span className="font-semibold">{weeklyStats.revenue} MAD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ✅ Composant StatsCard amélioré
const EnhancedStatsCard = ({ label, value, icon: Icon, bg, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend !== 0 && (
                    <div className="flex items-center gap-1 mt-1">
                        {trend > 0 ? (
                            <TrendingUp className="text-green-500" size={14} />
                        ) : (
                            <TrendingDown className="text-red-500" size={14} />
                        )}
                        <span className={`text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    </div>
                )}
            </div>
            <div className={`p-3 ${bg} rounded-lg`}>
                <Icon className={color} size={24} />
            </div>
        </div>
    </div>
);

export default OverviewTab;