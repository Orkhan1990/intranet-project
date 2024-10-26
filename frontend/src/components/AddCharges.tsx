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
}
const AddCharges = ({name,values,expenceUpdatePrice}:AddChargesInterface) => {


  useEffect(()=>{
       expenceUpdatePrice(+values.price)
  },[values.price])
 
  return (
   <div className="border p-5 rounded-md">
    <h2 className='font-semibold'>Xərclər</h2>

      <div className="flex items-center gap-5 mt-2" >
        <Field as={TextInput} type="text" className="w-[500px] flex-1" name={`${name}.description`} />
        <div className='flex gap-2 items-end'>
        <Field as={TextInput} type="text" name={`${name}.price`}/>
        <span>AZN</span>
        </div>
        
      </div>

  
  </div>
  )
}

export default AddCharges