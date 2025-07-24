import express from "express";
import { createPriceList } from "../controllers/priceListController";
import multer from 'multer';




const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // or configure storage


router.post("/createPriceList",upload.single('file'),createPriceList);




export default router;