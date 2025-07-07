import React from "react";
import { Car, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import navigation

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Exemple : supprimer le token stocké (localStorage/sessionStorage/cookie)
        localStorage.removeItem("token"); // adapter selon ton système d'auth

        // Redirection vers la page login
        navigate("/auth/login/client");
    };



    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">CarWash Pro</h1>
                            <p className="text-sm text-gray-600">Dashboard Client</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Paramètres"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleLogout} // Appel de la fonction logout ici
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Déconnexion"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
