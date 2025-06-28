// // ===== routes/auth.js =====
// const express = require('express');
// const { body } = require('express-validator');
// const authController = require('../../controllers/auth/authController');
// const {authMiddleware} = require('../../middlewares/authMiddleware');

// const router = express.Router();

// // Validations communes
// const emailValidation = body('email')
//     .isEmail()
//     .withMessage('Email invalide')
//     .normalizeEmail();

// const passwordValidation = body('password')
//     .isLength({ min: 6 })
//     .withMessage('Le mot de passe doit contenir au moins 6 caractères');

// const nameValidation = body('name')
//     .trim()
//     .isLength({ min: 2 })
//     .withMessage('Le nom doit contenir au moins 2 caractères');

// const phoneValidation = body('phone')
//     .trim()
//     .isLength({ min: 10 })
//     .withMessage('Numéro de téléphone invalide');

// // ✅ ROUTES DE REGISTRATION

// // POST /api/auth/register/provider
// router.post('/register/provider', [
//     nameValidation,
//     emailValidation,
//     passwordValidation,
//     phoneValidation,
//     body('businessName')
//         .trim()
//         .isLength({ min: 2 })
//         .withMessage('Le nom de l\'entreprise est requis')
// ], authController.registerProvider);

// // POST /api/auth/register/client
// router.post('/register/client', [
//     nameValidation,
//     emailValidation,
//     passwordValidation,
//     phoneValidation
// ], authController.registerClient);

// // POST /api/auth/register/fournisseur
// router.post('/register/fournisseur', [
//     nameValidation,
//     emailValidation,
//     passwordValidation,
//     phoneValidation
// ], authController.registerFournisseur);

// // ✅ ROUTES DE CONNEXION/DÉCONNEXION

// // POST /api/auth/login
// router.post('/login', [
//     emailValidation,
//     body('password')
//         .notEmpty()
//         .withMessage('Le mot de passe est requis')
// ], authController.login);

// // POST /api/auth/logout
// router.post('/logout', authController.logout);

// // ✅ ROUTE PROTÉGÉE POUR RÉCUPÉRER LE PROFIL

// // GET /api/auth/me
// router.get('/me', authMiddleware, authController.getMe);

// module.exports = router;