
 export class CustomError extends Error{
    statusCode:number
 }
 const errorHandler=(statusCode:number,message:string)=>{

  const error=new CustomError();
  error.statusCode=statusCode;
  error.message=message;
  return error;
}


export default errorHandler;