let passport = require('passport')
let localstratergy = require('passport-local').Strategy
let User = require('./models/users');


exports.local = passport.use(new localstratergy(User.authenticate()))
//the incomming request will be handelled by the passport local mongoose
//it will extract the username and pw, using in build .authenticate() fn 
//authenticate is a inbuild function to authenticate the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ser/ deser are in users model by use of passport plugin used there,
//it takes care of session requirement 