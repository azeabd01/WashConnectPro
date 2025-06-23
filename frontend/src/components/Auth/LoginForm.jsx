import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Erreur de connexion');
                return;
            }

            // Stocker le token
            localStorage.setItem('token', data.token);

            // Redirection selon le rôle
            const role = data.user.role;

            switch (role) {
                case 'admin':
                    navigate('/dashboard/admin');
                    break;
                case 'produit':
                    navigate('/product');
                    break;
                case 'prestataire':
                    navigate('/dashboard/lavage');
                    break;
                case 'client':
                    navigate('/');
                    break;
                default:
                    navigate('/');
                    break;
            }

        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert("Erreur serveur");
        }
    };

    console.log({ email, password, remember });
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bon retour !</h2>
                <p className="text-gray-600 mb-6">Connectez-vous à votre compte</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="votre@email.com"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center" htmlFor="remember-me">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        Mot de passe oublié ?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    Se connecter
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                    />
                    Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                    Facebook
                </button>
            </div>
        </div>
    );
}
