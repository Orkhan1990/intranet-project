import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
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
    const userId = req.userId;
    console.log(req.body);
    //  console.log(req.userId);

    const clientRepository = AppDataSource.getRepository(Client);
    const userRepository = AppDataSource.getRepository(User);
    const existClient = await clientRepository.findOneBy({ companyName });
    const user = await userRepository.findOneBy({ id: userId });

    if (existClient) {
      next(errorHandler(401, "Şirkət artıq mövcuddur!"));
      return;
    }

    const newClient = new Client();
    newClient.companyName = companyName;
    newClient.companyRepresentative = companyRepresentative;
    newClient.phoneNumber = phoneNumber;
    newClient.email = email;
    newClient.address = address;
    newClient.requisite = requisite;
    newClient.voen = voen;
    newClient.contractNumber = contractNumber;
    newClient.contractDate = contractDate;
    newClient.approver = approver;
    newClient.oneCCode = oneCCode;
    newClient.type = type;
    newClient.typeOfStatus = typeOfStatus;
    newClient.av = av;
    newClient.partsDiscount = partsDiscount;
    newClient.userId = userId;
    newClient.user = user;

    await clientRepository.save(newClient);

    res.status(200).json(newClient);
  } catch (error) {
    next(errorHandler(401, error.message));
  }
};

export const getClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find();

    if (!clients) {
      next(errorHandler(401, "Müştərilər mövcud deyil!"));
      return;
    }

    res.status(201).json(clients);
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const discountClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const { av, partsDiscount } = req.body;
   
  
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ id });

    if (!client) {
      next(errorHandler(401, "Müştəri mövcud deyil!"));
      return;
    }

    client.av = av;
    client.partsDiscount=partsDiscount;
    await clientRepository.save(client);
    res.status(201).json(client);
  } catch (error) {
    next(errorHandler(401, error));
  }
};


export const getClient=async(req:Request,res:Response,next:NextFunction)=>{
  try {

    const id=Number(req.params.id);
    const clientRepository=AppDataSource.getRepository(Client);

    const client=await clientRepository.findOneBy({id});


    if(!client){
      next(errorHandler(401,"Müştəri mövcud deyil!"));
      return;
    }

    res.status(201).json(client);
    
  } catch (error) {
    next(errorHandler(401,error))
  }
}


export const updateClient=async(req:Request,res:Response,next:NextFunction)=>{
  try {

    const id=Number(req.params.id);
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

    const clientRepository=AppDataSource.getRepository(Client);

    const clientDataUpdate=await clientRepository.findOneBy({id});

    if(!clientDataUpdate){
      next(errorHandler(401,"Müştəri mövcud deyil!"))
    }

    
    clientDataUpdate.companyName = companyName;
    clientDataUpdate.companyRepresentative = companyRepresentative;
    clientDataUpdate.phoneNumber = phoneNumber;
    clientDataUpdate.email = email;
    clientDataUpdate.address = address;
    clientDataUpdate.requisite = requisite;
    clientDataUpdate.voen = voen;
    clientDataUpdate.contractNumber = contractNumber;
    clientDataUpdate.contractDate = contractDate;
    clientDataUpdate.approver = approver;
    clientDataUpdate.oneCCode = oneCCode;
    clientDataUpdate.type = type;
    clientDataUpdate.typeOfStatus = typeOfStatus;
    clientDataUpdate.av = av;
    clientDataUpdate.partsDiscount = partsDiscount;

    await clientRepository.save(clientDataUpdate);
    res.status(201).json(clientDataUpdate);
 
  } catch (error) {
    next(errorHandler(401,error))
  }
}