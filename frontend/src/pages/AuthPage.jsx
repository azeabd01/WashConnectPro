import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            {/* Tu peux ajouter ici un header, un logo global ou un layout commun */}
            <Outlet />
        </div>
    );
};

export default AuthPage;