import express from "express";
import { createSupplier } from "../controllers/supplierController";



const router=express.Router();



router.post("/createSupplier",createSupplier)

export default router;