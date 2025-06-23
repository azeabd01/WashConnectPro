import React from 'react';
import { BarChart3, Calendar, Car, TrendingUp, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Sidebar = ({ activeTab, setActiveTab }) => {
    const items = [
        { id: 'overview', icon: BarChart3, label: 'Overview' },
        { id: 'bookings', icon: Calendar, label: 'Bookings' },
        { id: 'services', icon: Car, label: 'Services & Pricing' },
        { id: 'analytics', icon: TrendingUp, label: 'Statistics' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];
const navigate = useNavigate();
    return (
        <nav className="w-64 bg-white shadow-sm min-h-screen p-6">
            <div className="space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        // onClick={() => setActiveTab(item.id)}
                        onClick={() => navigate(`/dashboard/lavage/${item.id}`)}

                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
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


