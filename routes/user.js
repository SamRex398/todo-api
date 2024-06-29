//import express
const express = require("express");
// import Router 
const route = express.Router();
//import verificiation middleware
const verify = require('../verify')
// import user controllers
const { 
    createUser, 
    getUsers, 
    loginUser, 
    deleteUser, 
    updateUser 
} = require("../controller/user");

// create registration route 
route.post('/register', createUser)
route.get('/users', getUsers)
route.post('/login', loginUser)
route.delete('/delete', verify, deleteUser)
route.put('/update', verify, updateUser)


module.exports = route 
