const express = require('express');
const { getAdminStats }   = require('../controllers/adminController');
const Client = require('../models/Client');
const Provider = require('../models/Provider');
const User = require('../models/User');
const ProviderProduct = require('../models/ProviderProduct');

const router = express.Router();

// GET /api/admin/stats
// router.get('/stats', getAdminStats);
// router.get('/allProviders', getAllProviders); 

// Get all registered users
// router.get('/admin', async (req, res) => {
//   try {
//     const clients = await Client.find().select('-password');
//     const providers = await Provider.find().select('-password');
//     const providerProducts = await ProviderProduct.find().select('-password');

//     // Add role manually to distinguish
//     const allUsers = [
//       ...clients.map(u => ({ ...u.toObject(), role: 'client' })),
//       ...providers.map(u => ({ ...u.toObject(), role: 'provider' })),
//       ...providerProducts.map(u => ({ ...u.toObject(), role: 'providerProduct' })),
//     ];

//     res.json(allUsers);
//   } catch (err) {
//     console.error('Error fetching all users:', err);
//     res.status(500).json({ message: 'Failed to fetch users' });
//   }
// });

// GET /api/admin?role=client
// router.get('/admin', async (req, res) => {
//   const { role } = req.query;
//   const query = role ? { role } : {};
//   const users = await Client.find(query).sort({ createdAt: -1 });
//   res.json(users);
// });
// /api/admin?page=1&limit=10
// router.get('/', async (req, res) => {
//   const { page = 1, limit = 10, role } = req.query;
//   const query = role ? { role } : {};
//   const users = await Client.find(query)
//     .skip((page - 1) * limit)
//     .limit(Number(limit));
//   const total = await Client.countDocuments(query);
//   res.json({ users, total });
// });

// Assuming you have already required express and your Client model

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    // Build query object conditionally
    const query = {};
    if (role && role !== 'all') {
      query.role = role;
    }

    // Convert page and limit to numbers for safety
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    // Fetch paginated users with optional role filter
    const users = await Client.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Count total documents with the same filter for pagination
    const total = await Client.countDocuments(query);

    // Send JSON response with users array and total count
    res.json({ users, total });
  } catch (error) {
    console.error('Failed to get users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// GET /api/admin/provider-products?page=1&limit=5
router.get('/provider-products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProviderProduct.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProviderProduct.countDocuments()
    ]);

    res.json({ products, total });
  } catch (err) {
    console.error('Error fetching provider products:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.patch('/provider-products/:id/status', async (req, res) => {
  try {
    const product = await ProviderProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.status = product.status === 'active' ? 'inactive' : 'active';
    await product.save();
    res.json({ message: 'Status updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/sa', async (req, res) => {
  try {
    const clientCount = await Client.countDocuments();
    const providerCount = await Provider.countDocuments();
    const verifiedProviderCount = await Provider.countDocuments({ isVerified: true });
    const providerProductCount = await ProviderProduct.countDocuments();

    res.json({
      totalClients: clientCount,
      totalProviders: providerCount,
      verifiedProviders: verifiedProviderCount,
      providerProducts: providerProductCount
    });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/allProviders', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});
module.exports = router;
