// // ===== api/authApi.js =====
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// // Configuration de base pour les requêtes
// const apiRequest = async (endpoint, options = {}) => {
//     const url = `${API_BASE_URL}${endpoint}`;

//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//         },
//         ...options,
//     };

//     // Ajouter le token d'authentification si disponible
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//         const response = await fetch(url, config);
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || `Erreur HTTP: ${response.status}`);
//         }

//         return data;
//     } catch (error) {
//         console.error(`Erreur API ${endpoint}:`, error);
//         throw error;
//     }
// };

// // ✅ FONCTIONS DE REGISTRATION

// // Registration Provider (Prestataire)
// export const registerProvider = async (providerData) => {
//     return await apiRequest('/auth/register/provider', {
//         method: 'POST',
//         body: JSON.stringify(providerData),
//     });
// };

// // Registration Client
// export const registerClient = async (clientData) => {
//     return await apiRequest('/auth/register/client', {
//         method: 'POST',
//         body: JSON.stringify(clientData),
//     });
// };

// // Registration product
// export const registerproduct = async (productData) => {
//     return await apiRequest('/auth/register/product', {
//         method: 'POST',
//         body: JSON.stringify(productData),
//     });
// };

// // ✅ FONCTIONS DE CONNEXION/DÉCONNEXION

// // Login unifié pour tous les profils
// export const login = async (credentials) => {
//     return await apiRequest('/auth/login', {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//     });
// };

// // Logout
// export const logout = async () => {
//     const result = await apiRequest('/auth/logout', {
//         method: 'POST',
//     });

//     // Supprimer les données locales
//     localStorage.removeItem('token');
//     localStorage.removeItem('userType');

//     return result;
// };

// // ✅ FONCTION POUR RÉCUPÉRER LE PROFIL UTILISATEUR

// // Récupérer les informations de l'utilisateur connecté
// export const getMe = async () => {
//     return await apiRequest('/auth/me', {
//         method: 'GET',
//     });
// };

// // ✅ FONCTIONS UTILITAIRES

// // Vérifier si l'utilisateur est connecté
// export const isAuthenticated = () => {
//     return !!localStorage.getItem('token');
// };

// // Récupérer le type d'utilisateur connecté
// export const getUserType = () => {
//     return localStorage.getItem('userType');
// };

// // Vérifier le token d'authentification
// export const checkAuthToken = async () => {
//     try {
//         const response = await getMe();
//         return response;
//     } catch (error) {
//         // Token invalide ou expiré
//         localStorage.removeItem('token');
//         localStorage.removeItem('userType');
//         throw error;
//     }
// };