// import React, { useState } from 'react';
// import { toast } from 'sonner';
// import { createAvailability, fetchAvailabilities } from '../../api/availabilityApi';

// const AvailabilityTab = () => {
//     const [date, setDate] = useState('');
//     const [slots, setSlots] = useState([{ start: '', end: '' }]);

//     const handleAddSlot = () => setSlots([...slots, { start: '', end: '' }]);
//     const handleRemoveSlot = (index) => setSlots(slots.filter((_, i) => i !== index));
//     const handleSlotChange = (index, field, value) => {
//         const updatedSlots = [...slots];
//         updatedSlots[index][field] = value;
//         setSlots(updatedSlots);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!date) return toast.error('Choisis une date');
//         if (slots.some(s => !s.start || !s.end)) return toast.error('Remplis tous les créneaux');
//         try {
//             await createAvailability({ date, slots });
//             toast.success('Disponibilités ajoutées');
//             setDate('');
//             setSlots([{ start: '', end: '' }]);
//         } catch (err) {
//             toast.error('Erreur lors de l\'ajout');
//         }
//     };

//     return (
//         <div>
//             <h2>Ajouter des disponibilités</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
//                 {slots.map((slot, i) => (
//                     <div key={i} className="flex gap-2">
//                         <input
//                             type="time"
//                             value={slot.start}
//                             onChange={e => handleSlotChange(i, 'start', e.target.value)}
//                             required
//                         />
//                         <input
//                             type="time"
//                             value={slot.end}
//                             onChange={e => handleSlotChange(i, 'end', e.target.value)}
//                             required
//                         />
//                         {slots.length > 1 && (
//                             <button type="button" onClick={() => handleRemoveSlot(i)}>Supprimer</button>
//                         )}
//                     </div>
//                 ))}
//                 <button type="button" onClick={handleAddSlot}>+ Ajouter un créneau</button>
//                 <button type="submit">Enregistrer</button>
//             </form>
//         </div>
//     );
// };

// export default AvailabilityTab;
