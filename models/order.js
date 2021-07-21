const mongoose = require('mongoose');
const orderDetails = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity:{
        type: Number,
        min: 1,
    }
});
const orderSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_detail:[orderDetails],
}, {
    timestamps: true
});

module.exports = mongoose.model('Order',orderSchema);