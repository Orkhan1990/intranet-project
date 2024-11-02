import express from "express";
import { createSupplier, deleteSupplier, getSupplier, getSuppliers, updateSuplier } from "../controllers/supplierController";



const router=express.Router();



router.post("/createSupplier",createSupplier);
router.get("/getSuppliers",getSuppliers);
router.get("/getSupplier/:id",getSupplier);
router.post("/updateSupplier/:id",updateSuplier);
router.delete("/deleteSupplier/:id",deleteSupplier);

export default router;