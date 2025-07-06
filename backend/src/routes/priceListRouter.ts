import express from "express";
import { createPriceList } from "../controllers/priceListController";




const router = express.Router();


router.post("/createPriceList",createPriceList);




export default router;