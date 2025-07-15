import  { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  Plus,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Sidebar() {
      const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('products');

  const sidebarItems = [
  // { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard/product' },             // ✅ index route
  { id: 'products', label: 'Produits', icon: Package, path: '/dashboard/product' },         // ✅ sub route
  { id: 'addproduct', label: 'Ajouter Produits', icon: Plus, path: '/dashboard/product/addproduct' },
  { id: 'customers', label: 'Clients', icon: Users, path: '/dashboard/product/customers' },
  // { id: 'analytics', label: 'Analytics', icon: TrendingUp, path: '/dashboard/product/analytics' },
  { id: 'settings', label: 'Paramètres', icon: Settings, path: '/dashboard/product/settings' },
];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    setSidebarOpen(false); // Close mobile sidebar on navigation
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-black transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
      {/* <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">WashConnectPro</h1>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-800 "
        >
          <X className="w-5 h-5" />
        </button>
      </div> */}
      
      <nav className="mt-8">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gradient-to-br from-purple-500 to-pink-500 transition-colors ${
                activeTab === item.id ? 'bg-gradient-to-br from-purple-500 to-pink-500border-r-2 border-blue-500' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <Link to={item.path}>
              {item.label}

              </Link>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Passez à Pro</h3>
          <p className="text-xs text-white mb-3">Accédez à des analyses avancées et à un nombre illimité de produits.</p>
          <button className="w-full bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md transition-colors">
            Passez à la version Pro maintenant 
          </button>
        </div>
      </div>
    </div>
  );
};
