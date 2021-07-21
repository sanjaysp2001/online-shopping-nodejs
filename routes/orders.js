const router = require('express').Router();
const Order = require('../models/order');
const Product = require('../models/product');
const auth = require('../authenticate');

router.get('/all',auth.verifyUser,auth.verifyOwner,(req,res)=>{
    Order.find({})
    .populate('user_detail')
    .then((result) => {

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(result);

    }).catch((err) => {

        res.setHeader('Content-Type','application/json');
        res.json(err);

    });
});

router.post('/new',auth.verifyUser, async(req,res)=>{
    req.body.user = req.user._id;
    var orders = req.body.order_detail;
    orders.forEach(async function(order){
       var product = await Product.findOne({_id:order.product_id});
        if(product != null){
            if(product.quantity == 0){
                res.statusCode = 400;
                res.setHeader('Content-Type','application/json');
                res.json({message:`Sorry! This Product ${order.product_id} is Out of Stock`});
            }
            else if(product.quantity < order.quantity){
                res.statusCode = 400;
                res.setHeader('Content-Type','application/json');
                res.json({message:`Insufficient Stock. Please reduce your Order Quantity for Product:${order.product_id}`});
            }
            else{
                product.quantity = product.quantity-order.quantity;
            }
            await product.save()
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type','application/json');
            res.json({message:"Product not found or Inavalid Product ID"})
        }
    });

    setTimeout(async() => {
        var createdOrder = await Order.create(req.body)
        if(createdOrder != null){
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message:"Order placed Sucessfully!",details:createdOrder});
        }
        else{
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.json({message:"Error Occoured"})
        }
    }, 3000);
    
});

router.get('/myorders',auth.verifyUser,(req,res)=>{
    var filter = {
        __v: false,
        user: false,
        updatedAt: false
    }
    Order.find({user:req.user._id},filter)
    .then((result) => {
        res.setHeader('Content-Type','application/json');
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
})

module.exports = router;