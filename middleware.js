const Product = require('./models/Product');
let  {productSchema, reviewSchema} = require('./schema'); 


let validateProduct = (req, res, next)=>{
    let {name, img, price, instock, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, instock, desc})
    if(error){
       let msg = error.details.map((err)=> err.message).join(', ')
        return res.render('error', {err: msg})
    }
    next(); 
}

let validateReview = (req, res, next)=>{
    let {rating, comment} = req.body; 
    const {error} = reviewSchema.validate({rating, comment})
    if(error){
       let msg = error.details.map((err)=> err.message).join(', ')
        return res.render('error', {err: msg})
    }
    next(); 
}   

const isLoggedIn = (req, res, next)=>{
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).send('unauthorised');
        // console.log(req.xhr);//ajax hai ya nhi hai?
    }
    
    if(!req.isAuthenticated()){
        req.flash('error', 'please login first'); 
        return res.redirect('/login'); 
    }
    next(); 
}

const isSeller = (req, res, next)=>{
    if(!req.user.role || req.user.role !== 'seller'){
        req.flash('error', 'You do not have the permission to do that'); 
        return res.redirect('/products'); 
    }
    next(); 
}

const isProductAuther = async (req, res, next)=>{
    let {id} = req.params; // product id 
    let product = await Product.findById(id) // entire product 
    if(!product.author.equals(req.user._id)){
        req.flash('error', 'You are not authorized user'); 
        return res.redirect('/products'); 
    }
    next(); 
}

module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isProductAuther}; 