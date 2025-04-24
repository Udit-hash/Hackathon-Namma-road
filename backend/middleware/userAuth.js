const jwt= require('jsonwebtoken');

const {jwt_secret} = require("../routes/config")

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg:"Authorization failed"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,jwt_secret);
        if(decoded){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({
                msg:"Authorization failed"
            })
        }
        
    }catch(err){
        return res.status(403).json({
            msg:"Authorization failed"
        })
    }
}

module.exports={
    authMiddleware
}