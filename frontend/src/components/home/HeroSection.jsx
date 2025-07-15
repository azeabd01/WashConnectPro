import React, { useState, useEffect } from 'react';
import { Car, ArrowRight, MapPin, Clock, Bell, ShoppingCart, Star, Users, Wrench, Package, Play, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            id: 'clients',
            title: 'Pour les Clients',
            subtitle: 'Réservez en 3 clics',
            description: 'Trouvez le centre de lavage le plus proche, réservez votre créneau et suivez votre lavage en temps réel.',
            image: 'https://images.thebusinessplanshop.com/2379/modele-business-plan-station-de-lavage-thumbnail.png',
            // displayImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: <Users className="w-12 h-12" />,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-900/20 to-cyan-900/20',
            features: ['Géolocalisation intelligente', 'Réservation instantanée', 'Paiement sécurisé', 'Suivi en temps réel'],
            link:'/auth/login/client'
        },
        {
            id: 'providers',
            title: ' les Prestataires de Lavage',
            subtitle: 'Développez votre activité',
            description: 'Gérez vos réservations, optimisez vos créneaux et augmentez votre chiffre d\'affaires avec notre plateforme.',
            image: 'https://arperformance.fr/wp-content/uploads/2024/04/Le-lavage-de-voiture-un-geste-essentiel-pour-son-entretien.jpeg',
            // displayImage: 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            icon: <Wrench className="w-12 h-12" />,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-900/20 to-emerald-900/20',
            features: ['Gestion des réservations', 'Tableau de bord complet', 'Paiements automatiques', 'Analytics avancées'],
            link:'/auth/login/provider'

        },
        {
            id: 'suppliers',
            title: 'Pour les Fournisseurs',
            subtitle: 'Vendez vos produits',
            description: 'Accédez à un réseau de centres de lavage et vendez directement vos produits aux professionnels.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYiig1HxRLONjl4AfARylgJ95FPP3WtnZ_sA&s',
            // displayImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vy4u0UskevRS6Zd0O4upn2JQO6XSkIt-za6cFbgWgjyOZ4OD_vrJlLXUZSS1LDI-Ym8&usqp=CAU',
            icon: <Package className="w-12 h-12" />,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-900/20 to-pink-900/20',
            features: ['Marketplace intégré', 'Commandes automatisées', 'Livraison trackée', 'Facturation simplifiée'],
            link:'/auth/login/product'

        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <section className="relative min-h-screen overflow-hidden from-blue-500 to-cyan-500 via-slate-800 to-slate-900">
            {/* Dynamic Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 opacity-30">
                <img 
                    src={currentSlideData.image} 
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover transition-all duration-1000"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left Content */}
                    <div className="text-white">
                        {/* <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium  border border-white/20">
                            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                            Lamsa Maghribiya - Écosystème Complet
                        </div> */}

                        {/* <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${currentSlideData.gradient} mb-6 transition-all duration-500`}> */}
                            {/* {currentSlideData.icon} */}
                        {/* </div> */}

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            <span className="block text-white/90">{currentSlideData.title.split(' ')[0]}</span>
                            <span className={`bg-gradient-to-r ${currentSlideData.gradient} bg-clip-text text-transparent`}>
                                {currentSlideData.title.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-6">
                            {currentSlideData.subtitle}
                        </h2>

                        <p className="text-xl text-white-300 mb-8 leading-relaxed">
                            {currentSlideData.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {currentSlideData.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSlideData.gradient}`}></div>
                                    <span className="text-sm text-white-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className={`group relative overflow-hidden bg-gradient-to-r ${currentSlideData.gradient} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                                <div className="relative flex items-center space-x-3">
                                    <Link to={currentSlideData.link}>Commencer Maintenant</Link >
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </button>
                            <button className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                                <Play className="w-5 h-5" />
                                <span>Voir la Démo</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Main Display Image */}
                    <div className="relative">
                        {/* Main Hero Image */}
                        <div className="relative mb-8">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                {/* <img 
                                    src={currentSlideData.displayImage} 
                                    alt={currentSlideData.title}
                                    className="w-full h-96 object-cover transition-all duration-1000"
                                /> */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${currentSlideData.bgGradient} via-transparent to-transparent`}></div>
                                
                                {/* Floating Elements */}
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${currentSlideData.gradient} flex items-center justify-center`}>
                                        {currentSlideData.icon}
                                    </div>
                                </div>
                                
                                {/* <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 animate-bounce">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-white text-sm font-medium">En ligne</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex justify-center space-x-4 mb-8">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-16 h-16 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                                        index === currentSlide 
                                            ? `bg-gradient-to-r ${currentSlideData.gradient} shadow-lg` 
                                            : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                                    }`}
                                >
                                    {slides[index].icon}
                                </button>
                            ))}
                        </div>

                        {/* Stats Cards */}
                        {/* <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                                <div className="text-gray-400">Utilisateurs actifs</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">500+</div>
                                <div className="text-gray-400">Partenaires</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">50+</div>
                                <div className="text-gray-400">Fournisseurs</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                                <div className="text-3xl font-bold text-white mb-2">4.9★</div>
                                <div className="text-gray-400">Satisfaction</div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30'
                        }`}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .slide-content {
                    animation: slideIn 0.8s ease-out;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;