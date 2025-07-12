// ===== models / Client.js =====
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    address: {
        street: String,
        city: String,
        postalCode: String,
        country: String
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    preferences: {
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        },
        language: { type: String, default: 'fr' }
    },
    lastLogin: {
        type: Date
    },
//     role: {
//   type: String,
//   default: 'client', // or 'user'
//   enum: ['client', 'admin', 'provider']
// },

}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
