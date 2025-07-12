// const express = require('express');
// const {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductAnalytics ,
//   ProviderStats ,rateProduct
// } = require('../controllers/productController');
// const { authMiddlewareProduct ,authProvider } = require('../middlewares/authMiddlewareProduct');
// // const { rateProduct } = require('../controllers/productController');

// const router = express.Router();


// router.post('/:id/rate',rateProduct );
// router.get('/stats/:id', authProvider, ProviderStats);


// router.get('/', authMiddlewareProduct, getProducts);
// router.get('/:id', getProduct);
// router.post('/', authMiddlewareProduct, createProduct);
// router.put('/:id', authMiddlewareProduct, updateProduct);
// router.delete('/:id', authMiddlewareProduct, deleteProduct);
// router.get('/products', getProductAnalytics);





// module.exports = router;

const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics,
  ProviderStats,
  rateProduct
} = require('../controllers/productController');
const { authMiddlewareProduct, authProvider } = require('../middlewares/authMiddlewareProduct');

const router = express.Router();

// ✅ IMPORTANT: Put analytics route BEFORE the /:id route to avoid conflicts
router.get('/analytics', getProductAnalytics);

// Rating route
router.post('/:id/rate', rateProduct);

// Provider stats route  
router.get('/stats/:id', authProvider, ProviderStats);

// CRUD routes
router.get('/', authMiddlewareProduct, getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddlewareProduct, createProduct);
router.put('/:id', authMiddlewareProduct, updateProduct);
router.delete('/:id', authMiddlewareProduct, deleteProduct);

module.exports = router;