const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose');

// Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
// therefore username & password auto added 
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        trim:true,
        required:true
       },
       age:{
        type:Number,
        required:true
       }   
})

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model('User', userSchema); 

module.exports = User; 