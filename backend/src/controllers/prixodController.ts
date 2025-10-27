import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { CustomRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../database";
import { Supplier } from "../entites/Supplier";
import { Brand } from "../entites/Brand";
import { Prixod } from "../entites/Prixod";
import { SparePart } from "../entites/SparePart";
import { Order } from "../entites/Order";
import { User } from "../entites/User";

const supplierRepository = AppDataSource.getRepository(Supplier);
const brandRepository = AppDataSource.getRepository(Brand);
const prixodRepository = AppDataSource.getRepository(Prixod);
const sparePartRepository = AppDataSource.getRepository(SparePart);
const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);

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
      relations: [
        "spareParts",
        "spareParts.brand",
        "user",
        "supplier",
        "order",
      ],
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
      relations: [
        "spareParts",
        "spareParts.brand",
        "user",
        "supplier",
        "order",
      ],
    });
    if (!prixod) {
      next(errorHandler(401, "Belə bir giriş tapılmadı!"));
      return;
    }
    res.status(200).json(prixod);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const updatePrixod = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    const {
      order,
      supplier,
      invoice,
      market,
      paymentType,
      comment,
      parts,
      message,
    } = req.body;

    // 1️⃣ Find the existing prixod
    const getPrixod = await prixodRepository.findOne({
      where: { id: +id },
      relations: ["spareParts"], // include existing parts
    });

    if (!getPrixod) {
      return next(errorHandler(404, "Belə bir prixod tapılmadı!"));
    }

    // 2️⃣ Get supplier and order
    const getSupplier = await supplierRepository.findOneBy({ id: +supplier });
    const getOrder = await orderRepository.findOneBy({ id: +order });
    if (!getSupplier) return next(errorHandler(400, "Təchizatçı yoxdur!"));
    if (!getOrder) return next(errorHandler(400, "Sifariş tapılmadı!"));

    // 3️⃣ Update prixod main info
    getPrixod.order = getOrder;
    getPrixod.supplier = getSupplier;
    getPrixod.invoice = invoice;
    getPrixod.market = market;
    getPrixod.paymentType = paymentType;
    getPrixod.message = message;
    getPrixod.comment = comment;
    getPrixod.confirm = false;
    getPrixod.accept = false;
    getPrixod.confirmDate = new Date();
    getPrixod.acceptDate = new Date();
    getPrixod.user = { id: req.userId } as any;

    await prixodRepository.save(getPrixod);

    // 4️⃣ Process spare parts
    const existingParts = getPrixod.spareParts;
    const updatedParts:any = [];

    for (const part of parts) {
      const getBrand = await brandRepository.findOneBy({ id: part.brand });
      if (!getBrand) return next(errorHandler(400, "Belə marka yoxdur!"));

      // Find existing part by code (or you could use ID if available)
      const existing = existingParts.find((p) => p.code === part.kod);

      if (existing) {
        // Update existing part
        existing.code = part.kod;
        existing.origCode = part.origKod;
        existing.name = part.nameParts;
        existing.count = part.count;
        existing.price = part.price;
        existing.sellPrice = part.salesPrice;
        existing.liquidity = part.liquidity;
        existing.brand = getBrand;

        updatedParts.push(existing);
      } else {
        // Create new spare part
        const newPart = sparePartRepository.create({
          code: part.kod,
          origCode: part.origKod,
          name: part.nameParts,
          count: part.count,
          price: part.price,
          sellPrice: part.salesPrice,
          liquidity: part.liquidity,
          brand: getBrand,
          prixod: getPrixod,
        });
        updatedParts.push(newPart);
      }
    }

    // 5️⃣ Delete removed parts
    const removedParts = existingParts.filter(
      (oldPart) => !updatedParts.some((newPart:any) => newPart.code === oldPart.code)
    );
    if (removedParts.length > 0) {
      await sparePartRepository.remove(removedParts);
    }

    // 6️⃣ Save updated and new parts
    await sparePartRepository.save(updatedParts);

    // 7️⃣ Get updated prixod with all relations
    const updatedPrixod = await prixodRepository.findOne({
      where: { id: getPrixod.id },
      relations: ["supplier", "order", "spareParts", "spareParts.brand"],
    });

    // 8️⃣ Send response
    return res.status(200).json({
      message: "Prixod və ehtiyat hissələri uğurla yeniləndi",
      data: updatedPrixod,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, error.message || "Server xətası"));
  }
};


export const writeMessage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId=req.userId;
    const { message } = req.body;

    console.log(message);
    
    const prixod = await prixodRepository.findOneBy({ id: +id });

    const user=await userRepository.findOneBy({id:+userId});  

    if (!prixod) {
      next(errorHandler(401, "Belə bir giriş tapılmadı!"));
      return;
    }

    prixod.message = message;
    prixod.user = user;
    await prixodRepository.save(prixod);

    res.status(200).json({ result: "Mesaj yazıldı" });
  } catch (error) {
    next(errorHandler(401, error));
  }
};


export const confirmPrixod = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId=req.userId;  
    const prixod = await prixodRepository.findOneBy({ id: +id });

    const user=await userRepository.findOneBy({id:+userId});

    if (!user) {
      next(errorHandler(401, "İstifadəçi tapılmadı!"));
      return;
    }

    if (!prixod) {
      next(errorHandler(401, "Belə bir prixod tapılmadı!"));
      return;
    }
    prixod.confirm = true;
    prixod.confirmDate = new Date();
    prixod.user = user;
    await prixodRepository.save(prixod);
    res.status(200).json({ result: "Prixod təsdiqləndi" });
  } catch (error) {
    next(errorHandler(401, error));
  }
};