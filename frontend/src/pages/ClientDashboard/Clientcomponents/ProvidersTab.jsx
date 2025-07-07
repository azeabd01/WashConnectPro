// ProvidersTab.jsx
import React from "react";
import { Search, Filter, Star, MapPin } from "lucide-react";

const ProvidersTab = ({
    providers,
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
}) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Recherche de Providers</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Toutes les zones</option>
                    <option value="centre">Casablanca Centre</option>
                    <option value="maarif">Maarif</option>
                    <option value="ain_diab">Ain Diab</option>
                </select>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtres
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                    <div
                        key={provider.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            <div className="absolute top-4 right-4">
                                <div
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${provider.available
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {provider.available ? "Disponible" : "Occupé"}
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-semibold text-lg">{provider.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm">
                                        {provider.rating} ({provider.reviews} avis)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {provider.location} • {provider.distance}
                                </span>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Services proposés</h4>
                                <div className="flex flex-wrap gap-2">
                                    {provider.services.slice(0, 3).map((service, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">{provider.priceRange}</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Réserver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProvidersTab;
