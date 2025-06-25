const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true }, // en minutes
    category: {
        type: String,
        enum: ['exterieur', 'interieur', 'complet', 'premium', 'express'],
        required: true
    },
    isActive: { type: Boolean, default: true },
    images: [String],
    features: [String],
    bookingCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
