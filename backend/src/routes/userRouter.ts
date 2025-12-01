import express from "express";
import { createUser, getAllUsers, getOfficeWorkers, getReceptionWorkers, getWorkers } from "../controllers/userController";



const router=express.Router();


router.post("/createUser",createUser)
router.get('/getWorkers',getWorkers)
router.get('/getOfficeWorkers',getOfficeWorkers);
router.get('/getReceptionWorkers',getReceptionWorkers);
router.get('/getAllUsers',getAllUsers);




export default router;