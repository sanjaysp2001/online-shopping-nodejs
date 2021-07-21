const mongoose = require('mongoose');
const productSchema  = new mongoose.Schema({
    product_name:{
        type: String,
    },
    product_description:{
        type: String,
    },
    price:{
        type: Number,
        min:1,
    },
    quantity:{
        type:Number,
        min: 0,
    },
});

module.exports = mongoose.model("Product",productSchema);