import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";



export const createSupplier=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
    } catch (error:any) {
        next(errorHandler(401,error))
    }
}