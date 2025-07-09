const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Client = require('../../models/Client');

// ✅ Inscription Client
const registerClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, email, password, phone, address } = req.body;

        let client = await Client.findOne({ email });
        if (client) return res.status(400).json({ message: 'Ce client existe déjà' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        client = new Client({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        });

        await client.save();

        const payload = { clientId: client.id, role: 'client' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Client créé avec succès',
            token,
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone,
                address: client.address,
                role: 'client'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ✅ Connexion Client
const loginClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ email }).select('+password');
        if (!client) return res.status(400).json({ message: 'Identifiants incorrects' });

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) return res.status(400).json({ message: 'Identifiants incorrects' });

        const payload = { clientId: client.id, role: 'client' };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Connexion réussie',
            token,
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                avatar: client.avatar,
                role: 'client'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ✅ Profil Client
const getMeClient = async (req, res) => {
    try {
        res.json({
            client: {
                id: req.client.id,
                name: req.client.name,
                email: req.client.email,
                phone: req.client.phone,
                address: req.client.address,
                avatar: req.client.avatar,
                rating: req.client.rating,
                status: req.client.status,
                preferences: req.client.preferences,
                role: 'client'
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// ✅ Mise à jour du client
const updateClient = async (req, res) => {
    try {
        const clientId = req.client._id;
        const updateData = req.body;

        const updated = await Client.findByIdAndUpdate(clientId, updateData, {
            new: true,
            runValidators: true
        }).select('-password');

        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ✅ Suppression / désactivation du compte
const deleteClient = async (req, res) => {
    try {
        const clientId = req.client._id;
        await Client.findByIdAndUpdate(clientId, { status: 'inactive' });

        res.status(200).json({ message: 'Compte client désactivé avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    registerClient,
    loginClient,
    getMeClient,
    updateClient,
    deleteClient
};