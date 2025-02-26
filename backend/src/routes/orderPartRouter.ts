import express from "express";
import { getOrderPartsByOrderId } from "../controllers/orderPartController";



const router=express.Router();
router.get("/getOrderPartsByOrderId/:id",getOrderPartsByOrderId);



export default router;
