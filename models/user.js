const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,        
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
    },
    isOwner:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);