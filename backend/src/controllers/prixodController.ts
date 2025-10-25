import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { CustomRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../database";
import { Supplier } from "../entites/Supplier";
import { Brand } from "../entites/Brand";
import { Prixod } from "../entites/Prixod";
import { SparePart } from "../entites/SparePart";
import { Order } from "../entites/Order";

const supplierRepository = AppDataSource.getRepository(Supplier);
const brandRepository = AppDataSource.getRepository(Brand);
const prixodRepository = AppDataSource.getRepository(Prixod);
const sparePartRepository = AppDataSource.getRepository(SparePart);
const orderRepository = AppDataSource.getRepository(Order);

interface SparePartInterface {
  kod: string;
  origKod: string;
  nameParts: string;
  brand: number;
  liquidity: string;
  count: number;
  price: number;
  salesPrice: number;
}

interface PrixodInterface {
  orderId: number;
  supplierId: number;
  invoice: string;
  market: string;
  paymentType: string;
  comment: string;
  message: string;
  parts: SparePartInterface[];
}

export const createPrixod = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const userId = req.userId;
    const {
      orderId,
      supplierId,
      invoice,
      market,
      paymentType,
      comment,
      parts: [
        { kod, origKod, nameParts, brand, liquidity, count, price, salesPrice },
      ],
      message,
    }: PrixodInterface = req.body;

    const getSupplier = await supplierRepository.findOneBy({ id: +supplierId });
    const getOrder = await orderRepository.findOneBy({ id: +orderId });

    if (!getSupplier) {
      next(errorHandler(401, "Təchizatçı yoxdur!!"));
      return;
    }

    const newPrixod = new Prixod();
    newPrixod.order = getOrder;
    newPrixod.supplier = getSupplier;
    newPrixod.invoice = invoice;
    newPrixod.market = market;
    newPrixod.paymentType = paymentType;
    newPrixod.message = message;
    newPrixod.comment = comment;
    newPrixod.confirm = false;
    newPrixod.accept = false;
    newPrixod.confirmDate = new Date();
    newPrixod.acceptDate = new Date();
    newPrixod.user = { id: userId } as any;

    await prixodRepository.save(newPrixod);

    const newPartsArray = [];

    for (const part of req.body.parts) {
      const getBrand = await brandRepository.findOneBy({ id: part.brand });

      if (!getBrand) {
        next(errorHandler(401, "Belə marka yoxdur!!"));
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
      newSparePart.prixod = newPrixod;

      await sparePartRepository.save(newSparePart);
      newPartsArray.push(newSparePart);
    }

    res.status(200).json({
      result: `${req.body.parts.length > 1 ? "Məhsullar əlavə olundu" : "Məhsul əlavə olundu"}`,
    });
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getPrixods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPrixods = await prixodRepository.find({
      relations: ["spareParts", "spareParts.brand", "user", "supplier", "order"],
    });

    if (allPrixods.length === 0) {
      next(errorHandler(401, "Sifarişlər yoxdur!"));
      return;
    }

    res.status(200).json(allPrixods);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getPrixodById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const prixod = await prixodRepository.findOne({
      where: { id: +id },
      relations: ["spareParts", "spareParts.brand", "user", "supplier", "order"],
    });
    if (!prixod) {
      next(errorHandler(401, "Belə bir giriş tapılmadı!"));
      return;
    }
    res.status(200).json(prixod);
  }
  catch (error) {
    next(errorHandler(401, error));
  }   
};
