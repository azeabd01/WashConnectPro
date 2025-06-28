// // ===== middleware/auth.js =====
// const jwt = require('jsonwebtoken');
// const { User } = require('../models/User');

// // ✅ MIDDLEWARE UNIFIÉ POUR TOUS LES PROFILS
// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');

//         if (!token) {
//             return res.status(401).json({ message: 'Token manquant, accès refusé' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log('🔍 Token décodé:', decoded);
        
//         // Chercher l'utilisateur avec le discriminateur
//         const user = await User.findById(decoded.userId).select('-password');
        
//         if (!user) {
//             return res.status(401).json({ message: 'Utilisateur non trouvé, token invalide' });
//         }

//         console.log('✅ Utilisateur trouvé:', {
//             id: user._id,
//             userType: user.userType,
//             name: user.name
//         });

//         // Vérifier que le compte est actif
//         if (user.status !== 'active') {
//             return res.status(401).json({ message: 'Compte désactivé' });
//         }

//         // Ajouter des informations à la requête
//         req.user = user;
//         req.userType = user.userType;
//         req.userId = user._id;

//         // Compatibilité avec l'ancien code
//         switch (user.userType) {
//             case 'provider':
//                 req.provider = user;
//                 break;
//             case 'client':
//                 req.client = user;
//                 break;
//             case 'fournisseur':
//                 req.fournisseur = user;
//                 break;
//         }

//         next();
//     } catch (error) {
//         console.error('❌ Erreur authentification:', error);
        
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ message: 'Token invalide' });
//         }
        
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ message: 'Token expiré' });
//         }
        
//         res.status(401).json({ message: 'Erreur d\'authentification' });
//     }
// };

// // ✅ MIDDLEWARE SPÉCIFIQUE POUR PROVIDER UNIQUEMENT
// const providerOnly = async (req, res, next) => {
//     try {
//         await authMiddleware(req, res, () => {
//             if (req.userType !== 'provider') {
//                 return res.status(403).json({ message: 'Accès réservé aux prestataires' });
//             }
//             next();
//         });
//     } catch (error) {
//         res.status(401).json({ message: 'Erreur d\'authentification' });
//     }
// };

// // ✅ MIDDLEWARE SPÉCIFIQUE POUR CLIENT UNIQUEMENT
// const clientOnly = async (req, res, next) => {
//     try {
//         await authMiddleware(req, res, () => {
//             if (req.userType !== 'client') {
//                 return res.status(403).json({ message: 'Accès réservé aux clients' });
//             }
//             next();
//         });
//     } catch (error) {
//         res.status(401).json({ message: 'Erreur d\'authentification' });
//     }
// };

// // ✅ MIDDLEWARE SPÉCIFIQUE POUR FOURNISSEUR UNIQUEMENT
// const fournisseurOnly = async (req, res, next) => {
//     try {
//         await authMiddleware(req, res, () => {
//             if (req.userType !== 'fournisseur') {
//                 return res.status(403).json({ message: 'Accès réservé aux fournisseurs' });
//             }
//             next();
//         });
//     } catch (error) {
//         res.status(401).json({ message: 'Erreur d\'authentification' });
//     }
// };

// // ✅ MIDDLEWARE POUR ADMIN (Provider ou autres rôles admin)
// const adminOnly = async (req, res, next) => {
//     try {
//         await authMiddleware(req, res, () => {
//             if (!['provider', 'admin'].includes(req.userType)) {
//                 return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
//             }
//             next();
//         });
//     } catch (error) {
//         res.status(401).json({ message: 'Erreur d\'authentification' });
//     }
// };

// module.exports = {
//     authMiddleware,      // Middleware général
//     providerOnly,       // Prestataires uniquement
//     clientOnly,         // Clients uniquement  
//     fournisseurOnly,    // Fournisseurs uniquement
//     adminOnly           // Admin uniquement
// };



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

