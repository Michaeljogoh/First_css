const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/Users');

module.exports = function(passport){
    
passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email , password , done)=>{
        // Match User
        User.findOne({ email : email})
        .then(user =>{
            if(!user){
                return done(null, false, {msg: 'Email not registered'})
            }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null , user)
                } else {
                    return done(null, false, {msg: 'Password in correct'})
                }
            })
        })
        .catch(err => console.log(err))

    })

    )
    passport.serializeUser((user , done)=>{
        done(null, user.id);
    });
    passport.deserializeUser(( id , done)=>{
        User.findById(id, function(err, user){
            done(err , user)
        });
    });

}



