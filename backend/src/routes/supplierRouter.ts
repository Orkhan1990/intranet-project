import express from "express";
import { createSupplier, getSuppliers } from "../controllers/supplierController";



const router=express.Router();



router.post("/createSupplier",createSupplier);
router.get("/getSuppliers",getSuppliers);

export default router;