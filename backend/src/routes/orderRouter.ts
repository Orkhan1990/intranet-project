import express from "express";
import { confirmOrder, createOrder, deleteOrderParts, getAllOrders, getOrder, updateOrder, updateOrderParts } from "../controllers/orderController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();

router.post("/createOrder",verifyToken,createOrder);
router.get("/getAllOrders",getAllOrders);
router.get("/getOrder/:id",getOrder);
router.post("/updateOrder/:id",verifyToken,updateOrder);
router.post("/confirmOrder/:id",verifyToken,confirmOrder);
router.post("/updateOrderParts/:id",updateOrderParts);
router.delete("/deleteOrderParts/:id",deleteOrderParts)



export default router;