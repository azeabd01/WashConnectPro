import { NavLink } from 'react-router-dom';
import { Package, Users, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const menu = [
    { label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { label: 'Clients', icon: Users, path: '/admin/users' },
    { label: 'Providers Product ', icon: ShieldCheck, path: '/admin/providers' },
    { label: 'provider lavage', icon: Package, path: '/admin/providersLavage' },
    { label: 'Products', icon: Package, path: '/admin/UserProviderProducts' },

  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 font-bold text-xl">Admin Panel</div>
      <nav className="mt-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 hover:bg-gray-100 ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
