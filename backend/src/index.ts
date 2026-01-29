import { CustomError } from "./middleware/errorHandler";
import express, { Response, Request, NextFunction } from "express";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import clientRouter from "./routes/clientRouter";
import supplierRouter from "./routes/supplierRouter";
import brandRouter from "./routes/brandRouter";
import prixodRouter from "./routes/prixodRouter";
import sparePartRouter from "./routes/sparePartRouter";
import priceListRouter from "./routes/priceListRouter";
import orderRouter from "./routes/orderRouter";
import orderPartRouter from "./routes/orderPartRouter";
import employeeFeeRouter from "./routes/employeeFeeRouter";
import cardRouter from "./routes/cardRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use("/api/v1", [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
]);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/prixod", prixodRouter);
app.use("/api/v1/sparePart", sparePartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/orderPart", orderPartRouter);
app.use("/api/v1/priceList", priceListRouter);
app.use("/api/v1/card",cardRouter);
app.use("/api/v1/employeeFee",employeeFeeRouter);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const success = false;
    const statusCode = typeof error.statusCode === "number" ? error.statusCode : 500; // default 500
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({
      success,
      message,
      statusCode,
    });
  }
);

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server runing port on ${port}`);
});
