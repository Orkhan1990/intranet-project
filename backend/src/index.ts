import {CustomError} from "./middleware/errorHandler";
import express,{Response,Request, NextFunction} from "express";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import clientRouter from "./routes/clientRouter";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors  from "cors";
dotenv.config();




const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/client",clientRouter)


 


app.use((error:CustomError,req:Request,res:Response,next:NextFunction)=>{
  const success=false;
  const statusCode=error.statusCode;
  const message=error.message;
  res.status(statusCode).json({
    success,
    message,
    statusCode
  })
})

const port=process.env.PORT||3005


app.listen(port,()=>{
    console.log(`Server runing port on ${port}`);
})