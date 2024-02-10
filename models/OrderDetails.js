import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    totalAmount: Number,
    paymentId: String,
    isOrderConfirmed: { type: Boolean, default: false }, // New field to track order confirmation status
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Delivered, etc.
    address: String // Address of the order
});

export default mongoose.model('Order', orderSchema);