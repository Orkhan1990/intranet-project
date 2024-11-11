import express from "express";
import { createWarehouse } from "../controllers/warehouseController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createWarehouse",verifyToken,createWarehouse)





export default router;