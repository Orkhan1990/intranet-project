import { Order } from './../entites/Order';



export enum OrderStatus{
    Open="open",
    Close="close"
  }
  
  
  
  export enum OrderStage{
    Created="created",
    WarehouseConfirm="warehouseConfirm",
    ResponsibleUser="responsibleUser",
    RequestToSupplier="requestToSupplier",
    ResponseFromSupplier="responseFromSupplier",
    GiveTheOrder="giveTheOrder",
    AccountingApproval="accounting_Approval",
    Payment="payment",
    Finish="finish"
  }


  export enum OrderStep{
    OrderConfirm="orderConfirm",
    OrderAccept="orderAccept",
    ResposibleFromOrder="responsibleFromOrder",
    ResponsibleUserBegin="responsibleUserBegin",
    RequsetToSupplier="requestToSupplier",
    ResponseFromSupplier="responseFromSupplier",
    CalculationBegin="calculationBegin",
    CalculationAccept="calculationAccept",
    ChoosingBestSupplier="choosingBestSupplier",
    RequestSupplier="requestSupplier",
    ProcessingSupplier="processingSupplier",
    AccountantAccept="accountantAccept",  
    ClientConfirm="clientConfirm",
    Reject="reject",
    DirectorAccept="directorAccept"
  }

  export enum Type{
    Sachs1="sachs1",
    Sachs2="sachs2",
    Lemfer="lemfer",
    Knor="knor",
    Dt="dt",
    Hengs="hengs",
    Man="man"
  }

  export enum PrixodLevel{
    PrixodConfirm="prixodConfirm",
    PrixodAccept="prixodAccept",
    PrixodComplete="prixodComplete"
  }