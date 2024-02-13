const express = require('express'); 
const router = express.Router(); 
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

require('dotenv').config()
const stripeKey = process.env.stripeKey; 
const stripe = require('stripe')(stripeKey)

// route to see the cart 

router.get('/user/cart', isLoggedIn, async(req, res)=>{
    let user = await User.findById(req.user._id).populate('cart'); 
    let totalAmount = user.cart.reduce((sum, curr)=> sum+curr.price, 0); 
    res.render('cart/cart', {user, totalAmount}); 
})


// adding the product to the cart 
router.post('/user/:productId/add', isLoggedIn, async(req, res)=>{
    try {
        let {productId} = req.params; 
        let userId = req.user._id; 
    
        let product = await Product.findById(productId); 
        let user = await User.findById(userId); 
        user.cart.push(product); 
        await user.save(); 
        res.redirect('/user/cart'); 
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
   
})

router.get('/checkout/:id', async (req, res)=>{
    let userId = req.params.id; 
    let user = await User.findById(userId).populate("cart"); 
    let totalAmount = user.cart.reduce((sum, curr)=> sum+curr.price, 0); 

    let cartItems = user.cart.map((item)=>{
      return{
        
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price*100,
          },
          quantity: 1,
        
      }
    })

    const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     price_data: {
        //       currency: 'usd',
        //       product_data: {
        //         name: 'T-shirt',
        //       },
        //       unit_amount: totalAmount*100,
        //     },
        //     quantity: 1,
        //   },
        // ],
        line_items: cartItems,
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
      });
    
      res.redirect(303, session.url);
})

router.get('/success', (req, res)=>{
  req.flash('success', 'Payment done successfully');
  res.redirect('/products');
})


router.get('/cancel', (req, res)=>{
  res.render('cart/cancel'); 
})


module.exports = router; 