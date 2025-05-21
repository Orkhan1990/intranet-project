import express from "express";
import { choosingBestSupplier, getOrderPartsByOrderId, getSupplierOrderPartsData } from "../controllers/orderPartController";



const router=express.Router();
router.get("/getOrderPartsByOrderId/:id",getOrderPartsByOrderId);
router.get("/getSupplierOrderPartsData",getSupplierOrderPartsData);
router.post("/choosingBestSupplier/:id",choosingBestSupplier);



export default router;
