import { Request,Response,NextFunction } from "express"
import errorHandler from "../middleware/errorHandler"
import { AppDataSource } from "../database";
import { SupplierOrderParts } from "../entites/SupplierOrderParts";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { Supplier } from "../entites/Supplier";



const orderPartRepository=AppDataSource.getRepository(OrderPart);
const orderRepository=AppDataSource.getRepository(Order);
const supplierOrderPartsRepository=AppDataSource.getRepository(SupplierOrderParts);
const supplierRepository=AppDataSource.getRepository(Supplier);

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
  
  const supplierOrderParts = await AppDataSource.getRepository(SupplierOrderParts)
    .createQueryBuilder("sop")
    .innerJoinAndSelect("sop.supplier", "suppliers")
    .innerJoinAndSelect("sop.orderPart", "orderPart")
    .where("sop.order_part_id IN (:...ids)", { ids: orderPartIdArray })
    .getMany();

    console.log(supplierOrderParts);
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
    const{orderPartArrayId}=req.body
     console.log(orderPartArrayId)


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