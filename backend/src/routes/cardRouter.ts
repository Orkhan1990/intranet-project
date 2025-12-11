


import express from "express";
import verifyToken from "../middleware/verifyToken";
import { addToCard, createCard, filterCards, getCardDetails, updateCard } from "../controllers/cardController";






const router=express.Router();

router.post("/addToCard",addToCard);
router.post("/createCard",verifyToken,createCard);
router.post("/filterCards",filterCards); 
router.get("/getCardDetails/:id",getCardDetails);   
router.post("/updateCard/:id",verifyToken,updateCard); 








export default router;

