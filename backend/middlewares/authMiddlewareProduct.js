const jwt = require('jsonwebtoken');
const ProviderProduct  = require('../models/ProviderProduct'); // Ajustez le chemin selon votre structure

// ✅ MIDDLEWARE D'AUTHENTIFICATION PRODUCT
const authMiddlewareProduct = async (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                message: 'Accès refusé. Token d\'authentification requis.'
            });
        }

        // Vérifier le format du token (Bearer token)
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;

        if (!token) {
            return res.status(401).json({
                message: 'Accès refusé. Token invalide.'
            });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Vérifier que c'est bien un token de product
        if (decoded.role !== 'product') {
            return res.status(403).json({
                message: 'Accès refusé. Token non autorisé pour cette ressource.'
            });
        }

        // Récupérer le product depuis la base de données
const product = await ProviderProduct.findById(decoded.productId)
            .select('-password'); // Exclure le mot de passe
            // .where('category').equals('product'); // S'assurer que c'est bien un product

        if (!product) {
            return res.status(401).json({
                message: 'product non trouvé. Token invalide.'
            });
        }

        // Vérifier si le compte product est actif
        // if (product.status !== 'active') {
        //     return res.status(403).json({
        //         message: 'Compte product désactivé. Contactez l\'administrateur.'
        //     });
        // }

        // Ajouter les informations du product à la requête
        req.product = {
            id: product._id,
            name: product.name,
            email: product.email,
            phone: product.phone,
            // status: product.status,
            role: 'product'
        };

        // Ajouter aussi l'objet complet si nécessaire
        req.productData = product;

        next();

    } catch (error) {
        console.error('Erreur middleware auth product:', error);

        // Gestion spécifique des erreurs JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Token invalide.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expiré. Veuillez vous reconnecter.'
            });
        }

        // Erreur serveur générique
        res.status(500).json({
            message: 'Erreur serveur lors de l\'authentification.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// ✅ MIDDLEWARE OPTIONNEL POUR VÉRIFIER SI PRODUCT (sans bloquer si pas de token)
const optionalAuthproduct = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return next(); // Continuer sans authentification
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;

        if (!token) {
            return next(); // Continuer sans authentification
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'product') {
            const product = await Product.findById(decoded.productId)
                .select('-password');
                // .where('category').equals('product');

            if (product && product.status === 'active') {
                req.product = {
                    id: product._id,
                    name: product.name,
                    email: product.email,
                    phone: product.phone,
                    status: product.status,
                    role: 'product'
                };
                req.productData = product;
            }
        }

        next();

    } catch (error) {
        // En cas d'erreur, continuer sans authentification
        next();
    }
};

// ✅ MIDDLEWARE POUR VÉRIFIER LA PROPRIÉTÉ D'UN PRODUIT
const checkProductOwnership = async (req, res, next) => {
    try {
        const productId = req.params.id || req.params.productId;

        if (!productId) {
            return res.status(400).json({
                message: 'ID du produit requis.'
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Produit non trouvé.'
            });
        }

        // Vérifier si le product est propriétaire du produit
        // (Pour les products, ils peuvent modifier leurs propres données de product)
        if (product.category === 'product' && product._id.toString() !== req.product.id) {
            return res.status(403).json({
                message: 'Accès refusé. Vous ne pouvez modifier que votre propre profil.'
            });
        }

        // Pour les produits normaux, vérifier le providerId ou autre logique métier
        // Ici vous pouvez ajouter d'autres vérifications selon vos besoins

        req.product = product;
        next();

    } catch (error) {
        console.error('Erreur vérification propriété:', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la vérification.'
        });
    }
};

module.exports = {
    authMiddlewareProduct,
    optionalAuthproduct,
    checkProductOwnership
};