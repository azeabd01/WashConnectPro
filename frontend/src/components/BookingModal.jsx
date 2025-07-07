import React, { useState, useEffect } from 'react';
import { X, Car, Clock, DollarSign, Calendar, User, Phone, Mail, MapPin, FileText } from 'lucide-react';

const BookingModal = ({
    isOpen,
    onClose,
    service,
    onBookingSubmit,
    // availableSlots = []
    timeSlots = [],
    setTimeSlots = () => { }
}) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        scheduledDate: '',
        scheduledTime: '',
        vehicleInfo: {
            make: '',
            model: '',
            year: '',
            licensePlate: ''
        },
        notes: ''
    });

    // const [timeSlots, setTimeSlots] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Réinitialiser le formulaire quand le modal s'ouvre
    useEffect(() => {
        if (isOpen) {
            setFormData({
                clientName: '',
                clientPhone: '',
                clientEmail: '',
                scheduledDate: '',
                scheduledTime: '',
                vehicleInfo: {
                    make: '',
                    model: '',
                    year: '',
                    licensePlate: ''
                },
                notes: ''
            });
            setErrors({});
            setTimeSlots([]);
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('vehicle.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                vehicleInfo: {
                    ...prev.vehicleInfo,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setFormData(prev => ({ ...prev, scheduledDate: selectedDate, scheduledTime: '' }));

        // Simuler la récupération des créneaux disponibles
        if (selectedDate && service) {
            // Génération de créneaux fictifs pour la démo
            const mockSlots = [
                { start: '08:00', end: '08:30' },
                { start: '09:00', end: '09:30' },
                { start: '10:30', end: '11:00' },
                { start: '14:00', end: '14:30' },
                { start: '15:30', end: '16:00' },
                { start: '16:30', end: '17:00' },
                { start: '17:30', end: '18:00' }

            ];
            setTimeSlots(mockSlots);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.clientName.trim()) newErrors.clientName = 'Le nom est requis';
        if (!formData.clientPhone.trim()) newErrors.clientPhone = 'Le téléphone est requis';
        if (!formData.scheduledDate) newErrors.scheduledDate = 'La date est requise';
        if (!formData.scheduledTime) newErrors.scheduledTime = 'L\'heure est requise';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const [startTime, endTime] = formData.scheduledTime.split(' - ');

            const bookingData = {
                clientName: formData.clientName,
                clientPhone: formData.clientPhone,
                clientEmail: formData.clientEmail,
                serviceId: service._id,
                providerId: service.providerId._id,
                date: formData.scheduledDate,
                startTime: startTime.trim(),
                endTime: endTime.trim(),
                price: service.price,
                vehicleInfo: formData.vehicleInfo,
                notes: formData.notes
            };

            await onBookingSubmit(bookingData);
            onClose();
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !service) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Réserver un Service</h2>
                            <p className="text-blue-100 mt-1">{service.name}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Service Info */}
                <div className="p-6 bg-gray-50 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Car className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                <p className="text-sm text-gray-600">{service.providerId.businessName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-green-600 font-bold text-xl">
                                <DollarSign size={20} />
                                <span>{service.price} MAD</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                                <Clock size={16} className="mr-1" />
                                <span>{service.duration} min</span>
                            </div>
                        </div>
                    </div>

                    {service.description && (
                        <p className="text-gray-600 text-sm">{service.description}</p>
                    )}
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Informations Client */}
                    <div className="space-y-4">
                        <h4 className="flex items-center text-lg font-semibold text-gray-900">
                            <User className="mr-2" size={20} />
                            Informations Client
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom complet *
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Votre nom complet"
                                />
                                {errors.clientName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone *
                                </label>
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    value={formData.clientPhone}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientPhone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="0123456789"
                                />
                                {errors.clientPhone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="clientEmail"
                                value={formData.clientEmail}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    {/* Date et Heure */}
                    <div className="space-y-4">
                        <h4 className="flex items-center text-lg font-semibold text-gray-900">
                            <Calendar className="mr-2" size={20} />
                            Date et Heure
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    name="scheduledDate"
                                    value={formData.scheduledDate}
                                    onChange={handleDateChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.scheduledDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.scheduledDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Créneau *
                                </label>
                                <select
                                    name="scheduledTime"
                                    value={formData.scheduledTime}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.scheduledTime ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    disabled={!formData.scheduledDate}
                                >
                                    <option value="">Choisir un créneau</option>
                                    {timeSlots.map((slot, index) => (
                                        <option key={index} value={`${slot.start} - ${slot.end}`}>
                                            {slot.start} → {slot.end}
                                        </option>
                                    ))}
                                </select>
                                {errors.scheduledTime && (
                                    <p className="text-red-500 text-sm mt-1">{errors.scheduledTime}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Informations Véhicule */}
                    <div className="space-y-4">
                        <h4 className="flex items-center text-lg font-semibold text-gray-900">
                            <Car className="mr-2" size={20} />
                            Informations Véhicule
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Marque
                                </label>
                                <input
                                    type="text"
                                    name="vehicle.make"
                                    value={formData.vehicleInfo.make}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="BMW, Mercedes, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Modèle
                                </label>
                                <input
                                    type="text"
                                    name="vehicle.model"
                                    value={formData.vehicleInfo.model}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="X5, C-Class, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Année
                                </label>
                                <input
                                    type="number"
                                    name="vehicle.year"
                                    value={formData.vehicleInfo.year}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="2020"
                                    min="1990"
                                    max="2025"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Immatriculation
                                </label>
                                <input
                                    type="text"
                                    name="vehicle.licensePlate"
                                    value={formData.vehicleInfo.licensePlate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="123-A-456"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FileText className="inline mr-1" size={16} />
                            Notes supplémentaires
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Informations supplémentaires, demandes spéciales..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                        >
                            {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;