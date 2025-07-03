// src/api/analytics.js
const API_URL = 'http://localhost:3000/api/analytics';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// 📊 Vue d’ensemble des stats
export const fetchOverview = async () => {
    const res = await fetch(`${API_URL}/overview`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des statistiques');
    return res.json();
};

// 📈 Performance hebdomadaire
export const fetchWeeklyPerformance = async () => {
    const res = await fetch(`${API_URL}/weekly-performance`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des performances');
    return res.json();
};


// const API_URL = 'http://localhost:3000/api/analytics';

// export const fetchOverview = async () => {
//     const token = localStorage.getItem('token'); // ✅ déplacé ici
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     };

//     const res = await fetch(`${API_URL}/overview`, { headers });
//     if (!res.ok) throw new Error('Erreur overview');
//     return res.json();
// };

// export const fetchWeeklyPerformance = async () => {
//     const token = localStorage.getItem('token'); // ✅ déplacé ici aussi
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     };

//     const res = await fetch(`${API_URL}/weekly-performance`, { headers });
//     if (!res.ok) throw new Error('Erreur performance');
//     return res.json();
// };
