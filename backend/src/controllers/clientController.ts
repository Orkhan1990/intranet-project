import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../data-source";
import { Client } from "../entites/Client";
import { User } from "../entites/User";
import { CustomRequest } from "../middleware/verifyToken";

export const createClient = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      companyName,
      companyRepresentative,
      phoneNumber,
      email,
      address,
      requisite,
      voen,
      contractNumber,
      contractDate,
      approver,
      oneCCode,
      type,
      typeOfStatus,
      av,
      partsDiscount,
    } = req.body;
   const userId=req.userId;
    

    const clientRepository=AppDataSource.getRepository(Client);
    const userRepository=AppDataSource.getRepository(User);
    const existClient=await clientRepository.findOneBy({companyName});
    const user=await userRepository.findOneBy({})

    if(existClient){
        next(errorHandler(401,"Şirkət artıq mövcuddur!"));
        return;
    }
   
    const newClient=new Client();
    newClient.companyName=companyName;
    newClient.companyRepresentative=companyRepresentative;
    newClient.phoneNumber=phoneNumber;
    newClient.email=email;
    newClient.address=address;
    newClient.requisite=requisite;
    newClient.voen=voen;
    newClient.contractNumber=contractNumber;
    newClient.contractDate=contractDate;
    newClient.approver=approver;
    newClient.oneCCode=oneCCode;
    newClient.type=type;
    newClient.typeOfStatus=typeOfStatus;
    newClient.av=av;
    newClient.partsDiscount=partsDiscount;
    

  } catch (error) {
    next(errorHandler(401, error.message));
  }
};
