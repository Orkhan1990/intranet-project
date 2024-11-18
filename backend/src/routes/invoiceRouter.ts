import express from "express";
import { createInvoice } from "../controllers/invoiceController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createInvoice",verifyToken,createInvoice)





export default router;