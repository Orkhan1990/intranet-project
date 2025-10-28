import express from "express";
import {confirmLastPrixod, confirmPrixod, createPrixod , getPrixodById, getPrixods, rejectPrixod, updatePrixod, writeMessage } from "../controllers/prixodController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createPrixod",verifyToken,createPrixod);
router.get("/getPrixods",getPrixods)
router.get("/getPrixodById/:id",getPrixodById);
router.put("/updatePrixod/:id",verifyToken,updatePrixod);
router.put("/writeMessage/:id",verifyToken,writeMessage);
router.put("/confirmPrixod/:id",verifyToken,confirmPrixod);
router.put("/confirmLastPrixod/:id",verifyToken,confirmLastPrixod);
router.put("/rejectPrixod/:id",verifyToken,rejectPrixod);




export default router;