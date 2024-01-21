const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    img: Joi.string().trim().required(),
    
    price: Joi.number().required(),
    instock: Joi.boolean().required(),

    desc: Joi.string().trim()

})

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().trim(),
})

module.exports = {productSchema, reviewSchema}; 