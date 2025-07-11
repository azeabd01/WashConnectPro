const express = require('express');
const router = express.Router();
const {
    getProductsByProvider,
    getPublicProducts
} = require('../controllers/productController');

// router.get('/', getActiveServices);
router.get('/products/provider/:providerId', getProductsByProvider);
router.get('/products', getPublicProducts);

module.exports = router;
