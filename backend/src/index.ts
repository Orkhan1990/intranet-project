import {CustomError} from "./middleware/errorHandler";
import express,{Response,Request, NextFunction} from "express";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors  from "cors";
import { AppDataSource } from "./data-source";
dotenv.config();




const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth",authRouter)

  AppDataSource.initialize()
  .then(() => {
      console.log("Database connected successfuly!"); 
  })
  .catch((error) =>{
    console.log(error);
    
    app.use((req:Request,res:Response,next:NextFunction)=>{ 
      next(error)
    })
  })



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