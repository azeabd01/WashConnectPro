export default function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center rounded-3xl mx-8 md:mx-0">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    Rejoignez la Révolution <span className="underline decoration-white/40">CarWash</span> dès aujourd’hui !
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" type="button">
                        Commencer Gratuitement
                    </button>
                    <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300" type="button">
                        Contactez-nous
                    </button>
                </div>
            </div>
        </section>
    );
}



