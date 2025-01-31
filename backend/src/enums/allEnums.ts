import { Order } from './../entites/Order';



export enum OrderStatus{
    Open="open",
    Close="close"
  }
  
  
  
  export enum OrderStage{
    Created="created",
    WarehouseConfirm="warehouseConfirm",
    OrderResponsibility="orderresposibility",
    ResponsibleUser="responsibleUser",
    Investigation="investigation",
    Calculation="calculation",
    Finish="finish"
  }


  export enum OrderStep{
    OrderConfirm="orderConfirm",
    OrderAccept="orderAccept",
    ResposibleFromOrder="responsibleFromOrder",
    ResponsibleUserBegin="responsibleUserBegin",
    RequsetToSupplier="requestToSupplier",
    DirectorAccept="directorAccept",
    CalculationBegin="calculationBegin",
    CalculationAccept="calculationAccept",
    CalculationEnd="calculationEnd",
    RequestSupplier="requestSupplier",
    ProcessingSupplier="processingSupplier",
    AccountantAccept="accountantAccept",  
    ClientConfirm="clientConfirm",
    Reject="reject"
  }