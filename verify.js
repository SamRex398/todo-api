const jwt = require('jsonwebtoken');

const verification = (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({message: "please login fisrt"}).status(401)
    }
    
    const verifyToken = jwt.verify(token, process.env.JWT_TOKEN, (error, payload)=>{
        if(error){
            res.json({message: error.message}).status(404)
        }else{
            res.user= payload
            // console.log(payload)
            next()
        }
    })
}

module.exports = verification