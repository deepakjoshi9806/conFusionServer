//this is a schema 

const { Schema } = require('mongoose');
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');
//username and password added by the passport-local-mongoose plugin

let User = new Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    admin: { //mark user as a administrative user 
        type: Boolean,
        default: false 
    }
});
User.plugin(passportLocalMongoose)
//this  will add uname and pw and hash pw using hash and salt  
module.exports = mongoose.model('User', User);