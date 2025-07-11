// // ===== models/User.js =====
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // Schéma de base pour tous les utilisateurs
// const baseUserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false
//     },
//     phone: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     avatar: {
//         type: String,
//         default: null
//     },
//     status: {
//         type: String,
//         enum: ['active', 'inactive', 'suspended'],
//         default: 'active'
//     },
//     address: {
//         street: String,
//         city: String,
//         postalCode: String,
//         country: String
//     },
//     rating: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 5
//     },
//     reviewsCount: {
//         type: Number,
//         default: 0
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     lastLogin: {
//         type: Date
//     }
// }, {
//     discriminatorKey: 'userType', // Clé pour différencier les types
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// });

// // Index pour optimiser les recherches
// baseUserSchema.index({ email: 1 });
// baseUserSchema.index({ userType: 1 });
// baseUserSchema.index({ status: 1 });

// // Middleware pour hasher le mot de passe
// baseUserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Méthode pour comparer les mots de passe
// baseUserSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// // Modèle de base
// const User = mongoose.model('User', baseUserSchema);

// // Schéma spécifique pour les Providers (Prestataires)
// const providerSchema = new mongoose.Schema({
//     businessName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     workingHours: {
//         type: Map,
//         of: {
//             open: String,
//             close: String,
//             isOpen: Boolean
//         },
//         default: function () {
//             return new Map([
//                 ['monday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['tuesday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['wednesday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['thursday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['friday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['saturday', { open: '08:00', close: '18:00', isOpen: true }],
//                 ['sunday', { open: '09:00', close: '17:00', isOpen: false }]
//             ]);
//         }
//     },
//     services: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Service'
//     }]
// });

// // Schéma spécifique pour les Clients
// const clientSchema = new mongoose.Schema({
//     preferences: {
//         notifications: {
//             email: { type: Boolean, default: true },
//             sms: { type: Boolean, default: false }
//         },
//         language: { type: String, default: 'fr' }
//     }
// });

// // Schéma spécifique pour les Fournisseurs
// const fournisseurSchema = new mongoose.Schema({
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         default: 'fournisseur'
//     },
//     inStock: {
//         type: Boolean,
//         default: true
//     },
//     products: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product'
//     }]
// });

// // Créer les discriminateurs
// const Provider = User.discriminator('provider', providerSchema);
// const Client = User.discriminator('client', clientSchema);
// const Fournisseur = User.discriminator('fournisseur', fournisseurSchema);

// module.exports = {
//     User,
//     Provider,
//     Client,
//     Fournisseur
// };




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String, required: true, unique: true, lowercase: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false  //ce champ n’est pas renvoyé par défaut dans les requêtes

    },
    phone: { type: String, required: true },
    role: { type: String, enum: ['client', 'provider', 'admin'], default: 'client' },
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
}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
