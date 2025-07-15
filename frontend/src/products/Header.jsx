import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell,
    Settings,
    User,
    LogOut,
    ChevronDown,
    Home,
    Car
} from 'lucide-react';

const Header = () => {
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les données utilisateur
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Erreur parsing user data:', error);
                localStorage.removeItem('user');
                navigate('/auth/login');
            }
        } else {
            // Si pas d'utilisateur, rediriger vers login
            navigate('/auth/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Nettoyer le localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirection vers login selon le rôle
        const userRole = user?.role;
        if (userRole === 'provider') {
            navigate('/auth/login/provider');
        } else if (userRole === 'client') {
            navigate('/auth/login/client');
        } else if (userRole === 'product') {
            navigate('/auth/login/product');
        } else {
            navigate('/auth/login');
        }
    };

    const handleHomeRedirect = () => {
        navigate('/');
    };

    const getUserDisplayName = () => {
        if (!user) return 'Utilisateur';
        return user.name || user.companyName || user.email || 'Utilisateur';
    };

    const getUserRole = () => {
        if (!user?.role) return 'Utilisateur';

        const roleMap = {
            'provider': 'Prestataire',
            'client': 'Client',
            'product': 'Frounisseur Produit'
        };

        return roleMap[user.role] || 'Utilisateur';
    };

    if (!user) {
        return (
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900">WashConnectPro Tableau</h1>
                    </div>
                    <div className="text-sm text-gray-500">Chargement...</div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo et titre */}
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">WashConnectPro Tableau</h1>
                        <p className="text-sm text-gray-500">{getUserRole()}</p>
                    </div>
                </div>

                {/* Actions et profil utilisateur */}
                <div className="flex items-center space-x-4">
                    {/* Bouton retour accueil */}
                    <button
                        onClick={handleHomeRedirect}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Retour à l'accueil"
                    >
                        <Home className="w-5 h-5" />
                    </button>

                    {/* Notifications */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Menu utilisateur */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-sm font-medium text-gray-900">
                                    {getUserDisplayName()}
                                </p>
                                <p className="text-xs text-gray-500">{getUserRole()}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>

                        {/* Dropdown menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">
                                        {getUserDisplayName()}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        // Ouvrir modal profil (à implémenter)
                                        alert('Profil - À implémenter');
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    Mon Profil
                                </button>

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        // Ouvrir paramètres (à implémenter)
                                        alert('Paramètres - À implémenter');
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <Settings className="w-4 h-4 mr-3" />
                                    Paramètres
                                </button>

                                <hr className="my-2" />

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        handleLogout();
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fermer le menu si on clique ailleurs */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;

// import { Bell, Menu, X } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// export default function Header() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('products');

//   const [notifications, setNotifications] = useState([
//     { id: 1, title: 'New order received', message: 'Order #1234 has been placed', time: '2 min ago', unread: true },
//     { id: 2, title: 'Stock alert', message: 'Product XYZ is running low', time: '1 hour ago', unread: true },
//     { id: 3, title: 'System update', message: 'Maintenance scheduled for tonight', time: '3 hours ago', unread: true }
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);

 



//   // Notification functionality
//   const unreadCount = notifications.filter(n => n.unread).length;

//   const markAsRead = (id) => {
//     setNotifications(prev =>
//       prev.map(notification =>
//         notification.id === id ? { ...notification, unread: false } : notification
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev =>
//       prev.map(notification => ({ ...notification, unread: false }))
//     );
//   };

//   const deleteNotification = (id) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id));
//   };

 

//   return (
//     <div className="relative">
//       <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
//           </div>
          
//           <div className="flex items-center space-x-4">
            
//             {/* Enhanced Notifications */}
//             <div className="relative notification-container">
//               <button 
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="p-2 text-gray-400 hover:text-gray-600 relative"
//               >
//                 <Bell className="w-5 h-5" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </button>

//               {/* Notifications Dropdown */}
//               {showNotifications && (
//                 <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-80 z-50">
//                   <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
//                     <h3 className="font-medium text-gray-900">Notifications</h3>
//                     {unreadCount > 0 && (
//                       <button
//                         onClick={markAllAsRead}
//                         className="text-sm text-blue-600 hover:text-blue-700"
//                       >
//                         Mark all as read
//                       </button>
//                     )}
//                   </div>
                  
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.length > 0 ? (
//                       notifications.map(notification => (
//                         <div
//                           key={notification.id}
//                           className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
//                             notification.unread ? 'bg-blue-50' : ''
//                           }`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-2">
//                                 <h4 className="font-medium text-gray-900 text-sm">
//                                   {notification.title}
//                                 </h4>
//                                 {notification.unread && (
//                                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                 )}
//                               </div>
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {notification.message}
//                               </p>
//                               <p className="text-xs text-gray-400 mt-1">
//                                 {notification.time}
//                               </p>
//                             </div>
//                             <div className="flex space-x-1 ml-2">
//                               {notification.unread && (
//                                 <button
//                                   onClick={() => markAsRead(notification.id)}
//                                   className="text-xs text-blue-600 hover:text-blue-700"
//                                   title="Mark as read"
//                                 >
//                                   ✓
//                                 </button>
//                               )}
//                               <button
//                                 onClick={() => deleteNotification(notification.id)}
//                                 className="text-xs text-red-600 hover:text-red-700"
//                                 title="Delete"
//                               >
//                                 ×
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="px-4 py-6 text-center text-gray-500">
//                         No notifications
//                       </div>
//                     )}
//                   </div>
                  
//                   {notifications.length > 0 && (
//                     <div className="px-4 py-3 border-t border-gray-200 text-center">
//                       <button className="text-sm text-blue-600 hover:text-blue-700">
//                         View all notifications
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
//               JD
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }