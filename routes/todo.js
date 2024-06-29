const express = require('express');
const route = express.Router();
const verify = require('../verify')
const {
    createTodo, 
    getTodos, 
    updateTodo, 
    deleteTodo
} = require('../controller/todo')

// create a createTodo route
route.post('/createtodo', verify,createTodo);
//create a getTodos route
route.get('/gettodos',verify, getTodos);
//create a updateTodo route
route.put('/updatetodo',verirfy, updateTodo)

// create a delete Todo Route
route.delete('/deleteTodo',verify, deleteTodo)

//export route
module.exports = route