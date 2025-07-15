import React, { useState, useEffect } from 'react';
import { X, Car, Clock, DollarSign, Calendar, User, Phone, Mail, FileText } from 'lucide-react';

const BookingModal = ({
    isOpen,
    onClose,
    service,
    onBookingSubmit,
    timeSlots = [],
    setTimeSlots = () => { },
    navigate
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const isAuthenticated = () => {
        return localStorage.getItem('token') && localStorage.getItem('clientId');
    };

    // ✅ Fonction pour charger les données client
    const loadClientData = () => {
        if (isAuthenticated()) {
            const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
            setFormData(prev => ({
                ...prev,
                clientName: clientData.name || '',
                clientPhone: clientData.phone || '',
                clientEmail: clientData.email || ''
            }));
        }
    };

    // ✅ Charger les informations du client si connecté (au moment de l'ouverture du modal)
    useEffect(() => {
        if (isOpen) {
            loadClientData();
        }
    }, [isOpen]);

    // ✅ Vérifier s'il y a une réservation en attente au retour d'authentification
    useEffect(() => {
        if (isOpen && isAuthenticated()) {
            const pendingBooking = localStorage.getItem('pendingBooking');
            if (pendingBooking) {
                const bookingData = JSON.parse(pendingBooking);

                // Restaurer les données du formulaire de réservation
                setFormData(prev => ({
                    ...prev,
                    scheduledDate: bookingData.formData.scheduledDate || '',
                    scheduledTime: bookingData.formData.scheduledTime || '',
                    vehicleInfo: bookingData.formData.vehicleInfo || {
                        make: '',
                        model: '',
                        year: '',
                        licensePlate: ''
                    },
                    notes: bookingData.formData.notes || ''
                }));

                // ✅ Recharger les données client (nom, téléphone, email) après inscription
                loadClientData();

                // Supprimer la réservation en attente
                localStorage.removeItem('pendingBooking');
                localStorage.removeItem('previousUrl');
            }
        }
    }, [isOpen]);

    // Réinitialiser le formulaire quand le modal s'ouvre (sauf si on revient d'auth)
    useEffect(() => {
        if (isOpen && !localStorage.getItem('pendingBooking')) {
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

            // ✅ Charger les données client même pour un nouveau formulaire
            loadClientData();
        }
    }, [isOpen]);

    // ✅ Fonction pour formater le numéro de téléphone (supprimer les caractères non numériques)
    const formatPhoneNumber = (phone) => {
        return phone.replace(/\D/g, '');
    };

    // ✅ Fonction pour valider le numéro de téléphone marocain
    const validatePhoneNumber = (phone) => {
        const cleanPhone = formatPhoneNumber(phone);

        // Vérifier qu'il y a exactement 10 chiffres
        if (cleanPhone.length !== 10) {
            return false;
        }

        // Vérifier qu'il commence par 0 ou 6/7 (numéros marocains)
        if (cleanPhone.startsWith('0')) {
            // Format 0XXXXXXXXX (06, 07, 05, etc.)
            return /^0[5-7]\d{8}$/.test(cleanPhone);
        } else if (cleanPhone.startsWith('6') || cleanPhone.startsWith('7')) {
            // Format 6XXXXXXXX ou 7XXXXXXXX
            return /^[67]\d{8}$/.test(cleanPhone);
        }

        return false;
    };

    // ✅ Fonction pour valider l'immatriculation marocaine
    const validateLicensePlate = (plate) => {
        if (!plate || plate.trim() === '') {
            return false;
        }

        // Supprimer les espaces et tirets pour la validation
        const cleanPlate = plate.replace(/[-\s]/g, '').toUpperCase();

        const patterns = [
            /^\d{6}[A-Z]{1,2}$/,           // 123456A ou 123456AB
            /^\d{5}[A-Z]{1,2}\d{2}$/,      // 12345A12 ou 12345AB12
            /^\d{6}\|\d{2}$/,              // 123456|12
            /^\d{3}[A-Z]\d{3}$/            // 123A456
        ];

        return patterns.some(pattern => pattern.test(cleanPlate));
    };
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
        } else if (name === 'clientPhone') {
            // ✅ Limiter à 10 chiffres pour le téléphone
            const phoneValue = formatPhoneNumber(value);
            if (phoneValue.length <= 10) {
                setFormData(prev => ({
                    ...prev,
                    [name]: phoneValue
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Nettoyer les erreurs lors de la saisie
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const fetchAvailableSlots = async (selectedDate) => {
        if (!service?._id || !service?.providerId?._id) {
            console.error('❌ Service ou providerId manquant:', { service });
            setTimeSlots([]);
            return;
        }

        try {
            console.log('🔄 Récupération des créneaux pour:', {
                providerId: service.providerId._id,
                date: selectedDate,
                duration: service.duration
            });

            const response = await fetch(
                `/api/public/availability?providerId=${service.providerId._id}&date=${selectedDate}&duration=${service.duration}`
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Erreur API:', response.status, errorText);
                throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ Données reçues:', data);

            const slotsWithEnd = data.slots.map(start => {
                const [hour, minute] = start.split(':').map(Number);
                const startDate = new Date();
                startDate.setHours(hour, minute, 0, 0);

                const endDate = new Date(startDate.getTime() + (service.duration || 30) * 60000);
                const end = endDate.toTimeString().slice(0, 5);

                return { start, end };
            });

            setTimeSlots(slotsWithEnd);
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des créneaux:', error);
            setTimeSlots([]);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setFormData(prev => ({ ...prev, scheduledDate: selectedDate, scheduledTime: '' }));

        if (selectedDate && service) {
            fetchAvailableSlots(selectedDate);
        } else {
            setTimeSlots([]);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.clientName.trim()) newErrors.clientName = 'Le nom est requis';
        if (!formData.clientPhone.trim()) {
            newErrors.clientPhone = 'Le téléphone est requis';
        } else if (!validatePhoneNumber(formData.clientPhone)) {
            newErrors.clientPhone = 'Le numéro de téléphone doit contenir exactement 10 chiffres et être valide (ex: 0612345678)';
        } if (!formData.scheduledDate) newErrors.scheduledDate = 'La date est requise';
        if (!formData.scheduledTime) newErrors.scheduledTime = 'L\'heure est requise';
        // ✅ Validation immatriculation obligatoire
        if (!formData.vehicleInfo.licensePlate.trim()) {
            newErrors['vehicle.licensePlate'] = 'L\'immatriculation est requise';
        } else if (!validateLicensePlate(formData.vehicleInfo.licensePlate)) {
            newErrors['vehicle.licensePlate'] = 'Format d\'immatriculation invalide (ex: 123456A, 12345A12, 123A456)';
        }
        // Validation email si fourni
        if (formData.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
            newErrors.clientEmail = 'Format d\'email invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        // Vérifier si l'utilisateur est authentifié
        if (!isAuthenticated()) {
            setShowAuthPrompt(true);
            return;
        }

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // ✅ Correction : Séparer correctement startTime et endTime
            const [startTime, endTime] = formData.scheduledTime.split(' - ');
            const clientId = localStorage.getItem('clientId');

            const bookingData = {
                clientId,
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

            console.log('📤 Envoi de la réservation:', bookingData);
            await onBookingSubmit(bookingData);

            // ✅ Pas de redirection automatique vers dashboard
            // Juste fermer le modal - la réservation sera visible dans le dashboard provider
            onClose();
            alert('Réservation confirmée avec succès !');

        } catch (error) {
            console.error('❌ Erreur réservation:', error);
            alert('Erreur lors de la réservation. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAuthRedirect = (type) => {
        // Sauvegarder l'URL actuelle pour le retour
        localStorage.setItem('previousUrl', window.location.pathname);

        // Sauvegarder les données du formulaire
        localStorage.setItem('pendingBooking', JSON.stringify({
            formData,
            serviceId: service._id,
            providerId: service.providerId._id
        }));

        // Fermer le modal d'authentification
        setShowAuthPrompt(false);
        onClose(); // ✅ Fermer aussi le modal principal

        // Rediriger vers la page d'authentification
        if (type === 'login') {
            navigate('/auth/login/client');
        } else {
            navigate('/auth/register/client');
        }
    };

    const handleCloseModal = () => {
        // Nettoyer les données en attente si on ferme le modal
        localStorage.removeItem('pendingBooking');
        localStorage.removeItem('previousUrl');
        setShowAuthPrompt(false);
        onClose();
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
                            onClick={handleCloseModal}
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
                            {isAuthenticated() && (
                                <span className="ml-2 text-sm text-green-600 font-normal">
                                    (Connecté)
                                </span>
                            )}
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
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Votre nom complet"
                                />
                                {errors.clientName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone * (10 chiffres)
                                </label>
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    value={formData.clientPhone}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientPhone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="0612345678"
                                    maxLength={10}

                                />
                                {errors.clientPhone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
                                )}
                                {formData.clientPhone && (
                                    <p className="text-gray-500 text-xs mt-1">
                                        {formData.clientPhone.length}/10 chiffres
                                    </p>
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
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.clientEmail ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="votre@email.com"
                            />
                            {errors.clientEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
                            )}
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
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.scheduledDate ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.scheduledDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Créneau * (Durée: {service.duration} min)
                                </label>
                                <select
                                    name="scheduledTime"
                                    value={formData.scheduledTime}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.scheduledTime ? 'border-red-500' : 'border-gray-300'}`}
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
                                {formData.scheduledDate && timeSlots.length === 0 && (
                                    <p className="text-amber-600 text-sm mt-1">
                                        Aucun créneau n'est disponible ce jour-là car le prestataire est fermé.
                                    </p>
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
                                    Immatriculation *
                                </label>
                                <input
                                    type="text"
                                    name="vehicle.licensePlate"
                                    value={formData.vehicleInfo.licensePlate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="123456A, 12345A12, 123A456"
                                />
                                {errors['vehicle.licensePlate'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['vehicle.licensePlate']}</p>
                                )}
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
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Total: <span className="font-bold text-green-600 text-lg">{service.price} MAD</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                            >
                                {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal d'authentification */}
            {showAuthPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User size={32} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Authentification requise
                                </h3>
                                <p className="text-gray-600">
                                    Vous devez vous connecter ou créer un compte pour finaliser votre réservation.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleAuthRedirect('login')}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
                                >
                                    Se connecter
                                </button>
                                <button
                                    onClick={() => handleAuthRedirect('register')}
                                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Créer un compte
                                </button>
                                <button
                                    onClick={() => setShowAuthPrompt(false)}
                                    className="w-full px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingModal;