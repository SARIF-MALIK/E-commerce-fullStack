const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path'); 
const seedDB = require('./seed'); 
var methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews'); 
const authRoutes = require('./routes/auth'); 
const cartRoutes = require('./routes/cart'); 

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
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now()+7*24*60*60*1000,     // 7 days each day 24 hr 60 min 60sec 1000 ms 
        maxAge: 7*24*60*60*1000,   // 7 days Age
    }
}

app.use(session(configSession));
app.use(flash());
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// passport 


app.use(productRoutes); 
app.use(reviewRoutes);
app.use(authRoutes); 
app.use(cartRoutes); 

app.get('*', (req, res) => {
    res.send(`<h1>404 BAD REQUEST</h1>`)
})

let PORT = 8080; 
app.listen(PORT, ()=>{
    console.log('server listening to ', PORT);
})

