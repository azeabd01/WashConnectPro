// src/components/ServiceCard.jsx
import React from 'react';
import { DollarSign, Clock, Eye, Edit, Trash2 } from 'lucide-react';

const ServiceCard = ({ service, onEdit, onView, onDelete, onToggle }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <span
                            onClick={onToggle}
                            className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 ${service.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                        >
                            {service.isActive ? 'Actif' : 'Inactif'}
                        </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>{service.price} MAD</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{service.duration} min</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onEdit} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Edit size={18} />
                    </button>
                    {/* <button onClick={onView} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Eye size={18} />
                    </button> */}
                    <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;






// import React from 'react';
// import { DollarSign, Clock, Eye, Edit } from 'lucide-react';

// const ServiceCard = ({ service, onEdit, onView }) => {
//     return (
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                             }`}>
//                             {service.active ? 'Actif' : 'Inactif'}
//                         </span>
//                     </div>
//                     <div className="flex items-center gap-6 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                             <DollarSign size={16} />
//                             <span>{service.price} MAD</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <Clock size={16} />
//                             <span>{service.duration} min</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <button onClick={onEdit} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                         <Edit size={18} />
//                     </button>
//                     <button onClick={onView} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                         <Eye size={18} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServiceCard;
