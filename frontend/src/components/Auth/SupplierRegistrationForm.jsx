import React, { useState } from 'react';
import { User, Package, ArrowLeft, Lock, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupplierRegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name?.trim()) newErrors.name = 'Le nom est requis';
        if (!formData.email?.trim()) newErrors.email = 'L\'email est requis';
        if (!formData.password?.trim()) newErrors.password = 'Le mot de passe est requis';
        if (formData.password && formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
        if (!formData.phone?.trim()) newErrors.phone = 'Le téléphone est requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Inscription Fournisseur:', formData);
            // Ici vous pouvez envoyer les données à votre API
            alert('Inscription réussie ! Redirection vers la connexion...');
            // Redirection vers la page de connexion
            navigate('/login');
        }
    };

    const handleBack = () => {
        navigate('/register'); // ou la route de votre sélecteur de profil
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour à la sélection
                        </button>

                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription Fournisseur</h1>
                        <p className="text-gray-600">Créez votre compte fournisseur</p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="+212 5XX XXX XXX"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email professionnel *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="contact@fournisseur.com"
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
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Minimum 6 caractères"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-purple-700">
                                    <Package className="w-4 h-4 inline mr-2" />
                                    En tant que fournisseur, vous pourrez ajouter vos produits et gérer votre catalogue après inscription.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                            >
                                Créer mon compte fournisseur
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SupplierRegistrationForm;