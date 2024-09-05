import SelectWithButtons from "../components/SelectWithButton";
import { Field,FieldArray } from "formik";
import {TextInput } from "flowbite-react";



interface NewCardProblemsInterface{
  
  workers: Array<{ id: number; name: string }>; // Adjust worker type if necessary
  name: string;
  values: {
    serviceWorkers: Array<{id:number,name:string}>; // Adjust the type of serviceWorkers if necessary
  };
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const NewCardProblems = ({ workers, name, values, setFieldValue }:NewCardProblemsInterface) => {
  return (
    <div>
      <div className="flex gap-[250px] mt-2">
        <Field
          as={TextInput}
          type="text"
          className="w-[500px]"
          name={`${name}.description`}
        />
        <FieldArray name={`${name}.serviceWorkers`} >
          {({ push, remove }) => (
            <div className="flex flex-col gap-5  items-center">
              {values.serviceWorkers.map((_,index:number) => (
                <div key={index}  >
                  
                  <SelectWithButtons
                   name={`${name}.serviceWorkers[${index}]`}
                   value={values.serviceWorkers[index]}
                   onChange={(value:any)=>setFieldValue(`${name}.serviceWorkers[${index}]`,value)}
                   workers={workers}
                   push={push}
                   remove={remove}
                   index={index} 
                  
                  />
                </div>
              ))}
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default NewCardProblems;