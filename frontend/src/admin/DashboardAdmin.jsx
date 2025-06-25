// export default function Dashboard() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Welcome Admin</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h4 className="text-lg font-semibold">Users</h4>
//           <p className="text-gray-500">1,234</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h4 className="text-lg font-semibold">Providers</h4>
//           <p className="text-gray-500">345</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h4 className="text-lg font-semibold">Products</h4>
//           <p className="text-gray-500">1,122</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h4 className="text-lg font-semibold">Revenue</h4>
//           <p className="text-green-600 font-bold">$32,500</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Check, Users, BarChart3 } from 'lucide-react';

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [pendingProviders, setPendingProviders] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers);
    fetch('/api/admin/providers/pending').then(res => res.json()).then(setPendingProviders);
  }, []);

  const approveProvider = async (id) => {
    await fetch(`/api/admin/providers/approve/${id}`, { method: 'PATCH' });
    setPendingProviders(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Section: Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow border flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-600">Users</h3>
            <p className="text-xl font-bold">{users.length}</p>
          </div>
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div className="bg-white p-4 rounded shadow border flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-600">Pending Providers</h3>
            <p className="text-xl font-bold">{pendingProviders.length}</p>
          </div>
          <Check className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="bg-white p-4 rounded shadow border flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-600">Analytics</h3>
            <p className="text-xl font-bold">Coming Soon</p>
          </div>
          <BarChart3 className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Section: Pending Providers */}
      <div className="bg-white p-4 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">Approve Providers</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="py-2">Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingProviders.map(p => (
              <tr key={p._id} className="border-b">
                <td className="py-2">{p.email}</td>
                <td>{p.type}</td>
                <td>
                  <button
                    onClick={() => approveProvider(p._id)}
                    className="text-green-600 hover:underline"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
