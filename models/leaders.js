const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaderSchema = { 
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
};
var Leaders = mongoose.model('Leaders', leaderSchema); //make collection dishes 
module.exports = Leaders;
