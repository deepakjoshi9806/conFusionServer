const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promo = require('../models/promo');
promoRouter.use(bodyParser.json());
let authenticate = require('../authenticate')
promoRouter.route('/') 
.get((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    Promo.find({})
    .then((promo) => {
        res.send(promo) 
    }, (err) => next(err))
})
.post( authenticate.verifyUser ,(req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Promo.create(req.body)
    .then(()  =>{
        res.json(req.body) //need to check
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( authenticate.verifyUser ,(req, res, next) => {
    
     res.statusCode = 403; 
     res.end('PUT operation not supported on promotions/');
    
    

})
.delete( authenticate.verifyUser ,(req, res, next) => {
    Promo.remove()
    .then((promo) => {
        res.end('deleting promotion:'); 
    }, (err) => next(err))
    .catch((err) => next(err));
    
      
})



promoRouter.route('/:promoId') 

.get((req,res,next) => {
     Promo.findOne({_id:req.params.promoId}) //f changed 
     .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo); //print the promo document on screen
     }, (err) => next(err))
     .catch((err) => next(err));
   
})
.post( authenticate.verifyUser ,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Promo/'+ req.params.promoId);
})
.put( authenticate.verifyUser ,(req, res, next) => {

    Promo.findOne({_id:req.params.promoId}) 
    .then((promo) => {
        if(promo != null) {
            promo.name = req.body.name;
            promo.save()
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);  
            } ,  (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.promoId + ' not found');
            err.status = 404;
            return next(err);
        }
        
    })
})
.delete( authenticate.verifyUser ,(req, res, next) => {
   Promo.findOne({_id:req.params.promoId})
   .then((promo) => {
    if(promo != null) {
    promo.remove() 
    promo.save()
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);                
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Dish ' + req.params.promoId + ' not found');
        err.status = 404;
        return next(err);
    }
  })
})

module.exports = promoRouter;