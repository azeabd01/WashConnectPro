import React, { useState, useEffect } from 'react';

const ServiceModal = ({ service, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: '',
        description: '',
        active: false,
        category: 'exterieur' // valeur par défaut
    });

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name || '',
                price: service.price || '',
                duration: service.duration || '',
                description: service.description || '',
                active: service.isActive ?? true,
                category: service.category || 'exterieur'
            });
        }
    }, [service]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ✅ Adapter les clés pour correspondre à l’API backend
        const finalData = {
            ...formData,
            isActive: formData.active,  // 🔁 clé attendue par le backend
        };
        delete finalData.active; // ❌ inutile car le backend ne comprend pas `active`

        await onSave(finalData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">
                    {service ? 'Modifier le Service' : 'Nouveau Service'}
                </h3>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Service</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (MAD)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                                min={1}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="exterieur">Extérieur</option>
                            <option value="interieur">Intérieur</option>
                            <option value="complet">Complet</option>
                            <option value="premium">Premium</option>
                            <option value="express">Express</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                    </div>

                    {/* <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="active"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                            Rendre ce service actif ?
                        </label>
                    </div> */}

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {service ? 'Modifier' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceModal;



// import React, { useState } from 'react';

// const ServiceModal = ({ service, onClose }) => {
//     const [formData, setFormData] = useState({
//         name: service?.name || '',
//         price: service?.price || '',
//         duration: service?.duration || '',
//         description: service?.description || '',
//         active: service?.active ?? true
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Envoyer à l\'API :', formData);
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//                 <h3 className="text-lg font-semibold mb-4">
//                     {service ? 'Modifier le Service' : 'Nouveau Service'}
//                 </h3>

//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Service</label>
//                         <input
//                             type="text"
//                             value={formData.name}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             placeholder="Ex: Lavage Extérieur Complet"
//                             required
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Prix (MAD)</label>
//                             <input
//                                 type="number"
//                                 value={formData.price}
//                                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
//                             <input
//                                 type="number"
//                                 value={formData.duration}
//                                 onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                         <textarea
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                             rows="3"
//                         />
//                     </div>

//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             id="active"
//                             checked={formData.active}
//                             onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                         />
//                         <label htmlFor="active" className="ml-2 text-sm text-gray-700">Service actif</label>
//                     </div>

//                     <div className="flex gap-3 mt-6">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                         >
//                             Annuler
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                         >
//                             {service ? 'Modifier' : 'Créer'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ServiceModal;