import express from "express";
import { calculateStandartOrderPrice, checkPriceList, createPriceList } from "../controllers/priceListController";
import { upload } from "../middleware/multerConfig";

const router = express.Router();



router.post("/createPriceList", upload.single("file"), createPriceList);
router.post("/checkPriceList", checkPriceList);
router.post("/calculateStandartOrderPrice", calculateStandartOrderPrice);

export default router;
