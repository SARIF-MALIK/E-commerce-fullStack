const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const path = require('path'); 
const {Schema} = mongoose; 
const seedDB = require('./seed'); 
var methodOverride = require('method-override')
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews'); 


mongoose.connect('mongodb://127.0.0.1:27017/websoldiers')  // database name websoldiers 
.then(()=>console.log('db connected'))
.catch((err)=>console.log('db not connected', err)); 


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride('_method'))

// seedDB() 

app.use(productRoutes); 
app.use(reviewRoutes);

let PORT = 8080; 
app.listen(PORT, ()=>{
    console.log('server listening to ', PORT);
})

