// import React, { useEffect } from 'react';

// export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
//     // type peut être 'success', 'error', 'info' pour gérer le style

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onClose();
//         }, duration);

//         return () => clearTimeout(timer);
//     }, [onClose, duration]);

//     const colors = {
//         success: 'bg-green-500',
//         error: 'bg-red-500',
//         info: 'bg-blue-500',
//     };

//     return (
//         <div
//             className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold animate-fade-in-out ${colors[type]}`}
//             role="alert"
//         >
//             {message}
//         </div>
//     );
// }
