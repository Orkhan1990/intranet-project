import express from "express";
import {confirmPrixod, createPrixod , getPrixodById, getPrixods, updatePrixod, writeMessage } from "../controllers/prixodController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createPrixod",verifyToken,createPrixod);
router.get("/getPrixods",getPrixods)
router.get("/getPrixodById/:id",getPrixodById);
router.put("/updatePrixod/:id",verifyToken,updatePrixod);
router.put("/writeMessage/:id",verifyToken,writeMessage);
router.put("/confirmPrixod/:id",verifyToken,confirmPrixod);




export default router;