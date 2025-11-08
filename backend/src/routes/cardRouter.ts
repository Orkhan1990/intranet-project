


import express from "express";
import { createClient, discountClient, getClient, getClients, updateClient } from "../controllers/clientController";
import verifyToken from "../middleware/verifyToken";
import { addToCard } from "../controllers/cardController";






const router=express.Router();

router.post("/addToCard",addToCard)







export default router;

