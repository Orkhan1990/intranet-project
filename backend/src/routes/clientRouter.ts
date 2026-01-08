import express from "express";
import { createClient, discountClient, getClient, getClientCars, getClients, updateClient } from "../controllers/clientController";
import verifyToken from "../middleware/verifyToken";






const router=express.Router();



router.get('/getClients',getClients);
router.get('/getClient/:id',getClient);
router.post('/createClient',verifyToken,createClient );
router.post('/discountClient/:id',discountClient);
router.post('/updateClient/:id',updateClient);
router.get('/getClientCars/:id',getClientCars)







export default router;