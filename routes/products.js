const router = require('express').Router();
const auth = require('../authenticate');
const Product = require('../models/product');

//Get all the products that are in stock
router.get('/all',auth.verifyUser,(req,res,next)=>{
    Product.find({})
    .then((product) => {

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(product);

    }).catch((err) => {

        res.setHeader('Content-Type','application/json');
        res.json(err);
    });
});

//Create or add new Product
router.post('/add',auth.verifyUser,auth.verifyOwner,async (req,res,next)=>{
    console.log(req.body);
    var existingProduct = await Product.findOne({product_name:req.body.product_name})
    if(existingProduct){
        res.json({message:"Product with same name already exists!. Please check the name or add new product"})
    }
    else{
        Product.create(req.body)
        .then((product) => {

            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message:"Product added Successfully!",details:product});

        }).catch((err) => {

            res.setHeader('Content-Type','application/json');
            res.json(err);       

        });
    } 
})


//Update product using Product ID
router.put('/update/:prod_id',auth.verifyUser,auth.verifyOwner,(req,res)=>{

    var id = req.params.prod_id;
    Product.findByIdAndUpdate(id,{$set : req.body},{ new: true })
    .then((product) => {

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({message:"Product updated Successfully!",details:product});
        
    }).catch((err) => {

        res.setHeader('Content-Type','application/json');
        res.json(err);     
    });
});

module.exports = router;