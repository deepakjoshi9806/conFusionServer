const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
  
     res.end('Will send all promotions to you!');
})
.post((req, res, next) => {
   
    res.statusCode = 403; //operation not supprted 
    res.end('POST operation not supported on promotions/');
    
})
.put((req, res, next) => {
  
    res.end('will update the promotion/'  + res.body.name + 'with details:' + req.body.description );
    
})
.delete((req, res, next) => {
   
      res.end('deleting promotion:'); 
})



promoRouter.route('/:promoId') //specify end point other than index
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
     res.end('will send details of the promotion:' + req.params.promoId+ 'to you');
   
})
.post((req, res, next) => {
    res.write('updating promotion:' + req.params.promoId + '\n')
   res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    
})
.put((req, res, next) => {
     res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
   
})
.delete((req, res, next) => {
    res.end('Deleting promotion:' + req.params.promoId);
    
})

module.exports = promoRouter;