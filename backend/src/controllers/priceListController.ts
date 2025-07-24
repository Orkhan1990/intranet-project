import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { PriceListHist } from "../entites/PriceListHist";
import { PriceList } from "../entites/PriceList";

const priceListRepository = AppDataSource.getRepository("PriceList");
const priceListHistRepository = AppDataSource.getRepository("PriceListHist");




export const createPriceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

      const file = req.file;         // The uploaded file
      const { year, month, type } = req.body;  // Other form data
    console.log(file, year, month, type);
    const initialValues = req.body; // FIXED: don't destructure

    if (!Array.isArray(initialValues) || initialValues.length === 0) {
      return next(
        errorHandler(
          400,
          "Qiymət siyahısı məlumatı boşdur və ya düzgün formatda deyil."
        )
      );
    }

    const newPriceListHistArray = initialValues.map((data) => {
      const item = new PriceListHist();
      item.origKod = data.origKod;
      item.kod = data.kod;
      item.name = data.name;
      item.namede = data.nameDe;
      item.price = parseFloat(data.price);
      item.quantity = parseFloat(data.quantity);
      item.type = data.type || "";
      item.rabatgrup = parseFloat(data.rabatgrup) || 0;
      item.year = data.year;
      item.month = data.month || "";

      return item;
    });

    const newPriceListArray = initialValues.map((data) => {
      const item = new PriceList();
      item.origkod = data.origKod;
      item.kod = data.kod;
      item.name = data.name;
      item.nameDe = data.nameDe;
      item.price = data.price;
      item.quantity = data.quantity;
      item.type = data.type || "";
      item.rabatgrup = parseFloat(data.rabatgrup) || 0;

      return item;
    });

    await priceListHistRepository.save(newPriceListHistArray);
    await priceListRepository.save(newPriceListArray);

    return res.status(200).json({
      success: true,
      message: "Price list created successfully.",
    });
  } catch (error) {
    console.error("Error creating price list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
