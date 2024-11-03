import express from "express";
import { getBrands } from "../controllers/brandController";



const router=express.Router();



router.get("/getBrands",getBrands)




export default router;