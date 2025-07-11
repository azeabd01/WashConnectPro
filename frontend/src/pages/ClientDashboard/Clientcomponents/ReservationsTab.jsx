
// ReservationsTab.jsx
import React from "react";
import { Car, Calendar, Clock, MapPin, Star, Eye, Phone, Plus } from "lucide-react";
import { getStatusColor, getStatusIcon } from "../utils/statusHelpers";

const ReservationsTab = ({ reservations }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Mes Réservations</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nouvelle Réservation
                </button>
            </div>

            <div className="grid gap-4">
                {reservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Car className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {reservation.provider}
                                    </h3>
                                    <p className="text-gray-600">{reservation.service}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">{reservation.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                                    reservation.status
                                )}`}
                            >
                                {getStatusIcon(reservation.status)}
                                {reservation.status}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{reservation.location}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">{reservation.price} MAD</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationsTab;



// import React, { useState } from "react";
// import { Car, Calendar, Clock, MapPin, Star, Eye, Phone, Plus, X, DollarSign, User, FileText } from "lucide-react";
// import { getStatusColor, getStatusIcon } from "../utils/statusHelpers";

// // BookingModal Component intégré
// const BookingModal = ({
//     isOpen,
//     onClose,
//     service,
//     onBookingSubmit,
//     timeSlots = [],
//     setTimeSlots = () => { },
//     navigate,
//     isAuthenticated = true // Le client est déjà connecté dans le dashboard
// }) => {
//     const [formData, setFormData] = useState({
//         clientName: '',
//         clientPhone: '',
//         clientEmail: '',
//         scheduledDate: '',
//         scheduledTime: '',
//         vehicleInfo: {
//             make: '',
//             model: '',
//             year: '',
//             licensePlate: ''
//         },
//         notes: ''
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [errors, setErrors] = useState({});

//     // Charger les informations du client depuis le localStorage
//     React.useEffect(() => {
//         if (isAuthenticated && isOpen) {
//             const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
//             setFormData(prev => ({
//                 ...prev,
//                 clientName: clientData.name || '',
//                 clientPhone: clientData.phone || '',
//                 clientEmail: clientData.email || ''
//             }));
//         }
//     }, [isOpen, isAuthenticated]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name.startsWith('vehicle.')) {
//             const field = name.split('.')[1];
//             setFormData(prev => ({
//                 ...prev,
//                 vehicleInfo: {
//                     ...prev.vehicleInfo,
//                     [field]: value
//                 }
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }

//         // Nettoyer les erreurs lors de la saisie
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     const fetchAvailableSlots = async (selectedDate) => {
//         if (!service?._id || !service?.providerId?._id) {
//             console.error('❌ Service ou providerId manquant:', { service });
//             setTimeSlots([]);
//             return;
//         }

//         try {
//             const response = await fetch(
//                 `/api/public/availability?providerId=${service.providerId._id}&date=${selectedDate}&duration=${service.duration}`
//             );

//             if (!response.ok) {
//                 throw new Error(`Erreur HTTP ${response.status}`);
//             }

//             const data = await response.json();
//             const slotsWithEnd = data.slots.map(start => {
//                 const [hour, minute] = start.split(':').map(Number);
//                 const startDate = new Date();
//                 startDate.setHours(hour, minute, 0, 0);
//                 const endDate = new Date(startDate.getTime() + (service.duration || 30) * 60000);
//                 const end = endDate.toTimeString().slice(0, 5);
//                 return { start, end };
//             });

//             setTimeSlots(slotsWithEnd);
//         } catch (error) {
//             console.error('❌ Erreur lors de la récupération des créneaux:', error);
//             setTimeSlots([]);
//         }
//     };

//     const handleDateChange = (e) => {
//         const selectedDate = e.target.value;
//         setFormData(prev => ({ ...prev, scheduledDate: selectedDate, scheduledTime: '' }));

//         if (selectedDate && service) {
//             fetchAvailableSlots(selectedDate);
//         } else {
//             setTimeSlots([]);
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.clientName.trim()) newErrors.clientName = 'Le nom est requis';
//         if (!formData.clientPhone.trim()) newErrors.clientPhone = 'Le téléphone est requis';
//         if (!formData.scheduledDate) newErrors.scheduledDate = 'La date est requise';
//         if (!formData.scheduledTime) newErrors.scheduledTime = 'L\'heure est requise';

//         if (formData.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
//             newErrors.clientEmail = 'Format d\'email invalide';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async () => {
//         if (!validateForm()) return;

//         setIsSubmitting(true);

//         try {
//             const [startTime, endTime] = formData.scheduledTime.split(' - ');
//             const clientId = localStorage.getItem('clientId');

//             const bookingData = {
//                 clientId,
//                 clientName: formData.clientName,
//                 clientPhone: formData.clientPhone,
//                 clientEmail: formData.clientEmail,
//                 serviceId: service._id,
//                 providerId: service.providerId._id,
//                 date: formData.scheduledDate,
//                 startTime: startTime.trim(),
//                 endTime: endTime.trim(),
//                 price: service.price,
//                 vehicleInfo: formData.vehicleInfo,
//                 notes: formData.notes
//             };

//             await onBookingSubmit(bookingData);
//             onClose();

//         } catch (error) {
//             console.error('❌ Erreur réservation:', error);
//             alert('Erreur lors de la réservation. Veuillez réessayer.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!isOpen || !service) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                 {/* Header */}
//                 <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h2 className="text-2xl font-bold">Nouvelle Réservation</h2>
//                             <p className="text-blue-100 mt-1">{service.name}</p>
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="p-2 hover:bg-white/20 rounded-full transition-colors"
//                         >
//                             <X size={24} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Service Info */}
//                 <div className="p-6 bg-gray-50 border-b">
//                     <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                                 <Car className="text-blue-600" size={24} />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-900">{service.name}</h3>
//                                 <p className="text-sm text-gray-600">{service.providerId.businessName}</p>
//                             </div>
//                         </div>
//                         <div className="text-right">
//                             <div className="flex items-center text-green-600 font-bold text-xl">
//                                 <DollarSign size={20} />
//                                 <span>{service.price} MAD</span>
//                             </div>
//                             <div className="flex items-center text-gray-600 text-sm">
//                                 <Clock size={16} className="mr-1" />
//                                 <span>{service.duration} min</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <div className="p-6 space-y-6">
//                     {/* Informations Client */}
//                     <div className="space-y-4">
//                         <h4 className="flex items-center text-lg font-semibold text-gray-900">
//                             <User className="mr-2" size={20} />
//                             Informations Client
//                             <span className="ml-2 text-sm text-green-600 font-normal">
//                                 (Connecté)
//                             </span>
//                         </h4>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Nom complet *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="clientName"
//                                     value={formData.clientName}
//                                     onChange={handleInputChange}
//                                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                         errors.clientName ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                     placeholder="Votre nom complet"
//                                 />
//                                 {errors.clientName && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Téléphone *
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     name="clientPhone"
//                                     value={formData.clientPhone}
//                                     onChange={handleInputChange}
//                                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                         errors.clientPhone ? 'border-red-500' : 'border-gray-300'
//                                     }`}
//                                     placeholder="0123456789"
//                                 />
//                                 {errors.clientPhone && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
//                                 )}
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="clientEmail"
//                                 value={formData.clientEmail}
//                                 onChange={handleInputChange}
//                                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.clientEmail ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="votre@email.com"
//                             />
//                             {errors.clientEmail && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Sélection du service */}
//                     <div className="space-y-4">
//                         <h4 className="flex items-center text-lg font-semibold text-gray-900">
//                             <Car className="mr-2" size={20} />
//                             Sélection du Service
//                         </h4>
//                         <div className="p-4 bg-blue-50 rounded-lg">
//                             <p className="text-sm text-gray-600 mb-2">
//                                 Pour créer une nouvelle réservation, veuillez d'abord sélectionner un service depuis la page d'accueil ou la liste des services.
//                             </p>
//                             <button
//                                 onClick={() => navigate('/')}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Parcourir les services
//                             </button>
//                         </div>
//                     </div>

//                     {/* Date et Heure - Visible seulement si un service est sélectionné */}
//                     {service && (
//                         <div className="space-y-4">
//                             <h4 className="flex items-center text-lg font-semibold text-gray-900">
//                                 <Calendar className="mr-2" size={20} />
//                                 Date et Heure
//                             </h4>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Date *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="scheduledDate"
//                                         value={formData.scheduledDate}
//                                         onChange={handleDateChange}
//                                         min={new Date().toISOString().split('T')[0]}
//                                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                             errors.scheduledDate ? 'border-red-500' : 'border-gray-300'
//                                         }`}
//                                     />
//                                     {errors.scheduledDate && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Créneau * (Durée: {service.duration} min)
//                                     </label>
//                                     <select
//                                         name="scheduledTime"
//                                         value={formData.scheduledTime}
//                                         onChange={handleInputChange}
//                                         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                             errors.scheduledTime ? 'border-red-500' : 'border-gray-300'
//                                         }`}
//                                         disabled={!formData.scheduledDate}
//                                     >
//                                         <option value="">Choisir un créneau</option>
//                                         {timeSlots.map((slot, index) => (
//                                             <option key={index} value={`${slot.start} - ${slot.end}`}>
//                                                 {slot.start} → {slot.end}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.scheduledTime && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.scheduledTime}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Informations Véhicule */}
//                     <div className="space-y-4">
//                         <h4 className="flex items-center text-lg font-semibold text-gray-900">
//                             <Car className="mr-2" size={20} />
//                             Informations Véhicule
//                         </h4>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Marque
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="vehicle.make"
//                                     value={formData.vehicleInfo.make}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="BMW, Mercedes, etc."
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Modèle
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="vehicle.model"
//                                     value={formData.vehicleInfo.model}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="X5, C-Class, etc."
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Année
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="vehicle.year"
//                                     value={formData.vehicleInfo.year}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="2020"
//                                     min="1990"
//                                     max="2025"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Immatriculation
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="vehicle.licensePlate"
//                                     value={formData.vehicleInfo.licensePlate}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="123-A-456"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Notes */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             <FileText className="inline mr-1" size={16} />
//                             Notes supplémentaires
//                         </label>
//                         <textarea
//                             name="notes"
//                             value={formData.notes}
//                             onChange={handleInputChange}
//                             rows={3}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Informations supplémentaires, demandes spéciales..."
//                         />
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
//                     <div className="flex items-center justify-between">
//                         <div className="text-sm text-gray-600">
//                             {service ? (
//                                 <>Total: <span className="font-bold text-green-600 text-lg">{service.price} MAD</span></>
//                             ) : (
//                                 <span className="text-gray-500">Sélectionnez d'abord un service</span>
//                             )}
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Fermer
//                             </button>
//                             {service && (
//                                 <button
//                                     type="button"
//                                     onClick={handleSubmit}
//                                     disabled={isSubmitting}
//                                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
//                                 >
//                                     {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Composant principal ReservationsTab
// const ReservationsTab = ({ 
//     reservations, 
//     onBookingSubmit, 
//     navigate = () => {} 
// }) => {
//     const [showBookingModal, setShowBookingModal] = useState(false);
//     const [selectedService, setSelectedService] = useState(null);
//     const [timeSlots, setTimeSlots] = useState([]);

//     // Fonction pour ouvrir le modal de réservation
//     const handleNewReservation = () => {
//         // Pour l'instant, on ouvre le modal sans service spécifique
//         // L'utilisateur sera guidé pour sélectionner un service
//         setSelectedService({
//             _id: '',
//             name: '',
//             price: 0,
//             duration: 30,
//             description: '',
//             providerId: {
//                 _id: '',
//                 businessName: ''
//             }
//         });
//         setShowBookingModal(true);
//     };

//     // Fonction pour fermer le modal
//     const handleCloseModal = () => {
//         setShowBookingModal(false);
//         setSelectedService(null);
//         setTimeSlots([]);
//     };

//     // Fonction pour gérer la soumission d'une réservation
//     const handleBookingSubmit = async (bookingData) => {
//         try {
//             await onBookingSubmit(bookingData);
//             handleCloseModal();
//             // Optionnel : rafraîchir la liste des réservations
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//             throw error;
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-900">Mes Réservations</h2>
//                 <button 
//                     onClick={handleNewReservation}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                 >
//                     <Plus className="w-4 h-4" />
//                     Nouvelle Réservation
//                 </button>
//             </div>

//             {/* Liste des réservations existantes */}
//             <div className="grid gap-4">
//                 {reservations && reservations.length > 0 ? (
//                     reservations.map((reservation) => (
//                         <div
//                             key={reservation.id}
//                             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//                         >
//                             <div className="flex justify-between items-start mb-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                                         <Car className="w-8 h-8 text-white" />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-lg text-gray-900">
//                                             {reservation.provider}
//                                         </h3>
//                                         <p className="text-gray-600">{reservation.service}</p>
//                                         <div className="flex items-center gap-2 mt-1">
//                                             <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                                             <span className="text-sm text-gray-600">{reservation.rating}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div
//                                     className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
//                                         reservation.status
//                                     )}`}
//                                 >
//                                     {getStatusIcon(reservation.status)}
//                                     {reservation.status}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                                 <div className="flex items-center gap-2">
//                                     <Calendar className="w-4 h-4 text-gray-400" />
//                                     <span className="text-sm text-gray-600">{reservation.date}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Clock className="w-4 h-4 text-gray-400" />
//                                     <span className="text-sm text-gray-600">{reservation.time}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <MapPin className="w-4 h-4 text-gray-400" />
//                                     <span className="text-sm text-gray-600">{reservation.location}</span>
//                                 </div>
//                             </div>

//                             <div className="flex justify-between items-center">
//                                 <span className="text-lg font-semibold text-gray-900">{reservation.price} MAD</span>
//                                 <div className="flex gap-2">
//                                     <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//                                         <Eye className="w-4 h-4" />
//                                     </button>
//                                     <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
//                                         <Phone className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center py-12">
//                         <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
//                         <p className="text-gray-600 mb-4">Vous n'avez pas encore de réservations.</p>
//                         <button
//                             onClick={handleNewReservation}
//                             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
//                         >
//                             <Plus className="w-5 h-5" />
//                             Créer ma première réservation
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Modal de réservation */}
//             {showBookingModal && (
//                 <BookingModal
//                     isOpen={showBookingModal}
//                     onClose={handleCloseModal}
//                     service={selectedService}
//                     onBookingSubmit={handleBookingSubmit}
//                     timeSlots={timeSlots}
//                     setTimeSlots={setTimeSlots}
//                     navigate={navigate}
//                 />
//             )}
//         </div>
//     );
// };

// export default ReservationsTab;
