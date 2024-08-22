import express from "express";
import cors  from "cors";
import userRouter from "./routes/userRouter"
import dotenv from "dotenv";
dotenv.config();




const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/v1/user",userRouter)

const port=process.env.PORT||3005


app.listen(port,()=>{
    console.log(`Server runing port on ${port}`);
})