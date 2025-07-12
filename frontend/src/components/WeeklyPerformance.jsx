import React from 'react';
import { Clock, TrendingUp, Calendar } from 'lucide-react';

const WeeklyPerformance = ({ data = [] }) => {
    // Vérifier si data est un tableau et n'est pas vide
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Performance Hebdomadaire</h3>
                </div>
                <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Aucune donnée disponible</p>
                </div>
            </div>
        );
    }

    // Fonction pour corriger les dates (problème de décalage)
    const correctDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        // Ajout d'un jour pour compenser le décalage
        date.setDate(date.getDate() + 1);
        return date;
    };

    // ✅ CALCULS DYNAMIQUES basés sur les données reçues
    const totalBookings = data.reduce((sum, day) => sum + (day.bookings || 0), 0);
    const totalRevenue = data.reduce((sum, day) => sum + (day.revenue || 0), 0);
    const workingDays = data.filter(day => day.isWorkingDay !== false).length; // Considérer comme jour ouvré si non spécifié

    // ✅ Calculs additionnels dynamiques
    const avgRevenuePerDay = workingDays > 0 ? Math.round(totalRevenue / workingDays) : 0;
    const avgBookingsPerDay = workingDays > 0 ? Math.round((totalBookings / workingDays) * 10) / 10 : 0;
    const avgPricePerBooking = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

    // Trouver le jour le plus performant
    const bestDay = data.reduce((best, current) => {
        return (current.revenue || 0) > (best.revenue || 0) ? current : best;
    }, data[0] || {});

    // Trouver la valeur max pour normaliser les barres
    const maxBookings = Math.max(...data.map(day => day.bookings || 0));
    const normalizedMax = maxBookings > 0 ? maxBookings : 1;

    // Ordre des jours de la semaine
    const daysOrder = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    // Préparer les données avec les dates corrigées et dans le bon ordre
    const preparedData = daysOrder.map(dayName => {
        const dayData = data.find(d => d.day === dayName) || {};

        return {
            ...dayData,
            day: dayName,
            correctedDate: correctDate(dayData.date),
            isWorkingDay: dayData.isWorkingDay !== false // Par défaut considérer comme jour ouvré
        };
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Performance Hebdomadaire</h3>
            </div>

            {/* ✅ Résumé hebdomadaire - DONNÉES DYNAMIQUES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalBookings}</div>
                    <div className="text-sm text-gray-600">Total réservations</div>
                    <div className="text-xs text-gray-500">({avgBookingsPerDay}/jour)</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{totalRevenue} MAD</div>
                    <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                    <div className="text-xs text-gray-500">({avgRevenuePerDay} MAD/jour)</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{avgPricePerBooking} MAD</div>
                    <div className="text-sm text-gray-600">Prix moyen</div>
                    <div className="text-xs text-gray-500">par réservation</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{bestDay.day || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Meilleur jour</div>
                    <div className="text-xs text-gray-500">({bestDay.revenue || 0} MAD)</div>
                </div>
            </div>

            {/* ✅ Indicateurs de performance supplémentaires */}
            {totalBookings > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Insights de la semaine</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Taux d'occupation:</span>
                            <span className="font-medium text-blue-600">
                                {Math.round((workingDays / 7) * 100)}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Jours actifs:</span>
                            <span className="font-medium text-green-600">
                                {data.filter(day => day.bookings > 0).length}/{workingDays}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Détail par jour */}
            <div className="space-y-3">
                {preparedData.map((day, index) => {
                    const isWorkingDay = day.isWorkingDay;
                    const hasBookings = day.bookings > 0;
                    const percentage = ((day.bookings || 0) / normalizedMax) * 100;

                    // Formater la date corrigée
                    const formattedDate = day.correctedDate
                        ? day.correctedDate.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit'
                        })
                        : 'N/A';

                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${!isWorkingDay
                                    ? 'bg-gray-50 opacity-60'
                                    : hasBookings
                                        ? 'bg-blue-50 hover:bg-blue-100'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            {/* Jour et statut */}
                            <div className="flex items-center gap-3 w-24">
                                <div className="text-sm font-medium text-gray-900">
                                    {day.day}
                                </div>
                                {!isWorkingDay && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">Fermé</span>
                                    </div>
                                )}
                            </div>

                            {/* Date corrigée */}
                            <div className="text-xs text-gray-500 w-20">
                                {formattedDate}
                            </div>

                            {/* Barre de progression */}
                            <div className="flex-1 mx-4">
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${!isWorkingDay
                                                ? 'bg-gray-300'
                                                : hasBookings
                                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                                    : 'bg-gray-300'
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Statistiques */}
                            <div className="text-sm flex items-center gap-4 min-w-0">
                                <div className="flex items-center gap-1">
                                    <span className={`${!isWorkingDay ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {day.bookings || 0}
                                    </span>
                                    <span className={`text-xs ${!isWorkingDay ? 'text-gray-400' : 'text-gray-500'}`}>
                                        rés.
                                    </span>
                                </div>
                                <div className={`font-medium ${!isWorkingDay
                                        ? 'text-gray-400'
                                        : hasBookings
                                            ? 'text-green-600'
                                            : 'text-gray-900'
                                    }`}>
                                    {day.revenue || 0} MAD
                                </div>
                                {day.avgPrice > 0 && (
                                    <div className={`text-xs ${!isWorkingDay ? 'text-gray-400' : 'text-gray-500'}`}>
                                        (moy: {day.avgPrice} MAD)
                                    </div>
                                )}
                            </div>

                            {/* Horaires de travail */}
                            {isWorkingDay && day.workingHours && (
                                <div className="text-xs text-gray-500 ml-2">
                                    {day.workingHours.open}-{day.workingHours.close}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Légende */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        <span>Jour avec réservations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
                        <span>Jour sans réservations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>Jour fermé</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyPerformance;