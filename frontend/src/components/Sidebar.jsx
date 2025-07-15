import React from 'react';
import { BarChart3, Calendar, Car, TrendingUp, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const items = [
        { id: 'overview', icon: BarChart3, label: "Vue d'ensemble"},
        { id: 'bookings', icon: Calendar, label: 'Réservations' },
        { id: 'services', icon: Car, label: 'Services & Tarifs' },
        { id: 'analytics', icon: TrendingUp, label: 'Statistiques' },
        { id: 'settings', icon: Settings, label: 'Paramètres' }
    ];
const navigate = useNavigate();
    return (
        <nav className="w-64 bg-white shadow-sm min-h-screen p-6">
            <div className="space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        // onClick={() => setActiveTab(item.id)}
                        onClick={() => navigate(`/dashboard/provider/${item.id}`)}

                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-gray-700 font-medium'
                            : 'text-gray-600 hover:bg-gradient-to-br from-green-500 to-emerald-500'
                            }`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Sidebar;