import { Request,Response,NextFunction } from "express"
import errorHandler from "../middleware/errorHandler"
import { AppDataSource } from "../database";


const orderPartRepository=AppDataSource.getRepository("OrderPart");
const orderRepository=AppDataSource.getRepository("Order");

export const getOrderPartsByOrderId = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const{ id } = req.params;
        const orderParts=await orderPartRepository.find({where:{order:id}});
        if(orderParts.length===0){
            return next(errorHandler(404,"Ehtiyyat hissələri tapılmadı"));
        }

        res.status(200).json(orderParts);
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}