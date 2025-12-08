


import express from "express";
import { createClient, discountClient, getClient, getClients, updateClient } from "../controllers/clientController";
import verifyToken from "../middleware/verifyToken";
import { addToCard, createCard, filterCards, getCardDetails } from "../controllers/cardController";






const router=express.Router();

router.post("/addToCard",addToCard);
router.post("/createCard",verifyToken,createCard);
router.post("/filterCards",filterCards); 
router.get("/getCardDetails/:id",getCardDetails);    








export default router;

