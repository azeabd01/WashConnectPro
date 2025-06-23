export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 mt-32">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-white text-xl font-semibold mb-4">CarWashPro</h3>
                    <p>© 2025 CarWashPro. Tous droits réservés.</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">À propos</h4>
                    <ul>
                        <li><a href="#services" className="hover:text-white">Services</a></li>
                        <li><a href="#solutions" className="hover:text-white">Solutions</a></li>
                        <li><a href="#tarifs" className="hover:text-white">Tarifs</a></li>
                        <li><a href="#contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <p>Email : contact@carwashpro.com</p>
                    <p>Téléphone : +212 600 000 000</p>
                </div>
            </div>
        </footer>
    );
}
