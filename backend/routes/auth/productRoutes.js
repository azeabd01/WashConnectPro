// routes/auth/productRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
    registerProviderproduct,
    loginProviderproduct,
    getMeProviderproduct
} = require('../../controllers/auth/productController');
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
], registerProviderproduct);

router.post('/login/product', [
    body('email').isEmail(),
    body('password').notEmpty()
],     loginProviderproduct);

router.get('/me', authMiddlewareProduct, getMeProviderproduct);

// // ✅ Mettre à jour son profil (privé)
// router.put('/me/update', authMiddlewareProduct, updateProfile);

// // ✅ Changer le statut (privé)
// router.patch('/me/status', authMiddlewareProduct, changeStatus);

// // ✅ Supprimer son compte (privé)
// router.delete('/me/delete', authMiddlewareProduct, deleteAccount);

// // ✅ Tous les products (admin)
// router.get('/', getAllProducts);

module.exports = router;

