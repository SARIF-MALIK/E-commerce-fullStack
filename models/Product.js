const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    name:{
        type:String, 
        required: true,
        trim: true,
    }, 
    img:{
        type:String,
    }, 
    price:{
        type:Number, 
        required: true,
        min:0,
    }, 
    instock:{
        type:Boolean, 
        required: true
    }, 
    desc:{
        type:String
    }, 
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review'
        }
    ]
})

let Product = mongoose.model('Product', productSchema);   // model returns a class js class , model is singular 

module.exports = Product; 