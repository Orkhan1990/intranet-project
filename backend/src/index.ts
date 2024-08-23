import express,{Response,Request} from "express";
import cors  from "cors";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";
import { CustomError } from "./utilities/errorHandler";
dotenv.config();




const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth",authRouter)

app.use((error:CustomError,req:Request,res:Response)=>{
    const statusCode=error.statusCode||500;
    const message=error.message||"Internal server error";
    res.status(statusCode).json({
        success:"false",
        statusCode,
        message
    })
})

const port=process.env.PORT||3005


app.listen(port,()=>{
    console.log(`Server runing port on ${port}`);
})