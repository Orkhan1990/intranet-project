import express from "express";
import {checkInStock,confirmOrder,createOrder, deleteOrderParts, getAllOrders, getOrder, rejectOrder, updateOrder, updateOrderParts } from "../controllers/orderController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();

router.post("/createOrder",verifyToken,createOrder);
router.get("/getAllOrders",getAllOrders);
router.get("/getOrder/:id",getOrder);
router.post("/updateOrder/:id",verifyToken,updateOrder);
router.post("/confirmOrder/:id",verifyToken,confirmOrder);
router.post("/updateOrderParts/:id",updateOrderParts);
router.post("/rejectOrder/:id",verifyToken,rejectOrder)
router.delete("/deleteOrderParts/:id",deleteOrderParts);
router.get("/checkInStock",checkInStock);



export default router;