import { AppDataSource } from "../data-source";
import { User } from "../entites/User";
import { Response, Request } from "express";
import bcrypt from "bcrypt";

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
