const Product = require('../models/productModel');


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


// PUT update
const updateProduct = async (req, res) => {
  try {
    const providerProductId = req.product.id;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    if (product.providerProductId.toString() !== providerProductId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
     const providerProductId = req.product.id;
    const product = await Product.findById(req.params.id);

    // if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    // if (product.providerProductId.toString() !== providerProductId) {
    //   return res.status(403).json({ message: 'Accès refusé' });
    // }
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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





module.exports = {
  getProductAnalytics,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
