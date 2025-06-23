import React, { useState } from 'react';
import { Car, X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Toast from '../../components/Toast';

export default function AuthModal({ show, onClose }) {
    const [authMode, setAuthMode] = useState('login');
    const [toast, setToast] = useState(null);

    // Fonction pour déclencher un toast
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    // Fonction à passer au formulaire pour changer le mode (ex: après inscription)
    const handleRegisterSuccess = () => {
        showToast('Compte créé avec succès. Veuillez vous connecter.', 'success');
        setAuthMode('login');
    };

    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <Car className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">CarWash Pro</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close authentication modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                            <button
                                onClick={() => setAuthMode('login')}
                                className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${authMode === 'login'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                aria-pressed={authMode === 'login'}
                            >
                                Connexion
                            </button>
                            <button
                                onClick={() => setAuthMode('register')}
                                className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-300 ${authMode === 'register'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                aria-pressed={authMode === 'register'}
                            >
                                Inscription
                            </button>
                        </div>

                        {/* Forms */}
                        {authMode === 'login' ? (
                            <LoginForm />
                        ) : (
                            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                        )}
                    </div>
                </div>
            </div>
            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                    duration={4000}

                />
            )}
        </>
    );
}
