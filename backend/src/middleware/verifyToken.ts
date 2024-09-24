import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorHandler from "./errorHandler";
import { UserInterface } from "../types/projectTypes";


interface CustomRequset extends Request{
    user?:string|JwtPayload
}



const verifyToken=async(req:CustomRequset,res:Response,next:NextFunction)=>{

    const token=req.cookies.access_token;


    if(!token){
        next(errorHandler(401,"Qeydiyyatdan keçməyib!!!"));
        return;
    }
    
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
        
    } catch (error) {
        next(errorHandler(401,"Qeydiyyatdan keçməyib!!!"));
    }


   
}





export default verifyToken