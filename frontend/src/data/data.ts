 export  interface SubItemsInterface{
    title:string,
    url:string
}


 export interface NavbarListInterface{
    title:string,
    subItems:SubItemsInterface[]
}

export const navbarList:NavbarListInterface[] = [
    {
      title: "Servis",
      subItems:[
          {
              title:"Yeni kart yarat",
              url:"/newCard"
          },
          {
              title:"Statistika",
              url:"/statistic"
          },
          {
              title:"Işçilərin faizi",
              url:"/employeePercent"
          },
          {
              title:"Işçilərin zəhmət haqqısı",
              url:"/employeeFee"
          },
          {
              title:"İşin effektivliyi",
              url:"/effectivWork"
          },
          {
              title:"Yeni servis melumatı",
              url:"/newServisInfo"
          },
          {
              title:"AV kataloq",
              url:"/avCatalog"
          }
      ]
    },
    {
      title: "Ehtiyyat hissələri",
      subItems:[
          {
              title:"Ehtiyyat hissəsi sifarişi",
              url:"/createOrder"
          },
          {
              title:"Sifarişlər",
              url:"/orders"
          },
          {
              title:"Anbara daxil etmek",
              url:"/importWarehouse"
          },
          {
              title:"Anbarı təsdiqləmək",
              url:"/submitWearhouse"
          },
          {
              title:"Təchizatçılar",
              url:"/suppliers"
          },
          {
              title:"Anbarın siyahısı",
              url:"/wareHouse"
          },
          {
              title:"Alətlər",
              url:"/tools"
          },
          {
              title:"Barkod məlumatları",
              url:"/barcode"
          }
      ]
    },
    {
      title: "Müştərilər",
      subItems:[
          {
              title:"Yeni müştəri yarat",
              url:"/newClient"
          },
          {
              title:"Müştərilərin siyahısı",
              url:"/clientList"
          },
          {
              title:"Müştərilərlə işləmək",
              url:"/worksClient"
          },
          {
              title:"Təmir-hesab",
              url:"/servisFee"
          }
      ]
    },
    {
      title: "Logistika",
      subItems:[
          {
              title:"Yeni kart yarat",
              url:"/newCard"
          },
          {
              title:"Statistika",
              url:"/statistic"
          },
          {
              title:"Işçilərin faizi",
              url:"/employeePercent"
          },
          {
              title:"Işçilərin zəhmət haqqısı",
              url:"/employeeFee"
          },
          {
              title:"İşin effektivliyi",
              url:"/effectivWork"
          },
          {
              title:"Yeni servis melumatı",
              url:"/newServisInfo"
          },
          {
              title:"AV kataloq",
              url:"/avCatalog"
          }
      ]
    },
  ];
  
  