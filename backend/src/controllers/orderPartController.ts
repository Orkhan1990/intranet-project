import { Request,Response,NextFunction } from "express"
import errorHandler from "../middleware/errorHandler"
import { AppDataSource } from "../database";
import { SupplierOrderParts } from "../entites/SupplierOrderParts";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";
import { log } from "console";
import { In } from "typeorm";


const orderPartRepository=AppDataSource.getRepository(OrderPart);
const orderRepository=AppDataSource.getRepository(Order);
const supplierOrderPartsRepository=AppDataSource.getRepository(SupplierOrderParts);

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
      console.log(req.query);
  
      const { orderPartIds } = req.query;
  
      const orderPartIdArray = orderPartIds
        ? (orderPartIds as string)
            .split(",")
            .map((id) => parseInt(id))
            .filter((id) => !isNaN(id))
        : [];
  
      console.log(orderPartIdArray, "Parsed orderPartIdArray");
  
      const supplierOrderPartsDatas = await supplierOrderPartsRepository.find({
        where: {
          orderPart: {
            id: In(orderPartIdArray),
          },
        },
        relations: ["orderPart", "supplier"],
      });
  
      if (supplierOrderPartsDatas.length === 0) {
        return next(errorHandler(404, "Tədarikçi sifariş hissələri tapılmadı"));
      }
  
      res.status(200).json(supplierOrderPartsDatas);
    } catch (error) {
      next(errorHandler(401, error));
    }
  };