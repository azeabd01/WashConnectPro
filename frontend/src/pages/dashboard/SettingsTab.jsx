// // pages/dashboard/SettingsTab.jsx
// import React from 'react';

// const SettingsTab = () => {
//     return (
//         <>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h2>
//             <p className="text-gray-700">Module de configuration en cours de développement...</p>
//         </>
//     );
// };

// export default SettingsTab;


// pages/dashboard/SettingsTab.jsx
import React from 'react';

const SettingsTab = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Informations du Centre */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Informations du Centre</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom du Centre
                            </label>
                            <input
                                type="text"
                                defaultValue="Centre de Lavage Premium"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Adresse
                            </label>
                            <input
                                type="text"
                                defaultValue="Agadir, Souss-Massa"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                defaultValue="+212 5 28 12 34 56"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Sauvegarder
                        </button>
                    </div>
                </div>

                {/* Section Notifications */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">Nouvelles réservations</label>
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">Rappels de services</label>
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">Rapports quotidiens</label>
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;