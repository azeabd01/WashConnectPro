import React, { useState, useEffect } from 'react';
import ServiceCard from '../../components/ServiceCard';
import ServiceModal from '../../components/ServiceModal';
import {
    fetchServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus
} from '../../api/servicesApi';
import { toast } from 'sonner';

const ServicesTab = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await fetchServices();
            setServices(data.services);
        } catch (err) {
            toast.error('Erreur lors du chargement des services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleEditService = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Supprimer ce service ?')) return;
        try {
            await deleteService(id);
            toast.success('Service supprimé avec succès');
            loadServices();
        } catch (err) {
            toast.error(err.message || 'Erreur suppression service');
        }
    };

    const handleSaveService = async (serviceData) => {
        try {
            if (selectedService) {
                await updateService(selectedService._id, serviceData);
                toast.success('Service modifié');
            } else {
                await createService(serviceData);
                toast.success('Service ajouté');
            }
            setShowModal(false);
            setSelectedService(null);
            loadServices();
        } catch (err) {
            toast.error(err.message || 'Erreur lors de l\'enregistrement');
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const { service: updatedService } = await toggleServiceStatus(id);
            setServices((prev) =>
                prev.map((s) => (s._id === updatedService._id ? updatedService : s))
            );
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Liste des Services</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    + Ajouter un Service
                </button>
            </div>

            {loading ? (
                <p className="text-gray-500">Chargement des services...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {services.map((s) => (
                        <ServiceCard
                            key={s._id}
                            service={s}
                            onEdit={() => handleEditService(s)}
                            onDelete={() => handleDeleteService(s._id)}
                            // onView={() => handleView(s)}
                            // onView={() => alert('Détails non encore implémentés')}
                            onToggle={() => handleToggleStatus(s._id)} // ✅ nouvelle action
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveService}
                />
            )}
        </>
    );
};

export default ServicesTab;



// // pages/dashboard/ServicesTab.jsx
// import React, { useState } from 'react';
// import ServiceCard from '../../components/ServiceCard';
// import ServiceModal from '../../components/ServiceModal';

// const ServicesTab = () => {
//     const [services, setServices] = useState([
//         { id: 1, name: 'Lavage extérieur', price: 50, duration: 20, active: true },
//         { id: 2, name: 'Nettoyage intérieur', price: 70, duration: 30, active: true },
//         { id: 3, name: 'Pack complet', price: 120, duration: 45, active: false }
//     ]);

//     const [selectedService, setSelectedService] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const handleEditService = (service) => {
//         setSelectedService(service);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setSelectedService(null);
//         setShowModal(false);
//     };

//     return (
//         <>
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Liste des Services</h2>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//                 >
//                     + Ajouter un Service
//                 </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {services.map((s) => (
//                     <ServiceCard
//                         key={s.id}
//                         service={s}
//                         onEdit={() => handleEditService(s)}
//                         onView={() => alert('Détails non encore implémentés')}
//                     />
//                 ))}
//             </div>

//             {showModal && (
//                 <ServiceModal
//                     service={selectedService}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </>
//     );
// };

// export default ServicesTab;
