const API_URL = 'http://localhost:3000/api/analytics';

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

export const fetchOverview = async () => {
    const res = await fetch(`${API_URL}/overview`, { headers });
    if (!res.ok) throw new Error('Erreur overview');
    return res.json();
};

export const fetchWeeklyPerformance = async () => {
    const res = await fetch(`${API_URL}/weekly-performance`, { headers });
    if (!res.ok) throw new Error('Erreur performance');
    return res.json();
};
