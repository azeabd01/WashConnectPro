// src/pages/RegisterPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientRegistrationForm from './ClientRegistrationForm.jsx';
import ProviderRegistrationForm from './ProviderRegistrationForm.jsx';
import ProductRegistrationForm from '../Auth/ProductRegistrationForm.jsx';

const RegisterPage = () => {
    const { profile } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/auth');
    };

    const renderForm = () => {
        switch (profile) {
            case 'client':
                return <ClientRegistrationForm onBack={handleBack} />;
            case 'prestataire':
                return <ProviderRegistrationForm onBack={handleBack} />;
            case 'product':
                return <ProductRegistrationForm onBack={handleBack} />;
            default:
                return (
                    <div className="text-center mt-20">
                        <h2 className="text-xl text-red-600 font-semibold">Profil invalide</h2>
                        <button
                            onClick={handleBack}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Retour
                        </button>
                    </div>
                );
        }
    };

    return <div>{renderForm()}</div>;
};

export default RegisterPage;