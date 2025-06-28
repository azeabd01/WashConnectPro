import { Car, MapPin, Bell, ShoppingCart, ArrowRight, Star, Clock } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Car className="w-4 h-4 mr-2" />
                            Solution SAAS Innovante
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            La Révolution du
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"> Lavage Auto</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Réservez un lavage professionnel <strong> pour votre voiture</strong>.
                            Notre plateforme 100% digitalisée connecte clients, centres de lavage et product.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                                <span>Commencer Gratuitement</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                                Voir la Démo
                            </button>
                        </div>

                        {/* Features Preview */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <MapPin className="w-5 h-5" />, text: 'Géolocalisation' },
                                { icon: <Clock className="w-5 h-5" />, text: 'Réservation 24/7' },
                                { icon: <Bell className="w-5 h-5" />, text: 'Notifications' },
                                { icon: <ShoppingCart className="w-5 h-5" />, text: 'Boutique intégrée' }
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-gray-600">
                                    <div className="text-blue-500">{feature.icon}</div>
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Lavage automobile professionnel"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>

                            {/* Floating Cards */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-float">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium">En ligne</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-medium">4.9/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



