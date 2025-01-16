import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Client } from "../entites/Client";
import { OrderInterface } from "../types/projectTypes";
import { User } from "../entites/User";
import { CustomRequest } from "../middleware/verifyToken";
import { OrderHistory } from "../entites/OrderHistory";
import { OrderStage } from "../enums/allEnums";
import { SparePart } from "../entites/SparePart";
import { log } from "console";


const orderPartsRepository=AppDataSource.getRepository(OrderPart);
const orderRepository=AppDataSource.getRepository(Order);
const clientRepository = AppDataSource.getRepository(Client);
const userRepository = AppDataSource.getRepository(User);
const orderHistoryRepository=AppDataSource.getRepository(OrderHistory);
const sparePartsRepository=AppDataSource.getRepository(SparePart);


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
           newOrderPart.origCode=part.origCode;

           await orderPartsRepository.save(newOrderPart);
           return newOrderPart;
    }
    ));

    


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
    newOrder.isExcellFile=true;
    newOrder.oil = oil;
    newOrder.user = getUser;
    newOrder.orderParts=newOrderArray;
   

    await orderRepository.save(newOrder);

    const newOrderHistory=new OrderHistory()
    newOrderHistory.user=getUser;
    newOrderHistory.responsibleBeginDate=new Date();
    newOrderHistory.responsibleDate=new Date();
    newOrderHistory.order=newOrder;

    await orderHistoryRepository.save(newOrderHistory);

   res.status(200).json({result:`${parts.length>1?"Sifarişlər əlavə olundu":"Sifariş əlavə olundu!"}`});

  } catch (error) {
    next(errorHandler(401, error));
  }
};



export const getAllOrders=async(req:Request,res:Response,next:NextFunction)=>{
  try {

    const allOrders=await orderRepository.find(
      {
        relations: [
          'client',        
          'user',
          'orderParts',
          'orderHistory'
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


export const confirmOrder=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  try {

    const {id}=req.params;
    const userId = req.userId;
    const userRepository=AppDataSource.getRepository(User);
    const orderRepository=AppDataSource.getRepository(Order);

    const user=await userRepository.findOneBy({id:userId});
    const order=await orderRepository.findOneBy({id:Number(id)});

    if(!user){
      next(errorHandler(401,"Belə istifadəçi yoxdur!"));
    }

    if(!order){
      next(errorHandler(401,"Belə istifadəçi yoxdur!"));
      return;
    }
   
    order.confirm=true;
    order.confirmDate=new Date();
    order.isExcellFile=false;
    order.rejectMessage=null;
    order.stage=OrderStage.WarehouseConfirm;
    order.user=user;

    await orderRepository.save(order);

    res.status(201).json(order);
    
  } catch (error) {
    next(errorHandler(401,error))
  }
}


export const updateOrder=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
    const {id}=req.params;
    const userId=req.userId
    console.log(req.body);

    const user=await userRepository.findOneBy({id:userId});
    if(!user){
      next(errorHandler(401,"İstifadəçi mövcud deyil!"));
      return;
    }
    
    const client=await clientRepository.findOneBy({id:req.body.client.id});
    
    if(!client){
      next(errorHandler(401,"Müştəri mövcud deyil!"));
      return;
    }
    const order=await orderRepository.findOneBy({id:Number(id)});

     
    if(!order){
      next(errorHandler(401,"Sifariş mövcud deyil!"));
      return;
    }
    await orderPartsRepository.delete({order:order});


    const newOrderParts = req.body.orderParts.map(async (item: any) => {
      const newOrderPart = new OrderPart();
      newOrderPart.origCode = String(item.origCode);
      newOrderPart.count = item.count;
      newOrderPart.partName = item.partName;
      newOrderPart.order = order;
     await orderPartsRepository.save(newOrderPart);
     return newOrderPart;
    });

    order.project = req.body.project;
    order.cardNumber = req.body.cardNumber;
    order.orderType = req.body.orderType;
    order.client =client;
    order.manufacturer = req.body.manufacturer;
    order.model = req.body.model;
    order.chassisNumber = req.body.chassisNumber;
    order.engineNumber = req.body.engineNumber;
    order.produceYear = req.body.produceYear;
    order.km = req.body.km;
    order.vehicleNumber = req.body.vehicleNumber;
    order.paymentType = req.body.paymentType;
    order.delivering = req.body.delivering;
    order.deliveringType = req.body.deliveringType;
    order.initialPayment = req.body.initialPayment;
    order.comment = req.body.comment;
    order.oil = req.body.oil;
    order.user = user;
    order.orderParts=newOrderParts;

    await orderRepository.save(order);
    res.status(201).json({result:order,message:"Uğurla yeniləndi!"})
  } catch (error) {
    next(errorHandler(401,error.message));
  }
}

export const updateOrderParts=async(req:Request,res:Response,next:NextFunction)=>{
  const{id}=req.params;
  console.log(req.body,id);
  
  try {

    const existOrder=await orderRepository.findOneBy({id:Number(id)});

    if(!existOrder){
      next(errorHandler(401,"Sifariş mövcud deyil!"));
      return;
    }


    const newOrderPartsPromises = req.body.orderParts.map(async (item: any) => {
      const newOrderPart = new OrderPart();
      newOrderPart.origCode = String(item.origCode);
      newOrderPart.count = item.count;
      newOrderPart.partName = item.partName;
      newOrderPart.order = existOrder;
      return await orderPartsRepository.save(newOrderPart);
    });
    
    const newOrderParts = await Promise.all(newOrderPartsPromises);
    res.status(200).json({ message: "Elave olundu", orderParts: newOrderParts });

  

    res.status(200).json({message:"Elave olundu"});
    
  }
   catch (error) {
    next(errorHandler(401,error))
  }
}

export const deleteOrderParts=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id}=req.params;
    
    await orderPartsRepository.delete({id:Number(id)});

    res.status(200).json({message:"Ehtiyyat hissəsi silindi!"})
    
  } catch (error) {
    next(errorHandler(401,error))
  }
}




export const rejectOrder=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
   const {id}=req.params;
   const userId = req.userId;

   console.log(id,req.body);
   
   const user=await userRepository.findOneBy({id:userId});


   if(!user){
     next(errorHandler(401,"Belə istifadəçi yoxdur!"));
   }

   const order=await orderRepository.findOneBy({id:(Number(id))});
   if(!order){
    next(errorHandler(401,"Sifariş mövcud deyil!"));
    return;
   }
    
    order.isExcellFile=true;
    order.confirm=false;
    order.confirmDate=null;
    order.rejectMessage=req.body.orderRejectMessage;
    order.stage=OrderStage.Created;

    await orderRepository.save(order);
    res.status(201).json(order);

  } catch (error) {
    next(errorHandler(401,error))
  }
}


export const getAllOrderParts=async(req:Request,res:Response,next:NextFunction)=>{
  try {
       
    const allOrderParts=await orderPartsRepository.find();
    
    if(allOrderParts.length===0){
      next(errorHandler(401,"Ehtiyyat hissələri mövcud deyil!"));
      return;
    }

    res.status(201).json(allOrderParts);
  } catch (error) {
    next(errorHandler(401,error))
  }
}
export const checkInStock = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const newOrderPartsArray=req.body.parts.map((item:{origCode:string,count:number,partName:string})=>(
      {
        code:item.origCode,
        requiredCount:item.count,
        partName:item.partName
      }
    ))

    const sparePartsList = await sparePartsRepository.find();
    const newSparePartsList = sparePartsList.map((item) => (
      {
        code: item.code,
        existingCount: item.count,
        partName: item.name
      }
    ));
  
    const result = newOrderPartsArray.map((item:{code:string,count:number,partName:string}) => {
      // Find the matching spare part based on the code
      const sparePart = newSparePartsList.find(spare => spare.code === item.code);
      log(sparePart,"qaaaaqa");
    
      if (sparePart) {
        // Return the object with inStock true if found
        return {
          code: sparePart.code,
          count: sparePart.existingCount,
          name: sparePart.partName,
          inStock: true
        };
      } else {
        return {
          code: item.code,
          count: 0, 
          name: item.partName,
          inStock: false
        };
      }
    });
    
    log(result);
     res.status(200).json(result);  
  } catch (error) {
    next(errorHandler(401, error)); // Handle error appropriately
  }
};