import React from 'react';
import { User, ArrowLeft, MapPin, Bell, Mail, Phone, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerClient } from '../../api/ClientApi';

const ClientRegistrationForm = ({ onBack }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({});
    const [currentStep, setCurrentStep] = React.useState(1);
    const [errors, setErrors] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleAddressChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.name?.trim()) newErrors.name = 'Le nom est requis';
            if (!formData.email?.trim()) newErrors.email = 'L\'email est requis';
            if (!formData.password?.trim()) newErrors.password = 'Le mot de passe est requis';
            if (formData.password && formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
            if (!formData.phone?.trim()) newErrors.phone = 'Le téléphone est requis';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) {
            console.log('Validation failed', errors);
            return;
        }
        setIsLoading(true);
        console.log('Données envoyées au backend:', formData);

        try {
            const response = await registerClient(formData);
            console.log('Register response:', response);

            // ✅ Vérifier s'il y a une réservation en attente
            const pendingBooking = localStorage.getItem('pendingBooking');

            if (pendingBooking) {
                alert("Inscription réussie ! Vous pouvez maintenant finaliser votre réservation.");
                 // Rediriger vers la page de connexion
                navigate("/auth/login/client");
            } else {
                alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
                navigate("/auth/login/client");
            }

        } catch (error) {
            console.error('Register error:', error);
            alert(error.message || "Erreur lors de l'inscription.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom complet *
                    </label>
                    <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Votre nom complet"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Téléphone *
                    </label>
                    <input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="+212 6XX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                </label>
                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Mot de passe *
                </label>
                <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Minimum 6 caractères"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <MapPin className="w-5 h-5 inline mr-2" />
                Adresse (optionnel)
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rue</label>
                <input
                    type="text"
                    value={formData.address?.street || ''}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Numéro et nom de rue"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                    <input
                        type="text"
                        value={formData.address?.city || ''}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Casablanca"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                    <input
                        type="text"
                        value={formData.address?.postalCode || ''}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="20000"
                    />
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                    <Bell className="w-4 h-4 inline mr-2" />
                    Préférences de notifications
                </h4>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.preferences?.notifications?.email ?? true}
                            onChange={(e) => handleInputChange('preferences', {
                                ...formData.preferences,
                                notifications: {
                                    ...formData.preferences?.notifications,
                                    email: e.target.checked
                                }
                            })}
                            className="mr-2"
                        />
                        Notifications par email
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.preferences?.notifications?.sms ?? false}
                            onChange={(e) => handleInputChange('preferences', {
                                ...formData.preferences,
                                notifications: {
                                    ...formData.preferences?.notifications,
                                    sms: e.target.checked
                                }
                            })}
                            className="mr-2"
                        />
                        Notifications par SMS
                    </label>
                </div>
            </div>
        </div>
    );

    const totalSteps = 2;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la sélection
                    </button>

                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription Client</h1>
                    <p className="text-gray-600">
                        Étape {currentStep} sur {totalSteps}
                        {localStorage.getItem('pendingBooking') && (
                            <span className="block text-sm text-blue-600 mt-1">
                                📅 Réservation en attente - Finalisez votre inscription
                            </span>
                        )}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Précédent
                                </button>
                            )}

                            <div className="ml-auto">
                                {currentStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                                    >
                                        Suivant
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Création...' :
                                            localStorage.getItem('pendingBooking') ? 'Créer et réserver' : 'Créer mon compte'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientRegistrationForm;