const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: false,
        default:false
    }
},{timestamps: true});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel 