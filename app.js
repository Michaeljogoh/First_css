const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');






const db = require('./config/keys').mongoURI;
// db config

 require('./config/passport')(passport);

// mongoose connect
mongoose.connect('mongodb://localhost:27017/ghostDB', {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log('MongoDB Connected....'))
.catch(err => console.log(err))

// passport confi


// bodyparser
app.use(express.urlencoded({extended: true}));

// express session
app.use(session({secret:'secret', resave: true, saveUninitialized:true}));
// flash
app.use(flash());
//global var
app.use(( req, res , next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


// routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
// bodyparser
app.use(express.static('./public'));

// app.get('/', (req, res)=>{
//     res.render('index')
// });

// server
app.listen(3000, ()=>{
    console.log('server started at port 3000')
})