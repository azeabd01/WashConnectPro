// src/components/ProductAnalytics.jsx
import { useEffect, useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Star } from 'lucide-react';

export default function ProductAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/products/analytics')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch analytics', err));
  }, []);

  if (!stats) return <p className="p-4">Chargement des analyses...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Package} label="Total Products" value={stats.totalProducts} color="bg-blue-500" />
        {/* <StatCard icon={TrendingUp} label="Average Price" value={`$${stats.averagePrice.toFixed(2)}`} color="bg-green-500" /> */}
        <StatCard icon={AlertTriangle} label="Low Stock" value={stats.lowStock} color="bg-yellow-500" />
        <StatCard icon={Package} label="In Stock" value={stats.inStock} color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Produits les mieux notés</h2>
        <ul className="space-y-2">
          {stats.topRated?.length > 0 ? (
            stats.topRated.map(p => (
              <li key={p._id}>
                {p.name} - ⭐ {p.rating}
              </li>
            ))
          ) : (
            <p>Aucun produit évalué</p>
          )}


        </ul>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow border p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}
