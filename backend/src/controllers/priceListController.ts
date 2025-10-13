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

    // Clear existing records first
    await AppDataSource.getRepository(PriceListHist).clear();

    const BATCH_SIZE = 1000;
    let batch: Partial<PriceListHist>[] = [];
    let totalInserted = 0;

    const stream = fs.createReadStream(filePath);
    const csvStream = parse({ headers: false, delimiter: ";" })
      .on("error", (error) => {
        console.error("❌ CSV Parsing Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "CSV parsing error" });
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
            await AppDataSource.getRepository(PriceListHist)
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
            return res
              .status(500)
              .json({ success: false, message: "Database insert error" });
          }

          csvStream.resume(); // Resume reading
        }
      })
      .on("end", async () => {
        // Insert remaining records
        if (batch.length > 0) {
          try {
            await AppDataSource.getRepository(PriceListHist)
              .createQueryBuilder()
              .insert()
              .into(PriceListHist)
              .values(batch)
              .execute();

            totalInserted += batch.length;
            console.log(
              `✅ Final insert done. Total inserted: ${totalInserted}`
            );
          } catch (dbError) {
            console.error("❌ Final DB Insert Error:", dbError);
            return res
              .status(500)
              .json({ success: false, message: "Final database insert error" });
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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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
    const { orderPartsId, delivering, editableOrderParts } = req.body;
    // console.log({ editableOrderParts });

    if (
      !orderPartsId ||
      !Array.isArray(orderPartsId) ||
      orderPartsId.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "origKods array is required" });
    }

    const origKods = editableOrderParts.map((part: any) => part.origCode);

    const foundParts = await priceListHistRepo
      .createQueryBuilder("priceListHist")
      .where("priceListHist.origKod IN (:...origKods)", { origKods })
      .getMany();

    // console.log({ foundParts });

    if (foundParts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No matching parts found" });
    }

    const updatedOrderParts = await Promise.all(
      editableOrderParts.map(async (part: any) => {
        const match = foundParts.find(
          (foundPart) => part.origCode === foundPart.origKod
        );

        console.log(part.totalPrice);
        

        if (match) {
          part.partName = match.name;
          part.stockQuantity = "100"; // Example hardcoded value
          part.price = match.price;
          part.priceExwNoDiscount = match.price;
          part.rabatgrupInd = match.rabatgrup;
          part.delivering = delivering;
          // part.totalPrice=+(match.price)*part.count;
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
            item.totalPrice = (totalWithPacking*item.count).toFixed(2);
            await orderPartRepository.save(item);
          }
        }

        return matches;
      })
    );

    const flatOrderParts = calculationOrderParts.flat();

    // console.log({ flatOrderParts });

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

    if (!editableOrderParts || !Array.isArray(editableOrderParts)) {
      return next(
        errorHandler(400, "editableOrderParts is required and must be an array.")
      );
    }

    const orderPartsId = editableOrderParts.map((p: any) => p.id);

    const existingParts = await orderPartRepository.find({
      where: { id: In(orderPartsId) },
    });

    if (existingParts.length === 0) {
      return next(errorHandler(404, "No order parts found for the provided IDs."));
    }

    // ✅ Shared values from frontend (defaults used if not provided)
    const sharedValues = {
      priceExw: editableOrderParts.find(p => p.priceExw != null)?.priceExw ?? 0,
      totalPriceManValue: editableOrderParts.find(p => p.totalPriceManValue != null)?.totalPriceManValue ?? 1,
      transportValue: editableOrderParts.find(p => p.transportValue != null)?.transportValue ?? 0,
      transportManValue: editableOrderParts.find(p => p.transportManValue != null)?.transportManValue ?? 0,
      taxValue: editableOrderParts.find(p => p.taxValue != null)?.taxValue ?? 0,
      percentage: editableOrderParts.find(p => p.percentage != null)?.percentage ?? 0,
      declarationValue: editableOrderParts.find(p => p.declarationValue != null)?.declarationValue ?? 0,
      accessoryCostValue: editableOrderParts.find(p => p.accessoryCostValue != null)?.accessoryCostValue ?? 0,
    };

    // 🧠 Map for fast lookup
    const existingPartsMap = new Map<number, OrderPart>();
    existingParts.forEach((part) => existingPartsMap.set(part.id, part));

    const updatedParts: OrderPart[] = [];

    for (const inputPart of editableOrderParts) {
      const dbPart = existingPartsMap.get(inputPart.id);
      if (!dbPart) continue;

      // 🛠 Apply values — fallback order: input → db → shared → default
      const priceExw = inputPart.priceExw ?? dbPart.priceExw ?? sharedValues.priceExw;
      const count = inputPart.count ?? dbPart.count ?? 1;
      const taxValue = inputPart.taxValue ?? dbPart.taxValue ?? sharedValues.taxValue;
      const percentage = inputPart.percentage ?? dbPart.percentage ?? sharedValues.percentage;
      const totalPriceManValue = inputPart.totalPriceManValue ?? dbPart.totalPriceManValue ?? sharedValues.totalPriceManValue;
      const transportManValue = inputPart.transportManValue ?? dbPart.transportManValue ?? sharedValues.transportManValue;
      const transportValue=inputPart.transportValue??dbPart.transportValue??sharedValues.transportValue;

      // 🧮 Calculations
      const totalPrice = +(priceExw * count).toFixed(2);
      const totalPriceMan = +(totalPrice * totalPriceManValue).toFixed(2);
      const tax = +((totalPriceMan * taxValue) / 100).toFixed(2);
      const profit = +(((totalPriceMan + tax) * percentage) / 100).toFixed(2);
      const ddpPrice = +(totalPriceMan + tax).toFixed(2);
      const fullSellPrice = +(totalPriceMan + tax + profit).toFixed(2);

      // ✅ Update part object
      dbPart.priceExw = priceExw;
      dbPart.count = count;
      dbPart.totalPrice = totalPrice.toFixed(2);
      dbPart.totalPriceManValue = totalPriceManValue;
      dbPart.totalPriceMan = totalPriceMan.toFixed(2);
      dbPart.cipPrice = totalPriceMan.toFixed(2);
      dbPart.taxValue = taxValue;
      dbPart.tax = tax.toFixed(2);
      dbPart.percentage = percentage;
      dbPart.profit = profit.toFixed(2);
      dbPart.ddpPrice = ddpPrice.toFixed(2);
      dbPart.unitDdpPrice = ddpPrice.toFixed(2);
      dbPart.sellPriceClientStock = fullSellPrice.toFixed(2);
      dbPart.unitSellPrice = fullSellPrice.toFixed(2);
      dbPart.transportManValue = transportManValue;
      dbPart.transportValue=transportValue;

      // Optionally set others
      dbPart.declarationValue = sharedValues.declarationValue;
      dbPart.accessoryCostValue = sharedValues.accessoryCostValue;

      updatedParts.push(dbPart);
    }

    // 💾 Save all at once
    const savedParts = await orderPartRepository.save(updatedParts);

    return res.status(200).json({
      updatedOrderParts: savedParts,
    });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
};



