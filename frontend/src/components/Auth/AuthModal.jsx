import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Wrench, Package } from 'lucide-react';

const ProfileSelection = () => {
    const navigate = useNavigate();

    const handleProfileSelect = (profile) => {
        if (profile === 'login') {
            navigate('/auth/login');
        } else {
            navigate(`/auth/register/${profile}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Choisissez votre profil
                </h2>
                <div className="flex flex-col space-y-6">
                    <button
                        onClick={() => handleProfileSelect('client')}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-blue-50 transition"
                    >
                        <User className="w-8 h-8 text-blue-600" />
                        <span className="text-lg font-semibold">Client</span>
                    </button>
                    <button
                        onClick={() => handleProfileSelect('provider')}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-green-50 transition"
                    >
                        <Wrench className="w-8 h-8 text-green-600" />
                        <span className="text-lg font-semibold">Prestataire</span>
                    </button>
                    <button
                        onClick={() => handleProfileSelect('product')}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-purple-50 transition"
                    >
                        <Package className="w-8 h-8 text-purple-600" />
                        <span className="text-lg font-semibold">Fournisseur de Produit</span>
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={() => handleProfileSelect('login')}
                        className="text-gray-600 underline hover:text-gray-800"
                    >
                        Vous avez déjà un compte ? Connexion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSelection;