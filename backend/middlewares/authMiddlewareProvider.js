// ===== middleware/auth.js =====
const jwt = require('jsonwebtoken');
const Provider = require('../models/Provider');

const authMiddlewareProvider = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Token manquant, accès refusé' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const provider = await Provider.findById(decoded.providerId).select('-password');

        if (!provider) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        req.provider = provider;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddlewareProvider;

