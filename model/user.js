//import mongoose 
const mongoose = require("mongoose");

//create userSchema 
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['User', 'Admin'],
        default: 'user'
    }
},{timestamps: true});

//create the model
const userModel = mongoose.model('user', userSchema);

//export the userModel
module.exports = userModel