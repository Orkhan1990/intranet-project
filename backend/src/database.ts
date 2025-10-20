import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entites/User"
import dotenv from "dotenv";
import { Client } from "./entites/Client";
import { Card} from "./entites/Card";
import { CardProblem } from "./entites/CardProblem";
import { CardJob} from "./entites/CardJob";
import { CardWorkerJob} from "./entites/CardWorkerJob";
import { Supplier } from "./entites/Supplier";
import { Brand } from "./entites/Brand";
import { SparePart} from "./entites/SparePart";
import { Order } from "./entites/Order";
import { OrderPart } from "./entites/OrderPart";
import { OrderHistory } from "./entites/OrderHistory";
import { SupplierOrderHistory } from "./entites/SuppliersOrderHistory";
import { SupplierOrderParts } from "./entites/SupplierOrderParts";
import { PriceList } from "./entites/PriceList";
import { PriceListHist } from "./entites/PriceListHist";
import { Rabatgrup } from "./entites/Rabatgrup";
import { Invoice} from "./entites/Invoice";
dotenv.config();


const{DATABASE,DATABASE_HOST,DATABASE_PORT,DATABASE_USERNAME,DATABASE_PASSWORD}=process.env;
export const AppDataSource = new DataSource({
    type: "mysql",
    host:DATABASE_HOST,
    port:+DATABASE_PORT,
    username:DATABASE_USERNAME,
    password:DATABASE_PASSWORD,
    database:DATABASE,
    entities: [User,Client,Card,CardProblem,CardJob,CardWorkerJob,Supplier,Brand,Invoice,SparePart,Order,OrderPart,OrderHistory,SupplierOrderHistory,SupplierOrderParts,PriceList,PriceListHist,Rabatgrup],
    synchronize: false,
    migrations: ["./src/migrations/**/*.ts"],

})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
.then(() => {
    console.log("Database connected successfuly!"); 
})
.catch((error) =>{
  console.log(error);
  
})