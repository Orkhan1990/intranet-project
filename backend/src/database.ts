import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entites/User"
import dotenv from "dotenv";
import { Client } from "./entites/Client";
import { NewCard } from "./entites/NewCard";
import { NewCardProblems } from "./entites/NewCardProblems";
import { NewCardJobs } from "./entites/NewCardJobs";
import { NewCardJobsWorker } from "./entites/NewCardJobWorkers";
dotenv.config();


const{DATABASE,DATABASE_HOST,DATABASE_PORT,DATABASE_USERNAME,DATABASE_PASSWORD}=process.env;
export const AppDataSource = new DataSource({
    type: "mysql",
    host:DATABASE_HOST,
    port:+DATABASE_PORT,
    username:DATABASE_USERNAME,
    password:DATABASE_PASSWORD,
    database:DATABASE,
    entities: [User,Client,NewCard,NewCardProblems,NewCardJobs,NewCardJobsWorker],
    synchronize: false,
    migrations: [__dirname + "src/migration/*.{js,ts}"],

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