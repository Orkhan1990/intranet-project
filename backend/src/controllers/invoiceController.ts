import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { CustomRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../database";
import { Supplier } from "../entites/Supplier";
import { Brand } from "../entites/Brand";
import { Invoice } from "../entites/Invoice";
import { User } from "../entites/User";
import { SparePart } from "../entites/SparePart";





interface SparePartInterface{
    kod:string,
    origKod:string,
    nameParts:string,
    brand:number,
    liquidity:string, 
    count:number,
    price:number,
    salesPrice:number
}


interface InvoiceInterface{
    requestId:string,
      supplierId:number,
      invoice:string,
      market:string,
      paymentType:string,
      comment:string
      message:string,
      parts:SparePartInterface[]
}

export const createInvoice = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
     
    console.log(req.body);
    

    const userId=req.userId;
    const {
      requestId,
      supplierId,
      invoice,
      market,
      paymentType,
      comment,
      parts: [
        { kod, origKod, nameParts, brand, liquidity, count, price, salesPrice },
      ],
      message,
    }:InvoiceInterface = req.body;

    const supplierRepository = AppDataSource.getRepository(Supplier);
    const brandRepository = AppDataSource.getRepository(Brand);
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const sparePartRepository = AppDataSource.getRepository(SparePart);


    const getSupplier=await supplierRepository.findOneBy({id:+supplierId});

    if(!getSupplier){
        next(errorHandler(401,"Təchizatçı yoxdur!!"));
        return;
    }

   

    const newInvoice=new Invoice();
    newInvoice.requestId=requestId;
    newInvoice.supplier=getSupplier;
    newInvoice.invoice=invoice;
    newInvoice.market=market;
    newInvoice.paymentType=paymentType;
    newInvoice.message=message;
    newInvoice.comment=comment
    newInvoice.user={id:userId} as any;

    await invoiceRepository.save(newInvoice);
 
    const newPartsArray = await Promise.all(
      req.body.parts.map(async (part:SparePartInterface) => {

        const getBrand=await brandRepository.findOneBy({id:part.brand});

        if(!getBrand){
            next(errorHandler(401,"Belə marka yoxdur!!"));
            return;
        }

        const newSparePart = new SparePart();
        newSparePart.code = part.kod;
        newSparePart.origCode = part.origKod;
        newSparePart.count = part.count;
        newSparePart.brand = getBrand;
        newSparePart.liquidity = part.liquidity;
        newSparePart.name = part.nameParts;
        newSparePart.sellPrice = part.salesPrice;
        newSparePart.price = part.price;
        newSparePart.invoice=newInvoice;

        // Save the warehouse part
        await sparePartRepository.save(newSparePart);

        return newSparePart;
      })
    );




    
    
    res.status(200).json({result:`${req.body.parts.length>1?"Məhsullar əlavə olundu":"Məhsul əlavə olundu"}`})

  } catch (error) {
    next(errorHandler(401, error));
  }
};
