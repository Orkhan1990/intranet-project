import express from "express";
import { createPriceList } from "../controllers/priceListController";
import multer from "multer";
import path from "path";
import fileUpload from "express-fileupload";

const router = express.Router();

const uploadOptsions = {
  useTempFiles: true,
  tempFileDir: "./tmp/", // `__dirname` is `src/`
  createParentPath: true,
    limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
  abortOnLimit: true};

router.post("/createPriceList", fileUpload(uploadOptsions), createPriceList);

export default router;
