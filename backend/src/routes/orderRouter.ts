import express from "express";
import { createOrder } from "../controllers/orderController";


const router=express.Router();

router.post("/createOrder",createOrder)



export default router;