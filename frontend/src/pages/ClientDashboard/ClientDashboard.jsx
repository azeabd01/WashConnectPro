import React, { useState } from "react";
import { Calendar, Search, History, User } from "lucide-react";

import Header from "./Clientcomponents/Header"; // Import du Header ici

import ReservationsTab from "./Clientcomponents/ReservationsTab";
import ProvidersTab from "./Clientcomponents/ProvidersTab";
import ProfileTab from "./Clientcomponents/ProfileTab";
import HistoryTab from "./Clientcomponents/HistoryTab";

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState("reservations");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    // Données mock pour les réservations
    const reservations = [
        {
            id: 1,
            provider: "AutoClean Pro",
            service: "Lavage Complet + Cire",
            date: "2025-07-10",
            time: "14:00",
            status: "confirmé",
            price: 45,
            location: "Casablanca Centre",
            rating: 4.8,
        },
        {
            id: 2,
            provider: "Shine Car Services",
            service: "Lavage Intérieur/Extérieur",
            date: "2025-07-08",
            time: "10:30",
            status: "en_cours",
            price: 35,
            location: "Maarif",
            rating: 4.6,
        },
        {
            id: 3,
            provider: "Clean & Go",
            service: "Lavage Express",
            date: "2025-07-05",
            time: "16:00",
            status: "terminé",
            price: 25,
            location: "Ain Diab",
            rating: 4.9,
        },
    ];

    // Données mock pour les providers
    const providers = [
        {
            id: 1,
            name: "AutoClean Pro",
            rating: 4.8,
            reviews: 324,
            location: "Casablanca Centre",
            distance: "2.5 km",
            services: ["Lavage Complet", "Cire", "Nettoyage Intérieur"],
            priceRange: "25-60 MAD",
            image: "/api/placeholder/300/200",
            available: true,
        },
        {
            id: 2,
            name: "Shine Car Services",
            rating: 4.6,
            reviews: 198,
            location: "Maarif",
            distance: "4.2 km",
            services: ["Lavage Standard", "Polissage", "Traitement Cuir"],
            priceRange: "30-80 MAD",
            image: "/api/placeholder/300/200",
            available: true,
        },
        {
            id: 3,
            name: "Clean & Go",
            rating: 4.9,
            reviews: 456,
            location: "Ain Diab",
            distance: "6.8 km",
            services: ["Lavage Express", "Lavage Écologique", "Cire Premium"],
            priceRange: "20-50 MAD",
            image: "/api/placeholder/300/200",
            available: false,
        },
    ];

    // Historique des lavages
    const history = [
        {
            id: 1,
            provider: "AutoClean Pro",
            service: "Lavage Complet + Cire",
            date: "2025-06-28",
            price: 45,
            rating: 5,
            location: "Casablanca Centre",
        },
        {
            id: 2,
            provider: "Shine Car Services",
            service: "Lavage Intérieur/Extérieur",
            date: "2025-06-15",
            price: 35,
            rating: 4,
            location: "Maarif",
        },
        {
            id: 3,
            provider: "Clean & Go",
            service: "Lavage Express",
            date: "2025-06-02",
            price: 25,
            rating: 5,
            location: "Ain Diab",
        },
    ];

    const tabs = [
        { id: "reservations", label: "Mes Réservations", icon: Calendar },
        { id: "providers", label: "Recherche Providers", icon: Search },
        { id: "history", label: "Historique", icon: History },
        { id: "profile", label: "Mon Profil", icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Utilisation du composant Header importé */}
            <Header />

            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "reservations" && (
                    <ReservationsTab reservations={reservations} />
                )}
                {activeTab === "providers" && (
                    <ProvidersTab
                        providers={providers}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                    />
                )}
                {activeTab === "history" && <HistoryTab history={history} />}
                {activeTab === "profile" && <ProfileTab />}
            </main>
        </div>
    );
};

export default ClientDashboard;
