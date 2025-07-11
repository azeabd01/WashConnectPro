// const Product = require('../models/productModel');
// const mongoose = require('mongoose');
// const Order = require('../models/oderProduct'); // assuming orders are linked to products
// // const User = require('../models/userModel');

// <<<<<<< HEAD
// const ProviderStats = async (req, res) => {
//   try {
//     // const providerId = req.params.id;
//     const providerId = req.provider.id;


//     const totalProducts = await Product.countDocuments({ providerId });
//     const totalStock = await Product.aggregate([
//       { $match: { providerId: require('mongoose').Types.ObjectId(providerId) } },
//       { $group: { _id: null, total: { $sum: '$stock' } } }
//     ]);

//     const stockCount = totalStock[0]?.total || 0;

//     const orders = await Order.find({ providerId });
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
//     const totalOrders = orders.length;

//     res.json({
//       totalProducts,
//       stockCount,
//       totalRevenue,
//       totalOrders
//     });
//   } catch (err) {
//     console.error('Error in getProviderStats:', err);
//     res.status(500).json({ error: 'Failed to fetch provider dashboard stats' });
//   }
// };

// =======
// >>>>>>> origin/feature/fix-erreur
// const getProducts = async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;
//   const skip = (page - 1) * limit;
//   const providerProductId = req.product.id; // venant du token

//   try {
//     const total = await Product.countDocuments({ providerProductId });
//     const products = await Product.find({ providerProductId }).skip(skip).limit(limit);
//     res.json({
//       products,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalItems: total
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching products' });
//   }
// };

// // GET by ID
// const getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST create
// const createProduct = async (req, res) => {
//   try {
//     const providerProductId = req.product.id; // venant de ton middleware d’authentification

//     const newProduct = new Product({
//   ...req.body,
//   providerProductId: req.product.id
// });
//     const saved = await newProduct.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// <<<<<<< HEAD




// =======
// // PUT update
// >>>>>>> origin/feature/fix-erreur
// const updateProduct = async (req, res) => {
//   try {
//     const providerProductId = req.product.id; // from auth middleware
//     const productId = req.params.id;

//     // ✅ Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({ message: 'Invalid product ID format' });
//     }

//     // ✅ Check product exists
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
      
//     }

//     // ✅ Verify ownership
// if (product.providerProductId.toString() !== req.product.id.toString()) {
//       return res.status(403).json({ message: 'Access denied - you can only update your own products' });
//     }

//     // ✅ Validate input
//     const { name, price, description, image, stock, inStock } = req.body;

//     if (!name || !name.trim()) {
//       return res.status(400).json({ message: 'Product name is required' });
//     }

//     if (!price || parseFloat(price) <= 0) {
//       return res.status(400).json({ message: 'Valid price is required' });
//     }

//     // ✅ Prepare update
//     const updateData = {
//       name: name.trim(),
//       price: parseFloat(price),
//       description: description?.trim() || '',
//       image: image?.trim() || '',
//       stock: parseInt(stock) || 0,
//       inStock: Boolean(inStock)
//     };

//     // ✅ Update product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     res.json({
//       message: 'Product updated successfully',
//       product: updatedProduct
//     });

//   } catch (err) {
//     console.error('Update product error:', err);

//     if (err.name === 'ValidationError') {
//       const errors = Object.values(err.errors).map(e => e.message);
//       return res.status(400).json({ message: errors.join(', ') });
//     }

//     res.status(500).json({ message: 'Internal server error' });
//   }

// };


// const deleteProduct = async (req, res) => {
//   try {
//     const providerProductId = req.product.id;
//     const product = await Product.findById(req.params.id);

//     // Check if product exists
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Ownership check
//     if (!product.providerProductId.equals(providerProductId)) {
//       return res.status(403).json({ message: 'Access denied - you can only delete your own products' });
//     }

//     // Delete product
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted successfully' });

//   } catch (err) {
//     console.error('Delete product error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// <<<<<<< HEAD
// =======
// // DELETE
// const deleteProduct = async (req, res) => {
//   try {
//     const providerProductId = req.product.id;
//     const product = await Product.findById(req.params.id);

//     // if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

//     // if (product.providerProductId.toString() !== providerProductId) {
//     //   return res.status(403).json({ message: 'Accès refusé' });
//     // }
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// >>>>>>> origin/feature/fix-erreur

// const getProductAnalytics = async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();
//     const averagePrice = await Product.aggregate([
//       { $group: { _id: null, avg: { $avg: "$price" } } }
//     ]);
//     const lowStock = await Product.countDocuments({ stock: { $lt: 5 } });
//     const inStock = await Product.countDocuments({ inStock: true });

//     const topRated = await Product.find().sort({ rating: -1 }).limit(5);

//     res.json({
//       totalProducts,
//       averagePrice: averagePrice[0]?.avg || 0,
//       lowStock,
//       inStock,
//       topRated
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load analytics' });
//   }
// };
// <<<<<<< HEAD


// const getPublicProducts = async (req, res) => {
//     try {
//         const { category } = req.query;
        
//         console.log('=== DEBUG: getPublicProducts called ===');
//         console.log('Request query:', req.query);
//         console.log('Category parameter:', category);
        
//         // Build filter
//         let filter = { isActive: true };
        
//         if (category && category !== 'all') {
//             filter.category = category;
//         }
        
//         console.log('Filter being used:', filter);
        
//         // First, let's check if there are ANY products in the database
//         const totalProducts = await Product.countDocuments({});
//         console.log('Total products in database:', totalProducts);
        
//         // Check products with isActive: true
//         const activeProducts = await Product.countDocuments({ isActive: true });
//         console.log('Active products in database:', activeProducts);
        
//         // Check products by category
//         if (category && category !== 'all') {
//             const categoryProducts = await Product.countDocuments({ category: category });
//             console.log(`Products with category '${category}':`, categoryProducts);
//         }
        
//         // Get all products (no pagination)
//         const products = await Product.find(filter)
//             .populate('providerId', 'businessName email phone address')
//             .sort({ createdAt: -1 });
        
//         console.log('Products found with filter:', products.length);
//         console.log('First product (if any):', products[0] || 'No products found');
        
//         // Let's also get a sample of all products to see their structure
//         const sampleProducts = await Product.find({}).limit(3);
//         console.log('Sample products from DB:', sampleProducts.map(p => ({
//             name: p.name,
//             category: p.category,
//             isActive: p.isActive,
//             providerId: p.providerId
//         })));
        
//         res.json({
//             products,
//             debug: {
//                 totalProducts,
//                 activeProducts,
//                 foundProducts: products.length,
//                 filter
//             }
//         });
//     } catch (err) {
//         console.error('Error in getPublicProducts:', err);
//         res.status(500).json({ message: 'Erreur serveur', error: err.message });
//     }
// };

// // ✅ Get products by provider (optional - if still needed)
// const getProductsByProvider = async (req, res) => {
//     try {
//         const { category } = req.query;
        
//         let filter = {
//             providerId: req.params.providerId,
//             isActive: true
//         };
        
//         if (category && category !== 'all') {
//             filter.category = category;
//         }
        
//         const products = await Product.find(filter)
//             .populate('providerId', 'businessName email phone address')
//             .sort({ createdAt: -1 });
        
//         res.json({
//             products
//         });
//     } catch (err) {
//         console.error('Error in getProductsByProvider:', err);
//         res.status(500).json({ message: 'Erreur serveur', error: err.message });
//     }
// };




// =======
// >>>>>>> origin/feature/fix-erreur
// module.exports = {
//   ProviderStats,
//   getPublicProducts,
//   getProductAnalytics,
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductsByProvider
// };
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const Order = require('../models/oderProduct'); // assuming orders are linked to products
// const User = require('../models/userModel');

const ProviderStats = async (req, res) => {
  try {
    // const providerId = req.params.id;
    const providerId = req.provider.id;


    const totalProducts = await Product.countDocuments({ providerId });
    const totalStock = await Product.aggregate([
      { $match: { providerId: require('mongoose').Types.ObjectId(providerId) } },
      { $group: { _id: null, total: { $sum: '$stock' } } }
    ]);

    const stockCount = totalStock[0]?.total || 0;

    const orders = await Order.find({ providerId });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const totalOrders = orders.length;

    res.json({
      totalProducts,
      stockCount,
      totalRevenue,
      totalOrders
    });
  } catch (err) {
    console.error('Error in getProviderStats:', err);
    res.status(500).json({ error: 'Failed to fetch provider dashboard stats' });
  }
};

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const providerProductId = req.product.id; // venant du token

  try {
    const total = await Product.countDocuments({ providerProductId });
    const products = await Product.find({ providerProductId }).skip(skip).limit(limit);
    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// GET by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create
const createProduct = async (req, res) => {
  try {
    const providerProductId = req.product.id; // venant de ton middleware d’authentification

    const newProduct = new Product({
  ...req.body,
  providerProductId: req.product.id
});
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





const updateProduct = async (req, res) => {
  try {
    const providerProductId = req.product.id; // from auth middleware
    const productId = req.params.id;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    // ✅ Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
      
    }

    // ✅ Verify ownership
if (product.providerProductId.toString() !== req.product.id.toString()) {
      return res.status(403).json({ message: 'Access denied - you can only update your own products' });
    }

    // ✅ Validate input
    const { name, price, description, image, stock, inStock } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    if (!price || parseFloat(price) <= 0) {
      return res.status(400).json({ message: 'Valid price is required' });
    }

    // ✅ Prepare update
    const updateData = {
      name: name.trim(),
      price: parseFloat(price),
      description: description?.trim() || '',
      image: image?.trim() || '',
      stock: parseInt(stock) || 0,
      inStock: Boolean(inStock)
    };

    // ✅ Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (err) {
    console.error('Update product error:', err);

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: errors.join(', ') });
    }

    res.status(500).json({ message: 'Internal server error' });
  }

};


const deleteProduct = async (req, res) => {
  try {
    const providerProductId = req.product.id;
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ownership check
    if (!product.providerProductId.equals(providerProductId)) {
      return res.status(403).json({ message: 'Access denied - you can only delete your own products' });
    }

    // Delete product
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });

  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getProductAnalytics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const averagePrice = await Product.aggregate([
      { $group: { _id: null, avg: { $avg: "$price" } } }
    ]);
    const lowStock = await Product.countDocuments({ stock: { $lt: 5 } });
    const inStock = await Product.countDocuments({ inStock: true });

    const topRated = await Product.find().sort({ rating: -1 }).limit(5);

    res.json({
      totalProducts,
      averagePrice: averagePrice[0]?.avg || 0,
      lowStock,
      inStock,
      topRated
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load analytics' });
  }
};


const getPublicProducts = async (req, res) => {
    try {
        const { category } = req.query;
        
        console.log('=== DEBUG: getPublicProducts called ===');
        console.log('Request query:', req.query);
        console.log('Category parameter:', category);
        
        // Build filter
        let filter = { isActive: true };
        
        if (category && category !== 'all') {
            filter.category = category;
        }
        
        console.log('Filter being used:', filter);
        
        // First, let's check if there are ANY products in the database
        const totalProducts = await Product.countDocuments({});
        console.log('Total products in database:', totalProducts);
        
        // Check products with isActive: true
        const activeProducts = await Product.countDocuments({ isActive: true });
        console.log('Active products in database:', activeProducts);
        
        // Check products by category
        if (category && category !== 'all') {
            const categoryProducts = await Product.countDocuments({ category: category });
            console.log(`Products with category '${category}':`, categoryProducts);
        }
        
        // Get all products (no pagination)
        const products = await Product.find(filter)
            .populate('providerId', 'businessName email phone address')
            .sort({ createdAt: -1 });
        
        console.log('Products found with filter:', products.length);
        console.log('First product (if any):', products[0] || 'No products found');
        
        // Let's also get a sample of all products to see their structure
        const sampleProducts = await Product.find({}).limit(3);
        console.log('Sample products from DB:', sampleProducts.map(p => ({
            name: p.name,
            category: p.category,
            isActive: p.isActive,
            providerId: p.providerId
        })));
        
        res.json({
            products,
            debug: {
                totalProducts,
                activeProducts,
                foundProducts: products.length,
                filter
            }
        });
    } catch (err) {
        console.error('Error in getPublicProducts:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// ✅ Get products by provider (optional - if still needed)
const getProductsByProvider = async (req, res) => {
    try {
        const { category } = req.query;
        
        let filter = {
            providerId: req.params.providerId,
            isActive: true
        };
        
        if (category && category !== 'all') {
            filter.category = category;
        }
        
        const products = await Product.find(filter)
            .populate('providerId', 'businessName email phone address')
            .sort({ createdAt: -1 });
        
        res.json({
            products
        });
    } catch (err) {
        console.error('Error in getProductsByProvider:', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};




module.exports = {
  ProviderStats,
  getPublicProducts,
  getProductAnalytics,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByProvider
};