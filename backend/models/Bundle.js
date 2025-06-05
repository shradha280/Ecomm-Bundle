const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            price: Number,
            onSale: Boolean,
            salePrice: Number
        }
    ],
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bundle', bundleSchema);
