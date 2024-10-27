import { Liquidity, Market, PayType } from "./enums/projectEnums";

export interface UserInterface{
  id:number,
  userName:string,
  email:string,
  password:string,
  lastName:string,
  firstName:string
}



export interface ClientInterface {
    id:number
    companyName: string;
    companyRepresentative: string;
    phoneNumber: string;
    email: string;
    address: string;
    requisite: string;
    voen: string;
    contractNumber: string;
    contractDate: string;
    approver: string;
    oneCCode: string;
    type: string;
    typeOfStatus: string;
    av: number;
    partsDiscount: number;
  }


  export interface NewCardProblemsInterface{
    description:string,
    serviceWorkers:string[]
  }

  export interface JobWorkersInterface{
    workerAv:string,
    workerId:number
  }

  export interface NewCardJobsInterface{
    code: string;
    name: string;
    av: number;
    price: number;
    discount: number;
    oil: string;
    jobWorkers:JobWorkersInterface[];

  }

  export interface  NewCardExpencesInterface{
    description:string,
    price:number,
  }


  export interface NewCardInterface{
    clientId:number,
    type:string,
    manufactured:string,
    model:string,
    sassi:string,
    carNumber:string,
    produceDate:string,
    km:string,
    qostNumber:string,
    paymentType:string,
    nds:boolean,
    repairAgain:boolean,
    servisInfo:boolean,
    comments:string,
    recommendation:string,
    problems: NewCardProblemsInterface[],
    jobs:NewCardJobsInterface[],
    expences:NewCardExpencesInterface[]
  }



  export interface PartsInterface{
    kod:string,
    origKod:string,
    nameParts:string,
    brand:number,
    liquidity:Liquidity,
    count:number,
    price:number,
    salesPrice:number,
  }

  export interface WarehouseInterface{
    requestId:number,
    supplierId:number,
    invoice:string,
    market:Market,
    paymentType:PayType
    comment:string,
    parts:PartsInterface[]
    message:string
  }