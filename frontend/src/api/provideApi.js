const API_URL = "http://localhost:3000/api/auth";
// ✅ Login spécifique aux prestataires
export const loginProvider = async (credentials) => {
    console.log("Tentative de connexion prestataire avec:", credentials);

    const response = await fetch(`${API_URL}/login/provider`, {
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

    const response = await fetch(`${API_URL}/register/provider`, {
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

// 👤 Récupérer profil connecté
export const getMe = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Erreur lors du chargement du profil');
    return res.json();
};

// ✏️ Mettre à jour profil prestataire
export const updateProviderProfile = async (updatedData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('Erreur lors de la mise à jour du profil');
    return res.json();
};

// ❌ Désactiver le compte
export const deleteProviderAccount = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/delete`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Erreur lors de la désactivation du compte');
    return res.json();
};