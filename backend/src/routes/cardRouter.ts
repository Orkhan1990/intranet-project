


import express from "express";
import verifyToken from "../middleware/verifyToken";
import { addToCard, closeCard, createAccountForCard, createCard, createRepairForCard, createWorkCatalog, filterCards, getCardDetails, getJobList, returnPart, updateCard } from "../controllers/cardController";
import { create } from "axios";






const router=express.Router();

router.post("/addToCard",addToCard);
router.post("/createCard",verifyToken,createCard);
router.post("/filterCards",filterCards); 
router.get("/getCardDetails/:id",getCardDetails);   
router.post("/updateCard/:id",verifyToken,updateCard); 
router.post("/returnPart",verifyToken,returnPart);
router.post("/createAccountForCard",verifyToken,createAccountForCard)
router.post("/createRepairForCard",verifyToken,createRepairForCard)
router.post("/closeCard",verifyToken,closeCard);
router.get("/getJobList",verifyToken,getJobList)
router.post("/createWorkCatalog",verifyToken,createWorkCatalog);








export default router;

