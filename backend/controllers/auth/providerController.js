const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Provider = require('../../models/Provider');

const registerprovider = async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Format des données incorrect. Vérifiez votre email et mot de passe.',
            errors: errors.array()
        });
    }

    try {
        const { name, email, password, businessName, phone, address, workingHours } = req.body;

        let provider = await Provider.findOne({ email });
        if (provider) {
            return res.status(400).json({
                message: 'Un compte existe déjà avec cet email. Essayez de vous connecter ou utilisez un autre email.'
            });
        }

        // Hachage du mot de passe
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

        // Générer le token
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
                role: 'provider'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Erreur du serveur. Veuillez réessayer dans quelques instants.'
        });
    }
};

// ✅ Login avec messages d'erreur détaillés
const loginprovider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Format des données incorrect. Vérifiez votre email et mot de passe.',
            errors: errors.array()
        });
    }

    try {
        const { email, password } = req.body;

        // Vérifier le format de l'email
        if (!email || !email.trim()) {
            return res.status(400).json({
                message: 'Données invalides. Vérifiez votre email et mot de passe.'
            });
        }

        // Chercher uniquement dans la collection Provider
        const provider = await Provider.findOne({ email }).select('+password');
        if (!provider) {
            return res.status(404).json({
                message: 'Aucun compte trouvé avec cet email. Vérifiez votre email ou créez un compte.'
            });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, provider.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect. Veuillez réessayer.'
            });
        }

        const payload = { providerId: provider.id, role: 'provider' };

        // Générer le token
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
                role: 'provider'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Erreur du serveur. Veuillez réessayer dans quelques instants.'
        });
    }
};

// ✅ RÉCUPÉRER PROFIL Provider
const getMeprovider = async (req, res) => {
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
                role: 'provider'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Erreur du serveur. Veuillez réessayer dans quelques instants.',
            error: err.message
        });
    }
};

const updateProvider = async (req, res) => {
    try {
        const providerId = req.provider._id;
        const updateData = req.body;

        const updated = await Provider.findByIdAndUpdate(providerId, updateData, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!updated) {
            return res.status(404).json({
                message: 'Profil non trouvé.'
            });
        }

        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Données invalides. Vérifiez les informations saisies.'
            });
        }
        res.status(500).json({
            message: 'Erreur du serveur. Veuillez réessayer dans quelques instants.'
        });
    }
};

const deleteProvider = async (req, res) => {
    try {
        const providerId = req.provider._id;

        const updated = await Provider.findByIdAndUpdate(providerId, { status: 'inactive' });

        if (!updated) {
            return res.status(404).json({
                message: 'Profil non trouvé.'
            });
        }

        res.status(200).json({
            message: 'Compte désactivé avec succès'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Erreur du serveur. Veuillez réessayer dans quelques instants.'
        });
    }
};

module.exports = {
    registerprovider,
    loginprovider,
    getMeprovider,
    updateProvider,
    deleteProvider
};