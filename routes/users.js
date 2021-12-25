var express = require('express');
const bodyParser = require('body-parser');
let User = require('../models/users');
var router = express.Router();
router.use(bodyParser.json()); //talk in form of json documents


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req,res, next) {
//end point is signup, signup new users into the system
  User.findOne({ //find in server if the username exixts
    username: req.body.username
  })
  //if the user already exixts then dont allow another user to signup with the same username
  .then((user) => { //user has username from server if there is any
    if(user != null ) {//user already registered  
      let err = new Error('user'+ req.body.username +'already exists');
      err.status = 403;
      next(err)
    }
    else { // user doesnt exist
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user) => { //promise returned when the new user is signed up
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json')
    res.json({status:'registration successful!', user: user})
  }, (err) => next(err) )
  .catch((err) => next(err))

});

router.post('/login', function (req,res,next) {
  //same code for registration

  if(!req.session.user) { //1st time entry, no cookie/session
    var authHeader = req.headers.authorization;//basic auth
    if (!authHeader) { //no data input, reject user
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    User.findOne({username: username}) //find entry for the given username
    .then((user) => {
      if(user == null) {//if there is no user in the db
        var err = new Error('user ' + username+  ' does not exist, try signing up 1st');     
          err.status = 403;
          return next(err);
      }
      else if(user.password != password) { //user exists, user provided pw != pw in server
        var err = new Error('your password is incorrect');     
        err.status = 403;
        return next(err);
      }
      else if (user.username == username && user.password == password) { //data sent from client and matched
       //user.username is the one from server 
        //stuff in server matches what the user has given as input
        req.session.user = 'authenticated';
        res.statusCode = 200; //successful authencation
        res.setHeader('Content-type', 'text/plain')
        res.end('you are authenticated!')
        next(); // authorized
        }
    })
    .catch((err) => next(err) );
  } 
  else {// when req.session.user is set[logged in earlier] , cookie/session exixts
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain')
    res.end('you are already authencated!');
  }
});

router.get('/logout', (req,res) => {
  //u logout from system, server is anyway tracking you
  if(req.session) {// session must exixt cuz its a logout operation
    req.session.destroy();// remove details from server session 
    res.clearCookie('session-id'); //delete the cookie [name: session-id] too
    res.redirect('/') //redirect to homepage of url
  }
  else {
    var err = new Error('you are not logged in');     
        err.status = 403;
        next(err); //return removed
  }
})
module.exports = router;
