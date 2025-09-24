import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { parse } from "@fast-csv/parse";
import { AppDataSource } from "../database";
import { PriceListHist } from "../entites/PriceListHist";
import { Type } from "../enums/allEnums";
import errorHandler from "../middleware/errorHandler";
import { log } from "console";
import { Rabatgrup } from "../entites/Rabatgrup";
import { OrderPart } from "../entites/OrderPart";

const priceListHistRepo = AppDataSource.getRepository(PriceListHist);
const rabatgrupRepo = AppDataSource.getRepository(Rabatgrup);
const orderPartRepository = AppDataSource.getRepository(OrderPart);

export const createPriceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year, month, type } = req.body;
    const filePath = req.file?.path;

    if (!filePath) {
      return res
        .status(400)
        .json({ success: false, message: "CSV file is required" });
    }

    if (!year || !month || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Missing year, month, or type" });
    }

    if (!Object.values(Type).includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid type value" });
    }

    await priceListHistRepo.clear(); // Clear existing data

    const records: PriceListHist[] = [];
    const BATCH_SIZE = 1000;

    const stream = fs.createReadStream(filePath);
    const csvStream = parse({ headers: false, delimiter: ";" });

    csvStream
      .on("error", (error) => {
        console.error("❌ CSV Parsing Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "CSV parsing error" });
      })
      .on("data", (row) => {
        const rabatgrup = parseInt(row[0], 10);
        const weight = parseFloat(row[1]);
        const price = parseFloat(row[2]);
        const name = row[3];
        const nameDe = row[4];
        const origKod = row[5];

        const hist = new PriceListHist();
        hist.rabatgrup = isNaN(rabatgrup) ? 0 : rabatgrup;
        hist.weight = isNaN(weight) ? 0 : weight;
        hist.price = isNaN(price) ? "0.00" : (price / 100).toFixed(2);
        hist.name = name || "";
        hist.namede = nameDe || "";
        hist.origKod = origKod || "";
        hist.year = parseInt(year);
        hist.month = parseInt(month);
        hist.type = type as Type;

        records.push(hist);
      })
      .on("end", async () => {
        try {
          console.log(
            `✅ Parsed ${records.length} rows. Saving to DB in batches...`
          );

          for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);
            await priceListHistRepo.save(batch);
            console.log(`✅ Saved batch ${i / BATCH_SIZE + 1}`);
          }

          fs.unlink(filePath, (err) => {
            if (err) {
              console.warn("⚠️ Could not delete file:", filePath);
            }
          });

          return res.status(201).json({
            success: true,
            message: `Successfully imported ${records.length} records.`,
          });
        } catch (err) {
          console.error("❌ Final DB Save Error:", err);
          return res.status(500).json({ success: false, message: "DB error" });
        }
      });

    stream.pipe(csvStream);
  } catch (err) {
    console.error("❌ Import Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const checkPriceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderPartsId,delivering,totalPriceMan } = req.body;
    console.log({totalPriceMan});

    if (
      !orderPartsId ||
      !Array.isArray(orderPartsId) ||
      orderPartsId.length === 0
    ) {
      return res
      .status(400)
      .json({ success: false, message: "origKods array is required" });
    }

   const orderParts = await orderPartRepository
  .createQueryBuilder("orderPart")
  .where("orderPart.id IN (:...orderPartsId)", { orderPartsId })
  .getMany();

  if (orderParts.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No order parts found for given IDs" });
  }

  const origKods = orderParts.map(part => part.origCode);

      // console.log({ origKods });
      
    
    const foundParts = await priceListHistRepo
      .createQueryBuilder("priceListHist")
      .where("priceListHist.origKod IN (:...origKods)", { origKods })
      .getMany();


    if (foundParts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No matching parts found" });
    }


    const updatedOrderParts = await Promise.all(
      orderParts.map(async (part) => {
        const match = foundParts.find(
          (foundPart) => part.origCode === foundPart.origKod
        );

        if (match) {
          part.partName = match.name;
          part.stockQuantity = "100"; // Example hardcoded value
          part.price = match.price;
          part.priceExwNoDiscount = match.price;
          part.rabatgrupInd = match.rabatgrup;
          part.delivering=delivering;
          await orderPartRepository.save(part);
        }

        return part;
      })
    );

    const getDiscounts = await Promise.all(
      foundParts.map(async (part) => {
        return await rabatgrupRepo.findOneBy({ rabatgrupInd: part.rabatgrup });
      })
    );

   const calculationOrderParts = await Promise.all(
  getDiscounts.map(async (discount) => {
    const matches = updatedOrderParts.filter(
      (item) => discount?.rabatgrupInd === item?.rabatgrupInd
    );

    for (const item of matches) {
      if (item.rabatgrupInd && discount) {
        const price = Number(item.priceExwNoDiscount); // use base price
        const discountPercent = parseFloat(discount.discount);

        const priceWithoutPacking = price - (price * discountPercent) / 100;
        const packing = parseFloat(((price * 1.75) / 100).toFixed(2));
        const totalWithPacking = parseFloat(
          (priceWithoutPacking + packing).toFixed(2)
        );

        item.priceWithoutPacking = priceWithoutPacking.toFixed(2);
        item.packing = packing.toFixed(2);
        item.priceExw = totalWithPacking.toFixed(2);
        item.totalPrice = totalWithPacking.toFixed(2);

        await orderPartRepository.save(item);
      }
    }

    return matches;
  })
);

const flatOrderParts = calculationOrderParts.flat();

console.log({ flatOrderParts });


    return res.status(200).json({ success: true, data: flatOrderParts });
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const calculateStandartOrderPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {totalPriceMan } = req.body;
    console.log({totalPriceMan});}catch (error) {
    next(errorHandler(401, error.message));
  }}
