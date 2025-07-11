// import { useEffect, useState } from 'react';
// import { Package, DollarSign, ShoppingCart, Users } from 'lucide-react';

// export default function StatsGrid() {
//   const [stats, setStats]     = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   fetch('http://localhost:3000/api/admin/stats')
//     .then(r => r.json())
//     .then(data => {
//       console.log('dashboard stats:', data); // <— ensure totalProducts is present
//       setStats(data);
//       setLoading(false);
//     })
//     .catch(err => {
//       console.error('Failed to load stats:', err);
//       setLoading(false);
//     });
// }, []);


//   if (loading) return <p>Loading stats...</p>;
//   if (!stats)  return <p className="text-red-600">No data available</p>;

//   // const cards = [
//   //   {
//   //     label: 'Total Products',
//   //     value: stats.totalProducts,
//   //     icon: Package,
//   //     color: 'bg-blue-500'
//   //   },
//   //   {
//   //     label: 'Total Revenue',
//   //     value: `$${stats.totalRevenue}`,
//   //     icon: DollarSign,
//   //     color: 'bg-green-500'
//   //   },
//   //   {
//   //     label: 'Orders',
//   //     value: stats.totalOrders,
//   //     icon: ShoppingCart,
//   //     color: 'bg-purple-500'
//   //   },
//   //   {
//   //     label: 'Customers',
//   //     value: stats.totalUsers,
//   //     icon: Users,
//   //     color: 'bg-orange-500'
//   //   },
//   // ];
// const cards = [
//   {
//     label: 'Total Products',
//     value: Intl.NumberFormat().format(stats.totalProducts),
//     icon: Package,
//     color: 'bg-blue-500'
//   },
//   {
//     label: 'Total Revenue',
//     value: `$${Intl.NumberFormat().format(stats.totalRevenue)}`,
//     icon: DollarSign,
//     color: 'bg-green-500'
//   },
//   {
//     label: 'Orders',
//     value: Intl.NumberFormat().format(stats.totalOrders),
//     icon: ShoppingCart,
//     color: 'bg-purple-500'
//   },
//   {
//     label: 'Customers',
//     value: Intl.NumberFormat().format(stats.totalUsers),
//     icon: Users,
//     color: 'bg-orange-500'
//   },
// ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {cards.map((stat, i) => {
//         const Icon = stat.icon;
//         return (
//           <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
//               </div>
//               <div className={`${stat.color} p-3 rounded-lg`}>
//                 <Icon className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { Package, BarChart, DollarSign, ShoppingCart } from 'lucide-react';

// export default function ProviderStats({ providerId }) {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!providerId) return; // avoid fetch if no providerId

//     const token = localStorage.getItem('token');

//     fetch(`http://localhost:3000/api/products/stats/${providerId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//         setStats(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Failed to load stats:', err);
//         setLoading(false);
//       });
//   }, [providerId]);

//   if (loading) return <p>Loading stats...</p>;
//   if (!stats) return <p className="text-red-600">No data found</p>;

//   const cards = [
//     {
//       label: 'Total Products',
//       value: stats.totalProducts ?? 0,
//       icon: Package,
//       color: 'bg-blue-500'
//     },
//     {
//       label: 'Total Stock',
//       value: stats.stockCount ?? 0,
//       icon: BarChart,
//       color: 'bg-yellow-500'
//     },
//     {
//       label: 'Orders',
//       value: stats.totalOrders ?? 0,
//       icon: ShoppingCart,
//       color: 'bg-purple-500'
//     },
//     {
//       label: 'Total Revenue',
//       value: `$${(stats.totalRevenue ?? 0).toFixed(2)}`,
//       icon: DollarSign,
//       color: 'bg-green-500'
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       {cards.map((card, i) => {
//         const Icon = card.icon;
//         return (
//           <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{card.label}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
//               </div>
//               <div className={`${card.color} p-3 rounded-lg`}>
//                 <Icon className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { Package, BarChart, DollarSign, ShoppingCart } from 'lucide-react';

export default function ProviderStats({ providerId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`http://localhost:3000/api/products/stats/${providerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [providerId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <p className="text-red-600">Error loading stats: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-yellow-600">No data found</p>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Products',
      value: stats.totalProducts ?? 0,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Stock',
      value: stats.stockCount ?? 0,
      icon: BarChart,
      color: 'bg-yellow-500'
    },
    {
      label: 'Orders',
      value: stats.totalOrders ?? 0,
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      label: 'Total Revenue',
      value: `$${(stats.totalRevenue ?? 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}