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
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// passport 
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

app.use(productRoutes); 
app.use(reviewRoutes);
app.use(authRoutes); 

let PORT = 8080; 
app.listen(PORT, ()=>{
    console.log('server listening to ', PORT);
})

