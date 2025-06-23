import { useState } from 'react';
import {
    BarChart3,
    Package,
    Users,
    TrendingUp,
    Settings,
    Bell,
    Search,
    Plus,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    ShoppingCart,
    DollarSign,
    Star,
    Menu,
    X
} from 'lucide-react';

export default function Sidebar() {
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    return (
        <>


            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold">ProductHub</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-8">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${activeTab === item.id ? 'bg-gray-800 border-r-2 border-blue-500' : ''
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-2">Upgrade to Pro</h3>
                        <p className="text-xs text-gray-400 mb-3">Get access to advanced analytics and unlimited products.</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}
