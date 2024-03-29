const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('auth/signup');
})

router.post('/register', async (req, res) => {
    try {
        let { email, password, username, age, role } = req.body;
        const user = new User({ email, username, age, role })
        const newUser = await User.register(user, password);
        // res.send(newUser);
        req.login(newUser, (err)=>{
            if(err){
                return next(err)
            }
            req.flash('success', 'welcome'); 
            return res.redirect('/products')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/signup')
    }

})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        console.log(req.user)
        req.flash('success', 'welcome back')
        res.redirect('/products');
    });

// logout 

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', 'gooodBye, see you again')
      res.redirect('/products');
    });
  });

module.exports = router; 