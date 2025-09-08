import { NextFunction, Request, Response } from "express";
import ExcelJS from "exceljs";
import fs from "fs";
import { log } from "console";
import errorHandler from "../middleware/errorHandler";
import { PriceListHist } from "../entites/PriceListHist";


const priceListHistRepository = PriceListHist.getRepository();

export const createPriceList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    log(req.file); // Multer adds the file to req.file
    const {type, year, month}=req.body;
    if (!req.file) {
      next(errorHandler(401, "File not found"));
    }

    const filePath=req.file.path;
    const workbook=new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet=workbook.worksheets[0];

     const batchSize = 1000;
     let batch: PriceListHist[] = [];
     let rowCount = 0;
       for (let i = 2; i <= worksheet.rowCount; i++) {
         const row = worksheet.getRow(i);
         const priceListHist = new PriceListHist();
         priceListHist.rabatgrup = Number(row.getCell(1)?.value) || 0;
         priceListHist.weight = Number(row.getCell(2)?.value) || 0;
         priceListHist.weight = parseInt(String(row.getCell(3)?.value || "0")) || 0;
         priceListHist.price = parseFloat(String(row.getCell(4)?.value || "0")) || 0;
         priceListHist.name = String(row.getCell(5)?.value || "");
         priceListHist.namede = String(row.getCell(6)?.value || "");
         priceListHist.origKod = String(row.getCell(7)?.value || "");
         priceListHist.type = type
         priceListHist.year = year;
         priceListHist.month = month;
          
          batch.push(priceListHist);
          rowCount++;
          if (batch.length === batchSize) {
            await PriceListHist.getRepository().save(batch);
            batch = [];
            log(`${rowCount} rows processed...`);
          }
        }

        if (batch.length > 0) {
          await priceListHistRepository.save(batch);
          log(`Total ${rowCount} rows processed.`);
        }

            fs.unlinkSync(filePath);
    res
      .status(201)
      .json({ success: true, message: "Price list created successfully." });
  } catch (error) {
    console.error("Error creating price list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
