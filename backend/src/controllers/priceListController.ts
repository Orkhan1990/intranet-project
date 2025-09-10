import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { parse } from "@fast-csv/parse";
import { AppDataSource } from "../database";
import { PriceListHist } from "../entites/PriceListHist";
import { Type } from "../enums/allEnums";

const priceListHistRepo = AppDataSource.getRepository(PriceListHist);

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

    const records: PriceListHist[] = [];
    await priceListHistRepo.clear();
    const BATCH_SIZE = 1000;

    const stream = fs.createReadStream(filePath);
    const csvStream = parse({ headers: false, delimiter: ";" });

    csvStream
      .on("error", (error) => {
        console.error("❌ CSV Parsing Error:", error);
        res.status(500).json({ success: false, message: "CSV parsing error" });
      })
      .on("data", async (row) => {
        const rabatgrup = parseInt(row[0], 10);
        const weight = parseFloat(row[1]);
        const price = parseFloat(row[2]);
        const name = row[3];
        const nameDe = row[4];
        const origKod = row[5];

        const hist = new PriceListHist();
        hist.rabatgrup = isNaN(rabatgrup) ? 0 : rabatgrup;
        hist.weight = isNaN(weight) ? 0 : weight;
        hist.price = isNaN(price) ? 0 : price;
        hist.name = name || "";
        hist.namede = nameDe || "";
        hist.origKod = origKod || "";
        hist.year = parseInt(year);
        hist.month = parseInt(month);
        hist.type = type as Type;

        records.push(hist);

      //   if (records.length >= BATCH_SIZE) {
      //     csvStream.pause();

      //     try {
      //       await priceListHistRepo.save(records.splice(0, BATCH_SIZE));
      //       csvStream.resume();
      //     } catch (err) {
      //       console.error("❌ DB Save Error:", err);
      //       csvStream.destroy(err);
      //     }
      //   }
      })
      .on("end", async () => {
        try {
          if (records.length > 0) {
            await priceListHistRepo.save(records);
          }
          res.status(201).json({
            success: true,
            message: "Price list imported successfully",
          });
        } catch (err) {
          console.error("❌ Final DB Save Error:", err);
          res.status(500).json({ success: false, message: "DB error" });
        }
      });

    stream.pipe(csvStream); // <- now correctly piping

  } catch (err) {
    console.error("❌ Import Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
