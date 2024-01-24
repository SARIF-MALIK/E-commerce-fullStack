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
    if(!req.isAuthenticated()){
        req.flash('error', 'please login first'); 
        return res.redirect('/login'); 
    }
    next(); 
}

module.exports = {validateProduct, validateReview, isLoggedIn}; 