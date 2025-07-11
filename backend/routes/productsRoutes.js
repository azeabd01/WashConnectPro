const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics ,
  ProviderStats
} = require('../controllers/productController');
const { authMiddlewareProduct ,authProvider } = require('../middlewares/authMiddlewareProduct');

const router = express.Router();
router.get('/stats/:id', authProvider, ProviderStats);


router.get('/', authMiddlewareProduct, getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddlewareProduct, createProduct);
router.put('/:id', authMiddlewareProduct, updateProduct);
router.delete('/:id', authMiddlewareProduct, deleteProduct);
router.get('/products/analytics', getProductAnalytics);





module.exports = router;