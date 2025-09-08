import express from "express";
import { createPriceList } from "../controllers/priceListController";
import { upload } from "../middleware/multerConfig";

const router = express.Router();



router.post("/createPriceList", upload.single("file"), createPriceList);

export default router;
