const express = require('express');
const { body } = require('express-validator');
// const providerController = require('../../controllers/auth/providerController');
const authMiddlewareProvider = require('../../middlewares/authMiddlewareProvider');
const {
    registerprovider,
    loginprovider,
    getMeprovider,
    updateProvider,
    deleteProvider
} = require('../../controllers/auth/providerController');
const { updateProvider: updateValidation } = require('../../Validations/providerValidation');
const validateRequest = require('../../middlewares/validateRequest');

const router = express.Router();

// ✅ Inscription provider
router.post('/register/provider', [
    body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('businessName').trim().isLength({ min: 2 }).withMessage('Le nom de l\'entreprise doit contenir au moins 2 caractères'),
    body('phone').isMobilePhone().withMessage('Numéro de téléphone invalide')
], registerprovider);

// ✅ Connexion provider (sans validation du rôle)
router.post('/login/provider', [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').exists().withMessage('Mot de passe requis')
], loginprovider);

// ✅ Profil provider
router.get('/me', authMiddlewareProvider, getMeprovider);

router.put('/update', authMiddlewareProvider, updateValidation, validateRequest, updateProvider);
router.delete('/delete', authMiddlewareProvider, deleteProvider);

module.exports = router;

// PUT    /auth/provider/update
// DELETE /auth/provider/delete