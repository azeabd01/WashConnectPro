const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingNumber: { type: String, unique: true, required: true },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true,
    },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: String,
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: String, required: true },       // ex: '2025-07-08'
    startTime: { type: String, required: true },  // ex: '09:30'
    endTime: { type: String, required: true },    // ex: '10:00'
    // scheduledDate: { type: String, required: true },  // ex: '2025-07-08'
    // scheduledTime: { type: String, required: true },  // ex: '09:30-10:00'
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    vehicleInfo: {
        make: String,
        model: String,
        year: Number,
        color: String,
        licensePlate: String
    },
    price: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online'],
        default: 'cash'
    },
    notes: String,
    rating: {
        score: { type: Number, min: 1, max: 5 },
        comment: String,
        date: Date
    },
    completedAt: Date,
    cancelledAt: Date,
    cancellationReason: String
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
    if (!this.bookingNumber) {
        const count = await mongoose.model('Booking').countDocuments();
        this.bookingNumber = `LAV${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;
    }
    next();
});
module.exports = mongoose.model('Booking', bookingSchema);

