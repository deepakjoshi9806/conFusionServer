var express = require('express');
const bodyParser = require('body-parser');
let User = require('../models/users');
var router = express.Router();
let passport = require('passport');
const { authenticate } = require('passport');
router.use(bodyParser.json()); //talk in form of json documents
let authenticate1 = require('../authenticate')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'),  (req,res) => {
  //we will use body to authenticate not the authenticate dialogue box
  let token = authenticate1.getToken({_id: req.user._id}); //ask user id from client side


  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json')
  res.json({success: true, token:token,  status:'you are successfully logged in'});
  //the passport.authenticate checks for username and pw and if there is error it 
  //will not enter the callback area, if it finds a match it will enter the callback area

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
