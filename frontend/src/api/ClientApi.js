// src/api/clientApi.js
const API_URL = "http://localhost:3000/api/auth";

// ✅ Login spécifique aux clients
export const loginClient = async (credentials) => {
    console.log("Tentative de connexion client avec:", credentials);

    const response = await fetch(`${API_URL}/login/client`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        }),
    });

    if (!response.ok) {
        console.error("Erreur HTTP:", response.status, response.statusText);
        try {
            const error = await response.json();
            console.error("Détails de l'erreur:", error);
            throw new Error(error.message || `Erreur serveur (${response.status})`);
        } catch (parseError) {
            console.error("Impossible de parser l'erreur:", parseError);
            throw new Error(`Erreur serveur (${response.status}): ${response.statusText}`);
        }
    }

    const data = await response.json();
    console.log("Réponse du backend:", data);

    return data;
};

// ✅ Inscription client
export const registerClient = async (clientData) => {
    console.log("Tentative d'inscription client avec:", clientData);

    const response = await fetch(`${API_URL}/register/client`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'inscription");
    }

    return response.json();
};

// ✅ Récupération du profil client
export const getClientProfile = async (token) => {
    const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la récupération du profil");
    }

    return response.json();
};

// ✅ Mise à jour du profil client
export const updateClientProfile = async (token, profileData) => {
    const response = await fetch(`${API_URL}/profile/client`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la mise à jour du profil");
    }

    return response.json();
};