//Importing jwt from installed jsonwebtoken package
var jwt=require('jsonwebtoken');

//creating a custom secret token which will be used by our app
const JWT_SECRET="SecretToken"

//This fxn will authenticate the user
//Will be used in every request in which login is required
const fetchuser=(req,res,next)=>{
    //Get user from jwt token and add id to req obj
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data =jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports=fetchuser;