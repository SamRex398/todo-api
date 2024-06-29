// import user model
const userModel = require("../model/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//create user

const createUser = async (req, res)=>{
    // accept input for user
    const {name, email, password} = req.body;

    //verify if all required input is recieved
    if(!name || !email || !password){
        res.json({message: "Please fill all required fields"})
    }

    //Check if user exist already
    const findUser = await userModel.findOne({email})
    if(findUser){
            res.json({message: "User already exist"}) 
        }
    
    //encrypt password
    const encryptPassword = bcrypt.hashSync(password, 10)    

    //create user
    try{
        const newUser = await userModel.create({email, name, password: encryptPassword})
        const savedUser =  await newUser.save()
        res.json({massage: "User created"})
    }
    catch(err){
        res.json({message: err})
    }
}

//get all users
const getUsers = async (req, res)=>{
    try{
        const users = await userModel.find()
        res.json(users)
        .status(202)
    }catch(err){
        res.json({message: err})
    }
}

// login user
const loginUser = async(req, res)=>{
    const {email, password} = req.body;


    //ensure all input are filled 
    if(!email || !password){
        res.json({message: "Please fill all required fields"})
    }

    const getuser = await userModel.findOne({email})
    if(!getuser){
       return res.json({message: "User not found"}).status(404)
    }
    const comparePassword = bcrypt.compareSync(password, getuser.password)
    if(!comparePassword){
       return res.json({message: "incorrect password"}).status(400)
    }
    
    const user_token = jwt.sign(JSON.stringify(getuser), process.env.JWT_TOKEN)
    res.cookie('token', user_token)
    res.json(getuser)
}

//delete user
const deleteUser = async (req, res)=>{
    const {id} = req.body
    
    const role = req.user.role;
    
    if(role === "Admin"){
        const deleteUser = await userModel.findByIdAndDelete(id);
        res.json({message: "User deleted"});
    }else {
        res.json({message: "Only Admin can delete User"})
    }
}

//update user
const updateUser = async (req, res)=>{
    const {id, ...others} = req.body

    const iD = req.user._id;

    const updateUser = await userModel.findByIdAndUpdate(iD, {...others}, {new: true})
    
    res.json({message: "User updated Successfully"})
}

module.exports = { createUser, getUsers, loginUser, deleteUser, updateUser }
