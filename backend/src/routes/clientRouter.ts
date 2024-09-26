import express from "express";
import { createClient, discountClient, getClients } from "../controllers/clientController";
import verifyToken from "../middleware/verifyToken";






const router=express.Router();



router.post('/createClient',verifyToken,createClient );
router.get('/getClients',getClients);
router.get('/discountClient/:id',discountClient);







export default router;