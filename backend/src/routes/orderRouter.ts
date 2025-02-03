import express from "express";
import {acceptOrder, calculationStepPass, checkInStock,confirmOrder,createOrder, deleteOrderParts, getAllOrderParts, getAllOrders, getOrder, rejectOrder, responsibleOrder, sendToSupplier, startResponsibleOrder, updateOrder, updateOrderParts } from "../controllers/orderController";
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
router.post("/acceptOrder/:id",verifyToken,acceptOrder);
router.post("/responsibleOrder/:id",verifyToken,responsibleOrder);
router.post("/startResponsibleOrder/:id",verifyToken,startResponsibleOrder);
router.post("/sendToSupplier/:id",verifyToken,sendToSupplier);
router.post("/calculationStepPass/:id",verifyToken,calculationStepPass);



export default router;