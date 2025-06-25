const Service = require('../models/Service');
const { validationResult } = require('express-validator');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ providerId: req.provider.id }).sort({ createdAt: -1 });
        res.json({ services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.createService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, description, price, duration, category, features, images } = req.body;

        const service = new Service({
            providerId: req.provider.id,
            name,
            description,
            price,
            duration,
            category,
            features: features || [],
            images: images || []
        });

        await service.save();

        res.status(201).json({ message: 'Service créé avec succès', service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateService = async (req, res) => {
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
        service.isActive = isActive !== undefined ? isActive : service.isActive;

        await service.save();

        res.json({ message: 'Service modifié avec succès', service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findOneAndDelete({ _id: req.params.id, providerId: req.provider.id });
        if (!service) return res.status(404).json({ message: 'Service non trouvé' });

        res.json({ message: 'Service supprimé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


// const Service = require('../models/Service');
// const { validationResult } = require('express-validator');

// exports.getAllServices = async (req, res) => {
//     try {
//         const services = await Service.find({ providerId: req.provider.id });
//         res.json(services);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.createService = async (req, res) => {
//     try {
//         const { name, description, price, duration, category, features } = req.body;
//         const service = new Service({
//             providerId: req.user.id,
//             name, description, price, duration, category, features
//         });
//         await service.save();
//         res.status(201).json(service);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.updateService = async (req, res) => {
//     try {
//         const updated = await Service.findOneAndUpdate(
//             { _id: req.params.id, providerId: req.user.id },
//             req.body,
//             { new: true }
//         );
//         if (!updated) return res.status(404).json({ message: 'Service non trouvé' });
//         res.json(updated);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };

// exports.deleteService = async (req, res) => {
//     try {
//         const deleted = await Service.findOneAndDelete({
//             _id: req.params.id,
//             providerId: req.user.id
//         });
//         if (!deleted) return res.status(404).json({ message: 'Service non trouvé' });
//         res.json({ message: 'Service supprimé avec succès' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// };
