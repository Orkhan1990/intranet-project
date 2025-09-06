import { UploadedFile } from "express-fileupload";
import { Request, Response } from "express";
import { log } from "console";

export const createPriceList = async (req: Request, res: Response) => {
  try {
       log(req.file); // Multer adds the file to req.file

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
