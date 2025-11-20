import { Request,Response,NextFunction } from "express"
import errorHandler from "../middleware/errorHandler"
import { AppDataSource } from "../database";
import { SupplierOrderParts } from "../entites/SupplierOrderParts";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Supplier } from "../entites/Supplier";
import { OrderHistory } from "../entites/OrderHistory";
import { OrderStage } from "../enums/allEnums";



const orderPartRepository=AppDataSource.getRepository(OrderPart);
const orderRepository=AppDataSource.getRepository(Order);
const supplierOrderPartsRepository=AppDataSource.getRepository(SupplierOrderParts);
const supplierRepository=AppDataSource.getRepository(Supplier);
const orderHistoryRepository=AppDataSource.getRepository(OrderHistory);

export const getOrderPartsByOrderId = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const{id} = req.params;
        // console.log(id);      
        
        const orderParts = await orderPartRepository.find({
            where: { order: { id: parseInt(id) } }, // Filter by orderId
        });
        // console.log(orderParts);
        if(orderParts.length===0){
            return next(errorHandler(404,"Ehtiyyat hissələri tapılmadı"));
        }

        res.status(200).json(orderParts);
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}


export const getSupplierOrderPartsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { orderPartIds } = req.query;

    const orderPartIdArray = orderPartIds
      ? (orderPartIds as string)
          .split(",")
          .map((id) => parseInt(id))
          .filter((id) => !isNaN(id))
      : [];

      if( orderPartIdArray.length === 0) {
        return next(errorHandler(404, "Order part IDs are required"));
      }
  
  const supplierOrderParts = await AppDataSource.getRepository(SupplierOrderParts)
    .createQueryBuilder("sop")
    .innerJoinAndSelect("sop.supplier", "suppliers")
    .innerJoinAndSelect("sop.orderPart", "orderPart")
    .where("sop.order_part_id IN (:...ids)", { ids: orderPartIdArray })
    .getMany();

    // console.log(supplierOrderParts);
    res.status(200).json(supplierOrderParts);
  } catch (error) {
    next(errorHandler(401, error));
  }
};


export const choosingBestSupplier = async ( req: Request,
  res: Response,
  next: NextFunction)=>{
  try {

    const{id}=req.params;
    const{orderPartArrayId,orderhistoryId,orderId}=req.body
    //  console.log(orderPartArrayId)

     if(!id || !orderPartArrayId || orderPartArrayId.length === 0) {
      return next(errorHandler(400, "Supplier ID and order part IDs are required"));
    }


    const order=await orderRepository.findOneBy({
      id: parseInt(orderId)})

      if(!order){
        return next(errorHandler(404, "Order not found"));
      }


      order.stage=OrderStage.GiveTheOrder;
      order.giveOrderDate = new Date();
      await orderRepository.save(order);


    const orderHistory = await orderHistoryRepository.findOneBy({
      id: parseInt(orderhistoryId)
    });

    if (!orderHistory) {
      return next(errorHandler(404, "Order history not found"));
    }


    orderHistory.showHide = true;
    orderHistory.showResult=true;
    orderHistory.date = new Date();
    await orderHistoryRepository.save(orderHistory);


     const results = await supplierOrderPartsRepository
     .createQueryBuilder("sop")
     .leftJoinAndSelect("sop.supplier", "supplier") // include full supplier data
     .leftJoinAndSelect("sop.orderPart", "orderPart") // include full orderPart data
     .where("supplier.id = :supplierId", { supplierId: id })
     .andWhere("orderPart.id IN (:...ids)", { ids: orderPartArrayId })
     .getMany();


     const updatedSupplierOrderParts = results.map((sop) => {
      sop.isTheBestSupplier = true;
      return sop;
    });
      await supplierOrderPartsRepository.save(updatedSupplierOrderParts);
   
    res.status(200).json({
      message: "Supplier updated successfully"})
   
  } catch (error) {
    next(errorHandler(401, error));
  }
}