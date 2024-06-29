//import express moudle
const express = require('express');
const app = express();
//import user router
const usersRoute = require('./routes/user');
//import todoRoute
const todoRoute = require('./routes/todo')
//import mongoose
const mongoose = require("mongoose");
//import env
const env = require("dotenv")
//configure env
env.config();
// import cookie parese 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//connect database
mongoose.connect( process.env.MONGODB_URL)
    .then( ()=>{
        console.log("Database connection successful")
    })
    .catch((error)=>{
        console.log(error)
    })

//call json paser middleware
app.use(express.json());

//create user Routing middleware
app.use('/user', usersRoute)
//create todo routing middleware
app.use('/todo', todoRoute)


app.listen(3000, ()=>{
    console.log("Application Started")
})

