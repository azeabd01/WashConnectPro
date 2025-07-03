import { useEffect, useState } from 'react';
import { Package, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function StatsGrid() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('http://localhost:3000/api/admin/stats')
    .then(r => r.json())
    .then(data => {
      console.log('dashboard stats:', data); // <— ensure totalProducts is present
      setStats(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to load stats:', err);
      setLoading(false);
    });
}, []);


  if (loading) return <p>Loading stats...</p>;
  if (!stats)  return <p className="text-red-600">No data available</p>;

  const cards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      label: 'Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      label: 'Customers',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-orange-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
