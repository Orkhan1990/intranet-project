import { ErrorRequestHandler, NextFunction, Request, Response } from "express";



export class CustomError extends Error{
   public statusCode:number;

   constructor(statusCode:number,message:string){
       super(message);
       this.statusCode=statusCode
       Object.setPrototypeOf(this,CustomError.prototype);
   }

}

 const errorHandler=(statusCode:number,message:string)=>{
  

    const error=new CustomError(statusCode,message)
     return error;
}

export default errorHandler;