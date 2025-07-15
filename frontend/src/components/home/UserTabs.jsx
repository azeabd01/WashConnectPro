import { useState } from 'react';
import {
    Car,
    BarChart3,
    Package,
    CheckCircle,
    MapPin,
    Bell,
    ShoppingCart,
    AlertCircle,
    CreditCard,
    TrendingUp,
    Users,
    Settings,      
    UserCheck,     
    Database,      
    Eye,           
    Shield  
} from 'lucide-react';

const userTypes = [
    {
        id: 'clients',
        title: 'Clients',
        icon: <Car className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        description: 'Réservez facilement vos lavages de voiture. Choisissez vos services et profitez d\'une expérience premium.',
        features: [
            { icon: <CheckCircle className="w-5 h-5" />, text: 'Réservation en quelques clics' },
            { icon: <MapPin className="w-5 h-5" />, text: 'Géolocalisation des centres' },
            { icon: <Bell className="w-5 h-5" />, text: 'Notifications en temps réel' },
            { icon: <ShoppingCart className="w-5 h-5" />, text: 'Boutique en ligne intégrée' }
        ]
    },
    {
        id: 'provider',
        title: 'Prestataire de Lavage',
        icon: <BarChart3 className="w-6 h-6" />,
        color: 'from-emerald-500 to-teal-500',
        description: 'Optimisez votre activité avec nos outils de gestion avancés. Augmentez votre visibilité et vos revenus.',
        features: [
            { icon: <BarChart3 className="w-5 h-5" />, text: 'Tableau dédié' },
            { icon: <AlertCircle className="w-5 h-5" />, text: 'Alertes instantanées' },
            { icon: <CreditCard className="w-5 h-5" />, text: 'Suivi financier' },
            { icon: <TrendingUp className="w-5 h-5" />, text: 'Analytiques détaillés' }
        ]
    },
    {
        id: 'products',
        title: 'Produits',
        icon: <Package className="w-6 h-6" />,
        color: 'from-purple-500 to-pink-500',
        description: 'Vendez vos produits sur notre marketplace. Accédez à un réseau de centres et clients qualifiés.',
        features: [
            { icon: <Package className="w-5 h-5" />, text: 'Marketplace intégrée' },
            { icon: <TrendingUp className="w-5 h-5" />, text: 'Gestion des stocks' },
            { icon: <BarChart3 className="w-5 h-5" />, text: 'Suivi des ventes' },
            { icon: <Users className="w-5 h-5" />, text: 'Réseau de partenaires' }
        ]
    },
    // {
    //     id: 'admin',
    //     title: 'Dashboard Administrateur',
    //     icon: <Settings className="w-6 h-6" />,
    //     color: 'from-orange-500 to-red-500',
    //     description: 'Gérez tous les utilisateurs et contrôlez l\'ensemble de la plateforme avec des outils d\'administration complets.',
    //     features: [
    //         { icon: <UserCheck className="w-5 h-5" />, text: 'Gestion des utilisateurs (CRUD)' },
    //         { icon: <Database className="w-5 h-5" />, text: 'Contrôle commandes & services' },
    //         { icon: <Eye className="w-5 h-5" />, text: 'Statistiques & analytics' },
    //         { icon: <Shield className="w-5 h-5" />, text: 'Modération & paiements' }
    //     ]
    // }
];

export default function UserTabs() {
    const [activeTab, setActiveTab] = useState('clients');

    return (
        <section id="solutions" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Une Solution Pour
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Chaque Profil</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez comment notre plateforme s'adapte à vos besoins spécifiques
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-4xl p-2 shadow-lg">
                        {userTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setActiveTab(type.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${activeTab === type.id
                                    ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                type="button"
                            >
                                {type.icon}
                                <span>{type.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-4xl mx-auto relative min-h-[240px]">
                    {userTypes.map((type) => (
                        <div
                            key={type.id}
                            className={`transition-all duration-500 ${activeTab === type.id ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute top-0 left-0 w-full'
                                }`}
                        >
                            {activeTab === type.id && (
                                <div className="bg-white rounded-2xl p-8 shadow-xl">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.color} text-white mb-6`}>
                                                {type.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                                Pour les {type.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                {type.description}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            {type.features.map((feature, index) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <div className={`text-white bg-gradient-to-r ${type.color} p-2 rounded-lg`}>
                                                        {feature.icon}
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




