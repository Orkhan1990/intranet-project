import express from "express";
import { createUser, getWorkers } from "../controllers/userController";



const router=express.Router();


router.post("/createUser",createUser)
router.get('/getWorkers',getWorkers)




export default router;