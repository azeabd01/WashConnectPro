import { useState, useEffect } from 'react';
import { Car, Menu, X } from 'lucide-react';

export default function Navbar({ onAuthClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/'; // ou navigate('/') si tu utilises `useNavigate`
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-gray-900">CarWash</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Pro</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
                        <a href="#solutions" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Solutions</a>
                        <a href="#tarifs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Tarifs</a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-800 font-medium">Bonjour, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                type="button"
                                onClick={onAuthClick}
                            >
                                Connexion
                            </button>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        type="button"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                    <div className="px-4 py-6 space-y-4">
                        <a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
                        <a href="#solutions" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Solutions</a>
                        <a href="#tarifs" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Tarifs</a>
                        <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
                        {user ? (
                            <>
                                <div className="text-gray-700 font-medium">Bonjour, {user.name}</div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500 text-white px-6 py-3 rounded-full font-semibold"
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <button
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold"
                                type="button"
                                onClick={onAuthClick}
                            >
                                Connexion
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
