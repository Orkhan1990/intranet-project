import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { Supplier } from "../entites/Supplier";
import { SupplierOrderHistory } from "../entites/SuppliersOrderHistory";

const supplierRepository = AppDataSource.getRepository(Supplier);
const supplierOrderHistoryRepository =
  AppDataSource.getRepository(SupplierOrderHistory);

export const createSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      supplier,
      country,
      contactPerson,
      phone,
      email,
      paymentType,
      deliverType,
      deliverPeriod,
      creditLine,
      creditNote,
      creditDuration,
    } = req.body;

    const supplierRepository = AppDataSource.getRepository(Supplier);

    const newSupplier = new Supplier();
    newSupplier.supplier = supplier;
    newSupplier.country = country;
    newSupplier.contactPerson = contactPerson;
    newSupplier.phone = phone;
    newSupplier.email = email;
    newSupplier.paymentType = paymentType;
    newSupplier.deliverType = deliverType;
    newSupplier.deliverPeriod = deliverPeriod;
    newSupplier.creditLine = creditLine;
    newSupplier.creditNote = creditNote;
    newSupplier.creditDuration = creditDuration;

    await supplierRepository.save(newSupplier);

    res.status(200).json(newSupplier);
  } catch (error: any) {
    next(errorHandler(401, error));
  }
};

export const getSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supplierRepository = AppDataSource.getRepository(Supplier);

    const suppliers = await supplierRepository.find();

    if (!suppliers) {
      next(errorHandler(401, "Təchizatçılar mövcud deyil!"));
      return;
    }

    res.status(200).json(suppliers);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const getSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const supplierRepository = AppDataSource.getRepository(Supplier);

    const supplier = await supplierRepository.findOneBy({ id: +id });

    if (!supplier) {
      next(errorHandler(401, "Belə təchizatçı yoxdur"));
      return;
    }

    res.status(200).json(supplier);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const updateSuplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const {
      supplier,
      country,
      contactPerson,
      phone,
      email,
      paymentType,
      deliverType,
      deliverPeriod,
      creditLine,
      creditNote,
      creditDuration,
    } = req.body;

    const supplierRepository = AppDataSource.getRepository(Supplier);
    const supplierData = await supplierRepository.findOneBy({ id: +id });

    if (!supplierData) {
      next(errorHandler(401, "Belə təchizatçı yoxdur"));
      return;
    }

    supplierData.supplier = supplier;
    supplierData.contactPerson = contactPerson;
    supplierData.country = country;
    supplierData.phone = phone;
    supplierData.email = email;
    supplierData.paymentType = paymentType;
    supplierData.deliverPeriod = deliverPeriod;
    supplierData.deliverType = deliverType;
    supplierData.creditDuration = creditDuration;
    supplierData.creditLine = creditLine;
    supplierData.creditNote = creditNote;

    await supplierRepository.save(supplierData);
    res.status(200).json(supplierData);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const deleteSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const hasOrders = await supplierOrderHistoryRepository.findOne({
      where: { supplier: { id: Number(id) } }, // assuming `supplier` is a relation
    });

    if (hasOrders) {
      return next(
        errorHandler(
          400,
          "Bu təchizatçının sifariş tarixçəsi mövcuddur və silinə bilməz."
        )
      );
    }
    const result = await supplierRepository.delete(id);

    if (result.affected === 0) {
      next(errorHandler(401, "Təchizatçı tapılmadı!"));
      return;
    }

    res.status(200).json({ message: "Təchizatçı uğurla silindi!" });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};
