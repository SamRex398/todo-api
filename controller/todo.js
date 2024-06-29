const todoModel = require('../model/todo');
const userModel = require('../model/user');
// const {payload} = require('../verify');

const createTodo = async (req, res)=>{
    // recive info
    const {title, desc} = req.body;

    const creator = req.user._id

    //verify if all required input is recieved
    if( !title || !desc){
        res.json({message: "Please fill all required fields"})
    }

    //  get user    
    const getUser = await userModel.findById(creator);
    // verify user
    if(!getUser){
        return res.json({message: "You must be registed to create a ToDo"}).status(402)
    }
    //check if todo already exist
    const checkTodo = await todoModel.findOne({title});
    if(checkTodo){
        return res.json({message: "Todo already exist"}).status(402)
    }

    try{
        const newTodo = new todoModel({creator, title, desc});
        const savedTodo = await newTodo.save();
        res.json({message: " Todo Created Successfully!"}).status(202)
    }catch(err){
        res.json({message: err})
    }
    // // create todo
    // const newTodo = await todoModel.create({title, desc});
    // // save todo to database
    // const savedTodo = await newTodo.save();

    // res.json({message: " Todo Created Successfully!"})
}
const getTodos = async (req, res)=>{
    const creator = req.user._id
    // verify creator
    const getUser = await userModel.findById(creator)

    if(!getUser){
        return res.json({message: "User not found"}).status(404)
    }

    try{
        const todos = await todoModel.find({creator})
        res.json(todos.map(todo => ({
            title: todo.title,
            desc: todo.desc
        }))).status(202)
    }catch(err){}
}
const updateTodo = async (req, res)=>{
    const {id, ...others} = req.body
    
    const creator = req.user._id;
    
    const getUser = await userModel.findById(creator)
    if(!getUser){
        return res.json({message: "User not found"}).status(404)
    }
    try{
        const updatedTodo = await todoModel.findByIdAndUpdate(id, {...others}, {new: true})
        res.json({message: "Todo updated Successfully"}).status(202)
    }catch(err){
        res.json({message: err})
    }
}
const deleteTodo = async (req, res)=>{
    const {id} = req.body

    const deleteTodo = await todoModel.findByIdAndDelete(id)
    res.json({message: "Todo deleted Successfully"}).status(200)
}


// export controllers
module.exports = { createTodo, getTodos, updateTodo, deleteTodo }