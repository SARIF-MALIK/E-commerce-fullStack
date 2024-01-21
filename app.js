const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path'); 
const seedDB = require('./seed'); 
var methodOverride = require('method-override')
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews'); 
const session = require('express-session')
const flash = require('connect-flash')

mongoose.set('strictQuery', true); 
mongoose.connect('mongodb://127.0.0.1:27017/websoldiers')  // database name websoldiers 
.then(()=>console.log('db connected'))
.catch((err)=>console.log('db not connected', err)); 


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride('_method'))

// seedDB() 

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}

app.use(session(configSession));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(productRoutes); 
app.use(reviewRoutes);

let PORT = 8080; 
app.listen(PORT, ()=>{
    console.log('server listening to ', PORT);
})

