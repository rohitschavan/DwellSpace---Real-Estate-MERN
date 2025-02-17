import { JWT_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const requiresSignIn = (req,res,next)=>{
try{
 const decoded = jwt.verify(req.headers.authorization,JWT_SECRET)
 req.user = decoded;
 next();
}catch(err){
    console.log(err);
    res.status(401).json({error:"Invalid Token"})
}
}



