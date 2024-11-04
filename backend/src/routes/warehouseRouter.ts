import express from "express";
import { createWarehouse } from "../controllers/warehouseController";


const router=express.Router();


router.post("/createWarehouse",createWarehouse)





export default router;