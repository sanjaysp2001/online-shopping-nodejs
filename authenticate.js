const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;


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
        res.setHeader('Content-type','application/json');
        res.statusCode = 403;
        res.json({message:"You are not authenticated to perform this operation!"})
    }
};


