const express = require('express'); 
const Review = require('../models/Review');
const Product = require('../models/Product');
const { validateReview } = require('../middleware');

const router = express.Router(); 


router.post('/products/:id/review', validateReview, async (req, res)=>{
  try{
    let {id} = req.params; 
    let {rating, comment} = req.body; 


    // let review = await Review.create({rating, comment});  // or 
    let review = new Review({rating, comment}); 
    let foundProduct = await Product.findById(id); 
    // console.log(foundProduct,'sam');
    // let {_id} = review; 
    // Product.reviews.push(_id); 
    foundProduct.reviews.push(review); 

    await foundProduct.save(); 
    await review.save(); 
    req.flash('success' , 'Review added successfully');
    res.redirect(`/products/${id}`);
  }
  catch(e){
    res.status(500).render('error', {err:e})
  }
})

module.exports = router; 