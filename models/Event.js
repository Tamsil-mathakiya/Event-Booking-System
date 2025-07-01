const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    date:{
        type:String,
        required: true  
    },
    capacity: {
        type: String,
        required: true
    }, 
    availableSeats: Number,
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema); 

module.exports = Event; 