import React, { useState } from 'react';

export default function RegisterForm({ onRegisterSuccess }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        accountType: 'client',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!formData.acceptedTerms) {
            alert("Vous devez accepter les conditions d'utilisation.");
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    role: formData.accountType.toLowerCase(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Erreur lors de la création du compte.');
                return;
            }

            // alert('Compte créé avec succès. Veuillez vous connecter.');
            onRegisterSuccess();

        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            alert("Erreur serveur.");
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h2>
                <p className="text-gray-600 mb-6">Rejoignez la révolution du lavage auto</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>

                <div>
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-2">Type de compte</label>
                    <select id="accountType" name="accountType" value={formData.accountType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="client">Client</option>
                        <option value="prestataire">Prestataire de Lavage</option>
                        <option value="produit">Produits</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
                </div>

                <div className="flex items-start">
                    <input id="acceptedTerms" name="acceptedTerms" type="checkbox" checked={formData.acceptedTerms} onChange={handleChange} className="mt-1" />
                    <label htmlFor="acceptedTerms" className="ml-2 text-sm text-gray-600">
                        J'accepte les <a href="#" className="text-blue-600 hover:text-blue-800">conditions d'utilisation</a> et la <a href="#" className="text-blue-600 hover:text-blue-800">politique de confidentialité</a>
                    </label>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Créer mon compte
                </button>
            </form>
        </div>
    );
}
