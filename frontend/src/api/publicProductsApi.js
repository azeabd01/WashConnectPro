// const API_URL = 'http://localhost:3000/api/public';

// // ✅ Tous les produits actifs (optionnellement par catégorie)
// export const fetchPublicProducts = async (category = null) => {
//     const url = category && category !== 'all'
//         ? `${API_URL}/products?category=${category}`
//         : `${API_URL}/products`;
    
//     const res = await fetch(url);
//     if (!res.ok) throw new Error('Erreur lors du chargement des produits');
//     const data = await res.json();
//     return data.products; // ✅ on retourne products directement
// };