const Product = require('../models/productModel');
const Order   = require('../models/oderProduct');
const User    = require('../models/User');

exports.getAdminStats = async (req, res) => {
  try {
    // Count total products
    const totalProducts = await Product.countDocuments();

    // Count total orders
    const totalOrders = await Order.countDocuments();

    // Count total users
    const totalUsers = await User.countDocuments();

    // Sum up all order totals
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Return as JSON
    res.json({ totalProducts, totalOrders, totalUsers, totalRevenue });
  } catch (err) {
    console.error('Error in getAdminStats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
