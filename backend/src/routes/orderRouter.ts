import express from "express";
import {checkInStock,confirmOrder,createOrder, deleteOrderParts, getAllOrderParts, getAllOrders, getOrder, rejectOrder, updateOrder, updateOrderParts } from "../controllers/orderController";
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
router.post("/checkInStock",checkInStock);
router.get("/getAllOrderParts",getAllOrderParts);



export default router;