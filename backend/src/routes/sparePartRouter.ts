import express from "express";
import { getSpareParts } from "../controllers/sparePartController";


const router=express.Router();

router.get("/getAllSpareParts",getSpareParts);


export default router;