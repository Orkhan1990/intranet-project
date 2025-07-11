import {
  DeliverType,
  Liquidity,
  Market,
  OrderType,
  PayType,
  Type,
} from "./enums/projectEnums";

export interface UserInterface {
  id: number;
  userName: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export interface ClientInterface {
  id: number;
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

export interface NewCardProblemsInterface {
  description: string;
  serviceWorkers: string[];
}

export interface JobWorkersInterface {
  workerAv: string;
  workerId: number;
}

export interface NewCardJobsInterface {
  code: string;
  name: string;
  av: number;
  price: number;
  discount: number;
  oil: string;
  jobWorkers: JobWorkersInterface[];
}

export interface NewCardExpencesInterface {
  description: string;
  price: number;
}

export interface NewCardInterface {
  clientId: number;
  type: string;
  manufactured: string;
  model: string;
  sassi: string;
  carNumber: string;
  produceDate: string;
  km: string;
  qostNumber: string;
  paymentType: string;
  nds: boolean;
  repairAgain: boolean;
  servisInfo: boolean;
  comments: string;
  recommendation: string;
  problems: NewCardProblemsInterface[];
  jobs: NewCardJobsInterface[];
  expences: NewCardExpencesInterface[];
}

export interface PartsInterface {
  kod: string;
  origKod: string;
  nameParts: string;
  brand: number;
  liquidity: Liquidity;
  count: number;
  price: number;
  salesPrice: number;
  barcode:string
}

export interface WarehouseInterface {
  requestId: number;
  supplierId: number;
  invoice: string;
  market: Market;
  paymentType: PayType;
  comment: string;
  parts: PartsInterface[];
  message: string;
}

export interface OrderPartsInterface {
  id:number,
  origCode: string;
  count: number;
  checkOnWarehouse: boolean;
  stockQuantity: number;
  partName: string;
  price:number,
  totalPrice:number,
  transport:number,
  sipPrice:number,
  unitSipPrice:number,
  percent:number,
  profit:number,
  sellPrice:number,
  unitSellPrice:number,
  delivering:string;
}

export interface OrderInterface {
  id:number,
  project: string;
  cardNumber:string;
  orderType: OrderType;
  clientId: number;
  manufacturer: string;
  model: string;
  chassisNumber: string;
  engineNumber: string;
  produceYear: string;
  km: string;
  vehicleNumber: string;
  paymentType: PayType;
  delivering: DeliverType;
  deliveringType: string;
  initialPayment: number;
  comment: string;
  oil: boolean;
  orderParts:OrderPartsInterface[]
}

export interface ResponsibleUserInterface {
  id:number;
  userName:string;
  email:string;
  lastName:string;
  firstName:string;
}

export interface OrderHistoryInterface{
  id:number,
  step:string,
  confirm:boolean,
  showHide:boolean,
  showResult:boolean,
  message:string,
  reject:string,
  file:string,
  date:Date
  user:ResponsibleUserInterface,
  supplierOrderHistories:SupplierOrderHistoriesInterface[]

}

export interface SupplierOrderHistoriesInterface
  {
    id:number,
    date:Date,
    file:string,
    supplier:{
      id:number,
      contactPerson:string,
      country:string,
      supplier:string,
      email:string
    }
  }


export interface EditOrderInterface{
  id:number,
  project:string,
  cardNumber:string,
  orderType: string,
  client:ClientInterface,
  manufacturer:string,
  model:string,
  chassisNumber:string,
  engineNumber:string,
  produceYear:string,
  km:string,
  vehicleNumber:string,
  confirm:boolean,
  accept:boolean,
  acceptMessage:string,
  rejectMessage:string,
  confirmDate:Date,
  paymentType: PayType,
  isExcellFile:boolean,
  isResponsible:boolean,
  isFinishCalculation:boolean,
  responsibleDate:Date,
  delivering: DeliverType,
  deliveringType:string,
  initialPayment:number,
  responsibleUser:UserInterface,
  comment:string,
  oil:boolean,
  orderParts: OrderPartsInterface[];
  orderHistory:OrderHistoryInterface[]
}


export interface SupplierInterface{
  id:number,
  supplier:string,
  country:string,
  contactPerson:string,
  phone:string,
  email:string,
  paymentType:string,
  deliverType:string,
  deliverPeriod:string,
  creditLine:string,
  creditNote:string,
  creditDuration:string;
}



export interface BrandInterface{
  id:number,
  name:string
}


export interface StockInfoInterface{
  origCode: string;
  inStock: boolean;
  inStockQuantity: number;
  requiredQuantity: number;
}

export interface MergDataInterface{
  origCode:string,
  requiredQuantity:number,
  inStockQuantity:number,
  inStock:boolean,
  partName:string,
  count:number,
  isStockAvailable:boolean
}


export interface SupplierOrderPartsInterface {

    supplier:{
      id:number;
      supplier:string;
      country:string;
    };
    orderPart:OrderPartsInterface;
    date:Date;
    origCode:string;
    count:number;
    isTheBestSupplier:boolean;
    delivering: string;
    price:string;
    totalPrice:string;
    transport:string;
    sipPrice:string;
    unitSipPrice:string;
    percent:string;
    profit:string;
    sellPrice:string;
    unitSellPrice:string;
    stockQuantity:string;
    partName:string;
}



export interface PriceListHistInterface{
  name: string;
  nameDe: string;
  price: number;
  quantity: number;
  year:string;
  month: string;
  kod: string;
  origKod: string;
  type: Type;
  rabatgrup: number;
}