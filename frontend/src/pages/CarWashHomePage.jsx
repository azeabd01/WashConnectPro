import { useNavigate } from "react-router-dom";
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import UserTabs from '../components/home/UserTabs';
import BenefitsSection from '../components/home/BenefitsSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/home/Footer';

export default function CarWashHomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar onAuthClick={() => navigate('/auth')} />
            <main className="mt-16">
                <HeroSection />
                <StatsSection />
                <UserTabs />
                <BenefitsSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}


