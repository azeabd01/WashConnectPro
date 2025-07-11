// models/Availability.js
const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    date: {
        type: String, // format: 'YYYY-MM-DD'
        required: true,
    },
    slots: [
        {
            startTime: { type: String, required: true }, // ex: '09:00'
            endTime: { type: String, required: true },   // ex: '11:00'
        },
    ],
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
