const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        // Récupérer le token depuis le header Authorization : "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token manquant ou mal formaté' });
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur en base avec l'id décodé
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Ajouter l'utilisateur dans la requête pour y accéder plus tard
        req.user = user;
        req.userRole = decoded.role;
        
        next(); // Autoriser la suite
    } catch (error) {
        console.error('Erreur dans auth middleware:', error);
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};


