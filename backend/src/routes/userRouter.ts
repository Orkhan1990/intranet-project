import express from "express";
import { createUser, getOfficeWorkers, getWorkers } from "../controllers/userController";



const router=express.Router();


router.post("/createUser",createUser)
router.get('/getWorkers',getWorkers)
router.get('/getOfficeWorkers',getOfficeWorkers);




export default router;