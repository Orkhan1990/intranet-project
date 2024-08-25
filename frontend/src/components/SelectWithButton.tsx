import { Button, Select } from "flowbite-react";
import {Field} from "formik";

const SelectWithButtons = ({ workers, name, value, onChange,push,remove,index }) => {

  const handleChange=(event)=>{
    onChange(event.target.value)
  }
  return (
    <div className="flex  gap-2">
     {index>0&& <Button color={"blue"} onClick={()=>remove(index)} >-</Button>} 
      <Field
        as={Select}
        name={name}
        value={value}
        className="w-[250px]"
        onChange={handleChange}
      >
        <option value="">İsciler</option>
        {workers &&
          workers.map((worker, index) => (
            <option value={worker._id} key={index}>
              {worker.firstName + " " + worker.lastName}
            </option>
          ))}
      </Field>
      <Button color={"blue"} onClick={()=>push('')}>+</Button>
    </div>
  );
};

export default SelectWithButtons;