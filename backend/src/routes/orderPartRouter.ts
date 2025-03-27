import express from "express";
import { getOrderPartsByOrderId, getSupplierOrderPartsData } from "../controllers/orderPartController";



const router=express.Router();
router.get("/getOrderPartsByOrderId/:id",getOrderPartsByOrderId);
router.get("/getSupplierOrderPartsData",getSupplierOrderPartsData);



export default router;
