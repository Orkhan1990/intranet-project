import express from "express";
import { createClient } from "../controllers/clientController";
import verifyToken from "../middleware/verifyToken";






const router=express.Router();



router.post('/createClient',verifyToken,createClient )







export default router;