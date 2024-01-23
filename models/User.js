const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose');

// Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
// therefore username & password auto added 
const userSchema = new mongoose.Schema({
    email:{  
        type:String,  
        required: true, 
        trim: true
    },       
}, {timestamps: true})

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model('User', userSchema); 

module.exports = User; 