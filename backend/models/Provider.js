// const mongoose = require('mongoose');

// const providerSchema = new mongoose.Schema({
//     name: {type: String, required: true, trim: true},
//     email: {type: String, required: true, unique: true, lowercase: true},
//     password: {type: String, required: true, minlength: 6},
//     businessName: {type: String, required: true},
//     address: {street: String, city: String, postalCode: String, coordinates: {lat: Number, lng: Number}},
//     phone: {type: String, required: true}, 
//     avatar: String,
//     isVerified: {type: Boolean, default: false},
//     rating: {average: {type: Number, default: 0}, count: {type: Number,default: 0}},
//     status: {type: String, enum: ['active', 'inactive', 'suspended'], default: 'active'},
//     workingHours: {
//         monday: { open: String, close: String, isOpen: Boolean },
//         tuesday: { open: String, close: String, isOpen: Boolean },
//         wednesday: { open: String, close: String, isOpen: Boolean },
//         thursday: { open: String, close: String, isOpen: Boolean },
//         friday: { open: String, close: String, isOpen: Boolean },
//         saturday: { open: String, close: String, isOpen: Boolean },
//         sunday: { open: String, close: String, isOpen: Boolean }
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Provider', providerSchema);
