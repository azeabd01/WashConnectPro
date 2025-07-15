import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onAuthClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Déterminer si on est dans un dashboard
    const isDashboard = location.pathname.includes('/dashboard/');
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Récupérer les données utilisateur du localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Erreur parsing user data:', error);
                localStorage.removeItem('user');
            }
        }
    }, [location.pathname]); // Re-check quand la route change

    const handleDashboardNavigation = () => {
        if (!user) {
            console.log('Aucun utilisateur connecté');
            return;
        }

        console.log('Utilisateur:', user); // Debug
        const userRole = user.role;
        let dashboardPath = '';

        switch (userRole) {
            case 'provider':  // Support des deux formats
                dashboardPath = '/dashboard/provider';
                break;
            case 'client':
                dashboardPath = '/dashboard/client';
                break;
            case 'product':  // Support des deux formats
                dashboardPath = '/dashboard/product';
                break;
            default:
                console.warn('Role utilisateur non reconnu:', userRole);
                return;
        }

        console.log('Navigation vers:', dashboardPath); // Debug

        // Fermer le menu mobile si ouvert
        setIsMenuOpen(false);

        // Naviguer vers le dashboard
        navigate(dashboardPath);
    };

    const handleLogout = () => {
        // Nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Mettre à jour l'état local
        setUser(null);

        // Redirection selon le contexte
        if (isDashboard) {
            // Si on est dans un dashboard, retourner au login approprié
            const userRole = user?.role;
            if (userRole === 'provider' || userRole === 'provider') {
                navigate('/auth/login/provider');
            } else if (userRole === 'client') {
                navigate('/auth/login/client');
            } else if (userRole === 'product' || userRole === 'product') {
                navigate('/auth/login/product');
            } else {
                navigate('/auth/login');
            }
        } else {
            // Si on est sur la page d'accueil, recharger la page
            window.location.reload();
        }
    };

    // ✅ SUPPRIMÉ : Ne plus masquer la navbar dans les dashboards
    // if (isDashboard) {
    //     return null;
    // }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 || isDashboard ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-gray-900">WashConnect</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Pro</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {/* Navigation links - seulement sur la page d'accueil */}
                        {isHomePage && (
                            <>
                                <Link to="/services" className="text-gray-900 hover:text-blue-600 transition-colors font-bold">Services</Link>
                                <a href="/Products" className="text-gray-900 hover:text-blue-600 transition-colors font-bold">Produits</a>
                                <a href="#solutions" className="text-gray-900 hover:text-blue-600 transition-colors font-bold">Solutions</a>
                                <a href="#tarifs" className="text-gray-900 hover:text-blue-600 transition-colors font-bold">Tarifs</a>
                                <a href="#contact" className="text-gray-900 hover:text-blue-600 transition-colors font-bold">Contact</a>
                            </>
                        )}

                        {/* Bouton Accueil si on est dans un dashboard */}
                        {isDashboard && (
                            <button
                                onClick={() => navigate('/')}
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Accueil
                            </button>
                        )}

                        {/* Actions utilisateur */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-800 font-medium">
                                    Bonjour, {user.name || user.companyName || 'Utilisateur'}
                                </span>

                                {/* Bouton Dashboard - seulement si pas déjà dans un dashboard */}
                                {!isDashboard && (
                                    <button
                                        onClick={handleDashboardNavigation}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                                    >
                                        Dashboard
                                    </button>
                                )}

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
                        {/* Navigation mobile - seulement sur la page d'accueil */}
                        {isHomePage && (
                            <>
                                <Link
                                    to="/services"
                                    className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)} // ferme le menu quand on clique
                                >
                                    Services
                                </Link>
                                <a href="/Products" className="text-gray-700 hover:text-blue-600 transition-colors font-bold">Produits</a>

                                {/* <a href="#services" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a> */}
                                <a href="#solutions" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Solutions</a>
                                <a href="#tarifs" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Tarifs</a>
                                <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
                            </>
                        )}

                        {/* Bouton Accueil mobile si on est dans un dashboard */}
                        {isDashboard && (
                            <button
                                onClick={() => {
                                    navigate('/');
                                    setIsMenuOpen(false);
                                }}
                                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Accueil
                            </button>
                        )}

                        {user ? (
                            <>
                                <div className="text-gray-700 font-medium">
                                    Bonjour, {user.name || user.companyName || 'Utilisateur'}
                                </div>

                                {/* Bouton Dashboard mobile - seulement si pas déjà dans un dashboard */}
                                {!isDashboard && (
                                    <button
                                        onClick={handleDashboardNavigation}
                                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-full font-semibold mb-2"
                                    >
                                        Dashboard
                                    </button>
                                )}

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
                                onClick={() => {
                                    onAuthClick();
                                    setIsMenuOpen(false);
                                }}
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