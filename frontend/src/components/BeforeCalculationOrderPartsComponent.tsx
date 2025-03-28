import { FieldArray } from "formik"
import OrderPartsComponent from "./OrderPartsComponent"
import { Button } from "flowbite-react"
import { EditOrderInterface } from "../types"



interface BeforeCalculationOrderPartsInterface{
    deletePart:(index:any)=>void,
    orderInitialValue:EditOrderInterface,
    checkInstock:(values:any)=>void,
    values:EditOrderInterface
}



export const BeforeCalculationOrderPartsComponent = ({deletePart,orderInitialValue,checkInstock,values}:BeforeCalculationOrderPartsInterface) => {



  return (
    <FieldArray name="orderParts">
                       {({ push }) => (
                         <div className="border text-sm  w-3/4 p-5 rounded-md ">
                           {/* {
                             defineDeliverType(orderInitialValue.orderParts[0].delivering) && (
                               <div className="text-end mb-5">
                                 {
                                   defineDeliverType(orderInitialValue.orderParts[0].delivering)
                                 }
                               </div>
                             )
                           } */}
                           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   
   
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                               <tr>
                                 <th scope="col" className="px-6 py-3">
                                   №
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                   Detalın nömrəsi
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                   Sayı
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                   Anbarda varmı
                                 </th>
                                 <th scope="col" className="px-6 py-3">
                                   Detalın adı
                                 </th>
                                 {
                                   orderInitialValue.orderParts[0].sellPrice && (
                                     <th scope="col" className="px-6 py-3">
                                       Qiymət
                                     </th>
                                   )
                                 }
                                 <th scope="col" className="px-6 py-3">
                                   #
                                 </th>
                               </tr>
                             </thead>
                             {values.orderParts?.map((_, index) => (
                               <OrderPartsComponent
                                 name={`orderParts[${index}]`}
                                 key={index}
                                 index={index}
                                 deletePart={() => deletePart(index)}
                                 value={values.orderParts[index]}
                               />
                             ))}
                           </table>
   
                           <div className="flex gap-2 justify-end w-full">
                             <Button
                               color="blue"
                               size="xs"
                               className="mt-5"
                               onClick={() =>
                                 push({
                                   partNumber: "",
                                   count: 1,
                                   checkOnWarehouse: false,
                                   partName: "",
                                 })
                               }
                             >
                               Əlavə et <span className="ml-2 ">+</span>
                             </Button>
                             <Button
                               color="blue"
                               size="xs"
                               className="mt-5"
                               type="button"
                               onClick={() => checkInstock(values)}
                             >
                               Anbarda yoxla
                             </Button>
                           </div>
                         </div>
                       )}
                     </FieldArray>
  )
}
