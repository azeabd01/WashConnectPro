const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false  //ce champ n’est pas renvoyé par défaut dans les requêtes

    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'prestataire', 'produit','admin'],
        default: 'client',
        required: true,
    },
    avatar: String,
    address: {
        street: String,
        city: String,
        postalCode: String
    },
    preferences: {
        notifications: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        },
        favoriteServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
