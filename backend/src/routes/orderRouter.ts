import express from "express";
import { acceptOrder,checkInStock,createOrder, deleteOrderParts, getAllOrders, getOrder, updateOrder, updateOrderParts } from "../controllers/orderController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();

router.post("/createOrder",verifyToken,createOrder);
router.get("/getAllOrders",getAllOrders);
router.get("/getOrder/:id",getOrder);
router.post("/updateOrder/:id",verifyToken,updateOrder);
router.post("/acceptOrder/:id",verifyToken,acceptOrder);
router.post("/updateOrderParts/:id",updateOrderParts);
router.delete("/deleteOrderParts/:id",deleteOrderParts);
router.get("/checkInStock",checkInStock);



export default router;