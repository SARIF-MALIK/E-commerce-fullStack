const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();
const { validateProduct } = require('../middleware');

// Read all the products 
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find();
        res.render('products/index', { products });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})

// SHOW a form to add a particular products
router.get('/product/new', (req, res) => {
    res.render('products/new');
})

router.post('/products', validateProduct, async (req, res) => {
    try {
        let { name, img, price, instock, desc } = req.body;
        await Product.create({ name, img, price, instock, desc });
        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})

router.get('/products/:id', async (req, res) => {
    let { id } = req.params;
    // let foundProduct = await Product.find({_id: id}); 
    // for(item of foundProduct){
    //     console.log(item); 
    //     res.render('show', {item}); 
    // }

    let item = await Product.findById(id).populate('reviews');
    console.log(item);
    res.render('products/show', { item });
})

router.get('/products/:id/edit', async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit', { foundProduct });
})

router.patch('/products/:id/edit', async (req, res) => {
    try {
        let { id } = req.params;
        let obj = req.body;
        // await Product.deleteOne({ _id : id });
        // await Product.create(obj); 

        let { price, desc } = req.body;
        // await Product.findByIdAndUpdate(id, obj)
        await Product.findByIdAndUpdate(id, { price, desc });
        req.flash('success', 'Product edited successfully');
        res.redirect('/products');

    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.delete('/products/:id/remove', async (req, res) => {
    try {
        let { id } = req.params;
        // await Product.deleteOne({_id: id}); 
        let foundProduct = await Product.findById(id);
        for (let item of foundProduct.reviews) {
            await Review.findByIdAndDelete(item);
        }
        await Product.findByIdAndDelete(id);
        res.redirect('/products');

    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('*', (req, res) => {
    res.send(`<h1>404 BAD REQUEST</h1>`)
})

module.exports = router;

