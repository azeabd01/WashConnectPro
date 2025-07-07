// routes/auth/clientRoutes.js
const express = require('express');
const { 
    registerClient, 
    loginClient, 
    getMeClient, 
    updateClient, 
    deleteClient } = require('../../controllers/auth/clientController');
const authClient = require('../../middlewares/authClientMiddleware');
const router = express.Router();

// Exemples de validations avec express-validator si tu veux
const { body } = require('express-validator');

router.post('/register/client', [
    body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('address').trim().isLength({ min: 2 }).withMessage('Le nom de l\'entreprise doit contenir au moins 2 caractères'),
    body('phone').isMobilePhone().withMessage('Numéro de téléphone invalide')
], registerClient);

router.post('/login/client', [
    body('email').isEmail(),
    body('password').notEmpty()
], loginClient);

router.get('/me', authClient, getMeClient);
router.put('/me', authClient, updateClient);
router.delete('/me', authClient, deleteClient);

module.exports = router;
