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
    console.log(req.body);
    const {initialValues} = req.body;
    

    if (!Array.isArray(initialValues) || initialValues.length === 0) {
      next(
        errorHandler(
          401,
          "Qiymət siyahısı məlumatı boşdur və ya düzgün formatda deyil."
        )
      );
      return;
    }

    const newPriceListHistArray = await Promise.all(
      initialValues.map(async (data) => {
        const newPriceListHist = new PriceListHist();
        newPriceListHist.origKod = data.origKod;
        newPriceListHist.kod = data.kod;
        newPriceListHist.name = data.name;
        newPriceListHist.namede = data.nameDe;
        newPriceListHist.price = data.price;
        newPriceListHist.quantity = data.quantity;
        newPriceListHist.type = data.type;
        newPriceListHist.rabatgrup = data.rabatgrup;
        newPriceListHist.year = data.year;
        newPriceListHist.month = data.month || null; // Handle month as optional

        return newPriceListHist;
      })
    );

    await priceListHistRepository.save(newPriceListHistArray);

    const newPriceListArray = await Promise.all(
      initialValues.map(async (data) => {
        const newPriceList = new PriceList();
        newPriceList.origkod = data.origKod;
        newPriceList.kod = data.kod;
        newPriceList.name = data.name;
        newPriceList.nameDe = data.nameDe;
        newPriceList.price = data.price;
        newPriceList.quantity = data.quantity;
        newPriceList.type = data.type;
        newPriceList.rabatgrup = data.rabatgrup;

        return newPriceList;
      })
    );

    await priceListRepository.save(newPriceListArray);


    return res
      .status(200)
      .json({ success: true, message: "Price list created successfully." });

  } catch (error) {
    console.error("Error creating price list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
