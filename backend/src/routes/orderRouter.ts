import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();

router.post("/createOrder",verifyToken,createOrder);
router.get("/getAllOrders",getAllOrders)



export default router;