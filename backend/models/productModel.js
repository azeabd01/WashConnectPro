const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  stock: { type: Number, default: 0 },
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



// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   price: { type: Number, required: true, min: 0 },
//   description: { type: String, trim: true },
//   image: String,
//   inStock: { type: Boolean, default: true },
//   status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // String au lieu de Boolean
//   rating: {
//     average: { type: Number, default: 0, min: 0, max: 5 },
//     count: { type: Number, default: 0 }
//   }, // Structure comme Provider
//   category: { type: String, required: true }, // Ajout catégorie
//   providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' } // Lien avec prestataire
// }, { timestamps: true }); // Ajouter timestamps

// // ✅ INDEX ICI
// productSchema.index({ category: 1, status: 1 }); // Index composé
// productSchema.index({ 'rating.average': -1 }); // Pour trier par note
// productSchema.index({ name: 'text' }); // Pour recherche textuelle

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;