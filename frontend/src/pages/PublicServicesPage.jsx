import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { Car, Clock, DollarSign, MapPin, Building, Star, Filter, ArrowLeft } from 'lucide-react'; // <-- Import ArrowLeft
import { fetchAvailableTimeSlots } from '../api/publicServicesApi';
import BookingModal from '../components/BookingModal'; // ← importe le composant

// IMPORT DE LA FONCTION API (à adapter selon ton projet)
import { fetchPublicServices } from '../api/publicServicesApi';

const PublicServicesPage = () => {
    const navigate = useNavigate(); // <-- Initialise navigate

    const [timeSlots, setTimeSlots] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedService, setSelectedService] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [isProvider, setIsProvider] = useState(false);

    const categories = [
        { value: 'all', label: 'Tous les services' },
        { value: 'exterieur', label: 'Extérieur' },
        { value: 'interieur', label: 'Intérieur' },
        { value: 'complet', label: 'Complet' },
        { value: 'premium', label: 'Premium' },
        { value: 'express', label: 'Express' }
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role === 'provider') {
            setIsProvider(true);
        }
    }, []);

    useEffect(() => {
        loadServices();
    }, []);

    useEffect(() => {
        filterServices();
    }, [services, selectedCategory]);

    const loadServices = async () => {
        try {
            setLoading(true);
            const fetchedServices = await fetchPublicServices(); // ✅ retourne un tableau
            const activeServices = fetchedServices.filter(service => service.isActive === true);

            setServices(activeServices); // ✅ met directement les services
        } catch (err) {
            console.error('Erreur chargement services:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterServices = () => {
        if (selectedCategory === 'all') {
            setFilteredServices(services);
        } else {
            setFilteredServices(services.filter(service => service.category === selectedCategory));
        }
    };

    const handleBookService = async (service) => {
        setSelectedService(service);
        setShowBookingModal(true);

        // 👇 Récupération des créneaux disponibles en fonction du service
        try {
            const date = new Date().toISOString().split('T')[0]; // aujourd’hui
            const duration = service.duration;
            const providerId = service.providerId._id;

            const slots = await fetchAvailableTimeSlots(providerId, date, duration);
            setTimeSlots(slots); // mise à jour des créneaux dans le modal
        } catch (error) {
            console.error("Erreur lors du chargement des créneaux :", error);
            setTimeSlots([]); // pour ne pas planter le modal
        }
    };


    const handleBookingSubmit = async (bookingData) => {
        try {
            // 1. Récupérer les données utilisateur depuis localStorage
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('token');

            // 2. Vérifier que l'utilisateur est connecté
            if (!userData.id && !userData._id) {
                throw new Error('Utilisateur non connecté');
            }

            // 3. Préparer les données avec les bons noms de champs
            const requestData = {
                // Client info - récupérer depuis localStorage
                clientId: userData.id || userData._id,
                clientName: userData.name || bookingData.clientName,
                clientPhone: userData.phone || bookingData.clientPhone,
                clientEmail: userData.email || bookingData.clientEmail,

                // Service info
                providerId: bookingData.providerId,
                serviceId: bookingData.serviceId,

                // ✅ CORRECTION: Date et heure - utiliser les bons noms de champs
                scheduledDate: bookingData.date, // Le backend attend "scheduledDate"
                scheduledTime: `${bookingData.startTime} - ${bookingData.endTime}`, // ✅ Format correct pour le backend

                // Autres infos
                price: bookingData.price,
                notes: bookingData.notes || '',
                vehicleInfo: bookingData.vehicleInfo
            };

            console.log('Données envoyées:', requestData);

            // 4. Envoyer la requête
            const response = await fetch('http://localhost:3000/api/public/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Erreur lors de la réservation');
            }

            // 5. Succès
            console.log('Réservation créée avec succès:', result);
            alert('Réservation confirmée avec succès !');

            // Fermer le modal ou rediriger si nécessaire
            // setShowBookingModal(false);

        } catch (error) {
            console.error('Erreur réservation:', error);
            alert('Erreur lors de la réservation: ' + error.message);
        }
    };

    const getCategoryLabel = (category) => {
        const cat = categories.find(c => c.value === category);
        return cat ? cat.label : category;
    };

    const getCategoryColor = (category) => {
        const colors = {
            exterieur: 'bg-blue-100 text-blue-800',
            interieur: 'bg-green-100 text-green-800',
            complet: 'bg-purple-100 text-purple-800',
            premium: 'bg-yellow-100 text-yellow-800',
            express: 'bg-red-100 text-red-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Bouton retour à l'accueil */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
                        type="button"
                    >
                        <ArrowLeft size={20} />
                        <span>Retour à l'accueil</span>
                    </button>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Nos Services de Lavage</h1>
                            <p className="text-xl text-blue-100">
                                Découvrez tous nos services professionnels disponibles
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Filtres */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="text-gray-600" size={20} />
                            <h3 className="text-lg font-semibold text-gray-900">Filtrer par catégorie</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === category.value
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Services Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Chargement des services...</p>
                        </div>
                    ) : filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map((service) => (
                                <div
                                    key={service._id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                                    style={{ minHeight: '400px' }} // fixe la hauteur minimale
                                >
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                                    service.category
                                                )}`}
                                            >
                                                {getCategoryLabel(service.category)}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                            {service.description || 'Service de lavage professionnel'}
                                        </p>

                                        {/* Prix et durée */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-green-600 font-bold">
                                                <DollarSign size={20} />
                                                <span className="text-2xl">{service.price}</span>
                                                <span className="text-sm ml-1">MAD</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock size={16} />
                                                <span className="ml-1 text-sm">{service.duration} min</span>
                                            </div>
                                        </div>

                                        {/* Info Prestataire */}
                                        <div className="border-t pt-4 mb-4">
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <Building size={16} />
                                                <span className="ml-2 font-medium">{service.providerId.businessName}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={16} />
                                                <span className="ml-2 text-sm text-gray-500">
                                                    {service.providerId.address
                                                        ? `${service.providerId.address.street || ''} ${service.providerId.address.city || ''}`.trim()
                                                        : 'Adresse non disponible'}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <Star size={14} />
                                                <span className="ml-1">4.8 (124 avis)</span>
                                            </div>
                                        </div>

                                        {/* Bouton Réserver aligné en bas */}
                                        <button
                                            onClick={() => !isProvider && handleBookService(service)}
                                            disabled={isProvider}
                                            className={`w-full py-3 px-4 rounded-lg font-semibold mt-auto transition-all transform
                                                ${isProvider
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 hover:scale-105'
                                                }`}
                                        >
                                            {isProvider ? 'Réservation désactivée' : 'Réserver maintenant'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Car className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun service trouvé</h3>
                            <p className="mt-2 text-gray-600">
                                Aucun service ne correspond à vos critères de recherche.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de réservation */}

            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                service={selectedService}
                onBookingSubmit={handleBookingSubmit}
                timeSlots={timeSlots}
                setTimeSlots={setTimeSlots}
                navigate={navigate} // Passer la fonction navigate
            />
        </>
    );
};
export default PublicServicesPage;