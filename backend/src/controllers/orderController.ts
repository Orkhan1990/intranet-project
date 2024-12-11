import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Client } from "../entites/Client";
import { OrderInterface } from "../types/projectTypes";
import { User } from "../entites/User";
import { CustomRequest } from "../middleware/verifyToken";
import { OrderStatus } from "../enums/allEnums";

export const createOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      project,
      cardNumber,
      orderType,
      clientId,
      manufacturer,
      model,
      chassisNumber,
      engineNumber,
      produceYear,
      km,      
      vehicleNumber,
      paymentType,
      delivering,
      deliveringType,
      initialPayment,
      comment,
      oil,
      parts
    }: OrderInterface = req.body;

    const userId = req.userId;

    const orderRepository = AppDataSource.getRepository(Order);
    const orderPartRepositroy = AppDataSource.getRepository(OrderPart);
    const clientRepository = AppDataSource.getRepository(Client);
    const userRepository = AppDataSource.getRepository(User);
    const getclient = await clientRepository.findOneBy({ id: clientId });
    const getUser = await userRepository.findOneBy({ id: userId });

    if (!getUser) {
      next(errorHandler(401, "Istifadəçi mövcud deyil!"));
      return;
    }

    if (!getclient) {
      next(errorHandler(401, "Müştəri mövcud deyil!"));
      return;
    }

    const newOrderArray=await Promise.all(parts.map(async(part)=>{
      const newOrderPart=new OrderPart();
           newOrderPart.partName=part.partName;
           newOrderPart.count=part.count;
           newOrderPart.partNumber=part.partNumber;

           await orderPartRepositroy.save(newOrderPart);
           return newOrderPart;
    }
    ))

    const newOrder = new Order();
    newOrder.project = project;
    newOrder.cardNumber = cardNumber;
    newOrder.orderType = orderType;
    newOrder.client = getclient;
    newOrder.manufacturer = manufacturer;
    newOrder.model = model;
    newOrder.chassisNumber = chassisNumber;
    newOrder.engineNumber = engineNumber;
    newOrder.produceYear = produceYear;
    newOrder.km = km;
    newOrder.vehicleNumber = vehicleNumber;
    newOrder.paymentType = paymentType;
    newOrder.delivering = delivering;
    newOrder.deliveringType = deliveringType;
    newOrder.initialPayment = initialPayment;
    newOrder.comment = comment;
    newOrder.oil = oil;
    newOrder.user = getUser;
    newOrder.orderParts=newOrderArray;


    await orderRepository.save(newOrder);

   res.status(200).json({result:`${parts.length>1?"Sifarişlər əlavə olundu":"Sifariş əlavə olundu!"}`});

  } catch (error) {
    next(errorHandler(401, error));
  }
};



export const getAllOrders=async(req:Request,res:Response,next:NextFunction)=>{
  try {


    const orderRepository= AppDataSource.getRepository(Order);


    const allOrders=await orderRepository.find(
      {
        relations: [
          'client',        
          'user',
          'orderParts'
        ]
      }
    )

    if(!allOrders){
      next(errorHandler(401,"Sifarişlər mövcud deyil!"));
      return;
    }

    res.status(200).json(allOrders);
    
  } catch (error) {
    next(errorHandler(401,error))
  }
}


export const getOrder=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    // const {id}=req.params;



    const orderRepository=AppDataSource.getRepository(Order);
    const order=await orderRepository.findOne({
      where:{id:Number(req.params.id)},
      relations:['user','client','orderParts']
      
    });

    if(!order){
      next(errorHandler(401,"Sifariş mövcud deyil!"));
      return;
    }
    
    res.status(200).json(order);
    
  } catch (error) {
    next(errorHandler(401,error));
  }
}