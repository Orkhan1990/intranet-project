import { NextFunction, Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entites/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorHandler from "../middleware/errorHandler";

export const signIn=async(req:Request,res:Response,next:NextFunction)=>{
    try {
           const{userName,password}=req.body;
           const userRepository = AppDataSource.getRepository(User);
           const existUser=await userRepository.findOneBy({userName});
           if(!existUser){
            next(errorHandler(401,"Belə bir istifadəçi yoxdur!"))
           }

           const isMatchPassword=bcrypt.compareSync(password,existUser.password);

           if(!isMatchPassword){
            next(errorHandler(401,"Şifrə uyğun deyil!"));
           }
  

           const {password:pass,...rest}=existUser;
           const token=jwt.sign({id:existUser.id},process.env.JWT_SECRET);
           res.cookie("access_token",token,{httpOnly:true});
           res.status(201).json(rest);

        
    } catch (error) {
       next(errorHandler(401,error)) 
    }
}



export const signUp=async(req:Request,res:Response,next:NextFunction)=>{
  
    try {
        const { userName, email, password } = req.body;
    
        const userRepository = AppDataSource.getRepository(User);
       const existUser= userRepository.createQueryBuilder("user").where("user.email=",{email}).orWhere("user.userName=",{userName});
       console.log(existUser);
       
      
        
       if(existUser){
        next(errorHandler(401,"Belə bir istifadəçi artıq mövcuddur!")) 
        return;
       }
       

     
    
        const hashPassword=bcrypt.hashSync(password,10)
        const user = new User();
        user.userName = userName;
        user.email = email;
        user.password = hashPassword;
          console.log(user);
          
        await userRepository.save(user);
    
        res.status(200).json(user);
       
      } catch (error) {
        console.log("salam");
        
        next(errorHandler(401,error)) 
      }
}