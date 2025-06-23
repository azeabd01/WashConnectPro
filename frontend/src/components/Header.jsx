import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Centre de Lavage Premium</h1>
                    <p className="text-gray-600">Agadir, Souss-Massa</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <span className="text-gray-700 font-medium">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;


