import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Supplier } from "../entites/Supplier";



export const createSupplier=async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const {
            supplier,
            country,
            contactPerson,
            phone,
            email,
            paymentType,
            deliverType,
            deliverPeriod,
            creditLine,
            creditNote,
            creditDuration
        }=req.body;

        const supplierRepository = AppDataSource.getRepository(Supplier);

        const newSupplier=new Supplier();
        newSupplier.supplier=supplier;
        newSupplier.country=country;
        newSupplier.contactPerson=contactPerson;
        newSupplier.phone=phone;
        newSupplier.email=email;
        newSupplier.paymentType=paymentType
        newSupplier.deliverType=deliverType;
        newSupplier.deliverPeriod=deliverPeriod;
        newSupplier.creditLine=creditLine;
        newSupplier.creditNote=creditNote;
        newSupplier.creditDuration=creditDuration;
        
        await supplierRepository.save(newSupplier);

        res.status(200).json(newSupplier);
        
    } catch (error:any) {
        next(errorHandler(401,error))
    }
}