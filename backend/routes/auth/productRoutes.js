// routes/auth/productRoutes.js
const express = require('express');
const { body } = require('express-validator');
const productController = require('../../controllers/auth/productController');
const auth = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register/product', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('businessName').notEmpty(),
    body('phone').isMobilePhone()
], productController.register);

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], productController.login);

router.get('/me', auth, productController.getMe);

module.exports = router;
