import { useEffect, useState } from 'react';
import { Users, Briefcase, Star, Package } from 'lucide-react';

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/sa')
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error('Failed to load stats', err));
  }, []);

  if (!stats) {
    return <div className="p-6">Loading stats...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Clients" value={stats.totalClients} icon={<Users className="text-blue-500" />} />
        <StatCard title="Total Providers" value={stats.totalProviders} icon={<Briefcase className="text-green-600" />} />
        <StatCard title="Verified Providers" value={stats.verifiedProviders} icon={<Star className="text-yellow-500" />} />
        <StatCard title="Provider Products" value={stats.providerProducts} icon={<Package className="text-purple-500" />} />
      </div>
    </div>
  );
}

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
