import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerProvider } from '../../api/provideApi';

import { Car, ArrowLeft, MapPin, Clock, User, Building, Mail, Phone, Lock } from 'lucide-react';

const ProviderRegistrationForm = ({ onBack }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        workingHours: {
            monday: { open: '08:00', close: '18:00', isOpen: true },
            tuesday: { open: '08:00', close: '18:00', isOpen: true },
            wednesday: { open: '08:00', close: '18:00', isOpen: true },
            thursday: { open: '08:00', close: '18:00', isOpen: true },
            friday: { open: '08:00', close: '18:00', isOpen: true },
            saturday: { open: '08:00', close: '18:00', isOpen: true },
            sunday: { open: '09:00', close: '17:00', isOpen: false }
        }
    });
    const [currentStep, setCurrentStep] = React.useState(1);
    const [errors, setErrors] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
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

    const handleWorkingHoursChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [day]: {
                    ...prev.workingHours?.[day],
                    [field]: value
                }
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
            if (!formData.businessName?.trim()) newErrors.businessName = 'Le nom de l\'entreprise est requis';
        }

        if (step === 2) {
            if (!formData.address?.street?.trim()) newErrors.street = 'L\'adresse est requise';
            if (!formData.address?.city?.trim()) newErrors.city = 'La ville est requise';
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
        // Validation finale avant soumission
        if (!validateStep(currentStep)) {
            console.log('Validation failed', errors);
            return;
        }

        setIsLoading(true);
        console.log('Données envoyées au backend:', formData);

        try {
            // Appel à l'API pour enregistrer le fournisseur
            const response = await registerProvider(formData);
            console.log('Register response:', response);

            // Stocker le token si nécessaire
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userType', 'provider');
            }

            alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
            navigate("/login");
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
                        Nom du responsable *
                    </label>
                    <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Votre nom complet"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Nom de l'entreprise *
                    </label>
                    <input
                        type="text"
                        value={formData.businessName || ''}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.businessName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Auto Wash Pro"
                    />
                    {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email professionnel *
                    </label>
                    <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="contact@entreprise.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="+212 5XX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
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
                Localisation de votre entreprise
            </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                <input
                    type="text"
                    value={formData.address?.street || ''}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Adresse complète de votre entreprise"
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                    <input
                        type="text"
                        value={formData.address?.city || ''}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Casablanca"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                    <input
                        type="text"
                        value={formData.address?.postalCode || ''}
                        onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="20000"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        return (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Horaires de travail
                </h3>

                <div className="space-y-4">
                    {days.map((day, index) => (
                        <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-20">
                                <span className="text-sm font-medium text-gray-700">{dayLabels[index]}</span>
                            </div>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.workingHours?.[day]?.isOpen ?? true}
                                    onChange={(e) => handleWorkingHoursChange(day, 'isOpen', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600">Ouvert</span>
                            </label>

                            {formData.workingHours?.[day]?.isOpen !== false && (
                                <>
                                    <div>
                                        <input
                                            type="time"
                                            value={formData.workingHours?.[day]?.open || '08:00'}
                                            onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <span className="text-gray-500">à</span>
                                    <div>
                                        <input
                                            type="time"
                                            value={formData.workingHours?.[day]?.close || '18:00'}
                                            onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const totalSteps = 3;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                        disabled={isLoading}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la sélection
                    </button>

                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Car className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription Prestataire</h1>
                    <p className="text-gray-600">Étape {currentStep} sur {totalSteps}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    Précédent
                                </button>
                            )}

                            <div className="ml-auto">
                                {currentStep < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        Suivant
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Création...' : 'Créer mon compte'}
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

export default ProviderRegistrationForm;