// 📁 validations/providerValidation.js
const { body } = require('express-validator');

const updateProvider = [
    body('name').optional().isString().withMessage('Nom invalide'),
    body('email').optional().isEmail().withMessage('Email invalide'),
    body('phone').optional().isString().isLength({ min: 6 }).withMessage('Téléphone invalide'),
    body('businessName').optional().isString().withMessage("Nom d'entreprise invalide"),
    body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Statut invalide'),
    body('address.street').optional().isString(),
    body('address.city').optional().isString(),
    body('address.postalCode').optional().isString(),
    body('workingHours').optional().isObject().withMessage('Format horaires invalide'),
    body('avatar').optional().isURL().withMessage("Avatar doit être une URL valide")
];
module.exports = {updateProvider};