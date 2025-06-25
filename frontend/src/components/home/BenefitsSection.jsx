import { Smartphone, Clock, Shield, Award } from 'lucide-react';

const benefits = [
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: 'Flexibilité',
        description: 'Lavage de voiture, services à la carte adaptés à vos besoins'
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: 'Gain de Temps',
        description: 'Réservation en ligne, géolocalisation automatique des centres'
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: 'Transparence',
        description: 'Prix clairs, notifications temps réel, suivi complet'
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: 'Opportunité Business',
        description: 'Plateforme complète pour laveurs et fournisseurs et les Clients'
    }
];

export default function BenefitsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Pourquoi Choisir <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">CarWashPro</span> ?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Simplifiez le lavage automobile grâce à notre solution digitale innovante.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {benefits.map((item, index) => (
                        <div key={index} className="text-center p-8 border rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <div className="mx-auto mb-6 text-blue-500">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




