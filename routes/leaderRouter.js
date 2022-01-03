const express = require('express');
const bodyParser = require('body-parser');
const leaderrouter = express.Router();
const mongoose = require('mongoose');
const Leader = require('../models/leaders');
leaderrouter.use(bodyParser.json());
let authenticate = require('../authenticate')

leaderrouter.route('/') //.all deleted
.get((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Leader.find({})
    .then((lead) => {
        res.send(lead)  
    }, (err) => next(err))
})
.post( authenticate.verifyUser ,(req, res, next) => {
    //1st the verify user middleware is executed and then server services the request if
    //verifyuser is successful
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    Leader.create(req.body)
    .then(()  =>{
        res.json(req.body) 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( authenticate.verifyUser ,(req, res, next) => {
    
     res.statusCode = 403; 
     res.end('PUT operation not supported on leaders/');
    
    

})
.delete( authenticate.verifyUser ,(req, res, next) => {
    Leader.remove()
    .then((promo) => {
        res.end('deleting promotion:'); 
    }, (err) => next(err))
    .catch((err) => next(err));
    
      
})



leaderrouter.route('/:leaderId')
.get((req,res,next) => {
     Leader.findOne({_id:req.params.leaderId}) 
     .then((lead) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lead); 
     }, (err) => next(err))
     .catch((err) => next(err));
   
})
.post( authenticate.verifyUser ,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.promoId);
})
.put( authenticate.verifyUser ,(req, res, next) => {
    Leader.findOne({_id:req.params.promoId}) 
    .then((lead) => {
        if(lead != null) {
            lead.name = req.body.name;
            Leader.save()
            .then((lead) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lead);  
            } ,  (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            err = new Error('leaders ' + req.params.leaderId + ' not found');
            err.status = 404;
            return next(err);
        }
        
    })
})
.delete( authenticate.verifyUser ,(req, res, next) => {
   Leader.findOne({_id:req.params.leaderId})
   .then((lead) => {
    if(lead != null) {
        lead.remove() 
        lead.save()
        .then((lead) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(lead);                
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('leaders ' + req.params.leaderId + ' not found');
        err.status = 404;
        return next(err);
    }
  })
})

module.exports = leaderrouter;