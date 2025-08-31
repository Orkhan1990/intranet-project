import { UploadedFile } from "express-fileupload";
import {Request,Response } from "express";

export const createPriceList = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const file = req.files.file as UploadedFile;
    console.log("File received:", file.name, file.mimetype, file.size);

    res.status(201).json({ success: true, message: "Price list created successfully." });
  } catch (error) {
    console.error("Error creating price list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
