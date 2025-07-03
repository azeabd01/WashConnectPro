const Provider = require('../../models/Provider');

// /api/client/providers/search?city=Agadir&service=Nettoyage intérieur
exports.searchProviders = async (req, res) => {
    try {
        const { city, service } = req.query;
        const query = {
            status: 'active'
        };

        if (city) query['address.city'] = city;
        if (service) query['services'] = service;

        const providers = await Provider.find(query).select('name businessName address rating');

        res.json({ providers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
