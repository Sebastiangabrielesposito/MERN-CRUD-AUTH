import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../utils.js'

export const authRequired = (req,res,next)=>{
    let token = req.cookies.token || req.headers.authorization;
        // console.log(req.cookies.token);
        // console.log(req.headers.authorization);
    if (req.headers.authorization ) {
        token = req.headers.authorization.replace("Bearer ", "");
      }
    // const authorizationHeader = req.headers.authorization;
    // const token = authorizationHeader.replace('Bearer ', '');
    // console.log(token);
    if(!token) return res.status(401).json({message: "No token, authorization denied"})
    jwt.verify(token, TOKEN_SECRET,(err,user)=> {
        if(err) return res.status(403).json({message:"Invalid token"})
        // console.log(user);
        req.user = user
        next()
    })
}   