// routes/auth/productRoutes.js
const express = require('express');
const { body } = require('express-validator');
const productController = require('../../controllers/auth/productController');
const {
    authMiddlewareProduct,
    // optionalAuthProduct,
    // checkProductOwnership 
} = require('../../middlewares/authMiddlewareProduct');

const router = express.Router();

router.post('/register/product', [
    body('name').trim().isLength({ min: 2 }).withMessage('Nom requis (min 2 caractères)'),
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe min 6 caractères'),
    body('phone').optional().isMobilePhone().withMessage('Format téléphone invalide')
], productController.registerproduct);

router.post('/login/product', [
    body('email').isEmail(),
    body('password').notEmpty()
], productController.loginproduct);

router.get('/me', authMiddlewareProduct, productController.getMeproduct);

module.exports = router;

// // routes/auth/productRoutes.js
// const express = require('express');
// const { body, param } = require('express-validator');
// const productController = require('../../controllers/auth/productController');
// const {
//     authMiddlewareProduct,
//     optionalAuthProduct,
//     checkProductOwnership
// } = require('../../middlewares/authMiddlewareProduct');

// const router = express.Router();

// // ✅ VALIDATION MIDDLEWARE POUR INSCRIPTION
// const registerValidation = [
//     body('name')
//         .notEmpty()
//         .withMessage('Le nom est requis')
//         .isLength({ min: 2, max: 50 })
//         .withMessage('Le nom doit contenir entre 2 et 50 caractères')
//         .trim(),

//     body('email')
//         .isEmail()
//         .withMessage('Email invalide')
//         .normalizeEmail()
//         .toLowerCase(),

//     body('password')
//         .isLength({ min: 6 })
//         .withMessage('Le mot de passe doit contenir au moins 6 caractères')
//         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//         .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),

//     body('phone')
//         .isMobilePhone('any', { strictMode: false })
//         .withMessage('Numéro de téléphone invalide')
//         .optional({ checkFalsy: true }),
// ];

// // ✅ VALIDATION MIDDLEWARE POUR CONNEXION
// const loginValidation = [
//     body('email')
//         .isEmail()
//         .withMessage('Email invalide')
//         .normalizeEmail()
//         .toLowerCase(),

//     body('password')
//         .notEmpty()
//         .withMessage('Le mot de passe est requis')
// ];

// // ✅ VALIDATION MIDDLEWARE POUR MISE À JOUR PROFIL
// const updateProfileValidation = [
//     body('name')
//         .optional()
//         .isLength({ min: 2, max: 50 })
//         .withMessage('Le nom doit contenir entre 2 et 50 caractères')
//         .trim(),

//     body('phone')
//         .optional()
//         .isMobilePhone('any', { strictMode: false })
//         .withMessage('Numéro de téléphone invalide'),
// ];

// // ✅ VALIDATION POUR PARAMÈTRES ID
// const idValidation = [
//     param('id')
//         .isMongoId()
//         .withMessage('ID invalide')
// ];

// // ========================================
// // 🔐 ROUTES D'AUTHENTIFICATION
// // ========================================

// // Inscription product
// router.post('/register',
//     registerValidation,
//     productController.registerproduct
// );

// // Connexion product
// router.post('/login',
//     loginValidation,
//     productController.loginproduct
// );

// // ========================================
// // 🔒 ROUTES PROTÉGÉES
// // ========================================

// // Récupérer profil product
// router.get('/me',
//     authMiddlewareProduct,
//     productController.getMeproduct
// );

// // Mettre à jour profil product
// router.put('/profile',
//     authMiddlewareProduct,
//     updateProfileValidation,
//     checkProductOwnership,
//     productController.updateProfile
// );

// // Changer mot de passe
// router.put('/change-password',
//     authMiddlewareProduct,
//     [
//         body('currentPassword')
//             .notEmpty()
//             .withMessage('Le mot de passe actuel est requis'),
//         body('newPassword')
//             .isLength({ min: 6 })
//             .withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
//             .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//             .withMessage('Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre')
//     ],
//     productController.changePassword
// );

// // Désactiver compte
// router.put('/deactivate',
//     authMiddlewareProduct,
//     productController.deactivateAccount
// );

// // ========================================
// // 📊 ROUTES PUBLIQUES/SEMI-PUBLIQUES
// // ========================================

// // Liste des products (avec pagination et filtres)
// router.get('/list',
//     optionalAuthProduct,
//     [
//         body('page')
//             .optional()
//             .isInt({ min: 1 })
//             .withMessage('Page doit être un nombre positif'),
//         body('limit')
//             .optional()
//             .isInt({ min: 1, max: 100 })
//             .withMessage('Limite doit être entre 1 et 100'),
//         body('search')
//             .optional()
//             .isLength({ max: 50 })
//             .withMessage('Recherche limitée à 50 caractères')
//     ],
//     productController.getProduct
// );

// // Détails d'un product public
// router.get('/details/:id',
//     idValidation,
//     optionalAuthProduct,
//     productController.getProductDetails
// );

// // ========================================
// // 🛠️ ROUTES UTILITAIRES
// // ========================================

// // Vérifier si email existe déjà
// router.post('/check-email',
//     [
//         body('email')
//             .isEmail()
//             .withMessage('Email invalide')
//             .normalizeEmail()
//             .toLowerCase()
//     ],
//     productController.checkEmailExists
// );

// // Rafraîchir token
// router.post('/refresh-token',
//     authMiddlewareProduct,
//     productController.refreshToken
// );

// // Déconnexion (optionnel si vous gérez une blacklist de tokens)
// router.post('/logout',
//     authMiddlewareProduct,
//     productController.logout
// );

// module.exports = router;