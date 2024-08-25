import SelectWithButtons from "./SelectWithButton";
import { Field,FieldArray } from "formik";
import { Button, TextInput } from "flowbite-react";

const NewCardProblems = ({ workers, name, values, setFieldValue }) => {
  return (
    <div>
      <div className="flex gap-[250px] mt-2">
        <Field
          as={TextInput}
          type="text"
          className="w-[500px]"
          name={`${name}.description`}
        />
        <FieldArray name={`${name}.serviceWorkers`} className="flex flex-col">
          {({ push, remove }) => (
            <div className="flex flex-col gap-5  items-center">
              {values.serviceWorkers.map((_,index) => (
                <div key={index}  >
                  
                  <SelectWithButtons
                   name={`${name}.serviceWorkers[${index}]`}
                   value={values.serviceWorkers[index]}
                   onChange={(value)=>setFieldValue(`${name}.serviceWorkers[${index}]`,value)}
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