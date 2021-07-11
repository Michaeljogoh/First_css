 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcrypt');
 const passport = require('passport');


//  const passport = require('../config/passport');


 
 
// User model
const User = require('../models/Users');


router.get('/login', (req , res)=>{
    res.render('login')
});


router.get('/register', (req , res)=>{
    res.render('register')
});
// Regiter handle 
router.post('/register', (req , res)=>{
    const { name , email , password , password2} = req.body;
    let errors = [];
    
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please Fill all fields'})
    }
    if(password !== password2){
        errors.push({msg: 'Password does not match'})

    }
    if(password.length < 6 ){
        errors.push({ msg: 'password must be more than six charcters'})
    }
    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2,
        })
       

    } else {
        // validated passed
        User.findOne({ email : email})
        .then(user =>{
            if(user){
                errors.push({ msg :'Email already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });

            } else {
                const newUser = new User({ name , email , password});
                bcrypt.genSalt(10 , (err , salt)=> bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    // password hash
                    newUser.password = hash;
                    // Save user
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registerd')
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))

                }))
                     }
        })
        }})
         //login handle
// login handle
router.post('/login', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
    req.flash('success_msg', 'You are logged in')
});


//logout handle

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg', 'You are logged Out');
    req.redirect('/users/login')
});



router.get("/login", (req,res)=>{
    res.render("login")
})
router.get('/fashion', (req, res)=>{
    res.render('fashion')

})
   




module.exports = router;