const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ providerId: req.user.id });
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.createService = async (req, res) => {
    try {
        const { name, description, price, duration, category, features } = req.body;
        const service = new Service({
            providerId: req.user.id,
            name, description, price, duration, category, features
        });
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const updated = await Service.findOneAndUpdate(
            { _id: req.params.id, providerId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Service non trouvé' });
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const deleted = await Service.findOneAndDelete({
            _id: req.params.id,
            providerId: req.user.id
        });
        if (!deleted) return res.status(404).json({ message: 'Service non trouvé' });
        res.json({ message: 'Service supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
