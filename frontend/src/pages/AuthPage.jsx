// src/pages/AuthPage.jsx
import AuthModal from "../components/Auth/AuthModal";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const navigate = useNavigate();

    return (
        <AuthModal show={true} onClose={() => navigate(-1)} />
    );
}


