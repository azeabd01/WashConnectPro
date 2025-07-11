// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   providerProductId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ProviderProduct',
//     required: true
//   },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: String,
//   image: String,
//   stock: { type: Number, default: 0 },
//   inStock: { type: Boolean, default: true },
//   // status: {
//   //   type: String,
//   //   enum: ['Pending', 'Confirmed', 'In Progress', 'Completed'],
//   //   default: 'Pending'
//   // },

//   // ✅ Ajout requis pour éviter les conflits d'index
//   sku: {
//       type: String,
//       unique: true,
//       default: function () {
//           return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//       }
//   },

//   rating: { type: Number, default: 0, min: 0, max: 5 },
//   createdAt: { type: Date, default: Date.now }
// });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  providerProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProviderProduct',
    // required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  // ✅ Added category field to match frontend expectations
  category: {
    type: String,
    required: true,
    enum: ['soin', 'accessoire', 'entretien', 'other']
  },
  stock: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  // ✅ Added isActive field for controller filtering
  isActive: { type: Boolean, default: true },
  // ✅ Added providerId field for controller filtering
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', // or whatever your provider model is called
    // required: true
  },
  
  // ✅ Ajout requis pour éviter les conflits d'index
  sku: {
      type: String,
      unique: true,
      default: function () {
          return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
  },
  
  rating: { type: Number, default: 0, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;