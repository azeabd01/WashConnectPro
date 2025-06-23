// pages/dashboard/ServicesTab.jsx
import React, { useState } from 'react';
import ServiceCard from '../../components/ServiceCard';
import ServiceModal from '../../components/ServiceModal';

const ServicesTab = () => {
    const [services, setServices] = useState([
        { id: 1, name: 'Lavage extérieur', price: 50, duration: 20, active: true },
        { id: 2, name: 'Nettoyage intérieur', price: 70, duration: 30, active: true },
        { id: 3, name: 'Pack complet', price: 120, duration: 45, active: false }
    ]);

    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEditService = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
        setShowModal(false);
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((s) => (
                    <ServiceCard
                        key={s.id}
                        service={s}
                        onEdit={() => handleEditService(s)}
                        onView={() => alert('Détails non encore implémentés')}
                    />
                ))}
            </div>

            {showModal && (
                <ServiceModal
                    service={selectedService}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ServicesTab;
