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
import { In } from "typeorm";

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
      return res.status(400).json({ success: false, message: "CSV file is required" });
    }

    if (!year || !month || !type) {
      return res.status(400).json({ success: false, message: "Missing year, month, or type" });
    }

    if (!Object.values(Type).includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid type value" });
    }

    // Clear existing records first
    await AppDataSource.getRepository(PriceListHist).clear();

    const BATCH_SIZE = 1000;
let batch: Partial<PriceListHist>[] = [];
    let totalInserted = 0;

    const stream = fs.createReadStream(filePath);
    const csvStream = parse({ headers: false, delimiter: ";" })
      .on("error", (error) => {
        console.error("❌ CSV Parsing Error:", error);
        return res.status(500).json({ success: false, message: "CSV parsing error" });
      })
      .on("data", async (row) => {
        // Map and validate row
        const rabatgrup = parseInt(row[0], 10);
        const weight = parseFloat(row[1]);
        const price = parseFloat(row[2]);
        const name = row[3];
        const nameDe = row[4];
        const origKod = row[5];

      const record: Partial<PriceListHist> = {
  rabatgrup: isNaN(rabatgrup) ? 0 : rabatgrup,
  weight: isNaN(weight) ? 0 : weight,
  price: isNaN(price) ? "0.00" : (price / 100).toFixed(2),
  name: name || "",
  namede: nameDe || "",
  origKod: origKod || "",
  year: parseInt(year),
  month: parseInt(month),
  type: type as Type,
};
       

        batch.push(record);

        if (batch.length >= BATCH_SIZE) {
          csvStream.pause(); // Pause reading while we write to DB

          try {
            await AppDataSource
              .getRepository(PriceListHist)
              .createQueryBuilder()
              .insert()
              .into(PriceListHist)
              .values(batch)
              .execute();

            totalInserted += batch.length;
            console.log(`✅ Inserted batch. Total so far: ${totalInserted}`);
            batch = [];
          } catch (dbError) {
            console.error("❌ DB Insert Error:", dbError);
            return res.status(500).json({ success: false, message: "Database insert error" });
          }

          csvStream.resume(); // Resume reading
        }
      })
      .on("end", async () => {
        // Insert remaining records
        if (batch.length > 0) {
          try {
            await AppDataSource
              .getRepository(PriceListHist)
              .createQueryBuilder()
              .insert()
              .into(PriceListHist)
              .values(batch)
              .execute();

            totalInserted += batch.length;
            console.log(`✅ Final insert done. Total inserted: ${totalInserted}`);
          } catch (dbError) {
            console.error("❌ Final DB Insert Error:", dbError);
            return res.status(500).json({ success: false, message: "Final database insert error" });
          }
        }

        // Clean up file
        fs.unlink(filePath, (err) => {
          if (err) console.warn("⚠️ Could not delete uploaded file:", filePath);
        });

        return res.status(201).json({
          success: true,
          message: `Successfully imported ${totalInserted} records.`,
        });
      });

    stream.pipe(csvStream);
  } catch (err) {
    console.error("❌ Unexpected Error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// export const createPriceList = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { year, month, type } = req.body;
//     const filePath = req.file?.path;

//     if (!filePath) {
//       return res
//         .status(400)
//         .json({ success: false, message: "CSV file is required" });
//     }

//     if (!year || !month || !type) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing year, month, or type" });
//     }

//     if (!Object.values(Type).includes(type)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid type value" });
//     }

//     await priceListHistRepo.clear(); // Clear existing data

//     const records: PriceListHist[] = [];
//     const BATCH_SIZE = 1000;

//     const stream = fs.createReadStream(filePath);
//     const csvStream = parse({ headers: false, delimiter: ";" });

//     csvStream
//       .on("error", (error) => {
//         console.error("❌ CSV Parsing Error:", error);
//         return res
//           .status(500)
//           .json({ success: false, message: "CSV parsing error" });
//       })
//       .on("data", (row) => {
//         const rabatgrup = parseInt(row[0], 10);
//         const weight = parseFloat(row[1]);
//         const price = parseFloat(row[2]);
//         const name = row[3];
//         const nameDe = row[4];
//         const origKod = row[5];

//         const hist = new PriceListHist();
//         hist.rabatgrup = isNaN(rabatgrup) ? 0 : rabatgrup;
//         hist.weight = isNaN(weight) ? 0 : weight;
//         hist.price = isNaN(price) ? "0.00" : (price / 100).toFixed(2);
//         hist.name = name || "";
//         hist.namede = nameDe || "";
//         hist.origKod = origKod || "";
//         hist.year = parseInt(year);
//         hist.month = parseInt(month);
//         hist.type = type as Type;

//         records.push(hist);
//       })
//       .on("end", async () => {
//         try {
//           console.log(
//             `✅ Parsed ${records.length} rows. Saving to DB in batches...`
//           );

//           for (let i = 0; i < records.length; i += BATCH_SIZE) {
//             const batch = records.slice(i, i + BATCH_SIZE);
//             await priceListHistRepo.save(batch);
//             console.log(`✅ Saved batch ${i / BATCH_SIZE + 1}`);
//           }

//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.warn("⚠️ Could not delete file:", filePath);
//             }
//           });

//           return res.status(201).json({
//             success: true,
//             message: `Successfully imported ${records.length} records.`,
//           });
//         } catch (err) {
//           console.error("❌ Final DB Save Error:", err);
//           return res.status(500).json({ success: false, message: "DB error" });
//         }
//       });

//     stream.pipe(csvStream);
//   } catch (err) {
//     console.error("❌ Import Error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };

export const checkPriceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderPartsId, delivering, totalPriceMan } = req.body;
    console.log({ totalPriceMan });

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
      return res.status(404).json({
        success: false,
        message: "No order parts found for given IDs",
      });
    }

    const origKods = orderParts.map((part) => part.origCode);

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
          part.delivering = delivering;
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
    const { editableOrderParts } = req.body;

    // console.log(editableOrderParts);
    

    if (!editableOrderParts || !Array.isArray(editableOrderParts)) {
      return next(errorHandler(400, "editableOrderParts is required and must be an array."));
    }

    const orderPartsId = editableOrderParts.map((p: any) => p.id);

    // console.log(orderPartsId);
    

    const existingParts = await orderPartRepository.find({
      where: { id: In(orderPartsId) },
    });


    console.log(existingParts);
    
    if (existingParts.length === 0) {
      return next(errorHandler(404, "No order parts found for the provided IDs."));
    }

    const updatedOrderParts = await Promise.all(
      editableOrderParts.map(async (inputPart: any) => {
        const existingPart = existingParts.find((p) => p.id === inputPart.id);
        if (!existingPart) return null;

        // Extract values from frontend payload (with fallbacks)
        const {
          priceExw = 0,
          count = existingPart.count || 1,
          taxValue = 0,
          percentage = 0,
          totalPriceManValue = 1,
        } = inputPart;

        // Calculation
        const totalPrice = +(priceExw * count).toFixed(2);
        const totalPriceMan = +(totalPrice * totalPriceManValue).toFixed(2);
        const tax = +((totalPriceMan * taxValue) / 100).toFixed(2);
        const profit = +(((totalPriceMan + tax) * percentage) / 100).toFixed(2);
        const ddpPrice = +(totalPriceMan + tax).toFixed(2);
        const fullSellPrice = +(totalPriceMan + tax + profit).toFixed(2);

        // Update entity
        existingPart.priceExw = priceExw;
        existingPart.totalPrice = totalPrice.toString();
        existingPart.totalPriceManValue = totalPriceManValue;
        existingPart.totalPriceMan = totalPriceMan.toString();
        existingPart.cipPrice = totalPriceMan.toString();
        existingPart.taxValue = taxValue;
        existingPart.tax = tax.toString();
        existingPart.percentage = percentage;
        existingPart.profit = profit.toString();
        existingPart.ddpPrice = ddpPrice.toString();
        existingPart.unitDdpPrice = ddpPrice.toString();
        existingPart.sellPriceClientStock = fullSellPrice.toString();
        existingPart.unitSellPrice = fullSellPrice.toString();

        return await orderPartRepository.save(existingPart);
      })
    );

    res.status(200).json({ updatedOrderParts });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
};

