// API : returns the data to be manipulated 
// Routes : returns the entire response .ejs files 

const express = require('express'); 
const router = express.Router();
let {isLoggedIn} = require('../../middleware')
const User = require('../../models/User')

router.post('product/:productId/like', isLoggedIn, async (req, res)=>{
    let {productId} = req.params; 
    let user = req.user; 
    let isLiked = user.wishList.includes(productId); 

// the $pull operator is used to removing all instances of a value from an existing array.
//  $addToSet operator adds or appends a value to an array, only if the value does not exist in the array. 
// The $addToSet returns the same array without modifying when the value already is in the array.

    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id, {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id, {$addToSet:{wishList:productId}})
    // }

    const option = isLiked? '$pull': '$addToSet'; 
    req.user = await User.findByIdAndUpdate(req.user._id, {[option]: {wishList:productId}}, {new:true})
    res.send('like done api')
    // new:true -> it returns the updated data value else data will be returned prior to updation 
})

module.exports = router; 