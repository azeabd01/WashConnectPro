const fetchAvailableSlots = async (selectedDate) => {
    if (!service || !service._id) return;
    try {
        const response = await fetch(`/availabilities?serviceId=${service._id}&date=${selectedDate}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des créneaux');
        const data = await response.json();
        // data.slots est un tableau de strings "HH:mm"
        // Pour correspondre à ta structure actuelle, transforme en objets start/end
        const slots = data.slots.map(time => {
            const start = time;
            // Calcule end = start + duration
            const [h, m] = start.split(':').map(Number);
            const endDate = new Date(0, 0, 0, h, m + service.duration);
            const end = endDate.toTimeString().slice(0, 5);
            return { start, end };
        });
        setTimeSlots(slots);
    } catch (err) {
        console.error(err);
        setTimeSlots([]);
    }
};

// import axios from 'axios';

// export const createAvailability = async (data) => {
//     const res = await axios.post('/api/availabilities', data, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}` // ou autre méthode d'auth
//         }
//     });
//     return res.data;
// };

// export const fetchAvailabilities = async () => {
//     const res = await axios.get('/api/availabilities', {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//     });
//     return res.data;
// };
