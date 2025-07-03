const mongoose = require('mongoose');

const ProviderProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    // price: { type: Number, min: 0 },
    // description: { type: String, trim: true },
    // image: String,
    // inStock: { type: Boolean, default: true },
    // status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    // rating: {
        // average: { type: Number, default: 0, min: 0, max: 5 },
        // count: { type: Number, default: 0 }
    // },
    // category: { type: String },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },

    // ✅ Ajout requis pour éviter les conflits d'index
    sku: {
        type: String,
        unique: true,
        default: function () {
            return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
    }
}, { timestamps: true }); // Ajouter timestamps

// ✅ INDEX ICI
// ProviderProductSchema.index({ category: 1, status: 1 }); // Index composé
// ProviderProductSchema.index({ 'rating.average': -1 }); // Pour trier par note
ProviderProductSchema.index({ name: 'text' }); // Pour recherche textuelle

const ProviderProduct = mongoose.model('ProviderProduct', ProviderProductSchema);
module.exports = ProviderProduct;