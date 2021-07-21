var express = require('express');
var passport = require('passport');

var User = require('../models/user');
var auth = require('../authenticate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.email}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
        user.lastname = req.body.lastname;

      user.email = req.body.email;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err:err});          
        }
        else{
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({message:"User Registration Successful!"})
        }
      });
    }
  });
});

router.post('/login',passport.authenticate('local'),(req,res)=>{
    var token = auth.getToken({_id:req.user._id})
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.json({success: true,token:token,status: 'Login Successful!'});
});

router.get('/logout',(req,res,next)=>{
    if(req.session){
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/')
    }
    else{
      var err = new Error('You are not logged in!');
      err.status = 403;
      next(err);
    }
});
module.exports = router;
