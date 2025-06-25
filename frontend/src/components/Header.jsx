import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell,
    Settings,
    User,
    LogOut,
    ChevronDown,
    Home,
    Car
} from 'lucide-react';

const Header = () => {
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les données utilisateur
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Erreur parsing user data:', error);
                localStorage.removeItem('user');
                navigate('/auth/login');
            }
        } else {
            // Si pas d'utilisateur, rediriger vers login
            navigate('/auth/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirection vers login selon le rôle
        const userRole = user?.role;
        if (userRole === 'provider') {
            navigate('/auth/login/prestataire');
        } else if (userRole === 'client') {
            navigate('/auth/login/client');
        } else if (userRole === 'supplier') {
            navigate('/auth/login/fournisseur');
        } else {
            navigate('/auth/login');
        }
    };

    const handleHomeRedirect = () => {
        navigate('/');
    };

    const getUserDisplayName = () => {
        if (!user) return 'Utilisateur';
        return user.name || user.companyName || user.email || 'Utilisateur';
    };

    const getUserRole = () => {
        if (!user?.role) return 'Utilisateur';

        const roleMap = {
            'provider': 'Prestataire',
            'client': 'Client',
            'supplier': 'Fournisseur'
        };

        return roleMap[user.role] || 'Utilisateur';
    };

    if (!user) {
        return (
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900">CarWashPro Dashboard</h1>
                    </div>
                    <div className="text-sm text-gray-500">Chargement...</div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo et titre */}
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">CarWashPro Dashboard</h1>
                        <p className="text-sm text-gray-500">{getUserRole()}</p>
                    </div>
                </div>

                {/* Actions et profil utilisateur */}
                <div className="flex items-center space-x-4">
                    {/* Bouton retour accueil */}
                    <button
                        onClick={handleHomeRedirect}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Retour à l'accueil"
                    >
                        <Home className="w-5 h-5" />
                    </button>

                    {/* Notifications */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Menu utilisateur */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-sm font-medium text-gray-900">
                                    {getUserDisplayName()}
                                </p>
                                <p className="text-xs text-gray-500">{getUserRole()}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Dropdown menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">
                                        {getUserDisplayName()}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        // Ouvrir modal profil (à implémenter)
                                        alert('Profil - À implémenter');
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    Mon Profil
                                </button>

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        // Ouvrir paramètres (à implémenter)
                                        alert('Paramètres - À implémenter');
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <Settings className="w-4 h-4 mr-3" />
                                    Paramètres
                                </button>

                                <hr className="my-2" />

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        handleLogout();
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fermer le menu si on clique ailleurs */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;