const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency; //currency schema is now defined 

const commentschema = new Schema({
    rating: {
        type: String,
        min:1,
        max:5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //this has ref to a model 
        ref : 'User' //ref to schema Users.js
        //when a user is logged in, he gives his name , that name first and last is used 
        // its object id is refereced to auther field here  
        // here we are populating auther with another object
    }

}, {
    timestamps: true
} )

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentschema]
}, {
    timestamps: true
});


var Dishes = mongoose.model('Dish', dishSchema); //make collection dishes 

module.exports = Dishes;
