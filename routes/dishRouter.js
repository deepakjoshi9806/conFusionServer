
const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    
     res.end('Will send all dishes to you!');
})
.post((req, res, next) => {
    
    res.statusCode = 403; //operation not supprted 
    res.end('POST operation not supported on dishes/');

})
.put((req, res, next) => {
   
    res.end('will update the dishes/'  + res.body.name + 'with details:' + req.body.description );
    
})
.delete((req, res, next) => {
    
      res.end('deleting dishes:'); 
})

dishRouter.route('/:dishId')
.all( (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
     res.end('will send details of the dish:' + req.params.dishId+ 'to you');
    
})
.post((req, res, next) => {
    res.end('Will add the dishes: ' + req.body.name + ' with details: ' + req.body.description);
    res.write('updating dish:' + req.params.dishId + '\n'); 
})
.put((req, res, next) => {
   
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  
})
.delete((req, res, next) => {
    res.end('Deleting dish:' + req.params.dishId);
})

module.exports = dishRouter;
