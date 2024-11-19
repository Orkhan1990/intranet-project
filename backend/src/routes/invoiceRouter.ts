import express from "express";
import { createInvoice, getInvoices } from "../controllers/invoiceController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createInvoice",verifyToken,createInvoice);
router.get("/getInvoices",getInvoices)





export default router;