var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;


exports.local = passport.use(new LocalStrategy({
    usernameField:"email",
},User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user)=>{
    return jwt.sign(user,process.env.SECRETKEY,{expiresIn: 3600});
}

var options ={};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRETKEY;
 
exports.jwtPassport = passport.use(new JwtStrategy(options,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
}));

exports.verifyUser = passport.authenticate('jwt',{session: false});
exports.verifyOwner = (req,res,next)=>{
    if(req.user.isOwner){
        next();
    }
    else{
        var err = new Error("You are not authenticated to perform this operation!");
        res.setHeader('Content-type','application/json');
        res.statusCode = 403;
        return next(err);
    }
};


