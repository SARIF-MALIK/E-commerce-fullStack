const mongoose = require('mongoose'); 
const Product = require('./models/Product'); 


let products = [
    {
        name:'Golgappe', 
        img: 'https://media.istockphoto.com/id/1428926221/photo/dahi-puri-a-snack-popular-in-india.jpg?s=2048x2048&w=is&k=20&c=A6qrA0DsCPnkOoMV7rYs6qBC33ef2rm7InnR69hic80=',
        price: 30, 
        instock: true,
        desc: "Khao peyo aaish kro mitro"
    },
    {
        name:'Raj-kachori', 
        img: 'https://media.istockphoto.com/id/1185465220/photo/raj-kachori-chaat.jpg?s=2048x2048&w=is&k=20&c=ZnyEBJNf3G4rfnqoQ8zPPxjYxl32VXnZW3liTez_Nx0=',
        price: 150, 
        instock: true,
        desc: "bada golgappa hu mai"
    }, 
    {
        name:'Dahi-bhalle', 
        img: 'https://media.istockphoto.com/id/1185465220/photo/raj-kachori-chaat.jpg?s=2048x2048&w=is&k=20&c=ZnyEBJNf3G4rfnqoQ8zPPxjYxl32VXnZW3liTez_Nx0=',
        price: 80, 
        instock: false,
        desc: "mai hu dahi, khaalo mujhe friends"
    }, 
    {
        name:'Momos', 
        img: 'https://media.istockphoto.com/id/1185465220/photo/raj-kachori-chaat.jpg?s=2048x2048&w=is&k=20&c=ZnyEBJNf3G4rfnqoQ8zPPxjYxl32VXnZW3liTez_Nx0=',
        price: 180, 
        instock: true,
        desc:"5 ke veg 5 ke non veg, chitte vaali chutney"
    } 
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("DB seeded successfully");  
}

module.exports = seedDB; 


