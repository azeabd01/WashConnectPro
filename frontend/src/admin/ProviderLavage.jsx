// import React, { useState } from 'react';
// import { Search, Filter, Eye, Edit, Trash2, Plus, Phone, Mail, MapPin, Star, Calendar } from 'lucide-react';

// const ProviderLavage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

//   // Sample provider data
//   const [providers, setProviders] = useState([
//     {
//       id: 1,
//       name: "Lavage Express Pro",
//       email: "contact@lavageexpress.com",
//       phone: "+212 6 12 34 56 78",
//       address: "123 Avenue Mohammed V, Casablanca",
//       services: ["Lavage à domicile", "Nettoyage intérieur", "Cire protection"],
//       rating: 4.8,
//       reviewCount: 156,
//       status: "active",
//       joinDate: "2023-01-15",
//       completedOrders: 342,
//       revenue: 45600,
//       avatar: null
//     },
//     {
//       id: 2,
//       name: "AutoClean Morocco",
//       email: "info@autoclean.ma",
//       phone: "+212 5 22 98 76 54",
//       address: "456 Rue Hassan II, Rabat",
//       services: ["Lavage complet", "Détailing", "Nettoyage moteur"],
//       rating: 4.6,
//       reviewCount: 89,
//       status: "active",
//       joinDate: "2023-03-22",
//       completedOrders: 198,
//       revenue: 32400,
//       avatar: null
//     },
//     {
//       id: 3,
//       name: "Premium Wash",
//       email: "hello@premiumwash.com",
//       phone: "+212 6 87 65 43 21",
//       address: "789 Boulevard Zerktouni, Marrakech",
//       services: ["Lavage premium", "Protection céramique"],
//       rating: 4.9,
//       reviewCount: 234,
//       status: "pending",
//       joinDate: "2023-05-10",
//       completedOrders: 423,
//       revenue: 67800,
//       avatar: null
//     }
//   ]);
// const fetchProviders = async () => {
//   try {
//     setLoading(true);
//     const response = await fetch('/api/providers', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
//       },
//     });
//     if (!response.ok) throw new Error('Failed to fetch providers');
//     const data = await response.json();
//     setProviders(data);
//     setError(null);
//   } catch (err) {
//     setError('Erreur lors du chargement des prestataires');
//     setProviders([]); // Clear existing list if fetch fails
//   } finally {
//     setLoading(false);
//   }
// };

//   const filteredProviders = providers.filter(provider => {
//     const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          provider.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === 'all' || provider.status === selectedStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'inactive': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('fr-MA', {
//       style: 'currency',
//       currency: 'MAD'
//     }).format(amount);
//   };

//   const ProviderCard = ({ provider }) => (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//               {provider.name.charAt(0)}
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
//               <div className="flex items-center space-x-2 mt-1">
//                 <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                 <span className="text-sm text-gray-600">{provider.rating} ({provider.reviewCount} avis)</span>
//               </div>
//             </div>
//           </div>
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
//             {provider.status}
//           </span>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-sm text-gray-600">
//             <Mail className="w-4 h-4 mr-2" />
//             {provider.email}
//           </div>
//           <div className="flex items-center text-sm text-gray-600">
//             <Phone className="w-4 h-4 mr-2" />
//             {provider.phone}
//           </div>
//           <div className="flex items-center text-sm text-gray-600">
//             <MapPin className="w-4 h-4 mr-2" />
//             {provider.address}
//           </div>
//         </div>

//         <div className="mb-4">
//           <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
//           <div className="flex flex-wrap gap-1">
//             {provider.services.map((service, index) => (
//               <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                 {service}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//           <div>
//             <span className="text-gray-600">Commandes:</span>
//             <span className="font-semibold ml-1">{provider.completedOrders}</span>
//           </div>
//           <div>
//             <span className="text-gray-600">Revenus:</span>
//             <span className="font-semibold ml-1">{formatCurrency(provider.revenue)}</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between pt-4 border-t">
//           <div className="flex items-center text-sm text-gray-500">
//             <Calendar className="w-4 h-4 mr-1" />
//             Depuis {new Date(provider.joinDate).toLocaleDateString('fr-FR')}
//           </div>
//           <div className="flex space-x-2">
//             <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//               <Eye className="w-4 h-4" />
//             </button>
//             <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
//               <Edit className="w-4 h-4" />
//             </button>
//             <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ProviderRow = ({ provider }) => (
//     <tr className="bg-white hover:bg-gray-50 transition-colors">
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//             {provider.name.charAt(0)}
//           </div>
//           <div className="ml-4">
//             <div className="text-sm font-medium text-gray-900">{provider.name}</div>
//             <div className="text-sm text-gray-500">{provider.email}</div>
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900">{provider.phone}</div>
//         <div className="text-sm text-gray-500">{provider.address}</div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
//           <span className="text-sm text-gray-900">{provider.rating}</span>
//           <span className="text-sm text-gray-500 ml-1">({provider.reviewCount})</span>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
//           {provider.status}
//         </span>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//         {provider.completedOrders}
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//         {formatCurrency(provider.revenue)}
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//         <button className="text-blue-600 hover:text-blue-900">
//           <Eye className="w-4 h-4" />
//         </button>
//         <button className="text-green-600 hover:text-green-900">
//           <Edit className="w-4 h-4" />
//         </button>
//         <button className="text-red-600 hover:text-red-900">
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">Gestion des Prestataires</h1>
//             </div>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
//               <Plus className="w-4 h-4" />
//               <span>Nouveau Prestataire</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <div className="w-6 h-6 bg-blue-600 rounded"></div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Total Prestataires</p>
//                 <p className="text-2xl font-semibold text-gray-900">{providers.length}</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <div className="w-6 h-6 bg-green-600 rounded"></div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Actifs</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {providers.filter(p => p.status === 'active').length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <div className="w-6 h-6 bg-yellow-600 rounded"></div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">En Attente</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {providers.filter(p => p.status === 'pending').length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <div className="w-6 h-6 bg-purple-600 rounded"></div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Revenus Total</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {formatCurrency(providers.reduce((sum, p) => sum + p.revenue, 0))}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow mb-6">
//           <div className="p-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//               <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Rechercher un prestataire..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Filter className="w-4 h-4 text-gray-400" />
//                   <select
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="all">Tous les statuts</option>
//                     <option value="active">Actif</option>
//                     <option value="pending">En attente</option>
//                     <option value="inactive">Inactif</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     viewMode === 'grid' 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="w-4 h-4 grid grid-cols-2 gap-1">
//                     <div className="bg-current rounded-sm"></div>
//                     <div className="bg-current rounded-sm"></div>
//                     <div className="bg-current rounded-sm"></div>
//                     <div className="bg-current rounded-sm"></div>
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => setViewMode('table')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     viewMode === 'table' 
//                       ? 'bg-blue-100 text-blue-600' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="w-4 h-4 flex flex-col space-y-1">
//                     <div className="bg-current h-0.5 rounded"></div>
//                     <div className="bg-current h-0.5 rounded"></div>
//                     <div className="bg-current h-0.5 rounded"></div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProviders.map((provider) => (
//               <ProviderCard key={provider.id} provider={provider} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Prestataire
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Note
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Statut
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Commandes
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Revenus
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredProviders.map((provider) => (
//                   <ProviderRow key={provider.id} provider={provider} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {filteredProviders.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-500 text-lg">Aucun prestataire trouvé</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProviderLavage;

import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Phone, Mail, MapPin, Star, Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ProviderLavage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [updateForm, setUpdateForm] = useState({});

  // Fetch providers from API
  const fetchProviders = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/auth/allProviders'); // Ensure this endpoint is correct
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const data = await response.json();
      setProviders(data);
    } catch (err) {
      setError('Erreur lors du chargement des prestataires');
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || provider.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateProvider = async (providerId, updateData) => {
    try {
      const response = await fetch(`/api/providers/${providerId}`, { // Update the endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        await fetchProviders();
        setShowUpdateModal(false);
        setSelectedProvider(null);
        alert('Prestataire mis à jour avec succès');
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour du prestataire');
      console.error(error); // Log the error for debugging
    }
  };

  const handleDeleteProvider = async (providerId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce prestataire ?')) return;

    try {
      const response = await fetch(`/api/providers/${providerId}`, { // Update the endpoint
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        await fetchProviders();
        alert('Prestataire supprimé avec succès');
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      alert('Erreur lors de la suppression du prestataire');
      console.error(error); // Log the error for debugging
    }
  };

  const openUpdateModal = (provider) => {
    setSelectedProvider(provider);
    setUpdateForm({
      name: provider.name,
      businessName: provider.businessName,
      phone: provider.phone,
      status: provider.status,
      address: provider.address
    });
    setShowUpdateModal(true);
  };

  // ... (rest of the component remains unchanged)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Prestataires</h1>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nouveau Prestataire</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Prestataires</p>
                <p className="text-2xl font-semibold text-gray-900">{providers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {providers.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="w-6 h-6 bg-yellow-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">En Attente</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {providers.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Revenus Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(providers.reduce((sum, p) => sum + p.revenue, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un prestataire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="pending">En attente</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-1">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prestataire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commandes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProviders.map((provider) => (
                  <ProviderRow key={provider.id} provider={provider} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Aucun prestataire trouvé</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderLavage;
