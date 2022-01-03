var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //cookie parser thru generator
var logger = require('morgan');
let session = require('express-session');
let fileStore =  require('session-file-store')(session);//? 
let passport = require('passport');
let authenticate = require('./authenticate');
let config = require('./config')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let dishRouter = require('./routes/dishRouter');
let promoRouter = require('./routes/promoRouter');
let leaderRouter = require('./routes/leaderRouter'); //added here 
//implementation of db here 
const mongoose = require('mongoose');
const dishes = require('./models/dishes');
const { sessionId } = require('session-file-store/lib/session-file-helpers');
const url = 'mongodb://127.0.0.1:27017/'; //use config.mongoURL
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log('connected to the server \n')
}, (err) => {
  console.log(err);
})
//connection established here 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321')); //cookie parser middleware 
//code inside signs the cookie and encrypts such that only the server can read it
//after setting up cookie the client need not sign in each time. he just needs to include the 
//cookie each time we requests data from server 

//tokens used to sessions removed
// app.use(session({ //setting up session middleware 
//   name: 'session-id',
//   secret:'12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new fileStore()

// }))
app.use(passport.initialize()) //passport auth begin
// app.use(passport.session())  //passport 
//
app.use('/', indexRouter); //.use is for all middle wares 
app.use('/users', usersRouter);

//tokens will be used so auth disabled, will be selectively used 
// function auth (req, res, next) {
  
//   if(!req.user) { 
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 403;
//         return next(err);
//     }
   
//   else { //signed cookie already exists 
//     next(err); 
//     } 
// }

// app.use(auth);
app.use(express.static(path.join(__dirname, 'public'))); //this allows chient to access files
//so setup authencation before this 
//middleware after this point have to go through the authorization 
//here 

// app.use('/dishes', dishRouter); 
app.use('/leaders', leaderRouter); //test only with leaders and users 
//app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
//use leaders /leaderid , promotions /promotionsid, dont use dishes its not complete
//to verify use users