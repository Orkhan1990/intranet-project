import { Button, TextInput } from 'flowbite-react'
import { Field } from 'formik'
import React, { useState } from 'react'

const AddCharges = ({name,push}) => {

 
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