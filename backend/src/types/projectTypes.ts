import { OrderStage, OrderStatus } from "../enums/allEnums";

export interface UserInterface {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ClientInterface{
    companyName:string;
   companyRepresentative:string;
   phoneNumber:string;
   email:string;
   address:string;
   requisite:string;
   voen:string;
   contractNumber:string;
   contractDate:string;
   approver:string;
   oneCCode:string;
   type:string;
   typeOfStatus:string;
   av:number;
   partsDiscount:number;
}

export interface OrderPartInterface{
    origCode:string;
    count:number;
    partName:string;
}

export interface OrderInterface {
  project: string;
  cardNumber: string;
  orderType: string;
  manufacturer: string;
  model:string;
  chassisNumber: string;
  engineNumber: string;
  produceYear: string;
  km: string;
  vehicleNumber: string;
  paymentType: string;
  delivering: string;
  deliveringType: string;
  initialPayment: string;
  comment: string;
  status:OrderStatus,
  stage:OrderStage,
  oil: boolean;
  clientId:number;
  userId:number,
  orderParts: OrderPartInterface[];
}


export interface SupplierOrderPartInterface {
  origCode: string;
  count: number;
  partName:string;
  price: number;
  totalPrice:number;
  sipPrice: number;
  percent:number;
  profit:number;
  sellPrice:number;
  stockQuantity:number;
  transport:number;
  unitSellPrice:number;
  unitSipPrice:number;
  delivering: string;
  date: string;
}


