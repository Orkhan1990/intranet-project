import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Client } from "../entites/Client";
import { OrderInterface } from "../types/projectTypes";



export const createOrder=async(req:Request,res:Response,next:NextFunction)=>{
    try {
          const{chassisNumber,
            cardNumber,
            comment,
            delivering,
            deliveringType,
            engineNumber,
            initialPayment,
            km}:OrderInterface=req.body
          const orderRepository=AppDataSource.getRepository(Order);
          const orderPartRepositroy=AppDataSource.getRepository(OrderPart);
          const clientRepository=AppDataSource.getRepository(Client);
          const client=await clientRepository.findOneBy({id:req.body.clientId});
         
        

          const newOrder=new Order();
          newOrder.client=client;
          newOrder.cardNumber=req.body.cardNumber;


    } catch (error) {
        next(errorHandler(401,error))
    }
}