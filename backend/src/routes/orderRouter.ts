import express from "express";
import { confirmOrder, createOrder, getAllOrders, getOrder, uploadExcelFile } from "../controllers/orderController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();

router.post("/createOrder",verifyToken,createOrder);
router.get("/getAllOrders",getAllOrders);
router.get("/getOrder/:id",getOrder);
router.post("/confirmOrder/:id",verifyToken,confirmOrder);
router.post("/uploadExcelFile",uploadExcelFile);



export default router;