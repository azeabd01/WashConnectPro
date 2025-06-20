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

export default function StatsGrid() {
     const stats = [
    { label: 'Total Products', value: '1,234', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Revenue', value: '$45.2K', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Orders', value: '892', change: '+23%', icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Customers', value: '2,341', change: '+5%', icon: Users, color: 'bg-orange-500' },
  ];
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}
