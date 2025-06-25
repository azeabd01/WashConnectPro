// controllers/adminController.js
const User = require('../models/User');
const Product = require('../models/productModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getPendingProviders = async (req, res) => {
  try {
    const providers = await Product.find({ approved: false });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.approveProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const provider = await Product.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// module.exports = { getAllUsers };