
// ReservationsTab.jsx
import React from "react";
import { Car, Calendar, Clock, MapPin, Star, Eye, Phone, Plus } from "lucide-react";
import { getStatusColor, getStatusIcon } from "../utils/statusHelpers";

const ReservationsTab = ({ reservations }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mes Réservations</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nouvelle Réservation
                </button>
            </div>

            <div className="grid gap-4">
                {reservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Car className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {reservation.provider}
                                    </h3>
                                    <p className="text-gray-600">{reservation.service}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">{reservation.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                                    reservation.status
                                )}`}
                            >
                                {getStatusIcon(reservation.status)}
                                {reservation.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.location}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">{reservation.price} MAD</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationsTab;