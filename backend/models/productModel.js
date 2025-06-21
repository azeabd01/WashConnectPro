const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  inStock: { type: Boolean, default: true },
// status: {
//   type: String,
//   enum: ['Pending', 'Confirmed', 'In Progress', 'Completed'],
//   default: 'Pending'
// },
  rating: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
