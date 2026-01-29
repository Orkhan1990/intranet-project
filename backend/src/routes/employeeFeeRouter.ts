import express from "express";
import verifyToken from "../middleware/verifyToken";
import { filterEmployeeFee } from "../controllers/employeeFeeController";






const router=express.Router();

router.post('/filterEmployeeFee',verifyToken,filterEmployeeFee);


export default router;