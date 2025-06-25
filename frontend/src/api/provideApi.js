// export const registerProvider = async (formData) => {
//     try {
//         const response = await fetch('http://localhost:3000/api/auth/register/prestataire', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || 'Erreur lors de l\'inscription');
//         }

//         return data;
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// };
// src/api/provideApi.js
const API_URL = "http://localhost:3000/api/auth";

// ✅ Login spécifique aux prestataires
export const loginProvider = async (credentials) => {
    console.log("Tentative de connexion prestataire avec:", credentials);

    const response = await fetch(`${API_URL}/login/prestataire`, {
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

// ✅ Inscription prestataire
export const registerProvider = async (providerData) => {
    console.log("Tentative d'inscription prestataire avec:", providerData);

    const response = await fetch(`${API_URL}/register/prestataire`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(providerData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'inscription");
    }

    return response.json();
};
