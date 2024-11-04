import { NextFunction, Request,Response } from "express";
import errorHandler from "../middleware/errorHandler";

export const createWarehouse=async(req:Request,res:Response,next:NextFunction)=>{
    try {

        
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}