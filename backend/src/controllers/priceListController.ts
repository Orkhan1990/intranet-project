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
      return res.status(400).json({ success: false, message: "CSV file is required" });
    }

    if (!year || !month || !type) {
      return res.status(400).json({ success: false, message: "Missing year, month, or type" });
    }

    if (!Object.values(Type).includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid type value" });
    }

    await priceListHistRepo.clear(); // Clear existing data

    const records: PriceListHist[] = [];
    const BATCH_SIZE = 1000;

    const stream = fs.createReadStream(filePath);
    const csvStream = parse({ headers: false, delimiter: ";" });

    csvStream
      .on("error", (error) => {
        console.error("❌ CSV Parsing Error:", error);
        return res.status(500).json({ success: false, message: "CSV parsing error" });
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
        hist.price = isNaN(price) ? 0 : price;
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
          console.log(`✅ Parsed ${records.length} rows. Saving to DB in batches...`);

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
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
