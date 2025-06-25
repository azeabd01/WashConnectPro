import { Car, MapPin, Star, Shield } from 'lucide-react';

const stats = [
    { number: '10K+', label: 'Réservations', icon: <Car className="w-6 h-6" /> },
    { number: '500+', label: 'Centres Partenaires', icon: <MapPin className="w-6 h-6" /> },
    { number: '98%', label: 'Satisfaction Client', icon: <Star className="w-6 h-6" /> },
    { number: '24/7', label: 'Support', icon: <Shield className="w-6 h-6" /> }
];

export default function StatsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




