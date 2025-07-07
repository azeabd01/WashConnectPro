// ===== middleware/authClient.js =====
const jwt = require('jsonwebtoken');
const Client = require('../models/Client'); // ou User selon ta structure

const authMiddlewareClient = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'Token manquant, accès refusé' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await Client.findById(decoded.clientId).select('-password');
        
        if (!client) 
            return res.status(401).json({ message: 'Token invalide' });

        req.client = client;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddlewareClient;
