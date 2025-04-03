import { Request,Response,NextFunction } from "express"
import errorHandler from "../middleware/errorHandler"
import { AppDataSource } from "../database";
import { SupplierOrderParts } from "../entites/SupplierOrderParts";
import { Order } from "../entites/Order";
import { OrderPart } from "../entites/OrderPart";


const orderPartRepository=AppDataSource.getRepository(OrderPart);
const orderRepository=AppDataSource.getRepository(Order);
const supplierOrderPartsRepository=AppDataSource.getRepository(SupplierOrderParts);

export const getOrderPartsByOrderId = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const{id} = req.params;
        console.log(id);      
        
        const orderParts = await orderPartRepository.find({
            where: { order: { id: parseInt(id) } }, // Filter by orderId
        });
        console.log(orderParts);
        if(orderParts.length===0){
            return next(errorHandler(404,"Ehtiyyat hissələri tapılmadı"));
        }

        res.status(200).json(orderParts);
        
    } catch (error) {
        next(errorHandler(401,error))
    }
}


export const getSupplierOrderPartsData = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const{orderPartIds} = req.query;
        const orderPartIdArray = (orderPartIds as string).split(",").map(Number);

        // console.log(orderPartIds,"orderPartIds");
        
        
        const supplierOrderPartsDatas= await supplierOrderPartsRepository.find({
            relations: ["orderPart","supplier"]  
            });
        if(supplierOrderPartsDatas.length===0){
            return next(errorHandler(404,"Tədarikçi sifariş hissələri tapılmadı"));
        }


        // console.log(supplierOrderPartsDatas);
        


        const filteredData = supplierOrderPartsDatas.filter((item: any) =>
            orderPartIdArray.includes(item?.orderPart?.id)
        );

        // Extract the unique supplier data by filtering duplicate suppliers
        const uniqueSuppliers = new Map();

        filteredData.forEach((item: any) => {
            const supplier = item?.supplier;
            if (supplier && !uniqueSuppliers.has(supplier.id)) {
                uniqueSuppliers.set(supplier.id, supplier);
            }
        });

        // Convert the map back to an array
        const uniqueSupplierList = Array.from(uniqueSuppliers.values());
        
        console.log(uniqueSupplierList);
        
       
        res.status(200).json(uniqueSupplierList);
    } catch (error) {
        next(errorHandler(401,error))
    }
}