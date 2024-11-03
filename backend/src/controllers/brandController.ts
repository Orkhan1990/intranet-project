import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Brand } from "../entites/Brand";




export const getBrands=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const brandRepository=AppDataSource.getRepository(Brand);

        const brands=await brandRepository.find();

        if(!brands){
            next(errorHandler(401,"Markalar mövcud deyil!"));
            return;
        }

        res.status(200).json(brands)
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}