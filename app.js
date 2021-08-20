const express = require('express');
const router = express.Router();
const path = require('path')
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");


//passport config:
require('./config/passport')(passport)


//mongoose
mongoose.connect('mongodb://localhost/tests',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));



//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);



//bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//BodyParser
app.use(express.urlencoded({extended : false}));


//express session
app.use(session({
 secret : 'secret',
 resave : true,
 saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})



//Routes
app.use('/',require('./routes/index'));
/*app.use('/users',require('./routes/users'));
app.use('/admin',require('./routes/admin'));*/


require('users')(app)



app.listen(3039); 