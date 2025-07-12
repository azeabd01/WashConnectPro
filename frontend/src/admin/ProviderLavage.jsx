import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Phone, Mail, MapPin, Star, Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
const ProviderCard = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-bold">{provider.name}</h3>
      <p className="text-sm text-gray-600">{provider.email}</p>
      <p className="text-sm text-gray-600">{provider.businessName}</p>
      <p className="text-sm text-gray-600">Téléphone : {provider.phone}</p>
      <p className="text-sm text-gray-600">Statut : <span className={`font-medium ${provider.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{provider.status}</span></p>
    </div>
  );
};
const ProviderRow = ({ provider }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{provider.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{provider.phone}</div>
        <div className="text-sm text-gray-500">{provider.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        ⭐ {provider.rating?.average || 0} ({provider.rating?.count || 0})
      </td>
      <td className="px-6 py-4 whitespace-nowrap capitalize">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {provider.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">—</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {(provider.revenue || 0).toFixed(2)} MAD
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap space-x-2">
        <button className="text-blue-600 hover:underline">Modifier</button>
        <button className="text-red-600 hover:underline">Supprimer</button>
      </td> */}
    </tr>
  );
};

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
      const response = await fetch('http://localhost:3000/api/admin/allProviders'); // Ensure this endpoint is correct
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
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nouveau Prestataire</span>
            </button> */}
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
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
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
