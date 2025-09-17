import express from "express";
import { checkPriceList, createPriceList } from "../controllers/priceListController";
import { upload } from "../middleware/multerConfig";

const router = express.Router();



router.post("/createPriceList", upload.single("file"), createPriceList);
router.post("/checkPriceList", checkPriceList);

export default router;
