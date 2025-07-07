const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics ,
  getPublicProducts
} = require('../controllers/productController');
const { authMiddlewareProduct } = require('../middlewares/authMiddlewareProduct');

const router = express.Router();



router.get('/', authMiddlewareProduct, getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddlewareProduct, createProduct);
router.put('/:id', authMiddlewareProduct, updateProduct);
router.delete('/:id', authMiddlewareProduct, deleteProduct);
router.get('/products/analytics', getProductAnalytics);
router.get('/public', getPublicProducts);


module.exports = router;
