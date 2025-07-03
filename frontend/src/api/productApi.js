// src/api/supplierApi.js
const API_URL = "http://localhost:3000/api/auth";

// ✅ Login spécifique aux products
export const loginProduct = async (credentials) => {
    console.log("Tentative de connexion product avec:", credentials);

    const response = await fetch(`${API_URL}/login/product`, {
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

// ✅ Inscription product
export const registerProduct = async (supplierData) => {
    console.log("Tentative d'inscription product avec:", supplierData);

    const response = await fetch(`${API_URL}/register/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'inscription");
    }

    return response.json();
};

// ✅ Récupération du profil product
export const getproductProfile = async (token) => {
    const response = await fetch(`${API_URL}/profile/product`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la récupération du profil");
    }

    return response.json();
};

// ✅ Mise à jour du profil product
export const updateproductProfile = async (token, profileData) => {
    const response = await fetch(`${API_URL}/profile/product`, {
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

// ✅ Gestion des produits/services du product
export const getproductProducts = async (token) => {
    const response = await fetch(`${API_URL}/supplier/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de la récupération des produits");
    }

    return response.json();
};

export const addproductProduct = async (token, productData) => {
    const response = await fetch(`${API_URL}/supplier/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'ajout du produit");
    }

    return response.json();
};