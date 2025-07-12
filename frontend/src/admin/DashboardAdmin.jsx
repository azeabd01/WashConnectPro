// import { useEffect, useState } from 'react';
// import { Users, Briefcase, Star, Package } from 'lucide-react';

// export default function DashboardAdmin() {
//   const [stats, setStats] = useState(null);



//   useEffect(() => {
//     fetch('http://localhost:3000/api/admin/sa')
//       .then(res => res.json())
//       .then(setStats)
//       .catch(err => console.error('Failed to load stats', err));
//   }, []);

//   if (!stats) {
//     return <div className="p-6">Loading stats...</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard title="Total Clients" value={stats.totalClients} icon={<Users className="text-blue-500" />} />
//         <StatCard title="Total Providers" value={stats.totalProviders} icon={<Briefcase className="text-green-600" />} />
//         <StatCard title="Verified Providers" value={stats.verifiedProviders} icon={<Star className="text-yellow-500" />} />
//         <StatCard title="Provider Products" value={stats.providerProducts} icon={<Package className="text-purple-500" />} />
//       </div>
//     </div>
    
//   );
// }

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white shadow rounded p-4 flex justify-between items-center border">
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-xl font-bold">{value}</p>
//       </div>
//       <div className="text-3xl">{icon}</div>
      
//     </div>
//   );
// }


// // function StatCard({ icon: Icon, label, value, color }) {
// //   return (
// //     <div className="bg-white rounded-lg shadow border p-4 flex justify-between items-center">
// //       <div>
// //         <p className="text-sm text-gray-500">{label}</p>
// //         <p className="text-2xl font-bold text-gray-800">{value}</p>
// //       </div>
// //       <div className={`${color} p-3 rounded-lg`}>
// //         <Icon className="w-6 h-6 text-white" />
// //       </div>
// //     </div>
// //   );
// // }

// src/pages/DashboardAdmin.jsx
import { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  Star,
  Package,
  AlertTriangle
} from 'lucide-react';

export default function DashboardAdmin() {
  const [generalStats, setGeneralStats] = useState(null);
  const [productStats, setProductStats] = useState(null);

  useEffect(() => {
    // Fetch general admin stats
    fetch('http://localhost:3000/api/admin/sa')
      .then(res => res.json())
      .then(setGeneralStats)
      .catch(err => console.error('Failed to load general stats', err));

    // Fetch product analytics
    fetch('http://localhost:3000/api/products/analytics')
      .then(res => res.json())
      .then(setProductStats)
      .catch(err => console.error('Failed to fetch product analytics', err));
  }, []);

  if (!generalStats || !productStats) {
    return <div className="p-6">Chargement des statistiques...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* === General Stats === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={generalStats.totalClients}
          icon={<Users className="text-blue-500" />}
        />
        <StatCard
          title="Total Providers"
          value={generalStats.totalProviders}
          icon={<Briefcase className="text-green-600" />}
        />
        <StatCard
          title="Verified Providers"
          value={generalStats.verifiedProviders}
          icon={<Star className="text-yellow-500" />}
        />
        <StatCard
          title="Provider Products"
          value={generalStats.providerProducts}
          icon={<Package className="text-purple-500" />}
        />
      </div>

      {/* === Product Stats === */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={productStats.totalProducts}
          icon={<Package className="text-blue-600" />}
        />
        <StatCard
          title="In Stock"
          value={productStats.inStock}
          icon={<Package className="text-purple-600" />}
        />
        <StatCard
          title="Low Stock"
          value={productStats.lowStock}
          icon={<AlertTriangle className="text-yellow-500" />}
        />
      </div>

      {/* === Top Rated Products === */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Rated Products</h2>
        {productStats.topRated?.length > 0 ? (
          <ul className="space-y-2">
            {productStats.topRated.map((p) => (
              <li key={p._id} className="text-gray-700">
                Name product : 
                {p.name} — ⭐ {p.rating}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun produit évalué</p>
        )}
      </div>
    </div>
  );
}

// === Reusable Stat Card ===
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center border">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}
