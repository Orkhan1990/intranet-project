import SelectWithButtons from "../components/SelectWithButtons";
import { Field,FieldArray } from "formik";
import { TextInput } from "flowbite-react";
import { NewCardProblemsInterface, UserInterface } from "../types";

interface CardProblemsIterface{
  workers:UserInterface[],
  values:NewCardProblemsInterface,
  name:string,
  setFieldValue:(name:string,value:string)=>void
}

const NewCardProblems = ({ workers, name, values, setFieldValue }:CardProblemsIterface) => {
  return (
    <div>
      <div className="flex gap-2 mt-2">
        <Field
          as={TextInput}
          type="text"
          name={`${name}.description`}
          className="w-full"
        />
        <div className="flex flex-col">

        <FieldArray name={`${name}.serviceWorkers`} >
          
          {({ push, remove }) => (
            <div className="flex flex-col gap-5  items-center">
              {values.serviceWorkers.map((_,index) => (
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
    </div>
  );
};

export default NewCardProblems;
