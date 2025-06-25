const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Product = require('../../models/productModel'); // à créer si besoin

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { name, email, password, businessName, phone, address } = req.body;

        let provider = await Product.findOne({ email });
        if (provider) return res.status(400).json({ message: 'Ce fournisseur existe déjà' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        provider = new Product({
            name,
            email,
            password: hashedPassword,
            businessName,
            phone,
            address
        });

        await provider.save();

        const payload = { productProviderId: provider.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

        res.status(201).json({
            message: 'Fournisseur créé avec succès',
            token,
            provider: {
                id: provider.id,
                name: provider.name,
                email: provider.email,
                businessName: provider.businessName
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;
        const provider = await Product.findOne({ email }).select('+password');
        if (!provider) return res.status(400).json({ message: 'Identifiants incorrects' });

        const isMatch = await bcrypt.compare(password, provider.password);
        if (!isMatch) return res.status(400).json({ message: 'Identifiants incorrects' });

        const payload = { productProviderId: provider.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

        res.json({
            message: 'Connexion réussie',
            token,
            provider: {
                id: provider.id,
                name: provider.name,
                email: provider.email,
                businessName: provider.businessName
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const provider = await Product.findById(req.Product.productProviderId).select('-password');
        if (!provider) return res.status(404).json({ message: 'Fournisseur non trouvé' });

        res.json({ provider });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
