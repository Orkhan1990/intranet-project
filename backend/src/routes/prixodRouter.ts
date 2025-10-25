import express from "express";
import {createPrixod , getPrixodById, getPrixods } from "../controllers/prixodController";
import verifyToken from "../middleware/verifyToken";


const router=express.Router();


router.post("/createPrixod",verifyToken,createPrixod);
router.get("/getPrixods",getPrixods)
router.get("/getPrixodById/:id",getPrixodById);





export default router;