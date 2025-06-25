const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Provider = require('../../models/Provider');

exports.register = async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, email, password, businessName, phone, address, workingHours } = req.body;

        let provider = await Provider.findOne({ email });
        if (provider) return res.status(400).json({ message: 'Ce prestataire existe déjà' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Horaires par défaut si pas fournis
        const defaultWorkingHours = {
            monday: { open: '08:00', close: '18:00', isOpen: true },
            tuesday: { open: '08:00', close: '18:00', isOpen: true },
            wednesday: { open: '08:00', close: '18:00', isOpen: true },
            thursday: { open: '08:00', close: '18:00', isOpen: true },
            friday: { open: '08:00', close: '18:00', isOpen: true },
            saturday: { open: '08:00', close: '18:00', isOpen: true },
            sunday: { open: '09:00', close: '17:00', isOpen: false }
        };

        provider = new Provider({
            name,
            email,
            password: hashedPassword,
            businessName,
            phone,
            address,
            workingHours: workingHours || defaultWorkingHours
        });

        await provider.save();

        const payload = { providerId: provider.id, role: 'provider' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Prestataire créé avec succès',
            token,
            provider: {
                id: provider.id,
                name: provider.name,
                email: provider.email,
                businessName: provider.businessName,
                phone: provider.phone,
                address: provider.address,
                role: 'provider' // ✅ Ajout du rôle
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ✅ CORRECTION PRINCIPALE : Login spécifique aux providers
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;

        // Chercher uniquement dans la collection Provider
        const provider = await Provider.findOne({ email }).select('+password');
        if (!provider) return res.status(400).json({ message: 'Identifiants incorrects' });

        const isMatch = await bcrypt.compare(password, provider.password);
        if (!isMatch) return res.status(400).json({ message: 'Identifiants incorrects' });

        const payload = { providerId: provider.id, role: 'provider' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Connexion réussie',
            token,
            provider: {
                id: provider.id,
                name: provider.name,
                email: provider.email,
                businessName: provider.businessName,
                avatar: provider.avatar,
                role: 'provider' // ✅ Toujours retourner le rôle
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getMe = async (req, res) => {
    try {
        res.json({
            provider: {
                id: req.provider.id,
                name: req.provider.name,
                email: req.provider.email,
                businessName: req.provider.businessName,
                phone: req.provider.phone,
                address: req.provider.address,
                avatar: req.provider.avatar,
                rating: req.provider.rating,
                status: req.provider.status,
                workingHours: req.provider.workingHours,
                role: 'provider' // ✅ Ajout du rôle
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};