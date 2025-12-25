import {TextInput } from 'flowbite-react'
import { Field } from 'formik'
import { useEffect } from 'react';
import { NewCardExpencesInterface } from '../types';



// interface ChargesInterface{
//     description:string,
// }

interface AddChargesInterface{
    name:string,
    values:NewCardExpencesInterface
    expenceUpdatePrice:(price:any)=>void;
    cardData?:any
}
const AddCharges = ({name,values,expenceUpdatePrice,cardData}:AddChargesInterface) => {


  useEffect(() => {
    // ✨ Number çevirməyi burada et, amma input-u pozmasın deyə values.price string qalsın
    const priceNumber = values.price || 0;
    expenceUpdatePrice(priceNumber);
  }, [values.price]);
 
  return (
   <div className="border p-5 rounded-md">
      <div className="flex items-center gap-5 mt-2" >
        <Field as={TextInput} type="text" className="w-[500px] flex-1" name={`${name}.description`} sizing="sm" disabled={cardData&&!cardData?.isOpen}/>
        <div className='flex gap-2 items-end'>
        <Field as={TextInput} type="text" name={`${name}.price`} sizing="sm" disabled={cardData&&!cardData?.isOpen}/>
        <span>AZN</span>
        </div>
        
      </div>

  
  </div>
  )
}

export default AddCharges