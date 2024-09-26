import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorHandler from "./errorHandler";


export interface CustomRequest extends Request{
    userId?:number
}



const verifyToken=async(req:CustomRequest,res:Response,next:NextFunction)=>{

    const token=req.cookies.access_token;
    
    

    if(!token){
        next(errorHandler(401,"Qeydiyyatdan keçməyib!!!"));
        return;
    }
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=(decoded as any).id;
        next();
        
    } catch (error) {
        next(errorHandler(401,"Qeydiyyatdan keçməyib!!!"));
    }


   
}





export default verifyToken