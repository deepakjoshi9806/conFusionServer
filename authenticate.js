let passport = require('passport')
let localstratergy = require('passport-local').Strategy
let User = require('./models/users');
let JwtStrategy = require('passport-jwt').Strategy; //provide us with json 
//token stratergy for configring our token module
let ExtractJwt = require('passport-jwt').ExtractJwt;
let jwt = require('jsonwebtoken');
let config = require('./config');

exports.local = passport.use(new localstratergy(User.authenticate()))
//the incomming request will be handelled by the passport local mongoose
//it will extract the username and pw, using in build .authenticate() fn 
//authenticate is a inbuild function to authenticate the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ser/ deser are in users model by use of passport plugin used there,
//it takes care of session requirement 

exports.getToken = function(user) { // user is a tokenn, this  function will  create a 
    //token and give 
    return jwt.sign(user, '12345-67890-09876-54321', 
        { expiresIn: 3600})
        //3600secs or am hr, after that the token has to renewed, in real life its sa few days
        //when u open coursera in 5-7 days it asks you to sign in again
};

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() //extract token from request/auth
opts.secretOrKey = '12345-67890-09876-54321' //config.secretKey goes here ;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
//user not found 
//this is a verify() method, it uses the token data and serches for  id of that user
exports.verifyUser = passport.authenticate('jwt', {session: false});

//we wont create sessions 