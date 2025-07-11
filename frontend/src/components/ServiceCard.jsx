// src/components/ServiceCard.jsx
import React from 'react';
import { DollarSign, Clock, Edit, Trash2 } from 'lucide-react';

const dayLabels = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
};

const ServiceCard = ({ service, onEdit, onDelete, onToggle }) => {
    const { workingHours } = service.providerId || {};

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <span
                            onClick={onToggle}
                            className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 ${service.isActive
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                        >
                            {service.isActive ? 'Actif' : 'Inactif'}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>{service.price} MAD</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{service.duration} min</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onEdit} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Edit size={18} />
                    </button>
                    <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Affichage des horaires du provider */}
            {workingHours && (
                <div className="mt-4 space-y-1 text-sm text-gray-500">
                    <strong className="block mb-1">Horaires du prestataire :</strong>
                    {Object.entries(dayLabels).map(([key, label]) => {
                        const day = workingHours[key];
                        if (!day) return null;
                        return (
                            <div key={key} className="flex justify-between">
                                <span>{label} :</span>
                                <span>
                                    {day.isOpen
                                        ? `${day.open} – ${day.close}`
                                        : 'Fermé'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ServiceCard;