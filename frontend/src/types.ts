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
  isReception: boolean;
  isWorker: boolean;
  percent: number;
  userRole: string;
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
  workers: JobWorkersInterface[];
}

export interface NewCardExpencesInterface {
  description: string;
  price: string;
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
  cardProblems: NewCardProblemsInterface[];
  cardJobs: NewCardJobsInterface[];
  expences: NewCardExpencesInterface[];
   cardParts: [{
      code: "",
      partName: "",
      count: 0,
      soldPrice: 0,
      discount: 0,
      totalPrice: 0
    }],
}

export interface UpdateCardInterface {
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
  isOpen:boolean;
  openDate: string | null;
  closeDate: string | null;
  recommendation: string;
  cardProblems: {
    description: string;
    serviceWorkers: any[];
  }[];
  cardJobs: any[];
  expences: any[];
  cardParts: any[];
  account:any;
  repair:any
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
  barcode: string;
}

export interface WarehouseInterface {
  orderId: number;
  supplierId: number;
  invoice: string;
  market: Market;
  paymentType: PayType;
  comment: string;
  parts: PartsInterface[];
  message: string;
}

export interface OrderPartsInterface {
  id: number;
  origCode: string;
  count: number;
  checkOnWarehouse: boolean;
  stockQuantity: number;
  partName: string;
  price: number;
  totalPrice: number;
  transport: number;
  sipPrice: number;
  unitSipPrice: number;
  percent: number;
  profit: number;
  sellPrice: number;
  unitSellPrice: number;
  delivering: string;
  nettoByUnit: string;
  totalNetto: string;
  transportMan: string;
  cipPrice: string;
  tax: string;
  accessoryCost: string;
  declaration: string;
  ddpPrice: string;
  unitDdpPrice: string;
  percentage: string;
  sellPriceClientStock: string;
  rabatgrupInd: number;
  totalSellPriceClientOrdered: string;
  sellPriceUnitWhichInStock: string;
  reserved: string;
  totalSellPriceWhichInStock: string;
  totalSellPriceOrderedWhichInStock: string;
  priceExwNoDiscount: string;
  totalPriceMan: string;
  priceWithoutPacking: string;
  packing: string;
  accessoryCostValue: number;
  declarationValue: number;
  totalPriceManValue: number;
  transportValue: number;
  transportManValue: number;
  percentageValue: number;
  taxValue: number;
  priceExw: number;
}

export interface OrderInterface {
  id: number;
  project: string;
  cardNumber: string;
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
  orderParts: OrderPartsInterface[];
}

export interface ResponsibleUserInterface {
  id: number;
  userName: string;
  email: string;
  lastName: string;
  firstName: string;
}

export interface OrderHistoryInterface {
  id: number;
  step: string;
  confirm: boolean;
  showHide: boolean;
  showResult: boolean;
  message: string;
  reject: string;
  file: string;
  date: Date;
  user: ResponsibleUserInterface;
  supplierOrderHistories: SupplierOrderHistoriesInterface[];
}

export interface SupplierOrderHistoriesInterface {
  id: number;
  date: Date;
  file: string;
  supplier: {
    id: number;
    contactPerson: string;
    country: string;
    supplier: string;
    email: string;
  };
}

export interface EditOrderInterface {
  id: number;
  project: string;
  cardNumber: string;
  orderType: string;
  client: ClientInterface;
  manufacturer: string;
  model: string;
  chassisNumber: string;
  engineNumber: string;
  produceYear: string;
  km: string;
  vehicleNumber: string;
  confirm: boolean;
  accept: boolean;
  acceptMessage: string;
  rejectMessage: string;
  confirmDate: Date;
  paymentType: PayType;
  isExcellFile: boolean;
  isResponsible: boolean;
  isFinishCalculation: boolean;
  responsibleDate: Date;
  delivering: DeliverType;
  deliveringType: string;
  initialPayment: number;
  responsibleUser: UserInterface;
  comment: string;
  oil: boolean;
  orderParts: OrderPartsInterface[];
  orderHistory: OrderHistoryInterface[];
}

export interface SupplierInterface {
  id: number;
  supplier: string;
  country: string;
  contactPerson: string;
  phone: string;
  email: string;
  paymentType: string;
  deliverType: string;
  deliverPeriod: string;
  creditLine: string;
  creditNote: string;
  creditDuration: string;
}

export interface BrandInterface {
  id: number;
  name: string;
}

export interface StockInfoInterface {
  origCode: string;
  inStock: boolean;
  inStockQuantity: number;
  requiredQuantity: number;
}

export interface MergDataInterface {
  origCode: string;
  requiredQuantity: number;
  inStockQuantity: number;
  inStock: boolean;
  partName: string;
  count: number;
  isStockAvailable: boolean;
}

export interface SupplierOrderPartsInterface {
  supplier: {
    id: number;
    supplier: string;
    country: string;
  };
  orderPart: OrderPartsInterface;
  date: Date;
  origCode: string;
  count: number;
  isTheBestSupplier: boolean;
  delivering: string;
  price: string;
  totalPrice: string;
  transport: string;
  sipPrice: string;
  unitSipPrice: string;
  percent: string;
  profit: string;
  sellPrice: string;
  unitSellPrice: string;
  stockQuantity: string;
  partName: string;
}

export interface PriceListHistInterface {
  name: string;
  nameDe: string;
  price: number;
  quantity: number;
  year: string;
  month: string;
  kod: string;
  origKod: string;
  type: Type;
  rabatgrup: number;
}

export interface PrixodInterface {
  id: number;
  order: OrderInterface;
  invoice: string;
  market: string;
  paymentType: string;
  comment: string;
  message: string;
  confirm: boolean;
  confirmDate: Date;
  accept: boolean;
  acceptDate: Date;
  createdAt: Date;
  isConfirmed: boolean;
}

export interface SparePartInterface {
  code: string;
  origCode: string;
  name: string;
  liquidity: string;
  count: number;
  price: number;
  sellPrice: number;
  barcode: string;
  row: string;
  column: string;
  brand: BrandInterface;
}

export interface PrixodHistInterface {
  level: string;
  confirm: boolean;
  message: string;
  confirmDate: Date;
  accept: boolean;
  acceptDate: Date;
  reject: string;
  date: Date;
  file: string;
  user:UserInterface
}

export interface EditPrixodInterface {
  order: OrderInterface;
  supplier: SupplierInterface;
  invoice: string;
  market: Market;
  paymentType: PayType;
  confirm: boolean;
  confirmDate: Date;
  accept: boolean;
  acceptDate: Date;
  comment: string;
  message?: string;
  createdAt: Date;
  spareParts: SparePartInterface[];
  prixodHist: PrixodHistInterface[];
}


export interface ClientCar {
  model: string;
  type: string;
  manufactured: string;
  km: number;
  carNumber: string;
  produceDate: string;
  sassi:string;
  qostNumber:string;
}