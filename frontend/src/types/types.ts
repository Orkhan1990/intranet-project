export interface ClientType{
    id:number,
     companyName:string,
     companyRepresentative:string,
     phoneNumber:string,
     email:string,
     address:string,
     requisite:string,
     voen:string,
     contractNumber:string,
     contractDate:string,
     approver:string,
     oneCCode:string,
     type:string,
     typeOfStatus:string,
     av:number,
     partsDiscount:number,
  }


  export interface NewCardInitialValues  {
    clientId:number,
    type: string,
    manufactured:string,
    model:string,
    sassi:string,
    carNumber:string,
    produceDate: string,
    km: string,
    qostNumber:string,
    paymentType: string,
    nds: boolean,
    repairAgain: boolean,
    servisInfo: boolean,
    comments:string,
    recommendation: string,
    problems: [
      {
        description: string,
        serviceWorkers:string[],
      },
    ],
    jobs: [
      {
        code: string,
        name: string,
        av:number,
        price: number,
        discount: number,
        oil:string,
        jobWorkers:[{ workerAv: string, workerId: string }],
      },
    ],
    expences: [
      {
        description: string,
        price: number,
      },
    ]

  };