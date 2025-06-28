// src/components/Auth/ChoseProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, Package, CheckCircle, ArrowRight } from 'lucide-react';

const ProfileSelector = () => {
    const navigate = useNavigate();

    const profiles = [
        {
            id: 'client',
            title: 'CLIENT',
            subtitle: 'Particulier / Entreprise',
            description: 'Réservez des services de lavage automobile près de chez vous',
            icon: User,
            features: [
                'Réservation en ligne 24h/24',
                'Géolocalisation des prestataires',
                'Suivi en temps réel',
                'Historique des lavages',
                'Paiement securisé'
            ],
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200 hover:border-blue-400'
        },
        {
            id: 'prestataire',
            title: 'PRESTATAIRE',
            subtitle: 'Service de Lavage',
            description: 'Proposez vos services de lavage et développez votre activité',
            icon: Car,
            features: [
                'Gestion des réservations',
                'Calendrier intelligent',
                'Facturation automatique',
                'Suivi des revenus',
                'Commande de produits'
            ],
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200 hover:border-green-400'
        },
        {
            id: 'product',
            title: 'PRODUCT',
            subtitle: 'Produits & Équipements',
            description: 'Vendez vos produits aux prestataires de lavage automobile',
            icon: Package,
            features: [
                'Catalogue de produits',
                'Gestion des stocks',
                'Commandes automatisées',
                'Statistiques de vente',
                'Réseau de distribution'
            ],
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200 hover:border-purple-400'
        }
    ];

    const handleProfileSelect = (profileId) => {
        navigate(`/auth/register/${profileId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Choisissez votre <span className="text-blue-600">profil</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Sélectionnez le type de compte qui correspond à votre activité pour accéder
                        aux fonctionnalités adaptées à vos besoins
                    </p>
                </div>

                {/* Profile Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {profiles.map((profile) => {
                        const IconComponent = profile.icon;
                        return (
                            <div
                                key={profile.id}
                                className={`relative bg-white rounded-2xl border-2 ${profile.borderColor} 
                shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                cursor-pointer group overflow-hidden`}
                                onClick={() => handleProfileSelect(profile.id)}
                            >
                                {/* Background gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 
                group-hover:opacity-5 transition-opacity duration-300`}></div>

                                <div className="relative p-8">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 ${profile.bgColor} rounded-2xl flex items-center 
                    justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-8 h-8 bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile.title}</h3>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">{profile.subtitle}</p>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">{profile.description}</p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {profile.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        className={`w-full bg-gradient-to-r ${profile.color} text-white py-4 px-6 
                    rounded-xl font-semibold text-lg flex items-center justify-center 
                    hover:shadow-lg transform hover:scale-105 transition-all duration-200
                    group-hover:shadow-xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProfileSelect(profile.id);
                                        }}
                                    >
                                        S'inscrire comme {profile.title.toLowerCase()}
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <br />
                                    {/* <br /> */}
                                    {/* Footer Info */}
                                    <div className="text-center">
                                        <p className="text-gray-500 mb-4">
                                            Vous avez déjà un compte ?
                                            <button
                                                className="text-blue-600 hover:text-blue-700 font-semibold ml-2 underline"
                                                // onClick={() => navigate('/auth/login')}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/auth/login/${profile.id}`);
                                                }}
                                            >
                                                Se connecter
                                            </button>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Inscription gratuite • Aucun engagement • Support 24/7
                                        </p>
                                    </div>


                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
};

export default ProfileSelector;
