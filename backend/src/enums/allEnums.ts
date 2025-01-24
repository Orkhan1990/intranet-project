


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
    DirectorAccept="directorAccept",
    ResponsibleUserBegin="responsibleUserBegin",
    CalculationBegin="calculationBegin",
    CalculationAccept="calculationAccept",
    CalculationEnd="calculationEnd",
    RequestSupplier="requestSupplier",
    ProcessingSupplier="processingSupplier",
    AccountantAccept="accountantAccept",  
    ClientConfirm="clientConfirm",
    Reject="reject"
  }