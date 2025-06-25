const { body } = require('express-validator');

exports.createService = [
    body('name').trim().isLength({ min: 2 }).withMessage('Le nom est requis'),
    body('price').isNumeric().withMessage('Le prix doit être un nombre'),
    body('duration').isNumeric().withMessage('La durée doit être un nombre'),
    body('category').isIn(['exterieur', 'interieur', 'complet', 'premium', 'express'])
        .withMessage('Catégorie invalide'),
];
