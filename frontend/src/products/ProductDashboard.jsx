import Sidebar from './Sidebar'
import Header from './Header'
import StatsGrid from './StatsGrid'
import ProductsTable from './ProductsTable'
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

export default function ProductDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {activeTab === 'products' && (
            <>
              {/* <Outlet /> */}
              <StatsGrid />
              <ProductsTable />
            </>
          )}

          {activeTab === 'dashboard' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Vue du tableau de bord</h3>
              <p className="text-gray-500">Les graphiques d’analyse et de synthèse seraient affichés ici.</p>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion des clients</h3>
              <p className="text-gray-500">La liste des clients et leurs détails seraient affichés ici.</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tableau de bord analytique</h3>
              <p className="text-gray-500">Les graphiques et rapports seront affichés ici.

</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Panneau des paramètres</h3>
              <p className="text-gray-500">Les options de configuration seront disponibles ici.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}