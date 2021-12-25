const { Schema } = require('mongoose');
let mongoose = require('mongoose');
let schema = mongoose.Schema;
let User = new Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    admin: { //mark user as a administrative user 
        type: Boolean,
        default: false 
    }


});
module.exports = mongoose.model('User', User);