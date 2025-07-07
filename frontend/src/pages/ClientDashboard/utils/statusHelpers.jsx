// src/utils / statusHelpers.js
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

export const getStatusColor = (status) => {
    switch (status) {
        case 'confirmé': return 'bg-blue-100 text-blue-800';
        case 'en_cours': return 'bg-yellow-100 text-yellow-800';
        case 'terminé': return 'bg-green-100 text-green-800';
        case 'annulé': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusIcon = (status) => {
    switch (status) {
        case 'confirmé': return <CheckCircle className="w-4 h-4" />;
        case 'en_cours': return <AlertCircle className="w-4 h-4" />;
        case 'terminé': return <CheckCircle className="w-4 h-4" />;
        case 'annulé': return <XCircle className="w-4 h-4" />;
        default: return <Clock className="w-4 h-4" />;
    }
};
