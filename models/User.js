const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email:{
        type:String,
        required: true  
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        default: 'user' ,
        enum: ['user','admin'],
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const Register = mongoose.model('Register', userSchema); 
module.exports = Register; 