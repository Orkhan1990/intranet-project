import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { SparePart } from "../entites/SparePart";



export const getSpareParts=async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const sparePartRepository= AppDataSource.getRepository(SparePart);

        const getSparePartList=await sparePartRepository.find({
            relations:{
                brand:true
            }
        });

        if(getSparePartList.length===0){
            next(errorHandler(401,"Ehtiyyat hissələri mövcud deyil!"));
            return;
        }

        res.status(200).json(getSparePartList);
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}