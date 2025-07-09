const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics 
} = require('../controllers/productController');
const { authMiddlewareProduct } = require('../middlewares/authMiddlewareProduct');

const router = express.Router();

router.get('/',authMiddlewareProduct,  getProducts);
router.get('/:id', getProduct);
router.post('/',authMiddlewareProduct, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/products', getProductAnalytics);

module.exports = router;