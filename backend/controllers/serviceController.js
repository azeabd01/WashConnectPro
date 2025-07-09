const Service = require('../models/Service');
const { validationResult } = require('express-validator');

const getServices = async (req, res) => {
    try {
        const services = await Service.find({ providerId: req.provider.id }).populate('providerId', 'workingHours');
        res.json({ services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const createService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        console.log('Body reçu createService:', req.body);

        const { name, description, price, duration, category, features, images, isActive } = req.body;

        const service = new Service({
            providerId: req.provider.id,
            name,
            description,
            price,
            duration,
            category,
            features: features || [],
            images: images || [],
            isActive: typeof isActive === 'boolean' ? isActive : true // ✅ Valeur par défaut true
        });

        await service.save();

        res.status(201).json({ message: 'Service créé avec succès', service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id, providerId: req.provider.id });
        if (!service) return res.status(404).json({ message: 'Service non trouvé' });

        const { name, description, price, duration, category, features, images, isActive } = req.body;

        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;
        service.duration = duration || service.duration;
        service.category = category || service.category;
        service.features = features || service.features;
        service.images = images || service.images;
        service.isActive = isActive !== undefined ? isActive : service.isActive; // ✅ Correction

        await service.save();

        res.json({ message: 'Service modifié avec succès', service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id, providerId: req.provider.id });
        if (!service) return res.status(404).json({ message: 'Service non trouvé' });

        res.json({ message: 'Service supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const toggleServiceStatus = async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id, providerId: req.provider.id });
        if (!service) return res.status(404).json({ message: 'Service non trouvé' });

        service.isActive = !service.isActive;
        await service.save();

        res.json({ message: 'Statut du service mis à jour', service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getActiveServices = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = { isActive: true };
        if (category && category !== 'all') {
            filter.category = category;
        }

        const services = await Service.find(filter)
            .populate('providerId', 'businessName email phone address')
            .sort({ createdAt: -1 });

        res.json({ services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getServicesByProvider = async (req, res) => {
    try {
        const services = await Service.find({
            providerId: req.params.providerId,
            isActive: true
        })
            .populate('providerId', 'businessName email phone address')
            .sort({ createdAt: -1 });

        res.json({ services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
    getActiveServices,
    getServicesByProvider
};