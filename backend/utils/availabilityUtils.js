// function calculateAvailableTimeSlots(open, close, duration, bookings) {
//     const toMinutes = (timeStr) => {
//         const [h, m] = timeStr.split(':').map(Number);
//         return h * 60 + m;
//     };
//     const fromMinutes = (m) => {
//         const h = Math.floor(m / 60);
//         const min = m % 60;
//         return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
//     };

//     const openMin = toMinutes(open);
//     const closeMin = toMinutes(close);
//     const slots = [];

//     const bookedIntervals = bookings.map(b => ({
//         start: toMinutes(b.startTime),
//         end: toMinutes(b.endTime)
//     })).sort((a, b) => a.start - b.start);

//     const isFree = (start, end) => {
//         for (const interval of bookedIntervals) {
//             if (start < interval.end && end > interval.start) return false;
//         }
//         return true;
//     };

//     for (let time = openMin; time + duration <= closeMin; time += 15) {
//         const endTime = time + duration;
//         if (isFree(time, endTime)) {
//             slots.push({ start: fromMinutes(time), end: fromMinutes(endTime) });
//         }
//     }

//     return slots;
// }

// module.exports = { calculateAvailableTimeSlots };
