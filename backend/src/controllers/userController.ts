import { AppDataSource } from "../database";
import { User } from "../entites/User";
import { Response, Request, NextFunction } from "express";
import bcrypt from "bcrypt";
import errorHandler from "../middleware/errorHandler";
import { UserRole } from "../enums/userRole";
import { In } from "typeorm";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
   const existUser=await userRepository.findOneBy({ email});
   console.log(existUser);
   

   if(existUser){
     res.status(401).json({message:"User already exist"})
     return;
   }
   const hashPassword=bcrypt.hashSync(password,10)
    const user = new User();
    user.userName = userName;
    user.email = email;
    user.password = hashPassword;

    await userRepository.save(user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};


export const getWorkers=async(req:Request,res:Response,next:NextFunction)=>{
  try {

    const userRepository=AppDataSource.getRepository(User);

    const serviceWorkers=await userRepository.find({
      where:{
        userRole:UserRole.ServiceUser
      }
    })

    if(!serviceWorkers){
      next(errorHandler(401,"Servis işçiləri mövcud deyil!"));
      return;
    }

    res.status(201).json(serviceWorkers);

    
  } catch (error) {
    next(errorHandler(401,error))
  }
}



export const getOfficeWorkers=async(req:Request,res:Response,next:NextFunction)=>{
  try {

    const userRepository=AppDataSource.getRepository(User);

    const officeWorkers=await userRepository.find({
      where:{
        userRole:In([UserRole.Admin,UserRole.OfficeUser])
      }
    })
     
    if(!officeWorkers){
      next(errorHandler(401,"Ofis işçiləri mövcud deyil!"));
      return;
    }

    res.status(201).json(officeWorkers);

    
  } catch (error) {
    next(errorHandler(401,error))
  }
}
